/* ============================================================
   SWYM App – Full Interactivity
   Converted from React state management to vanilla JS
   ============================================================ */

// ─── DATA ────────────────────────────────────────────────────
const DRILL_TYPES = [
  { value:'warmup',  label:'Warmup',    color:'#707CFF' },
  { value:'main',    label:'Main Set',  color:'#707CFF' },
  { value:'sprint',  label:'Sprint',    color:'#707CFF' },
  { value:'drill',   label:'Technique', color:'#707CFF' },
  { value:'cooldown',label:'Cooldown',  color:'#707CFF' },
  { value:'kick',    label:'Kick Set',  color:'#707CFF' },
];
const STROKES = ['Freestyle','Backstroke','Breaststroke','Butterfly','IM','Choice'];
const DISTANCES = [25,50,75,100,150,200,300,400,500,800];

const MOCK_HISTORY = {
  '2026-04-17': { name:'Sprint Power', drills:[
    {id:'h1',type:'warmup',stroke:'Freestyle',distance:300,paceMin:1,paceSec:50,rest:10,reps:1},
    {id:'h2',type:'sprint',stroke:'Freestyle',distance:50,paceMin:0,paceSec:40,rest:30,reps:8},
    {id:'h3',type:'cooldown',stroke:'Choice',distance:200,paceMin:2,paceSec:0,rest:0,reps:1},
  ], startHour:7, startMinute:0, startPeriod:'AM', date:'2026-04-17' },
  '2026-04-16': { name:'Endurance Builder', drills:[
    {id:'h4',type:'warmup',stroke:'Freestyle',distance:400,paceMin:1,paceSec:45,rest:15,reps:1},
    {id:'h5',type:'main',stroke:'Freestyle',distance:200,paceMin:1,paceSec:35,rest:20,reps:6},
    {id:'h6',type:'kick',stroke:'Freestyle',distance:100,paceMin:2,paceSec:0,rest:10,reps:4},
    {id:'h7',type:'cooldown',stroke:'Backstroke',distance:200,paceMin:2,paceSec:10,rest:0,reps:1},
  ], startHour:6, startMinute:30, startPeriod:'AM', date:'2026-04-16' },
  '2026-04-14': { name:'Technique Focus', drills:[
    {id:'h8',type:'warmup',stroke:'Freestyle',distance:200,paceMin:1,paceSec:50,rest:10,reps:1},
    {id:'h9',type:'drill',stroke:'Butterfly',distance:50,paceMin:1,paceSec:15,rest:20,reps:6},
    {id:'h10',type:'drill',stroke:'Backstroke',distance:50,paceMin:1,paceSec:20,rest:20,reps:6},
    {id:'h11',type:'cooldown',stroke:'Choice',distance:200,paceMin:2,paceSec:0,rest:0,reps:1},
  ], startHour:8, startMinute:0, startPeriod:'AM', date:'2026-04-14' },
};

const FRIENDS = [
  { id:'f1', name:'Sonia Kumar', initials:'SK', color:'#707CFF', weeklyDistance:12.4,
    lastActivity:{action:'hit a new PB',detail:'1:22/100m',time:'2h ago'} },
  { id:'f2', name:'Arjun Patel', initials:'AP', color:'#140C32', weeklyDistance:8.2,
    lastActivity:{action:'completed',detail:'4.2km endurance',time:'4h ago'} },
  { id:'f3', name:'Maya Chen', initials:'MC', color:'#D1DEDF', weeklyDistance:10.1,
    lastActivity:{action:'achieved',detail:'5-day streak',time:'6h ago'} },
];

const LEGENDS = [
  { id:'l1', name:'Katie Ledecky', specialty:'Distance Freestyle', badge:'Olympic Gold', pace:'1:02/100m', sets:[
    { name:'Olympic Distance Prep', drills:[
      {id:'kl1',type:'warmup',stroke:'Freestyle',distance:600,paceMin:1,paceSec:20,rest:15,reps:1},
      {id:'kl2',type:'main',stroke:'Freestyle',distance:400,paceMin:1,paceSec:5,rest:30,reps:6},
      {id:'kl3',type:'sprint',stroke:'Freestyle',distance:100,paceMin:0,paceSec:58,rest:45,reps:4},
      {id:'kl4',type:'cooldown',stroke:'Freestyle',distance:400,paceMin:1,paceSec:30,rest:0,reps:1},
    ], startHour:5, startMinute:30, startPeriod:'AM', date:'2026-04-19' },
    { name:'Endurance Base Builder', drills:[
      {id:'kl5',type:'warmup',stroke:'Freestyle',distance:800,paceMin:1,paceSec:25,rest:20,reps:1},
      {id:'kl6',type:'main',stroke:'Freestyle',distance:500,paceMin:1,paceSec:8,rest:25,reps:8},
      {id:'kl7',type:'cooldown',stroke:'Choice',distance:300,paceMin:1,paceSec:40,rest:0,reps:1},
    ], startHour:6, startMinute:0, startPeriod:'AM', date:'2026-04-19' },
  ]},
  { id:'l2', name:'Caeleb Dressel', specialty:'Sprint Butterfly', badge:'World Record', pace:'0:49/100m', sets:[
    { name:'Explosive Power Sprint', drills:[
      {id:'cd1',type:'warmup',stroke:'Freestyle',distance:400,paceMin:1,paceSec:30,rest:15,reps:1},
      {id:'cd2',type:'drill',stroke:'Butterfly',distance:50,paceMin:1,paceSec:10,rest:30,reps:6},
      {id:'cd3',type:'sprint',stroke:'Butterfly',distance:50,paceMin:0,paceSec:48,rest:60,reps:10},
      {id:'cd4',type:'sprint',stroke:'Freestyle',distance:25,paceMin:0,paceSec:22,rest:40,reps:8},
      {id:'cd5',type:'cooldown',stroke:'Backstroke',distance:200,paceMin:2,paceSec:0,rest:0,reps:1},
    ], startHour:7, startMinute:30, startPeriod:'AM', date:'2026-04-19' },
    { name:'Race Day Simulation', drills:[
      {id:'cd6',type:'warmup',stroke:'Freestyle',distance:300,paceMin:1,paceSec:35,rest:10,reps:1},
      {id:'cd7',type:'drill',stroke:'Butterfly',distance:50,paceMin:1,paceSec:5,rest:25,reps:4},
      {id:'cd8',type:'sprint',stroke:'Butterfly',distance:100,paceMin:0,paceSec:50,rest:120,reps:3},
      {id:'cd9',type:'cooldown',stroke:'Choice',distance:200,paceMin:2,paceSec:10,rest:0,reps:1},
    ], startHour:8, startMinute:0, startPeriod:'AM', date:'2026-04-19' },
  ]},
];

const COMPLETED_WORKOUT = {
  id:'cw1', date:'2026-04-17', name:'Morning Endurance', startTime:'6:30 AM', endTime:'7:22 AM',
  totalDistance:2400, totalDuration:3120, avgPace100m:86,
  sets:[
    { id:'cs1', type:'warmup', stroke:'Freestyle', targetDistance:400, targetPace:105, actualDistance:400, totalTimeSeconds:425, avgPace100m:106, restAfterSet:30,
      laps:[{n:1,t:55,p:110,r:5},{n:2,t:54,p:108,r:5},{n:3,t:52,p:104,r:5},{n:4,t:53,p:106,r:5},{n:5,t:51,p:102,r:5},{n:6,t:52,p:104,r:5},{n:7,t:51,p:102,r:5},{n:8,t:52,p:104,r:5}] },
    { id:'cs2', type:'main', stroke:'Freestyle', targetDistance:1200, targetPace:85, actualDistance:1200, totalTimeSeconds:1065, avgPace100m:89, restAfterSet:45,
      laps:[{n:1,t:43,p:86,r:8},{n:2,t:44,p:88,r:8},{n:3,t:45,p:90,r:8},{n:4,t:44,p:88,r:8},{n:5,t:46,p:92,r:8},{n:6,t:47,p:94,r:8},{n:7,t:45,p:90,r:8},{n:8,t:44,p:88,r:8},{n:9,t:43,p:86,r:8},{n:10,t:44,p:88,r:8},{n:11,t:46,p:92,r:8},{n:12,t:45,p:90,r:8},{n:13,t:44,p:88,r:8},{n:14,t:45,p:90,r:8},{n:15,t:46,p:92,r:8},{n:16,t:47,p:94,r:8},{n:17,t:44,p:88,r:8},{n:18,t:45,p:90,r:8},{n:19,t:43,p:86,r:8},{n:20,t:44,p:88,r:8},{n:21,t:45,p:90,r:8},{n:22,t:46,p:92,r:8},{n:23,t:44,p:88,r:8},{n:24,t:42,p:84,r:8}] },
    { id:'cs3', type:'sprint', stroke:'Freestyle', targetDistance:400, targetPace:72, actualDistance:400, totalTimeSeconds:345, avgPace100m:76, restAfterSet:60,
      laps:[{n:1,t:38,p:76,r:15},{n:2,t:37,p:74,r:15},{n:3,t:39,p:78,r:15},{n:4,t:38,p:76,r:15},{n:5,t:37,p:74,r:15},{n:6,t:36,p:72,r:15},{n:7,t:38,p:76,r:15},{n:8,t:37,p:74,r:15}] },
    { id:'cs4', type:'cooldown', stroke:'Backstroke', targetDistance:400, targetPace:120, actualDistance:400, totalTimeSeconds:485, avgPace100m:121, restAfterSet:0,
      laps:[{n:1,t:62,p:124,r:5},{n:2,t:60,p:120,r:5},{n:3,t:61,p:122,r:5},{n:4,t:60,p:120,r:5},{n:5,t:59,p:118,r:5},{n:6,t:61,p:122,r:5},{n:7,t:60,p:120,r:5},{n:8,t:61,p:122,r:5}] },
  ],
  aiSummary:'Strong workout with consistent pacing. Your warmup showed progressive improvement, dropping from 110s to 102s per 100m. The main set revealed slight fatigue between laps 5-6 and 15-16, but you recovered well and finished strong with an 84s final lap.',
  aiInsights:[
    'Mid-set pacing: You tend to slow down around the halfway point of longer sets. Consider mental checkpoints every 400m.',
    'Strong finishes: Your last 2-3 laps are consistently faster, showing good energy management.',
    'Sprint efficiency: Your 50m sprint times are excellent (72-78s/100m), indicating strong anaerobic capacity.',
    'Rest optimization: Consistent 8s rest. Try reducing to 6s on recovery days to build endurance.',
  ],
};

const CHALLENGES = [
  { id:'c1', title:'10km This Week', userProgress:68, userCurrent:6.8, goal:10, unit:'km',
    leaderboard:[{fid:'f1',pct:92,val:9.2,done:false},{fid:'f3',pct:78,val:7.8,done:false},{fid:'you',pct:68,val:6.8,done:false},{fid:'f2',pct:54,val:5.4,done:false}] },
  { id:'c2', title:'5-Day Streak', userProgress:80, userCurrent:4, goal:5, unit:'days',
    leaderboard:[{fid:'f2',pct:100,val:5,done:true},{fid:'you',pct:80,val:4,done:false},{fid:'f1',pct:60,val:3,done:false},{fid:'f3',pct:40,val:2,done:false}] },
];

// ─── STATE ───────────────────────────────────────────────────
let activeScreen = 'home';
let todaySet = null;
let setHistory = {...MOCK_HISTORY};
let selectedGhost = null;
let drills = [{id:'1',type:'warmup',stroke:'Freestyle',distance:400,paceMin:1,paceSec:45,rest:15,reps:1}];
let expandedDrill = null;
let startHour = 6, startMinute = 30, startPeriod = 'AM';
let setName = '';
let selectedDate = new Date();
let communityView = 'leaderboard';
let selectedChallenge = 'c1';
let viewingLegendId = null;

// ─── HELPERS ─────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const pad2 = n => String(n).padStart(2,'0');
const fmtPace = s => Math.floor(s/60)+':'+pad2(s%60);
const fmtDist = d => d>=1000 ? (d/1000).toFixed(1)+'km' : d+'m';
const todayStr = () => { const d=new Date(); return d.toISOString().split('T')[0]; };
const dateStr = d => d.toISOString().split('T')[0];
function displayDate(d) {
  const t = todayStr();
  const ds = dateStr(d);
  if(ds===t) return 'Today';
  const y = new Date(); y.setDate(y.getDate()-1);
  if(ds===dateStr(y)) return 'Yesterday';
  return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
}
function drillMeta(type) { return DRILL_TYPES.find(d=>d.value===type) || DRILL_TYPES[0]; }
function drillIcon(type) {
  const icons = {
    warmup:'<svg width="14" height="14" fill="none" stroke="#707CFF" stroke-width="1.5"><path d="M7 1C5 5 3 6.5 3 9a4 4 0 108 0C11 6.5 9 5 7 1Z"/></svg>',
    main:'<svg width="14" height="14" fill="none" stroke="#707CFF" stroke-width="1.5"><path d="M7 1C4 5 3 7 3 9.5C3 12 5 13 7 13s4-1 4-3.5C11 7 10 5 7 1Z"/></svg>',
    sprint:'<svg width="14" height="14" fill="none" stroke="#707CFF" stroke-width="1.5"><circle cx="7" cy="7" r="6"/><path d="M7 4v3l2.5 1.5"/></svg>',
    drill:'<svg width="14" height="14" fill="none" stroke="#707CFF" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/><circle cx="7" cy="7" r="2.5"/></svg>',
    cooldown:'<svg width="14" height="14" fill="none" stroke="#707CFF" stroke-width="1.5"><path d="M1 7c2-3 4-5 6-5s4 2 6 5c2 3 4 5 6 5"/></svg>',
    kick:'<svg width="14" height="14" fill="none" stroke="#707CFF" stroke-width="1.5"><path d="M3 7a4 4 0 108 0 4 4 0 10-8 0M7 3v8"/></svg>',
  };
  return icons[type] || icons.main;
}
function drillIconLg(type) {
  return drillIcon(type).replace(/width="14"/g,'width="18"').replace(/height="14"/g,'height="18"');
}

// ─── NAVIGATION ──────────────────────────────────────────────
function navTo(screen) {
  activeScreen = screen;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const scr = {home:'scrHome',train:'scrTrain',community:'scrCommunity',analytics:'scrAnalytics',profile:'scrProfile'}[screen];
  if(scr) $(scr).classList.add('active');

  // Update bottom nav
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === screen);
  });

  // Show/hide bottom nav for overlay screens
  $('bottomNav').style.display = '';

  // Render screen-specific content
  if(screen==='home') renderHome();
  if(screen==='train') renderTrain();
  if(screen==='community') renderCommunity();
  if(screen==='analytics') renderAnalytics();
}

// ─── HOME SCREEN ─────────────────────────────────────────────
function renderHome() {
  const el = $('homeWorkout');
  if(todaySet) {
    $('homeSetName').textContent = todaySet.name;
    $('homeSetTime').classList.remove('hidden');
    $('homeSetTime').querySelector('span').textContent = todaySet.startHour+':'+pad2(todaySet.startMinute)+' '+todaySet.startPeriod;
    const total = todaySet.drills.reduce((s,d)=>s+d.distance*d.reps,0);
    // Render drills
    $('homeDrills').innerHTML = todaySet.drills.map(d => {
      const m = drillMeta(d.type);
      return `<div class="drill-row">${drillIcon(d.type)}<span class="f12 cw50 f1">${m.label} — ${d.reps>1?d.reps+'×':''}${d.distance}m ${d.stroke}</span><span class="f10 cw20 tabular">${d.paceMin}:${pad2(d.paceSec)}</span></div>`;
    }).join('');
    $('homeDrillSummary').classList.remove('hidden');
    $('homeDrillSummary').textContent = todaySet.drills.length+' drills · '+fmtDist(total)+' total';
    $('homeNoSet').classList.add('hidden');
    $('homeWorkoutBtn').innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 9l4-4 2 2 4-4M8 3h3v3"/></svg>Pair Device to Start Workout<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h8m-3-3 3 3-3 3"/></svg>';
    $('homeWorkoutBtn').onclick = () => showSetOverview();
    $('homeReviewHint').classList.remove('hidden');
  } else {
    $('homeSetName').textContent = 'No set planned yet';
    $('homeSetTime').classList.add('hidden');
    $('homeDrills').innerHTML = '';
    $('homeDrillSummary').classList.add('hidden');
    $('homeNoSet').classList.remove('hidden');
    $('homeWorkoutBtn').innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>Plan Today\'s Set<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h8m-3-3 3 3-3 3"/></svg>';
    $('homeWorkoutBtn').onclick = () => navTo('train');
    $('homeReviewHint').classList.add('hidden');
  }
}

// ─── TRAIN SCREEN ────────────────────────────────────────────
function renderTrain() {
  // Date
  $('dateLabel').textContent = displayDate(selectedDate);
  const isToday = dateStr(selectedDate) === todayStr();
  $('btnDateNext').classList.toggle('dis', isToday);

  // Check if viewing past date with existing set
  const ds = dateStr(selectedDate);
  const isPast = selectedDate < new Date() && !isToday;
  const existing = ds===todayStr() ? todaySet : setHistory[ds] || null;

  if(isPast && existing) {
    renderPastSet(existing);
    return;
  }
  if(isPast && !existing) {
    renderNoPast();
    return;
  }

  // Today editing mode
  $('inputSetName').value = setName;
  updateTrainSummary();
  renderDrills();
  renderGhostSection();

  // Populate drill type picker
  $('drillTypeGrid').innerHTML = DRILL_TYPES.map(dt =>
    `<button class="dp-btn" onclick="addDrill('${dt.value}')">${drillIconLg(dt.value)}<span>${dt.label}</span></button>`
  ).join('');
}

function renderPastSet(set) {
  // We'll reuse the train screen but show read-only view
  const total = set.drills.reduce((s,d)=>s+d.distance*d.reps,0);
  const container = $('scrTrain');
  // For simplicity, navigate to a simplified view via the drills area
  // Actually let's just show the set details inline
  renderDrillsReadOnly(set);
}

function renderNoPast() {
  $('drillsList').innerHTML = `
    <div style="padding:64px 0;text-align:center">
      <div style="width:56px;height:56px;border-radius:16px;background:rgba(209,222,223,.2);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
        <svg width="24" height="24" fill="none" stroke="rgba(20,12,50,.15)" stroke-width="1.5"><rect x="2" y="3" width="20" height="18" rx="3"/><path d="M2 8h20M7 1v4M17 1v4"/></svg>
      </div>
      <div class="v-md c25">No set recorded</div>
      <div class="f10 c15 mt-1">Rest day or no data for this date</div>
    </div>`;
}

function renderDrillsReadOnly(set) {
  const total = set.drills.reduce((s,d)=>s+d.distance*d.reps,0);
  $('drillsList').innerHTML = `
    <div class="cw mb-4">
      <div class="flex jb ic mb-4">
        <div><div class="f9 c25" style="letter-spacing:.15em;margin-bottom:4px">COMPLETED SET</div><div class="v-xl c-dark">${set.name}</div></div>
        <span class="f10 c20">${set.startHour}:${pad2(set.startMinute)} ${set.startPeriod}</span>
      </div>
      <div class="g3 mb-5">
        <div class="st-bg"><div class="v-lg c-dark">${fmtDist(total).replace('km','').replace('m','')}</div><div class="f8 c20" style="letter-spacing:.05em">${total>=1000?'km':'m'}</div></div>
        <div class="st-bg"><div class="v-lg c-dark">${set.drills.length}</div><div class="f8 c20" style="letter-spacing:.05em">drills</div></div>
        <div class="st-bg"><div class="v-lg c-dark">${set.drills.reduce((s,d)=>s+d.reps,0)}</div><div class="f8 c20" style="letter-spacing:.05em">total reps</div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${set.drills.map((d,i) => {
          const m = drillMeta(d.type);
          return `<div class="drill-row-light"><span class="f10 c15" style="width:12px">${i+1}</span>${drillIcon(d.type)}<div class="f1"><span class="f12 c70">${m.label}</span><span class="f10 c25 ml-2">${d.reps>1?d.reps+'×':''}${d.distance}m ${d.stroke}</span></div><span class="f10 c20 tabular">${d.paceMin}:${pad2(d.paceSec)}</span></div>`;
        }).join('')}
      </div>
    </div>
    <button class="btn-accent-full" onclick="duplicateSet()">
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="8" rx="1"/><path d="M6 3V1h8v8h-2"/></svg>
      Duplicate to Today
    </button>`;
  // Store for duplicate
  window._pastSet = set;
}

function duplicateSet() {
  const set = window._pastSet;
  if(!set) return;
  drills = set.drills.map(d => ({...d, id:Date.now()+''+Math.random()}));
  setName = set.name + ' (copy)';
  startHour = set.startHour;
  startMinute = set.startMinute;
  startPeriod = set.startPeriod;
  selectedDate = new Date();
  renderTrain();
}

function updateTrainSummary() {
  const total = drills.reduce((s,d)=>s+d.distance*d.reps,0);
  const time = drills.reduce((s,d) => {
    const pace = d.paceMin*60+d.paceSec;
    return s + ((d.distance/100)*pace*d.reps) + (d.rest*d.reps);
  },0);
  $('trainTotal').textContent = fmtDist(total);
  $('trainTime').textContent = Math.floor(time/60)+' min';
  $('trainCount').textContent = drills.length;
  $('drillCountLabel').textContent = drills.length + ' drill' + (drills.length!==1?'s':'');
}

function renderDrills() {
  $('drillsList').innerHTML = drills.map((drill,i) => {
    const m = drillMeta(drill.type);
    const exp = expandedDrill === drill.id;
    return `
    <div class="drill-card">
      <button class="drill-hdr" onclick="toggleDrill('${drill.id}')">
        <div class="flex ic gap-1 c10"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 3v8M9 3v8"/></svg><span class="f10" style="width:16px">${i+1}</span></div>
        <div style="width:36px;height:36px;border-radius:12px;background:rgba(112,124,255,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0">${drillIconLg(drill.type)}</div>
        <div class="f1"><div class="f14 c-dark">${m.label}</div><div class="f10 c25 mt-1">${drill.reps>1?drill.reps+' × ':''}${drill.distance}m ${drill.stroke} · ${drill.paceMin}:${pad2(drill.paceSec)}/100m</div></div>
        <svg width="14" height="14" fill="none" stroke="rgba(20,12,50,.15)" stroke-width="1.5" style="transition:transform .2s;${exp?'transform:rotate(180deg)':''}"><polyline points="3,5 7,9 11,5"/></svg>
      </button>
      <div class="drill-body ${exp?'open':''}">
        <div class="mb-4"><div class="f9 c20 mb-2" style="letter-spacing:.15em">STROKE</div><div class="chips">${STROKES.map(s=>`<button class="chip ${drill.stroke===s?'chip-dark':'chip-off'}" onclick="setDrillStroke('${drill.id}','${s}')">${s}</button>`).join('')}</div></div>
        <div class="mb-4"><div class="f9 c20 mb-2" style="letter-spacing:.15em">DISTANCE</div><div class="chips">${DISTANCES.map(d=>`<button class="chip ${drill.distance===d?'chip-accent':'chip-off'}" onclick="setDrillDist('${drill.id}',${d})">${d}m</button>`).join('')}</div></div>
        <div class="g3 mb-4">
          <div><div class="f9 c20 mb-2" style="letter-spacing:.15em">REPS</div><div class="stepper"><button class="step-btn" onclick="adjDrill('${drill.id}','reps',-1)"><svg width="12" height="12" fill="none" stroke="rgba(20,12,50,.4)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val">${drill.reps}</span><button class="step-btn" onclick="adjDrill('${drill.id}','reps',1)"><svg width="12" height="12" fill="none" stroke="rgba(20,12,50,.4)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div></div>
          <div><div class="f9 c20 mb-2" style="letter-spacing:.15em">PACE /100m</div><div class="stepper"><button class="step-btn" onclick="adjDrillPace('${drill.id}',-5)"><svg width="12" height="12" fill="none" stroke="rgba(20,12,50,.4)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val" style="font-size:14px">${drill.paceMin}:${pad2(drill.paceSec)}</span><button class="step-btn" onclick="adjDrillPace('${drill.id}',5)"><svg width="12" height="12" fill="none" stroke="rgba(20,12,50,.4)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div></div>
          <div><div class="f9 c20 mb-2" style="letter-spacing:.15em">REST (s)</div><div class="stepper"><button class="step-btn" onclick="adjDrill('${drill.id}','rest',-5)"><svg width="12" height="12" fill="none" stroke="rgba(20,12,50,.4)" stroke-width="2"><line x1="2" y1="6" x2="10" y2="6"/></svg></button><span class="step-val" style="font-size:14px">${drill.rest}</span><button class="step-btn" onclick="adjDrill('${drill.id}','rest',5)"><svg width="12" height="12" fill="none" stroke="rgba(20,12,50,.4)" stroke-width="2"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg></button></div></div>
        </div>
        <button class="flex ic gap-1h" style="color:rgba(239,68,68,.6);font-size:10px;letter-spacing:.05em;background:none;border:none;cursor:pointer;padding-top:4px" onclick="removeDrill('${drill.id}')"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h8M4 3V2a1 1 0 011-1h2a1 1 0 011 1v1M5 5v4M7 5v4"/></svg>Remove Drill</button>
      </div>
    </div>`;
  }).join('');
  updateTrainSummary();
}

function toggleDrill(id) { expandedDrill = expandedDrill===id ? null : id; renderDrills(); }
function setDrillStroke(id,s) { drills.find(d=>d.id===id).stroke=s; renderDrills(); }
function setDrillDist(id,d) { drills.find(d2=>d2.id===id).distance=d; renderDrills(); }
function adjDrill(id,prop,delta) { const d=drills.find(d2=>d2.id===id); d[prop]=Math.max(prop==='reps'?1:0,d[prop]+delta); renderDrills(); }
function adjDrillPace(id,delta) {
  const d=drills.find(d2=>d2.id===id);
  let t=d.paceMin*60+d.paceSec+delta;
  t=Math.max(30,Math.min(300,t));
  d.paceMin=Math.floor(t/60); d.paceSec=t%60;
  renderDrills();
}
function removeDrill(id) { drills=drills.filter(d=>d.id!==id); if(expandedDrill===id)expandedDrill=null; renderDrills(); }
function addDrill(type) {
  const nd = {id:Date.now()+'',type,stroke:'Freestyle',distance:100,paceMin:1,paceSec:30,rest:15,reps:1};
  drills.push(nd); expandedDrill=nd.id;
  hideDrillPicker(); renderDrills();
}
function showDrillPicker() { $('btnAddDrill').parentElement.classList.add('hidden'); $('drillPickerPanel').classList.remove('hidden'); }
function hideDrillPicker() { $('btnAddDrill').parentElement.classList.remove('hidden'); $('drillPickerPanel').classList.add('hidden'); }

// Ghost
function renderGhostSection() {
  if(selectedGhost) {
    $('ghostEmpty').classList.add('hidden');
    $('ghostSelected').classList.remove('hidden');
    $('btnRemoveGhost').classList.remove('hidden');
    const isF = selectedGhost.type==='friend';
    const entity = isF ? FRIENDS.find(f=>f.id===selectedGhost.id) : LEGENDS.find(l=>l.id===selectedGhost.id);
    if(entity) {
      const initials = isF ? entity.initials : entity.name.split(' ').map(n=>n[0]).join('');
      const bg = isF ? entity.color : '#140C32';
      const textColor = (isF && entity.color==='#D1DEDF') ? '#140C32' : 'white';
      $('ghostSelected').innerHTML = `
        <div class="avatar-sm" style="background:${bg};color:${textColor}">${initials}</div>
        <div class="f1"><div class="f14 c-dark">${entity.name}</div><div class="f10 ${isF?'c25':'c-accent'}">${isF?'Friend':entity.badge}</div></div>`;
    }
  } else {
    $('ghostEmpty').classList.remove('hidden');
    $('ghostSelected').classList.add('hidden');
    $('btnRemoveGhost').classList.add('hidden');
  }
  $('ghostPicker').classList.add('hidden');
}
function showGhostPicker() {
  $('ghostPicker').classList.remove('hidden');
  $('ghostPicker').innerHTML = `
    <div class="f9 c20 mb-2" style="letter-spacing:.15em">SELECT FROM FRIENDS</div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
      ${FRIENDS.map(f => `
        <button class="flex ic gap-3 py-3 px-3 w100" style="background:rgba(243,241,238,.6);border-radius:12px;border:none;cursor:pointer;text-align:left" onclick="selectGhost('friend','${f.id}')">
          <div class="avatar-xs" style="background:${f.color};color:${f.color==='#D1DEDF'?'#140C32':'white'}">${f.initials}</div>
          <div class="f1"><div class="f12 c-dark">${f.name}</div><div class="f9 c20">${f.weeklyDistance}km this week</div></div>
        </button>`).join('')}
    </div>
    <div class="f9 c20 mb-2" style="letter-spacing:.15em">SELECT FROM LEGENDS</div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
      ${LEGENDS.map(l => `
        <button class="flex ic gap-3 py-3 px-3 w100" style="background:rgba(20,12,50,.05);border-radius:12px;border:none;cursor:pointer;text-align:left" onclick="selectGhost('legend','${l.id}')">
          <div class="avatar-xs" style="background:#140C32;color:white">${l.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="f1"><div class="f12 c-dark">${l.name}</div><div class="f9 c-accent">${l.badge}</div></div>
        </button>`).join('')}
    </div>
    <button class="w100 tc f10 c20" style="background:none;border:none;cursor:pointer;letter-spacing:.05em" onclick="document.getElementById('ghostPicker').classList.add('hidden')">Cancel</button>`;
}
function selectGhost(type, id) {
  if(selectedGhost && selectedGhost.type===type && selectedGhost.id===id) selectedGhost=null;
  else selectedGhost={type,id};
  renderGhostSection();
}
$('btnRemoveGhost').addEventListener('click', () => { selectedGhost=null; renderGhostSection(); });

// Save Set
function saveSet() {
  setName = $('inputSetName').value;
  todaySet = { name:setName||'Custom Set', drills:[...drills], startHour, startMinute, startPeriod, date:todayStr() };
  setHistory[todayStr()] = todaySet;
  navTo('home');
}
$('btnSaveSet').addEventListener('click', saveSet);
$('btnSaveSet2').addEventListener('click', saveSet);

// Time controls
$('hourUp').addEventListener('click', ()=>{ startHour = startHour>=12?1:startHour+1; $('hourVal').textContent=startHour; });
$('hourDown').addEventListener('click', ()=>{ startHour = startHour<=1?12:startHour-1; $('hourVal').textContent=startHour; });
$('minUp').addEventListener('click', ()=>{ startMinute = startMinute>=55?0:startMinute+5; $('minVal').textContent=pad2(startMinute); });
$('minDown').addEventListener('click', ()=>{ startMinute = startMinute<=0?55:startMinute-5; $('minVal').textContent=pad2(startMinute); });
$('btnAM').addEventListener('click', ()=>{ startPeriod='AM'; $('btnAM').className='ampm-btn on'; $('btnPM').className='ampm-btn off'; });
$('btnPM').addEventListener('click', ()=>{ startPeriod='PM'; $('btnPM').className='ampm-btn on'; $('btnAM').className='ampm-btn off'; });
$('btnDatePrev').addEventListener('click', ()=>{ selectedDate.setDate(selectedDate.getDate()-1); renderTrain(); });
$('btnDateNext').addEventListener('click', ()=>{ const t=new Date(); if(selectedDate<t){selectedDate.setDate(selectedDate.getDate()+1); renderTrain();} });
$('btnAddDrill').addEventListener('click', showDrillPicker);

// ─── SET OVERVIEW ────────────────────────────────────────────
function showSetOverview() {
  if(!todaySet) return;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $('scrSetOverview').classList.add('active');
  $('bottomNav').style.display='none';

  $('soName').textContent = todaySet.name || "Today's Set";
  $('soTime').textContent = todaySet.startHour+':'+pad2(todaySet.startMinute)+' '+todaySet.startPeriod;

  const total = todaySet.drills.reduce((s,d)=>s+d.distance*d.reps,0);
  const time = todaySet.drills.reduce((s,d)=>{const p=d.paceMin*60+d.paceSec; return s+((d.distance/100)*p*d.reps)+(d.rest*d.reps);},0);
  $('soStats').innerHTML = `
    <div class="st-dark"><div class="v-xl" style="color:white">${total>=1000?(total/1000).toFixed(1):total}</div><div class="f9 cw20 mt-1">${total>=1000?'km':'meters'}</div></div>
    <div class="st-dark"><div class="v-xl" style="color:white">${Math.floor(time/60)}</div><div class="f9 cw20 mt-1">est. min</div></div>
    <div class="st-dark"><div class="v-xl" style="color:white">${todaySet.drills.length}</div><div class="f9 cw20 mt-1">drills</div></div>`;

  // Ghost
  if(selectedGhost) {
    const isF = selectedGhost.type==='friend';
    const entity = isF ? FRIENDS.find(f=>f.id===selectedGhost.id) : LEGENDS.find(l=>l.id===selectedGhost.id);
    if(entity) {
      const initials = isF ? entity.initials : entity.name.split(' ').map(n=>n[0]).join('');
      const bg = isF ? entity.color : 'rgba(255,255,255,.1)';
      const textColor = (isF && entity.color==='#D1DEDF') ? '#140C32' : 'white';
      $('soGhost').style.display='';
      $('soGhost').innerHTML = `<div style="background:rgba(255,255,255,.06);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,.08)">
        <div class="flex ic gap-2 mb-3"><svg width="13" height="13" fill="none" stroke="#707CFF" stroke-width="1.5"><path d="M11 13v-1a4 4 0 00-4-4H5a4 4 0 00-4 4v1"/><circle cx="6" cy="4" r="3"/></svg><span class="f10 cw25" style="letter-spacing:.15em">RACING AGAINST</span></div>
        <div class="flex ic gap-3"><div class="avatar" style="background:${bg};color:${textColor};width:44px;height:44px;font-size:14px">${initials}</div><div class="f1"><div class="v-md" style="color:white">${entity.name}</div><div class="f12 cw25">${isF?entity.weeklyDistance+'km this week':entity.specialty}</div></div>${!isF&&entity.pace?`<span class="f12 cw40 tabular">${entity.pace}</span>`:''}</div>
      </div>`;
    }
  } else { $('soGhost').style.display='none'; }

  // Drills
  $('soDrills').innerHTML = todaySet.drills.map((d,i) => {
    const m = drillMeta(d.type);
    return `<div style="background:rgba(255,255,255,.04);border-radius:18px;padding:16px;border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:16px">
      <span class="f10 cw10" style="width:12px;text-align:center">${i+1}</span>
      <div style="width:40px;height:40px;border-radius:12px;background:rgba(112,124,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">${drillIconLg(d.type)}</div>
      <div class="f1"><div class="flex ic gap-2"><span class="f14" style="color:white">${m.label}</span><span class="f10 cw15">·</span><span class="f10 cw30">${d.stroke}</span></div><div class="f11 cw20 mt-1">${d.reps>1?d.reps+' × ':''}${d.distance}m @ ${d.paceMin}:${pad2(d.paceSec)}/100m${d.rest>0?' · '+d.rest+'s rest':''}</div></div>
    </div>`;
  }).join('');
}
function hideSetOverview() {
  $('scrSetOverview').classList.remove('active');
  navTo('home');
}

// ─── COMMUNITY ───────────────────────────────────────────────
function renderCommunity() {
  renderCommunityView();
  renderChallenges();
  renderLegends();
}
function setCommunityView(v) {
  communityView = v;
  $('tgLeaderboard').className = 'tg-btn '+(v==='leaderboard'?'on':'off');
  $('tgFriends').className = 'tg-btn '+(v==='activity'?'on':'off');
  renderCommunityView();
}
function renderCommunityView() {
  if(communityView==='leaderboard') {
    $('communityLeaderboard').classList.remove('hidden');
    $('communityFriends').classList.add('hidden');
    const sorted = [...FRIENDS].sort((a,b)=>b.weeklyDistance-a.weeklyDistance);
    $('communityLeaderboard').innerHTML = `<div class="sl mb-4" style="letter-spacing:.15em">WEEKLY RANKING</div>` +
      sorted.map((f,i) => {
        const rank=i+1;
        const isGhost = selectedGhost?.type==='friend'&&selectedGhost.id===f.id;
        const rankColor = rank===1?'#FFD700':rank===2?'#C0C0C0':rank===3?'#CD7F32':'rgba(20,12,50,.25)';
        const suffix = rank===1?'st':rank===2?'nd':rank===3?'rd':'th';
        return `<div class="lb-entry lb-other" style="margin-bottom:10px"><div style="width:24px;text-align:center"><span class="f12 tabular v" style="color:${rankColor}">${rank}<span class="f8">${suffix}</span></span></div><div class="avatar-sm" style="background:${f.color};color:${f.color==='#D1DEDF'?'#140C32':'white'}">${f.initials}</div><div class="f1"><div class="f14 c-dark">${f.name}</div><div class="f10 c25">${f.weeklyDistance}km this week</div></div><button class="badge-ghost ${isGhost?'active':'inactive'}" onclick="selectGhost('friend','${f.id}');renderCommunityView()">${isGhost?'<span class="flex ic gap-1"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1,6 4,9 10,3"/></svg>Ghost</span>':'<span class="flex ic gap-1"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 10v-1a3 3 0 00-3-3H5a3 3 0 00-3 3v1"/><circle cx="5.5" cy="3.5" r="2.5"/></svg>Race</span>'}</button></div>`;
      }).join('');
  } else {
    $('communityLeaderboard').classList.add('hidden');
    $('communityFriends').classList.remove('hidden');
    $('communityFriends').innerHTML = `<div class="sl mb-4" style="letter-spacing:.15em">YOUR FRIENDS</div>` +
      FRIENDS.map(f => {
        const isGhost = selectedGhost?.type==='friend'&&selectedGhost.id===f.id;
        return `<div class="flex is gap-3" style="margin-bottom:12px"><div class="avatar" style="background:${f.color};color:${f.color==='#D1DEDF'?'#140C32':'white'}">${f.initials}</div><div class="f1"><div class="flex jb ic mb-1"><span class="f14 c-dark">${f.name}</span><button class="badge-ghost ${isGhost?'active':'inactive'}" style="padding:4px 10px;font-size:9px" onclick="selectGhost('friend','${f.id}');renderCommunityView()">${isGhost?'Ghost':'Add'}</button></div><div class="f12 c40">${f.lastActivity.action} <span class="c-accent">${f.lastActivity.detail}</span></div><div class="f9 c20 mt-1">${f.lastActivity.time}</div></div></div>`;
      }).join('');
  }
}
function renderChallenges() {
  $('challengeTabs').innerHTML = CHALLENGES.map(c =>
    `<button class="ch-tab ${selectedChallenge===c.id?'on':'off'}" onclick="setChallenge('${c.id}')">${c.title}</button>`
  ).join('');
  const ch = CHALLENGES.find(c=>c.id===selectedChallenge)||CHALLENGES[0];
  $('challengeCard').innerHTML = `
    <div class="flex jb is mb-4"><div><div class="v-md c-dark">Your Progress</div><div class="f10 c25 mt-1">${ch.userCurrent} / ${ch.goal} ${ch.unit}</div></div><span class="v-2xl c-accent">${ch.userProgress}%</span></div>
    <div style="height:4px;background:var(--bg);border-radius:9999px;overflow:hidden;margin-bottom:20px"><div style="height:100%;background:var(--accent);border-radius:9999px;width:${ch.userProgress}%"></div></div>
    <div class="f9 c25 mb-3" style="letter-spacing:.15em">STANDINGS</div>
    ${ch.leaderboard.map((e,i) => {
      const isYou = e.fid==='you';
      const f = isYou?null:FRIENDS.find(fr=>fr.id===e.fid);
      return `<div class="lb-entry ${isYou?'lb-you':'lb-other'}" style="margin-bottom:8px">
        <span class="f10 c15 tabular" style="width:12px">${i+1}</span>
        ${isYou?`<div class="avatar-xs" style="background:var(--accent);color:white">You</div>`:
          `<div class="avatar-xs" style="background:${f?.color||'#D1DEDF'};color:${f?.color==='#D1DEDF'?'#140C32':'white'}">${f?.initials||'??'}</div>`}
        <div class="f1"><div class="f12 c-dark">${isYou?'You':f?.name||'Unknown'}</div><div class="f9 c20">${e.val} ${ch.unit}</div></div>
        ${e.done?'<span class="f9 text-green" style="background:#f0fdf4;padding:2px 8px;border-radius:9999px">Done</span>':''}
      </div>`;
    }).join('')}`;
}
function setChallenge(id) { selectedChallenge=id; renderChallenges(); }

function renderLegends() {
  $('legendsContainer').innerHTML = LEGENDS.map(l => `
    <div class="legend-card">
      <div class="flex jb is mb-1"><div><div class="v-md" style="color:white">${l.name}</div><div class="f12 cw25 mt-1">${l.specialty}</div></div><span class="badge-accent">${l.badge}</span></div>
      <div class="f10 cw15 mb-1">Pace: ${l.pace}</div>
      <div class="f10 cw25 mb-4">${l.sets.length} signature set${l.sets.length!==1?'s':''} available</div>
      <button class="btn-accent w100 flex ic jc gap-1h" style="padding:12px;font-size:12px" onclick="showLegendSets('${l.id}')">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="2" width="11" height="10" rx="2"/><path d="M1 5h11M4 1v2M9 1v2"/></svg>
        View Sets
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 2l5 5-5 5"/></svg>
      </button>
    </div>`).join('');
}

// ─── LEGEND SETS VIEWER ──────────────────────────────────────
function showLegendSets(legendId) {
  viewingLegendId = legendId;
  const legend = LEGENDS.find(l=>l.id===legendId);
  if(!legend) return;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $('scrLegendSets').classList.add('active');
  $('bottomNav').style.display='none';

  $('lsName').textContent = legend.name;
  $('lsSpecialty').textContent = legend.specialty;
  $('lsBadge').textContent = legend.badge;
  $('lsPace').textContent = 'Pace: '+legend.pace;

  const isRacing = selectedGhost?.type==='legend'&&selectedGhost.id===legendId;
  if(isRacing) {
    $('lsRacing').classList.remove('hidden');
    $('lsRacing').style.display='flex';
    $('lsRacingText').textContent = 'You are racing '+legend.name.split(' ')[0];
  } else { $('lsRacing').classList.add('hidden'); $('lsRacing').style.display='none'; }

  $('lsSets').innerHTML = legend.sets.map((set,idx) => {
    const total = set.drills.reduce((s,d)=>s+d.distance*d.reps,0);
    const time = set.drills.reduce((s,d)=>{const p=d.paceMin*60+d.paceSec; return s+((d.distance/100)*p*d.reps)+(d.rest*d.reps);},0);
    return `<div class="cw">
      <div class="flex jb is mb-4"><div><div class="f9 c25" style="letter-spacing:.15em;margin-bottom:4px">SIGNATURE SET ${idx+1}</div><div class="v-lg c-dark">${set.name}</div></div><div class="flex ic gap-1 f10 c20"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="5.5" cy="5.5" r="4.5"/><path d="M5.5 3v2.5l1.5 1"/></svg>${set.startHour}:${pad2(set.startMinute)} ${set.startPeriod}</div></div>
      <div class="g3 mb-5">
        <div class="st-bg"><div class="v-lg c-dark">${total>=1000?(total/1000).toFixed(1):total}</div><div class="f8 c20" style="letter-spacing:.05em">${total>=1000?'km':'m'}</div></div>
        <div class="st-bg"><div class="v-lg c-dark">${Math.floor(time/60)}</div><div class="f8 c20" style="letter-spacing:.05em">min</div></div>
        <div class="st-bg"><div class="v-lg c-dark">${set.drills.length}</div><div class="f8 c20" style="letter-spacing:.05em">drills</div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        ${set.drills.map((d,i) => `<div class="drill-row-light"><span class="f10 c15" style="width:12px">${i+1}</span>${drillIcon(d.type)}<div class="f1"><span class="f12 c70">${drillMeta(d.type).label}</span><span class="f10 c25 ml-2">${d.reps>1?d.reps+'×':''}${d.distance}m ${d.stroke}</span></div><span class="f10 c20 tabular">${d.paceMin}:${pad2(d.paceSec)}</span></div>`).join('')}
      </div>
      <div class="flex gap-2">
        <button class="f1 flex ic jc gap-2" style="background:white;border:1px solid var(--sage);color:var(--dark);padding:12px;border-radius:16px;font-size:12px;letter-spacing:.05em;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.03)" onclick="copyLegendSet('${legendId}',${idx})"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="8" rx="1"/><path d="M6 3V1h8v8h-2"/></svg>Copy Set</button>
        <button class="f1 flex ic jc gap-2" style="background:${isRacing?'var(--dark)':'var(--accent)'};color:white;padding:12px;border-radius:16px;font-size:12px;letter-spacing:.05em;cursor:pointer;border:none;${isRacing?'':'box-shadow:0 8px 24px rgba(112,124,255,.25)'}" onclick="toggleLegendGhost('${legendId}')">${isRacing?'<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1,7 5,11 12,4"/></svg>Racing This':'<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 12v-1a3 3 0 00-3-3H5a3 3 0 00-3 3v1"/><circle cx="6" cy="4" r="2.5"/></svg>Race This'}</button>
      </div>
    </div>`;
  }).join('');
}
function hideLegendSets() { $('scrLegendSets').classList.remove('active'); navTo('community'); }
function copyLegendSet(legendId, setIdx) {
  const legend = LEGENDS.find(l=>l.id===legendId);
  if(!legend) return;
  const set = legend.sets[setIdx];
  drills = set.drills.map(d=>({...d, id:Date.now()+''+Math.random()}));
  setName = set.name+' (Legend)';
  startHour = set.startHour; startMinute = set.startMinute; startPeriod = set.startPeriod;
  selectedDate = new Date();
  hideLegendSets();
  navTo('train');
}
function toggleLegendGhost(legendId) {
  if(selectedGhost?.type==='legend'&&selectedGhost.id===legendId) selectedGhost=null;
  else selectedGhost={type:'legend',id:legendId};
  showLegendSets(legendId);
}

// ─── ANALYTICS ───────────────────────────────────────────────
function renderAnalytics() {
  renderPaceChart();
  renderVolumeBars();
  renderHeatmap();
  renderDonut();
  renderPerfBars();
}
function setPeriod(p) {
  document.querySelectorAll('.period-btn').forEach(b => b.classList.toggle('on', b.textContent===p));
}

function renderPaceChart() {
  const pts = [92,88,85,87,83,85,82];
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const W=280, H=100;
  const pMin=Math.min(...pts), pMax=Math.max(...pts), range=pMax-pMin||1;
  const coords = pts.map((v,i)=>({x:(i/(pts.length-1))*W, y:H-((v-pMin)/range)*(H-16)-8}));
  // Smooth curve
  let d='M'+coords[0].x+','+coords[0].y;
  for(let i=0;i<coords.length-1;i++){
    const cp1x=coords[i].x+(coords[i+1].x-coords[i].x)/3;
    const cp2x=coords[i+1].x-(coords[i+1].x-coords[i].x)/3;
    d+=` C${cp1x},${coords[i].y} ${cp2x},${coords[i+1].y} ${coords[i+1].x},${coords[i+1].y}`;
  }
  const area=d+` L${W},${H} L0,${H} Z`;
  let svg = `<defs><linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#707CFF" stop-opacity="0.2"/><stop offset="100%" stop-color="#707CFF" stop-opacity="0"/></linearGradient></defs>`;
  svg += `<path d="${area}" fill="url(#aGrad)"/>`;
  svg += `<path d="${d}" fill="none" stroke="#707CFF" stroke-width="2" stroke-linecap="round"/>`;
  coords.forEach(p => { svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="white" stroke="#707CFF" stroke-width="2"/>`; });
  labels.forEach((l,i) => { svg += `<text x="${coords[i].x}" y="${H+14}" text-anchor="middle" font-size="8" fill="#140C32" opacity="0.2">${l}</text>`; });
  $('paceChart').innerHTML = svg;
}

function renderVolumeBars() {
  const bars = [{l:'W1',v:8.2},{l:'W2',v:10.5},{l:'W3',v:12.1},{l:'W4',v:14.3}];
  const max = Math.max(...bars.map(b=>b.value||b.v));
  $('volumeBars').innerHTML = bars.map(b =>
    `<div class="bar-col"><span class="f10 c50 v">${b.v}</span><div class="bar-fill" style="height:${(b.v/max)*75}%"></div><span class="f9 c20">${b.l}</span></div>`
  ).join('');
}

function renderHeatmap() {
  const dots = [85,88,0,92,87,90,0,94,91,88,93,0,89,95,92,87,90,94,0,88,91,93,90,0,87,92,94,91,88,90];
  $('heatmapGrid').innerHTML = dots.map(v =>
    `<div class="hm-cell" style="background:${v===0?'var(--bg)':`rgba(112,124,255,${Math.max(0.15,v/100)})`}"></div>`
  ).join('');
}

function renderDonut() {
  const strokes = [{name:'Freestyle',pct:65,color:'#707CFF'},{name:'Backstroke',pct:20,color:'#A5AEFF'},{name:'Breaststroke',pct:10,color:'#D1DEDF'},{name:'Butterfly',pct:5,color:'#140C32'}];
  const circ = Math.PI*70;
  let offset=0, svg='';
  strokes.forEach(s => {
    const dash=(s.pct/100)*circ;
    svg += `<circle cx="50" cy="50" r="35" fill="none" stroke="${s.color}" stroke-width="8" stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${-offset}" stroke-linecap="round"/>`;
    offset += dash;
  });
  $('donutChart').innerHTML = svg;
  $('strokeLegend').innerHTML = strokes.map(s =>
    `<div class="flex jb ic"><div class="flex ic gap-2"><div style="width:8px;height:8px;border-radius:50%;background:${s.color}"></div><span class="f12 c50">${s.name}</span></div><span class="f12 c-dark v">${s.pct}%</span></div>`
  ).join('');
}

function renderPerfBars() {
  const metrics = [{l:'Speed',v:85},{l:'Endurance',v:78},{l:'Technique',v:90},{l:'Consistency',v:94},{l:'Turns',v:88},{l:'Recovery',v:72}];
  $('perfBars').innerHTML = metrics.map(m =>
    `<div class="perf-row"><div class="perf-header"><span class="f12 cw50">${m.l}</span><span class="v-md" style="color:white">${m.v}%</span></div><div class="prog-track-6"><div class="prog-fill-grad" style="width:${m.v}%"></div></div></div>`
  ).join('');
  $('overallScore').textContent = Math.round(metrics.reduce((s,m)=>s+m.v,0)/metrics.length)+'%';
}

// ─── WORKOUT REVIEW ──────────────────────────────────────────
function showWorkoutReview() {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $('scrWorkoutReview').classList.add('active');
  $('bottomNav').style.display='none';

  const w = COMPLETED_WORKOUT;
  $('wrSets').innerHTML = w.sets.map(set => {
    const m = drillMeta(set.type);
    const diff = set.avgPace100m - set.targetPace;
    const faster = diff<0;
    return `<button class="cw w100" style="text-align:left;border:none;cursor:pointer;padding:20px" onclick="showSetDetail('${set.id}')">
      <div class="flex is gap-4 mb-4">
        <div style="width:44px;height:44px;border-radius:16px;background:rgba(112,124,255,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0">${drillIconLg(set.type).replace(/width="18"/g,'width="20"').replace(/height="18"/g,'height="20"')}</div>
        <div class="f1"><div class="flex ic gap-2 mb-1"><span class="v-md c-dark">${m.label}</span><span class="f10 c15">•</span><span class="f10 c30">${set.stroke}</span></div><div class="f12 c40">${set.actualDistance}m · ${set.laps.length} laps</div></div>
        <svg width="16" height="16" fill="none" stroke="rgba(20,12,50,.15)" stroke-width="1.5" style="flex-shrink:0"><path d="M6 3l5 5-5 5"/></svg>
      </div>
      <div class="g3">
        <div class="st-bg"><div class="v-md c-dark">${Math.floor(set.totalTimeSeconds/60)}:${pad2(set.totalTimeSeconds%60)}</div><div class="f8 c20 mt-1" style="letter-spacing:.05em">duration</div></div>
        <div class="st-bg"><div class="v-md c-dark">${fmtPace(set.avgPace100m)}</div><div class="f8 c20 mt-1" style="letter-spacing:.05em">avg pace</div></div>
        <div class="st-bg"><div class="flex ic jc gap-1 ${faster?'text-green':'text-red'}"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="${faster?'1,8 5,4 9,2':'1,2 5,6 9,8'}"/></svg><span class="v-md">${Math.abs(diff)}s</span></div><div class="f8 c20 mt-1" style="letter-spacing:.05em">vs target</div></div>
      </div>
    </button>`;
  }).join('');

  $('wrInsights').innerHTML = w.aiInsights.map(i =>
    `<div class="flex gap-3"><div style="width:6px;height:6px;border-radius:50%;background:var(--accent);margin-top:6px;flex-shrink:0"></div><p class="f12 c50 lh-relaxed f1">${i}</p></div>`
  ).join('');
}
function hideWorkoutReview() {
  $('scrWorkoutReview').classList.remove('active');
  navTo('analytics');
}

// ─── SET DETAIL ──────────────────────────────────────────────
function showSetDetail(setId) {
  const w = COMPLETED_WORKOUT;
  const set = w.sets.find(s=>s.id===setId);
  if(!set) return;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $('scrSetDetail').classList.add('active');
  $('bottomNav').style.display='none';

  $('sdTitle').textContent = set.stroke+' · '+set.actualDistance+'m';
  $('sdSubtitle').textContent = set.laps.length+' laps × 50m';

  const diff = set.avgPace100m - set.targetPace;
  const faster = diff<0;
  const fastest = set.laps.reduce((m,l)=>l.p<m.p?l:m);
  const slowest = set.laps.reduce((m,l)=>l.p>m.p?l:m);
  const variance = slowest.p - fastest.p;
  const consistency = Math.max(0, 100-(variance/set.avgPace100m*100));

  $('sdStats').innerHTML = `
    <div class="st-sm"><div class="v-lg c-dark">${Math.floor(set.totalTimeSeconds/60)}:${pad2(set.totalTimeSeconds%60)}</div><div class="f8 c20 mt-1">total</div></div>
    <div class="st-sm"><div class="v-lg c-dark">${fmtPace(set.avgPace100m)}</div><div class="f8 c20 mt-1">avg</div></div>
    <div class="st-sm ${faster?'border-green':diff>0?'border-red':''}"><div class="flex ic jc gap-1 ${faster?'text-green':'text-red'}"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="${faster?'1,9 6,4 11,2':'1,2 6,7 11,9'}"/></svg><span class="v-lg">${Math.abs(diff)}s</span></div><div class="f8 c20 mt-1">vs target</div></div>
    <div class="st-sm"><div class="v-lg c-dark">${consistency.toFixed(0)}%</div><div class="f8 c20 mt-1">consist.</div></div>`;

  // Lap chart
  renderLapChart(set);

  // Fastest/Slowest
  $('sdFastSlow').innerHTML = `
    <div class="cw" style="padding:20px"><div class="flex ic gap-2 mb-3"><svg width="14" height="14" fill="none" stroke="#16a34a" stroke-width="1.5"><circle cx="7" cy="7" r="5"/><path d="M7 4v6M4.5 7h5"/></svg><span class="f10 c25" style="letter-spacing:.15em">FASTEST LAP</span></div><div class="v-2xl text-green mb-1">#${fastest.n}</div><div class="f12 c40">${fastest.t}s · ${fmtPace(fastest.p)}/100m</div></div>
    <div class="cw" style="padding:20px"><div class="flex ic gap-2 mb-3"><svg width="14" height="14" fill="none" stroke="#ef4444" stroke-width="1.5"><circle cx="7" cy="7" r="5"/><path d="M7 4v3M7 9v.5"/></svg><span class="f10 c25" style="letter-spacing:.15em">SLOWEST LAP</span></div><div class="v-2xl text-red mb-1">#${slowest.n}</div><div class="f12 c40">${slowest.t}s · ${fmtPace(slowest.p)}/100m</div></div>`;

  // Split analysis
  const half = Math.floor(set.laps.length/2);
  const firstAvg = set.laps.slice(0,half).reduce((s,l)=>s+l.p,0)/half;
  const secAvg = set.laps.slice(half).reduce((s,l)=>s+l.p,0)/(set.laps.length-half);
  const fadeDiff = secAvg-firstAvg;
  $('sdSplits').innerHTML = `
    <div class="sl mb-4" style="letter-spacing:.15em">SPLIT ANALYSIS</div>
    <div style="display:flex;flex-direction:column">
      <div class="flex jb ic" style="padding:8px 0"><span class="f12 c50">First Half Avg</span><span class="v-md c-dark">${fmtPace(Math.round(firstAvg))}/100m</span></div>
      <div class="flex jb ic" style="padding:8px 0;border-top:1px solid var(--bg)"><span class="f12 c50">Second Half Avg</span><span class="v-md c-dark">${fmtPace(Math.round(secAvg))}/100m</span></div>
      <div class="flex jb ic" style="padding:8px 0;border-top:1px solid var(--bg)"><span class="f12 c50">Pace Differential</span><div class="flex ic gap-1 v-md ${fadeDiff<0?'text-green':fadeDiff>0?'text-red':'c-dark'}"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="${fadeDiff<0?'1,9 6,4 11,2':'1,2 6,7 11,9'}"/></svg>${Math.abs(fadeDiff).toFixed(1)}s</div></div>
      <div class="flex jb ic" style="padding:8px 0;border-top:1px solid var(--bg)"><span class="f12 c50">Avg Rest Between Laps</span><span class="v-md c-dark">${(set.laps.reduce((s,l)=>s+l.r,0)/set.laps.length).toFixed(1)}s</span></div>
    </div>`;

  // All laps
  $('sdLaps').innerHTML = set.laps.map(l => {
    const isFastest = l.n===fastest.n;
    const isSlowest = l.n===slowest.n;
    return `<div class="lap-row ${isFastest?'lap-fastest':isSlowest?'lap-slowest':'lap-normal'}">
      <span class="f10 c20" style="width:32px">#${l.n}</span>
      <span class="f12 c-dark tabular f1">${l.t}s</span>
      <span class="f12 c40 tabular" style="width:64px;text-align:right">${fmtPace(l.p)}</span>
      <span class="f10 c20" style="width:48px;text-align:right">+${l.r}s</span>
      ${isFastest?'<svg width="12" height="12" fill="none" stroke="#16a34a" stroke-width="1.5" style="margin-left:8px"><circle cx="6" cy="6" r="5"/><path d="M6 4v4M4 6h4"/></svg>':''}
      ${isSlowest?'<svg width="12" height="12" fill="none" stroke="#ef4444" stroke-width="1.5" style="margin-left:8px"><circle cx="6" cy="6" r="5"/><path d="M6 3v3M6 8v.5"/></svg>':''}
    </div>`;
  }).join('');

  // Insights
  const insights = [];
  if(fadeDiff>5) insights.push(`Significant pace fade: ${fadeDiff.toFixed(1)}s slower in second half.`);
  else if(fadeDiff<-3) insights.push(`Negative split! ${Math.abs(fadeDiff).toFixed(1)}s faster in second half.`);
  else insights.push(`Excellent pacing consistency (${Math.abs(fadeDiff).toFixed(1)}s variation).`);
  if(consistency>90) insights.push(`Outstanding consistency score of ${consistency.toFixed(0)}%.`);
  $('sdInsights').innerHTML = `
    <div class="flex ic gap-2 mb-4"><div style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center"><svg width="11" height="11" fill="none" stroke="white" stroke-width="1.5"><path d="M5.5 1v1M5.5 9v1M1 5.5h1M9 5.5h1"/></svg></div><span class="f10" style="color:rgba(255,255,255,.4);letter-spacing:.15em">COACHING INSIGHTS</span></div>
    ${insights.map(i=>`<div class="flex gap-3"><div style="width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);margin-top:8px;flex-shrink:0"></div><p class="f14 lh-relaxed f1 fw300" style="color:rgba(255,255,255,.95)">${i}</p></div>`).join('')}
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1)"><div class="f10 cw30 mb-2" style="letter-spacing:.05em">NEXT STEPS</div><p class="f12 lh-relaxed fw300" style="color:rgba(255,255,255,.7)">Focus on maintaining pace consistency in the middle portion. Your data shows you have the capacity — train your mind to stay locked in when fatigue sets in.</p></div>`;
}

function renderLapChart(set) {
  const laps = set.laps;
  const W=320, H=180, padT=10, padB=20, padL=30, padR=10;
  const cw=W-padL-padR, ch=H-padT-padB;
  const paces = laps.map(l=>l.p);
  const pMin=Math.min(...paces)-5, pMax=Math.max(...paces)+5;
  const range=pMax-pMin||1;
  const coords = laps.map((l,i)=>({
    x: padL+(i/(laps.length-1))*cw,
    y: padT+(1-(l.p-pMin)/range)*ch
  }));

  let svg = '';
  // Grid lines
  for(let i=0;i<5;i++){
    const y = padT + (i/4)*ch;
    svg += `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="#F3F1EE" stroke-width="1"/>`;
  }
  // Target line
  const ty = padT+(1-(set.targetPace-pMin)/range)*ch;
  svg += `<line x1="${padL}" y1="${ty}" x2="${W-padR}" y2="${ty}" stroke="#707CFF" stroke-width="1" stroke-dasharray="5,5" opacity="0.3"/>`;
  svg += `<text x="${W-padR}" y="${ty-4}" text-anchor="end" font-size="9" fill="#707CFF" opacity="0.6">Target</text>`;

  // Line
  let d = 'M'+coords[0].x+','+coords[0].y;
  for(let i=0;i<coords.length-1;i++){
    const cp1x=coords[i].x+(coords[i+1].x-coords[i].x)/3;
    const cp2x=coords[i+1].x-(coords[i+1].x-coords[i].x)/3;
    d += ` C${cp1x},${coords[i].y} ${cp2x},${coords[i+1].y} ${coords[i+1].x},${coords[i+1].y}`;
  }
  svg += `<path d="${d}" fill="none" stroke="#707CFF" stroke-width="3" stroke-linecap="round"/>`;
  coords.forEach(p => { svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#707CFF"/>`; });

  // X labels (sparse)
  laps.forEach((l,i) => {
    if(i%Math.ceil(laps.length/8)===0 || i===laps.length-1) {
      svg += `<text x="${coords[i].x}" y="${H-2}" text-anchor="middle" font-size="8" fill="#140C32" opacity="0.2">${l.n}</text>`;
    }
  });
  // Y labels
  for(let i=0;i<5;i++){
    const v = pMin + (1-i/4)*range;
    const y = padT+(i/4)*ch;
    svg += `<text x="${padL-4}" y="${y+3}" text-anchor="end" font-size="8" fill="#140C32" opacity="0.2">${Math.round(v)}</text>`;
  }

  $('lapChart').innerHTML = svg;
}

function hideSetDetail() {
  $('scrSetDetail').classList.remove('active');
  showWorkoutReview();
}

// ─── INIT ────────────────────────────────────────────────────
renderHome();
renderAnalytics();
