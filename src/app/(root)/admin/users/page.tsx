'use client';

import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Users' },
        ]}
      />
      <ScrollArea className="grow">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">User Management</h1>
        </div>
      </ScrollArea>
    </div>
  );
}
