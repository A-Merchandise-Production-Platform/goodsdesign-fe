'use client';

import {
  CogIcon,
  HomeIcon,
  LayoutGrid,
  Shirt,
  SquareBottomDashedScissors,
  UsersIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { AdminBreadcrumbNav } from '@/app/(root)/admin/_components/breadcrumb-nav';
import { MySidebar, NavItem } from '@/components/shared/my-sidebar';

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
      isActive: pathname.includes('/admin/users'),
    },
    {
      href: '/admin/categories',
      label: 'Categories',
      icon: <LayoutGrid className="size-4" />,
      isActive: pathname.includes('/admin/categories'),
    },
    {
      href: '/admin/products',
      label: 'Products',
      icon: <Shirt className="size-4" />,
      isActive: pathname.includes('/admin/products'),
    },
    {
      href: '/admin/templates',
      label: 'Templates',
      icon: <SquareBottomDashedScissors className="size-4" />,
      isActive: pathname.includes('/admin/templates'),
    },
    {
      href: '/admin/system',
      label: 'System',
      icon: <CogIcon className="size-4" />,
      isActive: pathname.includes('/admin/system'),
    },
  ];

  return (
    <MySidebar navItems={navItems}>
      <div className="space-y-4">
        <AdminBreadcrumbNav />
        {children}
      </div>
    </MySidebar>
  );
}
