'use client';
import { Calendar, CheckCircle2, Clock, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

import { getStatusBadge } from '@/app/(root)/_components/order-status';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatDate } from '@/lib/utils';

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
      };
    };
  };
  showFactory?: boolean;
}

export function OrderHeader({ order, showFactory = false }: OrderHeaderProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Order #{order.id}
            </CardTitle>
            <CardDescription className="mt-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
              </div>
            </CardDescription>
          </div>
          <div className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:gap-4">
            <div>{getStatusBadge(order.status)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-sm font-medium">
              Customer
            </span>
            <div className="flex items-center">
              <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={
                    order?.customer?.imageUrl ||
                    '/placeholder.svg?height=32&width=32'
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
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-sm font-medium">
              Total Amount
            </span>
            <span className="font-medium">
              {formatCurrency(order.totalPrice)}
            </span>
            <span className="text-muted-foreground text-sm">
              {order.totalItems} items
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-sm font-medium">
              Estimated Completion
            </span>
            <span className="font-medium">
              {formatDate(order.estimatedCompletionAt)}
            </span>
            <span className="text-muted-foreground text-sm">
              {order.isDelayed ? (
                <span className="text-destructive flex items-center">
                  <Clock className="mr-1 h-3 w-3" /> Delayed
                </span>
              ) : (
                'On schedule'
              )}
            </span>
          </div>
          {showFactory ? (
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-sm font-medium">
                Factory
              </span>
              <span className="font-medium">{order.factory?.name}</span>
              <span className="text-muted-foreground text-sm">
                {order.factory?.owner?.name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-sm font-medium">
                Progress
              </span>
              <Progress value={order.currentProgress} className="h-2 w-full" />
              <span className="text-muted-foreground text-sm">
                {order.currentProgress}% complete
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 