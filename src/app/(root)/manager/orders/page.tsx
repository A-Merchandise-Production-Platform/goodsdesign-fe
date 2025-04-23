'use client';

import {
  ArrowRight,
  ClipboardIcon,
  ClockIcon,
  DollarSignIcon,
  PackageIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useGetAllOrdersQuery,
  useGetManagerOrderDashboardQuery,
} from '@/graphql/generated/graphql';
import { calculateChange } from '@/lib/calculate-change';
import { formatDate } from '@/lib/utils';

import { OrderFilter } from './_components/OrderFilter';
import { OrderSearch } from './_components/OrderSearch';
import { getStatusBadge } from '../../_components/order-status';

export default function ManagerOrdersPage() {
  const { data, loading } = useGetAllOrdersQuery();
  const { data: dashboardData, loading: dashboardLoading } =
    useGetManagerOrderDashboardQuery();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const viewOrderDetails = (orderId: string) => {
    router.push(`/manager/orders/${orderId}`);
  };

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleFilterChange = useCallback((statuses: string[]) => {
    setSelectedStatuses(statuses);
  }, []);

  if (loading || dashboardLoading) {
    return <OrdersLoadingSkeleton />;
  }

  const allOrders = data?.orders
    ? [...data?.orders].sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      })
    : [];

  // Apply filters: first by ID, then by status
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(order.status);
    return matchesSearch && matchesStatus;
  });

  // Use filtered orders for display
  const orders = filteredOrders;

  // Calculate changes using the utility function
  const totalChange = calculateChange(
    dashboardData?.getManagerOrderDashboard?.totalOrders || 0,
    dashboardData?.getManagerOrderDashboard?.lastMonthOrders || 0,
  );
  const pendingChange = calculateChange(
    dashboardData?.getManagerOrderDashboard?.pendingOrders || 0,
    dashboardData?.getManagerOrderDashboard?.lastMonthPendingOrders || 0,
  );
  const inProgressChange = calculateChange(
    dashboardData?.getManagerOrderDashboard?.inProductionOrders || 0,
    dashboardData?.getManagerOrderDashboard?.lastMonthInProductionOrders || 0,
  );
  const completedChange = calculateChange(
    dashboardData?.getManagerOrderDashboard?.completedOrders || 0,
    dashboardData?.getManagerOrderDashboard?.lastMonthCompletedOrders || 0,
  );

  return (
    <DashboardShell
      title="Orders Management"
      subtitle="View and manage all orders"
    >
      {/* Stats Overview */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={
            dashboardData?.getManagerOrderDashboard?.totalOrders?.toString() ||
            '0'
          }
          change={totalChange.change}
          changeType={totalChange.type}
          icon={<ClipboardIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Orders"
          value={
            dashboardData?.getManagerOrderDashboard?.pendingOrders?.toString() ||
            '0'
          }
          change={pendingChange.change}
          changeType={pendingChange.type}
          icon={<ClockIcon className="h-5 w-5" />}
        />
        <StatCard
          title="In Progress"
          value={
            dashboardData?.getManagerOrderDashboard?.inProductionOrders?.toString() ||
            '0'
          }
          change={inProgressChange.change}
          changeType={inProgressChange.type}
          icon={<PackageIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Completed"
          value={
            dashboardData?.getManagerOrderDashboard?.completedOrders?.toString() ||
            '0'
          }
          change={completedChange.change}
          changeType={completedChange.type}
          icon={<DollarSignIcon className="h-5 w-5" />}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>Factory Orders</CardTitle>
            <CardDescription>
              Manage and view all your factory orders
            </CardDescription>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <div className="w-full sm:w-72">
              <OrderSearch onSearch={handleSearch} />
            </div>
            <OrderFilter onFilterChange={handleFilterChange} />
          </div>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">
                {searchQuery || selectedStatuses.length < 18
                  ? 'No orders found matching your filters'
                  : 'No factory orders found'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>
                      {formatDate(order?.acceptanceDeadline)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewOrderDetails(order.id)}
                      >
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}

function OrdersLoadingSkeleton() {
  return (
    <DashboardShell
      title="Orders Management"
      subtitle="View and manage all orders"
    >
      <div className="container mx-auto space-y-6">
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-2 h-8 w-16" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
