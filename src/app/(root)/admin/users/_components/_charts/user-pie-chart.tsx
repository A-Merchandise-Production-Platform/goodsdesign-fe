'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { UserAnalyticsQuery, Roles } from '@/graphql/generated';
import { getRoleColor, getRoleLabel } from '@/lib/roles';

const chartConfig = {
  count: {
    label: 'Users',
    color: 'transparent',
  },
  [Roles.Admin]: {
    label: 'Admin',
    color: getRoleColor(Roles.Admin),
  },
  [Roles.Manager]: {
    label: 'Manager',
    color: getRoleColor(Roles.Manager),
  },
  [Roles.Staff]: {
    label: 'Staff',
    color: getRoleColor(Roles.Staff),
  },
  [Roles.Factoryowner]: {
    label: 'Factory Owner',
    color: getRoleColor(Roles.Factoryowner),
  },
  [Roles.Customer]: {
    label: 'Customer',
    color: getRoleColor(Roles.Customer),
  },
} satisfies ChartConfig;

interface UserPieChartProps {
  data: UserAnalyticsQuery;
}

export function UserPieChart({ data }: UserPieChartProps) {
  const totalUsers = React.useMemo(() => {
    if (!data?.userAnalytics.roleDistribution) return 0;
    return data.userAnalytics.roleDistribution.reduce(
      (acc, curr) => acc + curr.count,
      0,
    );
  }, [data]);

  const chartData = React.useMemo(() => {
    if (!data?.userAnalytics.roleDistribution) return [];
    return data.userAnalytics.roleDistribution.map(item => ({
      role: item.role,
      count: item.count,
      fill: getRoleColor(item.role as Roles),
      label: getRoleLabel(item.role as Roles),
    }));
  }, [data]);

  if (!data) return null;

  return (
    <div className="flex items-center gap-8">
      <ChartContainer config={chartConfig} className="aspect-square h-full">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="role"
            innerRadius={50}
            outerRadius={80}
            strokeWidth={5}
            stroke="#fff"
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalUsers.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Users
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="flex flex-col gap-3">
        {chartData.map(item => (
          <div key={item.role} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-muted-foreground text-sm">{item.label}</span>
            <span className="text-sm font-medium">
              {item.count.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
