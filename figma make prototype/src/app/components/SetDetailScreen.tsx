import { ChevronLeft, Zap, Clock, TrendingUp, TrendingDown, Award, Timer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import type { CompletedSet, CompletedWorkout } from '../App';

interface SetDetailScreenProps {
  workout: CompletedWorkout;
  setId: string;
  onBack: () => void;
}

export function SetDetailScreen({ workout, setId, onBack }: SetDetailScreenProps) {
  const set = workout.sets.find(s => s.id === setId);

  if (!set) {
    return null;
  }

  // Prepare chart data
  const chartData = set.laps.map((lap) => ({
    id: `lap-${lap.lapNumber}`,
    lap: lap.lapNumber,
    pace: lap.pace100m,
    time: lap.timeSeconds,
  }));

  // Calculate stats
  const fastestLap = set.laps.reduce((min, lap) =>
    lap.pace100m < min.pace100m ? lap : min
  );
  const slowestLap = set.laps.reduce((max, lap) =>
    lap.pace100m > max.pace100m ? lap : max
  );
  const avgRest = set.laps.reduce((sum, lap) => sum + lap.restAfter, 0) / set.laps.length;

  // Calculate pace variance
  const paceVariance = slowestLap.pace100m - fastestLap.pace100m;
  const consistencyScore = Math.max(0, 100 - (paceVariance / set.avgPace100m * 100));

  // Split analysis - detect pace fade
  const firstHalf = set.laps.slice(0, Math.floor(set.laps.length / 2));
  const secondHalf = set.laps.slice(Math.floor(set.laps.length / 2));
  const firstHalfAvg = firstHalf.reduce((sum, lap) => sum + lap.pace100m, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, lap) => sum + lap.pace100m, 0) / secondHalf.length;
  const paceFade = secondHalfAvg - firstHalfAvg;

  // AI insights for this set
  const setInsights: string[] = [];

  if (paceFade > 5) {
    setInsights.push(`Significant pace fade detected: ${paceFade.toFixed(1)}s slower in second half. Focus on pacing strategy and mid-set nutrition.`);
  } else if (paceFade < -3) {
    setInsights.push(`Negative split executed well! You were ${Math.abs(paceFade).toFixed(1)}s faster in the second half, showing excellent energy management.`);
  } else {
    setInsights.push(`Excellent pacing consistency throughout the set with minimal variation (${Math.abs(paceFade).toFixed(1)}s).`);
  }

  if (consistencyScore > 90) {
    setInsights.push(`Outstanding consistency score of ${consistencyScore.toFixed(0)}%. Your lap-to-lap variance is minimal.`);
  } else if (consistencyScore < 70) {
    setInsights.push(`Consistency score of ${consistencyScore.toFixed(0)}% suggests high lap variability. Try using a tempo trainer for more even splits.`);
  }

  if (avgRest < 7) {
    setInsights.push(`Aggressive rest intervals averaging ${avgRest.toFixed(1)}s. Great for building anaerobic capacity but ensure adequate recovery between sets.`);
  }

  const targetDiff = set.avgPace100m - set.targetPace;
  if (targetDiff < -5) {
    setInsights.push(`You exceeded target pace by ${Math.abs(targetDiff)}s! Excellent performance, but ensure you're not overtraining.`);
  } else if (targetDiff > 5) {
    setInsights.push(`${targetDiff}s slower than target. Consider adjusting target paces or reviewing technique and conditioning.`);
  }

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
            Back to Workout
          </button>
          <div className="text-white/20 text-[10px] tracking-[0.2em] mb-2">SET ANALYSIS</div>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            {set.stroke} · {set.actualDistance}m
          </h1>
          <div className="text-white/25 text-xs">
            {set.laps.length} laps × 50m
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-5 -mt-3 mb-5">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-[20px] p-3 shadow-sm shadow-black/3 text-center">
            <div className="text-lg text-[#140C32] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {Math.floor(set.totalTimeSeconds / 60)}:{(set.totalTimeSeconds % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-[8px] text-[#140C32]/20 tracking-wide mt-0.5">total</div>
          </div>
          <div className="bg-white rounded-[20px] p-3 shadow-sm shadow-black/3 text-center">
            <div className="text-lg text-[#140C32] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {Math.floor(set.avgPace100m / 60)}:{(set.avgPace100m % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-[8px] text-[#140C32]/20 tracking-wide mt-0.5">avg</div>
          </div>
          <div className={`bg-white rounded-[20px] p-3 shadow-sm shadow-black/3 text-center ${
            targetDiff < 0 ? 'border-2 border-green-500/20' : targetDiff > 0 ? 'border-2 border-red-500/20' : ''
          }`}>
            <div className={`text-lg tracking-tight flex items-center justify-center gap-0.5 ${
              targetDiff < 0 ? 'text-green-600' : targetDiff > 0 ? 'text-red-500' : 'text-[#140C32]'
            }`} style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {targetDiff < 0 ? (
                <TrendingDown size={13} strokeWidth={2} />
              ) : targetDiff > 0 ? (
                <TrendingUp size={13} strokeWidth={2} />
              ) : null}
              {Math.abs(targetDiff)}s
            </div>
            <div className="text-[8px] text-[#140C32]/20 tracking-wide mt-0.5">vs target</div>
          </div>
          <div className="bg-white rounded-[20px] p-3 shadow-sm shadow-black/3 text-center">
            <div className="text-lg text-[#140C32] tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {consistencyScore.toFixed(0)}%
            </div>
            <div className="text-[8px] text-[#140C32]/20 tracking-wide mt-0.5">consist.</div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Pace Chart */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[#140C32]/25 text-[10px] tracking-[0.15em]">LAP BY LAP PACE</div>
              <div className="text-sm text-[#140C32] mt-0.5" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Seconds per 100m
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F1EE" />
              <XAxis
                dataKey="lap"
                stroke="#140C32"
                opacity={0.2}
                fontSize={10}
                tickLine={false}
              />
              <YAxis
                stroke="#140C32"
                opacity={0.2}
                fontSize={10}
                tickLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#140C32',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: 'white',
                  padding: '8px 12px',
                  fontWeight: '300'
                }}
                labelStyle={{ color: '#707CFF', fontSize: '11px', marginBottom: '4px', fontWeight: '400' }}
                formatter={(value: number) => [`${value}s/100m`, 'Pace']}
                labelFormatter={(label) => `Lap ${label}`}
              />
              <ReferenceLine
                y={set.targetPace}
                stroke="#707CFF"
                strokeDasharray="5 5"
                opacity={0.3}
                label={{ value: 'Target', position: 'right', fill: '#707CFF', fontSize: 9 }}
              />
              <Line
                type="monotone"
                dataKey="pace"
                stroke="#707CFF"
                strokeWidth={3}
                dot={{ fill: '#707CFF', r: 4 }}
                activeDot={{ r: 6, fill: '#707CFF' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lap Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
            <div className="flex items-center gap-2 mb-3">
              <Award size={14} strokeWidth={1.5} className="text-green-600" />
              <span className="text-[10px] text-[#140C32]/25 tracking-[0.15em]">FASTEST LAP</span>
            </div>
            <div className="text-2xl text-green-600 mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              #{fastestLap.lapNumber}
            </div>
            <div className="text-xs text-[#140C32]/40">
              {fastestLap.timeSeconds}s · {Math.floor(fastestLap.pace100m / 60)}:{(fastestLap.pace100m % 60).toString().padStart(2, '0')}/100m
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
            <div className="flex items-center gap-2 mb-3">
              <Timer size={14} strokeWidth={1.5} className="text-red-500" />
              <span className="text-[10px] text-[#140C32]/25 tracking-[0.15em]">SLOWEST LAP</span>
            </div>
            <div className="text-2xl text-red-500 mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              #{slowestLap.lapNumber}
            </div>
            <div className="text-xs text-[#140C32]/40">
              {slowestLap.timeSeconds}s · {Math.floor(slowestLap.pace100m / 60)}:{(slowestLap.pace100m % 60).toString().padStart(2, '0')}/100m
            </div>
          </div>
        </div>

        {/* Split Analysis */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
          <div className="text-[#140C32]/25 text-[10px] tracking-[0.15em] mb-4">SPLIT ANALYSIS</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-[#140C32]/50">First Half Avg</span>
              <span className="text-sm text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {Math.floor(firstHalfAvg / 60)}:{(Math.round(firstHalfAvg) % 60).toString().padStart(2, '0')}/100m
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#F3F1EE]">
              <span className="text-xs text-[#140C32]/50">Second Half Avg</span>
              <span className="text-sm text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {Math.floor(secondHalfAvg / 60)}:{(Math.round(secondHalfAvg) % 60).toString().padStart(2, '0')}/100m
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#F3F1EE]">
              <span className="text-xs text-[#140C32]/50">Pace Differential</span>
              <div className={`flex items-center gap-1 text-sm ${
                paceFade < 0 ? 'text-green-600' : paceFade > 0 ? 'text-red-500' : 'text-[#140C32]'
              }`} style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {paceFade < 0 ? (
                  <TrendingDown size={14} strokeWidth={2} />
                ) : paceFade > 0 ? (
                  <TrendingUp size={14} strokeWidth={2} />
                ) : null}
                {Math.abs(paceFade).toFixed(1)}s
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#F3F1EE]">
              <span className="text-xs text-[#140C32]/50">Avg Rest Between Laps</span>
              <span className="text-sm text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {avgRest.toFixed(1)}s
              </span>
            </div>
          </div>
        </div>

        {/* Lap Breakdown Table */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
          <div className="text-[#140C32]/25 text-[10px] tracking-[0.15em] mb-4">ALL LAPS</div>
          <div className="space-y-1">
            {set.laps.map((lap) => {
              const isFastest = lap.lapNumber === fastestLap.lapNumber;
              const isSlowest = lap.lapNumber === slowestLap.lapNumber;

              return (
                <div
                  key={`lap-detail-${lap.lapNumber}`}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl ${
                    isFastest ? 'bg-green-50 border border-green-100' :
                    isSlowest ? 'bg-red-50 border border-red-100' :
                    'bg-[#F3F1EE]/60'
                  }`}
                >
                  <span className="text-[10px] text-[#140C32]/20 w-8">#{lap.lapNumber}</span>
                  <span className="text-xs text-[#140C32] tabular-nums flex-1">
                    {lap.timeSeconds}s
                  </span>
                  <span className="text-xs text-[#140C32]/40 tabular-nums w-16 text-right">
                    {Math.floor(lap.pace100m / 60)}:{(lap.pace100m % 60).toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-[#140C32]/20 w-12 text-right">
                    +{lap.restAfter}s
                  </span>
                  {isFastest && (
                    <Award size={12} className="text-green-600 ml-2" />
                  )}
                  {isSlowest && (
                    <Clock size={12} className="text-red-500 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-[#707CFF] to-[#5A64D9] rounded-[24px] p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-white/12 flex items-center justify-center">
              <Zap size={11} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-white/40 tracking-[0.15em]">COACHING INSIGHTS</span>
          </div>
          <div className="space-y-4">
            {setInsights.map((insight, idx) => (
              <div key={`set-insight-${idx}`} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                <p className="text-sm text-white/95 leading-relaxed flex-1 font-light">
                  {insight}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/30 tracking-wide mb-2">NEXT STEPS</div>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Focus on maintaining pace consistency in the middle portion of your sets. Your data shows you have the capacity—now it's about training your mind to stay locked in when fatigue sets in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
