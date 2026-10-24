import React, { useEffect, useRef } from 'react';

export default function EngravingCanvas({ introProgressRef, scrollYRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, DPR = 1;
    let mouseX = 0.5, mouseY = 0.5, smX = 0.5, smY = 0.5;
    let smScroll = 0;
    let cachedMaxScroll = 1;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSmall = () => W < 760;

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 1.35);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - H);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('refresh-triggers', resize);
    resize();

    const handlePointerMove = (e) => {
      mouseX = e.clientX / (W || 1);
      mouseY = e.clientY / (H || 1);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Batched ring renderer: single beginPath() and stroke() per ring
    const ring = (R, copies, n, steps, base, amp, amp2, ph, strokeStyle) => {
      ctx.strokeStyle = strokeStyle;
      const TAU = Math.PI * 2;
      ctx.beginPath();
      for (let j = 0; j < copies; j++) {
        const off = (j / copies) * TAU / n;
        for (let s = 0; s <= steps; s++) {
          const th = (s / steps) * TAU;
          const r = R * (base + amp * Math.sin(n * th + ph) + amp2 * Math.sin(3 * n * th - ph * 1.7));
          const a = th + off;
          const x = r * Math.cos(a), y = r * Math.sin(a);
          s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
      }
      ctx.stroke();
    };

    let animId;
    const draw = (time) => {
      // Pause drawing if tab is in background
      if (document.hidden) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const scrollY = scrollYRef ? scrollYRef.current : window.scrollY;
      const introProgress = introProgressRef ? introProgressRef.current : 1;

      smX += (mouseX - smX) * 0.05;
      smY += (mouseY - smY) * 0.05;
      smScroll += (scrollY - smScroll) * 0.08;

      ctx.clearRect(0, 0, W, H);
      if (introProgress <= 0.005) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const heroP = Math.min(1, smScroll / (H || 1));
      const docP = smScroll / cachedMaxScroll;
      const t = reduceMotion ? 0 : time * 0.00012;

      const heroCx = isSmall() ? W * 0.5 : W * 0.7;
      const heroCy = isSmall() ? H * 0.4 : H * 0.52;
      const driftCx = W * 0.5 + Math.sin(smScroll / 1500) * W * 0.32;
      const driftCy = H * 0.5 + Math.cos(smScroll / 1900) * H * 0.18;
      const cx = heroCx + (driftCx - heroCx) * heroP + (smX - 0.5) * 40;
      const cy = heroCy + (driftCy - heroCy) * heroP + (smY - 0.5) * 30;
      const R0 = isSmall() ? Math.min(W * 0.48, H * 0.34) : Math.min(W * 0.36, H * 0.46);
      const R = (R0 + (Math.max(W, H) * 0.5 - R0) * heroP) * (0.6 + 0.4 * introProgress);
      const baseAlpha = (isSmall() ? 0.22 : 0.42) * (1 - heroP * 0.62) * introProgress;
      const lw = isSmall() ? 0.5 : 0.65;

      const ph = t * 6 + docP * 14 + (smX - 0.5) * 1.2;
      const breathe = 1 + Math.sin(time * 0.0006) * (reduceMotion ? 0 : 0.03);
      const ampMouse = 1 + (smY - 0.5) * 0.5;

      ctx.save();
      ctx.translate(cx, cy);

      // Deep burgundy center and negative space glow behind rosette
      if (baseAlpha > 0.005) {
        const radialGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.45);
        radialGrad.addColorStop(0, `rgba(43, 16, 29, ${0.55 * introProgress})`);      // Dark Burgundy #2B101D
        radialGrad.addColorStop(0.45, `rgba(33, 11, 21, ${0.32 * introProgress})`);  // Noir Wine #210B15
        radialGrad.addColorStop(1, 'rgba(23, 9, 15, 0)');                             // Black Cherry #17090F
        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(0, 0, R * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.rotate(t * 0.8 + docP * Math.PI * 2.5);
      ctx.lineWidth = lw;
      const lite = isSmall() ? 0.6 : 1;

      // Outer band: subdued Spiced Wine / Royal Bordeaux strokes
      if (baseAlpha * 0.75 > 0.005) {
        ring(R * breathe, Math.round(44 * lite), 18, 270, 0.9, 0.035 * ampMouse, 0.012, ph * 1.3, `rgba(138, 57, 72, ${baseAlpha * 0.75})`);
      }
      // Main rosette: Gilded Leaf Gold strokes
      if (baseAlpha > 0.005) {
        ring(R, Math.round(36 * lite), 9, 216, 0.6, 0.16 * ampMouse, 0.05, ph, `rgba(197, 161, 90, ${baseAlpha * 0.95})`);
      }
      // Inner seal: Antique Bronze / Ochre strokes
      if (baseAlpha * 1.05 > 0.005) {
        ring(R * breathe, Math.round(24 * lite), 6, 144, 0.26, 0.06, 0.02, -ph * 1.5, `rgba(152, 116, 60, ${baseAlpha * 1.05})`);
      }

      // Fine guide circles batched: Antique Ochre & Gilded Gold
      if (baseAlpha > 0.005) {
        ctx.strokeStyle = `rgba(197, 161, 90, ${baseAlpha * 0.45})`;
        ctx.beginPath();
        [0.985, 0.8, 0.4, 0.17].forEach(k => {
          ctx.moveTo(R * k, 0);
          ctx.arc(0, 0, R * k, 0, Math.PI * 2);
        });
        ctx.stroke();
      }

      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('refresh-triggers', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="engraving" ref={canvasRef} aria-hidden="true" />;
}
