'use client';

import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import UserDataTable from '@/app/(root)/admin/users/components/user-data-table';

export default function Page() {
  return (
    <div>
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Users' },
        ]}
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <UserDataTable />
      </div>
    </div>
  );
}
