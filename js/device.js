// ===== Swym Monitor v2 =====

// ---------- Session Plan Data ----------
const SESSION_PLAN = [
  { num: 1, name: 'Warm Up',     type: 'Easy',      pace: '2:15/100m', dist: '200m' },
  { num: 2, name: 'Main Set',    type: 'Endurance',  pace: '1:45/100m', dist: '500m', highlight: true },
  { num: 3, name: 'Speed Drills', type: 'Sprint',    pace: '1:20/100m', dist: '300m' },
  { num: 4, name: 'Cool Down',   type: 'Recovery',   pace: '2:30/100m', dist: '200m' },
];

// ---------- Screen Navigation ----------
function showScreen(id) {
  document.querySelectorAll('.device-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---------- Clock ----------
function updateClock() {
  const now = new Date();
  const el = document.getElementById('clockTime');
  if (el) {
    el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
updateClock();
setInterval(updateClock, 10000);

// ---------- Welcome Screen – tap anywhere ----------
document.getElementById('scrWelcome').addEventListener('click', () => {
  showScreen('scrConnecting');

  // Auto-advance to set preview after 3 seconds
  setTimeout(() => {
    showScreen('scrSetPreview');
    renderSessionPlan();
  }, 3000);
});

// ---------- Render Session Plan ----------
function renderSessionPlan() {
  const container = document.getElementById('planItems');
  if (!container) return;

  container.innerHTML = SESSION_PLAN.map(item => `
    <div class="plan-item${item.highlight ? ' highlight' : ''}">
      <span class="plan-num">${item.num}</span>
      <div class="plan-info">
        <span class="plan-name">${item.name}</span>
        <span class="plan-type">${item.type}</span>
      </div>
      <div class="plan-meta">
        <span class="plan-pace">${item.pace}</span>
        <span class="plan-dist">${item.dist}</span>
      </div>
    </div>
  `).join('');
}
