import { z } from 'zod';
import type { Candle, Market, Token } from './types';
export function nullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '' || typeof value === 'boolean')
    return null;
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
const poolSchema = z.object({
  attributes: z.object({
    address: z.string(),
    base_token_price_usd: z.unknown().optional(),
    market_cap_usd: z.unknown().optional(),
    fdv_usd: z.unknown().optional(),
    reserve_in_usd: z.unknown().optional(),
    volume_usd: z.object({ h24: z.unknown().optional() }).optional(),
    price_change_percentage: z.object({ h24: z.unknown().optional() }).optional(),
  }),
  relationships: z.object({ base_token: z.object({ data: z.object({ id: z.string() }) }) }),
});
export function parseMarkets(payload: unknown, tokens: Token[]): Market[] {
  const { data } = z.object({ data: z.array(z.unknown()) }).parse(payload);
  return data.flatMap((raw) => {
    const result = poolSchema.safeParse(raw);
    if (!result.success) return [];
    const pool = result.data,
      a = pool.attributes;
    const token = tokens.find(
      (t) => t.pool === a.address && `solana_${t.mint}` === pool.relationships.base_token.data.id,
    );
    if (!token) return [];
    return [
      {
        mint: token.mint,
        price: nullableNumber(a.base_token_price_usd),
        marketCap: nullableNumber(a.market_cap_usd),
        fdv: nullableNumber(a.fdv_usd),
        volume24h: nullableNumber(a.volume_usd?.h24),
        change24h: nullableNumber(a.price_change_percentage?.h24),
        liquidity: nullableNumber(a.reserve_in_usd),
      },
    ];
  });
}
export function parseCandles(payload: unknown): Candle[] {
  const { data } = z
    .object({
      data: z.object({ attributes: z.object({ ohlcv_list: z.array(z.array(z.number())) }) }),
    })
    .parse(payload);
  const unique = new Map<number, Candle>();
  for (const row of data.attributes.ohlcv_list) {
    if (row.length !== 6 || !row.every(Number.isFinite)) continue;
    const [time, open, high, low, close, volume] = row;
    if (
      !Number.isInteger(time) ||
      time <= 0 ||
      low < 0 ||
      volume < 0 ||
      low > Math.min(open, close) ||
      high < Math.max(open, close)
    )
      continue;
    unique.set(time, { time, open, high, low, close, volume });
  }
  return [...unique.values()].sort((a, b) => a.time - b.time);
}
