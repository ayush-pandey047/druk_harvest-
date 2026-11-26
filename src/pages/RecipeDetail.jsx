import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import ProductArt from '../illustrations/ProductArt.jsx';
import Icon from '../illustrations/Icon.jsx';
import { Breadcrumbs } from '../components/Bits.jsx';
import { productById, recipeById, recipes } from '../lib/data.js';
import { useBasket } from '../hooks/useBasket.jsx';
import useMeta from '../hooks/useMeta.js';
import NotFound from './NotFound.jsx';

export default function RecipeDetail() {
  const { id } = useParams();
  const r = recipeById(id);
  const { add } = useBasket();
  useMeta(r?.title ?? 'Not found', r?.summary);
  if (!r) return <NotFound />;
  const used = r.products.map(productById).filter(Boolean);
  const more = recipes.filter((x) => x.id !== r.id).slice(0, 3);

  return (
    <>
      <article className="recipe">
        <header className="recipe__hero">
          <div className="container recipe__hero-grid">
            <div>
              <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Recipes', to: '/recipes' }, { label: r.title }]} />
              <Reveal as="h1" delay={1}>{r.title}</Reveal>
              <Reveal as="p" delay={2} className="recipe__summary">{r.summary}</Reveal>
              <Reveal delay={3} className="recipe__meta">
                <span><Icon name="clock" size={18} /> {r.time}</span>
                {r.serves && <span><Icon name="pot" size={18} /> Serves {r.serves}</span>}
              </Reveal>
            </div>
            <Reveal variant="scale" delay={1} className="recipe__art"><ProductArt kind={r.art} label={`Illustration: ${r.title}`} /></Reveal>
          </div>
        </header>

        <div className="container recipe__grid">
          <aside className="recipe__side">
            {r.ingredients && (
              <Reveal className="recipe__ingredients">
                <h2>Ingredients</h2>
                <ul>{r.ingredients.map((x) => <li key={x}>{x}</li>)}</ul>
              </Reveal>
            )}
            <Reveal delay={1} className="recipe__shop">
              <h2>{r.type === 'recipe' ? 'From our farms' : 'Mentioned here'}</h2>
              <ul>
                {used.map((p) => (
                  <li key={p.id}>
                    <Link to={`/products?item=${p.id}`}><ProductArt kind={p.art} /><span>{p.name}<small>{p.origin}</small></span></Link>
                  </li>
                ))}
              </ul>
              <button className="btn btn--primary btn--grow" onClick={() => used.forEach((p) => add(p.id))}>
                Add all to enquiry <Icon name="basket" size={20} />
              </button>
            </Reveal>
          </aside>
          <div className="recipe__main">
            {r.steps ? (
              <>
                <h2>Method</h2>
                <ol className="recipe__steps">
                  {r.steps.map((s, i) => <Reveal as="li" key={i} delay={i % 2}><span>{i + 1}</span><p>{s}</p></Reveal>)}
                </ol>
              </>
            ) : (
              <div className="recipe__body">{r.body.map((p, i) => <Reveal as="p" key={i}>{p}</Reveal>)}</div>
            )}
            <p className="fine">Stories and people mentioned are illustrative.</p>
          </div>
        </div>
      </article>

      <section className="section--tight more-recipes">
        <div className="container">
          <h2>Keep reading</h2>
          <div className="r-grid r-grid--small">
            {more.map((x) => (
              <Link key={x.id} to={`/recipes/${x.id}`} className="r-card" data-cursor="Read">
                <div className="r-card__art"><ProductArt kind={x.art} /></div>
                <div className="r-card__body"><h3>{x.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
