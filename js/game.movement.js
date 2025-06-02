// game.movement.js

/**
 * Перемещение игрока в комнату — с учетом "пробки"
 */
function moveTo(idx){
  const npcsHere = npcs.filter(n => n.at === idx).length;
  if (npcsHere + 1 > 3) {
    showEvent(
      'В комнате уже максимальное количество людей (3). Подожди, пока кто-то выйдет!',
      [{text: 'OK', action: ()=>{}}]
    );
    return;
  }
  player.at = idx;
  renderAll();
  checkEvents();
}

/**
 * Действие: Сделать цветопробу в Аквариуме
 */
function makeProba(){
  player.inventory.push('цветопроба');
  showEvent('Вы сделали цветопробу!', [{text:'Ок',action:renderAll}]);
}

/**
 * Действие: Сделать лакировку в Лаке
 */
function makeLak(){
  player.inventory.push('лак');
  showEvent('Лак покрыт!', [{text:'Ок',action:renderAll}]);
}
