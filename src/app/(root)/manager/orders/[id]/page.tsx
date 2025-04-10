'use client';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  History,
  Package,
  CreditCardIcon as PaymentIcon,
  ShoppingBag,
  Truck,
  XCircle
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { getPaymentStatusBadge, getStatusBadge, orderStatusSteps } from '@/app/(root)/_components/order-status';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGetOrderQuery
} from '@/graphql/generated/graphql';
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


export default function FactoryOrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [expandedPayments, setExpandedPayments] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState('overview');

  // Use the query hook
  const { data, loading, error, refetch } = useGetOrderQuery({
    variables: {
      orderId: id,
    },
  });

  const order = data?.order;

  // Toggle payment details
  const togglePaymentDetails = (paymentId: string) => {
    setExpandedPayments(prev => ({
      ...prev,
      [paymentId]: !prev[paymentId],
    }));
  };

  // Back to orders button
  const BackButton = () => (
    <div className="mb-6">
      <Button variant="outline" onClick={() => router.push('/manager/orders')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>
    </div>
  );

  // Get current status group
  const getCurrentStatusGroup = (status: string) => {
    const group = orderStatusSteps.find(step => step.statuses.includes(status));
    return group ? group.group : 'initial';
  };

  // Error or empty order state
  if (error || !order) {
    return (
      <div className="">
        <BackButton />
        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-16">
            {error ? (
              <>
                <XCircle className="text-destructive mb-4 h-12 w-12" />
                <h2 className="mb-2 text-xl font-semibold">
                  Error Loading Order
                </h2>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                  There was a problem loading this order. Please try again
                  later.
                </p>
              </>
            ) : (
              <>
                <ShoppingBag className="text-muted-foreground mb-4 h-12 w-12" />
                <h2 className="mb-2 text-xl font-semibold">Order Not Found</h2>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                  The order you&apos;re looking for doesn&apos;t exist or you
                  don&apos;t have permission to view it.
                </p>
              </>
            )}
            <Button onClick={() => router.push('/manager/orders')}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty order details
  if (order.orderDetails && order.orderDetails.length === 0) {
    return (
      <div className="">
        <BackButton />

        {/* Order Header */}
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
                    {formatDate(order.orderDate)} at{' '}
                    {formatTime(order.orderDate)}
                  </div>
                </CardDescription>
              </div>
              <div className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:gap-4">
                <div>{getStatusBadge(order.status)}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="text-muted-foreground mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">
              No Items in This Order
            </h2>
            <p className="text-muted-foreground mb-6">
              This order doesn&apos;t contain any items. This might be due to a
              system error.
            </p>
            <Button onClick={() => router.push('/manager/orders')}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStatusGroup = getCurrentStatusGroup(order.status);

  return (
    <div>
      <BackButton />

      {/* Order Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Order #{order.id.substring(0, 8)}
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
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-sm font-medium">
                Progress
              </span>
              <Progress value={order.currentProgress} className="h-2 w-full" />
              <span className="text-muted-foreground text-sm">
                {order.currentProgress}% complete
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Timeline */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription>
            Current status and progress of the order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="bg-muted absolute top-0 left-0 h-1 w-full">
              <div
                className="bg-primary absolute top-0 left-0 h-full transition-all duration-500"
                style={{
                  width: `${
                    ((orderStatusSteps.findIndex(
                      step => step.group === currentStatusGroup,
                    ) +
                      1) /
                      orderStatusSteps.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-6 md:grid-cols-3 lg:grid-cols-6">
              {orderStatusSteps.map((step, index) => {
                const isActive = step.group === currentStatusGroup;
                const isPast =
                  orderStatusSteps.findIndex(
                    s => s.group === currentStatusGroup,
                  ) > index;
                const Icon = step.icon;

                return (
                  <div key={step.group} className="flex flex-col items-center">
                    <div
                      className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : isPast
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-center text-xs ${isActive ? 'font-medium' : 'text-muted-foreground'}`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="mb-6 grid grid-cols-4">
          <TabsTrigger value="overview">
            <FileText className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="items">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Items
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <History className="mr-2 h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="payment">
            <PaymentIcon className="mr-2 h-4 w-4" />
            Payment
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Order Overview</CardTitle>
              <CardDescription>Summary of order details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 mr-4 rounded-full p-2">
                        <Package className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Production</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Estimated completion:{' '}
                          {formatDate(order.estimatedDoneProductionAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {order.doneProductionAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on {formatDate(order.doneProductionAt)}
                            </span>
                          ) : (
                            <span className="flex items-center text-amber-600">
                              <Clock className="mr-1 h-3 w-3" /> In progress
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 mr-4 rounded-full p-2">
                        <CheckCircle2 className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Quality Check</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Estimated completion:{' '}
                          {formatDate(order.estimatedCheckQualityAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {order.doneCheckQualityAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on{' '}
                              {formatDate(order.doneCheckQualityAt)}
                            </span>
                          ) : (
                            <span className="flex items-center text-amber-600">
                              <Clock className="mr-1 h-3 w-3" /> Pending
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 mr-4 rounded-full p-2">
                        <Truck className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Shipping</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Estimated date:{' '}
                          {formatDate(order.estimatedShippingAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {order.shippedAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Shipped on {formatDate(order.shippedAt)}
                            </span>
                          ) : (
                            <span className="flex items-center text-amber-600">
                              <Clock className="mr-1 h-3 w-3" /> Pending
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 mr-4 rounded-full p-2">
                        <CheckCircle2 className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Completion</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Estimated date:{' '}
                          {formatDate(order.estimatedCompletionAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {order.completedAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on {formatDate(order.completedAt)}
                            </span>
                          ) : (
                            <span className="flex items-center text-amber-600">
                              <Clock className="mr-1 h-3 w-3" /> Pending
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="flex w-full flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {formatCurrency(order.totalPrice - order.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(order.shippingPrice)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Items Tab */}
        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                Items in this order and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {order.orderDetails?.map(item => (
                  <div key={item.id} className="rounded-lg border p-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                      <div className="bg-muted relative aspect-square overflow-hidden rounded-md">
                        <Image
                          src={
                            item.design?.thumbnailUrl ||
                            '/placeholder.svg?height=200&width=200'
                          }
                          alt={
                            item.design?.systemConfigVariant?.product?.name ||
                            'Product'
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {item.design?.systemConfigVariant?.product?.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Size: {item.design?.systemConfigVariant?.size} •
                              Color:{' '}
                              <span className="inline-flex items-center">
                                <span
                                  className="mr-1 inline-block h-3 w-3 rounded-full"
                                  style={{
                                    backgroundColor:
                                      item.design?.systemConfigVariant?.color ||
                                      'transparent',
                                  }}
                                ></span>
                                {item.design?.systemConfigVariant?.color}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {formatCurrency(item.price)}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <h4 className="mb-1 text-sm font-medium">
                            Design Positions:
                          </h4>
                          <div className="grid gap-2 md:grid-cols-2">
                            {item.design?.designPositions?.map(
                              (position, idx) => (
                                <div
                                  key={idx}
                                  className="rounded border p-2 text-sm"
                                >
                                  <p className="font-medium">
                                    {position.positionType?.positionName}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {position.designJSON?.length} design
                                    elements
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="mt-2">
                          <h4 className="mb-1 text-sm font-medium">
                            Production Status:
                          </h4>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                            <span className="text-sm">
                              {item.completedQty > 0 && (
                                <span className="mr-2 text-green-600">
                                  {item.completedQty} completed
                                </span>
                              )}
                              {item.rejectedQty > 0 && (
                                <span className="text-red-600">
                                  {item.rejectedQty} rejected
                                </span>
                              )}
                            </span>
                          </div>
                        </div>

                        {item.checkQualities &&
                          item.checkQualities.length > 0 && (
                            <div className="mt-2">
                              <h4 className="mb-1 text-sm font-medium">
                                Quality Check:
                              </h4>
                              {item.checkQualities.map((check, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  {getStatusBadge(check.status)}
                                  <span>
                                    {check.passedQuantity} passed /{' '}
                                    {check.totalChecked} checked
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>
                Progress and updates for this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order?.orderProgressReports?.map((report, index) => (
                  <div key={report.id} className="relative pb-6 pl-6">
                    {index !==
                      (order?.orderProgressReports?.length || 0) - 1 && (
                      <div className="bg-border absolute top-0 left-2 h-full w-px"></div>
                    )}
                    <div className="border-primary bg-background absolute top-0 left-0 h-4 w-4 rounded-full border-2"></div>
                    <div className="mb-1 text-sm font-medium">
                      {formatDate(report.reportDate)} at{' '}
                      {formatTime(report.reportDate)}
                    </div>
                    <div className="text-sm">{report.note}</div>
                    {report.imageUrls && report.imageUrls.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {report.imageUrls.map((url, idx) => (
                          <div
                            key={idx}
                            className="relative h-16 w-16 overflow-hidden rounded-md"
                          >
                            <Image
                              src={url || '/placeholder.svg'}
                              alt={`Progress image ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {!order?.orderProgressReports?.length && (
                  <div className="text-muted-foreground py-6 text-center">
                    No progress updates available yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Payment status and transaction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {order.payments && order.payments.length > 0 ? (
                <div className="space-y-4">
                  {order.payments.map(payment => (
                    <div key={payment.id} className="rounded-lg border p-4">
                      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="flex items-center font-medium">
                            <CreditCard className="mr-2 h-4 w-4" />
                            {payment.type} Payment
                          </h3>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {payment.paymentLog}
                          </p>
                        </div>
                        <div className="mt-2 flex flex-col md:mt-0 md:items-end">
                          <p className="font-medium">
                            {formatCurrency(payment.amount)}
                          </p>
                          <div className="mt-1">
                            {getPaymentStatusBadge(payment.status)}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePaymentDetails(payment.id)}
                        className="w-full"
                      >
                        {expandedPayments[payment.id] ? 'Hide' : 'Show'}{' '}
                        Transaction Details
                      </Button>

                      {expandedPayments[payment.id] && payment.transactions && (
                        <div className="mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {payment.transactions.map(transaction => (
                                <TableRow key={transaction.id}>
                                  <TableCell>
                                    {formatDate(transaction.createdAt)}
                                  </TableCell>
                                  <TableCell>
                                    {transaction.paymentMethod}
                                  </TableCell>
                                  <TableCell>
                                    {formatCurrency(transaction.amount)}
                                  </TableCell>
                                  <TableCell>
                                    {getPaymentStatusBadge(transaction.status)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground py-6 text-center">
                  No payment information available.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="flex w-full flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {formatCurrency(order.totalPrice - order.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(order.shippingPrice)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
