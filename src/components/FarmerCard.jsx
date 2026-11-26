import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Portrait from '../illustrations/Portrait.jsx';
import Icon from '../illustrations/Icon.jsx';
import { productById } from '../lib/data.js';
import useTilt from '../hooks/useTilt.js';

export default function FarmerCard({ farmer }) {
  const ref = useRef(null);
  useTilt(ref, 6);
  return (
    <article ref={ref} className="f-card" style={{ '--tone': farmer.palette[0] }}>
      <Link to={`/farmers/${farmer.id}`} className="f-card__link" data-cursor="Meet">
        <div className="f-card__portrait"><Portrait farmer={farmer} /></div>
        <div className="f-card__body">
          <p className="f-card__place"><Icon name="pin" size={15} /> {farmer.village}</p>
          <h3>{farmer.name}</h3>
          <p>{farmer.short}</p>
          <ul className="f-card__grows">
            {farmer.grows.slice(0, 3).map((g) => <li key={g}>{productById(g)?.name}</li>)}
            {farmer.grows.length > 3 && <li>+{farmer.grows.length - 3} more</li>}
          </ul>
          <span className="f-card__more">Read their story <Icon name="arrow" size={18} /></span>
        </div>
        <span className="f-card__sheen" aria-hidden="true" />
      </Link>
    </article>
  );
}
