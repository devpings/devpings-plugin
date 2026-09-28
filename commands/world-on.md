---
description: Turn on devpings world mode (spec 29): a cloud helper on YOUR Claude account drafts gated requests from senders you trust; you approve on devpings.com
---
Turn on devpings world mode for this person. Everything that acts belongs to them: their Claude account, their repo, their GitHub. devpings keeps only a fingerprint of the world key. Say each step in plain words; don't use jargon without a one-line explanation.

1. Call the devpings tool `create_world_key`. If it says a world key already exists, tell the person to disconnect it under the gear at https://www.devpings.com/mail and stop. Keep the key it returns out of anything you print.
2. Ask which repo world mode may draft changes in (suggest this folder's GitHub remote: `git remote get-url origin`). Explain in one line: "Your own Claude will open draft changes there. Nothing goes live without your Approve on devpings."
3. Ask: "Shall I create a cloud helper (a routine) on your Claude account? It runs hourly, and straight away when your Mac sees a request." On yes, read "${CLAUDE_PLUGIN_ROOT}/world/routine-prompt.md", put the key in place of {{WORLD_KEY}}, and create the routine with your routine tool: name "devpings world mode", hourly cron "0 * * * *", the repo as its source, tools Bash, Read, Edit, Write, Glob, Grep. Don't print the prompt with the key in it.
4. Tell them the two one-time GitHub steps, with links:
   - Install Claude's GitHub app on that repo: https://github.com/apps/claude/installations/new
   - Protect main: https://github.com/OWNER/REPO/settings/rules/new — require a pull request for main, and block changes to `.github/`.
   Then, in claude.ai (Claude Code, cloud environments): allow the network domain `www.devpings.com` for the environment the routine uses (cloud machines only reach allowed sites; found 28 Sep), and switch off connectors the routine doesn't need (Docs, Code Remote).
5. Last: "Open https://www.devpings.com/mail, click the gear, and in the tree choose Trusted → World mode, then Save. That's your yes." Say that each request shows its journey under the mail ("What happened").
