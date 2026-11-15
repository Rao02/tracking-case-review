/* Human-review diagram only. Frozen prompts, gold and branch edges are unchanged. */
function branchTree(item){
 const cards=[],edges=[],gap=22,level=244;
 function build(id,depth,path,incoming,ancestors=[]){
  if(ancestors.includes(id))throw Error('C branch cycle');
  const node=item.nodes[id];if(!node)throw Error('C branch missing state');
  const card={id,depth,path,node,incoming,terminal:null,width:190,height:178,x:0,children:[]};cards.push(card);
  const priority={reference:0,recoverable:1,failure:2};
  for(const[label,edge]of Object.entries(node.gold).sort((a,b)=>priority[a[1].role]-priority[b[1].role])){
   const nextPath=path?path+' → '+label:label,media=node.outcomes.find(m=>m.label===label);let child;
   if(edge.terminal){child={depth:depth+1,path:nextPath,incoming:media,terminal:edge.terminal,width:158,height:150,x:0,children:[]};cards.push(child)}
   else child=build(edge.next_node,depth+1,nextPath,media,[...ancestors,id]);
   card.children.push(child);edges.push({from:card,to:child,label,role:edge.role});
  }
  return card;
 }
 function shift(card,dx){card.x+=dx;card.bounds=card.bounds.map(([l,r])=>[l+dx,r+dx]);for(const c of card.children)shift(c,dx)}
 function layout(card){
  if(!card.children.length){card.bounds=[[-card.width/2,card.width/2]];return}
  let merged=[];
  for(const child of card.children){
   layout(child);let dx=0;
   if(merged.length)dx=Math.max(...child.bounds.map(([l],d)=>merged[d]?merged[d][1]+gap-l:-Infinity).filter(Number.isFinite));
   shift(child,dx);
   child.bounds.forEach(([l,r],d)=>{merged[d]=merged[d]?[Math.min(merged[d][0],l),Math.max(merged[d][1],r)]:[l,r]});
  }
  card.x=(card.children[0].x+card.children.at(-1).x)/2;
  card.bounds=[[card.x-card.width/2,card.x+card.width/2],...merged];
 }
 const root=build(item.root_node,0,'',null);layout(root);
 const left=Math.min(...root.bounds.map(b=>b[0])),right=Math.max(...root.bounds.map(b=>b[1]));
 shift(root,18-left);
 const width=right-left+36,height=Math.max(...cards.map(c=>c.depth*level+c.height))+20;
 const svg='<svg width="'+width+'" height="'+height+'" aria-hidden="true">'+edges.map(e=>{
  const a=e.from,b=e.to,y=a.depth*level+a.height,end=b.depth*level,mid=(y+end)/2;
  const key=e.role==='reference'?'branchCorrect':e.role==='recoverable'?'branchFlawed':'branchWrong';
  return '<path data-from="'+esc(a.id)+'" data-to="'+esc(b.id||b.terminal)+'" data-choice="'+esc(e.label)+'" data-role="'+esc(e.role)+'" d="M '+a.x+' '+y+' C '+a.x+' '+mid+', '+b.x+' '+mid+', '+b.x+' '+end+'"/>'+
   '<g transform="translate('+b.x+' '+(end-30)+')"><rect x="-76" y="-12" width="152" height="24" rx="12"/><text text-anchor="middle" dominant-baseline="central">'+esc(e.label+' · '+t(key))+'</text></g>';
 }).join('')+'</svg>';
 const boxes=cards.map(c=>{
  const selected=!c.terminal&&c.id===$('node').value,media=c.node?c.node.question.media.find(m=>m.label==='CURRENT'):c.incoming;
  const title=c.terminal?t(c.terminal):t('branchState',{state:'S'+c.depth});
  const caption=c.path||t('branchInitial');
  const image=media?'<a class="branch-image" href="'+esc(media.path)+'" target="_blank" rel="noopener" data-full-image data-image-label="'+esc(title+' · '+caption)+'"><img src="'+esc(media.path)+'" alt="'+esc(title+' · '+caption)+'" loading="lazy"></a>':'';
  const footer=c.terminal?'<strong>'+esc(title)+'</strong>':'<button type="button" data-branch-state="'+esc(c.id)+'" aria-pressed="'+selected+'" title="'+esc(t('branchSelect'))+'">'+esc(title)+' <span aria-hidden="true">↗</span></button>';
  return '<div class="branch-card'+(c.terminal?' '+c.terminal:'')+(selected?' selected':'')+'" data-layout-node data-depth="'+c.depth+'" style="left:'+(c.x-c.width/2)+'px;top:'+(c.depth*level)+'px;width:'+c.width+'px;height:'+c.height+'px"'+(c.terminal?' data-branch-terminal="'+esc(c.terminal)+'"':'')+'>'+image+footer+'<span class="state-caption" title="'+esc(caption)+'">'+esc(caption)+'</span></div>';
 }).join('');
 return '<div class="branch-map" data-branch-layout="compact-contour-v2"><div class="branch-heading"><h3>'+esc(t('branchHeading'))+'</h3><span class="branch-hint">'+esc(t('branchImageHint'))+'</span></div><div class="branch-tools"><button type="button" data-branch-fit>'+esc(t('branchFit'))+'</button><button type="button" data-branch-full>'+esc(t('branchFull'))+'</button><button type="button" data-branch-expand>'+esc(t('branchExpand'))+'</button><label>'+esc(t('branchZoom'))+' <input type="range" min="15" max="150" value="100" aria-label="'+esc(t('branchZoom'))+'" data-branch-zoom></label></div><div class="branch-scroll" tabindex="0"><div class="branch-extent"><div class="branch-canvas" style="width:'+width+'px;height:'+height+'px" data-width="'+width+'" data-height="'+height+'" data-branch-edges="'+edges.length+'">'+svg+boxes+'</div></div></div></div>';
}
function setupBranchTree(){
 const map=$('question').querySelector('.branch-map');if(!map)return;
 const canvas=map.querySelector('.branch-canvas'),extent=map.querySelector('.branch-extent'),scroll=map.querySelector('.branch-scroll'),slider=map.querySelector('[data-branch-zoom]');
 const width=Number(canvas.dataset.width),height=Number(canvas.dataset.height);
 function zoom(scale){canvas.style.transform='scale('+scale+')';extent.style.width=width*scale+'px';extent.style.height=height*scale+'px';slider.value=Math.round(scale*100)}
 function fit(){map.dataset.viewMode='fit';zoom(Math.min(1,(scroll.clientWidth-26)/width))}
 map.querySelector('[data-branch-fit]').onclick=fit;
 map.querySelector('[data-branch-full]').onclick=()=>{map.dataset.viewMode='manual';zoom(1)};
 slider.oninput=()=>{map.dataset.viewMode='manual';zoom(Number(slider.value)/100)};
 map.querySelector('[data-branch-expand]').onclick=()=>{map.classList.toggle('expanded');map.querySelector('[data-branch-expand]').textContent=t(map.classList.contains('expanded')?'branchCollapse':'branchExpand');fit()};
 map.fitDiagram=fit;fit();
}
window.addEventListener('resize',()=>{const map=document.querySelector('.branch-map');if(map?.dataset.viewMode==='fit')map.fitDiagram?.()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const map=document.querySelector('.branch-map.expanded');if(map){map.classList.remove('expanded');map.querySelector('[data-branch-expand]').textContent=t('branchExpand');map.fitDiagram?.()}}});
