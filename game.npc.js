// game.npc.js
function kickNpcsFromRoom(roomIdx) {
  npcs.forEach(npc => {
    if (
      npc.name !== 'Марина' &&
      npc.at === roomIdx
    ) {
      const freeHomes = npc.home.filter(idx =>
        idx !== roomIdx &&
        npcs.filter(n => n.at === idx && n.name !== 'Марина').length < 3 &&
        npcs.find(n => n.at === idx && n.name === 'Марина') == null
      );
      if(freeHomes.length) npc.at = freeHomes[Math.floor(Math.random()*freeHomes.length)];
    }
  });
}
function startLoop(){
  stopLoop();
  nlooper = setInterval(()=>{
    if(player.end || dialogOpen) return;
    npcs.forEach(npc => {
      // ... логика NPC
      // Обработка Марина и остальных (как в одной из твоих функций)
      // ...
    });
    if(player.stress>=100){
      player.end=true;
      showEvent('Вы сгорели от стресса! 👎',[{text:'Начать заново',action:resetGame}]);
    }
    renderAll();
    checkEvents();
  }, 1800);
}
