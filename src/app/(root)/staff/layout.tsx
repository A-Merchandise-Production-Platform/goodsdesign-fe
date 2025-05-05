'use client';

import StaffGuardProvider from '@/providers/staff-guard-provider';

import StaffSidebarLayout from './_components/sidebar-layout';

export default function StaffLayout({
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
