import { useId } from 'react';

/** Illustrated, non-photographic portrait of an illustrative farmer in gho or kira. */
export default function Portrait({ farmer, className = '' }) {
  const id = useId().replace(/:/g, '');
  const [main, accent, third] = farmer.palette;
  const elder = /^(Aum|Ap) /.test(farmer.name);
  const hair = elder ? '#4B423A' : '#1C140E';
  const kira = farmer.dress === 'kira';

  return (
    <svg className={`portrait ${className}`} viewBox="0 0 240 300" role="img" aria-label={`Illustrated portrait of ${farmer.name} (illustrative)`}>
      <defs>
        <pattern id={`${id}-weave`} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill={kira ? third : main} />
          <rect y="0" width="16" height="4" fill={accent} />
          <rect y="9" width="16" height="2" fill={kira ? main : third} />
          <path d="M4 12 8 8l4 4-4 4z" fill={kira ? '#2440A6' : accent} opacity=".85" />
        </pattern>
        <pattern id={`${id}-check`} width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill={main} />
          <path d="M0 4h20M0 14h20" stroke={accent} strokeWidth="3" />
          <path d="M6 0v20M16 0v20" stroke="#22190F" strokeOpacity=".28" strokeWidth="2" />
        </pattern>
        <clipPath id={`${id}-arch`}>
          <path d="M12 300V112C12 52 60 12 120 12s108 40 108 100v188z" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-arch)`}>
        <rect width="240" height="300" fill={accent} />
        <circle cx="178" cy="78" r="34" fill="#FFF6E3" opacity=".5" />
        <path d="M0 196 60 136l40 34 50-56 90 86v100H0z" fill="#FFF6E3" opacity=".28" />
        <path d="M0 230c60-24 160-24 240 0v70H0z" fill="#0F3B27" opacity=".22" />
        <path d="M0 250c70-18 170-18 240 0" stroke="#0F3B27" strokeOpacity=".25" strokeWidth="3" fill="none" />

        {/* body */}
        {kira ? (
          <g>
            <path d="M30 300c4-50 30-82 90-86 60 4 86 36 90 86z" fill={`url(#${id}-weave)`} />
            <path d="M30 300c4-50 30-82 90-86 60 4 86 36 90 86h-42c-4-30-20-56-48-58-28 2-44 28-48 58z" fill={main} />
            <path d="M96 214l24 48 24-48c-8-3-16-4-24-4s-16 1-24 4z" fill="#FFFDF7" />
            <path d="M104 214l16 34 16-34" fill={`url(#${id}-weave)`} />
            <circle cx="78" cy="232" r="6" fill="#E3E0D6" stroke="#9A968A" strokeWidth="1.5" />
            <circle cx="162" cy="232" r="6" fill="#E3E0D6" stroke="#9A968A" strokeWidth="1.5" />
          </g>
        ) : (
          <g>
            <path d="M28 300c4-52 32-82 92-86 60 4 88 34 92 86z" fill={`url(#${id}-check)`} />
            <path d="M120 214 74 300M84 222l52 78" stroke="#22190F" strokeOpacity=".22" strokeWidth="3" />
            <path d="M88 214 120 266l32-52c-6-2-10-3-14-3l-18 30-18-30c-4 0-8 1-14 3z" fill="#FFFDF7" />
          </g>
        )}

        {/* neck and head */}
        <path d="M104 186h32v30c-6 6-26 6-32 0z" fill={farmer.skin} />
        <path d="M104 200c10 6 22 6 32 0" stroke="#000" strokeOpacity=".12" strokeWidth="6" />
        {!kira && <ellipse cx="78" cy="148" rx="8" ry="12" fill={farmer.skin} />}
        {!kira && <ellipse cx="162" cy="148" rx="8" ry="12" fill={farmer.skin} />}
        <ellipse cx="120" cy="142" rx="42" ry="52" fill={farmer.skin} />

        {kira ? (
          <g>
            <path d="M72 176c-12-66 8-108 48-108s62 42 48 108c-6-4-8-10-8-18l-2-38c-16-2-40-10-54-26-10 12-20 24-24 44l-2 20c0 8-2 14-6 18z" fill={hair} />
            <circle cx="77" cy="164" r="4.5" fill={accent} stroke="#22190F" strokeWidth="1.2" />
            <circle cx="163" cy="164" r="4.5" fill={accent} stroke="#22190F" strokeWidth="1.2" />
          </g>
        ) : (
          <path d="M80 134c-2-36 16-52 40-52 26 0 42 16 40 52-4-12-8-20-14-24-12 4-40 4-54 0-6 4-10 12-12 24z" fill={hair} />
        )}

        <path d="M98 134c4-3 10-3 14 0M128 134c4-3 10-3 14 0" stroke="#22190F" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="105" cy="146" rx="3.6" ry="4" fill="#22190F" />
        <ellipse cx="135" cy="146" rx="3.6" ry="4" fill="#22190F" />
        <path d="M120 150c-2 8-4 12 0 14" stroke="#000" strokeOpacity=".22" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M108 172c8 6 16 6 24 0" stroke="#5A2418" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="96" cy="164" r="7" fill="#D7322A" opacity=".18" />
        <circle cx="144" cy="164" r="7" fill="#D7322A" opacity=".18" />
        {elder && <path d="M94 156c3 2 6 2 8 0M138 156c3 2 6 2 8 0" stroke="#000" strokeOpacity=".2" strokeWidth="1.6" fill="none" />}
      </g>
      <path d="M12 300V112C12 52 60 12 120 12s108 40 108 100v188" fill="none" stroke="#22190F" strokeWidth="3" />
    </svg>
  );
}
