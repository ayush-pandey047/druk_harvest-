import { Link } from 'react-router-dom';

// District positions projected from real coordinates onto the outline below.
// x = 30 + (lon - 88.75) * 160.24, y = 20 + (28.33 - lat) * 153.37
export const DISTRICTS = {
  Haa: [115, 167], Paro: [136, 158], Thimphu: [173, 152], Punakha: [208, 133], 'Wangdue Phodrang': [214, 150], Tsirang: [250, 221], Trongsa: [310, 147], Bumthang: [350, 140], Mongar: [429, 183], Trashigang: [479, 173],
};

// Simplified national border traced from real lon/lat points, smoothed.
// pins whose labels sit below the dot, so neighbouring labels don't collide
const LABEL_BELOW = new Set(['Haa', 'Tsirang', 'Thimphu']);

const OUTLINE =
  'M38 209C35 196 23 168 30 155C37 142 66 142 78 132C90 122 91 104 102 94C113 83 131 80 142 71C153 62 154 48 166 40C178 32 200 26 214 25C229 23 242 27 254 32C266 37 272 51 286 55C301 59 325 54 342 55C360 57 375 58 391 63C407 68 421 81 439 86C456 91 475 90 495 94C515 97 546 97 559 109C571 120 571 142 570 163C569 183 565 217 551 232C537 246 513 248 487 252C460 255 420 254 391 255C361 256 332 256 310 258C289 259 281 262 262 262C244 262 220 260 198 258C177 255 156 250 134 247C113 244 85 245 70 242C55 240 51 237 46 232C41 226 41 221 38 209z';

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
        {[[150, 92], [240, 64], [352, 82], [452, 110]].map(([x, y], i) => (
          <path key={i} d={`M${x - 22} ${y + 20}l22-26 22 26z`} fill="#FFFDF7" stroke="#0F3B27" strokeWidth="1.6" strokeLinejoin="round" />
        ))}
        <path d="M170 140c-6 30 -22 62 -20 104M210 128c10 34 6 62 22 92 8 16 10 26 12 38M440 120c-20 40-60 70-96 92-20 12-30 26-34 44" stroke="#2440A6" strokeOpacity=".45" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {pins.map((p) => {
          const [x, y] = DISTRICTS[p.district] ?? [300, 150];
          const active = highlight === p.district;
          const pin = (
            <g className={`bt-map__pin${active ? ' is-active' : ''}`} style={{ '--x': `${x}px`, '--y': `${y}px` }}>
              <circle cx={x} cy={y} r="15" className="bt-map__pulse" />
              <circle cx={x} cy={y} r="8" fill={p.color ?? '#D7322A'} stroke="#FFFDF7" strokeWidth="3" />
              <text x={x} y={LABEL_BELOW.has(p.district) ? y + 30 : y - 16} textAnchor="middle">{p.label}</text>
            </g>
          );
          return p.to ? <Link key={p.label} to={p.to} aria-label={`${p.label}, ${p.district}`}>{pin}</Link> : <g key={p.label}>{pin}</g>;
        })}
      </svg>
      <figcaption>Decorative map, not to scale.</figcaption>
    </figure>
  );
}
