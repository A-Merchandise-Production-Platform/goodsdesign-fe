'use client';

import {
  Building2Icon,
  ClipboardIcon,
  DollarSignIcon,
  LaptopIcon,
  UsersIcon,
} from 'lucide-react';

import { DashboardShell } from '@/components/dashboard-shell';
import { FactoryPerformanceChart } from '@/components/factory-performance-chart';
import { OrderStatusChart } from '@/components/order-status-chart';
import { StatCard } from '@/components/stat-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChangeType,
  useGetEnhancedManagerDashboardQuery,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

export default function Page() {
  const { data, loading } = useGetEnhancedManagerDashboardQuery();

  console.log(data?.getEnhancedManagerDashboard.stats.revenue.monthly);

  return (
    <DashboardShell
      title="Manager Dashboard"
      subtitle="View and manage all your operations"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Factories"
          value={
            data?.getEnhancedManagerDashboard.stats.factories.total.toString() ??
            '0'
          }
          change={
            data?.getEnhancedManagerDashboard.stats.factories.change ?? '0'
          }
          changeType={
            data?.getEnhancedManagerDashboard.stats.factories.changeType ===
            ChangeType.Positive
              ? 'positive'
              : 'negative'
          }
          icon={<Building2Icon className="h-5 w-5" />}
        />
        <StatCard
          title="Active Orders"
          value={
            data?.getEnhancedManagerDashboard.stats.orders.active.toString() ??
            '0'
          }
          change={data?.getEnhancedManagerDashboard.stats.orders.change ?? '0'}
          changeType={
            data?.getEnhancedManagerDashboard.stats.orders.changeType ===
            ChangeType.Positive
              ? 'positive'
              : 'negative'
          }
          icon={<ClipboardIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Staff Members"
          value={
            data?.getEnhancedManagerDashboard.stats.staff.total.toString() ??
            '0'
          }
          change={data?.getEnhancedManagerDashboard.stats.staff.change ?? '0'}
          changeType={
            data?.getEnhancedManagerDashboard.stats.staff.changeType ===
            ChangeType.Positive
              ? 'positive'
              : 'negative'
          }
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Monthly Revenue"
          value={formatPrice(
            Number(data?.getEnhancedManagerDashboard.stats.revenue.monthly),
          )}
          change={data?.getEnhancedManagerDashboard.stats.revenue.change ?? '0'}
          changeType={
            data?.getEnhancedManagerDashboard.stats.revenue.changeType ===
            ChangeType.Positive
              ? 'positive'
              : 'negative'
          }
          icon={<DollarSignIcon className="h-5 w-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Factory Performance</CardTitle>
            <CardDescription>Orders and revenue by factory</CardDescription>
          </CardHeader>
          <CardContent>
            <FactoryPerformanceChart
              data={data?.getEnhancedManagerDashboard.factoryPerformance ?? []}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Distribution of order statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderStatusChart
              data={data?.getEnhancedManagerDashboard.orderStatus ?? []}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
