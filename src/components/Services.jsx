import React from 'react';
import SplitText from './SplitText';
import { SERVICES } from '../data/siteData';

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">
            <SplitText text="What we bring to the table" />
          </h2>
          <p className="sec-lede reveal">
            Four disciplines, one studio. Bring us one, or the whole hand.
          </p>
        </div>
        <div className="deck" id="deck">
          {SERVICES.map((s, index) => (
            <article
              key={index}
              className={`pcard ${s.red ? 'red' : ''}`}
              data-suit={s.suit}
            >
              <div className="pcard-inner">
                {/* Front Face: Upright and correctly oriented */}
                <div className="pcard-face pcard-front">
                  <div className="pcard-idx">
                    {s.rank}<span>{s.suit}</span>
                  </div>
                  <div className="pcard-suit" aria-hidden="true">
                    {s.suit}
                  </div>
                  <div className="pcard-big" aria-hidden="true">
                    {s.suit}
                  </div>
                  <div className="pcard-body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <div className="pcard-idx pcard-idx-br" aria-hidden="true">
                    {s.rank}<span>{s.suit}</span>
                  </div>
                </div>

                {/* Back Face: Luxury guilloche pattern */}
                <div className="pcard-face pcard-back" aria-hidden="true">
                  <div className="pcard-back-pattern">
                    <div className="pcard-back-seal">
                      <svg viewBox="0 0 100 100">
                        <use href="#chip-edge" />
                      </svg>
                      <span>A</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
