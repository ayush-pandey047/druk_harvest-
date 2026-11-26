import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../illustrations/Logo.jsx';
import Icon from '../illustrations/Icon.jsx';
import PrayerFlags from '../illustrations/PrayerFlags.jsx';
import { useBasket } from '../hooks/useBasket.jsx';

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/our-story', label: 'Our Story' },
  { to: '/products', label: 'Products' },
  { to: '/farmers', label: 'Farmers' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { count, bump } = useBasket();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const panel = useRef(null);
  const toggle = useRef(null);
  const badge = useRef(null);
  const darkHero = /^\/(farmers|brand|our-story)/.test(pathname);

  // Solid background after a little scroll; slide away while scrolling down, back on scroll up
  useEffect(() => {
    let last = window.scrollY, raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 480 && y > last + 4);
        if (y < last - 4 || y < 480) setHidden(false);
        last = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!bump || !badge.current) return;
    badge.current.classList.remove('is-bumping');
    void badge.current.offsetWidth; // restart the keyframe
    badge.current.classList.add('is-bumping');
  }, [bump]);

  // Mobile menu: lock scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    const focusables = () => panel.current?.querySelectorAll('a, button') ?? [];
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (e.key !== 'Tab') return;
      const f = [...focusables()];
      const first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('is-locked'); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}${darkHero && !scrolled ? ' header--light' : ''}${hidden && !open ? ' is-hidden' : ''}`}>
        <div className="container header__inner">
          <Link to="/" className="header__logo" aria-label="Druk Harvest, home"><Logo /></Link>
          <nav className="header__nav" aria-label="Main">
            {NAV.slice(1, 6).map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className="header__link">{n.label}</NavLink>
            ))}
          </nav>
          <div className="header__actions">
            <Link to="/contact" className="btn btn--primary btn--sm header__cta" data-magnetic>
              <span>Make an Enquiry</span>
              <span ref={badge} className={`count${count ? '' : ' count--empty'}`} aria-label={`${count} items in your enquiry list`}>{count}</span>
            </Link>
            <button ref={toggle} className="header__menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="burger" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" ref={panel} className={`menu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
        <PrayerFlags count={9} className="menu__flags" />
        <nav aria-label="Mobile">
          <ol className="menu__list">
            {NAV.map((n, i) => (
              <li key={n.to} style={{ '--i': i }}>
                <NavLink to={n.to} end={n.end} className="menu__link">
                  <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>{n.label}
                </NavLink>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          <p className="dz" lang="dz">སྐུ་གཟུགས་བཟང་པོ་ལགས།</p>
          <p>Kuzuzangpo la. Call us on <a href="tel:+97517000000">+975 17 00 00 00</a></p>
        </div>
      </div>
    </>
  );
}
