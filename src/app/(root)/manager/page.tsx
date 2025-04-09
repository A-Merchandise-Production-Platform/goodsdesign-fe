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
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Factories"
          value={dashboardData.stats.factories.total.toString()}
          change={dashboardData.stats.factories.change}
          changeType={dashboardData.stats.factories.changeType}
          icon={<Building2Icon className="h-5 w-5" />}
        />
        <StatCard
          title="Active Orders"
          value={dashboardData.stats.orders.active.toString()}
          change={dashboardData.stats.orders.change}
          changeType={dashboardData.stats.orders.changeType}
          icon={<ClipboardIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Staff Members"
          value={dashboardData.stats.staff.total.toString()}
          change={dashboardData.stats.staff.change}
          changeType={dashboardData.stats.staff.changeType}
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Monthly Revenue"
          value={dashboardData.stats.revenue.monthly}
          change={dashboardData.stats.revenue.change}
          changeType={dashboardData.stats.revenue.changeType}
          icon={<DollarSignIcon className="h-5 w-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Factory Performance</CardTitle>
            <CardDescription>Orders and revenue by factory</CardDescription>
          </CardHeader>
          <CardContent>
            <FactoryPerformanceChart data={dashboardData.factoryPerformance} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Distribution of order statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderStatusChart data={dashboardData.orderStatus} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest updates across your operations
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View all
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {dashboardData.recentActivities.map(activity => (
                <li
                  key={activity.id}
                  className="flex items-start gap-4 border-b pb-4 last:border-0"
                >
                  <div
                    className={cn(
                      'rounded-full p-2',
                      activityTypeStyles[activity.type].bgColor,
                    )}
                  >
                    {activityTypeStyles[activity.type].icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {activity.description}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" size="sm">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Add New Factory
            </Button>
            <Button className="w-full justify-start" size="sm">
              <UserPlusIcon className="mr-2 h-4 w-4" />
              Hire Staff
            </Button>
            <Button className="w-full justify-start" size="sm">
              <ClipboardIcon className="mr-2 h-4 w-4" />
              Create Order
            </Button>
            <Button className="w-full justify-start" size="sm">
              <BarChart3Icon className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
            <Button className="w-full justify-start" size="sm">
              <Settings2Icon className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Type definitions
type ActivityType = 'order' | 'factory' | 'staff' | 'system';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
}

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

// Stat Card Component
function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          </div>
          <div className="bg-primary/10 rounded-full p-2">{icon}</div>
        </div>
        <div className="mt-4">
          <span
            className={cn(
              'inline-flex items-center text-xs font-medium',
              changeType === 'positive' ? 'text-green-600' : 'text-red-600',
            )}
          >
            {changeType === 'positive' ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            {change}
          </span>
          <span className="text-muted-foreground ml-1 text-xs">
            vs. last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
