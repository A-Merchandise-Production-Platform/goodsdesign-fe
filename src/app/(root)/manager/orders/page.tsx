'use client';

import { ArrowRight } from 'lucide-react';
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

  return (
    <div className="container mx-auto py-6">
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
    </div>
  );
}

function OrdersLoadingSkeleton() {
  return (
    <div className="container mx-auto py-6">
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
