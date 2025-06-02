// game.render.js

/**
 * Полный рендер всех DOM-частей интерфейса
 */
function renderAll() {
  renderMap();
  renderQuests();
  renderControls();
}

/**
 * Рендер "карты" локаций с персонажами
 */
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
  document.getElementById('item').innerText = player.inventory.length ? player.inventory.join(', ') : 'пусто';
}

/**
 * Рендер квест-лога
 */
function renderQuests(){
  let q = QUESTS.map(qk => `<li>${qk.name}: <b>${player.quests[qk.id]==='done'?'✅':(player.quests[qk.id]?'🕓':'❌')}</b> — <span class='actor-desc'>${qk.desc}</span></li>`).join('');
  document.getElementById('questlog').innerHTML = "<ul>" + q + "</ul>";
}

/**
 * Рендер панели управления (кнопки перемещения и специальные действия)
 */
function renderControls(){
  let html = '';
  let here = player.at;
  let doors = ROOMS[here].doors;
  doors.forEach(idx => {
    // Своя ли эта комната для игрока
    const isOwnRoom = player.home && Array.isArray(player.home) && player.home.includes(idx);
    let disabled = false;
    if (!isOwnRoom) {
      // Считаем только "гостей": NPC, которые тут не home и не boss
      const npcsHere = npcs.filter(n => {
        if (n.home && Array.isArray(n.home) && n.home.includes(idx)) return false;
        if (n.type === 'boss') return false;
        return n.at === idx;
      }).length;
      if (npcsHere + 1 > 3) disabled = true;
    }
    if (disabled) {
      html += `<button class="moveBtn" disabled style="opacity:.5;cursor:not-allowed;">В ${ROOMS[idx].name} ${ROOMS[idx].icon} (переполнено)</button>`;
    } else {
      html += `<button class="moveBtn" onclick="moveTo(${idx})">В ${ROOMS[idx].name} ${ROOMS[idx].icon}</button>`;
    }
  });
  // Спецдействия
  if(ROOMS[here].name==='Аквариум' && !player.inventory.includes('цветопроба') && player.quests.proba==='inprogress'){
    html += `<button class="actionBtn" onclick="makeProba()">Сделать цветопробу</button>`;
  }
  if(ROOMS[here].name==='Лак' && !player.inventory.includes('лак') && player.quests.proba==='done'){
    html += `<button class="actionBtn" onclick="makeLak()">Сделать лак</button>`;
  }
  document.getElementById('control-panel').innerHTML = html;
}
