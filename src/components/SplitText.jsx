import React from 'react';

export default function SplitText({ text, className = '' }) {
  const words = text.trim().split(/\s+/);

  return (
    <span className={`split ${className}`}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w">
            <span className="wi">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </span>
  );
}
