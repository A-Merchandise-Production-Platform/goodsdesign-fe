'use client';

import {
  ArrowUpIcon,
  ArrowDownIcon,
  BarChart3Icon,
  Building2Icon,
  ChevronRightIcon,
  PlusCircleIcon,
  ClipboardIcon,
  DollarSignIcon,
  LaptopIcon,
  Settings2Icon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FactoryPerformanceChart } from '@/components/factory-performance-chart';
import { OrderStatusChart } from '@/components/order-status-chart';
import { cn } from '@/lib/utils';
import {
  ChangeType,
  useGetEnhancedManagerDashboardQuery,
} from '@/graphql/generated/graphql';
import { StatCard } from '@/components/stat-card';
import { DashboardShell } from '@/components/dashboard-shell';

// Dashboard data interface
interface ManagerDashboardData {
  stats: {
    factories: {
      total: number;
      change: string;
      changeType: 'positive' | 'negative';
    };
    orders: {
      active: number;
      change: string;
      changeType: 'positive' | 'negative';
    };
    staff: {
      total: number;
      change: string;
      changeType: 'positive' | 'negative';
    };
    revenue: {
      monthly: string;
      change: string;
      changeType: 'positive' | 'negative';
    };
  };
  factoryPerformance: Array<{
    factoryId: string;
    factoryName: string;
    orderCount: number;
    totalRevenue: number;
  }>;
  orderStatus: Array<{
    status: string;
    count: number;
  }>;
  recentActivities: Array<{
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    time: string;
    relatedId?: string;
  }>;
}

// Sample dashboard data
const dashboardData: ManagerDashboardData = {
  stats: {
    factories: {
      total: 12,
      change: '+2',
      changeType: 'positive',
    },
    orders: {
      active: 148,
      change: '+14%',
      changeType: 'positive',
    },
    staff: {
      total: 63,
      change: '-2',
      changeType: 'negative',
    },
    revenue: {
      monthly: '$182,450',
      change: '+8.2%',
      changeType: 'positive',
    },
  },
  factoryPerformance: [
    {
      factoryId: 'F1001',
      factoryName: 'Shanghai Plant',
      orderCount: 45,
      totalRevenue: 125000,
    },
    {
      factoryId: 'F1002',
      factoryName: 'Delhi Facility',
      orderCount: 32,
      totalRevenue: 98000,
    },
    {
      factoryId: 'F1003',
      factoryName: 'Mexico City',
      orderCount: 28,
      totalRevenue: 85000,
    },
    {
      factoryId: 'F1004',
      factoryName: 'Detroit Hub',
      orderCount: 60,
      totalRevenue: 150000,
    },
    {
      factoryId: 'F1005',
      factoryName: 'Berlin Plant',
      orderCount: 25,
      totalRevenue: 72000,
    },
  ],
  orderStatus: [
    { status: 'Completed', count: 85 },
    { status: 'In Progress', count: 45 },
    { status: 'Pending', count: 30 },
    { status: 'Cancelled', count: 15 },
  ],
  recentActivities: [
    {
      id: 'act1001',
      type: 'order',
      title: 'New Order Received',
      description: 'Order #12458 from Client XYZ for 200 units',
      time: '10 minutes ago',
      relatedId: 'ORD12458',
    },
    {
      id: 'act1002',
      type: 'factory',
      title: 'Factory Maintenance Complete',
      description: 'Factory #F1002 is back online after scheduled maintenance',
      time: '1 hour ago',
      relatedId: 'F1002',
    },
    {
      id: 'act1003',
      type: 'staff',
      title: 'Staff Shift Change',
      description: 'Night shift started with 12 workers at Factory #F1001',
      time: '3 hours ago',
      relatedId: 'F1001',
    },
    {
      id: 'act1004',
      type: 'system',
      title: 'System Update',
      description: 'Production planning module updated to v2.4',
      time: 'Yesterday, 11:30 PM',
    },
  ],
};

export default function Page() {
  const { data, loading } = useGetEnhancedManagerDashboardQuery();
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
          value={data?.getEnhancedManagerDashboard.stats.revenue.monthly ?? '0'}
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

// Type definitions
type ActivityType = 'order' | 'factory' | 'staff' | 'system';

// Activity type styles
const activityTypeStyles = {
  order: {
    icon: <ClipboardIcon className="h-4 w-4 text-white" />,
    bgColor: 'bg-blue-500/20',
  },
  factory: {
    icon: <Building2Icon className="h-4 w-4 text-white" />,
    bgColor: 'bg-green-500/20',
  },
  staff: {
    icon: <UsersIcon className="h-4 w-4 text-white" />,
    bgColor: 'bg-amber-500/20',
  },
  system: {
    icon: <LaptopIcon className="h-4 w-4 text-white" />,
    bgColor: 'bg-purple-500/20',
  },
};
