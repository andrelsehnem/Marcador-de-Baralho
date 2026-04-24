import React, { useState, useEffect } from 'react';
import './Landing.css';

const CARDS: { suit: string; red: boolean }[] = [
  { suit: '♠', red: false },
  { suit: '♥', red: true },
  { suit: '♦', red: true },
  { suit: '♣', red: false },
];

const LandingPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  type Star = { id: number; left: number; top: number; delay: number; size: number };
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const newStars: Star[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() < 0.2 ? 3 : 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="landing-page">

      {/* Estrelas douradas */}
      <div className="stars" aria-hidden="true">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Naipes decorativos de fundo */}
      <div className="suit-bg" aria-hidden="true">
        <span className="suit">♠</span>
        <span className="suit">♥</span>
        <span className="suit">♣</span>
        <span className="suit">♦</span>
      </div>

      {/* ── Hero (100vh) ─────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <span className="hero-badge">🃏 Gratuito · Sem Cadastro</span>
            <h1 className="title">
              Marcador de<br />
              <span className="title-accent">Pontos</span>
            </h1>
            <p className="subtitle">
              Chega de papel e caneta. Controle a pontuação dos seus jogos de baralho de forma simples, rápida e sem perder o progresso.
            </p>
            <div className="hero-actions">
              <button className="hero-btn hero-btn-primary" onClick={() => onNavigate('cacheta')}>
                🃏 Jogar Cacheta
              </button>
              <button className="hero-btn hero-btn-secondary" onClick={() => onNavigate('truco')}>
                🎯 Jogar Truco
              </button>
            </div>
            <button className="hero-link" onClick={() => onNavigate('listajogos')}>
              Ver todos os jogos →
            </button>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="card-fan">
              {CARDS.map((c, i) => (
                <div
                  key={i}
                  className={`fan-card${c.red ? ' fan-card-red' : ''}`}
                  style={{ '--fan-i': i } as React.CSSProperties}
                >
                  <span className="fan-suit-top">{c.suit}</span>
                  <span className="fan-suit-center">{c.suit}</span>
                  <span className="fan-suit-bottom">{c.suit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-hint-line" />
          <span>↓</span>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────── */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-num">2</span>
          <span className="stat-label">Jogos disponíveis</span>
        </div>
        <div className="stat-sep" aria-hidden="true">◆</div>
        <div className="stat">
          <span className="stat-num">100%</span>
          <span className="stat-label">Gratuito</span>
        </div>
        <div className="stat-sep" aria-hidden="true">◆</div>
        <div className="stat">
          <span className="stat-num">∞</span>
          <span className="stat-label">Partidas salvas</span>
        </div>
        <div className="stat-sep" aria-hidden="true">◆</div>
        <div className="stat">
          <span className="stat-num">📱</span>
          <span className="stat-label">App Android</span>
        </div>
      </div>

      <div className="landing-container">

        {/* ── CTA Section ──────────────────────── */}
        <div className="cta">
          <div className="cta-card">
            <div className="cta-card-header">
              <span className="cta-card-icon">🌐</span>
              <h2 className="cta-card-title">Jogar no Navegador</h2>
            </div>
            <p className="cta-card-description">
              Sem instalação, sem cadastro. Abra e comece a jogar agora.
            </p>
            <div className="game-buttons">
              <button
                className="game-button cacheta-btn"
                onClick={() => onNavigate('cacheta')}
              >
                🃏 Cacheta
              </button>
              <button
                className="game-button truco-btn"
                onClick={() => onNavigate('truco')}
              >
                🎯 Truco
              </button>
              <button
                className="game-button full-list-btn"
                onClick={() => onNavigate('listajogos')}
              >
                📋 Ver lista completa de jogos
              </button>
            </div>
          </div>

          <CTACard
            icon="📱"
            title="Aplicativo Android"
            description="Leve seus jogos a qualquer lugar. Jogue offline quando quiser — disponível na Google Play Store."
            buttonText="Abrir na Play Store"
            buttonStyle={{
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
              color: '#080C18',
            }}
            onClick={() => window.open('https://play.google.com/store/apps/details?id=dev.andre100.marcadorPontos', '_blank', 'noopener,noreferrer')}
          />
        </div>

        {/* ── Features ─────────────────────────── */}
        <div className="features">
          <div className="divider" aria-hidden="true">
            <div className="divider-line" />
            <span className="divider-diamond">◆</span>
            <div className="divider-line" />
          </div>
          <h2 className="features-title">
            Por que usar o nosso <span className="features-title-accent">marcador?</span>
          </h2>
          <div className="features-grid">
            <Feature icon="⚡" text="Rápido e Intuitivo" description="Interface limpa, sem distrações. Em segundos você já está marcando pontos." />
            <Feature icon="🎯" text="Múltiplos Jogos" description="Cacheta, Truco e mais jogos chegando em breve para diversificar a diversão." />
            <Feature icon="💾" text="Progresso Salvo" description="Fechou o navegador sem querer? Seus pontos continuam exatamente onde pararam." />
          </div>
        </div>

      </div>
    </div>
  );
};

type CTACardProps = { icon: string; title: string; description: string; buttonText: string; buttonStyle: React.CSSProperties; onClick: () => void };
const CTACard = ({ icon, title, description, buttonText, buttonStyle, onClick }: CTACardProps) => {
  return (
    <div className="cta-card cta-card-clickable" onClick={onClick}>
      <div className="cta-card-header">
        <span className="cta-card-icon">{icon}</span>
        <h2 className="cta-card-title">{title}</h2>
      </div>
      <p className="cta-card-description">{description}</p>
      <button className="cta-button" style={buttonStyle}>{buttonText}</button>
    </div>
  );
};

const Feature = ({ icon, text, description }: { icon: string; text: string; description: string }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <div>
        <div className="feature-text">{text}</div>
        <div className="feature-desc">{description}</div>
      </div>
    </div>
  );
};

export default LandingPage;