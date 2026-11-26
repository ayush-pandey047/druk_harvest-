import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import Icon from '../illustrations/Icon.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductDrawer from '../components/ProductDrawer.jsx';
import Reveal from '../components/Reveal.jsx';
import HeroCollage from '../components/HeroCollage.jsx';
import { CATEGORIES, ORIGINS, bySeason, productById, products } from '../lib/data.js';
import { MONTHS_LONG, currentMonth, seasonStatus } from '../lib/season.js';
import useMeta from '../hooks/useMeta.js';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

/** FLIP: cards that stay glide to their new spot; new cards fade up. Transform/opacity only. */
function useFlip(container, deps) {
  const rects = useRef(new Map());
  useLayoutEffect(() => {
    const el = container.current;
    if (!el) return;
    const cards = [...el.querySelectorAll('[data-flip]')];
    const reduce = prefersReducedMotion();
    cards.forEach((c, i) => {
      const id = c.dataset.flip;
      const prev = rects.current.get(id);
      const now = c.getBoundingClientRect();
      if (reduce) return;
      if (prev) {
        const dx = prev.left - now.left, dy = prev.top - now.top;
        if (dx || dy) {
          c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
        }
      } else if (rects.current.size) {
        c.animate(
          [{ opacity: 0, transform: 'translateY(24px) scale(.96)' }, { opacity: 1, transform: 'none' }],
          { duration: 420, delay: Math.min(i, 8) * 40, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
        );
      }
    });
    rects.current = new Map(cards.map((c) => [c.dataset.flip, c.getBoundingClientRect()]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function Products() {
  useMeta('Products', 'Browse Bhutanese vegetables, fruits, red rice, buckwheat, honey and local goods by season and valley.');
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [sheet, setSheet] = useState(false);
  const grid = useRef(null);

  const cat = params.get('cat') ?? 'all';
  const inSeason = params.get('season') === 'in';
  const business = params.get('business') === '1';
  const origin = params.get('origin') ?? '';
  const item = params.get('item');

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: key !== 'item' });
  };

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bySeason(products).filter((p) =>
      (cat === 'all' || p.category === cat) &&
      (!inSeason || seasonStatus(p) === 'in') &&
      (!business || p.businessAvailable) &&
      (!origin || p.origin.endsWith(origin)) &&
      (!q || `${p.name} ${p.local} ${p.origin}`.toLowerCase().includes(q))
    );
  }, [cat, inSeason, business, origin, query]);

  useFlip(grid, [list.map((p) => p.id).join()]);

  // When the results change while the list top is out of view, bring it back so the change is visible
  const catalogue = useRef(null);
  const filterKey = `${cat}|${inSeason}|${business}|${origin}`;
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const el = catalogue.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    if (Math.abs(window.scrollY - top) > 40 && window.scrollY > top) {
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }, [filterKey]);

  const activeFilters = [inSeason, business, origin].filter(Boolean).length;
  const clearAll = () => { setQuery(''); setParams(new URLSearchParams(), { replace: true }); };
  const catIndex = CATEGORIES.findIndex((c) => c.id === cat);

  const filters = (
    <>
      <label className={`chip${inSeason ? ' is-on' : ''}`}>
        <input type="checkbox" checked={inSeason} onChange={(e) => set('season', e.target.checked ? 'in' : '')} />
        <Icon name="sun" size={18} /> In season now
      </label>
      <label className={`chip${business ? ' is-on' : ''}`}>
        <input type="checkbox" checked={business} onChange={(e) => set('business', e.target.checked ? '1' : '')} />
        <Icon name="hotel" size={18} /> Available for business
      </label>
      <label className="select-chip">
        <span className="visually-hidden">Origin</span>
        <Icon name="pin" size={18} />
        <select value={origin} onChange={(e) => set('origin', e.target.value)}>
          <option value="">All valleys</option>
          {ORIGINS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    </>
  );

  return (
    <>
      <section className="page-hero page-hero--products">
        <div className="container page-hero__inner page-hero__inner--art">
          <Reveal as="p" className="kicker">The catalogue · {MONTHS_LONG[currentMonth() - 1]}</Reveal>
          <Reveal as="h1" delay={1}>Grown in the valleys, <em>picked for you.</em></Reveal>
          <Reveal as="p" delay={2} className="page-hero__lede">
            Everything here comes from a farm we know by name. Badges show what's in season right now. Add what you like to your enquiry list and we'll confirm the rest.
          </Reveal>
          <HeroCollage kinds={['mandarin', 'honey', 'chilli']} />
        </div>
      </section>

      <section className="catalogue section--tight" ref={catalogue}>
        <div className="container">
          <div className="catalogue__bar">
            <div className="cat-tabs" role="tablist" aria-label="Product categories" style={{ '--a': catIndex }}>
              {CATEGORIES.map((c) => (
                <button key={c.id} role="tab" aria-selected={cat === c.id} className={`cat-tab cat-tab--${c.id}`} onClick={() => set('cat', c.id === 'all' ? '' : c.id)}>
                  {c.label}
                </button>
              ))}
            </div>
            <div className="catalogue__tools">
              <label className="search">
                <Icon name="search" size={20} />
                <span className="visually-hidden">Search products</span>
                <input type="search" placeholder="Search: rice, honey, ema…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </label>
              <button className="btn btn--ghost btn--sm catalogue__filter-btn" onClick={() => setSheet(true)} aria-expanded={sheet}>
                <Icon name="filter" size={18} /> Filters {activeFilters > 0 && <span className="count">{activeFilters}</span>}
              </button>
            </div>
            <div className="catalogue__filters">{filters}</div>
          </div>

          <p className="catalogue__count" aria-live="polite">
            Showing <strong>{list.length}</strong> of {products.length} products
            {(activeFilters > 0 || query || cat !== 'all') && <button className="link-btn" onClick={clearAll}>Clear all</button>}
          </p>

          {list.length ? (
            <div className="p-grid p-grid--catalogue" ref={grid}>
              {list.map((p) => (
                <div key={p.id} data-flip={p.id}>
                  <ProductCard product={p} onOpen={(id) => set('item', id)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <svg viewBox="0 0 120 90" aria-hidden="true"><path d="M10 80h100M30 80c0-20 10-34 30-34s30 14 30 34" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" /><circle cx="48" cy="62" r="3" /><circle cx="72" cy="62" r="3" /><path d="M52 72c4-3 12-3 16 0" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
              <h2>Nothing matches that, yet.</h2>
              <p>Try another word, or clear the filters to see everything.</p>
              <button className="btn btn--primary" onClick={clearAll}>Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {createPortal(<div className={`sheet${sheet ? ' is-open' : ''}`} aria-hidden={!sheet}>
        <div className="sheet__overlay" onClick={() => setSheet(false)} />
        <div className="sheet__panel" role="dialog" aria-modal="true" aria-label="Filters">
          <span className="sheet__grip" aria-hidden="true" />
          <h2>Filters</h2>
          <div className="sheet__body">{filters}</div>
          <button className="btn btn--primary btn--grow" onClick={() => setSheet(false)}>Show {list.length} products</button>
        </div>
      </div>, document.body)}

      <ProductDrawer product={item ? productById(item) : null} onClose={() => set('item', '')} />
    </>
  );
}
