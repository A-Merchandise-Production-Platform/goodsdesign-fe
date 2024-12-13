import { Home,  LayoutDashboard, Package, Users } from 'lucide-react';

import { SidebarItem } from '@/types/sidebar';

export const adminSidebarItems: SidebarItem[] = [
  {
    items: [
      {
        title: 'Dashboard',
        url: '/admin',
        icon: Home,
      },
      {
        title: 'Users',
        url: '/admin/users',
        icon: Users,
      },
      {
        title: 'Areas',
        url: '/admin/areas',
        icon: Package,
      },
      {
        title: 'Categories',
        url: '/admin/categories',
        icon: LayoutDashboard,
      },
    ],
  },
];
