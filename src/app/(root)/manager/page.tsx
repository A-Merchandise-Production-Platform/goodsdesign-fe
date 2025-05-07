'use client';

import {
  ArrowRightIcon,
  Building2Icon,
  ClipboardIcon,
  DollarSignIcon,
  LaptopIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard, StatCardType } from '@/components/stat-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetManagerDashboardQuery } from '@/graphql/generated/graphql';
import { formatPrice, formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function Page() {
  const { data, loading } = useGetManagerDashboardQuery();

  if (loading) {
    return (
      <DashboardShell
        title="Manager Dashboard"
        subtitle="View and manage all your operations"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    );
  }

  const dashboardData = data?.getManagerDashboard;

  if (!dashboardData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">Error loading dashboard data</p>
      </div>
    );
  }

  return (
    <DashboardShell
      title="Manager Dashboard"
      subtitle="View and manage all your operations"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Factories"
          value={dashboardData.stats.totalFactories}
          icon={<Building2Icon className="h-5 w-5" />}
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.totalOrders}
          icon={<ClipboardIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Staff Members"
          value={dashboardData.stats.totalStaffs}
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Monthly Revenue"
          value={dashboardData.stats.monthlyRevenue}
          icon={<DollarSignIcon className="h-5 w-5" />}
          type={StatCardType.CURRENCY}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>
              Monthly revenue for {new Date().getFullYear()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <svg className="h-full w-full" viewBox="0 0 500 200">
                {/* X-axis */}
                <line
                  x1="40"
                  y1="180"
                  x2="480"
                  y2="180"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />

                {/* Y-axis */}
                <line
                  x1="40"
                  y1="20"
                  x2="40"
                  y2="180"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />

                {/* X-axis labels (months) */}
                {dashboardData.stats.revenueByMonth.map((data, i) => {
                  const x =
                    40 +
                    (440 /
                      Math.max(
                        1,
                        dashboardData.stats.revenueByMonth.length - 1,
                      )) *
                      i;
                  return (
                    <text
                      key={`month-${i}`}
                      x={x}
                      y="195"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#64748b"
                    >
                      {data.month}
                    </text>
                  );
                })}

                {/* Y-axis labels (revenue values) */}
                {[0, 0.25, 0.5, 0.75, 1].map((value, i) => {
                  const maxRevenue = Math.max(
                    ...dashboardData.stats.revenueByMonth.map(m => m.revenue),
                  );
                  const y = 180 - (160 / maxRevenue) * (maxRevenue * value);
                  return (
                    <g key={`revenue-${i}`}>
                      <text
                        x="35"
                        y={y + 3}
                        textAnchor="end"
                        fontSize="10"
                        fill="#64748b"
                      >
                        {formatPrice(Math.round(maxRevenue * value))}
                      </text>
                      <line
                        x1="40"
                        y1={y}
                        x2="480"
                        y2={y}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="4"
                      />
                    </g>
                  );
                })}

                {/* Revenue line */}
                <polyline
                  points={dashboardData.stats.revenueByMonth
                    .map((data, i) => {
                      const x =
                        40 +
                        (440 /
                          Math.max(
                            1,
                            dashboardData.stats.revenueByMonth.length - 1,
                          )) *
                          i;
                      const maxRevenue = Math.max(
                        ...dashboardData.stats.revenueByMonth.map(
                          m => m.revenue,
                        ),
                      );
                      const y = 180 - (160 / maxRevenue) * data.revenue;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                {/* Data points */}
                {dashboardData.stats.revenueByMonth.map((data, i) => {
                  const x =
                    40 +
                    (440 /
                      Math.max(
                        1,
                        dashboardData.stats.revenueByMonth.length - 1,
                      )) *
                      i;
                  const maxRevenue = Math.max(
                    ...dashboardData.stats.revenueByMonth.map(m => m.revenue),
                  );
                  const y = 180 - (160 / maxRevenue) * data.revenue;
                  return (
                    <circle
                      key={`point-${i}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="white"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Current order status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  count: {
                    label: 'Orders',
                  },
                  COMPLETED: {
                    label: 'Completed',
                    color: 'hsl(var(--success))',
                  },
                  REJECTED: {
                    label: 'Rejected',
                    color: 'hsl(var(--destructive))',
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
                    data={dashboardData.factoryOrdersByStatus.map(status => ({
                      status: status.status,
                      count: status.count,
                      fill:
                        status.status === 'COMPLETED'
                          ? 'hsl(var(--success))'
                          : status.status === 'REJECTED'
                            ? 'hsl(var(--destructive))'
                            : 'hsl(var(--warning))',
                    }))}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          const total =
                            dashboardData.factoryOrdersByStatus.reduce(
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

      {/* Top Factories */}

      {/* Orders & User Activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders across all factories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentFactoryOrders.map(order => (
                    <TableRow key={order.customerOrder.id}>
                      <TableCell className="font-medium">
                        {order.customerOrder.id}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.customerOrder.status === 'COMPLETED'
                              ? 'default'
                              : order.customerOrder.status === 'PENDING'
                                ? 'outline'
                                : 'secondary'
                          }
                        >
                          {order.customerOrder.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(order.customerOrder.totalPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto" asChild>
              <Link href="/manager/orders">View All Orders</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Factories</CardTitle>
            <CardDescription>
              Factories ranked by legitimacy points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topFactories.map((factory, index) => (
                <div
                  key={factory.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-primary font-medium">
                        {factory.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{factory.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {factory.owner.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="px-3 py-1">
                      {factory.legitPoint} points
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      Rank #{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
