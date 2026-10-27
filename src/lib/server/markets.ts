import 'server-only';
import { unstable_cache } from 'next/cache';
import { tokens } from '../tokens';
import { parseCandles, parseMarkets } from '../market-parsers';
import type { Interval, MarketResponse, Token } from '../types';
const origin = 'https://api.geckoterminal.com/api/v2/networks/solana';
async function request(path: string): Promise<unknown> {
  const response = await fetch(`${origin}${path}`, {
    signal: AbortSignal.timeout(12_000),
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Market provider returned ${response.status}`);
  return response.json();
}
export const getMarkets = unstable_cache(
  async (): Promise<MarketResponse> => ({
    markets: parseMarkets(
      await request(`/pools/multi/${tokens.map((t) => t.pool).join(',')}`),
      tokens,
    ),
    fetchedAt: new Date().toISOString(),
    source: 'GeckoTerminal',
  }),
  ['rugless-markets-v1'],
  { revalidate: 60 },
);
export async function getCandles(token: Token, interval: Interval) {
  const [unit, aggregate] = (
    {
      '1m': ['minute', 1],
      '5m': ['minute', 5],
      '15m': ['minute', 15],
      '1h': ['hour', 1],
      '4h': ['hour', 4],
    } as const
  )[interval];
  // Only curated pools can reach this function. Never proxy caller-provided URLs.
  return unstable_cache(
    async () => ({
      candles: parseCandles(
        await request(
          `/pools/${token.pool}/ohlcv/${unit}?aggregate=${aggregate}&limit=300&currency=usd&token=base`,
        ),
      ),
      fetchedAt: new Date().toISOString(),
    }),
    ['rugless-candles-v1', token.pool, interval],
    { revalidate: 30 },
  )();
}
