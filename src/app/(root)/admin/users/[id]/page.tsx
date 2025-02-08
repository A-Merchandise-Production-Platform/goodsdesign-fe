import { ChevronLeft } from 'lucide-react';
import React from 'react';

import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import UserDetail from '@/app/(root)/admin/users/[id]/_components/user-detail';
import { Button } from '@/components/ui/button';
import GoBackButton from '@/components/ui/go-back-button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="flex h-screen flex-col">
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { href: '/admin/users', label: 'Users' },
          { label: 'User Detail' },
        ]}
      />
      <ScrollArea className="grow">
        <div className="space-y-4 p-4">
          <GoBackButton />
          <h1 className="text-2xl font-bold">User Detail</h1>
          <UserDetail id={params.id} />
        </div>
      </ScrollArea>
    </div>
  );
}
