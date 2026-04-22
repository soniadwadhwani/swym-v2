import { Home, Activity, Users, Zap, User } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'train', icon: Activity, label: 'Train' },
    { id: 'community', icon: Users, label: 'Social' },
    { id: 'coach', icon: Zap, label: 'Coach' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[360px]">
      <div className="bg-[#111033]/95 backdrop-blur-xl rounded-full px-1.5 py-1.5 flex justify-around items-center shadow-2xl shadow-black/50 border border-white/[0.04]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 py-2.5 px-4 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[#334F6B] text-white'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              <Icon size={17} strokeWidth={isActive ? 2 : 1.5} />
              {isActive && (
                <span className="text-[10px] tracking-wide" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}