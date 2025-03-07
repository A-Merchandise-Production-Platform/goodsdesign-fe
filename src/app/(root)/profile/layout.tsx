import { Metadata } from 'next';

import { NavItem, MySidebar } from '@/components/shared/my-sidebar';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import AdminGuardProvider from '@/providers/admin-guard-provider';
import AuthGuardProvider from '@/providers/auth-guard-provider';

export const metadata: Metadata = {
  title: 'Profile',
};

const navItems: NavItem[] = [
  { href: '/profile', label: 'Profile' },
  { href: '/profile/account', label: 'Account' },
  { href: '/profile/appearance', label: 'Appearance' },
  { href: '/profile/notifications', label: 'Notifications' },
  { href: '/profile/display', label: 'Display' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AuthGuardProvider>
        <div className="container mx-auto py-6">
          <MySidebar navItems={navItems} children={children} />
        </div>
        <Footer />
      </AuthGuardProvider>
    </main>
  );
}
