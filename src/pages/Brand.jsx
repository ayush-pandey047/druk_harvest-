import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { SectionHead } from '../components/Bits.jsx';
import Logo, { LogoMark } from '../illustrations/Logo.jsx';
import ProductArt from '../illustrations/ProductArt.jsx';
import Portrait from '../illustrations/Portrait.jsx';
import PrayerFlags from '../illustrations/PrayerFlags.jsx';
import Icon from '../illustrations/Icon.jsx';
import { farmers, products } from '../lib/data.js';
import useMeta from '../hooks/useMeta.js';

export const PALETTE = [
  { name: 'Paddy Green', hex: '#2E8B3E', role: 'Primary', why: 'Summer terraces and fresh produce. Used for primary actions and growth.', ink: '#fff' },
  { name: 'Forest Deep', hex: '#0F3B27', role: 'Primary dark', why: 'Blue pine and cypress forests. Our "black": text on light, base for dark sections.', ink: '#fff' },
  { name: 'Saffron Gold', hex: '#F6B31B', role: 'Accent', why: 'Ripe paddy in October and the gold of dzong roofs. Highlights and key buttons.', ink: '#22190F' },
  { name: 'Chilli Red', hex: '#D7322A', role: 'Accent', why: 'Ema drying on rooftops and the kemar band on dzong walls. Warmth and appetite.', ink: '#fff' },
  { name: 'Marigold', hex: '#FF7A1A', role: 'Support', why: 'Tsirang mandarins and festival marigolds. Energy in small doses.', ink: '#22190F' },
  { name: 'Woodwork Turquoise', hex: '#0FA3A0', role: 'Support', why: 'The painted window frames of farmhouses and temples.', ink: '#22190F' },
  { name: 'Prayer-flag Lapis', hex: '#2440A6', role: 'Support', why: 'The blue lungta flag (sky). Links, focus rings and calm sections.', ink: '#fff' },
  { name: 'Rice Cream', hex: '#FFF6E3', role: 'Background', why: 'Polished rice and handmade paper. Warmer and kinder than plain white.', ink: '#22190F' },
  { name: 'Earth Charcoal', hex: '#22190F', role: 'Text', why: 'Wood smoke and tilled soil. 15:1 contrast on Rice Cream.', ink: '#fff' },
];

export const PERSONAS = [
  { name: 'Pema, 34', tag: 'Household · Thimphu', need: 'Weekly vegetables without the market trip. Price clarity and origin.' },
  { name: 'Chef Karma, 41', tag: 'Hotel kitchen', need: 'Steady seasonal supply and red rice. Quick quotes and lead times.' },
  { name: 'Sonam, 52', tag: 'Farmer · valley village', need: 'Simple words, clear steps, a phone or WhatsApp number.' },
  { name: 'Emily, 29', tag: 'Visitor', need: 'Honey and local goods to take home, with a story behind them.' },
];

const SITEMAP = [
  ['Home', '/'],
  ['Our Story', '/our-story'],
  ['Products', '/products', ['Product detail']],
  ['Farmers', '/farmers', ['Farmer profile']],
  ['How It Works', '/how-it-works'],
  ['Recipes', '/recipes', ['Recipe / story']],
  ['Contact', '/contact', ['Household', 'Business', 'Supplier']],
];

export function SocialPost({ variant }) {
  const p = products.find((x) => x.id === (variant === 'product' ? 'mandarins' : 'red-rice'));
  if (variant === 'farmer') {
    const f = farmers[1];
    return (
      <div className="ig ig--farmer">
        <div className="ig__portrait"><Portrait farmer={f} /></div>
        <p className="ig__quote">“Bees tell you about the season before anyone else does.”</p>
        <p className="ig__who">{f.name} · Bumthang</p>
        <span className="ig__logo"><LogoMark size={26} reversed /></span>
      </div>
    );
  }
  if (variant === 'product') {
    return (
      <div className="ig ig--product">
        <ProductArt kind={p.art} />
        <div className="ig__band">
          <span className="ig__tag">In season</span>
          <strong>Tsirang mandarins are here.</strong>
          <small>Nov – Feb · order by Thursday</small>
        </div>
      </div>
    );
  }
  return (
    <div className="ig ig--type">
      <PrayerFlags count={7} className="ig__flags" />
      <p className="dz" lang="dz">སྐུ་གཟུགས་བཟང་པོ་ལགས།</p>
      <strong>From Bhutanese farms to your table.</strong>
      <span className="ig__logo"><LogoMark size={26} /></span>
    </div>
  );
}

export default function Brand() {
  useMeta('Brand Guide', 'Druk Harvest brand guide: logo concept, colour palette, typography, imagery, voice and sitemap.');
  return (
    <>
      <section className="page-hero page-hero--brand grain">
        <div className="container page-hero__split">
          <div>
            <Reveal as="p" className="kicker kicker--light">Brand guide</Reveal>
            <Reveal as="h1" delay={1}>Rooted in Bhutan. <em>Fresh to your table.</em></Reveal>
            <Reveal as="p" delay={2} className="page-hero__lede">How Druk Harvest looks, sounds and behaves, and why. A one-page summary of the identity behind this website.</Reveal>
          </div>
          <Reveal variant="scale" delay={2} className="brand-hero__mark"><LogoMark size={220} reversed /></Reveal>
        </div>
      </section>

      <section className="section brand-downloads">
        <div className="container">
          <div className="downloads">
            <div>
              <p className="kicker">Brand kit</p>
              <h2>Take the brand with you.</h2>
              <p>The full brand identity guide as a PDF, and every logo version as transparent PNG and SVG files for slides, documents and print.</p>
            </div>
            <div className="downloads__links">
              <a className="download" href="/brand-assets/Druk-Harvest-Brand-Identity-Guide.pdf" download>
                <span className="download__icon download__icon--pdf">PDF</span>
                <span><strong>Brand Identity Guide</strong><small>18 pages · A4 landscape · 2.6 MB</small></span>
              </a>
              <a className="download" href="/brand-assets/Druk-Harvest-Logos.zip" download>
                <span className="download__icon"><LogoMark size={34} /></span>
                <span><strong>Logo pack</strong><small>7 PNGs + 2 SVGs · 0.3 MB</small></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-summary">
        <div className="container brand-two">
          <Reveal>
            <p className="kicker">01 · Brand summary</p>
            <h2>A farm-to-table social enterprise for Bhutan.</h2>
            <p>Druk Harvest connects small Bhutanese farmers with households, restaurants, hotels, retailers and visitors. It should feel <strong>fresh, honest, community-minded, approachable and dependable</strong>: a contemporary food brand that respectfully celebrates Bhutanese landscape and culture, with farmers at the centre of every story.</p>
            <ul className="brand-values">{['Freshness', 'Honesty', 'Community', 'Dependability', 'Local identity'].map((v) => <li key={v}>{v}</li>)}</ul>
          </Reveal>
          <Reveal delay={1}>
            <p className="kicker">Audience</p>
            <ul className="personas">
              {PERSONAS.map((p) => <li key={p.name}><strong>{p.name}</strong><span>{p.tag}</span><p>{p.need}</p></li>)}
            </ul>
            <p className="fine">Personas are illustrative.</p>
          </Reveal>
        </div>
      </section>

      <section className="section brand-logo">
        <div className="container">
          <SectionHead kicker="02 · Logo" title="D for Druk, held up by the farmer." />
          <div className="brand-two">
            <Reveal className="logo-construct">
              <svg viewBox="0 0 320 320" aria-hidden="true" className="logo-construct__grid">
                <path d="M0 80h320M0 160h320M0 240h320M80 0v320M160 0v320M240 0v320" stroke="currentColor" strokeOpacity=".12" />
              </svg>
              <LogoMark size={240} />
              <span className="logo-construct__tag logo-construct__tag--a">Snow peak &amp; sun · Druk Yul</span>
              <span className="logo-construct__tag logo-construct__tag--b">Golden grain · the harvest</span>
              <span className="logo-construct__tag logo-construct__tag--c">Terraces · our valleys</span>
              <span className="logo-construct__tag logo-construct__tag--d">Paddy-stalk spine · farmers hold us up</span>
            </Reveal>
            <Reveal delay={1} className="logo-explain">
              <p>The mark is the letter <strong>D, for Druk</strong>: Druk Yul, the Land of the Thunder Dragon, the name every Bhutanese knows as home.</p>
              <p>The straight side of the D is a <strong>paddy stalk</strong>, heavy with golden grain. Take the stalk away and the letter falls apart. That is the idea: <strong>farmers are the backbone</strong> that hold Druk Harvest up.</p>
              <p>Inside the bowl of the D is <strong>the land itself</strong>: a snow peak, the morning sun and terraced paddies stepping down the hill in four shades of green, the way the valleys look in summer. Everything we sell grows inside Bhutan, in valleys like these.</p>
              <ul className="logo-why">
                <li><strong>Why a letter and not the dragon?</strong> The druk belongs to the nation and its emblem. Out of respect we carry its name, not its image.</li>
                <li><strong>Why a monogram?</strong> One bold shape is easy to remember and still reads on a phone, a rice sack, a jar lid and a 24 px favicon.</li>
                <li><strong>Why these colours?</strong> Green terraces for fresh, growing paddy; lapis from the prayer-flag sky and mountains; saffron for the sun and the golden grain at harvest.</li>
              </ul>
              <p>The wordmark is set in <strong>Fraunces</strong>, soft and friendly rather than corporate. "Harvest" is italic, like a handwritten label on a sack of rice.</p>
              <div className="logo-rules">
                <div><strong>Clear space</strong><span>Height of the "D" on every side</span></div>
                <div><strong>Minimum size</strong><span>24 px icon · 120 px full logo</span></div>
              </div>
            </Reveal>
          </div>

          <div className="logo-versions">
            <Reveal className="logo-v logo-v--cream"><Logo size={48} /><small>Full colour</small></Reveal>
            <Reveal delay={1} className="logo-v logo-v--dark"><Logo size={48} reversed /><small>Reversed</small></Reveal>
            <Reveal delay={2} className="logo-v logo-v--saffron"><span className="logo logo--mono"><LogoMark size={48} mono /><span className="logo__word">Druk <span>Harvest</span></span></span><small>One colour</small></Reveal>
            <Reveal delay={3} className="logo-v logo-v--icon"><LogoMark size={64} /><small>Icon / favicon</small></Reveal>
          </div>

          <h3 className="brand-sub">Please don't</h3>
          <div className="logo-misuse">
            <div><span style={{ transform: 'scaleX(1.6)' }}><LogoMark size={56} /></span><small>Stretch it</small></div>
            <div><span style={{ filter: 'hue-rotate(160deg)' }}><LogoMark size={56} /></span><small>Recolour it</small></div>
            <div className="logo-misuse--low"><LogoMark size={56} /><small>Use low contrast</small></div>
            <div className="logo-misuse--busy"><LogoMark size={56} /><small>Place on busy images</small></div>
          </div>
        </div>
      </section>

      <section className="section brand-colour">
        <div className="container">
          <SectionHead kicker="03 · Colour" title="Painted woodwork, prayer flags, the harvest.">
            Bhutanese colour is bold: think of the window frames of a farmhouse or a festival crowd at a tshechu. Rice Cream and Forest Deep carry most of the interface; the brights are used in confident blocks rather than tints. Every text pair meets WCAG AA.
          </SectionHead>
          <div className="swatches">
            {PALETTE.map((c, i) => (
              <Reveal key={c.hex} delay={i % 3} className="swatch" style={{ '--c': c.hex, '--ink': c.ink }}>
                <div className="swatch__chip"><span>{c.role}</span><strong>{c.hex}</strong></div>
                <h3>{c.name}</h3>
                <p>{c.why}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-type">
        <div className="container">
          <SectionHead kicker="04 · Typography" title="Warm serif, clear sans." />
          <div className="type-specimens">
            <Reveal className="type-spec type-spec--serif">
              <span className="type-spec__big">Aa</span>
              <div><h3>Fraunces</h3><p>Headings. A soft, old-style serif with friendly curves, like hand-lettered market signs. Variable, so one file covers all weights.</p>
                <p className="type-spec__sample">Paro red rice, harvested by hand.</p></div>
            </Reveal>
            <Reveal delay={1} className="type-spec type-spec--sans">
              <span className="type-spec__big">Aa</span>
              <div><h3>Nunito Sans</h3><p>Body & interface. Rounded and very readable on small, cheap phone screens. Good for low digital-confidence readers.</p>
                <p className="type-spec__sample">Order by Thursday for Saturday delivery in Punakha.</p></div>
            </Reveal>
            <Reveal delay={2} className="type-spec type-spec--dz">
              <span className="type-spec__big dz" lang="dz">ཀ</span>
              <div><h3>Jomolhari</h3><p>Dzongkha touches. Designed for Bhutanese script, loaded only for the few characters we use.</p>
                <p className="type-spec__sample dz" lang="dz">སྐུ་གཟུགས་བཟང་པོ་ལགས།</p></div>
            </Reveal>
          </div>
          <Reveal className="type-scale">
            {[['H1', '56–92', 'var(--fs-h1)'], ['H2', '32–54', 'var(--fs-h2)'], ['H3', '22–28', 'var(--fs-h3)'], ['Body', '16–18', '1.1rem']].map(([n, s, f]) => (
              <div key={n}><span>{n} · {s}px</span><p style={{ fontSize: f }} className={n === 'Body' ? '' : 'serif'}>Kuzuzangpo la</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section brand-imagery">
        <div className="container">
          <SectionHead kicker="05 · Imagery" title="Illustrated, not borrowed.">
            Every image on this site is an original SVG illustration: flat shapes, soft grain and bold colour. That respects image ownership, keeps the site fast (each illustration is a few kilobytes), and means no real person is shown without permission.
          </SectionHead>
          <div className="imagery-grid">
            {['rice', 'chilli', 'honey', 'mandarin', 'datshi', 'buckwheat'].map((k, i) => <Reveal key={k} delay={i % 3} className="imagery-grid__item"><ProductArt kind={k} /></Reveal>)}
            <Reveal className="imagery-grid__item imagery-grid__item--tall"><Portrait farmer={farmers[2]} /></Reveal>
          </div>
          <div className="pattern-row">
            <div><div className="kira-band" style={{ height: 32, backgroundSize: 'auto 32px' }} /><small>Kira weave band: dividers and trims</small></div>
            <div><PrayerFlags count={10} /><small>Lungta prayer flags in their traditional order: blue, white, red, green, yellow</small></div>
          </div>
        </div>
      </section>

      <section className="section brand-voice">
        <div className="container brand-two">
          <Reveal>
            <p className="kicker">06 · Voice & tone</p>
            <h2>Talk like a neighbour at the market.</h2>
            <p>Short sentences. Warm, specific words. Name the valley, the farmer, the month. Never promise what we can't prove.</p>
          </Reveal>
          <Reveal delay={1} className="voice-table">
            <div className="voice-table__col voice-table__col--do"><h3><Icon name="check" size={20} /> We say</h3>
              <p>"Grown by small farms in the valleys of Bhutan."</p><p>"We work directly with farmers."</p><p>"In season now."</p></div>
            <div className="voice-table__col voice-table__col--dont"><h3><Icon name="close" size={20} /> We don't say</h3>
              <p>"100% organic and certified."</p><p>"We have transformed thousands of lives."</p><p>"The best produce in the world."</p></div>
          </Reveal>
        </div>
      </section>

      <section className="section brand-social">
        <div className="container">
          <SectionHead kicker="07 · Social & print touchpoints" title="The same voice, everywhere." />
          <div className="social-grid">
            <Reveal><SocialPost variant="type" /><small>Instagram · brand post</small></Reveal>
            <Reveal delay={1}><SocialPost variant="product" /><small>Instagram · seasonal product</small></Reveal>
            <Reveal delay={2}><SocialPost variant="farmer" /><small>Instagram · farmer story</small></Reveal>
          </div>
          <div className="print-grid">
            <Reveal className="biz-card">
              <div className="biz-card__front"><Logo reversed size={34} /><div className="kira-band kira-band--thin" /></div>
              <div className="biz-card__back"><strong>Yangchen</strong><span>Chief Executive Officer</span><span>+975 17 00 00 00</span><span>hello@drukharvest.example</span></div>
              <small>Business card</small>
            </Reveal>
            <Reveal delay={1} className="label-tag">
              <div className="label-tag__inner">
                <LogoMark size={36} />
                <strong>Paro Red Rice</strong>
                <span>Grown by Aum Pem Zam · Shaba, Paro</span>
                <span>Harvested Oct 2026 · 1 kg</span>
                <div className="kira-band kira-band--thin" />
              </div>
              <small>Product label / packaging tag</small>
            </Reveal>
            <Reveal delay={2} className="bag">
              <div className="bag__body"><LogoMark size={64} reversed /><strong>From Bhutanese farms<br />to your table.</strong></div>
              <small>Delivery bag</small>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section brand-sitemap">
        <div className="container">
          <SectionHead kicker="08 · Sitemap" title="Every page, two clicks from an enquiry." />
          <Reveal className="sitemap">
            <Link to="/" className="sitemap__root">Home</Link>
            <ul>
              {SITEMAP.slice(1).map(([label, to, kids]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                  {kids && <ul>{kids.map((k) => <li key={k}><span>{k}</span></li>)}</ul>}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="brief-check">
            <h3>How the site meets the brief</h3>
            <ul>
              <li><Icon name="check" size={18} /> Original logo, palette and typography, explained above</li>
              <li><Icon name="check" size={18} /> Responsive from 320 px to 1920 px; sticky enquiry bar on mobile</li>
              <li><Icon name="check" size={18} /> Original illustrations only: no borrowed photos, no real people</li>
              <li><Icon name="check" size={18} /> Working navigation, filters, enquiry basket and validated form</li>
              <li><Icon name="check" size={18} /> Keyboard navigation, visible focus, ARIA tabs/accordion/dialog, reduced-motion support</li>
              <li><Icon name="check" size={18} /> No organic, certification or unverified sustainability claims</li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
