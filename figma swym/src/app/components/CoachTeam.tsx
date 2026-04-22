import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Zap, Eye, Target, AlertCircle, CheckCircle } from 'lucide-react';

interface Athlete {
  id: string;
  name: string;
  initials: string;
  color: string;
  fatigue: number;
  attendance: number;
  bestPace: string;
  trend: 'up' | 'down' | 'stable';
}

const MOCK_ATHLETES: Athlete[] = [
  {
    id: 'a1',
    name: 'Sonia Kumar',
    initials: 'SK',
    color: '#61949B',
    fatigue: 32,
    attendance: 97,
    bestPace: '1:18',
    trend: 'up',
  },
  {
    id: 'a2',
    name: 'Arjun Patel',
    initials: 'AP',
    color: '#334F6B',
    fatigue: 68,
    attendance: 82,
    bestPace: '1:24',
    trend: 'down',
  },
  {
    id: 'a3',
    name: 'Riya Sharma',
    initials: 'RS',
    color: '#98C0C8',
    fatigue: 78,
    attendance: 94,
    bestPace: '1:21',
    trend: 'stable',
  },
  {
    id: 'a4',
    name: 'Maya Chen',
    initials: 'MC',
    color: '#87ACAA',
    fatigue: 45,
    attendance: 100,
    bestPace: '1:16',
    trend: 'up',
  },
];

export function CoachTeam() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);

  const filteredAthletes = MOCK_ATHLETES.filter(athlete =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFatigueColor = (fatigue: number) => {
    if (fatigue < 40) return '#4ADE80';
    if (fatigue < 70) return '#F6AA38';
    return '#F87171';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return '#4ADE80';
    if (attendance >= 85) return '#F6AA38';
    return '#F87171';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0820] via-[#111033] to-[#111033] pb-32">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#1a1a3e] via-[#111033] to-[#0f0f2b] pt-12 pb-8 px-6 border-b border-white/5">
        <h1 className="text-[32px] text-white mb-2 tracking-tight leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Team Roster
        </h1>
        <p className="text-white/50 text-sm">
          <span className="text-[#98C0C8] font-semibold">{MOCK_ATHLETES.length} athletes</span> in your squad
        </p>
      </div>

      {/* SEARCH */}
      <div className="px-6 pt-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search athletes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2A324E]/80 backdrop-blur-sm border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#98C0C8]/50 transition-colors"
          />
        </div>
      </div>

      {/* ATHLETES GRID */}
      <div className="px-6 pt-5 space-y-4">
        {filteredAthletes.map(athlete => (
          <div
            key={athlete.id}
            className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-5 shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-semibold shadow-lg"
                style={{ backgroundColor: athlete.color, fontFamily: 'Comfortaa, sans-serif' }}
              >
                {athlete.initials}
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {athlete.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {athlete.trend === 'up' && (
                    <div className="flex items-center gap-1 bg-green-400/20 rounded-full px-2 py-0.5">
                      <TrendingUp size={10} className="text-green-400" />
                      <span className="text-green-400 text-[10px]">Improving</span>
                    </div>
                  )}
                  {athlete.trend === 'down' && (
                    <div className="flex items-center gap-1 bg-red-400/20 rounded-full px-2 py-0.5">
                      <TrendingDown size={10} className="text-red-400" />
                      <span className="text-red-400 text-[10px]">Needs attention</span>
                    </div>
                  )}
                  {athlete.trend === 'stable' && (
                    <div className="flex items-center gap-1 bg-blue-400/20 rounded-full px-2 py-0.5">
                      <CheckCircle size={10} className="text-blue-400" />
                      <span className="text-blue-400 text-[10px]">Stable</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-[#111033]/40 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getFatigueColor(athlete.fatigue) }}
                  />
                  <span className="text-white/40 text-[10px] uppercase tracking-wide">Fatigue</span>
                </div>
                <div className="text-white text-xl font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {athlete.fatigue}%
                </div>
              </div>

              <div className="bg-[#111033]/40 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getAttendanceColor(athlete.attendance) }}
                  />
                  <span className="text-white/40 text-[10px] uppercase tracking-wide">Attend</span>
                </div>
                <div className="text-white text-xl font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {athlete.attendance}%
                </div>
              </div>

              <div className="bg-[#111033]/40 rounded-xl p-3 border border-white/5">
                <span className="text-white/40 text-[10px] uppercase tracking-wide block mb-2">Best Pace</span>
                <div className="text-white text-xl font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {athlete.bestPace}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-[#334F6B] hover:bg-[#334F6B]/80 text-white py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                <Target size={14} />
                Create Set
              </button>
              <button
                onClick={() => setSelectedAthlete(athlete.id)}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <Eye size={14} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Athlete Detail Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-6 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-[#2A324E] to-[#1f2840] border border-white/10 rounded-3xl p-7 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            {(() => {
              const athlete = MOCK_ATHLETES.find(a => a.id === selectedAthlete);
              if (!athlete) return null;

              return (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-semibold shadow-lg"
                      style={{ backgroundColor: athlete.color, fontFamily: 'Comfortaa, sans-serif' }}
                    >
                      {athlete.initials}
                    </div>
                    <div>
                      <h2 className="text-2xl text-white font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        {athlete.name}
                      </h2>
                      <p className="text-white/40 text-sm mt-0.5">Athlete Profile</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-[#111033]/40 rounded-2xl p-4 border border-white/5">
                      <div className="text-white/40 text-xs uppercase tracking-wide mb-3">Performance</div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">Fatigue Level</span>
                          <span className="text-white font-semibold">{athlete.fatigue}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">Attendance</span>
                          <span className="text-white font-semibold">{athlete.attendance}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">Best Pace</span>
                          <span className="text-white font-semibold">{athlete.bestPace}/100m</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAthlete(null)}
                    className="w-full bg-white/10 border border-white/20 text-white py-3.5 rounded-2xl text-sm font-medium tracking-wide active:scale-[0.98] transition-all"
                  >
                    Close
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
