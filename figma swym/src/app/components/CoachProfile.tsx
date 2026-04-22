import { User, Users, Settings, LogOut, Crown, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react';

interface CoachProfileProps {
  onLogout?: () => void;
}

export function CoachProfile({ onLogout }: CoachProfileProps) {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: () => {} },
        { icon: Bell, label: 'Notifications', action: () => {} },
        { icon: Crown, label: 'Subscription', badge: 'Pro', action: () => {} },
      ],
    },
    {
      title: 'Team',
      items: [
        { icon: Users, label: 'Connected Athletes', count: '4', action: () => {} },
        { icon: Shield, label: 'Privacy & Safety', action: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', action: () => {} },
        { icon: Settings, label: 'App Settings', action: () => {} },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0820] via-[#111033] to-[#111033] pb-32">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#1a1a3e] via-[#111033] to-[#0f0f2b] pt-12 pb-8 px-6 border-b border-white/5">
        <h1 className="text-[32px] text-white mb-2 tracking-tight leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Profile
        </h1>
        <p className="text-white/50 text-sm">
          Manage your coaching account
        </p>
      </div>

      <div className="px-6 pt-6 space-y-5">
        {/* COACH PROFILE CARD */}
        <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#98C0C8] to-[#334F6B] flex items-center justify-center text-white text-2xl font-bold shadow-lg" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              AC
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-white font-semibold mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Alex Chen
              </h2>
              <p className="text-white/50 text-sm mb-2">Head Coach</p>
              <div className="flex items-center gap-2">
                <div className="bg-[#98C0C8]/20 border border-[#98C0C8]/30 rounded-full px-3 py-1">
                  <span className="text-[#98C0C8] text-xs font-medium">Pro Member</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl text-white font-semibold mb-0.5" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                4
              </div>
              <div className="text-white/40 text-xs">Athletes</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-2xl text-white font-semibold mb-0.5" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                2.5
              </div>
              <div className="text-white/40 text-xs">Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-white font-semibold mb-0.5" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                142
              </div>
              <div className="text-white/40 text-xs">Sessions</div>
            </div>
          </div>
        </div>

        {/* SETTINGS SECTIONS */}
        {settingsSections.map((section, idx) => (
          <div key={idx}>
            <div className="text-white/40 text-xs uppercase tracking-wide mb-3 px-1">{section.title}</div>
            <div className="bg-[#2A324E]/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIdx}
                    onClick={item.action}
                    className="w-full flex items-center gap-4 px-5 py-4 bg-[#2A324E]/80 hover:bg-[#2A324E] active:scale-[0.99] transition-all border-b border-white/5 last:border-b-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111033]/40 flex items-center justify-center">
                      <Icon size={18} strokeWidth={1.5} className="text-[#98C0C8]" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white text-sm font-medium">{item.label}</div>
                    </div>
                    {'badge' in item && item.badge && (
                      <div className="bg-[#F6AA38]/20 border border-[#F6AA38]/30 rounded-full px-2.5 py-0.5">
                        <span className="text-[#F6AA38] text-xs font-medium">{item.badge}</span>
                      </div>
                    )}
                    {'count' in item && item.count && (
                      <div className="bg-white/10 rounded-full px-2.5 py-0.5">
                        <span className="text-white/60 text-xs font-medium">{item.count}</span>
                      </div>
                    )}
                    <ChevronRight size={16} className="text-white/30" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* LOGOUT BUTTON */}
        <button
          onClick={onLogout}
          className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 py-4 rounded-2xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg"
        >
          <LogOut size={18} />
          Logout
        </button>

        {/* VERSION */}
        <div className="text-center text-white/20 text-xs pt-2">
          SWYM Coach v2.1.0
        </div>
      </div>
    </div>
  );
}
