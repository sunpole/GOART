// game.state.js
let player = {};
let npcs = [];
let dialogOpen = false;
let nlooper = null;

// Клонирование, рандом
function deepClone(o){ return JSON.parse(JSON.stringify(o)); }
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function randDialog(npc){
  let rnd = Math.random()*100;
  if(rnd < npc.prob3) return npc.dialog3;
  if(rnd < npc.prob3 + npc.prob2) return npc.dialog2;
  return npc.dialog1;
}
function stopLoop(){
  if(nlooper) clearInterval(nlooper); nlooper=null;
}
