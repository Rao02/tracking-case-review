# Tracking Case Review

Static export of the server's case review page, including local linked review pages and their media. Existing reference answers and model responses remain visible. Historical pages retain their archive labels; they are not new active test cohorts.

`site/index.html` opens the main review page. Only `site/` is deployed.

## First-class independent-question review

`tracking_judge_class1_review_20261109/review.html` is a separate first-class-only
snapshot: 51 base questions, 612 materialized conditions, and up to three answers
per condition/model. Its timestamp is displayed on the page. It is regenerated
explicitly after an offline answer audit, rather than implying live acquisition
progress. It loads only the selected model's answer file and has no external
JavaScript, localhost, SSH, model API, or private data dependencies.

The exporter preserves this page only when the source/answer checks and actual
browser checks pass for the matching HTML digest. Public source files, JSON and
media are explicitly allowed; private raw manifests are never exported.

## First deployment

1. Create an empty GitHub repository called `tracking-case-review`.
2. Connect this local repository and push its `main` branch using authenticated Git.
3. In the GitHub repository, select Settings → Pages → Source → GitHub Actions.
4. Run the Publish review site workflow if the initial run occurred before Pages was enabled.

## Updates

Run `./sync.sh` on the source server to regenerate, commit changes, and push. The script uses the existing Git credential mechanism; do not put tokens in files or remote URLs.

The source server uses a user cron job every five minutes to call this script, with a 15-minute timeout and a lock to prevent overlapping exports. The source server must remain online. Logs are in `sync.log` (not committed). Each push triggers a Pages deployment; this is deployment-based synchronization, not instantaneous streaming. Open browser tabs currently need a refresh to show the published update.

`EXPORT_REPORT.json` is a local verification manifest, excluded from Git. The exporter aborts on missing links, exports over 900 MiB, or individual files over 95 MiB.
