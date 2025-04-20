import { Metadata } from 'next';

import AdminSidebarLayout from '@/app/(root)/admin/_components/sidebar-layout';
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
