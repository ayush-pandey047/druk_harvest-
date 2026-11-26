import { useEffect } from 'react';

export default function useMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · Druk Harvest` : 'Druk Harvest — From Bhutanese farms to your table';
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
