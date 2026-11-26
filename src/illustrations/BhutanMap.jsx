import { Link } from 'react-router-dom';

// Approximate district positions on a decorative outline (not to scale)
export const DISTRICTS = {
  Haa: [78, 168], Paro: [118, 150], Thimphu: [160, 128], Punakha: [200, 104], 'Wangdue Phodrang': [210, 150],
  Tsirang: [226, 214], Trongsa: [290, 140], Bumthang: [344, 104], Mongar: [440, 138], Trashigang: [512, 150],
};

const OUTLINE =
  'M34 176c-6-24 14-46 36-58 18-10 30-26 50-30 20-4 30 6 46-6 16-12 26-30 46-34 18-4 30 12 48 6 18-6 28-24 48-26 22-2 34 14 54 12 22-2 36-16 58-10 20 6 28 26 50 28 20 2 38-8 56 6 16 12 14 36 24 52 10 18 30 28 26 48-4 22-30 26-50 30-24 4-44 0-66 6-24 6-40 18-64 16-22-2-36-14-58-12-22 2-36 16-60 14-24-2-34-18-56-18-22 0-36 14-58 10-22-4-30-24-50-30-18-6-34-4-40-20z';

export default function BhutanMap({ pins = [], highlight, className = '' }) {
  return (
    <figure className={`bt-map ${className}`}>
      <svg viewBox="0 0 600 290" role="img" aria-label="Decorative map of Bhutan marking the valleys our farmers come from">
        <defs>
          <pattern id="bt-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <path d="M0 0v10" stroke="#0F3B27" strokeOpacity=".09" strokeWidth="4" />
          </pattern>
        </defs>
        <path d={OUTLINE} fill="#BFE0A0" stroke="#0F3B27" strokeWidth="2.5" strokeLinejoin="round" />
        <path d={OUTLINE} fill="url(#bt-hatch)" />
        {/* the northern peaks */}
        {[[150, 70], [250, 56], [372, 50], [470, 70]].map(([x, y], i) => (
          <path key={i} d={`M${x - 22} ${y + 20}l22-26 22 26z`} fill="#FFFDF7" stroke="#0F3B27" strokeWidth="1.6" strokeLinejoin="round" />
        ))}
        <path d="M120 190c40 10 70 30 110 26M300 182c30-8 60 10 96 2" stroke="#2440A6" strokeOpacity=".45" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {pins.map((p) => {
          const [x, y] = DISTRICTS[p.district] ?? [300, 150];
          const active = highlight === p.district;
          const pin = (
            <g className={`bt-map__pin${active ? ' is-active' : ''}`} style={{ '--x': `${x}px`, '--y': `${y}px` }}>
              <circle cx={x} cy={y} r="15" className="bt-map__pulse" />
              <circle cx={x} cy={y} r="8" fill={p.color ?? '#D7322A'} stroke="#FFFDF7" strokeWidth="3" />
              <text x={x} y={p.district === 'Haa' || p.district === 'Tsirang' ? y + 30 : y - 16} textAnchor="middle">{p.label}</text>
            </g>
          );
          return p.to ? <Link key={p.label} to={p.to} aria-label={`${p.label}, ${p.district}`}>{pin}</Link> : <g key={p.label}>{pin}</g>;
        })}
      </svg>
      <figcaption>Decorative map, not to scale.</figcaption>
    </figure>
  );
}
