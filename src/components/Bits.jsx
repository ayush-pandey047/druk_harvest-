import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { MONTHS, currentMonth, seasonStatus } from '../lib/season.js';

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>
            {it.to && i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHead({ kicker, title, children, align = 'left', className = '' }) {
  return (
    <Reveal className={`section-head section-head--${align} ${className}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {children && <p className="section-head__lede">{children}</p>}
    </Reveal>
  );
}

export function SeasonBadge({ product }) {
  const s = seasonStatus(product);
  if (s === 'in') return <span className="badge badge--in">In season</span>;
  if (s === 'soon') return <span className="badge badge--soon">Coming soon</span>;
  return <span className="badge badge--out">Out of season</span>;
}

export function SeasonBar({ months, animate = true }) {
  const now = currentMonth();
  return (
    <div className={`season-bar${animate ? ' season-bar--animate' : ''}`} role="img" aria-label={`Available in ${months.map((m) => MONTHS[m - 1]).join(', ')}`}>
      {MONTHS.map((m, i) => (
        <div key={m} className={`season-bar__m${months.includes(i + 1) ? ' is-on' : ''}${now === i + 1 ? ' is-now' : ''}`} style={{ '--i': i }}>
          <span className="season-bar__fill" />
          <span className="season-bar__label">{m[0]}</span>
        </div>
      ))}
    </div>
  );
}

/** Splits a line into words that rise in sequence */
export function SplitWords({ text, className = '', start = 0 }) {
  return text.split(' ').map((w, i, all) => (
    <Fragment key={i}>
      <span className={`word ${className}`}><span style={{ '--w': i + start }}>{w}</span></span>
      {i < all.length - 1 && ' '}
    </Fragment>
  ));
}
