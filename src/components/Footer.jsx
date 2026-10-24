import React from 'react';
import { SITE } from '../data/siteData';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleLink = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = target === '#top' ? 0 : document.querySelector(target);
      if (el === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        {/* Upper Architecture: 3-Column Luxury Dossier Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand Signature & Mission */}
          <div className="footer-brand">
            <a
              href="#top"
              className="footer-brand-header"
              onClick={(e) => handleLink(e, '#top')}
              aria-label="Atharvix Technologies, back to top"
            >
              <span className="brand-mark">
                <svg className="mono-fallback" viewBox="0 0 100 100">
                  <use href="#monogram" />
                </svg>
              </span>
              <span className="brand-name">
                Atharvix<small>TECHNOLOGIES</small>
              </span>
            </a>
            <p className="footer-statement">
              A software studio that plays the long game. We design and engineer products the way a disciplined player reads a table: study the situation, size the risk, and commit only when the odds are on our side.
            </p>
            <div className="footer-status-pill">
              <span className="status-dot" aria-hidden="true"></span>
              <span>Available for select Q2/Q3 partnerships</span>
            </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="footer-nav">
            <h4 className="footer-col-title">Directory</h4>
            <ul className="footer-nav-links">
              <li>
                <a href="#work" onClick={(e) => handleLink(e, '#work')}>
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLink(e, '#services')}>
                  Disciplines & Services
                </a>
              </li>
              <li>
                <a href="#stack" onClick={(e) => handleLink(e, '#stack')}>
                  Technology Stack
                </a>
              </li>
              <li>
                <a href="#record" onClick={(e) => handleLink(e, '#record')}>
                  Track Record
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLink(e, '#gallery')}>
                  Studio Gallery
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLink(e, '#contact')}>
                  Initiate Project
                </a>
              </li>
              <li>
                <a href="#top" onClick={(e) => handleLink(e, '#top')}>
                  Back to top ↑
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact & Social Affordances */}
          <div className="footer-contact">
            <h4 className="footer-col-title">Direct Dispatch</h4>
            <p className="footer-contact-hint">
              Have an architectural question, an audit inquiry, or an ambitious build?
            </p>
            <a href={`mailto:${SITE.email}`} className="footer-email-link">
              <span>{SITE.email}</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </a>

            <div className="footer-social-wrap">
              <span className="footer-social-label">Verified Networks</span>
              <div className="footer-social-icons">
                {/* LinkedIn Link */}
                <a
                  href={SITE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Atharvix Technologies on LinkedIn"
                  title="Connect on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                  </svg>
                </a>

                {/* GitHub Link */}
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Atharvix Technologies on GitHub"
                  title="View repositories on GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="footer-location-tag">Remote First • Global Reach</p>
          </div>
        </div>

        {/* Ornamental Divider with Gold Suit Accent */}
        <div className="footer-divider" aria-hidden="true">
          <span className="footer-divider-line"></span>
          <span className="footer-divider-gem">♦</span>
          <span className="footer-divider-line"></span>
        </div>

        {/* Large Animated Atharvix Watermark */}
        <div className="footer-big" aria-hidden="true">
          Atharvix
        </div>

        {/* Bottom Metadata & Copyright Line */}
        <div className="footer-bottom-bar">
          <span className="footer-copy">
            &copy; <span id="year">{currentYear}</span> Atharvix Technologies. All rights reserved.
          </span>
          <span className="footer-tagline">
            Built by hand, shipped with care. <span className="footer-suits">♠ ♥ ♣ ♦</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
