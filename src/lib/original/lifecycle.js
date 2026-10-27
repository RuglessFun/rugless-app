/** Scope the original canvas/SVG renderers to one React mount and release all resources. */
export function createLifecycle(root) {
  const cleanups = [];
  const controller = new AbortController();
  const frames = new Set();
  let disposed = false;
  const scope = {
    get disposed() {
      return disposed;
    },
    document: new Proxy(document, {
      get(target, key) {
        if (key === 'getElementById') return (id) => root.querySelector(`#${CSS.escape(id)}`);
        if (key === 'querySelector') return root.querySelector.bind(root);
        if (key === 'querySelectorAll') return root.querySelectorAll.bind(root);
        if (key === 'documentElement') return root;
        const value = Reflect.get(target, key, target);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    }),
    listen(target, event, callback, options = {}) {
      target.addEventListener(event, callback, { ...options, signal: controller.signal });
    },
    ResizeObserver: class extends ResizeObserver {
      constructor(callback) {
        super(callback);
        cleanups.push(() => this.disconnect());
      }
    },
    IntersectionObserver: class extends IntersectionObserver {
      constructor(callback, options) {
        super(callback, options);
        cleanups.push(() => this.disconnect());
      }
    },
    setInterval(callback, delay) {
      const id = window.setInterval(() => {
        if (!disposed) callback();
      }, delay);
      cleanups.push(() => window.clearInterval(id));
      return id;
    },
    setTimeout(callback, delay) {
      const id = window.setTimeout(() => {
        if (!disposed) callback();
      }, delay);
      cleanups.push(() => window.clearTimeout(id));
      return id;
    },
    requestAnimationFrame(callback) {
      if (disposed) return 0;
      const id = window.requestAnimationFrame((time) => {
        frames.delete(id);
        if (!disposed) callback(time);
      });
      frames.add(id);
      return id;
    },
    fetch(url, options = {}) {
      return fetch(url, {
        ...options,
        signal: options.signal
          ? AbortSignal.any([controller.signal, options.signal])
          : controller.signal,
      });
    },
    destroy() {
      disposed = true;
      controller.abort();
      frames.forEach(cancelAnimationFrame);
      cleanups.forEach((fn) => fn());
    },
  };
  return scope;
}
