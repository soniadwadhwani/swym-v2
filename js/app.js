/* ============================================================
   SWYM App – Complete Prototype v2
   ============================================================ */

// ── State ───────────────────────────────────────────────────
let currentRole = null; // 'swimmer' or 'coach'
let currentScreen = 'scrWelcome';
let drills = [{ type:'warmup', stroke:'Freestyle', dist:400, reps:1, rest:30 }];
let ghostRacer = null;
let hour=6, minute=30, ampm='AM';
const DRILL_TYPES = [
  { value:'warmup',  label:'Warmup',    color:'#334F6B' },
  { value:'main',    label:'Main Set',  color:'#334F6B' },
  { value:'sprint',  label:'Sprint',    color:'#334F6B' },
  { value:'drill',   label:'Technique', color:'#334F6B' },
  { value:'cooldown',label:'Cooldown',  color:'#334F6B' },
  { value:'kick',    label:'Kick Set',  color:'#334F6B' }
];
const STROKES = ['Freestyle','Backstroke','Breaststroke','Butterfly','IM'];
const FRIENDS = [
  { id:'f1', name:'Sonia Kumar',  initials:'SK', color:'#334F6B', weeklyDistance:12.4, lastActivity:{ action:'Completed', detail:'3.2km endurance', time:'2h ago' }},
  { id:'f2', name:'Arjun Patel',  initials:'AP', color:'#111033', weeklyDistance:8.2,  lastActivity:{ action:'Hit PB in', detail:'100m freestyle', time:'5h ago' }},
  { id:'f3', name:'Maya Chen',    initials:'MC', color:'#D4ECF1', weeklyDistance:10.1, lastActivity:{ action:'Joined', detail:'Sprint Challenge', time:'1d ago' }},
  { id:'f4', name:'Riya Sharma',  initials:'RS', color:'#98C0C8', weeklyDistance:9.5,  lastActivity:{ action:'Completed', detail:'Recovery swim', time:'1d ago' }},
  { id:'f5', name:'Kabir Singh',  initials:'KS', color:'#2A324E', weeklyDistance:11.0, lastActivity:{ action:'Swam', detail:'2.8km threshold', time:'2d ago' }}
];
const ATHLETES = [
  { id:'a1', name:'Sonia Kumar', initials:'SK', specialty:'Distance Freestyle', fatigue:25, attendance:'98%', lastPace:'1:22/100m', aiNote:'Taper ready for Saturday meet.', color:'#334F6B' },
  { id:'a2', name:'Arjun Patel', initials:'AP', specialty:'Sprint Freestyle', fatigue:45, attendance:'85%', lastPace:'0:38/50m', aiNote:'Needs technique-focused day.', color:'#111033' },
  { id:'a3', name:'Riya Sharma', initials:'RS', specialty:'Backstroke', fatigue:78, attendance:'92%', lastPace:'1:28/100m', aiNote:'Overloaded. Recovery suggested.', color:'#98C0C8' },
  { id:'a4', name:'Kabir Singh', initials:'KS', specialty:'IM', fatigue:35, attendance:'90%', lastPace:'1:18/100m', aiNote:'Strong consistency. Push endurance.', color:'#2A324E' }
];
const BADGES = [
  { name:'5 Day Streak', desc:'Swim 5 days in a row', icon:'fire', color:'#F6AA38', earned:true },
  { name:'100km Club', desc:'Total 100km swum', icon:'wave', color:'#334F6B', earned:true },
  { name:'PB Breaker', desc:'Set a personal best', icon:'trend', color:'#16a34a', earned:true },
  { name:'Turn Master', desc:'Top turn speed', icon:'turn', color:'#334F6B', earned:false },
  { name:'Consistency', desc:'4 weeks no miss', icon:'check', color:'#98C0C8', earned:false },
  { name:'Iron Lung', desc:'Swim 5km non-stop', icon:'lung', color:'#2A324E', earned:false }
];
let feedLikes = {};

// ── Onboarding / Login ──────────────────────────────────────
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  currentScreen = id;
}

function selectRole(role) {
  currentRole = role;
  const t = document.getElementById('loginTitle');
  const s = document.getElementById('loginSub');
  if (role === 'coach') {
    t.textContent = 'Coach Sign In';
    s.textContent = 'Enter your coach credentials';
  } else {
    t.textContent = 'Sign In';
    s.textContent = 'Enter your credentials';
  }
  goTo('scrLogin');
}

function doLogin() {
  const u = document.getElementById('inputUser').value.trim().toLowerCase();
  const p = document.getElementById('inputPass').value.trim();
  const err = document.getElementById('loginError');
  if (currentRole === 'swimmer' && u === 'swimmer' && p === '000') {
    err.textContent = '';
    enterSwimmerApp();
  } else if (currentRole === 'coach' && u === 'coach' && p === '000') {
    err.textContent = '';
    goTo('scrCoachRole');
  } else {
    err.textContent = 'Invalid credentials. Try again.';
  }
}

function enterSwimmerApp() {
  document.getElementById('swimmerNav').style.display = '';
  document.getElementById('coachNav').style.display = 'none';
  navTo('home');
  initSwimmerScreens();
}

function enterCoachApp() {
  document.getElementById('coachNav').style.display = '';
  document.getElementById('swimmerNav').style.display = 'none';
  coachNavTo('coachDash');
  renderCoachRoster();
}

function doLogout() {
  document.getElementById('swimmerNav').style.display = 'none';
  document.getElementById('coachNav').style.display = 'none';
  document.getElementById('inputUser').value = '';
  document.getElementById('inputPass').value = '';
  document.getElementById('loginError').textContent = '';
  currentRole = null;
  goTo('scrWelcome');
}

// ── Swimmer Navigation ──────────────────────────────────────
const SCREEN_MAP = { home:'scrHome', train:'scrTrain', community:'scrCommunity', coach:'scrCoach', profile:'scrProfile' };

function navTo(tab) {
  const scrId = SCREEN_MAP[tab];
  if (!scrId) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(scrId).classList.add('active');
  currentScreen = scrId;
  document.querySelectorAll('#swimmerNav .nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === tab);
  });
  if (tab === 'community') renderCommunity();
  if (tab === 'coach') renderRadarChart();
  if (tab === 'train') renderDrills();
}

function coachNavTo(tab) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('scrCoachDash').classList.add('active');
  currentScreen = 'scrCoachDash';
  document.querySelectorAll('#coachNav .nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === tab);
  });
}
// ── Train / Drills ──────────────────────────────────────────
const DRILL_ICONS = {
  warmup:'<svg width="14" height="14" fill="none" stroke="#334F6B" stroke-width="1.5"><path d="M7 1C5 5 3 6.5 3 9a4 4 0 108 0C11 6.5 9 5 7 1Z"/></svg>',
  main:'<svg width="14" height="14" fill="none" stroke="#334F6B" stroke-width="1.5"><path d="M7 1C4 5 3 7 3 9.5C3 12 5 13 7 13s4-1 4-3.5C11 7 10 5 7 1Z"/></svg>',
  sprint:'<svg width="14" height="14" fill="none" stroke="#334F6B" stroke-width="1.5"><circle cx="7" cy="7" r="6"/><path d="M7 4v3l2.5 1.5"/></svg>',
  drill:'<svg width="14" height="14" fill="none" stroke="#334F6B" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/><circle cx="7" cy="7" r="2.5"/></svg>',
  cooldown:'<svg width="14" height="14" fill="none" stroke="#334F6B" stroke-width="1.5"><path d="M1 7c2-3 4-5 6-5s4 2 6 5c2 3 4 5 6 5"/></svg>',
  kick:'<svg width="14" height="14" fill="none" stroke="#334F6B" stroke-width="1.5"><path d="M3 7a4 4 0 108 0 4 4 0 10-8 0M7 3v8"/></svg>'
};

function renderDrills() {
  const el = document.getElementById('drillsList');
  if (!el) return;
  let totalDist = 0;
  el.innerHTML = drills.map((d, i) => {
    totalDist += d.dist * d.reps;
    const icon = DRILL_ICONS[d.type] || DRILL_ICONS.main;
    const dt = DRILL_TYPES.find(t => t.value === d.type);
    return `<div class="drill-card"><button class="drill-hdr" onclick="toggleDrill(${i})">
      ${icon}<div style="flex:1"><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${dt?dt.label:d.type}</div>
      <div style="font-size:11px;color:rgba(17,16,51,.3);margin-top:2px">${d.reps > 1 ? d.reps+'x' : ''}${d.dist}m ${d.stroke} &middot; ${d.rest}s rest</div></div>
      <svg width="14" height="14" fill="none" stroke="rgba(17,16,51,.15)" stroke-width="1.5"><path d="M5 2l5 5-5 5"/></svg>
    </button><div class="drill-body" id="drillBody${i}">
      <div style="margin-bottom:12px"><div style="font-size:9px;color:rgba(17,16,51,.2);letter-spacing:.15em;margin-bottom:8px">STROKE</div>
      <div class="chips">${STROKES.map(s=>`<button class="chip ${s===d.stroke?'chip-accent':'chip-off'}" onclick="setDrillStroke(${i},'${s}')">${s}</button>`).join('')}</div></div>
      <div style="display:flex;gap:12px;margin-bottom:12px">
        <div style="flex:1"><div style="font-size:9px;color:rgba(17,16,51,.2);letter-spacing:.15em;margin-bottom:6px">DISTANCE</div>
          <div class="stepper"><button class="step-btn" onclick="adjDrill(${i},'dist',-25)"><svg width="12" height="12" fill="none" stroke="rgba(17,16,51,.4)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val">${d.dist}m</span><button class="step-btn" onclick="adjDrill(${i},'dist',25)"><svg width="12" height="12" fill="none" stroke="rgba(17,16,51,.4)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div></div>
        <div style="flex:1"><div style="font-size:9px;color:rgba(17,16,51,.2);letter-spacing:.15em;margin-bottom:6px">REPS</div>
          <div class="stepper"><button class="step-btn" onclick="adjDrill(${i},'reps',-1)"><svg width="12" height="12" fill="none" stroke="rgba(17,16,51,.4)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val">${d.reps}</span><button class="step-btn" onclick="adjDrill(${i},'reps',1)"><svg width="12" height="12" fill="none" stroke="rgba(17,16,51,.4)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div></div>
      </div>
      <button style="width:100%;padding:8px;border-radius:12px;background:none;border:1px solid rgba(17,16,51,.06);color:rgba(17,16,51,.25);font-size:10px;cursor:pointer;letter-spacing:.05em" onclick="removeDrill(${i})">Remove Drill</button>
    </div></div>`;
  }).join('');
  document.getElementById('trainTotal').textContent = totalDist + 'm';
  document.getElementById('trainTime').textContent = Math.round(totalDist / 50 * 1.5) + ' min';
  document.getElementById('trainCount').textContent = drills.length;
  const cl = document.getElementById('drillCountLabel');
  if (cl) cl.textContent = drills.length + ' drill' + (drills.length !== 1 ? 's' : '');
  renderDrillPicker();
}

function toggleDrill(i) {
  const b = document.getElementById('drillBody' + i);
  if (b) b.classList.toggle('open');
}
function setDrillStroke(i, s) { drills[i].stroke = s; renderDrills(); }
function adjDrill(i, key, delta) {
  if (key === 'dist') drills[i].dist = Math.max(25, drills[i].dist + delta);
  if (key === 'reps') drills[i].reps = Math.max(1, drills[i].reps + delta);
  renderDrills();
}
function removeDrill(i) { drills.splice(i, 1); if (!drills.length) drills.push({ type:'warmup', stroke:'Freestyle', dist:400, reps:1, rest:30 }); renderDrills(); }

function renderDrillPicker() {
  const g = document.getElementById('drillTypeGrid');
  if (!g) return;
  g.innerHTML = DRILL_TYPES.map(t => `<button class="dp-btn" onclick="addDrill('${t.value}')">
    ${DRILL_ICONS[t.value]||''}<span>${t.label}</span></button>`).join('');
}
function addDrill(type) {
  drills.push({ type, stroke:'Freestyle', dist:200, reps:1, rest:30 });
  hideDrillPicker(); renderDrills();
}
function hideDrillPicker() { document.getElementById('drillPickerPanel').classList.add('hidden'); }
function showDrillPicker() { document.getElementById('drillPickerPanel').classList.remove('hidden'); }
function loadCoachSet() {
  drills = [
    { type:'warmup', stroke:'Freestyle', dist:400, reps:1, rest:30 },
    { type:'main', stroke:'Freestyle', dist:200, reps:4, rest:20 },
    { type:'sprint', stroke:'Freestyle', dist:50, reps:8, rest:15 },
    { type:'cooldown', stroke:'Backstroke', dist:200, reps:1, rest:0 }
  ];
  document.getElementById('inputSetName').value = 'Threshold Session';
  renderDrills();
}
function startSwim() { alert('Connecting to SWYM Ring...'); }
function showCoachCreateSet() { alert('Set builder for athlete opened'); }

// ── Community ───────────────────────────────────────────────
function renderCommunity() {
  renderLeaderboard();
  renderFeed();
}

function renderLeaderboard() {
  const el = document.getElementById('leaderboardList');
  if (!el) return;
  const sorted = [...FRIENDS].sort((a,b) => b.weeklyDistance - a.weeklyDistance);
  // Add "you" entry
  const you = { name:'You (Alex)', initials:'AK', color:'#334F6B', weeklyDistance:14.3 };
  const all = [you, ...sorted];
  all.sort((a,b) => b.weeklyDistance - a.weeklyDistance);
  el.innerHTML = all.map((f, i) => {
    const rank = i + 1;
    const isYou = f.name.startsWith('You');
    const medal = rank === 1 ? '<span style="color:#F6AA38">&#9733;</span>' : rank;
    const textColor = f.color === '#D4ECF1' ? '#111033' : 'white';
    return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;margin-bottom:6px;${isYou ? 'background:rgba(51,79,107,.08);border:1px solid rgba(51,79,107,.15)' : 'background:rgba(232,241,244,.6)'}">
      <div style="width:24px;text-align:center;font-family:var(--font-head);font-size:12px;color:${isYou?'var(--accent)':'rgba(17,16,51,.3)'}">${medal}</div>
      <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${f.color};color:${textColor}">${f.initials}</div>
      <div style="flex:1"><div style="font-size:14px;color:var(--dark)">${f.name}</div><div style="font-size:10px;color:rgba(17,16,51,.25)">${f.weeklyDistance}km this week</div></div>
    </div>`;
  }).join('');
}

function renderFeed() {
  const el = document.getElementById('feedList');
  if (!el) return;
  const items = [
    { friend: FRIENDS[0], action:'completed', detail:'3.2km endurance set', time:'2 hours ago', likes:5 },
    { friend: FRIENDS[1], action:'hit PB in', detail:'100m freestyle — 0:58!', time:'5 hours ago', likes:12 },
    { friend: FRIENDS[2], action:'joined', detail:'Sprint Challenge', time:'1 day ago', likes:3 },
    { friend: FRIENDS[3], action:'completed', detail:'Recovery swim — 800m', time:'1 day ago', likes:2 }
  ];
  el.innerHTML = items.map((item, i) => {
    const liked = feedLikes[i];
    const lc = liked ? item.likes + 1 : item.likes;
    const textColor = item.friend.color === '#D4ECF1' ? '#111033' : 'white';
    return `<div class="feed-card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${item.friend.color};color:${textColor}">${item.friend.initials}</div>
        <div style="flex:1"><div style="font-size:14px;color:var(--dark)">${item.friend.name}</div><div style="font-size:10px;color:rgba(17,16,51,.25)">${item.time}</div></div>
      </div>
      <p style="font-size:14px;color:rgba(17,16,51,.6);line-height:1.5">${item.friend.name.split(' ')[0]} ${item.action} <span style="color:var(--accent);font-weight:500">${item.detail}</span></p>
      <div class="feed-actions">
        <button class="feed-btn ${liked?'liked':''}" onclick="toggleLike(${i})">
          <svg width="16" height="16" fill="${liked?'currentColor':'none'}" stroke="currentColor" stroke-width="1.5"><path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 018 4.5 3.5 3.5 0 0113.5 7C13.5 10.5 8 14 8 14z"/></svg>
          ${lc}
        </button>
        <button class="feed-btn" onclick="alert('Comments coming soon')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 5a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2H7l-3 2V11a2 2 0 01-1-2V5z"/></svg>
          Comment
        </button>
        <button class="feed-btn" onclick="alert('Pace comparison coming soon')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,10 5,4 8,8 11,2 14,10"/></svg>
          Compare
        </button>
      </div>
    </div>`;
  }).join('');
}

function toggleLike(i) { feedLikes[i] = !feedLikes[i]; renderFeed(); }

function setLbTab(tab) {
  document.querySelectorAll('#lbTabs .ch-tab').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('#lbTabs .ch-tab').forEach(b => b.classList.add('off'));
  event.target.classList.remove('off');
  event.target.classList.add('on');
  renderLeaderboard(); // same data, different label
}
// ── Coach / Radar Chart ─────────────────────────────────────
function renderRadarChart() {
  const el = document.getElementById('radarChart');
  if (!el) return;
  const dims = ['Speed','Endurance','Technique','Consistency','Turns','Recovery'];
  const vals = [82, 78, 91, 88, 65, 74];
  const cx = 120, cy = 120, R = 90;
  const n = dims.length;
  let svg = '';

  // Grid rings
  [0.25, 0.5, 0.75, 1].forEach(pct => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      pts.push(`${cx + R * pct * Math.cos(angle)},${cy + R * pct * Math.sin(angle)}`);
    }
    svg += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(17,16,51,.06)" stroke-width="1"/>`;
  });

  // Axes
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    svg += `<line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(angle)}" y2="${cy + R * Math.sin(angle)}" stroke="rgba(17,16,51,.06)" stroke-width="1"/>`;
  }

  // Data polygon
  const dataPts = [];
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = R * (vals[i] / 100);
    dataPts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  svg += `<polygon points="${dataPts.join(' ')}" fill="rgba(51,79,107,.15)" stroke="#334F6B" stroke-width="2"/>`;

  // Dots + labels
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const r = R * (vals[i] / 100);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="white" stroke="#334F6B" stroke-width="2"/>`;
    const lx = cx + (R + 16) * Math.cos(angle);
    const ly = cy + (R + 16) * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
    svg += `<text x="${lx}" y="${ly + 3}" text-anchor="${anchor}" font-size="9" fill="rgba(17,16,51,.4)">${dims[i]}</text>`;
    svg += `<text x="${lx}" y="${ly + 14}" text-anchor="${anchor}" font-size="9" font-weight="600" fill="var(--dark)">${vals[i]}%</text>`;
  }

  el.innerHTML = svg;
}

function setPeriod(p) {
  document.querySelectorAll('.period-btn').forEach(b => { b.classList.remove('on'); });
  event.target.classList.add('on');
}

// ── Coach App ───────────────────────────────────────────────
function renderCoachRoster() {
  const el = document.getElementById('coachRoster');
  if (!el) return;
  el.innerHTML = ATHLETES.map(a => {
    const fatClass = a.fatigue < 40 ? 'fatigue-low' : a.fatigue < 65 ? 'fatigue-med' : 'fatigue-high';
    const textColor = a.color === '#D4ECF1' || a.color === '#98C0C8' ? '#111033' : 'white';
    return `<button class="athlete-card" onclick="showCoachAthlete('${a.id}')">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--font-head);background:${a.color};color:${textColor}">${a.initials}</div>
        <div style="flex:1"><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.name}</div><div style="font-size:11px;color:rgba(17,16,51,.3);margin-top:2px">${a.specialty}</div></div>
        <svg width="14" height="14" fill="none" stroke="rgba(17,16,51,.15)" stroke-width="1.5"><path d="M5 2l5 5-5 5"/></svg>
      </div>
      <div style="display:flex;gap:16px;margin-bottom:8px">
        <div><span style="font-size:10px;color:rgba(17,16,51,.25)">Fatigue</span><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.fatigue}%</div></div>
        <div><span style="font-size:10px;color:rgba(17,16,51,.25)">Attendance</span><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.attendance}</div></div>
        <div><span style="font-size:10px;color:rgba(17,16,51,.25)">Last Pace</span><div style="font-family:var(--font-head);font-size:14px;color:var(--dark)">${a.lastPace}</div></div>
      </div>
      <div class="fatigue-bar"><div class="fatigue-fill ${fatClass}" style="width:${a.fatigue}%"></div></div>
      <div style="margin-top:8px;font-size:12px;color:rgba(17,16,51,.4);font-style:italic">"${a.aiNote}"</div>
    </button>`;
  }).join('');
}

function showCoachAthlete(id) {
  const a = ATHLETES.find(x => x.id === id);
  if (!a) return;
  document.getElementById('caName').textContent = a.name;
  document.getElementById('caSpecialty').textContent = a.specialty;
  const c = document.getElementById('caContent');
  const fatClass = a.fatigue < 40 ? 'fatigue-low' : a.fatigue < 65 ? 'fatigue-med' : 'fatigue-high';
  c.innerHTML = `
    <div class="g3">
      <div class="st-sm"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${a.fatigue}%</div><div style="font-size:8px;color:rgba(17,16,51,.2);margin-top:4px">Fatigue</div></div>
      <div class="st-sm"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${a.attendance}</div><div style="font-size:8px;color:rgba(17,16,51,.2);margin-top:4px">Attendance</div></div>
      <div class="st-sm"><div style="font-family:var(--font-head);font-size:20px;color:var(--dark)">${a.lastPace}</div><div style="font-size:8px;color:rgba(17,16,51,.2);margin-top:4px">Last Pace</div></div>
    </div>
    <div class="ca">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <div style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center"><svg width="11" height="11" fill="none" stroke="white" stroke-width="1.5"><path d="M5.5 1v1M5.5 9v1M1 5.5h1M9 5.5h1"/></svg></div>
        <span style="font-size:10px;color:rgba(255,255,255,.4);letter-spacing:.15em">AI RECOMMENDATION</span>
      </div>
      <p style="font-size:14px;color:rgba(255,255,255,.95);line-height:1.6">${a.aiNote}</p>
    </div>
    <button class="btn-accent-full" onclick="alert('Set created for ${a.name}')">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
      Create Set for ${a.name.split(' ')[0]}
    </button>`;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('scrCoachAthlete').classList.add('active');
  currentScreen = 'scrCoachAthlete';
}

function hideCoachAthlete() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('scrCoachDash').classList.add('active');
  currentScreen = 'scrCoachDash';
}

// ── Badges ──────────────────────────────────────────────────
function showBadges() {
  const el = document.getElementById('badgeGrid');
  if (!el) return;
  const icons = {
    fire:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2C7 6 5 8 5 11.5C5 14 7.5 18 10 18s5-4 5-6.5C15 8 13 6 10 2Z"/></svg>',
    wave:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10c2-3 4-5 6-5s4 2 6 5c2 3 4 5 6 5"/></svg>',
    trend:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,14 6,8 10,10 18,2"/></svg>',
    turn:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10c2-3 4-5 6-5s4 2 6 5"/></svg>',
    check:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="4,10 8,14 16,6"/></svg>',
    lung:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2C7 6 5 8 5 11.5C5 14 7.5 18 10 18s5-4 5-6.5C15 8 13 6 10 2Z"/></svg>'
  };
  el.innerHTML = BADGES.map(b => `<div class="badge-item ${b.earned?'':'badge-locked'}">
    <div class="badge-icon-lg" style="background:${b.earned?b.color+'1a':'rgba(17,16,51,.05)'};color:${b.earned?b.color:'rgba(17,16,51,.3)'}">
      ${icons[b.icon]||icons.check}
    </div>
    <div class="badge-name">${b.name}</div>
    <div class="badge-desc">${b.earned?'Earned':'Locked'}</div>
  </div>`).join('');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('scrBadges').classList.add('active');
  currentScreen = 'scrBadges';
}

function hideBadges() { navTo('profile'); }

// ── Init ────────────────────────────────────────────────────
function initSwimmerScreens() {
  renderDrills();
  renderRadarChart();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Add drill button
  const btnAdd = document.getElementById('btnAddDrill');
  if (btnAdd) btnAdd.addEventListener('click', showDrillPicker);
  // Save set
  const btnSave = document.getElementById('btnSaveSet');
  if (btnSave) btnSave.addEventListener('click', () => { alert('Set saved!'); });
  const btnSave2 = document.getElementById('btnSaveSet2');
  if (btnSave2) btnSave2.addEventListener('click', () => { alert('Set saved!'); });
  // Date nav
  const btnPrev = document.getElementById('btnDatePrev');
  if (btnPrev) btnPrev.addEventListener('click', () => {
    const dl = document.getElementById('dateLabel');
    dl.textContent = dl.textContent === 'Today' ? 'Yesterday' : 'Today';
    document.getElementById('btnDateNext').classList.toggle('dis');
  });
  const btnNext = document.getElementById('btnDateNext');
  if (btnNext) btnNext.addEventListener('click', () => {
    const dl = document.getElementById('dateLabel');
    dl.textContent = 'Today';
    btnNext.classList.add('dis');
  });
  // Enter key on login
  const passInput = document.getElementById('inputPass');
  if (passInput) passInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});