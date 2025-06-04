'use client';
import { Calendar, Clock, MapPin, Package, Truck, User } from 'lucide-react';
import Image from 'next/image';

import { getStatusBadge } from '@/app/(root)/_components/order-status';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { format, differenceInCalendarDays, isToday } from 'date-fns';

// Helper function to format time
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

interface OrderHeaderProps {
  showFactory?: boolean;
  order: {
    id: string;
    orderDate: string;
    status: string;
    customer?: {
      name?: string;
      email?: string;
      imageUrl?: string;
    };
    totalPrice: number;
    totalItems: number;
    estimatedCompletionAt: string;
    isDelayed?: boolean;
    currentProgress: number;
    shippingPrice?: number;
    factory?: {
      name?: string;
      owner?: {
        name?: string;
        email?: string;
        imageUrl?: string;
      };
    };
    customerAddress?: string;
    factoryAddress?: string;
    orderCode?: string;
    expectedReceiveAt?: string;
  };
}

export function OrderHeader({ order, showFactory = true }: OrderHeaderProps) {
  return (
    <Card className="mb-6 overflow-hidden border py-2 pt-6">
      {/* Status indicator strip at the top */}
      <div
        className={cn(
          'h-1.5 w-full',
          order.status === 'COMPLETED'
            ? 'bg-green-500'
            : order.status === 'PROCESSING' ||
                order.status === 'IN_PRODUCTION' ||
                order.status === 'REWORK_IN_PROGRESS'
              ? 'bg-blue-500'
              : order.status === 'PENDING' ||
                  order.status === 'WAITING_FILL_INFORMATION' ||
                  order.status === 'PENDING_ACCEPTANCE' ||
                  order.status === 'WAITING_PAYMENT'
                ? 'bg-amber-500'
                : order.status === 'CANCELLED' ||
                    order.status === 'REJECTED' ||
                    order.status === 'REWORK_REQUIRED'
                  ? 'bg-red-500'
                  : order.status === 'SHIPPED' ||
                      order.status === 'SHIPPING' ||
                      order.status === 'READY_FOR_SHIPPING'
                    ? 'bg-purple-500'
                    : order.status === 'PAID' ||
                        order.status === 'PAYMENT_RECEIVED'
                      ? 'bg-emerald-500'
                      : order.isDelayed
                        ? 'bg-red-500'
                        : 'bg-slate-500',
        )}
      />

      <CardHeader className="bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <Package className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              Order #{order.id}
            </CardTitle>
            <CardDescription className="mt-2 flex items-center text-slate-600 dark:text-slate-400">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
              {/* link to shipping page */}
            </CardDescription>
            {order.orderCode && (
              <Link
                href={`/shipping/${order.orderCode}`}
                className="mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-600"
              >
                <Truck className="h-4 w-4" /> Shipping Info - GiaoHangNhanh
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="scale-105">{getStatusBadge(order.status)}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Main order information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {/* Customer info */}
            <div className="bg-card rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col space-y-3">
                <span className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
                  <User className="h-3.5 w-3.5" />
                  Customer
                </span>
                <div className="flex items-center">
                  <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full border-2 border-slate-100 shadow-sm dark:border-slate-800">
                    <Image
                      src={
                        order?.customer?.imageUrl ||
                        '/placeholder.svg?height=40&width=40' ||
                        '/placeholder.svg'
                      }
                      alt={order?.customer?.name || 'Customer'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{order?.customer?.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {order?.customer?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total amount */}
            <div className="bg-card rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col space-y-3">
                <span className="text-muted-foreground text-sm font-medium">
                  Total Amount
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">
                      {formatCurrency(order.totalPrice)}
                    </p>
                    <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {order.totalItems} items
                    </div>
                  </div>
                  {/* shippingPrice */}
                  <p className="text-muted-foreground text-sm">
                    Shipping Price: {formatCurrency(order.shippingPrice || 0)}
                  </p>
                  {/* note it includes shipping price */}
                  <p className="text-muted-foreground text-sm">
                    Note: It includes shipping price
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated completion */}
            <div className="bg-card rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col space-y-3">
                <span className="text-muted-foreground text-sm font-medium">
                  Estimated Completion
                </span>
                <div>
                  <p className="font-medium">
                    {formatDate(order.estimatedCompletionAt)}
                  </p>
                  <p className="mt-1">
                    {order.isDelayed ? (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        <Clock className="mr-1 h-3 w-3" /> Delayed
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        On schedule
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Delivery Date */}
            <div className="bg-card rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col space-y-3">
                <span className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  Expected Delivery Date
                </span>
                <div>
                  {order.expectedReceiveAt ? (
                    <>
                      <p className="font-medium">
                        {format(order.expectedReceiveAt, 'dd/MM/yyyy')}
                      </p>
                      {(() => {
                        const today = new Date();
                        const expected = new Date(order.expectedReceiveAt);
                        const diff = differenceInCalendarDays(expected, today);
                        if (isToday(expected)) {
                          return (
                            <span className="text-sm font-semibold text-green-600">
                              Today
                            </span>
                          );
                        } else if (diff > 0) {
                          return (
                            <span className="text-sm font-semibold text-green-600">
                              {diff} day{diff > 1 ? 's' : ''} left
                            </span>
                          );
                        } else if (diff < 0) {
                          return (
                            <span className="text-sm font-semibold text-red-600">
                              Overdue by {Math.abs(diff)} day
                              {Math.abs(diff) > 1 ? 's' : ''}
                            </span>
                          );
                        }
                        return null;
                      })()}
                    </>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Not specified
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Factory info */}
            {showFactory && (
              <div className="bg-card rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-3">
                  <span className="text-muted-foreground text-sm font-medium">
                    Factory
                  </span>
                  <div>
                    <p className="font-medium">{order.factory?.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {order.factory?.owner?.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Progress section */}
          {/* <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Progress</span>
              <span className="font-medium">{order.currentProgress}% complete</span>
            </div>
            <div className="relative pt-1">
              <Progress value={order.currentProgress} className="h-2.5 w-full rounded-full" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Order Placed</span>
                <span>Processing</span>
                <span>Completed</span>
              </div>
            </div>
          </div> */}

          {/* Address information */}
          {(order.customerAddress || order.factoryAddress) && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-card rounded-lg border p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">Shipping Address</span>
                </div>
                <p className="text-sm">
                  {order?.customerAddress ||
                    'Customer address is not available'}
                </p>
              </div>
              {showFactory && (
                <div className="bg-card rounded-lg border p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm font-medium">Factory Address</span>
                  </div>
                  <p className="text-sm">
                    {order?.factoryAddress ||
                      'Factory address is not available'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
