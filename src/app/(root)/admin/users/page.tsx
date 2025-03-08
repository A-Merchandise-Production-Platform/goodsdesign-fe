'use client';

import UserAnalyticss from '@/app/(root)/admin/users/_components/user-analyticss';
import UserDataTable from '@/app/(root)/admin/users/_components/user-data-table';

export default function Page() {
  return (
    <div className="h-full space-y-4">
      <UserAnalyticss />
      <div className="bg-background min-h-[calc(100vh-20rem-1.5rem)] rounded-lg p-4">
        <UserDataTable />
      </div>
    </div>
  );
}
