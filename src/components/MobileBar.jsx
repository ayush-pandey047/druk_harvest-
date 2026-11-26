import { Link, useLocation } from 'react-router-dom';
import Icon from '../illustrations/Icon.jsx';
import { useBasket } from '../hooks/useBasket.jsx';

export default function MobileBar() {
  const { count } = useBasket();
  const { pathname } = useLocation();
  if (pathname.startsWith('/contact')) return null;
  return (
    <div className="mobile-bar">
      <Link to="/products" className="mobile-bar__browse"><Icon name="basket" size={20} /> Browse</Link>
      <Link to="/contact" className="btn btn--primary mobile-bar__cta">
        Make an Enquiry {count > 0 && <span className="count">{count}</span>}
      </Link>
    </div>
  );
}
