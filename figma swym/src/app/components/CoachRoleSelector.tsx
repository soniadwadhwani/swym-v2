import { Users, User, ArrowRight } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';

interface CoachRoleSelectorProps {
  onSelectMode: (mode: 'coach' | 'swimmer') => void;
}

export function CoachRoleSelector({ onSelectMode }: CoachRoleSelectorProps) {
  return (
    <div className="h-screen bg-[#111033] flex flex-col items-center justify-center px-6">
      <img src={swymLogo} alt="SWYM" className="w-40 mb-8 opacity-80" />
      
      <h1 className="text-3xl text-white text-center mb-3 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
        Welcome, Coach
      </h1>
      
      <p className="text-white/50 text-center text-sm mb-12 max-w-xs">
        Choose your view mode
      </p>

      <div className="w-full max-w-sm space-y-4">
        {/* Coach Mode */}
        <button
          onClick={() => onSelectMode('coach')}
          className="w-full bg-[#2A324E] border-2 border-[#334F6B] rounded-3xl p-6 text-left active:scale-[0.98] transition-all group shadow-lg shadow-[#334F6B]/20"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-[#334F6B]/30 flex items-center justify-center">
              <Users size={28} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white text-xl mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Continue as Coach</div>
              <div className="text-white/50 text-sm">Manage your team and athletes</div>
            </div>
            <ArrowRight size={20} strokeWidth={1.5} className="text-white/60" />
          </div>
        </button>

        {/* Swimmer View */}
        <button
          onClick={() => onSelectMode('swimmer')}
          className="w-full bg-[#2A324E] border-2 border-[#334F6B]/30 hover:border-[#334F6B]/60 rounded-3xl p-6 text-left active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#334F6B]/15 flex items-center justify-center">
              <User size={28} strokeWidth={1.5} className="text-[#98C0C8]" />
            </div>
            <div className="flex-1">
              <div className="text-white text-xl mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>View Swimmer Mode</div>
              <div className="text-white/40 text-sm">Experience as an athlete</div>
            </div>
            <ArrowRight size={20} strokeWidth={1.5} className="text-white/30 group-hover:text-white/50 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
}
