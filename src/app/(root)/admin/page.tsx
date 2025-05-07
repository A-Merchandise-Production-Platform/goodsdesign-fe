'use client';

import {
  DollarSignIcon,
  LineChart,
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
import {
  ChangeType,
  useGetAdminDashboardQuery,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

// Define types for all data structures
type StatCardType = {
  value: number;
  change: number;
  changeType: 'positive' | 'negative';
};

type StatsDataType = {
  totalSales: StatCardType;
  activeUsers: StatCardType;
  totalProducts: StatCardType;
  pendingOrders: StatCardType;
};

type RevenueDataPoint = {
  month: string;
  revenue: number;
};

type PerformanceMetric = {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
};

// Helper function to format percentage
const formatPercentage = (value: number): string => {
  return `${Math.abs(value)}%`;
};

export default function AdminDashboard() {
  const { data, loading, error } = useGetAdminDashboardQuery();

  // Generate monthly revenue data based on totalRevenue divided into months
  const generateMonthlyRevenue = (): RevenueDataPoint[] => {
    if (!data?.getAdminDashboard) {
      return [];
    }

    const totalRevenue = data.getAdminDashboard.totalRevenue;
    const currentMonth = new Date().getMonth();
    const monthsCount = currentMonth + 1;

    // Create a trend that increases over time to reach the total revenue
    return Array.from({ length: monthsCount }, (_, index) => {
      // Weight later months to have more revenue
      const weight = (index + 1) / ((monthsCount * (monthsCount + 1)) / 2);
      // Distribute total revenue across months with increasing weights
      const monthRevenue = Math.round(totalRevenue * weight);

      return {
        month: new Date(2024, index, 1).toLocaleString('default', {
          month: 'short',
        }),
        revenue: monthRevenue,
      };
    });
  };

  // If loading, return a loading state
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </div>
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

  const dashboardData = data.getAdminDashboard;

  // Prepare dashboard stats from real data
  const dashboardStats: StatsDataType = {
    totalSales: {
      value: Number(formatPrice(dashboardData.totalSales)),
      change: Number(formatPercentage(dashboardData.totalSalesChange)),
      changeType:
        dashboardData.totalSalesChangeType === ChangeType.Positive
          ? 'positive'
          : 'negative',
    },
    activeUsers: {
      value: dashboardData.activeUsers,
      change: Number(formatPercentage(dashboardData.activeUsersChange)),
      changeType:
        dashboardData.activeUsersChangeType === ChangeType.Positive
          ? 'positive'
          : 'negative',
    },
    totalProducts: {
      value: dashboardData.totalProducts,
      change: Number(formatPercentage(dashboardData.totalProductsChange)),
      changeType:
        dashboardData.totalProductsChangeType === ChangeType.Positive
          ? 'positive'
          : 'negative',
    },
    pendingOrders: {
      value: dashboardData.pendingOrders,
      change: Number(formatPercentage(dashboardData.pendingOrdersChange)),
      changeType:
        dashboardData.pendingOrdersChangeType === ChangeType.Positive
          ? 'positive'
          : 'negative',
    },
  };

  // Generate monthly revenue data
  const monthlyRevenue = generateMonthlyRevenue();

  // Calculate max revenue for chart scaling
  const maxRevenue = Math.max(...monthlyRevenue.map(item => item.revenue), 1);

  // Create performance metrics based on real data
  const performanceMetrics: PerformanceMetric[] = [
    {
      title: 'Conversion Rate',
      subtitle: 'Based on total orders and customers',
      value: `${((dashboardData.totalOrders / Math.max(dashboardData.totalCustomers, 1)) * 100).toFixed(1)}%`,
      change: '+0.4%', // This is hardcoded as it's not available in the API
      changeType: 'positive',
      icon: <TrendingUpIcon className="h-5 w-5" />,
    },
    {
      title: 'User Retention',
      subtitle: 'Active users vs total customers',
      value: `${((dashboardData.activeUsers / Math.max(dashboardData.totalCustomers, 1)) * 100).toFixed(0)}%`,
      change: '+5%', // This is hardcoded as it's not available in the API
      changeType: 'positive',
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      title: 'Average Order Value',
      subtitle: 'Total sales divided by orders',
      value: formatPrice(
        dashboardData.totalSales / Math.max(dashboardData.totalOrders, 1),
      ),
      change: '+$3.25', // This is hardcoded as it's not available in the API
      changeType: 'positive',
      icon: <ShoppingCartIcon className="h-5 w-5" />,
    },
    {
      title: 'Factory Utilization',
      subtitle: 'Active factories vs total',
      value: `${((dashboardData.activeFactories / Math.max(dashboardData.totalFactories, 1)) * 100).toFixed(0)}%`,
      change: '+2%', // This is hardcoded as it's not available in the API
      changeType: 'positive',
      icon: <PercentIcon className="h-5 w-5" />,
    },
  ];

  console.log(dashboardData.totalRevenue);

  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle="Welcome to your admin dashboard overview"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={`Revenue (${new Date().toLocaleString('default', { month: 'long' })})`}
          value={dashboardData.totalRevenue}
          icon={<DollarSignIcon className="h-5 w-5" />}
          type={StatCardDisplay.CURRENCY}
        />
        <StatCard
          title="Active Users"
          value={dashboardStats.activeUsers.value}
          change={dashboardStats.activeUsers.change}
          changeType={dashboardStats.activeUsers.changeType}
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts.value}
          change={dashboardStats.totalProducts.change}
          changeType={dashboardStats.totalProducts.changeType}
          icon={<PackageIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Orders"
          value={dashboardStats.pendingOrders.value}
          change={dashboardStats.pendingOrders.change}
          changeType={dashboardStats.pendingOrders.changeType}
          icon={<ShoppingCartIcon className="h-5 w-5" />}
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
                {monthlyRevenue.map((data, i) => {
                  const x =
                    40 + (440 / Math.max(1, monthlyRevenue.length - 1)) * i;
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
                  points={monthlyRevenue
                    .map((data, i) => {
                      const x =
                        40 + (440 / Math.max(1, monthlyRevenue.length - 1)) * i;
                      const y = 180 - (160 / maxRevenue) * data.revenue;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                {/* Data points */}
                {monthlyRevenue.map((data, i) => {
                  const x =
                    40 + (440 / Math.max(1, monthlyRevenue.length - 1)) * i;
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
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key business indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary/10 mr-4 rounded-full p-2">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{metric.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {metric.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold">{metric.value}</span>
                    <span
                      className={`ml-2 text-xs ${metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Most recent orders in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentOrders.slice(0, 5).map(order => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">
                      Order #{order.id.substring(0, 8)}
                    </p>
                    <div className="text-muted-foreground flex items-center text-sm">
                      <span className="mr-2">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                      <span className="mr-2">•</span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          order.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'CANCELLED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">
                      {formatPrice(order.totalPrice)}
                    </span>
                    {order.factory && (
                      <span className="text-muted-foreground text-sm">
                        {order.factory.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Distribution of order statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Calculate order status distribution from recentOrders */}
              {(() => {
                // Group orders by status
                const statusCounts = dashboardData.recentOrders.reduce(
                  (acc, order) => {
                    if (!acc[order.status]) {
                      acc[order.status] = 0;
                    }
                    acc[order.status]++;
                    return acc;
                  },
                  {} as Record<string, number>,
                );

                // Convert to array for easier rendering
                return Object.entries(statusCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([status, count]) => (
                    <div
                      key={status}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className={`mr-3 h-3 w-3 rounded-full ${
                            status === 'COMPLETED'
                              ? 'bg-green-500'
                              : status === 'PENDING'
                                ? 'bg-yellow-500'
                                : status === 'CANCELLED'
                                  ? 'bg-red-500'
                                  : 'bg-blue-500'
                          }`}
                        />
                        <span className="font-medium">{status}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold">{count}</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          (
                          {Math.round(
                            (count / dashboardData.recentOrders.length) * 100,
                          )}
                          %)
                        </span>
                      </div>
                    </div>
                  ));
              })()}
            </div>
          </CardContent>
        </Card>

        {/* <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Factories</CardTitle>
            <CardDescription>
              Factories with highest order count and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboardData.factoryPerformance
                .sort((a, b) => b.totalRevenue - a.totalRevenue)
                .slice(0, 6)
                .map((factory, index) => (
                  <div
                    key={factory.factoryId}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary/10 mr-3 flex h-8 w-8 items-center justify-center rounded-full">
                        <span className="text-xs font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">
                          Factory #{factory.factoryId.substring(0, 8)}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {factory.orderCount} orders
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold">
                      {formatPrice(factory.totalRevenue)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </DashboardShell>
  );
}
