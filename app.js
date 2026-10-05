/* Cesium globe, simulated travel, and original manual flight controls. */
(() => {
 const $=id=>document.getElementById(id);
 if(typeof Cesium==='undefined'){$('message').textContent='Cesium did not load. Check internet/CDN access.';return;}
 let state=Flight.initial(), route=null, queue=[], layer, tokenBusy=false, cameraMode="follow", lastRoute=null, simTime=0, lastDt=0; 
 try {
 const viewer=new Cesium.Viewer('globe',{
  baseLayer:false,baseLayerPicker:false,geocoder:false,animation:false,timeline:false,
  homeButton:false,sceneModePicker:false,navigationHelpButton:false,fullscreenButton:false,
  infoBox:false,selectionIndicator:false,terrainProvider:new Cesium.EllipsoidTerrainProvider()
 });
 // Daylight everywhere makes the surface easier to see during this teaching demo.
 viewer.scene.globe.enableLighting=false;
 Cesium.TileMapServiceImageryProvider.fromUrl(Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')).then(provider=>{viewer.imageryLayers.addImageryProvider(provider,0);}).catch(()=>{if(!layer)$('imagery-status').textContent='Overview map failed to load. Check CDN access or add a Cesium ion token.';});
 const pos=()=>Cesium.Cartesian3.fromDegrees(state.lon,state.lat,state.height);
 const planeSvg='<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path d="M32 3 L37 24 L57 37 L57 43 L37 36 L36 51 L43 57 L43 61 L32 57 L21 61 L21 57 L28 51 L27 36 L7 43 L7 37 L27 24 Z" fill="#ffd166" stroke="#172638" stroke-width="2"/></svg>';
 viewer.entities.add({position:new Cesium.CallbackProperty(pos,false),billboard:{image:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(planeSvg),width:42,height:42,alignedAxis:Cesium.Cartesian3.UNIT_Z,rotation:new Cesium.CallbackProperty(()=>-Cesium.Math.toRadians(state.heading),false),disableDepthTestDistance:Number.POSITIVE_INFINITY},label:{text:'SIMULATED FLIGHT',font:'12px sans-serif',pixelOffset:new Cesium.Cartesian2(0,-35),showBackground:true}});
 const descriptions={tokyo:'Japan’s capital: start your city exploration here.',kyoto:'A historic city known for temples and traditional districts.',osaka:'Explore a major city in Japan’s Kansai region.',hiroshima:'Visit the Hiroshima city reference in western Japan.',fukuoka:'Head to Fukuoka on the island of Kyushu.',okinawa:'Jump south to Naha on Okinawa Island.',sapporo:'Head north to Sapporo on Hokkaido.'};

 for(const p of PLACES){
  for(const id of ['origin','destination']){const o=document.createElement('option');o.value=p.id;o.textContent=p.name;$(id).appendChild(o);}
  if(p.id!=='reading'){
   const card=document.createElement('article');card.className='city-card';
   const title=document.createElement('h3');title.textContent=p.name;card.appendChild(title);
   const desc=document.createElement('p');desc.textContent=descriptions[p.id];card.appendChild(desc);
   const visit=document.createElement('button');visit.textContent='Visit instantly';visit.onclick=()=>{jump(p);$('origin').value='current';};card.appendChild(visit);
   const fly=document.createElement('button');fly.textContent='Fly here';fly.onclick=()=>{clearRoute();$('origin').value='current';$('destination').value=p.id;begin(p);};card.appendChild(fly);
   $('quick-jumps').appendChild(card);
  }
  viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(p.lon,p.lat,0),point:{pixelSize:8,color:Cesium.Color.CYAN},label:{text:p.name,font:'13px sans-serif',pixelOffset:new Cesium.Cartesian2(0,18),showBackground:true,distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0,4000000)}});
 }
 $('destination').value='tokyo';$('origin').value='current';
 let trail=null, completedTrail=null, completedPositions=[];
 function camera(range=18000){
  if(cameraMode==='overview'){
   const r=route||lastRoute;if(r){const pts=[];for(let i=0;i<=40;i++){const c=r.line.interpolateUsingFraction(i/40);pts.push(Cesium.Cartesian3.fromRadians(c.longitude,c.latitude,0));}viewer.camera.viewBoundingSphere(Cesium.BoundingSphere.fromPoints(pts),new Cesium.HeadingPitchRange(0,-Math.PI/2,0));viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);return;}
  }
  // Explicit look-at and downward pitch avoid an inherited view into space.
  viewer.camera.lookAt(pos(),new Cesium.HeadingPitchRange(cameraMode==='follow'?Cesium.Math.toRadians(state.heading):0,Cesium.Math.toRadians(cameraMode==='top'?-90:-70),range));
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
 }
 function paint(){
  $('message').textContent=route?`${state.paused?'Paused':'Flying'} → ${route.name} · ${Math.round(route.elapsed/route.duration*100)}%`:state.paused?'Paused — choose a destination or inspect a step':'Manual flight — simulated movement';
  $('readout').textContent=`Longitude ${state.lon.toFixed(5)} · Latitude ${state.lat.toFixed(5)} · Height ${state.height.toFixed(0)} m · Heading ${state.heading.toFixed(0)}° · Manual speed ${state.speed.toFixed(0)} m/s`;
  $('step').disabled=!!route;
  const r=route||lastRoute, fraction=route?route.elapsed/route.duration:lastRoute?1:0;
  $('route-label').textContent=r?`${r.departure} → ${r.name}`:'Choose your next destination';
  $('progress').value=fraction*100;$('progress-label').textContent=`${Math.round(fraction*100)}% complete`;
  $('remaining').textContent=r?`${(r.line.surfaceDistance*(1-fraction)/1000).toFixed(1)} km remaining`:'No active route';
  $('eta').textContent=route?`${((route.duration-route.elapsed)/Number($('rate').value)).toFixed(1)} s animation remaining`:'Ready to explore';
  $('learning').textContent=`Simulation time: ${simTime.toFixed(2)} s · Last update dt: ${lastDt.toFixed(3)} s. ${route?'Route mode: progress = elapsed / duration; position follows an ellipsoid geodesic. Playback rate scales elapsed time.':`Manual mode: distance = ${state.speed} m/s × ${lastDt.toFixed(3)} s = ${(state.speed*lastDt).toFixed(2)} m per update.`}`;
  $('skip').disabled=!route;
 }
 function clearRoute(){route=null;lastRoute=null;queue=[];if(completedTrail){viewer.entities.remove(completedTrail);completedTrail=null;}completedPositions=[];if(trail){viewer.entities.remove(trail);trail=null;}}
 function jump(p){clearRoute();state={...state,lon:p.lon,lat:p.lat,height:500,paused:true};$('height').value=500;paint();camera();}
 function begin(p){
  if(Math.abs(state.lon-p.lon)<1e-7&&Math.abs(state.lat-p.lat)<1e-7){state.paused=true;camera();paint();return;}
  const line=new Cesium.EllipsoidGeodesic(Cesium.Cartographic.fromDegrees(state.lon,state.lat),Cesium.Cartographic.fromDegrees(p.lon,p.lat));
  const departure=PLACES.find(p=>Math.abs(p.lon-state.lon)<.005&&Math.abs(p.lat-state.lat)<.005)?.name||'Current position';
  route={line,departure,name:p.name,target:p,elapsed:0,duration:Number($('duration').value),startHeight:state.height};state.paused=false;
  if(trail)viewer.entities.remove(trail);
  const positions=[];for(let i=0;i<=80;i++){const c=line.interpolateUsingFraction(i/80);positions.push(Cesium.Cartesian3.fromRadians(c.longitude,c.latitude,1000));}
  if(completedTrail)viewer.entities.remove(completedTrail);
  completedPositions=[];completedTrail=viewer.entities.add({polyline:{positions:new Cesium.CallbackProperty(()=>completedPositions,false),width:5,material:Cesium.Color.GOLD}});
  trail=viewer.entities.add({polyline:{positions,width:3,material:Cesium.Color.CYAN}});paint();
 }
 function arrive(){if(!route)return;lastRoute=route;state.lon=route.target.lon;state.lat=route.target.lat;state.height=500;completedPositions=[];for(let i=0;i<=80;i++){const c=route.line.interpolateUsingFraction(i/80);completedPositions.push(Cesium.Cartesian3.fromRadians(c.longitude,c.latitude,1100));}route=null;state.paused=true;camera();paint();if(queue.length)begin(queue.shift());}
 $('skip').onclick=()=>{queue=[];arrive();};
 for(const mode of ['follow','top','overview'])$('camera-'+mode).onclick=()=>{cameraMode=mode;camera();};
 $('go').onclick=()=>{clearRoute();if($('origin').value!=='current')jump(PLACES.find(p=>p.id===$('origin').value));begin(PLACES.find(p=>p.id===$('destination').value));};
 $('tour').onclick=()=>{
  clearRoute();state={...Flight.initial(),lon:PLACES[0].lon,lat:PLACES[0].lat};
  queue=PLACES.slice(1);begin(queue.shift());camera();
 };
 $('fly').onclick=()=>{state.paused=false;paint();};
 $('pause').onclick=()=>{state.paused=true;paint();};
 $('step').onclick=()=>{if(route)return;state=Flight.singleStep(state);lastDt=.1;simTime+=.1;paint();camera();};
 for(const [id,delta] of [['left',-10],['right',10]])$(id).onclick=()=>{clearRoute();state.heading=Flight.wrap(state.heading+delta);paint();camera();};
 $('reset').onclick=()=>{clearRoute();state=Flight.initial();simTime=0;lastDt=0;$('speed').value=state.speed;$('height').value=state.height;paint();camera();};
 $('recenter').onclick=()=>camera(route?Math.max(18000,route.line.surfaceDistance*.35):18000);
 for(const [id,min,max] of [['speed',0,250],['height',50,5000]])$(id).onchange=()=>{clearRoute();const n=Number($(id).value);if(Number.isFinite(n))state[id]=Flight.clamp(n,min,max);$(id).value=state[id];paint();camera();};
 async function useToken(token){
  if(tokenBusy)return;
  token=token.trim();if(!token){$('imagery-status').textContent='Paste a Cesium ion token first. The overview map works without one.';return;}
  tokenBusy=true;$('apply-token').disabled=true;$('clear-token').disabled=true;$('imagery-status').textContent='Connecting to Cesium ion…';
  try{
   Cesium.Ion.defaultAccessToken=token;
   const provider=await Cesium.createWorldImageryAsync({style:Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS});
   const next=viewer.imageryLayers.addImageryProvider(provider);
   provider.errorEvent.addEventListener(()=>{$('imagery-status').textContent='Imagery tile request failed. Check token permissions, allowed URLs, and network access.';});
   if(layer)viewer.imageryLayers.remove(layer,true);layer=next;
   $('imagery-status').textContent='Cesium ion imagery connected. Satellite tiles load as you explore.';
  }catch(e){$('imagery-status').textContent='Could not load ion imagery. Check your token and World Imagery access. Overview map remains available.';}
  finally{tokenBusy=false;$('apply-token').disabled=false;$('clear-token').disabled=false;}
 }
 $('apply-token').onclick=()=>useToken($('token').value);
 $('clear-token').onclick=()=>{if(tokenBusy)return;$('token').value='';Cesium.Ion.defaultAccessToken='';if(layer){viewer.imageryLayers.remove(layer,true);layer=null;}$('imagery-status').textContent='Using the no-token overview map.';};
 document.addEventListener('visibilitychange',()=>{if(document.hidden){state.paused=true;paint();}});
 let last=performance.now(),lastPaint=0;
 viewer.scene.preRender.addEventListener(()=>{
  const now=performance.now(),dt=Math.max(0,Math.min((now-last)/1000,.1));last=now;
  if(route&&!state.paused){
   route.elapsed=Math.min(route.duration,route.elapsed+dt*Number($('rate').value));const t=route.elapsed/route.duration;
   lastDt=dt*Number($('rate').value);simTime+=lastDt;
   const c=route.line.interpolateUsingFraction(t);
   const next=route.line.interpolateUsingFraction(Math.min(1,t+.0001));
   if(t<1){const delta=next.longitude-c.longitude;state.heading=Flight.wrap(Cesium.Math.toDegrees(Math.atan2(Math.sin(delta)*Math.cos(next.latitude),Math.cos(c.latitude)*Math.sin(next.latitude)-Math.sin(c.latitude)*Math.cos(next.latitude)*Math.cos(delta))));}
   completedPositions=[];for(let i=0;i<=40;i++){const v=route.line.interpolateUsingFraction(t*i/40);completedPositions.push(Cesium.Cartesian3.fromRadians(v.longitude,v.latitude,1100));}
   state.lon=Cesium.Math.toDegrees(c.longitude);state.lat=Cesium.Math.toDegrees(c.latitude);
   state.height=(1-t)*route.startHeight+t*500+Math.sin(Math.PI*t)*Math.min(120000,route.line.surfaceDistance*.025);
   camera(18000+Math.sin(Math.PI*t)*Math.min(5500000,route.line.surfaceDistance*.5));
   if(t>=1)arrive();
  }else if(!route){if(!state.paused){lastDt=dt;simTime+=dt;}state=Flight.step(state,dt);if(!state.paused)camera();}
  if(now-lastPaint>150){paint();lastPaint=now;}
 });
 paint();camera();
 const configured=window.FLIGHT_CONFIG?.cesiumToken?.trim();if(configured)useToken(configured);
 }catch(e){$('message').textContent='Globe could not start. Check WebGL and the browser console.';console.error(e);}
})();
