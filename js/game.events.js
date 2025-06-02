// game.events.js

function checkEvents() {
  // --- КАТЯ ---
  let k = npcs.find(x=>x.name==='Катя');
  if(player.at==k.at){
    if(!player.quests.proba){
      showEventNPC(randDialog(k),[{text:'Ок!',action:()=>{k.follow=true;player.quests.proba='inprogress';}}],k);
      return;
    }
    if(player.quests.proba==='inprogress' && player.inventory.includes('цветопроба')){
      showEventNPC(randDialog(k),[{text:'Отдать',action:()=>{k.follow=false;player.inventory = player.inventory.filter(x=>x!=='цветопроба');player.quests.proba='done';renderAll();}}],k);
      return;
    }
  }
  // --- СВЕТЛАНА ---
  let sv = npcs.find(x=>x.name==='Светлана');
  if(player.at==sv.at && !sv.said){
    player.busy=true;
    showEventNPC(randDialog(sv),
    [
      {text:'Хорошо, мы попробуем вам помочь',action:()=>{sv.said=true;player.busy=false;}},
      {text:'Нет, я не буду, идите к Виктору!',action:()=>{sv.said=false;checkEvents();}}
    ],sv);
    return;
  }
  // --- МАРИНА ---
  let mar = npcs.find(x=>x.name==='Марина');
  if(player.at==mar.at) {
    if(player.inventory.length){
      let lost = player.inventory.slice();
      player.inventory = [];
      player.stress += 10;
      showEventNPC(
        randDialog(mar) + `<br>Ты теряешь: <b>${lost.join(', ')}</b>. (стресс +10)`,
        [{text:'Ок',action:()=>{}}],
        mar
      );
    } else {
      showEventNPC(
        randDialog(mar) + "<br>У тебя ничего нет, иди!",
        [{text:'Ок',action:()=>{}}],
        mar
      );
    }
    return;
  }
  // --- АРСЕНИЙ ---
  let ars = npcs.find(x=>x.name==='Арсений');
  if(player.at==ars.at && player.quests.proba==='inprogress' && !player.inventory.includes('цветопроба')){
    player.inventory.push('цветопроба');
    showEventNPC(randDialog(ars),[{text:'Спасибо',action:()=>{}}],ars);
    return;
  }
  // --- АЛЕКСАНДР КИР ---
  let kir = npcs.find(x=>x.name==='Александр Кир');
  if(player.at==kir.at){
    player.stress+=15;
    showEventNPC(randDialog(kir),[{text:'Поскорее уйти',action:()=>{}}],kir);
    return;
  }
  // --- ПОЛИНА ---
  let pal = npcs.find(x=>x.name==='Полина');
  if(player.at==pal.at){
    player.stress=Math.max(0,player.stress-7);
    showEventNPC(randDialog(pal), [{text:'Улыбнуться',action:()=>{}}], pal);
    return;
  }
  // --- САША ХА ---
  let cha = npcs.find(x=>x.name==='Саша Ха');
  if(player.at==cha.at){
    player.stress=Math.max(0,player.stress-9);
    showEventNPC(randDialog(cha), [{text:'С кулаком! тыдыщь!',action:()=>{}}], cha);
    return;
  }
  // --- СЕРГЕЙ АС ---
  let serg = npcs.find(x=>x.name==='Сергей Ас');
  if(player.at==serg.at && !serg.said){
    showEventNPC(randDialog(serg),[{text:'Понял!',action:()=>{serg.said=true;}}],serg);
    return;
  }
  // --- ВЛАДИМИР ---
  let vl = npcs.find(x=>x.name==='Владимир');
  if(player.at==vl.at && !vl.said){
    showEventNPC(randDialog(vl),[{text:'Пожалуй',action:()=>{vl.said=true;}}],vl);
    return;
  }
  // --- АНТОН ---
  let ant = npcs.find(x=>x.name==='Антон');
  if(player.at==ant.at && player.quests.proba==='done' && !player.inventory.includes('лак')){
    showEventNPC(randDialog(ant), [{text:'Пойду делать лак',action:()=>{}}], ant);
    return;
  }
  // --- АНТОН, лак сдаём ---
  if(player.inventory.includes('лак') && player.at==ant.at){
    showEventNPC(randDialog(ant), [{text:'OK',action:()=>{
      player.inventory = player.inventory.filter(x=>x!=='лак');
      player.quests.lak='done';
      renderAll();
    }}], ant);
    return;
  }
  // --- БОСС Виктор ---
  let boss = npcs.find(x=>x.name==='Виктор');
  if(player.at==boss.at){
    if(player.quests.proba==='done'&&player.quests.lak==='done'){
      startQuizBOSS(boss);
      return;
    } else {
      showEventNPC('Виктор: “Ты не всё сделал.<br>Где цветопроба и лак?” (вернуться!)',[{text:'Ушел',action:()=>{player.stress+=8;}}],boss);
      return;
    }
  }
}

// --- МОДАЛКА ДИАЛОГА С ФОТО NPC ---
function showEventNPC(text, opts, npc){
  dialogOpen = true;
  player.busy = true;
  document.getElementById('eventBox').style.display = 'block';
  if(npc && npc.portrait){
    document.getElementById('eventPortrait').innerHTML = `<img src="${npc.portrait}" alt="${npc.name}" style="max-width:130px;max-height:130px;border-radius:15px;box-shadow:0 2px 18px #4689ff27;margin:6px auto 9px auto;display:block;">`;
  } else {
    document.getElementById('eventPortrait').innerHTML = "";
  }
  document.getElementById('eventText').innerHTML = text;
  let html = '';
  opts.forEach((o,i)=>{ html+=`<button class="actionBtn" onclick="eventAction(${i})">${o.text}</button>`; });
  document.getElementById('eventOptions').innerHTML = html;
  window._eventOpts = opts;
}
function showEvent(text, opts){
  dialogOpen = true;
  player.busy = true;
  document.getElementById('eventBox').style.display = 'block';
  document.getElementById('eventPortrait').innerHTML = "";
  document.getElementById('eventText').innerHTML = text;
  let html = '';
  opts.forEach((o,i)=>{ html+=`<button class="actionBtn" onclick="eventAction(${i})">${o.text}</button>`; });
  document.getElementById('eventOptions').innerHTML = html;
  window._eventOpts = opts;
}
window.eventAction=function(idx){
  document.getElementById('eventBox').style.display='none';
  let fn=window._eventOpts[idx];
  if(typeof fn==='object'&&fn.action) fn=fn.action;
  if(typeof fn==='function') fn();
  player.busy=false;
  dialogOpen = false;
  renderAll();
};
