import React, { useEffect, useRef } from 'react';

export default function ScrollRail({ scrollYRef }) {
  const fillRef = useRef(null);
  const chipRef = useRef(null);

  useEffect(() => {
    let animId;
    let smScroll = 0;
    let cachedMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const updateMax = () => {
      cachedMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    window.addEventListener('resize', updateMax, { passive: true });
    window.addEventListener('refresh-triggers', updateMax, { passive: true });

    const tick = () => {
      const H = window.innerHeight;
      const scrollY = scrollYRef ? scrollYRef.current : window.scrollY;
      smScroll += (scrollY - smScroll) * 0.08;
      const p = cachedMax > 0 ? Math.min(1, Math.max(0, smScroll / cachedMax)) : 0;
      const railH = H * 0.64;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p})`;
      }
      if (chipRef.current) {
        chipRef.current.style.transform = `translateY(${p * railH}px) rotate(${p * 1080}deg)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', updateMax);
      window.removeEventListener('refresh-triggers', updateMax);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-fill" id="railFill" ref={fillRef}></div>
      <div className="rail-chip" id="railChip" ref={chipRef}>
        <svg viewBox="0 0 100 100" style={{ color: '#C5A15A' }}>
          <circle cx="50" cy="50" r="46" fill="#2B101D" />
          <use href="#chip-edge" />
        </svg>
      </div>
    </div>
  );
}
