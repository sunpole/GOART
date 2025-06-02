// ============= КАРТА ЛОКАЦИЙ =============  
const ROOMS = [  
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
  {name:'Кабинет босса',icon:'👔',doors:[9], desc:'Офис Виктора. Доступен только после всех дел.'}  
];  

// ============= NPCS с тройными диалогами, шансами, портретами =============  
const NPCS_FULL = [
  {
    name:'Катя',
    icon:'👩',
    dialog1:"Катя: Ау, ну сделай цветопробу.",
    dialog2:"Катя: Ты что забыл про цветопробу?",
    dialog3:"Катя: Ау, бой - шарься без чила на цифряк и шекай мне цветку по фасту!!!"
  },
  {
    name:'Светлана',
    icon:'👩🏼‍🦱',
    dialog1:"Светлана: Почему вы потеряли мои файлы! Просто ты должен это сделать!.",
    dialog2:"Светлана: ну как можно было не найти мой файл...",
    dialog3:"Светлана: а на самом деле, моя соседка вязать начала..."
  },
  {
    name:'Владимир',
    icon:'👶',
    dialog1:"Владимир: я так понимаю мы в типографии?.",
    dialog2:"Владимир: я хотел бы узнать, как мы делаем это всё?",
    dialog3:"Владимир: а дозаливки куда по сколько грамм заливать???"
  },
  {
    name:'Сергей Ас',
    icon:'🧓',
    dialog1:"Сергей Ас: Увлажнение цилиндров, спектрофотометрия, трипликат, колориметрическая калибровка, флаппинг, инспекционный прогон.",
    dialog2:"Сергей Ас: Перцепционный рип, импозиционный шаблон, спектральная проба, треппинг, микрорастровая структура, денситометрический контроль, растровый клиринг, стохастическая генерация",
    dialog3:"Сергей Ас: Градуирование кернинга, регулярные экспрешены импозиции, автофлоу верстки, сорсинг от шрифтового пула, дифференциальный спуск полос, эмбеддинг глифов, параметризация лидинга, контроль орфографических стилей."
  },
  {
    name:'Саша Ха',
    icon:'🤵',
    dialog1:"Саша Ха: давай кулак.",
    dialog2:"Саша Ха: а кто возьмет на проверочку тк?",
    dialog3:"Саша Ха: я говорил вам раньше про CorelDRAW..."
  },
  {
    name:'Марина',
    icon:'👩‍🔬',
    dialog1:"Марина: Ты что еще тут? Пшёл от сюда!",
    dialog2:"Марина: ПРОСТО УЙДИ!",
    dialog3:"Марина: Ммм - какая я красивая [красуется у зеркала]"
  },
  {
    name:'Арсений',
    icon:'🧑‍',
    dialog1:"Арсений: Давай я сделаю это быстрее.",
    dialog2:"Арсений: Привет",
    dialog3:"Арсений: е2-е4... мат."
  },
  {
    name:'Александр Кир',
    icon:'👨‍🦳',
    dialog1:"Александр Кир: Вот в семьдесят восьмом мы резали пленку ножницами, монтаж делали на воске, фотонабор на «Линотроне», краски вручную мешали, а контрольный оттиск проверял Иван Петрович лично.",
    dialog2:"Александр Кир: В 80-х мы на газетных ротациях химию сами замешивали, чтоб не пузырило, а тексты правили на прозрачных плёнках райтерами, потом всё сутки под прессом держали.",
    dialog3:"Александр Кир: Помню, как в типографии стояли коробки с плёнками — не то что сейчас ваши флешки, всё по памяти, линейкой и осторожно, чтобы ни одной пылинки на экспонировании."
  },
  {
    name:'Полина',
    icon:'👸',
    dialog1:"Полина: Позовите Антона, у меня новые стрелки на лице!",
    dialog2:"Полина: Хаюшки",
    dialog3:"Полина: Опять образцы?"
  },
  {
    name:'Антон',
    icon:'💂‍♂️',
    dialog1:"Антон: Доброе утро, хорошего дня!",
    dialog2:"Антон: Ха-ха-ха, хи-хи-хи. Ладно я пошел на лак.",
    dialog3:"Антон: Аааа... не вероятно, ладно всем пока!"
  },
  {
    name:'Виктор',
    icon:'🦒',
    dialog1:"",
    dialog2:"",
    dialog3:""
  }
];

const QUESTS = [  
  {name:'Цветопроба',id:'proba',desc:'Сделать цветопробу для Кати'},  
  {name:'Лак',id:'lak',desc:'Отлакировать на втором этаже'},  
  {name:'Финал',id:'boss',desc:'Дойти к боссу, пройти блиц и завершить день'}  
];  

// ============= ГЛОБАЛЬНОЕ СОСТОЯНИЕ =============  
let player = {};  
let npcs = [];  
let dialogOpen = false;  

// ==== УТИЛИТЫ ====  
function deepClone(o){ return JSON.parse(JSON.stringify(o)); }  
function randDialog(npc){  
  let rnd = Math.random()*100;  
  if(rnd < npc.prob3) return npc.dialog3;  
  if(rnd < npc.prob3 + npc.prob2) return npc.dialog2;  
  return npc.dialog1;  
}  

// ========== СТАРТ И СБРОС =========  
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
  let n = prompt("Ваше имя?","Новичок")||"Новичок";  
  document.getElementById('player-name').innerText = n;  
  stopLoop();  
  startGame(n);  
}  

// ========= РЕНДЕРИНГ =========  
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
    if(player.at===i)  
      html += `<span class="actor actor-ego" title="Это вы!">🧑‍💼<br><span class="actor-name">${player.name}</span></span>`;  
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
  let html = '';  
  let here = player.at, doors = ROOMS[here].doors;  
  doors.forEach(idx=>{
    // Считаем NPC в целевой комнате
    const npcsHere = npcs.filter(n => n.at === idx).length;
    // Если там уже 3 или более - кнопка неактивна
    if(npcsHere + 1 > 3){
      html += `<button class="moveBtn" disabled style="opacity:.5;cursor:not-allowed;">В ${ROOMS[idx].name} ${ROOMS[idx].icon} (переполнено)</button>`;  
    } else {
      html += `<button class="moveBtn" onclick="moveTo(${idx})">В ${ROOMS[idx].name} ${ROOMS[idx].icon}</button>`;  
    }
  });
  if(ROOMS[here].name==='Аквариум'&&!player.inventory.includes('цветопроба')&&player.quests.proba==='inprogress'){  
    html += `<button class="actionBtn" onclick="makeProba()">Сделать цветопробу</button>`;  
  }  
  if(ROOMS[here].name==='Лак'&&!player.inventory.includes('лак')&&player.quests.proba==='done'){  
    html += `<button class="actionBtn" onclick="makeLak()">Сделать лак</button>`;  
  }  
  document.getElementById('control-panel').innerHTML = html;  
}



// ========= ОСНОВНОЙ ЦИКЛ ==========
let nlooper = null;
function stopLoop(){
  if(nlooper) clearInterval(nlooper); nlooper=null;
}

// -------- ФУНКЦИЯ: выгнать NPC из комнаты Марины --------
// ========= простраснтво марины ==========
function kickNpcsFromRoom(roomIdx) {
  npcs.forEach(npc => {
    if (
      npc.name !== 'Марина' &&
      npc.at === roomIdx
    ) {
      // Найти куда уйти: в любую свою доступную комнату, где Марина НЕ находится и где мест < 3
      const freeHomes = npc.home.filter(idx =>
        idx !== roomIdx &&
        npcs.filter(n => n.at === idx && n.name !== 'Марина').length < 3 && // не переполнено
        npcs.find(n => n.at === idx && n.name === 'Марина') == null // там нет Марины
      );
      if(freeHomes.length) npc.at = freeHomes[Math.floor(Math.random()*freeHomes.length)];
      // Если совсем некуда идти, пусть приходит в комнату, но это маловероятно (зависит от структуры home)
    }
  });
}

function startLoop(){
  stopLoop();
  nlooper = setInterval(()=>{
    if(player.end || dialogOpen) return;

    npcs.forEach(npc => {
      // ---------- МАРИНА: особое поведение ----------
      if (npc.name === 'Марина') {
        const oldAt = npc.at;
        const shuffled = shuffle(npc.home);
        for (let i = 0; i < shuffled.length; i++) {
          const roomIdx = shuffled[i];
          const npcsHere = npcs.filter(n => n.at === roomIdx && n.name !== 'Марина').length;
          if (npcsHere < 3) {
            npc.at = roomIdx;
            break;
          }
        }
        if (npc.at !== oldAt) {
          kickNpcsFromRoom(npc.at);
        }
        return; // обработали Марину
      }
      // ---------- Остальные NPC избегают Марину ----------
      if (npc.home && Math.random() < 0.7) {
        const shuffled = shuffle(npc.home);
        for (let i = 0; i < shuffled.length; i++) {
          const roomIdx = shuffled[i];
          // Если в этой комнате есть Марина — пропускаем её!
          if (npcs.find(n => n.at === roomIdx && n.name === 'Марина')) continue;
          const npcsHere = npcs.filter(n => n.at === roomIdx && n !== npc && n.name !== 'Марина').length;
          if (npcsHere + 1 <= 3) {
            npc.at = roomIdx;
            break;
          }
        }
      }
    });

    if(player.stress>=100){
      player.end=true;
      showEvent('Вы сгорели от стресса! 👎',[{text:'Начать заново',action:resetGame}]);
    }
    renderAll();
    checkEvents();
  }, 1800);
}


// ============= ЛОГИКА ПЕРЕМЕЩЕНИЯ ==========  
function moveTo(idx){
  // Считаем NPC в этой комнате
  const npcsHere = npcs.filter(n => n.at === idx).length;
  // “Людей” будет npcsHere + игрок (если переместится)
  if (npcsHere + 1 > 3) {
    showEvent('В комнате уже максимальное количество людей (3). Подожди, пока кто-то выйдет!', [{text: 'OK', action: ()=>{}}]);
    return;
  }
  player.at = idx;
  renderAll();
  checkEvents();
}

// --------- ДЕЙСТВИЯ В КОМНАТАХ -----------  
function makeProba(){  
  player.inventory.push('цветопроба');  
  showEvent('Вы сделали цветопробу!',[{text:'Ок',action:renderAll}]);  
}  
function makeLak(){  
  player.inventory.push('лак');  
  showEvent('Лак покрыт!', [{text:'Ок',action:renderAll}]);  
}  

// ============= ЛОГИКА NPC, КВЕСТОВ, СОБЫТИЙ ==========  
function checkEvents(){  
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
    // Было:
    // showEventNPC(
    //   "Марина: У тебя ничего нет — ну и ладно, всё равно уйди!",
    //   [{text:'Ок',action:()=>{}}],
    //   mar
    // );
    // Стало:
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
  // --- ПАЛИНА ---
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

// ==== МОДАЛКА ДИАЛОГА С ФОТО NPC ===
function showEventNPC(text, opts, npc){
  dialogOpen = true;
  player.busy = true;
  document.getElementById('eventBox').style.display = 'block';
  // Если портрет есть — покажем, иначе пусто
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
  document.getElementById('eventPortrait').innerHTML = ""; // не NPC — не показываем
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


// --- Блиц вопросы Виктора
const BOSS_QUIZ = [
  {
    question: "Что означает C в аббревиатуре CMYK?",
    answers: [
      { text: "C = Циан", correct: true },
      { text: "C = Color", correct: false },
      { text: "C = Синий", correct: false },
      { text: "C = Contour", correct: false }
    ]
  },
  {
    question: "Что такое Pantone?",
    answers: [
      { text: "Спецпалитра для подбора фирменных цветов", correct: true },
      { text: "Международный стандарт цветопередачи для печати", correct: false },
      { text: "Цветовая гамма для производства дизайнерской бумаги", correct: false },
      { text: "Таблица оттенков для выбора лаковых покрытий", correct: false }
    ]
  },
  {
    question: "Что важно для вывода макета в печать?",
    answers: [
      { text: "CMYK, обрезные метки, без прозрачностей", correct: true },
      { text: "Выпуски под обрез, цветовые профили, без обводок", correct: false },
      { text: "CMYK, оригинальное разрешение, с тенями и белым фоном", correct: false },
      { text: "Выпуски под обрез, режущие линии, без прозрачностей", correct: false }
    ]
  },
  {
    question: "Что такое допечатная подготовка?",
    answers: [
      { text: "Проверка и настройка макета перед печатью", correct: true },
      { text: "Настройка параметров бумаги и резки для печати", correct: false },
      { text: "Определение формата макета и типа лака", correct: false },
      { text: "Проверка цветопередачи и выпусков под обрез", correct: false }
    ]
  },
  {
    question: "Почему PDF предпочтительнее для офсетной печати?",
    answers: [
      { text: "Корректно сохраняет вектор и шрифты", correct: true },
      { text: "Поддерживает цветовые профили и макеты", correct: false },
      { text: "Удобно сохраняет прозрачности и отступы", correct: false },
      { text: "Сохраняет все макеты без искажений", correct: false }
    ]
  },
  {
    question: "Зачем нужны плашечные цвета?",
    answers: [
      { text: "Для согласования специальных фирменных оттенков", correct: true },
      { text: "Для имитации насыщенных теней и бликов", correct: false },
      { text: "Для подбора точных цветовых смесей в макете", correct: false },
      { text: "Для выделения отдельных элементов дизайна", correct: false }
    ]
  },
  {
    question: "Что такое лакировка?",
    answers: [
      { text: "Нанесение защитного покрытия на тираж", correct: true },
      { text: "Покрытие отдельных элементов специальным составом", correct: false },
      { text: "Создание матовой или глянцевой поверхности макета", correct: false },
      { text: "Обработка отпечатка для повышения износостойкости", correct: false }
    ]
  }
];



function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function startQuizBOSS(bossNpc){
  let questions = shuffle(BOSS_QUIZ.slice());
  let cur = 0;
  let timer = null;
  let isAnswered = false;

  function failQuiz(){
    if(timer) clearInterval(timer);
    player.quests.boss = false; // сброс квеста!
    player.end = false;
    dialogOpen = true;
    player.busy = true;
    showEventNPC(
      `Ты ошибся или не успел!<br>Готов попробовать снова?`, 
      [{text:'Попробовать заново', action:()=> {
        dialogOpen = false;
        player.busy = false;
        startQuizBOSS(bossNpc);
      }}],
      bossNpc
    );
  }

  function winQuiz(){
    if(timer) clearInterval(timer);
    player.quests.boss = 'done';
    player.end = true;
    dialogOpen = true;
    player.busy = true;
    showEventNPC(
      `Виктор: “Поздравляю! Всё правильно! Рабочий день завершён.<br>
      <b>Ты выиграл! 🏆</b>”`,
      [{text:'Начать заново',action:resetGame}],
      bossNpc
    );
  }

  function showQ() {
    if(timer) clearInterval(timer); // стоп, если вдруг запущен был ранее
    isAnswered = false;
    if(cur >= 7) return winQuiz(); // 7 верных подряд = победа

    let timeLeft = 10;
    let q = questions[cur], vars = shuffle(q.answers.slice());

    let qt = `<b>Вопрос ${cur+1} из 7:</b><br>${q.question}` +
      `<br><span style="color:#888;font-size:11px;">Время: <span id="qTimer">${timeLeft}</span> сек</span>`;
    let opts = vars.map(a=>({
      text: a.text,
      action: ()=>{
        if(isAnswered) return;
        isAnswered = true;
        if(timer) clearInterval(timer);
        if(a.correct){
          cur++;
          setTimeout(showQ, 300);
        } else {
          failQuiz();
        }
      }
    }));

    showEventNPC(qt, opts, bossNpc);

    timer = setInterval(()=>{
      timeLeft--;
      let t=document.getElementById('qTimer');
      if(t) t.innerText = timeLeft;
      if(timeLeft<=0 && !isAnswered){
        clearInterval(timer);
        isAnswered = true;
        failQuiz();
      }
    },1000);
  }

  showQ();
}
// ============= СПРАВКА/ЛЕГЕНДА ==============
function legendOpen(){
  let html = "<b>Локации:</b><ul>";
  ROOMS.forEach(r=>{html+=`<li><b>${r.name}</b> ${r.icon}: <span class='actor-desc'>${r.desc}</span></li>`;});
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
// ============= СТАРТ ===========
window.onload=()=>{resetGame();};
