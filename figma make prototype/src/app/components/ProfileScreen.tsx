import { Battery, Bluetooth, Crown, Target, Bell, Settings, ChevronRight, LogOut, Shield, HelpCircle } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';

export function ProfileScreen() {
  const goals = [
    { label: 'Weekly Distance', value: '15 km', progress: 83 },
    { label: 'Sessions / Week', value: '5', progress: 60 },
    { label: 'Target 100m Pace', value: '1:25', progress: 92 },
  ];

  const menuItems = [
    { icon: Bell, label: 'Notifications', badge: '3' },
    { icon: Shield, label: 'Privacy' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F1EE] pb-28">
      {/* Profile Header */}
      <div className="bg-[#140C32] pt-14 pb-20 px-6 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -right-20 -bottom-20 w-56 h-56 rounded-full bg-[#707CFF]/10 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-[#707CFF]/5 blur-2xl" />
        <div className="absolute right-5 top-14 opacity-10">
          <img src={swymLogo} alt="" className="h-5" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mt-4">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-22 h-22 rounded-full bg-gradient-to-br from-[#707CFF] to-[#5A64D9] flex items-center justify-center text-white text-2xl shadow-2xl shadow-[#707CFF]/30" style={{ fontFamily: 'Comfortaa, sans-serif', width: 88, height: 88 }}>
              AK
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#140C32]" />
          </div>
          <h1 className="text-2xl text-white mb-0.5" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
            Alex Kumar
          </h1>
          <p className="text-white/25 text-xs">Premium Member · Since Jan 2025</p>
        </div>
      </div>

      <div className="px-5 -mt-10 space-y-4">
        {/* Device Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
          <div className="text-[#140C32]/25 text-[10px] tracking-[0.15em] mb-3">CONNECTED DEVICE</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#707CFF]/8 flex items-center justify-center">
                <Bluetooth size={16} className="text-[#707CFF]" />
              </div>
              <div>
                <div className="text-sm text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>SWYM Ring Pro</div>
                <div className="text-[9px] text-[#140C32]/25 flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Connected · Firmware v3.2
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F3F1EE] rounded-full px-3 py-1.5">
              <Battery size={13} className="text-[#707CFF]" />
              <span className="text-xs text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>87%</span>
            </div>
          </div>
          {/* Battery bar */}
          <div className="mt-3 h-1 bg-[#F3F1EE] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#707CFF] to-[#A5AEFF] rounded-full" style={{ width: '87%' }} />
          </div>
          <div className="text-[8px] text-[#140C32]/15 mt-1.5">Est. 4 days remaining</div>
        </div>

        {/* Membership */}
        <div className="bg-[#140C32] rounded-[24px] p-5 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#707CFF]/10 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown size={14} className="text-[#707CFF]" />
                <span className="text-sm" style={{ fontFamily: 'Comfortaa, sans-serif' }}>Membership</span>
              </div>
              <div className="bg-gradient-to-r from-[#707CFF] to-[#A5AEFF] text-white text-[9px] px-3 py-1 rounded-full tracking-wide">
                PREMIUM
              </div>
            </div>
            <div className="text-white/25 text-xs mb-4 leading-relaxed">
              AI coaching · Community · Unlimited analytics · Priority support
            </div>
            <button className="w-full bg-white/6 border border-white/8 text-white/70 py-2.5 rounded-2xl text-[10px] tracking-wide active:scale-[0.98] transition-transform">
              MANAGE SUBSCRIPTION
            </button>
          </div>
        </div>

        {/* Goals with Progress */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/3">
          <div className="flex items-center gap-2 mb-4">
            <Target size={13} className="text-[#707CFF]" />
            <span className="text-[10px] text-[#140C32]/25 tracking-[0.15em]">GOALS</span>
          </div>
          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-[#140C32]/40">{g.label}</span>
                  <span className="text-sm text-[#140C32]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{g.value}</span>
                </div>
                <div className="h-1 bg-[#F3F1EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#707CFF] rounded-full transition-all"
                    style={{ width: `${g.progress}%` }}
                  />
                </div>
                <div className="text-[8px] text-[#140C32]/15 mt-1">{g.progress}% of goal</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm shadow-black/3">
          {menuItems.map((item, i) => (
            <div key={item.label}>
              {i > 0 && <div className="h-px bg-[#F3F1EE] mx-5" />}
              <button className="w-full flex items-center justify-between p-4 px-5 active:bg-[#F3F1EE]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon size={16} strokeWidth={1.5} className="text-[#140C32]/30" />
                  <span className="text-sm text-[#140C32]/70">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <div className="w-5 h-5 rounded-full bg-[#707CFF] flex items-center justify-center">
                      <span className="text-white text-[9px]">{item.badge}</span>
                    </div>
                  )}
                  <ChevronRight size={14} className="text-[#140C32]/15" />
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Sign Out */}
        <button className="w-full flex items-center justify-center gap-2 bg-white rounded-[24px] p-4 text-[#140C32]/25 text-xs tracking-wide active:bg-[#F3F1EE]/50 transition-colors shadow-sm shadow-black/3">
          <LogOut size={14} />
          SIGN OUT
        </button>

        {/* App version */}
        <div className="text-center pt-2 pb-4">
          <img src={swymLogo} alt="SWYM" className="h-4 mx-auto opacity-10 mb-1" />
          <div className="text-[8px] text-[#140C32]/10">v2.4.1 · Built with precision</div>
        </div>
      </div>
    </div>
  );
}