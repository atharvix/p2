import React from 'react';
import SplitText from './SplitText';
import { RECORD } from '../data/siteData';

export default function Record() {
  return (
    <section className="section" id="record">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">
            <SplitText text="Track record" />
          </h2>
          <p className="sec-lede reveal">
            Every hand so far, most recent first.
          </p>
        </div>
        <div className="timeline" id="timeline">
          <div className="tl-line">
            <i id="tlFill"></i>
          </div>
          {RECORD.map((r, i) => (
            <div key={i} className="tl-item">
              <div className="tl-node">
                <svg viewBox="0 0 20 20">
                  <rect
                    x="4"
                    y="4"
                    width="12"
                    height="12"
                    transform="rotate(45 10 10)"
                    fill="#17090F"
                    stroke="#C5A15A"
                  />
                </svg>
              </div>
              <div>
                <div className="tl-when">{r.when}</div>
                <div className="tl-where">{r.where}</div>
              </div>
              <div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
