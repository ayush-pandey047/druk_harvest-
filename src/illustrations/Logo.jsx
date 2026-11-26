/**
 * Mark: a bangchung (the woven bamboo food bowl carried between field and home)
 * holding three paddy stalks, with the morning sun rising behind them.
 *  - bangchung  = farm to table: how Bhutanese families have always carried their food
 *  - the weave  = many strands, one bowl: farmers, Druk Harvest and families held together
 *  - 3 stalks   = the farmer, us and you, growing from the same bowl
 *  - sun        = a new day's harvest, fresh every morning
 */
export function LogoMark({ size = 40, mono, reversed, title }) {
  const ink = mono ? 'currentColor' : null;
  const sun = ink ?? '#F6B31B';
  const stalk = ink ?? (reversed ? '#FFF6E3' : '#0F3B27');
  const leaf = ink ?? (reversed ? '#9BD77A' : '#2E8B3E');
  const bowl = ink ?? '#D7322A';
  const rim = ink ?? (reversed ? '#F6B31B' : '#0F3B27');
  const weave = mono ? 'var(--bg, #fff)' : '#FFF6E3';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d="M15 32a17 17 0 0 1 34 0z" fill={sun} opacity={mono ? 0.35 : 1} />
      <path d="M32 31V12.5M26.5 31c-.8-5.5-3.6-10-8.5-13M37.5 31c.8-5.5 3.6-10 8.5-13" stroke={stalk} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <ellipse cx="32" cy="10" rx="2.9" ry="5.4" fill={stalk} />
      <ellipse cx="16.6" cy="16" rx="2.6" ry="5" transform="rotate(-52 16.6 16)" fill={stalk} />
      <ellipse cx="47.4" cy="16" rx="2.6" ry="5" transform="rotate(52 47.4 16)" fill={stalk} />
      <path d="M30.5 31c-5.5-1.4-8.4-5.2-8.6-10.2 4.8.9 7.8 4.6 8.6 10.2zM33.5 31c5.5-1.4 8.4-5.2 8.6-10.2-4.8.9-7.8 4.6-8.6 10.2z" fill={leaf} />
      <path d="M9 35h46c0 12-10.3 21-23 21S9 47 9 35z" fill={bowl} />
      <path d="M13.5 42.5l4.6 4.6 4.6-4.6 4.6 4.6 4.6-4.6 4.6 4.6 4.6-4.6 4.6 4.6 4.6-4.6" stroke={weave} strokeWidth="2.3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <path d="M19 51.5h26" stroke={weave} strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
      <rect x="6" y="30" width="52" height="6.5" rx="3.25" fill={rim} />
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
