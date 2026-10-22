const events = {
  'close-following-elliot': { behavior:'Close Following', driver:'Elliot Brooks', vehicle:'V-112', time:'9:18 AM', priority:'High priority', still:'../../high-fidelity/home/assets/imgImage5283.png' },
  'phone-use-nina': { behavior:'Phone Use', driver:'Nina Torres', vehicle:'V-204', time:'8:54 AM', priority:'Medium priority', still:'../../high-fidelity/home/assets/imgImage5284.png' },
  'close-following-marco': { behavior:'Close Following', driver:'Marco Silva', vehicle:'V-318', time:'8:17 AM', priority:'Medium priority', still:'../../high-fidelity/home/assets/imgImage5285.png' }
};
const scrim=document.querySelector('.dialog-scrim');
const sheet=document.querySelector('.detail-sheet');
const body=document.querySelector('#sheet-body');

function showSheet(html){
  body.innerHTML=html;scrim.hidden=false;sheet.hidden=false;document.querySelector('.sheet-close').focus();
}
function openEvent(id){
  const event=events[id];if(!event)return;
  const badgeClass=event.priority.startsWith('High')?'high':'medium';
  showSheet(`<div class="detail-headline"><h2 id="sheet-title">${event.behavior}</h2><span class="badge ${badgeClass}">${event.priority}</span></div>
    <p class="detail-meta">${event.driver} · Vehicle ${event.vehicle} · ${event.time}</p>
    <div class="detail-preview"><img src="${event.still}" alt="Still frame from ${event.behavior} event" /><span class="preview-label">Still frame · clip not loaded</span></div>
    <p class="detail-note" id="detail-note">Load the clip if you need to verify what happened.</p>
    <button class="sheet-action" type="button" id="load-clip">Load clip</button>
    <div class="review-actions"><button type="button" id="mark-reviewed">Mark reviewed</button><button type="button" id="flag-follow-up">Flag for follow-up</button></div>
    <p class="review-feedback" id="review-feedback" role="status" hidden></p>`);
}
function openInfo(title,description){showSheet(`<h2 id="sheet-title">${title}</h2><p>${description}</p>`);}
function closeSheet(){scrim.hidden=true;sheet.hidden=true;}

document.querySelectorAll('.event-card').forEach(card=>{
  const show=()=>openEvent(card.dataset.event);
  card.addEventListener('click',show);
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();show();}});
  card.querySelector('.more').addEventListener('click',event=>{event.stopPropagation();show();});
});
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>openInfo(button.dataset.info,'This section will be designed next.')));
document.querySelector('.sheet-close').addEventListener('click',closeSheet);
scrim.addEventListener('click',closeSheet);
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSheet();});
sheet.addEventListener('click',event=>{
  if(event.target.closest('#load-clip')){document.querySelector('#detail-note').textContent='Clip requested. Playback will appear here when available.';const button=document.querySelector('#load-clip');button.textContent='Clip requested';button.disabled=true;}
  for(const [id,message] of [['#mark-reviewed','Marked reviewed'],['#flag-follow-up','Flagged for follow-up']]){
    if(event.target.closest(id)){const button=document.querySelector(id);button.textContent=message;button.disabled=true;const feedback=document.querySelector('#review-feedback');feedback.textContent=message+' for this prototype.';feedback.hidden=false;}
  }
});
