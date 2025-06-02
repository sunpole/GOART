// game.start.js
function startGame(name) {
  player = {
    name: name.length?name:'Новичок', at:0, stress:0, inventory:[],
    busy:false, quests:{proba:false,lak:false,boss:false}, end:false
  };
  npcs = deepClone(NPCS_FULL);
  renderAll();
  startLoop();
}
function resetGame(){
  let n = prompt("Ваше имя?","Новичок")||"Новичок";
  document.getElementById('player-name').innerText = n;
  stopLoop();
  startGame(n);
}
