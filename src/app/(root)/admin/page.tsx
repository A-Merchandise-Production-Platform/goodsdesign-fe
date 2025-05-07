'use client';

import {
  DollarSignIcon,
  FileTextIcon,
  PackageIcon,
  PercentIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react';

import { DashboardShell } from '@/components/dashboard-shell';
import {
  StatCard,
  StatCardType as StatCardDisplay,
} from '@/components/stat-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Roles, useGetAdminDashboardQuery } from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Define types for metric data
type PerformanceMetric = {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
};

// Define types for metric data
type QuickAction = {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  action: () => void;
};

// Helper function to format percentage
const formatPercentage = (value: number): string => {
  return `${Math.abs(value)}%`;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { data, loading, error } = useGetAdminDashboardQuery();

  // If loading, return a loading state
  if (loading) {
    return (
      <DashboardShell
        title="Admin Dashboard"
        subtitle="Welcome to your admin dashboard overview"
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
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="hover:bg-accent w-full justify-between rounded-lg p-4 py-6 pl-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="ml-4 space-y-2">
                          <Skeleton className="h-4 w-[150px]" />
                          <Skeleton className="h-3 w-[100px]" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-[80px]" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-3">
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Skeleton className="h-4 w-[80px]" />
                      <Skeleton className="h-3 w-[100px]" />
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

  // If error or no data, return an error state
  if (error || !data?.getAdminDashboard) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">
          Error loading dashboard data. Please try again later.
        </p>
      </div>
    );
  }

  const dashboardData = data?.getAdminDashboard || {
    totalActiveUsers: 0,
    currentMonthRevenue: 0,
    totalTemplates: 0,
    systemUptime: 0,
  };

  // Calculate max revenue for chart scaling
  const maxRevenue = Math.max(
    ...dashboardData.revenueByMonth.map(item => item.revenue),
    1,
  );

  // Create quick actions
  const quickActions: QuickAction[] = [
    {
      title: 'Manage Users',
      subtitle: 'View and manage user accounts',
      value: `${dashboardData.totalActiveUsers} users`,
      change: '+5%',
      changeType: 'positive',
      icon: <UsersIcon className="h-5 w-5" />,
      action: () => router.push('/admin/users'),
    },
    {
      title: 'Revenue Overview',
      subtitle: 'View detailed revenue reports',
      value: formatPrice(dashboardData.currentMonthRevenue),
      change: '+8%',
      changeType: 'positive',
      icon: <TrendingUpIcon className="h-5 w-5" />,
      action: () => router.push('/admin/revenue'),
    },
    {
      title: 'Template Management',
      subtitle: 'Manage design templates',
      value: `${dashboardData.totalTemplates} templates`,
      change: '+3%',
      changeType: 'positive',
      icon: <FileTextIcon className="h-5 w-5" />,
      action: () => router.push('/admin/templates'),
    },
    {
      title: 'System Status',
      subtitle: 'View system health and logs',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: <PercentIcon className="h-5 w-5" />,
      action: () => router.push('/admin/system'),
    },
  ];

  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle="Welcome to your admin dashboard overview"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={`Revenue (${new Date().toLocaleString('default', { month: 'long' })})`}
          value={dashboardData.currentMonthRevenue}
          icon={<DollarSignIcon className="h-5 w-5" />}
          type={StatCardDisplay.CURRENCY}
        />
        <StatCard
          title="Active Users"
          value={dashboardData.totalActiveUsers}
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Total Templates"
          value={dashboardData.totalTemplates}
          icon={<PackageIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Total Revenue"
          value={dashboardData.totalRevenue}
          icon={<ShoppingCartIcon className="h-5 w-5" />}
          type={StatCardDisplay.CURRENCY}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>
              Monthly revenue for {new Date().getFullYear()}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full w-full">
              {/* SVG Line Chart for Revenue */}
              <svg
                className="h-full w-full overflow-visible"
                viewBox="0 0 500 200"
              >
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
                {dashboardData.revenueByMonth.map((data, i) => {
                  const x =
                    40 +
                    (440 /
                      Math.max(1, dashboardData.revenueByMonth.length - 1)) *
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
                {[
                  0,
                  maxRevenue * 0.25,
                  maxRevenue * 0.5,
                  maxRevenue * 0.75,
                  maxRevenue,
                ].map((value, i) => {
                  const y = 180 - (160 / maxRevenue) * value;
                  return (
                    <g key={`revenue-${i}`}>
                      <text
                        x="35"
                        y={y + 3}
                        textAnchor="end"
                        fontSize="10"
                        fill="#64748b"
                      >
                        {formatPrice(Math.round(value))}
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
                  points={dashboardData.revenueByMonth
                    .map((data, i) => {
                      const x =
                        40 +
                        (440 /
                          Math.max(
                            1,
                            dashboardData.revenueByMonth.length - 1,
                          )) *
                          i;
                      const y = 180 - (160 / maxRevenue) * data.revenue;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                {/* Data points */}
                {dashboardData.revenueByMonth.map((data, i) => {
                  const x =
                    40 +
                    (440 /
                      Math.max(1, dashboardData.revenueByMonth.length - 1)) *
                      i;
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="hover:bg-accent w-full justify-between rounded-lg p-4 py-6 pl-2"
                  onClick={action.action}
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 mr-4 rounded-full p-2">
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{action.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold">{action.value}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Most recent users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentUsers.slice(0, 5).map(user => (
                <div
                  key={user.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-3">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.name || 'User'}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                        <span className="text-primary font-medium">
                          {user.name ? user.name.charAt(0) : 'U'}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {user.name || 'Unnamed User'}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        user.role === Roles.Factoryowner
                          ? 'bg-blue-100 text-blue-800'
                          : user.role === Roles.Admin
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
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
