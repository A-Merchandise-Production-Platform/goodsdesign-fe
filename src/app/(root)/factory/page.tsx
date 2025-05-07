'use client';

import {
  Activity,
  Award,
  Package,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react';
import { StatCard, StatCardType } from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardShell } from '@/components/dashboard-shell';
import { formatPrice } from '@/lib/utils';
import {
  FactoryRevenueChart,
  MonthlyRevenueData,
} from '@/components/factory-revenue-chart';
import { useGetMyFactoryDashboardQuery } from '@/graphql/generated/graphql';
import { Label, Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Helper function to format VND currency
const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function FactoryDashboard() {
  const { data, loading, error } = useGetMyFactoryDashboardQuery();

  // Loading state
  if (loading) {
    return (
      <DashboardShell
        title="Factory Dashboard"
        subtitle="Manage and view all your factory orders"
      >
        <div className="py-8 text-center">Loading dashboard data...</div>
      </DashboardShell>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <DashboardShell
        title="Factory Dashboard"
        subtitle="Manage and view all your factory orders"
      >
        <div className="py-8 text-center text-red-500">
          Error loading dashboard data. Please try again later.
        </div>
      </DashboardShell>
    );
  }

  const dashboardData = data.getMyFactoryDashboard;

  // Map the backend data to the format expected by StatCard component
  const factoryStats = [
    {
      title: 'In Production Orders',
      value: dashboardData.inProductionOrders,
      icon: <Package className="text-primary h-4 w-4" />,
    },
    {
      title: 'Pending Orders',
      value: dashboardData.pendingOrders,
      icon: <Activity className="text-primary h-4 w-4" />,
    },
    {
      title: 'Total Orders',
      value: dashboardData.inProductionOrders + dashboardData.pendingOrders,
      icon: <Truck className="text-primary h-4 w-4" />,
    },
  ];

  // Calculate order status distribution
  const orderStatusData = [
    {
      status: 'IN_PRODUCTION',
      count: dashboardData.inProductionOrders,
    },
    {
      status: 'PENDING',
      count: dashboardData.pendingOrders,
    },
  ];

  return (
    <DashboardShell
      title="Factory Dashboard"
      subtitle="Manage and view all your factory orders"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {factoryStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={Number(stat.value)}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Production Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.productionProgress.map((order, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-muted-foreground text-sm">
                        {order.customerOrder.customer.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice(order.customerOrder.totalPrice)}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {order.progressReports.length} updates
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  count: {
                    label: 'Orders',
                  },
                  IN_PRODUCTION: {
                    label: 'In Production',
                    color: 'hsl(var(--success))',
                  },
                  PENDING: {
                    label: 'Pending',
                    color: 'hsl(var(--warning))',
                  },
                }}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={orderStatusData}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          const total = orderStatusData.reduce(
                            (sum, s) => sum + s.count,
                            0,
                          );
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
                                {total}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Total Orders
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
