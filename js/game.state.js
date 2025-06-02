// game.state.js

// Глобальное состояние игры
let player = {};   // Объект игрока (инициализируется в startGame)
let npcs = [];     // Массив NPC (инициализируется в startGame)
let dialogOpen = false;
let nlooper = null; // ID таймера игрового цикла

// Utility: глубокое копирование объекта/массива (для простых данных)
function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

// Utility: случайное перемешивание массива (Fisher–Yates)
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Utility: Выбор диалога с вероятностями для NPC
function randDialog(npc) {
  let rnd = Math.random() * 100;
  if (rnd < npc.prob3) return npc.dialog3;
  if (rnd < npc.prob3 + npc.prob2) return npc.dialog2;
  return npc.dialog1;
}

// Остановка игрового цикла
function stopLoop() {
  if (nlooper) clearInterval(nlooper);
  nlooper = null;
}
