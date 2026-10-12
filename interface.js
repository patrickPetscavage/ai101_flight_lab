/* Layout controls; no Cesium or credentials required. */
(() => {
 const button=document.getElementById('toggle-panel'),panel=document.getElementById('control-panel');
 button.onclick=()=>{const open=button.getAttribute('aria-expanded')==='true';panel.hidden=open;button.setAttribute('aria-expanded',String(!open));button.textContent=open?'Show controls':'Hide controls';};
 document.getElementById('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.getElementById('message').textContent='Browser full screen is unavailable. The map still fills this window.';}};
 document.addEventListener('fullscreenchange',()=>{document.getElementById('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
 if(window.matchMedia('(max-width: 700px)').matches){panel.hidden=true;button.setAttribute('aria-expanded','false');button.textContent='Show controls';}
})();
