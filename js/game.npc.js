// game.npc.js

/**
 * Выгнать всех NPC (кроме Марины) из комнаты, куда пришла Марина
 * Используется только для особенности поведения Марины
 */
function kickNpcsFromRoom(roomIdx) {
  npcs.forEach(npc => {
    if (
      npc.name !== 'Марина' &&
      npc.at === roomIdx
    ) {
      // Найти возможные комнаты для ухода: только свои home,
      // куда ещё нет Марины и где людей (не считая Марину) < 3
      const freeHomes = npc.home.filter(idx =>
        idx !== roomIdx &&
        npcs.filter(n => n.at === idx && n.name !== 'Марина').length < 3 &&
        !npcs.some(n => n.at === idx && n.name === 'Марина')
      );
      if(freeHomes.length)
        npc.at = freeHomes[Math.floor(Math.random() * freeHomes.length)];
      // Если совсем некуда — остаётся.
    }
  });
}

/**
 * Главное: запуск/перезапуск цикла NPC — двигает их каждые 1.8 сек
 */
function startLoop() {
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
        return; // Обработали Марину, не двигаем далее!
      }
      // ---------- Остальные NPC избегают Марину ----------
      if (npc.home && Math.random() < 0.7) {
        const shuffled = shuffle(npc.home);
        for (let i = 0; i < shuffled.length; i++) {
          const roomIdx = shuffled[i];
          // Если тут Марина — пропускаем
          if (npcs.some(n => n.at === roomIdx && n.name === 'Марина')) continue;
          const npcsHere = npcs.filter(n => n.at === roomIdx && n !== npc && n.name !== 'Марина').length;
          if (npcsHere + 1 <= 3) {
            npc.at = roomIdx;
            break;
          }
        }
      }
    });

    // Проверка выгорания
    if(player.stress >= 100){
      player.end = true;
      showEvent('Вы сгорели от стресса! 👎', [{text:'Начать заново', action:resetGame}]);
    }
    renderAll();
    checkEvents();
  }, 1800);
}
