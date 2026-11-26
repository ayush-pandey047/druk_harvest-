import { useState } from 'react';
import FarmerCard from '../components/FarmerCard.jsx';
import SeasonStory from '../components/SeasonStory.jsx';
import Reveal from '../components/Reveal.jsx';
import { SectionHead } from '../components/Bits.jsx';
import BhutanMap from '../illustrations/BhutanMap.jsx';
import { farmers } from '../lib/data.js';
import useMeta from '../hooks/useMeta.js';

export default function Farmers() {
  useMeta('Farmer Stories', 'Meet the small Bhutanese farmers, beekeepers and cheese-makers behind Druk Harvest.');
  const [hover, setHover] = useState(null);
  return (
    <>
      <section className="page-hero page-hero--farmers grain">
        <div className="container page-hero__split">
          <div>
            <Reveal as="p" className="kicker kicker--light">Farmer stories</Reveal>
            <Reveal as="h1" delay={1}>The people <em>behind the food.</em></Reveal>
            <Reveal as="p" delay={2} className="page-hero__lede">
              Rice farmers in Paro, a beekeeper in Bumthang, a cheese-maker in Haa. Their work is the reason any of this exists, so we start with them.
            </Reveal>
          </div>
          <Reveal delay={2} className="farmers-map">
            <BhutanMap
              highlight={hover}
              pins={farmers.map((f) => ({ district: f.district, label: f.name.replace(/^(Aum|Ap) /, ''), to: `/farmers/${f.id}`, color: f.palette[0] }))}
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Our producers" title="Five farms, five valleys.">
            Each profile is illustrative for now. We'll only share real names, photos and stories with each family's permission.
          </SectionHead>
          <div className="f-grid">
            {farmers.map((f, i) => (
              <Reveal key={f.id} delay={i % 3} onPointerEnter={() => setHover(f.district)} onPointerLeave={() => setHover(null)}>
                <FarmerCard farmer={f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SeasonStory farmer={farmers[0]} />
    </>
  );
}
