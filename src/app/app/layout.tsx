import { AppShell } from '@/components/app-shell';
import { SolanaProvider } from '@/components/wallet-provider';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="next-design application">
      <SolanaProvider>
        <AppShell>{children}</AppShell>
      </SolanaProvider>
    </div>
  );
}
