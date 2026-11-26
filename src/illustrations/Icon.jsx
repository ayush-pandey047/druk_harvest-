const paths = {
  sprout: <><path d="M12 21v-8" /><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z" /><path d="M12 15c0-3.4-2.6-6-7-6 0 3.4 2.6 6 7 6z" /><path d="M7 21h10" /></>,
  sickle: <><path d="M5 19 9 15" /><path d="M9 15c-2-5 1-11 8-12-3 3-4 7-2 11" /><path d="M15 14c-1.6 1.2-4 1.6-6 1" /><path d="M3.5 20.5 5 19" /></>,
  check: <><circle cx="11" cy="11" r="6.5" /><path d="m8.5 11 1.8 1.8L14 9.2" /><path d="m16 16 4.5 4.5" /></>,
  basket: <><path d="M4 10h16l-1.6 9a2 2 0 0 1-2 1.6H7.6a2 2 0 0 1-2-1.6L4 10z" /><path d="M8 10 11 4M16 10l-3-6" /><path d="M9 14v3M12 14v3M15 14v3" /></>,
  truck: <><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3.5V16h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>,
  home: <><path d="M4 11 12 4l8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></>,
  pot: <><path d="M4 11h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-3z" /><path d="M2.5 11h19" /><path d="M9 7c0-1 1-1.5 1-2.5M13 7c0-1 1-1.5 1-2.5" /></>,
  hotel: <><path d="M4 21V5l8-2 8 2v16" /><path d="M9 21v-4h6v4" /><path d="M8 8h1M11.5 8h1M15 8h1M8 12h1M11.5 12h1M15 12h1" /></>,
  shop: <><path d="M4 9 5.5 4h13L20 9" /><path d="M4 9c0 1.7 1.3 3 3 3s2.7-1.3 2.7-3c0 1.7 1.3 3 2.3 3s2.3-1.3 2.3-3c0 1.7 1 3 2.7 3s3-1.3 3-3" /><path d="M5.5 12v8h13v-8" /><path d="M10 20v-4h4v4" /></>,
  leaf: <><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19 13 11" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <><path d="M5 12h14" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  phone: <><path d="M5 4h3l1.6 4-2 1.3a10 10 0 0 0 5.1 5.1L14 12.4l4 1.6v3a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  chat: <><path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7z" /><path d="M9 10.5c.5 1.8 2.2 3.5 4 4l1.2-1.2 1.8.8-.4 1.6c-3.6-.2-7-3.6-7.2-7.2L10 8.2l.8 1.8z" /></>,
  pin: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  filter: <><path d="M4 6h16M7 12h10M10 18h4" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h10" /></>,
  list: <><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></>,
  heart: <><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" /></>,
  handshake: <><path d="m3 11 4-4 4 2 2-1 4 1 4 4" /><path d="m7 7-1 6 5 5 2-1 4-3" /><path d="m11 13 2 2M13 11l2 2" /></>,
  scale: <><path d="M12 4v16M7 20h10" /><path d="M5 8h14" /><path d="m5 8-2.5 5a2.8 2.8 0 0 0 5 0zM19 8l-2.5 5a2.8 2.8 0 0 0 5 0z" /></>,
};

export default function Icon({ name, size = 24, className, strokeWidth = 1.8, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
    >
      {paths[name]}
    </svg>
  );
}
