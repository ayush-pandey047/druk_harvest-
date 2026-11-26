import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import Icon from '../illustrations/Icon.jsx';
import PrayerFlags from '../illustrations/PrayerFlags.jsx';
import SeasonScene from '../illustrations/SeasonScene.jsx';
import { SectionHead } from '../components/Bits.jsx';
import useMeta from '../hooks/useMeta.js';

const TIMELINE = [
  { year: '2023', title: 'An idea at the weekend market', text: 'Over tea at the Thimphu weekend market, a few friends kept hearing the same thing from farmers: good harvests, but no steady way to reach buyers.' },
  { year: '2024', title: 'The first five farms', text: 'We started with a rice farmer in Paro, a chilli grower in Punakha and three more families. Every week, one pickup truck, one route.' },
  { year: '2025', title: 'The first kitchens', text: 'Households in Thimphu signed up for weekly deliveries, and a few hotel kitchens began planning menus around what was in season.' },
  { year: 'Today', title: 'Growing slowly, on purpose', text: 'We add new farms only when we can buy from them reliably. Better to keep a promise to a few than break it for many.' },
];

const VALUES = [
  { title: 'Freshness', text: 'Picked close to delivery, never left sitting.', icon: 'leaf', tone: 'green' },
  { title: 'Honesty', text: 'We say what we know, and admit what we don\'t.', icon: 'check', tone: 'lapis' },
  { title: 'Community', text: 'Farmers are partners, not suppliers on a spreadsheet.', icon: 'handshake', tone: 'chilli' },
  { title: 'Dependability', text: 'Fixed days, clear prices, no surprises.', icon: 'clock', tone: 'saffron' },
];

const TEAM = [
  { name: 'Yangchen', role: 'Chief Executive Officer', text: 'Sets the direction and keeps every promise we make to farmers and families.', tone: '#D7322A', icon: 'sprout', photo: 'yangchen' },
  { name: 'Choekey', role: 'Administration', text: 'Runs the day-to-day: supplier agreements, schedules and the paperwork that keeps us dependable.', tone: '#2440A6', icon: 'list', photo: 'choekey' },
  { name: 'Avinash', role: 'Marketing', text: 'Tells the farmers\' stories and makes sure people across Bhutan know where to find local food.', tone: '#FF7A1A', icon: 'heart', photo: 'avinash' },
  { name: 'Ayush', role: 'IT & Technology', text: 'Builds and looks after the website, the enquiry system and everything digital.', tone: '#0FA3A0', icon: 'check', photo: 'ayush' },
];

export default function OurStory() {
  useMeta('Our Story', 'Why Druk Harvest exists: a dependable way for small Bhutanese farmers to reach families and kitchens.');
  return (
    <>
      <section className="story-hero">
        <div className="story-hero__art" aria-hidden="true"><SeasonScene stage="harvest" /></div>
        <div className="container story-hero__inner">
          <Reveal as="p" className="kicker">Our story</Reveal>
          <Reveal as="h1" delay={1}>Rooted in Bhutan. <em>Fresh to your table.</em></Reveal>
        </div>
      </section>

      <section className="section mission">
        <div className="container mission__grid">
          <Reveal className="mission__label"><p className="kicker">Our mission</p></Reveal>
          <Reveal delay={1}>
            <p className="mission__text">To make local food easier to find, and to give farming communities a <mark className="hl hl--saffron">dependable way</mark> to reach customers.</p>
            <p className="mission__sub">Bhutan grows extraordinary food: red rice on the Paro terraces, buckwheat in Bumthang, chillies drying on Punakha rooftops. But a farmer two valleys away and a family in Thimphu rarely meet. We are the bit in between, and we try to stay out of the way.</p>
          </Reveal>
        </div>
      </section>

      <section className="section timeline-sec">
        <div className="container">
          <SectionHead kicker="How it started" title="A short, honest timeline." />
          <ol className="timeline">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i % 2} className="timeline__item">
                <span className="timeline__year">{t.year}</span>
                <div><h3>{t.title}</h3><p>{t.text}</p></div>
              </Reveal>
            ))}
          </ol>
          <p className="fine">Timeline is illustrative for a design project.</p>
        </div>
      </section>

      <section className="section values">
        <PrayerFlags count={16} className="values__flags" />
        <div className="container">
          <SectionHead kicker="What we value" title="Four things we won't trade away." align="center" />
          <div className="values__grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i} className={`value value--${v.tone}`} data-spotlight>
                <Icon name={v.icon} size={36} />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-sec">
        <div className="container">
          <Reveal as="blockquote" className="big-quote">
            <p><span className="big-quote__mark">“</span>When a farmer knows their rice will be bought every season, they can plan. They can mend the terrace walls. They can teach their children. That's the whole idea.<span className="big-quote__mark">”</span></p>
            <footer>The Druk Harvest team</footer>
          </Reveal>
        </div>
      </section>

      <section className="section team">
        <div className="container">
          <SectionHead kicker="The team" title="The people behind Druk Harvest.">Four of us, each looking after one part of the journey from farm to table.</SectionHead>
          <div className="team__grid">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i} className="team__card" style={{ '--tone': m.tone }} data-spotlight>
                <div className="team__photo">
                  <img src={`${import.meta.env.BASE_URL}team/${m.photo}.jpg`} alt={`${m.name}, ${m.role}`} width="560" height="700" loading="lazy" decoding="async" />
                  <i aria-hidden="true"><Icon name={m.icon} size={18} /></i>
                </div>
                <p className="team__role">{m.role}</p>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="center-cta"><Link to="/farmers" className="btn btn--primary btn--lg" data-magnetic>Meet our farmers <Icon name="arrow" size={20} /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
