import { BarChart3, TrendingUp, Users, Activity, Zap } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const attendanceData = [
  { week: 'W1', attendance: 92 },
  { week: 'W2', attendance: 88 },
  { week: 'W3', attendance: 95 },
  { week: 'W4', attendance: 91 },
  { week: 'W5', attendance: 94 },
  { week: 'W6', attendance: 89 },
  { week: 'W7', attendance: 96 },
];

const paceImprovementData = [
  { week: 'W1', avgPace: 92 },
  { week: 'W2', avgPace: 90 },
  { week: 'W3', avgPace: 88 },
  { week: 'W4', avgPace: 87 },
  { week: 'W5', avgPace: 85 },
  { week: 'W6', avgPace: 84 },
  { week: 'W7', avgPace: 82 },
];

const strokeComparisonData = [
  { stroke: 'Freestyle', teamAvg: 85, target: 90 },
  { stroke: 'Backstroke', teamAvg: 78, target: 85 },
  { stroke: 'Breaststroke', teamAvg: 72, target: 80 },
  { stroke: 'Butterfly', teamAvg: 68, target: 75 },
];

const fatigueData = [
  { day: 'Mon', fatigue: 45 },
  { day: 'Tue', fatigue: 52 },
  { day: 'Wed', fatigue: 48 },
  { day: 'Thu', fatigue: 61 },
  { day: 'Fri', fatigue: 38 },
  { day: 'Sat', fatigue: 42 },
  { day: 'Sun', fatigue: 28 },
];

const athleteComparisonData = [
  { metric: 'Speed', sonia: 92, arjun: 85, riya: 88, maya: 95 },
  { metric: 'Endurance', sonia: 88, arjun: 82, riya: 90, maya: 86 },
  { metric: 'Technique', sonia: 85, arjun: 78, riya: 82, maya: 88 },
  { metric: 'Recovery', sonia: 90, arjun: 75, riya: 68, maya: 92 },
  { metric: 'Consistency', sonia: 94, arjun: 88, riya: 85, maya: 96 },
];

export function CoachAnalytics() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0820] via-[#111033] to-[#111033] pb-32">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#1a1a3e] via-[#111033] to-[#0f0f2b] pt-12 pb-8 px-6 border-b border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={28} className="text-[#98C0C8]" />
          <h1 className="text-[32px] text-white tracking-tight leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Analytics
          </h1>
        </div>
        <p className="text-white/50 text-sm">
          Performance insights and team metrics
        </p>
      </div>

      <div className="px-6 pt-6 space-y-5">
        {/* ATTENDANCE TRENDS */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#98C0C8]" />
              <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Attendance Trends
              </h2>
            </div>
            <div className="flex items-center gap-1 bg-green-400/20 rounded-full px-2 py-0.5">
              <TrendingUp size={10} className="text-green-400" />
              <span className="text-green-400 text-xs">+4%</span>
            </div>
          </div>

          <div className="bg-[#111033]/40 rounded-2xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#98C0C8" strokeOpacity={0.1} />
                <XAxis
                  dataKey="week"
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 11 }}
                />
                <YAxis
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 11 }}
                  domain={[80, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2A324E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#98C0C8"
                  strokeWidth={3}
                  dot={{ fill: '#98C0C8', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PACE IMPROVEMENT */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#98C0C8]" />
              <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Pace Improvement
              </h2>
            </div>
            <div className="flex items-center gap-1 bg-green-400/20 rounded-full px-2 py-0.5">
              <TrendingUp size={10} className="text-green-400" />
              <span className="text-green-400 text-xs">-10s avg</span>
            </div>
          </div>

          <div className="bg-[#111033]/40 rounded-2xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={paceImprovementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#98C0C8" strokeOpacity={0.1} />
                <XAxis
                  dataKey="week"
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 11 }}
                />
                <YAxis
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 11 }}
                  domain={[75, 95]}
                  label={{ value: 'sec/100m', angle: -90, position: 'insideLeft', fill: '#ffffff', opacity: 0.4 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2A324E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgPace"
                  stroke="#4ADE80"
                  strokeWidth={3}
                  dot={{ fill: '#4ADE80', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STROKE SPLIT COMPARISON */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#98C0C8]" />
              <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Stroke Comparison
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#98C0C8]" />
                <span className="text-white/60 text-xs">Team Avg</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#334F6B]" />
                <span className="text-white/60 text-xs">Target</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111033]/40 rounded-2xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={strokeComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#98C0C8" strokeOpacity={0.1} />
                <XAxis
                  dataKey="stroke"
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 10 }}
                />
                <YAxis
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 11 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2A324E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                />
                <Bar dataKey="teamAvg" fill="#98C0C8" radius={[8, 8, 0, 0]} name="Team Avg" />
                <Bar dataKey="target" fill="#334F6B" radius={[8, 8, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FATIGUE OVER TIME */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={18} className="text-[#98C0C8]" />
            <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              Fatigue This Week
            </h2>
          </div>

          <div className="bg-[#111033]/40 rounded-2xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={fatigueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#98C0C8" strokeOpacity={0.1} />
                <XAxis
                  dataKey="day"
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 11 }}
                />
                <YAxis
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  tick={{ fill: '#ffffff', opacity: 0.5, fontSize: 11 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2A324E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                />
                <Bar dataKey="fatigue" fill="#F6AA38" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ATHLETE COMPARISON */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Users size={18} className="text-[#98C0C8]" />
            <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              Athlete Comparison
            </h2>
          </div>

          <div className="bg-[#111033]/40 rounded-2xl p-4 border border-white/5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Sonia', data: athleteComparisonData, key: 'sonia', color: '#61949B' },
                { name: 'Arjun', data: athleteComparisonData, key: 'arjun', color: '#334F6B' },
                { name: 'Riya', data: athleteComparisonData, key: 'riya', color: '#98C0C8' },
                { name: 'Maya', data: athleteComparisonData, key: 'maya', color: '#87ACAA' },
              ].map((athlete) => (
                <div key={athlete.name} className="bg-[#111033]/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: athlete.color }} />
                    <span className="text-white text-sm font-medium">{athlete.name}</span>
                  </div>
                  <div className="space-y-2">
                    {athlete.data.map((item: any) => (
                      <div key={item.metric} className="flex items-center justify-between">
                        <span className="text-white/40 text-xs">{item.metric}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${item[athlete.key]}%`,
                                backgroundColor: athlete.color,
                              }}
                            />
                          </div>
                          <span className="text-white text-xs w-7 text-right">{item[athlete.key]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
