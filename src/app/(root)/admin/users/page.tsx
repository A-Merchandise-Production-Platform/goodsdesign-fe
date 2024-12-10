'use client';

import { UserApi } from '@/api/user';
import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div>
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Users management' },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Button
          className="w-52"
          onClick={() => {
            UserApi.getUsers({
              count: true,
              select: ['id', 'userName', 'email'],
            }).then(response => {
              console.log(response);
            });
          }}
        >
          Fetch users
        </Button>
      </div>
    </div>
  );
}
