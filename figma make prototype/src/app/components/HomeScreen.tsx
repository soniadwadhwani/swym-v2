import { Wifi, Zap, ChevronRight, ChevronDown, Waves, Flame, TrendingUp, Clock, Droplets, ArrowRight, Heart, Target, Gauge, Moon, Sparkles, Plus } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import waterVideo from '../../imports/water.mp4';
import type { PlannedSet } from '../App';

const DRILL_META: Record<string, { label: string; Icon: typeof Heart }> = {
  warmup: { label: 'Warmup', Icon: Heart },
  main: { label: 'Main Set', Icon: Flame },
  sprint: { label: 'Sprint', Icon: Gauge },
  drill: { label: 'Technique', Icon: Target },
  cooldown: { label: 'Cooldown', Icon: Waves },
  kick: { label: 'Kick Set', Icon: Droplets },
};

interface HomeScreenProps {
  todaySet?: PlannedSet | null;
  onCreateSet?: () => void;
  onStartWorkout?: () => void;
}

export function HomeScreen({ todaySet, onCreateSet, onStartWorkout }: HomeScreenProps) {
  const totalDistance = todaySet
    ? todaySet.drills.reduce((s, d) => s + d.distance * d.reps, 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#F3F1EE] pb-28">
      {/* ========== IMMERSIVE VIDEO HERO ========== */}
      <div className="relative h-[100svh] overflow-hidden flex flex-col">
        <video
          key="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          src={waterVideo}
          onLoadedData={(e) => {
            const video = e.target as HTMLVideoElement;
            video.play().catch(() => {});
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140C32]/60 via-[#140C32]/40 to-[#140C32]/90" />

        <div className="relative z-10 flex items-center justify-between px-6 pt-14">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-white/80 text-[10px] tracking-wide">Ring Not Paired</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
            <Wifi size={12} className="text-white/70" />
            <span className="text-white/80 text-[10px]">UWB Ready</span>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
          <img src={swymLogo} alt="SWYM" className="w-44 mb-4 drop-shadow-2xl brightness-110" />
          <div className="text-white/60 text-xs tracking-[0.3em] mb-10 font-light">SWIM YOUR PACE</div>

          {/* Last Swim Performance */}
          <div className="bg-white/8 backdrop-blur-xl rounded-[28px] p-6 border border-white/12 w-full max-w-[300px] mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white/30 text-[10px] tracking-[0.2em]">LAST SWIM</div>
              <div className="text-white/20 text-[10px]">2 days ago</div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-2xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>2.4</div>
                <div className="text-white/25 text-[9px] mt-0.5">km</div>
              </div>
              <div className="text-center border-x border-white/8">
                <div className="text-2xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>1:26</div>
                <div className="text-white/25 text-[9px] mt-0.5">/100m avg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>48</div>
                <div className="text-white/25 text-[9px] mt-0.5">laps</div>
              </div>
            </div>
            <div className="pt-3 border-t border-white/6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-[#707CFF]" />
                  <span className="text-[#707CFF] text-[10px]">Pace improving</span>
                </div>
                <span className="text-white/20 text-[10px]">-3s this week</span>
              </div>
            </div>
          </div>

          {/* Streak + Next */}
          <div className="flex items-center gap-3 mb-8 w-full max-w-[300px]">
            <div className="flex-1 bg-white/8 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/8 flex items-center gap-2">
              <Flame size={14} className="text-orange-400" />
              <span className="text-white text-xs" style={{ fontFamily: 'Comfortaa, sans-serif' }}>5 day streak</span>
            </div>
            <div className="flex-1 bg-white/8 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/8 flex items-center gap-2">
              <Clock size={14} className="text-white/40" />
              <span className="text-white text-xs" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Next: Tomorrow</span>
            </div>
          </div>

          <button className="bg-[#707CFF] text-white px-12 py-4 rounded-full text-sm tracking-wide shadow-2xl shadow-[#707CFF]/40 active:scale-95 transition-transform flex items-center gap-2">
            <Wifi size={16} />
            Pair Your Device
          </button>
        </div>

        <div className="relative z-10 flex flex-col items-center pb-8">
          <ChevronDown size={20} className="text-white/30 animate-bounce" />
        </div>
      </div>

      {/* ========== DASHBOARD ========== */}

      {/* This Month */}
      <div className="relative -mt-6 mx-5 bg-white rounded-[28px] p-6 shadow-xl shadow-black/5 z-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[#140C32]/30 text-[10px] tracking-[0.15em]">THIS MONTH</div>
            <div className="text-4xl text-[#140C32] tracking-tight mt-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              12,480<span className="text-lg text-[#140C32]/30 ml-1">m</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#707CFF]/8 flex items-center justify-center">
            <Waves size={20} className="text-[#707CFF]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '7', unit: '', label: 'Sessions' },
            { value: '1:24', unit: '', label: 'Best /100m' },
            { value: '94', unit: '%', label: 'Consistency' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-xl text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {stat.value}<span className="text-xs text-[#140C32]/30">{stat.unit}</span>
              </div>
              <div className="text-[9px] text-[#140C32]/30 mt-0.5 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {/* Today's Workout — dynamic based on whether a set exists */}
        <div className="bg-[#140C32] rounded-[24px] p-6 text-white">
          {todaySet ? (
            <>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-white/30 text-[10px] tracking-[0.15em] mb-1">TODAY'S WORKOUT</div>
                  <div className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {todaySet.name}
                  </div>
                </div>
                <div className="bg-white/8 rounded-full px-3 py-1 border border-white/8">
                  <span className="text-white/40 text-[10px]">
                    {todaySet.startHour}:{todaySet.startMinute.toString().padStart(2, '0')} {todaySet.startPeriod}
                  </span>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                {todaySet.drills.map((drill) => {
                  const meta = DRILL_META[drill.type] || DRILL_META.main;
                  return (
                    <div key={drill.id} className="flex items-center gap-3 py-2 px-3 bg-white/[0.04] rounded-xl">
                      <meta.Icon size={14} strokeWidth={1.5} className="text-[#707CFF] shrink-0" />
                      <span className="text-xs text-white/50 flex-1">
                        {meta.label} — {drill.reps > 1 ? `${drill.reps}×` : ''}{drill.distance}m {drill.stroke}
                      </span>
                      <span className="text-[10px] text-white/20 tabular-nums">
                        {drill.paceMin}:{drill.paceSec.toString().padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-white/15 text-[10px] mb-4">
                <span>{todaySet.drills.length} drills · {totalDistance >= 1000 ? `${(totalDistance / 1000).toFixed(1)}km` : `${totalDistance}m`} total</span>
              </div>
              <button
                onClick={onStartWorkout}
                className="w-full bg-[#707CFF] text-white py-3.5 rounded-2xl text-xs tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Wifi size={14} />
                Pair Device to Start Workout
                <ArrowRight size={14} className="ml-1" />
              </button>
              <div className="mt-3 text-center text-white/10 text-[9px]">
                Review your set before sending to SWYM Ring
              </div>
            </>
          ) : (
            <>
              <div className="text-white/30 text-[10px] tracking-[0.15em] mb-1">TODAY'S WORKOUT</div>
              <div className="text-lg text-white mb-4" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                No set planned yet
              </div>
              <div className="text-white/20 text-xs mb-5 leading-relaxed">
                Head to the Set Planner to build today's session, or choose from an AI-suggested workout below.
              </div>
              <button
                onClick={onCreateSet}
                className="w-full bg-[#707CFF] text-white py-3.5 rounded-2xl text-xs tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Plus size={14} />
                Plan Today's Set
                <ArrowRight size={14} className="ml-1" />
              </button>
            </>
          )}
        </div>

        {/* AI-Suggested Workouts */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[#707CFF]" />
              <span className="text-[10px] text-[#140C32]/40 tracking-[0.15em]">SUGGESTED FOR YOU</span>
            </div>
            <div className="flex items-center gap-0.5 text-[10px] text-[#707CFF]/50">
              <span>Based on your data</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Recovery Swim',
                reason: 'Your HRV is 12% below baseline — a low intensity session will aid recovery.',
                details: '800m · 4 drills · ~25 min',
                Icon: Heart,
                accent: 'bg-[#D1DEDF]/20',
                border: 'border-[#D1DEDF]/30',
              },
              {
                title: 'Sprint Power',
                reason: 'Your 50m sprint has plateaued at 0:38 — targeted sprints can break through.',
                details: '1.2km · 6 drills · ~35 min',
                Icon: Gauge,
                accent: 'bg-[#707CFF]/6',
                border: 'border-[#707CFF]/12',
              },
              {
                title: 'Endurance Builder',
                reason: 'Distance consistency is up 94% — push to 3km to build aerobic capacity.',
                details: '3.0km · 5 drills · ~55 min',
                Icon: Flame,
                accent: 'bg-[#140C32]',
                border: 'border-white/5',
              },
            ].map(item => (
              <div
                key={item.title}
                className={`${item.accent} rounded-[20px] p-5 border ${item.border}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.title === 'Endurance Builder' ? 'bg-white/6' : 'bg-white'
                  }`}>
                    <item.Icon size={18} strokeWidth={1.5} className="text-[#707CFF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm mb-1 ${item.title === 'Endurance Builder' ? 'text-white' : 'text-[#140C32]'}`}
                      style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                      {item.title}
                    </div>
                    <p className={`text-[11px] leading-relaxed ${
                      item.title === 'Endurance Builder' ? 'text-white/30' : 'text-[#140C32]/30'
                    }`}>
                      {item.reason}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] ${item.title === 'Endurance Builder' ? 'text-white/15' : 'text-[#140C32]/15'}`}>
                    {item.details}
                  </span>
                  <button
                    onClick={onCreateSet}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] tracking-wide active:scale-95 transition-transform ${
                      item.title === 'Endurance Builder'
                        ? 'bg-white/8 text-white/50'
                        : 'bg-[#140C32]/5 text-[#140C32]/40'
                    }`}
                  >
                    Use This
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Create Custom CTA */}
          <button
            onClick={onCreateSet}
            className="w-full mt-3 bg-[#707CFF] text-white py-4 rounded-2xl text-sm tracking-wide shadow-lg shadow-[#707CFF]/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Create Custom Set
          </button>
        </div>

        {/* Weekly Snapshot */}
        <div>
          <div className="text-[#140C32]/30 text-[10px] tracking-[0.15em] mb-3 px-1">WEEKLY SNAPSHOT</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '12.4', unit: 'km', label: 'Distance', change: '+2.1km' },
              { value: '1:18', unit: '', label: 'Best Split', change: '-4s' },
              { value: '94', unit: '%', label: 'Consistency', change: '+6%' },
              { value: '5', unit: '', label: 'Sessions', change: '+1' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-[20px] p-5 shadow-sm shadow-black/3">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-2xl text-[#140C32] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {stat.value}<span className="text-xs text-[#140C32]/20 ml-0.5">{stat.unit}</span>
                  </div>
                  <div className="flex items-center gap-0.5 bg-green-50 rounded-full px-1.5 py-0.5">
                    <TrendingUp size={9} className="text-green-600" />
                    <span className="text-[8px] text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className="text-[9px] text-[#140C32]/25 mt-0.5 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
          <div className="text-[#140C32]/25 text-[10px] tracking-[0.15em] mb-4">RECENT ACTIVITY</div>
          <div className="space-y-3">
            {[
              { day: 'Today', type: 'Rest Day', desc: 'Recovery recommended', Icon: Moon, accent: '#D1DEDF' },
              { day: 'Yesterday', type: 'Sprint Set', desc: '1.8km · 1:24/100m avg', Icon: Gauge, accent: '#707CFF' },
              { day: 'Mon', type: 'Endurance', desc: '3.2km · 1:32/100m avg', Icon: Flame, accent: '#140C32' },
            ].map(item => (
              <div key={item.day} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.accent}15` }}>
                  <item.Icon size={18} strokeWidth={1.5} style={{ color: item.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#140C32]">{item.type}</span>
                    <span className="text-[9px] text-[#140C32]/20">{item.day}</span>
                  </div>
                  <div className="text-[10px] text-[#140C32]/30 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Coach Insight */}
        <div className="bg-gradient-to-br from-[#707CFF] to-[#5A64D9] rounded-[24px] p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
              <Zap size={12} />
            </div>
            <span className="text-[10px] text-white/50 tracking-[0.15em]">AI COACH INSIGHT</span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            Your pace drops after lap 6. Adding 4x200m endurance intervals this week could improve your sustained power by ~8%.
          </p>
          <button className="flex items-center gap-1 text-[10px] text-white/40 mt-5 tracking-wide">
            VIEW FULL ANALYSIS <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
