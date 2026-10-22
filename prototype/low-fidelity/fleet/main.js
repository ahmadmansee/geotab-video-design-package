// Illustrative fleet data for a layout study, not live product data.
const vehicles=[
  {id:'V-219',driver:'Ahmad Mansee',online:false,last:'8:14 AM',attention:true},
  {id:'V-2124',driver:'Rami Massad',online:false,last:'12:00 AM',attention:true},
  {id:'V-112',driver:'Elliot Brooks',online:true,last:'9:40 AM'},
  {id:'V-204',driver:'Nina Torres',online:true,last:'9:39 AM'},
  {id:'V-318',driver:'Marco Silva',online:true,last:'9:38 AM'}
];
const drivers=[
  {name:'Elliot Brooks',vehicle:'V-112',score:61,status:'High risk',trend:'Declining',change:'Down 7 points',attention:true,points:'25,20 75,29 125,47 175,45 225,72 275,82',behaviors:[['Close following','8 events'],['Hard braking','4 events']]},
  {name:'Marco Silva',vehicle:'V-318',score:73,status:'Monitor',trend:'Unchanged',change:'Within 1 point',attention:true,points:'25,48 75,50 125,45 175,51 225,49 275,50',behaviors:[['Close following','4 events'],['Phone use','2 events']]},
  {name:'Nina Torres',vehicle:'V-204',score:78,status:'Improving',trend:'Improving',change:'Up 5 points',points:'25,79 75,67 125,59 175,51 225,37 275,27',behaviors:[['Phone use','3 events'],['Hard braking','2 events']]},
  {name:'Amelia Chen',vehicle:'V-241',score:85,status:'Improving',trend:'Improving',change:'Up 4 points',points:'25,70 75,65 125,54 175,47 225,35 275,26',behaviors:[['Fatigue','1 event'],['Hard braking','1 event']]}
];
const state={tab:'vehicles',screen:'overview',selected:null,videoRequested:false,history:[]};
const $=s=>document.querySelector(s);
const vehicleIcon='<img src="../../high-fidelity/home/assets/imgTruck.svg" alt="" />';
function vehicleCard(v){return `<button class="attention-card" type="button" data-vehicle="${v.id}"><span class="card-band"></span><span class="card-emblem">${vehicleIcon}</span><span class="card-badge">Offline</span><strong>Vehicle ${v.id}</strong><small>${v.driver}</small><span class="card-meta">Last connected ${v.last}</span></button>`;}
function driverCard(d){return `<button class="attention-card" type="button" data-driver="${d.name}"><span class="card-band"></span><span class="card-emblem">${d.name.split(' ').map(w=>w[0]).join('')}</span><span class="card-badge">${d.status}</span><strong>${d.name}</strong><small>Score ${d.score} · ${d.trend}</small><span class="card-meta">${d.behaviors[0][1]} · ${d.behaviors[0][0]}</span></button>`;}
function vehicleRow(v){return `<button class="entity-row" type="button" data-vehicle="${v.id}"><span class="row-icon round">${vehicleIcon}</span><span class="row-copy"><strong>Vehicle ${v.id}</strong><small>${v.driver}</small></span><span class="row-right"><span class="row-tag">${v.online?'Online':'Offline'}</span><small>${v.online?'Updated':'Last seen'} ${v.last}</small></span><span class="chevron" aria-hidden="true"></span></button>`;}
function driverRow(d){return `<button class="entity-row" type="button" data-driver="${d.name}"><span class="row-icon round">${d.name.split(' ').map(w=>w[0]).join('')}</span><span class="row-copy"><strong>${d.name}</strong><small>Vehicle ${d.vehicle}</small></span><span class="row-right"><span class="row-tag">Score ${d.score}</span><small>${d.trend}</small></span><span class="chevron" aria-hidden="true"></span></button>`;}
function render(){
  const overview=state.screen==='overview',all=state.screen==='all',vehicle=state.screen==='vehicle',driver=state.screen==='driver';
  $('#content').classList.toggle('detail-mode',vehicle||driver);
  $('#fleet-tabs').hidden=!overview;
  $('#vehicles-view').hidden=!overview||state.tab!=='vehicles';$('#drivers-view').hidden=!overview||state.tab!=='drivers';
  $('#all-view').hidden=!all;$('#vehicle-detail').hidden=!vehicle;$('#driver-detail').hidden=!driver;
  $('#back-button').hidden=overview;
  $('#contact-button').hidden=!driver;
  $('#back-button').setAttribute('aria-label',state.history.at(-1)?.screen==='vehicle'?'Back to vehicle':'Back to Fleet');
  $('#screen-title').textContent=overview||all?'Fleet':vehicle?'Vehicle detail':'Driver profile';
  for(const tab of ['vehicles','drivers']){$(`#${tab}-tab`).classList.toggle('active',state.tab===tab);$(`#${tab}-tab`).setAttribute('aria-selected',state.tab===tab);}
  $('#vehicle-attention').innerHTML=vehicles.filter(v=>v.attention).map(vehicleCard).join('');
  $('#driver-attention').innerHTML=drivers.filter(d=>d.attention).map(driverCard).join('');
  $('#vehicle-preview').innerHTML=vehicles.filter(v=>!v.attention).map(vehicleRow).join('');
  $('#driver-preview').innerHTML=drivers.filter(d=>!d.attention).map(driverRow).join('');
  if(all){const items=state.tab==='vehicles'?vehicles:drivers;$('#all-title').textContent=`All ${state.tab}`;$('#all-count').textContent=`${items.length} ${state.tab}`;$('#all-list').innerHTML=items.map(state.tab==='vehicles'?vehicleRow:driverRow).join('');}
  if(vehicle)renderVehicle();if(driver)renderDriver();
}
function renderVehicle(){const v=vehicles.find(x=>x.id===state.selected);if(!v)return;
  $('#vehicle-name').textContent=`Vehicle ${v.id}`;$('#vehicle-driver').textContent=v.driver;
  $('#vehicle-status').textContent=v.online?'Online':'Offline';$('#vehicle-status').classList.toggle('offline',!v.online);
  $('#vehicle-camera').textContent=v.online?'Camera connected':'Camera offline';$('#vehicle-last-seen').textContent=`${v.online?'Updated':'Last connected'} ${v.last}`;
  $('#location-sheet-status').textContent=`${v.online?'Latest position':'Last known position'} · ${v.last}`;
  $('#map-label').textContent=`${v.online?'Location updated':'Last known location'} · ${v.last}`;
  $('#video-description').textContent=!v.online?'Live video unavailable.':state.videoRequested?'Connecting to live video…':'';
  $('#video-button').textContent=state.videoRequested?'Cancel':'View live';$('#video-button').disabled=!v.online;
  $('#live-shortcut').disabled=!v.online;$('#driver-shortcut').disabled=!drivers.some(d=>d.name===v.driver);
}
function renderDriver(){const d=drivers.find(x=>x.name===state.selected);if(!d)return;
  $('#driver-initials').textContent=d.name.split(' ').map(w=>w[0]).join('');$('#driver-name').textContent=d.name;$('#driver-vehicle').textContent=`Vehicle ${d.vehicle}`;
  $('#driver-score').textContent=d.score;
  $('#driver-trend-tag').textContent=d.trend;$('#trend-line').setAttribute('points',d.points);
  $('#trend-caption').textContent=d.change;
  $('#driver-top-behaviors').innerHTML=d.behaviors.map(([name])=>`<span>${name}</span>`).join('');
  $('#behavior-list').innerHTML=d.behaviors.map(([name,count])=>`<div><strong>${name}</strong><span>${count}</span></div>`).join('');
}
function openDetail(type,value){showVehicleSheet(false);showDriverSheet(false);state.history.push({screen:state.screen,selected:state.selected});state.screen=type;state.selected=value;state.videoRequested=false;render();$('#content').scrollTop=0;}
$('#vehicles-tab').addEventListener('click',()=>{state.tab='vehicles';render();$('#content').scrollTop=0;});
$('#drivers-tab').addEventListener('click',()=>{state.tab='drivers';render();$('#content').scrollTop=0;});
$('#back-button').addEventListener('click',()=>{showVehicleSheet(false);showDriverSheet(false);const previous=state.history.pop()||{screen:'overview',selected:null};state.screen=previous.screen;state.selected=previous.selected;render();$('#content').scrollTop=0;});
$('#content').addEventListener('click',event=>{const all=event.target.closest('[data-all]');if(all){state.history.push({screen:state.screen,selected:state.selected});state.tab=all.dataset.all;state.screen='all';render();$('#content').scrollTop=0;return;}const vehicle=event.target.closest('[data-vehicle]');if(vehicle){openDetail('vehicle',vehicle.dataset.vehicle);return;}const driver=event.target.closest('[data-driver]');if(driver)openDetail('driver',driver.dataset.driver);});
$('#video-button').addEventListener('click',()=>{state.videoRequested=!state.videoRequested;renderVehicle();});
$('#live-shortcut').addEventListener('click',()=>{state.videoRequested=!state.videoRequested;renderVehicle();});
$('#map-shortcut').addEventListener('click',()=>showVehicleSheet(true));
$('#driver-shortcut').addEventListener('click',()=>{const v=vehicles.find(x=>x.id===state.selected);if(v&&drivers.some(d=>d.name===v.driver))openDetail('driver',v.driver);});
function showVehicleSheet(show){$('#vehicle-location-sheet').hidden=!show;$('#vehicle-sheet-backdrop').hidden=!show;}
$('#vehicle-sheet-close').addEventListener('click',()=>showVehicleSheet(false));
$('#vehicle-sheet-backdrop').addEventListener('click',()=>showVehicleSheet(false));
function showDriverSheet(show,mode='behaviors'){$('#driver-sheet').hidden=!show;$('#driver-sheet-backdrop').hidden=!show;$('#driver-sheet').classList.toggle('contact-only',mode==='contact');$('#driver-sheet-title').textContent=mode==='contact'?'Contact driver':mode==='trend'?'Safety trend':'Behavior details';$('#sheet-trend').hidden=mode!=='trend';$('#sheet-behaviors').hidden=mode!=='behaviors';$('#sheet-contact').hidden=mode!=='contact';}
$('#driver-trend-button').addEventListener('click',()=>showDriverSheet(true,'trend'));
$('#driver-details-button').addEventListener('click',()=>showDriverSheet(true,'behaviors'));
$('#contact-button').addEventListener('click',()=>showDriverSheet(true,'contact'));
$('#driver-sheet-close').addEventListener('click',()=>showDriverSheet(false));
$('#driver-sheet-backdrop').addEventListener('click',()=>showDriverSheet(false));
render();

const requested=new URLSearchParams(location.search);
if(requested.has('vehicle')&&vehicles.some(v=>v.id===requested.get('vehicle'))){openDetail('vehicle',requested.get('vehicle'));}
else if(requested.has('driver')&&drivers.some(d=>d.name===requested.get('driver'))){state.tab='drivers';openDetail('driver',requested.get('driver'));}
