'use client';

import { CogIcon, HomeIcon, ShoppingBag, ShoppingCartIcon, UsersIcon } from 'lucide-react';
import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { usePathname } from 'next/navigation';

export default function FactoryOwnerSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      href: '/factory',
      label: 'Dashboard',
      icon: <HomeIcon className="size-4" />,
    },
    {
      href: '/factory/orders',
      label: 'Orders',
      icon: <ShoppingBag className="size-4" />,
    },
  ];

  return <MySidebar navItems={navItems}>{children}</MySidebar>;
}
