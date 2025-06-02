// game.movement.js

/**
 * Перемещение игрока в комнату — максимум 3 гостя (NPC в своей комнате и босс не в счёт),
 * "свои" всегда проходят без ограничения.
 */
function moveTo(idx) {
  // Проверяем, своя ли это комната для игрока
  let isOwnRoom = player.home && Array.isArray(player.home) && player.home.includes(idx);

  if (!isOwnRoom) {
    // Считаем гостей в комнате
    const npcsHere = npcs.filter(n => {
      // NPC в своей комнате не мешает и не считается
      if (n.home && Array.isArray(n.home) && n.home.includes(idx)) return false;
      // Босс всегда не в счет (проходит всегда)
      if (n.type === 'boss') return false;
      return n.at === idx;
    }).length;
    if (npcsHere + 1 > 3) {
      showEvent(
        'В комнате уже максимальное количество гостей (3). Подожди, пока кто-то выйдет!',
        [{ text: 'OK', action: () => {} }]
      );
      return;
    }
  }
  player.at = idx;
  renderAll();
  checkEvents();
}

/**
 * Действие: Сделать цветопробу в Аквариуме
 */
function makeProba() {
  player.inventory.push('цветопроба');
  showEvent('Вы сделали цветопробу!', [{text:'Ок',action:renderAll}]);
}

/**
 * Действие: Сделать лакировку в Лаке
 */
function makeLak() {
  player.inventory.push('лак');
  showEvent('Лак покрыт!', [{text:'Ок',action:renderAll}]);
}
