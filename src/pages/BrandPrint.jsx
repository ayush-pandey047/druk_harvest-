import { useEffect } from 'react';
import Logo, { LogoMark } from '../illustrations/Logo.jsx';
import ProductArt from '../illustrations/ProductArt.jsx';
import Portrait from '../illustrations/Portrait.jsx';
import SeasonScene from '../illustrations/SeasonScene.jsx';
import PrayerFlags from '../illustrations/PrayerFlags.jsx';
import Icon from '../illustrations/Icon.jsx';
import { PALETTE, PERSONAS, SocialPost } from './Brand.jsx';
import { farmers } from '../lib/data.js';
import '../styles/print-guide.css';

// WCAG contrast ratio between two hex colours
function lum(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');

const PAIRS = [
  ['Earth Charcoal', '#22190F', 'Rice Cream', '#FFF6E3', 'Body text, headings'],
  ['Rice Cream', '#FFF6E3', 'Forest Deep', '#0F3B27', 'Text on dark sections, footer'],
  ['Forest Deep', '#0F3B27', 'Rice Cream', '#FFF6E3', 'Logo, primary buttons'],
  ['Earth Charcoal', '#22190F', 'Saffron Gold', '#F6B31B', 'Highlight buttons, badges'],
  ['White', '#FFFFFF', 'Chilli Red', '#D7322A', 'Feature blocks, tags'],
  ['White', '#FFFFFF', 'Prayer-flag Lapis', '#2440A6', 'Calm sections, links'],
  ['Earth Charcoal', '#22190F', 'Woodwork Turquoise', '#0FA3A0', 'Cards and tiles'],
  ['Earth Charcoal', '#22190F', 'Marigold', '#FF7A1A', 'Cards and tiles'],
];

const TOTAL = 18;
function Page({ n, title, kicker, children, tone = '', className = '' }) {
  return (
    <section className={`bp ${tone ? `bp--${tone}` : ''} ${className}`}>
      {title && (
        <header className="bp__head">
          {kicker && <p className="bp__kicker">{kicker}</p>}
          <h2>{title}</h2>
        </header>
      )}
      <div className="bp__body">{children}</div>
      <footer className="bp__foot">
        <span><LogoMark size={16} reversed={tone === 'dark'} /> Druk Harvest · Brand Identity Guide</span>
        <span>{String(n).padStart(2, '0')} / {TOTAL}</span>
      </footer>
    </section>
  );
}

export default function BrandPrint() {
  useEffect(() => {
    document.title = 'Druk Harvest – Brand Identity Guide';
    document.body.classList.add('print-mode');
    return () => document.body.classList.remove('print-mode');
  }, []);

  return (
    <div className="bp-doc">
      {/* 01 Cover */}
      <section className="bp bp--cover">
        <PrayerFlags count={14} className="bp-cover__flags" />
        <div className="bp-cover__inner">
          <LogoMark size={200} reversed />
          <p className="bp-cover__kicker">Brand Identity Guide · Version 1.0 · November 2026</p>
          <h1>Druk <em>Harvest</em></h1>
          <p className="bp-cover__tag">From Bhutanese farms to your table.</p>
        </div>
        <div className="kira-band bp-cover__band" />
      </section>

      {/* 02 Contents */}
      <Page n={2} kicker="Inside this guide" title="Contents">
        <div className="bp-contents">
          {[
            ['03', 'Who we are', 'Brand summary, mission and values'],
            ['04', 'Who we serve', 'Our audience and what they need'],
            ['05', 'Personality & voice', 'How we sound, with examples'],
            ['06', 'The logo, simply explained', 'What every part means'],
            ['07', 'Logo versions', 'Which version to use where'],
            ['08', 'Logo rules', 'Clear space, minimum size, misuse'],
            ['09', 'Colour palette', 'Nine colours and why we chose them'],
            ['10', 'Colour in use', 'Proportions and accessible pairs'],
            ['11', 'Typography', 'Three typefaces and how to use them'],
            ['12', 'Illustration style', 'Original drawings, never borrowed'],
            ['13', 'Patterns & motifs', 'Kira weave, prayer flags, terraces'],
            ['14', 'Interface elements', 'Buttons, badges, cards, motion'],
            ['15', 'Social media', 'Posts that feel like us'],
            ['16', 'Print & packaging', 'Cards, labels and bags'],
            ['17', 'The website', 'Sitemap and how the brand comes through'],
            ['18', 'Claims we make, and don\'t', 'Honesty rules and logo files'],
          ].map(([n, t, d]) => (
            <div key={n}><span>{n}</span><strong>{t}</strong><small>{d}</small></div>
          ))}
        </div>
      </Page>

      {/* 03 Who we are */}
      <Page n={3} kicker="01 · Brand summary" title="Who we are">
        <div className="bp-cols">
          <div>
            <p className="bp-lead">Druk Harvest connects small Bhutanese farmers with households, restaurants, hotels, retailers and visitors.</p>
            <p>We buy directly from farms between Haa and Mongar and bring what they grow to kitchens in Thimphu, Paro and Punakha. Every product tells you <strong>who</strong> grew it, <strong>where</strong>, and <strong>when</strong> it is at its best.</p>
            <div className="bp-box">
              <h3>Our mission</h3>
              <p>To make local food easier to find, and to give farming communities a dependable way to reach customers.</p>
            </div>
            <div className="bp-box bp-box--saffron">
              <h3>Brand essence</h3>
              <p className="bp-serif">Rooted in Bhutan. Fresh to your table.</p>
            </div>
          </div>
          <div>
            <h3>Our five values</h3>
            <ul className="bp-values">
              {[
                ['Freshness', 'Picked close to delivery, never left sitting.', '#2E8B3E'],
                ['Honesty', 'We say what we know, and admit what we don\'t.', '#2440A6'],
                ['Community', 'Farmers are partners, not suppliers on a spreadsheet.', '#D7322A'],
                ['Dependability', 'Fixed days, clear prices, no surprises.', '#F6B31B'],
                ['Local identity', 'Proudly Bhutanese in look, words and food.', '#0FA3A0'],
              ].map(([t, d, c]) => <li key={t} style={{ '--c': c }}><strong>{t}</strong><span>{d}</span></li>)}
            </ul>
          </div>
        </div>
      </Page>

      {/* 04 Audience */}
      <Page n={4} kicker="02 · Audience" title="Who we serve">
        <div className="bp-cols bp-cols--wide">
          <div>
            <table className="bp-table">
              <thead><tr><th>Group</th><th>What they need from us</th></tr></thead>
              <tbody>
                {[
                  ['Households', 'Fresh, trusted produce, clear prices, easy delivery'],
                  ['Restaurants & hotels', 'Steady supply, bulk quantities, lead times'],
                  ['Retailers', 'Quality goods to stock, clear origin on labels'],
                  ['Health-conscious buyers', 'Honest origin and farming information'],
                  ['Visitors & tourists', 'Honey, grains and local goods with a story'],
                  ['Local farmers', 'A fair, simple route to market'],
                ].map(([g, n]) => <tr key={g}><td><strong>{g}</strong></td><td>{n}</td></tr>)}
              </tbody>
            </table>
            <p className="bp-note">Most of our users are Bhutanese and use a phone. Design for small screens, simple English and quick loading first.</p>
          </div>
          <div className="bp-personas">
            {PERSONAS.map((p) => (
              <div key={p.name}><strong>{p.name}</strong><span>{p.tag}</span><p>{p.need}</p></div>
            ))}
            <p className="bp-note">Personas are illustrative.</p>
          </div>
        </div>
      </Page>

      {/* 05 Voice */}
      <Page n={5} kicker="03 · Personality & voice" title="Talk like a neighbour at the market">
        <div className="bp-traits">
          {['Fresh', 'Honest', 'Community-minded', 'Approachable', 'Dependable'].map((t, i) => <span key={t} style={{ '--c': ['#2E8B3E', '#2440A6', '#D7322A', '#FF7A1A', '#0F3B27'][i] }}>{t}</span>)}
        </div>
        <div className="bp-cols">
          <div>
            <h3>How we write</h3>
            <ul className="bp-list">
              <li>Short sentences. Warm, everyday words. No jargon.</li>
              <li>Be specific: name the valley, the farmer and the month.</li>
              <li>Simple English first, with small Dzongkha touches: <em>Kuzuzangpo la</em> (hello), <em>Kadrinchey la</em> (thank you).</li>
              <li>Never promise what we can't prove.</li>
            </ul>
            <h3>Sample lines</h3>
            <p className="bp-quote">“Fresh seasonal produce and traditional goods, grown by small farmers and shared with care.”</p>
            <p className="bp-quote">“Your enquiry list is empty. Browse our products and add what you like.”</p>
          </div>
          <div className="bp-dodont">
            <div className="bp-do"><h3><Icon name="heart" size={18} /> We say</h3><p>“Grown by small farms in the valleys of Bhutan.”</p><p>“We work directly with farmers.”</p><p>“In season now.”</p></div>
            <div className="bp-dont"><h3><Icon name="close" size={18} /> We never say</h3><p>“100% organic and certified.”</p><p>“We have transformed thousands of lives.”</p><p>“The best produce in the world.”</p></div>
          </div>
        </div>
      </Page>

      {/* 06 Logo meaning */}
      <Page n={6} kicker="04 · The logo" title="The logo, simply explained">
        <div className="bp-cols">
          <div className="bp-logo-anat">
            <LogoMark size={300} />
            <span className="bp-pin bp-pin--1">1</span>
            <span className="bp-pin bp-pin--2">2</span>
            <span className="bp-pin bp-pin--3">3</span>
            <span className="bp-pin bp-pin--4">4</span>
          </div>
          <div>
            <p className="bp-lead">Our logo is a big letter <strong>D</strong>, for <strong>Druk</strong>, the name of our country.</p>
            <ol className="bp-anat-list">
              <li><span>1</span><div><strong>The rice plant (left side)</strong><p>The straight line of the D is a rice plant with golden grain. Without it, the D would fall down. It means <strong>farmers hold our business up.</strong></p></div></li>
              <li><span>2</span><div><strong>The mountain and sun (top)</strong><p>A snowy Himalayan peak and the morning sun. It means <strong>Bhutan, and a fresh new day.</strong></p></div></li>
              <li><span>3</span><div><strong>The green fields (bottom)</strong><p>Terraced rice fields stepping down the hill. It means <strong>our food grows here, in Bhutan's valleys.</strong></p></div></li>
              <li><span>4</span><div><strong>The round shape of the D</strong><p>It holds everything inside, like a bowl. It means <strong>we carry the land's food safely to you.</strong></p></div></li>
            </ol>
            <div className="bp-box bp-box--saffron"><p><strong>In one sentence:</strong> “Druk Harvest is held up by its farmers and carries the food of Bhutan's land to your table.”</p></div>
            <p className="bp-note">Why not the dragon? The thunder dragon belongs to the nation and its emblem. Out of respect, we use the name “Druk”, not the image.</p>
          </div>
        </div>
      </Page>

      {/* 07 Logo versions */}
      <Page n={7} kicker="04 · The logo" title="Logo versions">
        <div className="bp-versions">
          <div className="bp-v bp-v--cream"><Logo size={64} /><p><strong>Full colour</strong>Default. Use on cream or white backgrounds.</p></div>
          <div className="bp-v bp-v--dark"><Logo size={64} reversed /><p><strong>Reversed</strong>Use on Forest Deep or other dark backgrounds.</p></div>
          <div className="bp-v bp-v--saffron"><span className="logo logo--mono"><LogoMark size={64} mono /><span className="logo__word">Druk <span>Harvest</span></span></span><p><strong>One colour</strong>Stamps, sacks, embroidery and single-colour printing.</p></div>
          <div className="bp-v bp-v--white"><LogoMark size={110} /><p><strong>Icon only</strong>App icon, favicon, social avatars, jar lids.</p></div>
        </div>
        <p className="bp-note">Logo files are in the <strong>brand-assets</strong> folder: transparent PNGs for slides and documents, SVGs for print and web. See page 18.</p>
      </Page>

      {/* 08 Logo rules */}
      <Page n={8} kicker="04 · The logo" title="Logo rules">
        <div className="bp-cols">
          <div>
            <h3>Clear space</h3>
            <div className="bp-clear"><div className="bp-clear__inner"><Logo size={60} /></div></div>
            <p>Keep empty space around the logo at least the height of the letter “D” in the wordmark. Nothing (text, edges, photos) goes inside that space.</p>
            <h3>Minimum size</h3>
            <div className="bp-min"><div><LogoMark size={24} /><small>Icon 24 px / 8 mm</small></div><div><Logo size={26} /><small>Full logo 120 px / 35 mm</small></div></div>
          </div>
          <div>
            <h3>Please don't</h3>
            <div className="bp-misuse">
              <div><span style={{ transform: 'scaleX(1.6)' }}><LogoMark size={64} /></span><small>Stretch or squash it</small></div>
              <div><span style={{ filter: 'hue-rotate(160deg)' }}><LogoMark size={64} /></span><small>Change its colours</small></div>
              <div className="bp-misuse--low"><LogoMark size={64} /><small>Use it faintly or with low contrast</small></div>
              <div className="bp-misuse--busy"><LogoMark size={64} /><small>Put it on busy patterns or photos</small></div>
              <div><span style={{ transform: 'rotate(-25deg)' }}><LogoMark size={64} /></span><small>Rotate or tilt it</small></div>
              <div><span style={{ filter: 'drop-shadow(5px 5px 0 #000)' }}><LogoMark size={64} /></span><small>Add shadows or effects</small></div>
            </div>
          </div>
        </div>
      </Page>

      {/* 09 Palette */}
      <Page n={9} kicker="05 · Colour" title="Colour palette">
        <p className="bp-intro">Our colours come from Bhutan itself: painted window frames, prayer flags, chillies drying on rooftops and terraced paddies.</p>
        <div className="bp-swatches">
          {PALETTE.map((c) => (
            <div key={c.hex} className="bp-sw">
              <div className="bp-sw__chip" style={{ background: c.hex, color: c.ink }}><span>{c.role}</span></div>
              <strong>{c.name}</strong>
              <code>{c.hex} · RGB {rgb(c.hex)}</code>
              <p>{c.why}</p>
            </div>
          ))}
        </div>
      </Page>

      {/* 10 Colour in use */}
      <Page n={10} kicker="05 · Colour" title="Colour in use">
        <h3>Roughly how much of each colour</h3>
        <div className="bp-ratio">
          {[['Rice Cream', '#FFF6E3', 40, '#22190F'], ['Forest Deep', '#0F3B27', 20, '#fff'], ['Paddy Green', '#2E8B3E', 12, '#fff'], ['Saffron', '#F6B31B', 10, '#22190F'], ['Chilli', '#D7322A', 8, '#fff'], ['Lapis', '#2440A6', 4, '#fff'], ['Turquoise', '#0FA3A0', 3, '#22190F'], ['Marigold', '#FF7A1A', 3, '#22190F']].map(([n, c, w, ink]) => (
            <div key={n} style={{ flex: w, background: c, color: ink }}><span>{n}</span><small>{w}%</small></div>
          ))}
        </div>
        <p>Cream and Forest Deep carry most pages. The bright colours are used in bold, solid blocks (a whole card or section), not as faint tints.</p>
        <h3>Approved text and background pairs (WCAG AA needs 4.5 : 1)</h3>
        <div className="bp-pairs">
          {PAIRS.map(([fn, f, bn, b, use]) => {
            const r = contrast(f, b);
            return (
              <div key={fn + bn} style={{ background: b, color: f }}>
                <strong>Aa</strong>
                <span>{fn} on {bn}</span>
                <small>{r.toFixed(1)} : 1 · {r >= 4.5 ? 'AA pass' : 'Large text only'} · {use}</small>
              </div>
            );
          })}
        </div>
      </Page>

      {/* 11 Typography */}
      <Page n={11} kicker="06 · Typography" title="Typography">
        <div className="bp-type">
          <div><span className="bp-type__big bp-serif">Aa</span><div><h3>Fraunces</h3><p className="bp-label">Headings · Google Fonts · free</p><p>A soft, warm serif with friendly curves, like hand-painted market signs. Use for headlines, quotes and the wordmark.</p><p className="bp-serif bp-type__sample">Paro red rice, harvested by hand.</p></div></div>
          <div><span className="bp-type__big bp-sans">Aa</span><div><h3>Nunito Sans</h3><p className="bp-label">Body & interface · Google Fonts · free</p><p>Rounded and very easy to read on small phone screens. Use for paragraphs, buttons, forms and labels.</p><p className="bp-type__sample">Order by Thursday for Saturday delivery in Punakha.</p></div></div>
          <div><span className="bp-type__big dz" lang="dz">འབྲུག</span><div><h3>Jomolhari</h3><p className="bp-label">Dzongkha touches · Google Fonts · free</p><p>Designed for Bhutanese script. Use only for short Dzongkha greetings, checked by a Dzongkha speaker.</p><p className="dz bp-type__sample" lang="dz">སྐུ་གཟུགས་བཟང་པོ་ལགས།</p></div></div>
        </div>
        <table className="bp-table bp-scale">
          <thead><tr><th>Style</th><th>Font</th><th>Web size</th><th>Slides / print</th></tr></thead>
          <tbody>
            <tr><td className="bp-serif" style={{ fontSize: 26 }}>Headline</td><td>Fraunces SemiBold</td><td>56–92 px</td><td>40–60 pt</td></tr>
            <tr><td className="bp-serif" style={{ fontSize: 20 }}>Section title</td><td>Fraunces SemiBold</td><td>32–54 px</td><td>28–32 pt</td></tr>
            <tr><td className="bp-serif" style={{ fontSize: 16 }}>Card title</td><td>Fraunces SemiBold</td><td>22–28 px</td><td>18–20 pt</td></tr>
            <tr><td>Body text</td><td>Nunito Sans Regular</td><td>16–18 px</td><td>12–14 pt</td></tr>
            <tr><td className="bp-label">LABEL / KICKER</td><td>Nunito Sans ExtraBold, caps</td><td>13 px</td><td>9–10 pt</td></tr>
          </tbody>
        </table>
      </Page>

      {/* 12 Illustration */}
      <Page n={12} kicker="07 · Imagery" title="Illustration style: drawn, not borrowed">
        <div className="bp-cols bp-cols--wide">
          <div className="bp-art-grid">
            {['rice', 'chilli', 'honey', 'mandarin', 'datshi', 'buckwheat', 'mushroom', 'honeycomb', 'ema-datshi'].map((k) => <div key={k}><ProductArt kind={k} /></div>)}
          </div>
          <div>
            <div className="bp-art-row">
              <div className="bp-art-portrait"><Portrait farmer={farmers[2]} /></div>
              <div className="bp-art-scene"><SeasonScene stage="harvest" /></div>
            </div>
            <h3>Rules</h3>
            <ul className="bp-list">
              <li>Every image is an <strong>original illustration</strong>: flat shapes, bold colour, simple details.</li>
              <li>Each product sits on one solid brand colour with a soft light circle behind it.</li>
              <li>People wear <strong>gho and kira</strong> and are shown with dignity, never as caricatures.</li>
              <li>No stock photos, and no photos of real people without their written permission.</li>
              <li>Illustrations are tiny SVG files, so the website stays fast on slow mobile data.</li>
            </ul>
          </div>
        </div>
      </Page>

      {/* 13 Patterns */}
      <Page n={13} kicker="08 · Patterns & motifs" title="Patterns & motifs">
        <div className="bp-motifs">
          <div>
            <div className="kira-band" style={{ height: 40, backgroundSize: 'auto 40px', borderRadius: 6 }} />
            <h3>Kira weave band</h3>
            <p>Inspired by hand-woven kira and gho cloth. Used as a trim at the top of the footer, on labels and on cards. Never as a full background.</p>
          </div>
          <div>
            <PrayerFlags count={10} />
            <h3>Lungta prayer flags</h3>
            <p>Always in their traditional order: <strong>blue</strong> (sky), <strong>white</strong> (air), <strong>red</strong> (fire), <strong>green</strong> (water), <strong>yellow</strong> (earth). Used gently, as decoration, never with text printed on them.</p>
          </div>
          <div>
            <div className="bp-terraces">{['#9BD45A', '#5DB045', '#2E8B3E', '#1B6B34'].map((c) => <span key={c} style={{ background: c }} />)}</div>
            <h3>Terraces</h3>
            <p>Curved bands stepping down a hill, as in the logo. Used in the website hero, season scenes and dividers.</p>
          </div>
          <div>
            <div className="bp-icons">{['sprout', 'sickle', 'leaf', 'basket', 'truck', 'home', 'pot', 'pin', 'phone', 'chat'].map((n) => <span key={n}><Icon name={n} size={26} /></span>)}</div>
            <h3>Icons</h3>
            <p>Simple line icons with round ends, 1.8 px stroke, in charcoal or cream. Always paired with a text label.</p>
          </div>
        </div>
      </Page>

      {/* 14 UI */}
      <Page n={14} kicker="09 · Interface" title="Interface elements & motion">
        <div className="bp-cols">
          <div>
            <h3>Buttons</h3>
            <div className="bp-ui-row">
              <span className="btn btn--primary">Make an Enquiry</span>
              <span className="btn btn--saffron">Explore Products</span>
              <span className="btn btn--ghost">Meet Our Farmers</span>
            </div>
            <p>Fully rounded pills, at least 44 px tall so they are easy to tap. One main action per screen.</p>
            <h3>Badges</h3>
            <div className="bp-ui-row"><span className="badge badge--in">In season</span><span className="badge badge--soon">Coming soon</span><span className="badge badge--out">Out of season</span></div>
            <h3>Cards</h3>
            <p>Cream cards with a 2 px charcoal outline and a solid offset shadow in a brand colour, like a printed sticker. Corners are 28 px round.</p>
            <div className="bp-card-demo"><div><strong>Paro Red Rice</strong><small>Paro · Nu. 110 per kg</small></div></div>
          </div>
          <div>
            <h3>Motion principles</h3>
            <ul className="bp-list">
              <li><strong>Purposeful:</strong> movement explains or guides, never distracts.</li>
              <li><strong>Gentle and quick:</strong> 0.2–0.8 seconds, soft easing.</li>
              <li><strong>Smooth on cheap phones:</strong> only movement and fading are animated.</li>
              <li><strong>Respectful:</strong> if a visitor turns on “reduce motion”, all movement stops.</li>
            </ul>
            <h3>Signature moments</h3>
            <ul className="bp-list">
              <li>The hero landscape moves gently with the mouse and scroll.</li>
              <li>Headlines rise word by word; cards tilt towards the cursor.</li>
              <li>A kira-patterned curtain lifts between pages.</li>
              <li>The farmer's season story changes scene as you scroll: prepare, plant, tend, harvest.</li>
            </ul>
          </div>
        </div>
      </Page>

      {/* 15 Social */}
      <Page n={15} kicker="10 · Social media" title="Social media">
        <div className="bp-social">
          <div><SocialPost variant="type" /><p><strong>Brand post</strong>Big serif line + Dzongkha greeting on saffron.</p></div>
          <div><SocialPost variant="product" /><p><strong>Seasonal product</strong>Illustration + cream label with season and order day.</p></div>
          <div><SocialPost variant="farmer" /><p><strong>Farmer story</strong>Portrait + short quote on chilli red. Name and valley always shown.</p></div>
        </div>
        <ul className="bp-list bp-list--inline">
          <li>Square 1080 × 1080 posts, 1080 × 1920 stories.</li>
          <li>Logo icon in a corner, never covering the subject.</li>
          <li>One message per post, in simple words.</li>
          <li>Captions: English first, a Dzongkha greeting where it fits.</li>
        </ul>
        <div className="bp-handles"><span>Facebook · Instagram · TikTok</span><strong>@drukharvest</strong><small>Profile picture: the app icon (D on cream). Cover image: terraces illustration with the full logo.</small></div>
      </Page>

      {/* 16 Print */}
      <Page n={16} kicker="11 · Print & packaging" title="Print & packaging">
        <div className="bp-print">
          <div className="biz-card">
            <div className="biz-card__front"><Logo reversed size={34} /><div className="kira-band kira-band--thin" /></div>
            <div className="biz-card__back"><strong>Yangchen</strong><span>Chief Executive Officer</span><span>+975 17 00 00 00</span><span>hello@drukharvest.example</span></div>
            <p className="bp-cap"><strong>Business card</strong> 85 × 55 mm. Chilli red front with the reversed logo, cream back with name and contact.</p>
          </div>
          <div className="label-tag">
            <div className="label-tag__inner">
              <LogoMark size={40} />
              <strong>Paro Red Rice</strong>
              <span>Grown by Aum Pem Zam · Shaba, Paro</span>
              <span>Harvested Oct 2026 · 1 kg</span>
              <div className="kira-band kira-band--thin" />
            </div>
            <p className="bp-cap"><strong>Product label</strong> Always shows product, farmer, valley, harvest month and weight, so buyers know exactly where it came from.</p>
          </div>
          <div className="bag">
            <div className="bag__body"><LogoMark size={70} reversed /><strong>From Bhutanese farms<br />to your table.</strong></div>
            <p className="bp-cap"><strong>Delivery bag</strong> Saffron bag, Forest Deep handle, logo and our promise in the middle.</p>
          </div>
        </div>
      </Page>

      {/* 17 Website */}
      <Page n={17} kicker="12 · The website" title="The website">
        <div className="bp-cols">
          <div>
            <h3>Sitemap</h3>
            <div className="bp-sitemap">
              <span className="bp-sitemap__root">Home</span>
              <div>
                {[['Our Story'], ['Products', 'Product detail'], ['Farmers', 'Farmer profile'], ['How It Works'], ['Recipes', 'Recipe / story'], ['Contact', 'Household · Business · Supplier'], ['Brand guide']].map(([p, c]) => (
                  <div key={p}><span>{p}</span>{c && <small>{c}</small>}</div>
                ))}
              </div>
            </div>
            <p className="bp-note">“Make an Enquiry” is always one click away: in the header on desktop and in a sticky bar on phones.</p>
          </div>
          <div>
            <h3>How the brand comes through</h3>
            <ul className="bp-list">
              <li><strong>Farmers first:</strong> real faces (illustrated), villages and quotes before product grids.</li>
              <li><strong>Seasonal:</strong> every product shows its months and an “In season” badge that updates itself.</li>
              <li><strong>Honest:</strong> origin on every product; a “What we won't claim” section on the home page.</li>
              <li><strong>Bhutanese:</strong> prices in Nu., +975 numbers, dzongkhag names, Dzongkha greetings, gho and kira.</li>
              <li><strong>Fast & accessible:</strong> works from 320 px phones to large screens, keyboard friendly, readable contrast.</li>
            </ul>
          </div>
        </div>
      </Page>

      {/* 18 Claims + files */}
      <Page n={18} kicker="13 · Honesty & files" title="Claims we make, and don't" tone="dark">
        <div className="bp-cols">
          <div>
            <div className="bp-claims">
              <div><h3>Safe to say</h3><p>grown locally · sourced from small farms · grown in [valley] · in season · traditional · handmade locally · “We work directly with farmers.”</p></div>
              <div><h3>Never say (unless proven on the site)</h3><p>organic / certified organic · pesticide-free / chemical-free · eco-friendly / sustainable / carbon neutral · fair-trade · “best”, “purest”, “healthiest” · made-up impact numbers · health or medical claims</p></div>
            </div>
            <p className="bp-note bp-note--light">Farmer names, quotes, prices and figures in our materials are illustrative until real farmers give consent.</p>
          </div>
          <div>
            <h3>Logo files (brand-assets folder)</h3>
            <table className="bp-table bp-table--dark">
              <tbody>
                {[
                  ['druk-harvest-logo-full-colour.png', 'Slides & documents on light backgrounds'],
                  ['druk-harvest-logo-reversed.png', 'Slides on dark backgrounds'],
                  ['druk-harvest-logo-one-colour.png', 'Single-colour print, stamps'],
                  ['druk-harvest-logo-white.png', 'On photos or strong colours'],
                  ['druk-harvest-icon.png / .svg', 'Icon only, transparent'],
                  ['druk-harvest-icon-reversed.png / .svg', 'Icon for dark backgrounds'],
                  ['druk-harvest-app-icon.png', 'Social avatar, app icon (cream tile)'],
                ].map(([f, u]) => <tr key={f}><td><code>{f}</code></td><td>{u}</td></tr>)}
              </tbody>
            </table>
            <p className="bp-thanks"><span className="dz" lang="dz">བཀའ་དྲིན་ཆེ་ལགས།</span> Kadrinchey la. Thank you for keeping Druk Harvest consistent.</p>
          </div>
        </div>
      </Page>
    </div>
  );
}
