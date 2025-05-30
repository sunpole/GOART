/*============= КАРТА ЛОКАЦИЙ (связи) =============*/
const ROOMS = [
  // 0-3 1 этаж, 4-7 1 этаж, 8-11 2 этаж, 12 3 этаж
  {name:'Офис', icon:'🏢', doors:[1,4], desc:'Здесь работают специалисты по клиентам и бывают допечатники.'},
  {name:'Коридор', icon:'🚪', doors:[0,2,5], desc:'Здесь все проходят из офиса в аквариум.'},
  {name:'Склад 1 эт', icon:'📦', doors:[1,3,6], desc:'Место для расходников и паллет.'},
  {name:'ПР. цех дверь', icon:'🚧', doors:[2,7], desc:'Проход на производство.'},
  {name:'Аквариум', icon:'🖨', doors:[0,5,8], desc:'Цифровая печать, тут толпа цифровиков.'},
  {name:'Коридор 2', icon:'⬅️', doors:[1,4,6], desc:'Проход между аквариумом и складом.'},
  {name:'Дверь на 2 эт', icon:'⬆️', doors:[2,5,9], desc:'Лестница на второй этаж.'},
  {name:'Проход в произв.', icon:'🚧', doors:[3,6,10], desc:'Вход на большой цех.'},
  {name:'Производство',icon:'🏭',doors:[4,9,11], desc:'Шумный зал с машинами, коробки, пакеты, полки.'},
  {name:'Лак',icon:'💧',doors:[6,8,12], desc:'Лакировка, Антон частенько тут.'},
  {name:'Паллеты',icon:'🪵',doors:[7,8,11], desc:'Завалено коробками.'},
  {name:'Склад 2 эт',icon:'📦',doors:[8,10], desc:'Все запасы и расходники.'},
  {name:'Кабинет босса',icon:'👔',doors:[9], desc:'Офис Виторга. Доступен только после всех дел.'}
];

/*============= NPC: имя, иконка, описание, зона =============*/
const NPCS_FULL = [
  // Офис/коридор/клиенты
  {name:'Катя',icon:'👩‍🦰',desc:'Клиентский менеджер. Молодая, с телефоном, аккуратна, всегда просит сделать цветопробу. Если не сделал — будет ходить за тобой.', type:'kvest', home:[0,1], follow:false},
  {name:'Светлана',icon:'👩🏼‍🦱',desc:'Взрослая болтушка, любит задержать у двери длинным разговором. Уйдет только если согласиться.', type:'barrier', home:[0,1], said:false},
  {name:'Владимир',icon:'🧔',desc:'Новый, просто интересуется, что тут делают. Не мешает работе.', type:'neutral', home:[0,1,2]},
  // Допечатники
  {name:'Сергей Ас',icon:'👨‍🦳',desc:'Старший допечатник, ворчит по делу о макетах и метках.',type:'tip',home:[2,1]},
  {name:'Саша Ха',icon:'👱🏻‍♂️',desc:'Позитивный молодой допечатник, здоровается кулаком и снижает стресс.',type:'happy',home:[2,1,4]},
  // Цифра
  {name:'Марина',icon:'👩🏻',desc:'Главная по цифре. Если несешь любой предмет — заберет и накричит.',type:'take',home:[4,5]},
  {name:'Арсений',icon:'🧑🏻‍💻',desc:'Цифровик, любит помогать: может подарить цветопробу, если сам не пофиксил.',type:'fast',home:[4,5,8]},
  {name:'Александр Кир',icon:'🧓',desc:'Старший цифровик, запускает свои работы мимо очереди и “ванильничает”.',type:'slow',home:[4,5,8]},
  {name:'Палина',icon:'👩‍🎤',desc:'Девушка, редко появляется, лежит за компом и снижает стресс.',type:'chill',home:[4]},
  // Лакировка, второй этаж
  {name:'Антон',icon:'🧔🏻‍♂️',desc:'Харизматичный, но любит перегораживать путь в лак, пока не выполнен его квест.',type:'lak',home:[9,8]},
  // Босс
  {name:'Виторг',icon:'🦒',desc:'Очень высокий босс, на 3-м этаже. Не пропустит, если не все выполнено.',type:'boss',home:[12]}
];

// Индексы квестов и условных предметов
const QUESTS = [
  {name:'Цветопроба',id:'proba',desc:'Сделать цветопробу для Кати'},
  {name:'Лак',id:'lak',desc:'Отлакировать на втором этаже'},
  {name:'Финал',id:'boss',desc:'Дойти к боссу с выполненными делами'}
];

/*============= ГЛОБАЛЬНОЕ СОСТОЯНИЕ =============*/
let player = {}; // имя,at,stress,inventory,quests
let npcs = [];

function deepClone(o){ return JSON.parse(JSON.stringify(o)); }

function startGame(name) {
  player = {
    name: name.length?name:'Новичок', at:0, stress:0, inventory:[],
    busy:false, quests:{proba:false,lak:false,boss:false}, end:false
  };
  npcs = deepClone(NPCS_FULL);
  renderAll();
  startLoop();
}

function resetGame(){
  let n = prompt("Как вас зовут?","Новичок")||"Новичок";
  document.getElementById('player-name').innerText = n;
  stopLoop();
  startGame(n);
}

/*========= РЕНДЕРИНГ =========*/
function renderAll() {
  renderMap();
  renderQuests();
  renderControls();
}
function renderMap(){
  let html = '';
  for(let i=0;i<ROOMS.length;++i){
    let active = (player.at===i)?'active':'';
    html += `<div class="room ${active}" title="${ROOMS[i].desc}">
      <div class="room-title">${ROOMS[i].name} ${ROOMS[i].icon}</div>`;
    html += `<div class="actors">`;
    // Игрок
    if(player.at===i)
      html += `<span class="actor actor-ego" title="Это вы!">🧑‍💼<br><span class="actor-name">${player.name}</span></span>`;
    // NPCs
    npcs.filter(n=>n.at===i).forEach(npc=>{
      html += `<span class="actor actor-npc" title="${npc.desc}">${npc.icon}<br><span class="actor-name">${npc.name}</span></span>`;
    });
    html += `</div><div class="doors">Двери: ${
      ROOMS[i].doors.map(j=>ROOMS[j].name).join(', ')
    }</div></div>`;
  }
  document.getElementById('map').innerHTML = html;
  document.getElementById('stressBar').innerText = player.stress;
  document.getElementById('item').innerText = player.inventory.length?player.inventory.join(', '):'пусто';
}
function renderQuests(){
  let q = QUESTS.map(qk=>`<li>${
    qk.name
  }: <b>${player.quests[qk.id]==='done'?'✅':(player.quests[qk.id]?'🕓':'❌')}</b> — <span class='actor-desc'>${qk.desc}</span></li>`).join('');
  document.getElementById('questlog').innerHTML = "<ul>" + q + "</ul>";
}
function renderControls(){
  // Доступные перемещения
  let html = '';
  let here = player.at, doors = ROOMS[here].doors;
  doors.forEach(idx=>{
    html += `<button class="moveBtn" onclick="moveTo(${idx})">В ${ROOMS[idx].name} ${ROOMS[idx].icon}</button>`;
  });
  // Действия в комнатах
  // Цветопроба в аквариуме
  if(ROOMS[here].name==='Аквариум'&&!player.inventory.includes('цветопроба')&&player.quests.proba==='inprogress'){
    html += `<button class="actionBtn" onclick="makeProba()">Сделать цветопробу</button>`;
  }
  // Лак во втором этаже
  if(ROOMS[here].name==='Лак'&&!player.inventory.includes('лак')&&player.quests.proba==='done'){
    html += `<button class="actionBtn" onclick="makeLak()">Сделать лак</button>`;
  }
  document.getElementById('control-panel').innerHTML = html;
}

/*========= ОСНОВНОЙ ЦИКЛ ==========*/
let nlooper = null;
function stopLoop(){
  if(nlooper)clearInterval(nlooper); nlooper=null;
}
function startLoop(){
  stopLoop();
  nlooper = setInterval(()=>{
    if(player.end) return;
    // Сначала ходят NPC, потом игрок (игрок управляет сам)
    npcs.forEach(npc=>{
      // Катя может следовать.
      if(npc.type==='kvest'){
        if(npc.follow && player.quests.proba!='done') npc.at = player.at;
        else npc.at=npc.home[Math.floor(Math.random()*npc.home.length)];
      }
      else if(npc.home && Math.random()<0.7) {
        npc.at=npc.home[Math.floor(Math.random()*npc.home.length)];
      }
    });
    // Если стресс перегорел
    if(player.stress>=100){
      player.end=true;
      showEvent('Вы сгорели от стресса! 👎<br>Рабочий день не завершён.',['Начать заново',resetGame]);
    }
    renderAll(); // ловим все события после ходов
    checkEvents();
  }, 1800);
}

/*============= ЛОГИКА ПЕРЕМЕЩЕНИЯ =============*/
function moveTo(idx){
  // Без блокировки!
  player.at = idx;
  renderAll();
  checkEvents();
}

/*------------- ДЕЙСТВИЯ В КОМНАТАХ --------------*/
function makeProba(){
  player.inventory.push('цветопроба');
  showEvent('Вы сделали цветопробу!',['Ок',renderAll]);
}
function makeLak(){
  player.inventory.push('лак');
  showEvent('Лак покрыт!', ['Ок',renderAll]);
}

/*============= ЛОГИКА NPC, КВЕСТОВ, СОБЫТИЙ =============*/
function checkEvents(){
  // Катя: если нет квеста — выдает. Если несём цветопробу — сдаём.
  let k = npcs.find(x=>x.name==='Катя');
  if(player.at==k.at){
    if(!player.quests.proba){
      showEvent('Катя: “Сделай цветопробу!”<br>Я буду следовать за тобой.',[{text:'Ок!',action:()=>{
        k.follow=true;player.quests.proba='inprogress';
      }}]);
      return;
    }
    if(player.quests.proba==='inprogress' && player.inventory.includes('цветопроба')){
      showEvent('Катя: “Спасибо за цветопробу!”',[{text:'Отдать',action:()=>{
        k.follow=false;
        player.inventory = player.inventory.filter(x=>x!=='цветопроба');
        player.quests.proba='done';
        renderAll();
      }}]);
      return;
    }
  }
  // Светлана – разговор, пока не согласишься
  let sv = npcs.find(x=>x.name==='Светлана');
  if(player.at==sv.at && !sv.said){
    player.busy=true;
    showEvent('Светлана: “Вам нужно попробовать так, потом вот так... Пока не скажешь <b>ХОРОШО МЫ ПОПРОБУЕМ</b> я не уйду!”',
    [{text:'Хорошо, мы попробуем',action:()=>{sv.said=true;player.busy=false;}},
     {text:'Нет',action:()=>{sv.said=false;checkEvents();}}
    ]);
    return;
  }
  // Марина забирает предмет — если идём с чем-то через аквариум
  let mar = npcs.find(x=>x.name==='Марина');
  if(player.at==mar.at && player.inventory.length){
    let lost = player.inventory.slice();
    player.inventory = [];
    player.stress+=10;
    showEvent(`Марина: “Что ты несёшь? Всё выброшено!”<br>Ты теряешь: <b>${lost.join(', ')}</b>. (стресс +10)`,[{text:'Ок',action:()=>{}}]);
    return;
  }
  // Арсений — просто дарит цветопробу если квест в активе и ещё не сделали
  let ars = npcs.find(x=>x.name==='Арсений');
  if(player.at==ars.at && player.quests.proba==='inprogress' && !player.inventory.includes('цветопроба')){
    player.inventory.push('цветопроба');
    showEvent('Арсений: “Вот цветопроба, всё готово!”',['Спасибо']);
    return;
  }
  // Александр Кир — увеличивает стресс и задерживает
  let kir = npcs.find(x=>x.name==='Александр Кир');
  if(player.at==kir.at){
    player.stress+=15;
    showEvent('Александр Кир рассказывает “ванильный” анекдот и мимо запускает работу. (стресс +15)', ['Поскорее уйти']);
    return;
  }
  // Палина — снижает стресс!
  let pal = npcs.find(x=>x.name==='Палина');
  if(player.at==pal.at){
    player.stress=Math.max(0,player.stress-7);
    showEvent('Палина пьёт пиво 🍺 и даёт расслабиться. (стресс -7)', ['Улыбнуться']);
    return;
  }
  // Саша Ха — снижает стресс
  let cha = npcs.find(x=>x.name==='Саша Ха');
  if(player.at==cha.at){
    player.stress=Math.max(0,player.stress-9);
    showEvent('Саша Ха!: “Держи кулак!” (стресс -9)', ['С кулаком!']);
    return;
  }
  // Сергей – только совет/ворчание
  let serg = npcs.find(x=>x.name==='Сергей Ас');
  if(player.at==serg.at && !serg.said){
    showEvent('Сергей Ас: “Пантон, метки, PDF без теней...”',['Понял!']);
    serg.said = true;
    return;
  }
  // Владимир нейтрален
  let vl = npcs.find(x=>x.name==='Владимир');
  if(player.at==vl.at && !vl.said){
    showEvent('Владимир: “Это вообще реально напечатать?”',['Пожалуй']);
    vl.said = true; return;
  }
  // Антон блокирует если не сделал лак
  let ant = npcs.find(x=>x.name==='Антон');
  if(player.at==ant.at && player.quests.proba==='done' && !player.inventory.includes('лак')){
    showEvent('Антон преграждает путь:<br>— “Без лакировки не пройду!”', [{text:'Пойду делать лак',action:()=>{}}]);
    return;
  }
  // Сделали лак — квест завершен
  if(player.inventory.includes('лак')&&player.at==ant.at){
    showEvent('Антон: “Спасибо! Лак принят!”', [{text:'OK',action:()=>{
      player.inventory = player.inventory.filter(x=>x!=='лак');
      player.quests.lak='done';
      renderAll();
    }}]);
    return;
  }
  // Босс проверяет все дела
  let boss = npcs.find(x=>x.name==='Виторг');
  if(player.at==boss.at){
    if(player.quests.proba==='done'&&player.quests.lak==='done'){
      player.end=true;
      showEvent('Виторг: “Поздравляю, рабочий день завершён!”<br><big>Ты выиграл! 🏆</big>',['Начать заново',resetGame]);
    } else {
      showEvent('Виторг: “Ты не всё сделал.<br>Где цветопроба и лак?” (вернуться!)',['Ушел']);
      player.stress+=8;
    }
    return;
  }
}

/*============= МОДАЛКА-СПРАВКА/ЛЕГЕНДА =============*/
function legendOpen(){
  let html = "";
  html += "<b>Локации:</b><ul>";
  ROOMS.forEach(r=>{
    html+=`<li><b>${r.name}</b> ${r.icon}: <span class='actor-desc'>${r.desc}</span></li>`;
  });
  html += "</ul><b>Персонажи:</b><ul>";
  NPCS_FULL.forEach(n=>{
    html+=`<li>${n.icon}<b> ${n.name}</b>: <span class='actor-desc'>${n.desc}</span></li>`;
  });
  html += "</ul>";
  document.getElementById("legendCont").innerHTML = html;
  document.getElementById("descModal").style.display='flex';
}
function legendClose(){
  document.getElementById("descModal").style.display='none';
}

/*============= СОБЫТИЯ =============*/
function showEvent(text, opts){
  player.busy=true;
  document.getElementById('eventBox').style.display='block';
  document.getElementById('eventText').innerHTML=text;
  let html='';
  opts.forEach((o,i)=>{
    if(typeof o==='string') html+=`<button class="actionBtn" onclick="eventAction(${i})">${o}</button>`;
    else html+=`<button class="actionBtn" onclick="eventAction(${i})">${o.text}</button>`;
  });
  document.getElementById('eventOptions').innerHTML=html;
  window._eventOpts=opts;
}
window.eventAction=function(idx){
  document.getElementById('eventBox').style.display='none';
  let fn=window._eventOpts[idx]; if(typeof fn==='object'&&fn.action) fn=fn.action;
  if(typeof fn==='function') fn();
  player.busy=false;renderAll();
};

/*============= СТАРТ =============*/
window.onload=()=>{resetGame();};
