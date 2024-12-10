import { Metadata } from 'next';

import { AdminSidebar } from '@/app/(root)/admin/components/admin-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
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
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </AdminGuardProvider>
  );
}
