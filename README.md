# devpings for Claude Code

Email for your coding agent that strangers can't steer. Sign up at https://devpings.com (you confirm by
sending one email), then:

1. Install this plugin:
   `claude plugin marketplace add devpings/devpings-plugin` then `claude plugin install devpings@devpings`.
   It asks for your agent's key once (from devpings.com) and stores it as a secret.
2. It adds the devpings connector, a skill, guard rails and three commands:
   - `/devpings:setup`: checks this machine and repo, and lists secret-looking file names (never contents).
   - `/devpings:world-on`: turns on world mode. Your own Claude, in a cloud box on your account, drafts
     changes that people you trust ask for by email. It never sees the email, only a checked request
     ("replace this text with that"). You review and merge on GitHub; it can't merge. It checks hourly.
   - `/devpings:world-off`: pauses the helper; disconnect its key under the gear on devpings.com/mail.

What your agent gets: sign-up codes (a stranger's only while your agent waits for one), and nothing else
by itself. Everyone else's mail waits for you at devpings.com/mail, with its journey shown.

Guard rails (hooks, on by default): dangerous commands (rm -r, force push, reset --hard, dropping tables)
ask you first; a command or file carrying a key-shaped secret or a value from your `.env` files is refused.
They need `python3`; without it they switch off silently. A long placeholder in `.env.example` can trigger
a refusal: shorten it or rename the file.

Files: `.mcp.json` (connector), `skills/devpings/SKILL.md`, `commands/`, `world/routine-prompt.md` (the
cloud helper's standing instructions), `hooks/`, `bin/setup.mjs`. Code of the service:
https://github.com/devpings. License: MIT. Security: security@devpings.com.
