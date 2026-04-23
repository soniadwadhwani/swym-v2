// ===== Swym Monitor v2 =====

// ---------- Session Plan Data ----------
const SESSION_PLAN = [
  { num: 1, name: 'Warm Up',     type: 'Easy',      pace: '2:15/100m', dist: '200m' },
  { num: 2, name: 'Main Set',    type: 'Endurance',  pace: '1:45/100m', dist: '500m', highlight: true },
  { num: 3, name: 'Speed Drills', type: 'Sprint',    pace: '1:20/100m', dist: '300m' },
  { num: 4, name: 'Cool Down',   type: 'Recovery',   pace: '2:30/100m', dist: '200m' },
];

// ---------- Swimmer Data ----------
const CONNECTED_SWIMMER = { id: 'kai', name: 'Kai Okafor', initials: 'KO', lane: 2, pb: '2:03.70' };

const ALL_SWIMMERS = [
  { id: 'mara',  name: 'Mara Chen',    initials: 'MC', lane: 3, pb: '2:00.20', color: '#f6aa38' },
  { id: 'jonas', name: 'Jonas Reyes',   initials: 'JR', lane: 4, pb: '2:01.60', color: '#8b5cf6' },
  { id: 'kai',   name: 'Kai Okafor',    initials: 'KO', lane: 2, pb: '2:03.70', color: '#f6aa38', isYou: true },
  { id: 'ava',   name: 'Ava Park',      initials: 'AP', lane: 5, pb: '2:04.40', color: '#6b7280' },
  { id: 'leo',   name: 'Leo Silva',     initials: 'LS', lane: 1, pb: '2:06.50', color: '#6b7280' },
  { id: 'priya', name: 'Priya Nair',    initials: 'PN', lane: 6, pb: '2:08.60', color: '#6b7280' },
];

// Race state
let raceSwimmers = ['kai']; // connected swimmer always in
let raceRunning = false;
let raceInterval = null;
let raceStartTime = 0;

// ---------- Screen Navigation ----------
function showScreen(id) {
  document.querySelectorAll('.device-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---------- Tab Navigation ----------
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabName);
  });
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  if (tabName === 'race' && raceRunning) {
    document.getElementById('tabRaceLive').classList.add('active');
  } else if (tabName === 'race') {
    document.getElementById('tabRace').classList.add('active');
  } else if (tabName === 'ready') {
    document.getElementById('tabReady').classList.add('active');
  } else if (tabName === 'results') {
    document.getElementById('tabResults').classList.add('active');
  } else if (tabName === 'summary') {
    document.getElementById('tabSummary').classList.add('active');
  } else if (tabName === 'group') {
    document.getElementById('tabGroup').classList.add('active');
  }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

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
  setTimeout(() => {
    showScreen('scrSetPreview');
    renderSessionPlan();
    renderRaceSetup();
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

// ===== RACE SETUP =====
function renderRaceSetup() {
  const inRaceList = document.getElementById('raceSwimmerList');
  const availList = document.getElementById('raceAvailableList');
  const countEl = document.getElementById('raceCount');

  // In-race swimmers (excluding connected who is shown separately)
  const inRace = ALL_SWIMMERS.filter(s => raceSwimmers.includes(s.id) && s.id !== 'kai');
  const available = ALL_SWIMMERS.filter(s => !raceSwimmers.includes(s.id));

  countEl.textContent = `${raceSwimmers.length} / 6`;

  inRaceList.innerHTML = inRace.map(s => `
    <div class="race-swimmer-row in-race">
      <span class="race-swimmer-lane">L${s.lane}</span>
      <div class="race-swimmer-avatar">${s.initials}</div>
      <div class="race-swimmer-info">
        <span class="race-swimmer-name">${s.name}</span>
        <span class="race-swimmer-detail">Lane ${s.lane} · PB ${s.pb}</span>
      </div>
      <button class="race-remove-btn" onclick="removeFromRace('${s.id}')">Remove</button>
    </div>
  `).join('');

  availList.innerHTML = available.map(s => `
    <div class="race-swimmer-row">
      <span class="race-swimmer-lane">L${s.lane}</span>
      <div class="race-swimmer-avatar">${s.initials}</div>
      <div class="race-swimmer-info">
        <span class="race-swimmer-name">${s.name}</span>
        <span class="race-swimmer-detail">Lane ${s.lane} · PB ${s.pb}</span>
      </div>
      <span class="race-swimmer-pb">${s.pb}</span>
      <button class="race-add-btn" onclick="addToRace('${s.id}')">+ Add</button>
    </div>
  `).join('');
}

function addToRace(id) {
  if (raceSwimmers.length >= 6 || raceSwimmers.includes(id)) return;
  raceSwimmers.push(id);
  renderRaceSetup();
}

function removeFromRace(id) {
  if (id === 'kai') return; // can't remove connected swimmer
  raceSwimmers = raceSwimmers.filter(s => s !== id);
  renderRaceSetup();
}

// ===== START RACE =====
document.getElementById('btnStartRace').addEventListener('click', startRace);

// Generate mock split data for each swimmer
function generateSplits(basePace) {
  // basePace in seconds for 50m
  const splits = [];
  for (let i = 0; i < 4; i++) {
    const variation = (Math.random() - 0.4) * 3; // slight random variation
    const fatigue = i * 0.4; // gets slightly slower
    splits.push(+(basePace + variation + fatigue).toFixed(1));
  }
  return splits;
}

let raceData = [];

function startRace() {
  if (raceSwimmers.length < 2) return;

  raceRunning = true;
  raceStartTime = Date.now();

  // Generate race data for each swimmer
  raceData = ALL_SWIMMERS
    .filter(s => raceSwimmers.includes(s.id))
    .map(s => {
      // Parse PB to get approximate 50m pace
      const parts = s.pb.split(':');
      const totalSec = parseInt(parts[0]) * 60 + parseFloat(parts[1]);
      const basePace = totalSec / 4;
      return {
        ...s,
        splits: generateSplits(basePace),
        totalTime: 0,
        finished: false,
      };
    });

  // Calculate total times
  raceData.forEach(s => {
    s.totalTime = s.splits.reduce((a, b) => a + b, 0);
  });

  // Sort by total time
  raceData.sort((a, b) => a.totalTime - b.totalTime);

  // Switch to live tab
  switchTab('race');
  simulateRace();
}

function simulateRace() {
  const timerEl = document.getElementById('raceTimer');
  let currentSplit = 0;

  // Show initial standings
  renderLiveStandings(0);

  raceInterval = setInterval(() => {
    const elapsed = (Date.now() - raceStartTime) / 1000;
    const mins = Math.floor(elapsed / 60);
    const secs = Math.floor(elapsed % 60);
    timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    // Every 3 seconds, advance a split (simulating 50m segments)
    const newSplit = Math.min(Math.floor(elapsed / 3), 4);
    if (newSplit !== currentSplit) {
      currentSplit = newSplit;
      renderLiveStandings(currentSplit);
      renderSplitChart('splitChart', 'chartLegend', currentSplit);
    }

    // Race ends after 4 splits (12 seconds in simulation)
    if (currentSplit >= 4) {
      clearInterval(raceInterval);
      raceRunning = false;
      setTimeout(showResults, 1500);
    }
  }, 200);
}

function renderLiveStandings(splitIndex) {
  const container = document.getElementById('raceLiveStandings');
  if (!container) return;

  // Calculate cumulative time up to splitIndex
  const standings = raceData.map(s => {
    const cumTime = s.splits.slice(0, splitIndex).reduce((a, b) => a + b, 0);
    return { ...s, cumTime };
  }).sort((a, b) => a.cumTime - b.cumTime);

  const leaderTime = standings[0]?.cumTime || 0;

  container.innerHTML = standings.map((s, i) => {
    const gap = i === 0 ? '—' : `+${(s.cumTime - leaderTime).toFixed(1)}`;
    const timeStr = formatTime(s.cumTime);
    const isYou = s.isYou ? ' you' : '';
    return `
      <div class="race-standing-row${isYou}">
        <span class="race-standing-pos">${i + 1}</span>
        <span class="race-standing-name">${s.name}</span>
        <span class="race-standing-lane">L${s.lane}</span>
        <span class="race-standing-time">${splitIndex === 0 ? '—' : timeStr}</span>
        <span class="race-standing-gap">${splitIndex === 0 ? '' : gap}</span>
      </div>`;
  }).join('');
}

// ===== SPLIT CHART (Canvas) =====
function renderSplitChart(canvasId, legendId, splitCount) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.scale(dpr, dpr);

  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const pad = { top: 30, right: 20, bottom: 50, left: 50 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  ctx.clearRect(0, 0, w, h);

  const labels = ['0-50m', '50-100m', '100-150m', '150-200m'];
  const displaySplits = Math.min(splitCount, 4);
  if (displaySplits === 0) return;

  // Find you + faster swimmers to chart
  const you = raceData.find(s => s.isYou);
  const youIdx = raceData.indexOf(you);
  const chartSwimmers = raceData.filter(s => s.isYou || raceData.indexOf(s) <= youIdx);

  // Find y-axis range from visible splits
  let allVals = [];
  chartSwimmers.forEach(s => {
    s.splits.slice(0, displaySplits).forEach(v => allVals.push(v));
  });
  const minY = Math.floor(Math.min(...allVals) - 1);
  const maxY = Math.ceil(Math.max(...allVals) + 1);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '11px "DM Sans"';
    ctx.textAlign = 'right';
    const val = maxY - (i / 4) * (maxY - minY);
    ctx.fillText(val.toFixed(1) + 's', pad.left - 8, y + 4);
  }

  // Vertical grid + labels
  for (let i = 0; i < 4; i++) {
    const x = pad.left + (i / 3) * chartW;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + chartH);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '10px "DM Sans"';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x, pad.top + chartH + 20);
  }

  // Draw lines
  chartSwimmers.forEach(s => {
    ctx.strokeStyle = s.isYou ? '#f6aa38' : (s.color || 'rgba(255,255,255,0.2)');
    ctx.lineWidth = s.isYou ? 3 : 2;
    ctx.beginPath();
    for (let i = 0; i < displaySplits; i++) {
      const x = pad.left + (i / 3) * chartW;
      const y = pad.top + ((maxY - s.splits[i]) / (maxY - minY)) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Dots
    for (let i = 0; i < displaySplits; i++) {
      const x = pad.left + (i / 3) * chartW;
      const y = pad.top + ((maxY - s.splits[i]) / (maxY - minY)) * chartH;
      ctx.fillStyle = s.isYou ? '#f6aa38' : (s.color || 'rgba(255,255,255,0.3)');
      ctx.beginPath();
      ctx.arc(x, y, s.isYou ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Legend
  const legendEl = document.getElementById(legendId);
  if (legendEl) {
    legendEl.innerHTML = chartSwimmers.map(s => `
      <div class="legend-item">
        <span class="legend-dot" style="background:${s.isYou ? '#f6aa38' : s.color}"></span>
        L${s.lane} ${s.name}${s.isYou ? ' ★' : ''}
      </div>
    `).join('');
  }
}

// ===== RESULTS =====
function showResults() {
  const sorted = [...raceData].sort((a, b) => a.totalTime - b.totalTime);
  const leaderTime = sorted[0].totalTime;

  // Leaderboard table
  const table = document.getElementById('resultsTable');
  table.innerHTML = sorted.map((s, i) => {
    const gap = i === 0 ? '—' : `+${(s.totalTime - leaderTime).toFixed(2)}`;
    const isYou = s.isYou ? ' you' : '';
    return `
      <div class="result-row${isYou}">
        <span class="result-pos">${i + 1}</span>
        <div class="result-swimmer">
          <span class="result-swimmer-name">${s.name}</span>
          <span class="result-swimmer-lane">LANE ${s.lane}</span>
        </div>
        <span class="result-time">${formatTime(s.totalTime)}</span>
        <span class="result-gap${i === 0 ? ' winner' : ''}">${gap}</span>
      </div>`;
  }).join('');

  // Podium – order: 2nd, 1st, 3rd (visual layout)
  const top3 = sorted.slice(0, 3);
  const medals = ['gold', 'silver', 'bronze'];
  const places = ['1st', '2nd', '3rd'];
  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
  const medalOrder = [1, 0, 2]; // silver, gold, bronze

  const podiumArea = document.getElementById('podiumArea');
  const confettiColors = ['#f6aa38', '#d4ecf1', '#8b5cf6', '#4ade80', '#ef4444', '#c0c0c0'];

  // Build confetti
  let confettiHTML = '<div class="confetti-container">';
  for (let i = 0; i < 40; i++) {
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const size = 6 + Math.random() * 6;
    confettiHTML += `<div class="confetti" style="left:${left}%;animation-delay:${delay}s;background:${color};width:${size}px;height:${size}px;"></div>`;
  }
  confettiHTML += '</div>';

  podiumArea.innerHTML = `
    ${confettiHTML}
    <div class="podium-trophy">🏆</div>
    <div class="podium-blocks">
      ${podiumOrder.map((s, vi) => {
        const mi = medalOrder[vi];
        const medal = medals[mi];
        const place = mi + 1;
        return `
          <div class="podium-entry">
            <div class="podium-avatar ${medal}">${s.initials}</div>
            <div class="podium-name">${s.name}</div>
            <div class="podium-time">${formatTime(s.totalTime)}</div>
            <div class="podium-block ${medal === 'gold' ? 'first' : medal === 'silver' ? 'second' : 'third'}">${place}</div>
          </div>`;
      }).join('')}
    </div>
  `;

  switchTab('results');
}

// ---------- Utilities ----------
function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = (totalSeconds % 60).toFixed(2);
  return `${mins}:${secs.padStart(5, '0')}`;
}

// ===== SUMMARY PACE CHART =====
const SUMMARY_YOU =   [52, 53, 51, 54, 55, 53, 56, 54, 52];
const SUMMARY_GHOST = [51, 51, 50, 52, 53, 51, 52, 51, 50];

function renderSummaryChart() {
  const canvas = document.getElementById('summaryPaceChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.scale(dpr, dpr);

  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const pad = { top: 16, right: 16, bottom: 36, left: 36 };
  const cW = w - pad.left - pad.right;
  const cH = h - pad.top - pad.bottom;

  ctx.clearRect(0, 0, w, h);

  const labels = ['50m','100m','150m','200m','250m','300m','350m','400m','450m','500m','550m','600m'];
  const n = SUMMARY_YOU.length;
  const minY = 35;
  const maxY = 60;

  // Y-axis grid
  const ySteps = [35, 40, 45, 50, 55, 60];
  ySteps.forEach(v => {
    const y = pad.top + ((maxY - v) / (maxY - minY)) * cH;
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + cW, y);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '10px "DM Sans"';
    ctx.textAlign = 'right';
    ctx.fillText(v + 's', pad.left - 6, y + 4);
  });

  // X-axis labels
  const xLabels = ['50m','100m','150m','200m','250m','300m','350m','400m','450m'];
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    // Vertical grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + cH);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '9px "DM Sans"';
    ctx.textAlign = 'center';
    ctx.fillText(xLabels[i] || '', x, pad.top + cH + 18);
  }

  // Helper: draw line with optional fill
  function drawLine(data, color, lineW, fill) {
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = pad.left + (i / (n - 1)) * cW;
      const y = pad.top + ((maxY - data[i]) / (maxY - minY)) * cH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = lineW;
    ctx.stroke();

    if (fill) {
      // Fill area under
      const lastX = pad.left + ((n - 1) / (n - 1)) * cW;
      ctx.lineTo(lastX, pad.top + cH);
      ctx.lineTo(pad.left, pad.top + cH);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    }
  }

  // Ghost line + fill
  drawLine(SUMMARY_GHOST, 'rgba(255,255,255,0.15)', 1.5, 'rgba(255,255,255,0.03)');

  // You line + fill
  drawLine(SUMMARY_YOU, '#f6aa38', 2.5, 'rgba(246,170,56,0.08)');

  // Dots for You
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    const y = pad.top + ((maxY - SUMMARY_YOU[i]) / (maxY - minY)) * cH;
    ctx.fillStyle = '#f6aa38';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    // White ring
    ctx.strokeStyle = 'rgba(17,16,51,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Dots for Ghost
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    const y = pad.top + ((maxY - SUMMARY_GHOST[i]) / (maxY - minY)) * cH;
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Render summary chart when switching to summary tab
const origSwitchTab = switchTab;
switchTab = function(tabName) {
  origSwitchTab(tabName);
  if (tabName === 'summary') {
    setTimeout(renderSummaryChart, 50);
  }
};

// ===== COACHING / SCORE SCREEN =====
document.getElementById('btnScore').addEventListener('click', () => {
  // Hide all tab content, show coaching
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tabCoaching').classList.add('active');
  // Update tab button to show COACHING active
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  setTimeout(renderCoachingSplitChart, 50);
});

document.getElementById('btnCoachingBack').addEventListener('click', () => {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tabReady').classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === 'ready');
  });
});

// Coaching split chart data
const COACHING_YOU =   [51, 52, 50, 52, 53, 51];
const COACHING_GHOST = [50, 50, 49, 50, 51, 50];
const COACHING_LABELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];

function renderCoachingSplitChart() {
  const canvas = document.getElementById('coachingSplitChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.scale(dpr, dpr);

  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const pad = { top: 24, right: 20, bottom: 30, left: 36 };
  const cW = w - pad.left - pad.right;
  const cH = h - pad.top - pad.bottom;
  const n = COACHING_YOU.length;

  ctx.clearRect(0, 0, w, h);

  const minY = 46;
  const maxY = 56;

  // Horizontal grid + Y labels
  const ySteps = [47, 49, 51, 53, 55];
  ySteps.forEach(v => {
    const y = pad.top + ((maxY - v) / (maxY - minY)) * cH;
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + cW, y);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '10px "DM Sans"';
    ctx.textAlign = 'right';
    ctx.fillText(v + 's', pad.left - 6, y + 4);
  });

  // Vertical grid + X labels
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + cH);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '11px "DM Sans"';
    ctx.textAlign = 'center';
    ctx.fillText(COACHING_LABELS[i], x, pad.top + cH + 20);
  }

  // Ghost line + area fill
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    const y = pad.top + ((maxY - COACHING_GHOST[i]) / (maxY - minY)) * cH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Fill
  ctx.lineTo(pad.left + ((n - 1) / (n - 1)) * cW, pad.top + cH);
  ctx.lineTo(pad.left, pad.top + cH);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.02)';
  ctx.fill();

  // Ghost dots
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    const y = pad.top + ((maxY - COACHING_GHOST[i]) / (maxY - minY)) * cH;
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // You line
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    const y = pad.top + ((maxY - COACHING_YOU[i]) / (maxY - minY)) * cH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#f6aa38';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // You dots + time labels
  for (let i = 0; i < n; i++) {
    const x = pad.left + (i / (n - 1)) * cW;
    const y = pad.top + ((maxY - COACHING_YOU[i]) / (maxY - minY)) * cH;

    // Dot
    ctx.fillStyle = '#f6aa38';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(17,16,51,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Time label above dot
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '600 11px "DM Sans"';
    ctx.textAlign = 'center';
    ctx.fillText(COACHING_YOU[i] + 's', x, y - 14);
  }
}
