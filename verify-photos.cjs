// DOM/interaction tests; Cesium geometry is real, projection/rendering is mocked.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx=vm.createContext({console,URL,TextDecoder,TextEncoder,atob,btoa,setTimeout,clearTimeout,TransformStream,ReadableStream,WritableStream,AbortController});
ctx.global=ctx;vm.runInContext(fs.readFileSync(process.argv[2],'utf8'),ctx);const C=ctx.Cesium;
class Element{constructor(){this.children=[];this.style={};this.checked=true;this.classList={add(){}};this.events={};}appendChild(x){this.children.push(x);}setAttribute(k,v){this[k]=v;}addEventListener(k,f){this.events[k]=f;}focus(){document.activeElement=this;}showModal(){this.open=true;}close(){this.open=false;}}
const elements={};global.document={getElementById:id=>elements[id]??=new Element(),createElement:()=>new Element()};const el=document.getElementById;
const regions=require('./landmarks.js'),photos=require('./photos.js'),PhotoMap=require('./photo-map.js');
assert.equal(photos.length,7);assert.equal(new Set(photos.map(p=>p.id.split('-')[0])).size,7);
for(const p of photos){assert(regions.some(r=>r.stops.some(s=>s.id===p.id)));assert(p.source&&p.author&&p.license&&p.date);assert(p.image.startsWith('https://'));}
let paused=0,located,render;
const viewer={camera:{positionWC:C.Cartesian3.fromDegrees(139.7967,35.7148,18000)},scene:{canvas:{getBoundingClientRect:()=>({left:0,top:0,width:1200,height:800})},postRender:{addEventListener:f=>render=f}}};
const testC={...C,SceneTransforms:{worldToWindowCoordinates:()=>({x:600,y:400})}};
const map=PhotoMap.mount({Cesium:testC,viewer,regions,photos,onOpen:()=>paused++,onLocate:s=>located=s});
assert.equal(map.markers.length,7);assert.equal(el('photo-list').children.length,7);render();assert.equal(map.markers.filter(m=>!m.button.hidden).length,1);console.log('PASS seven linked photos and near-region projection');
map.markers[0].button.onclick();assert.equal(paused,1);assert(el('photo-dialog').open);assert.equal(el('photo-title').textContent,regions[0].stops[0].title);assert.equal(el('photo-description').textContent,regions[0].stops[0].description);assert.equal(document.activeElement,el('photo-close'));console.log('PASS marker opens correct description and pauses travel');
el('photo-large').onerror();assert(el('photo-large').hidden);assert(!el('photo-error').hidden);assert(el('photo-description').textContent);console.log('PASS unavailable image retains blurb and source');
el('photo-dialog').events.cancel({preventDefault(){}});assert(!el('photo-dialog').open);assert.equal(document.activeElement,map.markers[0].button);console.log('PASS Escape closes dialog and restores focus');
el('photo-list').children[5].onclick();assert(el('photo-date').textContent.includes('historical'));assert(!el('photo-large').hidden);el('photo-locate').onclick();assert.equal(located.id,'okinawa-2');assert(!el('photo-dialog').open);console.log('PASS list selection resets image and locate selects exact landmark');
el('photo-toggle').checked=false;render();assert(map.markers.every(m=>m.button.hidden));el('photo-toggle').checked=true;viewer.camera.positionWC=C.Cartesian3.fromDegrees(-40,-35,18000);render();assert(map.markers.every(m=>m.button.hidden));console.log('PASS toggle and distant/backside globe positions hide markers');
