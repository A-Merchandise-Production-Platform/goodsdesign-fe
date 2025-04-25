'use client';

import {
  HomeIcon,
  PaperclipIcon,
  ShoppingBag,
  UserIcon,
  Users2Icon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { StaffBreadcrumbNav } from '@/app/(root)/staff/_components/breadcrumb-nav';
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
      isActive: pathname.includes('/staff/tasks'),
    },
  ];

  return (
    <MySidebar navItems={navItems}>
      <div className="space-y-4">
        <StaffBreadcrumbNav />
        {children}
      </div>
    </MySidebar>
  );
}
