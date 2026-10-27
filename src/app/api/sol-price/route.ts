import { unstable_cache } from 'next/cache';
const quote = unstable_cache(
  async () => {
    const response = await fetch('https://api.coinbase.com/v2/prices/SOL-USD/spot', {
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    if (!response.ok) throw Error('Unavailable');
    const { data } = await response.json();
    const price = Number(data?.amount);
    if (data?.base !== 'SOL' || data?.currency !== 'USD' || !Number.isFinite(price) || price <= 0)
      throw Error('Invalid quote');
    return { price, fetchedAt: new Date().toISOString(), source: 'Coinbase' };
  },
  ['sol-usd'],
  { revalidate: 60 },
);
export async function GET() {
  try {
    return Response.json(await quote(), { headers: { 'Cache-Control': 'public, s-maxage=60' } });
  } catch {
    return Response.json({ error: 'SOL quote unavailable' }, { status: 503 });
  }
}
