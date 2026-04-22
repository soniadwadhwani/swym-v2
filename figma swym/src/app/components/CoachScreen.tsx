import { useState } from 'react';
import { Zap, TrendingUp, Trophy, Target, Award, Send, Activity, MessageCircle } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
}

export function CoachScreen() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Radar chart data - 6 axes as specified
  const performanceMetrics = [
    { label: 'Speed', value: 85 },
    { label: 'Endurance', value: 78 },
    { label: 'Technique', value: 90 },
    { label: 'Turns', value: 88 },
    { label: 'Recovery', value: 72 },
    { label: 'Consistency', value: 94 },
  ];

  const radarR = 65;
  const rc = 100;
  const radarPoints = performanceMetrics.map((m, i) => {
    const angle = (Math.PI * 2 * i) / performanceMetrics.length - Math.PI / 2;
    const r = (m.value / 100) * radarR;
    return {
      x: rc + r * Math.cos(angle),
      y: rc + r * Math.sin(angle),
      labelX: rc + (radarR + 24) * Math.cos(angle),
      labelY: rc + (radarR + 24) * Math.sin(angle),
      label: m.label,
      value: m.value,
    };
  });

  const radarPath = radarPoints.map(p => `${p.x},${p.y}`).join(' ');

  const generateAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('workout') || msg.includes('session') || msg.includes('warmup') || msg.includes('train')) {
      return 'Suggested warmup:\n200 easy\n4x50 build\n4x25 drill';
    }
    if (msg.includes('pace') || msg.includes('speed') || msg.includes('100m')) {
      return 'Your current 100m pace trend is improving. Target 1:24 this week.';
    }
    if (msg.includes('recovery') || msg.includes('rest') || msg.includes('tired')) {
      return 'Recommend low intensity technique set today.';
    }
    if (msg.includes('race') || msg.includes('meet') || msg.includes('competition')) {
      return 'Focus starts + breakout speed.';
    }
    return 'I\'m ready to help with training, recovery, pacing, and race prep.';
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: chatInput,
    };

    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: generateAIResponse(chatInput),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const personalBests = [
    { distance: '50m', time: '24.3s', improvement: '+0.8s', stroke: 'Freestyle' },
    { distance: '100m', time: '52.1s', improvement: '+1.2s', stroke: 'Freestyle' },
    { distance: '200m', time: '1:54.6', improvement: '+2.3s', stroke: 'Freestyle' },
    { distance: '400m', time: '4:12.8', improvement: '+5.1s', stroke: 'Freestyle' },
  ];

  const focusAreas = [
    { area: 'Turns', priority: 'high', desc: 'Improve underwater phase by 15%', icon: Activity },
    { area: 'Sprint Finish', priority: 'medium', desc: 'Build final 25m power', icon: Zap },
    { area: 'Recovery Intervals', priority: 'low', desc: 'Optimize rest between sets', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-[#111033] pb-28">
      {/* Header */}
      <div className="bg-[#2A324E] pt-14 pb-10 px-6 rounded-b-[32px]">
        <div className="flex items-center justify-between mb-6">
          <img src={swymLogo} alt="SWYM" className="h-11 opacity-90 drop-shadow-lg" />
          <span className="text-white/30 text-xs tracking-[0.2em]">AI COACH</span>
        </div>

        <h1 className="text-3xl text-white mb-2 tracking-tight" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Your AI Coach
        </h1>
        <p className="text-white/50 text-sm">Personalized insights and recommendations</p>
      </div>

      <div className="px-5 -mt-6 space-y-5">
        {/* AI Coach Chat Window */}
        <div className="bg-[#2A324E]/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F6AA38] to-[#F6AA38]/70 flex items-center justify-center shadow-lg shadow-[#F6AA38]/20">
                <MessageCircle size={20} strokeWidth={1.5} className="text-white" />
              </div>
              <div>
                <h3 className="text-white text-base font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                  AI Coach
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#F6AA38] animate-pulse" />
                  <span className="text-white/50 text-xs">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-5 max-h-[400px] overflow-y-auto">
            {/* Initial Coach Messages */}
            {messages.length === 0 && (
              <>
                {/* Coach Message 1 */}
                <div className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="w-8 h-8 rounded-xl bg-[#F6AA38]/20 flex items-center justify-center shrink-0">
                    <Zap size={14} className="text-[#F6AA38]" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#111033]/60 rounded-2xl rounded-tl-sm p-4 border border-white/5">
                      <p className="text-white/90 text-sm leading-relaxed">
                        Your endurance trend improved this week. Want today's recommended session?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Replies */}
                <div className="flex flex-wrap gap-2 ml-11 animate-in fade-in slide-in-from-left-2 duration-300 delay-100">
                  <button
                    onClick={() => {
                      const msg = 'Yes, show me today\'s workout';
                      const userMsg: ChatMessage = { id: Date.now().toString(), type: 'user', text: msg };
                      setMessages(prev => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), type: 'ai', text: generateAIResponse(msg) };
                        setMessages(prev => [...prev, aiMsg]);
                        setIsTyping(false);
                      }, 1000);
                    }}
                    className="bg-[#F6AA38]/15 hover:bg-[#F6AA38]/25 border border-[#F6AA38]/30 text-[#F6AA38] px-4 py-2 rounded-full text-xs font-medium active:scale-95 transition-all"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      const msg = 'Recommend a recovery set';
                      const userMsg: ChatMessage = { id: Date.now().toString(), type: 'user', text: msg };
                      setMessages(prev => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), type: 'ai', text: generateAIResponse(msg) };
                        setMessages(prev => [...prev, aiMsg]);
                        setIsTyping(false);
                      }, 1000);
                    }}
                    className="bg-[#F6AA38]/15 hover:bg-[#F6AA38]/25 border border-[#F6AA38]/30 text-[#F6AA38] px-4 py-2 rounded-full text-xs font-medium active:scale-95 transition-all"
                  >
                    Recovery Set
                  </button>
                  <button
                    onClick={() => {
                      const msg = 'Help me prepare for my race';
                      const userMsg: ChatMessage = { id: Date.now().toString(), type: 'user', text: msg };
                      setMessages(prev => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), type: 'ai', text: generateAIResponse(msg) };
                        setMessages(prev => [...prev, aiMsg]);
                        setIsTyping(false);
                      }, 1000);
                    }}
                    className="bg-[#F6AA38]/15 hover:bg-[#F6AA38]/25 border border-[#F6AA38]/30 text-[#F6AA38] px-4 py-2 rounded-full text-xs font-medium active:scale-95 transition-all"
                  >
                    Race Prep
                  </button>
                  <button
                    onClick={() => {
                      const msg = 'What can you help me with?';
                      const userMsg: ChatMessage = { id: Date.now().toString(), type: 'user', text: msg };
                      setMessages(prev => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), type: 'ai', text: generateAIResponse(msg) };
                        setMessages(prev => [...prev, aiMsg]);
                        setIsTyping(false);
                      }, 1000);
                    }}
                    className="bg-[#F6AA38]/15 hover:bg-[#F6AA38]/25 border border-[#F6AA38]/30 text-[#F6AA38] px-4 py-2 rounded-full text-xs font-medium active:scale-95 transition-all"
                  >
                    Ask Anything
                  </button>
                </div>

                {/* Coach Message 2 */}
                <div className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300 delay-200">
                  <div className="w-8 h-8 rounded-xl bg-[#F6AA38]/20 flex items-center justify-center shrink-0">
                    <Activity size={14} className="text-[#F6AA38]" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#111033]/60 rounded-2xl rounded-tl-sm p-4 border border-white/5">
                      <p className="text-white/90 text-sm leading-relaxed">
                        I can also analyze your recent splits.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Dynamic Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-in fade-in slide-in-from-${msg.type === 'user' ? 'right' : 'left'}-2 duration-300 ${
                  msg.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {msg.type === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-[#F6AA38]/20 flex items-center justify-center shrink-0">
                    <Zap size={14} className="text-[#F6AA38]" />
                  </div>
                )}
                <div className={`flex-1 ${msg.type === 'user' ? 'flex justify-end' : ''}`}>
                  <div
                    className={`${
                      msg.type === 'user'
                        ? 'bg-[#98C0C8]/25 border-[#98C0C8]/30 rounded-2xl rounded-tr-sm max-w-[80%]'
                        : 'bg-[#111033]/60 rounded-2xl rounded-tl-sm border-white/5'
                    } p-4 border`}
                  >
                    <p className={`text-sm leading-relaxed whitespace-pre-line ${msg.type === 'user' ? 'text-white' : 'text-white/90'}`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="w-8 h-8 rounded-xl bg-[#F6AA38]/20 flex items-center justify-center shrink-0">
                  <Zap size={14} className="text-[#F6AA38]" />
                </div>
                <div className="flex-1">
                  <div className="bg-[#111033]/60 rounded-2xl rounded-tl-sm p-4 border border-white/5 inline-block">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your coach..."
              className="w-full bg-[#111033]/60 border border-white/10 rounded-2xl pl-5 pr-12 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F6AA38]/50 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!chatInput.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#F6AA38] hover:bg-[#F6AA38]/90 disabled:bg-[#F6AA38]/30 disabled:cursor-not-allowed flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-[#F6AA38]/20"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="bg-[#2A324E] rounded-3xl p-7 border border-white/5">
          <div className="mb-6">
            <h3 className="text-white text-lg mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              Performance Profile
            </h3>
            <p className="text-white/40 text-xs">6-week analysis across key metrics</p>
          </div>

          <div className="flex justify-center mb-7 py-4">
            <svg width="220" height="220" viewBox="0 0 200 200" className="overflow-visible">
              {/* Grid circles */}
              <circle cx={rc} cy={rc} r={radarR * 0.25} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <circle cx={rc} cy={rc} r={radarR * 0.5} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              <circle cx={rc} cy={rc} r={radarR * 0.75} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <circle cx={rc} cy={rc} r={radarR} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

              {/* Axis lines */}
              {radarPoints.map((p, i) => (
                <line
                  key={`axis-${i}`}
                  x1={rc}
                  y1={rc}
                  x2={rc + radarR * Math.cos((Math.PI * 2 * i) / radarPoints.length - Math.PI / 2)}
                  y2={rc + radarR * Math.sin((Math.PI * 2 * i) / radarPoints.length - Math.PI / 2)}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />
              ))}

              {/* Data polygon */}
              <polygon
                points={radarPath}
                fill="rgba(152, 192, 200, 0.25)"
                stroke="#98C0C8"
                strokeWidth="1.5"
              />

              {/* Data points */}
              {radarPoints.map((p, i) => (
                <circle key={`point-${i}`} cx={p.x} cy={p.y} r="3" fill="#98C0C8" />
              ))}

              {/* Labels */}
              {radarPoints.map((p, i) => (
                <text
                  key={`label-${i}`}
                  x={p.labelX}
                  y={p.labelY}
                  fill="rgba(255,255,255,0.7)"
                  fontSize="11"
                  fontWeight="500"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="system-ui, -apple-system"
                >
                  {p.label}
                </text>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-3">
            {performanceMetrics.map((m, i) => (
              <div key={i} className="text-center bg-[#111033]/40 rounded-xl py-3 border border-white/5">
                <div className="text-lg text-white font-semibold" style={{ fontFamily: 'Comfortaa, sans-serif' }}>{m.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Bests */}
        <div className="bg-[#2A324E] rounded-3xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white text-lg mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Personal Bests
              </h3>
              <p className="text-white/40 text-xs">Your fastest times</p>
            </div>
            <Trophy size={20} strokeWidth={1.5} className="text-[#F6AA38]" />
          </div>

          <div className="space-y-3">
            {personalBests.map((pb, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-[#111033]/50 rounded-2xl border border-white/5"
              >
                <div>
                  <div className="text-white text-sm mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {pb.distance} {pb.stroke}
                  </div>
                  <div className="text-white/40 text-xs">{pb.time}</div>
                </div>
                <div className="flex items-center gap-1 bg-[#F6AA38]/20 px-3 py-1 rounded-full border border-[#F6AA38]/30">
                  <TrendingUp size={12} strokeWidth={1.5} className="text-[#F6AA38]" />
                  <span className="text-xs text-[#F6AA38] font-medium">{pb.improvement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-[#2A324E] rounded-3xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white text-lg mb-1" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Recommended Focus
              </h3>
              <p className="text-white/40 text-xs">AI-suggested training priorities</p>
            </div>
            <Target size={20} strokeWidth={1.5} className="text-[#98C0C8]" />
          </div>

          <div className="space-y-3">
            {focusAreas.map((focus, i) => (
              <div
                key={i}
                className="p-4 bg-[#111033]/50 rounded-2xl border border-white/5"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#334F6B]/20 flex items-center justify-center shrink-0">
                    <focus.icon size={18} strokeWidth={1.5} className="text-[#98C0C8]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        {focus.area}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          focus.priority === 'high'
                            ? 'bg-[#F6AA38]/20 text-[#F6AA38]'
                            : focus.priority === 'medium'
                            ? 'bg-[#98C0C8]/20 text-[#98C0C8]'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {focus.priority}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">{focus.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Recommendations */}
        <div className="bg-gradient-to-br from-[#2A324E] to-[#334F6B] rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} strokeWidth={1.5} className="text-[#F6AA38]" />
            <h3 className="text-white text-base" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
              This Week's Goal
            </h3>
          </div>
          <p className="text-white/80 text-sm mb-4">
            Add 4x50m race pace turns drills to improve your underwater efficiency by 15%.
          </p>
          <button className="bg-[#334F6B] text-white px-6 py-3 rounded-xl text-sm active:scale-95 transition-transform">
            Add to Training Plan
          </button>
        </div>
      </div>
    </div>
  );
}
