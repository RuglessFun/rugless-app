import { findToken } from '@/lib/tokens';
import { getCandles } from '@/lib/server/markets';
import { intervals, type Interval } from '@/lib/types';
export async function GET(request: Request, { params }: { params: Promise<{ mint: string }> }) {
  const token = findToken((await params).mint);
  if (!token) return Response.json({ error: 'Unknown token' }, { status: 404 });
  const interval = new URL(request.url).searchParams.get('interval') || '1m';
  if (!intervals.includes(interval as Interval))
    return Response.json({ error: 'Unsupported interval' }, { status: 400 });
  try {
    return Response.json(await getCandles(token, interval as Interval), {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' },
    });
  } catch {
    return Response.json({ error: 'Candles are unavailable. Please retry.' }, { status: 503 });
  }
}
