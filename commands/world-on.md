---
description: Turn on devpings world mode - your own Claude, in a cloud box, drafts changes that people you trust ask for by email; you review and merge on GitHub
---
Turn on devpings world mode for this person. Everything that acts is theirs: their Claude account, their repo, their GitHub. No agent, including you, ever sees the world-mode key. Use plain words; explain any technical word in one line.

1. Ask which GitHub repo world mode may draft changes in (suggest `git remote get-url origin`). Say: "Your own Claude will open draft changes there. Nothing goes live until you review and merge it on GitHub. It can't merge."
2. Ask them to make the key themselves, where no agent sees it:
   - At https://www.devpings.com/mail, click the gear → Keys → "Make a world-mode key".
   - In claude.ai → Claude Code → the cloud environment they use for routines → Edit: under API credentials, add it for host `www.devpings.com` (type Bearer), and add `www.devpings.com` to allowed domains. Save.
   Wait until they say it's done. Never ask them to paste the key to you.
3. Ask: "Shall I create a cloud helper (a routine) on your Claude account, using that environment? It checks devpings once an hour, so a draft can take up to an hour." On yes, create it with your routine tool from "${CLAUDE_PLUGIN_ROOT}/world/routine-prompt.md" as its instructions: name "devpings world mode", cron "0 * * * *", that environment, the repo as its source, tools Bash, Read, Edit, Write, Glob, Grep.
4. One-time GitHub steps, filling in the real OWNER/REPO:
   - Install Claude's GitHub app on that repo: https://github.com/apps/claude/installations/new
   - Protect main: https://github.com/OWNER/REPO/settings/rules/new : require a pull request for main, and block changes to `.github/`. If they aren't an admin, or a ruleset already exists, say so and stop; nothing is half-made.
   - Open the routine "devpings world mode" at https://claude.ai/code and switch off connectors it doesn't need (Docs, Code Remote).
5. Last: "At https://www.devpings.com/mail, click the gear, and in the tree choose Trusted → World mode, then Save. That's your yes." Each request then shows its journey under the mail ("What happened").
