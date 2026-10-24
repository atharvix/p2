import React from 'react';
import SplitText from './SplitText';
import { STACK } from '../data/siteData';

export default function Stack() {
  return (
    <section className="section" id="stack">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">
            <SplitText text="The stack we bet on" />
          </h2>
          <p className="sec-lede reveal">
            Tools chosen for how they behave under pressure, not for how new they are.
          </p>
        </div>
        <div className="chips" id="chips">
          {STACK.map((c, i) => (
            <div key={i} className="chip-item">
              <div className="chip" data-suit="♣">
                <div
                  className="chip-face"
                  style={{
                    background: c.color,
                    color: c.ink,
                    boxShadow: '0 24px 40px -18px rgba(0,0,0,.8), inset 0 0 0 2px rgba(0,0,0,.2)'
                  }}
                >
                  <svg viewBox="0 0 100 100">
                    <use href="#chip-edge" />
                  </svg>
                  <div className="chip-label">
                    {c.label}
                    <small style={{ color: c.ink, opacity: 0.7 }}>{c.sub}</small>
                  </div>
                </div>
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
