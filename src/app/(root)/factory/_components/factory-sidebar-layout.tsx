'use client';

import { HomeIcon, ListIcon, Pen, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import FactoryStatusCheck from '@/app/(root)/factory/_components/factory-status-check';

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

  return (
    <FactoryStatusCheck>
      <MySidebar navItems={navItems}>{children}</MySidebar>
    </FactoryStatusCheck>
  );
}
