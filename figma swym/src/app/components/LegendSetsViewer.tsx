import { ChevronLeft, Copy, Clock, Waves, UserPlus, Check, Trophy, Zap } from 'lucide-react';
import swymLogo from '../../imports/swym_logo-Photoroom.png';
import type { Legend, PlannedSet } from '../App';

interface LegendSetsViewerProps {
  legend: Legend;
  onBack: () => void;
  onCopySet: (set: PlannedSet) => void;
  selectedGhost: { type: 'friend' | 'legend'; id: string } | null;
  onSelectGhost: (type: 'friend' | 'legend', id: string) => void;
}

const DRILL_TYPE_MAP: Record<string, { label: string; icon: typeof Waves }> = {
  warmup: { label: 'Warmup', icon: Waves },
  main: { label: 'Main Set', icon: Waves },
  sprint: { label: 'Sprint', icon: Waves },
  drill: { label: 'Technique', icon: Waves },
  cooldown: { label: 'Cooldown', icon: Waves },
  kick: { label: 'Kick Set', icon: Waves },
};

export function LegendSetsViewer({ legend, onBack, onCopySet, selectedGhost, onSelectGhost }: LegendSetsViewerProps) {
  const isRacingLegend = selectedGhost?.type === 'legend' && selectedGhost.id === legend.id;

  return (
    <div style={{
      width: '100%',
      maxWidth: '393px',
      margin: '0 auto',
      overflowX: 'hidden',
      background: 'linear-gradient(180deg, #111033 0%, #0d102a 100%)',
      minHeight: '100vh',
      paddingBottom: '120px',
      boxSizing: 'border-box'
    }}>
      {/* Hero Section */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(180deg, #111033 0%, #1a1a45 50%, #2A324E 100%)',
        padding: '24px',
        boxSizing: 'border-box'
      }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <ChevronLeft size={16} strokeWidth={2} />
            <span>Back</span>
          </button>
          <img src={swymLogo} alt="SWYM" style={{ height: '20px', opacity: 0.9 }} />
        </div>

        {/* Legend Info */}
        <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }}>
          LEGEND WORKOUTS
        </div>
        <h1 style={{
          fontSize: '30px',
          color: 'white',
          marginBottom: '8px',
          fontFamily: 'Comfortaa, sans-serif',
          fontWeight: 500
        }}>
          {legend.name}
        </h1>
        <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', marginBottom: '20px' }}>
          {legend.specialty}
        </div>

        {/* Stat Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(246, 170, 56, 0.15)',
            border: '1px solid rgba(246, 170, 56, 0.3)',
            color: '#F6AA38',
            fontSize: '10px',
            padding: '6px 12px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Trophy size={11} strokeWidth={2} />
            <span>7x Olympic Gold</span>
          </div>
          <div style={{
            background: 'rgba(152, 192, 200, 0.15)',
            border: '1px solid rgba(152, 192, 200, 0.3)',
            color: '#98C0C8',
            fontSize: '10px',
            padding: '6px 12px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Zap size={11} strokeWidth={2} />
            <span>Avg Pace 1:02 /100m</span>
          </div>
        </div>

        {isRacingLegend && (
          <div style={{
            marginTop: '20px',
            background: 'rgba(152, 192, 200, 0.1)',
            border: '1px solid rgba(152, 192, 200, 0.2)',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Check size={14} strokeWidth={2} style={{ color: '#98C0C8' }} />
            <span style={{ color: '#D4ECF1', fontSize: '12px' }}>
              You are racing {legend.name.split(' ')[0]}
            </span>
          </div>
        )}
      </div>

      {/* Workout Cards */}
      <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
        {legend.sets.map((set, idx) => {
          const totalDistance = set.drills.reduce((s, d) => s + d.distance * d.reps, 0);
          const totalTime = set.drills.reduce((s, d) => {
            const pace = d.paceMin * 60 + d.paceSec;
            return s + ((d.distance / 100) * pace * d.reps) + (d.rest * d.reps);
          }, 0);
          const totalMin = Math.floor(totalTime / 60);

          return (
            <div
              key={idx}
              style={{
                width: '100%',
                backgroundColor: '#2A324E',
                borderRadius: '28px',
                padding: '20px',
                marginTop: '20px',
                boxSizing: 'border-box'
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{
                  color: 'rgba(212, 236, 241, 0.5)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase'
                }}>
                  Signature Set {idx + 1}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'rgba(212, 236, 241, 0.4)',
                  fontSize: '11px'
                }}>
                  <Clock size={12} strokeWidth={1.5} />
                  {set.startHour}:{set.startMinute.toString().padStart(2, '0')} {set.startPeriod}
                </div>
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: '20px',
                color: '#FFFFFF',
                marginBottom: '16px',
                fontFamily: 'Comfortaa, sans-serif',
                fontWeight: 500
              }}>
                {set.name}
              </h2>

              {/* Stat Chips */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{
                  background: 'rgba(51, 79, 107, 0.4)',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  color: '#D4ECF1'
                }}>
                  {totalDistance >= 1000 ? `${(totalDistance / 1000).toFixed(1)} km` : `${totalDistance}m`}
                </div>
                <div style={{
                  background: 'rgba(51, 79, 107, 0.4)',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  color: '#D4ECF1'
                }}>
                  {totalMin} min
                </div>
                <div style={{
                  background: 'rgba(51, 79, 107, 0.4)',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  color: '#D4ECF1'
                }}>
                  {set.drills.length} drills
                </div>
              </div>

              {/* Workout Rows */}
              <div style={{ marginBottom: '20px' }}>
                {set.drills.map((drill, i) => {
                  const meta = DRILL_TYPE_MAP[drill.type] || DRILL_TYPE_MAP.main;
                  return (
                    <div
                      key={drill.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 92px 1fr 52px',
                        gap: '8px',
                        alignItems: 'center',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        borderBottom: i < set.drills.length - 1 ? '1px solid rgba(152, 192, 200, 0.1)' : 'none'
                      }}
                    >
                      <span style={{
                        fontSize: '11px',
                        color: 'rgba(212, 236, 241, 0.4)',
                        textAlign: 'left'
                      }}>
                        {i + 1}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#98C0C8'
                      }}>
                        {meta.label}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#FFFFFF',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {drill.reps > 1 ? `${drill.reps}×` : ''}{drill.distance}m {drill.stroke}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#D4ECF1',
                        textAlign: 'right',
                        fontVariantNumeric: 'tabular-nums'
                      }}>
                        {drill.paceMin}:{drill.paceSec.toString().padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button
                  onClick={() => onCopySet(set)}
                  style={{
                    flex: 1,
                    height: '58px',
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(152, 192, 200, 0.3)',
                    color: '#D4ECF1',
                    borderRadius: '16px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <Copy size={14} strokeWidth={2} />
                  <span>Copy Set</span>
                </button>
                <button
                  onClick={() => onSelectGhost('legend', legend.id)}
                  style={{
                    flex: 1,
                    height: '58px',
                    backgroundColor: isRacingLegend ? '#334F6B' : '#98C0C8',
                    border: 'none',
                    color: isRacingLegend ? '#FFFFFF' : '#111033',
                    borderRadius: '16px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    boxShadow: isRacingLegend ? 'none' : '0 4px 16px rgba(152, 192, 200, 0.3)'
                  }}
                >
                  {isRacingLegend ? (
                    <>
                      <Check size={14} strokeWidth={2} />
                      <span>Racing This</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={14} strokeWidth={2} />
                      <span>Race This</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
