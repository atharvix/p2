import React, { useState, useEffect, useRef } from 'react';

export default function Nav({ onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const menuOpenRef = useRef(false);
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    // Passive IntersectionObserver for section tracking (zero layout queries on scroll)
    const sections = ['founder', 'services', 'work', 'stack', 'record', 'gallery', 'contact'];
    const visibleMap = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        visibleMap.set(entry.target.id, entry.isIntersecting);
      });
      // Pick the first currently intersecting section in DOM order
      for (const id of sections) {
        if (visibleMap.get(id)) {
          setActiveSection(id);
          break;
        }
      }
    }, {
      rootMargin: '-20% 0px -40% 0px'
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Throttled scroll header state
    let lastY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const nextSolid = y > 40;
          setIsSolid(prev => (prev !== nextSolid ? nextSolid : prev));

          const nextHidden = y > lastY && y > 400 && !menuOpenRef.current;
          setIsHidden(prev => (prev !== nextHidden ? nextHidden : prev));

          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavClick) {
      onNavClick(id);
    } else {
      const target = id === '#top' ? 0 : document.querySelector(id);
      if (target !== null) {
        window.scrollTo({
          top: target === 0 ? 0 : target.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className={`nav ${isSolid ? 'solid' : ''} ${isHidden ? 'hide' : ''}`} id="nav">
      <div className="wrap nav-in">
        <a
          href="#top"
          className="brand"
          aria-label="Atharvix Technologies, back to top"
          onClick={(e) => handleLinkClick(e, '#top')}
        >
          <span className="brand-mark">
            <svg className="mono-fallback" viewBox="0 0 100 100">
              <use href="#monogram" />
            </svg>
            <img className="logo-img" src="/assets/logo.png" alt="" />
          </span>
          <span className="brand-name">
            Atharvix<small>TECHNOLOGIES</small>
          </span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <li>
            <a
              href="#founder"
              className={activeSection === 'founder' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, '#founder')}
            >
              Founder
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={activeSection === 'services' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, '#services')}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#work"
              className={activeSection === 'work' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, '#work')}
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#stack"
              className={activeSection === 'stack' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, '#stack')}
            >
              Stack
            </a>
          </li>
          <li>
            <a
              href="#record"
              className={activeSection === 'record' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, '#record')}
            >
              Record
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className={activeSection === 'gallery' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, '#gallery')}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, '#contact')}
            >
              Contact
            </a>
          </li>
        </ul>

        <a
          href="#contact"
          className="btn btn-sm"
          onClick={(e) => handleLinkClick(e, '#contact')}
        >
          Start a project
        </a>

        <button
          className="nav-menu"
          id="navMenu"
          aria-expanded={menuOpen}
          aria-controls="navLinks"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
}
