import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LogoMark } from '../illustrations/Logo.jsx';

const TONES = ['#0F3B27', '#D7322A', '#2440A6', '#0FA3A0', '#FF7A1A'];

/** A woven-edge curtain that lifts off the new page on every route change. */
export default function Curtain() {
  const { pathname } = useLocation();
  const [run, setRun] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setRun((n) => n + 1);
  }, [pathname]);

  if (!run) return null;
  return (
    <div key={run} className="curtain" style={{ '--tone': TONES[run % TONES.length] }} aria-hidden="true">
      <div className="curtain__mark"><LogoMark size={56} reversed /></div>
      <div className="curtain__edge kira-band" />
    </div>
  );
}
