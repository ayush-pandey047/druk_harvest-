import { useEffect } from 'react';
import { prefersReducedMotion } from './useReducedMotion.js';

/** 3D tilt + moving sheen. Writes --rx, --ry (deg) and --gx, --gy (%) on the element. */
export default function useTilt(ref, max = 8) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0, e0 = null;
    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const px = (e0.clientX - r.left) / r.width, py = (e0.clientY - r.top) / r.height;
      el.style.setProperty('--rx', `${((0.5 - py) * max).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${((px - 0.5) * max).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
    };
    const move = (e) => { e0 = e; if (!raf) raf = requestAnimationFrame(apply); };
    const enter = () => el.classList.add('is-tilting');
    const leave = () => {
      cancelAnimationFrame(raf); raf = 0;
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [ref, max]);
}
