import { useEffect, useId, useState } from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './CheslyLogo.css';

const LOGO_STATES = {
  idle: {
    label: 'Idle',
    gradient: ['#A3E635', '#22D3EE', '#06B6D4'],
    pulse: '2.4s',
    glow: 'rgba(34, 211, 238, 0.25)',
    ring: '#F9FAFB',
    ping: '#22D3EE',
    caption: 'Calm core breathing while it waits.',
    swatch: '#22D3EE',
    spin: false,
  },
  connected: {
    label: 'Connected',
    gradient: ['#A3E635', '#22D3EE', '#06B6D4'],
    pulse: '2.2s',
    glow: 'rgba(34, 211, 238, 0.45)',
    ring: '#F9FAFB',
    ping: '#22D3EE',
    caption: 'Glow ring shows Chesly is live and listening.',
    swatch: '#06B6D4',
    spin: false,
  },
  thinking: {
    label: 'Thinking',
    gradient: ['#A3E635', '#22D3EE', '#06B6D4'],
    pulse: '1.8s',
    glow: 'rgba(34, 211, 238, 0.55)',
    ring: '#F9FAFB',
    ping: '#22D3EE',
    caption: 'Gradient rotates as the core processes.',
    swatch: '#A3E635',
    spin: true,
    spinSpeed: '8s',
  },
  error: {
    label: 'Error',
    gradient: ['#F97373', '#F97373', '#B91C1C'],
    pulse: '1.2s',
    glow: 'rgba(249, 115, 115, 0.35)',
    ring: '#F9FAFB',
    ping: '#F97373',
    caption: 'Faster pulse and warm hue call attention.',
    swatch: '#F97373',
    spin: false,
  },
  offline: {
    label: 'Offline',
    gradient: ['#9CA3AF', '#9CA3AF', '#6B7280'],
    pulse: '0s',
    glow: 'rgba(156, 163, 175, 0.15)',
    ring: '#6b7280',
    ping: '#9CA3AF',
    caption: 'Muted, still core to signal sleep mode.',
    swatch: '#9CA3AF',
    spin: false,
  },
};

export function CheslyLogo() {
  const [state, setState] = useState('connected');
  const [pingKey, setPingKey] = useState(0);
  const gradientId = useId();

  useEffect(() => {
    const interval = setInterval(() => {
      setPingKey((key) => key + 1);
    }, 6200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state !== 'offline') {
      setPingKey((key) => key + 1);
    }
  }, [state]);

  const currentState = LOGO_STATES[state];
  const isThinking = currentState.spin;

  const triggerPing = () => {
    if (state !== 'offline') {
      setPingKey((key) => key + 1);
    }
  };

  return (
    <section className="section chesly-logo-section" id="chesly-logo">
      <div className="container chesly-logo-grid">
        <ScrollReveal className="chesly-logo-copy">
          <span className="section-badge">Logo Animation</span>
          <h2 className="section-title">
            Chesly as a calm, intelligent hub
          </h2>
          <p className="section-description">
            A living mark that shows Chesly receiving and sending communication.
            The open C embraces a glowing core, while the tail anchors it in a shared
            message space.
          </p>

          <div className="chesly-symbols">
            <div className="symbol-card">
              <div className="symbol-dot"></div>
              <div>
                <p className="symbol-title">C as channel</p>
                <p className="symbol-copy">Thick stroke with a 60° gap keeps the hub open to every inbox.</p>
              </div>
            </div>
            <div className="symbol-card">
              <div className="symbol-dot tail"></div>
              <div>
                <p className="symbol-title">Tail = chat bubble</p>
                <p className="symbol-copy">A rounded, angled tail pins the mark to conversations.</p>
              </div>
            </div>
            <div className="symbol-card">
              <div className="symbol-dot core"></div>
              <div>
                <p className="symbol-title">Glowing core</p>
                <p className="symbol-copy">Radial Chesly gradient (lime → cyan) breathing at the center.</p>
              </div>
            </div>
          </div>

          <div className="chesly-controls">
            <div className="control-row">
              <span className="control-label">State colors &amp; motion</span>
              <div className="chesly-state-buttons">
                {Object.entries(LOGO_STATES).map(([key, config]) => (
                  <button
                    key={key}
                    className={`chesly-state-btn ${state === key ? 'active' : ''}`}
                    onClick={() => setState(key)}
                  >
                    <span
                      className="state-swatch"
                      style={{ background: config.swatch, boxShadow: `0 0 14px ${config.swatch}66` }}
                    ></span>
                    {config.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="control-row">
              <div>
                <span className="control-label">Message in</span>
                <p className="control-hint">Send a ripple from the gap into the core.</p>
              </div>
              <button className="chesly-ghost-btn" onClick={triggerPing}>
                Trigger ping
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="chesly-logo-card" delay={200}>
          <div
            className={`chesly-logo-shell state-${state} ${isThinking ? 'state-thinking' : ''}`}
            style={{
              '--ring-color': currentState.ring,
              '--dot-stop-1': currentState.gradient[0],
              '--dot-stop-2': currentState.gradient[1],
              '--dot-stop-3': currentState.gradient[2],
              '--pulse-speed': currentState.pulse,
              '--glow-color': currentState.glow,
              '--ping-color': currentState.ping,
              '--spin-speed': currentState.spinSpeed || '9s',
            }}
          >
            <div className="chesly-logo-surface">
              <div className="chesly-logo-mesh"></div>

              <svg
                className="chesly-mark"
                viewBox="0 0 256 256"
                role="img"
                aria-label={`Animated Chesly logo - ${currentState.label} state`}
              >
                <defs>
                  <radialGradient id={`${gradientId}-dot`} cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="var(--dot-stop-1)" />
                    <stop offset="55%" stopColor="var(--dot-stop-2)" />
                    <stop offset="100%" stopColor="var(--dot-stop-3)" />
                  </radialGradient>
                </defs>

                <circle className="chesly-ring" cx="128" cy="128" r="85" />
                <circle className="chesly-highlight" cx="128" cy="128" r="62" />
                <path
                  className="chesly-tail"
                  d="M96 176 C82 186 80 198 90 206 L118 230 C126 236 138 230 136 220 L132 192 C130 182 117 172 106 172 Z"
                  transform="rotate(-35 106 198)"
                />
                <circle className="chesly-dot" cx="122" cy="126" r="32" fill={`url(#${gradientId}-dot)`} />
              </svg>

              {state !== 'offline' && <div className="chesly-ping" key={pingKey}></div>}
            </div>

            <div className="chesly-state-label">
              <span className="state-pill">{currentState.label}</span>
              <p>{currentState.caption}</p>
            </div>
          </div>

          <div className="chesly-legend">
            <div className="legend-item">
              <span className="legend-swatch ring"></span>
              <div>
                <p className="legend-title">Open channel</p>
                <p className="legend-copy">Outer C stroke with right-side gap shows messages coming in.</p>
              </div>
            </div>
            <div className="legend-item">
              <span className="legend-swatch core"></span>
              <div>
                <p className="legend-title">Chesly core</p>
                <p className="legend-copy">Radial gradient dot scales with a calm pulse.</p>
              </div>
            </div>
            <div className="legend-item">
              <span className="legend-swatch tail"></span>
              <div>
                <p className="legend-title">Chat bubble tail</p>
                <p className="legend-copy">Rounded triangle pulls the mark into a conversation.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
