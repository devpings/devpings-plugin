#!/usr/bin/env node
// /devpings:setup — checks this machine and repo for devpings, and shows what must stay private. Changes nothing.
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
console.log(`\nWorld mode runs in your own cloud helper (say "turn on world mode"); nothing here changes.${bad ? `\n\n${bad} check(s) failed: fix those first.` : "\n\nReady."}`);
