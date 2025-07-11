'use client';
import {
  ArrowLeft,
  BanIcon,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  History,
  Package,
  CreditCardIcon as PaymentIcon,
  ShoppingBag,
  Star,
  StarIcon,
  Truck,
  Wrench,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { OrderHeader } from '@/app/(root)/_components/order-header';
import {
  getPaymentStatusBadge,
  getStatusBadge,
  orderStatusSteps,
} from '@/app/(root)/_components/order-status';
import { OrderStatusTimeline } from '@/app/(root)/_components/order-status-timeline';
import { RejectionHistory } from '@/app/(root)/_components/rejection-history';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import {
  OrderStatus,
  useAssignFactoryToOrderMutation,
  useCreateRefundForOrderMutation,
  useFactoryScoresForOrderQuery,
  useGetFactoriesQuery,
  useGetOrderQuery,
  useGetUserBanksByUserIdQuery,
  useProcessWithdrawalMutation,
  useSpeedUpOrderMutation,
  useStartReworkByManagerMutation,
  useSystemConfigOrderQuery,
  useTransferOrderToFactoryMutation,
} from '@/graphql/generated/graphql';
import { cn, formatDate } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { OrderEvaluationCriteria } from '@/components/shared/order/order-evaluation-criteria';
import { uploadImage } from '@/graphql/upload';

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

// Form schemas
const assignFactorySchema = z.object({
  factoryId: z.string({
    required_error: 'Please select a factory',
  }),
});

const refundSchema = z.object({
  reason: z.string().min(10, {
    message: 'Reason must be at least 10 characters',
  }),
});

const withdrawalSchema = z.object({
  userBankId: z.string({
    required_error: 'Please select a bank account',
  }),
  imageUrls: z.array(z.string()).min(1, {
    message: 'Please upload at least one payment proof image',
  }),
});

export default function FactoryOrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [expandedPayments, setExpandedPayments] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState('overview');

  // Dialog states
  const [showAssignFactoryDialog, setShowAssignFactoryDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);
  const [showTransferFactoryDialog, setShowTransferFactoryDialog] =
    useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [speedUpOrder, { loading: speedUpOrderLoading }] =
    useSpeedUpOrderMutation({
      onCompleted: () => {
        toast.success('Order speed up successfully');
        refetch();
      },
      onError: error => {
        toast.error(error.message);
      },
    });

  const [transferOrderToFactory, { loading: transferOrderToFactoryLoading }] =
    useTransferOrderToFactoryMutation({
      onCompleted: () => {
        toast.success('Order transferred to factory successfully');
        refetch();
        setShowTransferFactoryDialog(false);
      },
      onError: error => {
        toast.error(error.message);
      },
      refetchQueries: ['GetOrder'],
    });

  const { data: factoryScores } = useFactoryScoresForOrderQuery({
    variables: {
      orderId: id,
    },
  });

  // Forms
  const assignFactoryForm = useForm<z.infer<typeof assignFactorySchema>>({
    resolver: zodResolver(assignFactorySchema),
  });

  const refundForm = useForm<z.infer<typeof refundSchema>>({
    resolver: zodResolver(refundSchema),
  });

  const withdrawalForm = useForm<z.infer<typeof withdrawalSchema>>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      imageUrls: [],
    },
  });

  // Queries and mutations
  const { data: systemConfigOrder } = useSystemConfigOrderQuery();
  const {
    data: order,
    loading,
    error,
    refetch,
  } = useGetOrderQuery({
    variables: {
      orderId: id,
    },
  });

  // Get all factories
  const { data: factories } = useGetFactoriesQuery();

  // Get user banks for refund
  const { data: userBanks } = useGetUserBanksByUserIdQuery({
    variables: {
      userBanksByUserIdId: order?.order?.customerId || '',
    },
    skip: !order?.order?.customerId,
  });

  // Mutations
  const [startReworkByManager, { loading: startReworkByManagerLoading }] =
    useStartReworkByManagerMutation({
      onCompleted: () => {
        toast('Rework process started successfully');
        refetch();
      },
      onError: error => {
        toast(error.message);
      },
    });

  const [createRefundForOrder, { loading: createRefundForOrderLoading }] =
    useCreateRefundForOrderMutation({
      onCompleted: () => {
        toast('Refund process initiated successfully');
        setShowRefundDialog(false);
        refundForm.reset();
        refetch();
      },
      onError: error => {
        toast(error.message);
      },
    });

  const [assignFactoryToOrder, { loading: assignFactoryToOrderLoading }] =
    useAssignFactoryToOrderMutation({
      onCompleted: () => {
        toast('Factory assigned successfully');
        setShowAssignFactoryDialog(false);
        assignFactoryForm.reset();
        refetch();
      },
      onError: error => {
        toast(error.message);
      },
    });

  const [processWithdrawal, { loading: processWithdrawalLoading }] =
    useProcessWithdrawalMutation({
      onCompleted: () => {
        toast.success('Withdrawal processed successfully');
        setShowWithdrawalDialog(false);
        withdrawalForm.reset();
        setUploadedImages([]);
        refetch();
      },
      onError: error => {
        toast.error(error.message);
      },
    });

  // Handle form submissions
  const onAssignFactorySubmit = (data: z.infer<typeof assignFactorySchema>) => {
    assignFactoryToOrder({
      variables: {
        factoryId: data.factoryId,
        orderId: id,
      },
    });
  };

  const onRefundSubmit = (data: z.infer<typeof refundSchema>) => {
    createRefundForOrder({
      variables: {
        orderId: id,
        reason: data.reason,
      },
    });
  };

  const onWithdrawalSubmit = (data: z.infer<typeof withdrawalSchema>) => {
    processWithdrawal({
      variables: {
        imageUrls: data.imageUrls,
        paymentId: selectedPaymentId,
        userBankId: data.userBankId,
      },
    });
  };

  const handleStartRework = () => {
    startReworkByManager({
      variables: {
        orderId: id,
      },
    });
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      toast.loading('Uploading images...', { id: 'upload' });

      const uploadPromises = Array.from(files).map(async file => {
        const result = await uploadImage(file);
        return result;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter((url): url is string => !!url);

      // Update both state and form value with the new URLs
      const newImageUrls = [...uploadedImages, ...validUrls];
      setUploadedImages(newImageUrls);
      withdrawalForm.setValue('imageUrls', newImageUrls);

      toast.success('Images uploaded successfully', { id: 'upload' });
    } catch (error) {
      toast.error('Failed to upload images. Please try again.', {
        id: 'upload',
      });
      console.error('Upload error:', error);
    }
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
  if (error || !order?.order) {
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

  const currentOrder = order.order;

  // Empty order details
  if (currentOrder.orderDetails && currentOrder.orderDetails.length === 0) {
    return (
      <div className="">
        <BackButton />

        {/* Order Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Order #{currentOrder.id}
                </CardTitle>
                <CardDescription className="mt-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(currentOrder.orderDate)} at{' '}
                    {formatTime(currentOrder.orderDate)}
                  </div>
                </CardDescription>
              </div>
              <div className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:gap-4">
                <div>{getStatusBadge(currentOrder.status)}</div>
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

  const currentStatusGroup = getCurrentStatusGroup(currentOrder.status);

  // Render manager action buttons based on order status
  const renderManagerActions = () => {
    if (
      currentOrder.status === OrderStatus.NeedManagerHandle ||
      currentOrder.status === OrderStatus.NeedManagerHandleRework
    ) {
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Manager Actions Required</CardTitle>
            <CardDescription>
              {order.order.status === OrderStatus.NeedManagerHandleRework
                ? 'This order has exceeded the rework limit and needs your decision'
                : 'This order needs to be assigned to a factory or refunded'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentOrder.status === OrderStatus.NeedManagerHandleRework ? (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Rework Limit Exceeded</AlertTitle>
                  <AlertDescription>
                    This order has exceeded the maximum rework limit of{' '}
                    {systemConfigOrder?.systemConfigOrder?.limitReworkTimes ||
                      3}{' '}
                    times. You need to decide whether to start another rework or
                    process a refund.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>
                    This order needs to be assigned to a factory for production
                    or refunded to the customer.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                {currentOrder.status === OrderStatus.NeedManagerHandleRework ? (
                  <Button
                    onClick={handleStartRework}
                    disabled={startReworkByManagerLoading}
                    className="flex-1"
                  >
                    {startReworkByManagerLoading
                      ? 'Processing...'
                      : 'Start Rework Process'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowAssignFactoryDialog(true)}
                    disabled={assignFactoryToOrderLoading}
                    className="flex-1"
                  >
                    {assignFactoryToOrderLoading
                      ? 'Assigning...'
                      : 'Assign to Factory'}
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => setShowRefundDialog(true)}
                  disabled={createRefundForOrderLoading}
                  className="flex-1"
                >
                  {createRefundForOrderLoading
                    ? 'Processing...'
                    : 'Process Refund'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    } else if (currentOrder.status === OrderStatus.WaitingForRefund) {
      // Find the payment that needs refund processing
      const refundPayment = currentOrder.payments?.find(
        p => p.status === 'PENDING' && p.type === 'REFUND',
      );

      if (refundPayment) {
        return (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Process Refund Payment</CardTitle>
              <CardDescription>
                This order is waiting for refund to be processed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Refund Required</AlertTitle>
                <AlertDescription>
                  You need to process a refund of{' '}
                  {formatCurrency(refundPayment.amount)} to the customer.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => {
                  setSelectedPaymentId(refundPayment.id);
                  setShowWithdrawalDialog(true);
                }}
                disabled={processWithdrawalLoading}
              >
                {processWithdrawalLoading
                  ? 'Processing...'
                  : 'Process Withdrawal'}
              </Button>
            </CardContent>
          </Card>
        );
      }
    }

    return null;
  };

  const handleTransferFactory = (newFactoryId: string) => {
    transferOrderToFactory({
      variables: {
        orderId: id,
        newFactoryId,
      },
    });
  };

  return (
    <div>
      <BackButton />

      {/* Manager Actions */}
      {renderManagerActions()}
      {/* Order Header */}
      {currentOrder && (
        <OrderHeader
          order={{
            id: currentOrder.id,
            orderDate: currentOrder.orderDate || '',
            status: currentOrder.status,
            customer: currentOrder.customer
              ? {
                  name: currentOrder.customer.name || undefined,
                  email: currentOrder.customer.email || undefined,
                  imageUrl: currentOrder.customer.imageUrl || undefined,
                }
              : undefined,
            totalPrice: currentOrder.totalPrice || 0,
            totalItems: currentOrder.totalItems || 0,
            estimatedCompletionAt: currentOrder.estimatedCompletionAt || '',
            isDelayed: Boolean(currentOrder.isDelayed),
            currentProgress: currentOrder.currentProgress || 0,
            shippingPrice: currentOrder.shippingPrice || 0,
            factory: currentOrder.factory
              ? {
                  name: currentOrder.factory.name || undefined,
                  owner: currentOrder.factory.owner
                    ? {
                        name: currentOrder.factory.owner.name || undefined,
                        email: currentOrder.factory.owner.email || undefined,
                        imageUrl:
                          currentOrder.factory.owner.imageUrl || undefined,
                      }
                    : undefined,
                }
              : undefined,
            customerAddress: currentOrder.address?.formattedAddress || '',
            factoryAddress:
              currentOrder.factory?.address?.formattedAddress || '',
            orderCode: currentOrder.orderCode || '',
            expectedReceiveAt: currentOrder.expectedReceiveAt || undefined,
          }}
        />
      )}

      {/* Order Status Timeline */}
      <OrderStatusTimeline
        status={currentOrder.status}
        currentStatusGroup={currentStatusGroup}
      />

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="mb-6 grid grid-cols-7">
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
          {/* reject factories */}
          <TabsTrigger value="rejectFactories">
            <BanIcon className="mr-2 h-4 w-4" />
            Reject Factories
          </TabsTrigger>
          {/* action buttons */}
          <TabsTrigger value="actionButtons">
            <Wrench className="mr-2 h-4 w-4" />
            Action Buttons
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
                          {formatDate(currentOrder.estimatedDoneProductionAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {currentOrder.doneProductionAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on{' '}
                              {formatDate(currentOrder.doneProductionAt)}
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
                          {formatDate(currentOrder.estimatedCheckQualityAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {currentOrder.doneCheckQualityAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on{' '}
                              {formatDate(currentOrder.doneCheckQualityAt)}
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
                          {formatDate(currentOrder.estimatedShippingAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {currentOrder.shippedAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Shipped on {formatDate(currentOrder.shippedAt)}
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
                          {formatDate(currentOrder.estimatedCompletionAt)}
                        </p>
                        <p className="mt-2 text-sm">
                          {currentOrder.completedAt ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on{' '}
                              {formatDate(currentOrder.completedAt)}
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
                    {formatCurrency(
                      currentOrder.totalPrice - currentOrder.shippingPrice,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(currentOrder.shippingPrice)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(currentOrder.totalPrice)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Evaluation Criteria Section */}
          <OrderEvaluationCriteria
            criteria={currentOrder.orderEvaluationCriteria || []}
            className="mt-6"
          />
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
                {currentOrder.orderDetails?.map(item => (
                  <div key={item.id} className="rounded-lg border p-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                      <Link href={`/view/tshirt/${item.design?.id}`}>
                        <div className="bg-muted group relative aspect-square overflow-hidden rounded-md transition-all hover:opacity-90">
                          <Image
                            src={
                              item.design?.thumbnailUrl ||
                              '/placeholder.svg?height=200&width=200' ||
                              '/placeholder.svg'
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
                          <div className="mt-2">
                            <h4 className="mb-1 text-sm font-medium">
                              Rework:
                            </h4>
                            <div className="grid gap-2 md:grid-cols-2">
                              <p className="text-muted-foreground text-xs">
                                <span className="mr-2 text-green-600">
                                  {item.isRework ? 'Yes' : 'No'}
                                </span>
                                {item.reworkTime} times
                              </p>
                            </div>
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
                              <h4 className="text-sm font-medium">
                                Quality Check:
                              </h4>
                              {item.checkQualities.map((check, idx) => (
                                <div
                                  key={idx}
                                  className="mt-1 flex items-center gap-2 text-sm"
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
                {currentOrder?.orderProgressReports
                  ?.sort((a, b) => b.reportDate.localeCompare(a.reportDate))
                  ?.map((report, index) => (
                    <div key={report.id} className="relative pb-6 pl-6">
                      {index !==
                        (currentOrder?.orderProgressReports?.length || 0) -
                          1 && (
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
                {!currentOrder?.orderProgressReports?.length && (
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
              {currentOrder.payments && currentOrder.payments.length > 0 ? (
                <div className="space-y-4">
                  {currentOrder.payments.map(payment => (
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

                      {payment.type == 'WITHDRAWN' &&
                        payment.status == 'PENDING' && (
                          <Button
                            onClick={() => {
                              setSelectedPaymentId(payment.id);
                              setShowWithdrawalDialog(true);
                            }}
                            className="mb-2 w-full"
                          >
                            Refund
                          </Button>
                        )}

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
                    {formatCurrency(
                      currentOrder.totalPrice - currentOrder.shippingPrice,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(currentOrder.shippingPrice)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(currentOrder.totalPrice)}</span>
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
              {currentOrder.rating ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground text-sm font-medium">
                      Rating{' '}
                      {currentOrder.ratedAt
                        ? 'at ' + formatDate(currentOrder.ratedAt)
                        : ''}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={cn(
                            'h-5 w-5',
                            star <= currentOrder.rating!
                              ? 'fill-primary text-primary'
                              : 'text-muted stroke-muted-foreground',
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">
                        {currentOrder.rating} out of 5
                      </span>
                    </div>
                  </div>

                  {currentOrder.ratingComment && (
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-sm font-medium">
                        Comment
                      </span>
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        "{currentOrder.ratingComment}"
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

        {/* Reject Factories */}
        <TabsContent value="rejectFactories">
          <RejectionHistory rejectedHistory={currentOrder.rejectedHistory} />
        </TabsContent>

        {/* Action Buttons */}
        <TabsContent value="actionButtons">
          <div className="space-y-6">
            {/* Danger Zone Card */}
            <Card className="border-destructive/20">
              <CardHeader className="border-destructive/20 border-b">
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-destructive/80">
                  These actions are irreversible and should be used with caution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Speed Up Order Button */}
                  <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
                    <div className="mb-4">
                      <h3 className="text-destructive mb-1 font-medium">
                        Speed Up Order
                      </h3>
                      <p className="text-destructive/80 text-sm">
                        Speed up the order deadline acception from factory for
                        testing purposes
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        speedUpOrder({
                          variables: { orderId: currentOrder.id },
                        })
                      }
                      disabled={speedUpOrderLoading}
                      className="w-full"
                    >
                      {speedUpOrderLoading ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          Speed Up Order
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Process Refund Button */}
                  <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
                    <div className="mb-4">
                      <h3 className="text-destructive mb-1 font-medium">
                        Process Refund
                      </h3>
                      <p className="text-destructive/80 text-sm">
                        Initiate a refund process for the customer
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => setShowRefundDialog(true)}
                      className="w-full"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Process Refund
                    </Button>
                  </div>

                  {/* Transfer Factory Button */}
                  <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
                    <div className="mb-4">
                      <h3 className="text-destructive mb-1 font-medium">
                        Transfer to Different Factory
                      </h3>
                      <p className="text-destructive/80 text-sm">
                        Transfer this order to a different factory
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => setShowTransferFactoryDialog(true)}
                      className="w-full"
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Transfer Factory
                    </Button>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4" />
                    <div>
                      <p className="font-medium">Warning</p>
                      <p className="mt-1 text-sm">
                        These actions will affect the order status and may have
                        financial implications. Please ensure you have the
                        necessary permissions and have reviewed all details
                        before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Assign Factory Dialog */}
      <Dialog
        open={showAssignFactoryDialog}
        onOpenChange={setShowAssignFactoryDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Factory</DialogTitle>
            <DialogDescription>
              Select a factory to handle this order's production
            </DialogDescription>
          </DialogHeader>
          <Form {...assignFactoryForm}>
            <form
              onSubmit={assignFactoryForm.handleSubmit(onAssignFactorySubmit)}
              className="space-y-4"
            >
              <FormField
                control={assignFactoryForm.control}
                name="factoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Factory</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a factory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {factories?.getAllFactories?.map(factory => (
                          <SelectItem
                            key={factory.factoryOwnerId}
                            value={factory.factoryOwnerId}
                          >
                            {factory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a factory that specializes in this type of product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAssignFactoryDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={assignFactoryToOrderLoading}>
                  {assignFactoryToOrderLoading
                    ? 'Assigning...'
                    : 'Assign Factory'}
                </Button>
              </DialogFooter>
            </form>
          </Form>

          {factoryScores && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Factory Scores</h3>
              <div className="grid gap-4">
                {factoryScores.factoryScoresForOrder
                  .filter(
                    factory =>
                      factory.factoryId ===
                      assignFactoryForm.watch('factoryId'),
                  )
                  .map(factory => (
                    <div
                      key={factory.factoryId}
                      className="rounded-lg border p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium">{factory.factoryName}</h4>
                        <div className="text-sm">
                          Total Score:{' '}
                          <span className="font-semibold">
                            {(factory.totalScore * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Capacity
                            </span>
                            <span>
                              {(factory.scores.capacityScore * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Lead Time
                            </span>
                            <span>
                              {(factory.scores.leadTimeScore * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Legit Points
                            </span>
                            <span>
                              {(factory.scores.legitPointScore * 100).toFixed(
                                1,
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Production Capacity
                            </span>
                            <span>
                              {(
                                factory.scores.productionCapacityScore * 100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Specialization
                            </span>
                            <span>
                              {(
                                factory.scores.specializationScore * 100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        </div>
                        <div className="text-muted-foreground mt-2 text-xs">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              Capacity Weight: {factory.weights.capacity * 100}%
                            </div>
                            <div>
                              Lead Time Weight: {factory.weights.leadTime * 100}
                              %
                            </div>
                            <div>
                              Legit Points Weight:{' '}
                              {factory.weights.legitPoint * 100}%
                            </div>
                            <div>
                              Production Capacity Weight:{' '}
                              {factory.weights.productionCapacity * 100}%
                            </div>
                            <div>
                              Specialization Weight:{' '}
                              {factory.weights.specialization * 100}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {!assignFactoryForm.watch('factoryId') && (
                  <div className="text-muted-foreground py-4 text-center">
                    Select a factory to view its scores
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
            <DialogDescription>
              Provide a reason for the refund
            </DialogDescription>
          </DialogHeader>
          <Form {...refundForm}>
            <form
              onSubmit={refundForm.handleSubmit(onRefundSubmit)}
              className="space-y-4"
            >
              <FormField
                control={refundForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refund Reason</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter reason for refund" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be visible to the customer
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRefundDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createRefundForOrderLoading}>
                  {createRefundForOrderLoading
                    ? 'Processing...'
                    : 'Process Refund'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Withdrawal Dialog */}
      <Dialog
        open={showWithdrawalDialog}
        onOpenChange={setShowWithdrawalDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Process Withdrawal</DialogTitle>
            <DialogDescription>
              Select customer bank account and upload payment proof
            </DialogDescription>
          </DialogHeader>
          <Form {...withdrawalForm}>
            <form
              onSubmit={withdrawalForm.handleSubmit(onWithdrawalSubmit)}
              className="space-y-4"
            >
              <FormField
                control={withdrawalForm.control}
                name="userBankId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Bank Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userBanks?.userBanksByUserId?.map(bank => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.bank?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bank Account Details */}
              {withdrawalForm.watch('userBankId') && (
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Bank Account Details</h4>
                  {userBanks?.userBanksByUserId?.find(
                    bank => bank.id === withdrawalForm.watch('userBankId'),
                  ) && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Bank Name:
                        </span>
                        <span className="font-medium">
                          {
                            userBanks.userBanksByUserId.find(
                              bank =>
                                bank.id === withdrawalForm.watch('userBankId'),
                            )?.bank?.name
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Account Number:
                        </span>
                        <span className="font-medium">
                          {
                            userBanks.userBanksByUserId.find(
                              bank =>
                                bank.id === withdrawalForm.watch('userBankId'),
                            )?.accountNumber
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Account Name:
                        </span>
                        <span className="font-medium">
                          {
                            userBanks.userBanksByUserId.find(
                              bank =>
                                bank.id === withdrawalForm.watch('userBankId'),
                            )?.accountName
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <FormField
                control={withdrawalForm.control}
                name="imageUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Proof</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                        {uploadedImages.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {uploadedImages.map((url, idx) => (
                              <div
                                key={idx}
                                className="relative h-16 w-16 overflow-hidden rounded-md"
                              >
                                <Image
                                  src={url || '/placeholder.svg'}
                                  alt={`Payment proof ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload screenshots of payment confirmation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowWithdrawalDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={processWithdrawalLoading}>
                  {processWithdrawalLoading
                    ? 'Processing...'
                    : 'Confirm Withdrawal'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Transfer Factory Dialog */}
      <Dialog
        open={showTransferFactoryDialog}
        onOpenChange={setShowTransferFactoryDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transfer to Different Factory</DialogTitle>
            <DialogDescription>
              Select a new factory to handle this order's production
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              {factories?.getAllFactories?.map(factory => (
                <div
                  key={factory.factoryOwnerId}
                  className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border p-4"
                  onClick={() => handleTransferFactory(factory.factoryOwnerId)}
                >
                  <div>
                    <h4 className="font-medium">{factory.name}</h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={transferOrderToFactoryLoading}
                  >
                    {transferOrderToFactoryLoading ? (
                      <Clock className="h-4 w-4 animate-spin" />
                    ) : (
                      <Truck className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
