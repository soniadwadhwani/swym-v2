import { useState } from 'react';
import { Trophy, Star, Calendar, Check } from 'lucide-react';
import type { Friend, Legend } from '../App';

interface CommunityScreenProps {
  friends: Friend[];
  legends: Legend[];
  selectedGhost: { type: 'friend' | 'legend'; id: string } | null;
  onSelectGhost: (type: 'friend' | 'legend', id: string) => void;
  onViewLegendSets: (legendId: string) => void;
}

export function CommunityScreen({ friends, legends, selectedGhost, onSelectGhost, onViewLegendSets }: CommunityScreenProps) {
  const [view, setView] = useState<'leaderboard' | 'friends'>('leaderboard');

  const challenges = [
    {
      id: 'c1',
      title: '10km This Week',
      userProgress: 68,
      userCurrent: 6.8,
      goal: 10,
      unit: 'km',
    },
    {
      id: 'c2',
      title: '5-Day Streak',
      userProgress: 80,
      userCurrent: 4,
      goal: 5,
      unit: 'days',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111033] via-[#1a1850] to-[#111033] pb-28">
      {/* Top Hero Area */}
      <div className="pt-14 pb-10 px-6">
        <div className="text-white/20 text-[10px] tracking-[0.25em] mb-3">
          CONNECT & COMPETE
        </div>
        <h1 className="text-5xl text-white mb-4 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Community
        </h1>
        <p className="text-white/40 text-sm">
          Train with others. Race globally.
        </p>
      </div>

      <div className="px-6 space-y-6">
        {/* Segmented Switch */}
        <div className="bg-[#2A324E]/40 backdrop-blur-sm border border-white/5 rounded-3xl p-1.5 flex gap-1">
          <button
            onClick={() => setView('leaderboard')}
            className={`flex-1 py-3 rounded-2xl text-sm tracking-wide transition-all ${
              view === 'leaderboard'
                ? 'bg-[#98C0C8] text-[#111033]'
                : 'text-white/30'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setView('friends')}
            className={`flex-1 py-3 rounded-2xl text-sm tracking-wide transition-all ${
              view === 'friends'
                ? 'bg-[#98C0C8] text-[#111033]'
                : 'text-white/30'
            }`}
          >
            Friends
          </button>
        </div>

        {view === 'leaderboard' ? (
          <>
            {/* Leaderboard Section */}
            <div>
              <div className="text-white/20 text-[10px] tracking-[0.25em] mb-4 ml-1">WEEKLY RANKING</div>
              <div className="space-y-3">
                {friends
                  .sort((a, b) => b.weeklyDistance - a.weeklyDistance)
                  .map((friend, idx) => {
                    const rank = idx + 1;
                    const isGhost = selectedGhost?.type === 'friend' && selectedGhost.id === friend.id;
                    const isTop3 = rank <= 3;
                    return (
                      <div
                        key={friend.id}
                        className={`flex items-center gap-4 py-4 px-5 bg-[#2A324E]/60 backdrop-blur-sm border rounded-2xl transition-all ${
                          isTop3
                            ? 'border-[#98C0C8]/20 bg-[#2A324E]/80'
                            : 'border-white/5'
                        }`}
                      >
                        <div className="w-8 text-center flex items-center justify-center">
                          {rank === 1 ? (
                            <div className="w-6 h-6 rounded-full bg-[#F6AA38]/20 flex items-center justify-center">
                              <span className="text-[#F6AA38] text-xs" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                                1
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-white/30 tabular-nums" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                              {rank}
                            </span>
                          )}
                        </div>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs shrink-0"
                          style={{
                            backgroundColor: friend.color,
                            color: friend.color === '#87ACAA' ? '#061922' : 'white',
                            fontFamily: 'Comfortaa, sans-serif',
                          }}
                        >
                          {friend.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white">{friend.name}</div>
                          <div className="text-xs text-white/30 mt-0.5">
                            {friend.weeklyDistance}km this week
                          </div>
                        </div>
                        <button
                          onClick={() => onSelectGhost('friend', friend.id)}
                          className={`px-4 py-2 rounded-xl text-xs tracking-wide transition-all active:scale-95 ${
                            isGhost
                              ? 'bg-[#98C0C8] text-[#111033]'
                              : 'bg-white/5 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          {isGhost ? 'Racing' : 'Race'}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Friends Tab */}
            <div>
              <div className="text-white/20 text-[10px] tracking-[0.25em] mb-4 ml-1">YOUR FRIENDS</div>
              <div className="space-y-3">
                {friends.map((friend) => {
                  const isGhost = selectedGhost?.type === 'friend' && selectedGhost.id === friend.id;
                  return (
                    <div
                      key={friend.id}
                      className="flex items-center gap-4 py-4 px-5 bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl"
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{
                          backgroundColor: friend.color,
                          color: friend.color === '#87ACAA' ? '#061922' : 'white',
                          fontFamily: 'Comfortaa, sans-serif',
                        }}
                      >
                        {friend.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white mb-1">{friend.name}</div>
                        <div className="text-xs text-white/40">
                          {friend.lastActivity.action}{' '}
                          <span className="text-[#98C0C8]">{friend.lastActivity.detail}</span>
                        </div>
                        <div className="text-[10px] text-white/20 mt-1">
                          {friend.lastActivity.time}
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectGhost('friend', friend.id)}
                        className={`px-4 py-2 rounded-xl text-xs tracking-wide transition-all active:scale-95 shrink-0 ${
                          isGhost
                            ? 'bg-[#98C0C8] text-[#111033]'
                            : 'bg-white/5 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        {isGhost ? 'Racing' : 'Challenge'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}


        {/* Active Challenges */}
        <div>
          <div className="flex items-center gap-2 mb-4 ml-1">
            <Trophy size={14} strokeWidth={1.5} className="text-[#98C0C8]" />
            <span className="text-[10px] text-white/20 tracking-[0.25em]">ACTIVE CHALLENGES</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-4"
              >
                <div className="text-white text-sm mb-2" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {challenge.title}
                </div>
                <div className="text-2xl text-[#98C0C8] mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {challenge.userProgress}%
                </div>
                <div className="text-[10px] text-white/30">
                  {challenge.userCurrent} / {challenge.goal} {challenge.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-white text-base mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Your Progress
              </div>
              <div className="text-xs text-white/30">
                6.8 / 10 km
              </div>
            </div>
            <span className="text-3xl text-[#98C0C8]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              68%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#98C0C8] to-[#D4ECF1] rounded-full transition-all"
              style={{ width: '68%' }}
            />
          </div>
        </div>

        {/* Swim with Legends */}
        <div>
          <div className="flex items-center gap-2 mb-4 ml-1">
            <Star size={14} strokeWidth={1.5} className="text-[#F6AA38]" />
            <span className="text-[10px] text-white/20 tracking-[0.25em]">SWIM WITH LEGENDS</span>
          </div>
          <div className="space-y-3">
            {legends.map((legend) => (
              <div
                key={legend.id}
                className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white text-base mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                      {legend.name}
                    </div>
                    <div className="text-white/30 text-xs">{legend.specialty}</div>
                  </div>
                  <div className="bg-[#F6AA38]/10 text-[#F6AA38] text-[9px] px-3 py-1.5 rounded-full tracking-wide">
                    {legend.badge}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[10px] text-white/20">
                    Pace: <span className="text-white/40">{legend.pace}</span>
                  </div>
                  <div className="text-[10px] text-white/20">
                    {legend.sets.length} signature set{legend.sets.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <button
                  onClick={() => onViewLegendSets(legend.id)}
                  className="w-full bg-[#334F6B] text-white py-3 rounded-xl text-xs tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-[#334F6B]/80"
                >
                  <Calendar size={13} strokeWidth={1.5} />
                  View Sets
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}