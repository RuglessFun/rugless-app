import { describe, it, expect, vi } from 'vitest';
vi.mock('@/lib/server/markets', () => ({
  getCandles: vi.fn(async () => ({ candles: [], fetchedAt: 'test' })),
}));
import { GET } from './route';
import { getCandles } from '@/lib/server/markets';
import { tokens } from '@/lib/tokens';
describe('candle API', () => {
  it('blocks arbitrary token/pool input', async () => {
    const response = await GET(new Request('http://localhost/api?interval=1m'), {
      params: Promise.resolve({ mint: 'unknown' }),
    });
    expect(response.status).toBe(404);
    expect(getCandles).not.toHaveBeenCalled();
  });
  it('rejects unsupported intervals', async () => {
    const response = await GET(new Request('http://localhost/api?interval=../../evil'), {
      params: Promise.resolve({ mint: tokens[0].mint }),
    });
    expect(response.status).toBe(400);
    expect(getCandles).not.toHaveBeenCalled();
  });
  it('uses only the curated token and supported interval', async () => {
    const response = await GET(new Request('http://localhost/api?interval=5m'), {
      params: Promise.resolve({ mint: tokens[0].mint }),
    });
    expect(response.status).toBe(200);
    expect(getCandles).toHaveBeenCalledWith(tokens[0], '5m');
  });
});
