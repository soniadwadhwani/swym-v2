// ---------- Clock ----------
function updateClock() {
  const now = new Date();
  document.getElementById('clockTime').textContent =
    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
updateClock();
setInterval(updateClock, 10000);

// ---------- Elements ----------
const idleScreen    = document.getElementById('idleScreen');
const sessionScreen = document.getElementById('sessionScreen');
const summaryScreen = document.getElementById('summaryScreen');
const btnStart      = document.getElementById('btnStart');
const btnStop       = document.getElementById('btnStop');
const btnNewSession = document.getElementById('btnNewSession');
const distEl        = document.getElementById('distValue');
const timeEl        = document.getElementById('timeValue');
const paceEl        = document.getElementById('paceValue');

let timer = null;
let distTimer = null;
let elapsedSec = 0;
let distanceM = 0;

// ---------- Helpers ----------
function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function calcPace(distM, sec) {
  if (distM === 0) return '--:--';
  const per100 = (sec / distM) * 100;
  const m = Math.floor(per100 / 60);
  const s = Math.round(per100 % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function showScreen(screen) {
  idleScreen.style.display = 'none';
  sessionScreen.classList.remove('active');
  summaryScreen.classList.remove('active');
  if (screen === 'idle') idleScreen.style.display = 'flex';
  else if (screen === 'session') sessionScreen.classList.add('active');
  else if (screen === 'summary') summaryScreen.classList.add('active');
}

// ---------- Start ----------
btnStart.addEventListener('click', () => {
  elapsedSec = 0;
  distanceM = 0;
  distEl.textContent = '0';
  timeEl.textContent = '00:00';
  paceEl.textContent = '--:--';
  showScreen('session');

  // Time counter – every second
  timer = setInterval(() => {
    elapsedSec++;
    timeEl.textContent = fmtTime(elapsedSec);
    paceEl.textContent = calcPace(distanceM, elapsedSec);
  }, 1000);

  // Distance simulation – swimmer ~1.5 m/s with slight randomness
  distTimer = setInterval(() => {
    const increment = 1.2 + Math.random() * 0.6; // 1.2–1.8 m/s
    distanceM += increment;
    distEl.textContent = Math.round(distanceM);
    paceEl.textContent = calcPace(distanceM, elapsedSec);
  }, 1000);
});

// ---------- Stop ----------
btnStop.addEventListener('click', () => {
  clearInterval(timer);
  clearInterval(distTimer);

  document.getElementById('sumDist').textContent = Math.round(distanceM) + ' m';
  document.getElementById('sumTime').textContent = fmtTime(elapsedSec);
  document.getElementById('sumPace').textContent = calcPace(distanceM, elapsedSec);
  document.getElementById('sumLaps').textContent = Math.floor(distanceM / 50);

  showScreen('summary');
});

// ---------- New Session ----------
btnNewSession.addEventListener('click', () => {
  showScreen('idle');
});
