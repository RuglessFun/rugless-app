'use client';
import { useEffect, useState } from 'react';
import { project } from '@/lib/projection';
export function BuybackModel() {
  const [quote, setQuote] = useState<{ price: number; fetchedAt: string } | null>(null),
    [error, setError] = useState(''),
    [launches, setLaunches] = useState(10),
    [percentile, setPercentile] = useState(50),
    [cumulative, setCumulative] = useState(false),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function update() {
      try {
        const response = await fetch('/api/sol-price', { signal: controller.signal });
        if (!response.ok) throw Error('Quote unavailable');
        const result = await response.json();
        if (!controller.signal.aborted) {
          setQuote(result);
          setError('');
        }
      } catch {
        if (!controller.signal.aborted) setError('Live SOL quote unavailable. Retry to update.');
      }
    }
    void update();
    const timer = setInterval(() => {
      if (!document.hidden) void update();
    }, 60_000);
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, [retry]);
  const model = quote ? project(launches, percentile, quote.price) : null,
    values = model ? (cumulative ? model.cumulative : model.daily) : [],
    max = Math.max(...values, 1) * 1.15;
  const points = values.map((v, i) => `${40 + (i / 89) * 900},${250 - (v / max) * 210}`).join(' ');
  return (
    <section className="panel projection">
      <div className="flow-intro">
        <div>
          <p className="eyebrow">Small fees. More communities. A growing fire.</p>
          <h2>See how it adds up.</h2>
        </div>
        <p>
          An illustrative 90-day model. Change the launch rate and active-token volume to explore
          the effect on buyback spending.
        </p>
      </div>
      <div className="model-controls">
        <label>
          Launches per day <strong>{launches}</strong>
          <input
            aria-label="Launches per day"
            type="range"
            min="1"
            max="50"
            value={launches}
            onChange={(e) => setLaunches(Number(e.target.value))}
          />
        </label>
        <label>
          Active-token volume percentile <strong>P{percentile}</strong>
          <input
            aria-label="Volume percentile"
            type="range"
            min="5"
            max="95"
            value={percentile}
            onChange={(e) => setPercentile(Number(e.target.value))}
          />
        </label>
        <div>
          <small>Current SOL / USD</small>
          <strong>{quote ? `$${quote.price.toFixed(2)}` : '—'}</strong>
          <button onClick={() => setRetry((n) => n + 1)}>Refresh quote ↻</button>
        </div>
      </div>
      <p className="model-status">
        {error ||
          (quote
            ? `Coinbase spot · fetched ${new Date(quote.fetchedAt).toLocaleTimeString()} · refreshes every minute`
            : 'Fetching SOL price…')}
      </p>
      <div className="chart-toolbar">
        <button aria-pressed={!cumulative} onClick={() => setCumulative(false)}>
          Daily buybacks
        </button>
        <button aria-pressed={cumulative} onClick={() => setCumulative(true)}>
          Cumulative buybacks
        </button>
        <span>SOL · modeled spending</span>
      </div>
      <svg
        viewBox="0 0 980 290"
        role="img"
        aria-label={`${cumulative ? 'Cumulative' : 'Daily'} modeled buyback spending over 90 days`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1="40" x2="940" y1={250 - i * 52.5} y2={250 - i * 52.5} stroke="#252a34" />
            <text x="30" y={254 - i * 52.5} textAnchor="end" fill="#87967c" fontSize="10">
              {((max * i) / 4).toFixed(0)}
            </text>
          </g>
        ))}
        {model && (
          <>
            <polygon points={`40,250 ${points} 940,250`} fill="#b9ff6630" />
            <polyline points={points} fill="none" stroke="#b9ff66" strokeWidth="2" />
          </>
        )}
        {[1, 30, 60, 90].map((day) => (
          <text
            key={day}
            x={40 + ((day - 1) / 89) * 900}
            y="280"
            textAnchor={day === 1 ? 'start' : day === 90 ? 'end' : 'middle'}
            fill="#87967c"
            fontSize="11"
          >
            Day {day}
          </text>
        ))}
      </svg>
      <div className="model-totals">
        <div>
          <small>Day 90 buyback spending</small>
          <strong>{model ? model.daily[89].toFixed(2) : '—'} SOL/day</strong>
        </div>
        <div>
          <small>90-day cumulative spending</small>
          <strong>{model ? model.total.toFixed(2) : '—'} SOL</strong>
        </div>
        <div>
          <small>Modeled launches</small>
          <strong>{launches * 90}</strong>
        </div>
      </div>
      <details>
        <summary>Read the assumptions</summary>
        <p>
          Low-volume launches start at $10k/day. Active-token volume follows a lognormal
          distribution with P5 $10k and P95 $10m (selected:{' '}
          {model ? `$${Math.round(model.initialUsd).toLocaleString()}` : '—'}). Assumed 2.69% active
          launches, 0.3% / 0.95% captured creator fees, 1% execution costs; activity decays over
          time. Launch count is an input, not a claim about pool funding capacity. Supporting
          existing tokens does not automatically create extra revenue in this model. Rates and
          outcomes can differ materially. This is not a price or return forecast.
        </p>
      </details>
    </section>
  );
}
