import { useId } from 'react';

/**
 * Mark: the letter D, for Druk.
 *  - its straight side is a paddy stalk heavy with grain: farmers are the backbone that hold us up
 *  - its bowl holds the land: snow peak, morning sun and terraced paddies, because everything we sell grows inside Bhutan
 *  - a letter, not the dragon itself: the druk belongs to the nation and its emblem
 */
export function LogoMark({ size = 40, mono, reversed, title }) {
  const id = useId().replace(/:/g, '');
  const line = mono ? 'currentColor' : reversed ? '#FFF6E3' : '#0F3B27';
  const grain = mono ? 'currentColor' : '#F6B31B';
  const bowl = 'M24 8h8c15 0 26 10.5 26 24S47 56 32 56h-8z';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs><clipPath id={`${id}-d`}><path d={bowl} /></clipPath></defs>
      <g clipPath={`url(#${id}-d)`}>
        {mono ? (
          <>
            <path d="M22 41 34 24l5 6 6-8 15 19z" fill="currentColor" opacity=".35" />
            <circle cx="45" cy="19" r="4.5" fill="currentColor" opacity=".35" />
            <path d="M22 45c13-3.4 25-3.4 38 0M22 51c13-3.4 25-3.4 38 0" stroke="currentColor" strokeWidth="2.6" fill="none" />
          </>
        ) : (
          <>
            <rect x="20" y="4" width="44" height="56" fill="#FFE3A0" />
            <circle cx="45" cy="19" r="5.5" fill="#F6B31B" />
            <path d="M22 41 34 24l5 6 6-8 15 19z" fill="#2440A6" />
            <path d="M34 24l-3.4 4.6 2.8-.6 2.2 2 2.4-1.6zM45 22l-2.8 3.8 2.4-.3 2 1.4 2-1.4z" fill="#FFFDF7" />
            {/* terraced paddies: four shades of green, lightest at the top of the hill */}
            {[['#9BD45A', 40], ['#5DB045', 45], ['#2E8B3E', 50], ['#1B6B34', 55]].map(([c, y]) => (
              <g key={y}>
                <path d={`M20 ${y}c14-3.6 30-3.6 44 0v${60 - y}H20z`} fill={c} />
                <path d={`M20 ${y}c14-3.6 30-3.6 44 0`} stroke="#E8F7C8" strokeOpacity=".55" strokeWidth=".9" fill="none" />
              </g>
            ))}
          </>
        )}
      </g>
      <path d="M24 8h8c15 0 26 10.5 26 24S47 56 32 56h-8" fill="none" stroke={line} strokeWidth="5" strokeLinejoin="round" />
      <path d="M24 62V6" stroke={line} strokeWidth="5" strokeLinecap="round" />
      {[[17.6, 7.5, -38], [17, 15.5, -38], [17.6, 23.5, -38], [24, 4.6, 0]].map(([cx, cy, r], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="2.7" ry="4.4" transform={`rotate(${r} ${cx} ${cy})`} fill={grain} stroke={mono ? 'none' : line} strokeWidth="1.3" />
      ))}
    </svg>
  );
}

export default function Logo({ reversed, size = 38 }) {
  return (
    <span className={`logo${reversed ? ' logo--reversed' : ''}`}>
      <LogoMark size={size} reversed={reversed} />
      <span className="logo__word">
        Druk <span>Harvest</span>
      </span>
    </span>
  );
}
