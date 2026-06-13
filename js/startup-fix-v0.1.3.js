// GOART startup safety patch v0.1.3
// Исправляет падение игры на старте, если в HTML нет элемента #player-name.
// Этот файл должен подключаться после main.js.
(function () {
  const VERSION = '0.1.3';

  window.GOART_VERSION = VERSION;

  function setVersionInTitle() {
    document.title = `GOART v${VERSION} — Рабочий день в типографии`;

    const header = document.getElementById('header');
    if (header) {
      header.innerText = `🚀 GOART v${VERSION} — Рабочий день в типографии`;
    }
  }

  function safeResetGame() {
    const n = prompt('Ваше имя?', 'Новичок')?.trim() || 'Новичок';

    // В ранних версиях интерфейса мог быть отдельный #player-name.
    // В текущем index.html его нет, поэтому обновляем только если элемент существует.
    const playerNameEl = document.getElementById('player-name');
    if (playerNameEl) {
      playerNameEl.innerText = n;
    }

    if (typeof window.startGame === 'function') {
      window.startGame(n);
    } else if (typeof startGame === 'function') {
      startGame(n);
    } else {
      console.error('GOART: startGame() не найдена. Игра не может быть запущена.');
    }
  }

  function safeLegendOpen() {
    if (typeof ROOMS === 'undefined' || typeof NPCS_FULL === 'undefined') {
      console.error('GOART: данные ROOMS или NPCS_FULL не найдены. Справка не может быть открыта.');
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

  window.resetGame = safeResetGame;
  window.legendOpen = safeLegendOpen;

  window.addEventListener('load', setVersionInTitle);
})();
