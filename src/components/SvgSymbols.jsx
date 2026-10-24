import React from 'react';

export default function SvgSymbols() {
  return (
    <svg width="0" height="0" className="absolute" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="chip-edge" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="12.3 12.3" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6" />
        </symbol>
        <symbol id="monogram" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#2B101D" stroke="#C5A15A" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="#C5A15A" strokeWidth="5" strokeDasharray="7.5 7.5" opacity="0.85" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#C5A15A" strokeWidth="0.8" />
          <text x="50" y="66" textAnchor="middle" fontFamily="Bodoni Moda, Didot, serif" fontSize="46" fontWeight="500" fill="#F0E7D5">A</text>
        </symbol>
      </defs>
    </svg>
  );
}
