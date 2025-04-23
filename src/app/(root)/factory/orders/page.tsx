'use client';

import { ArrowRight, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetMyFactoryOrdersQuery } from '@/graphql/generated/graphql';
import { formatDate } from '@/lib/utils';

import { getStatusBadge } from '../../_components/order-status';
import { DashboardShell } from '@/components/dashboard-shell';
import { Input } from '@/components/ui/input';

// Extract all status types from the getStatusBadge function
const STATUS_OPTIONS = [
  'ALL',
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'CANCELLED',
  'NEED_MANAGER_HANDLE',
  'PENDING_ACCEPTANCE',
  'IN_PRODUCTION',
  "WAITING_FOR_REFUND",
  "REFUNDED",
  'WAITING_FOR_CHECKING_QUALITY',
  'REWORK_REQUIRED',
  'REWORK_IN_PROGRESS',
  'READY_FOR_SHIPPING',
  'SHIPPING',
  'SHIPPED',
];

export default function FactoryOrdersPage() {
  const { data, loading } = useGetMyFactoryOrdersQuery();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const viewOrderDetails = (orderId: string) => {
    router.push(`/factory/orders/${orderId}`);
  };

  if (loading) {
    return <OrdersLoadingSkeleton />;
  }

  const allOrders = data?.factoryOrders
    ? [...data.factoryOrders].sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      })
    : [];

  // Filter orders based on selected status
  const orders =
    statusFilter === 'ALL'
      ? allOrders
      : allOrders.filter(order => order.status === statusFilter);

  return (
    <DashboardShell
      title="Factory Orders"
      subtitle="Manage and view all your factory orders"
    >
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input placeholder="Search by order ID" className="w-96" />
        </div>
        <StatusFilter
          selectedStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />
      </div>
      <Card>
        <CardContent>
          {orders.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">
                {statusFilter === 'ALL'
                  ? 'No factory orders found'
                  : `No orders with status "${statusFilter}" found`}
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

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  // Get the label for the current status
  const getStatusLabel = (status: string) => {
    if (status === 'ALL') return 'All Statuses';

    // Convert from SNAKE_CASE to Title Case
    return status
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Status: {getStatusLabel(selectedStatus)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {STATUS_OPTIONS.map(status => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatus === status}
            onCheckedChange={() => onStatusChange(status)}
          >
            {status === 'ALL' ? (
              'All Statuses'
            ) : (
              <div className="flex items-center gap-2">
                <span className="ml-1">{getStatusLabel(status)}</span>
              </div>
            )}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
