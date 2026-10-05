// Node integration checks with real Cesium geodesic math and mocked rendering/network.
// Usage: node verify-japan.cjs /absolute/path/to/Cesium.js (version 1.145)
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx=vm.createContext({console,URL,TextDecoder,TextEncoder,atob,btoa,setTimeout,clearTimeout,TransformStream,ReadableStream,WritableStream,AbortController});ctx.global=ctx;
vm.runInContext(fs.readFileSync(process.argv[2],'utf8'),ctx);
const real=ctx.Cesium;assert.equal(real.VERSION,'1.145.0');
const elements={};function el(id){return elements[id]??={value:'',textContent:'',disabled:false,children:[],appendChild(x){this.children.push(x)}};}
el('duration').value='12';el('rate').value='1';let frame,now=0,cameraCalls=0,usedToken;
const layers=[];
ctx.document={getElementById:el,createElement:()=>({children:[],appendChild(x){this.children.push(x)}}),addEventListener(){}};
ctx.performance={now:()=>now};ctx.window={FLIGHT_CONFIG:{cesiumToken:''}};
ctx.Cesium={...real,Viewer:class{constructor(){this.scene={globe:{},preRender:{addEventListener:f=>frame=f}};this.camera={lookAt(){cameraCalls++},viewBoundingSphere(){cameraCalls++},lookAtTransform(){}};this.entities={add:x=>x,remove(){}};this.imageryLayers={addImageryProvider(p){layers.push(p);return p},remove(p){layers.splice(layers.indexOf(p),1)}};}},buildModuleUrl:x=>x,TileMapServiceImageryProvider:{fromUrl:async()=>({fallback:true})},createWorldImageryAsync:async()=>{usedToken=ctx.Cesium.Ion.defaultAccessToken;return {errorEvent:{addEventListener(){}}}}};
for(const file of ['flight-core.js','places.js','app.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),ctx);
function tick(n){for(let i=0;i<n;i++){now+=100;frame();}}
(async()=>{
assert(cameraCalls>0);assert.equal(el('destination').value,'tokyo');console.log('PASS startup camera and Tokyo selection');
el('tour').onclick();tick(20);el('pause').onclick();const paused=el('readout').textContent;tick(10);assert.equal(el('readout').textContent,paused);console.log('PASS route pauses without advancing');
el('fly').onclick();tick(1000);assert(el('readout').textContent.includes('141.35450'));assert(el('readout').textContent.includes('43.06180'));assert(el('message').textContent.startsWith('Paused'));console.log('PASS all seven legs arrive at Sapporo and pause (real Cesium geodesics)');
el('reset').onclick();assert(el('readout').textContent.includes('-75.93000'));console.log('PASS Reset restores starter origin');
el('quick-jumps').children[1].children[2].onclick();assert(el('readout').textContent.includes('135.76810'));assert(el('message').textContent.startsWith('Paused'));console.log('PASS instant Kyoto jump pauses and cancels route');
el('origin').value='osaka';el('destination').value='okinawa';el('go').onclick();assert(el('readout').textContent.includes('135.50230'));tick(130);assert(el('readout').textContent.includes('127.68090'));console.log('PASS selected Osaka to Okinawa route');
el('origin').value='okinawa';el('go').onclick();assert(el('message').textContent.startsWith('Paused'));console.log('PASS identical start and end stays paused');
el('origin').value='osaka';el('destination').value='tokyo';el('go').onclick();el('rate').value='5';tick(12);assert(el('progress').value>40&&el('progress').value<60);console.log('PASS 5x playback advances approximately half a 12-second leg in 1.2 seconds');
el('camera-overview').onclick();el('camera-top').onclick();el('camera-follow').onclick();console.log('PASS camera mode handlers');
el('skip').onclick();assert(el('readout').textContent.includes('139.69170'));assert.equal(el('progress').value,100);assert(el('remaining').textContent.startsWith('0.0'));assert(el('skip').disabled);console.log('PASS skip arrives in Tokyo with complete dashboard');
el('quick-jumps').children[2].children[3].onclick();assert(el('message').textContent.includes('Osaka'));console.log('PASS destination card Fly here starts route');
el('token').value='test-placeholder';el('apply-token').onclick();await new Promise(r=>setImmediate(r));assert.equal(usedToken,'test-placeholder');assert(el('imagery-status').textContent.includes('connected'));el('clear-token').onclick();assert.equal(ctx.Cesium.Ion.defaultAccessToken,'');console.log('PASS token passed to imagery request and cleared (mock network; not live authentication)');
})().catch(e=>{console.error(e.message);process.exitCode=1});
