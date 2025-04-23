'use client';

import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  Factory,
  ShoppingBagIcon,
  TruckIcon,
} from 'lucide-react';

import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetMyStaffDashboardQuery } from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

// Helper to generate status badges
const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { color: string; bg: string }> = {
    Pending: { color: 'text-amber-800', bg: 'bg-amber-100' },
    Production: { color: 'text-blue-800', bg: 'bg-blue-100' },
    Shipped: { color: 'text-purple-800', bg: 'bg-purple-100' },
    Delivered: { color: 'text-green-800', bg: 'bg-green-100' },
  };

  const style = statusMap[status] || {
    color: 'text-gray-800',
    bg: 'bg-gray-100',
  };

  return (
    <Badge variant="outline" className={`${style.bg} ${style.color} border-0`}>
      {status}
    </Badge>
  );
};

// Helper to generate priority badges
const getPriorityBadge = (priority: string) => {
  const priorityMap: Record<string, { color: string; bg: string }> = {
    High: { color: 'text-red-800', bg: 'bg-red-100' },
    Medium: { color: 'text-blue-800', bg: 'bg-blue-100' },
    Low: { color: 'text-green-800', bg: 'bg-green-100' },
  };

  const style = priorityMap[priority] || {
    color: 'text-gray-800',
    bg: 'bg-gray-100',
  };

  return (
    <Badge variant="outline" className={`${style.bg} ${style.color} border-0`}>
      {priority}
    </Badge>
  );
};

export default function StaffPage() {
  const { data, loading, error } = useGetMyStaffDashboardQuery();

  // Default to the fake data if the real data is not yet loaded
  const dashboardData = data?.getMyStaffDashboard;

  return (
    <DashboardShell
      title="Staff Dashboard"
      subtitle="Manage your tasks and orders"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Tasks"
          value={dashboardData?.stats.activeTasks.value.toString() || '0'}
          change={`${dashboardData?.stats.activeTasks.percentChange || 0}%`}
          changeType={
            dashboardData?.stats.activeTasks.isPositive
              ? 'positive'
              : 'negative'
          }
          icon={<ClipboardListIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Completed Tasks"
          value={dashboardData?.stats.completedTasks.value.toString() || '0'}
          change={`${dashboardData?.stats.completedTasks.percentChange || 0}%`}
          changeType={
            dashboardData?.stats.completedTasks.isPositive
              ? 'positive'
              : 'negative'
          }
          icon={<ClipboardCheckIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Orders"
          value={dashboardData?.stats.pendingOrders.value.toString() || '0'}
          change={`${dashboardData?.stats.pendingOrders.percentChange || 0}%`}
          changeType={
            dashboardData?.stats.pendingOrders.isPositive
              ? 'positive'
              : 'negative'
          }
          icon={<ShoppingBagIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Delivered Orders"
          value={dashboardData?.stats.deliveredOrders.value.toString() || '0'}
          change={`${dashboardData?.stats.deliveredOrders.percentChange || 0}%`}
          changeType={
            dashboardData?.stats.deliveredOrders.isPositive
              ? 'positive'
              : 'negative'
          }
          icon={<TruckIcon className="h-5 w-5" />}
        />
      </div>

      {/* Current Factory Section */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Current Factory Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Factory Name
                </h3>
                <span className="text-lg font-medium">
                  {dashboardData?.currentFactory.name || 'Not assigned'}
                </span>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Status
                </h3>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {dashboardData?.currentFactory.status || 'Unknown'}
                </span>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Address
                </h3>
                <span>{dashboardData?.currentFactory.address || 'N/A'}</span>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Factory ID
                </h3>
                <span>{dashboardData?.currentFactory.id || 'N/A'}</span>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Production Capacity
                </h3>
                <span>
                  {dashboardData?.currentFactory.productionCapacity || 'N/A'}
                </span>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Lead Time
                </h3>
                <span>{dashboardData?.currentFactory.leadTime || 'N/A'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBagIcon className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData?.recentOrders ? (
                  dashboardData.recentOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(Number(order.total))}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="py-4 text-center">
                      No recent orders available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
