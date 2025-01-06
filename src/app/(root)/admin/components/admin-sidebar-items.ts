import { Boxes, Home, LayoutDashboard, Package, Users } from 'lucide-react';
import type { Route } from 'next';

import { SidebarItem } from '@/types/sidebar';

export const adminSidebarItems: SidebarItem[] = [
  {
    items: [
      {
        title: 'Dashboard',
        url: '/admin' as Route,
        icon: Home,
      },
      {
        title: 'Users',
        url: '/admin/users' as Route,
        icon: Users,
      },
      {
        title: 'Areas',
        url: '/admin/areas' as Route,
        icon: Boxes,
      },
      {
        title: 'Categories',
        url: '/admin/categories' as Route,
        icon: LayoutDashboard,
      },
      {
        title: 'Products',
        url: '/admin/products' as Route,
        icon: Package,
      },
    ],
  },
];
