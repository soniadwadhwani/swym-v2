import { useState } from 'react';
import { Sparkles, Send, Heart, Flame, Gauge, Target, Droplets, Users, TrendingDown, RotateCcw, Save, MessageSquare } from 'lucide-react';

interface GeneratedPlan {
  title: string;
  sections: {
    phase: string;
    drills: {
      type: string;
      description: string;
      duration: string;
    }[];
  }[];
}

interface CoachAIProps {
  autoGenerate?: boolean;
}

export function CoachAI({ autoGenerate = false }: CoachAIProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(
    autoGenerate
      ? {
          title: 'Team Plan - Wednesday',
          sections: [
            {
              phase: 'Warmup',
              drills: [
                { type: 'easy', description: '400m Freestyle easy pace', duration: '6 min' },
                { type: 'drill', description: '4x50m Catch-up drill', duration: '4 min' },
              ],
            },
            {
              phase: 'Main Set',
              drills: [
                { type: 'technique', description: '6x100m Freestyle focus on turns', duration: '15 min' },
                { type: 'recovery', description: '200m easy backstroke', duration: '4 min' },
              ],
            },
            {
              phase: 'Stroke Work',
              drills: [
                { type: 'drill', description: '8x50m Butterfly drills', duration: '10 min' },
                { type: 'sprint', description: '4x25m all-out starts', duration: '6 min' },
              ],
            },
            {
              phase: 'Cooldown',
              drills: [
                { type: 'easy', description: '300m choice stroke easy', duration: '6 min' },
              ],
            },
          ],
        }
      : null
  );

  const promptChips = [
    { icon: Heart, label: 'Recovery day', color: '#4ADE80' },
    { icon: Gauge, label: 'Sprint set', color: '#F6AA38' },
    { icon: Target, label: 'Meet taper', color: '#98C0C8' },
    { icon: RotateCcw, label: 'Fix turns', color: '#707CFF' },
    { icon: TrendingDown, label: 'Low attendance', color: '#F87171' },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPlan({
        title: 'Custom Team Plan',
        sections: [
          {
            phase: 'Warmup',
            drills: [
              { type: 'easy', description: '400m Freestyle easy pace', duration: '6 min' },
              { type: 'drill', description: '4x50m Catch-up drill', duration: '4 min' },
            ],
          },
          {
            phase: 'Main Set',
            drills: [
              { type: 'main', description: '8x100m Freestyle @ 1:30', duration: '18 min' },
              { type: 'recovery', description: '200m easy choice', duration: '4 min' },
            ],
          },
          {
            phase: 'Cooldown',
            drills: [
              { type: 'easy', description: '300m backstroke easy', duration: '6 min' },
            ],
          },
        ],
      });
      setPrompt('');
    }, 800);
  };

  const getDrillIcon = (type: string) => {
    switch (type) {
      case 'easy':
      case 'recovery':
        return Heart;
      case 'sprint':
        return Gauge;
      case 'drill':
        return Target;
      case 'technique':
        return RotateCcw;
      default:
        return Flame;
    }
  };

  const getDrillColor = (type: string) => {
    switch (type) {
      case 'easy':
      case 'recovery':
        return '#4ADE80';
      case 'sprint':
        return '#F6AA38';
      case 'drill':
      case 'technique':
        return '#98C0C8';
      default:
        return '#707CFF';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0820] via-[#111033] to-[#111033] pb-32">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#334F6B] to-[#1a2840] pt-12 pb-8 px-6 border-b border-[#98C0C8]/20 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#98C0C8]/10 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Sparkles size={20} className="text-[#98C0C8]" />
            </div>
            <h1 className="text-[32px] text-white tracking-tight leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              AI Coach
            </h1>
          </div>
          <p className="text-white/60 text-sm">
            Generate intelligent training plans for your team
          </p>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-5">
        {/* AI PROMPT INPUT */}
        {!generatedPlan && (
          <>
            <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={18} className="text-[#98C0C8]" />
                <h2 className="text-lg text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  Ask AI Coach
                </h2>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your team's needs... (e.g., 'Create a recovery-focused session with technique work')"
                className="w-full bg-[#111033]/60 border border-white/10 rounded-2xl p-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#98C0C8]/50 transition-colors resize-none h-28 mb-4"
              />

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="w-full bg-[#98C0C8] hover:bg-[#98C0C8]/90 disabled:bg-white/10 disabled:text-white/30 text-[#111033] py-3.5 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg disabled:cursor-not-allowed"
              >
                <Sparkles size={16} />
                Generate Plan
                <Send size={14} className="ml-1" />
              </button>
            </div>

            {/* PROMPT CHIPS */}
            <div>
              <div className="text-white/40 text-xs uppercase tracking-wide mb-3 px-1">Quick Prompts</div>
              <div className="grid grid-cols-2 gap-3">
                {promptChips.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={chip.label}
                      onClick={() => setPrompt(chip.label)}
                      className="bg-[#2A324E]/80 border border-white/10 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-all hover:bg-[#2A324E]"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${chip.color}20` }}
                      >
                        <Icon size={18} strokeWidth={1.5} style={{ color: chip.color }} />
                      </div>
                      <span className="text-white text-sm font-medium" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        {chip.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* GENERATED PLAN */}
        {generatedPlan && (
          <>
            <div className="bg-gradient-to-br from-[#2A324E]/90 to-[#1f2840]/90 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl text-white font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  {generatedPlan.title}
                </h2>
                <div className="bg-[#98C0C8]/20 border border-[#98C0C8]/30 rounded-full px-3 py-1">
                  <span className="text-[#98C0C8] text-xs font-medium">AI Generated</span>
                </div>
              </div>

              <div className="space-y-4">
                {generatedPlan.sections.map((section, idx) => (
                  <div key={idx} className="bg-[#111033]/40 rounded-2xl p-5 border border-white/5">
                    <div className="text-white/60 text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#98C0C8]" />
                      {section.phase}
                    </div>
                    <div className="space-y-2.5">
                      {section.drills.map((drill, drillIdx) => {
                        const Icon = getDrillIcon(drill.type);
                        const color = getDrillColor(drill.type);
                        return (
                          <div key={drillIdx} className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: `${color}20` }}
                            >
                              <Icon size={14} strokeWidth={1.5} style={{ color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm">{drill.description}</div>
                              <div className="text-white/40 text-xs mt-0.5">{drill.duration}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGeneratedPlan(null)}
                className="bg-white/10 border border-white/20 text-white py-3.5 rounded-2xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <Sparkles size={16} />
                New Plan
              </button>
              <button className="bg-[#334F6B] hover:bg-[#334F6B]/80 text-white py-3.5 rounded-2xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg">
                <Save size={16} />
                Save Plan
              </button>
            </div>

            <button className="w-full bg-[#98C0C8] hover:bg-[#98C0C8]/90 text-[#111033] py-3.5 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg">
              <Users size={16} />
              Send to Team
            </button>
          </>
        )}
      </div>
    </div>
  );
}
