import { useContext } from 'react';
import { AppContext } from '../AppContext';
import '../pages/homepage.css';

export default function Homepage({ onStartClick }) {
  const { tr } = useContext(AppContext);

  const features = tr.features || [];

  return (
    <div className="hp-container">
      {/* Background Elements */}
      <div className="hp-bg-layer hp-bg-layer-1" />
      <div className="hp-bg-layer hp-bg-layer-2" />
      <div className="hp-bg-layer hp-bg-layer-3" />

      {/* Header */}
      <header className="hp-header">
        <div className="hp-header-content">
          <div className="hp-logo-section">
            <div className="hp-logo">N</div>
            <h1 className="hp-title">{tr.headline}</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hp-hero">
        <div className="hp-hero-content">
          <div className="hp-hero-text">
            <h2 className="hp-hero-title">{tr.headline}</h2>
            <p className="hp-hero-subtitle">{tr.sub}</p>
            <button className="hp-cta-btn" onClick={onStartClick}>
              {tr.tabs?.calories || 'Começar Agora'}
            </button>
          </div>
          <div className="hp-hero-visual">
            <div className="hp-glass-orb hp-orb-1" />
            <div className="hp-glass-orb hp-orb-2" />
            <div className="hp-glass-orb hp-orb-3" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="hp-features">
        <h2 className="hp-section-title">{tr.badge}</h2>
        <div className="hp-features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="hp-feature-card">
              <div className="hp-feature-icon">{feature.icon}</div>
              <h3 className="hp-feature-title">{feature.title}</h3>
              <p className="hp-feature-desc">{feature.desc}</p>
              <div className="hp-glass-shimmer" />
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="hp-stats">
        <div className="hp-stats-grid">
          <div className="hp-stat-card">
            <div className="hp-stat-number">100%</div>
            <div className="hp-stat-label">Preciso</div>
          </div>
          <div className="hp-stat-card">
            <div className="hp-stat-number">24/7</div>
            <div className="hp-stat-label">Disponível</div>
          </div>
          <div className="hp-stat-card">
            <div className="hp-stat-number">∞</div>
            <div className="hp-stat-label">Possibilidades</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hp-cta">
        <div className="hp-cta-content">
          <h2 className="hp-cta-title">Pronto para transformar sua nutrição?</h2>
          <p className="hp-cta-subtitle">Comece agora mesmo com o NutriFit</p>
          <button className="hp-cta-btn hp-cta-btn-primary" onClick={onStartClick}>
            Iniciar Jornada
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="hp-footer">
        <p>{tr.footer}</p>
      </footer>
    </div>
  );
}
