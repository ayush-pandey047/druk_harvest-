import { Link } from 'react-router-dom';
import SeasonScene from '../illustrations/SeasonScene.jsx';
import useMeta from '../hooks/useMeta.js';

export default function NotFound() {
  useMeta('Page not found');
  return (
    <section className="not-found">
      <div className="not-found__art" aria-hidden="true"><SeasonScene stage="prepare" /></div>
      <div className="container not-found__inner">
        <p className="kicker">404</p>
        <h1>This field is still <em>being ploughed.</em></h1>
        <p>The page you're looking for isn't here. Let's get you back to something fresh.</p>
        <div className="hero__ctas">
          <Link to="/" className="btn btn--primary btn--lg" data-magnetic>Back home</Link>
          <Link to="/products" className="btn btn--ghost btn--lg" data-magnetic>Browse products</Link>
        </div>
      </div>
    </section>
  );
}
