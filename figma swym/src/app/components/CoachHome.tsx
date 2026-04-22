import { useState } from 'react';
import { Zap, TrendingUp, Sparkles, AlertTriangle, Calendar, Activity, Users, User, ChevronRight } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

interface CoachHomeProps {
  onGeneratePlan?: () => void;
  onSwitchToSwimmer?: () => void;
}

export function CoachHome({ onGeneratePlan, onSwitchToSwimmer }: CoachHomeProps) {
  const [showModeSelector, setShowModeSelector] = useState(false);
  const teamPerformanceData = [
    { metric: 'Freestyle', value: 88 },
    { metric: 'Backstroke', value: 82 },
    { metric: 'Breaststroke', value: 75 },
    { metric: 'Butterfly', value: 79 },
    { metric: 'Recovery', value: 91 },
    { metric: 'Consistency', value: 85 },
  ];

  const schedule = [
    { time: '6:00 AM', title: 'Pool Session', desc: 'Main training block', status: 'ready' },
    { time: '4:30 PM', title: 'Dryland Strength', desc: 'Power & conditioning', status: 'ready' },
    { time: '7:00 PM', title: 'Recovery Review', desc: 'Team check-in', status: 'pending' },
  ];

  const alerts = [
    { athlete: 'Riya', issue: 'fatigue high', color: '#F6AA38' },
    { athlete: 'Arjun', issue: 'attendance dip', color: '#98C0C8' },
    { athlete: 'Sonia', issue: 'meet taper ready', color: '#4ADE80' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0820] via-[#111033] to-[#111033] pb-32">
      {/* PREMIUM HERO */}
      <div className="bg-gradient-to-br from-[#1a1a3e] via-[#111033] to-[#0f0f2b] pt-12 pb-8 px-6 relative overflow-hidden border-b border-white/5">
        {/* Strategic grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="strategic-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#98C0C8" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#strategic-grid)" />
          </svg>
        </div>

        {/* Accent glow */}
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#98C0C8]/8 blur-3xl" />

        <div className="relative z-10">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <img src={swymLogo} alt="SWYM" className="h-20 opacity-95 drop-shadow-lg" />
            <button
              onClick={() => setShowModeSelector(true)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 shadow-lg active:scale-95 transition-all hover:bg-white/15"
            >
              <span className="text-white text-[10px] tracking-[0.12em] font-medium">COACH MODE</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="text-[36px] text-white mb-2 tracking-tight leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Coach Command Center
          </h1>
          <p className="text-white/50 text-base mb-4 leading-tight">
            <span className="text-[#98C0C8] font-semibold">4 athletes</span> · <span className="text-[#98C0C8] font-semibold">6 sessions</span> · <span className="text-orange-400 font-semibold">Meet week</span>
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 space-y-5 mt-6">
        {/* TODAY'S SCHEDULE */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar size={18} strokeWidth={1.5} className="text-[#98C0C8]" />
              <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Today's Schedule
              </h2>
            </div>
            <div className="bg-[#4ADE80]/20 border border-[#4ADE80]/30 rounded-full px-3 py-1">
              <span className="text-[#4ADE80] text-xs font-medium">Prepared 87%</span>
            </div>
          </div>

          <div className="space-y-3">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-[#111033]/40 rounded-2xl p-4 border border-white/5">
                <div className="flex flex-col items-center justify-center min-w-[60px]">
                  <div className="text-white text-sm" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{item.time.split(' ')[0]}</div>
                  <div className="text-white/40 text-[10px]">{item.time.split(' ')[1]}</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{item.title}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM PERFORMANCE VISUAL */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Activity size={18} strokeWidth={1.5} className="text-[#98C0C8]" />
                <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  Team Shape This Week
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-white/40 text-xs">Compared to last week</span>
                <div className="flex items-center gap-1 bg-green-400/20 rounded-full px-2 py-0.5">
                  <TrendingUp size={10} className="text-green-400" />
                  <span className="text-green-400 text-xs">+6%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111033]/40 rounded-2xl p-6 border border-white/5">
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={teamPerformanceData} cx="50%" cy="50%" outerRadius="70%">
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: '#ffffff', opacity: 0.6, fontSize: 10, fontWeight: 500 }}
                  tickLine={false}
                />
                <Radar
                  dataKey="value"
                  stroke="#98C0C8"
                  fill="#98C0C8"
                  fillOpacity={0.3}
                  strokeWidth={1.5}
                  dot={{ fill: '#98C0C8', r: 2.5, strokeWidth: 0 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI TEAM PLAN SUGGESTION */}
        <div className="bg-gradient-to-br from-[#334F6B] to-[#1a2840] border border-[#98C0C8]/30 rounded-3xl p-6 shadow-2xl shadow-[#334F6B]/20 relative overflow-hidden">
          {/* AI glow effect */}
          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#98C0C8]/10 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Sparkles size={16} className="text-[#98C0C8]" />
              </div>
              <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                AI Coach Recommendation
              </h2>
            </div>

            <p className="text-white/80 text-sm leading-relaxed mb-5">
              Yesterday load was high. Today <span className="text-[#98C0C8] font-semibold">recovery + technique</span> is optimal for peak performance.
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {['Recovery', 'Turns', 'Starts', 'Low Intensity'].map(tag => (
                <div key={tag} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                  <span className="text-white/90 text-xs font-medium">{tag}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onGeneratePlan}
              className="w-full bg-white/95 hover:bg-white text-[#111033] py-3.5 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg"
            >
              <Zap size={16} className="text-[#334F6B]" />
              Generate Team Plan
            </button>
          </div>
        </div>

        {/* ALERTS STRIP */}
        <div className="bg-gradient-to-br from-[#2A324E]/70 to-[#1f2840]/70 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-orange-400" />
            <span className="text-white/60 text-xs tracking-wide uppercase">Athlete Alerts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#111033]/50 border border-white/5 rounded-full px-3 py-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: alert.color }} />
                <span className="text-white text-xs">
                  <span className="font-medium">{alert.athlete}</span>
                  <span className="text-white/50 ml-1">{alert.issue}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Selector Modal */}
      {showModeSelector && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-[#2A324E] to-[#1f2840] border border-white/10 rounded-[32px] p-7 w-[86%] max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-[34px] text-white text-center mb-2 font-semibold leading-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              Choose Mode
            </h2>
            <p className="text-white/40 text-base text-center mb-7 leading-tight">
              Switch between training modes
            </p>

            <div className="space-y-4 mb-5">
              {/* Coach Mode - Active */}
              <button
                onClick={() => setShowModeSelector(false)}
                className="w-full h-[124px] bg-gradient-to-br from-[#98C0C8]/25 to-[#334F6B]/25 border-2 border-[#98C0C8]/60 rounded-[24px] px-[18px] text-left active:scale-[0.98] transition-all shadow-lg shadow-[#98C0C8]/20"
              >
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center gap-3.5">
                    <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-[#98C0C8]/40 to-[#98C0C8]/20 flex items-center justify-center shrink-0">
                      <Users size={24} strokeWidth={1.5} className="text-[#98C0C8]" />
                    </div>
                    <div>
                      <h3 className="text-2xl text-white mb-1 font-semibold leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        Coach Mode
                      </h3>
                      <p className="text-white/40 text-sm leading-none whitespace-nowrap">
                        Manage athletes
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} strokeWidth={1.5} className="text-white/30 shrink-0" />
                </div>
              </button>

              {/* Swimmer Mode */}
              <button
                onClick={() => {
                  setShowModeSelector(false);
                  if (onSwitchToSwimmer) {
                    setTimeout(() => onSwitchToSwimmer(), 200);
                  }
                }}
                className="w-full h-[124px] bg-gradient-to-br from-[#334F6B]/50 to-[#2A324E]/50 hover:from-[#334F6B]/70 hover:to-[#2A324E]/70 border border-white/10 rounded-[24px] px-[18px] text-left active:scale-[0.98] transition-all"
              >
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center gap-3.5">
                    <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-[#98C0C8]/30 to-[#98C0C8]/10 flex items-center justify-center shrink-0">
                      <User size={24} strokeWidth={1.5} className="text-[#98C0C8]" />
                    </div>
                    <div>
                      <h3 className="text-2xl text-white mb-1 font-semibold leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        Swimmer Mode
                      </h3>
                      <p className="text-white/40 text-sm leading-none whitespace-nowrap">
                        Experience athlete mode
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} strokeWidth={1.5} className="text-white/30 shrink-0" />
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowModeSelector(false)}
              className="w-full h-[52px] bg-white/5 border border-white/10 text-white/50 rounded-2xl text-sm tracking-wide active:scale-[0.98] transition-all hover:bg-white/8"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
