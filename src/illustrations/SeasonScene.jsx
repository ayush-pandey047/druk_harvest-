const STAGES = {
  prepare: { sky: ['#FFD88A', '#FFF1D0'], bands: ['#B5713A', '#C98A4B', '#A3622F', '#D69C5C', '#94552A'] },
  plant: { sky: ['#9FD8EA', '#E4F5F8'], bands: ['#8CC7DD', '#B8E0EC', '#7DBBD3', '#A9D8E6', '#6FAFC8'] },
  tend: { sky: ['#BFE6A8', '#F0F9E4'], bands: ['#5DB045', '#3F9B3A', '#7CC253', '#2E8B3E', '#56A842'] },
  harvest: { sky: ['#FFB547', '#FFE3A6'], bands: ['#F6B31B', '#F2C443', '#E89A12', '#F6C332', '#D88A0E'] },
};

const Farmhouse = () => (
  <g transform="translate(430 150)"><g className="ss-house">
    <path d="M0 70V20h90v50z" fill="#FFF6E3" />
    <path d="M0 20h90v18H0z" fill="#9E1F1B" />
    <path d="M10 26h14v8H10zM38 26h14v8H38zM66 26h14v8H66z" fill="#F6B31B" />
    <path d="M-12 22 8 2h74l20 20z" fill="#3A2A1C" />
    <path d="M14 46h12l-1.6 12h-8.8zM60 46h12l-1.6 12h-8.8z" fill="#22190F" />
    <path d="M0 70h90" stroke="#22190F" strokeOpacity=".2" strokeWidth="3" />
  </g></g>
);

function details(stage, y) {
  const d = (i, el) => <g key={i} className="ss-pop" style={{ '--i': i }}>{el}</g>;
  if (stage === 'prepare') return Array.from({ length: 10 }, (_, i) => d(i, <path d={`M${40 + i * 52} ${y + 6}l26 10`} stroke="#6E3F1C" strokeWidth="3" strokeLinecap="round" />));
  if (stage === 'plant') return Array.from({ length: 14 }, (_, i) => d(i, <path d={`M${24 + i * 40} ${y + 14}l-4-10M${24 + i * 40} ${y + 14}l4-10`} stroke="#2E8B3E" strokeWidth="3" strokeLinecap="round" />));
  if (stage === 'tend') return Array.from({ length: 12 }, (_, i) => d(i, <g className="ss-sway"><path d={`M${30 + i * 48} ${y + 14}c-6-10-4-20 0-26 4 6 6 16 0 26z`} fill="#1F6B2E" /><path d={`M${30 + i * 48} ${y + 14}c-12-6-14-14-12-20 8 2 12 10 12 20zM${30 + i * 48} ${y + 14}c12-6 14-14 12-20-8 2-12 10-12 20z`} fill="#2E8B3E" /></g>));
  return Array.from({ length: 7 }, (_, i) => d(i,
    <g transform={`translate(${50 + i * 80} ${y - 6})`}>
      <path d="M-10 26 0-4l10 30z" fill="#C98A0E" />
      <path d="M-6 8h12" stroke="#7A4A0E" strokeWidth="3" />
    </g>
  ));
}

export default function SeasonScene({ stage, className = '' }) {
  const { sky, bands } = STAGES[stage];
  return (
    <svg className={`season-scene ${className}`} viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${stage}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} /><stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="600" height="420" fill={`url(#sky-${stage})`} />
      <circle className="ss-sun" cx="120" cy="90" r="38" fill={stage === 'plant' ? '#FFFDF7' : '#FF9B2F'} opacity=".9" />
      {stage === 'plant' && Array.from({ length: 18 }, (_, i) => <path key={i} className="ss-rain" style={{ '--i': i }} d={`M${20 + i * 33} ${10 + (i % 3) * 16}l-8 26`} stroke="#2440A6" strokeOpacity=".4" strokeWidth="2.5" strokeLinecap="round" />)}
      {stage === 'harvest' && [0, 1, 2].map((i) => <path key={i} className="ss-bird" style={{ '--i': i }} d={`M${300 + i * 34} ${70 + i * 12}q8-8 14 0q6-8 14 0`} stroke="#22190F" strokeWidth="2.5" fill="none" strokeLinecap="round" />)}
      <path d="M0 210 90 140l70 40 90-90 80 70 70-40 90 60 110-50v290H0z" fill="#5F86D6" opacity=".8" />
      <path d="M0 230c120-30 240-40 360-20s180 0 240-10v220H0z" fill="#0B7F74" />
      <Farmhouse />
      {bands.map((fill, i) => {
        const y = 250 + i * 34;
        return (
          <g key={i} className="ss-band" style={{ '--i': i }}>
            <path d={`M-20 ${y}C140 ${y - 20} 300 ${y + 18} 620 ${y - 8}V420H-20z`} fill={fill} />
            <path d={`M-20 ${y}C140 ${y - 20} 300 ${y + 18} 620 ${y - 8}`} stroke="#22190F" strokeOpacity=".22" strokeWidth="2.5" fill="none" />
            {i % 2 === 1 && details(stage, y)}
          </g>
        );
      })}
    </svg>
  );
}
