#!/usr/bin/env node
// /devpings:setup — checks before world mode is used in a repo, and shows what it protects. Changes nothing.
// Lists secret-shaped FILE NAMES in the repo (never their contents) so you know what world mode must never see.
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const repo = process.argv[2] || process.cwd();
const say = (ok, s) => console.log(`${ok ? "✓" : "✗"} ${s}`);
let bad = 0;
const check = (ok, s) => { say(ok, s); if (!ok) bad++; };

check(Boolean(process.env.DEVPINGS_KEY), "DEVPINGS_KEY is set (your agent's key from devpings.com)");
const help = spawnSync("claude", ["--help"], { encoding: "utf8" }).stdout || "";
check(/--restricted/.test(help) && /--strict-mcp-config/.test(help), "this Claude Code has --restricted and --strict-mcp-config (world mode needs both)");
check(existsSync(join(repo, ".git")), `${repo} is a git repo`);
const main = spawnSync("git", ["rev-parse", "--verify", "main"], { cwd: repo, encoding: "utf8" });
check(main.status === 0, "it has a main branch (drafts start from main)");

const SECRETISH = /(^\.env|\.pem$|\.key$|\.p12$|\.pfx$|id_rsa|id_ed25519|credentials|secrets?\.(json|ya?ml|toml)$|\.keystore$|service-account.*\.json$)/i;
const found = [];
(function walk(dir, depth) {
  if (depth > 6) return;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = join(dir, name);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, depth + 1);
    else if (SECRETISH.test(name)) found.push(relative(repo, p));
  }
})(repo, 0);
console.log(found.length
  ? `\nSecret-looking files in this repo (names only):\n  ${found.join("\n  ")}\nWorld mode's agent can read files inside the repo copy it works in. Keep secrets out of git; files ignored by git are not copied into its worktree.`
  : "\nNo secret-looking files found in the repo.");
console.log(`\nWhat world mode does: a fresh worktree of main, the agent with only Read/Edit/Write/Glob/Grep (no shell, no web, no MCP), env without SSH agent or tokens; the draft is checked, then pushed to devpings/<id> by this script, never by the agent.${bad ? `\n\n${bad} check(s) failed: fix those first.` : "\n\nReady."}`);
process.exit(bad ? 1 : 0);
