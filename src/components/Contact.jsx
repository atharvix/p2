import React, { useState, useRef, useEffect } from 'react';
import SplitText from './SplitText';
import { SITE } from '../data/siteData';

export default function Contact() {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormStatus({ text: 'Fill in your name, email and project to send.', type: 'err' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormStatus({ text: 'That email address looks incomplete. Check it and send again.', type: 'err' });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ text: 'Sending…', type: '' });

    try {
      const payload = {
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
        subject: 'New enquiry from atharvix website',
        from_name: 'Atharvix website',
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      };

      const res = await fetch(SITE.web3formsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus({ text: 'Message sent. Expect a reply within two working days.', type: 'ok' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'The form service rejected the message');
      }
    } catch (err) {
      setFormStatus({
        text: `Message not sent: ${err.message}. Try again, or email hello@atharvix.com.`,
        type: 'err'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Twenty-One Blackjack Game State
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const deckRef = useRef([]);
  const [bank, setBank] = useState(1000);
  const [bet, setBet] = useState(0);
  const [lastBet, setLastBet] = useState(0);
  const [phase, setPhase] = useState('bet'); // 'bet' | 'play' | 'done'
  const [busy, setBusy] = useState(false);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [msg, setMsg] = useState('Place a bet, then deal. Think while you play: the house is just another algorithm.');

  const fmt = (n) => n.toLocaleString('en-US');

  const newDeck = () => {
    const d = [];
    for (let i = 0; i < 4; i++) {
      for (const s of SUITS) {
        for (const r of RANKS) {
          d.push({ r, s, hidden: false });
        }
      }
    }
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    deckRef.current = d;
  };

  const drawCard = () => {
    if (deckRef.current.length < 30) newDeck();
    return deckRef.current.pop();
  };

  const calculateScore = (hand) => {
    let t = 0;
    let aces = 0;
    hand.forEach(c => {
      if (c.hidden) return;
      if (c.r === 'A') {
        aces++;
        t += 11;
      } else {
        t += ['J', 'Q', 'K'].includes(c.r) ? 10 : parseInt(c.r, 10);
      }
    });
    while (t > 21 && aces) {
      t -= 10;
      aces--;
    }
    return t;
  };

  const isBJ = (h) => h.length === 2 && calculateScore(h) === 21;

  const wait = (ms) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return new Promise(r => setTimeout(r, reduceMotion ? 0 : ms));
  };

  useEffect(() => {
    newDeck();
  }, []);

  const handleChipClick = (amount) => {
    if (phase === 'done') setPhase('bet');
    if (amount <= bank) {
      setBank(prev => prev - amount);
      setBet(prev => {
        const nextBet = prev + amount;
        setMsg(`Bet is ${fmt(nextBet)}. Add more or deal.`);
        return nextBet;
      });
    }
  };

  const handleClear = () => {
    setBank(prev => prev + bet);
    setBet(0);
    setMsg('Bet cleared. Place a bet, then deal.');
  };

  const endRound = (text, payout) => {
    setBank(prev => prev + payout);
    setBet(0);
    setPhase('done');
    let finalText = text;
    // Bank calculation after payout
    const newBank = bank + payout;
    if (newBank === 0) {
      finalText += ' Out of tokens. Press Buy in again.';
    } else {
      finalText += ' Deal to repeat the same bet.';
    }
    setMsg(finalText);
  };

  const revealAndSettle = async (currentPHand, currentDHand, currentBet, isPlayerBJ = false) => {
    setBusy(true);
    // Reveal hidden dealer card
    const revealedDealer = currentDHand.map(c => ({ ...c, hidden: false }));
    setDealerHand(revealedDealer);
    await wait(520);

    const dealerIsBJ = isBJ(revealedDealer);

    if (isPlayerBJ || dealerIsBJ) {
      setBusy(false);
      if (isPlayerBJ && dealerIsBJ) {
        endRound('Both blackjack. Push, your bet is returned.', currentBet);
        return;
      }
      if (isPlayerBJ) {
        const win = Math.floor(currentBet * 1.5);
        endRound(`Blackjack. Paid 3 to 2: you win ${fmt(win)}.`, currentBet + win);
        return;
      }
      endRound('House blackjack. Better odds next hand.', 0);
      return;
    }

    let dHand = [...revealedDealer];
    while (calculateScore(dHand) < 17) {
      const c = drawCard();
      dHand = [...dHand, c];
      setDealerHand(dHand);
      await wait(320);
    }
    setBusy(false);

    const p = calculateScore(currentPHand);
    const d = calculateScore(dHand);

    if (d > 21) {
      endRound(`House busts at ${d}. You win ${fmt(currentBet)}.`, currentBet * 2);
    } else if (p > d) {
      endRound(`${p} beats ${d}. You win ${fmt(currentBet)}.`, currentBet * 2);
    } else if (p < d) {
      endRound(`House wins, ${d} to ${p}.`, 0);
    } else {
      endRound(`Push at ${p}. Your bet is returned.`, currentBet);
    }
  };

  const handleDeal = async () => {
    if (bank === 0 && bet === 0) {
      setBank(1000);
      setMsg('Fresh stack of 1,000 tokens. Place a bet, then deal.');
      return;
    }

    let activeBet = bet;
    if (bet === 0) {
      if (lastBet && lastBet <= bank) {
        setBank(prev => prev - lastBet);
        setBet(lastBet);
        activeBet = lastBet;
      } else {
        setMsg('Place a bet first: tap a chip.');
        return;
      }
    }

    setPhase('play');
    setBusy(true);
    setLastBet(activeBet);
    setMsg('Dealing…');

    // Reset hands
    setPlayerHand([]);
    setDealerHand([]);

    // Deal sequence: P, D, P, D(hidden)
    const p1 = drawCard();
    setPlayerHand([p1]);
    await wait(320);

    const d1 = drawCard();
    setDealerHand([d1]);
    await wait(320);

    const p2 = drawCard();
    const pHand = [p1, p2];
    setPlayerHand(pHand);
    await wait(320);

    const d2 = { ...drawCard(), hidden: true };
    const dHand = [d1, d2];
    setDealerHand(dHand);
    await wait(320);

    setBusy(false);

    if (isBJ(pHand)) {
      await revealAndSettle(pHand, dHand, activeBet, true);
      return;
    }

    setMsg(`You have ${calculateScore(pHand)}. Hit or stand?`);
  };

  const handleHit = async () => {
    setBusy(true);
    const c = drawCard();
    const nextPHand = [...playerHand, c];
    setPlayerHand(nextPHand);
    await wait(320);
    setBusy(false);

    const s = calculateScore(nextPHand);
    if (s > 21) {
      endRound(`Bust at ${s}. The house takes ${fmt(bet)}.`, 0);
    } else if (s === 21) {
      await revealAndSettle(nextPHand, dealerHand, bet);
    } else {
      setMsg(`You have ${s}. Hit or stand?`);
    }
  };

  const handleStand = async () => {
    await revealAndSettle(playerHand, dealerHand, bet);
  };

  const handleDouble = async () => {
    if (bank < bet) return;
    const doubleBet = bet * 2;
    setBank(prev => prev - bet);
    setBet(doubleBet);
    setBusy(true);

    const c = drawCard();
    const nextPHand = [...playerHand, c];
    setPlayerHand(nextPHand);
    await wait(320);
    setBusy(false);

    const s = calculateScore(nextPHand);
    if (s > 21) {
      endRound(`Doubled and bust at ${s}. The house takes ${fmt(doubleBet)}.`, 0);
    } else {
      await revealAndSettle(nextPHand, dealerHand, doubleBet);
    }
  };

  const isPlaying = phase === 'play' && !busy;
  const canDouble = isPlaying && playerHand.length === 2 && bank >= bet;

  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        {/* Left Column: Contact Form */}
        <div>
          <h2 className="sec-title">
            <SplitText text="Your move." />
          </h2>
          <p className="sec-lede reveal" style={{ marginTop: '22px' }}>
            Tell us what you are building. We reply within two working days with questions, a rough plan and an honest read on cost.
          </p>

          <form className="form" id="contactForm" noValidate onSubmit={handleFormSubmit}>
            <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
            <input type="hidden" name="subject" value="New enquiry from atharvix website" />
            <input type="hidden" name="from_name" value="Atharvix website" />
            <input type="checkbox" name="botcheck" className="hp" tabIndex="-1" autoComplete="off" />

            <div className="field">
              <label htmlFor="f-name">Your name</label>
              <input
                id="f-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleFormChange}
              />
              <span className="bar"></span>
            </div>

            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleFormChange}
              />
              <span className="bar"></span>
            </div>

            <div className="field">
              <label htmlFor="f-msg">What are you building?</label>
              <textarea
                id="f-msg"
                name="message"
                required
                value={formData.message}
                onChange={handleFormChange}
              ></textarea>
              <span className="bar"></span>
            </div>

            <div className="form-foot">
              <button className="btn btn-solid" type="submit" id="sendBtn" disabled={isSubmitting}>
                Send message
              </button>
              <p
                className={`form-status ${formStatus.type}`}
                id="formStatus"
                role="status"
                aria-live="polite"
              >
                {formStatus.text}
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Blackjack Game */}
        <div className="table" id="table" aria-label="Blackjack game">
          <div className="t-top">
            <h3>Twenty-one</h3>
            <div className="t-bank">
              Tokens <strong id="tBank">{fmt(bank)}</strong>
            </div>
          </div>

          <div className="t-row">
            <div className="t-label">
              House <span className="t-score" id="dScore">{calculateScore(dealerHand)}</span>
            </div>
            <div className="hand" id="dHand">
              {dealerHand.map((c, idx) => {
                const red = c.s === '♥' || c.s === '♦';
                return (
                  <div
                    key={idx}
                    className={`card ${red ? 'red' : ''} ${c.hidden ? 'down' : ''}`}
                    aria-label={c.hidden ? 'Face-down card' : `${c.r} of ${c.s}`}
                  >
                    <div className="front">
                      <b>{c.r}</b>
                      <i>{c.s}</i>
                      <em>{c.s}</em>
                    </div>
                    <div className="back"></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="t-row">
            <div className="t-label">
              You <span className="t-score" id="pScore">{calculateScore(playerHand)}</span>
            </div>
            <div className="hand" id="pHand">
              {playerHand.map((c, idx) => {
                const red = c.s === '♥' || c.s === '♦';
                return (
                  <div
                    key={idx}
                    className={`card ${red ? 'red' : ''}`}
                    aria-label={`${c.r} of ${c.s}`}
                  >
                    <div className="front">
                      <b>{c.r}</b>
                      <i>{c.s}</i>
                      <em>{c.s}</em>
                    </div>
                    <div className="back"></div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="t-msg" id="tMsg" aria-live="polite">
            {msg}
          </p>

          <div className="t-bet" id="tBet">
            <button
              className="t-chip c10"
              data-chip="10"
              aria-label="Add 10 tokens"
              disabled={phase === 'play' || bank < 10}
              onClick={() => handleChipClick(10)}
            >
              <svg viewBox="0 0 100 100" style={{ color: '#17090F' }}>
                <use href="#chip-edge" />
              </svg>
              <span>10</span>
            </button>
            <button
              className="t-chip c25"
              data-chip="25"
              aria-label="Add 25 tokens"
              disabled={phase === 'play' || bank < 25}
              onClick={() => handleChipClick(25)}
            >
              <svg viewBox="0 0 100 100" style={{ color: '#F0E7D5' }}>
                <use href="#chip-edge" />
              </svg>
              <span>25</span>
            </button>
            <button
              className="t-chip c100"
              data-chip="100"
              aria-label="Add 100 tokens"
              disabled={phase === 'play' || bank < 100}
              onClick={() => handleChipClick(100)}
            >
              <svg viewBox="0 0 100 100" style={{ color: '#C5A15A' }}>
                <use href="#chip-edge" />
              </svg>
              <span>100</span>
            </button>
            <div className="t-betval">
              Bet <strong id="tBetVal">{fmt(bet)}</strong>
            </div>
          </div>

          <div className="t-actions">
            <button
              className="btn btn-solid"
              id="bDeal"
              disabled={phase === 'play' || busy}
              onClick={handleDeal}
            >
              {bank === 0 && bet === 0 && phase !== 'play' ? 'Buy in again' : 'Deal'}
            </button>
            <button
              className="btn"
              id="bHit"
              disabled={!isPlaying}
              onClick={handleHit}
            >
              Hit
            </button>
            <button
              className="btn"
              id="bStand"
              disabled={!isPlaying}
              onClick={handleStand}
            >
              Stand
            </button>
            <button
              className="btn"
              id="bDouble"
              disabled={!canDouble}
              onClick={handleDouble}
            >
              Double
            </button>
            <button
              className="btn"
              id="bClear"
              disabled={phase === 'play' || bet === 0}
              onClick={handleClear}
            >
              Clear bet
            </button>
          </div>
          <p className="t-rule">
            Blackjack pays 3 to 2. The house stands on 17. Tokens have no cash value.
          </p>
        </div>
      </div>
    </section>
  );
}
