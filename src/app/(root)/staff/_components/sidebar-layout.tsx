'use client';

import { HomeIcon, PaperclipIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { MySidebar, NavItem } from '@/components/shared/my-sidebar';

export default function StaffSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      href: '/staff',
      label: 'Dashboard',
      icon: <HomeIcon className="size-4" />,
    },
    {
      href: '/staff/tasks',
      label: 'Your task',
      icon: <PaperclipIcon className="size-4" />,
    },
  ];

  return <MySidebar navItems={navItems}>{children}</MySidebar>;
}
