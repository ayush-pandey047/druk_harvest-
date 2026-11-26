import { useEffect, useRef, useState } from 'react';
import SeasonScene from '../illustrations/SeasonScene.jsx';

const STAGES = [
  { id: 'prepare', label: 'Prepare' },
  { id: 'plant', label: 'Plant' },
  { id: 'tend', label: 'Tend' },
  { id: 'harvest', label: 'Harvest' },
];

/** "A Season With …": sticky scene that cross-fades as each step scrolls past the middle of the screen. */
export default function SeasonStory({ farmer }) {
  const [active, setActive] = useState(0);
  const steps = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(+e.target.dataset.i); }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  const first = farmer.name.replace(/^(Aum|Ap) /, '').split(' ')[0];

  return (
    <section className="season-story" aria-labelledby="season-title">
      <div className="container season-story__grid">
        <div className="season-story__stage">
          <div className="season-story__frame">
            {STAGES.map((s, i) => (
              <div key={s.id} className={`season-story__scene${active === i ? ' is-active' : ''}`}>
                <SeasonScene stage={s.id} />
              </div>
            ))}
            <ol className="season-story__dots" aria-hidden="true">
              {STAGES.map((s, i) => <li key={s.id} className={active === i ? 'is-active' : ''}>{s.label}</li>)}
            </ol>
          </div>
        </div>
        <div className="season-story__text">
          <p className="kicker">A season with</p>
          <h2 id="season-title">{first}</h2>
          {STAGES.map((s, i) => (
            <div key={s.id} ref={(el) => (steps.current[i] = el)} data-i={i} className={`season-story__step${active === i ? ' is-active' : ''}`}>
              <span className="season-story__num">0{i + 1}</span>
              <h3>{s.label}</h3>
              <p>{farmer.season[s.id]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
