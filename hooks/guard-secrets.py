#!/usr/bin/python3
# devpings guard rail (PreToolUse on Write|Edit|MultiEdit): never write a secret into a file.
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from secrets_lib import findings

d = json.load(sys.stdin)
ti = d.get("tool_input", {})
path = ti.get("file_path", "")
text = "\n".join(str(x) for x in [ti.get("content"), ti.get("new_string")] + [e.get("new_string") for e in ti.get("edits", []) or []] if x)
if os.path.basename(path).startswith(".env"):
    reason = "writing to a .env file needs your yes"
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "ask", "permissionDecisionReason": reason}}))
    sys.exit(0)
f = findings(text)
if f:
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny",
        "permissionDecisionReason": "Refused: this would write " + ", ".join(sorted(set(f))) + " into " + (path or "a file") + ". Secrets never go into files."}}))
sys.exit(0)
