// GOART runtime startup patch v0.1.4
// Цель: сделать запуск логичным и безопасным после загрузки main.js.
// Файл подключается после main.js и берёт на себя автозапуск игры.
(function () {
  const VERSION = '0.1.4';

  window.GOART_VERSION = VERSION;

  // main.js назначает window.onload = resetGame.
  // Это опасно, потому что старый resetGame() обращается к отсутствующему #player-name.
  // Поэтому отключаем старый обработчик и запускаем безопасную инициализацию сами.
  window.onload = null;

  function setVersionInTitle() {
    document.title = `GOART v${VERSION} — Рабочий день в типографии`;

    const header = document.getElementById('header');
    if (header) {
      header.innerText = `🚀 GOART v${VERSION} — Рабочий день в типографии`;
    }
  }

  function safeResetGame() {
    const n = prompt('Ваше имя?', 'Новичок')?.trim() || 'Новичок';

    const playerNameEl = document.getElementById('player-name');
    if (playerNameEl) {
      playerNameEl.innerText = n;
    }

    if (typeof startGame === 'function') {
      startGame(n);
    } else {
      console.error('GOART v0.1.4: startGame() не найдена. Игра не может быть запущена.');
    }
  }

  function safeLegendOpen() {
    if (typeof ROOMS === 'undefined' || typeof NPCS_FULL === 'undefined') {
      console.error('GOART v0.1.4: данные ROOMS или NPCS_FULL не найдены. Справка не может быть открыта.');
      return;
    }

    let html = '<h2>Справка</h2><b>Локации:</b><ul>';
    ROOMS.forEach(r => {
      html += `<li><b>${r.name}</b> ${r.icon}: <span class="actor-desc">${r.desc}</span></li>`;
    });

    html += '</ul><b>Персонажи:</b><ul>';
    NPCS_FULL.forEach(n => {
      html += `<li>${n.icon}<b> ${n.name}</b>: <span class="actor-desc">${n.desc}</span></li>`;
    });

    html += '</ul><button onclick="legendClose()" style="margin:12px auto 4px auto; min-width:80px;">Закрыть</button>';

    const legendCont = document.getElementById('legendCont');
    const descModal = document.getElementById('descModal');

    if (legendCont) legendCont.innerHTML = html;
    if (descModal) descModal.style.display = 'flex';
  }

  function bootGame() {
    setVersionInTitle();

    const eventBox = document.getElementById('eventBox');
    if (eventBox) {
      eventBox.style.display = 'none';
    }

    safeResetGame();
  }

  window.resetGame = safeResetGame;
  window.legendOpen = safeLegendOpen;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootGame, { once: true });
  } else {
    bootGame();
  }
})();
