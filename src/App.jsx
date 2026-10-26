import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import SvgSymbols from './components/SvgSymbols';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import EngravingCanvas from './components/EngravingCanvas';
import ScrollRail from './components/ScrollRail';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Founder from './components/Founder';
import Services from './components/Services';
import Projects from './components/Projects';
import Stack from './components/Stack';
import Record from './components/Record';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef(null);
  const lenisRef = useRef(null);
  const scrollYRef = useRef(0);
  const introProgressRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check logo image presence
    const probe = new Image();
    probe.onload = () => document.body.classList.add('has-logo');
    probe.src = '/assets/logo.png';

    // Lenis smooth scrolling setup
    let tickerFn;
    if (!reduceMotion) {
      const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1 });
      lenisRef.current = lenis;
      lenis.stop();

      lenis.on('scroll', (e) => {
        scrollYRef.current = e.scroll;
        ScrollTrigger.update();
      });

      tickerFn = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    } else {
      const handleScroll = () => {
        scrollYRef.current = window.scrollY;
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Initialize all scroll-driven triggers immediately within a scoped GSAP context
    // This guarantees triggers compute on mount and prevents text from being trapped in hidden states
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        initScrollAnimations();
      }
    }, appRef);

    // Refresh ScrollTriggers when web fonts finish loading to prevent stale trigger offsets
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Refresh triggers when async images or layout updates dispatch 'refresh-triggers'
    const handleCustomRefresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('refresh-triggers', handleCustomRefresh);

    const initialRefreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(initialRefreshTimer);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      window.removeEventListener('refresh-triggers', handleCustomRefresh);
      ctx.revert();
    };
  }, []);

  const handleLoaderFinish = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (lenisRef.current) {
      lenisRef.current.start();
    }

    // Recalculate ScrollTrigger positions as the loader unblocks document body overflow
    ScrollTrigger.refresh();
    window.dispatchEvent(new Event('refresh-triggers'));

    if (!reduceMotion) {
      // Intro animations for the Hero section
      gsap.to(introProgressRef, {
        current: 1,
        duration: 2.2,
        ease: 'power3.out'
      });

      const letters = document.querySelectorAll('.hero-word .l');
      gsap.fromTo(letters,
        {
          yPercent: -120,
          rotate: () => gsap.utils.random(-25, 25),
          opacity: 0
        },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.06,
          clearProps: 'transform,opacity'
        }
      );

      gsap.fromTo('.hero-sub',
        {
          opacity: 0,
          letterSpacing: '1.4em'
        },
        {
          opacity: 1,
          letterSpacing: '0.62em',
          duration: 1.6,
          ease: 'expo.out',
          delay: 0.35,
          clearProps: 'letterSpacing,opacity'
        }
      );

      gsap.fromTo('.hero-copy, .hero-ctas',
        {
          opacity: 0,
          y: 24
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.55,
          clearProps: 'transform,opacity'
        }
      );

      gsap.fromTo('.hero-frame',
        {
          opacity: 0,
          scale: 1.03
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        }
      );

      gsap.fromTo('.hero-hand .mini',
        {
          x: 260,
          y: 120,
          rotate: 40,
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
          delay: 0.7,
          onComplete: () => {
            gsap.to('.hero-hand .mini', {
              rotate: i => (i - 2) * 9,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.04
            });
          }
        }
      );

      gsap.fromTo('.nav',
        {
          yPercent: -100
        },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
          clearProps: 'transform'
        }
      );
    } else {
      introProgressRef.current = 1;
    }
  };

  const initScrollAnimations = () => {
    // Split heading reveals with once: true and fastScrollEnd to guarantee visibility
    gsap.utils.toArray('.split').forEach((el) => {
      const wis = el.querySelectorAll('.wi');
      if (wis.length) {
        gsap.fromTo(wis,
          {
            yPercent: 110,
            rotate: 4
          },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.05,
            lazy: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
              fastScrollEnd: true
            }
          }
        );
      }
    });

    // Body copy reveals - lightweight opacity + transform without expensive animated blur
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(el,
        {
          opacity: 0,
          y: 16
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          lazy: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
            fastScrollEnd: true
          }
        }
      );
    });

    // Hero leaving effect
    gsap.to('.hero-in', {
      yPercent: -18,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    gsap.to('.hero-hand', {
      y: -160,
      rotate: -12,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Portrait 3D turnover
    gsap.fromTo('#portrait',
      { rotateY: -70, rotateZ: -6, opacity: 0.2 },
      {
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#founder', start: 'top 85%', end: 'center 60%', scrub: 1 }
      }
    );

    gsap.fromTo('#portrait img',
      { scale: 1.25 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#founder', start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

    // Services: dealt cards
    const deckCards = gsap.utils.toArray('.pcard');
    const mm = gsap.matchMedia();
    mm.add('(min-width: 521px)', () => {
      gsap.fromTo(deckCards,
        {
          x: (i, el) => {
            const d = document.getElementById('deck')?.getBoundingClientRect();
            const r = el.getBoundingClientRect();
            return d ? d.left + d.width / 2 - (r.left + r.width / 2) : 0;
          },
          y: (i, el) => {
            const d = document.getElementById('deck')?.getBoundingClientRect();
            const r = el.getBoundingClientRect();
            return d ? (d.top + d.height / 2 - (r.top + r.height / 2)) + 140 : 0;
          },
          rotate: i => (i - 1.5) * 8,
          rotateY: 180
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          rotateY: 0,
          ease: 'power2.inOut',
          stagger: 0.06,
          scrollTrigger: { trigger: '#deck', start: 'top 92%', end: 'top 35%', scrub: 1, invalidateOnRefresh: true }
        }
      );
    });

    mm.add('(max-width: 520px)', () => {
      deckCards.forEach(c => {
        gsap.fromTo(c,
          {
            y: 36,
            rotate: 0,
            rotateY: 0,
            opacity: 0
          },
          {
            y: 0,
            rotate: 0,
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: c, start: 'top 90%', once: true, fastScrollEnd: true }
          }
        );
      });
    });

    // Projects: uncover and parallax
    gsap.utils.toArray('.proj').forEach((row, i) => {
      const media = row.querySelector('.proj-media');
      const img = row.querySelector('.proj-media img');
      if (media) {
        gsap.fromTo(media,
          { clipPath: i % 2 ? 'inset(0 0 0 100% round 12px)' : 'inset(0 100% 0 0 round 12px)' },
          {
            clipPath: 'inset(0 0% 0 0% round 12px)',
            ease: 'power3.inOut',
            duration: 1.4,
            scrollTrigger: { trigger: row, start: 'top 80%', once: true, fastScrollEnd: true }
          }
        );
      }
      if (img) {
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      }
      const tags = row.querySelectorAll('.tags li');
      if (tags.length) {
        gsap.fromTo(tags,
          {
            opacity: 0,
            y: 10
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 70%', once: true, fastScrollEnd: true }
          }
        );
      }
    });

    // Stack: chips bounce drop
    gsap.fromTo('.chip-face',
      {
        y: -260,
        rotateX: 75,
        rotate: -200,
        opacity: 0
      },
      {
        y: 0,
        rotateX: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.3,
        ease: 'bounce.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '#chips', start: 'top 80%', once: true, fastScrollEnd: true }
      }
    );

    // Track record timeline
    gsap.to('#tlFill', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#timeline', start: 'top 70%', end: 'bottom 60%', scrub: true }
    });

    gsap.utils.toArray('.tl-item').forEach(item => {
      const node = item.querySelector('.tl-node');
      if (node) {
        gsap.fromTo(node,
          {
            scale: 0,
            rotate: 180
          },
          {
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: item, start: 'top 72%', once: true, fastScrollEnd: true }
          }
        );
      }
      if (item.children[1]) {
        gsap.fromTo(item.children[1],
          {
            x: -20,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%', once: true, fastScrollEnd: true }
          }
        );
      }
      if (item.children[2]) {
        gsap.fromTo(item.children[2],
          {
            x: 20,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%', once: true, fastScrollEnd: true }
          }
        );
      }
    });

    // Gallery viewport slide in (responsive: vertical entrance on mobile to prevent horizontal scroll blowouts)
    mm.add('(min-width: 769px)', () => {
      gsap.fromTo('#gViewport',
        {
          x: '24vw',
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: '#gViewport', start: 'top 88%', once: true, fastScrollEnd: true }
        }
      );

      gsap.fromTo('#table',
        { rotateX: 28, y: 80, opacity: 0, transformPerspective: 1400, transformOrigin: '50% 100%' },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '#table', start: 'top 95%', end: 'top 45%', scrub: 1 }
        }
      );

      gsap.fromTo('.footer-big',
        { xPercent: -10 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
        }
      );
    });

    mm.add('(max-width: 768px)', () => {
      gsap.fromTo('#gViewport',
        {
          y: 36,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '#gViewport', start: 'top 88%', once: true, fastScrollEnd: true }
        }
      );

      gsap.fromTo('#table',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#table', start: 'top 88%', once: true, fastScrollEnd: true }
        }
      );

      gsap.fromTo('.footer-big',
        { opacity: 0.3, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true, fastScrollEnd: true }
        }
      );
    });

    // Contact form fields reveal
    gsap.fromTo('.form .field, .form-foot',
      {
        y: 24,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.form', start: 'top 85%', once: true, fastScrollEnd: true }
      }
    );
  };

  const scrollToTarget = (target) => {
    const el = target === '#top' ? 0 : document.querySelector(target);
    if (el === null) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.6 });
    } else {
      window.scrollTo({
        top: el === 0 ? 0 : el.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={appRef} className="app-root">
      <SvgSymbols />
      <Loader onFinish={handleLoaderFinish} />
      <Cursor />

      {/* Background canvas, vignette, and grain */}
      <EngravingCanvas introProgressRef={introProgressRef} scrollYRef={scrollYRef} />
      <div className="vignette" aria-hidden="true"></div>
      <div className="grain" aria-hidden="true"></div>

      {/* Scroll rail */}
      <ScrollRail scrollYRef={scrollYRef} />

      {/* Navigation */}
      <Nav onNavClick={scrollToTarget} />

      {/* Main Content */}
      <main id="top">
        <Hero onNavigate={scrollToTarget} />
        <Founder />
        <Services />
        <Projects />
        <Stack />
        <Record />
        <Gallery scrollYRef={scrollYRef} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToTarget} />
    </div>
  );
}

