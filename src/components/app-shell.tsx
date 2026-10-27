'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Coins,
  MessageCircle,
  Flame,
  Star,
  GitBranch,
  BookOpen,
  Plus,
  ArrowLeft,
  PanelLeftClose,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { WalletButton } from './wallet-button';
const explore = [
  { label: 'Overview', href: '/app', icon: LayoutDashboard },
  { label: 'All tokens', href: '/app/tokens', icon: Coins },
  { label: 'X feed', href: '/app/feed', icon: MessageCircle },
  { label: 'Buybacks & burns', href: '/app/receipts', icon: Flame },
  { label: 'Watchlist', href: '/app/watchlist', icon: Star },
];
function Navigation() {
  const pathname = usePathname(),
    { setOpenMobile, isMobile } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="sidebar-brand">
          <img src="/brand/logo.svg" alt="" />
          <span>
            rugless<small>Community app</small>
          </span>
        </Link>
        {isMobile && (
          <button
            aria-label="Close menu"
            onClick={() => setOpenMobile(false)}
            className="sidebar-close"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarMenu>
            {explore.map(({ label, href, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === href || (href === '/app/tokens' && pathname.startsWith(href + '/'))
                  }
                  tooltip={label}
                >
                  <Link href={href} onClick={() => setOpenMobile(false)}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Build together</SidebarGroupLabel>
          <SidebarMenu>
            {[
              { label: 'Nominate a meme', href: '/#participate', icon: Plus },
              { label: 'Roadmap', href: '/roadmap', icon: GitBranch },
              { label: 'How funds flow', href: '/#flywheel', icon: BookOpen },
            ].map(({ label, href, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild tooltip={label}>
                  <Link href={href}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="sidebar-note">
          <span>[ community → culture ]</span>
          <p>
            Spot it. Make the case.
            <br />
            Build something worth backing.
          </p>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to website">
              <Link href="/">
                <ArrowLeft />
                <span>Back to website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname(),
    [open, setOpen] = useState(true);
  const title = explore.find((x) => x.href === pathname)?.label || 'Token';
  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      style={{ '--sidebar-width': '15rem', '--sidebar-width-icon': '4rem' } as React.CSSProperties}
    >
      <Navigation />
      <div className="workspace">
        <header className="workspace-header">
          <div>
            <SidebarTrigger />
            <span className="divider" />
            <Link href="/app">App</Link>
            <span>/</span>
            <strong>{title}</strong>
          </div>
          <WalletButton />
        </header>
        <main id="main" className="workspace-main">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
