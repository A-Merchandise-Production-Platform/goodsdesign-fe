'use client';

import { UserCheckIcon, UserPlusIcon, UsersIcon } from 'lucide-react';

import UserTable from '@/app/(root)/admin/users/_components/user-table';
import { StatCard } from '@/components/stat-card';
import { Roles, useGetUsersQuery } from '@/graphql/generated/graphql';
import { DashboardShell } from '@/components/dashboard-shell';

export default function Page() {
  const { data, loading, refetch } = useGetUsersQuery();

  // Calculate fake stats data
  const totalUsers = data?.users.length || 0;
  const newUsers =
    data?.users?.filter(user => {
      const date = new Date(user.createdAt);
      return (
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      );
    }).length || 0;
  const activeUsers = data?.users?.filter(user => user.isActive).length || 0;

  return (
    <DashboardShell title="Users" subtitle="Manage your users">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={totalUsers}
          change={0}
          changeType="positive"
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          title="New Users This Month"
          value={newUsers}
          change={0}
          changeType="positive"
          icon={<UserPlusIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Active Users"
          value={activeUsers}
          change={0}
          changeType="positive"
          icon={<UserCheckIcon className="h-5 w-5" />}
        />
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <UserTable refetch={refetch} loading={loading} data={data?.users} />
      </div>
    </DashboardShell>
  );
}
