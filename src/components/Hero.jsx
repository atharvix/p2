import React from 'react';

export default function Hero({ onNavigate }) {
  const letters = 'Atharvix'.split('');

  const handleCta = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-frame" aria-hidden="true">
        <i></i><i></i><i></i><i></i>
      </div>
      <div className="wrap hero-in">
        <h1 className="hero-title" aria-label="Atharvix Technologies">
          <span className="hero-word" aria-hidden="true">
            {letters.map((char, index) => (
              <span key={index} className="l">{char}</span>
            ))}
          </span>
          <span className="hero-sub" aria-hidden="true">TECHNOLOGIES</span>
        </h1>
        <p className="hero-copy">
          A software studio that plays the long game. We design and engineer products the way a good player reads a table: study the situation, size the risk, and commit only when the odds are on our side.
        </p>
        <div className="hero-ctas">
          <a
            href="#work"
            className="btn btn-solid"
            data-suit="♠"
            onClick={(e) => handleCta(e, '#work')}
          >
            See our work
          </a>
          <a
            href="#contact"
            className="btn"
            data-suit="♦"
            onClick={(e) => handleCta(e, '#contact')}
          >
            Start a project
          </a>
        </div>
        <div className="hero-hand" aria-hidden="true">
          <div className="mini">A<span>♠</span></div>
          <div className="mini red">K<span>♥</span></div>
          <div className="mini">Q<span>♣</span></div>
          <div className="mini red">J<span>♦</span></div>
          <div className="mini">10<span>♠</span></div>
        </div>
      </div>
    </section>
  );
}
