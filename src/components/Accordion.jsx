import { useId, useState } from 'react';
import Icon from '../illustrations/Icon.jsx';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
            <h3 className="accordion__h">
              <button
                id={`${uid}-b-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="accordion__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="accordion__q">{it.q}</span>
                <span className="accordion__icon"><Icon name="plus" size={20} /></span>
              </button>
            </h3>
            <div id={`${uid}-p-${i}`} role="region" aria-labelledby={`${uid}-b-${i}`} className="accordion__panel">
              <div><p>{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
