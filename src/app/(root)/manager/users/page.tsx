'use client';

import {
  UsersIcon,
  UserPlusIcon,
  UserCheckIcon,
  UserXIcon,
} from 'lucide-react';

import { Roles, useGetUsersQuery } from '@/graphql/generated/graphql';
import UserTable from '@/app/(root)/manager/users/_components/staff-data-table';
import { StatCard } from '@/components/stat-card';
import { calculateChange } from '@/lib/calculate-change';
import { DashboardShell } from '@/components/dashboard-shell';

export default function Page() {
  const { data, loading, refetch } = useGetUsersQuery();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-background col-span-1 row-span-1 flex h-40 animate-pulse flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm"
            >
              <div className="bg-muted h-4 w-24 rounded"></div>
              <div className="bg-muted h-8 w-16 rounded"></div>
              <div className="bg-muted h-4 w-20 rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-background col-span-3 row-span-3 rounded-lg">
          <UserTable refetch={refetch} loading={loading} data={[]} />
        </div>
      </div>
    );
  }

  const users = data?.users || [];
  const totalUsers = users.length;

  // Calculate user statistics
  const activeUsers = users.filter(user => user.isActive).length;
  const newUsersThisMonth = users.filter(user => {
    const date = new Date(user.createdAt);
    return (
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    );
  }).length;
  const inactiveUsers = users.filter(user => !user.isActive).length;

  // Calculate changes (using sample data for now)
  const lastMonthTotal = Math.floor(totalUsers * 0.95); // 5% decrease
  const lastMonthActive = Math.floor(activeUsers * 0.98); // 2% decrease
  const lastMonthNew = Math.floor(newUsersThisMonth * 0.8); // 20% decrease
  const lastMonthInactive = Math.floor(inactiveUsers * 1.1); // 10% increase

  // Calculate changes
  const totalChange = calculateChange(totalUsers, lastMonthTotal);
  const activeChange = calculateChange(activeUsers, lastMonthActive);
  const newChange = calculateChange(newUsersThisMonth, lastMonthNew);
  const inactiveChange = calculateChange(inactiveUsers, lastMonthInactive);

  return (
    <DashboardShell
      title="Users Management"
      subtitle="View and manage all users"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers.toString()}
            change={totalChange.change}
            changeType={totalChange.type}
            icon={<UsersIcon className="h-5 w-5" />}
          />
          <StatCard
            title="Active Users"
            value={activeUsers.toString()}
            change={activeChange.change}
            changeType={activeChange.type}
            icon={<UserCheckIcon className="h-5 w-5" />}
          />
          <StatCard
            title="New This Month"
            value={newUsersThisMonth.toString()}
            change={newChange.change}
            changeType={newChange.type}
            icon={<UserPlusIcon className="h-5 w-5" />}
          />
          <StatCard
            title="Inactive Users"
            value={inactiveUsers.toString()}
            change={inactiveChange.change}
            changeType={inactiveChange.type}
            icon={<UserXIcon className="h-5 w-5" />}
          />
        </div>
        <div className="bg-background col-span-3 row-span-3 rounded-lg">
          <UserTable refetch={refetch} loading={loading} data={users} />
        </div>
      </div>
    </DashboardShell>
  );
}
