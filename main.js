// Простая карта: 6 комнат, связь — индекс смежных комнат
const ROOMS = [
  { name: 'Офис', neighbors: [1,3] },
  { name: 'Коридор', neighbors: [0,2,4] },
  { name: 'Дверь ПРОИЗВОДСТВО', neighbors: [1,5] },
  { name: 'Склад', neighbors: [0,4] },
  { name: 'Аквариум (цифра)', neighbors: [1,3,5] },
  { name: 'Выход на 2 этаж', neighbors: [2,4] },
];

// Нач. состояние
let player = { at: 0, hasProba: false, stress: 0, busy: false }; // at — номер комнаты
let inventory = null;

// NPCs
const npcs = [
  {
    name: 'Катя', icon: '👩‍🦰', at: 0, type: 'kvest',
    logic(game) {
      if (game.player.at === this.at) {
        if (!game.player.hasProba) {
          showEvent(
            'Катя: “Сделай цветопробу, пожалуйста!”<br>Пока не сделаешь, я буду ходить с тобой.',
            [{text:'Ок!', action:()=>{ this.follow = true; } }]
          );
        } else {
          showEvent('Катя: “Спасибо за цветопробу!”<br>(Катя довольна и уходит)', [
            {text:'Отдать цветопробу', action:()=>{ game.player.hasProba=false; inventory=null; this.follow=false; moveNPC(this,0); }},
          ]);
        }
      }
      if (this.follow) this.at = game.player.at; // всегда за игроком
    },
    follow: false
  },

  {
    name: 'Светлана', icon: '👩🏼‍🦱', at: 0, type: 'barrier',
    logic(game) {
      if (game.player.at === this.at) {
        if (!this.said) {
          game.player.busy = true;
          showEvent(
            'Светлана: “Вам нужно попробовать сделать так, а потом… а еще…”<br>Пока не скажешь "Хорошо, мы попробуем", я не отойду!',
            [
              {text:'Хорошо, мы попробуем', action:()=>{this.said=true; game.player.busy=false;} },
              {text:'Не хочу', action:()=>{this.said=false; game.player.busy=true;} }
            ]
          );
        }
      }
    },
    said: false
  },

  {
    name: 'Марина', icon: '👩🏻', at: 4, type: 'take',
    logic(game) {
      if (game.player.at === this.at && inventory) {
        game.player.busy = true;
        inventory = null; game.player.hasProba = false;
        showEvent('Марина: “Что несешь? Это лишнее! На, выброшу!” — Вы теряете предмет!', [
          {text: 'Эх...', action:()=>{game.player.busy = false;}}
        ]);
      }
    }
  },
];

// UI — карта
function renderMap() {
  let html = '';
  for (let i = 0; i < ROOMS.length; ++i) {
    html += `<div class="room" id="room${i}">
      <b>${ROOMS[i].name}</b><br>
      <div>`;
    if (player.at === i) html += `<span class="actor">🧑‍💼 (вы)</span>`;
    npcs.filter(n=>n.at===i).forEach(npc=>{
      html += `<span class="actor" title="${npc.name}">${npc.icon}</span>`;
    });
    html += `</div><div>`;
    if (!player.busy && player.at === i) {
      // Перемещение
      ROOMS[i].neighbors.forEach(j=>{
        html += `<button class="mapBtn" onclick="goTo(${j})">В ${ROOMS[j].name}</button>`;
      });
      // Спец действия
      if (ROOMS[i].name === 'Аквариум (цифра)' && !player.hasProba) {
        html += `<button class="mapBtn" onclick="makeProba()">Сделать цветопробу (синий принтер)</button>`;
      }
    }
    html += `</div>`;
    html += `</div>`;
  }
  document.getElementById('map').innerHTML = html;
  document.getElementById('item').innerText = inventory ? inventory : 'пусто';
  document.getElementById('stressBar').innerText = player.stress;
}

// Переместиться
window.goTo = function(idx) {
  player.at = idx;
  renderMap(); // обновить UI
  checkEvents();
}

// Цветопроба
window.makeProba = function() {
  inventory = 'цветопроба';
  player.hasProba = true;
  showEvent('Вы сделали лист цветопробы и взяли его в руки!', [{text:'Ок', action:()=>{renderMap();}}]);
};

function showEvent(text, opts) {
  player.busy = true;
  document.getElementById('eventBox').style.display = 'block';
  document.getElementById('eventText').innerHTML = text;
  let html = '';
  opts.forEach((o,i)=>{
    html += `<button onclick="eventAction(${i})">${o.text}</button> `;
  });
  document.getElementById('eventOptions').innerHTML = html;
  window._eventOpts = opts;
}

window.eventAction = function(idx) {
  document.getElementById('eventBox').style.display = 'none';
  window._eventOpts[idx].action();
  player.busy = false;
  renderMap();
};

// Проверить события NPC
function checkEvents() {
  npcs.forEach(npc => npc.logic({ player }));
}

// Движение NPC каждые 2 сек, кроме следящих(Катя)
setInterval(()=>{
  npcs.forEach(npc=>{
    if(npc.follow) return; // не двигаем Катю, если она прилипла
    let neighbors = ROOMS[npc.at].neighbors;
    npc.at = neighbors[Math.floor(Math.random()*neighbors.length)];
  });
  renderMap();
  checkEvents();
}, 2000);

// ===== ИНИЦИАЛИЗАЦИЯ
renderMap();
checkEvents();
