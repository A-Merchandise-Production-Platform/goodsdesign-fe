import { Metadata } from 'next';

import ManagerGuardProvider from '@/providers/manager-guard-provider';

import ManagerSidebarLayout from './_components/sidebar-layout';

export const metadata: Metadata = {
  title: 'Manager',
  description: 'Manager panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ManagerGuardProvider>
      <ManagerSidebarLayout>{children}</ManagerSidebarLayout>
    </ManagerGuardProvider>
  );
}
