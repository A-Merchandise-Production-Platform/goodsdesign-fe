'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { UserAnalyticsQuery } from '@/graphql/generated';

const chartConfig = {
  users: {
    label: 'Users',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

interface UserAreaChartProps {
  data: UserAnalyticsQuery;
}

export function UserAreaChart({ data }: UserAreaChartProps) {
  const chartData = React.useMemo(() => {
    if (!data?.userAnalytics.monthlyGrowth) return [];
    return data.userAnalytics.monthlyGrowth.map(item => ({
      month: item.month,
      users: item.users,
    }));
  }, [data]);

  if (!data) return null;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={value => value.slice(0, 3)}
          className="text-xs"
        />
        {/* <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs"
        /> */}
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={label => `${label}`}
              formatter={value => [`${value} users`, 'Total']}
            />
          }
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
