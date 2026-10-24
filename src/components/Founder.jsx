import React, { useState } from 'react';
import SplitText from './SplitText';
import { SITE } from '../data/siteData';

export default function Founder() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="section" id="founder">
      <div className="wrap founder-grid">
        <div className="portrait-wrap">
          <figure
            className={`portrait slot ${imgFailed ? 'empty' : ''}`}
            id="portrait"
            data-src="/assets/portrait.jpg"
            style={{ margin: 0 }}
          >
            {!imgFailed && (
              <img
                src="/assets/portrait.jpg"
                alt="Portrait of the founder of Atharvix Technologies"
                onLoad={() => {
                  window.dispatchEvent(new Event('refresh-triggers'));
                }}
                onError={() => setImgFailed(true)}
              />
            )}
            <figcaption className="portrait-tag">
              <span>{SITE.founderName}</span>
              <small>Founder, Atharvix Technologies</small>
            </figcaption>
          </figure>
        </div>

        <div className="founder-text">
          <h2 className="sec-title">
            <SplitText text="Every good hand starts with who is dealing." />
          </h2>
          <p className="lead reveal">
            I started Atharvix to build software that holds its value long after launch day.
          </p>
          <p className="reveal">
            Write your summary here. Who you are, what you have built, and what kind of work you take on. Keep it to two or three short paragraphs so it reads quickly beside your portrait.
          </p>
          <p className="reveal">
            A second paragraph works well for how you work with clients: how you scope, how you communicate, and what someone can expect in the first two weeks of a project.
          </p>
          <div className="signature reveal">{SITE.founderName}</div>
        </div>
      </div>
    </section>
  );
}
