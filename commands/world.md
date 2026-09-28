---
description: Draft the newest approved or released devpings request in world mode (no shell, no web, no keys)
allowed-tools: Bash(node:*)
---
Run this and show the person its output exactly, including the review link:

!`node "${CLAUDE_PLUGIN_ROOT}/bin/world.mjs" --repo "$PWD" $ARGUMENTS`

Do not merge, deploy or push anything yourself. The person reviews the draft and merges it.
