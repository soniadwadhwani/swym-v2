import { User, Users, ArrowRight } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import waterVideo from '../../imports/water.mp4';

interface ChooseRoleScreenProps {
  onSelectRole: (role: 'swimmer' | 'coach') => void;
}

export function ChooseRoleScreen({ onSelectRole }: ChooseRoleScreenProps) {
  return (
    <div className="relative h-screen overflow-hidden bg-[#111033] flex flex-col items-center justify-center px-6">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src={waterVideo}
        onLoadedData={(e) => {
          const video = e.target as HTMLVideoElement;
          video.play().catch(() => {});
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,16,51,0.72)] via-[rgba(15,14,45,0.8)] to-[rgba(10,12,35,0.88)]" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
      <div className="relative z-10 flex flex-col items-center w-full">
        <img src={swymLogo} alt="SWYM" className="w-40 mb-8 opacity-80" />

        <h1 className="text-3xl text-white text-center mb-3 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Choose Your Role
        </h1>

        <p className="text-white/50 text-center text-sm mb-12 max-w-xs">
          Select how you want to experience SWYM
        </p>

        <div className="w-full max-w-sm space-y-4">
          {/* Swimmer Option */}
          <button
            onClick={() => onSelectRole('swimmer')}
            className="w-full bg-[#2A324E]/50 backdrop-blur-lg border-2 border-white/10 hover:border-[#98C0C8]/40 rounded-3xl p-6 text-left active:scale-[0.98] transition-all group"
          >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#334F6B]/20 group-hover:bg-[#334F6B]/30 flex items-center justify-center transition-colors">
              <User size={28} strokeWidth={1.5} className="text-[#98C0C8]" />
            </div>
            <div className="flex-1">
              <div className="text-white text-xl mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Swimmer</div>
              <div className="text-white/40 text-sm">Train, compete, and improve</div>
            </div>
            <ArrowRight size={20} strokeWidth={1.5} className="text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
          <div className="flex gap-2">
            <span className="text-xs bg-[#334F6B]/20 text-[#98C0C8] px-3 py-1 rounded-full">Personal Training</span>
            <span className="text-xs bg-[#334F6B]/20 text-[#98C0C8] px-3 py-1 rounded-full">AI Coaching</span>
          </div>
        </button>

          {/* Coach Option */}
          <button
            onClick={() => onSelectRole('coach')}
            className="w-full bg-[#2A324E]/50 backdrop-blur-lg border-2 border-white/10 hover:border-[#98C0C8]/40 rounded-3xl p-6 text-left active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#334F6B]/20 group-hover:bg-[#334F6B]/30 flex items-center justify-center transition-colors">
                <Users size={28} strokeWidth={1.5} className="text-[#98C0C8]" />
              </div>
              <div className="flex-1">
                <div className="text-white text-xl mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Coach</div>
                <div className="text-white/40 text-sm">Manage teams and athletes</div>
              </div>
              <ArrowRight size={20} strokeWidth={1.5} className="text-white/30 group-hover:text-white/60 transition-colors" />
            </div>
            <div className="flex gap-2">
              <span className="text-xs bg-[#334F6B]/20 text-[#98C0C8] px-3 py-1 rounded-full">Team Dashboard</span>
              <span className="text-xs bg-[#334F6B]/20 text-[#98C0C8] px-3 py-1 rounded-full">AI Insights</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
