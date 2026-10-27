'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Star, ArrowUpRight, Search, RefreshCw } from 'lucide-react';
import { tokens, tokenHref } from '@/lib/tokens';
import { money, change } from '@/lib/format';
import { useMarkets } from '@/hooks/use-markets';
import { useWatchlist } from '@/hooks/use-watchlist';
export function MarketBoard({
  savedOnly = false,
  all = false,
}: {
  savedOnly?: boolean;
  all?: boolean;
}) {
  const { data, error, loading, refresh } = useMarkets();
  const { saved, toggle } = useWatchlist();
  const [search, setSearch] = useState('');
  const rows = tokens.filter(
    (t) =>
      (!savedOnly || saved.includes(t.mint)) &&
      `${t.name} ${t.symbol} ${t.mint}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE CULTURE NEVER STOPS</p>
          <h1>
            {savedOnly
              ? 'Your watchlist.'
              : all
                ? 'Hunt down new memes.'
                : 'Find your next conviction.'}
          </h1>
          <p>Explore active Pump markets. Read the story. Make your own call.</p>
        </div>
        <button className="quiet-button" onClick={() => void refresh()} disabled={loading}>
          <RefreshCw size={15} /> Refresh
        </button>
      </div>
      <div className="data-status">
        <span className={error ? 'negative' : 'positive'}>●</span>{' '}
        {error ||
          (data
            ? `Market data · ${new Date(data.fetchedAt).toLocaleTimeString()} · refreshes every 60s`
            : 'Fetching market data…')}
        <span>External Pump tokens · not Rugless launches</span>
      </div>
      {!savedOnly && !all && (
        <section className="trending">
          <div className="section-label">
            <span>↗ TRENDING NOW</span>
            <small>Selected for recent trading activity</small>
          </div>
          <div className="trending-track">
            {[...tokens, ...tokens].map((t, i) => {
              const m = data?.markets.find((m) => m.mint === t.mint);
              return (
                <Link
                  className="trend-card"
                  key={i}
                  href={tokenHref(t)}
                  tabIndex={i >= tokens.length ? -1 : 0}
                  aria-hidden={i >= tokens.length || undefined}
                >
                  <img src={t.image} alt="" />
                  <div>
                    <strong>${t.symbol}</strong>
                    <small>MCAP {money(m?.marketCap ?? null)}</small>
                  </div>
                  <span className={(m?.change24h ?? 0) < 0 ? 'negative' : 'positive'}>
                    {change(m?.change24h ?? null)}
                    <small>24h</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      <section className="panel market-list">
        <div className="list-header">
          <div>
            <h2>{savedOnly ? 'Saved tokens' : 'Explore the market'}</h2>
            <p>Real markets. Your research comes first.</p>
          </div>
          <label className="search">
            <Search size={16} />
            <input
              aria-label="Search tokens"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, ticker or CA"
            />
          </label>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Price</th>
                <th>Market cap</th>
                <th>24h change</th>
                <th>24h volume</th>
                <th>Liquidity</th>
                <th>Save</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => {
                const m = data?.markets.find((m) => m.mint === t.mint);
                return (
                  <tr key={t.mint}>
                    <td>
                      <Link className="token-name" href={tokenHref(t)}>
                        <img src={t.image} alt="" />
                        <span>
                          <strong>
                            {t.name} <ArrowUpRight size={12} />
                          </strong>
                          <small>${t.symbol} · PumpSwap</small>
                        </span>
                      </Link>
                    </td>
                    <td>{money(m?.price ?? null, false)}</td>
                    <td>{money(m?.marketCap ?? null)}</td>
                    <td className={(m?.change24h ?? 0) < 0 ? 'negative' : 'positive'}>
                      {change(m?.change24h ?? null)}
                    </td>
                    <td>{money(m?.volume24h ?? null)}</td>
                    <td>{money(m?.liquidity ?? null)}</td>
                    <td>
                      <button
                        className="icon-button"
                        aria-label={`${saved.includes(t.mint) ? 'Remove' : 'Save'} ${t.symbol}`}
                        aria-pressed={saved.includes(t.mint)}
                        onClick={() => toggle(t.mint)}
                      >
                        <Star size={17} fill={saved.includes(t.mint) ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="empty-state">
            {savedOnly ? 'Save a token using its star to keep it here.' : 'No matching tokens.'}
          </div>
        )}
        <p className="table-note">
          — means unavailable, not zero. Market cap is reported separately from fully diluted
          valuation. Source: GeckoTerminal.
        </p>
      </section>
      <div className="app-callout">
        <span>[ YOUR TIMELINE → THE NEXT MEME ]</span>
        <h2>Know something the market doesn’t?</h2>
        <p>Reply to a post with @RuglessX, a name, ticker, image idea and your thesis.</p>
        <Link href="/#participate">Make your case ↗</Link>
      </div>
    </>
  );
}
