import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroScene from '../illustrations/HeroScene.jsx';
import ProductArt from '../illustrations/ProductArt.jsx';
import Portrait from '../illustrations/Portrait.jsx';
import PrayerFlags from '../illustrations/PrayerFlags.jsx';
import Icon from '../illustrations/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { SectionHead, SplitWords } from '../components/Bits.jsx';
import { bySeason, farmerById, products } from '../lib/data.js';
import { MONTHS_LONG, currentMonth, seasonStatus, weekOf } from '../lib/season.js';
import useMeta from '../hooks/useMeta.js';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

const JOURNEY = [
  { icon: 'sprout', title: 'Grow', text: 'Small farms in Paro, Punakha, Bumthang and beyond grow what suits their valley and season.' },
  { icon: 'sickle', title: 'Harvest', text: 'Picked as close to your delivery day as we can arrange.' },
  { icon: 'check', title: 'Check', text: 'We look over every crate for freshness and size before it leaves the farm.' },
  { icon: 'basket', title: 'Pack', text: 'Packed in reusable crates and bamboo baskets wherever we can.' },
  { icon: 'truck', title: 'Deliver', text: 'Brought to homes and kitchens on fixed days each week.' },
];

const SERVE = [
  { icon: 'home', title: 'Households', text: 'Weekly vegetables, rice and honey for the family, delivered to your door.', tone: 'turquoise', to: '/contact?type=customer' },
  { icon: 'pot', title: 'Restaurants', text: 'Seasonal produce in kitchen quantities, on a schedule you can plan menus around.', tone: 'chilli', to: '/contact?type=business' },
  { icon: 'hotel', title: 'Hotels', text: 'Local flavour for guests, with clear lead times and a regular supply plan.', tone: 'lapis', to: '/contact?type=business' },
  { icon: 'shop', title: 'Retailers', text: 'Honey, grains and local goods to stock, labelled with where they come from.', tone: 'marigold', to: '/contact?type=business' },
];

function MarketBoard({ className = '' }) {
  const fresh = products.filter((p) => seasonStatus(p) === 'in' && p.seasonMonths.length < 12).slice(0, 5);
  return (
    <aside className={`board ${className}`} aria-label="Fresh this week">
      <div className="board__head">
        <span>Fresh this week</span>
        <span className="board__date">w/c {weekOf()}</span>
      </div>
      <ul>
        {fresh.map((p) => (
          <li key={p.id}>
            <Link to={`/products?item=${p.id}`}>
              <span className="board__name">{p.name}</span>
              <span className="board__from">{p.origin}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/products?season=in" className="board__all">See everything in season <Icon name="arrow" size={18} /></Link>
    </aside>
  );
}

function Marquee() {
  const items = products.map((p) => (
    <span key={p.id} className="marquee__item">
      <span className="marquee__name">{p.local}</span>
      <span className="marquee__dot" aria-hidden="true" />
      <span className="marquee__en">{p.name.replace(/\s*\(.*\)/, '')}</span>
    </span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{items}{items}</div>
    </div>
  );
}

function Journey() {
  const ref = useRef(null);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.style.setProperty('--p', 1); setStep(4); return; }
    let raf = 0, visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) update(); });
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.1)));
      el.style.setProperty('--p', p.toFixed(3));
      setStep(Math.floor(p * 5.2) - 1);
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="journey section" aria-labelledby="journey-title">
      <div className="container">
        <SectionHead kicker="Farm to table, step by step" title={<span id="journey-title">Five hands between the field and your plate.</span>}>
          No warehouses full of last month's stock. Here is what happens to a crate of chillies on its way to you.
        </SectionHead>
        <ol className="journey__steps" ref={ref}>
          <span className="journey__line" aria-hidden="true"><span /></span>
          {JOURNEY.map((j, i) => (
            <li key={j.title} className={`journey__step${step >= i ? ' is-on' : ''}`}>
              <span className="journey__icon"><Icon name={j.icon} size={30} /></span>
              <span className="journey__num">0{i + 1}</span>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Home() {
  useMeta(null, 'Seasonal vegetables, red rice, honey and traditional goods from small Bhutanese farms, delivered in Thimphu, Paro and Punakha.');
  const featured = bySeason(products).slice(0, 6);
  const farmer = farmerById('pem-zam');

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroScene />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__hello">
              <span className="dz" lang="dz">སྐུ་གཟུགས་བཟང་པོ་ལགས།</span>
              <span>Kuzuzangpo la</span>
            </p>
            <h1 id="hero-title" className="hero__title">
              <SplitWords text="From Bhutanese farms" />
              <br />
              <span className="hero__accent"><SplitWords text="to your table." start={3} /></span>
            </h1>
            <p className="hero__sub">Fresh seasonal produce and traditional goods, grown by small farmers and shared with care.</p>
            <div className="hero__ctas">
              <Link to="/products" className="btn btn--primary btn--lg" data-magnetic>Explore Products <Icon name="arrow" size={20} /></Link>
              <Link to="/farmers" className="btn btn--ghost btn--lg" data-magnetic>Meet Our Farmers</Link>
            </div>
          </div>
          <MarketBoard className="hero__board" />
        </div>
        <a href="#intro" className="hero__scroll" aria-label="Scroll to learn more"><span /></a>
      </section>

      <Marquee />

      <section id="intro" className="intro section--tight">
        <div className="container intro__grid">
          <Reveal as="p" className="intro__big">
            We buy directly from small farms between <mark className="hl hl--saffron">Haa</mark> and <mark className="hl hl--turq">Mongar</mark>,
            and bring what they grow to homes and kitchens in Thimphu, Paro and Punakha.
            Every product tells you <em>who</em> grew it, <em>where</em>, and <em>when</em> it's at its best.
          </Reveal>
          <MarketBoard className="intro__board" />
        </div>
      </section>

      <Journey />

      <section className="section featured" aria-labelledby="featured-title">
        <div className="container">
          <div className="featured__head">
            <SectionHead kicker={`In season · ${MONTHS_LONG[currentMonth() - 1]}`} title={<span id="featured-title">What the valleys are giving us now.</span>} />
            <Reveal><Link to="/products" className="link-arrow" data-magnetic>All products <Icon name="arrow" size={20} /></Link></Reveal>
          </div>
          <div className="p-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i % 3}><ProductCard product={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="spotlight-farmer section grain" aria-labelledby="farmer-title" data-spotlight>
        <div className="container spotlight-farmer__grid">
          <Reveal variant="curtain" className="spotlight-farmer__portrait">
            <Portrait farmer={farmer} />
            <span className="spotlight-farmer__stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120"><defs><path id="stamp-c" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs><text><textPath href="#stamp-c">PARO RED RICE · SHABA · PARO RED RICE · SHABA ·</textPath></text></svg>
            </span>
          </Reveal>
          <div className="spotlight-farmer__copy">
            <Reveal as="p" className="kicker kicker--light">Farmer highlight</Reveal>
            <Reveal as="blockquote" delay={1} className="spotlight-farmer__quote">
              <p id="farmer-title">“{farmer.quote}”</p>
            </Reveal>
            <Reveal delay={2} className="spotlight-farmer__who">
              <strong>{farmer.name}</strong>
              <span>{farmer.village} · red rice & apples</span>
              <small>Illustrative profile</small>
            </Reveal>
            <Reveal delay={3}>
              <Link to={`/farmers/${farmer.id}`} className="btn btn--cream" data-magnetic>Read her story <Icon name="arrow" size={20} /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section serve" aria-labelledby="serve-title">
        <div className="container">
          <SectionHead kicker="Who we serve" title={<span id="serve-title">Kitchens of every size.</span>} align="center" />
          <div className="serve__grid">
            {SERVE.map((s, i) => (
              <Reveal key={s.title} delay={i}>
                <Link to={s.to} className={`serve__card serve__card--${s.tone}`} data-spotlight>
                  <span className="serve__icon"><Icon name={s.icon} size={34} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="serve__go">Start an enquiry <Icon name="arrow" size={18} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust" aria-labelledby="trust-title">
        <div className="container trust__grid">
          <Reveal className="trust__intro">
            <p className="kicker">Honest sourcing</p>
            <h2 id="trust-title">We only make claims we can stand behind.</h2>
            <p>Food labels are full of big words. We would rather tell you plainly what we know, and say so when we don't.</p>
            <Link to="/how-it-works" className="link-arrow">How we check quality <Icon name="arrow" size={20} /></Link>
          </Reveal>
          <Reveal delay={1} className="trust__card trust__card--yes">
            <h3>What we'll always tell you</h3>
            <ul>
              <li>The valley or village it was grown in</li>
              <li>The farmer or family who grew it</li>
              <li>When it is in season, and when it isn't</li>
              <li>An indicative price before you commit</li>
            </ul>
          </Reveal>
          <Reveal delay={2} className="trust__card trust__card--no">
            <h3>What we won't claim</h3>
            <ul>
              <li>Organic certification we don't hold</li>
              <li>Environmental labels we can't prove</li>
              <li>Health benefits or "superfood" promises</li>
              <li>Made-up numbers about impact</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="cta" aria-labelledby="cta-title">
        <PrayerFlags count={18} className="cta__flags" />
        <div className="container cta__inner">
          <Reveal as="h2" id="cta-title">Ready to bring local flavour home?</Reveal>
          <Reveal as="p" delay={1}>Tell us what you'd like. We'll confirm what's fresh, the price and your delivery day.</Reveal>
          <Reveal delay={2} className="cta__btns">
            <Link to="/contact" className="btn btn--saffron btn--lg btn--pulse" data-magnetic>Make an Enquiry <Icon name="arrow" size={20} /></Link>
            <Link to="/contact?type=supplier" className="btn btn--outline-light btn--lg" data-magnetic>I'm a farmer</Link>
          </Reveal>
        </div>
        <div className="cta__art" aria-hidden="true">
          {['red-rice', 'mandarins', 'spring-honey', 'green-chilli'].map((id, i) => {
            const p = products.find((x) => x.id === id);
            return <div key={id} className="cta__chip" style={{ '--i': i }}><ProductArt kind={p.art} /></div>;
          })}
        </div>
      </section>
    </>
  );
}
