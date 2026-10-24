import React, { useEffect, useRef, useState } from 'react';
import SplitText from './SplitText';
import { GALLERY } from '../data/siteData';

function GalleryItem({ item, index, ariaHidden = false }) {
  const [hasImg, setHasImg] = useState(false);
  const [isMissing, setIsMissing] = useState(false);

  return (
    <article
      className={`g-item ${hasImg ? 'has-img' : ''}`}
      data-suit="♥"
      aria-hidden={ariaHidden}
    >
      <img
        src={item.image}
        alt=""
        draggable={false}
        loading="lazy"
        className={isMissing ? 'missing' : ''}
        onLoad={() => setHasImg(true)}
        onError={() => setIsMissing(true)}
      />
      <div className="g-idx" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="g-hint-src">{item.image}</div>
      <div className="g-text">
        <p className="g-meta">{item.meta}</p>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}

export default function Gallery({ scrollYRef }) {
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const targetXRef = useRef(0);
  const itemWidthRef = useRef(400);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const G_SPEED = reduceMotion ? 0 : 38;

    let gX = 0, gHalf = 0, gHover = false, gDrag = false, gLast = 0, gPrevT = 0;
    let prevScroll = scrollYRef ? scrollYRef.current : window.scrollY;

    const measureGallery = () => {
      gHalf = track.scrollWidth / 2;
      if (track.firstElementChild) {
        itemWidthRef.current = track.firstElementChild.getBoundingClientRect().width || 400;
      }
    };
    window.addEventListener('resize', measureGallery, { passive: true });
    window.addEventListener('refresh-triggers', measureGallery, { passive: true });
    measureGallery();

    const wrap = (v) => {
      if (!gHalf) return v;
      return ((v % gHalf) - gHalf) % gHalf;
    };

    let animId;
    const tick = (time) => {
      if (document.hidden) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(0.05, (time - gPrevT) / 1000 || 0);
      gPrevT = time;

      // Inline scroll velocity without extra setInterval
      const currentScroll = scrollYRef ? scrollYRef.current : window.scrollY;
      const scrollVel = (currentScroll - prevScroll) * 0.15;
      prevScroll = currentScroll;

      if (!gDrag && !gHover) targetXRef.current -= G_SPEED * dt;
      if (!gDrag) targetXRef.current -= Math.abs(scrollVel) * 0.18;

      gX += (targetXRef.current - gX) * 0.1;
      if (gHalf) {
        const w = wrap(gX);
        const d = w - gX;
        gX = w;
        targetXRef.current += d;
      }
      track.style.transform = `translate3d(${gX}px,0,0)`;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const onPointerEnter = () => { gHover = true; };
    const onPointerLeave = () => { gHover = false; gDrag = false; };
    const onPointerDown = (e) => {
      gDrag = true;
      gLast = e.clientX;
      viewport.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!gDrag) return;
      const dx = e.clientX - gLast;
      gLast = e.clientX;
      targetXRef.current += dx * 1.2;
    };
    const onPointerUp = () => {
      gDrag = false;
      if (!finePointer) gHover = false;
    };
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        targetXRef.current -= e.deltaX;
      }
    };

    viewport.addEventListener('pointerenter', onPointerEnter);
    viewport.addEventListener('pointerleave', onPointerLeave);
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', measureGallery);
      window.removeEventListener('refresh-triggers', measureGallery);
      cancelAnimationFrame(animId);
      viewport.removeEventListener('pointerenter', onPointerEnter);
      viewport.removeEventListener('pointerleave', onPointerLeave);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
      viewport.removeEventListener('wheel', onWheel);
    };
  }, []);

  const handlePrev = () => {
    targetXRef.current += itemWidthRef.current;
  };
  const handleNext = () => {
    targetXRef.current -= itemWidthRef.current;
  };

  return (
    <section className="gallery-sec" id="gallery" aria-label="Gallery">
      <div className="wrap gallery-head">
        <div className="sec-head">
          <h2 className="sec-title">
            <SplitText text="Away from the desk" />
          </h2>
          <p className="sec-lede reveal">
            Work in the wild, events we joined and rooms we spoke in. Drag, or use the arrows.
          </p>
        </div>
        <div className="g-controls">
          <button className="g-btn" id="gPrev" aria-label="Previous image" onClick={handlePrev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button className="g-btn" id="gNext" aria-label="Next image" onClick={handleNext}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="g-viewport" id="gViewport" ref={viewportRef}>
        <div className="g-track" id="gTrack" ref={trackRef}>
          {GALLERY.map((g, i) => (
            <GalleryItem key={`first-${i}`} item={g} index={i} ariaHidden={false} />
          ))}
          {GALLERY.map((g, i) => (
            <GalleryItem key={`second-${i}`} item={g} index={i} ariaHidden={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
