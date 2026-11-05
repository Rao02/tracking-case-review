# Tracking Case Review

Static export of the server's case review page, including local linked review pages and their media. Existing reference answers and model responses remain visible. Historical pages retain their archive labels; they are not new active test cohorts.

`site/index.html` opens the main review page. Only `site/` is deployed.

## First deployment

1. Create an empty GitHub repository called `tracking-case-review`.
2. Connect this local repository and push its `main` branch using authenticated Git.
3. In the GitHub repository, select Settings → Pages → Source → GitHub Actions.
4. Run the Publish review site workflow if the initial run occurred before Pages was enabled.

## Updates

Run `./sync.sh` on the source server to regenerate, commit changes, and push. The script uses the existing Git credential mechanism; do not put tokens in files or remote URLs.

A periodic job can call this script after repository authentication and first deployment are verified. No timer is installed by this preparation. Each push triggers a Pages deployment; this is deployment-based synchronization, not instantaneous streaming. Open browser tabs currently need a refresh to show the published update.

`EXPORT_REPORT.json` is a local verification manifest, excluded from Git. The exporter aborts on missing links, exports over 900 MiB, or individual files over 95 MiB.
