'use client';

import {
  ArrowRight,
  ClipboardIcon,
  ClockIcon,
  DollarSignIcon,
  PackageIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
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
import { useGetAllOrdersQuery } from '@/graphql/generated/graphql';
import { formatDate } from '@/lib/utils';
import { StatCard } from '@/components/stat-card';
import { calculateChange } from '@/lib/calculate-change';
import { DashboardShell } from '@/components/dashboard-shell';

export default function ManagerOrdersPage() {
  const { data, loading } = useGetAllOrdersQuery();
  const router = useRouter();

  const viewOrderDetails = (orderId: string) => {
    router.push(`/manager/orders/${orderId}`);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        label: string;
        variant: 'default' | 'secondary' | 'destructive' | 'outline';
      }
    > = {
      PENDING: { label: 'Pending', variant: 'outline' },
      PROCESSING: { label: 'Processing', variant: 'secondary' },
      COMPLETED: { label: 'Completed', variant: 'default' },
      CANCELLED: { label: 'Cancelled', variant: 'destructive' },
      SHIPPED: { label: 'Shipped', variant: 'default' },
      PAID: { label: 'Paid', variant: 'default' },
      UNPAID: { label: 'Unpaid', variant: 'outline' },
      PAYMENT_RECEIVED: { label: 'Payment Received', variant: 'default' },
      WAITING_FILL_INFORMATION: {
        label: 'Waiting for Information',
        variant: 'outline',
      },
      NEED_MANAGER_HANDLE: { label: 'Needs Manager', variant: 'outline' },
      PENDING_ACCEPTANCE: { label: 'Pending Acceptance', variant: 'outline' },
      REJECTED: { label: 'Rejected', variant: 'destructive' },
      IN_PRODUCTION: { label: 'In Production', variant: 'secondary' },
      WAITING_FOR_CHECKING_QUALITY: {
        label: 'Quality Check',
        variant: 'outline',
      },
      REWORK_REQUIRED: { label: 'Rework Required', variant: 'destructive' },
      REWORK_IN_PROGRESS: { label: 'Rework in Progress', variant: 'secondary' },
      WAITING_PAYMENT: { label: 'Waiting Payment', variant: 'outline' },
      READY_FOR_SHIPPING: { label: 'Ready for Shipping', variant: 'secondary' },
    };

    const config = statusMap[status] || { label: status, variant: 'outline' };

    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return <OrdersLoadingSkeleton />;
  }

  const orders = data?.orders
    ? [...data?.orders].sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      })
    : [];

  // Calculate current statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    order => order.status === 'PENDING',
  ).length;
  const inProgressOrders = orders.filter(order =>
    ['PROCESSING', 'IN_PRODUCTION', 'REWORK_IN_PROGRESS'].includes(
      order.status,
    ),
  ).length;
  const completedOrders = orders.filter(order =>
    ['COMPLETED', 'SHIPPED', 'PAID', 'PAYMENT_RECEIVED'].includes(order.status),
  ).length;

  // Calculate changes from last month
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const lastMonthOrders = orders.filter(
    order => new Date(order.orderDate) < lastMonth,
  ).length;

  const lastMonthPending = orders.filter(
    order =>
      order.status === 'PENDING' && new Date(order.orderDate) < lastMonth,
  ).length;

  const lastMonthInProgress = orders.filter(
    order =>
      ['PROCESSING', 'IN_PRODUCTION', 'REWORK_IN_PROGRESS'].includes(
        order.status,
      ) && new Date(order.orderDate) < lastMonth,
  ).length;

  const lastMonthCompleted = orders.filter(
    order =>
      ['COMPLETED', 'SHIPPED', 'PAID', 'PAYMENT_RECEIVED'].includes(
        order.status,
      ) && new Date(order.orderDate) < lastMonth,
  ).length;

  // Calculate changes using the utility function
  const totalChange = calculateChange(totalOrders, lastMonthOrders);
  const pendingChange = calculateChange(pendingOrders, lastMonthPending);
  const inProgressChange = calculateChange(
    inProgressOrders,
    lastMonthInProgress,
  );
  const completedChange = calculateChange(completedOrders, lastMonthCompleted);

  return (
    <DashboardShell
      title="Orders Management"
      subtitle="View and manage all orders"
    >
      {/* Stats Overview */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={totalOrders.toString()}
          change={totalChange.change}
          changeType={totalChange.type}
          icon={<ClipboardIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders.toString()}
          change={pendingChange.change}
          changeType={pendingChange.type}
          icon={<ClockIcon className="h-5 w-5" />}
        />
        <StatCard
          title="In Progress"
          value={inProgressOrders.toString()}
          change={inProgressChange.change}
          changeType={inProgressChange.type}
          icon={<PackageIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Completed"
          value={completedOrders.toString()}
          change={completedChange.change}
          changeType={completedChange.type}
          icon={<DollarSignIcon className="h-5 w-5" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Factory Orders</CardTitle>
          <CardDescription>
            Manage and view all your factory orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">No factory orders found</p>
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
  );
}
