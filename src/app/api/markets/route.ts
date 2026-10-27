import { getMarkets } from '@/lib/server/markets';
export async function GET() {
  try {
    return Response.json(await getMarkets(), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch {
    return Response.json({ error: 'Market data is unavailable. Please retry.' }, { status: 503 });
  }
}
