// Approximate city reference points, not airports or verified campus/landmark pins.
// Map links let students inspect each coordinate before making location claims.
(function(root){
const places = [
 {id:'reading',name:'Reading, Pennsylvania',lon:-75.9269,lat:40.3356},
 {id:'tokyo',name:'Tokyo',lon:139.6917,lat:35.6895},
 {id:'kyoto',name:'Kyoto',lon:135.7681,lat:35.0116},
 {id:'osaka',name:'Osaka',lon:135.5023,lat:34.6937},
 {id:'hiroshima',name:'Hiroshima',lon:132.4553,lat:34.3853},
 {id:'fukuoka',name:'Fukuoka',lon:130.4017,lat:33.5904},
 {id:'okinawa',name:'Naha, Okinawa',lon:127.6809,lat:26.2124},
 {id:'sapporo',name:'Sapporo',lon:141.3545,lat:43.0618}
].map(p=>({...p,source:`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=11/${p.lat}/${p.lon}`,verification:'Approximate city reference; exact landmark not verified'}));
root.PLACES=places;
if(typeof module!=='undefined')module.exports=places;
})(globalThis);
