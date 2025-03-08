'use client';

import UserDataTable from '@/app/(root)/admin/users/_components/user-data-table';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  return (
    <div className="h-full space-y-4">
      <div className="flex h-52 gap-4">
        <div className="bg-background h-full w-1/3 rounded-lg" />
        <div className="bg-background h-full w-1/3 rounded-lg" />
        <div className="bg-background h-full w-1/3 rounded-lg" />
      </div>
      <div className="bg-background min-h-[calc(100vh-20rem-1.5rem)] rounded-lg p-4">
        <UserDataTable />
      </div>
    </div>
  );
}
