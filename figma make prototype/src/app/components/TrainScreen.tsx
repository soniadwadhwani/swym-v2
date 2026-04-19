import { useState, useMemo } from 'react';
import { Plus, Minus, ChevronDown, ChevronLeft, ChevronRight, Clock, Waves, Gauge, Flame, Heart, Target, Repeat, Trash2, GripVertical, Copy, CalendarDays, UserPlus, X } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import type { PlannedSet, Drill, Friend, Legend } from '../App';

const DRILL_TYPES = [
  { value: 'warmup', label: 'Warmup', Icon: Heart },
  { value: 'main', label: 'Main Set', Icon: Flame },
  { value: 'sprint', label: 'Sprint', Icon: Gauge },
  { value: 'drill', label: 'Technique', Icon: Target },
  { value: 'cooldown', label: 'Cooldown', Icon: Waves },
  { value: 'kick', label: 'Kick Set', Icon: Repeat },
];

const STROKES = ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'IM', 'Choice'];
const DISTANCES = [25, 50, 75, 100, 150, 200, 300, 400, 500, 800];

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}

function displayDate(d: Date) {
  const today = new Date();
  const todayStr = formatDate(today);
  const dateStr = formatDate(d);
  if (dateStr === todayStr) return 'Today';
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateStr === formatDate(yesterday)) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

interface TrainScreenProps {
  todaySet: PlannedSet | null;
  setHistory: Record<string, PlannedSet>;
  onSaveSet: (set: PlannedSet) => void;
  friends: Friend[];
  legends: Legend[];
  selectedGhost: { type: 'friend' | 'legend'; id: string } | null;
  onSelectGhost: (type: 'friend' | 'legend', id: string) => void;
}

export function TrainScreen({ todaySet, setHistory, onSaveSet, friends, legends, selectedGhost, onSelectGhost }: TrainScreenProps) {
  const today = new Date();
  const todayStr = formatDate(today);

  const [selectedDate, setSelectedDate] = useState(today);
  const selectedStr = formatDate(selectedDate);
  const isToday = selectedStr === todayStr;
  const isPast = selectedDate < today && !isToday;

  // Load existing set for selected date or start blank for today
  const existingSet = selectedStr === todayStr ? todaySet : setHistory[selectedStr] || null;

  const [setName, setSetName] = useState(todaySet?.name || '');
  const [startHour, setStartHour] = useState(todaySet?.startHour || 6);
  const [startMinute, setStartMinuteVal] = useState(todaySet?.startMinute || 30);
  const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>(todaySet?.startPeriod || 'AM');
  const [drills, setDrills] = useState<Drill[]>(todaySet?.drills || [
    { id: '1', type: 'warmup', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 45, rest: 15, reps: 1 },
  ]);
  const [expandedDrill, setExpandedDrill] = useState<string | null>(null);
  const [showDrillPicker, setShowDrillPicker] = useState(false);
  const [showGhostPicker, setShowGhostPicker] = useState(false);

  const getGhostName = () => {
    if (!selectedGhost) return null;
    if (selectedGhost.type === 'friend') {
      return friends.find(f => f.id === selectedGhost.id)?.name;
    } else {
      return legends.find(l => l.id === selectedGhost.id)?.name;
    }
  };

  const navigateDate = (dir: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + dir);
    // Don't go into the future beyond today
    if (next > today) return;
    setSelectedDate(next);
  };

  const duplicateSet = (set: PlannedSet) => {
    const newDrills = set.drills.map(d => ({ ...d, id: Date.now().toString() + Math.random() }));
    setSetName(set.name + ' (copy)');
    setStartHour(set.startHour);
    setStartMinuteVal(set.startMinute);
    setStartPeriod(set.startPeriod);
    setDrills(newDrills);
    setSelectedDate(today);
  };

  const addDrill = (type: string) => {
    const newDrill: Drill = {
      id: Date.now().toString(),
      type,
      stroke: 'Freestyle',
      distance: 100,
      paceMin: 1,
      paceSec: 30,
      rest: 15,
      reps: 1,
    };
    setDrills([...drills, newDrill]);
    setExpandedDrill(newDrill.id);
    setShowDrillPicker(false);
  };

  const updateDrill = (id: string, updates: Partial<Drill>) => {
    setDrills(drills.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const removeDrill = (id: string) => {
    setDrills(drills.filter(d => d.id !== id));
    if (expandedDrill === id) setExpandedDrill(null);
  };

  const totalDistance = drills.reduce((s, d) => s + d.distance * d.reps, 0);
  const totalTime = drills.reduce((s, d) => {
    const pace = d.paceMin * 60 + d.paceSec;
    return s + ((d.distance / 100) * pace * d.reps) + (d.rest * d.reps);
  }, 0);
  const totalMin = Math.floor(totalTime / 60);

  const getDrillMeta = (type: string) => DRILL_TYPES.find(d => d.value === type) || DRILL_TYPES[0];

  const handleSave = () => {
    onSaveSet({
      name: setName || 'Custom Set',
      drills,
      startHour,
      startMinute,
      startPeriod,
      date: todayStr,
    });
  };

  // Past date view — show historical set with duplicate option
  if (isPast && existingSet) {
    const histTotal = existingSet.drills.reduce((s, d) => s + d.distance * d.reps, 0);
    return (
      <div className="min-h-screen bg-[#F3F1EE] pb-28">
        {/* Date Nav */}
        <div className="bg-[#140C32] pt-14 pb-5 px-5 rounded-b-[32px]">
          <div className="flex items-center justify-between mb-4">
            <img src={swymLogo} alt="SWYM" className="h-4 opacity-30" />
            <span className="text-white/25 text-[10px] tracking-[0.2em]">SET PLANNER</span>
            <div className="w-14" />
          </div>
          <div className="flex items-center justify-between bg-white/6 rounded-2xl px-2 py-2 border border-white/6">
            <button onClick={() => navigateDate(-1)} className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center active:scale-90 transition-transform">
              <ChevronLeft size={16} className="text-white/40" />
            </button>
            <div className="flex items-center gap-2">
              <CalendarDays size={13} className="text-white/25" />
              <span className="text-white text-xs tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {displayDate(selectedDate)}
              </span>
            </div>
            <button onClick={() => navigateDate(1)} className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center active:scale-90 transition-transform">
              <ChevronRight size={16} className="text-white/40" />
            </button>
          </div>
        </div>

        <div className="px-5 mt-5">
          {/* Historical set card */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[#140C32]/25 text-[9px] tracking-[0.15em] mb-1">COMPLETED SET</div>
                <div className="text-xl text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {existingSet.name}
                </div>
              </div>
              <div className="text-[10px] text-[#140C32]/20">
                {existingSet.startHour}:{existingSet.startMinute.toString().padStart(2, '0')} {existingSet.startPeriod}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-[#F3F1EE] rounded-xl p-3 text-center">
                <div className="text-lg text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {histTotal >= 1000 ? `${(histTotal / 1000).toFixed(1)}` : histTotal}
                </div>
                <div className="text-[8px] text-[#140C32]/20 tracking-wide">{histTotal >= 1000 ? 'km' : 'm'}</div>
              </div>
              <div className="bg-[#F3F1EE] rounded-xl p-3 text-center">
                <div className="text-lg text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {existingSet.drills.length}
                </div>
                <div className="text-[8px] text-[#140C32]/20 tracking-wide">drills</div>
              </div>
              <div className="bg-[#F3F1EE] rounded-xl p-3 text-center">
                <div className="text-lg text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {existingSet.drills.reduce((s, d) => s + d.reps, 0)}
                </div>
                <div className="text-[8px] text-[#140C32]/20 tracking-wide">total reps</div>
              </div>
            </div>

            <div className="space-y-2">
              {existingSet.drills.map((drill, i) => {
                const meta = getDrillMeta(drill.type);
                return (
                  <div key={drill.id} className="flex items-center gap-3 py-2 px-3 bg-[#F3F1EE]/60 rounded-xl">
                    <span className="text-[10px] text-[#140C32]/15 w-3">{i + 1}</span>
                    <meta.Icon size={14} strokeWidth={1.5} className="text-[#707CFF] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-[#140C32]/70">{meta.label}</span>
                      <span className="text-[10px] text-[#140C32]/25 ml-2">
                        {drill.reps > 1 ? `${drill.reps}×` : ''}{drill.distance}m {drill.stroke}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#140C32]/20 tabular-nums">
                      {drill.paceMin}:{drill.paceSec.toString().padStart(2, '0')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Duplicate button */}
          <button
            onClick={() => duplicateSet(existingSet)}
            className="w-full bg-[#707CFF] text-white py-4 rounded-2xl text-sm tracking-wide shadow-xl shadow-[#707CFF]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Copy size={15} />
            Duplicate to Today
          </button>
        </div>
      </div>
    );
  }

  // Past date with no set
  if (isPast && !existingSet) {
    return (
      <div className="min-h-screen bg-[#F3F1EE] pb-28">
        <div className="bg-[#140C32] pt-14 pb-5 px-5 rounded-b-[32px]">
          <div className="flex items-center justify-between mb-4">
            <img src={swymLogo} alt="SWYM" className="h-4 opacity-30" />
            <span className="text-white/25 text-[10px] tracking-[0.2em]">SET PLANNER</span>
            <div className="w-14" />
          </div>
          <div className="flex items-center justify-between bg-white/6 rounded-2xl px-2 py-2 border border-white/6">
            <button onClick={() => navigateDate(-1)} className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center active:scale-90 transition-transform">
              <ChevronLeft size={16} className="text-white/40" />
            </button>
            <div className="flex items-center gap-2">
              <CalendarDays size={13} className="text-white/25" />
              <span className="text-white text-xs tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                {displayDate(selectedDate)}
              </span>
            </div>
            <button onClick={() => navigateDate(1)} className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center active:scale-90 transition-transform">
              <ChevronRight size={16} className="text-white/40" />
            </button>
          </div>
        </div>
        <div className="px-5 mt-16 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D1DEDF]/20 flex items-center justify-center mb-4">
            <CalendarDays size={24} strokeWidth={1.5} className="text-[#140C32]/15" />
          </div>
          <div className="text-sm text-[#140C32]/25" style={{ fontFamily: 'Comfortaa, sans-serif' }}>No set recorded</div>
          <div className="text-[10px] text-[#140C32]/15 mt-1">Rest day or no data for this date</div>
        </div>
      </div>
    );
  }

  // Today — Create / Edit set
  return (
    <div className="min-h-screen bg-[#F3F1EE] pb-28">
      {/* Header with date nav */}
      <div className="bg-[#140C32] pt-14 pb-6 px-5 rounded-b-[32px]">
        <div className="flex items-center justify-between mb-4">
          <img src={swymLogo} alt="SWYM" className="h-4 opacity-30" />
          <span className="text-white/25 text-[10px] tracking-[0.2em]">SET PLANNER</span>
          <button
            onClick={handleSave}
            className="text-[#707CFF] text-xs tracking-wide active:scale-95 transition-transform"
          >
            Save
          </button>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center justify-between bg-white/6 rounded-2xl px-2 py-2 border border-white/6 mb-5">
          <button onClick={() => navigateDate(-1)} className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center active:scale-90 transition-transform">
            <ChevronLeft size={16} className="text-white/40" />
          </button>
          <div className="flex items-center gap-2">
            <CalendarDays size={13} className="text-white/25" />
            <span className="text-white text-xs tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {displayDate(selectedDate)}
            </span>
          </div>
          <button onClick={() => navigateDate(1)} className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center active:scale-90 transition-transform opacity-30 pointer-events-none">
            <ChevronRight size={16} className="text-white/40" />
          </button>
        </div>

        {/* Set Name */}
        <input
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
          placeholder="Name your set..."
          className="w-full bg-transparent text-2xl text-white placeholder:text-white/15 outline-none tracking-tight mb-5"
          style={{ fontFamily: 'Comfortaa, sans-serif' }}
        />

        {/* Summary */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/6 rounded-2xl px-4 py-3 border border-white/6">
            <div className="text-white/25 text-[9px] tracking-[0.15em] mb-1">TOTAL</div>
            <div className="text-white text-lg tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {totalDistance >= 1000 ? `${(totalDistance / 1000).toFixed(1)}km` : `${totalDistance}m`}
            </div>
          </div>
          <div className="flex-1 bg-white/6 rounded-2xl px-4 py-3 border border-white/6">
            <div className="text-white/25 text-[9px] tracking-[0.15em] mb-1">EST. TIME</div>
            <div className="text-white text-lg tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {totalMin} min
            </div>
          </div>
          <div className="flex-1 bg-white/6 rounded-2xl px-4 py-3 border border-white/6">
            <div className="text-white/25 text-[9px] tracking-[0.15em] mb-1">DRILLS</div>
            <div className="text-white text-lg tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {drills.length}
            </div>
          </div>
        </div>
      </div>

      {/* Start Time */}
      <div className="mx-5 mt-5 bg-white rounded-[24px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} strokeWidth={1.5} className="text-[#707CFF]" />
          <span className="text-[10px] text-[#140C32]/30 tracking-[0.15em]">WORKOUT START TIME</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#F3F1EE] rounded-2xl flex items-center justify-center gap-2 py-3">
            <button onClick={() => setStartHour(h => h <= 1 ? 12 : h - 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform shadow-sm">
              <Minus size={12} className="text-[#140C32]/40" />
            </button>
            <span className="text-2xl text-[#140C32] w-8 text-center tabular-nums" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {startHour}
            </span>
            <button onClick={() => setStartHour(h => h >= 12 ? 1 : h + 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform shadow-sm">
              <Plus size={12} className="text-[#140C32]/40" />
            </button>
          </div>
          <span className="text-[#140C32]/15 text-xl">:</span>
          <div className="flex-1 bg-[#F3F1EE] rounded-2xl flex items-center justify-center gap-2 py-3">
            <button onClick={() => setStartMinuteVal(m => m <= 0 ? 55 : m - 5)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform shadow-sm">
              <Minus size={12} className="text-[#140C32]/40" />
            </button>
            <span className="text-2xl text-[#140C32] w-8 text-center tabular-nums" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              {startMinute.toString().padStart(2, '0')}
            </span>
            <button onClick={() => setStartMinuteVal(m => m >= 55 ? 0 : m + 5)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform shadow-sm">
              <Plus size={12} className="text-[#140C32]/40" />
            </button>
          </div>
          <div className="bg-[#F3F1EE] rounded-2xl p-1 flex flex-col gap-1">
            <button
              onClick={() => setStartPeriod('AM')}
              className={`px-3 py-2 rounded-xl text-[10px] tracking-wide transition-all ${startPeriod === 'AM' ? 'bg-[#707CFF] text-white shadow-sm' : 'text-[#140C32]/30'}`}
            >
              AM
            </button>
            <button
              onClick={() => setStartPeriod('PM')}
              className={`px-3 py-2 rounded-xl text-[10px] tracking-wide transition-all ${startPeriod === 'PM' ? 'bg-[#707CFF] text-white shadow-sm' : 'text-[#140C32]/30'}`}
            >
              PM
            </button>
          </div>
        </div>
      </div>

      {/* Ghost Selection */}
      <div className="mx-5 mt-3 bg-white rounded-[24px] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UserPlus size={14} strokeWidth={1.5} className="text-[#707CFF]" />
            <span className="text-[10px] text-[#140C32]/30 tracking-[0.15em]">RACE AGAINST</span>
          </div>
          {selectedGhost && (
            <button
              onClick={() => onSelectGhost(selectedGhost.type, selectedGhost.id)}
              className="text-[9px] text-[#140C32]/20 tracking-wide active:scale-95 transition-transform"
            >
              Remove
            </button>
          )}
        </div>

        {selectedGhost ? (
          <div className="flex items-center gap-3 py-2.5 px-3 bg-[#707CFF]/8 rounded-xl border border-[#707CFF]/15">
            {selectedGhost.type === 'friend' ? (
              <>
                {(() => {
                  const friend = friends.find(f => f.id === selectedGhost.id);
                  return (
                    <>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{
                          backgroundColor: friend?.color || '#707CFF',
                          color: friend?.color === '#D1DEDF' ? '#140C32' : 'white',
                          fontFamily: 'Comfortaa, sans-serif',
                        }}
                      >
                        {friend?.initials || '??'}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[#140C32]">{friend?.name || 'Unknown'}</div>
                        <div className="text-[10px] text-[#140C32]/25">Friend</div>
                      </div>
                    </>
                  );
                })()}
              </>
            ) : (
              <>
                {(() => {
                  const legend = legends.find(l => l.id === selectedGhost.id);
                  return (
                    <>
                      <div className="w-9 h-9 rounded-full bg-[#140C32] flex items-center justify-center text-white text-[10px] shrink-0" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        {legend?.name.split(' ').map(n => n[0]).join('') || '??'}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[#140C32]">{legend?.name || 'Unknown'}</div>
                        <div className="text-[10px] text-[#707CFF]">{legend?.badge}</div>
                      </div>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowGhostPicker(true)}
            className="w-full border-2 border-dashed border-[#D1DEDF]/40 rounded-xl py-3 flex items-center justify-center gap-2 text-[#140C32]/20 active:scale-[0.98] transition-transform"
          >
            <UserPlus size={14} strokeWidth={1.5} />
            <span className="text-xs tracking-wide">Add Ghost Racer</span>
          </button>
        )}

        {showGhostPicker && (
          <div className="mt-3 pt-3 border-t border-[#F3F1EE]">
            <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-2">SELECT FROM FRIENDS</div>
            <div className="space-y-2 mb-3">
              {friends.map(friend => (
                <button
                  key={friend.id}
                  onClick={() => {
                    onSelectGhost('friend', friend.id);
                    setShowGhostPicker(false);
                  }}
                  className="w-full flex items-center gap-3 py-2 px-3 bg-[#F3F1EE]/60 rounded-xl active:scale-[0.98] transition-transform"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0"
                    style={{
                      backgroundColor: friend.color,
                      color: friend.color === '#D1DEDF' ? '#140C32' : 'white',
                      fontFamily: 'Comfortaa, sans-serif',
                    }}
                  >
                    {friend.initials}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-[#140C32]">{friend.name}</div>
                    <div className="text-[9px] text-[#140C32]/20">{friend.weeklyDistance}km this week</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-2">SELECT FROM LEGENDS</div>
            <div className="space-y-2 mb-3">
              {legends.map(legend => (
                <button
                  key={legend.id}
                  onClick={() => {
                    onSelectGhost('legend', legend.id);
                    setShowGhostPicker(false);
                  }}
                  className="w-full flex items-center gap-3 py-2 px-3 bg-[#140C32]/5 rounded-xl active:scale-[0.98] transition-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-[#140C32] flex items-center justify-center text-white text-[10px] shrink-0" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {legend.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-[#140C32]">{legend.name}</div>
                    <div className="text-[9px] text-[#707CFF]">{legend.badge}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowGhostPicker(false)}
              className="w-full text-center text-[10px] text-[#140C32]/20 tracking-wide"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Drills */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[10px] text-[#140C32]/30 tracking-[0.15em]">SET STRUCTURE</span>
          <span className="text-[10px] text-[#140C32]/15">{drills.length} drill{drills.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="space-y-3">
          {drills.map((drill, index) => {
            const meta = getDrillMeta(drill.type);
            const isExpanded = expandedDrill === drill.id;
            return (
              <div key={drill.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm shadow-black/3">
                <button
                  onClick={() => setExpandedDrill(isExpanded ? null : drill.id)}
                  className="w-full flex items-center gap-3 p-4 active:bg-[#F3F1EE]/50 transition-colors"
                >
                  <div className="flex items-center gap-1 text-[#140C32]/10">
                    <GripVertical size={14} />
                    <span className="text-[10px] w-4">{index + 1}</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#707CFF]/8 flex items-center justify-center shrink-0">
                    <meta.Icon size={16} strokeWidth={1.5} className="text-[#707CFF]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-[#140C32]">{meta.label}</div>
                    <div className="text-[10px] text-[#140C32]/25 mt-0.5">
                      {drill.reps > 1 ? `${drill.reps} × ` : ''}{drill.distance}m {drill.stroke} · {drill.paceMin}:{drill.paceSec.toString().padStart(2, '0')}/100m
                    </div>
                  </div>
                  <ChevronDown size={14} className={`text-[#140C32]/15 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#F3F1EE] space-y-4">
                    <div>
                      <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-2">STROKE</div>
                      <div className="flex flex-wrap gap-1.5">
                        {STROKES.map(s => (
                          <button key={s} onClick={() => updateDrill(drill.id, { stroke: s })}
                            className={`px-3 py-1.5 rounded-full text-[11px] transition-all ${drill.stroke === s ? 'bg-[#140C32] text-white' : 'bg-[#F3F1EE] text-[#140C32]/40'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-2">DISTANCE</div>
                      <div className="flex flex-wrap gap-1.5">
                        {DISTANCES.map(d => (
                          <button key={d} onClick={() => updateDrill(drill.id, { distance: d })}
                            className={`px-3 py-1.5 rounded-full text-[11px] transition-all ${drill.distance === d ? 'bg-[#707CFF] text-white' : 'bg-[#F3F1EE] text-[#140C32]/40'}`}>
                            {d}m
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-2">REPS</div>
                        <div className="bg-[#F3F1EE] rounded-xl flex items-center justify-between px-3 py-2.5">
                          <button onClick={() => updateDrill(drill.id, { reps: Math.max(1, drill.reps - 1) })} className="active:scale-90 transition-transform"><Minus size={14} className="text-[#140C32]/25" /></button>
                          <span className="text-[#140C32] text-lg tabular-nums" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{drill.reps}</span>
                          <button onClick={() => updateDrill(drill.id, { reps: drill.reps + 1 })} className="active:scale-90 transition-transform"><Plus size={14} className="text-[#140C32]/25" /></button>
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-2">PACE /100m</div>
                        <div className="bg-[#F3F1EE] rounded-xl flex items-center justify-between px-2 py-2.5">
                          <button onClick={() => {
                            let t = drill.paceMin * 60 + drill.paceSec - 5;
                            if (t < 30) t = 30;
                            updateDrill(drill.id, { paceMin: Math.floor(t / 60), paceSec: t % 60 });
                          }} className="active:scale-90 transition-transform"><Minus size={14} className="text-[#140C32]/25" /></button>
                          <span className="text-[#140C32] text-sm tabular-nums" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{drill.paceMin}:{drill.paceSec.toString().padStart(2, '0')}</span>
                          <button onClick={() => {
                            let t = drill.paceMin * 60 + drill.paceSec + 5;
                            if (t > 300) t = 300;
                            updateDrill(drill.id, { paceMin: Math.floor(t / 60), paceSec: t % 60 });
                          }} className="active:scale-90 transition-transform"><Plus size={14} className="text-[#140C32]/25" /></button>
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-2">REST (s)</div>
                        <div className="bg-[#F3F1EE] rounded-xl flex items-center justify-between px-3 py-2.5">
                          <button onClick={() => updateDrill(drill.id, { rest: Math.max(0, drill.rest - 5) })} className="active:scale-90 transition-transform"><Minus size={14} className="text-[#140C32]/25" /></button>
                          <span className="text-[#140C32] text-sm tabular-nums" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{drill.rest}</span>
                          <button onClick={() => updateDrill(drill.id, { rest: drill.rest + 5 })} className="active:scale-90 transition-transform"><Plus size={14} className="text-[#140C32]/25" /></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeDrill(drill.id)} className="flex items-center gap-1.5 text-red-400/60 text-[10px] tracking-wide pt-1">
                      <Trash2 size={12} /> Remove Drill
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Drill */}
        {!showDrillPicker ? (
          <button
            onClick={() => setShowDrillPicker(true)}
            className="w-full mt-3 border-2 border-dashed border-[#D1DEDF]/40 rounded-[20px] py-4 flex items-center justify-center gap-2 text-[#140C32]/20 active:scale-[0.98] transition-transform"
          >
            <Plus size={16} />
            <span className="text-xs tracking-wide">Add Drill</span>
          </button>
        ) : (
          <div className="mt-3 bg-white rounded-[20px] p-4 shadow-sm shadow-black/3">
            <div className="text-[9px] text-[#140C32]/20 tracking-[0.15em] mb-3">SELECT DRILL TYPE</div>
            <div className="grid grid-cols-2 gap-2">
              {DRILL_TYPES.map(dt => (
                <button key={dt.value} onClick={() => addDrill(dt.value)}
                  className="flex items-center gap-2.5 bg-[#F3F1EE] rounded-2xl px-4 py-3 active:scale-[0.96] transition-transform">
                  <dt.Icon size={16} strokeWidth={1.5} className="text-[#707CFF]" />
                  <span className="text-xs text-[#140C32]/60">{dt.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowDrillPicker(false)} className="w-full text-center text-[10px] text-[#140C32]/20 mt-3 tracking-wide">Cancel</button>
          </div>
        )}
      </div>

      {/* Save */}
      <div className="px-5 mt-6">
        <button onClick={handleSave} className="w-full bg-[#707CFF] text-white py-4 rounded-2xl text-sm tracking-wide shadow-xl shadow-[#707CFF]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          Save Set
        </button>
      </div>
    </div>
  );
}
