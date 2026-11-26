import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

const VB = '0 0 1440 900';
const COMMON = { viewBox: VB, preserveAspectRatio: 'xMidYMax slice', 'aria-hidden': true };

// Terrace bands, back to front. Each top edge is a gentle S-curve that follows the hill.
const TERRACE_COLORS = ['#B9C93A', '#F6B31B', '#7DB33A', '#F2C443', '#E89A12', '#5E9E36', '#F6B31B', '#3F8E36'];
function terraces() {
  return TERRACE_COLORS.map((fill, i) => {
    const y = 600 + i * 40;
    const a = 38 - i * 3;
    const d = `M-40 ${y} C 260 ${y - a}, 520 ${y + a * 0.8}, 760 ${y - a * 0.3} S 1200 ${y - a * 1.2}, 1480 ${y + a * 0.4} L1480 900 L-40 900Z`;
    const edge = `M-40 ${y} C 260 ${y - a}, 520 ${y + a * 0.8}, 760 ${y - a * 0.3} S 1200 ${y - a * 1.2}, 1480 ${y + a * 0.4}`;
    return (
      <g key={i}>
        <path d={d} fill={fill} />
        <path d={edge} fill="none" stroke="#6E4A0E" strokeOpacity=".38" strokeWidth="3" />
        <path d={edge} fill="none" stroke="#FFF6E3" strokeOpacity=".35" strokeWidth="1.2" transform="translate(0 6)" />
      </g>
    );
  });
}

function Dzong({ x, y, s = 1 }) {
  const win = (wx, wy) => <path key={`${wx}-${wy}`} d={`M${wx} ${wy}h10l-1.5 9h-7z`} fill="#22190F" />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 96 4 22h152l10 74z" fill="#FFF6E3" />
      <path d="M4 22h152l1.6 12H2.4z" fill="#9E1F1B" />
      <path d="M-10 24 10 10h140l20 14z" fill="#0F3B27" />
      <path d="M52 10 56-36h48l4 46z" fill="#FFFDF7" />
      <path d="M56-36h48l.8 10H55.2z" fill="#9E1F1B" />
      <path d="M44-34 80-58l36 24z" fill="#0F3B27" />
      <path d="M62-56 80-70l18 14z" fill="#0F3B27" />
      <rect x="77" y="-84" width="6" height="16" rx="2" fill="#F6B31B" />
      {[16, 40, 110, 134].map((wx) => win(wx, 46))}
      {[16, 40, 64, 86, 110, 134].map((wx) => win(wx, 68))}
      {[66, 84].map((wx) => win(wx, -18))}
    </g>
  );
}

const Cypress = ({ x, y, h = 90, c = '#0F3B27' }) => (
  <path d={`M${x} ${y - h} C ${x + 14} ${y - h * 0.6}, ${x + 16} ${y - 10}, ${x} ${y} C ${x - 16} ${y - 10}, ${x - 14} ${y - h * 0.6}, ${x} ${y - h}Z`} fill={c} />
);

const FLAG_COLORS = ['#2440A6', '#FFFDF7', '#D7322A', '#2E8B3E', '#F6B31B'];

export default function HeroScene() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const layers = [...el.querySelectorAll('[data-depth]')];
    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      el.classList.toggle('is-paused', !visible);
    });
    io.observe(el);
    // Pointer target and eased current position, so the scene drifts after the cursor rather than snapping
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const update = () => {
      raf = 0;
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      const y = Math.min(window.scrollY, 1000);
      for (const l of layers) {
        const d = +l.dataset.depth;
        const mx = cur.x * (d + 0.06) * -90;
        const my = cur.y * (d + 0.06) * -40;
        l.style.transform = `translate3d(${mx.toFixed(1)}px, ${(y * d + my).toFixed(1)}px, 0)`;
      }
      if (Math.abs(target.x - cur.x) > 0.001 || Math.abs(target.y - cur.y) > 0.001) raf = requestAnimationFrame(update);
    };
    const kick = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    const onPointer = (e) => {
      if (e.pointerType !== 'mouse') return;
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
      kick();
    };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('pointermove', onPointer);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-scene" ref={root} aria-hidden="true">
      <div className="hero-scene__sky" data-depth="0.45">
        <div className="hero-scene__sun" />
        <svg className="hero-scene__cloud hero-scene__cloud--a" viewBox="0 0 220 70">
          <path d="M10 56c0-14 14-22 28-16 4-18 26-26 40-12 8-16 34-16 42 2 14-8 32 0 32 16 16-2 28 8 28 20H10z" fill="#FFFDF7" />
          <path d="M60 40c6-6 16-6 20 2M128 34c6-8 18-6 22 4" stroke="#F6B31B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="hero-scene__cloud hero-scene__cloud--b" viewBox="0 0 220 70">
          <path d="M10 56c0-12 12-20 26-14 6-16 28-20 38-6 10-12 32-10 38 6 14-6 30 2 30 14H10z" fill="#FFFDF7" opacity=".9" />
        </svg>
      </div>

      <div className="hero-scene__layer" data-depth="0.32">
        <svg {...COMMON}>
          <path d="M0 470 120 392l80 40 130-150 90 80 100-50 120-118 120 130 100-60 120 90 100-120 120 110 120-50 120 70V900H0z" fill="#8FB0E8" />
          <path d="M0 520 160 440l110 50 160-120 140 100 120-60 150 90 140-110 160 120 150-70 150 60V900H0z" fill="#5F86D6" />
          {[[330, 282], [640, 164], [1080, 212]].map(([x, y]) => (
            <path key={x} d={`M${x} ${y}l-42 48 18-4 24 18 22-20 26 14z`} fill="#FFFDF7" />
          ))}
        </svg>
      </div>

      <div className="hero-scene__layer" data-depth="0.2">
        <svg {...COMMON}>
          <path d="M0 590C180 520 360 500 540 520s300-80 470-80c170 0 300 60 430 40V900H0z" fill="#0FA3A0" />
          <path d="M0 640c200-60 420-70 620-40s420-40 600-40c90 0 160 14 220 30V900H0z" fill="#0B7F74" />
          <Dzong x={600} y={392} s={0.92} />
          <Cypress x={570} y={476} h={70} />
          <Cypress x={776} y={474} h={84} />
          <Cypress x={796} y={478} h={58} c="#145C3E" />
          <path d="M540 486c40-8 100-6 160 0s120 6 160-2" stroke="#FFF6E3" strokeOpacity=".5" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="hero-scene__layer" data-depth="0.1">
        <svg {...COMMON}>{terraces()}</svg>
      </div>

      <div className="hero-scene__layer hero-scene__layer--front">
        <svg {...COMMON}>
          <path d="M820 900c80-110 260-170 620-180V900z" fill="#0F3B27" />
          <path d="M0 900c40-60 140-90 300-80 60 4 110 30 150 80z" fill="#145C3E" />
          <Cypress x={1300} y={760} h={190} />
          <Cypress x={1350} y={756} h={140} c="#145C3E" />
          <Cypress x={90} y={850} h={120} c="#0F3B27" />
          {/* Darchor: tall vertical prayer flag poles */}
          {[1180, 1230].map((x, k) => (
            <g key={x}>
              <rect x={x} y={540} width="5" height="220" fill="#FFF6E3" />
              <rect x={x + 5} y={548} width="30" height="150" fill={k ? '#F6B31B' : '#FFFDF7'} className="hero-scene__banner" />
            </g>
          ))}
          <path d="M880 680Q1040 740 1182 600" stroke="#22190F" strokeOpacity=".45" strokeWidth="2" fill="none" />
          {Array.from({ length: 11 }, (_, i) => {
            const t = (i + 0.5) / 11;
            const x = 880 + t * 302;
            const y = (1 - t) * (1 - t) * 680 + 2 * (1 - t) * t * 740 + t * t * 600;
            return (
              <rect key={i} className="flags__flag" style={{ '--i': i }} x={x - 10} y={y} width="20" height="26" fill={FLAG_COLORS[i % 5]} />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
