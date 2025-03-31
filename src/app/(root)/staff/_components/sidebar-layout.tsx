'use client';

import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { HomeIcon, PaperclipIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function StaffSidebarLayout({
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
      label: 'Your task',
      icon: <PaperclipIcon className="size-4" />,
    },
  ];

  return <MySidebar navItems={navItems}>{children}</MySidebar>;
}
