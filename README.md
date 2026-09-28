# devpings for Claude Code

Email for your coding agent that strangers can't steer. Sign up at https://devpings.com (you confirm by
sending one email), then:

1. Install this plugin:
   `claude plugin marketplace add devpings/devpings-plugin` then `claude plugin install devpings@devpings`.
   It asks for your agent's key once (from devpings.com) and stores it as a secret.
2. It adds the devpings connector, a skill and two commands:
   - `/devpings:world-on`: turns on world mode. Your own Claude, in a cloud box on your account, drafts
     changes that people you trust ask for by email. It never sees the email, only a checked request
     ("replace this text with that"). You review and merge on GitHub; it can't merge. It checks hourly.
   - `/devpings:world-off`: pauses the helper; disconnect its key under the gear on devpings.com/mail.

What your agent gets: sign-up codes (a stranger's only while your agent waits for one), and nothing else
by itself. Everyone else's mail waits for you at devpings.com/mail, with its journey shown.

Files: `.mcp.json` (connector), `skills/devpings/SKILL.md`, `commands/`, `world/routine-prompt.md` (the
cloud helper's standing instructions), and `.claude-plugin/icon.svg`. No hooks, no scripts: nothing runs on your machine but the connector. Code of the service:
https://github.com/devpings. License: MIT. Security: security@devpings.com.
