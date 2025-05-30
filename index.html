// --- КАРТА, КОМНАТЫ (узлы) ---
const ROOMS = [
  // 0-5 первый этаж
  { name:'Офис', neighbors:[1,3] },   // 0
  { name:'Коридор', neighbors:[0,2,4] }, // 1
  { name:'Дверь ПРОИЗВОДСТВО', neighbors:[1,5] }, // 2
  { name:'Склад 1 эт', neighbors:[0,4] }, // 3
  { name:'Аквариум (цифра)', neighbors:[1,3,5] }, // 4
  { name:'На 2 этаж', neighbors:[2,4,6] }, // 5
  // 6-10 второй этаж
  { name:'Производство', neighbors:[5,7,8] }, //6
  { name:'Лак', neighbors:[6,8,9] }, //7
  { name:'Паллеты', neighbors:[6,7,9] }, //8
  { name:'Склад 2 эт', neighbors:[7,8,10] }, //9
  { name:'Лифт на 3 этаж', neighbors:[9,11] }, //10
  // 11 третий этаж
  { name:'Кабинет босса', neighbors:[10] }, // 11
];

let player = {
  at:0,          // индекс в ROOMS
  stress:0,      // 0-100
  inventory:[],  // 0-несколько предметов
  quests:{ proba:false, lak:false, boss:false },
  busy:false,
  end:false
};

const QUESTS = [
  {name: 'Цветопроба', id: 'proba', desc:'Сделать цветопробу и отдать Кате'},
  {name: 'Лак', id: 'lak', desc:'Отлакировать и отдать Антону'},
  {name: 'Босс', id: 'boss', desc:'Дойти до босса с выполненными делами'},
];

const initialNpcs = [
  // --- Первый этаж ---
  // Катя: квестодатель, ходит только по офису-коридору
  { name:'Катя', icon:'👩‍🦰', type:'kvest',
    at:0, home:[0,1], follow:false, // home — где живёт
    logic(g){ // если нет цветопробы — квест, потом следует
      if(g.player.at === this.at){
        if(!g.player.quests.proba){
          showEvent('Катя: “Сделай цветопробу!”<br>Я буду следовать за тобой.',[{text:'Ок',action:()=>{this.follow=true;g.player.quests.proba='inprogress';}}]);
        }else if(g.player.inventory.includes('цветопроба')){
          showEvent('Катя: “Спасибо за цветопробу!”',[{text:'Отдать',action:()=>{
            g.player.quests.proba='done';g.player.inventory=g.player.inventory.filter(x=>x!=='цветопроба');this.follow=false;}}]);
        }else if(g.player.quests.proba!=='done'){
          showEvent('Катя ждёт цветопробу!',['Ок']);
        }
      }
      if(this.follow && g.player.quests.proba!=='done') this.at=g.player.at;
      else if(Math.random()<0.5) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  // Светлана: болтунья, часто на проходе офис→коридор
  { name:'Светлана', icon:'👩🏼‍🦱', type:'barrier',
    at:1, home:[0,1], said:false,
    logic(game){
      if(game.player.at===this.at && !this.said){
        game.player.busy=true;
        showEvent('Светлана: “Вам нужно попробовать так, потом… потом... Пока не скажете <i>ХОРОШО МЫ ПОПРОБУЕМ</i> я не уйду!”',
        [{text:'Хорошо, мы попробуем',action:()=>{this.said=true;game.player.busy=false;}}],
        );
      }
      if(Math.random()<0.7&&!this.said) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  // Владимир: нейтрал
  { name:'Владимир',icon:'🧔',type:'neutral',at:0,home:[0,1,2],
    logic(g){
      if(g.player.at===this.at && !this.done){
        showEvent('Владимир: "А это вообще возможно напечатать?"',[{text:'Наверное',action:()=>{this.done=true;}}]);
      }
      if(!this.done && Math.random()<0.6) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  // -- Допечатники --
  { name:'Сергей Ас',icon:'👨‍🦳',type:'tip','at':3,home:[3],
    logic(g){
      if(g.player.at===this.at && !this.done){
        showEvent('Сергей Ас: “Метки на листе, квадратики, всё в пантоне, PDF без теней...”',['Ок']);
        // optionally можно повышать требование к "макету" в финальной логике
        this.done=true;
      }
    }
  },
  { name:'Саша Ха',icon:'👱🏻‍♂️',type:'happy',at:3,home:[3,4],
    logic(g){
      if(g.player.at===this.at){
        g.player.stress=Math.max(0,g.player.stress-10);
        showEvent('Саша Ха приветствует кулаком и ты чувствуешь, что стало полегче. (стресс -10)',['Улыбнуться']);
      }
      if(Math.random()<0.5) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  // -- Цифра (Аквариум) --
  { name:'Марина',icon:'👩🏻',type:'take',at:4,home:[4,1],
    logic(g){
      if(g.player.at===this.at && g.player.inventory.length){
        const lost=g.player.inventory.slice();
        g.player.inventory=[];
        g.player.stress+=10;
        showEvent('Марина: “Скучно? Что ты несёшь? Всё выбрасываю!”<br>Ты теряешь: '+lost.join(', ')+'. (стресс +10)',[{text:'Ок'}]);
      }
      if(Math.random()<0.5) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  { name:'Арсений',icon:'🧑🏻‍💻',type:'fast',at:4,home:[4,1],
    logic(g){
      if(g.player.at===this.at && g.player.quests.proba==='inprogress' && !g.player.inventory.includes('цветопроба')){
        g.player.inventory.push('цветопроба');
        showEvent('Арсений: “Вот цветопроба — быстро всё сделал!”',['Спасибо!']);
      }
      if(Math.random()<0.6) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  { name:'Александр Кир',icon:'🧓',type:'slow',at:4,home:[4,1],
    logic(g){
      if(g.player.at===this.at){
        g.player.stress+=15;
        showEvent('Александр Кир рассказывает “ванильный” анекдот и запускает свой заказ. Ты стоишь и ждёшь… (стресс +15)',['Ну ладно']);
      }
      if(Math.random()<0.5) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  { name:'Палина',icon:'👩‍🎤',type:'chill',at:4,home:[4,1],
    logic(g){
      if(g.player.at===this.at){
        g.player.stress=Math.max(0,g.player.stress-5);
        showEvent('Палина сидит за компом и пьёт пиво 🍺.<br>Стресс чуть спал.',['Поднять настроение']);
      }
      if(Math.random()<0.2) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  { name:'Антон',icon:'🧔🏻‍♂️',type:'lak',at:5,home:[5,7,6],
    logic(g){
      if(g.player.at===this.at&&g.player.quests.lak!=='done'){
        if(g.player.inventory.includes('лак')){
          g.player.inventory=g.player.inventory.filter(x=>x!=='лак');
          g.player.quests.lak='done';
          showEvent('Антон: “Лак сделан! Молодец!”',['Спасибо']);
        }else{
          g.player.busy = true;
          showEvent('Антон заблокировал путь: "Без лака не пущу"',[{text:'Пойду искать лак',action:()=>{g.player.busy=false;}}]);
        }
      }
      if(Math.random()<0.5) this.at=this.home[Math.floor(Math.random()*this.home.length)];
    }
  },
  // --- второй этаж ...
  // Виторг (босс)
  { name:'Виторг',icon:'🦒',type:'boss',at:11,home:[11],
    logic(g){
      if(g.player.at===this.at){
        if(g.player.quests.proba==='done'&&g.player.quests.lak==='done'){
          showEvent('Босс Виторг: “Поздравляю, рабочий день завершён!”<br>Ты выигрываешь!',['Ура!',()=>{
            g.player.end=true; setTimeout(()=>resetGame(), 2000);
          }]);
        } else {
          showEvent('Босс Виторг: “Ты не всё сделал. Где цветопроба и лак?” (вернуться!)',['Ушел']);
          g.player.stress+=10;
        }
      }
    }
  }
];

let npcs; // будут инициализированы resetGame()

// -- UI и рендер (развёрну: карта, инвентарь, стресс...)
function renderMap(){
  let html='';
  for(let i=0;i<ROOMS.length;++i){
    html+=`<div class="room" id="room${i}">
      <b>${ROOMS[i].name}</b><br>
      <div>`;
    if(player.at===i) html+=`<span class="actor">🧑‍💼 (вы)</span>`;
    npcs.filter(n=>n.at===i).forEach(npc=>{
      html+=`<span class="actor" title="${npc.name}">${npc.icon}</span>`;
    }); html+=`</div><div>`;
    // Кнопки перехода
    if(!player.busy&&player.at===i&&!player.end){
      ROOMS[i].neighbors.forEach(j=>{
        html+=`<button class="mapBtn" onclick="goTo(${j})">В ${ROOMS[j].name}</button>`;
      });
      // Спец действия
      if(ROOMS[i].name==='Аквариум (цифра)'&&!player.inventory.includes('цветопроба')&&player.quests.proba==='inprogress'){
        html+=`<button class="mapBtn" onclick="makeProba()">Сделать цветопробу</button>`;
      }
      if(ROOMS[i].name==='Лак'&&!player.inventory.includes('лак')&&player.quests.proba==='done'){
        html+=`<button class="mapBtn" onclick="makeLak()">Сделать лак</button>`;
      }
    }
    html+=`</div></div>`;
  }
  document.getElementById('map').innerHTML=html;
  document.getElementById('stressBar').innerText=player.stress;
  document.getElementById('item').innerText=player.inventory.length?player.inventory.join(', '):'пусто';
  // Список квестов
  let qtxt=''; QUESTS.forEach(q=>{
    qtxt+=`<li>${q.name}: ${player.quests[q.id]==='done'?'✅':'❌'} (${q.desc})</li>`;
  }); document.getElementById('questlog').innerHTML=qtxt;
}

// Перемещение игрока
window.goTo=function(idx){player.at=idx;renderMap();checkEvents();};

// Цветопроба
window.makeProba=function(){
  player.inventory.push('цветопроба');
  showEvent('Вы сделали цветопробу!',['Ок',renderMap]);
};
// Лак
window.makeLak=function(){
  player.inventory.push('лак');
  showEvent('Лак готов!',['Ок',renderMap]);
};

// Диалоги/ивенты
function showEvent(text,opts){
  player.busy=true;
  document.getElementById('eventBox').style.display='block';
  document.getElementById('eventText').innerHTML=text;
  let html='';
  opts.forEach((o,i)=>{
    if(typeof o==='string') html+=`<button onclick="eventAction(${i})">${o}</button>`;
    else html+=`<button onclick="eventAction(${i})">${o.text}</button>`;
  });
  document.getElementById('eventOptions').innerHTML=html;
  window._eventOpts=opts;
}
window.eventAction=function(idx){
  document.getElementById('eventBox').style.display='none';
  let fn=window._eventOpts[idx]; if(typeof fn==='object'&&fn.action) fn=fn.action;
  if(typeof fn==='function') fn();
  player.busy=false;renderMap();
};
// События NPC
function checkEvents(){ npcs.forEach(npc=>npc.logic({player})); }

// Движение NPC (рандомные маршруты каждую 2 сек)
let timerId=null;
function startLoop(){
  if(timerId) clearInterval(timerId);
  timerId=setInterval(()=>{
    if(player.end) return;
    npcs.forEach(npc=>{
      if(npc.follow) return;
      if(npc.home&&npc.home.length){
        npc.at=npc.home[Math.floor(Math.random()*npc.home.length)];
      }
    });
    // Стресс — если >100: game over
    if(player.stress>=100){
      player.end=true;
      showEvent('Вы сгорели от стресса! 👎👎',['Начать заново',resetGame]); return;
    }
    renderMap();checkEvents();
  },1800);
}
// Старт и сброс
window.resetGame=function(){
  player={at:0,stress:0,inventory:[],quests:{proba:false,lak:false,boss:false},busy:false,end:false};
  npcs=JSON.parse(JSON.stringify(initialNpcs)); // клоны NPC
  renderMap();checkEvents();startLoop();
};

// ИНИЦИАЛИЗАЦИЯ
window.onload=()=>{
  document.body.innerHTML=`
  <h2>Рабочий день в типографии</h2>
  <div id="stress">Стресс: <span id="stressBar">0</span> / 100</div>
  <div id="inventory">В руках: <span id="item">пусто</span></div>
  <div>Задачи:<ul id="questlog"></ul></div>
  <div id="map"></div>
  <div id="eventBox" style="display:none">
    <div id="eventText"></div>
    <div id="eventOptions"></div>
  </div>
  <button onclick="resetGame()" style="margin:10px;padding:7px;">Начать заново</button>
  `;
  resetGame();
};
