'use client';
import { useEffect, useRef, useState } from 'react';
import { FlowIllustration } from './flow-illustration';
export function Flywheel() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const svgs = Array.from(root.querySelectorAll('svg'));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    for (const svg of svgs) {
      for (const motion of svg.querySelectorAll('animateMotion')) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', motion.getAttribute('path') || '');
        const duration = Math.max(2, path.getTotalLength() / 28);
        motion.setAttribute('dur', `${duration}s`);
        motion.setAttribute(
          'begin',
          motion.getAttribute('begin') === '-0.0s' ? '0s' : `${-duration / 2}s`,
        );
      }
    }
    function sync() {
      for (const svg of svgs) {
        if (paused || reduced.matches || document.hidden || !visible) svg.pauseAnimations();
        else svg.unpauseAnimations();
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
    };
  }, [paused]);
  return (
    <div ref={ref} className="flow-diagram">
      <div className="section-label">
        <span>FOLLOW THE FEES</span>
        <button onClick={() => setPaused((x) => !x)} aria-pressed={paused}>
          {paused ? '▶ Play animation' : 'Ⅱ Pause animation'}
        </button>
      </div>
      <p className="flow-note">
        [+] SOL moving through the ecosystem · [#] Purchased tokens moving to burn
      </p>
      <FlowIllustration />
      <p className="flow-note">
        Support prioritizes social activity over volume. Each half of the community pool is 37.5% of
        RUGLESS creator fees. Percentages divide captured creator revenue, not trading volume. No
        second team cut from meme fees and no direct SOL payout to holders. Movement illustrates the
        model, not live transactions.
      </p>
    </div>
  );
}
