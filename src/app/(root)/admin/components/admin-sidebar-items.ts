import { Home, icons, Users } from 'lucide-react';

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
        title: 'Users management',
        url: '/admin/users',
        icon: Users,
      },
    ],
  },
];
