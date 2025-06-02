// game.movement.js
function moveTo(idx){
  const npcsHere = npcs.filter(n => n.at === idx).length;
  if (npcsHere + 1 > 3) {
    showEvent('В комнате уже максимальное количество людей (3). Подожди, пока кто-то выйдет!', [{text: 'OK', action: ()=>{}}]);
    return;
  }
  player.at = idx;
  renderAll();
  checkEvents();
}
function makeProba(){
  player.inventory.push('цветопроба');
  showEvent('Вы сделали цветопробу!',[{text:'Ок',action:renderAll}]);
}
function makeLak(){
  player.inventory.push('лак');
  showEvent('Лак покрыт!', [{text:'Ок',action:renderAll}]);
}
