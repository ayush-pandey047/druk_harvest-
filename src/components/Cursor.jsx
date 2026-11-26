import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

/**
 * One pointer listener for the whole site:
 *  - a soft follower ring (the native cursor stays, for usability)
 *  - [data-magnetic] elements lean towards the pointer
 *  - [data-spotlight] elements get --sx/--sy for a glow that follows the pointer
 */
export default function Cursor() {
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return;
    document.documentElement.classList.add('has-cursor');

    const pos = { x: -100, y: -100 }, cur = { x: -100, y: -100 };
    let raf = 0, magnet = null, spot = null, idle = true;

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      idle = Math.abs(pos.x - cur.x) < 0.1 && Math.abs(pos.y - cur.y) < 0.1;
      raf = idle ? 0 : requestAnimationFrame(loop);
    };

    const release = (el) => { if (el) el.style.transform = ''; };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      pos.x = e.clientX; pos.y = e.clientY;
      if (cur.x < -50) { cur.x = pos.x; cur.y = pos.y; ring.current?.classList.remove('is-gone'); }
      if (!raf) raf = requestAnimationFrame(loop);

      const t = e.target instanceof Element ? e.target : null;
      const interactive = t?.closest('a, button, [role="tab"], label, select, input, textarea, summary');
      const hint = t?.closest('[data-cursor]')?.getAttribute('data-cursor');
      ring.current?.classList.toggle('is-hover', !!interactive || !!hint);
      ring.current?.classList.toggle('has-label', !!hint);
      if (label.current) label.current.textContent = hint ?? '';

      const m = t?.closest('[data-magnetic]');
      if (m !== magnet) { release(magnet); magnet = m; }
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        m.style.transform = `translate3d(${dx * 0.25}px, ${dy * 0.35}px, 0)`;
      }

      const s = t?.closest('[data-spotlight]');
      if (s) {
        const r = s.getBoundingClientRect();
        s.style.setProperty('--sx', `${e.clientX - r.left}px`);
        s.style.setProperty('--sy', `${e.clientY - r.top}px`);
        if (s !== spot) { spot?.classList.remove('is-lit'); s.classList.add('is-lit'); spot = s; }
      } else if (spot) { spot.classList.remove('is-lit'); spot = null; }
    };
    const onLeave = () => { ring.current?.classList.add('is-gone'); release(magnet); magnet = null; };
    const onEnter = () => ring.current?.classList.remove('is-gone');
    const onDown = () => ring.current?.classList.add('is-down');
    const onUp = () => ring.current?.classList.remove('is-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div className="cursor is-gone" ref={ring} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__label" ref={label} />
    </div>
  );
}
