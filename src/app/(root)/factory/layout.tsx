import { Metadata } from 'next';

import FactoryOwnerGuardProvider from '@/providers/factory-owner-guard-provider';

import FactoryOwnerSidebarLayout from './_components/factory-sidebar-layout';

export const metadata: Metadata = {
  title: 'Factory',
  description: 'Factory panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FactoryOwnerGuardProvider>
      <FactoryOwnerSidebarLayout>{children}</FactoryOwnerSidebarLayout>
    </FactoryOwnerGuardProvider>
  );
}
