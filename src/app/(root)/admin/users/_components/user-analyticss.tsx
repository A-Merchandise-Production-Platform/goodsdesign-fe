'use client';

import { UserAreaChart } from '@/app/(root)/admin/users/_components/_charts/user-area-chart';
import { UserPieChart } from '@/app/(root)/admin/users/_components/_charts/user-pie-chart';
import { useUsersAnalytics } from '@/app/(root)/admin/users/_hooks/use-user-analytics';
import React from 'react';

export default function UserAnalyticss() {
  const { data, isLoading, isError } = useUsersAnalytics();

  console.log(data);

  if (isLoading || isError)
    return (
      <div className="flex h-52 gap-4">
        <div className="bg-background h-full w-1/3 animate-pulse rounded-lg" />
        <div className="bg-background h-full w-1/3 animate-pulse rounded-lg" />
        <div className="bg-background h-full w-1/3 animate-pulse rounded-lg" />
      </div>
    );

  return (
    <div>
      <div className="flex h-52 gap-4">
        <div className="bg-background flex h-full w-1/3 rounded-lg p-4">
          <UserPieChart data={data!} />
        </div>
        <div className="bg-background h-full w-1/3 rounded-lg p-4">
          <UserAreaChart data={data!} />
        </div>
        <div className="bg-background h-full w-1/3 rounded-lg" />
      </div>
    </div>
  );
}
