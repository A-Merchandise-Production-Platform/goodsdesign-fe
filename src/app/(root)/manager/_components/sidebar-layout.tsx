'use client';

import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { HomeIcon, HouseIcon, PenSquareIcon, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ManagerSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      href: '/manger',
      label: 'Dashboard',
      icon: <HomeIcon className="size-4" />,
    },
    {
      href: '/manger/orders',
      label: 'Orders',
      icon: <ShoppingBag className="size-4" />,
    },
    {
      href: '/manger/fa',
      label: 'Factory Management',
      icon: <HouseIcon className="size-4" />,
    },
    {
      href: '/manger/orders',
      label: 'Tickets',
      icon: <PenSquareIcon className="size-4" />,
    },
  ];

  return <MySidebar navItems={navItems}>{children}</MySidebar>;
}
