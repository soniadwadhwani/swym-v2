import { ArrowRight } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import waterVideo from '../../imports/water.mp4';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  return (
    <div className="relative h-screen overflow-hidden bg-[#111033]">
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

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 pb-20">
        <div className="flex flex-col items-center text-center max-w-md">
          {/* Logo */}
          <img src={swymLogo} alt="SWYM" className="w-64 mb-10 drop-shadow-2xl brightness-110" />

          {/* Headline */}
          <h1 className="text-3xl text-white mb-5 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Swim Your Pace
          </h1>

          {/* Subtext */}
          <p className="text-white/50 text-lg mb-20 leading-relaxed tracking-wide">
            Train smarter. Swim stronger. Compete globally.
          </p>

          {/* CTA Buttons */}
          <div className="w-full max-w-sm space-y-3">
            <button
              onClick={onGetStarted}
              className="w-full bg-[#98C0C8] text-[#111033] py-5 rounded-3xl text-lg tracking-wide shadow-2xl shadow-[#98C0C8]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={22} strokeWidth={1.5} />
            </button>
            <button
              onClick={onLogin}
              className="w-full bg-transparent border-2 border-white/20 backdrop-blur-lg text-white py-5 rounded-3xl text-lg tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:border-white/40"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
