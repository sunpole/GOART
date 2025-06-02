// game.start.js

/**
 * Инициализация новой игры
 * @param {string} name Имя игрока (может быть пустым)
 */
function startGame(name) {
  player = {
    name: name && name.length ? name : 'Новичок',
    at: 0,
    stress: 0,
    inventory: [],
    busy: false,
    quests: {proba: false, lak: false, boss: false},
    end: false
  };
  npcs = deepClone(NPCS_FULL); // NPCS_FULL — отдельно импортируется из data-npc.js
  renderAll();
  startLoop(); // startLoop — из game.npc.js
}

/**
 * Запуск/перезапуск игры с выбором имени пользователя
 */
function resetGame() {
  let n = prompt("Ваше имя?", "Новичок") || "Новичок";
  document.getElementById('player-name').innerText = n;
  stopLoop(); // stopLoop — глобальная функция из npc/loop
  startGame(n);
}
