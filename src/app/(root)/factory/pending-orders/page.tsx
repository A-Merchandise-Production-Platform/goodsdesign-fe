'use client';

import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
import { useGetCurrentFactoryOrdersQuery } from '@/graphql/generated/graphql';
import { formatDate } from '@/lib/utils';

export default function FactoryOrdersPage() {
  const { data, loading } = useGetCurrentFactoryOrdersQuery();
  const router = useRouter();

  const viewOrderDetails = (orderId: string) => {
    router.push(`/factory/pending-orders/${orderId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING_ACCEPTANCE':
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-700"
          >
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'ACCEPTED':
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            <CheckCircle className="mr-1 h-3 w-3" /> Accepted
          </Badge>
        );
      case 'IN_PRODUCTION':
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700"
          >
            <Loader2 className="mr-1 h-3 w-3" /> In Production
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
    }
  };

  if (loading) {
    return <OrdersLoadingSkeleton />;
  }

  const orders =
    data?.factoryOrdersByFactory
      .filter(o => o.status == 'PENDING_ACCEPTANCE')
      .sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }) || [];

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
                  <TableHead>Created</TableHead>
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
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
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
