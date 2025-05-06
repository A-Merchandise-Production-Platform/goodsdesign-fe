'use client';
import React from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  CreditCardIcon as PaymentIcon,
  DollarSign,
  FileText,
  History,
  Package,
  ShoppingBag,
  Star,
  Truck,
  XCircle,
  StarIcon,
  BanIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Textarea } from '@/components/ui/textarea';
import {
  CreatePaymentGatewayUrlMutation,
  useCreatePaymentGatewayUrlMutation,
  useFeedbackOrderMutation,
  useGetOrderQuery,
  useOrderPriceDetailsQuery,
} from '@/graphql/generated/graphql';
import { cn, formatDate } from '@/lib/utils';

import {
  getPaymentStatusBadge,
  getStatusBadge,
  orderStatusSteps,
  refundStatusSteps,
} from '../../_components/order-status';

// Import the new components
import { OrderHeader } from '@/app/(root)/_components/order-header';
import { OrderStatusTimeline } from '@/app/(root)/_components/order-status-timeline';
import { RejectionHistory } from '../../_components/rejection-history';
import { DownloadBillButtonWithPreview } from '@/app/(root)/my-order/[id]/_components/download-bill-button-with-preview';
import { Badge } from '@/components/ui/badge';

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

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [expandedPayments, setExpandedPayments] = useState<
    Record<string, boolean>
  >({});
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    'VNPAY' | 'PAYOS'
  >('VNPAY');
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [ratingComment, setRatingComment] = useState('');

  const { data: orderPriceDetails, loading: orderPriceDetailsLoading } =
    useOrderPriceDetailsQuery({
      variables: {
        orderId: id,
      },
    });

  const [createPaymentGatewayUrl, { loading: createPaymentGatewayUrlLoading }] =
    useCreatePaymentGatewayUrlMutation({
      onCompleted: (data: CreatePaymentGatewayUrlMutation) => {
        if (data?.createPayment) {
          // Redirect to payment gateway URL
          window.location.href = data.createPayment;
        } else {
          toast.error('Failed to create payment link. Please try again.');
        }
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to create payment link');
      },
    });

  // useFeedbackOrderMutation
  const [feedbackOrder, { loading: feedbackOrderLoading }] =
    useFeedbackOrderMutation({
      onCompleted: () => {
        refetch();
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to feedback order');
      },
    });

  const handleFeedbackSubmit = () => {
    feedbackOrder({
      variables: {
        orderId: id,
        input: {
          rating: rating,
          ratingComment: ratingComment,
        },
      },
    });
    setIsFeedbackDialogOpen(false);
    toast.success('Thank you for your feedback!');
  };
  // Use the query hook
  const { data, loading, error, refetch } = useGetOrderQuery({
    variables: {
      orderId: id,
    },
  });

  const order = data?.order;

  useEffect(() => {
    if (order?.status === 'SHIPPED' && !order?.rating) {
      setIsFeedbackDialogOpen(true);
    }
  }, [order]);

  // Handle payment balance
  const handlePayBalance = (paymentId: string, gateway: 'VNPAY' | 'PAYOS') => {
    if (!order) return;

    setSelectedPaymentGateway(gateway);

    createPaymentGatewayUrl({
      variables: {
        gateway: gateway,
        paymentId: paymentId,
      },
    });
  };

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
      <Button variant="outline" onClick={() => router.push('/my-order')}>
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
      <div className="container mx-auto pt-4 pb-16">
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
            <Button onClick={() => router.push('/my-order')}>
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
      <div className="container mx-auto py-4">
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
            <Button onClick={() => router.push('/my-order')}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStatusGroup = getCurrentStatusGroup(order.status);

  return (
    <div className="container mx-auto py-4">
      <BackButton />

      {/* Order Header */}
      {order && (
        <OrderHeader
          order={{
            id: order.id,
            orderDate: order.orderDate || '',
            status: order.status,
            customer: order.customer
              ? {
                  name: order.customer.name || undefined,
                  email: order.customer.email || undefined,
                  imageUrl: order.customer.imageUrl || undefined,
                }
              : undefined,
            totalPrice: order.totalPrice || 0,
            totalItems: order.totalItems || 0,
            estimatedCompletionAt: order.estimatedCompletionAt || '',
            isDelayed: Boolean(order.isDelayed),
            currentProgress: order.currentProgress || 0,
            shippingPrice: order.shippingPrice || 0,
            customerAddress: order.address?.formattedAddress || '',
            factoryAddress: order.factory?.address?.formattedAddress || '',
            factory: order.factory
              ? {
                  name: order.factory.name || undefined,
                  owner: order.factory.owner
                    ? {
                        name: order.factory.owner.name || undefined,
                        email: order.factory.owner.email || undefined,
                        imageUrl: order.factory.owner.imageUrl || undefined,
                      }
                    : undefined,
                }
              : undefined,
            orderCode: order.orderCode || '',
          }}
        />
      )}

      {/* Order Status Timeline */}
      <OrderStatusTimeline
        status={order.status}
        currentStatusGroup={currentStatusGroup}
      />

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-2 pb-16"
      >
        <TabsList className="mb-2 grid grid-cols-6">
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
          <TabsTrigger value="rating">
            <StarIcon className="mr-2 h-4 w-4" />
            Rating
          </TabsTrigger>
          <TabsTrigger value="rejectionHistory">
            <BanIcon className="mr-2 h-4 w-4" />
            Rejection History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Order Overview</CardTitle>
              <CardDescription>Summary of your order details</CardDescription>
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
                {/* <div className="flex justify-end">
                  <DownloadBillButtonWithPreview
                    order={order}
                    companyName="Goods Design"
                    companyLogo="/logo.png"
                    companyAddress="Ho Chi Minh City, Vietnam"
                    companyPhone="+84 123 456 789"
                    companyEmail="contact@goodsdesign.uydev.id.vn"
                    companyWebsite="goodsdesign.uydev.id.vn"
                  />
                </div> */}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="flex w-full flex-col space-y-4">
                {/* Base Price */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-medium text-rose-500">
                    {formatCurrency(
                      orderPriceDetails?.orderPriceDetails?.basePrice || 0,
                    )}
                  </span>
                </div>

                {/* Discount Section */}
                {(orderPriceDetails?.orderPriceDetails?.discountPercentage ||
                  0) > 0 && (
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-700 dark:text-emerald-400">
                          Volume Discount
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        >
                          {
                            orderPriceDetails?.orderPriceDetails
                              ?.discountPercentage
                          }
                          % OFF
                        </Badge>
                      </div>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        -
                        {formatCurrency(
                          (orderPriceDetails?.orderPriceDetails?.basePrice ||
                            0) -
                            (orderPriceDetails?.orderPriceDetails
                              ?.priceAfterDiscount || 0),
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                      Price after discount:{' '}
                      {formatCurrency(
                        orderPriceDetails?.orderPriceDetails
                          ?.priceAfterDiscount || 0,
                      )}
                    </p>
                  </div>
                )}

                {/* Voucher Section */}
                {orderPriceDetails?.orderPriceDetails?.voucher && (
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Voucher Applied
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                          >
                            {orderPriceDetails.orderPriceDetails.voucher.code}
                          </Badge>
                        </div>
                        {orderPriceDetails.orderPriceDetails.voucher
                          .description && (
                          <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            {
                              orderPriceDetails.orderPriceDetails.voucher
                                .description
                            }
                          </p>
                        )}
                      </div>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        -
                        {formatCurrency(
                          (orderPriceDetails?.orderPriceDetails
                            ?.priceAfterDiscount || 0) -
                            (orderPriceDetails?.orderPriceDetails
                              ?.priceAfterVoucher || 0),
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                      Price after voucher:{' '}
                      {formatCurrency(
                        orderPriceDetails?.orderPriceDetails
                          ?.priceAfterVoucher || 0,
                      )}
                    </p>
                  </div>
                )}

                {/* Shipping Fee */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span className="font-medium text-rose-500">
                    +
                    {formatCurrency(
                      orderPriceDetails?.orderPriceDetails?.shippingPrice || 0,
                    )}
                  </span>
                </div>

                <Separator className="my-2" />

                {/* Final Total */}
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Total Payment</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xl">
                      {formatCurrency(
                        orderPriceDetails?.orderPriceDetails?.finalPrice || 0,
                      )}
                    </span>
                    {(orderPriceDetails?.orderPriceDetails?.basePrice || 0) >
                      (orderPriceDetails?.orderPriceDetails?.finalPrice ||
                        0) && (
                      <span className="text-sm text-emerald-600">
                        You saved{' '}
                        {formatCurrency(
                          (orderPriceDetails?.orderPriceDetails?.basePrice ||
                            0) -
                            (orderPriceDetails?.orderPriceDetails?.finalPrice ||
                              0),
                        )}
                      </span>
                    )}
                  </div>
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
                      <Link href={`/view/tshirt/${item.design?.id}`}>
                        <div className="bg-muted group relative aspect-square overflow-hidden rounded-md transition-all hover:opacity-90">
                          <Image
                            src={
                              item.design?.thumbnailUrl ||
                              '/placeholder.svg?height=200&width=200'
                            }
                            alt={
                              item.systemConfigVariant?.product?.name ||
                              'Product'
                            }
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </Link>
                      <div className="grid gap-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {item.systemConfigVariant?.product?.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Size: {item.systemConfigVariant?.size} • Color:{' '}
                              <span className="inline-flex items-center">
                                <span
                                  className="mr-1 inline-block h-3 w-3 rounded-full"
                                  style={{
                                    backgroundColor:
                                      item.systemConfigVariant?.color ||
                                      'transparent',
                                  }}
                                ></span>
                                {item.systemConfigVariant?.color}
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
                Progress and updates for your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order?.orderProgressReports
                  ?.sort((a, b) => b.reportDate.localeCompare(a.reportDate))
                  ?.map((report, index) => (
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
                              {payment.transactions?.map(transaction => (
                                <React.Fragment key={transaction.id}>
                                  <TableRow>
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
                                      {getPaymentStatusBadge(
                                        transaction.status,
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  {transaction.imageUrls &&
                                    transaction.imageUrls.length > 0 && (
                                      <TableRow>
                                        <TableCell colSpan={4} className="p-4">
                                          <h4 className="mb-2 text-sm font-medium">
                                            Transaction Images
                                          </h4>
                                          <div className="grid grid-cols-4 gap-2">
                                            {transaction.imageUrls.map(
                                              (url, idx) => (
                                                <div
                                                  key={idx}
                                                  className="relative aspect-square overflow-hidden rounded-md"
                                                >
                                                  <Image
                                                    src={url}
                                                    alt={`Transaction image ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                  />
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    )}
                                </React.Fragment>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {payment.status === 'PENDING' &&
                        payment.type == 'DEPOSIT' && (
                          <div className="mt-4 flex justify-between gap-2">
                            <div className="mb-4">
                              <Select
                                value={selectedPaymentGateway}
                                onValueChange={value =>
                                  setSelectedPaymentGateway(
                                    value as 'VNPAY' | 'PAYOS',
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="VNPAY">VNPAY</SelectItem>
                                  <SelectItem value="PAYOS">PayOS</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              onClick={() => {
                                // Handle payment logic here
                                handlePayBalance(
                                  payment.id,
                                  selectedPaymentGateway,
                                );
                              }}
                              className="flex-1"
                            >
                              <DollarSign className="mr-2 h-4 w-4" />
                              Pay Now
                            </Button>
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
              <div className="flex w-full flex-col space-y-4">
                {/* Base Price */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-medium text-rose-500">
                    {formatCurrency(
                      orderPriceDetails?.orderPriceDetails?.basePrice || 0,
                    )}
                  </span>
                </div>

                {/* Discount Section */}
                {(orderPriceDetails?.orderPriceDetails?.discountPercentage ||
                  0) > 0 && (
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-700 dark:text-emerald-400">
                          Volume Discount
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        >
                          {
                            orderPriceDetails?.orderPriceDetails
                              ?.discountPercentage
                          }
                          % OFF
                        </Badge>
                      </div>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        -
                        {formatCurrency(
                          (orderPriceDetails?.orderPriceDetails?.basePrice ||
                            0) -
                            (orderPriceDetails?.orderPriceDetails
                              ?.priceAfterDiscount || 0),
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                      Price after discount:{' '}
                      {formatCurrency(
                        orderPriceDetails?.orderPriceDetails
                          ?.priceAfterDiscount || 0,
                      )}
                    </p>
                  </div>
                )}

                {/* Voucher Section */}
                {orderPriceDetails?.orderPriceDetails?.voucher && (
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Voucher Applied
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                          >
                            {orderPriceDetails.orderPriceDetails.voucher.code}
                          </Badge>
                        </div>
                        {orderPriceDetails.orderPriceDetails.voucher
                          .description && (
                          <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            {
                              orderPriceDetails.orderPriceDetails.voucher
                                .description
                            }
                          </p>
                        )}
                      </div>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        -
                        {formatCurrency(
                          (orderPriceDetails?.orderPriceDetails
                            ?.priceAfterDiscount || 0) -
                            (orderPriceDetails?.orderPriceDetails
                              ?.priceAfterVoucher || 0),
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                      Price after voucher:{' '}
                      {formatCurrency(
                        orderPriceDetails?.orderPriceDetails
                          ?.priceAfterVoucher || 0,
                      )}
                    </p>
                  </div>
                )}

                {/* Shipping Fee */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span className="font-medium text-rose-500">
                    +
                    {formatCurrency(
                      orderPriceDetails?.orderPriceDetails?.shippingPrice || 0,
                    )}
                  </span>
                </div>

                <Separator className="my-2" />

                {/* Final Total */}
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Total Payment</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xl">
                      {formatCurrency(
                        orderPriceDetails?.orderPriceDetails?.finalPrice || 0,
                      )}
                    </span>
                    {(orderPriceDetails?.orderPriceDetails?.basePrice || 0) >
                      (orderPriceDetails?.orderPriceDetails?.finalPrice ||
                        0) && (
                      <span className="text-sm text-emerald-600">
                        You saved{' '}
                        {formatCurrency(
                          (orderPriceDetails?.orderPriceDetails?.basePrice ||
                            0) -
                            (orderPriceDetails?.orderPriceDetails?.finalPrice ||
                              0),
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rating">
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                Customer Rating
              </CardTitle>
              <CardDescription>Rating status and feedback</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {order.rating ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground text-sm font-medium">
                      Rating{' '}
                      {order.ratedAt ? 'at ' + formatDate(order.ratedAt) : ''}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={cn(
                            'h-5 w-5',
                            star <= order.rating!
                              ? 'fill-primary text-primary'
                              : 'text-muted stroke-muted-foreground',
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">
                        {order.rating} out of 5
                      </span>
                    </div>
                  </div>

                  {order.ratingComment && (
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-sm font-medium">
                        Comment
                      </span>
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        "{order.ratingComment}"
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 text-center">
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <Star className="text-muted stroke-muted-foreground h-10 w-10" />
                    </div>
                    <p className="text-muted-foreground">
                      Waiting for customer rating
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejectionHistory">
          <RejectionHistory rejectedHistory={order.rejectedHistory} />
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog
        open={isWithdrawDialogOpen}
        onOpenChange={setIsWithdrawDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
            <DialogDescription>
              Choose your preferred payment method to complete the transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select
              value={selectedPaymentGateway}
              onValueChange={value =>
                setSelectedPaymentGateway(value as 'VNPAY' | 'PAYOS')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VNPAY">VNPAY</SelectItem>
                <SelectItem value="PAYOS">PayOS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsWithdrawDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Find the pending payment
                const pendingPayment = order?.payments?.find(
                  p => p.status === 'PENDING',
                );
                if (pendingPayment) {
                  handlePayBalance(pendingPayment.id, selectedPaymentGateway);
                  setIsWithdrawDialogOpen(false);
                }
              }}
              disabled={createPaymentGatewayUrlLoading}
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Feedback Dialog */}
      <Dialog
        open={isFeedbackDialogOpen}
        onOpenChange={setIsFeedbackDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Order</DialogTitle>
            <DialogDescription>
              Please share your feedback about your order. Your opinion helps us
              improve our service.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Button
                    key={star}
                    type="button"
                    variant={rating >= star ? 'default' : 'outline'}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setRating(star)}
                  >
                    <Star className={rating >= star ? 'fill-primary' : ''} />
                    <span className="sr-only">{star} Star</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comments</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience with this order..."
                value={ratingComment}
                onChange={e => setRatingComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFeedbackDialogOpen(false)}
            >
              Skip
            </Button>
            <Button
              onClick={handleFeedbackSubmit}
              disabled={feedbackOrderLoading}
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
