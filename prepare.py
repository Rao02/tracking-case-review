#!/usr/bin/env python3
"""Export the review page and its local link closure without modifying sources."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib, json, shutil
ROOT = Path('/home/ytyan/Rao/artifacts')
OUT = Path(__file__).resolve().parent / 'site'
ENTRY = Path('tracking_judge_scaleup_20261102/review.html')
class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]
    def handle_starttag(self, tag, attrs):
        for k,v in attrs:
            if k in ('src','href') and v: self.refs.append(v)
def main():
    pending=[ENTRY]; content={}; missing=[]
    # Isolated preview release; frozen main cohorts remain unchanged.
    preview=Path('tracking_judge_three_state_v1_20261106/review.html')
    if (ROOT/preview).is_file(): pending.append(preview)
    # Keep the former summary-only URL as a redirect to the complete review.
    partial=Path('tracking_judge_state_partial_v2_20261107/review.html')
    if (ROOT/partial).is_file(): pending.append(partial)
    # User-requested isolated one-case option-role preview; main cohort stays frozen.
    role_preview=Path('tracking_judge_option_roles_preview_20261107/review.html')
    if (ROOT/role_preview).is_file(): pending.append(role_preview)
    # User-authorized expanded visual/action release: publish only after simulator
    # and actual-browser verification artifacts are both present and passed.
    scaleup=Path('tracking_judge_four_role_scaleup_v6_20261107')
    gates=[ROOT/scaleup/name for name in ['VERIFICATION.json','BROWSER_VERIFICATION.json']]
    if (ROOT/scaleup/'review.html').is_file() and all(f.is_file() and json.loads(f.read_text()).get('passed') for f in gates):
        pending.append(scaleup/'review.html')
        # The viewer injects image src from JSON at runtime. HTML link parsing
        # alone sees reference preloads, but misses charts and audit endpoints.
        pending.extend(scaleup/'media'/f.name for f in (ROOT/scaleup/'media').glob('*.png'))
    # Three-model analysis is a separate read-only report, not a quiz release.
    # Export an explicit public allowlist after numeric and actual-browser checks.
    report=Path('tracking_judge_three_model_report_20261108')
    report_gates=[ROOT/report/name for name in ['VERIFICATION.json','BROWSER_VERIFICATION.json']]
    if (ROOT/report/'report.html').is_file() and all(f.is_file() and json.loads(f.read_text()).get('passed') for f in report_gates):
        verification=json.loads(report_gates[0].read_text())
        browser_verification=json.loads(report_gates[1].read_text())
        if verification.get('report_sha256')==browser_verification.get('report_sha256')==hashlib.sha256((ROOT/report/'report.html').read_bytes()).hexdigest():
            pending.extend(report/name for name in ['report.html','SUMMARY.json','AUDIT.json','answers.csv','contrasts.csv','PROTOCOL.md','examples.json','report_data.json'])
            pending.extend(report/'media'/f.name for f in (ROOT/report/'media').glob('*.png'))
    # Read-only reliability atlas: explicit public manifest, no raw answers,
    # source manifests, local build scripts or provider configuration.
    atlas=Path('tracking_judge_reliability_atlas_20261110')
    atlas_gates=[ROOT/atlas/name for name in ['VERIFICATION.json','BROWSER_VERIFICATION.json']]
    if all(p.is_file() and json.loads(p.read_text()).get('passed') for p in atlas_gates):
        manifest=json.loads(atlas_gates[0].read_text())
        browser=json.loads(atlas_gates[1].read_text())
        checks=manifest['files_sha256']
        if browser.get('html_sha256')==checks.get('report.html') and all(hashlib.sha256((ROOT/atlas/name).read_bytes()).hexdigest()==digest for name,digest in checks.items()):
            pending.extend(atlas/name for name in checks)
    # Class-specific read-only review pages. Runtime JSON/media are exported
    # only through manifests that match actual-browser verification.
    for release in ['tracking_judge_class1_review_20261109',
                    'tracking_judge_class2_review_20261109',
                    'tracking_judge_class3_review_20261109']:
        review=Path(release)
        gates=[ROOT/review/name for name in ['VERIFICATION.json','BROWSER_VERIFICATION.json']]
        if not all(p.is_file() and json.loads(p.read_text()).get('passed') for p in gates):
            continue
        manifest=json.loads(gates[0].read_text())
        browser=json.loads(gates[1].read_text())
        checks=manifest['files_sha256']
        if browser.get('html_sha256')==checks.get('review.html') and all(hashlib.sha256((ROOT/review/name).read_bytes()).hexdigest()==digest for name,digest in checks.items()):
            pending.extend(review/name for name in checks)
            pending.extend(review/'media'/f.name for f in (ROOT/review/'media').glob('*.png'))
    while pending:
        rel=pending.pop()
        if rel in content: continue
        path=ROOT/rel
        if not path.is_file():
            missing.append(str(rel)); continue
        data=path.read_bytes(); content[rel]=data
        if path.suffix.lower() not in ('.html','.htm'): continue
        parser=Links(); parser.feed(data.decode())
        for ref in parser.refs:
            u=urlsplit(ref)
            if u.scheme or u.netloc or not u.path: continue
            child=(ROOT/unquote(u.path).lstrip('/') if u.path.startswith('/') else path.parent/unquote(u.path))
            # Normalize logical URL paths; symlinked media bytes are copied, not linked.
            import os
            child=Path(os.path.abspath(child))
            childrel=child.relative_to(ROOT)
            pending.append(childrel)
    if missing: raise SystemExit('Missing dependencies: '+json.dumps(sorted(set(missing))))
    size=sum(map(len,content.values()))
    if size>900*1024**2: raise SystemExit(f'Export exceeds conservative 900 MiB gate: {size}')
    for rel,data in content.items():
        if len(data)>95*1024**2: raise SystemExit(f'File too large for ordinary Git: {rel}')
    OUT.mkdir(exist_ok=True)
    # Only remove obsolete files inside this generated site directory.
    expected=set(content)|{Path('index.html'),Path('.nojekyll')}
    for f in OUT.rglob('*'):
        if f.is_file() and f.relative_to(OUT) not in expected: f.unlink()
    for rel,data in content.items():
        dst=OUT/rel; dst.parent.mkdir(parents=True,exist_ok=True)
        if not dst.exists() or dst.read_bytes()!=data:
            tmp=dst.with_name(dst.name+'.tmp');tmp.write_bytes(data);tmp.replace(dst)
    (OUT/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>Tracking Case Review</title><script>location.replace("'+ENTRY.as_posix()+'"+location.search+location.hash)</script><a href="'+ENTRY.as_posix()+'">Open case review</a>\n')
    (OUT/'.nojekyll').touch()
    report={'entry':ENTRY.as_posix(),'files':len(content),'bytes':size,'MiB':round(size/1024**2,2),'html_pages':[str(r) for r in sorted(content) if r.suffix=='.html'],'missing':[], 'entry_sha256':hashlib.sha256(content[ENTRY]).hexdigest(),'files_sha256':{str(r):hashlib.sha256(b).hexdigest() for r,b in sorted(content.items())}}
    (OUT.parent/'EXPORT_REPORT.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items() if k!='files_sha256'},indent=2))
if __name__=='__main__': main()
