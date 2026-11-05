#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
exec 9>.sync.lock
flock -n 9 || exit 0
python3 prepare.py
git add -- site
if ! git diff --cached --quiet; then
  git commit -m "Update case review snapshot"
fi
git push origin main
