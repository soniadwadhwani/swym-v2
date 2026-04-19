import { useState } from 'react';
import { Trophy, ChevronRight, Star, UserPlus, TrendingUp, TrendingDown, Minus, Calendar, Check } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import type { Friend, Legend } from '../App';

interface CommunityScreenProps {
  friends: Friend[];
  legends: Legend[];
  selectedGhost: { type: 'friend' | 'legend'; id: string } | null;
  onSelectGhost: (type: 'friend' | 'legend', id: string) => void;
  onViewLegendSets: (legendId: string) => void;
}

export function CommunityScreen({ friends, legends, selectedGhost, onSelectGhost, onViewLegendSets }: CommunityScreenProps) {
  const [view, setView] = useState<'leaderboard' | 'activity'>('leaderboard');
  const [selectedChallenge, setSelectedChallenge] = useState<string>('c1');

  const challenges = [
    {
      id: 'c1',
      title: '10km This Week',
      userProgress: 68,
      userCurrent: 6.8,
      goal: 10,
      unit: 'km',
      leaderboard: [
        { friendId: 'f1', progress: 92, value: 9.2, completed: false },
        { friendId: 'f3', progress: 78, value: 7.8, completed: false },
        { friendId: 'you', progress: 68, value: 6.8, completed: false },
        { friendId: 'f2', progress: 54, value: 5.4, completed: false },
      ],
    },
    {
      id: 'c2',
      title: '5-Day Streak',
      userProgress: 80,
      userCurrent: 4,
      goal: 5,
      unit: 'days',
      leaderboard: [
        { friendId: 'f2', progress: 100, value: 5, completed: true },
        { friendId: 'you', progress: 80, value: 4, completed: false },
        { friendId: 'f1', progress: 60, value: 3, completed: false },
        { friendId: 'f3', progress: 40, value: 2, completed: false },
      ],
    },
  ];

  const currentChallenge = challenges.find(c => c.id === selectedChallenge) || challenges[0];

  const getFriendById = (id: string) => friends.find(f => f.id === id);

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  return (
    <div className="min-h-screen bg-[#F3F1EE] pb-28">
      {/* Header */}
      <div className="bg-[#140C32] pt-14 pb-12 px-6 relative overflow-hidden">
        <div className="absolute right-4 top-14 opacity-10">
          <img src={swymLogo} alt="" className="h-6" />
        </div>
        <div className="relative z-10">
          <div className="text-white/20 text-[10px] tracking-[0.2em] mb-2">CONNECT & COMPETE</div>
          <h1 className="text-3xl text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Community
          </h1>
        </div>
      </div>

      <div className="px-5 -mt-5 space-y-5">
        {/* Friends Section with Toggle */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
          {/* View Toggle */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setView('leaderboard')}
              className={`flex-1 py-2 rounded-xl text-xs tracking-wide transition-all ${
                view === 'leaderboard' ? 'bg-[#707CFF] text-white' : 'bg-[#F3F1EE] text-[#140C32]/30'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setView('activity')}
              className={`flex-1 py-2 rounded-xl text-xs tracking-wide transition-all ${
                view === 'activity' ? 'bg-[#707CFF] text-white' : 'bg-[#F3F1EE] text-[#140C32]/30'
              }`}
            >
              Friends
            </button>
          </div>

          {view === 'leaderboard' ? (
            <>
              <div className="text-[#140C32]/25 text-[10px] tracking-[0.15em] mb-4">WEEKLY RANKING</div>
              <div className="space-y-2.5">
                {friends
                  .sort((a, b) => b.weeklyDistance - a.weeklyDistance)
                  .map((friend, idx) => {
                    const rank = idx + 1;
                    const isGhost = selectedGhost?.type === 'friend' && selectedGhost.id === friend.id;
                    return (
                      <div
                        key={friend.id}
                        className="flex items-center gap-3 py-2.5 px-3 bg-[#F3F1EE]/60 rounded-xl"
                      >
                        <div className="w-6 text-center">
                          <span
                            className="text-xs tabular-nums"
                            style={{
                              fontFamily: 'Comfortaa, sans-serif',
                              color: rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : '#140C32',
                              opacity: rank <= 3 ? 1 : 0.25,
                            }}
                          >
                            {rank}
                            <span className="text-[8px]">{getRankSuffix(rank)}</span>
                          </span>
                        </div>
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs shrink-0"
                          style={{
                            backgroundColor: friend.color,
                            color: friend.color === '#D1DEDF' ? '#140C32' : 'white',
                            fontFamily: 'Comfortaa, sans-serif',
                          }}
                        >
                          {friend.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-[#140C32]">{friend.name}</div>
                          <div className="text-[10px] text-[#140C32]/25">
                            {friend.weeklyDistance}km this week
                          </div>
                        </div>
                        <button
                          onClick={() => onSelectGhost('friend', friend.id)}
                          className={`px-3 py-1.5 rounded-full text-[10px] tracking-wide transition-all active:scale-95 ${
                            isGhost
                              ? 'bg-[#707CFF] text-white'
                              : 'bg-[#D1DEDF]/30 text-[#140C32]/40'
                          }`}
                        >
                          {isGhost ? (
                            <span className="flex items-center gap-1">
                              <Check size={11} strokeWidth={2} />
                              Ghost
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <UserPlus size={11} strokeWidth={1.5} />
                              Race
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="text-[#140C32]/25 text-[10px] tracking-[0.15em] mb-4">YOUR FRIENDS</div>
              <div className="space-y-3">
                {friends.map((friend) => {
                  const isGhost = selectedGhost?.type === 'friend' && selectedGhost.id === friend.id;
                  return (
                    <div key={friend.id} className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{
                          backgroundColor: friend.color,
                          color: friend.color === '#D1DEDF' ? '#140C32' : 'white',
                          fontFamily: 'Comfortaa, sans-serif',
                        }}
                      >
                        {friend.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-[#140C32]">{friend.name}</span>
                          <button
                            onClick={() => onSelectGhost('friend', friend.id)}
                            className={`px-2.5 py-1 rounded-full text-[9px] tracking-wide transition-all active:scale-95 ${
                              isGhost
                                ? 'bg-[#707CFF] text-white'
                                : 'bg-[#D1DEDF]/30 text-[#140C32]/40'
                            }`}
                          >
                            {isGhost ? 'Ghost' : 'Add'}
                          </button>
                        </div>
                        <div className="text-xs text-[#140C32]/40">
                          {friend.lastActivity.action}{' '}
                          <span className="text-[#707CFF]">{friend.lastActivity.detail}</span>
                        </div>
                        <div className="text-[9px] text-[#140C32]/20 mt-0.5">
                          {friend.lastActivity.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Challenges */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Trophy size={13} strokeWidth={1.5} className="text-[#707CFF]" />
            <span className="text-[10px] text-[#140C32]/25 tracking-[0.15em]">ACTIVE CHALLENGES</span>
          </div>

          {/* Challenge Tabs */}
          <div className="flex gap-2 mb-3">
            {challenges.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChallenge(c.id)}
                className={`flex-1 py-2 px-3 rounded-2xl text-xs tracking-wide transition-all ${
                  selectedChallenge === c.id
                    ? 'bg-white text-[#140C32] shadow-sm shadow-black/3'
                    : 'bg-white/50 text-[#140C32]/30'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Challenge Card */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  Your Progress
                </div>
                <div className="text-[10px] text-[#140C32]/25 mt-0.5">
                  {currentChallenge.userCurrent} / {currentChallenge.goal} {currentChallenge.unit}
                </div>
              </div>
              <span
                className="text-2xl text-[#707CFF]"
                style={{ fontFamily: 'Comfortaa, sans-serif' }}
              >
                {currentChallenge.userProgress}%
              </span>
            </div>
            <div className="h-1 bg-[#F3F1EE] rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-[#707CFF] rounded-full transition-all"
                style={{ width: `${currentChallenge.userProgress}%` }}
              />
            </div>

            {/* Leaderboard */}
            <div className="text-[#140C32]/25 text-[9px] tracking-[0.15em] mb-3">STANDINGS</div>
            <div className="space-y-2">
              {currentChallenge.leaderboard.map((entry, idx) => {
                const friend = entry.friendId === 'you' ? null : getFriendById(entry.friendId);
                const isYou = entry.friendId === 'you';
                const yourRank = currentChallenge.leaderboard.findIndex((e) => e.friendId === 'you') + 1;
                const ahead = isYou ? 0 : idx < yourRank ? yourRank - idx - 1 : 0;
                const behind = isYou ? 0 : idx > yourRank ? idx - yourRank : 0;

                return (
                  <div
                    key={entry.friendId}
                    className={`flex items-center gap-2.5 py-2 px-3 rounded-xl ${
                      isYou ? 'bg-[#707CFF]/8 border border-[#707CFF]/15' : 'bg-[#F3F1EE]/60'
                    }`}
                  >
                    <span className="text-[10px] text-[#140C32]/15 w-3 tabular-nums">{idx + 1}</span>
                    {isYou ? (
                      <div className="w-7 h-7 rounded-full bg-[#707CFF] flex items-center justify-center text-white text-xs shrink-0" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        You
                      </div>
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] shrink-0"
                        style={{
                          backgroundColor: friend?.color || '#D1DEDF',
                          color: friend?.color === '#D1DEDF' ? '#140C32' : 'white',
                          fontFamily: 'Comfortaa, sans-serif',
                        }}
                      >
                        {friend?.initials || '??'}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-xs text-[#140C32]">
                        {isYou ? 'You' : friend?.name || 'Unknown'}
                      </div>
                      <div className="text-[9px] text-[#140C32]/20">
                        {entry.value} {currentChallenge.unit}
                      </div>
                    </div>
                    {entry.completed && (
                      <div className="flex items-center gap-1 text-[9px] text-green-600/70 bg-green-50 px-2 py-0.5 rounded-full">
                        <Check size={10} strokeWidth={2} />
                        Done
                      </div>
                    )}
                    {!isYou && ahead > 0 && (
                      <div className="flex items-center gap-0.5 text-[9px] text-red-500/50">
                        <TrendingUp size={11} strokeWidth={1.5} />
                        <span>+{ahead}</span>
                      </div>
                    )}
                    {!isYou && behind > 0 && (
                      <div className="flex items-center gap-0.5 text-[9px] text-green-600/50">
                        <TrendingDown size={11} strokeWidth={1.5} />
                        <span>-{behind}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Swim with Legends */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Star size={13} strokeWidth={1.5} className="text-[#707CFF]" />
            <span className="text-[10px] text-[#140C32]/25 tracking-[0.15em]">SWIM WITH LEGENDS</span>
          </div>
          {legends.map((legend) => (
            <div key={legend.id} className="bg-[#140C32] rounded-[24px] p-5 mb-3">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="text-white text-base" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                      {legend.name}
                    </div>
                    <div className="text-white/25 text-xs mt-0.5">{legend.specialty}</div>
                  </div>
                  <div className="bg-[#707CFF]/15 text-[#707CFF] text-[9px] px-3 py-1 rounded-full tracking-wide">
                    {legend.badge}
                  </div>
                </div>
                <div className="text-white/15 text-[10px] mb-1">Pace: {legend.pace}</div>
                <div className="text-white/25 text-[10px] mb-4">
                  {legend.sets.length} signature set{legend.sets.length !== 1 ? 's' : ''} available
                </div>

                <button
                onClick={() => onViewLegendSets(legend.id)}
                className="w-full bg-[#707CFF] text-white py-3 rounded-2xl text-xs tracking-wide flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
              >
                <Calendar size={13} strokeWidth={1.5} />
                View Sets
                <ChevronRight size={13} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}