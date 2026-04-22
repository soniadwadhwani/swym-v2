import { useState } from 'react';
import { Users, BarChart3, Home, User, Brain } from 'lucide-react';
import { CoachHome } from './CoachHome';
import { CoachTeam } from './CoachTeam';
import { CoachAI } from './CoachAI';
import { CoachAnalytics } from './CoachAnalytics';
import { CoachProfile } from './CoachProfile';

interface CoachDashboardProps {
  onSwitchToSwimmer?: () => void;
}

export function CoachDashboard({ onSwitchToSwimmer }: CoachDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'team' | 'ai' | 'analytics' | 'profile'>('home');
  const [aiAutoGenerate, setAiAutoGenerate] = useState(false);

  const handleGeneratePlan = () => {
    setAiAutoGenerate(true);
    setActiveTab('ai');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <CoachHome onGeneratePlan={handleGeneratePlan} onSwitchToSwimmer={onSwitchToSwimmer} />;
      case 'team':
        return <CoachTeam />;
      case 'ai':
        return <CoachAI autoGenerate={aiAutoGenerate} />;
      case 'analytics':
        return <CoachAnalytics />;
      case 'profile':
        return <CoachProfile onLogout={() => {}} />;
      default:
        return <CoachHome onGeneratePlan={handleGeneratePlan} onSwitchToSwimmer={onSwitchToSwimmer} />;
    }
  };

  return (
    <div className="size-full bg-[#111033] max-w-md mx-auto relative overflow-hidden">
      <div className="h-full overflow-y-auto overflow-x-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[360px]">
        <div className="bg-[#111033]/95 backdrop-blur-xl rounded-full px-1.5 py-1.5 flex justify-around items-center shadow-2xl shadow-black/50 border border-white/[0.04]">
          <button
            onClick={() => {
              setActiveTab('home');
              setAiAutoGenerate(false);
            }}
            className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-full transition-all duration-300 ${
              activeTab === 'home'
                ? 'bg-[#334F6B] text-white'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            <Home size={17} strokeWidth={activeTab === 'home' ? 2 : 1.5} />
            {activeTab === 'home' && (
              <span className="text-[10px] tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Home
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('team');
              setAiAutoGenerate(false);
            }}
            className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-full transition-all duration-300 ${
              activeTab === 'team'
                ? 'bg-[#334F6B] text-white'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            <Users size={17} strokeWidth={activeTab === 'team' ? 2 : 1.5} />
            {activeTab === 'team' && (
              <span className="text-[10px] tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Team
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('ai');
              setAiAutoGenerate(false);
            }}
            className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-full transition-all duration-300 ${
              activeTab === 'ai'
                ? 'bg-[#334F6B] text-white'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            <Brain size={17} strokeWidth={activeTab === 'ai' ? 2 : 1.5} />
            {activeTab === 'ai' && (
              <span className="text-[10px] tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                AI
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('analytics');
              setAiAutoGenerate(false);
            }}
            className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-full transition-all duration-300 ${
              activeTab === 'analytics'
                ? 'bg-[#334F6B] text-white'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            <BarChart3 size={17} strokeWidth={activeTab === 'analytics' ? 2 : 1.5} />
            {activeTab === 'analytics' && (
              <span className="text-[10px] tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Data
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('profile');
              setAiAutoGenerate(false);
            }}
            className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-full transition-all duration-300 ${
              activeTab === 'profile'
                ? 'bg-[#334F6B] text-white'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            <User size={17} strokeWidth={activeTab === 'profile' ? 2 : 1.5} />
            {activeTab === 'profile' && (
              <span className="text-[10px] tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                You
              </span>
            )}
          </button>
        </div>
      </nav>

    </div>
  );
}
