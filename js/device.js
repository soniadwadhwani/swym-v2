// ===== Swym Monitor – Multi-Swimmer Session Manager =====

// ---------- Registered Swimmers ----------
const SWIMMERS = [
  { id: 1, name: 'Sonia',    initials: 'SO', color: '#e040fb' },
  { id: 2, name: 'Kanika',   initials: 'KA', color: '#ff5252' },
  { id: 3, name: 'Vasuman',  initials: 'VA', color: '#448aff' },
  { id: 4, name: 'Hrishika', initials: 'HR', color: '#69f0ae' },
  { id: 5, name: 'Piyush',   initials: 'PI', color: '#ffd740' }
];

// Active sessions: { swimmerId, elapsedSec, distanceM, timerId, distTimerId }
const activeSessions = new Map();

// ---------- DOM refs ----------
const idleView       = document.getElementById('idleView');
const swimmerSelect  = document.getElementById('swimmerSelect');
const swimmerListEl  = document.getElementById('swimmerList');
const liveDashboard  = document.getElementById('liveDashboard');
const sessionBody    = document.getElementById('sessionTableBody');
const activeCountEl  = document.getElementById('activeCount');
const monitorStatus  = document.getElementById('monitorStatus');
const ringOverlay    = document.getElementById('ringOverlay');
const detectedName   = document.getElementById('detectedName');
const detectedMsg    = document.getElementById('detectedMsg');

// ---------- Clock ----------
function updateClock() {
  const now = new Date();
  document.getElementById('clockTime').textContent =
    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
updateClock();
setInterval(updateClock, 10000);

// ---------- Helpers ----------
function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function calcPace(distM, sec) {
  if (distM === 0) return '--:--';
  const per100 = (sec / distM) * 100;
  const m = Math.floor(per100 / 60);
  const s = Math.round(per100 % 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

// ---------- View switching ----------
let currentViewMode = 'dashboard'; // 'dashboard' | 'single' | 'leaderboard'

function showView(view) {
  idleView.style.display = 'none';
  swimmerSelect.classList.remove('show');
  liveDashboard.classList.remove('show');
  document.getElementById('singleSwimmerView').classList.remove('show');
  document.getElementById('leaderboardView').classList.remove('show');

  // Clear hotspot highlights
  document.getElementById('hotspot1').classList.remove('active-hotspot');
  document.getElementById('hotspot2').classList.remove('active-hotspot');
  document.getElementById('hotspotNav').classList.remove('active');

  if (view === 'idle') {
    idleView.style.display = 'flex';
    monitorStatus.textContent = 'Standby';
    monitorStatus.classList.add('idle');
  } else if (view === 'select') {
    swimmerSelect.classList.add('show');
  } else if (view === 'dashboard') {
    liveDashboard.classList.add('show');
    monitorStatus.textContent = activeSessions.size + ' Active';
    monitorStatus.classList.remove('idle');
    currentViewMode = 'dashboard';
  } else if (view === 'single') {
    document.getElementById('singleSwimmerView').classList.add('show');
    document.getElementById('hotspot1').classList.add('active-hotspot');
    document.getElementById('hotspotNav').classList.add('active');
    monitorStatus.textContent = 'Single View';
    monitorStatus.classList.remove('idle');
    currentViewMode = 'single';
    renderSingleSwimmer();
  } else if (view === 'leaderboard') {
    document.getElementById('leaderboardView').classList.add('show');
    document.getElementById('hotspot2').classList.add('active-hotspot');
    monitorStatus.textContent = 'Leaderboard';
    monitorStatus.classList.remove('idle');
    currentViewMode = 'leaderboard';
    renderLeaderboard();
  }
}

// ---------- Show ring detected animation ----------
function showRingDetected(swimmer, callback) {
  detectedName.textContent = swimmer.name + "'s Ring Detected";
  detectedMsg.textContent = 'Binding session to ring...';
  ringOverlay.classList.add('show');

  setTimeout(() => {
    detectedMsg.textContent = 'Session started!';
    setTimeout(() => {
      ringOverlay.classList.remove('show');
      if (callback) callback();
    }, 800);
  }, 1000);
}

// ---------- Build swimmer select list ----------
function renderSwimmerList() {
  swimmerListEl.innerHTML = '';
  SWIMMERS.forEach(sw => {
    const isActive = activeSessions.has(sw.id);
    const div = document.createElement('div');
    div.className = 'swimmer-option' + (isActive ? ' active-session' : '');
    div.innerHTML =
      '<div class="sw-avatar" style="background:' + sw.color + '">' + sw.initials + '</div>' +
      '<span class="sw-name">' + sw.name + '</span>' +
      '<span class="sw-status ' + (isActive ? 'in-pool' : '') + '">' +
        (isActive ? 'In Pool' : 'Available') +
      '</span>';

    if (!isActive) {
      div.addEventListener('click', () => startSession(sw));
    }
    swimmerListEl.appendChild(div);
  });
}

// ---------- Start session for a swimmer ----------
function startSession(swimmer) {
  const session = {
    swimmerId: swimmer.id,
    elapsedSec: 0,
    distanceM: 0,
    timerId: null,
    distTimerId: null
  };

  // Show ring detected animation, then activate
  showRingDetected(swimmer, () => {
    // Time ticker
    session.timerId = setInterval(() => {
      session.elapsedSec++;
      updateRow(swimmer.id);
    }, 1000);

    // Distance simulation (~1.2–1.8 m/s with variance per swimmer)
    const baseSpeed = 1.1 + (swimmer.id * 0.15); // slight per-swimmer variance
    session.distTimerId = setInterval(() => {
      const increment = baseSpeed + Math.random() * 0.5;
      session.distanceM += increment;
      updateRow(swimmer.id);
    }, 1000);

    activeSessions.set(swimmer.id, session);
    renderDashboard();
    showView('dashboard');
  });
}

// ---------- End session ----------
function endSession(swimmerId) {
  const session = activeSessions.get(swimmerId);
  if (!session) return;
  clearInterval(session.timerId);
  clearInterval(session.distTimerId);
  activeSessions.delete(swimmerId);

  if (activeSessions.size === 0) {
    showView('idle');
  } else {
    renderDashboard();
  }
}

// ---------- Render dashboard table ----------
function renderDashboard() {
  activeCountEl.textContent = activeSessions.size;
  monitorStatus.textContent = activeSessions.size + ' Active';

  sessionBody.innerHTML = '';
  activeSessions.forEach((session, swId) => {
    const sw = SWIMMERS.find(s => s.id === swId);
    const tr = document.createElement('tr');
    tr.id = 'row-' + swId;
    tr.innerHTML =
      '<td><div class="swimmer-cell">' +
        '<span class="dot"></span>' +
        '<span class="name">' + sw.name + '</span>' +
      '</div></td>' +
      '<td class="td-distance">' + Math.round(session.distanceM) + ' m</td>' +
      '<td class="td-time">' + fmtTime(session.elapsedSec) + '</td>' +
      '<td class="td-pace">' + calcPace(session.distanceM, session.elapsedSec) + '</td>' +
      '<td class="td-laps">' + Math.floor(session.distanceM / 50) + '</td>' +
      '<td><button class="btn-end-session" data-id="' + swId + '">End</button></td>';
    sessionBody.appendChild(tr);
  });

  // Attach end-session handlers
  sessionBody.querySelectorAll('.btn-end-session').forEach(btn => {
    btn.addEventListener('click', () => {
      endSession(Number(btn.dataset.id));
    });
  });
}

// ---------- Update single row (called every tick) ----------
function updateRow(swId) {
  // Update table row if visible
  const row = document.getElementById('row-' + swId);
  if (row) {
    const session = activeSessions.get(swId);
    if (!session) return;
    row.querySelector('.td-distance').textContent = Math.round(session.distanceM) + ' m';
    row.querySelector('.td-time').textContent = fmtTime(session.elapsedSec);
    row.querySelector('.td-pace').textContent = calcPace(session.distanceM, session.elapsedSec);
    row.querySelector('.td-laps').textContent = Math.floor(session.distanceM / 50);
  }

  // Update single swimmer view if active
  if (currentViewMode === 'single') {
    renderSingleSwimmer();
  }

  // Update leaderboard if active
  if (currentViewMode === 'leaderboard') {
    renderLeaderboard();
  }
}

// ---------- Single Swimmer View ----------
let singleIndex = 0;

function getActiveList() {
  return Array.from(activeSessions.keys());
}

function renderSingleSwimmer() {
  const ids = getActiveList();
  if (ids.length === 0) return;
  if (singleIndex >= ids.length) singleIndex = 0;
  if (singleIndex < 0) singleIndex = ids.length - 1;

  const swId = ids[singleIndex];
  const sw = SWIMMERS.find(s => s.id === swId);
  const session = activeSessions.get(swId);

  const label = (singleIndex + 1) + ' / ' + ids.length;
  document.getElementById('singleNavLabel').textContent = label;
  document.getElementById('navCounter').textContent = label;
  document.getElementById('singleName').textContent = sw.name;
  document.getElementById('singleDist').textContent = Math.round(session.distanceM);
  document.getElementById('singleTime').textContent = fmtTime(session.elapsedSec);
  document.getElementById('singlePace').textContent = calcPace(session.distanceM, session.elapsedSec);
  document.getElementById('singleLaps').textContent = Math.floor(session.distanceM / 50);
}

// Navigator hotspot arrows
document.getElementById('navArrowLeft').addEventListener('click', () => {
  singleIndex--;
  renderSingleSwimmer();
});

document.getElementById('navArrowRight').addEventListener('click', () => {
  singleIndex++;
  renderSingleSwimmer();
});

// ---------- Leaderboard View ----------
function renderLeaderboard() {
  const lbList = document.getElementById('lbList');
  const entries = [];

  activeSessions.forEach((session, swId) => {
    const sw = SWIMMERS.find(s => s.id === swId);
    entries.push({
      name: sw.name,
      distance: session.distanceM,
      time: session.elapsedSec,
      pace: calcPace(session.distanceM, session.elapsedSec),
      laps: Math.floor(session.distanceM / 50)
    });
  });

  // Sort by distance descending
  entries.sort((a, b) => b.distance - a.distance);

  lbList.innerHTML = '';
  entries.forEach((e, i) => {
    const row = document.createElement('div');
    row.className = 'lb-row';
    row.innerHTML =
      '<div class="lb-rank">' + (i + 1) + '</div>' +
      '<div class="lb-info">' +
        '<div class="lb-name">' + e.name + '</div>' +
        '<div class="lb-meta">' + fmtTime(e.time) + ' elapsed &middot; ' + e.laps + ' laps</div>' +
      '</div>' +
      '<div class="lb-dist">' + Math.round(e.distance) + ' m</div>' +
      '<div class="lb-pace">' + e.pace + '</div>';
    lbList.appendChild(row);
  });
}

// ---------- Event listeners ----------

// Start session (from idle screen)
document.getElementById('btnTapStart').addEventListener('click', () => {
  renderSwimmerList();
  showView('select');
});

// Add swimmer (from dashboard)
document.getElementById('btnAddSwimmer').addEventListener('click', () => {
  renderSwimmerList();
  showView('select');
});

// Cancel select
document.getElementById('btnCancelSelect').addEventListener('click', () => {
  if (activeSessions.size > 0) {
    showView(currentViewMode);
  } else {
    showView('idle');
  }
});

// ---------- Hotspot listeners ----------
document.getElementById('hotspot1').addEventListener('click', () => {
  if (activeSessions.size === 0) return;
  if (currentViewMode === 'single') {
    showView('dashboard');
  } else {
    singleIndex = 0;
    showView('single');
  }
});

document.getElementById('hotspot2').addEventListener('click', () => {
  if (activeSessions.size === 0) return;
  if (currentViewMode === 'leaderboard') {
    showView('dashboard');
  } else {
    showView('leaderboard');
  }
});
