/* Every review image remains an ordinary link; normal clicks open a zoomable viewer. */
(()=>{
 const dialog=document.createElement('dialog');dialog.id='image-viewer';
 dialog.innerHTML='<div class="viewer-toolbar"><strong data-viewer-caption></strong><a data-viewer-original target="_blank" rel="noopener"></a><button type="button" data-viewer-fit></button><label><span data-viewer-zoom-label></span> <input data-viewer-zoom type="range" min="10" max="250" value="100"></label><button type="button" data-viewer-close aria-label="Close">×</button></div><div class="viewer-viewport"><img data-viewer-image alt=""></div>';
 document.body.append(dialog);
 const im=dialog.querySelector('[data-viewer-image]'),range=dialog.querySelector('[data-viewer-zoom]'),viewport=dialog.querySelector('.viewer-viewport');
 function words(){const zh=document.documentElement.lang.startsWith('zh');dialog.querySelector('[data-viewer-original]').textContent=zh?'打开原图':'Open original';dialog.querySelector('[data-viewer-fit]').textContent=zh?'适应窗口':'Fit';dialog.querySelector('[data-viewer-zoom-label]').textContent=zh?'缩放':'Zoom';dialog.querySelector('[data-viewer-close]').setAttribute('aria-label',zh?'关闭':'Close')}
 function zoom(scale){im.style.width=Math.max(1,Math.round(im.naturalWidth*scale))+'px';im.style.maxWidth='none';im.style.maxHeight='none';range.value=Math.round(scale*100)}
 function fit(){if(im.naturalWidth)zoom(Math.min(1,(viewport.clientWidth-32)/im.naturalWidth,(viewport.clientHeight-32)/im.naturalHeight))}
 function open(src,label){words();dialog.querySelector('[data-viewer-caption]').textContent=label;dialog.querySelector('[data-viewer-original]').href=src;im.alt=label;im.onload=fit;im.src=src;if(!dialog.open)dialog.showModal();if(im.complete)fit();viewport.scrollTop=viewport.scrollLeft=0}
 range.oninput=()=>zoom(Number(range.value)/100);dialog.querySelector('[data-viewer-fit]').onclick=fit;dialog.querySelector('[data-viewer-close]').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 document.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const a=e.target.closest('a');if(!a||dialog.contains(a))return;const img=a.querySelector('img');if(!img||!a.getAttribute('href')?.match(/\.(png|jpe?g|webp)(?:[?#]|$)/i))return;e.preventDefault();open(a.href,a.dataset.imageLabel||img.alt||'Image')});
 window.REVIEW_IMAGE_VIEWER={open,fit,close:()=>dialog.close()};
})();
