// GOART v0.3.0 — стабильная цельная игровая логика
// Рабочий день в типографии. Vanilla JS, без сборки и бэкенда.

const GOART_VERSION = '0.3.0-dev';

// ============= КАРТА ЛОКАЦИЙ =============
const ROOMS = [
  { id: 0,  name: 'Офис',            icon: '🏢', doors: [1, 4],     desc: 'Здесь работают специалисты по клиентам и бывают допечатники.', limit: 15 },
  { id: 1,  name: 'Коридор',         icon: '🚪', doors: [0, 2, 5],  desc: 'Здесь все проходят из офиса в аквариум.', limit: 5 },
  { id: 2,  name: 'Склад 1 эт',      icon: '📦', doors: [1, 3, 6],  desc: 'Место для расходников и паллет.', limit: 3 },
  { id: 3,  name: 'ПР. цех дверь',   icon: '🚧', doors: [2, 7],     desc: 'Проход на производство.', limit: 2 },
  { id: 4,  name: 'Аквариум',        icon: '🖨', doors: [0, 5, 8],  desc: 'Цифровая печать, тут толпа цифровиков.', limit: 3 },
  { id: 5,  name: 'Коридор 2',       icon: '⬅️', doors: [1, 4, 6],  desc: 'Проход между аквариумом и складом.', limit: 5 },
  { id: 6,  name: 'Дверь на 2 эт',   icon: '⬆️', doors: [2, 5, 9],  desc: 'Лестница на второй этаж.', limit: 2 },
  { id: 7,  name: 'Проход в произв.',icon: '🚧', doors: [3, 6, 10], desc: 'Вход на большой цех.', limit: 2 },
  { id: 8,  name: 'Производство',    icon: '🏭', doors: [4, 9, 11], desc: 'Шумный зал с машинами, коробки, пакеты, полки.', limit: 5 },
  { id: 9,  name: 'Лак',             icon: '💧', doors: [6, 8, 12], desc: 'Лакировка, Антон частенько тут.', limit: 2 },
  { id: 10, name: 'Паллеты',         icon: '🪵', doors: [7, 8, 11], desc: 'Завалено коробками.', limit: 3 },
  { id: 11, name: 'Склад 2 эт',      icon: '📦', doors: [8, 10],    desc: 'Все запасы и расходники.', limit: 3 },
  { id: 12, name: 'Кабинет босса',   icon: '👔', doors: [9],        desc: 'Офис Виктора. Доступен только после всех дел.', limit: 2 }
];

// ============= NPC =============
const NPCS_FULL = [
  { name:'Катя', icon:'👩', portrait:'img/katya.jpg', desc:'Клиентский менеджер. Всегда просит сделать цветопробу.', type:'kvest', home:[0,1], workplace:1, spawn:0, moveInterval:9000, follow:false, dialog1:'Катя: Ау, ну сделай цветопробу.', prob1:60, dialog2:'Катя: Ты что забыл про цветопробу?', prob2:30, dialog3:'Катя: Ау, бой — шарься без чила на цифряк и шекай мне цветку по фасту!', prob3:10 },
  { name:'Светлана', icon:'👩🏼‍🦱', portrait:'img/svetlana.jpg', desc:'Взрослая болтушка, любит задержать у двери длинным разговором.', type:'barrier', home:[0,1], workplace:0, spawn:0, moveInterval:6000, said:false, dialog1:'Светлана: Почему вы потеряли мои файлы! Просто ты должен это сделать!', prob1:60, dialog2:'Светлана: Ну как можно было не найти мой файл...', prob2:30, dialog3:'Светлана: А на самом деле, моя соседка вязать начала...', prob3:10 },
  { name:'Владимир', icon:'👶', portrait:'img/vladimir.jpg', desc:'Новый, просто интересуется, что тут делают.', type:'neutral', home:[0,1,2], workplace:2, spawn:0, moveInterval:18000, said:false, dialog1:'Владимир: Я так понимаю, мы в типографии?', prob1:60, dialog2:'Владимир: Я хотел бы узнать, как мы делаем это всё?', prob2:30, dialog3:'Владимир: А дозаливки куда, по сколько грамм заливать?', prob3:10 },
  { name:'Сергей Ас', icon:'🧓', portrait:'img/sergey.jpg', desc:'Старший допечатник, ворчит по делу о макетах и метках.', type:'tip', home:[2,1], workplace:2, spawn:0, moveInterval:36000, said:false, dialog1:'Сергей Ас: Увлажнение цилиндров, спектрофотометрия, трипликат, колориметрическая калибровка, флаппинг, инспекционный прогон.', prob1:60, dialog2:'Сергей Ас: Перцепционный рип, импозиционный шаблон, спектральная проба, треппинг, микрорастровая структура.', prob2:30, dialog3:'Сергей Ас: Градуирование кернинга, автофлоу вёрстки, эмбеддинг глифов, параметризация лидинга.', prob3:10 },
  { name:'Саша Ха', icon:'🤵', portrait:'img/sasha.jpg', desc:'Позитивный допечатник, снижает стресс.', type:'happy', home:[2,1,4], workplace:2, spawn:0, moveInterval:30000, dialog1:'Саша Ха: Давай кулак.', prob1:60, dialog2:'Саша Ха: А кто возьмёт на проверочку ТК?', prob2:30, dialog3:'Саша Ха: Я говорил вам раньше про CorelDRAW...', prob3:10 },
  { name:'Марина', icon:'👩‍🔬', portrait:'img/marina.jpg', desc:'Главная по цифре. Может отобрать то, что несёшь.', type:'take', home:[4,5], workplace:4, spawn:0, moveInterval:12000, dialog1:'Марина: Ты что ещё тут? Пшёл отсюда!', prob1:60, dialog2:'Марина: Просто уйди!', prob2:30, dialog3:'Марина: Ммм — какая я красивая...', prob3:10 },
  { name:'Арсений', icon:'🧑', portrait:'img/arseniy.jpg', desc:'Цифровик, любит помогать.', type:'fast', home:[4,5,8], workplace:4, spawn:0, moveInterval:12000, dialog1:'Арсений: Давай я сделаю это быстрее.', prob1:60, dialog2:'Арсений: Привет.', prob2:30, dialog3:'Арсений: e2-e4... мат.', prob3:10 },
  { name:'Александр Кир', icon:'👨‍🦳', portrait:'img/kir.jpg', desc:'Старший цифровик, везде бывает и рассказывает длинные истории.', type:'slow', home:[4,5,8], workplace:4, spawn:0, moveInterval:6000, dialog1:'Александр Кир: Вот в 1978 мы резали плёнку ножницами, монтаж делали на воске...', prob1:40, dialog2:'Александр Кир: В 80-х мы на газетных ротациях химию сами замешивали...', prob2:30, dialog3:'Александр Кир: Раньше всё было по памяти, линейкой и осторожно.', prob3:30 },
  { name:'Полина', icon:'👸', portrait:'img/polina.jpg', desc:'Девушка, редко появляется и немного снижает стресс.', type:'chill', home:[4], workplace:4, spawn:0, moveInterval:12000, dialog1:'Полина: Позовите Антона, у меня новые стрелки на лице!', prob1:60, dialog2:'Полина: Хаюшки.', prob2:30, dialog3:'Полина: Опять образцы?', prob3:10 },
  { name:'Антон', icon:'💂‍♂️', portrait:'img/anton.jpg', desc:'Часто бывает на лаке и связан с заданием по лаку.', type:'lak', home:[9,8], workplace:9, spawn:0, moveInterval:9000, dialog1:'Антон: Доброе утро, хорошего дня!', prob1:60, dialog2:'Антон: Ха-ха-ха, ладно, я пошёл на лак.', prob2:30, dialog3:'Антон: Невероятно... всем пока!', prob3:10 },
  { name:'Виктор', icon:'🦒', portrait:'img/viktor.jpg', desc:'Очень высокий босс. Не пропустит, если не всё выполнено.', type:'boss', home:[0,1,2,3,4,5,6,7,8,9,10,11,12], workplace:12, spawn:0, moveInterval:5000, patrolInterval:60000, dialog1:'Виктор: Ну что, всё сделал?', prob1:100 }
];

const QUESTS = [
  { name:'Цветопроба', id:'proba', desc:'Сделать цветопробу для Кати' },
  { name:'Лак', id:'lak', desc:'Отлакировать на втором этаже' },
  { name:'Финал', id:'boss', desc:'Дойти к боссу, пройти блиц и завершить день' }
];

const BOSS_QUIZ = [
  { question:'Что означает C в аббревиатуре CMYK?', answers:[{text:'C = Циан', correct:true},{text:'C = Color', correct:false},{text:'C = Синий', correct:false},{text:'C = Contour', correct:false}] },
  { question:'Что такое Pantone?', answers:[{text:'Спецпалитра для подбора фирменных цветов', correct:true},{text:'Международный стандарт цветопередачи для печати', correct:false},{text:'Цветовая гамма для дизайнерской бумаги', correct:false},{text:'Таблица оттенков для лаковых покрытий', correct:false}] },
  { question:'Что важно для вывода макета в печать?', answers:[{text:'CMYK, обрезные метки, выпуск под обрез', correct:true},{text:'RGB, без выпусков, только JPG', correct:false},{text:'Тени, белый фон и Word-файл', correct:false},{text:'Только красивый вид на экране', correct:false}] },
  { question:'Что такое допечатная подготовка?', answers:[{text:'Проверка и настройка макета перед печатью', correct:true},{text:'Настройка чайника перед рабочим днём', correct:false},{text:'Упаковка готового тиража', correct:false},{text:'Выдача счёта клиенту', correct:false}] },
  { question:'Почему PDF предпочтительнее для печати?', answers:[{text:'Корректно сохраняет вектор, шрифты и структуру макета', correct:true},{text:'Всегда автоматически исправляет ошибки', correct:false},{text:'Уменьшает любую картинку без потерь', correct:false},{text:'Заменяет проверку макета', correct:false}] },
  { question:'Зачем нужны плашечные цвета?', answers:[{text:'Для точных специальных и фирменных оттенков', correct:true},{text:'Для случайного смешивания красок', correct:false},{text:'Чтобы печатать только чёрным', correct:false},{text:'Чтобы убрать выпуск под обрез', correct:false}] },
  { question:'Что такое лакировка?', answers:[{text:'Нанесение защитного или декоративного покрытия на тираж', correct:true},{text:'Удаление краски с бумаги', correct:false},{text:'Перевод макета в RGB', correct:false},{text:'Сжатие PDF-файла', correct:false}] }
];

const gameState = { player:null, npcs:[], dialogOpen:false, timers:[] };

function deepClone(o){ return JSON.parse(JSON.stringify(o)); }
function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }
function esc(v){ return String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
function byId(id){ return document.getElementById(id); }
function shuffle(array){ const arr=array.slice(); for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function randDialog(npc){ const rnd=Math.random()*100; const p3=typeof npc.prob3==='number'?npc.prob3:0; const p2=typeof npc.prob2==='number'?npc.prob2:0; if(rnd<p3 && npc.dialog3) return npc.dialog3; if(rnd<p3+p2 && npc.dialog2) return npc.dialog2; return npc.dialog1 || ''; }
function roomByName(name){ return ROOMS.find(r => r.name === name); }
function getNPC(name){ return gameState.npcs.find(n => n._spawned && n.name === name) || null; }

function clearTimers(){ gameState.timers.forEach(t => clearTimeout(t)); gameState.timers = []; gameState.npcs.forEach(n => { if(n._moveTimer) clearInterval(n._moveTimer); n._moveTimer = null; }); }
function setGameTimeout(fn, ms){ const id = setTimeout(fn, ms); gameState.timers.push(id); return id; }

function startGame(name){
  clearTimers();
  gameState.player = { name: (name || 'Новичок').trim() || 'Новичок', at:0, stress:0, inventory:[], busy:false, quests:{proba:false, lak:false, boss:false}, end:false };
  gameState.dialogOpen = false;
  gameState.npcs = deepClone(NPCS_FULL).map(npc => ({ ...npc, spawnDelay: 3000 + Math.floor(Math.random()*6000), _spawned:false, _moveTimer:null, at: typeof npc.spawn === 'number' ? npc.spawn : 0 }));
  const eventBox = byId('eventBox'); if(eventBox) eventBox.style.display='none';
  renderAll();
  startAllNpcSpawns();
}

function resetGame(){ const n = prompt('Ваше имя?', gameState.player?.name || 'Новичок')?.trim() || 'Новичок'; startGame(n); }

function startAllNpcSpawns(){
  gameState.npcs.forEach(npc => {
    setGameTimeout(() => {
      npc._spawned = true;
      npc.at = typeof npc.spawn === 'number' ? npc.spawn : 0;
      renderAll();
      if(npc.name === 'Виктор') startViktorLogic(npc);
      else if(Array.isArray(npc.home) && npc.home.length > 1) startNpcMovement(npc);
    }, npc.spawnDelay);
  });
}

function startViktorLogic(npc){
  let forward = true;
  movePatrol(npc, npc.home.slice(), () => {
    setGameTimeout(function patrolLoop(){
      const route = forward ? npc.home.slice().reverse() : npc.home.slice();
      forward = !forward;
      movePatrol(npc, route, () => setGameTimeout(patrolLoop, npc.patrolInterval || 60000));
    }, npc.patrolInterval || 60000);
  });
}
function movePatrol(npc, route, done){ if(!route.length) return done(); npc.at = route.shift(); renderAll(); setGameTimeout(() => movePatrol(npc, route, done), 6000); }

function startNpcMovement(npc){
  if(npc._moveTimer) clearInterval(npc._moveTimer);
  const interval = typeof npc.moveInterval === 'number' ? npc.moveInterval : 15000;
  const AQUARIUM_ID = roomByName('Аквариум')?.id;
  function blockedByMarina(roomId, npcName){
    if(roomId !== AQUARIUM_ID) return false;
    const marinaThere = gameState.npcs.some(n => n.name === 'Марина' && n._spawned && n.at === AQUARIUM_ID);
    const allowed = ['Саша Ха', 'Александр Кир', 'Виктор', 'Арсений', gameState.player.name];
    return marinaThere && !allowed.includes(npcName);
  }
  npc._moveTimer = setInterval(() => {
    if(!npc._spawned || gameState.dialogOpen || gameState.player.end) return;
    if(npc.name === 'Марина') return;
    const possible = (npc.home || []).filter(id => id !== npc.at);
    if(!possible.length) return;
    const open = possible.filter(roomId => !blockedByMarina(roomId, npc.name) && gameState.npcs.filter(n => n._spawned && n.at === roomId).length < (ROOMS[roomId].limit || 3));
    if(open.length){ npc.at = open[Math.floor(Math.random()*open.length)]; renderAll(); return; }
    const tunnel = possible.filter(roomId => !blockedByMarina(roomId, npc.name));
    if(tunnel.length){ npc.at = tunnel[Math.floor(Math.random()*tunnel.length)]; renderAll(); }
  }, interval);
}

function renderAll(){ renderMap(); renderQuests(); renderFooter(); }
function renderMap(){
  const map = byId('map'); if(!map || !gameState.player) return;
  map.innerHTML = ROOMS.map((room, i) => {
    const active = gameState.player.at === i ? 'active' : '';
    const actors = [];
    if(gameState.player.at === i) actors.push(`<span class="actor actor-ego" title="Это вы">🧑‍💼<span class="actor-name ${gameState.player.name.length>11?'long':''}">${esc(gameState.player.name)}</span></span>`);
    gameState.npcs.filter(n => n._spawned && n.at === i).forEach(npc => actors.push(`<span class="actor actor-npc" title="${esc(npc.desc)}">${npc.icon}<span class="actor-name ${npc.name.length>11?'long':''}">${esc(npc.name)}</span></span>`));
    return `<section class="room ${active}" title="${esc(room.desc)}"><div class="room-title ${room.name.length>14?'long':''}">${room.icon} ${esc(room.name)}</div><div class="actors">${actors.join('')}</div><div class="doors">Двери: ${room.doors.map(j => esc(ROOMS[j].name)).join(', ')}</div></section>`;
  }).join('');
}
function renderQuests(){ const el=byId('questlog'); if(!el || !gameState.player) return; el.innerHTML = '<ul>' + QUESTS.map(q => `<li>${esc(q.name)}: <b>${gameState.player.quests[q.id] === 'done' ? '✅' : (gameState.player.quests[q.id] ? '🕓' : '❌')}</b> — <span class="actor-desc">${esc(q.desc)}</span></li>`).join('') + '</ul>'; }
function renderFooter(){
  const footer=byId('footer'); if(!footer || !gameState.player) return;
  const p=gameState.player; const room=ROOMS[p.at];
  let controls = '';
  room.doors.forEach(idx => {
    const npcsHere = gameState.npcs.filter(n => n._spawned && n.at === idx).length;
    const limit = ROOMS[idx].limit || 3;
    controls += npcsHere + 1 > limit ? `<button class="moveBtn" disabled>В ${esc(ROOMS[idx].name)} ${ROOMS[idx].icon} (переполнено)</button>` : `<button class="moveBtn" onclick="moveTo(${idx})">В ${esc(ROOMS[idx].name)} ${ROOMS[idx].icon}</button>`;
  });
  if(room.name === 'Аквариум' && !p.inventory.includes('цветопроба') && p.quests.proba === 'inprogress') controls += '<button class="actionBtn" onclick="makeProba()">Сделать цветопробу</button>';
  if(room.name === 'Лак' && !p.inventory.includes('лак') && p.quests.proba === 'done' && p.quests.lak !== 'done') controls += '<button class="actionBtn" onclick="makeLak()">Сделать лак</button>';
  const inv = p.inventory.length ? p.inventory.map(esc).join(', ') : 'пусто';
  const quests = QUESTS.map(q => `${q.name}:${p.quests[q.id] === 'done' ? '✅' : (p.quests[q.id] ? '🕓' : '❌')}`).join(' | ');
  footer.innerHTML = `<div class="statusline">Стресс: ${p.stress}/100 · В руках: ${inv} · <button onclick="resetGame()">Заново</button></div><div class="controls">${controls}</div><div class="questline">Квесты: ${esc(quests)}</div>`;
}

function moveTo(idx){
  if(gameState.dialogOpen || gameState.player.busy || gameState.player.end) return;
  if(!ROOMS[gameState.player.at].doors.includes(idx)) return;
  const npcsHere = gameState.npcs.filter(n => n._spawned && n.at === idx).length;
  if(npcsHere + 1 > (ROOMS[idx].limit || 3)) return showEvent(`В комнате уже максимальное количество людей (${ROOMS[idx].limit || 3}).`, [{text:'OK'}]);
  gameState.player.at = idx;
  renderAll();
  checkEvents();
}
function makeProba(){ if(!gameState.player.inventory.includes('цветопроба')) gameState.player.inventory.push('цветопроба'); showEvent('Вы сделали цветопробу.', [{text:'Ок', action:renderAll}]); }
function makeLak(){ if(!gameState.player.inventory.includes('лак')) gameState.player.inventory.push('лак'); gameState.player.quests.lak = 'inprogress'; showEvent('Лак покрыт. Теперь нужно сдать его Антону.', [{text:'Ок', action:renderAll}]); }

function checkEvents(){
  const p = gameState.player;
  const katya=getNPC('Катя'); if(katya && p.at===katya.at){
    if(!p.quests.proba) return showEventNPC(randDialog(katya), [{text:'Ок', action:()=>{katya.follow=true; p.quests.proba='inprogress';}}], katya);
    if(p.quests.proba==='inprogress' && p.inventory.includes('цветопроба')) return showEventNPC('Катя: Отлично, давай цветопробу!', [{text:'Отдать', action:()=>{p.inventory=p.inventory.filter(x=>x!=='цветопроба'); p.quests.proba='done'; katya.follow=false;}}], katya);
  }
  const svetlana=getNPC('Светлана'); if(svetlana && p.at===svetlana.at && !svetlana.said) return showEventNPC(randDialog(svetlana), [{text:'Хорошо, попробуем помочь', action:()=>{svetlana.said=true; p.stress=clamp(p.stress+5,0,100);}}, {text:'Мне срочно дальше', action:()=>{p.stress=clamp(p.stress+10,0,100);}}], svetlana);
  const marina=getNPC('Марина'); if(marina && p.at===marina.at){ const lost=p.inventory.slice(); if(lost.length){ p.inventory=[]; p.stress=clamp(p.stress+10,0,100); return showEventNPC(randDialog(marina)+`<br>Ты теряешь: <b>${esc(lost.join(', '))}</b>. Стресс +10.`, [{text:'Ок'}], marina); } return showEventNPC(randDialog(marina)+'<br>У тебя ничего нет, иди.', [{text:'Ок'}], marina); }
  const arseniy=getNPC('Арсений'); if(arseniy && p.at===arseniy.at && p.quests.proba==='inprogress' && !p.inventory.includes('цветопроба')){ p.inventory.push('цветопроба'); return showEventNPC(randDialog(arseniy)+'<br>Он помог сделать цветопробу.', [{text:'Спасибо'}], arseniy); }
  const kir=getNPC('Александр Кир'); if(kir && p.at===kir.at){ p.stress=clamp(p.stress+12,0,100); return showEventNPC(randDialog(kir)+'<br>Стресс +12.', [{text:'Поскорее уйти'}], kir); }
  const polina=getNPC('Полина'); if(polina && p.at===polina.at){ p.stress=clamp(p.stress-7,0,100); return showEventNPC(randDialog(polina)+'<br>Стресс -7.', [{text:'Улыбнуться'}], polina); }
  const sasha=getNPC('Саша Ха'); if(sasha && p.at===sasha.at){ p.stress=clamp(p.stress-9,0,100); return showEventNPC(randDialog(sasha)+'<br>Стресс -9.', [{text:'Кулак!'}], sasha); }
  const sergey=getNPC('Сергей Ас'); if(sergey && p.at===sergey.at && !sergey.said) return showEventNPC(randDialog(sergey), [{text:'Понял', action:()=>{sergey.said=true;}}], sergey);
  const vladimir=getNPC('Владимир'); if(vladimir && p.at===vladimir.at && !vladimir.said) return showEventNPC(randDialog(vladimir), [{text:'Пожалуй', action:()=>{vladimir.said=true;}}], vladimir);
  const anton=getNPC('Антон'); if(anton && p.at===anton.at && p.inventory.includes('лак')) return showEventNPC('Антон: Отлично, лак готов. Передаю дальше.', [{text:'OK', action:()=>{p.inventory=p.inventory.filter(x=>x!=='лак'); p.quests.lak='done';}}], anton);
  if(anton && p.at===anton.at && p.quests.proba==='done' && p.quests.lak!== 'done') return showEventNPC(randDialog(anton)+'<br>Лак нужно сделать на втором этаже.', [{text:'Пойду делать лак'}], anton);
  const viktor=getNPC('Виктор'); if(viktor && p.at===viktor.at){ if(p.quests.proba==='done' && p.quests.lak==='done') return startQuizBOSS(viktor); return showEventNPC('Виктор: Ты не всё сделал. Где цветопроба и лак?', [{text:'Вернуться', action:()=>{p.stress=clamp(p.stress+8,0,100);}}], viktor); }
}

function showEvent(text, opts=[{text:'Ок'}]){ showEventNPC(text, opts, null); }
function showEventNPC(text, opts=[{text:'Ок'}], npc=null){
  gameState.dialogOpen=true; gameState.player.busy=true;
  const box=byId('eventBox'), portrait=byId('eventPortrait'), body=byId('eventText'), options=byId('eventOptions');
  if(box) box.style.display='flex';
  if(portrait) portrait.innerHTML = npc?.portrait ? `<img src="${esc(npc.portrait)}" alt="${esc(npc.name)}" onerror="this.style.display='none'">` : '';
  if(body) body.innerHTML = text;
  if(options) options.innerHTML = opts.map((o,i)=>`<button class="actionBtn" onclick="eventAction(${i})">${esc(o.text)}</button>`).join('');
  window._eventOpts = opts;
}
function eventAction(idx){ const opts=window._eventOpts||[]; const opt=opts[idx]; const box=byId('eventBox'); if(box) box.style.display='none'; gameState.dialogOpen=false; gameState.player.busy=false; if(opt?.action) opt.action(); renderAll(); setGameTimeout(checkEvents, 50); }

function startQuizBOSS(bossNpc){
  const questions = shuffle(BOSS_QUIZ).slice(0,7); let cur=0; let timer=null; let answered=false;
  function stop(){ if(timer) clearInterval(timer); timer=null; }
  function fail(){ stop(); gameState.player.quests.boss=false; showEventNPC('Ты ошибся или не успел.<br>Готов попробовать снова?', [{text:'Попробовать заново', action:()=>startQuizBOSS(bossNpc)}, {text:'Позже'}], bossNpc); }
  function win(){ stop(); gameState.player.quests.boss='done'; gameState.player.end=true; showEventNPC('Виктор: Поздравляю! Всё правильно! Рабочий день завершён.<br><b>Ты выиграл! 🏆</b>', [{text:'Начать заново', action:resetGame}], bossNpc); }
  function showQ(){ stop(); answered=false; if(cur>=questions.length) return win(); let left=10; const q=questions[cur]; const vars=shuffle(q.answers); const opts=vars.map(a=>({text:a.text, action:()=>{ if(answered) return; answered=true; stop(); if(a.correct){cur++; setGameTimeout(showQ, 250);} else fail(); }})); showEventNPC(`<b>Вопрос ${cur+1} из ${questions.length}:</b><br>${esc(q.question)}<br><span class="timer">Время: <span id="qTimer">${left}</span> сек</span>`, opts, bossNpc); timer=setInterval(()=>{ left--; const t=byId('qTimer'); if(t) t.textContent=left; if(left<=0 && !answered){ answered=true; fail(); } },1000); }
  showQ();
}

function legendOpen(){ let html='<h2>Справка</h2><b>Локации:</b><ul>'; ROOMS.forEach(r=>html+=`<li><b>${esc(r.name)}</b> ${r.icon}: <span class="actor-desc">${esc(r.desc)}</span></li>`); html+='</ul><b>Персонажи:</b><ul>'; NPCS_FULL.forEach(n=>html+=`<li>${n.icon}<b> ${esc(n.name)}</b>: <span class="actor-desc">${esc(n.desc)}</span></li>`); html+='</ul><button onclick="legendClose()" class="actionBtn">Закрыть</button>'; const c=byId('legendCont'), m=byId('descModal'); if(c)c.innerHTML=html; if(m)m.style.display='flex'; }
function legendClose(){ const m=byId('descModal'); if(m)m.style.display='none'; }

window.addEventListener('DOMContentLoaded', () => { document.title = `GOART v${GOART_VERSION} — Рабочий день в типографии`; const h=byId('header'); if(h) h.textContent = `🚀 GOART v${GOART_VERSION} — Рабочий день в типографии`; resetGame(); });

Object.assign(window, { ROOMS, NPCS_FULL, QUESTS, gameState, startGame, resetGame, moveTo, makeProba, makeLak, eventAction, legendOpen, legendClose });
