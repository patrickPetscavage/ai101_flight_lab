/* Deterministic camera tour: regional overview -> five landmarks -> next region.
   Clock-driven, so pausing/tab hiding freezes both travel and reading time. */
(function(root){
 function create({Cesium:C,regions,onFrame,onCard,onEnd=()=>{}}){
  let steps=[],index=-1,active=false,paused=false,phase='idle',elapsed=0,hold=10;
  let current={lon:0,lat:0,altitude:22000000},start=current,line=null,travelSeconds=5;
  function build(selected){return selected.flatMap(region=>[
   {...region,kind:'region',regionId:region.id,regionTitle:region.title,landmarkNumber:0},
   ...region.stops.map((stop,i)=>({...stop,kind:'landmark',regionId:region.id,regionTitle:region.title,area:region.area,landmarkNumber:i+1}))
  ]);}
  function emit(){onCard({active,paused,phase,index,total:steps.length,step:steps[index],elapsed,hold,completed:phase==='complete'});}
  function move(to){
   index=to;elapsed=0;phase='moving';start={...current};
   const target=steps[index];
   const same=Math.abs(start.lon-target.lon)<1e-9&&Math.abs(start.lat-target.lat)<1e-9;
   line=same?null:new C.EllipsoidGeodesic(C.Cartographic.fromDegrees(start.lon,start.lat),C.Cartographic.fromDegrees(target.lon,target.lat));
   travelSeconds=target.kind==='region'?7:4;
   emit();
  }
  function next(){if(!active)return;if(index+1>=steps.length){active=false;paused=true;phase='complete';emit();onEnd();}else move(index+1);}
  return {
   get active(){return active;},get paused(){return paused;},get phase(){return phase;},get index(){return index;},get step(){return steps[index];},get total(){return steps.length;},
   start(regionId,position,readingSeconds=10){
    const selected=regionId?regions.filter(r=>r.id===regionId):regions;
    if(!selected.length)throw Error('Unknown tour region');
    steps=build(selected);current={...position};hold=Math.max(5,Number(readingSeconds)||10);active=true;paused=false;move(0);
   },
   stop(){active=false;paused=true;phase='idle';steps=[];index=-1;emit();},
   pause(){if(active){paused=true;emit();}},resume(){if(active){paused=false;emit();}},
   previous(){if(active)move(Math.max(0,index-1));},next,
   tick(dt,rate=1){
    if(!active||paused||dt<=0)return;
    const target=steps[index];
    if(phase==='moving'){
     elapsed=Math.min(travelSeconds,elapsed+dt*Math.max(1,rate));const t=elapsed/travelSeconds,ease=.5-.5*Math.cos(Math.PI*t);
     const c=line?line.interpolateUsingFraction(ease):C.Cartographic.fromDegrees(target.lon,target.lat);
     const arc=Math.sin(Math.PI*t)*Math.min(6500000,(line?.surfaceDistance||0)*.5);
     current={lon:((C.Math.toDegrees(c.longitude)+180)%360+360)%360-180,lat:C.Math.toDegrees(c.latitude),altitude:start.altitude+(target.altitude-start.altitude)*ease+arc};
     if(t>=1)current={lon:target.lon,lat:target.lat,altitude:target.altitude};
     onFrame(current);
     if(t>=1){phase='reading';elapsed=0;emit();}
    }else{
     elapsed+=dt; // Reading time stays readable at 2x and 5x playback.
     if(elapsed>=(target.kind==='region'?3:hold)){next();}
    }
   }
  };
 }
 root.GuidedTour={create};if(typeof module!=='undefined')module.exports={create};
})(globalThis);
