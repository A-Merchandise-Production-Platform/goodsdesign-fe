'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarIcon, ExternalLink, Loader2, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetOrdersByFactoryIdQuery } from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

interface FactoryOrdersTabProps {
  factoryId: string;
}

export function FactoryOrdersTab({ factoryId }: FactoryOrdersTabProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error } = useGetOrdersByFactoryIdQuery({
    variables: {
      factoryId: factoryId,
    },
  });

  const filteredOrders =
    data?.ordersByFactoryId?.filter(
      order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.customer?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ??
          false),
    ) || [];

  const handleViewOrder = (orderId: string) => {
    router.push(`/manager/orders/${orderId}`);
  };

  const getStatusBadgeVariant = (
    status: string,
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const statusMap: Record<
      string,
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      PENDING: 'outline',
      ACCEPTED: 'default',
      IN_PRODUCTION: 'default',
      READY_FOR_SHIPPING: 'secondary',
      SHIPPED: 'secondary',
      COMPLETED: 'secondary',
      REJECTED: 'destructive',
    };

    return statusMap[status] || 'outline';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Factory Orders</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search by order ID or customer..."
              className="pl-8"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="text-muted-foreground mr-2 h-5 w-5 animate-spin" />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="flex h-60 items-center justify-center">
            <p className="text-destructive">
              Error loading orders. Please try again.
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            {searchQuery ? (
              <>
                <h3 className="text-lg font-medium">
                  No matching orders found
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  No orders match your search query. Try a different search
                  term.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium">No Orders Yet</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  This factory doesn't have any orders yet.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map(order => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">
                          {order.id.slice(0, 8)}...
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="text-muted-foreground h-4 w-4" />
                        <span className="text-sm">
                          {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="size-8 overflow-hidden rounded-full border">
                          {order.customer?.imageUrl ? (
                            <img
                              src={order.customer?.imageUrl}
                              alt={order.customer?.name || 'Customer'}
                            />
                          ) : (
                            <div className="bg-primary/10 flex h-full w-full items-center justify-center text-xs font-medium">
                              {order.customer?.name?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {order.customer?.name || 'Unknown'}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {order.customer?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{order.totalItems}</TableCell>
                    <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={e => {
                          e.stopPropagation();
                          handleViewOrder(order.id);
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
