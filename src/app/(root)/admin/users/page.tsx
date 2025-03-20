'use client';

import UserTable from '@/app/(root)/admin/users/_components/user-table';
import { UsersIcon } from 'lucide-react';
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
          <div className="flex-1 text-5xl font-bold">{data?.users.length}</div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            This number is the total number of users in the system.
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
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            This number is the number of new users created in the current month.
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <UsersIcon className="h-4 w-4" />
            Role Percentage
          </div>
          <div className="grid flex-1 grid-cols-3 gap-4">
            {/* showing number of each role */}
            <div className="flex items-end gap-2 text-5xl font-bold">
              {data?.users.reduce((acc, user) => {
                return acc + (user.role === Roles.Customer ? 1 : 0);
              }, 0)}
              <span className="text-muted-foreground text-xs font-medium">
                Customer
              </span>
            </div>
            <div className="flex items-end gap-2 text-5xl font-bold">
              {data?.users.reduce((acc, user) => {
                return acc + (user.role === Roles.Factoryowner ? 1 : 0);
              }, 0)}
              <span className="text-muted-foreground text-xs font-medium">
                Factory Owner
              </span>
            </div>
            <div className="flex items-end gap-2 text-5xl font-bold">
              {data?.users.reduce((acc, user) => {
                return acc + (user.role === Roles.Staff ? 1 : 0);
              }, 0)}
              <span className="text-muted-foreground text-xs font-medium">
                Staff
              </span>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            This number is the number of users in each role.
          </div>
        </div>
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <UserTable refetch={refetch} loading={loading} data={data?.users} />
      </div>
    </div>
  );
}
