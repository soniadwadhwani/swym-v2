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
  document.getElementById(scrId).classList.add('active');
  currentScreen = scrId;
  document.querySelectorAll('#swimmerNav .nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === tab);
  });
  if (tab === 'community') { renderCommunity(); }
  if (tab === 'coach') { renderRadarChart(); }
  if (tab === 'train') { renderDrills(); }
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
  document.getElementById('swimmerNav').style.display = '';
  navTo('home');
  initSwimmerScreens();
}

function enterCoachApp() {
  viewMode = 'coach';
  document.getElementById('swimmerNav').style.display = 'none';
  goTo('scrCoachDash');
  renderCoachDashboard('coachHome');
}

function doLogout() {
  hideLogoutModal();
  document.getElementById('swimmerNav').style.display = 'none';
  document.getElementById('inputUser').value = '';
  document.getElementById('inputPass').value = '';
  document.getElementById('loginError').textContent = '';
  currentRole = null;
  todaySet = null;
  goTo('scrWelcome');
}

function showLogoutModal() { document.getElementById('logoutModal').classList.add('active'); }
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
  todaySet = { name, drills: [...drills], startHour: 6, startMinute: 30, startPeriod: 'AM', date: new Date().toISOString().split('T')[0] };
  updateHomeWorkoutCard();
  navTo('home');
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
function renderCommunity() { renderLeaderboard(); renderFeed(); renderLegends(); }

function renderLeaderboard() {
  const el = document.getElementById('leaderboardList');
  if (!el) return;
  const you = { name: 'You (Alex)', initials: 'AK', color: '#334F6B', weeklyDistance: 14.3 };
  const all = [you, ...FRIENDS].sort((a, b) => b.weeklyDistance - a.weeklyDistance);
  el.innerHTML = all.map((f, i) => {
    const isYou = f.name.startsWith('You');
    const medal = i === 0 ? '<span style="color:#F6AA38">★</span>' : (i + 1);
    return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;margin-bottom:6px;${isYou ? 'background:rgba(51,79,107,.08);border:1px solid rgba(51,79,107,.15)' : 'background:rgba(232,241,244,.6)'}">
      <div style="width:24px;text-align:center;font-family:var(--font-head);font-size:12px;color:${isYou ? 'var(--accent)' : 'rgba(17,16,51,.3)'}">${medal}</div>
      <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${f.color};color:${f.color === '#87ACAA' ? '#061922' : 'white'}">${f.initials}</div>
      <div style="flex:1"><div style="font-size:14px;color:var(--dark)">${f.name}</div><div style="font-size:10px;color:rgba(17,16,51,.25)">${f.weeklyDistance}km this week</div></div>
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
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:48px;height:48px;border-radius:50%;background:#061922;display:flex;align-items:center;justify-content:center;color:white;font-family:var(--font-head);font-size:14px">${l.name.split(' ').map(n => n[0]).join('')}</div>
        <div style="flex:1">
          <div style="font-family:var(--font-head);font-size:16px;color:white">${l.name}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:2px">${l.specialty}</div>
        </div>
        <div style="background:rgba(246,170,56,0.15);padding:4px 12px;border-radius:9999px"><span style="font-size:10px;color:#F6AA38">${l.badge}</span></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <span style="font-size:12px;color:rgba(255,255,255,0.4)">Signature pace: ${l.pace}</span>
        <span style="font-size:10px;color:rgba(255,255,255,0.2)">${l.sets.length} workout${l.sets.length > 1 ? 's' : ''}</span>
      </div>
      <div style="display:flex;gap:8px">
        <button onclick="viewLegendSets('${l.id}')" style="flex:1;padding:12px;border-radius:16px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.7);font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h12M2 7h8M2 11h10"/></svg> View Sets
        </button>
        <button onclick="selectGhost('legend','${l.id}')" style="flex:1;padding:12px;border-radius:16px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.7);font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10c2-3 4-5 6-5s4 2 6 5"/></svg> Race
        </button>
      </div>
    </div>`;
  }).join('');
}

function setLbTab(btn, tab) {
  document.querySelectorAll('#lbTabs .ch-tab').forEach(b => { b.classList.remove('on'); b.classList.add('off'); });
  btn.classList.remove('off'); btn.classList.add('on');
  renderLeaderboard();
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
  document.getElementById('legendViewerInfo').textContent = legend.specialty + ' · ' + legend.badge;
  const content = document.getElementById('legendSetsContent');
  content.innerHTML = legend.sets.map(set => {
    const totalDist = set.drills.reduce((s, d) => s + d.distance * d.reps, 0);
    return `<div class="card-white" style="padding:20px">
      <div style="font-family:var(--font-head);font-size:16px;color:var(--dark);margin-bottom:4px">${set.name}</div>
      <div style="font-size:11px;color:rgba(17,16,51,0.3);margin-bottom:16px">${totalDist >= 1000 ? (totalDist / 1000).toFixed(1) + 'km' : totalDist + 'm'} · ${set.drills.length} drills</div>
      ${set.drills.map((d, i) => {
        const dt = DRILL_TYPES.find(t => t.value === d.type);
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(212,236,241,0.6);border-radius:12px;margin-bottom:6px">
          ${DRILL_ICONS[d.type] || ''}
          <span style="font-size:12px;color:rgba(17,16,51,0.5);flex:1">${dt ? dt.label : d.type} — ${d.reps > 1 ? d.reps + '×' : ''}${d.distance}m ${d.stroke}</span>
        </div>`;
      }).join('')}
      <div style="display:flex;gap:8px;margin-top:16px">
        <button onclick="copyLegendSet('${legend.id}','${set.name}')" style="flex:1;padding:12px;border-radius:16px;background:var(--accent);color:white;border:none;font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="8" height="8" rx="1.5"/><path d="M4 8H3a1.5 1.5 0 01-1.5-1.5V3A1.5 1.5 0 013 1.5h3.5A1.5 1.5 0 018 3v1"/></svg>
          Copy to My Sets
        </button>
        <button onclick="selectGhost('legend','${legend.id}');hideLegendSets()" style="flex:1;padding:12px;border-radius:16px;background:rgba(51,79,107,0.08);color:var(--accent);border:none;font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px">
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

// ── AI Chat ─────────────────────────────────────────────────
function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const container = document.getElementById('chatContainer');
  container.innerHTML += `<div class="chat-msg user">${escapeHtml(msg)}</div>`;

  // Simulate AI response
  setTimeout(() => {
    const responses = [
      'Based on your recent pace trends, I recommend focusing on negative splits this week. Start slower and build speed through each set.',
      'Your stroke rate has been consistent but your distance per stroke could improve. Try adding some catch-up drill sets.',
      'Great question! Your recovery between sets has improved 15% this month. Keep maintaining the 8-10 second rest intervals.',
      'I\'d suggest incorporating more backstroke into your warm-ups to balance muscle usage and reduce shoulder strain.',
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    container.innerHTML += `<div class="chat-msg ai">${response}</div>`;
    container.scrollTop = container.scrollHeight;
  }, 800);
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
  const dims = ['Speed', 'Endurance', 'Technique', 'Consistency', 'Turns', 'Recovery'];
  const vals = [82, 78, 91, 88, 65, 74];
  const cx = 120, cy = 120, R = 90, n = dims.length;
  let svg = '';
  [0.25, 0.5, 0.75, 1].forEach(pct => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      pts.push(`${cx + R * pct * Math.cos(angle)},${cy + R * pct * Math.sin(angle)}`);
    }
    svg += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(17,16,51,.06)" stroke-width="1"/>`;
  });
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    svg += `<line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(angle)}" y2="${cy + R * Math.sin(angle)}" stroke="rgba(17,16,51,.06)" stroke-width="1"/>`;
  }
  const dataPts = [];
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = R * (vals[i] / 100);
    dataPts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  svg += `<polygon points="${dataPts.join(' ')}" fill="rgba(51,79,107,.15)" stroke="#334F6B" stroke-width="2"/>`;
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = R * (vals[i] / 100);
    const x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="white" stroke="#334F6B" stroke-width="2"/>`;
    const lx = cx + (R + 16) * Math.cos(angle), ly = cy + (R + 16) * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
    svg += `<text x="${lx}" y="${ly + 3}" text-anchor="${anchor}" font-size="9" fill="rgba(17,16,51,.4)">${dims[i]}</text>`;
    svg += `<text x="${lx}" y="${ly + 14}" text-anchor="${anchor}" font-size="9" font-weight="600" fill="#111033">${vals[i]}%</text>`;
  }
  el.innerHTML = svg;
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
  return `
    <div class="dark-hdr" style="padding-bottom:48px">
      <div style="position:absolute;right:20px;top:56px;opacity:.1"><img src="../../images/swym-logo-transparent.png" style="height:20px" /></div>
      <div style="position:relative;z-index:10">
        <div style="font-size:10px;letter-spacing:.2em;color:rgba(255,255,255,.2);margin-bottom:8px">COACH MODE</div>
        <h1 style="font-family:var(--font-head);font-size:30px;color:white;margin-bottom:20px">Dashboard</h1>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
          <div class="coach-stat"><div style="font-family:var(--font-head);font-size:24px;color:white">4/6</div><div style="font-size:9px;color:rgba(255,255,255,.3);margin-top:4px">Attendance</div></div>
          <div class="coach-stat"><div style="font-family:var(--font-head);font-size:24px;color:white">3</div><div style="font-size:9px;color:rgba(255,255,255,.3);margin-top:4px">Pending</div></div>
          <div class="coach-stat"><div style="font-family:var(--font-head);font-size:24px;color:white">2</div><div style="font-size:9px;color:rgba(255,255,255,.3);margin-top:4px">AI Alerts</div></div>
        </div>
      </div>
    </div>
    <div style="padding:0 20px 120px;margin-top:-20px;display:flex;flex-direction:column;gap:16px">
      <div class="card-accent" style="padding:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <div style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center"><svg width="11" height="11" fill="none" stroke="white" stroke-width="1.5"><path d="M5.5 1v1M5.5 9v1M1 5.5h1M9 5.5h1"/></svg></div>
          <span style="font-size:10px;color:rgba(255,255,255,.5);letter-spacing:.15em">AI RECOMMENDATIONS</span>
        </div>
        <p style="font-size:14px;color:rgba(255,255,255,.95);line-height:1.6">Sonia is taper-ready for Saturday meet. Arjun needs a technique-focused day. Riya shows overload markers — suggest recovery.</p>
      </div>
      <div>
        <div style="font-size:10px;letter-spacing:.15em;color:rgba(17,16,51,.25);margin-bottom:12px;padding:0 4px">TEAM OVERVIEW</div>
        ${ATHLETES.map(a => {
          const fatClass = a.fatigue < 40 ? 'fatigue-low' : a.fatigue < 65 ? 'fatigue-med' : 'fatigue-high';
          return `<div class="athlete-card">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
              <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${a.color};color:${a.color === '#98C0C8' || a.color === '#87ACAA' ? '#111033' : 'white'}">${a.initials}</div>
              <div style="flex:1"><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.name}</div><div style="font-size:11px;color:rgba(17,16,51,.3);margin-top:2px">${a.specialty}</div></div>
            </div>
            <div style="display:flex;gap:16px;margin-bottom:8px">
              <div><span style="font-size:10px;color:rgba(17,16,51,.25)">Fatigue</span><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.fatigue}%</div></div>
              <div><span style="font-size:10px;color:rgba(17,16,51,.25)">Attendance</span><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.attendance}</div></div>
              <div><span style="font-size:10px;color:rgba(17,16,51,.25)">Pace</span><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.lastPace}</div></div>
            </div>
            <div class="fatigue-bar"><div class="fatigue-fill ${fatClass}" style="width:${a.fatigue}%"></div></div>
          </div>`;
        }).join('')}
      </div>
      <button onclick="switchToSwimmerMode()" style="width:100%;padding:14px;border-radius:16px;background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);color:rgba(17,16,51,0.4);font-size:12px;display:flex;align-items:center;justify-content:center;gap:8px">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10c2-3 4-5 6-5s4 2 6 5"/></svg>
        Switch to Swimmer Mode
      </button>
    </div>`;
}

function renderCoachTeam() {
  return `
    <div class="dark-hdr" style="padding-bottom:32px">
      <div style="position:relative;z-index:10">
        <div style="font-size:10px;letter-spacing:.2em;color:rgba(255,255,255,.2);margin-bottom:8px">TEAM MANAGEMENT</div>
        <h1 style="font-family:var(--font-head);font-size:30px;color:white">Team</h1>
      </div>
    </div>
    <div style="padding:0 20px 120px;margin-top:-12px;display:flex;flex-direction:column;gap:16px">
      ${ATHLETES.map(a => {
        const fatClass = a.fatigue < 40 ? 'fatigue-low' : a.fatigue < 65 ? 'fatigue-med' : 'fatigue-high';
        return `<div class="athlete-card" style="cursor:default">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${a.color};color:${a.color === '#98C0C8' ? '#111033' : 'white'}">${a.initials}</div>
            <div style="flex:1"><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.name}</div><div style="font-size:11px;color:rgba(17,16,51,.3);margin-top:2px">${a.specialty}</div></div>
          </div>
          <div style="display:flex;gap:12px;margin-bottom:8px">
            <div style="flex:1;text-align:center;padding:8px;background:var(--bg);border-radius:12px"><div style="font-family:var(--font-head);font-size:16px;color:var(--dark)">${a.fatigue}%</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Fatigue</div></div>
            <div style="flex:1;text-align:center;padding:8px;background:var(--bg);border-radius:12px"><div style="font-family:var(--font-head);font-size:16px;color:var(--dark)">${a.attendance}</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Attendance</div></div>
            <div style="flex:1;text-align:center;padding:8px;background:var(--bg);border-radius:12px"><div style="font-family:var(--font-head);font-size:16px;color:var(--dark)">${a.lastPace}</div><div style="font-size:8px;color:rgba(17,16,51,0.2);margin-top:2px">Pace</div></div>
          </div>
          <div class="fatigue-bar"><div class="fatigue-fill ${fatClass}" style="width:${a.fatigue}%"></div></div>
          <div style="margin-top:8px;font-size:12px;color:rgba(17,16,51,.4);font-style:italic">"${a.aiNote}"</div>
        </div>`;
      }).join('')}
    </div>`;
}

function renderCoachAI() {
  return `
    <div class="dark-hdr" style="padding-bottom:32px">
      <div style="position:relative;z-index:10">
        <div style="font-size:10px;letter-spacing:.2em;color:rgba(255,255,255,.2);margin-bottom:8px">AI ASSISTANT</div>
        <h1 style="font-family:var(--font-head);font-size:30px;color:white">AI Coach</h1>
      </div>
    </div>
    <div style="padding:0 20px 120px;margin-top:-12px;display:flex;flex-direction:column;gap:16px">
      <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:4px;padding:0 4px">QUICK PROMPTS</div>
      <div class="prompt-chips">
        <button class="prompt-chip" onclick="coachAIPrompt('Generate recovery plan for Riya')">Recovery plan for Riya</button>
        <button class="prompt-chip" onclick="coachAIPrompt('Sprint program for Arjun')">Sprint program for Arjun</button>
        <button class="prompt-chip" onclick="coachAIPrompt('Weekly plan for team')">Weekly team plan</button>
        <button class="prompt-chip" onclick="coachAIPrompt('Taper strategy for Sonia')">Taper for Sonia</button>
      </div>
      <div class="card-white" style="padding:20px" id="coachAIResult">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <div style="width:24px;height:24px;border-radius:50%;background:rgba(51,79,107,0.12);display:flex;align-items:center;justify-content:center"><svg width="12" height="12" fill="none" stroke="#334F6B" stroke-width="1.5"><path d="M6 1v2M6 9v2M1 6h2M9 6h2"/></svg></div>
          <span style="font-size:10px;color:rgba(17,16,51,.25);letter-spacing:.15em">AI RESPONSE</span>
        </div>
        <p style="font-size:14px;color:rgba(17,16,51,0.6);line-height:1.6">Select a prompt above or type your own to generate a training plan.</p>
      </div>
    </div>`;
}

function coachAIPrompt(prompt) {
  const el = document.getElementById('coachAIResult');
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
      <div style="width:24px;height:24px;border-radius:50%;background:rgba(51,79,107,0.12);display:flex;align-items:center;justify-content:center"><svg width="12" height="12" fill="none" stroke="#334F6B" stroke-width="1.5"><path d="M6 1v2M6 9v2M1 6h2M9 6h2"/></svg></div>
      <span style="font-size:10px;color:rgba(17,16,51,.25);letter-spacing:.15em">AI RESPONSE</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
      <div class="spinner" style="width:16px;height:16px;border-width:2px"></div>
      <span style="font-size:12px;color:rgba(17,16,51,0.4)">Generating plan...</span>
    </div>`;

  setTimeout(() => {
    const plans = {
      'Generate recovery plan for Riya': 'Riya shows overload markers — here\'s a 3-day recovery plan:\n\n• Day 1: 400m easy swim, technique focus only\n• Day 2: Rest day, light stretching\n• Day 3: 800m graduated return, 1:40/100m pace cap',
      'Sprint program for Arjun': 'Arjun\'s sprint plateau can be broken with this 2-week block:\n\n• Week 1: 8×50m at 95% effort, 45s rest\n• Week 2: 6×25m max effort + 4×100m descending',
      'Weekly plan for team': 'Team weekly plan:\n\n• Mon: Endurance base (2.5km)\n• Tue: Technique + drill work\n• Wed: Sprint intervals\n• Thu: Recovery swim\n• Fri: Race pace simulation\n• Sat: Competition or time trial',
      'Taper strategy for Sonia': 'Sonia\'s Saturday meet taper:\n\n• Today: 50% volume, race pace 2×100m\n• Tomorrow: 30% volume, technique only\n• Friday: Warm-up pace + 2×50m race effort\n• Saturday: Race day protocol',
    };
    const plan = plans[prompt] || 'Here\'s a custom plan based on your team\'s current data...';
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <div style="width:24px;height:24px;border-radius:50%;background:rgba(51,79,107,0.12);display:flex;align-items:center;justify-content:center"><svg width="12" height="12" fill="none" stroke="#334F6B" stroke-width="1.5"><path d="M6 1v2M6 9v2M1 6h2M9 6h2"/></svg></div>
        <span style="font-size:10px;color:rgba(17,16,51,.25);letter-spacing:.15em">AI RESPONSE</span>
      </div>
      <p style="font-size:14px;color:rgba(17,16,51,0.7);line-height:1.6;white-space:pre-line">${plan}</p>
      <div style="display:flex;gap:8px;margin-top:16px">
        <button style="flex:1;padding:10px;border-radius:12px;background:var(--accent);color:white;border:none;font-size:12px">Save Plan</button>
        <button style="flex:1;padding:10px;border-radius:12px;background:var(--bg);color:rgba(17,16,51,0.5);border:none;font-size:12px">Send to Athlete</button>
      </div>`;
  }, 1200);
}

function renderCoachData() {
  return `
    <div class="dark-hdr" style="padding-bottom:32px">
      <div style="position:relative;z-index:10">
        <div style="font-size:10px;letter-spacing:.2em;color:rgba(255,255,255,.2);margin-bottom:8px">TEAM ANALYTICS</div>
        <h1 style="font-family:var(--font-head);font-size:30px;color:white">Data</h1>
      </div>
    </div>
    <div style="padding:0 20px 120px;margin-top:-12px;display:flex;flex-direction:column;gap:16px">
      <div class="card-white" style="padding:20px">
        <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:12px">TEAM ATTENDANCE (THIS WEEK)</div>
        <div class="bars">
          ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => {
            const heights = [85, 100, 70, 90, 75];
            return `<div class="bar-col"><div class="bar-fill" style="height:${heights[i]}%"></div><span style="font-size:9px;color:rgba(17,16,51,0.3)">${d}</span></div>`;
          }).join('')}
        </div>
      </div>
      <div class="card-white" style="padding:20px">
        <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:12px">PACE IMPROVEMENT (4 WEEKS)</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${ATHLETES.map(a => `<div style="display:flex;align-items:center;gap:12px">
            <div style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-family:var(--font-head);background:${a.color};color:${a.color === '#98C0C8' ? '#111033' : 'white'}">${a.initials}</div>
            <div style="flex:1"><div style="height:6px;background:var(--bg);border-radius:9999px;overflow:hidden"><div style="height:100%;width:${60 + Math.random() * 30}%;background:linear-gradient(90deg,var(--accent),var(--accent-light));border-radius:9999px"></div></div></div>
            <span style="font-size:10px;color:#16a34a">-${Math.floor(2 + Math.random() * 6)}s</span>
          </div>`).join('')}
        </div>
      </div>
      <div class="card-white" style="padding:20px">
        <div style="font-size:10px;color:rgba(17,16,51,0.25);letter-spacing:0.15em;margin-bottom:12px">FATIGUE LEVELS</div>
        ${ATHLETES.map(a => {
          const fatClass = a.fatigue < 40 ? 'fatigue-low' : a.fatigue < 65 ? 'fatigue-med' : 'fatigue-high';
          return `<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <span style="font-size:12px;color:rgba(17,16,51,0.5);width:80px">${a.name.split(' ')[0]}</span>
            <div style="flex:1"><div class="fatigue-bar"><div class="fatigue-fill ${fatClass}" style="width:${a.fatigue}%"></div></div></div>
            <span style="font-size:12px;font-family:var(--font-head);color:var(--dark)">${a.fatigue}%</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderCoachProfile() {
  return `
    <div class="dark-hdr" style="padding-bottom:80px">
      <div style="position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:16px">
        <div style="position:relative;margin-bottom:16px">
          <div class="avatar-lg" style="background:linear-gradient(135deg,#1A343B,#2A324E)">CK</div>
        </div>
        <h1 style="font-family:var(--font-head);font-size:24px;color:white;margin-bottom:4px">Coach Kumar</h1>
        <p style="font-size:12px;color:rgba(255,255,255,.25)">Head Coach · Swim City Club</p>
      </div>
    </div>
    <div style="padding:0 20px 120px;margin-top:-40px;display:flex;flex-direction:column;gap:16px">
      <div class="card-white" style="padding:20px">
        <div style="font-size:10px;letter-spacing:.15em;color:rgba(17,16,51,.25);margin-bottom:12px">TEAM INFO</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="text-align:center;padding:12px;background:var(--bg);border-radius:16px"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${ATHLETES.length}</div><div style="font-size:9px;color:rgba(17,16,51,0.3);margin-top:2px">Athletes</div></div>
          <div style="text-align:center;padding:12px;background:var(--bg);border-radius:16px"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">91%</div><div style="font-size:9px;color:rgba(17,16,51,0.3);margin-top:2px">Avg Attendance</div></div>
        </div>
      </div>
      <div class="card-white" style="padding:0;overflow:hidden">
        <button class="menu-item"><div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(17,16,51,.3)" stroke-width="1.5"><circle cx="8" cy="8" r="2"/><path d="M12.5 8a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg><span style="font-size:14px;color:rgba(17,16,51,.7)">Settings</span></div><svg width="14" height="14" fill="none" stroke="rgba(17,16,51,.15)" stroke-width="1.5"><path d="M5 2l5 5-5 5"/></svg></button>
        <div class="divider"></div>
        <button class="menu-item"><div style="display:flex;align-items:center;gap:12px"><svg width="16" height="16" fill="none" stroke="rgba(17,16,51,.3)" stroke-width="1.5"><path d="M8 2a2 2 0 012 2v3a2 2 0 01-4 0V4a2 2 0 012-2z"/><path d="M4 9v1a4 4 0 008 0V9"/></svg><span style="font-size:14px;color:rgba(17,16,51,.7)">Notifications</span></div><svg width="14" height="14" fill="none" stroke="rgba(17,16,51,.15)" stroke-width="1.5"><path d="M5 2l5 5-5 5"/></svg></button>
      </div>
      <button onclick="switchToSwimmerMode()" style="width:100%;padding:14px;border-radius:16px;background:rgba(17,16,51,0.05);border:1px solid rgba(17,16,51,0.08);color:rgba(17,16,51,0.4);font-size:12px;display:flex;align-items:center;justify-content:center;gap:8px">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10c2-3 4-5 6-5s4 2 6 5"/></svg>
        Switch to Swimmer Mode
      </button>
      <button class="btn-signout" onclick="doLogout()"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3l4 4-4 4M13 7H5M5 1H3a2 2 0 00-2 2v8a2 2 0 002 2h2"/></svg>SIGN OUT</button>
    </div>`;
}

function switchToSwimmerMode() {
  viewMode = 'swimmer';
  enterSwimmerApp();
}

// ── Init ────────────────────────────────────────────────────
function initSwimmerScreens() {
  renderDrills();
  renderRadarChart();
  updateHomeWorkoutCard();
}

document.addEventListener('DOMContentLoaded', () => {
  const passInput = document.getElementById('inputPass');
  if (passInput) passInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});
