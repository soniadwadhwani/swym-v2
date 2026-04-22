import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import waterVideo from '../../imports/water.mp4';

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const screens = [
    {
      title: 'Train Smarter',
      body: 'AI coaching built around your pace, recovery, and performance.',
      visual: 'analytics',
    },
    {
      title: 'Swim Connected',
      body: 'Pair your device for real-time pacing and live in-water feedback.',
      visual: 'device',
    },
    {
      title: 'Compete Globally',
      body: 'Race swimmers worldwide, challenge friends, earn badges.',
      visual: 'compete',
    },
  ];

  const handleNext = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentScreen = screens[currentStep];

  return (
    <div className="relative h-screen overflow-hidden bg-[#111033] flex flex-col">
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
      {/* Skip Button */}
      <div className="relative z-10 flex justify-end px-6 pt-14 pb-6">
        <button
          onClick={onSkip}
          className="text-white/30 text-sm tracking-wide active:scale-95 transition-transform"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-6 pb-16">
        {/* Visual */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          {currentScreen.visual === 'analytics' && (
            <div className="relative w-full h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-[#98C0C8]/20 to-[#334F6B]/20 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col gap-4 items-center justify-center h-full">
                <div className="flex gap-2">
                  {[40, 60, 35, 70, 45, 65].map((height, i) => (
                    <div
                      key={i}
                      className="w-3 bg-gradient-to-t from-[#98C0C8] to-[#D4ECF1] rounded-full"
                      style={{ height: `${height}px`, opacity: 0.6 + i * 0.1 }}
                    />
                  ))}
                </div>
                <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#98C0C8] to-transparent opacity-40" />
                <div className="text-white/20 text-xs tracking-[0.3em] mt-4">PERFORMANCE</div>
              </div>
            </div>
          )}
          {currentScreen.visual === 'device' && (
            <div className="relative w-full h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-[#F6AA38]/20 to-[#334F6B]/20 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2A324E] to-[#334F6B] border-4 border-[#98C0C8]/30 shadow-2xl shadow-[#98C0C8]/20" />
                  <div className="absolute -inset-8 rounded-full border border-[#98C0C8]/20 animate-pulse" />
                  <div className="absolute -inset-12 rounded-full border border-[#98C0C8]/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          )}
          {currentScreen.visual === 'compete' && (
            <div className="relative w-full h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 bg-gradient-to-br from-[#98C0C8]/20 to-[#F6AA38]/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3">
                {[1, 2, 3].map((rank) => (
                  <div
                    key={rank}
                    className="flex items-center gap-4 w-64 bg-[#2A324E]/50 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3"
                    style={{ opacity: 1 - (rank - 1) * 0.2 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      rank === 1 ? 'bg-[#F6AA38]/30 text-[#F6AA38]' : 'bg-white/5 text-white/30'
                    }`}>
                      {rank}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-[#98C0C8]/30 rounded-full" style={{ width: `${100 - rank * 15}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="w-full max-w-sm text-center mb-12">
          <h1 className="text-5xl text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            {currentScreen.title}
          </h1>
          <p className="text-white/40 text-base leading-relaxed">
            {currentScreen.body}
          </p>
        </div>

        {/* Progress & CTA */}
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-10 bg-[#F6AA38]'
                    : 'w-1 bg-white/10'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-[#98C0C8] text-[#111033] py-5 rounded-3xl text-base tracking-wide shadow-xl shadow-[#98C0C8]/30 active:scale-[0.98] transition-all"
          >
            {currentStep === screens.length - 1 ? 'Create Account' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
