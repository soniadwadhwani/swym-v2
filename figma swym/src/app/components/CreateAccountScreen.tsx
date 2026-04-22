import { useState } from 'react';
import { ArrowRight, User, Mail, Lock } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import waterVideo from '../../imports/water.mp4';

interface CreateAccountScreenProps {
  onCreateAccount: (role: 'swimmer' | 'coach') => void;
  onGoToLogin: () => void;
}

export function CreateAccountScreen({ onCreateAccount, onGoToLogin }: CreateAccountScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'swimmer' | 'coach'>('swimmer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAccount(role);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111033] flex flex-col">
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
      {/* Header */}
      <div className="relative z-10 flex items-center justify-center px-6 pt-14 pb-8">
        <img src={swymLogo} alt="SWYM" className="h-8 opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pb-12">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl text-white text-center mb-3 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Create Account
          </h1>
          <p className="text-white/30 text-center text-sm mb-10">
            Start your swim training journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-white/40 text-xs tracking-wide mb-2 ml-1">FULL NAME</label>
              <div className="relative">
                <User size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#2A324E]/50 backdrop-blur-lg border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#98C0C8]/40 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/40 text-xs tracking-wide mb-2 ml-1">EMAIL</label>
              <div className="relative">
                <Mail size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#2A324E]/50 backdrop-blur-lg border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#98C0C8]/40 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-white/40 text-xs tracking-wide mb-2 ml-1">USERNAME</label>
              <div className="relative">
                <User size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose username"
                  className="w-full bg-[#2A324E]/50 backdrop-blur-lg border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#98C0C8]/40 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/40 text-xs tracking-wide mb-2 ml-1">PASSWORD</label>
              <div className="relative">
                <Lock size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full bg-[#2A324E]/50 backdrop-blur-lg border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#98C0C8]/40 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-white/40 text-xs tracking-wide mb-3 ml-1">I AM A</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('swimmer')}
                  className={`py-4 rounded-2xl text-sm tracking-wide transition-all backdrop-blur-lg ${
                    role === 'swimmer'
                      ? 'bg-[#98C0C8]/20 text-[#98C0C8] border-2 border-[#98C0C8]/40'
                      : 'bg-[#2A324E]/30 text-white/40 border-2 border-white/10'
                  }`}
                >
                  Swimmer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('coach')}
                  className={`py-4 rounded-2xl text-sm tracking-wide transition-all backdrop-blur-lg ${
                    role === 'coach'
                      ? 'bg-[#98C0C8]/20 text-[#98C0C8] border-2 border-[#98C0C8]/40'
                      : 'bg-[#2A324E]/30 text-white/40 border-2 border-white/10'
                  }`}
                >
                  Coach
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#98C0C8] text-[#111033] py-5 rounded-3xl text-base tracking-wide shadow-xl shadow-[#98C0C8]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8"
            >
              Create Account
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <button
              onClick={onGoToLogin}
              className="text-white/30 text-sm active:text-white/50 transition-colors"
            >
              Already have an account? <span className="text-[#98C0C8]">Log In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
