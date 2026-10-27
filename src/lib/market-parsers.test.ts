import { describe, it, expect } from 'vitest';
import { nullableNumber, parseMarkets, parseCandles } from './market-parsers';
import { tokens } from './tokens';
const token = tokens[0];
const pool = (address = token.pool, mint = token.mint) => ({
  attributes: {
    address,
    base_token_price_usd: '0.0001',
    market_cap_usd: null,
    fdv_usd: '1000000',
    reserve_in_usd: '10000',
    volume_usd: { h24: '23000' },
    price_change_percentage: { h24: '-4.5' },
  },
  relationships: { base_token: { data: { id: `solana_${mint}` } } },
});
describe('market boundaries', () => {
  it('does not substitute FDV for an unavailable market cap', () => {
    const [market] = parseMarkets({ data: [pool()] }, [token]);
    expect(market.marketCap).toBeNull();
    expect(market.fdv).toBe(1000000);
    expect(market.price).toBe(0.0001);
    expect(market.change24h).toBe(-4.5);
  });
  it('rejects the wrong pool or token even if the other matches', () => {
    expect(parseMarkets({ data: [pool('wrong'), pool(token.pool, 'wrong')] }, [token])).toEqual([]);
  });
  it('preserves zero and rejects missing/non-finite numeric data', () => {
    expect(nullableNumber('0')).toBe(0);
    for (const value of [null, undefined, '', true, 'NaN', 'Infinity', {}, []])
      expect(nullableNumber(value)).toBeNull();
  });
  it('sorts, deduplicates and rejects contradictory candles', () => {
    const candles = parseCandles({
      data: {
        attributes: {
          ohlcv_list: [
            [200, 2, 4, 1, 3, 10],
            [100, 1, 3, 0.5, 2, 8],
            [100, 1, 4, 0.5, 3, 9],
            [300, 2, 1, 0, 3, 9],
            [400, 2, 4, 3, 3, 9],
            [500, 2, 4, 1, 3, -1],
          ],
        },
      },
    });
    expect(candles.map((c) => c.time)).toEqual([100, 200]);
    expect(candles[0].close).toBe(3);
  });
});
