import ProductArt from '../illustrations/ProductArt.jsx';

/** Three illustrated tiles that float in a page hero. Decorative only. */
export default function HeroCollage({ kinds }) {
  return (
    <div className="collage" aria-hidden="true">
      {kinds.map((k, i) => (
        <div key={k} className="collage__tile" style={{ '--i': i }}><ProductArt kind={k} /></div>
      ))}
    </div>
  );
}
