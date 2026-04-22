import { ArrowLeft, Wifi, Edit3, Clock, Waves, Heart, Flame, Gauge, Target, Repeat, Users } from 'lucide-react';
import type { PlannedSet, Friend, Legend } from '../App';
import swymLogo from '../../imports/swym_logo-Photoroom.png';

const DRILL_META: Record<string, { label: string; Icon: typeof Heart }> = {
  warmup: { label: 'Warmup', Icon: Heart },
  main: { label: 'Main Set', Icon: Flame },
  sprint: { label: 'Sprint', Icon: Gauge },
  drill: { label: 'Technique', Icon: Target },
  cooldown: { label: 'Cooldown', Icon: Waves },
  kick: { label: 'Kick Set', Icon: Repeat },
};

interface SetOverviewScreenProps {
  set: PlannedSet;
  onBack: () => void;
  onEdit: () => void;
  selectedGhost?: { type: 'friend' | 'legend'; id: string } | null;
  friends?: Friend[];
  legends?: Legend[];
}

export function SetOverviewScreen({ set, onBack, onEdit, selectedGhost, friends = [], legends = [] }: SetOverviewScreenProps) {
  const ghost = selectedGhost
    ? selectedGhost.type === 'friend'
      ? friends.find(f => f.id === selectedGhost.id)
      : legends.find(l => l.id === selectedGhost.id)
    : null;
  const totalDistance = set.drills.reduce((s, d) => s + d.distance * d.reps, 0);
  const totalTime = set.drills.reduce((s, d) => {
    const pace = d.paceMin * 60 + d.paceSec;
    return s + ((d.distance / 100) * pace * d.reps) + (d.rest * d.reps);
  }, 0);
  const totalMin = Math.floor(totalTime / 60);

  return (
    <div className="min-h-screen bg-[#061922] pb-12">
      {/* Header */}
      <div className="px-5 pt-14 pb-8">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center active:scale-95 transition-transform">
            <ArrowLeft size={18} className="text-white/70" />
          </button>
          <img src={swymLogo} alt="SWYM" className="h-4 opacity-30" />
          <button onClick={onEdit} className="flex items-center gap-1.5 bg-white/8 rounded-full px-4 py-2.5 active:scale-95 transition-transform border border-white/6">
            <Edit3 size={13} className="text-white/50" />
            <span className="text-white/50 text-[10px] tracking-wide">Edit</span>
          </button>
        </div>

        <div className="text-white/25 text-[10px] tracking-[0.2em] mb-2">SET OVERVIEW</div>
        <h1 className="text-3xl text-white tracking-tight mb-2" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          {set.name || 'Today\'s Set'}
        </h1>
        <div className="flex items-center gap-2 text-white/20 text-xs">
          <Clock size={12} strokeWidth={1.5} />
          <span>{set.startHour}:{set.startMinute.toString().padStart(2, '0')} {set.startPeriod}</span>
        </div>
      </div>

      {/* Ghost Race Display */}
      {ghost && (
        <div className="px-5 mb-6">
          <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-3">
              <Users size={13} strokeWidth={1.5} className="text-[#61949B]" />
              <span className="text-white/25 text-[10px] tracking-[0.15em]">RACING AGAINST</span>
            </div>
            <div className="flex items-center gap-3">
              {selectedGhost?.type === 'friend' && 'color' in ghost ? (
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm shrink-0"
                  style={{
                    backgroundColor: ghost.color,
                    color: ghost.color === '#87ACAA' ? '#061922' : 'white',
                    fontFamily: 'Comfortaa, sans-serif',
                  }}
                >
                  {'initials' in ghost ? ghost.initials : '??'}
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-xs shrink-0" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {ghost.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="flex-1">
                <div className="text-white text-base" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {ghost.name}
                </div>
                <div className="text-white/25 text-xs">
                  {selectedGhost?.type === 'friend' && 'weeklyDistance' in ghost
                    ? `${ghost.weeklyDistance}km this week`
                    : 'specialty' in ghost
                    ? ghost.specialty
                    : ''}
                </div>
              </div>
              {'pace' in ghost && (
                <div className="text-white/40 text-xs tabular-nums">
                  {ghost.pace}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.06] text-center">
            <div className="text-xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {totalDistance >= 1000 ? `${(totalDistance / 1000).toFixed(1)}` : totalDistance}
            </div>
            <div className="text-white/20 text-[9px] mt-0.5 tracking-wide">{totalDistance >= 1000 ? 'km' : 'meters'}</div>
          </div>
          <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.06] text-center">
            <div className="text-xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {totalMin}
            </div>
            <div className="text-white/20 text-[9px] mt-0.5 tracking-wide">est. min</div>
          </div>
          <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.06] text-center">
            <div className="text-xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {set.drills.length}
            </div>
            <div className="text-white/20 text-[9px] mt-0.5 tracking-wide">drills</div>
          </div>
        </div>
      </div>

      {/* Drills Breakdown */}
      <div className="px-5 mb-8">
        <div className="text-white/15 text-[10px] tracking-[0.15em] mb-3">SET STRUCTURE</div>
        <div className="space-y-2">
          {set.drills.map((drill, i) => {
            const meta = DRILL_META[drill.type] || DRILL_META.main;
            return (
              <div key={drill.id} className="bg-white/[0.04] rounded-[18px] p-4 border border-white/[0.06] flex items-center gap-4">
                <div className="w-3 text-white/10 text-[10px] text-center">{i + 1}</div>
                <div className="w-10 h-10 rounded-xl bg-[#61949B]/10 flex items-center justify-center shrink-0">
                  <meta.Icon size={18} strokeWidth={1.5} className="text-[#61949B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{meta.label}</span>
                    <span className="text-[10px] text-white/15">·</span>
                    <span className="text-[10px] text-white/30">{drill.stroke}</span>
                  </div>
                  <div className="text-[11px] text-white/20 mt-0.5">
                    {drill.reps > 1 ? `${drill.reps} × ` : ''}{drill.distance}m @ {drill.paceMin}:{drill.paceSec.toString().padStart(2, '0')}/100m
                    {drill.rest > 0 ? ` · ${drill.rest}s rest` : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pair Device CTA */}
      <div className="px-5">
        <button className="w-full bg-[#61949B] text-white py-4 rounded-2xl text-sm tracking-wide shadow-xl shadow-[#61949B]/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2.5">
          <Wifi size={16} />
          Pair Device & Start
        </button>
        <p className="text-center text-white/10 text-[9px] mt-3">
          Your set will be synced to SWYM Ring via UWB
        </p>
      </div>
    </div>
  );
}
