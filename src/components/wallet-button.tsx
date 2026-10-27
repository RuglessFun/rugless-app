'use client';
import dynamic from 'next/dynamic';
export const WalletButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((m) => m.WalletMultiButton),
  {
    ssr: false,
    loading: () => (
      <button className="wallet-loading" disabled>
        Connect wallet
      </button>
    ),
  },
);
