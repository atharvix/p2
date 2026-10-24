import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const chipRef = useRef(null);
  const suitRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    document.body.classList.add('cursor-on');
    let cx = -100, cy = -100, rx = -100, ry = -100;
    let animId;

    const handlePointerMove = (e) => {
      cx = e.clientX;
      cy = e.clientY;
    };

    const handlePointerDown = () => {
      cursorRef.current?.classList.add('press');
    };

    const handlePointerUp = () => {
      cursorRef.current?.classList.remove('press');
    };

    const handlePointerOver = (e) => {
      const el = e.target.closest('a, button, .pcard, .proj-media, .chip, .g-item, input, textarea, label');
      cursorRef.current?.classList.toggle('hover', !!el);
      if (el) {
        const foundSuit = el.dataset.suit || el.closest('[data-suit]')?.dataset.suit || '♠';
        if (suitRef.current) suitRef.current.textContent = foundSuit;
      }
    };

    const handleMouseLeave = () => {
      cx = -100;
      cy = -100;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointerover', handlePointerOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    const tick = () => {
      rx += (cx - rx) * 0.16;
      ry += (cy - ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      if (chipRef.current) chipRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('cursor-on');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="cursor" id="cursor" ref={cursorRef} aria-hidden="true">
      <div className="cursor-chip" ref={chipRef}>
        <svg viewBox="0 0 100 100" style={{ color: '#C5A15A' }}>
          <use href="#chip-edge" />
        </svg>
        <div className="cursor-suit" id="cursorSuit" ref={suitRef}>♠</div>
      </div>
      <div className="cursor-dot" ref={dotRef}></div>
    </div>
  );
}
