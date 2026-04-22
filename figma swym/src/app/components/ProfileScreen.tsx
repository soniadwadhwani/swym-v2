import { useState } from 'react';
import { Battery, Bluetooth, Crown, Target, Bell, ChevronRight, LogOut, Shield, HelpCircle, Edit2, Activity, Calendar, TrendingUp, Award } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const goals = [
    { label: 'Weekly Distance', value: '15 km', progress: 83 },
    { label: 'Sessions / Week', value: '5', progress: 60 },
    { label: 'Target 100m Pace', value: '1:25', progress: 92 },
  ];

  const stats = [
    { label: 'Distance Swum', value: '42.3 km', icon: Activity },
    { label: 'Sessions', value: '18', icon: Calendar },
    { label: 'Best Pace', value: '1:18', icon: TrendingUp },
    { label: 'Consistency', value: '94%', icon: Award },
  ];

  const settingsItems = [
    { icon: Bell, label: 'Notifications' },
    { icon: Shield, label: 'Privacy' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111033] via-[#1a1850] to-[#111033] pb-28">
      {/* Profile Header */}
      <div className="pt-14 pb-12 px-6 relative overflow-hidden">
        {/* Premium glow effects */}
        <div className="absolute -right-24 top-0 w-64 h-64 rounded-full bg-[#98C0C8]/10 blur-3xl" />
        <div className="absolute -left-20 top-20 w-48 h-48 rounded-full bg-[#334F6B]/10 blur-3xl" />

        {/* Edit button */}
        <button className="absolute top-14 right-6 w-9 h-9 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-white/60 transition-colors active:scale-95">
          <Edit2 size={14} strokeWidth={1.5} />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center mt-8">
          {/* Avatar */}
          <div className="relative mb-5">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#98C0C8] to-[#334F6B] flex items-center justify-center text-white text-2xl shadow-2xl shadow-[#98C0C8]/20" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              AK
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#98C0C8] border-3 border-[#111033]" style={{ borderWidth: 3 }} />
          </div>
          <h1 className="text-3xl text-white mb-2 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Alex Kumar
          </h1>
          <p className="text-white/30 text-sm">Premium Member • Since Jan 2025</p>
        </div>
      </div>

      <div className="px-6 space-y-5">
        {/* Device Card */}
        <div className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5">
          <div className="text-white/20 text-[10px] tracking-[0.25em] mb-4">CONNECTED DEVICE</div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#334F6B]/40 flex items-center justify-center">
                <Bluetooth size={18} strokeWidth={1.5} className="text-[#98C0C8]" />
              </div>
              <div>
                <div className="text-sm text-white mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>SWYM Ring Pro</div>
                <div className="text-[10px] text-white/30 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98C0C8]" />
                  Connected
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 rounded-xl px-3 py-2">
              <Battery size={14} strokeWidth={1.5} className="text-[#98C0C8]" />
              <span className="text-xs text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>87%</span>
            </div>
          </div>
          {/* Battery bar */}
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-[#98C0C8] to-[#D4ECF1] rounded-full" style={{ width: '87%' }} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[9px] text-white/20">Firmware v3.2</div>
            <button className="text-[10px] text-[#98C0C8] tracking-wide hover:text-[#D4ECF1] transition-colors">
              Manage Device
            </button>
          </div>
        </div>

        {/* Membership Card */}
        <div className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-[#F6AA38]/10 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown size={15} strokeWidth={1.5} className="text-[#F6AA38]" />
                <span className="text-base text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Premium Membership</span>
              </div>
              <div className="bg-[#F6AA38]/20 text-[#F6AA38] text-[9px] px-3 py-1.5 rounded-full tracking-wide">
                PREMIUM
              </div>
            </div>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <div className="w-1 h-1 rounded-full bg-[#98C0C8]" />
                AI Coaching
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <div className="w-1 h-1 rounded-full bg-[#98C0C8]" />
                Community Access
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <div className="w-1 h-1 rounded-full bg-[#98C0C8]" />
                Unlimited Analytics
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <div className="w-1 h-1 rounded-full bg-[#98C0C8]" />
                Priority Support
              </div>
            </div>
            <button className="w-full bg-white/5 border border-white/10 text-white/60 py-3 rounded-xl text-xs tracking-wide active:scale-[0.98] transition-all hover:bg-white/10">
              Manage Plan
            </button>
          </div>
        </div>

        {/* Goals Card */}
        <div className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target size={14} strokeWidth={1.5} className="text-[#98C0C8]" />
            <span className="text-[10px] text-white/20 tracking-[0.25em]">GOALS</span>
          </div>
          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/40">{g.label}</span>
                  <span className="text-sm text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{g.value}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#98C0C8] to-[#D4ECF1] rounded-full transition-all"
                    style={{ width: `${g.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* This Month Stats */}
        <div>
          <div className="text-white/20 text-[10px] tracking-[0.25em] mb-4 ml-1">THIS MONTH</div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-4"
              >
                <stat.icon size={16} strokeWidth={1.5} className="text-[#98C0C8] mb-3" />
                <div className="text-xl text-white mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/30">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-[#2A324E]/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
          {settingsItems.map((item, i) => (
            <div key={item.label}>
              {i > 0 && <div className="h-px bg-white/5 mx-5" />}
              <button className="w-full flex items-center justify-between p-4 px-5 active:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon size={16} strokeWidth={1.5} className="text-white/30" />
                  <span className="text-sm text-white/70">{item.label}</span>
                </div>
                <ChevronRight size={16} strokeWidth={1.5} className="text-white/20" />
              </button>
            </div>
          ))}
        </div>

        {/* Log Out */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#2A324E]/40 border border-white/5 rounded-2xl p-4 text-white/30 text-xs tracking-wide active:bg-white/5 transition-colors"
        >
          <LogOut size={14} strokeWidth={1.5} />
          Log Out
        </button>

        {/* App version */}
        <div className="text-center pt-2 pb-4">
          <img src={swymLogo} alt="SWYM" className="h-4 mx-auto opacity-10 mb-1.5" />
          <div className="text-[9px] text-white/10">v2.4.1 · Built with precision</div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6 z-50 animate-in fade-in duration-200">
          <div className="bg-[#2A324E] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl text-white text-center mb-3" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              Log Out?
            </h2>
            <p className="text-white/40 text-sm text-center mb-6">
              Are you sure you want to end this session?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm tracking-wide active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  setTimeout(() => {
                    onLogout();
                  }, 150);
                }}
                className="flex-1 py-3 rounded-xl bg-[#334F6B] text-white text-sm tracking-wide active:scale-95 transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}