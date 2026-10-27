import Link from 'next/link';
export function MarketingNav() {
  return (
    <header className="marketing-nav">
      <Link className="wordmark" href="/">
        <img src="/brand/logo.svg" alt="" />
        rugless
      </Link>
      <nav>
        <Link href="/#flywheel">How it works</Link>
        <Link href="/roadmap">Roadmap</Link>
        <a href="https://github.com/RuglessFun/rugless-app">Open source ↗</a>
        <Link className="primary-button" href="/app">
          Launch App ↗
        </Link>
      </nav>
    </header>
  );
}
export function MarketingFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark" href="/">
        <img src="/brand/logo.svg" alt="" />
        rugless
      </Link>
      <nav>
        <a href="https://x.com/RuglessX">X ↗</a>
        <a href="https://github.com/RuglessFun/rugless-app">GitHub ↗</a>
        <Link href="/roadmap">Roadmap</Link>
      </nav>
    </footer>
  );
}
