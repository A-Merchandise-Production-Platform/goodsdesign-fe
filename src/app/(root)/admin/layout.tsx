import { CogIcon, HomeIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react';
import { Metadata } from 'next';

import { AdminBreadcrumbNav } from '@/app/(root)/admin/_components/breadcrumb-nav';
import AdminSidebarLayout from '@/app/(root)/admin/_components/sidebar-layout';
import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import AdminGuardProvider from '@/providers/admin-guard-provider';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuardProvider>
      <AdminSidebarLayout>{children}</AdminSidebarLayout>
    </AdminGuardProvider>
  );
}
