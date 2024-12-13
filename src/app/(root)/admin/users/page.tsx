'use client';

import { useState } from 'react';

import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import UserDataTable from '@/app/(root)/admin/users/components/user-data-table';
import ImageInput from '@/components/shared/image/image-input';

export default function Page() {
  const [file, setFile] = useState<File | undefined>();
  return (
    <div>
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Users' },
        ]}
      />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">User Management</h1>
        <UserDataTable />
      </div>
      <div className="w-96">
        <ImageInput onChange={setFile} ratio="1:1" />
      </div>
    </div>
  );
}
