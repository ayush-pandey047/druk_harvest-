import { useId } from 'react';

// Deterministic pseudo-random so scatter patterns are identical on every render
const rand = (seed) => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };

const BG = {
  rice: '#F6B31B', buckwheat: '#0FA3A0', maize: '#2440A6', chilli: '#FF7A1A', 'chilli-dried': '#0FA3A0',
  asparagus: '#F6B31B', potato: '#2E8B3E', greens: '#D7322A', mushroom: '#0FA3A0', mandarin: '#2440A6',
  apple: '#0FA3A0', peach: '#2E8B3E', honey: '#D7322A', 'honey-dark': '#0F3B27', honeycomb: '#2440A6',
  datshi: '#D7322A', chugo: '#FF7A1A', 'ema-datshi': '#0FA3A0', 'rice-bowl': '#FF7A1A', khuli: '#2440A6',
  'kewa-datshi': '#F6B31B', 'story-bees': '#2E8B3E', 'story-season': '#D7322A',
};

const Bowl = ({ fill = '#2440A6', rim = '#FFF6E3', y = 100 }) => (
  <g>
    <ellipse cx="100" cy={y + 34} rx="48" ry="7" fill="#000" opacity=".15" />
    <path d={`M38 ${y}h124c0 26-26 36-62 36S38 ${y + 26} 38 ${y}z`} fill={fill} />
    <path d={`M38 ${y}h124`} stroke={rim} strokeWidth="5" strokeLinecap="round" />
    <path d={`M50 ${y + 12}c10 6 30 10 50 10s40-4 50-10`} stroke={rim} strokeWidth="2.5" fill="none" strokeDasharray="5 6" />
  </g>
);

const Chilli = ({ x, y, r = 0, c = '#3F9B3A', s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 0c4 30 14 54 34 70 4 3 8 0 6-4C28 50 22 26 16-2z" fill={c} />
    <path d="M4 6c4 20 10 36 22 52" stroke="#fff" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M2 0c2-6 10-8 14-2l-2 4z" fill="#1F5A26" />
    <path d="M9-3c0-6 2-10 6-13" stroke="#1F5A26" strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
);

const Jar = ({ honey = '#F6B31B', cloth = '#F6B31B', id }) => (
  <g>
    <ellipse cx="100" cy="140" rx="40" ry="6" fill="#000" opacity=".18" />
    <rect x="62" y="56" width="76" height="84" rx="16" fill={honey} />
    <rect x="62" y="56" width="76" height="84" rx="16" fill={`url(#${id}-shine)`} />
    <rect x="72" y="86" width="56" height="30" rx="4" fill="#FFF6E3" />
    <path d="M80 97h40M84 106h32" stroke="#22190F" strokeOpacity=".5" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60 46c10-10 70-10 80 0l4 14H56z" fill={cloth} />
    <path d="M58 54h84" stroke="#2440A6" strokeWidth="5" />
    <path d="M60 58c-4 6-6 12-2 18M140 58c4 6 6 12 2 18" stroke={cloth} strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>
);

function art(kind, id) {
  const r = rand(kind.length * 7 + 3);
  switch (kind) {
    case 'rice':
      return (
        <>
          <path d="M44 100c8-34 32-50 56-50s48 16 56 50z" fill="#8A2E22" />
          {Array.from({ length: 46 }, (_, i) => {
            const a = r() * Math.PI, d = r();
            const x = 100 + Math.cos(a) * 52 * d, y = 98 - Math.sin(a) * 44 * d;
            return <ellipse key={i} cx={x} cy={y} rx="4.2" ry="2" transform={`rotate(${r() * 180} ${x} ${y})`} fill={r() > 0.5 ? '#B4473A' : '#D8735E'} />;
          })}
          <Bowl />
        </>
      );
    case 'rice-bowl':
      return (
        <>
          <path d="M44 100c8-30 32-44 56-44s48 14 56 44z" fill="#9E3A2C" />
          {Array.from({ length: 30 }, (_, i) => {
            const x = 56 + r() * 50, y = 78 + r() * 20;
            return <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill="#D8735E" transform={`rotate(${r() * 180} ${x} ${y})`} />;
          })}
          <path d="M100 62c18-6 38 0 50 20-20 10-40 6-50-20z" fill="#3F9B3A" />
          <path d="M108 70c14 0 26 6 34 14" stroke="#1F5A26" strokeWidth="2" fill="none" />
          <path d="M112 80c10-14 26-16 36-10-6 12-22 18-36 10z" fill="#7CC253" />
          <circle cx="78" cy="72" r="5" fill="#D7322A" /><circle cx="90" cy="64" r="4" fill="#D7322A" />
          <Bowl fill="#FFF6E3" rim="#D7322A" />
        </>
      );
    case 'buckwheat':
      return (
        <>
          <ellipse cx="100" cy="142" rx="56" ry="7" fill="#000" opacity=".15" />
          <path d="M62 140c-8-30-4-62 10-76h56c14 14 18 46 10 76z" fill="#E9D3A4" />
          <path d="M66 64c10 6 58 6 68 0l-6-12H72z" fill="#D6BB84" />
          <path d="M72 60c8 3 48 3 56 0" stroke="#D7322A" strokeWidth="5" strokeLinecap="round" />
          <path d="M80 80v52M100 80v56M120 80v52" stroke="#C9AE76" strokeWidth="2" strokeDasharray="4 5" />
          {Array.from({ length: 14 }, (_, i) => {
            const x = 40 + r() * 120, y = 128 + r() * 16;
            return <path key={i} d={`M${x} ${y}l4-7 4 7z`} fill="#4A2E1A" transform={`rotate(${r() * 60 - 30} ${x} ${y})`} />;
          })}
          {[[150, 46], [160, 58], [146, 62], [156, 38]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#FFF0F3" stroke="#F2B6C6" />)}
          <path d="M152 70c2 20-2 40-10 60" stroke="#B84A6A" strokeWidth="3" fill="none" />
        </>
      );
    case 'maize':
      return (
        <>
          {[[-18, 78], [16, 112]].map(([rot, x], k) => (
            <g key={k} transform={`rotate(${rot} ${x} 92)`}>
              <ellipse cx={x} cy="92" rx="20" ry="52" fill="#F6C332" />
              {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${x - 18} ${50 + i * 10}h36`} stroke="#D99A0E" strokeWidth="2" />)}
              {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M${x - 12 + i * 8} 44v96`} stroke="#D99A0E" strokeWidth="1.5" />)}
              <path d={`M${x - 4} 140c-20-10-30-40-26-70 8 20 16 40 26 70zM${x + 4} 140c20-10 30-40 26-70-8 20-16 40-26 70z`} fill="#7DB33A" />
            </g>
          ))}
        </>
      );
    case 'chilli':
      return (
        <>
          <Chilli x={58} y={30} r={-14} />
          <Chilli x={86} y={26} r={4} c="#2E8B3E" />
          <Chilli x={112} y={34} r={-28} c="#56B04A" s={0.9} />
        </>
      );
    case 'chilli-dried':
      return (
        <>
          <path d="M40 30Q100 48 160 30" stroke="#22190F" strokeWidth="2.5" fill="none" />
          {Array.from({ length: 7 }, (_, i) => (
            <Chilli key={i} x={44 + i * 17} y={36 + Math.sin((i / 6) * Math.PI) * 9} r={-6 + i * 2} s={0.82} c={i % 2 ? '#B3211B' : '#D7322A'} />
          ))}
        </>
      );
    case 'asparagus':
      return (
        <>
          <ellipse cx="100" cy="144" rx="44" ry="6" fill="#000" opacity=".15" />
          {Array.from({ length: 7 }, (_, i) => {
            const x = 72 + i * 9;
            return (
              <g key={i} transform={`rotate(${(i - 3) * 3} ${x} 140)`}>
                <rect x={x - 4} y="34" width="8" height="106" rx="4" fill={i % 2 ? '#5DA544' : '#3F8E36'} />
                <path d={`M${x - 5} 40l5-10 5 10zM${x - 4} 60l-3 4M${x + 4} 76l3 4`} fill="#7A4A6A" stroke="#7A4A6A" strokeWidth="2" />
              </g>
            );
          })}
          <rect x="66" y="104" width="68" height="10" rx="3" fill="#D7322A" />
        </>
      );
    case 'potato':
      return (
        <>
          <ellipse cx="100" cy="140" rx="62" ry="7" fill="#000" opacity=".15" />
          {[[72, 112, 30, 22, -10], [124, 108, 32, 24, 12], [98, 80, 28, 20, -4]].map(([x, y, rx, ry, rot], i) => (
            <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={i === 2 ? '#E2B27A' : '#D49E62'} />
              <ellipse cx={x - 8} cy={y - 8} rx={rx * 0.4} ry={ry * 0.25} fill="#fff" opacity=".22" />
              {[[-10, 4], [8, -4], [12, 8]].map(([dx, dy], j) => <circle key={j} cx={x + dx} cy={y + dy} r="2" fill="#8A5A2E" />)}
            </g>
          ))}
        </>
      );
    case 'greens':
      return (
        <>
          {[[-30, '#3F9B3A'], [-10, '#56B04A'], [12, '#2E8B3E'], [32, '#7CC253']].map(([rot, c], i) => (
            <g key={i} transform={`rotate(${rot} 100 140)`}>
              <path d="M100 140C70 110 70 60 100 26c30 34 30 84 0 114z" fill={c} />
              <path d="M100 136V36M100 70l-14-10M100 90l14-10M100 110l-12-8" stroke="#E9F5D8" strokeOpacity=".7" strokeWidth="2" fill="none" />
            </g>
          ))}
          <rect x="88" y="128" width="24" height="18" rx="4" fill="#F6B31B" />
        </>
      );
    case 'mushroom':
      return (
        <>
          <ellipse cx="100" cy="144" rx="56" ry="6" fill="#000" opacity=".15" />
          {[[78, 0.95, -8], [124, 0.8, 10]].map(([x, s, rot], i) => (
            <g key={i} transform={`translate(${x} 144) rotate(${rot}) scale(${s})`}>
              <path d="M-14 0c-2-30 0-56 4-70h20c4 14 6 40 4 70z" fill="#F4E8D2" />
              <path d="M-40-64c4-30 24-44 40-44s36 14 40 44c-24 8-56 8-80 0z" fill="#8A5A34" />
              <path d="M-30-80c6-10 14-16 24-18" stroke="#fff" strokeOpacity=".3" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          ))}
          <path d="M40 144c10-8 20-8 30 0M140 144c8-6 18-6 26 0" stroke="#0F3B27" strokeWidth="3" fill="none" />
        </>
      );
    case 'mandarin':
      return (
        <>
          <ellipse cx="100" cy="142" rx="60" ry="7" fill="#000" opacity=".15" />
          {[[70, 108, 30], [128, 110, 28], [100, 78, 30]].map(([x, y, rr], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={rr} fill={i === 2 ? '#FF8A1F' : '#FF7A1A'} />
              <circle cx={x - rr * 0.35} cy={y - rr * 0.35} r={rr * 0.25} fill="#fff" opacity=".25" />
              <circle cx={x} cy={y - rr + 3} r="2.5" fill="#6E4A0E" />
            </g>
          ))}
          <path d="M100 50c10-14 28-16 38-10-8 12-24 16-38 10z" fill="#2E8B3E" />
          <path d="M100 50c-6-12-20-16-30-12 6 12 18 16 30 12z" fill="#56B04A" />
        </>
      );
    case 'apple':
      return (
        <>
          <ellipse cx="100" cy="142" rx="56" ry="7" fill="#000" opacity=".15" />
          {[[76, 108, 0.85], [124, 104, 1]].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <path d="M0-24c-10-8-38-8-38 18 0 26 18 42 30 42 4 0 6-2 8-2s4 2 8 2c12 0 30-16 30-42 0-26-28-26-38-18z" fill={i ? '#D7322A' : '#E8452E'} />
              <path d="M-24-6c0-10 6-16 14-16" stroke="#fff" strokeOpacity=".35" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M0-24c0-8 2-14 6-18" stroke="#4A2E1A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M4-36c8-8 20-8 26-2-8 8-18 8-26 2z" fill="#3F9B3A" />
            </g>
          ))}
        </>
      );
    case 'peach':
      return (
        <>
          <ellipse cx="100" cy="142" rx="50" ry="7" fill="#000" opacity=".15" />
          <circle cx="100" cy="96" r="44" fill={`url(#${id}-peach)`} />
          <path d="M100 54c-10 20-10 64 0 84" stroke="#D7322A" strokeOpacity=".35" strokeWidth="3" fill="none" />
          <path d="M102 54c6-14 24-18 36-10-10 12-24 14-36 10z" fill="#3F9B3A" />
        </>
      );
    case 'honey':
      return <Jar id={id} />;
    case 'honey-dark':
      return <Jar id={id} honey="#B8651A" cloth="#D7322A" />;
    case 'honeycomb':
      return (
        <>
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 5 - (row % 2) }, (_, col) => {
              const x = 52 + col * 24 + (row % 2) * 12, y = 50 + row * 21;
              return <path key={`${row}-${col}`} d={`M${x} ${y - 12}l10.4 6v12L${x} ${y + 12}l-10.4-6v-12z`} fill={r() > 0.25 ? '#F6B31B' : '#FFD45E'} stroke="#B8651A" strokeWidth="2" />;
            })
          )}
          <path d="M90 128c0 8 4 14 4 18" stroke="#F6B31B" strokeWidth="6" strokeLinecap="round" />
        </>
      );
    case 'datshi':
      return (
        <>
          <path d="M30 128C50 96 150 96 170 128c-30 16-110 16-140 0z" fill="#3F9B3A" />
          <path d="M34 126c40-10 92-10 132 0" stroke="#1F5A26" strokeWidth="2" fill="none" />
          {[[76, 108], [124, 108], [100, 92], [100, 116]].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y + 4} rx="26" ry="10" fill="#E9DCC0" />
              <ellipse cx={x} cy={y} rx="26" ry="10" fill="#FFFBF0" />
              <circle cx={x - 6} cy={y - 2} r="1.6" fill="#E3D3AF" /><circle cx={x + 8} cy={y + 1} r="1.4" fill="#E3D3AF" />
            </g>
          ))}
        </>
      );
    case 'chugo':
      return (
        <>
          <path d="M50 26c20 40 20 90 50 112 30-22 30-72 50-112" stroke="#22190F" strokeWidth="2.5" fill="none" />
          {Array.from({ length: 10 }, (_, i) => {
            const t = (i + 0.5) / 10;
            const side = t < 0.5;
            const tt = side ? t * 2 : (1 - t) * 2;
            const x = side ? 50 + tt * 50 - 6 * tt : 150 - tt * 50 + 6 * tt;
            const y = 30 + tt * 104;
            return <rect key={i} x={x - 8} y={y - 8} width="16" height="16" rx="2" fill="#FFF6E3" stroke="#D9C49A" strokeWidth="2" transform={`rotate(${r() * 30 - 15} ${x} ${y})`} />;
          })}
        </>
      );
    case 'ema-datshi':
      return (
        <>
          <ellipse cx="100" cy="88" rx="70" ry="56" fill="#7A4A2A" />
          <ellipse cx="100" cy="84" rx="62" ry="48" fill="#F6E2A6" />
          {Array.from({ length: 9 }, (_, i) => {
            const x = 60 + r() * 80, y = 60 + r() * 48;
            return <path key={i} d={`M${x} ${y}c6 8 16 12 28 12`} stroke={i % 3 ? '#3F9B3A' : '#2E8B3E'} strokeWidth="7" fill="none" strokeLinecap="round" transform={`rotate(${r() * 140} ${x + 14} ${y + 6})`} />;
          })}
          {[[70, 70], [128, 92], [110, 62]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#D7322A" />)}
          <path d="M42 120c30 18 86 18 116 0" stroke="#4A2E1A" strokeWidth="3" fill="none" />
        </>
      );
    case 'kewa-datshi':
      return (
        <>
          <ellipse cx="100" cy="88" rx="70" ry="56" fill="#2440A6" />
          <ellipse cx="100" cy="84" rx="62" ry="48" fill="#F8E7B4" />
          {Array.from({ length: 8 }, (_, i) => {
            const x = 64 + r() * 72, y = 64 + r() * 40;
            return <ellipse key={i} cx={x} cy={y} rx="14" ry="10" fill="#E8C27E" stroke="#C99A52" strokeWidth="2" />;
          })}
          {[[84, 80], [118, 72]].map(([x, y], i) => <path key={i} d={`M${x} ${y}c4 8 10 10 18 10`} stroke="#B3211B" strokeWidth="5" fill="none" strokeLinecap="round" />)}
        </>
      );
    case 'khuli':
      return (
        <>
          <ellipse cx="100" cy="138" rx="66" ry="9" fill="#000" opacity=".16" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx="100" cy={128 - i * 12} rx={58 - i} ry="14" fill={i % 2 ? '#6E4A34' : '#7E563C'} stroke="#4A2E1A" strokeWidth="1.5" />
          ))}
          <path d="M60 76c10 8 26 6 40 6s32 0 42-6c-2 14-8 22-6 36M70 78c0 10-4 20-2 28" stroke="#F6B31B" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="100" cy="76" rx="40" ry="8" fill="#F6B31B" />
        </>
      );
    case 'story-bees':
      return (
        <>
          <rect x="48" y="70" width="104" height="68" rx="4" fill="#F6B31B" />
          <rect x="48" y="92" width="104" height="4" fill="#B8651A" /><rect x="48" y="114" width="104" height="4" fill="#B8651A" />
          <path d="M40 72 100 40l60 32z" fill="#D7322A" />
          <rect x="88" y="128" width="24" height="6" rx="2" fill="#22190F" />
          {Array.from({ length: 7 }, (_, i) => {
            const x = 30 + r() * 140, y = 22 + r() * 40;
            return (
              <g key={i} className="bee" style={{ '--i': i }}>
                <ellipse cx={x} cy={y} rx="6" ry="4" fill="#22190F" />
                <path d={`M${x - 2} ${y - 4}v8M${x + 2} ${y - 4}v8`} stroke="#F6B31B" strokeWidth="1.6" />
                <ellipse cx={x} cy={y - 6} rx="4" ry="3" fill="#fff" opacity=".8" />
              </g>
            );
          })}
        </>
      );
    case 'story-season':
      return (
        <>
          <circle cx="70" cy="104" r="30" fill="#FF7A1A" />
          <path d="M70 74c8-10 22-12 28-6-6 10-18 12-28 6z" fill="#2E8B3E" />
          <g transform="translate(128 100)">
            <path d="M0-24c-10-8-34-8-34 16 0 24 16 38 26 38 4 0 6-2 8-2s4 2 8 2c10 0 26-14 26-38 0-24-24-24-34-16z" fill="#FFF6E3" />
          </g>
          <path d="M98 140c-4-40 0-80 6-110M104 30c-8 10-16 12-22 10M104 44c8 8 16 10 22 6M102 60c-8 8-16 10-22 6M102 76c8 8 16 10 22 6" stroke="#F6B31B" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      );
    default:
      return null;
  }
}

export default function ProductArt({ kind, label, className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`p-art ${className}`} viewBox="0 0 200 160" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={{ '--art-bg': BG[kind] ?? '#2E8B3E' }}>
      <defs>
        <linearGradient id={`${id}-shine`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-peach`} cx=".35" cy=".35">
          <stop offset="0" stopColor="#FFC27A" /><stop offset=".7" stopColor="#FF8A4A" /><stop offset="1" stopColor="#E8452E" />
        </radialGradient>
      </defs>
      <rect width="200" height="160" fill="var(--art-bg)" />
      <circle cx="100" cy="88" r="70" fill="#fff" opacity=".12" />
      <circle cx="100" cy="88" r="52" fill="#fff" opacity=".08" />
      <g className="p-art__subject">{art(kind, id)}</g>
    </svg>
  );
}
