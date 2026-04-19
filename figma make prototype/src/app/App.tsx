import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { TrainScreen } from './components/TrainScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SetOverviewScreen } from './components/SetOverviewScreen';
import { LegendSetsViewer } from './components/LegendSetsViewer';
import { WorkoutReviewScreen } from './components/WorkoutReviewScreen';
import { SetDetailScreen } from './components/SetDetailScreen';

export interface Drill {
  id: string;
  type: string;
  stroke: string;
  distance: number;
  paceMin: number;
  paceSec: number;
  rest: number;
  reps: number;
}

export interface PlannedSet {
  name: string;
  drills: Drill[];
  startHour: number;
  startMinute: number;
  startPeriod: 'AM' | 'PM';
  date: string; // YYYY-MM-DD
}

export interface Friend {
  id: string;
  name: string;
  initials: string;
  color: string;
  weeklyDistance: number;
  lastActivity: {
    action: string;
    detail: string;
    time: string;
  };
}

export interface Legend {
  id: string;
  name: string;
  specialty: string;
  badge: string;
  pace: string;
  sets: PlannedSet[];
}

export interface LapData {
  lapNumber: number;
  timeSeconds: number;
  pace100m: number;
  restAfter: number;
  stroke: string;
}

export interface CompletedSet {
  id: string;
  type: string;
  stroke: string;
  targetDistance: number;
  targetPace: number;
  actualDistance: number;
  totalTimeSeconds: number;
  avgPace100m: number;
  laps: LapData[];
  restAfterSet: number;
}

export interface CompletedWorkout {
  id: string;
  date: string;
  name: string;
  startTime: string;
  endTime: string;
  totalDistance: number;
  totalDuration: number;
  avgPace100m: number;
  sets: CompletedSet[];
  aiSummary: string;
  aiInsights: string[];
}

// Mock historical sets
const MOCK_HISTORY: Record<string, PlannedSet> = {
  '2026-04-17': {
    name: 'Sprint Power',
    drills: [
      { id: 'h1', type: 'warmup', stroke: 'Freestyle', distance: 300, paceMin: 1, paceSec: 50, rest: 10, reps: 1 },
      { id: 'h2', type: 'sprint', stroke: 'Freestyle', distance: 50, paceMin: 0, paceSec: 40, rest: 30, reps: 8 },
      { id: 'h3', type: 'cooldown', stroke: 'Choice', distance: 200, paceMin: 2, paceSec: 0, rest: 0, reps: 1 },
    ],
    startHour: 7, startMinute: 0, startPeriod: 'AM', date: '2026-04-17',
  },
  '2026-04-16': {
    name: 'Endurance Builder',
    drills: [
      { id: 'h4', type: 'warmup', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 45, rest: 15, reps: 1 },
      { id: 'h5', type: 'main', stroke: 'Freestyle', distance: 200, paceMin: 1, paceSec: 35, rest: 20, reps: 6 },
      { id: 'h6', type: 'kick', stroke: 'Freestyle', distance: 100, paceMin: 2, paceSec: 0, rest: 10, reps: 4 },
      { id: 'h7', type: 'cooldown', stroke: 'Backstroke', distance: 200, paceMin: 2, paceSec: 10, rest: 0, reps: 1 },
    ],
    startHour: 6, startMinute: 30, startPeriod: 'AM', date: '2026-04-16',
  },
  '2026-04-14': {
    name: 'Technique Focus',
    drills: [
      { id: 'h8', type: 'warmup', stroke: 'Freestyle', distance: 200, paceMin: 1, paceSec: 50, rest: 10, reps: 1 },
      { id: 'h9', type: 'drill', stroke: 'Butterfly', distance: 50, paceMin: 1, paceSec: 15, rest: 20, reps: 6 },
      { id: 'h10', type: 'drill', stroke: 'Backstroke', distance: 50, paceMin: 1, paceSec: 20, rest: 20, reps: 6 },
      { id: 'h11', type: 'cooldown', stroke: 'Choice', distance: 200, paceMin: 2, paceSec: 0, rest: 0, reps: 1 },
    ],
    startHour: 8, startMinute: 0, startPeriod: 'AM', date: '2026-04-14',
  },
};

// Mock Friends
const MOCK_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Sonia Kumar',
    initials: 'SK',
    color: '#707CFF',
    weeklyDistance: 12.4,
    lastActivity: { action: 'hit a new PB', detail: '1:22/100m', time: '2h ago' },
  },
  {
    id: 'f2',
    name: 'Arjun Patel',
    initials: 'AP',
    color: '#140C32',
    weeklyDistance: 8.2,
    lastActivity: { action: 'completed', detail: '4.2km endurance', time: '4h ago' },
  },
  {
    id: 'f3',
    name: 'Maya Chen',
    initials: 'MC',
    color: '#D1DEDF',
    weeklyDistance: 10.1,
    lastActivity: { action: 'achieved', detail: '5-day streak', time: '6h ago' },
  },
];

// Mock Completed Workouts
const MOCK_COMPLETED_WORKOUT: CompletedWorkout = {
  id: 'cw1',
  date: '2026-04-17',
  name: 'Morning Endurance',
  startTime: '6:30 AM',
  endTime: '7:22 AM',
  totalDistance: 2400,
  totalDuration: 3120, // 52 minutes in seconds
  avgPace100m: 86, // 1:26/100m
  sets: [
    {
      id: 'cs1',
      type: 'warmup',
      stroke: 'Freestyle',
      targetDistance: 400,
      targetPace: 105,
      actualDistance: 400,
      totalTimeSeconds: 425,
      avgPace100m: 106,
      restAfterSet: 30,
      laps: [
        { lapNumber: 1, timeSeconds: 55, pace100m: 110, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 2, timeSeconds: 54, pace100m: 108, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 3, timeSeconds: 52, pace100m: 104, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 4, timeSeconds: 53, pace100m: 106, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 5, timeSeconds: 51, pace100m: 102, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 6, timeSeconds: 52, pace100m: 104, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 7, timeSeconds: 51, pace100m: 102, restAfter: 5, stroke: 'Freestyle' },
        { lapNumber: 8, timeSeconds: 52, pace100m: 104, restAfter: 5, stroke: 'Freestyle' },
      ],
    },
    {
      id: 'cs2',
      type: 'main',
      stroke: 'Freestyle',
      targetDistance: 1200,
      targetPace: 85,
      actualDistance: 1200,
      totalTimeSeconds: 1065,
      avgPace100m: 89,
      restAfterSet: 45,
      laps: [
        { lapNumber: 1, timeSeconds: 43, pace100m: 86, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 2, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 3, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 4, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 5, timeSeconds: 46, pace100m: 92, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 6, timeSeconds: 47, pace100m: 94, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 7, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 8, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 9, timeSeconds: 43, pace100m: 86, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 10, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 11, timeSeconds: 46, pace100m: 92, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 12, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 13, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 14, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 15, timeSeconds: 46, pace100m: 92, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 16, timeSeconds: 47, pace100m: 94, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 17, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 18, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 19, timeSeconds: 43, pace100m: 86, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 20, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 21, timeSeconds: 45, pace100m: 90, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 22, timeSeconds: 46, pace100m: 92, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 23, timeSeconds: 44, pace100m: 88, restAfter: 8, stroke: 'Freestyle' },
        { lapNumber: 24, timeSeconds: 42, pace100m: 84, restAfter: 8, stroke: 'Freestyle' },
      ],
    },
    {
      id: 'cs3',
      type: 'sprint',
      stroke: 'Freestyle',
      targetDistance: 400,
      targetPace: 72,
      actualDistance: 400,
      totalTimeSeconds: 345,
      avgPace100m: 76,
      restAfterSet: 60,
      laps: [
        { lapNumber: 1, timeSeconds: 38, pace100m: 76, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 2, timeSeconds: 37, pace100m: 74, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 3, timeSeconds: 39, pace100m: 78, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 4, timeSeconds: 38, pace100m: 76, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 5, timeSeconds: 37, pace100m: 74, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 6, timeSeconds: 36, pace100m: 72, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 7, timeSeconds: 38, pace100m: 76, restAfter: 15, stroke: 'Freestyle' },
        { lapNumber: 8, timeSeconds: 37, pace100m: 74, restAfter: 15, stroke: 'Freestyle' },
      ],
    },
    {
      id: 'cs4',
      type: 'cooldown',
      stroke: 'Backstroke',
      targetDistance: 400,
      targetPace: 120,
      actualDistance: 400,
      totalTimeSeconds: 485,
      avgPace100m: 121,
      restAfterSet: 0,
      laps: [
        { lapNumber: 1, timeSeconds: 62, pace100m: 124, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 2, timeSeconds: 60, pace100m: 120, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 3, timeSeconds: 61, pace100m: 122, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 4, timeSeconds: 60, pace100m: 120, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 5, timeSeconds: 59, pace100m: 118, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 6, timeSeconds: 61, pace100m: 122, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 7, timeSeconds: 60, pace100m: 120, restAfter: 5, stroke: 'Backstroke' },
        { lapNumber: 8, timeSeconds: 61, pace100m: 122, restAfter: 5, stroke: 'Backstroke' },
      ],
    },
  ],
  aiSummary: 'Strong workout with consistent pacing. Your warmup showed progressive improvement, dropping from 110s to 102s per 100m. The main set revealed slight fatigue between laps 5-6 and 15-16, but you recovered well and finished strong with an 84s final lap.',
  aiInsights: [
    'Mid-set pacing: You tend to slow down around the halfway point of longer sets. Consider mental checkpoints every 400m to maintain focus.',
    'Strong finishes: Your last 2-3 laps are consistently faster, showing good energy management and mental toughness.',
    'Sprint efficiency: Your 50m sprint times are excellent (72-78s/100m), indicating strong anaerobic capacity.',
    'Rest optimization: You took consistent 8s rest between laps. Try reducing to 6s on recovery days to build endurance.',
  ],
};

// Mock Legends with Sets
const MOCK_LEGENDS: Legend[] = [
  {
    id: 'l1',
    name: 'Katie Ledecky',
    specialty: 'Distance Freestyle',
    badge: 'Olympic Gold',
    pace: '1:02/100m',
    sets: [
      {
        name: 'Olympic Distance Prep',
        drills: [
          { id: 'kl1', type: 'warmup', stroke: 'Freestyle', distance: 600, paceMin: 1, paceSec: 20, rest: 15, reps: 1 },
          { id: 'kl2', type: 'main', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 5, rest: 30, reps: 6 },
          { id: 'kl3', type: 'sprint', stroke: 'Freestyle', distance: 100, paceMin: 0, paceSec: 58, rest: 45, reps: 4 },
          { id: 'kl4', type: 'cooldown', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 30, rest: 0, reps: 1 },
        ],
        startHour: 5, startMinute: 30, startPeriod: 'AM', date: '2026-04-19',
      },
      {
        name: 'Endurance Base Builder',
        drills: [
          { id: 'kl5', type: 'warmup', stroke: 'Freestyle', distance: 800, paceMin: 1, paceSec: 25, rest: 20, reps: 1 },
          { id: 'kl6', type: 'main', stroke: 'Freestyle', distance: 500, paceMin: 1, paceSec: 8, rest: 25, reps: 8 },
          { id: 'kl7', type: 'cooldown', stroke: 'Choice', distance: 300, paceMin: 1, paceSec: 40, rest: 0, reps: 1 },
        ],
        startHour: 6, startMinute: 0, startPeriod: 'AM', date: '2026-04-19',
      },
    ],
  },
  {
    id: 'l2',
    name: 'Caeleb Dressel',
    specialty: 'Sprint Butterfly',
    badge: 'World Record',
    pace: '0:49/100m',
    sets: [
      {
        name: 'Explosive Power Sprint',
        drills: [
          { id: 'cd1', type: 'warmup', stroke: 'Freestyle', distance: 400, paceMin: 1, paceSec: 30, rest: 15, reps: 1 },
          { id: 'cd2', type: 'drill', stroke: 'Butterfly', distance: 50, paceMin: 1, paceSec: 10, rest: 30, reps: 6 },
          { id: 'cd3', type: 'sprint', stroke: 'Butterfly', distance: 50, paceMin: 0, paceSec: 48, rest: 60, reps: 10 },
          { id: 'cd4', type: 'sprint', stroke: 'Freestyle', distance: 25, paceMin: 0, paceSec: 22, rest: 40, reps: 8 },
          { id: 'cd5', type: 'cooldown', stroke: 'Backstroke', distance: 200, paceMin: 2, paceSec: 0, rest: 0, reps: 1 },
        ],
        startHour: 7, startMinute: 30, startPeriod: 'AM', date: '2026-04-19',
      },
      {
        name: 'Race Day Simulation',
        drills: [
          { id: 'cd6', type: 'warmup', stroke: 'Freestyle', distance: 300, paceMin: 1, paceSec: 35, rest: 10, reps: 1 },
          { id: 'cd7', type: 'drill', stroke: 'Butterfly', distance: 50, paceMin: 1, paceSec: 5, rest: 25, reps: 4 },
          { id: 'cd8', type: 'sprint', stroke: 'Butterfly', distance: 100, paceMin: 0, paceSec: 50, rest: 120, reps: 3 },
          { id: 'cd9', type: 'cooldown', stroke: 'Choice', distance: 200, paceMin: 2, paceSec: 10, rest: 0, reps: 1 },
        ],
        startHour: 8, startMinute: 0, startPeriod: 'AM', date: '2026-04-19',
      },
    ],
  },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [showSetOverview, setShowSetOverview] = useState(false);
  const [todaySet, setTodaySet] = useState<PlannedSet | null>(null);
  const [setHistory, setSetHistory] = useState<Record<string, PlannedSet>>(MOCK_HISTORY);
  const [selectedGhost, setSelectedGhost] = useState<{ type: 'friend' | 'legend'; id: string } | null>(null);
  const [viewingLegendSets, setViewingLegendSets] = useState<string | null>(null);
  const [viewingWorkout, setViewingWorkout] = useState(false);
  const [viewingSetDetail, setViewingSetDetail] = useState<string | null>(null);

  const handleSaveSet = (set: PlannedSet) => {
    setTodaySet(set);
    setSetHistory(prev => ({ ...prev, [set.date]: set }));
    setActiveScreen('home');
  };

  const handleEditSet = () => {
    setShowSetOverview(false);
    setActiveScreen('train');
  };

  const handleSelectGhost = (type: 'friend' | 'legend', id: string) => {
    if (selectedGhost?.type === type && selectedGhost?.id === id) {
      setSelectedGhost(null);
    } else {
      setSelectedGhost({ type, id });
    }
  };

  const handleViewLegendSets = (legendId: string) => {
    setViewingLegendSets(legendId);
  };

  const handleCopyLegendSet = (set: PlannedSet) => {
    const newDrills = set.drills.map(d => ({ ...d, id: Date.now().toString() + Math.random() }));
    const copiedSet: PlannedSet = {
      ...set,
      name: set.name + ' (Legend)',
      drills: newDrills,
      date: new Date().toISOString().split('T')[0],
    };
    setTodaySet(copiedSet);
    setViewingLegendSets(null);
    setActiveScreen('train');
  };

  if (showSetOverview && todaySet) {
    return (
      <div className="size-full bg-[#F3F1EE] max-w-md mx-auto relative overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <SetOverviewScreen
            set={todaySet}
            onBack={() => setShowSetOverview(false)}
            onEdit={handleEditSet}
            selectedGhost={selectedGhost}
            friends={MOCK_FRIENDS}
            legends={MOCK_LEGENDS}
          />
        </div>
      </div>
    );
  }

  if (viewingLegendSets) {
    const legend = MOCK_LEGENDS.find(l => l.id === viewingLegendSets);
    if (!legend) {
      setViewingLegendSets(null);
      return null;
    }

    return (
      <div className="size-full bg-[#F3F1EE] max-w-md mx-auto relative overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <LegendSetsViewer
            legend={legend}
            onBack={() => setViewingLegendSets(null)}
            onCopySet={handleCopyLegendSet}
            selectedGhost={selectedGhost}
            onSelectGhost={handleSelectGhost}
          />
        </div>
      </div>
    );
  }

  if (viewingSetDetail) {
    return (
      <div className="size-full bg-[#F3F1EE] max-w-md mx-auto relative overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <SetDetailScreen
            workout={MOCK_COMPLETED_WORKOUT}
            setId={viewingSetDetail}
            onBack={() => {
              setViewingSetDetail(null);
              setViewingWorkout(true);
            }}
          />
        </div>
      </div>
    );
  }

  if (viewingWorkout) {
    return (
      <div className="size-full bg-[#F3F1EE] max-w-md mx-auto relative overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <WorkoutReviewScreen
            workout={MOCK_COMPLETED_WORKOUT}
            onBack={() => {
              setViewingWorkout(false);
              setActiveScreen('analytics');
            }}
            onViewSet={(setId) => {
              setViewingWorkout(false);
              setViewingSetDetail(setId);
            }}
          />
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <HomeScreen
            todaySet={todaySet}
            onCreateSet={() => setActiveScreen('train')}
            onStartWorkout={() => setShowSetOverview(true)}
          />
        );
      case 'train':
        return (
          <TrainScreen
            todaySet={todaySet}
            setHistory={setHistory}
            onSaveSet={handleSaveSet}
            friends={MOCK_FRIENDS}
            legends={MOCK_LEGENDS}
            selectedGhost={selectedGhost}
            onSelectGhost={handleSelectGhost}
          />
        );
      case 'community':
        return (
          <CommunityScreen
            friends={MOCK_FRIENDS}
            legends={MOCK_LEGENDS}
            selectedGhost={selectedGhost}
            onSelectGhost={handleSelectGhost}
            onViewLegendSets={handleViewLegendSets}
          />
        );
      case 'analytics':
        return (
          <AnalyticsScreen
            recentWorkout={MOCK_COMPLETED_WORKOUT}
            onViewWorkout={() => setViewingWorkout(true)}
          />
        );
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen todaySet={todaySet} onCreateSet={() => setActiveScreen('train')} onStartWorkout={() => setShowSetOverview(true)} />;
    }
  };

  const showBottomNav = !viewingWorkout && !viewingSetDetail;

  return (
    <div className="size-full bg-[#F3F1EE] max-w-md mx-auto relative overflow-hidden">
      <div className="h-full overflow-y-auto overflow-x-hidden">
        {renderScreen()}
      </div>
      {showBottomNav && <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />}
    </div>
  );
}