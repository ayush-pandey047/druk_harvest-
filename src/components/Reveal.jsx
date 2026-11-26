import { useEffect, useRef } from 'react';

let observer;
function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        // Also reveal anything already scrolled past (fast flings, anchor jumps)
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  return observer;
}

/** Fades and rises its children into view once. `delay` is a stagger index (× 80ms). */
export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className = '', style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el) return;
    if (!io) { el.classList.add('is-visible'); return; }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return (
    <Tag ref={ref} data-reveal={variant} className={className} style={{ '--d': `${delay * 80}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
