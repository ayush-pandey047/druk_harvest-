import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import HeroCollage from '../components/HeroCollage.jsx';
import ProductArt from '../illustrations/ProductArt.jsx';
import Icon from '../illustrations/Icon.jsx';
import { SectionHead } from '../components/Bits.jsx';
import { products, recipes } from '../lib/data.js';
import { MONTHS, MONTHS_LONG, currentMonth } from '../lib/season.js';
import useMeta from '../hooks/useMeta.js';

const TYPES = [
  { id: 'all', label: 'All' },
  { id: 'recipe', label: 'Recipes' },
  { id: 'story', label: 'Stories' },
  { id: 'seasonal', label: 'Seasonal updates' },
];
const TYPE_LABEL = { recipe: 'Recipe', story: 'Farm story', seasonal: 'Seasonal update' };

export default function Recipes() {
  useMeta('Recipes & Seasonal Updates', 'Bhutanese recipes like ema datshi and khuli, farm stories and what is fresh this month.');
  const [month, setMonth] = useState(currentMonth());
  const [type, setType] = useState('all');
  const fresh = useMemo(() => products.filter((p) => p.seasonMonths.includes(month) && p.seasonMonths.length < 12), [month]);
  const list = recipes.filter((r) => type === 'all' || r.type === type);

  return (
    <>
      <section className="page-hero page-hero--recipes">
        <div className="container page-hero__inner page-hero__inner--art">
          <Reveal as="p" className="kicker">Recipes & seasonal updates</Reveal>
          <Reveal as="h1" delay={1}>Cook what the <em>season gives.</em></Reveal>
          <Reveal as="p" delay={2} className="page-hero__lede">Everyday Bhutanese dishes, small stories from the farms, and a calendar of what's fresh each month.</Reveal>
          <HeroCollage kinds={['ema-datshi', 'khuli', 'rice-bowl']} />
        </div>
      </section>

      <section className="section--tight calendar">
        <div className="container">
          <SectionHead kicker="Seasonal calendar" title={`Fresh in ${MONTHS_LONG[month - 1]}`} />
          <div className="calendar__months" role="group" aria-label="Choose a month">
            {MONTHS.map((m, i) => (
              <button key={m} className={`calendar__m${month === i + 1 ? ' is-on' : ''}${currentMonth() === i + 1 ? ' is-now' : ''}`} aria-pressed={month === i + 1} onClick={() => setMonth(i + 1)}>
                {m}
              </button>
            ))}
          </div>
          <ul className="calendar__list" key={month}>
            {fresh.map((p, i) => (
              <li key={p.id} style={{ '--i': i }}>
                <Link to={`/products?item=${p.id}`}>
                  <ProductArt kind={p.art} />
                  <span><strong>{p.name}</strong><small>{p.origin}</small></span>
                </Link>
              </li>
            ))}
            {!fresh.length && <li className="calendar__none">A quiet month. Stored grains, honey and datshi are still available.</li>}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="recipes__head">
            <SectionHead kicker="From our kitchen" title="Recipes & stories" />
            <div className="pill-group" role="group" aria-label="Filter by type">
              {TYPES.map((t) => (
                <button key={t.id} className={`pill${type === t.id ? ' is-on' : ''}`} aria-pressed={type === t.id} onClick={() => setType(t.id)}>{t.label}</button>
              ))}
            </div>
          </div>
          <div className="r-grid" key={type}>
            {list.map((r, i) => (
              <Reveal key={r.id} delay={i % 3}>
                <Link to={`/recipes/${r.id}`} className={`r-card r-card--${r.type}`} data-cursor="Read">
                  <div className="r-card__art"><ProductArt kind={r.art} /></div>
                  <div className="r-card__body">
                    <p className="r-card__meta"><span>{TYPE_LABEL[r.type]}</span><span><Icon name="clock" size={15} /> {r.time}</span></p>
                    <h3>{r.title}</h3>
                    <p>{r.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
