import { ChevronLeft, Clock, Zap, TrendingUp, TrendingDown, ChevronRight, Heart, Flame, Gauge, Target, Waves, Repeat } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import type { CompletedWorkout } from '../App';

const DRILL_META: Record<string, { label: string; Icon: typeof Heart }> = {
  warmup: { label: 'Warmup', Icon: Heart },
  main: { label: 'Main Set', Icon: Flame },
  sprint: { label: 'Sprint', Icon: Gauge },
  drill: { label: 'Technique', Icon: Target },
  cooldown: { label: 'Cooldown', Icon: Waves },
  kick: { label: 'Kick Set', Icon: Repeat },
};

interface WorkoutReviewScreenProps {
  workout: CompletedWorkout;
  onBack: () => void;
  onViewSet: (setId: string) => void;
}

export function WorkoutReviewScreen({ workout, onBack, onViewSet }: WorkoutReviewScreenProps) {
  return (
    <div className="min-h-screen bg-[#CBC6B3] pb-28">
      {/* Header */}
      <div className="bg-[#061922] pt-14 pb-8 px-5 relative overflow-hidden">
        <div className="absolute right-4 top-14 opacity-10">
          <img src={swymLogo} alt="" className="h-6" />
        </div>
        <div className="relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 text-xs mb-4 active:scale-95 transition-transform"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Back to Analytics
          </button>
          <div className="text-white/20 text-[10px] tracking-[0.2em] mb-2">WORKOUT REVIEW</div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            {workout.name}
          </h1>
          <div className="flex items-center gap-3 text-white/25 text-xs">
            <div className="flex items-center gap-1.5">
              <Clock size={12} strokeWidth={1.5} />
              <span>{workout.startTime} - {workout.endTime}</span>
            </div>
            <span>•</span>
            <span>{new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-5 -mt-3 mb-5">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-[20px] p-4 shadow-sm shadow-black/3 text-center">
            <div className="text-xl text-[#061922] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {workout.totalDistance >= 1000
                ? `${(workout.totalDistance / 1000).toFixed(1)}`
                : workout.totalDistance}
            </div>
            <div className="text-[8px] text-[#061922]/20 tracking-wide mt-0.5">
              {workout.totalDistance >= 1000 ? 'km' : 'm'}
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-4 shadow-sm shadow-black/3 text-center">
            <div className="text-xl text-[#061922] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {Math.floor(workout.totalDuration / 60)}
            </div>
            <div className="text-[8px] text-[#061922]/20 tracking-wide mt-0.5">min</div>
          </div>
          <div className="bg-white rounded-[20px] p-4 shadow-sm shadow-black/3 text-center">
            <div className="text-xl text-[#061922] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {Math.floor(workout.avgPace100m / 60)}:{(workout.avgPace100m % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-[8px] text-[#061922]/20 tracking-wide mt-0.5">/100m</div>
          </div>
          <div className="bg-white rounded-[20px] p-4 shadow-sm shadow-black/3 text-center">
            <div className="text-xl text-[#061922] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {workout.sets.length}
            </div>
            <div className="text-[8px] text-[#061922]/20 tracking-wide mt-0.5">sets</div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* AI Summary */}
        <div className="bg-gradient-to-br from-[#61949B] to-[#87ACAA] rounded-[24px] p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-white/12 flex items-center justify-center">
              <Zap size={11} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-white/40 tracking-[0.15em]">YOUR SWIM STORY</span>
          </div>
          <p className="text-sm text-white/95 leading-relaxed font-light">
            {workout.aiSummary}
          </p>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/30 tracking-wide mb-2">WHAT THIS MEANS</div>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Your body is telling us you're building strong foundations. The progressive warmup shows your muscles are adapting well, and that powerful finish proves your mental game is elite-level.
            </p>
          </div>
        </div>

        {/* Sets Breakdown */}
        <div>
          <div className="text-[#061922]/25 text-[10px] tracking-[0.15em] mb-3 px-1">SET BREAKDOWN</div>
          <div className="space-y-3">
            {workout.sets.map((set, idx) => {
              const meta = DRILL_META[set.type] || DRILL_META.main;
              const Icon = meta.Icon;
              const targetDiff = set.avgPace100m - set.targetPace;
              const isFasterThanTarget = targetDiff < 0;

              return (
                <button
                  key={set.id}
                  onClick={() => onViewSet(set.id)}
                  className="w-full bg-white rounded-[24px] p-5 shadow-sm shadow-black/3 active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#61949B]/8 flex items-center justify-center shrink-0">
                      <Icon size={20} strokeWidth={1.5} className="text-[#61949B]" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-[#061922]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                          {meta.label}
                        </span>
                        <span className="text-[10px] text-[#061922]/15">•</span>
                        <span className="text-[10px] text-[#061922]/30">{set.stroke}</span>
                      </div>
                      <div className="text-xs text-[#061922]/40">
                        {set.actualDistance}m · {set.laps.length} laps
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-[#061922]/15 shrink-0" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#CBC6B3] rounded-xl p-3 text-center">
                      <div className="text-base text-[#061922]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        {Math.floor(set.totalTimeSeconds / 60)}:{(set.totalTimeSeconds % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-[8px] text-[#061922]/20 tracking-wide mt-0.5">duration</div>
                    </div>
                    <div className="bg-[#CBC6B3] rounded-xl p-3 text-center">
                      <div className="text-base text-[#061922]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        {Math.floor(set.avgPace100m / 60)}:{(set.avgPace100m % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-[8px] text-[#061922]/20 tracking-wide mt-0.5">avg pace</div>
                    </div>
                    <div className="bg-[#CBC6B3] rounded-xl p-3 text-center">
                      <div className={`flex items-center justify-center gap-0.5 ${
                        isFasterThanTarget ? 'text-green-600' : 'text-red-500'
                      }`}>
                        {isFasterThanTarget ? (
                          <TrendingDown size={12} strokeWidth={2} />
                        ) : (
                          <TrendingUp size={12} strokeWidth={2} />
                        )}
                        <span className="text-base" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                          {Math.abs(targetDiff)}s
                        </span>
                      </div>
                      <div className="text-[8px] text-[#061922]/20 tracking-wide mt-0.5">vs target</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm shadow-black/3">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} strokeWidth={1.5} className="text-[#61949B]" />
            <span className="text-[10px] text-[#061922]/25 tracking-[0.15em]">KEY INSIGHTS</span>
          </div>
          <div className="space-y-3">
            {workout.aiInsights.map((insight, idx) => (
              <div key={`workout-insight-${idx}`} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#61949B] mt-1.5 shrink-0" />
                <p className="text-xs text-[#061922]/60 leading-relaxed flex-1">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
