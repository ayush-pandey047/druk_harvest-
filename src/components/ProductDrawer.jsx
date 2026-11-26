import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import ProductArt from '../illustrations/ProductArt.jsx';
import Icon from '../illustrations/Icon.jsx';
import { Breadcrumbs, SeasonBadge, SeasonBar } from './Bits.jsx';
import { farmerById, formatNu, recipeById } from '../lib/data.js';
import { seasonLabel } from '../lib/season.js';
import { useBasket } from '../hooks/useBasket.jsx';

export default function ProductDrawer({ product, onClose }) {
  const ref = useRef(null);
  const [qty, setQty] = useState(1);
  const [closing, setClosing] = useState(false);
  const { add } = useBasket();
  const farmer = product && farmerById(product.farmerId);
  const recipe = product?.recipeId && recipeById(product.recipeId);

  const close = () => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 320);
  };

  useEffect(() => {
    if (!product) return;
    setQty(1);
    const prev = document.activeElement;
    document.body.classList.add('is-locked');
    ref.current?.querySelector('.drawer__close')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') return;
      const f = [...ref.current.querySelectorAll('a, button, input')];
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('is-locked'); document.removeEventListener('keydown', onKey); prev?.focus?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) return null;

  return createPortal(
    <div className={`drawer${closing ? ' is-closing' : ''}`}>
      <div className="drawer__overlay" onClick={close} />
      <aside ref={ref} className="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer__top">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: product.name }]} />
          <button className="icon-btn drawer__close" onClick={close} aria-label="Close details"><Icon name="close" /></button>
        </div>
        <div className="drawer__art"><ProductArt kind={product.art} label={`Illustration of ${product.name}`} /></div>
        <div className="drawer__body">
          <SeasonBadge product={product} />
          <h2 id="drawer-title">{product.name}</h2>
          <p className="drawer__local"><span>Local name</span> {product.local}</p>
          <p className="drawer__desc">{product.description}</p>

          <dl className="drawer__facts">
            <div><dt>Grown in</dt><dd>{product.origin}</dd></div>
            {farmer && <div><dt>Grown by</dt><dd><Link to={`/farmers/${farmer.id}`}>{farmer.name}</Link></dd></div>}
            <div><dt>Indicative price</dt><dd>{formatNu(product.price)} {product.unit}</dd></div>
            <div><dt>For businesses</dt><dd>{product.businessAvailable ? 'Yes, bulk on request' : 'Household quantities only'}</dd></div>
          </dl>

          <h3 className="drawer__h">When it's available <small>{seasonLabel(product.seasonMonths)}</small></h3>
          <SeasonBar months={product.seasonMonths} />

          <div className="drawer__tip">
            <Icon name="leaf" size={20} />
            <p><strong>Storage tip.</strong> {product.storage}</p>
          </div>
          {recipe && (
            <Link to={`/recipes/${recipe.id}`} className="drawer__recipe">
              <ProductArt kind={recipe.art} />
              <span><small>Cook with it</small>{recipe.title}</span>
              <Icon name="arrow" />
            </Link>
          )}
        </div>
        <div className="drawer__actions">
          <div className="stepper" role="group" aria-label="Quantity">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><Icon name="minus" size={18} /></button>
            <output aria-live="polite">{qty}</output>
            <button onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity"><Icon name="plus" size={18} /></button>
          </div>
          <button className="btn btn--primary btn--grow" onClick={() => add(product.id, qty)}>
            Add to enquiry <Icon name="basket" size={20} />
          </button>
        </div>
        <p className="drawer__note">Prices are indicative and illustrative. We confirm the final price with you before delivery.</p>
      </aside>
    </div>,
    document.body
  );
}
