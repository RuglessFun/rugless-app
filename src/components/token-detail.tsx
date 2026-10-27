'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import type { Token } from '@/lib/types';
import { useMarkets } from '@/hooks/use-markets';
import { money, change, shortAddress } from '@/lib/format';
import { PriceChart } from './price-chart';
import { SwapPanel } from './swap-panel';
export function TokenDetail({ token }: { token: Token }) {
  const { data, error } = useMarkets();
  const market = data?.markets.find((m) => m.mint === token.mint);
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(token.mint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <Link href="/app/tokens" className="back-link">
        ← All tokens
      </Link>
      <div className="token-heading">
        <img src={token.image} alt="" />
        <div>
          <p className="eyebrow">EXTERNAL PUMP TOKEN</p>
          <h1>
            {token.name} <span>${token.symbol}</span>
          </h1>
          <button className="address-button" title={token.mint} onClick={() => void copy()}>
            {shortAddress(token.mint)} {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
        <a
          className="quiet-button"
          href={`https://pump.fun/coin/${token.mint}`}
          target="_blank"
          rel="noreferrer"
        >
          Pump.fun <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="market-stats">
        {[
          ['Price', money(market?.price ?? null, false)],
          ['Market cap', money(market?.marketCap ?? null)],
          ['24h change', change(market?.change24h ?? null)],
          ['24h volume', money(market?.volume24h ?? null)],
          ['Liquidity', money(market?.liquidity ?? null)],
        ].map(([label, value]) => (
          <div key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      {error && <p className="negative">{error} Previously loaded values may be stale.</p>}
      <div className="trading-layout">
        <div>
          <PriceChart token={token} />
          <section className="panel thesis-panel">
            <p className="eyebrow">WHY THIS TOKEN IS HERE</p>
            <h2>Activity worth investigating.</h2>
            <p>{token.selectionReason}</p>
            <p>
              This is an external market example, not a Rugless launch or an AI endorsement. Rugless
              launch decisions will include the AI’s thesis and the original nominators here.
            </p>
            <dl>
              <div>
                <dt>Pool created</dt>
                <dd>
                  {new Date(token.poolCreatedAt).toLocaleDateString('en-GB', { timeZone: 'UTC' })}
                </dd>
              </div>
              <div>
                <dt>Selected</dt>
                <dd>
                  {new Date(token.selectedAt).toLocaleDateString('en-GB', { timeZone: 'UTC' })}
                </dd>
              </div>
            </dl>
            <a href={token.sourceUrl} target="_blank" rel="noreferrer">
              Inspect the pool and trading activity ↗
            </a>
          </section>
          <section className="panel thesis-panel">
            <p className="eyebrow">THE COMMUNITY CASE</p>
            <h2>Bring your own thesis.</h2>
            <p>
              Tag @RuglessX with this contract address and explain why this meme matters. No
              verified community posts are indexed for this token yet.
            </p>
            <a
              href={`https://x.com/intent/post?text=${encodeURIComponent(`@RuglessX $${token.symbol}\n${token.mint}\n\nMy thesis: `)}`}
              target="_blank"
              rel="noreferrer"
            >
              Write a thesis on X ↗
            </a>
          </section>
        </div>
        <SwapPanel token={token} />
      </div>
    </>
  );
}
