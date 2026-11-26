import { useId, useRef } from 'react';

/** ARIA tabs with arrow-key support. `tabs` = [{ id, label, content }] */
export default function Tabs({ tabs, value, onChange, label, className = '' }) {
  const uid = useId();
  const list = useRef(null);
  const onKey = (e) => {
    const i = tabs.findIndex((t) => t.id === value);
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = tabs.length - 1;
    if (n === null) return;
    e.preventDefault();
    onChange(tabs[n].id);
    list.current?.querySelectorAll('[role="tab"]')[n]?.focus();
  };
  const active = tabs.findIndex((t) => t.id === value);
  return (
    <div className={`tabs ${className}`}>
      <div className="tabs__list" role="tablist" aria-label={label} ref={list} onKeyDown={onKey} style={{ '--n': tabs.length, '--a': active }}>
        <span className="tabs__ink" aria-hidden="true" />
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`${uid}-t-${t.id}`}
            aria-selected={t.id === value}
            aria-controls={`${uid}-p-${t.id}`}
            tabIndex={t.id === value ? 0 : -1}
            className="tabs__tab"
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => t.content !== undefined && (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-p-${t.id}`}
          aria-labelledby={`${uid}-t-${t.id}`}
          hidden={t.id !== value}
          className="tabs__panel"
          tabIndex={0}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
