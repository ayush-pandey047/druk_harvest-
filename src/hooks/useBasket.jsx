import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { productById } from '../lib/data.js';

const KEY = 'druk-harvest:enquiry';
const BasketContext = createContext(null);

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => productById(i.id)) : [];
  } catch {
    return [];
  }
}

export function BasketProvider({ children }) {
  const [items, setItems] = useState(load);
  const [toast, setToast] = useState(null);
  const [bump, setBump] = useState(0);
  const timer = useRef();

  useEffect(() => {
    try { window.localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  }, [items]);

  const showToast = useCallback((message) => {
    clearTimeout(timer.current);
    setToast({ message, key: Date.now() });
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const add = useCallback((id, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
      return [...prev, { id, qty }];
    });
    setBump((b) => b + 1);
    showToast(`${productById(id)?.name ?? 'Item'} added to your enquiry list`);
  }, [showToast]);

  const setQty = useCallback((id, qty) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i))));
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);
  const has = useCallback((id) => items.some((i) => i.id === id), [items]);

  const value = useMemo(() => ({
    items, add, setQty, remove, clear, has, bump, toast, dismissToast: () => setToast(null),
    count: items.reduce((n, i) => n + i.qty, 0),
  }), [items, add, setQty, remove, clear, has, bump, toast]);

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export const useBasket = () => useContext(BasketContext);
