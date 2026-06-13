// GOART runtime stable v0.2.0
// Патч стабильности: безопасный запуск, исправление дублей/утраченной логики без переписывания main.js.
(function () {
  'use strict';

  const VERSION = '0.2.0-stable';
  window.GOART_VERSION = VERSION;

  function $(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function patchHeader() {
    document.title = `GOART v${VERSION} — Рабочий день в типографии`;
    const header = $('header');
    if (header) header.textContent = `🚀 GOART v${VERSION} — Рабочий день в типографии`;
  }

  function patchMissingNpc() {
    if (!Array.isArray(window.NPCS_FULL)) return;
    const names = new Set(window.NPCS_FULL.map(n => n.name));
    const add = [];
    if (!names.has('Александр Кир')) add.push({
      name:'Александр Кир', icon:'👨‍🦳', portrait:'img/kir.jpg',
      desc:'Старший цифровик, везде бывает и рассказывает длинные истории.',
      type:'slow', home:[4,5,8], workplace:4, spawn:0, moveInterval:6000,
      dialog1:'Александр Кир: Вот в 1978 мы резали плёнку ножницами, монтаж делали на воске...', prob1:40,
      dialog2:'Александр Кир: В 80-х мы на газетных ротациях химию сами замешивали...', prob2:30,
      dialog3:'Александр Кир: Раньше всё было по памяти, линейкой и очень осторожно.', prob3:30
    });
    if (!names.has('Полина')) add.push({
      name:'Полина', icon:'👸', portrait:'img/polina.jpg',
      desc:'Девушка, редко появляется и немного снижает стресс.',
      type:'chill', home:[4], workplace:4, spawn:0, moveInterval:12000,
      dialog1:'Полина: Позовите Антона, у меня новые стрелки на лице!', prob1:60,
      dialog2:'Полина: Хаюшки.', prob2:30,
      dialog3:'Полина: Опять образцы?', prob3:10
    });
    if (!names.has('Антон')) add.push({
      name:'Антон', icon:'💂‍♂️', portrait:'img/anton.jpg',
      desc:'Часто бывает на лаке и связан с заданием по лаку.',
      type:'lak', home:[9,8], workplace:9, spawn:0, moveInterval:9000,
      dialog1:'Антон: Доброе утро, хорошего дня!', prob1:60,
      dialog2:'Антон: Ладно, я пошёл на лак.', prob2:30,
      dialog3:'Антон: Невероятно... всем пока!', prob3:10
    });
    window.NPCS_FULL.push(...add);
  }

  window.deepClone = function deepClone(o) { return JSON.parse(JSON.stringify(o)); };
  window.shuffle = function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  window.randDialog = function randDialog(npc) {
    const rnd = Math.random() * 100;
    const p3 = typeof npc.prob3 === 'number' ? npc.prob3 : 0;
    const p2 = typeof npc.prob2 === 'number' ? npc.prob2 : 0;
    if (rnd < p3 && npc.dialog3) return npc.dialog3;
    if (rnd < p3 + p2 && npc.dialog2) return npc.dialog2;
    return npc.dialog1 || '';
  };

  window.renderAll = function renderAll() {
    window.renderMap?.();
    window.renderQuests?.();
    window.renderFooter?.();
  };

  window.renderMap = function renderMap() {
    if (!Array.isArray(window.ROOMS) || !window.gameState) return;
    let html = '';
    window.ROOMS.forEach((room, i) => {
      const active = window.gameState.player.at === i ? 'active' : '';
      const longClass = room.name.length > 14 ? 'long' : '';
      html += `<div class="room ${active}" title="${esc(room.desc)}">`;
      html += `<div class="room-title ${longClass}">${room.icon} ${esc(room.name)}</div>`;
      html += '<div class="actors">';
      if (window.gameState.player.at === i) {
        const cls = window.gameState.player.name.length > 11 ? 'long' : '';
        html += `<span class="actor actor-ego" title="Это вы!">🧑‍💼<span class="actor-name ${cls}">${esc(window.gameState.player.name)}</span></span>`;
      }
      window.gameState.npcs.filter(n => n._spawned && n.at === i).forEach(npc => {
        const cls = npc.name.length > 11 ? 'long' : '';
        html += `<span class="actor actor-npc" title="${esc(npc.desc)}">${npc.icon}<span class="actor-name ${cls}">${esc(npc.name)}</span></span>`;
      });
      html += `</div><div class="doors">Двери: ${room.doors.map(j => esc(window.ROOMS[j]?.name || j)).join(', ')}</div></div>`;
    });
    const map = $('map');
    if (map) map.innerHTML = html;
  };

  window.renderQuests = function renderQuests() {
    if (!Array.isArray(window.QUESTS) || !window.gameState) return;
    const q = window.QUESTS.map(qk => `<li>${esc(qk.name)}: <b>${window.gameState.player.quests[qk.id] === 'done' ? '✅' : (window.gameState.player.quests[qk.id] ? '🕓' : '❌')}</b> — <span class="actor-desc">${esc(qk.desc)}</span></li>`).join('');
    const el = $('questlog');
    if (el) el.innerHTML = `<ul>${q}</ul>`;
  };

  window.renderFooter = function renderFooter() {
    if (!window.gameState || !Array.isArray(window.ROOMS)) return;
    const p = window.gameState.player;
    const here = p.at;
    const inventory = p.inventory.length ? p.inventory.map(esc).join(', ') : 'пусто';
    let controls = '';
    (window.ROOMS[here]?.doors || []).forEach(idx => {
      const npcsHere = window.gameState.npcs.filter(n => n._spawned && n.at === idx).length;
      const limit = window.ROOMS[idx]?.limit || 3;
      if (npcsHere + 1 > limit) controls += `<button class="moveBtn" disabled>В ${esc(window.ROOMS[idx].name)} ${window.ROOMS[idx].icon} (переполнено)</button>`;
      else controls += `<button class="moveBtn" onclick="moveTo(${idx})">В ${esc(window.ROOMS[idx].name)} ${window.ROOMS[idx].icon}</button>`;
    });
    if (window.ROOMS[here]?.name === 'Аквариум' && !p.inventory.includes('цветопроба') && p.quests.proba === 'inprogress') controls += '<button class="actionBtn" onclick="makeProba()">Сделать цветопробу</button>';
    if (window.ROOMS[here]?.name === 'Лак' && !p.inventory.includes('лак') && p.quests.proba === 'done') controls += '<button class="actionBtn" onclick="makeLak()">Сделать лак</button>';
    const quests = window.QUESTS.map(qk => `${qk.name}:${p.quests[qk.id] === 'done' ? '✅' : (p.quests[qk.id] ? '🕓' : '❌')}`).join(' | ');
    const footer = $('footer');
    if (footer) footer.innerHTML = `<div class="statusline">Стресс: ${p.stress} / 100 &nbsp;|&nbsp; В руках: ${inventory} &nbsp;|&nbsp; <button onclick="resetGame()">Заново</button></div><div class="controls">${controls}</div><div class="questline">Квесты: ${esc(quests)}</div>`;
  };

  window.resetGame = function resetGame() {
    const n = prompt('Ваше имя?', 'Новичок')?.trim() || 'Новичок';
    const el = $('player-name');
    if (el) el.textContent = n;
    window.startGame?.(n);
  };

  window.legendOpen = function legendOpen() {
    let html = '<h2>Справка</h2><b>Локации:</b><ul>';
    window.ROOMS.forEach(r => html += `<li><b>${esc(r.name)}</b> ${r.icon}: <span class="actor-desc">${esc(r.desc)}</span></li>`);
    html += '</ul><b>Персонажи:</b><ul>';
    window.NPCS_FULL.forEach(n => html += `<li>${n.icon}<b> ${esc(n.name)}</b>: <span class="actor-desc">${esc(n.desc)}</span></li>`);
    html += '</ul><button onclick="legendClose()" class="actionBtn">Закрыть</button>';
    const c = $('legendCont');
    const m = $('descModal');
    if (c) c.innerHTML = html;
    if (m) m.style.display = 'flex';
  };
  window.legendClose = function legendClose() { const m = $('descModal'); if (m) m.style.display = 'none'; };

  function boot() {
    window.onload = null;
    patchHeader();
    patchMissingNpc();
    const eventBox = $('eventBox');
    if (eventBox) eventBox.style.display = 'none';
    window.resetGame();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
