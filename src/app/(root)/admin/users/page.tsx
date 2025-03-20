'use client';

import UserTable from '@/app/(root)/admin/users/_components/user-table';

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background col-span-1 row-span-1 h-40 rounded-lg" />
        <div className="bg-background col-span-1 row-span-1 h-40 rounded-lg" />
        <div className="bg-background col-span-1 row-span-1 h-40 rounded-lg" />
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg p-4">
        <UserTable />
      </div>
    </div>
  );
}
