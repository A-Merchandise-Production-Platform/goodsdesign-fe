'use client';

import { DashboardShell } from '@/components/dashboard-shell';

export default function StaffOrdersPage() {
  return (
    <DashboardShell
      title="Orders Management"
      subtitle="View and manage customer orders"
    >
      <div className="flex flex-col gap-4">
        <h1>Orders Management</h1>
        <p>This page displays all customer orders.</p>
      </div>
    </DashboardShell>
  );
}
