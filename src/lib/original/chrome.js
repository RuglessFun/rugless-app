import { createLifecycle } from './lifecycle';
export function mountOriginalChrome(root) {
  const scope = createLifecycle(root),
    document = scope.document;
  const header = root.querySelector('.header');
  if (header)
    new scope.ResizeObserver(([entry]) =>
      root.style.setProperty('--header-height', entry.target.getBoundingClientRect().height + 'px'),
    ).observe(header);
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
