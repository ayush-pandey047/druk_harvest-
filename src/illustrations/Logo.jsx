/**
 * Mark: a leaf whose body is a terraced hillside, with the morning sun at its tip.
 * Terraces = the farms; leaf = growth and freshness; sun = a new day's harvest.
 */
export function LogoMark({ size = 40, mono, reversed, title }) {
  const leaf = mono ? 'currentColor' : reversed ? '#FFF6E3' : '#2E8B3E';
  const lines = mono ? 'var(--bg, #fff)' : reversed ? '#0F3B27' : '#FFF6E3';
  const sun = mono ? 'currentColor' : '#F6B31B';
  const band = mono ? 'currentColor' : reversed ? '#F6B31B' : '#D7322A';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d="M32 6C16 17 9 31 12 45c2.4 9.6 11 13 20 13s17.6-3.4 20-13C55 31 48 17 32 6z" fill={leaf} />
      <path d="M14.5 44.5c11-4.6 24-4.6 35 0" stroke={band} strokeWidth="4.4" fill="none" strokeLinecap="round" />
      <path d="M14 35.5c11.5-4.4 24.5-4.4 36 0M18 27c9.4-3.4 18.6-3.4 28 0" stroke={lines} strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M32 58V40" stroke={lines} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="32" cy="17" r="4.6" fill={sun} />
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
