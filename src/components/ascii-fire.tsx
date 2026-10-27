'use client';
import { useEffect, useRef, useState } from 'react';
/** Original Rugless heat-grid renderer, migrated from the marketing site. */
export function AsciiFire() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const node = canvas.current,
      ctx = node?.getContext('2d');
    if (!node || !ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let cols = 0,
      rows = 0,
      width = 0,
      height = 0,
      cellWidth = 0,
      cellHeight = 0,
      heat = new Uint8Array(),
      frame = 0,
      last = 0,
      inView = true;
    const glyphs = ' .:-=+*#%@';
    const bands = [
      { min: 31, color: '#ecedf0', alpha: 0.6 },
      { min: 24, color: '#b9ff66', alpha: 0.9 },
      { min: 17, color: '#b9ff66', alpha: 0.66 },
      { min: 10, color: '#b9ff66', alpha: 0.44 },
      { min: 5, color: '#b9ff66', alpha: 0.24 },
      { min: 1, color: '#b9ff66', alpha: 0.1 },
    ];
    function step(now: number) {
      const time = now * 0.001,
        cooling = 36 / Math.max(4, rows * 0.78);
      for (let col = 0; col < cols; col++) {
        const wave =
          0.5 +
          0.25 * Math.sin(col * 0.11 + time * 0.9) +
          0.25 * Math.sin(col * 0.037 - time * 0.55);
        heat[(rows - 1) * cols + col] = Math.max(
          0,
          Math.min(36, Math.round(36 * (0.45 + 0.55 * wave) - (Math.random() < 0.15 ? 8 : 0))),
        );
      }
      for (let row = 1; row < rows; row++)
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col,
            target = index - cols + 1 - Math.floor(Math.random() * 3);
          if (target >= 0)
            heat[target] = Math.max(0, heat[index] - Math.floor(Math.random() * cooling * 2.2));
        }
    }
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      bands.forEach((band, i) => {
        ctx.fillStyle = band.color;
        ctx.globalAlpha = band.alpha;
        const upper = i === 0 ? 37 : bands[i - 1].min;
        for (let row = 0; row < rows; row++) {
          let line = '',
            ink = false;
          for (let col = 0; col < cols; col++) {
            const v = heat[row * cols + col];
            if (v >= band.min && v < upper) {
              line += glyphs[Math.min(9, Math.round((v / 36) * 9))];
              ink = true;
            } else line += ' ';
          }
          if (ink) ctx.fillText(line, -cellWidth, row * cellHeight);
        }
      });
      ctx.globalAlpha = 1;
    }
    function resize() {
      if (!node || !ctx) return;
      const rect = node.getBoundingClientRect(),
        dpr = Math.min(2, devicePixelRatio || 1),
        fontSize = rect.width < 640 ? 10 : 12;
      width = rect.width;
      height = rect.height;
      node.width = Math.round(width * dpr);
      node.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px ${getComputedStyle(node).fontFamily}`;
      ctx.textBaseline = 'top';
      cellWidth = ctx.measureText('M').width;
      cellHeight = fontSize * 1.12;
      cols = Math.ceil(width / cellWidth) + 2;
      rows = Math.ceil(height / cellHeight);
      heat = new Uint8Array(cols * rows);
      for (let i = 0; i < rows * 3; i++) step(5000);
      draw();
    }
    function loop(now: number) {
      if (paused || reduced.matches || document.hidden || !inView) return;
      if (now - last >= 40) {
        step(now);
        draw();
        last = now;
      }
      frame = requestAnimationFrame(loop);
    }
    function sync() {
      cancelAnimationFrame(frame);
      if (!paused && !reduced.matches && !document.hidden && inView)
        frame = requestAnimationFrame(loop);
    }
    const resizeObserver = new ResizeObserver(resize),
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
      });
    resizeObserver.observe(node);
    observer.observe(node);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    resize();
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
    };
  }, [paused]);
  return (
    <div className="fire-wrap">
      <canvas ref={canvas} aria-hidden="true" />
      <button onClick={() => setPaused((x) => !x)} aria-pressed={paused}>
        {paused ? '▶ Play fire' : 'Ⅱ Pause fire'}
      </button>
    </div>
  );
}
