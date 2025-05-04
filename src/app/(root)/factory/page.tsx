'use client';

import {
  Activity,
  Award,
  Package,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardShell } from '@/components/dashboard-shell';
import { formatPrice } from '@/lib/utils';
import {
  FactoryRevenueChart,
  MonthlyRevenueData,
} from '@/components/factory-revenue-chart';
import { useGetMyFactoryDashboardQuery } from '@/graphql/generated/graphql';

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

  const { stats, revenueData } = data.getMyFactoryDashboard;

  // Map the backend data to the format expected by StatCard component
  const factoryStats = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.value,
      change: stats.totalOrders.percentChange,
      changeType: stats.totalOrders.isPositive
        ? ('positive' as const)
        : ('negative' as const),
      icon: <Package className="text-primary h-4 w-4" />,
    },
    {
      title: 'Monthly Revenue',
      value: Number(formatVND(stats.monthlyRevenue.value)),
      change: stats.monthlyRevenue.percentChange,
      changeType: stats.monthlyRevenue.isPositive
        ? ('positive' as const)
        : ('negative' as const),
      icon: <Activity className="text-primary h-4 w-4" />,
    },
    {
      title: 'Legit Points',
      value: stats.legitPoints.value,
      change: stats.legitPoints.percentChange,
      changeType: stats.legitPoints.isPositive
        ? ('positive' as const)
        : ('negative' as const),
      icon: <Truck className="text-primary h-4 w-4" />,
    },
    {
      title: 'Quality Score',
      value: stats.qualityScore.value,
      change: stats.qualityScore.percentChange,
      changeType: stats.qualityScore.isPositive
        ? ('positive' as const)
        : ('negative' as const),
      icon: <ShieldCheck className="text-primary h-4 w-4" />,
    },
  ];

  // The revenueData from the backend already has the correct structure
  // with month and revenue fields, so we can use it directly
  const chartData: MonthlyRevenueData[] = revenueData.map(item => ({
    month: item.month,
    revenue: item.revenue,
  }));

  return (
    <DashboardShell
      title="Factory Dashboard"
      subtitle="Manage and view all your factory orders"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {factoryStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={Number(stat.value)}
            change={Number(stat.change)}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend ({new Date().getFullYear()})</CardTitle>
          </CardHeader>
          <CardContent>
            <FactoryRevenueChart data={chartData} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
