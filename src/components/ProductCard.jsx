import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductArt from '../illustrations/ProductArt.jsx';
import Icon from '../illustrations/Icon.jsx';
import { SeasonBadge } from './Bits.jsx';
import { seasonLabel } from '../lib/season.js';
import { formatNu } from '../lib/data.js';
import { useBasket } from '../hooks/useBasket.jsx';
import useTilt from '../hooks/useTilt.js';

export default function ProductCard({ product, onOpen, style }) {
  const ref = useRef(null);
  const { add, has } = useBasket();
  useTilt(ref, 7);
  const inList = has(product.id);
  const href = `/products?item=${product.id}`;

  return (
    <article ref={ref} className="p-card" style={style} data-id={product.id}>
      <Link
        to={href}
        className="p-card__media"
        data-cursor="View"
        onClick={(e) => { if (onOpen) { e.preventDefault(); onOpen(product.id); } }}
        aria-label={`${product.name}, view details`}
      >
        <ProductArt kind={product.art} />
        <span className="p-card__sheen" aria-hidden="true" />
        <span className="p-card__badge"><SeasonBadge product={product} /></span>
      </Link>
      <div className="p-card__body">
        <p className="p-card__origin"><Icon name="pin" size={15} /> {product.origin}</p>
        <h3 className="p-card__title">
          <Link to={href} onClick={(e) => { if (onOpen) { e.preventDefault(); onOpen(product.id); } }}>{product.name}</Link>
        </h3>
        <p className="p-card__local">{product.local}</p>
        <p className="p-card__desc">{product.description}</p>
        <div className="p-card__foot">
          <span className="p-card__price"><strong>{formatNu(product.price)}</strong> <small>{product.unit}</small></span>
          <button
            className={`icon-btn${inList ? ' is-added' : ''}`}
            onClick={() => add(product.id)}
            aria-label={`Add ${product.name} to enquiry`}
            title="Add to enquiry"
          >
            <Icon name={inList ? 'check' : 'plus'} size={20} />
          </button>
        </div>
        <p className="p-card__season">{seasonLabel(product.seasonMonths)}</p>
      </div>
    </article>
  );
}
