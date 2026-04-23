/* ============================================================
   SWYM App – Complete Prototype v2
   Replicated from Figma Prototype (React → Vanilla JS)
   ============================================================ */

// ── State ───────────────────────────────────────────────────
let currentRole = null;
let currentScreen = 'scrWelcome';
let viewMode = 'swimmer'; // 'swimmer' or 'coach'
let coachTab = 'coachHome';
let feedLikes = {};

// Drill state
let drills = [{ id: '1', type: 'warmup', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 45, rest: 15, reps: 1 }];
let expandedDrill = null;
let todaySet = null;
let selectedGhost = null;

const DRILL_TYPES = [
  { value: 'warmup', label: 'Warmup' },
  { value: 'main', label: 'Main Set' },
  { value: 'sprint', label: 'Sprint' },
  { value: 'drill', label: 'Technique' },
  { value: 'cooldown', label: 'Cooldown' },
  { value: 'kick', label: 'Kick Set' },
];

const STROKES = ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'IM', 'Choice'];
const DISTANCES = [25, 50, 75, 100, 150, 200, 300, 400, 500, 800];

const DRILL_ICONS = {
  warmup: '<svg width="16" height="16" fill="none" stroke="#61949B" stroke-width="1.5"><path d="M8 2C5.5 6 4 8 4 10.5C4 13 6 14 8 14s4-1 4-3.5C12 8 10.5 6 8 2Z"/></svg>',
  main: '<svg width="16" height="16" fill="none" stroke="#61949B" stroke-width="1.5"><path d="M8 2C5 6 3 7.5 3 10a5 5 0 0010 0C13 7.5 11 6 8 2Z"/></svg>',
  sprint: '<svg width="16" height="16" fill="none" stroke="#61949B" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l2.5 1.5"/></svg>',
  drill: '<svg width="16" height="16" fill="none" stroke="#61949B" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="2.5"/></svg>',
  cooldown: '<svg width="16" height="16" fill="none" stroke="#61949B" stroke-width="1.5"><path d="M2 8c2-3 4-5 6-5s4 2 6 5c2 3 4 5 6 5"/></svg>',
  kick: '<svg width="16" height="16" fill="none" stroke="#61949B" stroke-width="1.5"><path d="M4 8a4 4 0 108 0 4 4 0 10-8 0M8 4v8"/></svg>',
};

// ── Mock Data ───────────────────────────────────────────────
const FRIENDS = [
  { id: 'f1', name: 'Sonia Kumar', initials: 'SK', color: '#61949B', weeklyDistance: 12.4, lastActivity: { action: 'hit a new PB', detail: '1:22/100m', time: '2h ago' } },
  { id: 'f2', name: 'Arjun Patel', initials: 'AP', color: '#1A343B', weeklyDistance: 8.2, lastActivity: { action: 'completed', detail: '4.2km endurance', time: '4h ago' } },
  { id: 'f3', name: 'Maya Chen', initials: 'MC', color: '#87ACAA', weeklyDistance: 10.1, lastActivity: { action: 'achieved', detail: '5-day streak', time: '6h ago' } },
];

const LEGENDS = [
  {
    id: 'l1', name: 'Katie Ledecky', specialty: 'Distance Freestyle', badge: 'Olympic Gold', pace: '1:02/100m',
    sets: [
      { name: 'Olympic Distance Prep', drills: [
        { id: 'kl1', type: 'warmup', stroke: 'Freestyle', distance: 600, paceMin: 1, paceSec: 20, rest: 15, reps: 1 },
        { id: 'kl2', type: 'main', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 5, rest: 30, reps: 6 },
        { id: 'kl3', type: 'sprint', stroke: 'Freestyle', distance: 100, paceMin: 0, paceSec: 58, rest: 45, reps: 4 },
        { id: 'kl4', type: 'cooldown', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 30, rest: 0, reps: 1 },
      ], startHour: 5, startMinute: 30, startPeriod: 'AM', date: '2026-04-19' },
      { name: 'Endurance Base Builder', drills: [
        { id: 'kl5', type: 'warmup', stroke: 'Freestyle', distance: 800, paceMin: 1, paceSec: 25, rest: 20, reps: 1 },
        { id: 'kl6', type: 'main', stroke: 'Freestyle', distance: 500, paceMin: 1, paceSec: 8, rest: 25, reps: 8 },
        { id: 'kl7', type: 'cooldown', stroke: 'Choice', distance: 300, paceMin: 1, paceSec: 40, rest: 0, reps: 1 },
      ], startHour: 6, startMinute: 0, startPeriod: 'AM', date: '2026-04-19' },
    ],
  },
  {
    id: 'l2', name: 'Caeleb Dressel', specialty: 'Sprint Butterfly', badge: 'World Record', pace: '0:49/100m',
    sets: [
      { name: 'Explosive Power Sprint', drills: [
        { id: 'cd1', type: 'warmup', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 30, rest: 15, reps: 1 },
        { id: 'cd2', type: 'drill', stroke: 'Butterfly', distance: 50, paceMin: 1, paceSec: 10, rest: 30, reps: 6 },
        { id: 'cd3', type: 'sprint', stroke: 'Butterfly', distance: 50, paceMin: 0, paceSec: 48, rest: 60, reps: 10 },
        { id: 'cd4', type: 'cooldown', stroke: 'Backstroke', distance: 200, paceMin: 2, paceSec: 0, rest: 0, reps: 1 },
      ], startHour: 7, startMinute: 30, startPeriod: 'AM', date: '2026-04-19' },
    ],
  },
];

const MOCK_COMPLETED_WORKOUT = {
  id: 'cw1', date: '2026-04-17', name: 'Morning Endurance',
  startTime: '6:30 AM', endTime: '7:22 AM',
  totalDistance: 2400, totalDuration: 3120, avgPace100m: 86,
  sets: [
    { id: 'cs1', type: 'warmup', stroke: 'Freestyle', targetDistance: 400, targetPace: 105, actualDistance: 400, totalTimeSeconds: 425, avgPace100m: 106, restAfterSet: 30,
      laps: [
        { lapNumber: 1, timeSeconds: 55, pace100m: 110, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 2, timeSeconds: 54, pace100m: 108, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 3, timeSeconds: 52, pace100m: 104, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 4, timeSeconds: 53, pace100m: 106, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 5, timeSeconds: 51, pace100m: 102, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 6, timeSeconds: 52, pace100m: 104, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 7, timeSeconds: 51, pace100m: 102, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 8, timeSeconds: 52, pace100m: 104, restAfter: 5, stroke: 'Freestyle' },
      ] },
    { id: 'cs2', type: 'main', stroke: 'Freestyle', targetDistance: 1200, targetPace: 85, actualDistance: 1200, totalTimeSeconds: 1065, avgPace100m: 89, restAfterSet: 45,
      laps: [
        { lapNumber: 1, timeSeconds: 43, pace100m: 86, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 2, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 3, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 4, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 5, timeSeconds: 46, pace100m: 92, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 6, timeSeconds: 47, pace100m: 94, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 7, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 8, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
      ] },
    { id: 'cs3', type: 'sprint', stroke: 'Freestyle', targetDistance: 400, targetPace: 72, actualDistance: 400, totalTimeSeconds: 345, avgPace100m: 76, restAfterSet: 60,
      laps: [
        { lapNumber: 1, timeSeconds: 38, pace100m: 76, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 2, timeSeconds: 37, pace100m: 74, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 3, timeSeconds: 39, pace100m: 78, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 4, timeSeconds: 36, pace100m: 72, restAfter: 15, stroke: 'Freestyle' },
      ] },
    { id: 'cs4', type: 'cooldown', stroke: 'Backstroke', targetDistance: 400, targetPace: 120, actualDistance: 400, totalTimeSeconds: 485, avgPace100m: 121, restAfterSet: 0,
      laps: [
        { lapNumber: 1, timeSeconds: 62, pace100m: 124, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 2, timeSeconds: 60, pace100m: 120, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 3, timeSeconds: 61, pace100m: 122, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 4, timeSeconds: 60, pace100m: 120, restAfter: 5, stroke: 'Backstroke' },
      ] },
  ],
  aiSummary: 'Strong workout with consistent pacing. Your warmup showed progressive improvement, dropping from 110s to 102s per 100m. The main set revealed slight fatigue between laps 5-6, but you recovered well and finished strong with an 84s final lap.',
  aiInsights: [
    'Mid-set pacing: You tend to slow down around the halfway point of longer sets. Consider mental checkpoints every 400m.',
    'Strong finishes: Your last 2-3 laps are consistently faster, showing good energy management.',
    'Sprint efficiency: Your 50m sprint times are excellent (72-78s/100m), indicating strong anaerobic capacity.',
    'Rest optimization: Try reducing to 6s on recovery days to build endurance.',
  ],
};

const ATHLETES = [
  { id: 'a1', name: 'Sonia Kumar', initials: 'SK', specialty: 'Distance Freestyle', fatigue: 25, attendance: '98%', lastPace: '1:22/100m', aiNote: 'Taper ready for Saturday meet.', color: '#334F6B', weeklyDist: '14.2km', sessions: 5 },
  { id: 'a2', name: 'Arjun Patel', initials: 'AP', specialty: 'Sprint Freestyle', fatigue: 45, attendance: '85%', lastPace: '0:38/50m', aiNote: 'Needs technique-focused day.', color: '#1A343B', weeklyDist: '8.1km', sessions: 3 },
  { id: 'a3', name: 'Riya Sharma', initials: 'RS', specialty: 'Backstroke', fatigue: 78, attendance: '92%', lastPace: '1:28/100m', aiNote: 'Overloaded. Recovery suggested.', color: '#98C0C8', weeklyDist: '11.5km', sessions: 4 },
  { id: 'a4', name: 'Kabir Singh', initials: 'KS', specialty: 'IM', fatigue: 35, attendance: '90%', lastPace: '1:18/100m', aiNote: 'Strong consistency. Push endurance.', color: '#2A324E', weeklyDist: '12.8km', sessions: 4 },
];

// ── Navigation ──────────────────────────────────────────────
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  currentScreen = id;
}

const SCREEN_MAP = { home: 'scrHome', train: 'scrTrain', community: 'scrCommunity', coach: 'scrCoach', profile: 'scrProfile' };

function navTo(tab) {
  const scrId = SCREEN_MAP[tab];
  if (!scrId) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const scrEl = document.getElementById(scrId);
  if (scrEl) scrEl.classList.add('active');
  currentScreen = scrId;
  document.querySelectorAll('#swimmerNav .nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === tab);
  });
  // Ensure swimmer nav is visible
  document.getElementById('swimmerNav').style.display = '';
  if (tab === 'community') { renderCommunity(); }
  if (tab === 'coach') { renderRadarChart(); }
  if (tab === 'train') { renderDrills(); }
  if (tab === 'home') { updateHomeWorkoutCard(); }
  // Save current tab
  try { localStorage.setItem('swym_tab', tab); } catch(e) {}
}

// ── Auth ────────────────────────────────────────────────────
function doLogin() {
  const u = document.getElementById('inputUser').value.trim().toLowerCase();
  const p = document.getElementById('inputPass').value.trim();
  const err = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');
  const btnText = document.getElementById('loginBtnText');
  const arrow = document.getElementById('loginArrow');

  // Show loading
  btn.disabled = true;
  btnText.textContent = 'Signing In...';
  arrow.style.display = 'none';

  setTimeout(() => {
    if (u === 'swimmer' && p === '000') {
      err.textContent = '';
      currentRole = 'swimmer';
      enterSwimmerApp();
    } else if (u === 'coach' && p === '000') {
      err.textContent = '';
      currentRole = 'coach';
      goTo('scrCoachRole');
    } else {
      err.textContent = 'Incorrect username or password';
      document.getElementById('inputUser').classList.add('error');
      document.getElementById('inputPass').classList.add('error');
      setTimeout(() => {
        document.getElementById('inputUser').classList.remove('error');
        document.getElementById('inputPass').classList.remove('error');
      }, 500);
    }
    btn.disabled = false;
    btnText.textContent = 'Sign In';
    arrow.style.display = '';
  }, 1000);
}

function doSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPass').value;
  const err = document.getElementById('signupError');
  if (!name || !email || !pass) { err.textContent = 'Please fill in all fields.'; return; }
  err.textContent = '';
  const activeRole = document.querySelector('.role-btn.active');
  currentRole = activeRole ? activeRole.dataset.role : 'swimmer';
  if (currentRole === 'coach') { goTo('scrCoachRole'); } else { enterSwimmerApp(); }
}

function pickSignupRole(r) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.role-btn[data-role="' + r + '"]').classList.add('active');
}

function enterSwimmerApp() {
  viewMode = 'swimmer';
  try { localStorage.setItem('swym_session', JSON.stringify({ role: currentRole, mode: 'swimmer' })); } catch(e) {}
  document.getElementById('swimmerNav').style.display = '';
  document.getElementById('coachBottomNav').style.display = 'none';
  // Show mode toggle only if user is a coach
  const modeToggle = document.getElementById('swimmerModeToggle');
  if (modeToggle) modeToggle.style.display = currentRole === 'coach' ? '' : 'none';
  navTo('home');
  initSwimmerScreens();
}

function enterCoachApp() {
  viewMode = 'coach';
  try { localStorage.setItem('swym_session', JSON.stringify({ role: currentRole, mode: 'coach' })); } catch(e) {}
  document.getElementById('swimmerNav').style.display = 'none';
  document.getElementById('coachBottomNav').style.display = '';
  goTo('scrCoachDash');
  renderCoachDashboard('coachHome');
}

function doLogout() {
  hideLogoutModal();
  try { localStorage.removeItem('swym_session'); localStorage.removeItem('swym_tab'); } catch(e) {}
  document.getElementById('swimmerNav').style.display = 'none';
  document.getElementById('coachBottomNav').style.display = 'none';
  document.getElementById('inputUser').value = '';
  document.getElementById('inputPass').value = '';
  document.getElementById('loginError').textContent = '';
  currentRole = null;
  todaySet = null;
  goTo('scrWelcome');
}

function showLogoutModal() {
  var m = document.getElementById('logoutModal');
  m.classList.add('active');
  m.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function hideLogoutModal() { document.getElementById('logoutModal').classList.remove('active'); }

// ── Device Pairing ──────────────────────────────────────────
function pairDevice() {
  const modal = document.getElementById('pairingModal');
  modal.classList.add('active');

  setTimeout(() => {
    modal.classList.remove('active');
    const dot = document.getElementById('ringDot');
    const label = document.getElementById('ringLabel');
    const btn = document.getElementById('btnPair');
    dot.style.background = '#34d399';
    dot.classList.remove('pulse-dot');
    label.textContent = 'Ring Connected';
    btn.classList.add('connected');
    btn.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="4,8 7,11 12,5"/></svg> Device Connected';
    btn.disabled = true;
  }, 1500);
}

// ── Train / Drills ──────────────────────────────────────────
function renderDrills() {
  const el = document.getElementById('drillsList');
  if (!el) return;
  let totalDist = 0;
  let totalTime = 0;

  el.innerHTML = drills.map((d, i) => {
    totalDist += d.distance * d.reps;
    const pace = d.paceMin * 60 + d.paceSec;
    totalTime += ((d.distance / 100) * pace * d.reps) + (d.rest * d.reps);
    const dt = DRILL_TYPES.find(t => t.value === d.type);
    const icon = DRILL_ICONS[d.type] || DRILL_ICONS.main;
    const isExpanded = expandedDrill === d.id;

    return `<div class="drill-card">
      <div style="display:flex;align-items:center;gap:12px;padding:16px">
        <button onclick="toggleDrillExpand('${d.id}')" style="flex:1;display:flex;align-items:center;gap:12px;background:none;border:none;text-align:left">
          <div style="display:flex;align-items:center;gap:4px;color:rgba(6,25,34,0.1)">
            <span style="font-size:10px;width:16px">${i + 1}</span>
          </div>
          <div style="width:36px;height:36px;border-radius:12px;background:rgba(97,148,155,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0">${icon}</div>
          <div style="flex:1">
            <div style="font-size:14px;color:#061922">${dt ? dt.label : d.type}</div>
            <div style="font-size:10px;color:rgba(6,25,34,0.25);margin-top:2px">${d.reps > 1 ? d.reps + ' × ' : ''}${d.distance}m ${d.stroke} · ${d.paceMin}:${String(d.paceSec).padStart(2, '0')}/100m</div>
          </div>
          <svg width="14" height="14" fill="none" stroke="rgba(6,25,34,0.15)" stroke-width="1.5" style="transition:transform 0.2s;${isExpanded ? 'transform:rotate(180deg)' : ''}"><polyline points="4,5 8,9 12,5"/></svg>
        </button>
        <button onclick="removeDrill('${d.id}')" style="padding:8px;color:rgba(97,148,155,0.3);background:none;border:none">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3,5 5,5 13,5"/><path d="M5 5V3a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M4 5l1 9h6l1-9"/></svg>
        </button>
      </div>
      <div class="drill-body ${isExpanded ? 'open' : ''}" id="drillBody_${d.id}">
        <div style="margin-bottom:16px">
          <div style="font-size:9px;color:rgba(6,25,34,0.2);letter-spacing:0.15em;margin-bottom:8px">STROKE</div>
          <div class="chips">${STROKES.map(s => `<button class="chip ${s === d.stroke ? 'chip-dark' : 'chip-off'}" onclick="setDrillProp('${d.id}','stroke','${s}')">${s}</button>`).join('')}</div>
        </div>
        <div style="margin-bottom:16px">
          <div style="font-size:9px;color:rgba(6,25,34,0.2);letter-spacing:0.15em;margin-bottom:8px">DISTANCE</div>
          <div class="chips">${DISTANCES.map(dist => `<button class="chip ${dist === d.distance ? 'chip-steel' : 'chip-off'}" onclick="setDrillProp('${d.id}','distance',${dist})">${dist}m</button>`).join('')}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
          <div>
            <div style="font-size:9px;color:rgba(6,25,34,0.2);letter-spacing:0.15em;margin-bottom:8px">REPS</div>
            <div class="stepper"><button class="step-btn" onclick="adjDrill('${d.id}','reps',-1)"><svg width="12" height="12" fill="none" stroke="rgba(6,25,34,0.25)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val">${d.reps}</span><button class="step-btn" onclick="adjDrill('${d.id}','reps',1)"><svg width="12" height="12" fill="none" stroke="rgba(6,25,34,0.25)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div>
          </div>
          <div>
            <div style="font-size:9px;color:rgba(6,25,34,0.2);letter-spacing:0.15em;margin-bottom:8px">PACE /100m</div>
            <div class="stepper"><button class="step-btn" onclick="adjDrillPace('${d.id}',-5)"><svg width="12" height="12" fill="none" stroke="rgba(6,25,34,0.25)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val" style="font-size:14px">${d.paceMin}:${String(d.paceSec).padStart(2, '0')}</span><button class="step-btn" onclick="adjDrillPace('${d.id}',5)"><svg width="12" height="12" fill="none" stroke="rgba(6,25,34,0.25)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div>
          </div>
          <div>
            <div style="font-size:9px;color:rgba(6,25,34,0.2);letter-spacing:0.15em;margin-bottom:8px">REST (s)</div>
            <div class="stepper"><button class="step-btn" onclick="adjDrill('${d.id}','rest',-5)"><svg width="12" height="12" fill="none" stroke="rgba(6,25,34,0.25)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val">${d.rest}</span><button class="step-btn" onclick="adjDrill('${d.id}','rest',5)"><svg width="12" height="12" fill="none" stroke="rgba(6,25,34,0.25)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  const totalMin = Math.floor(totalTime / 60);
  document.getElementById('trainTotal').textContent = totalDist >= 1000 ? (totalDist / 1000).toFixed(1) + 'km' : totalDist + 'm';
  document.getElementById('trainTime').textContent = totalMin + ' min';
  document.getElementById('trainCount').textContent = drills.length;
  const cl = document.getElementById('drillCountLabel');
  if (cl) cl.textContent = drills.length + ' drill' + (drills.length !== 1 ? 's' : '');
  renderDrillPicker();
}

function toggleDrillExpand(id) {
  expandedDrill = expandedDrill === id ? null : id;
  renderDrills();
}
function setDrillProp(id, prop, val) {
  const d = drills.find(x => x.id === id);
  if (d) { d[prop] = val; renderDrills(); }
}
function adjDrill(id, key, delta) {
  const d = drills.find(x => x.id === id);
  if (!d) return;
  if (key === 'distance') d.distance = Math.max(25, d.distance + delta);
  if (key === 'reps') d.reps = Math.max(1, d.reps + delta);
  if (key === 'rest') d.rest = Math.max(0, d.rest + delta);
  renderDrills();
}
function adjDrillPace(id, delta) {
  const d = drills.find(x => x.id === id);
  if (!d) return;
  let t = d.paceMin * 60 + d.paceSec + delta;
  if (t < 30) t = 30;
  if (t > 300) t = 300;
  d.paceMin = Math.floor(t / 60);
  d.paceSec = t % 60;
  renderDrills();
}
function removeDrill(id) {
  drills = drills.filter(d => d.id !== id);
  if (!drills.length) drills.push({ id: Date.now().toString(), type: 'warmup', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 45, rest: 15, reps: 1 });
  if (expandedDrill === id) expandedDrill = null;
  renderDrills();
}

function renderDrillPicker() {
  const g = document.getElementById('drillTypeGrid');
  if (!g) return;
  g.innerHTML = DRILL_TYPES.map(t => `<button class="dp-btn" onclick="addDrill('${t.value}')">
    ${DRILL_ICONS[t.value] || ''}<span style="font-size:12px;color:rgba(6,25,34,0.6)">${t.label}</span></button>`).join('');
}
function addDrill(type) {
  const newId = Date.now().toString();
  drills.push({ id: newId, type, stroke: 'Freestyle', distance: 100, paceMin: 1, paceSec: 30, rest: 15, reps: 1 });
  expandedDrill = newId;
  hideDrillPicker();
  renderDrills();
}
function showDrillPicker() {
  document.getElementById('btnAddDrill').style.display = 'none';
  document.getElementById('drillPickerPanel').style.display = '';
}
function hideDrillPicker() {
  document.getElementById('drillPickerPanel').style.display = 'none';
  document.getElementById('btnAddDrill').style.display = '';
}

function handleSaveSet() {
  const name = document.getElementById('inputSetName').value || 'Custom Set';
  todaySet = { name, drills: [...drills], startHour: selectedHour, startMinute: selectedMin, date: new Date().toISOString().split('T')[0] };
  updateHomeWorkoutCard();
  navTo('home');
}

let coachSetAthlete = null;

function coachCreateSet(athleteName) {
  coachSetAthlete = athleteName;
  const modal = document.getElementById('coachSetModal');
  document.getElementById('coachSetModalTitle').textContent = 'Set for ' + athleteName;
  // Reset modal drills
  coachModalDrills = [{ id: Date.now().toString(), type: 'warmup', stroke: 'Freestyle', distance: 400, pace: '1:45', rest: 15, reps: 1 }];
  renderCoachModalDrills();
  modal.style.display = 'flex';
}

let coachModalDrills = [];

function renderCoachModalDrills() {
  const list = document.getElementById('coachSetDrillsList');
  const totalDist = coachModalDrills.reduce((s, d) => s + d.distance * d.reps, 0);
  const STROKES_LIST = ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'IM', 'Choice'];
  const DIST_LIST = [25, 50, 75, 100, 150, 200, 300, 400, 500, 800];
  const TYPE_COLORS = { warmup: '#d4ecf1', main: '#d4ecf1', sprint: '#d4ecf1', drill: '#d4ecf1', cooldown: '#d4ecf1', kick: '#d4ecf1' };
  const TYPE_LABELS = { warmup: 'Warmup', main: 'Main Set', sprint: 'Sprint', drill: 'Technique', cooldown: 'Cooldown', kick: 'Kick Set' };

  document.getElementById('coachSetTotalDist').textContent = totalDist >= 1000 ? (totalDist / 1000).toFixed(1) + ' km' : totalDist + ' m';
  document.getElementById('coachSetDrillCount').textContent = coachModalDrills.length + ' drill' + (coachModalDrills.length > 1 ? 's' : '');

  list.innerHTML = coachModalDrills.map((d, i) => `
    <div style="background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);border-radius:14px;padding:14px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:20px;height:20px;border-radius:6px;background:#334F6B;display:flex;align-items:center;justify-content:center;font-size:9px;color:white;font-weight:700">${i + 1}</span>
          <span style="font-size:12px;color:#111033;font-weight:500">${TYPE_LABELS[d.type] || d.type}</span>
        </div>
        <button onclick="coachModalRemoveDrill('${d.id}')" style="background:none;border:none;color:rgba(17,16,51,.2);cursor:pointer;font-size:14px">✕</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
        ${STROKES_LIST.map(s => `<button onclick="coachModalSetProp('${d.id}','stroke','${s}')" style="padding:4px 10px;border-radius:8px;font-size:10px;border:1px solid ${d.stroke === s ? '#334F6B' : 'rgba(17,16,51,.1)'};background:${d.stroke === s ? 'rgba(51,79,107,.15)' : 'rgba(17,16,51,.03)'};color:${d.stroke === s ? '#334F6B' : 'rgba(17,16,51,.4)'};cursor:pointer">${s}</button>`).join('')}
      </div>
      <div style="display:flex;gap:8px">
        <div style="flex:1">
          <div style="font-size:9px;color:rgba(17,16,51,.35);margin-bottom:4px">DISTANCE</div>
          <select onchange="coachModalSetProp('${d.id}','distance',+this.value)" style="width:100%;padding:6px 8px;border-radius:8px;background:white;border:1px solid rgba(17,16,51,.1);color:#111033;font-size:12px;outline:none">
            ${DIST_LIST.map(v => `<option value="${v}" ${d.distance === v ? 'selected' : ''}>${v}m</option>`).join('')}
          </select>
        </div>
        <div style="flex:1">
          <div style="font-size:9px;color:rgba(17,16,51,.35);margin-bottom:4px">REPS</div>
          <div style="display:flex;align-items:center;gap:4px">
            <button onclick="coachModalAdj('${d.id}','reps',-1)" style="width:26px;height:26px;border-radius:8px;background:white;border:1px solid rgba(17,16,51,.1);color:#111033;cursor:pointer;font-size:13px">−</button>
            <span style="flex:1;text-align:center;font-size:13px;color:#111033;font-family:var(--font-head)">${d.reps}</span>
            <button onclick="coachModalAdj('${d.id}','reps',1)" style="width:26px;height:26px;border-radius:8px;background:white;border:1px solid rgba(17,16,51,.1);color:#111033;cursor:pointer;font-size:13px">+</button>
          </div>
        </div>
        <div style="flex:1">
          <div style="font-size:9px;color:rgba(17,16,51,.35);margin-bottom:4px">REST (s)</div>
          <div style="display:flex;align-items:center;gap:4px">
            <button onclick="coachModalAdj('${d.id}','rest',-5)" style="width:26px;height:26px;border-radius:8px;background:white;border:1px solid rgba(17,16,51,.1);color:#111033;cursor:pointer;font-size:13px">−</button>
            <span style="flex:1;text-align:center;font-size:13px;color:#111033;font-family:var(--font-head)">${d.rest}</span>
            <button onclick="coachModalAdj('${d.id}','rest',5)" style="width:26px;height:26px;border-radius:8px;background:white;border:1px solid rgba(17,16,51,.1);color:#111033;cursor:pointer;font-size:13px">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function coachModalSetProp(id, prop, val) {
  const d = coachModalDrills.find(d => d.id === id);
  if (d) { d[prop] = val; renderCoachModalDrills(); }
}

function coachModalAdj(id, key, delta) {
  const d = coachModalDrills.find(d => d.id === id);
  if (!d) return;
  if (key === 'reps') d.reps = Math.max(1, Math.min(20, d.reps + delta));
  if (key === 'rest') d.rest = Math.max(0, Math.min(120, d.rest + delta));
  renderCoachModalDrills();
}

function coachModalRemoveDrill(id) {
  coachModalDrills = coachModalDrills.filter(d => d.id !== id);
  if (!coachModalDrills.length) coachModalDrills.push({ id: Date.now().toString(), type: 'warmup', stroke: 'Freestyle', distance: 400, pace: '1:45', rest: 15, reps: 1 });
  renderCoachModalDrills();
}

function coachModalAddDrill(type) {
  coachModalDrills.push({ id: Date.now().toString(), type, stroke: 'Freestyle', distance: 100, pace: '1:30', rest: 15, reps: 1 });
  renderCoachModalDrills();
  // Scroll to bottom
  const list = document.getElementById('coachSetDrillsList');
  list.scrollTop = list.scrollHeight;
}

function coachModalSaveSet() {
  const name = coachSetAthlete + ' — Custom Set';
  // Just close the modal for now (in future could save to athlete)
  document.getElementById('coachSetModal').style.display = 'none';
  coachSetAthlete = null;
}

function coachModalClose() {
  document.getElementById('coachSetModal').style.display = 'none';
  coachSetAthlete = null;
}

function updateHomeWorkoutCard() {
  const title = document.getElementById('todaySetTitle');
  const desc = document.getElementById('todaySetDesc');
  const btn = document.getElementById('todaySetBtn');
  const btnLabel = document.getElementById('todaySetBtnLabel');
  const drillsList = document.getElementById('todayDrillsList');

  if (todaySet) {
    title.textContent = todaySet.name;
    const totalDist = todaySet.drills.reduce((s, d) => s + d.distance * d.reps, 0);
    desc.textContent = '';
    drillsList.innerHTML = todaySet.drills.map(d => {
      const dt = DRILL_TYPES.find(t => t.value === d.type);
      return `<div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:rgba(255,255,255,0.05);border-radius:12px;margin-bottom:4px">
        ${DRILL_ICONS[d.type] || ''}
        <span style="font-size:12px;color:rgba(255,255,255,0.6);flex:1">${dt ? dt.label : d.type} — ${d.reps > 1 ? d.reps + '×' : ''}${d.distance}m ${d.stroke}</span>
        <span style="font-size:10px;color:rgba(255,255,255,0.3)">${d.paceMin}:${String(d.paceSec).padStart(2, '0')}</span>
      </div>`;
    }).join('');
    drillsList.innerHTML += `<div style="font-size:10px;color:rgba(255,255,255,0.2);margin-top:8px;margin-bottom:16px">${todaySet.drills.length} drills · ${totalDist >= 1000 ? (totalDist / 1000).toFixed(1) + 'km' : totalDist + 'm'} total</div>`;
    btn.onclick = () => showSetOverview();
    btnLabel.textContent = 'Pair Device to Start Workout';
  } else {
    title.textContent = 'No set planned yet';
    desc.textContent = 'Head to the Set Planner to build today\'s session, or choose from an AI-suggested workout below.';
    drillsList.innerHTML = '';
    btn.onclick = () => navTo('train');
    btnLabel.textContent = 'Plan Today\'s Set';
  }
}

function loadSuggestedWorkout(type) {
  const templates = {
    recovery: { name: 'Recovery Swim', drills: [
      { id: Date.now()+'1', type: 'warmup', stroke: 'Freestyle', distance: 200, paceMin: 2, paceSec: 0, rest: 15, reps: 1 },
      { id: Date.now()+'2', type: 'main', stroke: 'Freestyle', distance: 100, paceMin: 1, paceSec: 50, rest: 20, reps: 4 },
      { id: Date.now()+'3', type: 'cooldown', stroke: 'Backstroke', distance: 200, paceMin: 2, paceSec: 10, rest: 0, reps: 1 },
    ]},
    sprint: { name: 'Sprint Power', drills: [
      { id: Date.now()+'1', type: 'warmup', stroke: 'Freestyle', distance: 300, paceMin: 1, paceSec: 45, rest: 15, reps: 1 },
      { id: Date.now()+'2', type: 'drill', stroke: 'Freestyle', distance: 50, paceMin: 1, paceSec: 10, rest: 30, reps: 6 },
      { id: Date.now()+'3', type: 'sprint', stroke: 'Freestyle', distance: 25, paceMin: 0, paceSec: 35, rest: 45, reps: 8 },
      { id: Date.now()+'4', type: 'cooldown', stroke: 'Freestyle', distance: 100, paceMin: 2, paceSec: 0, rest: 0, reps: 1 },
    ]},
    endurance: { name: 'Endurance Builder', drills: [
      { id: Date.now()+'1', type: 'warmup', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 50, rest: 20, reps: 1 },
      { id: Date.now()+'2', type: 'main', stroke: 'Freestyle', distance: 800, paceMin: 1, paceSec: 30, rest: 30, reps: 3 },
      { id: Date.now()+'3', type: 'drill', stroke: 'Freestyle', distance: 200, paceMin: 1, paceSec: 45, rest: 15, reps: 4 },
      { id: Date.now()+'4', type: 'cooldown', stroke: 'Freestyle', distance: 200, paceMin: 2, paceSec: 0, rest: 0, reps: 1 },
    ]},
  };
  const tmpl = templates[type];
  if (tmpl) {
    document.getElementById('inputSetName').value = tmpl.name;
    drills = tmpl.drills;
    renderDrills();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ── Date Navigation ─────────────────────────────────────────
let dateOffset = 0;
function navigateDate(dir) {
  if (dir > 0 && dateOffset >= 0) return;
  dateOffset += dir;
  const label = document.getElementById('dateLabel');
  const nextBtn = document.getElementById('btnDateNext');
  if (dateOffset === 0) { label.textContent = 'Today'; nextBtn.classList.add('dis'); }
  else if (dateOffset === -1) { label.textContent = 'Yesterday'; nextBtn.classList.remove('dis'); }
  else {
    const d = new Date(); d.setDate(d.getDate() + dateOffset);
    label.textContent = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    nextBtn.classList.remove('dis');
  }
}

// ── Ghost Racer ─────────────────────────────────────────────
function toggleGhostPicker() {
  const picker = document.getElementById('ghostPicker');
  if (picker.style.display === 'none') {
    picker.style.display = '';
    picker.innerHTML = `
      <div style="font-size:9px;color:rgba(6,25,34,0.2);letter-spacing:0.15em;margin-bottom:8px">SELECT FROM FRIENDS</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        ${FRIENDS.map(f => `<button onclick="selectGhost('friend','${f.id}')" style="width:100%;display:flex;align-items:center;gap:12px;padding:8px 12px;background:rgba(203,198,179,0.6);border-radius:12px;border:none;text-align:left">
          <div style="width:32px;height:32px;border-radius:50%;background:${f.color};display:flex;align-items:center;justify-content:center;color:${f.color === '#87ACAA' ? '#061922' : 'white'};font-size:10px;font-family:var(--font-head);flex-shrink:0">${f.initials}</div>
          <div><div style="font-size:12px;color:#061922">${f.name}</div><div style="font-size:9px;color:rgba(6,25,34,0.2)">${f.weeklyDistance}km this week</div></div>
        </button>`).join('')}
      </div>
      <div style="font-size:9px;color:rgba(6,25,34,0.2);letter-spacing:0.15em;margin-bottom:8px">SELECT FROM LEGENDS</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
        ${LEGENDS.map(l => `<button onclick="selectGhost('legend','${l.id}')" style="width:100%;display:flex;align-items:center;gap:12px;padding:8px 12px;background:rgba(6,25,34,0.05);border-radius:12px;border:none;text-align:left">
          <div style="width:32px;height:32px;border-radius:50%;background:#061922;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-family:var(--font-head);flex-shrink:0">${l.name.split(' ').map(n => n[0]).join('')}</div>
          <div><div style="font-size:12px;color:#061922">${l.name}</div><div style="font-size:9px;color:#61949B">${l.badge}</div></div>
        </button>`).join('')}
      </div>
      <button onclick="document.getElementById('ghostPicker').style.display='none'" style="width:100%;text-align:center;font-size:10px;color:rgba(6,25,34,0.2);background:none;border:none">Cancel</button>
    `;
  } else {
    picker.style.display = 'none';
  }
}
function selectGhost(type, id) {
  selectedGhost = { type, id };
  document.getElementById('ghostPicker').style.display = 'none';
  document.getElementById('ghostRemoveBtn').style.display = '';
  const display = document.getElementById('ghostDisplay');
  let name, initials, color, badge;
  if (type === 'friend') {
    const f = FRIENDS.find(x => x.id === id);
    name = f.name; initials = f.initials; color = f.color; badge = 'Friend';
  } else {
    const l = LEGENDS.find(x => x.id === id);
    name = l.name; initials = l.name.split(' ').map(n => n[0]).join(''); color = '#061922'; badge = l.badge;
  }
  display.innerHTML = `<div class="ghost-selected">
    <div style="width:36px;height:36px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;color:${color === '#87ACAA' ? '#061922' : 'white'};font-size:11px;font-family:var(--font-head);flex-shrink:0">${initials}</div>
    <div style="flex:1"><div style="font-size:14px;color:#061922">${name}</div><div style="font-size:10px;color:#61949B">${badge}</div></div>
  </div>`;
}
function removeGhost() {
  selectedGhost = null;
  document.getElementById('ghostRemoveBtn').style.display = 'none';
  document.getElementById('ghostDisplay').innerHTML = `<button class="ghost-empty" onclick="toggleGhostPicker()">
    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 14v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1"/><circle cx="7" cy="5" r="3"/></svg>
    Add Ghost Racer
  </button>`;
}

// ── Community ───────────────────────────────────────────────
function renderCommunity() { renderLeaderboard(); renderLegends(); }

function renderLeaderboard() {
  const el = document.getElementById('leaderboardList');
  if (!el) return;
  const you = { name: 'Sonia Kumar', initials: 'SK', color: '#61949B', weeklyDistance: 12.4 };
  const all = [you, ...FRIENDS.filter(f => f.id !== 'f1')].sort((a, b) => b.weeklyDistance - a.weeklyDistance);
  el.innerHTML = all.map((f, i) => {
    const isFirst = i === 0;
    return `<div class="comm-rank-card ${isFirst ? 'top' : ''}">
      <div class="comm-rank-num ${isFirst ? 'gold' : 'normal'}">${i + 1}</div>
      <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-family:var(--font-head);background:${f.color};color:${f.color === '#87ACAA' ? '#061922' : 'white'}">${f.initials}</div>
      <div style="flex:1"><div style="font-size:14px;color:white">${f.name}</div><div style="font-size:10px;color:rgba(255,255,255,0.25)">${f.weeklyDistance}km this week</div></div>
      <button class="comm-race-btn">Race</button>
    </div>`;
  }).join('');
}

function renderFeed() {
  const el = document.getElementById('feedList');
  if (!el) return;
  el.innerHTML = FRIENDS.map((f, i) => {
    const liked = feedLikes[i];
    const lc = liked ? 6 : 5;
    return `<div class="feed-card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${f.color};color:${f.color === '#87ACAA' ? '#061922' : 'white'}">${f.initials}</div>
        <div style="flex:1"><div style="font-size:14px;color:var(--dark)">${f.name}</div><div style="font-size:10px;color:rgba(17,16,51,.25)">${f.lastActivity.time}</div></div>
      </div>
      <p style="font-size:14px;color:rgba(17,16,51,.6);line-height:1.5">${f.name.split(' ')[0]} ${f.lastActivity.action} <span style="color:var(--accent);font-weight:500">${f.lastActivity.detail}</span></p>
      <div class="feed-actions">
        <button class="feed-btn ${liked ? 'liked' : ''}" onclick="feedLikes[${i}]=!feedLikes[${i}];renderFeed()">
          <svg width="16" height="16" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 018 4.5 3.5 3.5 0 0113.5 7C13.5 10.5 8 14 8 14z"/></svg> ${lc}
        </button>
        <button class="feed-btn"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 5a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2H7l-3 2V11a2 2 0 01-1-2V5z"/></svg> Comment</button>
      </div>
    </div>`;
  }).join('');
}

function renderLegends() {
  const el = document.getElementById('legendsList');
  if (!el) return;
  el.innerHTML = LEGENDS.map(l => {
    return `<div class="legend-card" style="margin-bottom:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <div style="font-family:var(--font-head);font-size:18px;color:white">${l.name}</div>
        <div style="background:rgba(246,170,56,0.15);padding:4px 12px;border-radius:9999px"><span style="font-size:10px;color:#F6AA38">${l.badge}</span></div>
      </div>
      <div style="font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:12px">${l.specialty}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.25);margin-bottom:16px">Pace: <span style="color:rgba(255,255,255,0.5)">${l.pace}</span> &nbsp;&nbsp; ${l.sets.length} signature set${l.sets.length > 1 ? 's' : ''}</div>
      <button onclick="viewLegendSets('${l.id}')" class="legend-view-btn">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h12M2 7h8M2 11h10"/></svg> View Sets
      </button>
    </div>`;
  }).join('');
}

function renderFriends() {
  const el = document.getElementById('friendsList');
  if (!el) return;
  el.innerHTML = FRIENDS.map(f => {
    return `<div class="comm-rank-card" style="margin-bottom:10px">
      <div style="width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${f.color};color:${f.color === '#87ACAA' ? '#061922' : 'white'}">${f.initials}</div>
      <div style="flex:1">
        <div style="font-size:14px;color:white">${f.name}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:2px">${f.lastActivity.action} <span style="color:#98C0C8">${f.lastActivity.detail}</span></div>
        <div style="font-size:10px;color:rgba(255,255,255,0.15);margin-top:4px">${f.lastActivity.time}</div>
      </div>
      <button class="comm-race-btn">Race</button>
    </div>`;
  }).join('');
}

function setLbTab(btn, tab) {
  document.querySelectorAll('#lbTabs .comm-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const lbPanel = document.getElementById('tabLeaderboard');
  const frPanel = document.getElementById('tabFriends');
  if (tab === 'friends') {
    if (lbPanel) lbPanel.style.display = 'none';
    if (frPanel) frPanel.style.display = 'block';
    renderFriends();
  } else {
    if (lbPanel) lbPanel.style.display = 'block';
    if (frPanel) frPanel.style.display = 'none';
    renderLeaderboard();
  }
}

// ── Set Overview ────────────────────────────────────────────
function showSetOverview() {
  if (!todaySet) return;
  document.getElementById('overviewSetName').textContent = todaySet.name;
  const totalDist = todaySet.drills.reduce((s, d) => s + d.distance * d.reps, 0);
  const content = document.getElementById('overviewContent');
  content.innerHTML = `
    <div class="g3">
      <div class="card-white" style="padding:16px;text-align:center"><div style="font-family:var(--font-head);font-size:24px;color:var(--dark)">${totalDist >= 1000 ? (totalDist / 1000).toFixed(1) : totalDist}</div><div style="font-size:9px;color:rgba(17,16,51,0.3);margin-top:2px">${totalDist >= 1000 ? 'km' : 'm'}</div></div>
      <div class="card-white" style="padding:16px;text-align:center"><div style="font-family:var(--font-head);font-size:24px;color:var(--dark)">${todaySet.drills.length}</div><div style="font-size:9px;color:rgba(17,16,51,0.3);margin-top:2px">drills</div></div>
      <div class="card-white" style="padding:16px;text-align:center"><div style="font-family:var(--font-head);font-size:24px;color:var(--dark)">${todaySet.drills.reduce((s, d) => s + d.reps, 0)}</div><div style="font-size:9px;color:rgba(17,16,51,0.3);margin-top:2px">total reps</div></div>
    </div>
    <div class="card-white" style="padding:20px">
      <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:12px">DRILL BREAKDOWN</div>
      ${todaySet.drills.map((d, i) => {
        const dt = DRILL_TYPES.find(t => t.value === d.type);
        return `<div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(212,236,241,0.6);border-radius:16px;margin-bottom:8px">
          <span style="font-size:10px;color:rgba(17,16,51,0.15);width:16px">${i + 1}</span>
          ${DRILL_ICONS[d.type] || ''}
          <span style="font-size:12px;color:rgba(17,16,51,0.6);flex:1">${dt ? dt.label : d.type} — ${d.reps > 1 ? d.reps + '×' : ''}${d.distance}m ${d.stroke}</span>
          <span style="font-size:10px;color:rgba(17,16,51,0.3)">${d.paceMin}:${String(d.paceSec).padStart(2, '0')}</span>
        </div>`;
      }).join('')}
    </div>
    ${selectedGhost ? `<div class="card-white" style="padding:20px">
      <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:8px">GHOST RACER</div>
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;border-radius:50%;background:#061922;display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-family:var(--font-head)">GR</div>
        <div><div style="font-size:14px;color:var(--dark)">Ghost racer selected</div><div style="font-size:11px;color:rgba(17,16,51,0.3);margin-top:2px">Will pace alongside you</div></div>
      </div>
    </div>` : ''}
    <button onclick="editSetFromOverview()" style="width:100%;padding:14px;border-radius:16px;background:var(--bg);border:none;color:rgba(17,16,51,0.5);font-size:14px;letter-spacing:0.05em">Edit Set</button>
    <button class="btn-accent-full" onclick="alert('Sending set to SWYM Ring...')">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 9l4-4 2 2 4-4M8 3h3v3"/></svg>
      Pair Device & Start
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h8m-3-3 3 3-3 3"/></svg>
    </button>
  `;
  document.getElementById('swimmerNav').style.display = 'none';
  goTo('scrSetOverview');
}
function hideSetOverview() { document.getElementById('swimmerNav').style.display = ''; navTo('home'); }
function editSetFromOverview() { document.getElementById('swimmerNav').style.display = ''; navTo('train'); }

// ── Workout Review ──────────────────────────────────────────
function showWorkoutReview() {
  const w = MOCK_COMPLETED_WORKOUT;
  document.getElementById('reviewWorkoutName').textContent = w.name;
  const mins = Math.floor(w.totalDuration / 60);
  const formatPace = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const content = document.getElementById('reviewContent');
  content.innerHTML = `
    <div class="g3">
      <div class="review-stat"><div style="font-family:var(--font-head);font-size:24px;color:white">${(w.totalDistance / 1000).toFixed(1)}</div><div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:2px">km</div></div>
      <div class="review-stat"><div style="font-family:var(--font-head);font-size:24px;color:white">${mins}</div><div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:2px">minutes</div></div>
      <div class="review-stat"><div style="font-family:var(--font-head);font-size:24px;color:white">${formatPace(w.avgPace100m)}</div><div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:2px">/100m avg</div></div>
    </div>
    <div class="ai-story">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <div style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center"><svg width="12" height="12" fill="none" stroke="white" stroke-width="1.5"><path d="M6 1v2M6 9v2M1 6h2M9 6h2"/></svg></div>
        <span style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:0.15em">YOUR SWIM STORY</span>
      </div>
      <p style="font-size:14px;color:rgba(255,255,255,0.9);line-height:1.6">${w.aiSummary}</p>
    </div>
    <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:8px;padding:0 4px">SET BREAKDOWN</div>
    ${w.sets.map(s => {
      const dt = DRILL_TYPES.find(t => t.value === s.type);
      const paceVsTarget = s.avgPace100m - s.targetPace;
      const paceColor = paceVsTarget <= 0 ? '#16a34a' : '#ef4444';
      const paceLabel = paceVsTarget <= 0 ? `${Math.abs(paceVsTarget)}s faster` : `${paceVsTarget}s slower`;
      return `<div class="set-review-card" style="margin-bottom:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px">
            ${DRILL_ICONS[s.type] || ''}
            <div><div style="font-size:14px;color:var(--dark)">${dt ? dt.label : s.type}</div><div style="font-size:10px;color:rgba(17,16,51,0.3);margin-top:2px">${s.actualDistance}m ${s.stroke}</div></div>
          </div>
          <span style="font-size:10px;color:${paceColor}">${paceLabel}</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">
          <div style="text-align:center;padding:8px;background:var(--bg);border-radius:12px"><div style="font-family:var(--font-head);font-size:16px;color:var(--dark)">${formatPace(s.avgPace100m)}</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Avg Pace</div></div>
          <div style="text-align:center;padding:8px;background:var(--bg);border-radius:12px"><div style="font-family:var(--font-head);font-size:16px;color:var(--dark)">${formatPace(s.targetPace)}</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Target</div></div>
          <div style="text-align:center;padding:8px;background:var(--bg);border-radius:12px"><div style="font-family:var(--font-head);font-size:16px;color:var(--dark)">${s.laps.length}</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Laps</div></div>
        </div>
        <button onclick="showSetDetail('${s.id}')" style="width:100%;padding:10px;border-radius:12px;background:rgba(51,79,107,0.08);border:none;color:var(--accent);font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px">
          View Lap Details <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 2l5 5-5 5"/></svg>
        </button>
      </div>`;
    }).join('')}
    <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:8px;padding:0 4px">AI INSIGHTS</div>
    <div class="card-accent" style="padding:20px">
      ${w.aiInsights.map(insight => `<div style="display:flex;gap:8px;margin-bottom:12px;align-items:flex-start">
        <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" style="margin-top:2px;flex-shrink:0"><path d="M6.5 1l1.5 3.5L12 6l-4 1.5L6.5 11 5 7.5 1 6l4-1.5Z"/></svg>
        <p style="font-size:13px;color:rgba(255,255,255,0.85);line-height:1.5">${insight}</p>
      </div>`).join('')}
    </div>
  `;
  document.getElementById('swimmerNav').style.display = 'none';
  goTo('scrWorkoutReview');
}
function hideWorkoutReview() { document.getElementById('swimmerNav').style.display = ''; navTo('home'); }

// ── Set Detail ──────────────────────────────────────────────
function showSetDetail(setId) {
  const w = MOCK_COMPLETED_WORKOUT;
  const s = w.sets.find(x => x.id === setId);
  if (!s) return;
  const dt = DRILL_TYPES.find(t => t.value === s.type);
  document.getElementById('setDetailTitle').textContent = (dt ? dt.label : s.type) + ' — ' + s.stroke;
  const formatPace = (sec) => Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  const fastest = s.laps.reduce((m, l) => l.pace100m < m.pace100m ? l : m, s.laps[0]);
  const slowest = s.laps.reduce((m, l) => l.pace100m > m.pace100m ? l : m, s.laps[0]);
  const content = document.getElementById('setDetailContent');

  // SVG Chart
  const chartW = 300, chartH = 120, pad = 20;
  const maxPace = Math.max(...s.laps.map(l => l.pace100m)) + 5;
  const minPace = Math.min(...s.laps.map(l => l.pace100m)) - 5;
  const xStep = (chartW - pad * 2) / (s.laps.length - 1 || 1);
  const yScale = (chartH - pad * 2) / (maxPace - minPace || 1);
  const points = s.laps.map((l, i) => `${pad + i * xStep},${pad + (maxPace - l.pace100m) * yScale}`).join(' ');

  content.innerHTML = `
    <div class="g3">
      <div class="card-white" style="padding:16px;text-align:center"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${formatPace(s.avgPace100m)}</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Avg Pace</div></div>
      <div class="card-white" style="padding:16px;text-align:center"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${s.laps.length}</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Laps</div></div>
      <div class="card-white" style="padding:16px;text-align:center"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${s.actualDistance}m</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Distance</div></div>
    </div>
    <div class="card-white" style="padding:20px">
      <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:12px">PACE CHART</div>
      <div class="chart-area">
        <svg viewBox="0 0 ${chartW} ${chartH}" style="width:100%;height:auto">
          <polyline points="${points}" fill="none" stroke="#334F6B" stroke-width="2" stroke-linejoin="round"/>
          <line x1="${pad}" y1="${pad + (maxPace - s.targetPace) * yScale}" x2="${chartW - pad}" y2="${pad + (maxPace - s.targetPace) * yScale}" stroke="#F6AA38" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>
          ${s.laps.map((l, i) => `<circle cx="${pad + i * xStep}" cy="${pad + (maxPace - l.pace100m) * yScale}" r="3" fill="${l === fastest ? '#16a34a' : l === slowest ? '#ef4444' : '#334F6B'}"/>`).join('')}
        </svg>
        <div style="display:flex;justify-content:space-between;margin-top:8px;padding:0 4px">
          <span style="font-size:9px;color:rgba(17,16,51,0.2)">Lap 1</span>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="display:flex;align-items:center;gap:4px"><div style="width:8px;height:2px;background:#F6AA38;border-radius:1px"></div><span style="font-size:9px;color:rgba(17,16,51,0.3)">Target</span></div>
          </div>
          <span style="font-size:9px;color:rgba(17,16,51,0.2)">Lap ${s.laps.length}</span>
        </div>
      </div>
    </div>
    <div class="g2">
      <div class="card-white" style="padding:16px;border:2px solid rgba(22,163,106,0.2)">
        <div style="font-size:9px;color:#16a34a;letter-spacing:0.1em;margin-bottom:4px">FASTEST LAP</div>
        <div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${formatPace(fastest.pace100m)}</div>
        <div style="font-size:10px;color:rgba(17,16,51,0.3);margin-top:2px">Lap ${fastest.lapNumber}</div>
      </div>
      <div class="card-white" style="padding:16px;border:2px solid rgba(239,68,68,0.2)">
        <div style="font-size:9px;color:#ef4444;letter-spacing:0.1em;margin-bottom:4px">SLOWEST LAP</div>
        <div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${formatPace(slowest.pace100m)}</div>
        <div style="font-size:10px;color:rgba(17,16,51,0.3);margin-top:2px">Lap ${slowest.lapNumber}</div>
      </div>
    </div>
    <div class="card-white" style="padding:20px">
      <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:12px">LAP SPLITS</div>
      ${s.laps.map(l => {
        const cls = l === fastest ? 'lap-fastest' : l === slowest ? 'lap-slowest' : 'lap-normal';
        return `<div class="lap-row ${cls}">
          <span style="font-size:12px;color:rgba(17,16,51,0.4);width:48px">Lap ${l.lapNumber}</span>
          <span style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${formatPace(l.pace100m)}/100m</span>
          <span style="font-size:10px;color:rgba(17,16,51,0.3)">${l.timeSeconds}s</span>
        </div>`;
      }).join('')}
    </div>
  `;
  goTo('scrSetDetail');
}
function hideSetDetail() { goTo('scrWorkoutReview'); }

// ── Legend Sets Viewer ───────────────────────────────────────
function viewLegendSets(legendId) {
  const legend = LEGENDS.find(l => l.id === legendId);
  if (!legend) return;
  document.getElementById('legendViewerName').textContent = legend.name;
  document.getElementById('legendViewerSpecialty').textContent = legend.specialty;
  const badges = document.getElementById('legendViewerBadges');
  badges.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:9999px;background:rgba(246,170,56,0.15);border:1px solid rgba(246,170,56,0.2)">
      <svg width="12" height="12" fill="none" stroke="#F6AA38" stroke-width="1.5"><path d="M6 1.5l1.2 2.8H10l-2.3 1.7.9 2.8L6 7.1 3.4 8.8l.9-2.8L2 4.3h2.8Z"/></svg>
      <span style="font-size:11px;color:#F6AA38">${legend.badge}</span>
    </div>
    <div style="display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:9999px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)">
      <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1.5"/></svg>
      <span style="font-size:11px;color:rgba(255,255,255,0.5)">Avg Pace ${legend.pace}</span>
    </div>`;
  const content = document.getElementById('legendSetsContent');
  content.innerHTML = legend.sets.map((set, si) => {
    const totalDist = set.drills.reduce((s, d) => s + d.distance * d.reps, 0);
    const estMin = Math.round(set.drills.reduce((s, d) => s + (d.paceMin * 60 + d.paceSec) * d.reps * d.distance / 100 / 60 + d.rest * d.reps / 60, 0));
    const timeStr = set.startHour !== undefined ? (set.startHour > 12 ? set.startHour - 12 : set.startHour) + ':' + String(set.startMinute || 0).padStart(2, '0') + ' ' + (set.startPeriod || (set.startHour < 12 ? 'AM' : 'PM')) : '';
    return `<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div style="font-size:10px;letter-spacing:.15em;color:rgba(255,255,255,0.2)">SIGNATURE SET ${si + 1}</div>
        ${timeStr ? `<div style="display:flex;align-items:center;gap:4px"><svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"><circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1.5"/></svg><span style="font-size:10px;color:rgba(255,255,255,0.2)">${timeStr}</span></div>` : ''}
      </div>
      <div style="font-family:var(--font-head);font-size:20px;color:white;margin-bottom:12px">${set.name}</div>
      <div style="display:flex;gap:8px;margin-bottom:20px">
        <span style="padding:5px 12px;border-radius:9999px;background:rgba(152,192,200,0.1);border:1px solid rgba(152,192,200,0.15);font-size:11px;color:#98C0C8">${totalDist >= 1000 ? (totalDist / 1000).toFixed(1) + ' km' : totalDist + ' m'}</span>
        <span style="padding:5px 12px;border-radius:9999px;background:rgba(152,192,200,0.1);border:1px solid rgba(152,192,200,0.15);font-size:11px;color:#98C0C8">${estMin} min</span>
        <span style="padding:5px 12px;border-radius:9999px;background:rgba(152,192,200,0.1);border:1px solid rgba(152,192,200,0.15);font-size:11px;color:#98C0C8">${set.drills.length} drills</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:20px">
        ${set.drills.map((d, i) => {
          const dt = DRILL_TYPES.find(t => t.value === d.type);
          const typeColors = { warmup: '#98C0C8', main: '#61949B', sprint: '#F6AA38', cooldown: '#87ACAA' };
          const tc = typeColors[d.type] || 'rgba(255,255,255,0.5)';
          return `<div style="display:flex;align-items:center;padding:10px 14px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.04)">
            <span style="width:20px;font-size:11px;color:rgba(255,255,255,0.15)">${i + 1}</span>
            <span style="width:80px;font-size:12px;color:${tc}">${dt ? dt.label : d.type}</span>
            <span style="flex:1;font-size:12px;color:rgba(255,255,255,0.7)">${d.reps > 1 ? d.reps + '×' : ''}${d.distance}m ${d.stroke}</span>
            <span style="font-size:12px;color:rgba(255,255,255,0.25)">${d.paceMin}:${String(d.paceSec).padStart(2, '0')}</span>
          </div>`;
        }).join('')}
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="copyLegendSet('${legend.id}','${set.name}')" style="flex:1;padding:14px;border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="8" height="8" rx="1.5"/><path d="M4 8H3a1.5 1.5 0 01-1.5-1.5V3A1.5 1.5 0 013 1.5h3.5A1.5 1.5 0 018 3v1"/></svg>
          Copy Set
        </button>
        <button onclick="selectGhost('legend','${legend.id}');hideLegendSets()" style="flex:1;padding:14px;border-radius:16px;background:#334F6B;border:none;color:white;font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10c2-3 4-5 6-5s4 2 6 5"/></svg>
          Race This
        </button>
      </div>
    </div>`;
  }).join('');
  document.getElementById('swimmerNav').style.display = 'none';
  goTo('scrLegendSets');
}
function hideLegendSets() { document.getElementById('swimmerNav').style.display = ''; navTo('community'); }
function copyLegendSet(legendId, setName) {
  const legend = LEGENDS.find(l => l.id === legendId);
  if (!legend) return;
  const set = legend.sets.find(s => s.name === setName);
  if (!set) return;
  drills = set.drills.map(d => ({ ...d, id: Date.now().toString() + Math.random() }));
  document.getElementById('inputSetName').value = set.name + ' (Legend)';
  document.getElementById('swimmerNav').style.display = '';
  navTo('train');
  renderDrills();
}

// ── AI Chat (Groq-powered) ──────────────────────────────────
const COACH_SYSTEM_PROMPT = `You are swym AI Coach — a world-class swimming coach AI assistant inside the swym app. You are friendly, motivating, and knowledgeable about competitive and recreational swimming.

Your capabilities:
- Designing swim sets and workouts (warmup, main sets, cooldowns)
- Analyzing split times and pacing strategy
- Giving technique tips (freestyle, backstroke, butterfly, breaststroke, turns, starts)
- Recovery and injury-prevention advice
- Race preparation and tapering guidance
- Tracking progress and setting goals

Guidelines:
- Keep responses concise (2-4 sentences unless the user asks for a full workout).
- Use swim-specific terminology: splits, pace/100m, SPM, DPS, negative split, etc.
- When suggesting sets, use format like "4×100m Free @ 1:20 w/ 20s rest".
- Be encouraging but data-driven.
- If asked about non-swimming topics, briefly help but steer back to swimming.`;

const coachChatHistory = [];

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const container = document.getElementById('chatContainer');
  container.innerHTML += `<div class="chat-msg user">${escapeHtml(msg)}</div>`;
  container.scrollTop = container.scrollHeight;

  // Hide chips after first interaction
  const chips = document.getElementById('coachChips');
  if (chips) chips.style.display = 'none';

  // Show typing indicator
  const icon = `<div class="coach-ai-icon"><svg width="12" height="12" fill="none" stroke="#F6AA38" stroke-width="2"><path d="M6 1v3M6 8v3M1 6h3M8 6h3"/></svg></div>`;
  const typingId = 'typing-' + Date.now();
  container.innerHTML += `<div class="coach-ai-row" id="${typingId}">${icon}<div class="chat-msg ai"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div></div>`;
  container.scrollTop = container.scrollHeight;

  // Disable send while waiting
  const sendBtn = input.nextElementSibling;
  if (sendBtn) sendBtn.disabled = true;

  try {
    coachChatHistory.push({ role: 'user', content: msg });

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: msg,
        model: 'llama-3.3-70b-versatile',
        systemPrompt: COACH_SYSTEM_PROMPT,
      }),
    });

    const data = await res.json();
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    if (!res.ok) {
      container.innerHTML += `<div class="coach-ai-row">${icon}<div class="chat-msg ai" style="color:#ef4444">Sorry, I couldn't respond right now. Please try again.</div></div>`;
    } else {
      const reply = data.reply;
      coachChatHistory.push({ role: 'assistant', content: reply });
      container.innerHTML += `<div class="coach-ai-row">${icon}<div class="chat-msg ai">${escapeHtml(reply)}</div></div>`;
    }
  } catch (err) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();
    container.innerHTML += `<div class="coach-ai-row">${icon}<div class="chat-msg ai" style="color:#ef4444">Network error — check your connection and try again.</div></div>`;
  }

  if (sendBtn) sendBtn.disabled = false;
  container.scrollTop = container.scrollHeight;
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── Radar Chart ─────────────────────────────────────────────
function renderRadarChart() {
  const el = document.getElementById('radarChart');
  if (!el) return;
  const dims = ['Speed', 'Endurance', 'Technique', 'Turns', 'Recovery', 'Consistency'];
  const vals = [85, 78, 90, 88, 72, 94];
  const cx = 120, cy = 120, R = 90, n = dims.length;
  let svg = '';
  [0.25, 0.5, 0.75, 1].forEach(pct => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      pts.push(`${cx + R * pct * Math.cos(angle)},${cy + R * pct * Math.sin(angle)}`);
    }
    svg += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1"/>`;
  });
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    svg += `<line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(angle)}" y2="${cy + R * Math.sin(angle)}" stroke="rgba(255,255,255,.06)" stroke-width="1"/>`;
  }
  const dataPts = [];
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = R * (vals[i] / 100);
    dataPts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  svg += `<polygon points="${dataPts.join(' ')}" fill="rgba(97,148,155,.2)" stroke="#61949B" stroke-width="2"/>`;
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = R * (vals[i] / 100);
    const x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
    svg += `<circle cx="${x}" cy="${y}" r="3" fill="#61949B" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`;
    const lx = cx + (R + 18) * Math.cos(angle), ly = cy + (R + 18) * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
    svg += `<text x="${lx}" y="${ly + 3}" text-anchor="${anchor}" font-size="9" fill="rgba(255,255,255,.4)">${dims[i]}</text>`;
  }
  el.innerHTML = svg;
  // Render stat pills
  const statsEl = document.getElementById('radarStats');
  if (statsEl) {
    statsEl.innerHTML = dims.map((d, i) => `<div style="text-align:center;padding:10px 4px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px"><div style="font-family:var(--font-head);font-size:20px;color:white">${vals[i]}</div><div style="font-size:9px;color:rgba(255,255,255,0.25);margin-top:2px">${d}</div></div>`).join('');
  }
}

function coachQuickAction(action) {
  const input = document.getElementById('chatInput');
  input.value = action;
  sendChat();
}

// ── Coach Dashboard ─────────────────────────────────────────
function coachTabTo(tab) {
  coachTab = tab;
  document.querySelectorAll('#coachBottomNav .nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  renderCoachDashboard(tab);
}

function renderCoachDashboard(tab) {
  const el = document.getElementById('coachDashContent');
  switch (tab) {
    case 'coachHome': el.innerHTML = renderCoachHome(); break;
    case 'coachTeam': el.innerHTML = renderCoachTeam(); break;
    case 'coachAI': el.innerHTML = renderCoachAI(); break;
    case 'coachData': el.innerHTML = renderCoachData(); break;
    case 'coachProfile': el.innerHTML = renderCoachProfile(); break;
    default: el.innerHTML = renderCoachHome();
  }
}

function renderCoachHome() {
  setTimeout(() => renderCoachRadar(), 50);
  return `
    <div class="dark-hdr" style="padding-bottom:32px">
      <div style="position:relative;z-index:10">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px">
          <span style="font-family:var(--font-head);font-size:18px;color:white;opacity:0.8">swym</span>
          <div class="mode-dropdown" style="position:relative">
            <button onclick="toggleModeDropdown(this)" style="font-size:9px;letter-spacing:.15em;color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.15);border-radius:9999px;padding:6px 14px;background:none;cursor:pointer;display:flex;align-items:center;gap:6px">COACH MODE <svg width="8" height="8" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.5"><path d="M1 3l3 3 3-3"/></svg></button>
            <div class="mode-dropdown-menu" style="display:none;position:absolute;right:0;top:calc(100% + 6px);background:rgba(30,32,60,0.95);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:4px;min-width:150px;z-index:100">
              <div style="padding:8px 12px;font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.1em">SWITCH MODE</div>
              <button onclick="switchToSwimmerMode();closeModeDropdowns()" style="width:100%;padding:10px 12px;background:none;border:none;color:rgba(255,255,255,.7);font-size:12px;text-align:left;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px" onmouseenter="this.style.background='rgba(255,255,255,.06)'" onmouseleave="this.style.background='none'"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,8 5,3 8,6 11,1 13,8"/><path d="M1 11h12"/></svg>Swimmer Mode</button>
            </div>
          </div>
        </div>
        <h1 style="font-family:var(--font-head);font-size:28px;color:white;line-height:1.2;margin-bottom:8px">Hello, Coach 👋</h1>
        <div style="font-size:13px;color:rgba(255,255,255,.4)">4 athletes · 6 sessions · <span style="color:var(--gold)">Meet week</span></div>
      </div>
    </div>
    <div style="padding:0 20px 120px;display:flex;flex-direction:column;gap:16px">

      <!-- Today's Schedule -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M5 1v3M11 1v3M2 7h12"/></svg>
            <span style="font-family:var(--font-head);font-size:16px;color:white">Today's Schedule</span>
          </div>
          <span style="font-size:10px;color:#16a34a;background:rgba(22,163,74,.12);padding:4px 10px;border-radius:9999px">Prepared 87%</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:14px">
            <div style="text-align:center;min-width:40px"><div style="font-family:var(--font-head);font-size:18px;color:white">6:00</div><div style="font-size:9px;color:rgba(255,255,255,.25)">AM</div></div>
            <div><div style="font-size:13px;color:white;font-weight:500">Pool Session</div><div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:2px">Main training block</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:14px">
            <div style="text-align:center;min-width:40px"><div style="font-family:var(--font-head);font-size:18px;color:white">4:30</div><div style="font-size:9px;color:rgba(255,255,255,.25)">PM</div></div>
            <div><div style="font-size:13px;color:white;font-weight:500">Dryland Strength</div><div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:2px">Power & conditioning</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:14px">
            <div style="text-align:center;min-width:40px"><div style="font-family:var(--font-head);font-size:18px;color:white">7:00</div><div style="font-size:9px;color:rgba(255,255,255,.25)">PM</div></div>
            <div><div style="font-size:13px;color:white;font-weight:500">Recovery Review</div><div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:2px">Team check-in</div></div>
          </div>
        </div>
      </div>

      <!-- Team Shape This Week -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"><polyline points="2,12 5,6 8,9 11,3 14,8"/></svg>
          <span style="font-family:var(--font-head);font-size:16px;color:white">Team Shape This Week</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
          <span style="font-size:11px;color:rgba(255,255,255,.3)">Compared to last week</span>
          <span style="font-size:10px;color:#16a34a;background:rgba(22,163,74,.12);padding:3px 8px;border-radius:9999px;display:flex;align-items:center;gap:3px"><svg width="8" height="8" fill="none" stroke="#16a34a" stroke-width="2"><path d="M1 5l3-3 3 3"/></svg>+6%</span>
        </div>
        <canvas id="coachRadar" width="280" height="240" style="display:block;margin:0 auto"></canvas>
      </div>

      <!-- AI Coach Recommendation -->
      <div class="card-accent" style="padding:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <div style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center"><svg width="11" height="11" fill="none" stroke="white" stroke-width="1.5"><path d="M5.5 1v2M5.5 9v2M1 5.5h2M9 5.5h2"/></svg></div>
          <span style="font-size:11px;color:rgba(255,255,255,.6);letter-spacing:.12em;font-weight:500">AI Coach Recommendation</span>
        </div>
        <p style="font-size:14px;color:rgba(255,255,255,.9);line-height:1.6;margin-bottom:16px">Yesterday load was high. Today <span style="color:white;font-weight:600">recovery + technique</span> is optimal for peak performance.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
          <span style="padding:6px 14px;border-radius:9999px;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-size:11px">Recovery</span>
          <span style="padding:6px 14px;border-radius:9999px;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-size:11px">Turns</span>
          <span style="padding:6px 14px;border-radius:9999px;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-size:11px">Starts</span>
          <span style="padding:6px 14px;border-radius:9999px;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-size:11px">Low Intensity</span>
        </div>
        <button onclick="coachAIPrompt('Weekly plan for team')" style="width:100%;padding:14px;border-radius:9999px;background:white;border:none;color:var(--dark);font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer">
          <svg width="14" height="14" fill="none" stroke="var(--dark)" stroke-width="1.5"><path d="M7 1l1.5 4.5H13l-3.5 2.5L11 13 7 10 3 13l1.5-5L1 5.5h4.5z"/></svg>
          Generate Team Plan
        </button>
      </div>

      <!-- Athlete Alerts -->
      <div style="padding:4px 0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
          <svg width="16" height="16" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M8 1L1 14h14L8 1z"/><path d="M8 6v3M8 11.5v.5"/></svg>
          <span style="font-size:10px;letter-spacing:.15em;color:rgba(255,255,255,.3)">ATHLETE ALERTS</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px 20px">
          <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#ef4444"></span><span style="font-size:12px;color:rgba(255,255,255,.5)"><strong style="color:rgba(255,255,255,.8)">Riya</strong> fatigue high</span></div>
          <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#ef4444"></span><span style="font-size:12px;color:rgba(255,255,255,.5)"><strong style="color:rgba(255,255,255,.8)">Arjun</strong> attendance dip</span></div>
          <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#16a34a"></span><span style="font-size:12px;color:rgba(255,255,255,.5)"><strong style="color:rgba(255,255,255,.8)">Sonia</strong> meet taper ready</span></div>
        </div>
      </div>

    </div>`;
}

function renderCoachRadar() {
  const canvas = document.getElementById('coachRadar');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2 + 5;
  const r = Math.min(w, h) / 2 - 30;
  const labels = ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Recovery', 'Consistency'];
  const values = [88, 75, 72, 68, 80, 82];
  const n = labels.length;

  ctx.clearRect(0, 0, w, h);

  // Draw grid rings
  for (let ring = 1; ring <= 4; ring++) {
    const rr = r * ring / 4;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      const x = cx + rr * Math.cos(angle);
      const y = cy + rr * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw axes
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.stroke();
  }

  // Draw data polygon
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const angle = (Math.PI * 2 * idx / n) - Math.PI / 2;
    const val = values[idx] / 100 * r;
    const x = cx + val * Math.cos(angle);
    const y = cy + val * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(97,148,155,0.25)';
  ctx.fill();
  ctx.strokeStyle = '#61949B';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw labels
  ctx.font = '10px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const lx = cx + (r + 18) * Math.cos(angle);
    const ly = cy + (r + 18) * Math.sin(angle);
    ctx.fillText(labels[i], lx, ly);
  }
}

function renderCoachTeam() {
  const getStatus = (a) => {
    if (a.fatigue >= 65) return { label: 'Needs attention', color: '#ef4444', icon: '↘' };
    if (a.fatigue >= 40) return { label: 'Steady', color: '#f59e0b', icon: '→' };
    return { label: 'Improving', color: '#22c55e', icon: '↗' };
  };
  const getAttendNum = (a) => parseInt(a.attendance);
  const getDotColor = (val, type) => {
    if (type === 'fatigue') return val < 40 ? '#22c55e' : val < 65 ? '#f59e0b' : '#ef4444';
    if (type === 'attend') return val >= 90 ? '#22c55e' : val >= 80 ? '#f59e0b' : '#ef4444';
    return '#98C0C8';
  };

  return `
    <div style="padding:48px 24px 24px;background:var(--dark)">
      <h1 style="font-family:var(--font-head);font-size:28px;color:white;margin-bottom:6px">Team Roster</h1>
      <div style="font-size:13px;color:rgba(255,255,255,.4)"><span style="color:white;font-weight:600">${ATHLETES.length} athletes</span> in your squad</div>
    </div>
    <div style="padding:0 20px 120px;display:flex;flex-direction:column;gap:14px;background:var(--dark)">
      <!-- Search -->
      <div style="position:relative">
        <input id="teamSearch" type="text" placeholder="Search athletes..." oninput="filterTeamCards(this.value)" style="width:100%;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:white;font-size:13px;outline:none;font-family:var(--font-body)" />
      </div>

      ${ATHLETES.map(a => {
        const status = getStatus(a);
        const attendNum = getAttendNum(a);
        const pace = a.lastPace.split('/')[0];
        return `<div class="team-athlete-card" data-name="${a.name.toLowerCase()}" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:20px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;font-family:var(--font-head);background:${a.color};color:${a.color === '#98C0C8' ? '#111033' : 'white'}">${a.initials}</div>
            <div>
              <div style="font-family:var(--font-head);font-size:15px;color:white">${a.name}</div>
              <div style="display:flex;align-items:center;gap:4px;margin-top:3px"><span style="color:${status.color};font-size:11px">${status.icon}</span><span style="font-size:11px;color:${status.color};font-style:italic">${status.label}</span></div>
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-bottom:16px">
            <div style="flex:1;text-align:center;padding:10px 6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:12px">
              <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:4px"><span style="width:6px;height:6px;border-radius:50%;background:${getDotColor(a.fatigue, 'fatigue')}"></span><span style="font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.05em">FATIGUE</span></div>
              <div style="font-family:var(--font-head);font-size:18px;color:white">${a.fatigue}%</div>
            </div>
            <div style="flex:1;text-align:center;padding:10px 6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:12px">
              <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:4px"><span style="width:6px;height:6px;border-radius:50%;background:${getDotColor(attendNum, 'attend')}"></span><span style="font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.05em">ATTEND</span></div>
              <div style="font-family:var(--font-head);font-size:18px;color:white">${attendNum}%</div>
            </div>
            <div style="flex:1;text-align:center;padding:10px 6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:12px">
              <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:4px"><span style="font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.05em">BEST PACE</span></div>
              <div style="font-family:var(--font-head);font-size:18px;color:white">${pace}</div>
            </div>
          </div>
          <div style="display:flex;gap:10px">
            <button onclick="coachCreateSet('${a.name}')" style="flex:1;padding:10px;border-radius:12px;background:rgba(51,79,107,0.8);border:none;color:white;font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="5"/><path d="M6 4v4M4 6h4"/></svg>Create Set</button>
            <button onclick="coachViewAthlete('${a.id}')" style="flex:1;padding:10px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,.6);font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="5"/><path d="M6 4v1M6 7v2"/></svg>View Details</button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function filterTeamCards(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.team-athlete-card').forEach(card => {
    card.style.display = card.dataset.name.includes(q) ? '' : 'none';
  });
}

// Athlete session history (mock data)
const ATHLETE_HISTORY = {
  a1: [
    { date: 'Apr 22', name: 'Endurance Base', dist: '2.8km', drills: 5, pace: '1:22', focus: 'Distance' },
    { date: 'Apr 20', name: 'Threshold Set', dist: '2.4km', drills: 4, pace: '1:20', focus: 'Speed' },
    { date: 'Apr 18', name: 'Recovery Swim', dist: '1.2km', drills: 3, pace: '1:40', focus: 'Recovery' },
    { date: 'Apr 16', name: 'Race Pace Sim', dist: '2.0km', drills: 6, pace: '1:18', focus: 'Competition' },
    { date: 'Apr 14', name: 'Technique Day', dist: '1.8km', drills: 5, pace: '1:35', focus: 'Technique' },
  ],
  a2: [
    { date: 'Apr 21', name: 'Sprint Intervals', dist: '1.6km', drills: 6, pace: '0:36', focus: 'Sprint' },
    { date: 'Apr 19', name: 'Power Block', dist: '1.2km', drills: 4, pace: '0:38', focus: 'Power' },
    { date: 'Apr 15', name: 'Technique + Drill', dist: '1.4km', drills: 5, pace: '0:42', focus: 'Technique' },
    { date: 'Apr 12', name: 'Speed Endurance', dist: '1.8km', drills: 4, pace: '0:40', focus: 'Endurance' },
  ],
  a3: [
    { date: 'Apr 22', name: 'Backstroke Focus', dist: '2.2km', drills: 5, pace: '1:28', focus: 'Backstroke' },
    { date: 'Apr 20', name: 'Mixed Strokes', dist: '2.0km', drills: 4, pace: '1:32', focus: 'Variety' },
    { date: 'Apr 18', name: 'Endurance Build', dist: '2.6km', drills: 5, pace: '1:30', focus: 'Distance' },
    { date: 'Apr 17', name: 'High Intensity', dist: '1.8km', drills: 6, pace: '1:24', focus: 'Speed' },
    { date: 'Apr 15', name: 'Recovery Easy', dist: '1.0km', drills: 2, pace: '1:45', focus: 'Recovery' },
  ],
  a4: [
    { date: 'Apr 22', name: 'IM Training', dist: '2.4km', drills: 6, pace: '1:18', focus: 'IM' },
    { date: 'Apr 20', name: 'Fly + Back Focus', dist: '2.0km', drills: 5, pace: '1:22', focus: 'Strokes' },
    { date: 'Apr 18', name: 'Endurance IM', dist: '2.8km', drills: 4, pace: '1:20', focus: 'Distance' },
    { date: 'Apr 16', name: 'Sprint IM', dist: '1.4km', drills: 6, pace: '1:14', focus: 'Speed' },
  ],
};

function coachViewAthlete(id) {
  const a = ATHLETES.find(x => x.id === id);
  if (!a) return;
  const history = ATHLETE_HISTORY[id] || [];
  const status = a.fatigue >= 65 ? { label: 'Needs attention', color: '#ef4444' } : a.fatigue >= 40 ? { label: 'Steady', color: '#f59e0b' } : { label: 'Improving', color: '#22c55e' };
  const recentSet = history[0];

  const modal = document.getElementById('athleteDetailModal');
  const content = document.getElementById('athleteDetailContent');

  content.innerHTML = `
    <!-- Athlete Summary -->
    <div style="text-align:center;padding:8px 0 16px">
      <div style="width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600;font-family:var(--font-head);background:${a.color};color:${a.color === '#98C0C8' ? '#111033' : 'white'};margin:0 auto 12px">${a.initials}</div>
      <div style="font-family:var(--font-head);font-size:20px;color:#111033">${a.name}</div>
      <div style="font-size:12px;color:rgba(17,16,51,.4);margin-top:4px">${a.specialty}</div>
      <div style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;padding:4px 12px;border-radius:9999px;background:${status.color}15;border:1px solid ${status.color}30">
        <span style="width:6px;height:6px;border-radius:50%;background:${status.color}"></span>
        <span style="font-size:11px;color:${status.color}">${status.label}</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:20px">
      <div style="text-align:center;padding:12px 8px;background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);border-radius:12px">
        <div style="font-family:var(--font-head);font-size:18px;color:#111033">${a.weeklyDist}</div>
        <div style="font-size:9px;color:rgba(17,16,51,.35);margin-top:2px">THIS WEEK</div>
      </div>
      <div style="text-align:center;padding:12px 8px;background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);border-radius:12px">
        <div style="font-family:var(--font-head);font-size:18px;color:#111033">${a.sessions}</div>
        <div style="font-size:9px;color:rgba(17,16,51,.35);margin-top:2px">SESSIONS</div>
      </div>
      <div style="text-align:center;padding:12px 8px;background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);border-radius:12px">
        <div style="font-family:var(--font-head);font-size:18px;color:#111033">${a.fatigue}%</div>
        <div style="font-size:9px;color:rgba(17,16,51,.35);margin-top:2px">FATIGUE</div>
      </div>
    </div>

    <!-- AI Note -->
    <div style="padding:14px 16px;background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);border-radius:14px;margin-bottom:20px;display:flex;align-items:flex-start;gap:10px">
      <svg width="14" height="14" fill="none" stroke="#334F6B" stroke-width="1.5" style="flex-shrink:0;margin-top:2px"><path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4"/></svg>
      <div style="font-size:13px;color:rgba(17,16,51,.6);line-height:1.5;font-style:italic">"${a.aiNote}"</div>
    </div>

    ${recentSet ? `
    <!-- Recent Set -->
    <div style="margin-bottom:20px">
      <div style="font-size:10px;letter-spacing:.12em;color:rgba(17,16,51,.3);margin-bottom:10px">RECENT SET</div>
      <div style="padding:16px;background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);border-radius:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:14px;color:#111033;font-weight:500">${recentSet.name}</div>
          <span style="font-size:10px;color:rgba(17,16,51,.35)">${recentSet.date}</span>
        </div>
        <div style="display:flex;gap:16px">
          <div><span style="font-family:var(--font-head);font-size:15px;color:#111033">${recentSet.dist}</span><span style="font-size:10px;color:rgba(17,16,51,.35);margin-left:4px">distance</span></div>
          <div><span style="font-family:var(--font-head);font-size:15px;color:#111033">${recentSet.pace}</span><span style="font-size:10px;color:rgba(17,16,51,.35);margin-left:4px">pace</span></div>
          <div><span style="font-family:var(--font-head);font-size:15px;color:#111033">${recentSet.drills}</span><span style="font-size:10px;color:rgba(17,16,51,.35);margin-left:4px">drills</span></div>
        </div>
      </div>
    </div>` : ''}

    <!-- Session History -->
    <div>
      <div style="font-size:10px;letter-spacing:.12em;color:rgba(17,16,51,.3);margin-bottom:10px">SESSION HISTORY</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${history.map(h => `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(17,16,51,0.04);border:1px solid rgba(17,16,51,0.06);border-radius:12px">
            <div style="min-width:44px;text-align:center">
              <div style="font-size:12px;color:#111033;font-weight:500">${h.date.split(' ')[1]}</div>
              <div style="font-size:9px;color:rgba(17,16,51,.3)">${h.date.split(' ')[0]}</div>
            </div>
            <div style="flex:1">
              <div style="font-size:13px;color:#111033">${h.name}</div>
              <div style="font-size:11px;color:rgba(17,16,51,.35);margin-top:2px">${h.dist} · ${h.drills} drills · ${h.focus}</div>
            </div>
            <div style="font-family:var(--font-head);font-size:13px;color:#334F6B">${h.pace}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeAthleteDetail() {
  document.getElementById('athleteDetailModal').style.display = 'none';
}

const coachAIChatHistory = [];

function renderCoachAI() {
  return `
    <div style="background:linear-gradient(160deg, #1a2240 0%, #111033 40%, #0e1a2e 70%, #111033 100%);padding:48px 24px 28px;position:relative;overflow:hidden;border-radius:0 0 32px 32px;flex-shrink:0">
      <div style="position:absolute;top:-40px;left:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(51,79,107,0.25),transparent 70%);pointer-events:none"></div>
      <div style="position:absolute;bottom:-20px;right:-20px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(152,192,200,0.08),transparent 70%);pointer-events:none"></div>
      <div style="position:relative;z-index:10">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <span style="font-size:11px;letter-spacing:.1em;color:rgba(255,255,255,.25);font-family:var(--font-head)">swym</span>
          <span style="font-size:10px;letter-spacing:.15em;color:rgba(255,255,255,.2)">AI COACH</span>
        </div>
        <h1 style="font-family:var(--font-head);font-size:28px;color:white;margin-bottom:6px">AI Coach</h1>
        <p style="font-size:13px;color:rgba(255,255,255,0.3)">Generate intelligent training plans for your team</p>
      </div>
    </div>

    <div style="padding:16px 20px 120px;display:flex;flex-direction:column;gap:16px">
      <!-- AI Chat Card -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:20px">
        <!-- Coach AI identity -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:44px;height:44px;border-radius:50%;background:rgba(212,236,241,0.15);display:flex;align-items:center;justify-content:center">
            <svg width="20" height="20" fill="none" stroke="#d4ecf1" stroke-width="1.5"><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4"/></svg>
          </div>
          <div>
            <div style="font-size:15px;color:white;font-weight:500">AI Coach</div>
            <div style="display:flex;align-items:center;gap:4px"><div style="width:6px;height:6px;border-radius:50%;background:#4ade80"></div><span style="font-size:10px;color:rgba(255,255,255,0.25)">Online</span></div>
          </div>
        </div>
        <!-- Chat messages -->
        <div class="chat-container" id="coachAIChatContainer" style="max-height:300px;overflow-y:auto">
          <div class="coach-ai-row"><div class="coach-ai-icon"><svg width="12" height="12" fill="none" stroke="#d4ecf1" stroke-width="2"><path d="M6 1v3M6 8v3M1 6h3M8 6h3"/></svg></div><div class="chat-msg ai">Hey Coach! I have your team's data loaded. Ask me to create training plans, analyze performance, or generate sets for your ${ATHLETES.length} athletes.</div></div>
        </div>
        <!-- Quick action chips -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0" id="coachAIChips">
          <button onclick="coachAIQuick('Create a recovery day session')" class="coach-chip">Recovery Day</button>
          <button onclick="coachAIQuick('Design a sprint set')" class="coach-chip">Sprint Set</button>
          <button onclick="coachAIQuick('Create a meet taper plan')" class="coach-chip">Meet Taper</button>
          <button onclick="coachAIQuick('Fix turns drill set')" class="coach-chip">Fix Turns</button>
        </div>
        <!-- Input -->
        <div style="display:flex;gap:8px">
          <input id="coachAIInput" placeholder="Ask AI Coach..." onkeydown="if(event.key==='Enter')coachAISend()" style="flex:1;padding:12px 16px;border-radius:16px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.04);font-size:13px;color:white;font-family:var(--font-body);outline:none" />
          <button onclick="coachAISend()" style="width:44px;height:44px;border-radius:50%;background:#d4ecf1;border:none;color:#111033;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform 0.1s;cursor:pointer" onmousedown="this.style.transform='scale(0.9)'" onmouseup="this.style.transform=''"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2L7 9M14 2l-5 12-2-5-5-2 12-5z"/></svg></button>
        </div>
      </div>
    </div>`;
}

function coachAIQuick(prompt) {
  const input = document.getElementById('coachAIInput');
  if (input) input.value = prompt;
  coachAISend();
}

async function coachAISend() {
  const input = document.getElementById('coachAIInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const container = document.getElementById('coachAIChatContainer');

  // Add user message
  container.innerHTML += `<div class="chat-msg user">${escapeHtml(msg)}</div>`;
  container.scrollTop = container.scrollHeight;

  // Hide chips after first message
  const chips = document.getElementById('coachAIChips');
  if (chips) chips.style.display = 'none';

  // Typing indicator
  const icon = `<div class="coach-ai-icon"><svg width="12" height="12" fill="none" stroke="#d4ecf1" stroke-width="2"><path d="M6 1v3M6 8v3M1 6h3M8 6h3"/></svg></div>`;
  const typingId = 'coachAITyping-' + Date.now();
  container.innerHTML += `<div class="coach-ai-row" id="${typingId}">${icon}<div class="chat-msg ai"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div></div>`;
  container.scrollTop = container.scrollHeight;

  // Disable send
  const sendBtn = input.nextElementSibling;
  if (sendBtn) sendBtn.disabled = true;

  const coachContext = `You are the AI Coach inside swym — a swim coaching app. The coach has ${ATHLETES.length} athletes: ${ATHLETES.map(a => a.name + ' (' + a.specialty + ', fatigue: ' + a.fatigue + '%, weekly distance: ' + a.weeklyDist + ')').join(', ')}. Generate training plans, workout sets, and coaching advice. Use swim-specific format like "4×100m Free @ 1:20 w/ 20s rest". Keep responses concise (2-4 sentences unless asked for a full plan). Be encouraging but data-driven.`;

  try {
    coachAIChatHistory.push({ role: 'user', content: msg });

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: msg,
        model: 'llama-3.3-70b-versatile',
        systemPrompt: coachContext,
      }),
    });

    const data = await res.json();
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    if (!res.ok) {
      container.innerHTML += `<div class="coach-ai-row">${icon}<div class="chat-msg ai" style="color:#ef4444">Sorry, I couldn't respond right now. Please try again.</div></div>`;
    } else {
      const reply = data.reply;
      coachAIChatHistory.push({ role: 'assistant', content: reply });
      container.innerHTML += `<div class="coach-ai-row">${icon}<div class="chat-msg ai">${escapeHtml(reply)}</div></div>`;
    }
  } catch (err) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();
    container.innerHTML += `<div class="coach-ai-row">${icon}<div class="chat-msg ai" style="color:#ef4444">Network error — check your connection and try again.</div></div>`;
  }

  if (sendBtn) sendBtn.disabled = false;
  container.scrollTop = container.scrollHeight;
}

function coachAIReset() {
  const el = document.getElementById('coachAIResult');
  if (el) { el.style.display = 'none'; el.innerHTML = ''; }
  const chips = document.getElementById('coachAIChips');
  if (chips) chips.style.display = 'flex';
}

function renderCoachData() {
  setTimeout(() => {
    renderAttendanceChart();
    renderPaceChart();
    renderStrokeChart();
    renderFatigueChart();
  }, 60);
  return `
    <div style="padding:48px 24px 16px;background:var(--dark)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <svg width="22" height="22" fill="none" stroke="#d4ecf1" stroke-width="1.5"><rect x="3" y="10" width="4" height="8" rx="1"/><rect x="9" y="5" width="4" height="13" rx="1"/><rect x="15" y="2" width="4" height="16" rx="1"/></svg>
        <h1 style="font-family:var(--font-head);font-size:26px;color:white">Analytics</h1>
      </div>
      <p style="font-size:11px;color:rgba(255,255,255,.3)">Performance insights and team metrics</p>
    </div>
    <div style="padding:0 20px 120px;display:flex;flex-direction:column;gap:16px;background:var(--dark)">
      <!-- Attendance Trends -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M11 14v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1"/><circle cx="7" cy="5" r="3"/></svg>
            <span style="font-family:var(--font-head);font-size:15px;color:white">Attendance Trends</span>
          </div>
          <span style="font-size:10px;color:#4ade80;background:rgba(74,222,128,.1);padding:3px 10px;border-radius:9999px">↗ +4%</span>
        </div>
        <canvas id="attendanceChart" width="320" height="160" style="display:block;width:100%;height:160px"></canvas>
      </div>

      <!-- Pace Improvement -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M2 12l4-5 3 3 5-7"/></svg>
            <span style="font-family:var(--font-head);font-size:15px;color:white">Pace Improvement</span>
          </div>
          <span style="font-size:10px;color:#4ade80;background:rgba(74,222,128,.1);padding:3px 10px;border-radius:9999px">↗ -10s avg</span>
        </div>
        <canvas id="paceChart" width="320" height="160" style="display:block;width:100%;height:160px"></canvas>
      </div>

      <!-- Stroke Comparison -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M2 10c2-3 4-5 6-5s4 2 6 5"/></svg>
            <span style="font-family:var(--font-head);font-size:15px;color:white">Stroke Comparison</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="display:flex;align-items:center;gap:4px"><div style="width:8px;height:8px;border-radius:2px;background:#d4ecf1"></div><span style="font-size:8px;color:rgba(255,255,255,.4)">Team Avg</span></div>
            <div style="display:flex;align-items:center;gap:4px"><div style="width:8px;height:8px;border-radius:50%;background:#98C0C8"></div><span style="font-size:8px;color:rgba(255,255,255,.4)">Target</span></div>
          </div>
        </div>
        <canvas id="strokeChart" width="320" height="180" style="display:block;width:100%;height:180px"></canvas>
      </div>

      <!-- Fatigue This Week -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M2 12l4-5 3 3 5-7"/></svg>
          <span style="font-family:var(--font-head);font-size:15px;color:white">Fatigue This Week</span>
        </div>
        <canvas id="fatigueChart" width="320" height="160" style="display:block;width:100%;height:160px"></canvas>
      </div>

      <!-- Athlete Comparison -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M11 14v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1"/><circle cx="7" cy="5" r="3"/></svg>
          <span style="font-family:var(--font-head);font-size:15px;color:white">Athlete Comparison</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          ${ATHLETES.map(a => {
            const stats = {Speed: 85+Math.floor(Math.random()*10), Endurance: 80+Math.floor(Math.random()*12), Technique: 78+Math.floor(Math.random()*10), Recovery: 75+Math.floor(Math.random()*18), Consistency: 85+Math.floor(Math.random()*12)};
            return `<div>
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
                <div style="width:8px;height:8px;border-radius:50%;background:${a.color}"></div>
                <span style="font-size:13px;font-weight:500;color:white">${a.name.split(' ')[0]}</span>
              </div>
              ${Object.entries(stats).map(([k,v]) => `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
                <span style="font-size:10px;color:rgba(255,255,255,.35);width:65px">${k}</span>
                <div style="flex:1;height:4px;background:rgba(255,255,255,.06);border-radius:9999px;overflow:hidden"><div style="height:100%;width:${v}%;background:linear-gradient(90deg,#d4ecf1,#98C0C8);border-radius:9999px"></div></div>
                <span style="font-size:10px;color:rgba(255,255,255,.5);width:22px;text-align:right">${v}</span>
              </div>`).join('')}
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

function renderAttendanceChart() {
  const c = document.getElementById('attendanceChart');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  const data = [90, 88, 93, 95, 91, 94, 92];
  const labels = ['W1','W2','W3','W4','W5','W6','W7'];
  const min = 80, max = 100;
  const pad = {t:10,r:10,b:24,l:30};
  const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
  ctx.clearRect(0,0,W,H);
  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ch * i / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W-pad.r, y); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '9px Inter,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(max - (max-min)*i/4), pad.l-6, y+3);
  }
  // Labels
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  labels.forEach((l,i) => ctx.fillText(l, pad.l + cw*i/(labels.length-1), H-4));
  // Line
  ctx.beginPath();
  data.forEach((v,i) => {
    const x = pad.l + cw*i/(data.length-1);
    const y = pad.t + ch*(1-(v-min)/(max-min));
    i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  });
  ctx.strokeStyle = '#d4ecf1';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Dots
  data.forEach((v,i) => {
    const x = pad.l + cw*i/(data.length-1);
    const y = pad.t + ch*(1-(v-min)/(max-min));
    ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2);
    ctx.fillStyle = '#d4ecf1'; ctx.fill();
  });
}

function renderPaceChart() {
  const c = document.getElementById('paceChart');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  const data = [93, 91, 89, 87, 85, 84, 82];
  const labels = ['W1','W2','W3','W4','W5','W6','W7'];
  const min = 75, max = 95;
  const pad = {t:10,r:10,b:24,l:44};
  const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
  ctx.clearRect(0,0,W,H);
  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ch * i / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W-pad.r, y); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '9px Inter,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(max - (max-min)*i/4), pad.l-6, y+3);
  }
  // Y axis label
  ctx.save();
  ctx.translate(10, pad.t+ch/2);
  ctx.rotate(-Math.PI/2);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '8px Inter,sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('sec/100m', 0, 0);
  ctx.restore();
  // Labels
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  labels.forEach((l,i) => ctx.fillText(l, pad.l + cw*i/(labels.length-1), H-4));
  // Line
  ctx.beginPath();
  data.forEach((v,i) => {
    const x = pad.l + cw*i/(data.length-1);
    const y = pad.t + ch*(1-(v-min)/(max-min));
    i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  });
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Dots
  data.forEach((v,i) => {
    const x = pad.l + cw*i/(data.length-1);
    const y = pad.t + ch*(1-(v-min)/(max-min));
    ctx.beginPath(); ctx.arc(x,y,3.5,0,Math.PI*2);
    ctx.fillStyle = '#4ade80'; ctx.fill();
  });
}

function renderStrokeChart() {
  const c = document.getElementById('strokeChart');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  const strokes = ['Backstroke','Butterfly'];
  const teamAvg = [78, 65];
  const target = [85, 72];
  const max = 100;
  const pad = {t:10,r:10,b:24,l:30};
  const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
  ctx.clearRect(0,0,W,H);
  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ch * i / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W-pad.r, y); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '9px Inter,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(max - max*i/4), pad.l-6, y+3);
  }
  // Bars
  const groupW = cw / strokes.length;
  const barW = 20;
  strokes.forEach((s, gi) => {
    const gx = pad.l + groupW * gi + groupW/2;
    // Team Avg bar
    const h1 = ch * teamAvg[gi] / max;
    ctx.fillStyle = '#d4ecf1';
    ctx.beginPath();
    const x1 = gx - barW - 2;
    ctx.roundRect(x1, pad.t+ch-h1, barW, h1, [3,3,0,0]);
    ctx.fill();
    // Target bar
    const h2 = ch * target[gi] / max;
    ctx.fillStyle = '#98C0C8';
    ctx.beginPath();
    ctx.roundRect(gx + 2, pad.t+ch-h2, barW, h2, [3,3,0,0]);
    ctx.fill();
    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '9px Inter,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(s, gx, H-4);
  });
}

function renderFatigueChart() {
  const c = document.getElementById('fatigueChart');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  const data = [30, 35, 42, 55, 45, 28, 22];
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const max = 100;
  const pad = {t:10,r:10,b:24,l:30};
  const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
  ctx.clearRect(0,0,W,H);
  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ch * i / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W-pad.r, y); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '9px Inter,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(max - max*i/4), pad.l-6, y+3);
  }
  // Bars
  const barW = 18;
  const gap = cw / data.length;
  data.forEach((v,i) => {
    const x = pad.l + gap*i + gap/2 - barW/2;
    const h = ch * v / max;
    ctx.fillStyle = '#f6aa38';
    ctx.beginPath();
    ctx.roundRect(x, pad.t+ch-h, barW, h, [3,3,0,0]);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '8px Inter,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], pad.l + gap*i + gap/2, H-4);
  });
}

function renderCoachProfile() {
  return `
    <div style="padding:48px 24px 24px;background:var(--dark)">
      <!-- Logo -->
      <div style="margin-bottom:24px"><span style="font-family:var(--font-head);font-size:18px;color:white;opacity:0.8">swym</span></div>
      <!-- Profile Card -->
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px">
        <div style="width:60px;height:60px;border-radius:16px;background:linear-gradient(135deg,#334F6B,#98C0C8);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;font-family:var(--font-head);color:white">AC</div>
        <div>
          <h1 style="font-family:var(--font-head);font-size:20px;color:white;margin-bottom:2px">Alex Chen</h1>
          <div style="font-size:12px;color:rgba(255,255,255,.35)">Head Coach</div>
          <span style="display:inline-block;margin-top:4px;font-size:9px;letter-spacing:.1em;color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.15);border-radius:9999px;padding:3px 10px">Pro Member</span>
        </div>
      </div>
      <!-- Stats Row -->
      <div style="display:flex;gap:1px;background:rgba(255,255,255,0.06);border-radius:14px;overflow:hidden;margin-bottom:24px">
        <div style="flex:1;text-align:center;padding:14px 8px;background:rgba(255,255,255,0.03)">
          <div style="font-family:var(--font-head);font-size:20px;color:white">${ATHLETES.length}</div>
          <div style="font-size:9px;color:rgba(255,255,255,.25);margin-top:2px">Athletes</div>
        </div>
        <div style="flex:1;text-align:center;padding:14px 8px;background:rgba(255,255,255,0.03)">
          <div style="font-family:var(--font-head);font-size:20px;color:white">2.5</div>
          <div style="font-size:9px;color:rgba(255,255,255,.25);margin-top:2px">Years</div>
        </div>
        <div style="flex:1;text-align:center;padding:14px 8px;background:rgba(255,255,255,0.03)">
          <div style="font-family:var(--font-head);font-size:20px;color:white">142</div>
          <div style="font-size:9px;color:rgba(255,255,255,.25);margin-top:2px">Sessions</div>
        </div>
      </div>
    </div>
    <div style="padding:0 20px 120px;display:flex;flex-direction:column;gap:16px;background:var(--dark)">
      <!-- ACCOUNT Section -->
      <div>
        <div style="font-size:10px;letter-spacing:.12em;color:#d4ecf1;margin-bottom:10px;padding-left:4px">ACCOUNT</div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">
          <button style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:none;border:none;cursor:pointer">
            <div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M3 14a5 5 0 0110 0"/></svg><span style="font-size:13px;color:rgba(255,255,255,.7)">Edit Profile</span></div>
            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><path d="M4 1l5 5-5 5"/></svg>
          </button>
          <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 16px"></div>
          <button style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:none;border:none;cursor:pointer">
            <div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M8 2a2 2 0 012 2v2a2 2 0 01-4 0V4a2 2 0 012-2z"/><path d="M13 9a5 5 0 01-10 0"/><path d="M8 14v1"/></svg><span style="font-size:13px;color:rgba(255,255,255,.7)">Notifications</span></div>
            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><path d="M4 1l5 5-5 5"/></svg>
          </button>
          <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 16px"></div>
          <button style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:none;border:none;cursor:pointer">
            <div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M2 8a6 6 0 0112 0"/><path d="M8 2v2M3 5l1 1M13 5l-1 1"/><circle cx="8" cy="10" r="2"/></svg><span style="font-size:13px;color:rgba(255,255,255,.7)">Subscription</span></div>
            <div style="display:flex;align-items:center;gap:8px"><span style="font-size:9px;letter-spacing:.08em;color:var(--gold);background:rgba(246,170,56,.12);padding:3px 8px;border-radius:9999px">Pro</span><svg width="12" height="12" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><path d="M4 1l5 5-5 5"/></svg></div>
          </button>
        </div>
      </div>

      <!-- TEAM Section -->
      <div>
        <div style="font-size:10px;letter-spacing:.12em;color:#d4ecf1;margin-bottom:10px;padding-left:4px">TEAM</div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">
          <button onclick="coachTabTo('coachTeam')" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:none;border:none;cursor:pointer">
            <div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><path d="M11 14v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1"/><circle cx="7" cy="5" r="3"/><path d="M15 14v-1a2.5 2.5 0 00-2-2.4"/></svg><span style="font-size:13px;color:rgba(255,255,255,.7)">Connected Athletes</span></div>
            <div style="display:flex;align-items:center;gap:8px"><span style="font-size:10px;color:rgba(255,255,255,.3);background:rgba(255,255,255,.06);padding:3px 8px;border-radius:9999px">${ATHLETES.length}</span><svg width="12" height="12" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><path d="M4 1l5 5-5 5"/></svg></div>
          </button>
          <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 16px"></div>
          <button style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:none;border:none;cursor:pointer">
            <div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><rect x="3" y="3" width="10" height="10" rx="2"/><path d="M8 6v4M6 8h4"/></svg><span style="font-size:13px;color:rgba(255,255,255,.7)">Privacy & Safety</span></div>
            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><path d="M4 1l5 5-5 5"/></svg>
          </button>
        </div>
      </div>

      <!-- SUPPORT Section -->
      <div>
        <div style="font-size:10px;letter-spacing:.12em;color:#d4ecf1;margin-bottom:10px;padding-left:4px">SUPPORT</div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">
          <button style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:none;border:none;cursor:pointer">
            <div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v1M8 8v3"/></svg><span style="font-size:13px;color:rgba(255,255,255,.7)">Help Center</span></div>
            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><path d="M4 1l5 5-5 5"/></svg>
          </button>
          <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 16px"></div>
          <button style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:none;border:none;cursor:pointer">
            <div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5.5a1.5 1.5 0 011.5 1.5c0 1-1.5 1-1.5 2M8 11.5v.5"/></svg><span style="font-size:13px;color:rgba(255,255,255,.7)">App Settings</span></div>
            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><path d="M4 1l5 5-5 5"/></svg>
          </button>
        </div>
      </div>

      <!-- Logout -->
      <button onclick="doLogout()" style="width:100%;padding:14px;border-radius:16px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);color:#ef4444;font-size:13px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3l4 4-4 4M13 7H5M5 1H3a2 2 0 00-2 2v8a2 2 0 002 2h2"/></svg>
        Logout
      </button>

      <div style="text-align:center;font-size:10px;color:rgba(255,255,255,.15);padding:8px 0">SWYM Coach v2.1.0</div>
    </div>`;
}

function switchToSwimmerMode() {
  viewMode = 'swimmer';
  enterSwimmerApp();
}

function toggleModeDropdown(btn) {
  const menu = btn.nextElementSibling;
  const isOpen = menu.style.display !== 'none';
  closeModeDropdowns();
  if (!isOpen) menu.style.display = 'block';
}

function closeModeDropdowns() {
  document.querySelectorAll('.mode-dropdown-menu').forEach(m => m.style.display = 'none');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.mode-dropdown')) closeModeDropdowns();
});

// ── Time Picker (24h carousel) ──────────────────────────────
let selectedHour = 6;
let selectedMin = 30;

function initTimePicker() {
  const hourList = document.getElementById('hourList');
  const minList = document.getElementById('minList');
  if (!hourList || !minList) return;

  // Build hour items 00-23
  hourList.innerHTML = '';
  for (let h = 0; h < 24; h++) {
    const div = document.createElement('div');
    div.className = 'time-item';
    div.dataset.val = h;
    div.style.fontFamily = 'var(--font-head)';
    div.style.fontSize = h === selectedHour ? '36px' : '20px';
    div.style.color = h === selectedHour ? '#111033' : 'rgba(17,16,51,0.15)';
    div.style.fontWeight = '600';
    div.style.transition = 'all 0.15s';
    div.textContent = String(h).padStart(2, '0');
    hourList.appendChild(div);
  }

  // Build minute items 00-55 (5-min steps)
  minList.innerHTML = '';
  for (let m = 0; m < 60; m += 5) {
    const div = document.createElement('div');
    div.className = 'time-item';
    div.dataset.val = m;
    div.style.fontFamily = 'var(--font-head)';
    div.style.fontSize = m === selectedMin ? '36px' : '20px';
    div.style.color = m === selectedMin ? '#111033' : 'rgba(17,16,51,0.15)';
    div.style.fontWeight = '600';
    div.style.transition = 'all 0.15s';
    div.textContent = String(m).padStart(2, '0');
    minList.appendChild(div);
  }

  // Scroll to initial positions
  const hourScroll = document.getElementById('hourScroll');
  const minScroll = document.getElementById('minScroll');
  requestAnimationFrame(() => {
    hourScroll.scrollTop = selectedHour * 48;
    minScroll.scrollTop = (selectedMin / 5) * 48;
  });

  // Snap listeners
  hourScroll.addEventListener('scroll', () => handleTimeScroll(hourScroll, 'hour'));
  minScroll.addEventListener('scroll', () => handleTimeScroll(minScroll, 'min'));
}

let timeScrollTimer = {};
function handleTimeScroll(el, type) {
  clearTimeout(timeScrollTimer[type]);
  timeScrollTimer[type] = setTimeout(() => {
    const itemH = 48;
    const idx = Math.round(el.scrollTop / itemH);
    el.scrollTo({ top: idx * itemH, behavior: 'smooth' });

    if (type === 'hour') {
      selectedHour = Math.min(23, Math.max(0, idx));
    } else {
      selectedMin = Math.min(55, Math.max(0, idx * 5));
    }
    updateTimeDisplay();
    updateTimeItemStyles(el, type === 'hour' ? selectedHour : selectedMin / 5);
  }, 80);
}

function updateTimeItemStyles(scrollEl, activeIdx) {
  const items = scrollEl.querySelectorAll('.time-item');
  items.forEach((item, i) => {
    const isActive = i === activeIdx;
    item.style.fontSize = isActive ? '36px' : '20px';
    item.style.color = isActive ? '#111033' : 'rgba(17,16,51,0.15)';
  });
}

function updateTimeDisplay() {
  const el = document.getElementById('timeDisplay');
  if (el) el.textContent = String(selectedHour).padStart(2, '0') + ':' + String(selectedMin).padStart(2, '0');
}

// ── Init ────────────────────────────────────────────────────
function initSwimmerScreens() {
  renderDrills();
  renderRadarChart();
  updateHomeWorkoutCard();
  initTimePicker();
}

document.addEventListener('DOMContentLoaded', () => {
  const passInput = document.getElementById('inputPass');
  if (passInput) passInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  // Restore session
  try {
    const saved = JSON.parse(localStorage.getItem('swym_session'));
    if (saved && saved.role) {
      currentRole = saved.role;
      if (saved.mode === 'coach') { enterCoachApp(); }
      else {
        viewMode = 'swimmer';
        document.getElementById('swimmerNav').style.display = '';
        // Show mode toggle for coaches in swimmer mode
        const modeToggle = document.getElementById('swimmerModeToggle');
        if (modeToggle) modeToggle.style.display = currentRole === 'coach' ? '' : 'none';
        initSwimmerScreens();
        const lastTab = localStorage.getItem('swym_tab') || 'home';
        navTo(lastTab);
      }
    }
  } catch(e) {}
});
