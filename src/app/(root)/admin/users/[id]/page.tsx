import React from 'react';

import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function page() {
  return (
    <div className="flex h-screen flex-col">
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { href: '/admin/users', label: 'Users' },
          { label: 'User Detail' },
        ]}
      />
      <ScrollArea className="flex-grow">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">User Detail</h1>
        </div>
      </ScrollArea>
    </div>
  );
}
