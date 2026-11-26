import { Link } from 'react-router-dom';
import Logo from '../illustrations/Logo.jsx';
import Icon from '../illustrations/Icon.jsx';
import { NAV } from './Header.jsx';
import { CONTACT, DELIVERY } from '../lib/data.js';

export default function Footer() {
  return (
    <footer className="footer" data-spotlight>
      <div className="kira-band" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo reversed size={44} />
          <p>Seasonal food from small Bhutanese farms, brought to kitchens in Thimphu, Paro and Punakha.</p>
          <p className="footer__dz"><span className="dz" lang="dz">བཀའ་དྲིན་ཆེ་ལགས།</span> <span>Kadrinchey la, thank you for buying local.</span></p>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer__h">Explore</h2>
          <ul>
            {NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
            <li><Link to="/brand">Brand guide</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="footer__h">Talk to us</h2>
          <ul className="footer__contact">
            <li><Icon name="phone" size={18} /><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
            <li><Icon name="chat" size={18} /><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><Icon name="mail" size={18} /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><Icon name="pin" size={18} /><a href={CONTACT.mapHref} target="_blank" rel="noopener noreferrer">{CONTACT.address}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="footer__h">Delivery days</h2>
          <ul className="footer__delivery">
            {DELIVERY.map((d) => <li key={d.area}><strong>{d.area}</strong><span>{d.days}</span></li>)}
          </ul>
          <div className="footer__social" aria-label="Social links (placeholders)">
            <a href="#" aria-label="Facebook (placeholder)">Fb</a>
            <a href="#" aria-label="Instagram (placeholder)">Ig</a>
            <a href="#" aria-label="TikTok (placeholder)">Tk</a>
          </div>
        </div>
      </div>
      <div className="container footer__base">
        <p className="footer__honest"><strong>Honest sourcing.</strong> We tell you where your food comes from, who grew it and when it is in season. We only make claims we can stand behind.</p>
        <p className="footer__note">Farmer names, quotes, prices and figures on this site are illustrative for a design project. Phone and email are placeholders.</p>
        <p className="footer__copy">© {new Date().getFullYear()} Druk Harvest · Thimphu, Bhutan</p>
      </div>
    </footer>
  );
}
