'use client';

import {
  HomeIcon,
  HouseIcon,
  ListIcon,
  PenSquareIcon,
  ShoppingBag,
  TicketIcon,
  User2Icon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { ManagerBreadcrumbNav } from '@/app/(root)/manager/_components/breadcrumb-nav';
import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { Badge } from '@/components/ui/badge';

export default function ManagerSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      href: '/manager',
      label: 'Dashboard',
      icon: <HomeIcon className="size-4" />,
    },
    {
      href: '/manager/orders',
      label: 'Orders',
      icon: <ShoppingBag className="size-4" />,
      isActive: pathname.includes('/manager/orders'),
    },
    {
      href: '/manager/factory',
      label: 'Factory Management',
      icon: <HouseIcon className="size-4" />,
      isActive: pathname.includes('/manager/factory'),
    },
    {
      href: '/manager/users',
      label: 'Users Management',
      icon: <User2Icon className="size-4" />,
      isActive: pathname.includes('/manager/users'),
    },
    {
      href: '/manager/voucher',
      label: 'Voucher',
      icon: <TicketIcon className="size-4" />,
      isActive: pathname.includes('/manager/voucher'),
    },
  ];

  return (
    <MySidebar navItems={navItems}>
      <div className="space-y-4">
        <ManagerBreadcrumbNav />
        {children}
      </div>
    </MySidebar>
  );
}
