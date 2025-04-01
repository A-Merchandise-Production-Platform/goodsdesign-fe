'use client';

import { UsersIcon } from 'lucide-react';

import UserTable from '@/app/(root)/admin/users/_components/user-table';
import { Roles, useGetUsersQuery } from '@/graphql/generated/graphql';

export default function Page() {
  const { data, loading, refetch } = useGetUsersQuery();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <UsersIcon className="h-4 w-4" />
            Total Users
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.users.length}
            <span className="text-muted-foreground ml-2 text-base font-medium">
              users
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <UsersIcon className="h-4 w-4" />
            New User this month
          </div>
          <div className="flex-1 text-5xl font-bold">
            {
              (
                data?.users?.filter(user => {
                  const date = new Date(user.createdAt);
                  return (
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear()
                  );
                }) || []
              ).length
            }
            <span className="text-muted-foreground text-base font-medium">
              / {data?.users.length}
              <span className="text-muted-foreground ml-2 text-base font-medium">
                users
              </span>
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm"></div>
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <UserTable refetch={refetch} loading={loading} data={data?.users} />
      </div>
    </div>
  );
}
