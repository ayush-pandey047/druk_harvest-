// Lungta flags in their traditional order: blue (sky), white (air), red (fire), green (water), yellow (earth)
const COLORS = ['#2440A6', '#FFFDF7', '#D7322A', '#2E8B3E', '#F6B31B'];

export default function PrayerFlags({ count = 15, sag = 26, className = '' }) {
  const w = count * 44;
  const y = (x) => 8 + sag * Math.sin((x / w) * Math.PI);
  return (
    <svg className={`flags ${className}`} viewBox={`0 0 ${w} ${sag + 60}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 8 Q ${w / 2} ${8 + sag * 2} ${w} 8`} stroke="#22190F" strokeOpacity=".5" strokeWidth="1.5" fill="none" />
      {Array.from({ length: count }, (_, i) => {
        const x = i * 44 + 8;
        return (
          <g key={i} className="flags__flag" style={{ '--i': i }} transform={`translate(${x} ${y(x + 14) - 1})`}>
            <path d="M0 0h28v34l-4-3-5 4-5-4-5 4-4-3-5 3z" fill={COLORS[i % 5]} stroke="rgba(34,25,15,.18)" />
            <path d="M6 9h16M6 15h16M6 21h12" stroke="rgba(34,25,15,.22)" strokeWidth="1.4" />
          </g>
        );
      })}
    </svg>
  );
}
