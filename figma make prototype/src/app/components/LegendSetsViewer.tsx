import { ChevronLeft, Copy, Clock, Waves, UserPlus, Check } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import type { Legend, PlannedSet } from '../App';

interface LegendSetsViewerProps {
  legend: Legend;
  onBack: () => void;
  onCopySet: (set: PlannedSet) => void;
  selectedGhost: { type: 'friend' | 'legend'; id: string } | null;
  onSelectGhost: (type: 'friend' | 'legend', id: string) => void;
}

const DRILL_TYPE_MAP: Record<string, { label: string; icon: typeof Waves }> = {
  warmup: { label: 'Warmup', icon: Waves },
  main: { label: 'Main Set', icon: Waves },
  sprint: { label: 'Sprint', icon: Waves },
  drill: { label: 'Technique', icon: Waves },
  cooldown: { label: 'Cooldown', icon: Waves },
  kick: { label: 'Kick Set', icon: Waves },
};

export function LegendSetsViewer({ legend, onBack, onCopySet, selectedGhost, onSelectGhost }: LegendSetsViewerProps) {
  const isRacingLegend = selectedGhost?.type === 'legend' && selectedGhost.id === legend.id;
  return (
    <div className="min-h-screen bg-[#F3F1EE] pb-28">
      {/* Header */}
      <div className="bg-[#140C32] pt-14 pb-8 px-5 relative overflow-hidden">
        <div className="absolute right-4 top-14 opacity-10">
          <img src={swymLogo} alt="" className="h-6" />
        </div>
        <div className="relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 text-xs mb-4 active:scale-95 transition-transform"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Back
          </button>
          <div className="text-white/20 text-[10px] tracking-[0.2em] mb-2">LEGEND WORKOUTS</div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            {legend.name}
          </h1>
          <div className="text-white/25 text-xs">{legend.specialty}</div>
          <div className="flex items-center gap-2 mt-3">
            <div className="bg-[#707CFF]/15 text-[#707CFF] text-[9px] px-3 py-1 rounded-full tracking-wide">
              {legend.badge}
            </div>
            <div className="text-white/15 text-[10px]">Pace: {legend.pace}</div>
          </div>
          {isRacingLegend && (
            <div className="mt-4 bg-white/8 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Check size={14} strokeWidth={2} className="text-[#707CFF]" />
              <span className="text-white/70 text-xs">You are racing {legend.name.split(' ')[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sets */}
      <div className="px-5 -mt-3 space-y-4">
        {legend.sets.map((set, idx) => {
          const totalDistance = set.drills.reduce((s, d) => s + d.distance * d.reps, 0);
          const totalTime = set.drills.reduce((s, d) => {
            const pace = d.paceMin * 60 + d.paceSec;
            return s + ((d.distance / 100) * pace * d.reps) + (d.rest * d.reps);
          }, 0);
          const totalMin = Math.floor(totalTime / 60);

          return (
            <div key={idx} className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[#140C32]/25 text-[9px] tracking-[0.15em] mb-1">
                    SIGNATURE SET {idx + 1}
                  </div>
                  <div className="text-lg text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {set.name}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#140C32]/20">
                  <Clock size={11} strokeWidth={1.5} />
                  {set.startHour}:{set.startMinute.toString().padStart(2, '0')} {set.startPeriod}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-[#F3F1EE] rounded-xl p-3 text-center">
                  <div className="text-lg text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {totalDistance >= 1000 ? `${(totalDistance / 1000).toFixed(1)}` : totalDistance}
                  </div>
                  <div className="text-[8px] text-[#140C32]/20 tracking-wide">
                    {totalDistance >= 1000 ? 'km' : 'm'}
                  </div>
                </div>
                <div className="bg-[#F3F1EE] rounded-xl p-3 text-center">
                  <div className="text-lg text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {totalMin}
                  </div>
                  <div className="text-[8px] text-[#140C32]/20 tracking-wide">min</div>
                </div>
                <div className="bg-[#F3F1EE] rounded-xl p-3 text-center">
                  <div className="text-lg text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {set.drills.length}
                  </div>
                  <div className="text-[8px] text-[#140C32]/20 tracking-wide">drills</div>
                </div>
              </div>

              {/* Drills */}
              <div className="space-y-2 mb-4">
                {set.drills.map((drill, i) => {
                  const meta = DRILL_TYPE_MAP[drill.type] || DRILL_TYPE_MAP.main;
                  const Icon = meta.icon;
                  return (
                    <div
                      key={drill.id}
                      className="flex items-center gap-3 py-2 px-3 bg-[#F3F1EE]/60 rounded-xl"
                    >
                      <span className="text-[10px] text-[#140C32]/15 w-3">{i + 1}</span>
                      <Icon size={14} strokeWidth={1.5} className="text-[#707CFF] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-[#140C32]/70">{meta.label}</span>
                        <span className="text-[10px] text-[#140C32]/25 ml-2">
                          {drill.reps > 1 ? `${drill.reps}×` : ''}
                          {drill.distance}m {drill.stroke}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#140C32]/20 tabular-nums">
                        {drill.paceMin}:{drill.paceSec.toString().padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onCopySet(set)}
                  className="flex-1 bg-white border border-[#D1DEDF] text-[#140C32] py-3 rounded-2xl text-xs tracking-wide shadow-sm shadow-black/3 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <Copy size={13} strokeWidth={1.5} />
                  Copy Set
                </button>
                <button
                  onClick={() => onSelectGhost('legend', legend.id)}
                  className={`flex-1 py-3 rounded-2xl text-xs tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${
                    isRacingLegend
                      ? 'bg-[#140C32] text-white'
                      : 'bg-[#707CFF] text-white shadow-xl shadow-[#707CFF]/25'
                  }`}
                >
                  {isRacingLegend ? (
                    <>
                      <Check size={13} strokeWidth={2} />
                      Racing This
                    </>
                  ) : (
                    <>
                      <UserPlus size={13} strokeWidth={1.5} />
                      Race This
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
