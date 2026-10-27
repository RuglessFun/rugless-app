'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Token } from '@/lib/types';
import { useMarkets } from '@/hooks/use-markets';
import { money, change } from '@/lib/format';
import { PriceChart } from './price-chart';
import { SwapPanel } from './swap-panel';
export function TokenDetail({ token }: { token: Token }) {
  const { data, error } = useMarkets();
  const market = data?.markets.find((m) => m.mint === token.mint);
  const [copyStatus, setCopyStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(token.mint);
      setCopyStatus('Copied.');
    } catch {
      setCopyStatus('Copy unavailable. Select the address to copy it.');
    }
  }
  const thesis = `@RuglessX $${token.symbol}\n${token.mint}\n\nMy thesis: `;
  return (
    <>
      <Link href="/app" className="back-link">
        ← Discover memes
      </Link>
      <div className="token-heading">
        <div className="token-identity">
          <img src={token.image} alt={token.name} width={80} height={80} />
          <div>
            <span className="network-badge">Mainnet · external Pump token</span>
            <h1>
              {token.name} <small>${token.symbol}</small>
            </h1>
          </div>
        </div>
        <div className="token-heading-links">
          <a className="text-link" href="#thesis">
            Token context ↓
          </a>
          <a className="text-link" href="#community">
            Community thesis ↓
          </a>
          <a className="button secondary" href={token.sourceUrl} target="_blank" rel="noreferrer">
            See the market ↗
          </a>
        </div>
      </div>
      <p className="token-description">{token.selectionReason}</p>
      <div className="mint-row">
        <span>CA · Solana Mainnet</span>
        <code>{token.mint}</code>
        <button className="copy-mint" onClick={() => void copy()}>
          Copy CA
        </button>
        <span className="copy-status" role="status">
          {copyStatus}
        </span>
      </div>
      <div className="token-external">
        <a href={`https://pump.fun/coin/${token.mint}`} target="_blank" rel="noreferrer">
          Open on Pump.fun ↗
        </a>
        <span>External launch · not created or endorsed by Rugless.</span>
      </div>
      <div id="token-terminal">
        <div className="terminal-stats">
          {[
            ['PRICE / USD', money(market?.price ?? null, false)],
            ['MARKET CAP', money(market?.marketCap ?? null)],
            ['24H VOLUME', money(market?.volume24h ?? null)],
            ['24H CHANGE', change(market?.change24h ?? null)],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        {error && (
          <p className="chart-status negative">{error} Previously loaded values may be stale.</p>
        )}
        <div className="trading-layout">
          <PriceChart token={token} />
          <SwapPanel token={token} />
        </div>
      </div>
      <nav className="token-section-nav" aria-label="Token research">
        <a href="#thesis">Token context</a>
        <a href="#community">Community</a>
        <a href="#devs">The devs</a>
        <a href={token.sourceUrl} target="_blank" rel="noreferrer">
          Market evidence ↗
        </a>
      </nav>
      <section className="launch-decision" id="thesis">
        <div className="decision-topline">
          <span className="kicker">Why this token is here</span>
          <span className="sample-tag">External launch · no Rugless AI selection</span>
        </div>
        <div className="decision-lead">
          <span className="decision-ascii" aria-hidden="true">
            [ ? → ! ]
          </span>
          <h2>Activity worth investigating.</h2>
          <p>{token.selectionReason}</p>
        </div>
        <div className="decision-reasons">
          <h3>What you can verify</h3>
          <div>
            <article>
              <h4>The exact market</h4>
              <p>
                Live prices and candles come from this token’s verified PumpSwap pool, matched by
                both pool address and token mint.
              </p>
            </article>
            <article>
              <h4>Recent trading activity</h4>
              <p>
                Pool created{' '}
                {new Date(token.poolCreatedAt).toLocaleDateString('en-GB', { timeZone: 'UTC' })}.
                Selected{' '}
                {new Date(token.selectedAt).toLocaleDateString('en-GB', { timeZone: 'UTC' })} for
                the discovery directory.
              </p>
            </article>
            <article>
              <h4>Your own research</h4>
              <p>
                Inspect liquidity, trading activity and the contract before making your own
                decision. Market activity does not establish safety.
              </p>
            </article>
          </div>
        </div>
        <div className="decision-limits">
          <h3>What this selection does not tell you</h3>
          <p>
            This is an external market example, not a Rugless launch or an AI endorsement. Rugless
            launch decisions will include the AI’s thesis and original nominators. There is no
            Rugless launch thesis for this token.
          </p>
        </div>
        <div className="decision-evidence">
          <span>Market evidence</span>
          <p>
            Prices, volume and liquidity are sourced from the exact pool. Missing values remain
            unavailable.
          </p>
          <a href={token.sourceUrl} target="_blank" rel="noreferrer">
            Inspect the pool ↗
          </a>
        </div>
      </section>
      <section className="community-feed" id="community">
        <div className="community-feed-head">
          <div>
            <p className="kicker">Keep the conversation going.</p>
            <h2>The community’s thesis.</h2>
            <p>See why people care, what they’re building on and where they disagree.</p>
          </div>
          <span className="network-badge">Community theses</span>
        </div>
        <div className="community-feed-layout">
          <aside className="thesis-invite">
            <h3>Put your take on the page.</h3>
            <p>
              Post on X, tag <strong>@RuglessX</strong> and include this coin’s{' '}
              <strong>contract address</strong> or <strong>${token.symbol}</strong>, along with your
              thesis.
            </p>
            <p>
              The CA is the clearest match. Shared tickers need an extra check so your post lands on
              the right coin.
            </p>
            <pre>{thesis}</pre>
            <a
              className="button primary"
              href={`https://x.com/intent/post?text=${encodeURIComponent(thesis)}`}
              target="_blank"
              rel="noreferrer"
            >
              Write your thesis ↗
            </a>
            <details className="feed-policy">
              <summary>What will appear in the feed?</summary>
              <p>
                Posts must be matched to the exact coin, deduplicated and reviewed. Thoughtful
                criticism is welcome. Spam, impersonation, scam links and private information are
                excluded. X’s rules do not replace this site’s moderation.
              </p>
            </details>
          </aside>
          <div className="thesis-feed-panel">
            <div className="thesis-feed-toolbar">
              <p>No verified posts indexed.</p>
            </div>
            <div className="app-empty">
              <span>[ ∅ ]</span>
              <h3>Bring your own thesis.</h3>
              <p>
                No community posts are indexed for this token. Tag @RuglessX with the CA to make
                your case. This frontend does not poll X.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="token-devs" id="devs">
        <div className="devs-heading">
          <div>
            <p className="kicker">They spotted it first.</p>
            <h2>Meet the devs.</h2>
            <p>The people who nominated a meme on X before it was created.</p>
          </div>
          <span className="network-badge">External launch</span>
        </div>
        <p className="devs-definition">
          This token was not launched by Rugless. No verified Rugless nomination records exist for
          it.
        </p>
        <p className="devs-rule">
          “Devs” credits on Rugless launches refer to eligible pre-creation nominators, not contract
          authorship or administrative access.
        </p>
      </section>
    </>
  );
}
