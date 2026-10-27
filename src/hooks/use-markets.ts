'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MarketResponse } from '@/lib/types';
export function useMarkets() {
  const [data, setData] = useState<MarketResponse | null>(null),
    [error, setError] = useState<string | null>(null),
    [loading, setLoading] = useState(true);
  const active = useRef<AbortController | null>(null);
  const refresh = useCallback(async () => {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setLoading(true);
    try {
      const response = await fetch('/api/markets', { signal: controller.signal });
      if (!response.ok) throw Error('Market data unavailable. Retry to update.');
      const next = (await response.json()) as MarketResponse;
      if (!controller.signal.aborted) {
        setData(next);
        setError(null);
      }
    } catch (e) {
      if (!controller.signal.aborted)
        setError(e instanceof Error ? e.message : 'Market data unavailable.');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
    const timer = setInterval(() => {
      if (!document.hidden) void refresh();
    }, 60_000);
    return () => {
      clearInterval(timer);
      active.current?.abort();
    };
  }, [refresh]);
  const stale = data && Date.now() - Date.parse(data.fetchedAt) > 180_000;
  return {
    data,
    error: error || (stale ? 'Market snapshot is stale. Retry to update.' : null),
    loading,
    refresh,
  };
}
