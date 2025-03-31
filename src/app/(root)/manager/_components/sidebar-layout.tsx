'use client';

import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { HomeIcon, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ManagerSidebarLayout({
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
