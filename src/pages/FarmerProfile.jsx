import { Link, useParams } from 'react-router-dom';
import Portrait from '../illustrations/Portrait.jsx';
import Icon from '../illustrations/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SeasonStory from '../components/SeasonStory.jsx';
import { Breadcrumbs, SectionHead } from '../components/Bits.jsx';
import { farmerById, farmers, productById } from '../lib/data.js';
import useMeta from '../hooks/useMeta.js';
import NotFound from './NotFound.jsx';

export default function FarmerProfile() {
  const { id } = useParams();
  const farmer = farmerById(id);
  useMeta(farmer?.name ?? 'Farmer not found', farmer?.short);
  if (!farmer) return <NotFound />;

  const idx = farmers.indexOf(farmer);
  const next = farmers[(idx + 1) % farmers.length];
  const grown = farmer.grows.map(productById).filter(Boolean);

  return (
    <>
      <section className="profile-hero" style={{ '--tone': farmer.palette[0], '--tone2': farmer.palette[1] }} data-spotlight>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Farmers', to: '/farmers' }, { label: farmer.name }]} />
          <div className="profile-hero__grid">
            <Reveal variant="curtain" className="profile-hero__portrait"><Portrait farmer={farmer} /></Reveal>
            <div>
              <Reveal as="p" className="kicker kicker--light"><Icon name="pin" size={16} /> {farmer.village}</Reveal>
              <Reveal as="h1" delay={1}>{farmer.name}</Reveal>
              <Reveal as="p" delay={2} className="profile-hero__short">{farmer.short}</Reveal>
              <Reveal as="blockquote" delay={3} className="profile-hero__quote">“{farmer.quote}”</Reveal>
              <Reveal as="p" delay={4} className="profile-hero__note">Illustrative profile for a design project.</Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section profile-story">
        <div className="container profile-story__grid">
          {[['A day in the life', farmer.day, 'sun'], ['How they farm', farmer.method, 'sprout'], ['What makes them proud', farmer.pride, 'heart']].map(([h, t, ic], i) => (
            <Reveal key={h} delay={i} className="profile-story__card">
              <span className="profile-story__icon"><Icon name={ic} size={28} /></span>
              <h2>{h}</h2>
              <p>{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <SeasonStory farmer={farmer} />

      <section className="section">
        <div className="container">
          <SectionHead kicker="From this farm" title={`What ${farmer.name.replace(/^(Aum|Ap) /, '').split(' ')[0]} supplies`} />
          <div className="p-grid">
            {grown.map((p, i) => <Reveal key={p.id} delay={i % 3}><ProductCard product={p} /></Reveal>)}
          </div>
          <Reveal className="profile-next">
            <Link to={`/farmers/${next.id}`} data-magnetic className="btn btn--ghost btn--lg">Next farmer: {next.name} <Icon name="arrow" size={20} /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
