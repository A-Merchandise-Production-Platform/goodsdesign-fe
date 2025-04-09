'use client';

import { ArrowUpDown, Calendar, Clock, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetMyOrdersQuery } from '@/graphql/generated/graphql';
import { formatDate, formatPrice } from '@/lib/utils';

export default function MyOrderPage() {
  const { data, loading } = useGetMyOrdersQuery();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sort orders by date
  const sortedOrders = data?.myOrders
    ? [...data?.myOrders].sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      })
    : [];

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Get status badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            Pending
          </Badge>
        );
      case 'IN_PRODUCTION':
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            In Production
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
          <CardDescription>View and manage all your orders</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : sortedOrders.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                You don&apos;t have any orders yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={toggleSortDirection}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Items
                    </TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id.length > 10
                          ? `#${order.id.substring(0, 8)}...`
                          : `#${order.id}`}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                            {formatDate(order.orderDate)}
                          </div>
                          <div className="text-muted-foreground mt-1 flex items-center text-xs">
                            <Clock className="mr-2 h-3 w-3" />
                            {new Date(order.orderDate).toLocaleTimeString(
                              'en-US',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order?.orderDetails
                          ? order?.orderDetails.reduce(
                              (sum, detail) => sum + detail.quantity,
                              0,
                            )
                          : 0}{' '}
                        items
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(order.totalPrice)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/my-order/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
