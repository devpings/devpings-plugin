#!/usr/bin/python3
# devpings guard rail (PreToolUse on Bash): dangerous commands ask you first; a command carrying a secret is refused.
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from secrets_lib import findings

d = json.load(sys.stdin)
cmd = d.get("tool_input", {}).get("command", "")
ASK = [
    (r"\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r)\b|\brm\s+-r\b", "deletes files and folders (rm -r)"),
    (r"\bgit\s+reset\s+--hard\b", "throws away work (git reset --hard)"),
    (r"\bgit\s+push\b[^|;&]*(\s--force\b|\s-f\b|--force-with-lease)", "overwrites history on the server (force push)"),
    (r"\bgit\s+clean\s+-[a-zA-Z]*f", "deletes untracked files (git clean)"),
    (r"(?i)\b(drop\s+(table|schema|database)|truncate\s+table)\b", "deletes a database table or schema"),
    (r"(?i)\bdelete\s+from\s+\S+\s*(;|$|\")", "deletes every row (DELETE without WHERE)"),
    (r"\bgit\s+branch\s+-D\b", "force-deletes a branch"),
]
for pat, why in ASK:
    if re.search(pat, cmd):
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "ask",
            "permissionDecisionReason": "This " + why + ". You decide."}}))
        sys.exit(0)
f = findings(cmd)
if f:
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny",
        "permissionDecisionReason": "Refused: the command itself contains " + ", ".join(sorted(set(f))) + ". Read secrets from files inside the command instead of pasting them."}}))
sys.exit(0)
