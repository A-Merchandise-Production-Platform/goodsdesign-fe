import { CogIcon, HomeIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react';
import { Metadata } from 'next';

import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import AdminGuardProvider from '@/providers/admin-guard-provider';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin panel',
};

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: <HomeIcon className="size-4" /> },
  {
    href: '/admin/users',
    label: 'Users',
    icon: <UsersIcon className="size-4" />,
  },
  {
    href: '/admin/categories',
    label: 'Categories',
    icon: <ShoppingCartIcon className="size-4" />,
  },
  {
    href: '/admin/products',
    label: 'Products',
    icon: <ShoppingCartIcon className="size-4" />,
  },
  {
    href: '/admin/system',
    label: 'System',
    icon: <CogIcon className="size-4" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuardProvider>
      <MySidebar navItems={navItems}>{children}</MySidebar>
    </AdminGuardProvider>
  );
}
