import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import HeroCollage from '../components/HeroCollage.jsx';
import Icon from '../illustrations/Icon.jsx';
import ProductArt from '../illustrations/ProductArt.jsx';
import BhutanMap from '../illustrations/BhutanMap.jsx';
import { CONTACT, DELIVERY, productById } from '../lib/data.js';
import { useBasket } from '../hooks/useBasket.jsx';
import useMeta from '../hooks/useMeta.js';

const TYPES = [
  { id: 'customer', label: 'Household', hint: 'Fresh food for your family' },
  { id: 'business', label: 'Business', hint: 'Hotels, restaurants, shops' },
  { id: 'supplier', label: 'Farmer / Supplier', hint: 'Sell through Druk Harvest' },
];
const AREAS = ['Thimphu', 'Paro', 'Punakha', 'Wangdue Phodrang', 'Somewhere else'];

const empty = { name: '', phone: '', email: '', area: '', contact: 'phone', notes: '', business: '', grows: '' };

function validate(v, type) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please tell us your name.';
  const digits = v.phone.replace(/[^\d]/g, '').replace(/^975/, '');
  if (!v.phone.trim() && !v.email.trim()) e.phone = 'Please give us a phone number or an email, so we can reach you.';
  else if (v.phone.trim() && !/^(16|17|77)\d{6}$|^\d{8}$/.test(digits)) e.phone = 'That doesn\'t look like a Bhutanese number. Try 8 digits, like 17 12 34 56.';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please check the email address. It needs an @ and a domain.';
  if (v.contact === 'email' && !v.email.trim()) e.email = 'You chose email as your contact method, so we need an address.';
  if (!v.area) e.area = type === 'supplier' ? 'Please choose the area closest to your farm.' : 'Please choose your delivery area.';
  if (type === 'business' && !v.business.trim()) e.business = 'Please tell us the name of your business.';
  if (type === 'supplier' && v.grows.trim().length < 3) e.grows = 'Tell us a little about what you grow. Simple words are fine.';
  return e;
}

function messageText(v, type, items) {
  const lines = [`Kuzuzangpo la! New ${TYPES.find((t) => t.id === type).label.toLowerCase()} enquiry from ${v.name}.`];
  if (v.business) lines.push(`Business: ${v.business}`);
  if (v.grows) lines.push(`Grows: ${v.grows}`);
  if (items.length) lines.push('Products:', ...items.map((i) => `- ${productById(i.id).name} × ${i.qty} (${productById(i.id).unit})`));
  lines.push(`Area: ${v.area}`, `Phone: ${v.phone || '-'}`, `Email: ${v.email || '-'}`, `Contact by: ${v.contact}`);
  if (v.notes) lines.push(`Notes: ${v.notes}`);
  return lines.join('\n');
}

function Field({ id, label, error, hint, optional, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}{optional && <span className="field__opt"> (optional)</span>}</label>
      {hint && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {children}
      {error && <p className="field__error" id={`${id}-error`} role="alert"><Icon name="close" size={14} strokeWidth={2.4} /> {error}</p>}
    </div>
  );
}

export default function Contact() {
  useMeta('Contact & Enquiry', 'Send an enquiry to Druk Harvest as a household, business or farmer. We confirm availability, price and delivery.');
  const [params] = useSearchParams();
  const initial = TYPES.some((t) => t.id === params.get('type')) ? params.get('type') : 'customer';
  const [type, setType] = useState(initial);
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);
  const form = useRef(null);
  const { items, setQty, remove, clear } = useBasket();

  const update = (k) => (e) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (touched[k]) setErrors(validate(next, type));
  };
  const blur = (k) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(v, type)); };
  const err = (k) => (touched[k] ? errors[k] : undefined);
  const aria = (k, hint) => ({
    'aria-invalid': !!err(k),
    'aria-describedby': [err(k) && `${k}-error`, hint && `${k}-hint`].filter(Boolean).join(' ') || undefined,
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(v, type);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    const first = Object.keys(found)[0];
    if (first) { form.current?.querySelector(`#${first}`)?.focus(); return; }
    setSending(true);
    // Frontend only: no server. Build the message so it can be sent by WhatsApp or email.
    setTimeout(() => {
      setDone({ text: messageText(v, type, type === 'supplier' ? [] : items), name: v.name.split(' ')[0], contact: v.contact });
      if (type !== 'supplier') clear();
      setSending(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  if (done) {
    const enc = encodeURIComponent(done.text);
    return (
      <section className="success section">
        <div className="container success__inner">
          <svg className="success__tick" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" />
            <path d="M36 62l16 16 32-36" />
          </svg>
          <h1>Kadrinchey la, {done.name}!</h1>
          <p className="success__lede">Thank you. We have received your enquiry and will contact you to confirm availability and delivery.</p>
          <ol className="success__next">
            <li><span>1</span><div><strong>We check with the farms</strong><p>Usually the same day. Harvests change, so we confirm what's really there.</p></div></li>
            <li><span>2</span><div><strong>We {done.contact === 'email' ? 'email' : done.contact === 'whatsapp' ? 'message' : 'call'} you</strong><p>With the final price, quantities and your delivery day.</p></div></li>
            <li><span>3</span><div><strong>Your food arrives</strong><p>Pay cash on delivery or by mobile banking once it's with you.</p></div></li>
          </ol>
          <div className="success__send">
            <p>Want to make sure it reaches us right away?</p>
            <a className="btn btn--whatsapp" href={`https://wa.me/${CONTACT.whatsapp}?text=${enc}`} target="_blank" rel="noopener"><Icon name="chat" size={20} /> Send on WhatsApp</a>
            <a className="btn btn--ghost" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Druk Harvest enquiry')}&body=${enc}`}><Icon name="mail" size={20} /> Send by email</a>
          </div>
          <Link to="/products" className="link-arrow">Back to products <Icon name="arrow" size={20} /></Link>
          <p className="fine">This is a frontend prototype. No data has been sent to a server.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero page-hero--contact">
        <div className="container page-hero__inner page-hero__inner--art">
          <Reveal as="p" className="kicker">Contact & enquiry</Reveal>
          <Reveal as="h1" delay={1}>Tell us what <em>you need.</em></Reveal>
          <Reveal as="p" delay={2} className="page-hero__lede">Nothing is charged online. We'll get back to you to confirm what's fresh, the price and a delivery day.</Reveal>
          <HeroCollage kinds={['datshi', 'peach', 'rice']} />
        </div>
      </section>

      <section className="section--tight contact">
        <div className="container contact__grid">
          <form ref={form} className="enquiry" onSubmit={submit} noValidate aria-labelledby="enquiry-title">
            <h2 id="enquiry-title" className="visually-hidden">Enquiry form</h2>

            <fieldset className="type-pick">
              <legend>I'm enquiring as a…</legend>
              <div className="type-pick__opts">
                {TYPES.map((t) => (
                  <label key={t.id} className={`type-pick__opt${type === t.id ? ' is-on' : ''}`}>
                    <input type="radio" name="type" value={t.id} checked={type === t.id} onChange={() => { setType(t.id); setErrors({}); setTouched({}); }} />
                    <strong>{t.label}</strong>
                    <small>{t.hint}</small>
                  </label>
                ))}
              </div>
            </fieldset>

            {type !== 'supplier' && (
              <div className="basket">
                <div className="basket__head">
                  <h3>Your enquiry list</h3>
                  {items.length > 0 && <Link to="/products" className="link-btn">Add more</Link>}
                </div>
                {items.length ? (
                  <ul className="basket__list">
                    {items.map((i) => {
                      const p = productById(i.id);
                      return (
                        <li key={i.id}>
                          <ProductArt kind={p.art} />
                          <div className="basket__info"><strong>{p.name}</strong><small>{p.unit}</small></div>
                          <div className="stepper stepper--sm" role="group" aria-label={`Quantity of ${p.name}`}>
                            <button type="button" onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease"><Icon name="minus" size={16} /></button>
                            <output>{i.qty}</output>
                            <button type="button" onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase"><Icon name="plus" size={16} /></button>
                          </div>
                          <button type="button" className="icon-btn icon-btn--sm" onClick={() => remove(i.id)} aria-label={`Remove ${p.name}`}><Icon name="close" size={16} /></button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="basket__empty">Your enquiry list is empty. <Link to="/products">Browse our products</Link> and add what you like, or just describe what you need below.</p>
                )}
              </div>
            )}

            <div className="enquiry__fields">
              <Field id="name" label="Your name" error={err('name')}>
                <input id="name" autoComplete="name" value={v.name} onChange={update('name')} onBlur={blur('name')} {...aria('name')} />
              </Field>
              {type === 'business' && (
                <Field id="business" label="Business name" error={err('business')}>
                  <input id="business" autoComplete="organization" value={v.business} onChange={update('business')} onBlur={blur('business')} {...aria('business')} />
                </Field>
              )}
              <Field id="phone" label="Phone / WhatsApp" hint="8 digits, e.g. 17 12 34 56" error={err('phone')}>
                <div className="input-prefix"><span>+975</span>
                  <input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={v.phone} onChange={update('phone')} onBlur={blur('phone')} {...aria('phone', true)} />
                </div>
              </Field>
              <Field id="email" label="Email" optional error={err('email')}>
                <input id="email" type="email" autoComplete="email" value={v.email} onChange={update('email')} onBlur={blur('email')} {...aria('email')} />
              </Field>
              <Field id="area" label={type === 'supplier' ? 'Where is your farm?' : 'Delivery area'} error={err('area')}>
                <select id="area" value={v.area} onChange={update('area')} onBlur={blur('area')} {...aria('area')}>
                  <option value="">Choose…</option>
                  {(type === 'supplier' ? ['Haa', 'Paro', 'Thimphu', 'Punakha', 'Wangdue Phodrang', 'Bumthang', 'Trongsa', 'Tsirang', 'Mongar', 'Other'] : AREAS).map((a) => <option key={a}>{a}</option>)}
                </select>
              </Field>
              {type === 'supplier' && (
                <Field id="grows" label="What do you grow or make?" hint="For example: red rice, about 500 kg a year" error={err('grows')}>
                  <textarea id="grows" rows="3" value={v.grows} onChange={update('grows')} onBlur={blur('grows')} {...aria('grows', true)} />
                </Field>
              )}
              <fieldset className="field field--radios">
                <legend>How should we contact you?</legend>
                <div className="radios">
                  {[['phone', 'Phone call'], ['whatsapp', 'WhatsApp'], ['email', 'Email']].map(([val, l]) => (
                    <label key={val} className={`radio${v.contact === val ? ' is-on' : ''}`}>
                      <input type="radio" name="contact" value={val} checked={v.contact === val} onChange={update('contact')} /> {l}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field id="notes" label={type === 'business' ? 'Quantities & schedule' : 'Anything else?'} optional>
                <textarea id="notes" rows="4" value={v.notes} onChange={update('notes')} placeholder={type === 'business' ? 'e.g. 20 kg red rice and 10 kg greens every Tuesday' : 'Preferred delivery day, questions…'} />
              </Field>
            </div>

            <button className={`btn btn--primary btn--lg btn--grow${sending ? ' is-loading' : ''}`} disabled={sending} data-magnetic>
              {sending ? <><span className="spinner" aria-hidden="true" /> Sending…</> : <>Send enquiry <Icon name="arrow" size={20} /></>}
            </button>
            <p className="fine">Frontend prototype: your details stay in this browser. Nothing is sent to a server.</p>
          </form>

          <aside className="contact__side">
            <Reveal className="contact__card contact__card--dark" data-spotlight>
              <h2>Rather just talk?</h2>
              <ul className="contact__list">
                <li><Icon name="phone" /><div><small>Call</small><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></div></li>
                <li><Icon name="chat" /><div><small>WhatsApp</small><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener">Message us</a></div></li>
                <li><Icon name="mail" /><div><small>Email</small><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div></li>
                <li><Icon name="clock" /><div><small>Hours</small><span>Mon–Sat, 9 am – 6 pm</span></div></li>
                <li><Icon name="pin" /><div><small>Office</small><a href={CONTACT.mapHref} target="_blank" rel="noopener noreferrer">{CONTACT.address}</a></div></li>
              </ul>
              <p className="fine fine--light">Phone and email are placeholders.</p>
            </Reveal>
            <Reveal delay={1} className="contact__card">
              <h2>Where we deliver</h2>
              <BhutanMap className="bt-map--small" pins={[{ district: 'Thimphu', label: 'Thimphu', color: '#D7322A' }, { district: 'Paro', label: 'Paro', color: '#2440A6' }, { district: 'Punakha', label: 'Punakha', color: '#0FA3A0' }]} />
              <ul className="contact__delivery">
                {DELIVERY.map((d) => <li key={d.area}><strong>{d.area}</strong><span>{d.days}</span></li>)}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
