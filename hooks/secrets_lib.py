# devpings guard rails, shared by both hooks. Finds (a) this project's real secrets by exact value (the
# values in its .env* files and DEVPINGS_KEY) and (b) common key shapes. Never prints a secret.
import glob, os, re

SHAPES = [
    (r"dpk_[A-Za-z0-9_-]{20,}", "a devpings agent key"),
    (r"sk-ant-[A-Za-z0-9_-]{20,}", "an Anthropic key"),
    (r"sk-[A-Za-z0-9]{32,}", "an API secret key"),
    (r"gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}", "a GitHub token"),
    (r"sbp_[a-f0-9]{40}", "a Supabase access token"),
    (r"AKIA[0-9A-Z]{16}", "an AWS key"),
    (r"xox[baprs]-[A-Za-z0-9-]{10,}", "a Slack token"),
    (r"-----BEGIN [A-Z ]*PRIVATE KEY-----", "a private key"),
]

def _known_values():
    vals = []
    root = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
    for env in glob.glob(os.path.join(root, ".env*")):
        try:
            for line in open(env, errors="ignore"):
                if "=" in line and not line.lstrip().startswith("#"):
                    v = line.split("=", 1)[1].strip().strip("'\"")
                    if len(v) >= 16 and not v.startswith("http"):
                        vals.append(v)
        except OSError:
            pass
    k = os.environ.get("DEVPINGS_KEY", "")
    if len(k) >= 16:
        vals.append(k)
    return vals

def findings(text):
    """Plain-words reasons, never the secret itself."""
    if not text:
        return []
    out = []
    if any(v in text for v in _known_values()):
        out.append("one of this project's real secrets (from a .env file or DEVPINGS_KEY)")
    for pat, name in SHAPES:
        if re.search(pat, text):
            out.append(name)
    return out
