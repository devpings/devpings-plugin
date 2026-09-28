---
description: Turn on devpings world mode - your own Claude, in a cloud box, drafts changes that people you trust ask for by email; you review and merge on GitHub
---
Turn on devpings world mode for this person. Everything that acts is theirs: their Claude account, their repo, their GitHub. devpings keeps only a fingerprint of the world key. Use plain words; explain any technical word in one line.

0. If the devpings tools aren't available, say: "First set your devpings key: export DEVPINGS_KEY=dpk_… (from devpings.com), then restart Claude Code." and stop.
1. Call the devpings tool `create_world_key`. If a world key already exists, say to disconnect it under the gear at https://www.devpings.com/mail and stop. Never print the key.
2. Ask which GitHub repo world mode may draft changes in (suggest `git remote get-url origin`). Say: "Your own Claude will open draft changes there. Nothing goes live until you review and merge it on GitHub. It can't merge."
3. Ask: "Shall I create a cloud helper (a routine) on your Claude account? It checks devpings once an hour, so a draft can take up to an hour." On yes, read "${CLAUDE_PLUGIN_ROOT}/world/routine-prompt.md", put the key in place of {{WORLD_KEY}}, and create the routine with your routine tool: name "devpings world mode", cron "0 * * * *", the repo as its source, tools Bash, Read, Edit, Write, Glob, Grep. Don't print the prompt.
4. Say plainly: "The world key is written in the helper's instructions, so it's visible in its settings and in this conversation. It can only fetch checked change requests, never mail. Rotate it any time under the gear."
5. Give the one-time steps, filling in the real OWNER/REPO:
   - Install Claude's GitHub app on that repo: https://github.com/apps/claude/installations/new
   - Protect main: https://github.com/OWNER/REPO/settings/rules/new : require a pull request for main, and block changes to `.github/`. If they aren't an admin of the repo, or a ruleset already exists, say so and stop; nothing is half-made.
   - In claude.ai → Claude Code → the cloud environment the routine uses → Edit: add `www.devpings.com` to allowed domains.
   - Open the routine "devpings world mode" in claude.ai and switch off connectors it doesn't need (Docs, Code Remote): https://claude.ai/code
6. Last: "Open https://www.devpings.com/mail, click the gear, and in the tree choose Trusted → World mode, then Save. That's your yes." Each request then shows its journey under the mail ("What happened").
