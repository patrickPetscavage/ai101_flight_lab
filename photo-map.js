/* HTML photo buttons anchored to Cesium positions: keyboard/touch accessible,
   without cross-origin WebGL textures. External image errors preserve the text. */
const PhotoMap = (()=>{
 function mount({Cesium:C,viewer,regions,photos,onOpen,onLocate}){
  const $=id=>document.getElementById(id), dialog=$('photo-dialog'), overlay=$('photo-markers');
  let selected=null, opener=null;
  const markers=[];
  function close(){dialog.close();opener?.focus();}
  function open(item,button){
   onOpen();selected=item;opener=button;
   $('photo-title').textContent=item.spot.title;$('photo-region').textContent=item.region.area;
   $('photo-description').textContent=item.spot.description;$('photo-date').textContent='Photo: '+item.photo.date;
   $('photo-credit').textContent='Photo: '+item.photo.author+' · Wikimedia Commons';$('photo-credit').href=item.photo.source;
   $('photo-license').textContent=item.photo.license;$('photo-license').href=item.photo.licenseUrl;
   $('photo-fact').href=item.spot.source;
   const img=$('photo-large');img.hidden=false;$('photo-error').hidden=true;
   img.onerror=()=>{img.hidden=true;$('photo-error').hidden=false;};
   img.alt=item.spot.title+' — '+item.photo.date;img.src=item.photo.image;
   if(!dialog.open)dialog.showModal();$('photo-close').focus();
  }
  for(const photo of photos){
   const region=regions.find(r=>r.stops.some(s=>s.id===photo.id));
   if(!region)continue;
   const spot=region.stops.find(s=>s.id===photo.id), item={photo,region,spot};
   function button(className){
    const b=document.createElement('button');b.type='button';b.className=className;b.title='Read about '+spot.title;b.setAttribute('aria-label','Open photo: '+spot.title);
    const img=document.createElement('img');img.src=photo.image;img.alt='';img.loading='lazy';img.referrerPolicy='no-referrer';
    img.onerror=()=>{img.hidden=true;b.classList.add('photo-missing');};
    const label=document.createElement('span');label.textContent=spot.title;b.appendChild(img);b.appendChild(label);b.onclick=()=>open(item,b);return b;
   }
   const marker=button('photo-marker');marker.hidden=true;overlay.appendChild(marker);
   $('photo-list').appendChild(button('photo-list-item'));
   markers.push({button:marker,position:C.Cartesian3.fromDegrees(spot.lon,spot.lat,30)});
  }
  const occluder=new C.EllipsoidalOccluder(C.Ellipsoid.WGS84);
  function update(){
   occluder.cameraPosition=viewer.camera.positionWC;
   const used=[];const rect=viewer.scene.canvas.getBoundingClientRect();
   for(const m of markers){
    let xy;
    if($('photo-toggle').checked && C.Cartesian3.distance(viewer.camera.positionWC,m.position)<4000000 && occluder.isPointVisible(m.position))xy=C.SceneTransforms.worldToWindowCoordinates(viewer.scene,m.position);
    const visible=xy && xy.x>48 && xy.y>90 && xy.x<rect.width-48 && xy.y<rect.height-20 && !used.some(p=>Math.abs(p.x-xy.x)<98&&Math.abs(p.y-xy.y)<100);
    m.button.hidden=!visible;
    if(visible){used.push(xy);m.button.style.left=(rect.left+xy.x)+'px';m.button.style.top=(rect.top+xy.y)+'px';}
   }
  }
  viewer.scene.postRender.addEventListener(update);$('photo-toggle').onchange=update;
  $('photo-close').onclick=close;
  dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
  $('photo-locate').onclick=()=>{if(selected){close();onLocate(selected.spot);}};
  return {update,markers};
 }
 return {mount};
})();
if(typeof module!=='undefined')module.exports=PhotoMap;
