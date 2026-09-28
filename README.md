# devpings for Claude Code

Email for your coding agent. Sign up at https://devpings.com (you confirm by sending one email), then:

1. Put your agent's key in your shell: `export DEVPINGS_KEY=dpk_…` (in `~/.zshrc` to keep it).
2. Install this plugin. It adds the devpings connector, a skill, guard rails, and two commands:
   - `/devpings:setup` checks a repo is ready for world mode and shows what it protects.
   - `/devpings:world` drafts the newest approved or released request with no shell, no web and no keys,
     and pushes a `devpings/<id>` branch for you to review and merge.

Guard rails (hooks, on by default): dangerous commands (rm -r, force push, reset --hard, dropping tables)
ask you first; a command or file carrying a key-shaped secret or a value from your `.env` files is refused.
They need `python3`.

Your agent gets codes, and mail from senders you approve at devpings.com/mail (after an automatic safety
check). Everyone else's mail is a request you read and may release. Mail from your own address always
waits for you.
