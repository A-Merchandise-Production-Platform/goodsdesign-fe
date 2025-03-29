import AdminSidebarLayout from '@/app/(root)/admin/_components/admin-sidebar-layout';
import AdminGuardProvider from '@/providers/admin-guard-provider';
import { Metadata } from 'next';

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
