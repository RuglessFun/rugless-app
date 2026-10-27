'use client';
import { useEffect, useRef, useState } from 'react';
const closes = [5, 8, 62, 84, 65, 77, 52, 64, 92, 122, 109, 143, 126, 4, 6, 2, 2, 2];
const BUY_PRICE = 40;
export function RugChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0,
      started = 0,
      finished = false;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started || finished) return;
        if (reduced.matches) {
          setTime(18);
          finished = true;
          return;
        }
        started = performance.now();
        function tick(now: number) {
          const elapsed = (now - started) / 1300;
          setTime(Math.min(18, elapsed));
          if (elapsed < 18) frame = requestAnimationFrame(tick);
          else finished = true;
        }
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);
  const index = Math.min(17, Math.floor(time)),
    progress = time >= 18 ? 1 : time - index;
  const open = index ? closes[index - 1] : 3;
  const fraction = index === 13 ? Math.min(1, progress * 4) : progress;
  const wiggle =
    index >= 15
      ? 0
      : Math.sin(progress * 25) * Math.sin(progress * Math.PI) * (index === 13 ? 7 : 6);
  const price = Math.max(1, open + (closes[index] - open) * fraction + wiggle);
  const bought = time > 2.58;
  const value = (1000 * price) / BUY_PRICE,
    pnl = (price / BUY_PRICE - 1) * 100;
  const y = (p: number) => 275 - (p / 160) * 225;
  return (
    <div className="panel rug-chart" ref={ref}>
      <div className="chart-toolbar">
        <strong>THE ONE THAT GOT AWAY / SOL</strong>
        <span>Illustrative scenario</span>
      </div>
      <div className="position-readout">
        {bought ? (
          <>
            <small>Your position</small>
            <strong>
              ${value.toFixed(2)}{' '}
              <span className={pnl >= 0 ? 'positive' : 'negative'}>
                {pnl >= 0 ? '+' : ''}
                {pnl.toFixed(1)}%
              </span>
            </strong>
          </>
        ) : (
          <small>Watching the momentum…</small>
        )}
      </div>
      <svg
        viewBox="0 0 520 350"
        role="img"
        aria-label="Illustrative chart: two pumps followed by a rug pull, leaving the position near zero."
      >
        {[50, 100, 150, 200, 250].map((v) => (
          <line key={v} x1="15" x2="505" y1={v} y2={v} stroke="#252a34" />
        ))}
        {closes.slice(0, index + 1).map((target, i) => {
          const o = i ? closes[i - 1] : 3,
            c = i === index ? price : target,
            x = 25 + i * 26,
            up = c >= o,
            high = Math.max(o, c) + (i < 15 ? 8 : 0),
            low = Math.max(1, Math.min(o, c) - (i < 15 ? 5 : 0));
          const vol = i >= 15 ? 0 : i === 13 ? 42 : i === 2 ? 38 : 12 + Math.abs(c - o) * 0.4;
          return (
            <g key={i} fill={up ? '#b9ff66' : '#ff626f'}>
              <line x1={x} x2={x} y1={y(high)} y2={y(low)} stroke={up ? '#b9ff66' : '#ff626f'} />
              <rect
                x={x - 7}
                y={y(Math.max(o, c))}
                width="14"
                height={Math.max(1, Math.abs(y(o) - y(c)))}
              />
              <rect x={x - 7} y={335 - vol} width="14" height={vol} opacity=".35" />
            </g>
          );
        })}
        <line
          x1="15"
          x2="505"
          y1={y(price)}
          y2={y(price)}
          stroke={index >= 13 ? '#ff626f' : '#b9ff66'}
          strokeDasharray="3 5"
        />
        {bought && (
          <g>
            <circle cx="77" cy={y(BUY_PRICE) - 18} r="10" fill="#b9ff66" />
            <text x="77" y={y(BUY_PRICE) - 14} textAnchor="middle" fill="#0b1406" fontSize="15">
              +
            </text>
            <text x="94" y={y(BUY_PRICE) - 14} fill="#b9ff66" fontSize="10">
              YOU BOUGHT
            </text>
          </g>
        )}
        {time >= 16 && (
          <text x="490" y="225" textAnchor="end" fill="#ff626f" fontSize="16">
            RUGGED.
          </text>
        )}
      </svg>
      <p>Illustration only. No real token or trade. Animation plays once.</p>
    </div>
  );
}
