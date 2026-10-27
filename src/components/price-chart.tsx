'use client';
import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  type UTCTimestamp,
} from 'lightweight-charts';
import { intervals, type Interval, type Candle, type Token } from '@/lib/types';
export function PriceChart({ token }: { token: Token }) {
  const container = useRef<HTMLDivElement>(null),
    [interval, setIntervalValue] = useState<Interval>('5m'),
    [error, setError] = useState(''),
    [loading, setLoading] = useState(true),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!container.current) return;
    let disposed = false;
    let controller: AbortController | undefined;
    const chart = createChart(container.current, {
      autoSize: true,
      height: 440,
      layout: {
        background: { type: ColorType.Solid, color: '#0c1017' },
        textColor: '#99a1af',
        fontFamily: 'monospace',
      },
      grid: { vertLines: { color: '#1c222d' }, horzLines: { color: '#1c222d' } },
      rightPriceScale: { borderColor: '#252a34' },
      timeScale: { borderColor: '#252a34', timeVisible: true },
      crosshair: { mode: 0 },
    });
    const candles = chart.addSeries(CandlestickSeries, {
      upColor: '#b9ff66',
      downColor: '#ff626f',
      borderVisible: false,
      wickUpColor: '#b9ff66',
      wickDownColor: '#ff626f',
      priceFormat: { type: 'price', precision: 8, minMove: 0.00000001 },
    });
    const volume = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });
    volume.priceScale().applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });
    candles.priceScale().applyOptions({ scaleMargins: { top: 0.08, bottom: 0.2 } });
    let first = true;
    async function update() {
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch(`/api/tokens/${token.mint}/candles?interval=${interval}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw Error('Chart data is temporarily unavailable.');
        const payload = await response.json();
        const rows = payload.candles as Candle[];
        if (!rows?.length) throw Error('No candles available for this interval.');
        if (disposed) return;
        candles.setData(rows.map((c) => ({ ...c, time: c.time as UTCTimestamp })));
        volume.setData(
          rows.map((c) => ({
            time: c.time as UTCTimestamp,
            value: c.volume,
            color: c.close >= c.open ? '#b9ff6640' : '#ff626f50',
          })),
        );
        if (first) {
          chart.timeScale().fitContent();
          first = false;
        }
        setError('');
      } catch (e) {
        if (!disposed && !controller?.signal.aborted)
          setError(e instanceof Error ? e.message : 'Chart unavailable.');
      } finally {
        if (!disposed) setLoading(false);
      }
    }
    setLoading(true);
    setError('');
    void update();
    const timer = window.setInterval(() => {
      if (!document.hidden) void update();
    }, 60_000);
    return () => {
      disposed = true;
      controller?.abort();
      clearInterval(timer);
      chart.remove();
    };
  }, [token.mint, interval, retry]);
  return (
    <section className="panel chart-panel">
      <div className="chart-toolbar">
        <strong>${token.symbol} / USD</strong>
        <div>
          {intervals.map((value) => (
            <button
              key={value}
              onClick={() => setIntervalValue(value)}
              aria-pressed={interval === value}
            >
              {value}
            </button>
          ))}
        </div>
        <span>Price · Volume</span>
      </div>
      <div className="chart-canvas" ref={container} />
      {loading && <p className="chart-message">Loading candles…</p>}
      {error && (
        <p className="chart-message negative">
          {error} <button onClick={() => setRetry((x) => x + 1)}>Retry</button>
        </p>
      )}
      <div className="chart-credit">
        <span>PumpSwap · actual OHLCV · updates every 60s</span>
        <a href="https://www.tradingview.com/" target="_blank" rel="noreferrer">
          Charts by TradingView ↗
        </a>
      </div>
    </section>
  );
}
