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
for attempt in 1 2 3; do
  if git push origin main; then
    exit 0
  fi
  if [ "$attempt" -lt 3 ]; then
    sleep 5
  fi
done
exit 1
