// Illustrative data for testing a high-volume feed. No event count here represents live fleet data.
const asset = '../home/assets/';
const priorityEvents = [
  { id:'elliot-following', behavior:'Close Following', driver:'Elliot Brooks', vehicle:'V-112', time:'9:18 AM', priority:'High priority', still:asset+'imgImage5283.png', featured:true },
  { id:'nina-phone', behavior:'Phone Use', driver:'Nina Torres', vehicle:'V-204', time:'8:54 AM', priority:'Medium priority', still:asset+'imgImage5284.png', featured:true },
  { id:'marco-following', behavior:'Close Following', driver:'Marco Silva', vehicle:'V-318', time:'8:17 AM', priority:'Medium priority', still:asset+'imgImage5285.png', featured:true }
];
const drivers = [
  ['Elliot Brooks','V-112'],['Nina Torres','V-204'],['Marco Silva','V-318'],
  ['Amelia Chen','V-241'],['Daniel Price','V-176'],['Sara Khan','V-309']
];
const behaviors = ['Hard Braking','Close Following','Phone Use','Fatigue'];
function formatTime(minutes){const hour=Math.floor(minutes/60);return `${hour>12?hour-12:hour}:${String(minutes%60).padStart(2,'0')} ${hour>=12?'PM':'AM'}`;}
const additionalEvents = Array.from({length:244},(_,i)=>{
  const [driver,vehicle]=drivers[i%drivers.length];
  return {id:`sample-${i}`,behavior:behaviors[i%behaviors.length],driver,vehicle,time:formatTime(7*60+48-i)};
});
const events=[...priorityEvents,...additionalEvents];
const state={driver:'All',behavior:'All',filterType:null,draft:'All',view:'overview',visibleCount:12};
const content=document.querySelector('#events-content');
const filterSheet=document.querySelector('#filter-sheet');
const scrim=document.querySelector('#scrim');
const detail=document.querySelector('#detail');
const playIcon=asset+'imgPlay.svg';
const ellipsisIcon=asset+'imgEllipsis.svg';

function reviewCard(event,kind){
  const isFeature=kind==='feature';
  const priorityClass=event.priority.startsWith('High')?'high':'medium';
  const controls=`<div class="card-controls"><span class="circle-button ${isFeature?'play':'more'}"><img src="${isFeature?playIcon:ellipsisIcon}" alt="" /></span><span class="circle-button ${isFeature?'more':'play'}"><img src="${isFeature?ellipsisIcon:playIcon}" alt="" /></span></div>`;
  const photo=`<img class="event-still" src="${event.still}" alt="" />`;
  if(isFeature)return `<article class="event-card feature" role="button" tabindex="0" data-event="${event.id}" aria-label="${event.behavior}, ${event.driver}, ${event.priority}"><div class="event-band"></div>${photo}${controls}<div class="feature-copy"><div><h2>${event.behavior}</h2><p>${event.driver} · Vehicle ${event.vehicle}</p></div><span class="badge ${priorityClass}">${event.priority}</span></div></article>`;
  return `<article class="event-card compact" role="button" tabindex="0" data-event="${event.id}" aria-label="${event.behavior}, ${event.driver}, ${event.priority}"><div class="event-band"></div>${photo}${controls}<div class="compact-copy"><span class="badge ${priorityClass}">${event.priority}</span><h2>${event.behavior}</h2><p>${event.driver} · ${event.driver==='Marco Silva'?'Vehicle ':''}${event.vehicle}</p></div></article>`;
}
function laneCard(event){
  return `<button class="lane-card" type="button" data-event="${event.id}"><span class="event-band"></span><span class="lane-still"><img src="${playIcon}" alt="" /></span><span class="lane-copy"><strong>${event.behavior}</strong><span>${event.driver}</span><small>${event.vehicle} · ${event.time}</small></span></button>`;
}
function feedRow(event){
  const thumb=event.still?`<span class="feed-thumb"><img src="${event.still}" alt="" /></span>`:`<span class="feed-thumb placeholder"><img src="${playIcon}" alt="" /></span>`;
  const priority=event.priority?`<span class="badge ${event.priority.startsWith('High')?'high':'medium'}">${event.priority}</span>`:'';
  return `<button class="feed-row" type="button" data-event="${event.id}">${thumb}<span class="feed-row-copy"><strong>${event.behavior}</strong><small>${event.driver} · ${event.vehicle}</small></span><span class="feed-row-side"><span class="feed-row-time">${event.time}</span>${priority}</span></button>`;
}
function filtered(){return events.filter(e=>(state.driver==='All'||e.driver===state.driver)&&(state.behavior==='All'||e.behavior===state.behavior));}
function render(){
  const shown=filtered();
  const priorities=priorityEvents;
  const later=additionalEvents;
  const high=priorities.find(e=>e.id==='elliot-following');
  const smaller=priorities.filter(e=>e.id!=='elliot-following');
  document.querySelector('#priority-list').innerHTML=`${high?reviewCard(high,'feature'):''}${smaller.length?`<div class="event-pair">${smaller.map(e=>reviewCard(e,'compact')).join('')}</div>`:''}`;
  document.querySelector('#priority-section').hidden=state.view==='all';
  document.querySelector('#preview-list').innerHTML=later.slice(0,8).map(laneCard).join('');
  document.querySelector('#all-list').innerHTML=shown.slice(0,state.visibleCount).map(feedRow).join('');
  document.querySelector('#overview-count').textContent=`${events.length} events today`;
  document.querySelector('#all-count').textContent=`${shown.length} events today`;
  document.querySelector('#preview-view').hidden=state.view==='all';
  document.querySelector('#all-view').hidden=state.view!=='all';
  document.querySelector('#empty-state').hidden=state.view!=='all'||shown.length>0;
  const load=document.querySelector('#load-more');
  load.hidden=state.view!=='all'||state.visibleCount>=shown.length;
  load.textContent=`Load ${Math.min(12,shown.length-state.visibleCount)} more`;
  for(const type of ['driver','behavior']){
    const chip=document.querySelector(`#${type}-filter`);
    chip.querySelector('span').textContent=`${type[0].toUpperCase()+type.slice(1)}: ${state[type]}`;
    chip.classList.toggle('applied',state[type]!=='All');
  }
  document.querySelector('#clear-filters').hidden=state.driver==='All'&&state.behavior==='All';
}
function draftCount(){
  return events.filter(e=>(state.filterType==='driver'?(state.draft==='All'||e.driver===state.draft):(state.driver==='All'||e.driver===state.driver))&&(state.filterType==='behavior'?(state.draft==='All'||e.behavior===state.draft):(state.behavior==='All'||e.behavior===state.behavior))).length;
}
function renderFilterOptions(){
  const type=state.filterType;
  const values=type==='driver'?['All',...new Set(events.map(e=>e.driver))]:['All',...new Set(events.map(e=>e.behavior))];
  document.querySelector('#filter-options').innerHTML=values.map(value=>`<button class="filter-option ${state.draft===value?'selected':''}" type="button" role="radio" data-option="${value}" aria-checked="${state.draft===value}">${value==='All'?`All ${type}s`:value}<span class="radio" aria-hidden="true"></span></button>`).join('');
  document.querySelector('#apply-filter').textContent=`Show ${draftCount()} events`;
}
function openFilter(type){
  state.filterType=type;state.draft=state[type];
  document.querySelector('#filter-title').textContent=`Filter by ${type}`;
  renderFilterOptions();
  scrim.hidden=false;filterSheet.hidden=false;
  document.querySelector('#close-filter').focus();
}
function closeFilter(){
  filterSheet.hidden=true;state.filterType=null;
  if(detail.hidden)scrim.hidden=true;
}
function setView(view){
  state.view=view;
  document.querySelector('#overview-header').hidden=view==='all';
  document.querySelector('#all-header').hidden=view!=='all';
  closeFilter();render();content.scrollTop=0;
}
function openDetail(id){
  const event=events.find(e=>e.id===id);if(!event)return;
  const preview=event.still?`<img src="${event.still}" alt="" />`:`<img src="${playIcon}" alt="" />`;
  const badge=event.priority?`<span class="badge ${event.priority.startsWith('High')?'high':'medium'}">${event.priority}</span>`:'';
  document.querySelector('#detail-body').innerHTML=`<div class="detail-headline"><h2 id="detail-title">${event.behavior}</h2>${badge}</div><p class="detail-meta">${event.driver} · Vehicle ${event.vehicle} · ${event.time}</p><div class="detail-preview ${event.still?'':'no-still'}" id="detail-preview">${preview}<span class="preview-label">Still frame · clip not loaded</span></div><p class="detail-note" id="detail-note">Load the clip if you need to verify what happened.</p><button class="sheet-action" type="button" id="load-clip">Load clip</button><div class="review-actions"><button type="button" id="mark-reviewed">Mark reviewed</button><button type="button" id="flag-follow-up">Flag for follow-up</button></div><p class="review-feedback" id="review-feedback" role="status" hidden></p>`;
  filterSheet.hidden=true;scrim.hidden=false;detail.hidden=false;document.querySelector('#close-detail').focus();
}
function closeDetail(){detail.hidden=true;if(filterSheet.hidden)scrim.hidden=true;}
document.querySelector('#driver-filter').addEventListener('click',()=>openFilter('driver'));
document.querySelector('#behavior-filter').addEventListener('click',()=>openFilter('behavior'));
document.querySelector('#filter-options').addEventListener('click',event=>{
  const option=event.target.closest('[data-option]');if(!option)return;
  state.draft=option.dataset.option;renderFilterOptions();
});
document.querySelector('#apply-filter').addEventListener('click',()=>{state[state.filterType]=state.draft;state.visibleCount=12;closeFilter();render();});
document.querySelector('#close-filter').addEventListener('click',closeFilter);
document.querySelector('#clear-filters').addEventListener('click',()=>{state.driver='All';state.behavior='All';state.visibleCount=12;render();});
document.querySelector('#view-all').addEventListener('click',()=>setView('all'));
document.querySelector('#back-to-overview').addEventListener('click',()=>setView('overview'));
document.querySelector('#load-more').addEventListener('click',()=>{state.visibleCount+=12;render();});
content.addEventListener('click',event=>{const card=event.target.closest('[data-event]');if(card)openDetail(card.dataset.event);});
content.addEventListener('keydown',event=>{const card=event.target.closest('[data-event]');if(card&&(event.key==='Enter'||event.key===' ')){event.preventDefault();openDetail(card.dataset.event);}});
document.querySelector('#close-detail').addEventListener('click',closeDetail);
scrim.addEventListener('click',()=>{closeFilter();closeDetail();});
detail.addEventListener('click',event=>{
  if(event.target.closest('#load-clip')){document.querySelector('#detail-note').textContent='Clip requested. Playback will appear here when available.';const button=document.querySelector('#load-clip');button.textContent='Clip requested';button.disabled=true;}
  for(const [id,message] of [['#mark-reviewed','Marked reviewed'],['#flag-follow-up','Flagged for follow-up']]){
    if(event.target.closest(id)){const button=document.querySelector(id);button.textContent=message;button.disabled=true;const feedback=document.querySelector('#review-feedback');feedback.textContent=message+' for this prototype.';feedback.hidden=false;}
  }
});
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#detail-body').innerHTML=`<h2 id="detail-title">${button.dataset.info}</h2><p>This section will be designed next.</p>`;scrim.hidden=false;detail.hidden=false;}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeFilter();closeDetail();}});
render();
