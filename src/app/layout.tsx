import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { RiskNotice } from '@/components/risk-notice';
import './globals.css';
const mono = localFont({
  src: [
    { path: '../../public/fonts/mono.ttf', weight: '400' },
    { path: '../../public/fonts/mono-bold.ttf', weight: '700' },
  ],
  variable: '--font-mono',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Rugless — The end of the rug.', template: '%s — Rugless' },
  description:
    'Find the story worth backing. Open-source meme discovery, live Solana charts and wallet-connected trading.',
  openGraph: { images: ['/brand/cover.png'] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mono.variable}>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
        <RiskNotice />
      </body>
    </html>
  );
}
