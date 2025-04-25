'use client';

import StaffSidebarLayout from './_components/sidebar-layout';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffSidebarLayout>{children}</StaffSidebarLayout>;
}
