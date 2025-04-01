import StaffGuardProvider from '@/providers/staff-guard-provider';
import { Metadata } from 'next';
import StaffSidebarLayout from './_components/sidebar-layout';

export const metadata: Metadata = {
  title: 'Staff',
  description: 'Staff panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StaffGuardProvider>
      <StaffSidebarLayout>{children}</StaffSidebarLayout>
    </StaffGuardProvider>
  );
}
