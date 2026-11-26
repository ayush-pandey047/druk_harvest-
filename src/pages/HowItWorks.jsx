import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Tabs from '../components/Tabs.jsx';
import Accordion from '../components/Accordion.jsx';
import Reveal from '../components/Reveal.jsx';
import HeroCollage from '../components/HeroCollage.jsx';
import Icon from '../illustrations/Icon.jsx';
import { SectionHead } from '../components/Bits.jsx';
import { DELIVERY, faq } from '../lib/data.js';
import useMeta from '../hooks/useMeta.js';

const FLOWS = {
  customers: {
    label: 'Customers',
    cta: { to: '/products', text: 'Start browsing' },
    steps: [
      ['search', 'Browse', 'Look through what\'s in season and add what you like to your enquiry list.'],
      ['mail', 'Send an enquiry', 'Tell us your area and how you\'d like us to contact you. It takes two minutes.'],
      ['phone', 'We confirm', 'We call or message to confirm availability, the final price and your delivery day.'],
      ['basket', 'Receive your produce', 'Your order arrives on the agreed day. Pay cash on delivery or by mobile banking.'],
    ],
  },
  businesses: {
    label: 'Businesses',
    cta: { to: '/contact?type=business', text: 'Send a business enquiry' },
    steps: [
      ['list', 'Share your needs', 'Tell us roughly what your kitchen or shop uses each week, and when.'],
      ['leaf', 'Receive a supply plan', 'We match your list against what our farmers expect to harvest, and flag anything seasonal.'],
      ['truck', 'Regular deliveries', 'Fixed delivery days, a named contact, and early warning if a harvest falls short.'],
    ],
  },
  farmers: {
    label: 'Farmers',
    cta: { to: '/contact?type=supplier', text: 'Tell us what you grow' },
    steps: [
      ['sprout', 'Tell us what you grow', 'Call, WhatsApp or fill in the form. Simple words are fine. We can also visit.'],
      ['scale', 'Talk quality & quantity', 'We visit your farm, see the produce and talk honestly about what we can buy.'],
      ['handshake', 'Agree fair terms', 'Price, pickup days and payment are agreed together and written down clearly.'],
      ['truck', 'Start supplying', 'We collect from your farm or a nearby point on a regular day.'],
    ],
  },
};

const CHECKS = [
  ['Freshness', 'Vegetables and fruit are checked on the day of pickup. Anything tired stays behind.'],
  ['Size & sorting', 'Produce is sorted so you get what you asked for: kitchen grade or table grade.'],
  ['Clean packing', 'Crates and baskets are washed between every use.'],
  ['Traceability', 'Every crate is marked with the farm and pickup date, so we can always trace it back.'],
];

export default function HowItWorks() {
  useMeta('How It Works', 'How ordering, supply and delivery work for households, businesses and farmers at Druk Harvest.');
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get('for') in FLOWS ? params.get('for') : 'customers');

  const tabs = Object.entries(FLOWS).map(([id, f]) => ({
    id,
    label: f.label,
    content: (
      <div className="flow" key={id}>
        <ol className="flow__steps">
          {f.steps.map(([icon, title, text], i) => (
            <li key={title} className="flow__step" style={{ '--i': i }}>
              <span className="flow__icon"><Icon name={icon} size={28} /></span>
              <span className="flow__num">Step {i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <Link to={f.cta.to} className="btn btn--primary btn--lg" data-magnetic>{f.cta.text} <Icon name="arrow" size={20} /></Link>
      </div>
    ),
  }));

  return (
    <>
      <section className="page-hero page-hero--how">
        <div className="container page-hero__inner page-hero__inner--art">
          <Reveal as="p" className="kicker">How it works</Reveal>
          <Reveal as="h1" delay={1}>Simple for you. <em>Fair for the farm.</em></Reveal>
          <Reveal as="p" delay={2} className="page-hero__lede">No online payments, no accounts. Just a clear conversation about what's fresh, what it costs and when it arrives.</Reveal>
          <HeroCollage kinds={['potato', 'apple', 'greens']} />
        </div>
      </section>

      <section className="section--tight how-tabs">
        <div className="container">
          <Tabs tabs={tabs} value={tab} onChange={setTab} label="Choose who you are" />
        </div>
      </section>

      <section className="section delivery">
        <div className="container delivery__grid">
          <div>
            <SectionHead kicker="Delivery" title="Fixed days, so you can plan.">
              These are our current routes. If you're outside them, ask anyway. We'll tell you honestly if we can reach you.
            </SectionHead>
          </div>
          <Reveal delay={1} className="delivery__table">
            <table>
              <thead><tr><th scope="col">Area</th><th scope="col">Delivery day</th><th scope="col">Order by</th></tr></thead>
              <tbody>
                {DELIVERY.map((d) => <tr key={d.area}><th scope="row">{d.area}</th><td>{d.days}</td><td>{d.note}</td></tr>)}
              </tbody>
            </table>
            <p className="fine">Delivery areas and times are placeholders.</p>
          </Reveal>
        </div>
      </section>

      <section className="section checks grain">
        <div className="container">
          <SectionHead kicker="Quality checks" title="What we look at before anything leaves the farm." />
          <div className="checks__grid">
            {CHECKS.map(([t, d], i) => (
              <Reveal key={t} delay={i} className="checks__card" data-spotlight>
                <span className="checks__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq">
        <div className="container faq__grid">
          <SectionHead kicker="Questions" title="Things people ask us.">
            Can't find yours? <Link to="/contact">Ask us directly.</Link>
          </SectionHead>
          <Reveal delay={1}><Accordion items={faq} /></Reveal>
        </div>
      </section>
    </>
  );
}
