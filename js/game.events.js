// game.events.js

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

// === Глобальные состояния для блица ===
let lastRoomBeforeBoss = null;
let quizInProgress = false;

// === checkEvents() ===
function checkEvents() {
  if (player.end) return;    // Игра завершена - ничего не вызываем

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
    if(player.quests.proba==='done' && player.quests.lak==='done') {
      if(player.quests.boss==='done') {
        // Финал уже пройден, блокируем любые действия
        showEventNPC(
          `Виктор: Блиц уже пройден! <br>Рабочий день завершён. <b>Поздравляем!</b>`,
          [{text:'Начать заново',action:resetGame}],
          boss
        );
        return;
      }
      if(quizInProgress){
        return; // Блиц уже идет – ничего не делать!
      }
      // Если блиц был провален, либо ещё не запускался
      showEventNPC(
        `Виктор: Ты готов пройти финальный блиц?`,
        [
          {text:'Да!',action:()=>{quizInProgress=true; lastRoomBeforeBoss = (lastRoomBeforeBoss ?? findPrevRoom()); startQuizBOSS(boss);}},
          {text:'Нет', action:()=>{}}
        ],
        boss
      );
      return;
    } else {
      showEventNPC('Виктор: “Ты не всё сделал.<br>Где цветопроба и лак?” (вернуться!)',[{text:'Ушел',action:()=>{player.stress+=8;}}],boss);
      return;
    }
  }
}

// --- Вспомогательная функция (поиск прошлой комнаты) ---
function findPrevRoom() {
  // Если только что зашли в кабинет босса, возвратить любую смежную дверь (1-я по списку)
  let bossRoom = 12;
  if (ROOMS && ROOMS[bossRoom] && ROOMS[bossRoom].doors.length) {
    return ROOMS[bossRoom].doors[0];
  }
  return 0;
}

// --- МОДАЛКА ДИАЛОГА С ФОТО NPC ---
function showEventNPC(text, opts, npc){
  if(player.end) return; // Если финал – никаких событий!
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
  if(player.end) return; // Только финальное окно
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
  if (player.end) return; // никакой активности после конца!
  document.getElementById('eventBox').style.display='none';
  let fn=window._eventOpts[idx];
  if(typeof fn==='object'&&fn.action) fn=fn.action;
  if(typeof fn==='function') fn();
  player.busy=false;
  dialogOpen = false;
  renderAll();
};

function startQuizBOSS(bossNpc){
  let questions = shuffle(BOSS_QUIZ.slice());
  let cur = 0;
  let timer = null;
  let isAnswered = false;

  function failQuiz(){
    if(timer) clearInterval(timer);
    player.quests.boss = false;
    quizInProgress = false;
    // Перемещаем игрока обратно из кабинета босса
    if(lastRoomBeforeBoss !== null) {
      player.at = lastRoomBeforeBoss;
      lastRoomBeforeBoss = null;
    }
    renderAll();
    showEvent(
      `Вы ошиблись! Пройти блиц можно будет при следующем визите к боссу.`,
      [{text:'Ок',action:()=>{}}],
    );
  }

  function winQuiz(){
    if(timer) clearInterval(timer);
    player.quests.boss = 'done';
    player.end = true;
    quizInProgress = false;
    renderAll();
    setTimeout(()=>{
      showEventNPC(
        `Виктор: “Поздравляю! Всё правильно! Рабочий день завершён.<br>
        <b>Ты выиграл! 🏆</b>"`,
        [{text:'Начать заново',action:resetGame}],
        bossNpc
      );
    }, 400);
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
