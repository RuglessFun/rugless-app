'use client';
import { useEffect, useState } from 'react';
export function useWatchlist() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    try {
      const v: unknown = JSON.parse(localStorage.getItem('rugless-watchlist') || '[]');
      if (Array.isArray(v)) setSaved(v.filter((s): s is string => typeof s === 'string'));
    } catch {}
  }, []);
  function toggle(mint: string) {
    setSaved((current) => {
      const next = current.includes(mint) ? current.filter((x) => x !== mint) : [...current, mint];
      try {
        localStorage.setItem('rugless-watchlist', JSON.stringify(next));
      } catch {}
      return next;
    });
  }
  return { saved, toggle };
}
