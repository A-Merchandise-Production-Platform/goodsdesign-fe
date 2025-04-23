'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Define the data type for monthly revenue data
export type MonthlyRevenueData = {
  month: string;
  revenue: number;
};

interface FactoryRevenueChartProps {
  data: MonthlyRevenueData[];
}

// Helper function to format VND currency
const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

export function FactoryRevenueChart({ data }: FactoryRevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          tickFormatter={value => {
            // Format larger numbers with M/B suffix for readability on axis
            if (value >= 1000000000) {
              return `${(value / 1000000000).toFixed(1)}B`;
            } else if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            }
            return formatVND(value);
          }}
        />
        <Tooltip
          formatter={value => [formatVND(Number(value)), 'Revenue']}
          labelFormatter={label => `Month: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={{ stroke: 'var(--chart-1)', strokeWidth: 2, r: 4 }}
          activeDot={{ stroke: 'var(--chart-1)', strokeWidth: 2, r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Alternative area chart version
export function FactoryRevenueAreaChart({ data }: FactoryRevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          tickFormatter={value => {
            // Format larger numbers with M/B suffix for readability on axis
            if (value >= 1000000000) {
              return `${(value / 1000000000).toFixed(1)}B`;
            } else if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            }
            return formatVND(value);
          }}
        />
        <Tooltip
          formatter={value => [formatVND(Number(value)), 'Revenue']}
          labelFormatter={label => `Month: ${label}`}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--chart-1)"
          fill="var(--chart-1)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
