import { project } from '../projection';
import { createLifecycle } from './lifecycle';
export function mountOriginalHome(root) {
  const scope = createLifecycle(root);
  const document = scope.document;
  ('use strict');
  // Intentionally illustrative data. No production telemetry is connected.
  const previewStats = {
    all: {
      burned: '24,861,209',
      launches: '128',
      volume: '48,620',
      average: '379.84',
      mentions: '3,842',
    },
    day: {
      burned: '1,248,906',
      launches: '9',
      volume: '2,718',
      average: '302.00',
      mentions: '286',
    },
  };
  document.querySelectorAll('[data-period]').forEach((button) =>
    scope.listen(button, 'click', () => {
      document
        .querySelectorAll('[data-period]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      const stats = previewStats[button.dataset.period];
      document.querySelectorAll('.stats-grid [data-stat]').forEach((el) => {
        const key = el.dataset.stat;
        el.textContent = stats[key];
        if (key === 'volume' || key === 'average') {
          const unit = document.createElement('small');
          unit.textContent = ' SOL';
          el.append(unit);
        }
      });
    }),
  );

  // Expected-value cohort model: USD volume assumptions updated by the owner.
  // Low-volume tokens start at $10k/day; active P5=$10k, P95=$10m.
  // SOL spending is modeled; this does not model price or number of tokens burned.
  const model = { view: 'daily', state: null, price: null };
  const byId = (id) => document.getElementById(id);
  const fmt = (n, d = 2) =>
    n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  function showDay(day) {
    if (!model.state) return;
    const s = model.state,
      value =
        model.view === 'daily'
          ? s.daily[day]
          : s.daily.slice(0, day + 1).reduce((a, b) => a + b, 0);
    byId('model-readout').textContent =
      `Day ${day + 1} · ${fmt(value)} SOL ${model.view === 'daily' ? 'modeled buyback spending that day' : 'modeled cumulative buyback spending'} · ${s.tokens * (day + 1)} launches`;
    const cursor = byId('model-cursor');
    if (cursor) {
      const x = 56 + (day / 89) * ((model.chartWidth || 1000) - 72);
      cursor.setAttribute('x1', x);
      cursor.setAttribute('x2', x);
    }
  }
  function drawChart() {
    const s = model.state;
    if (!s) return;
    const cumulative = (arr) => {
      let total = 0;
      return arr.map((v) => (total += v));
    };
    const groups = model.view === 'daily' ? s.cohorts : s.cohorts.map(cumulative);
    const totals = Array.from({ length: 90 }, (_, day) =>
      groups.reduce((sum, c) => sum + c[day], 0),
    );
    const max = Math.max(...totals, 1) * 1.15;
    const chartWidth = Math.max(290, Math.round(byId('model-chart').getBoundingClientRect().width));
    model.chartWidth = chartWidth;
    byId('model-chart').setAttribute('viewBox', `0 0 ${chartWidth} 310`);
    const x = (d) => 56 + (d / 89) * (chartWidth - 72),
      y = (v) => 270 - (v / max) * 232;
    let html = `<title id="model-chart-title">${model.view === 'daily' ? 'Daily' : 'Cumulative'} modeled buyback spending over 90 days</title><desc id="model-chart-desc">Stacked fees from launches on days 1 to 30, 31 to 60 and 61 to 90. Scenario with ${s.tokens} launches per day. Total projected spending ${fmt(s.total)} SOL. Not a forecast.</desc>`;
    for (let tick = 0; tick <= 4; tick++) {
      let n = (max * tick) / 4,
        yy = y(n);
      html += `<line x1="56" x2="${chartWidth - 16}" y1="${yy}" y2="${yy}" stroke="#272c35"/><text x="46" y="${yy + 4}" text-anchor="end">${n >= 1000 ? fmt(n / 1000, 1) + 'k' : fmt(n, n < 10 ? 1 : 0)}</text>`;
    }
    html += `<text x="56" y="16">${model.view === 'daily' ? 'SOL / day' : 'Total SOL'}</text>`;
    let bottom = Array(90).fill(0);
    groups.forEach((group, i) => {
      const top = bottom.map((v, d) => v + group[d]);
      const points = top
        .map((n, d) => `${x(d)},${y(n)}`)
        .concat(bottom.map((n, d) => `${x(d)},${y(n)}`).reverse())
        .join(' ');
      html += `<polygon points="${points}" fill="${['#b9ff66', '#6caa55', '#365c42'][i]}" opacity=".82"/>`;
      bottom = top;
    });
    html += `<polyline points="${totals.map((n, d) => `${x(d)},${y(n)}`).join(' ')}" fill="none" stroke="#dcffb5" stroke-width="2"/><line id="model-cursor" x1="${chartWidth - 16}" x2="${chartWidth - 16}" y1="30" y2="270" stroke="#e4cdc0" stroke-dasharray="3 5" opacity=".5"/>`;
    [0, 29, 59, 89].forEach(
      (d) =>
        (html += `<text x="${x(d)}" y="298" text-anchor="${d === 0 ? 'start' : d === 89 ? 'end' : 'middle'}">Day ${d + 1}</text>`),
    );
    byId('model-chart').innerHTML = html;
    showDay(89);
  }
  function updateModel() {
    const tokens = Number(byId('model-tokens').value),
      percentile = Number(byId('model-percentile').value);
    byId('model-tokens-out').textContent = tokens;
    byId('model-percentile-out').textContent = 'P' + percentile;
    if (!model.price) return;
    const usdPerSol = model.price;
    model.state = project(tokens, percentile, usdPerSol);
    byId('model-tokens-out').textContent = tokens;
    byId('model-percentile-out').textContent = 'P' + percentile;
    byId('volume-assumption').textContent =
      '$' +
      fmt(model.state.initialUsd, 0) +
      ' / ' +
      fmt(model.state.initial, 0) +
      ' SOL first-day volume per active token.';
    byId('model-end').innerHTML = fmt(model.state.daily[89]) + ' <small>SOL/day</small>';
    byId('model-total').innerHTML = fmt(model.state.total) + ' <small>SOL</small>';
    byId('model-launches').textContent = fmt(tokens * 90, 0);
    byId('model-end-usd').textContent = '≈ $' + fmt(model.state.daily[89] * usdPerSol, 0) + '/day';
    byId('model-total-usd').textContent = '≈ $' + fmt(model.state.total * usdPerSol, 0);
    drawChart();
  }
  ['model-tokens', 'model-percentile'].forEach((id) =>
    scope.listen(byId(id), 'input', updateModel),
  );
  document.querySelectorAll('[data-chart]').forEach((button) =>
    scope.listen(button, 'click', () => {
      model.view = button.dataset.chart;
      document
        .querySelectorAll('[data-chart]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      byId('chart-heading').textContent =
        model.view === 'daily' ? 'Daily buyback spending' : 'Cumulative buyback spending';
      drawChart();
    }),
  );
  scope.listen(byId('model-chart'), 'pointermove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    showDay(
      Math.max(
        0,
        Math.min(
          89,
          Math.round(
            ((((e.clientX - rect.left) / rect.width) * model.chartWidth - 56) /
              (model.chartWidth - 72)) *
              89,
          ),
        ),
      ),
    );
  });
  scope.listen(byId('model-chart'), 'pointerleave', () => showDay(89));
  updateModel();
  new scope.ResizeObserver(drawChart).observe(byId('model-chart').parentElement);

  // Source inspection: Zipcoin's archived Hero module, chunk 0cp0dadsu3qhd.js,
  // capture 20261011072116. Recreated as a standalone heat-grid ASCII renderer.
  // No Zipcoin application code, APIs, branding, hidden overlay or burn data is loaded.
  (() => {
    const canvas = byId('fire'),
      ctx = canvas.getContext('2d');
    if (!ctx) return;
    const button = byId('fire-toggle'),
      reduced = matchMedia('(prefers-reduced-motion: reduce)'),
      glyphs = ' .:-=+*#%@';
    const bands = [
      { min: 31, color: '#ecedf0', alpha: 0.6 },
      { min: 24, color: '#b9ff66', alpha: 0.9 },
      { min: 17, color: '#b9ff66', alpha: 0.66 },
      { min: 10, color: '#b9ff66', alpha: 0.44 },
      { min: 5, color: '#b9ff66', alpha: 0.24 },
      { min: 1, color: '#b9ff66', alpha: 0.1 },
    ];
    let cols = 0,
      rows = 0,
      cellWidth = 0,
      cellHeight = 0,
      heat = new Uint8Array(),
      paused = false,
      inView = true,
      frame = 0,
      last = 0,
      width = 0,
      height = 0;
    const started = performance.now();
    function step(now) {
      const ramp = Math.min(1, (now - started) / 1400),
        time = now * 0.001,
        cooling = 36 / Math.max(4, rows * 0.78);
      for (let col = 0; col < cols; col++) {
        const wave =
          0.5 +
          0.25 * Math.sin(col * 0.11 + time * 0.9) +
          0.25 * Math.sin(col * 0.037 - time * 0.55);
        heat[(rows - 1) * cols + col] = Math.max(
          0,
          Math.min(
            36,
            Math.round(36 * ramp * (0.45 + 0.55 * wave) - (Math.random() < 0.15 ? 8 : 0)),
          ),
        );
      }
      for (let row = 1; row < rows; row++)
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col,
            target = index - cols + 1 - Math.floor(Math.random() * 3);
          if (target < 0) continue;
          heat[target] = Math.max(0, heat[index] - Math.floor(Math.random() * cooling * 2.2));
        }
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      bands.forEach((band, i) => {
        ctx.fillStyle = band.color;
        ctx.globalAlpha = band.alpha;
        const upper = i === 0 ? 37 : bands[i - 1].min;
        for (let row = 0; row < rows; row++) {
          let line = '',
            hasInk = false;
          for (let col = 0; col < cols; col++) {
            const value = heat[row * cols + col];
            if (value >= band.min && value < upper) {
              line += glyphs[Math.min(9, Math.round((value / 36) * 9))];
              hasInk = true;
            } else line += ' ';
          }
          if (hasInk) ctx.fillText(line, -cellWidth, row * cellHeight);
        }
      });
      ctx.globalAlpha = 1;
    }
    function resize() {
      const rect = canvas.getBoundingClientRect(),
        dpr = Math.min(2, devicePixelRatio || 1),
        fontSize = rect.width < 640 ? 10 : 12;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px JetBrains, monospace`;
      ctx.textBaseline = 'top';
      cellWidth = ctx.measureText('M').width || fontSize * 0.6;
      cellHeight = fontSize * 1.12;
      cols = Math.ceil(width / cellWidth) + 2;
      rows = Math.ceil(height / cellHeight);
      heat = new Uint8Array(cols * rows);
      for (let i = 0; i < rows * 3; i++) step(started + 5000);
      draw();
    }
    function loop(now) {
      frame = 0;
      if (paused || reduced.matches || document.hidden || !inView) return;
      if (now - last >= 33) {
        step(now);
        draw();
        last = now;
      }
      frame = scope.requestAnimationFrame(loop);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      button.textContent = reduced.matches
        ? 'Reduced motion'
        : paused
          ? '▶ Play fire'
          : 'Ⅱ Pause fire';
      button.setAttribute('aria-label', paused ? 'Play fire animation' : 'Pause fire animation');
      button.setAttribute('aria-pressed', String(paused || reduced.matches));
      button.disabled = reduced.matches;
      if (!paused && !reduced.matches && !document.hidden && inView)
        frame = scope.requestAnimationFrame(loop);
    }
    scope.listen(button, 'click', () => {
      paused = !paused;
      sync();
    });
    scope.listen(reduced, 'change', sync);
    scope.listen(document, 'visibilitychange', sync);
    new scope.ResizeObserver(resize).observe(canvas);
    new scope.IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        sync();
      },
      { rootMargin: '120px' },
    ).observe(canvas);
    document.fonts.ready.then(() => {
      if (scope.disposed) return;
      resize();
      sync();
    });
    resize();
    sync();
  })();

  // Public spot quote; never silently substitute an assumed exchange rate.
  (() => {
    let busy = false,
      lastQuote = null;
    const button = byId('refresh-price');
    async function refresh() {
      if (busy) return;
      busy = true;
      button.disabled = true;
      try {
        const response = await scope.fetch('/api/sol-price', {
          cache: 'no-store',
          signal: AbortSignal.timeout(12000),
        });
        if (!response.ok) throw Error('Quote unavailable');
        const data = await response.json();
        if (scope.disposed) return;
        const price = Number(data?.price);
        if (!Number.isFinite(price) || price <= 0) throw Error('Invalid quote');
        model.price = price;
        lastQuote = new Date(data.fetchedAt);
        byId('sol-price').textContent = '$' + fmt(price) + ' / SOL';
        byId('price-status').textContent =
          'Coinbase spot · fetched ' + lastQuote.toLocaleTimeString() + ' · refreshes every minute';
        updateModel();
      } catch {
        if (scope.disposed) return;
        byId('price-status').textContent = lastQuote
          ? 'Refresh unavailable · using last quote fetched ' +
            lastQuote.toLocaleTimeString() +
            '. Retry to update.'
          : 'Live quote unavailable. Retry to calculate SOL buybacks.';
        if (!lastQuote) byId('sol-price').textContent = 'Unavailable';
      } finally {
        busy = false;
        button.disabled = false;
      }
    }
    scope.listen(button, 'click', refresh);
    scope.setInterval(() => {
      if (!document.hidden) refresh();
    }, 60000);
    scope.listen(document, 'visibilitychange', () => {
      if (!document.hidden) refresh();
    });
    refresh();
  })();

  // Match the visible browser height, including the responsive navigation.
  new scope.ResizeObserver(([entry]) =>
    document.documentElement.style.setProperty(
      '--header-height',
      entry.target.getBoundingClientRect().height + 'px',
    ),
  ).observe(document.querySelector('.header'));

  // Continuous movement follows the reference routes; no fake transaction events.
  (() => {
    const root = document.querySelector('.complete-flywheel');
    if (!root) return;
    const button = byId('flow-toggle'),
      reduced = matchMedia('(prefers-reduced-motion: reduce)'),
      svgs = [...root.querySelectorAll('.fee-svg')];
    let paused = false,
      visible = false;
    // Keep travel speed consistent even on the longer fee-to-buyback route.
    for (const svg of svgs) {
      const paths = new Map();
      for (const motion of svg.querySelectorAll('animateMotion')) {
        const route = motion.getAttribute('path');
        if (!paths.has(route)) paths.set(route, []);
        paths.get(route).push(motion);
      }
      for (const [route, motions] of paths) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', route);
        const duration = Math.max(2, path.getTotalLength() / 28);
        motions.forEach((motion, index) => {
          motion.setAttribute('dur', duration + 's');
          motion.setAttribute('begin', (-index * duration) / motions.length + 's');
        });
      }
      svg.setCurrentTime(0);
    }
    function sync() {
      const stop = paused || reduced.matches || !visible || document.hidden;
      for (const svg of svgs) {
        if (stop) svg.pauseAnimations();
        else svg.unpauseAnimations();
      }
      button.textContent = reduced.matches
        ? 'Reduced motion'
        : paused
          ? '▶ Play animation'
          : 'Ⅱ Pause animation';
      button.disabled = reduced.matches;
      button.setAttribute('aria-pressed', String(paused || reduced.matches));
      root.classList.toggle('flow-reduced', reduced.matches);
    }
    scope.listen(button, 'click', () => {
      paused = !paused;
      sync();
    });
    scope.listen(reduced, 'change', sync);
    scope.listen(document, 'visibilitychange', sync);
    new scope.IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    ).observe(root);
    sync();
  })();

  (() => {
    const button = document.getElementById('copy-rugless-ca');
    if (!button) return;
    scope.listen(button, 'click', async () => {
      const address = document.getElementById('rugless-ca').textContent;
      const status = document.getElementById('rugless-ca-status');
      try {
        await Promise.race([
          navigator.clipboard.writeText(address),
          new Promise((_, reject) =>
            scope.setTimeout(() => reject(new Error('Clipboard timed out')), 1500),
          ),
        ]);
        status.textContent = 'Placeholder copied.';
        button.textContent = '✓';
        scope.setTimeout(() => {
          button.textContent = '⧉';
        }, 2500);
      } catch (_) {
        const range = document.createRange();
        range.selectNodeContents(document.getElementById('rugless-ca'));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent =
          'Copy unavailable. The placeholder is selected—use your device’s copy command.';
      }
    });
  })();

  (() => {
    'use strict';
    const root = document.getElementById('rug-chart');
    if (!root) return;
    const svg = root.querySelector('svg'),
      value = document.getElementById('rug-position-value'),
      loss = document.getElementById('rug-loss'),
      stage = document.getElementById('rug-stage'),
      toggle = document.getElementById('rug-chart-toggle');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    // One deterministic tick stream drives candles, volume, last price and position P&L.
    const closes = [
      0.035, 0.04, 0.037, 0.045, 0.041, 0.05, 0.047, 0.055, 0.06, 0.057, 0.068, 0.064, 0.08, 0.79,
      0.53, 0.84, 0.61, 0.73, 0.46, 0.64, 0.39, 0.58, 0.43, 0.72, 0.94, 0.67, 0.88, 1.12, 0.83,
      1.04, 0.74, 1.025, 0.003, 0.0034, 0.0031, 0.003,
    ];
    // Simulated traded volume per candle: first rush, retrace, second rush, sell-off, silence.
    const volumes = [
      2, 3, 2, 4, 3, 4, 3, 5, 4, 3, 6, 4, 7, 60, 42, 52, 39, 34, 38, 31, 27, 30, 24, 42, 54, 43, 48,
      64, 51, 55, 47, 59, 76, 0.5, 0.12, 0,
    ];
    const seed = 13,
      entryIndex = 13,
      entryFraction = 0.72,
      crashIndex = 32,
      ns = 'http://www.w3.org/2000/svg';
    const entryPrice = tickPrice(entryIndex, entryFraction);
    const green = '#b9ff66',
      red = '#ff665e',
      priceUSD = 0.001;
    const y = (p) => 350 - p * 270,
      x = (i, head) => 550 + (i - head) * 18;
    const fmt = (n) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(n);
    const durations = closes.map((_, i) =>
      i === crashIndex ? 1100 : i === seed ? 800 : i > crashIndex ? 850 : 650,
    );
    const start = [];
    let end = 0;
    for (let i = seed; i < closes.length; i++) {
      start[i] = end;
      end += durations[i];
    }
    function tickPrice(i, f) {
      const open = closes[i - 1] ?? closes[0],
        close = closes[i];
      if (i === crashIndex) {
        const points = [
          [0, open],
          [0.12, 0.68],
          [0.24, 0.77],
          [0.38, 0.34],
          [0.51, 0.43],
          [0.67, 0.09],
          [0.79, 0.145],
          [0.94, 0.003],
          [1, 0.003],
        ];
        let n = 0;
        while (n < points.length - 2 && f > points[n + 1][0]) n++;
        const [t, a] = points[n],
          [next, b] = points[n + 1];
        return a + (b - a) * ((f - t) / (next - t));
      }
      const wiggle =
        Math.sin(Math.PI * f) *
        (Math.sin(f * 17 + i) * 0.09 + Math.sin(f * 41) * 0.035) *
        (i > crashIndex ? 0.025 : 1);
      return Math.max(0.001, open + (close - open) * f + wiggle);
    }
    function range(i, f) {
      let high = closes[i - 1] ?? closes[0],
        low = high;
      for (let n = 0; n <= Math.ceil(f * 65); n++) {
        const p = tickPrice(i, Math.min(f, n / 65));
        high = Math.max(high, p);
        low = Math.min(low, p);
      }
      return { high, low };
    }
    svg.innerHTML =
      '<title id="rug-svg-title">A live-forming example rug-pull chart</title><desc id="rug-svg-desc">Candles form from simulated price ticks. A buy during the first sharp pump opens a $1,000 position. The price collapses, updating position value and profit and loss together.</desc><defs><clipPath id="rug-plot-clip"><rect x="24" y="38" width="594" height="380"/></clipPath></defs><g id="rug-grid"></g><g id="rug-candles" clip-path="url(#rug-plot-clip)"></g><g id="rug-times"></g><g id="rug-price"><path stroke-dasharray="4 5"/><rect x="621" width="96" height="23" rx="2"/><text x="669" text-anchor="middle" font-size="11" fill="#10150d"/></g><g id="rug-buy-marker"><path stroke="#b9ff66" stroke-dasharray="2 3"/><rect width="130" height="29" rx="4" fill="#b9ff66"/><text text-anchor="middle" fill="#14200e" font-size="16" font-weight="700">+ You bought</text></g><text x="26" y="23" class="rug-market-label">MEME / USD · 1m</text><text x="26" y="374" class="rug-volume-label">VOL</text>';
    const grid = svg.querySelector('#rug-grid');
    grid.innerHTML = [0, 0.25, 0.5, 0.75, 1]
      .map(
        (p) =>
          `<path d="M24 ${y(p)}H618" stroke="#252a34"/><text x="630" y="${y(p) + 4}" class="rug-price-axis">${(p * priceUSD).toFixed(6)}</text>`,
      )
      .join('');
    const group = svg.querySelector('#rug-candles');
    const nodes = closes.map(() => {
      const g = document.createElementNS(ns, 'g');
      g.innerHTML =
        '<path stroke-width="1.4"/><rect width="11" rx=".7"/><rect width="11" opacity=".3"/>';
      group.append(g);
      return [...g.children];
    });
    const priceGroup = svg.querySelector('#rug-price'),
      marker = svg.querySelector('#rug-buy-marker'),
      times = svg.querySelector('#rug-times');
    let money = root.querySelector('#rug-pnl-money');
    if (!money) {
      money = document.createElement('span');
      money.id = 'rug-pnl-money';
      loss.replaceWith(money);
      money.append(loss);
    }
    let pnlAmount = root.querySelector('#rug-pnl-amount');
    if (!pnlAmount) {
      pnlAmount = document.createElement('span');
      pnlAmount.id = 'rug-pnl-amount';
      money.prepend(pnlAmount);
    }
    let visible = false,
      paused = false,
      elapsed = 0,
      last = 0,
      frame = 0,
      lastDraw = 0;
    function draw(ms) {
      let index = seed;
      while (index < closes.length - 1 && ms >= start[index] + durations[index]) index++;
      const f = Math.min(1, Math.max(0, (ms - start[index]) / durations[index])),
        head = index + f,
        current = tickPrice(index, f),
        bought = index >= entryIndex;
      nodes.forEach(([wick, body, volume], i) => {
        const g = wick.parentNode;
        g.style.display = i > index ? 'none' : '';
        if (i > index) return;
        const fraction = i === index ? f : 1,
          open = closes[i - 1] ?? closes[0],
          close = tickPrice(i, fraction),
          r = range(i, fraction),
          cx = x(i, head),
          color = close >= open ? green : red;
        wick.setAttribute('d', `M${cx} ${y(r.high)}V${y(r.low)}`);
        wick.setAttribute('stroke', color);
        body.setAttribute('x', cx - 5.5);
        body.setAttribute('y', Math.min(y(open), y(close)));
        body.setAttribute('height', Math.max(1, Math.abs(y(open) - y(close))));
        body.setAttribute('fill', color);
        const v = volumes[i] * 0.65 * fraction;
        volume.setAttribute('x', cx - 5.5);
        volume.setAttribute('y', 410 - v);
        volume.setAttribute('height', v);
        volume.setAttribute('fill', color);
      });
      const color = current >= (closes[index - 1] ?? current) ? green : red,
        cy = y(current);
      priceGroup.children[0].setAttribute('d', `M24 ${cy}H621`);
      priceGroup.children[0].setAttribute('stroke', color);
      priceGroup.children[1].setAttribute('y', cy - 11.5);
      priceGroup.children[1].setAttribute('fill', color);
      priceGroup.children[2].setAttribute('y', cy + 4);
      priceGroup.children[2].textContent = (current * priceUSD).toFixed(6);
      marker.style.opacity = bought ? '1' : '0';
      const mx = x(entryIndex, head),
        my = y(entryPrice);
      marker.children[0].setAttribute('d', `M${mx} ${my - 9}V${my - 22}`);
      marker.children[1].setAttribute('x', mx - 65);
      marker.children[1].setAttribute('y', my - 51);
      marker.children[2].setAttribute('x', mx);
      marker.children[2].setAttribute('y', my - 31);
      // Entry executes partway through the first god candle, then all P&L uses that fixed fill.
      const filled = index > entryIndex || (index === entryIndex && f >= entryFraction);
      marker.style.opacity = filled ? '1' : '0';
      const panel = root.querySelector('.rug-position');
      panel.classList.toggle('position-unfilled', !filled);
      panel.setAttribute('aria-hidden', String(!filled));
      const position = (1000 * current) / entryPrice,
        pnl = position - 1000,
        positive = pnl >= 0;
      value.textContent = filled ? fmt(position) : '—';
      value.style.color = filled ? (positive ? green : red) : '#99a1af';
      pnlAmount.textContent = filled
        ? (positive ? '+' : '−') + fmt(Math.abs(pnl))
        : 'Awaiting entry';
      loss.textContent = filled ? (positive ? '+' : '−') + Math.abs(pnl / 10).toFixed(2) + '%' : '';
      money.style.color = positive ? green : red;
      loss.style.color = positive ? green : red;
      money.classList.toggle('position-pending', !filled);
      stage.textContent = !filled
        ? index < 18
          ? 'The first rush sends price and volume sharply higher.'
          : index < 24
            ? 'A pullback. Buyers wait, then step back in.'
            : 'The second pump draws you in at the top.'
        : index < crashIndex
          ? 'You’re in. Your P&L moves with every price tick.'
          : index === crashIndex && f < 1
            ? 'The hidden stash hits the market. Your position falls with it.'
            : 'Same tokens. Almost nothing left.';
      times.innerHTML = Array.from({ length: 9 }, (_, n) => n * 5)
        .map((i) => {
          const cx = x(i, head);
          return cx > 30 && cx < 600
            ? `<text x="${cx}" y="437" text-anchor="middle" class="rug-price-axis">14:${String(i).padStart(2, '0')}</text>`
            : '';
        })
        .join('');
    }
    function tick(now) {
      if (last) elapsed += now - last;
      last = now;
      if (elapsed >= end) {
        elapsed = end;
        draw(end);
        last = 0;
        toggle.textContent = 'Animation complete';
        toggle.disabled = true;
        return;
      }
      if (now - lastDraw > 32) {
        draw(elapsed);
        lastDraw = now;
      }
      frame = scope.requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      toggle.disabled = reduced.matches || elapsed >= end;
      toggle.textContent =
        elapsed >= end
          ? 'Animation complete'
          : reduced.matches
            ? 'Reduced motion'
            : paused
              ? '▶ Play animation'
              : 'Ⅱ Pause animation';
      toggle.setAttribute('aria-pressed', String(paused || reduced.matches));
      if (reduced.matches) {
        draw(end);
        return;
      }
      if (visible && !paused && !document.hidden && elapsed < end)
        frame = scope.requestAnimationFrame(tick);
    }
    scope.listen(toggle, 'click', () => {
      paused = !paused;
      sync();
    });
    scope.listen(reduced, 'change', sync);
    scope.listen(document, 'visibilitychange', sync);
    new scope.IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    ).observe(root);
    draw(reduced.matches ? end : 0);
    sync();
  })();

  (() => {
    'use strict';
    const key = 'rugless-risk-acknowledgment-v1';
    const banner = document.getElementById('risk-banner');
    const acknowledge = document.getElementById('risk-acknowledge');
    const reopen = document.querySelector('[data-risk-reopen]');
    const disclosure = document.getElementById('risk-disclosure');
    if (!banner || !acknowledge || !reopen || !disclosure) return;
    const measure = () =>
      document.documentElement.style.setProperty(
        '--risk-banner-height',
        banner.hidden ? '0px' : `${banner.getBoundingClientRect().height}px`,
      );
    const show = () => {
      banner.hidden = false;
      measure();
    };
    try {
      banner.hidden = localStorage.getItem(key) === 'acknowledged';
    } catch (_) {
      /* Keep the warning visible when storage is blocked. */
    }
    acknowledge.hidden = false;
    reopen.hidden = false;
    scope.listen(acknowledge, 'click', () => {
      try {
        localStorage.setItem(key, 'acknowledged');
      } catch (_) {
        /* Dismiss this page only. */
      }
      banner.hidden = true;
      measure();
      // Preserve keyboard access without scrolling visitors to the footer.
      reopen.focus({ preventScroll: true });
    });
    scope.listen(reopen, 'click', () => {
      show();
      acknowledge.focus({ preventScroll: true });
    });
    scope.listen(document.getElementById('risk-read'), 'click', (event) => {
      event.preventDefault();
      disclosure.querySelector('details').open = true;
      disclosure.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    scope.listen(window, 'storage', (event) => {
      if (event.key === key || event.key === null) {
        banner.hidden = event.newValue === 'acknowledged';
        measure();
      }
    });
    if ('ResizeObserver' in window) new scope.ResizeObserver(measure).observe(banner);
    scope.listen(window, 'resize', measure);
    measure();
  })();

  return () => scope.destroy();
}
