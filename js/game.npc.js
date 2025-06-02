// game.npc.js

/**
 * Выгнать всех NPC (кроме Марины) из комнаты, куда пришла Марина.
 * Ищет свободные home комнаты для каждого NPC-«жертвы».
 */
function kickNpcsFromRoom(roomIdx) {
  npcs.forEach(npc => {
    if (
      npc.name !== 'Марина' &&
      npc.at === roomIdx
    ) {
      // Находим возможные "home" комнаты для ухода
      const freeHomes = npc.home.filter(idx =>
        idx !== roomIdx &&
        // В этой комнате нет Марины
        !npcs.some(n => n.at === idx && n.name === 'Марина') &&
        // Там ещё есть место (не считая Марину)
        npcs.filter(n => n.at === idx && n.name !== 'Марина').length < 3
      );
      if (freeHomes.length) {
        // Выбираем случайную комнату из свободных home
        npc.at = freeHomes[Math.floor(Math.random() * freeHomes.length)];
      }
      // Если вариантов нет — NPC остаётся, где был.
    }
  });
}

/**
 * Основной игровой цикл для NPC. Запускает движение всех NPC раз в 1.8 сек.
 * Обрабатывает поведение Марины и всех прочих с учётом «пробок» и избегания Марины.
 */
function startLoop() {
  stopLoop(); // Чистим, если уже есть

  nlooper = setInterval(() => {
    if (player.end || dialogOpen) return;

    npcs.forEach(npc => {
      // --------- МАРИНА: особое поведение -----------
      if (npc.name === 'Марина') {
        const oldAt = npc.at;
        // Перемешиваем home комнаты Марины
        const shuffled = shuffle(npc.home);
        for (let i = 0; i < shuffled.length; i++) {
          const roomIdx = shuffled[i];
          // Считаем всех, кроме Марины
          const npcsHere = npcs.filter(n => n.at === roomIdx && n.name !== 'Марина').length;
          if (npcsHere < 3) { // Для нее везде есть место
            npc.at = roomIdx;
            break;
          }
        }
        if (npc.at !== oldAt) {
          // Марина вошла — выгоняем остальных!
          kickNpcsFromRoom(npc.at);
        }
        return; // Больше не двигаем Марину
      }

      // ----- Остальные NPC избегают Марину и соблюдают пробку -----
      if (npc.home && Math.random() < 0.7) { // 70% шанс, что NPC пойдёт в home
        const shuffled = shuffle(npc.home);
        for (let i = 0; i < shuffled.length; i++) {
          const roomIdx = shuffled[i];
          // Если в комнате Марина — не идём!
          if (npcs.some(n => n.at === roomIdx && n.name === 'Марина')) continue;
          // Считаем гостей (NPC, кроме этого и кроме Марины)
          const npcsHere = npcs.filter(n => n.at === roomIdx && n !== npc && n.name !== 'Марина').length;
          if (npcsHere + 1 <= 3) { // Если после прихода не будет >3
            npc.at = roomIdx;
            break;
          }
        }
      }
    });

    // Проверка на выгорание игрока
    if (player.stress >= 100) {
      player.end = true;
      showEvent('Вы сгорели от стресса! 👎', [{ text: 'Начать заново', action: resetGame }]);
    }

    renderAll();
    checkEvents();
  }, 1800);
}
