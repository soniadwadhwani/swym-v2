import { useState } from 'react';
import { Zap, Award, TrendingDown, TrendingUp, ChevronRight, Clock, Waves } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import type { CompletedWorkout } from '../App';

interface AnalyticsScreenProps {
  recentWorkout?: CompletedWorkout | null;
  onViewWorkout?: () => void;
}

export function AnalyticsScreen({ recentWorkout, onViewWorkout }: AnalyticsScreenProps) {
  const [period, setPeriod] = useState('W');

  // Pace trend data
  const pacePoints = [92, 88, 85, 87, 83, 85, 82];
  const paceLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const pMin = Math.min(...pacePoints);
  const pMax = Math.max(...pacePoints);
  const pRange = pMax - pMin || 1;

  const chartW = 280;
  const chartH = 100;
  const pts = pacePoints.map((v, i) => ({
    x: (i / (pacePoints.length - 1)) * chartW,
    y: chartH - ((v - pMin) / pRange) * (chartH - 16) - 8,
  }));

  // Smooth curve
  const buildCurve = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cp1x = points[i].x + (points[i + 1].x - points[i].x) / 3;
      const cp1y = points[i].y;
      const cp2x = points[i + 1].x - (points[i + 1].x - points[i].x) / 3;
      const cp2y = points[i + 1].y;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i + 1].x},${points[i + 1].y}`;
    }
    return d;
  };
  const curvePath = buildCurve(pts);
  const areaPath = `${curvePath} L${chartW},${chartH} L0,${chartH} Z`;

  // Distance bars
  const distBars = [
    { label: 'W1', value: 8.2 },
    { label: 'W2', value: 10.5 },
    { label: 'W3', value: 12.1 },
    { label: 'W4', value: 14.3 },
  ];
  const distMax = Math.max(...distBars.map(d => d.value));

  // Monthly consistency
  const monthDots = [
    85, 88, 0, 92, 87, 90, 0, 94, 91, 88, 93, 0, 89, 95, 92, 87, 90, 94, 0, 88, 91, 93, 90, 0, 87, 92, 94, 91, 88, 90
  ];

  // Radar
  const radarMetrics = [
    { label: 'Speed', value: 85 },
    { label: 'Endurance', value: 78 },
    { label: 'Technique', value: 90 },
    { label: 'Consistency', value: 94 },
    { label: 'Turns', value: 88 },
    { label: 'Recovery', value: 72 },
  ];
  const radarR = 65;
  const rc = 85;
  const rPts = radarMetrics.map((m, i) => {
    const a = (Math.PI * 2 * i) / radarMetrics.length - Math.PI / 2;
    const r = (m.value / 100) * radarR;
    return {
      x: rc + r * Math.cos(a), y: rc + r * Math.sin(a),
      lx: rc + (radarR + 16) * Math.cos(a), ly: rc + (radarR + 16) * Math.sin(a),
    };
  });
  const radarPoly = rPts.map(p => `${p.x},${p.y}`).join(' ');

  const strokes = [
    { name: 'Freestyle', pct: 65, color: '#61949B' },
    { name: 'Backstroke', pct: 20, color: '#A5AEFF' },
    { name: 'Breaststroke', pct: 10, color: '#87ACAA' },
    { name: 'Butterfly', pct: 5, color: '#061922' },
  ];

  return (
    <div className="min-h-screen bg-[#CBC6B3] pb-28">
      {/* Header */}
      <div className="bg-[#061922] pt-14 pb-14 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full border border-[#61949B]/8" />
        <div className="absolute -right-4 top-24 w-28 h-28 rounded-full border border-[#61949B]/5" />
        <div className="absolute right-5 top-14 opacity-8">
          <img src={swymLogo} alt="" className="h-5 opacity-20" />
        </div>

        <div className="relative z-10">
          <div className="text-white/20 text-[10px] tracking-[0.2em] mb-2">PERFORMANCE</div>
          <h1 className="text-3xl text-white mb-5" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Analytics
          </h1>
          <div className="flex bg-white/8 rounded-full p-0.5 w-fit border border-white/5">
            {['D', 'W', 'M'].map((t) => (
              <button
                key={`p-${t}`}
                onClick={() => setPeriod(t)}
                className={`px-5 py-1.5 rounded-full text-[10px] tracking-wide transition-all duration-300 ${
                  period === t ? 'bg-white text-[#061922]' : 'text-white/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 space-y-4">
        {/* Recent Workout Summary */}
        {recentWorkout && (
          <button
            onClick={onViewWorkout}
            className="w-full bg-[#061922] rounded-[24px] p-6 text-white shadow-xl shadow-black/10 active:scale-[0.98] transition-all hover:shadow-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/30 text-[10px] tracking-[0.15em]">LATEST SESSION</div>
              <ChevronRight size={16} strokeWidth={1.5} className="text-[#61949B]" />
            </div>
            <div className="mb-4">
              <div className="text-2xl text-white mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {recentWorkout.name}
              </div>
              <div className="text-xs text-white/40 font-light">
                {new Date(recentWorkout.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/[0.04] rounded-2xl p-3 border border-white/[0.06]">
                <div className="text-xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {recentWorkout.totalDistance >= 1000
                    ? `${(recentWorkout.totalDistance / 1000).toFixed(1)}`
                    : recentWorkout.totalDistance}
                </div>
                <div className="text-white/20 text-[9px] mt-0.5">
                  {recentWorkout.totalDistance >= 1000 ? 'km' : 'm'}
                </div>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-3 border border-white/[0.06]">
                <div className="text-xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {Math.floor(recentWorkout.totalDuration / 60)}
                </div>
                <div className="text-white/20 text-[9px] mt-0.5">min</div>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-3 border border-white/[0.06]">
                <div className="text-xl text-white tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {Math.floor(recentWorkout.avgPace100m / 60)}:{(recentWorkout.avgPace100m % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-white/20 text-[9px] mt-0.5">/100m</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-white/15 text-xs border-t border-white/[0.06] pt-4">
              <div className="flex items-center gap-2">
                <Clock size={12} strokeWidth={1.5} className="text-white/25" />
                <span>{recentWorkout.startTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves size={12} strokeWidth={1.5} className="text-white/25" />
                <span>{recentWorkout.sets.length} sets</span>
              </div>
              <span className="text-[#61949B] text-xs">View Full Analysis</span>
            </div>
          </button>
        )}

        {/* Pace Trends */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm shadow-black/3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[#061922]/25 text-[10px] tracking-[0.15em]">PACE EVOLUTION</div>
              <div className="text-[#061922] text-base mt-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Getting Faster
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 rounded-full px-3 py-1.5">
              <TrendingDown size={12} strokeWidth={2} className="text-green-600" />
              <span className="text-green-600 text-xs font-medium">10s faster</span>
            </div>
          </div>
          <div className="text-xs text-[#061922]/40 mb-4 font-light leading-relaxed">
            You've dropped 10 seconds off your average 100m pace this week. That's the equivalent of 2 full body lengths per lap.
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH + 18}`} className="w-full" style={{ height: 130 }}>
            <defs>
              <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#61949B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#61949B" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#aGrad)" />
            <path d={curvePath} fill="none" stroke="#61949B" strokeWidth="2" strokeLinecap="round" />
            {pts.map((p, i) => (
              <g key={`pd-${i}`}>
                <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#61949B" strokeWidth="2" />
              </g>
            ))}
            {paceLabels.map((l, i) => (
              <text key={`pl-${i}`} x={pts[i].x} y={chartH + 14} textAnchor="middle" fontSize="8" fill="#061922" opacity="0.2">
                {l}
              </text>
            ))}
          </svg>
        </div>

        {/* Weekly Distance */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm shadow-black/3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[#061922]/25 text-[10px] tracking-[0.15em]">VOLUME PROGRESSION</div>
              <div className="text-[#061922] text-base mt-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Building Endurance</div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#61949B]/8 rounded-full px-3 py-1.5">
              <TrendingUp size={12} strokeWidth={2} className="text-[#61949B]" />
              <span className="text-[#61949B] text-xs font-medium">75% increase</span>
            </div>
          </div>
          <div className="text-xs text-[#061922]/40 mb-4 font-light leading-relaxed">
            Your weekly distance has grown steadily from 8.2km to 14.3km. This sustainable progression builds aerobic base without risking injury.
          </div>
          <div className="flex items-end gap-3" style={{ height: 110 }}>
            {distBars.map((bar) => (
              <div key={`db-${bar.label}`} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-[#061922]/50" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {bar.value}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-[#61949B] to-[#A5AEFF] rounded-xl transition-all"
                  style={{ height: `${(bar.value / distMax) * 75}%` }}
                />
                <span className="text-[9px] text-[#061922]/20">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Consistency Heatmap */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm shadow-black/3">
          <div className="text-[#061922]/25 text-[10px] tracking-[0.15em] mb-1">TRAINING RHYTHM</div>
          <div className="text-[#061922] text-base mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>April 2026</div>
          <div className="text-xs text-[#061922]/40 mb-4 font-light leading-relaxed">
            Your consistency is building momentum. The darker the square, the harder you pushed that day.
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {monthDots.map((val, i) => (
              <div
                key={`md-${i}`}
                className="aspect-square rounded-md"
                style={{
                  backgroundColor: val === 0
                    ? '#CBC6B3'
                    : `rgba(112, 124, 255, ${Math.max(0.15, val / 100)})`,
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#CBC6B3]" />
              <span className="text-[8px] text-[#061922]/20">Rest</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#61949B]/30" />
              <span className="text-[8px] text-[#061922]/20">Light</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#61949B]" />
              <span className="text-[8px] text-[#061922]/20">Peak</span>
            </div>
          </div>
        </div>

        {/* Stroke Breakdown */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm shadow-black/3">
          <div className="text-[#061922]/25 text-[10px] tracking-[0.15em] mb-1">STROKE DIVERSITY</div>
          <div className="text-[#061922] text-base mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Your Mix</div>
          <div className="text-xs text-[#061922]/40 mb-5 font-light leading-relaxed">
            Freestyle dominates your training, building your aerobic engine. Consider adding more backstroke for recovery and injury prevention.
          </div>

          {/* Donut visual */}
          <div className="flex items-center gap-5 mb-5">
            <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90 shrink-0">
              {(() => {
                let offset = 0;
                return strokes.map((s) => {
                  const circumference = Math.PI * 70;
                  const dash = (s.pct / 100) * circumference;
                  const el = (
                    <circle
                      key={`donut-${s.name}`}
                      cx="50" cy="50" r="35"
                      fill="none" stroke={s.color} strokeWidth="8"
                      strokeDasharray={`${dash} ${circumference}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                    />
                  );
                  offset += dash;
                  return el;
                });
              })()}
            </svg>
            <div className="space-y-2 flex-1">
              {strokes.map((s) => (
                <div key={`sl-${s.name}`} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs text-[#061922]/50">{s.name}</span>
                  </div>
                  <span className="text-xs text-[#061922]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-[#061922] rounded-[24px] p-6">
          <div className="text-white/20 text-[10px] tracking-[0.15em] mb-1">PERFORMANCE PROFILE</div>
          <div className="text-white text-sm mb-5" style={{ fontFamily: 'Comfortaa, sans-serif' }}>6-Week Analysis</div>

          <div className="space-y-3">
            {radarMetrics.map((metric) => (
              <div key={`metric-${metric.label}`} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">{metric.label}</span>
                  <span className="text-sm text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {metric.value}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#61949B] to-[#A5AEFF] rounded-full transition-all"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/8">
            <div className="text-center">
              <div className="text-3xl text-white mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {Math.round(radarMetrics.reduce((sum, m) => sum + m.value, 0) / radarMetrics.length)}%
              </div>
              <div className="text-[10px] text-white/25 tracking-wide">OVERALL SCORE</div>
            </div>
          </div>
        </div>

        {/* PB Records */}
        <div>
          <div className="text-[#061922]/25 text-[10px] tracking-[0.15em] mb-3 px-1">PERSONAL BESTS</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { dist: '100m', time: '1:18', trend: '−3s', desc: 'Sprint power' },
              { dist: '200m', time: '2:42', trend: '−5s', desc: 'Speed endurance' },
            ].map((pb) => (
              <div key={`pb-${pb.dist}`} className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
                <div className="flex items-center gap-1.5 mb-3">
                  <Award size={13} strokeWidth={1.5} className="text-[#61949B]" />
                  <span className="text-[10px] text-[#061922]/30 tracking-wide">{pb.dist}</span>
                </div>
                <div className="text-3xl text-[#061922] mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {pb.time}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <TrendingDown size={10} strokeWidth={2} className="text-green-600" />
                  <span className="text-[10px] text-green-600 font-medium">{pb.trend}</span>
                </div>
                <div className="text-[9px] text-[#061922]/25 font-light">{pb.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-br from-[#61949B] to-[#87ACAA] rounded-[24px] p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-white/12 flex items-center justify-center">
              <Zap size={11} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-white/40 tracking-[0.15em]">THIS WEEK'S TAKEAWAY</span>
          </div>
          <p className="text-base text-white/95 leading-relaxed font-light mb-4">
            Your turns are becoming a competitive advantage. Every wall touch is crisp, explosive, and gaining you precious milliseconds.
          </p>
          <p className="text-sm text-white/75 leading-relaxed font-light">
            We've noticed your pace tends to drift after the 1km mark in longer sessions. Your body has the capacity—it's about training your mind to stay locked in when it matters most. Try 4×200m threshold sets this week to build that mental-aerobic bridge.
          </p>
        </div>
      </div>
    </div>
  );
}