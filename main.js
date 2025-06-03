// ============= КАРТА ЛОКАЦИЙ =============
/**
 * Room — структура описания локации/комнаты
 * @typedef {Object} Room
 * @property {number} id          — Уникальный идентификатор комнаты
 * @property {string} name        — Название комнаты
 * @property {string} icon        — Эмодзи для визуализации
 * @property {number[]} doors     — Список id соседних комнат (связи, переходы)
 * @property {string} desc        — Краткое текстовое описание
 * @property {number} [limit]     — Максимум людей в комнате (опционально, по умолчанию 3)
 */

/** @type {Room[]} */
const ROOMS = [
  {id: 0, name:'Офис',           icon:'🏢',  doors:[1,4],     desc:'Здесь работают специалисты по клиентам и бывают допечатники.',   limit: 15},
  {id: 1, name:'Коридор',        icon:'🚪',  doors:[0,2,5],   desc:'Здесь все проходят из офиса в аквариум.',                        limit: 5},
  {id: 2, name:'Склад 1 эт',     icon:'📦',  doors:[1,3,6],   desc:'Место для расходников и паллет.',                                limit: 3},
  {id: 3, name:'ПР. цех дверь',  icon:'🚧',  doors:[2,7],     desc:'Проход на производство.',                                       limit: 2},
  {id: 4, name:'Аквариум',       icon:'🖨',  doors:[0,5,8],   desc:'Цифровая печать, тут толпа цифровиков.',                        limit: 3},
  {id: 5, name:'Коридор 2',      icon:'⬅️',  doors:[1,4,6],   desc:'Проход между аквариумом и складом.',                            limit: 5},
  {id: 6, name:'Дверь на 2 эт',  icon:'⬆️',  doors:[2,5,9],   desc:'Лестница на второй этаж.',                                      limit: 2},
  {id: 7, name:'Проход в произв.',icon:'🚧', doors:[3,6,10],  desc:'Вход на большой цех.',                                          limit: 2},
  {id: 8, name:'Производство',   icon:'🏭',  doors:[4,9,11],  desc:'Шумный зал с машинами, коробки, пакеты, полки.',                 limit: 5},
  {id: 9, name:'Лак',            icon:'💧',  doors:[6,8,12],  desc:'Лакировка, Антон частенько тут.',                                limit: 2},
  {id:10, name:'Паллеты',        icon:'🪵',  doors:[7,8,11],  desc:'Завалено коробками.',                                           limit: 3},
  {id:11, name:'Склад 2 эт',     icon:'📦',  doors:[8,10],    desc:'Все запасы и расходники.',                                      limit: 3},
  {id:12, name:'Кабинет босса',  icon:'👔',  doors:[9],       desc:'Офис Виктора. Доступен только после всех дел.',                 limit: 2}
];


// ============= NPCS =============  

// spawnDelay и moveInterval будут назначаться при запуске (spawnDelay рандомно, moveInterval из конфига!)  
// spawnDelay в самом массиве можно не задавать  
/**
 * NPC — структура описания персонажа
 * @typedef {Object} NPC
 * @property {string} name           — Имя персонажа (отображается)
 * @property {string} icon           — Эмодзи
 * @property {string} portrait       — Картинка
 * @property {string} desc           — Краткое описание для справки
 * @property {string} type           — Класс/тип персонажа ("kvest", "barrier", ...)
 * @property {number[]} home         — Список id комнат, между которыми ходит NPC
 * @property {number} workplace      — Главная локация персонажа
 * @property {number} spawn          — Где появляется
 * @property {number} moveInterval   — Интервал перемещений (мс)
 * @property {boolean} [follow]      — Следует ли за игроком (для логики)
 * @property {boolean} [said]        — Говорил ли сюжетную фразу (для триггеров)
 * @property {string} [dialog1]      — Первый вариант фразы
 * @property {number} [prob1]
 * @property {string} [dialog2]
 * @property {number} [prob2]
 * @property {string} [dialog3]
 * @property {number} [prob3]
 */

/** @type {NPC[]} */
const NPCS_FULL = [
  {
    name:'Катя', icon:'👩',
    portrait: "img/katya.jpg",
    desc:'Клиентский менеджер. Всегда просит сделать цветопробу.',
    type:'kvest',
    home:[0,1],
    workplace: 1,
    spawn: 0,
    moveInterval: 9000,
    follow:false,
    dialog1:"Катя: Ау, ну сделай цветопробу.", prob1:60,
    dialog2:"Катя: Ты что забыл про цветопробу?", prob2:30,
    dialog3:"Катя: Ау, бой - шарься без чила на цифряк и шекай мне цветку по фасту!!!.", prob3:10
  },
  {
    name:'Светлана', icon:'👩🏼‍🦱',
    portrait: "img/svetlana.jpg",
    desc:'Взрослая болтушка, любит задержать у двери длинным разговором.',
    type:'barrier',
    home:[0,1],
    workplace: 0,
    spawn: 0,
    moveInterval: 6000,
    said:false,
    dialog1:"Светлана: Почему вы потеряли мои файлы! Просто ты должен это сделать!.", prob1:60,
    dialog2:"Светлана: ну как можно было не найти мой файл...", prob2:30,
    dialog3:"Светлана: а на самом деле, моя соседка вязать начала...", prob3:10
  },
  {
    name:'Владимир', icon:'👶',
    portrait: "img/vladimir.jpg",
    desc:'Новый, просто интересуется, что тут делают.',
    type:'neutral',
    home:[0,1,2],
    workplace: 2,
    spawn: 0,
    moveInterval: 18000,
    dialog1:"Владимир: я так понимаю мы в типографии?.", prob1:60,
    dialog2:"Владимир: я хотел бы узнать, как мы делаем это всё?", prob2:30,
    dialog3:"Владимир: а дозаливки куда по сколько грамм заливать???", prob3:10
  },
  {
    name:'Сергей Ас', icon:'🧓',
    portrait: "img/sergey.jpg",
    desc:'Старший допечатник, ворчит по делу о макетах и метках.',
    type:'tip',
    home:[2,1],
    workplace: 2,
    spawn: 0,
    moveInterval: 36000,
    said:false,
    dialog1:"Сергей Ас: Увлажнение цилиндров, спектрофотометрия, трипликат, колориметрическая калибровка, флаппинг, инспекционный прогон.", prob1:60,
    dialog2:"Сергей Ас: Перцепционный рип, импозиционный шаблон, спектральная проба, треппинг, микрорастровая структура, денситометрический контроль, растровый клиринг, стохастическая генерация.", prob2:30,
    dialog3:"Сергей Ас: Градуирование кернинга, регулярные экспрешены импозиции, автофлоу верстки, сорсинг от шрифтового пула, дифференциальный спуск полос, эмбеддинг глифов, параметризация лидинга, контроль орфографических стилей.", prob3:10
  },
  {
    name:'Саша Ха', icon:'🤵',
    portrait: "img/sasha.jpg",
    desc:'Позитивный допечатник, снижает стресс.',
    type:'happy',
    home:[2,1,4],
    workplace: 2,
    spawn: 0,
    moveInterval: 30000,
    dialog1:"Саша Ха: давай кулак.", prob1:60,
    dialog2:"Саша Ха: а кто возьмет на проверочку тк?", prob2:30,
    dialog3:"Саша Ха: я говорил вам раньше про CorelDRAW...", prob3:10
  },
  {
    name:'Марина', icon:'👩‍🔬',
    portrait: "img/marina.jpg",
    desc:'Главная по цифре.',
    type:'take',
    home:[4,5],
    workplace: 4,
    spawn: 0,
    moveInterval: 12000,
    dialog1:"Марина: Ты что еще тут? Пшёл от сюда!", prob1:60,
    dialog2:"Марина: ПРОСТО УЙДИ!", prob2:30,
    dialog3:"Марина: Ммм - какая я красивая [красуется у зеркала]", prob3:10
  },
  {
    name:'Арсений', icon:'🧑‍',
    portrait: "img/arseny.jpg",
    desc:'Цифровик, любит помогать.',
    type:'fast',
    home:[4,5,8],
    workplace: 4,
    spawn: 0,
    moveInterval: 12000,
    dialog1:"Арсений: Давай я сделаю это быстрее.", prob1:60,
    dialog2:"Арсений: Привет", prob2:30,
    dialog3:"Арсений: е2-е4... мат.", prob3:10
  },
  {
    name:'Александр Кир', icon:'👨‍🦳',
    portrait: "img/kir.jpg",
    desc:'Старший цифровик, везде бывает.',
    type:'slow',
    home:[4,5,8],
    workplace: 4,
    spawn: 0,
    moveInterval: 6000,
    dialog1:"Александр Кир: Вот в 1978 мы резали пленку ножницами, монтаж делали на воске, фотонабор на «Линотроне», краски вручную мешали, а контрольный оттиск проверял Иван Петрович лично.", prob1:40,
    dialog2:"Александр Кир: В 80-х мы на газетных ротациях химию сами замешивали, чтоб не пузырило, а тексты правили на прозрачных плёнках райтерами, потом всё сутки под прессом держали.", prob2:30,
    dialog3:"Александр Кир: Помню, как в типографии стояли коробки с плёнками — не то что сейчас ваши флешки, всё по памяти, линейкой и осторожно, чтобы ни одной пылинки на экспонировании.", prob3:30
  },
  {
    name:'Полина', icon:'👸',
    portrait: "img/polina.jpg",
    desc:'Девушка, редко появляется.',
    type:'chill',
    home:[4],
    workplace: 4,
    spawn: 0,
    moveInterval: 12000,
    dialog1:"Полина: Позовите Антона, у меня новые стрелки на лице!", prob1:60,
    dialog2:"Полина: Хаюшки", prob2:30,
    dialog3:"Полина: Опять образцы?", prob3:10
  },
  {
    name:'Антон', icon:'💂‍♂️',
    portrait: "img/anton.jpg",
    desc:'Любит перегораживать путь в лак.',
    type:'lak',
    home:[9,8],
    workplace: 9,
    spawn: 0,
    moveInterval: 9000,
    dialog1:"Антон: Доброе утро, хорошего дня!", prob1:60,
    dialog2:"Антон: Ха-ха-ха, хи-хи-хи. Ладно я пошел на лак.", prob2:30,
    dialog3:"Антон: Аааа... не вероятно, ладно всем пока!", prob3:10
  },
  {
    name:'Виктор', icon:'🦒',
    portrait: "img/viktor.jpg",
    desc:'Очень высокий босс. Не пропустит, если не все выполнено.',
    type:'boss',
    home:[0,1,2,3,4,5,6,7,8,9,10,11,12], // добавить ВСЕ id комнат по пути (от офиса до его кабинета)
    workplace: 12,         // его кабинет
    spawn: 0,              // офис — место первого появления
    moveInterval: 5000,    // или 3000 (3 секунды) для каждой комнаты
    patrolInterval: 60000  // ДОБАВИТЬ — интервал между обходами (для вашей логики)
}

  
];


// ============= КВЕСТЫ ============  
/**
 * Quest — структура описания задания/квеста.
 * @typedef {Object} Quest
 * @property {string} name — Краткое отображаемое название квеста
 * @property {string} id   — Уникальный идентификатор для логики игры
 * @property {string} desc — Описание задания
 */
/** @type {Quest[]} */
const QUESTS = [
  { name: 'Цветопроба', id: 'proba', desc: 'Сделать цветопробу для Кати' },
  { name: 'Лак', id: 'lak', desc: 'Отлакировать на втором этаже' },
  { name: 'Финал', id: 'boss', desc: 'Дойти к боссу, пройти блиц и завершить день' }
];


// ============= СОСТОЯНИЕ ============  
/**
 * Player — структура описания игрока
 * @typedef {Object} Player
 * @property {string} name                   — Имя игрока/персонажа
 * @property {number} at                     — Локация (id комнаты)
 * @property {number} stress                 — Текущий уровень стресса
 * @property {string[]} inventory            — Содержимое инвентаря
 * @property {boolean} busy                  — Флаг "занят" (анимация, диалог и т.п.)
 * @property {{[questId:string]:false|"inprogress"|"done"}} quests — Статус выполнения квестов
 * @property {boolean} end                   — Завершена ли игра
 */

/**
 * GameState — глобальное состояние игры
 * @typedef {Object} GameState
 * @property {Player} player
 * @property {NPC[]} npcs
 * @property {boolean} dialogOpen
 */

/** @type {GameState} */
const gameState = {
  player: {
    name: 'Новичок',
    at: 0,
    stress: 0,
    inventory: [],
    busy: false,
    quests: {
      proba: false,
      lak: false,
      boss: false
    },
    end: false
  },
  npcs: [],
  dialogOpen: false
};

// ==== УТИЛИТЫ ====  
/**
 * Глубокое копирование объекта/массива (без функций)
 * @param {any} o
 * @returns {any}
 */
function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

/**
 * Получает случайную фразу NPC по весу вероятностей
 * @param {NPC} npc
 * @returns {string}
 */
function randDialog(npc) {
  const rnd = Math.random() * 100;
  if(rnd < npc.prob3) return npc.dialog3;
  if(rnd < (npc.prob3 + npc.prob2)) return npc.dialog2;
  return npc.dialog1;
}

/**
 * Перемешивает массив (возвращает новый)
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============= СПАВН И ДВИЖЕНИЕ NPC ============  
/**
 * Запускает таймеры появления всех NPC (разброс по spawnDelay).
 * После появления NPC начинают перемещаться, если у них более одной зоны обитания.
 */
function startAllNpcSpawns() {
  gameState.npcs.forEach((npc, idx) => {
    setTimeout(() => {
      npc._spawned = true;
      npc.at = typeof npc.spawn === "number" ? npc.spawn : 0;
      renderAll();
      // стартуем передвижение, если есть несколько "домов"
      if (npc.name === "Виктор") startViktorLogic(npc);
else if (npc.home && npc.home.length > 1) startNpcMovement(npc);
    }, npc.spawnDelay);
  });
}

function startViktorLogic(npc) {
  // 1. Начальная стадия: Виктор появился в офисе (например, room 0)
  // Пусть home состоит из всех комнат по маршруту, напр. [0,1,2,3,...,12]
  let route = npc.home.slice(); // Копия маршрута
  let forward = true;

  // 2. Запускаем первое прохождение (офис -> кабинет)
  movePatrol(npc, route, () => {
    // 3. После первичного прохода — запускаем бесконечный патруль
    setTimeout(function patrolLoop() {
      // направление туда -> обратно чередуется
      route = forward ? npc.home.slice().reverse() : npc.home.slice();
      forward = !forward;
      movePatrol(npc, route, () => {
        setTimeout(patrolLoop, 60000); // ждать ровно минуту и снова обход
      });
    }, 60000);
  });
}

// Классическая функция обхода по маршруту с задержкой 6 сек на комнату
function movePatrol(npc, route, done) {
  if (route.length === 0) return done();
  npc.at = route.shift();
  renderAll();
  setTimeout(() => movePatrol(npc, route, done), 6000); // 6 сек на комнату
}

/**
 * Циклическое случайное перемещение одного NPC по его home-маршруту.
 * Реализует:
 *  1. Особое правило для Марины и аквариума (доступ только избранным).
 *  2. "Туннелирование" при заторах: NPC не блокируется, если все комнаты заняты, а проходит через полные дальше.
 * @param {NPC} npc - Объект NPC, который должен двигаться
 */
function startNpcMovement(npc) {
  if (npc._moveTimer) clearInterval(npc._moveTimer);

  // Интервал перемещений (мс): индивидуальный или стандарт 15 сек.
  const interval = typeof npc.moveInterval === "number" ? npc.moveInterval : 15000;

  npc._moveTimer = setInterval(() => {
    if (!npc._spawned) return; // Не двигаем до спавна
    if (npc.name === "Марина") return; // Марину двигает особая логика

    const currAt = npc.at;
    // Все локации, куда NPC может ходить (кроме текущей)
    const possible = npc.home.filter(idx => idx !== currAt);
    if (!possible.length) return; // Вообще некуда идти

    // --- АКВАРИУМ & МАРИНА: подготовка к спец. правилу ---
    const AQUARIUM_ID = ROOMS.find(r => r.name === 'Аквариум')?.id;
    // Кто может быть с Мариной в аквариуме
    const allowedWithMarina = ['Саша', 'Кир', 'Виктор', 'Арсений', gameState.player.name];

    // 1. Cначала ищем свободные комнаты для обычного перемещения
    const openRooms = possible.filter(roomId => {
      // Ограничение по лимитам
      const occupants = gameState.npcs.filter(n => n._spawned && n.at === roomId).length;
      const roomLimit = ROOMS[roomId].limit || 3;

      // Спец. правило: аквариум с Мариной
      if (roomId === AQUARIUM_ID) {
        const marinaInAquarium = gameState.npcs.find(n => n.name === 'Марина' && n._spawned && n.at === AQUARIUM_ID);
        // Если в аквариуме Марина и этот NPC не из разрешённых — нельзя идти
        if (marinaInAquarium && !allowedWithMarina.includes(npc.name)) return false;
      }

      // Если лимит не достигнут — считается "свободной"
      return occupants < roomLimit;
    });

    if (openRooms.length) {
      // Есть свободные комнаты — просто идём!
      const next = openRooms[Math.floor(Math.random() * openRooms.length)];
      npc.at = next;
      renderAll();
      return;
    }

    // 2. Затор: все комнаты полны. "Туннелирование"!
    // Выбираем любую соседнюю комнату, кроме текущей (но с учётом особенностей аквариума)
    let tunnelRooms = possible;

    // Спец. правило: аквариум с Мариной — даже туннелировать нельзя!
    tunnelRooms = tunnelRooms.filter(roomId => {
      if (roomId === AQUARIUM_ID) {
        const marinaInAquarium = gameState.npcs.find(n => n.name === 'Марина' && n._spawned && n.at === AQUARIUM_ID);
        if (marinaInAquarium && !allowedWithMarina.includes(npc.name)) return false;
      }
      return true;
    });

    if (!tunnelRooms.length) return; // Все соседи под запретом (от Марини!)

    // Выбираем случайный туннель
    const tunnel = tunnelRooms[Math.floor(Math.random() * tunnelRooms.length)];
    npc.at = tunnel;

    // Пытаемся сразу пройти из туннельной комнаты в любую разрешённую (кроме только что покинутой)
    const tunnel_exits = npc.home.filter(idx => idx !== tunnel);
    // Опять фильтр по аквариуму (даже если после туннеля туда нельзя!)
    const nextAfterTunnel = tunnel_exits.find(roomId => {
      if (roomId === AQUARIUM_ID) {
        const marinaInAquarium = gameState.npcs.find(n => n.name === 'Марина' && n._spawned && n.at === AQUARIUM_ID);
        if (marinaInAquarium && !allowedWithMarina.includes(npc.name)) return false;
      }
      return true;
    });
    if (nextAfterTunnel !== undefined) npc.at = nextAfterTunnel;

    renderAll();

  }, interval);
}

// ========== СТАРТ И СБРОС ==========

/**
 * Запуск новой игровой сессии.
 * @param {string} name — Имя игрока
 * Инициализирует состояние игрока и NPC.
 */
function startGame(name) {
  // Создаём объект игрока со стартовыми параметрами
  gameState.player = {
    name: name.length ? name : 'Новичок',
    at: 0, // Стартовая комната
    stress: 0,
    inventory: [],
    busy: false,
    quests: { proba: false, lak: false, boss: false },
    end: false
  };

  // Клонируем и инициализируем NPC
  gameState.npcs = deepClone(NPCS_FULL).map((npc) => {
    let obj = { ...npc };
    obj.spawnDelay = 10000 + Math.floor(Math.random() * 10001); // 10–20 сек
    obj._moveTimer = null;
    obj._spawned = false;
    obj.at = typeof obj.spawn === "number" ? obj.spawn : 0;
    return obj;
  });

  renderAll();         // Отрисовываем начальное состояние
  startAllNpcSpawns(); // Запускаем появление и движение NPC
}

/**
 * Сбрасывает игру и спрашивает новое имя игрока.
 */
function resetGame() {
  let n = prompt("Ваше имя?", "Новичок") || "Новичок";
  document.getElementById('player-name').innerText = n;
  startGame(n);
}


// ========== РЕНДЕРИНГ ==========

/**
 * Основной перерисовщик интерфейса
 */
function renderAll() {
  renderMap();
  renderQuests();
  renderControls();
  renderFooter();
}


function renderFooter() {
  // Соберём подвал: стресс, инвентарь и кнопка "Заново"
  let stress = gameState.player.stress;
  let inventory = gameState.player.inventory.length
    ? gameState.player.inventory.join(', ')
    : 'пусто';

  let html = `
    Стресс: ${stress} / 100
    &nbsp;|&nbsp;
    В руках: ${inventory}
    &nbsp;|&nbsp;
    <button onclick="resetGame()">Заново</button>
  `;
  document.getElementById('footer').innerHTML = html;
}


/**
 * Рендер визуальной карты (комнаты, игрок, NPC, двери)
 */
function renderMap() {
  let html = '';
  for (let i = 0; i < ROOMS.length; ++i) {
    let active = (gameState.player.at === i) ? 'active' : '';
    // Проверяем, длинное ли название комнаты (для класса .long)
    let longClass = ROOMS[i].name.length > 14 ? 'long' : '';
    html += `<div class="room ${active}" title="${ROOMS[i].desc}">`;
    html += `<div class="room-title ${longClass}">${ROOMS[i].icon} ${ROOMS[i].name}</div>`;
    html += `<div class="actors">`;
    // Сначала игрок
    if (gameState.player.at === i) {
      let plNameClass = gameState.player.name.length > 11 ? 'long' : '';
      html += `<span class="actor actor-ego" title="Это вы!">🧑‍💼
      <span class="actor-name ${plNameClass}">${gameState.player.name}</span></span>`;
    }
    // Потом NPC
    gameState.npcs.filter(n => n._spawned && n.at === i).forEach(npc => {
      let npcNameClass = npc.name.length > 11 ? 'long' : '';
      html += `<span class="actor actor-npc" title="${npc.desc}">${npc.icon}
      <span class="actor-name ${npcNameClass}">${npc.name}</span></span>`;
    });
    html += `</div>`;
    // Двери (соседние комнаты) — ОСТАВЛЯЕМ!
    html += `<div class="doors">Двери: ${ROOMS[i].doors.map(j => ROOMS[j].name).join(', ')}</div>`;
    html += `</div>`;
  }
  document.getElementById('map').innerHTML = html;
}

/**
 * Отображение логов квестов и их состояния.
 */
function renderQuests() {
  let q = QUESTS.map(qk => `<li>${
    qk.name
  }: <b>${
    gameState.player.quests[qk.id] === 'done' ? '✅' :
    (gameState.player.quests[qk.id] ? '🕓' : '❌')
  }</b> — <span class='actor-desc'>${qk.desc}</span></li>`).join('');
  document.getElementById('questlog').innerHTML = "<ul>" + q + "</ul>";
}

/**
 * Отрисовка кнопок управления перемещениями и действиями игрока

function renderControls() {
  let html = '';
  let here = gameState.player.at, doors = ROOMS[here].doors;
  doors.forEach(idx => {
    const npcsHere = gameState.npcs.filter(n => n._spawned && n.at === idx).length;
    const roomLimit = ROOMS[idx].limit || 3;
    if(npcsHere + 1 > roomLimit) {
      html += `<button class="moveBtn" disabled style="opacity:.5;cursor:not-allowed;">В ${ROOMS[idx].name} ${ROOMS[idx].icon} (переполнено)</button>`;
    } else {
      html += `<button class="moveBtn" onclick="moveTo(${idx})">В ${ROOMS[idx].name} ${ROOMS[idx].icon}</button>`;
    }
  });
 */

function renderFooter() {
  let stress = gameState.player.stress;
  let inventory = gameState.player.inventory.length
    ? gameState.player.inventory.join(', ')
    : 'пусто';

  // Кнопки переходов
  let controls = '';
  let here = gameState.player.at, doors = ROOMS[here].doors;
  doors.forEach(idx => {
    const npcsHere = gameState.npcs.filter(n => n._spawned && n.at === idx).length;
    const roomLimit = ROOMS[idx].limit || 3;
    if(npcsHere + 1 > roomLimit) {
      controls += `<button class="moveBtn" disabled style="opacity:.5;cursor:not-allowed;">В ${ROOMS[idx].name} ${ROOMS[idx].icon} (переполнено)</button>`;
    } else {
      controls += `<button class="moveBtn" onclick="moveTo(${idx})">В ${ROOMS[idx].name} ${ROOMS[idx].icon}</button>`;
    }
  });
function renderFooter() {
  let stress = gameState.player.stress;
  let inventory = gameState.player.inventory.length
    ? gameState.player.inventory.join(', ')
    : 'пусто';

  // Кнопки переходов
  let controls = '';
  let here = gameState.player.at, doors = ROOMS[here].doors;
  doors.forEach(idx => {
    const npcsHere = gameState.npcs.filter(n => n._spawned && n.at === idx).length;
    const roomLimit = ROOMS[idx].limit || 3;
    if (npcsHere + 1 > roomLimit) {
      controls += `<button class="moveBtn" disabled style="opacity:.5;cursor:not-allowed;">В ${ROOMS[idx].name} ${ROOMS[idx].icon} (переполнено)</button>`;
    } else {
      controls += `<button class="moveBtn" onclick="moveTo(${idx})">В ${ROOMS[idx].name} ${ROOMS[idx].icon}</button>`;
    }
  });

  // Квестовые action-кнопки
  if (ROOMS[here].name === 'Аквариум' &&
      !gameState.player.inventory.includes('цветопроба') &&
      gameState.player.quests.proba === 'inprogress') {
    controls += `<button class="actionBtn" onclick="makeProba()">Сделать цветопробу</button>`;
  }
  if (ROOMS[here].name === 'Лак' &&
      !gameState.player.inventory.includes('лак') &&
      gameState.player.quests.proba === 'done') {
    controls += `<button class="actionBtn" onclick="makeLak()">Сделать лак</button>`;
  }

  // Квест-лог: компактно, одной строкой
  let quests = QUESTS.map(qk =>
    `${qk.name}:${gameState.player.quests[qk.id] === 'done' ? '✅'
    : (gameState.player.quests[qk.id] ? '🕓' : '❌')}`
  ).join(' | ');

  // Итоговый html для footer
  let html = `
    Стресс: ${stress} / 100
    &nbsp;|&nbsp;
    В руках: ${inventory}
    &nbsp;|&nbsp;
    <button onclick="resetGame()">Заново</button>
    <br>
    ${controls}
    <br>
    <span style="color:#3c5992; font-size:.92em">Квесты: ${quests}</span>
  `;
  document.getElementById('footer').innerHTML = html;
}

// -------------- ПРОЧИЕ ФУНКЦИИ И ЛОГИКА -----------  

/**
 * Марина силой освобождает комнату roomIdx:
 * каждый неподходящий NPC "туннелирует" до первой свободной разрешённой комнаты из своего маршрута,
 * если не нашёл — уходит в Офис (если он в его home).
 * @param {number} roomIdx — индекс комнаты, из которой нужно выгнать NPC
 */
function kickNpcsFromRoom(roomIdx) {
  const AQUARIUM_ID = ROOMS.find(r => r.name === 'Аквариум')?.id;
  const OFFICE_ID    = ROOMS.find(r => r.name === 'Офис')?.id;      // "Офис" должен быть в ROOMS
  const allowedWithMarina = ['Саша', 'Кир', 'Виктор', 'Арсений', gameState.player.name];

  gameState.npcs.forEach(npc => {
    // Только если: живой, в комнате, не Марина, НЕ "разрешённый" в Аквариуме
    if (
      npc._spawned &&
      npc.at === roomIdx &&
      npc.name !== 'Марина' &&
      !(
        roomIdx === AQUARIUM_ID &&
        allowedWithMarina.includes(npc.name)
      )
    ) {
      // 1. Попробовать найти первую свободную комнату в маршруте (кроме текущей, без Марины, не превысив лимит)
      let freeHome = npc.home.find(idx =>
        idx !== roomIdx &&
        gameState.npcs.filter(n => n._spawned && n.at === idx && n.name !== 'Марина').length < (ROOMS[idx].limit || 3) &&
        !gameState.npcs.some(n => n._spawned && n.at === idx && n.name === 'Марина')
      );
      // 2. Если нет — "туннелируем": идём в любую разрешённую комнату home (через любую заполненную), а не находим свободную — в офис
      if(freeHome === undefined) {
        // Если офис есть среди home — переместить туда
        if (npc.home.includes(OFFICE_ID)) {
          npc.at = OFFICE_ID;
        } else {
          // Иначе просто в любую комнату из home
          npc.at = npc.home.find(idx => idx !== roomIdx) ?? roomIdx;
        }
      } else {
        npc.at = freeHome;
      }
      // (опционально: здесь можно реализовать многошаговую "протечку", если хочешь более глубокий туннель — пока не окажется в свободной)
    }
  });
}



// --------- ПЕРЕМЕЩЕНИЕ ИГРОКА ----------
/**
 * Переместить игрока по индексу комнаты (idx).
 * Учитывает лимит комнаты и специальные правила (например, для аквариума с Мариной).
 * @param {number} idx — индекс комнаты
 */
function moveTo(idx) {
  const npcsHere = gameState.npcs.filter(n => n._spawned && n.at === idx).length;
  const roomLimit = ROOMS[idx].limit || 3;

  // Особое правило: в Аквариум с Мариной может попасть не каждый
  const AQUARIUM_ID = ROOMS.find(r => r.name === 'Аквариум')?.id;
  const allowedWithMarina = ['Саша', 'Кир', 'Виктор', 'Арсений', gameState.player.name];
  const marinaInRoom = gameState.npcs.some(n => n.name === 'Марина' && n._spawned && n.at === idx);

  if (npcsHere + 1 > roomLimit) {
    showEvent(
      `В комнате уже максимальное количество людей (${roomLimit}). Подожди, пока кто-то выйдет!`,
      [{ text: 'OK', action: () => {} }]
    );
    return;
  }

  if (
    idx === AQUARIUM_ID &&
    marinaInRoom &&
    !allowedWithMarina.includes(gameState.player.name)
  ) {
    showEvent(
      'Марина не разрешает входить сюда посторонним!',
      [{ text: 'OK', action: () => {} }]
    );
    return;
  }

  gameState.player.at = idx;
  renderAll();
  checkEvents();
}


// --------- ДЕЙСТВИЯ В КОМНАТАХ -----------

/**
 * Сделать цветопробу — добавить в инвентарь игрока, обновить статус квеста.
 */
function makeProba() {
  if (!gameState.player.inventory.includes('цветопроба')) {
    gameState.player.inventory.push('цветопроба');
    // Если квест был в процессе, сделать "выполнено" (если так принято)
    if (gameState.player.quests.proba === 'inprogress') {
      gameState.player.quests.proba = 'done';
    }
  }
  showEvent('Вы сделали цветопробу!', [{ text: 'Ок', action: renderAll }]);
}

/**
 * Сделать лак — добавить в инвентарь, можно обновить квест.
 */
function makeLak() {
  if (!gameState.player.inventory.includes('лак')) {
    gameState.player.inventory.push('лак');
    // Если квест про лак был в процессе — отметить выполненным?
    if (gameState.player.quests.lak === 'inprogress') {
      gameState.player.quests.lak = 'done';
    }
  }
  showEvent('Лак покрыт!', [{ text: 'Ок', action: renderAll }]);
}



// ============= ЛОГИКА NPC, КВЕСТОВ, СОБЫТИЙ ==========

/**
 * Получить NPC по имени (если он существует и заспаунен)
 * @param {string} name
 * @returns {Object|null}
 */
function getNPC(name) {
  return gameState.npcs.find(n => n._spawned && n.name === name) || null;
}

function checkEvents() {
  const player = gameState.player;

  // --- КАТЯ ---
  const katya = getNPC('Катя');
  if (katya && player.at === katya.at) {
    if (!player.quests.proba) {
      showEventNPC(randDialog(katya), [{
        text: 'Ок!',
        action: () => { katya.follow = true; player.quests.proba = 'inprogress'; }
      }], katya);
      return;
    }
    if (player.quests.proba === 'inprogress' && player.inventory.includes('цветопроба')) {
      showEventNPC(randDialog(katya), [{
        text: 'Отдать',
        action: () => {
          katya.follow = false;
          player.inventory = player.inventory.filter(x => x !== 'цветопроба');
          player.quests.proba = 'done';
          renderAll();
        }
      }], katya);
      return;
    }
  }

  // --- СВЕТЛАНА ---
  const svetlana = getNPC('Светлана');
  if (svetlana && player.at === svetlana.at && !svetlana.said) {
    player.busy = true;
    showEventNPC(randDialog(svetlana), [
      {
        text: 'Хорошо, мы попробуем вам помочь',
        action: () => { svetlana.said = true; player.busy = false; }
      },
      {
        text: 'Нет, я не буду, идите к Виктору!',
        action: () => { svetlana.said = false; checkEvents(); }
      }
    ], svetlana);
    return;
  }

  // --- МАРИНА ---
  const marina = getNPC('Марина');
  if (marina && player.at === marina.at) {
    if (player.inventory.length) {
      const lost = player.inventory.slice();
      player.inventory = [];
      player.stress += 10;
      showEventNPC(
        randDialog(marina) + `<br>Ты теряешь: <b>${lost.join(', ')}</b>. (стресс +10)`,
        [{ text: 'Ок', action: () => {} }],
        marina
      );
    } else {
      showEventNPC(
        randDialog(marina) + "<br>У тебя ничего нет, иди!",
        [{ text: 'Ок', action: () => {} }],
        marina
      );
    }
    return;
  }

  // --- АРСЕНИЙ ---
  const arseniy = getNPC('Арсений');
  if (arseniy && player.at === arseniy.at && player.quests.proba === 'inprogress' && !player.inventory.includes('цветопроба')) {
    player.inventory.push('цветопроба');
    showEventNPC(randDialog(arseniy), [{ text: 'Спасибо', action: () => { } }], arseniy);
    return;
  }

  // --- АЛЕКСАНДР КИР ---
  const kir = getNPC('Александр Кир');
  if (kir && player.at === kir.at) {
    player.stress += 15;
    showEventNPC(randDialog(kir), [{ text: 'Поскорее уйти', action: () => { } }], kir);
    return;
  }

  // --- ПОЛИНА ---
  const polina = getNPC('Полина');
  if (polina && player.at === polina.at) {
    player.stress = Math.max(0, player.stress - 7);
    showEventNPC(randDialog(polina), [{ text: 'Улыбнуться', action: () => { } }], polina);
    return;
  }

  // --- САША ХА ---
  const sashaHa = getNPC('Саша Ха');
  if (sashaHa && player.at === sashaHa.at) {
    player.stress = Math.max(0, player.stress - 9);
    showEventNPC(randDialog(sashaHa), [{ text: 'С кулаком! тыдыщь!', action: () => { } }], sashaHa);
    return;
  }

  // --- СЕРГЕЙ АС ---
  const sergeyAs = getNPC('Сергей Ас');
  if (sergeyAs && player.at === sergeyAs.at && !sergeyAs.said) {
    showEventNPC(randDialog(sergeyAs), [{ text: 'Понял!', action: () => { sergeyAs.said = true; } }], sergeyAs);
    return;
  }

  // --- ВЛАДИМИР ---
  const vladimir = getNPC('Владимир');
  if (vladimir && player.at === vladimir.at && !vladimir.said) {
    showEventNPC(randDialog(vladimir), [{ text: 'Пожалуй', action: () => { vladimir.said = true; } }], vladimir);
    return;
  }

  // --- АНТОН ---
  const anton = getNPC('Антон');
  if (anton && player.at === anton.at && player.quests.proba === 'done' && !player.inventory.includes('лак')) {
    showEventNPC(randDialog(anton), [{ text: 'Пойду делать лак', action: () => { } }], anton);
    return;
  }
  // --- АНТОН, лак сдаём ---
  if (anton && player.inventory.includes('лак') && player.at === anton.at) {
    showEventNPC(randDialog(anton), [{
      text: 'OK',
      action: () => {
        player.inventory = player.inventory.filter(x => x !== 'лак');
        player.quests.lak = 'done';
        renderAll();
      }
    }], anton);
    return;
  }

  // --- БОСС Виктор ---
  const viktor = getNPC('Виктор');
  if (viktor && player.at === viktor.at) {
    if (player.quests.proba === 'done' && player.quests.lak === 'done') {
      startQuizBOSS(viktor);
      return;
    } else {
      showEventNPC(
        'Виктор: “Ты не всё сделал.<br>Где цветопроба и лак?” (вернуться!)',
        [{ text: 'Ушел', action: () => { player.stress += 8; } }],
        viktor
      );
      return;
    }
  }
}



// ==== МОДАЛКА ДИАЛОГА С ФОТО NPC ===

/**
 * Показать модальное окно события/диалога с портретом NPC
 * @param {string} text — основной текст
 * @param {Array} opts — массив опций-кнопок: [{text, action: function}]
 * @param {object} npc — NPC, для портрета (необязательно)
 */
function showEventNPC(text, opts, npc) {
  gameState.dialogOpen = true;
  gameState.player.busy = true;
  document.getElementById('eventBox').style.display = 'block';

  if (npc && npc.portrait) {
    document.getElementById('eventPortrait').innerHTML =
      `<img src="${npc.portrait}" alt="${npc.name}" style="max-width:130px;max-height:130px;border-radius:15px;box-shadow:0 2px 18px #4689ff27;margin:6px auto 9px auto;display:block;">`;
  } else {
    document.getElementById('eventPortrait').innerHTML = "";
  }

  document.getElementById('eventText').innerHTML = text;

  document.getElementById('eventOptions').innerHTML = opts.map((o, i) =>
    `<button class="actionBtn" onclick="eventAction(${i})">${o.text}</button>`
  ).join('');
  window._eventOpts = opts; // Можно перенести в gameState, если глобал-область не желательна
}

/**
 * Показать простое диалоговое окно (без портрета)
 */
function showEvent(text, opts) {
  gameState.dialogOpen = true;
  gameState.player.busy = true;
  document.getElementById('eventBox').style.display = 'block';
  document.getElementById('eventPortrait').innerHTML = "";
  document.getElementById('eventText').innerHTML = text;
  document.getElementById('eventOptions').innerHTML = opts.map((o, i) =>
    `<button class="actionBtn" onclick="eventAction(${i})">${o.text}</button>`
  ).join('');
  window._eventOpts = opts;
}

/**
 * Обработчик действия по нажатию кнопки в модалке
 */
window.eventAction = function(idx) {
  document.getElementById('eventBox').style.display = 'none';
  if (!window._eventOpts) return;
  const opt = window._eventOpts[idx];
  if (opt && typeof opt.action === 'function') opt.action();
  gameState.player.busy = false;
  gameState.dialogOpen = false;
  renderAll();
};



// Блиц от босса -- не изменяется, см. твой исходник выше

// Шафл (перемешивание)
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Блиц от босса / Boss Quiz
function startQuizBOSS(bossNpc){
  let questions = shuffle(BOSS_QUIZ.slice());
  let cur = 0;
  let timer = null;
  let isAnswered = false;

  function failQuiz(){
    if(timer) clearInterval(timer);
    gameState.player.quests.boss = false;
    gameState.quizInProgress = false;
    // Перемещаем игрока обратно из кабинета босса
    if(gameState.lastRoomBeforeBoss !== null && typeof gameState.lastRoomBeforeBoss !== 'undefined') {
      gameState.player.at = gameState.lastRoomBeforeBoss;
      gameState.lastRoomBeforeBoss = null;
    }
    renderAll();
    showEvent(
      `Вы ошиблись! Пройти блиц можно будет при следующем визите к боссу.`,
      [{text:'Ок',action:()=>{}}],
    );
  }

  function winQuiz(){
    if(timer) clearInterval(timer);
    gameState.player.quests.boss = 'done';
    gameState.player.end = true;
    gameState.quizInProgress = false;
    renderAll();
    setTimeout(()=>{
      showEventNPC(
        `Виктор: “Поздравляю! Всё правильно! Рабочий день завершён.<br>
        <b>Ты выиграл! 🏆</b>"`,
        [{text:'Начать заново',action:resetGame}],
        bossNpc
      );
    }, 400);
  }

  function showQ() {
    if(timer) clearInterval(timer); // стоп
    isAnswered = false;
    if(cur >= 7) return winQuiz();

    let timeLeft = 10;
    let q = questions[cur], vars = shuffle(q.answers.slice());

    let qt = `<b>Вопрос ${cur+1} из 7:</b><br>${q.question}` +
      `<br><span style="color:#888;font-size:11px;">Время: <span id="qTimer">${timeLeft}</span> сек</span>`;
    let opts = vars.map(a=>({
      text: a.text,
      action: ()=>{
        if(isAnswered) return;
        isAnswered = true;
        if(timer) clearInterval(timer);
        if(a.correct){
          cur++;
          setTimeout(showQ, 300);
        } else {
          failQuiz();
        }
      }
    }));

    showEventNPC(qt, opts, bossNpc);

    timer = setInterval(()=>{
      timeLeft--;
      let t=document.getElementById('qTimer');
      if(t) t.innerText = timeLeft;
      if(timeLeft<=0 && !isAnswered){
        clearInterval(timer);
        isAnswered = true;
        failQuiz();
      }
    },1000);
  }

  showQ();
}



// --- Блиц вопросы Виктора
const BOSS_QUIZ = [
  {
    question: "Что означает C в аббревиатуре CMYK?",
    answers: [
      { text: "C = Циан", correct: true },
      { text: "C = Color", correct: false },
      { text: "C = Синий", correct: false },
      { text: "C = Contour", correct: false }
    ]
  },
  {
    question: "Что такое Pantone?",
    answers: [
      { text: "Спецпалитра для подбора фирменных цветов", correct: true },
      { text: "Международный стандарт цветопередачи для печати", correct: false },
      { text: "Цветовая гамма для производства дизайнерской бумаги", correct: false },
      { text: "Таблица оттенков для выбора лаковых покрытий", correct: false }
    ]
  },
  {
    question: "Что важно для вывода макета в печать?",
    answers: [
      { text: "CMYK, обрезные метки, без прозрачностей", correct: true },
      { text: "Выпуски под обрез, цветовые профили, без обводок", correct: false },
      { text: "CMYK, оригинальное разрешение, с тенями и белым фоном", correct: false },
      { text: "Выпуски под обрез, режущие линии, без прозрачностей", correct: false }
    ]
  },
  {
    question: "Что такое допечатная подготовка?",
    answers: [
      { text: "Проверка и настройка макета перед печатью", correct: true },
      { text: "Настройка параметров бумаги и резки для печати", correct: false },
      { text: "Определение формата макета и типа лака", correct: false },
      { text: "Проверка цветопередачи и выпусков под обрез", correct: false }
    ]
  },
  {
    question: "Почему PDF предпочтительнее для офсетной печати?",
    answers: [
      { text: "Корректно сохраняет вектор и шрифты", correct: true },
      { text: "Поддерживает цветовые профили и макеты", correct: false },
      { text: "Удобно сохраняет прозрачности и отступы", correct: false },
      { text: "Сохраняет все макеты без искажений", correct: false }
    ]
  },
  {
    question: "Зачем нужны плашечные цвета?",
    answers: [
      { text: "Для согласования специальных фирменных оттенков", correct: true },
      { text: "Для имитации насыщенных теней и бликов", correct: false },
      { text: "Для подбора точных цветовых смесей в макете", correct: false },
      { text: "Для выделения отдельных элементов дизайна", correct: false }
    ]
  },
  {
    question: "Что такое лакировка?",
    answers: [
      { text: "Нанесение защитного покрытия на тираж", correct: true },
      { text: "Покрытие отдельных элементов специальным составом", correct: false },
      { text: "Создание матовой или глянцевой поверхности макета", correct: false },
      { text: "Обработка отпечатка для повышения износостойкости", correct: false }
    ]
  }
];


// --- Блиц-викторина с боссом
function startQuizBOSS(bossNpc){
  let questions = shuffle(BOSS_QUIZ.slice());
  let cur = 0;
  let timer = null;
  let isAnswered = false;

  function failQuiz(){
    if(timer) clearInterval(timer);
    gameState.player.quests.boss = false; // сброс квеста!
    gameState.player.end = false;
    gameState.dialogOpen = true;
    gameState.player.busy = true;
    showEventNPC(
      `Ты ошибся или не успел!<br>Готов попробовать снова?`,
      [{text:'Попробовать заново', action:()=> {
        gameState.dialogOpen = false;
        gameState.player.busy = false;
        startQuizBOSS(bossNpc);
      }}],
      bossNpc
    );
  }

  function winQuiz(){
    if(timer) clearInterval(timer);
    gameState.player.quests.boss = 'done';
    gameState.player.end = true;
    gameState.dialogOpen = true;
    gameState.player.busy = true;
    showEventNPC(
      `Виктор: “Поздравляю! Всё правильно! Рабочий день завершён.<br>
      <b>Ты выиграл! 🏆</b>”`,
      [{text:'Начать заново',action:resetGame}],
      bossNpc
    );
  }

  function showQ() {
    if(timer) clearInterval(timer);
    isAnswered = false;
    if(cur >= 7) return winQuiz();

    let timeLeft = 10;
    let q = questions[cur], vars = shuffle(q.answers.slice());

    let qt = `<b>Вопрос ${cur+1} из 7:</b><br>${q.question}` +
      `<br><span style="color:#888;font-size:11px;">Время: <span id="qTimer">${timeLeft}</span> сек</span>`;
    let opts = vars.map(a=>({
      text: a.text,
      action: ()=>{
        if(isAnswered) return;
        isAnswered = true;
        if(timer) clearInterval(timer);
        if(a.correct){
          cur++;
          setTimeout(showQ, 300);
        } else {
          failQuiz();
        }
      }
    }));

    showEventNPC(qt, opts, bossNpc);

    timer = setInterval(()=>{
      timeLeft--;
      let t=document.getElementById('qTimer');
      if(t) t.innerText = timeLeft;
      if(timeLeft<=0 && !isAnswered){
        clearInterval(timer);
        isAnswered = true;
        failQuiz();
      }
    },1000);
  }

  showQ();
}

// ============= СПРАВКА/ЛЕГЕНДА ==============
function legendOpen(){
  let html = "<b>Локации:</b><ul>";
  ROOMS.forEach(r=>{
    html+=`<li><b>${r.name}</b> ${r.icon}: <span class='actor-desc'>${r.desc}</span></li>`;
  });
  html += "</ul><b>Персонажи:</b><ul>";
  NPCS_FULL.forEach(n=>{
    html+=`<li>${n.icon}<b> ${n.name}</b>: <span class='actor-desc'>${n.desc}</span></li>`;
  });
  html += "</ul>";
  document.getElementById("legendCont").innerHTML = html;
  document.getElementById("descModal").style.display='flex';
}
function legendClose(){
  document.getElementById("descModal").style.display='none';
}

// --- Старт ---
window.onload = () => {
  document.getElementById('eventBox').style.display = 'none';
  resetGame();
};
