'use client';

import React, { useMemo } from 'react';

import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { Roles } from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [
      { href: '/profile', label: 'Profile' },
      { href: '/profile/account', label: 'Account' },
      { href: '/profile/appearance', label: 'Appearance' },
      { href: '/profile/notifications', label: 'Notifications' },
      { href: '/profile/display', label: 'Display' },
    ];

    if (user?.role === Roles.Factoryowner) {
      items.splice(1, 0, { href: '/profile/factory', label: 'Factory' });
    }

    return items;
  }, [user]);

  return (
    <div className="container mx-auto py-6">
      <MySidebar navItems={navItems}>{children}</MySidebar>
    </div>
  );
}
