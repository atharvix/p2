import React, { useEffect, useState } from 'react';

export default function Loader({ onFinish }) {
  const [flip, setFlip] = useState(false);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const LOADER_MS = reduceMotion ? 400 : 2000;
    const startTime = performance.now();

    const finish = () => {
      setFlip(true);
      setTimeout(() => {
        setDone(true);
        document.body.classList.remove('is-loading');
        if (onFinish) onFinish();
        setTimeout(() => {
          setGone(true);
        }, 950);
      }, reduceMotion ? 0 : 450);
    };

    const wait = Math.max(0, LOADER_MS - 450 - (performance.now() - startTime));
    const timer = setTimeout(finish, wait);
    // fallback timeout to never hold page longer than 4s
    const fallbackTimer = setTimeout(() => {
      if (!done) finish();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader ${done ? 'done' : ''}`} id="loader" aria-hidden="true">
      <div className="loader-half top"></div>
      <div className="loader-half bottom"></div>
      <div className="loader-core">
        <div className={`loader-chip ${flip ? 'flip' : ''}`} id="loaderChip">
          <svg viewBox="0 0 120 120" className="mono-fallback">
            <circle className="draw" cx="60" cy="60" r="56" fill="none" stroke="#C5A15A" strokeWidth="1.2" />
            <circle className="draw d2" cx="60" cy="60" r="46" fill="none" stroke="#C5A15A" strokeWidth="0.8" />
            <circle className="draw d3" cx="60" cy="60" r="56" fill="none" stroke="#C5A15A" strokeWidth="7" strokeDasharray="9 9" opacity="0.9" />
            <g className="mono-fill">
              <text x="60" y="77" textAnchor="middle" fontFamily="Bodoni Moda, Didot, serif" fontSize="54" fontWeight="500" fill="#F0E7D5">A</text>
            </g>
          </svg>
          <img className="logo-img" src="/assets/logo.png" alt="" />
        </div>
        <div className="loader-name">ATHARVIX</div>
        <div className="loader-sub">Technologies</div>
      </div>
    </div>
  );
}
