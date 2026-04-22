import { useState } from 'react';
import { ArrowRight, Lock, User } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import waterVideo from '../../imports/water.mp4';

interface LoginScreenProps {
  onLogin: (username: string, password: string, role: 'swimmer' | 'coach') => void;
  onBack: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Show loading state for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo credentials
    const validCredentials = {
      swimmer: { username: 'swimmer', password: '000' },
      coach: { username: 'coach', password: '000' },
    };

    // Check both accounts
    if (username === validCredentials.swimmer.username && password === validCredentials.swimmer.password) {
      onLogin(username, password, 'swimmer');
    } else if (username === validCredentials.coach.username && password === validCredentials.coach.password) {
      onLogin(username, password, 'coach');
    } else {
      setError('Incorrect username or password');
      setIsLoading(false);
    }
  };

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
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 text-white/50 text-sm hover:text-white/80 transition-colors"
      >
        ← Back
      </button>

      <div className="relative z-10 flex flex-col items-center w-full">
        <img src={swymLogo} alt="SWYM" className="w-40 mb-8 opacity-80" />

        <h1 className="text-3xl text-white text-center mb-2 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Sign In
        </h1>

        <p className="text-white/50 text-center text-sm mb-10">
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Username */}
        <div>
          <label className="block text-white/60 text-sm mb-2 ml-1">Username</label>
          <div className="relative">
            <User size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Enter username"
              className={`w-full bg-[#2A324E]/50 backdrop-blur-lg border rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none transition-colors ${
                error ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-[#98C0C8]/40'
              }`}
              autoFocus
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-white/60 text-sm mb-2 ml-1">Password</label>
          <div className="relative">
            <Lock size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              className={`w-full bg-[#2A324E]/50 backdrop-blur-lg border rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none transition-colors ${
                error ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-[#98C0C8]/40'
              }`}
              disabled={isLoading}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-400 text-sm ml-1">
            {error}
          </div>
        )}

        {/* Demo Credentials */}
        <div className="bg-[#2A324E]/50 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3">
          <p className="text-white/40 text-xs mb-1">Demo Credentials:</p>
          <p className="text-white/60 text-sm font-mono">swimmer / 000</p>
          <p className="text-white/60 text-sm font-mono">coach / 000</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#98C0C8] text-[#111033] py-4 rounded-2xl text-base tracking-wide shadow-lg shadow-[#98C0C8]/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-[#111033]/30 border-t-[#111033] rounded-full animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={20} strokeWidth={1.5} />
            </>
          )}
        </button>
      </form>
      </div>
    </div>
  );
}
