# План восстановления и стабилизации кода GOART

Дата фиксации: 2026-06-13.

Документ описывает, как аккуратно восстановить и стабилизировать код проекта GOART без поломки текущей версии.

---

## 1. Главный принцип

Нельзя начинать с большого рефакторинга.

Правильный порядок:

```text
сначала резервная копия → затем диагностика → затем маленькие исправления → затем проверка → затем рефакторинг
```

---

## 2. Что проверять перед изменениями

Перед любой правкой кода нужно проверить:

- открывается ли `https://sunpole.github.io/GOART/`;
- есть ли ошибки в DevTools Console;
- совпадают ли DOM-id в `index.html` с обращениями в `main.js`;
- подключается ли именно корневой `main.js`;
- используется ли `js/main.js` или это устаревший glue-code;
- есть ли все изображения из `img/`, на которые ссылаются NPC;
- не дублируются ли функции;
- не потеряны ли обратные кавычки в HTML-шаблонах JS.

---

## 3. Приоритетные технические проблемы

### 3.1. `resetGame()` и `#player-name`

Проблема: JS может обращаться к `document.getElementById('player-name')`, но элемент может отсутствовать в HTML.

Безопасная версия:

```js
function resetGame() {
  const n = prompt('Ваше имя?', 'Новичок')?.trim() || 'Новичок';
  const playerNameEl = document.getElementById('player-name');
  if (playerNameEl) playerNameEl.innerText = n;
  startGame(n);
}
```

### 3.2. Дубли `renderFooter()`

Нужно оставить только одну финальную версию `renderFooter()`, которая отвечает за:

- стресс;
- инвентарь;
- кнопку `Заново`;
- кнопки переходов;
- квестовые action-кнопки;
- компактный статус квестов.

### 3.3. Несуществующая `renderControls()`

Если управление уже встроено в `renderFooter()`, тогда `renderAll()` не должен вызывать `renderControls()`.

Правильно:

```js
function renderAll() {
  renderMap();
  renderQuests();
  renderFooter();
}
```

### 3.4. Дубли `shuffle()`

Оставить только одну функцию:

```js
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

### 3.5. Дубли `startQuizBOSS()`

Оставить одну финальную версию блица босса. Лучше ту, где при ошибке есть контролируемая повторная попытка или понятный возврат.

---

## 4. Рекомендуемый исправленный блок утилит

```js
// ==== УТИЛИТЫ ====

/**
 * Глубокое копирование объекта/массива только для JSON-совместимых данных.
 * Не копирует функции, Date, Map, Set.
 */
function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

/**
 * Выбирает случайную фразу NPC по весам вероятностей.
 * Если часть вероятностей или диалогов не указана, функция не должна ломаться.
 */
function randDialog(npc) {
  const rnd = Math.random() * 100;

  const p3 = typeof npc.prob3 === 'number' ? npc.prob3 : 0;
  const p2 = typeof npc.prob2 === 'number' ? npc.prob2 : 0;

  if (rnd < p3 && npc.dialog3) return npc.dialog3;
  if (rnd < p3 + p2 && npc.dialog2) return npc.dialog2;
  return npc.dialog1 || '';
}

/**
 * Перемешивает массив и возвращает новый массив, не изменяя оригинал.
 */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

---

## 5. Рекомендуемый исправленный блок спавна NPC

```js
function startAllNpcSpawns() {
  gameState.npcs.forEach(npc => {
    setTimeout(() => {
      npc._spawned = true;
      npc.at = typeof npc.spawn === 'number' ? npc.spawn : 0;
      renderAll();

      if (npc.name === 'Виктор') {
        startViktorLogic(npc);
      } else if (Array.isArray(npc.home) && npc.home.length > 1) {
        startNpcMovement(npc);
      }
    }, npc.spawnDelay);
  });
}
```

---

## 6. Рекомендуемая логика Виктора

```js
function startViktorLogic(npc) {
  let forward = true;
  const initialRoute = npc.home.slice();

  movePatrol(npc, initialRoute, () => {
    setTimeout(function patrolLoop() {
      const route = forward ? npc.home.slice().reverse() : npc.home.slice();
      forward = !forward;

      movePatrol(npc, route, () => {
        setTimeout(patrolLoop, npc.patrolInterval || 60000);
      });
    }, npc.patrolInterval || 60000);
  });
}

function movePatrol(npc, route, done) {
  if (!route.length) return done();
  npc.at = route.shift();
  renderAll();
  setTimeout(() => movePatrol(npc, route, done), 6000);
}
```

---

## 7. Рекомендуемая логика движения обычных NPC

Эта логика была отдельно разобрана в чате. Основные требования:

- не двигать NPC до появления;
- Марину не двигать обычной логикой;
- учитывать лимиты комнат;
- не пускать посторонних в аквариум, если там Марина;
- при заторах использовать туннелирование;
- не нарушать правило Марины даже при туннелировании.

---

## 8. Что нельзя делать автоматически без проверки

Не рекомендуется одним коммитом:

- делить `main.js` на модули;
- переносить CSS из `index.html`;
- менять структуру HTML;
- менять имена DOM-элементов;
- менять игровой баланс;
- удалять `js/main.js`, пока не подтверждено, что он точно не используется;
- удалять изображения;
- менять маршруты NPC без тестирования.

---

## 9. Минимальный тест после каждого исправления

После каждого маленького патча проверить:

```text
1. Страница открылась.
2. Нет красных ошибок в консоли.
3. Появляется запрос имени.
4. Отображается карта.
5. Отображаются квесты.
6. Работает переход между комнатами.
7. NPC появляются через 10–20 секунд.
8. Диалоги открываются и закрываются.
9. Цветопроба может быть начата и выполнена.
10. Лак может быть выполнен.
11. Виктор запускает финальный блиц только после основных задач.
```

---

## 10. Рекомендуемый порядок коммитов

```text
1. docs: add project analysis and recovery documentation
2. fix: protect resetGame from missing player-name element
3. fix: remove duplicated utility functions
4. fix: remove duplicated renderFooter and renderControls call
5. fix: keep one boss quiz implementation
6. test: verify game flow manually on GitHub Pages
7. refactor: split code only after stable checkpoint
```
