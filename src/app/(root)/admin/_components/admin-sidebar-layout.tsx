'use client';

import { CogIcon, HomeIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react';
import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { usePathname } from 'next/navigation';

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: <HomeIcon className="size-4" />,
    },
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
      isActive: pathname.includes('/products'),
    },
    {
      href: '/admin/system',
      label: 'System',
      icon: <CogIcon className="size-4" />,
      isActive: pathname.includes('/system'),
    },
  ];

  return <MySidebar navItems={navItems}>{children}</MySidebar>;
}
