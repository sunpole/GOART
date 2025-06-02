// game.legend.js

// Открыть всплывающее окно легенды
function legendOpen() {
  let html = "<b>Локации:</b><ul>";
  ROOMS.forEach(r => {
    html += `<li><b>${r.name}</b> ${r.icon}: <span class='actor-desc'>${r.desc}</span></li>`;
  });
  html += "</ul><b>Персонажи:</b><ul>";
  NPCS_FULL.forEach(n => {
    html += `<li>${n.icon}<b> ${n.name}</b>: <span class='actor-desc'>${n.desc}</span></li>`;
  });
  html += "</ul>";
  document.getElementById("legendCont").innerHTML = html;
  document.getElementById("descModal").style.display = 'flex';
}

// Закрыть всплывающее окно легенды
function legendClose() {
  document.getElementById("descModal").style.display = 'none';
}
