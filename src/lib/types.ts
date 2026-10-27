export type Token = {
  mint: string;
  name: string;
  symbol: string;
  image: string;
  pool: string;
  poolCreatedAt: string;
  origin: 'external-pump' | 'rugless';
  venue: string;
  selectedAt: string;
  selectionReason: string;
  sourceUrl: string;
};
export type Market = {
  mint: string;
  price: number | null;
  marketCap: number | null;
  fdv: number | null;
  volume24h: number | null;
  change24h: number | null;
  liquidity: number | null;
};
export type MarketResponse = { markets: Market[]; fetchedAt: string; source: 'GeckoTerminal' };
export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
export const intervals = ['1m', '5m', '15m', '1h', '4h'] as const;
export type Interval = (typeof intervals)[number];
export const SOL_MINT = 'So11111111111111111111111111111111111111112';
