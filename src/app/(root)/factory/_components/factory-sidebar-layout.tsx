'use client';

import { HomeIcon, ListIcon, Pen, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

import FactoryStatusCheck from '@/app/(root)/factory/_components/factory-status-check';
import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { FactoryBreadcrumbNav } from './breadcrumb-nav';

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
      isActive: pathname.includes('/factory/orders'),
    },
  ];

  return (
    <FactoryStatusCheck>
      <MySidebar navItems={navItems}>
        <div className="space-y-4">
          <FactoryBreadcrumbNav />
          {children}
        </div>
      </MySidebar>
    </FactoryStatusCheck>
  );
}
