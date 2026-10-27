'use client';
import Link from 'next/link';
import { useState } from 'react';
import { tokens, tokenHref } from '@/lib/tokens';
import { money, change } from '@/lib/format';
import type { Token, Market } from '@/lib/types';
import { useMarkets } from '@/hooks/use-markets';
import { useWatchlist } from '@/hooks/use-watchlist';
function MarketNumbers({ market }: { market?: Market }) {
  return (
    <div className="token-market-numbers">
      <div>
        <span>Mcap</span>
        <strong>{money(market?.marketCap ?? null)}</strong>
      </div>
      <div>
        <span>24h change</span>
        <strong className={(market?.change24h ?? 0) < 0 ? 'market-negative' : 'market-positive'}>
          {change(market?.change24h ?? null)}
        </strong>
      </div>
      <div>
        <span>24h volume</span>
        <strong>{money(market?.volume24h ?? null)}</strong>
      </div>
    </div>
  );
}
export function MarketBoard({
  savedOnly = false,
  all = false,
}: {
  savedOnly?: boolean;
  all?: boolean;
}) {
  const { data, error, loading, refresh } = useMarkets(),
    { saved, toggle } = useWatchlist();
  const [search, setSearch] = useState(''),
    [sort, setSort] = useState('newest'),
    [paused, setPaused] = useState(false);
  const market = (t: Token) => data?.markets.find((m) => m.mint === t.mint);
  const rows = tokens
    .filter(
      (t) =>
        (!savedOnly || saved.includes(t.mint)) &&
        `${t.name} ${t.symbol} ${t.mint}`.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === 'newest'
        ? Date.parse(b.poolCreatedAt) - Date.parse(a.poolCreatedAt)
        : (market(b)?.[sort as 'marketCap' | 'change24h' | 'volume24h'] ?? -Infinity) -
          (market(a)?.[sort as 'marketCap' | 'change24h' | 'volume24h'] ?? -Infinity),
    );
  const saveButton = (t: Token) => (
    <button
      className="watch-button"
      aria-label={`${saved.includes(t.mint) ? 'Unsave' : 'Save'} ${t.name}`}
      aria-pressed={saved.includes(t.mint)}
      onClick={() => toggle(t.mint)}
    >
      {saved.includes(t.mint) ? '★' : '☆'}
    </button>
  );
  return (
    <>
      <section className="workspace-page-title">
        <div>
          <h1>
            {savedOnly
              ? 'Your watchlist'
              : all
                ? 'All launched tokens'
                : 'Your corner of meme culture.'}
          </h1>
          <p>
            {savedOnly
              ? 'Keep the memes you care about close. Saved on this browser.'
              : all
                ? 'Explore active Pump tokens, with real market data and exact contract addresses.'
                : 'Find the story. Follow the people. See what they build.'}
          </p>
        </div>
        <span className="workspace-network">
          <i className="status-dot" />
          Solana
        </span>
      </section>
      {!savedOnly && (
        <section className="trending-section" aria-labelledby="trending-title">
          <div className="app-section-title">
            <div className="trend-heading">
              <h2 id="trending-title">
                Trending now <span aria-hidden="true">↗</span>
              </h2>
              <span id="trend-label">
                External Pump tokens · selected for recent trading activity
              </span>
            </div>
            <div>
              <button onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
                {paused ? 'Play' : 'Pause'}
              </button>
            </div>
          </div>
          <div className="trend-viewport">
            <div className={`trend-track ${paused ? 'is-paused' : ''}`}>
              {[0, 1].map((copy) => (
                <div key={copy} className="trend-group" aria-hidden={copy === 1 || undefined}>
                  {tokens.map((t, i) => (
                    <Link
                      className="trend-card market-trend"
                      key={t.mint}
                      href={tokenHref(t)}
                      tabIndex={copy ? -1 : 0}
                    >
                      <div className="trend-token">
                        <div className="trend-art">
                          <img src={t.image} alt="" />
                        </div>
                        <div>
                          <span className="trend-rank">#{i + 1}</span>
                          <strong>{t.name}</strong>
                          <span className="trend-symbol">${t.symbol}</span>
                        </div>
                        <span className="trend-open">↗</span>
                      </div>
                      <MarketNumbers market={market(t)} />
                      <div className="trend-footer">
                        <span>PumpSwap · external launch</span>
                        <span>View token →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p id="market-fetch-status" role="status">
            {error ||
              (data
                ? `Market data updated ${new Date(data.fetchedAt).toLocaleTimeString()}. Source: GeckoTerminal. Refreshes every 60s.`
                : 'Loading market data…')}
          </p>
        </section>
      )}
      {!savedOnly && !all && (
        <div className="app-metrics">
          {[
            ['Mainnet tokens', String(tokens.length)],
            ['Verified Rugless launches', '0'],
            [
              '24h volume across listed pools',
              data ? money(data.markets.reduce((sum, m) => sum + (m.volume24h || 0), 0)) : '—',
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      )}
      <section className="discovery-board">
        <div className="app-section-title">
          <h2>{savedOnly ? 'Saved tokens' : all ? 'The token directory' : 'Latest launches'}</h2>
          <div className="board-actions">
            {!all && !savedOnly && <Link href="/app/tokens">View all tokens ↗</Link>}
            <button onClick={() => void refresh()} disabled={loading}>
              Refresh markets
            </button>
          </div>
        </div>
        <div className="board-toolbar">
          <label className="app-search" id="search">
            <span className="sr-only">Search tokens</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, ticker or CA…"
            />
          </label>
          <span className="network-filter">
            Network <span className="network-value">Mainnet</span>
          </span>
          <label className="sort-control">
            Sort{' '}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest pool</option>
              <option value="marketCap">Market cap</option>
              <option value="change24h">24h change</option>
              <option value="volume24h">24h volume</option>
            </select>
          </label>
        </div>
        <p className="directory-count" role="status">
          {rows.length} {savedOnly ? 'saved tokens' : 'tokens'} · External Pump tokens, not Rugless
          launches. — means unavailable, not zero.
        </p>
        {all ? (
          <div className="token-table-scroll">
            <table className="token-directory-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Price</th>
                  <th>Market cap</th>
                  <th>24h change</th>
                  <th>24h volume</th>
                  <th>Pool created</th>
                  <th>
                    <span className="sr-only">Save token</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.mint}>
                    <td>
                      <Link className="table-token" href={tokenHref(t)}>
                        <span className="table-art">
                          <img src={t.image} alt="" />
                        </span>
                        <span>
                          <strong>{t.name}</strong>
                          <small>${t.symbol} · Mainnet</small>
                        </span>
                      </Link>
                    </td>
                    <td>{money(market(t)?.price ?? null, false)}</td>
                    <td>{money(market(t)?.marketCap ?? null)}</td>
                    <td
                      className={
                        (market(t)?.change24h ?? 0) < 0 ? 'market-negative' : 'market-positive'
                      }
                    >
                      {change(market(t)?.change24h ?? null)}
                    </td>
                    <td>{money(market(t)?.volume24h ?? null)}</td>
                    <td>
                      {new Date(t.poolCreatedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        timeZone: 'UTC',
                      })}
                    </td>
                    <td>{saveButton(t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="creation-grid">
            {rows.map((t) => (
              <article className="creation-card" key={t.mint}>
                <Link className="creation-art" href={tokenHref(t)}>
                  <img src={t.image} alt={t.name} />
                  <span className="network-badge">Mainnet · external</span>
                </Link>
                <div className="creation-body">
                  <div className="creation-name">
                    <Link href={tokenHref(t)}>
                      <h3>{t.name}</h3>
                      <span>${t.symbol}</span>
                    </Link>
                    {saveButton(t)}
                  </div>
                  <MarketNumbers market={market(t)} />
                  <p>{t.selectionReason}</p>
                  <div className="creation-stats">
                    <span>PumpSwap</span>
                    <span>External launch</span>
                  </div>
                  <Link className="creation-cta" href={tokenHref(t)}>
                    Open token <span>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        {rows.length === 0 && (
          <div className="app-empty">
            <span>[ ∅ ]</span>
            <h3>{savedOnly ? 'Keep your next find here.' : 'No tokens match.'}</h3>
            <p>
              {savedOnly ? 'Star a token to add it to your watchlist.' : 'Try a different search.'}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
