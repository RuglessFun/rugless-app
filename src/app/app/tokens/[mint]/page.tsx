import { notFound } from 'next/navigation';
import { findToken } from '@/lib/tokens';
import { TokenDetail } from '@/components/token-detail';
export default async function Page({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const token = findToken(mint);
  if (!token) notFound();
  return <TokenDetail token={token} />;
}
