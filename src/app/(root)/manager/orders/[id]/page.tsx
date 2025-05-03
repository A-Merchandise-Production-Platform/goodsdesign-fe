'use client';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  CreditCardIcon as PaymentIcon,
  FileText,
  History,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
  StarIcon,
  Star,
} from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  getPaymentStatusBadge,
  getStatusBadge,
  orderStatusSteps,
  refundStatusSteps,
} from '@/app/(root)/_components/order-status';
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
  OrderStatus,
  useAssignFactoryToOrderMutation,
  useCreateRefundForOrderMutation,
  useGetFactoriesQuery,
  useGetOrderQuery,
  useGetUserBanksByUserIdQuery,
  useProcessWithdrawalMutation,
  useStartReworkByManagerMutation,
  useSystemConfigOrderQuery,
} from '@/graphql/generated/graphql';
import { cn, formatDate } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useUploadFileMutation } from '@/graphql/upload-client/upload-file-hook';

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
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

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

  const [uploadFile, { loading: uploadFileloading }] = useUploadFileMutation();

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

  // Check if order has exceeded rework limit
  const exceededReworkLimit = order?.order?.orderDetails?.some(
    detail =>
      (detail.reworkTime || 0) >=
      (systemConfigOrder?.systemConfigOrder?.limitReworkTimes || 3),
  );

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
    if (!files || uploadFileloading) return;

    try {
      toast.loading('Uploading images...', { id: 'upload' });

      const uploadPromises = Array.from(files).map(async file => {
        const result = await uploadFile({
          variables: { file },
        });
        return result.data?.uploadFile?.url;
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
    if (currentOrder.status === OrderStatus.NeedManagerHandle) {
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Manager Actions Required</CardTitle>
            <CardDescription>
              {exceededReworkLimit
                ? 'This order has exceeded the rework limit and needs your decision'
                : 'This order needs to be assigned to a factory or refunded'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exceededReworkLimit ? (
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
                {exceededReworkLimit ? (
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

  return (
    <div>
      <BackButton />

      {/* Manager Actions */}
      {renderManagerActions()}

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
                      currentOrder?.customer?.imageUrl ||
                      '/placeholder.svg?height=32&width=32' ||
                      '/placeholder.svg'
                    }
                    alt={currentOrder?.customer?.name || 'Customer'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{currentOrder?.customer?.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {currentOrder?.customer?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-sm font-medium">
                Total Amount
              </span>
              <span className="font-medium">
                {formatCurrency(currentOrder.totalPrice)}
              </span>
              <span className="text-muted-foreground text-sm">
                {currentOrder.totalItems} items
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-sm font-medium">
                Estimated Completion
              </span>
              <span className="font-medium">
                {formatDate(currentOrder.estimatedCompletionAt)}
              </span>
              <span className="text-muted-foreground text-sm">
                {currentOrder.isDelayed ? (
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
              <Progress
                value={currentOrder.currentProgress}
                className="h-2 w-full"
              />
              <span className="text-muted-foreground text-sm">
                {currentOrder.currentProgress}% complete
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
                    (currentOrder.status === 'WAITING_FOR_REFUND' ||
                    currentOrder.status === 'REFUNDED'
                      ? (refundStatusSteps.findIndex(step =>
                          step.statuses.includes(currentOrder.status),
                        ) +
                          1) /
                        refundStatusSteps.length
                      : (orderStatusSteps.findIndex(
                          step => step.group === currentStatusGroup,
                        ) +
                          1) /
                        orderStatusSteps.length) * 100
                  }%`,
                }}
              />
            </div>

            <div
              className={`grid grid-cols-2 gap-2 pt-6 md:grid-cols-2 ${
                currentOrder.status === 'WAITING_FOR_REFUND' ||
                currentOrder.status === 'REFUNDED'
                  ? 'lg:grid-cols-2'
                  : 'lg:grid-cols-6'
              }`}
            >
              {(currentOrder.status === 'WAITING_FOR_REFUND' ||
              currentOrder.status === 'REFUNDED'
                ? refundStatusSteps
                : orderStatusSteps
              ).map((step, index) => {
                const isActive =
                  currentOrder.status === 'WAITING_FOR_REFUND' ||
                  currentOrder.status === 'REFUNDED'
                    ? step.statuses.includes(currentOrder.status)
                    : step.group === currentStatusGroup;
                const isPast =
                  currentOrder.status === 'WAITING_FOR_REFUND' ||
                  currentOrder.status === 'REFUNDED'
                    ? refundStatusSteps.findIndex(s =>
                        s.statuses.includes(currentOrder.status),
                      ) > index
                    : orderStatusSteps.findIndex(
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
        <TabsList className="mb-6 grid grid-cols-5">
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
                {currentOrder?.orderProgressReports?.map((report, index) => (
                  <div key={report.id} className="relative pb-6 pl-6">
                    {index !==
                      (currentOrder?.orderProgressReports?.length || 0) - 1 && (
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
                            {bank.bank?.name} - {bank.accountNumber} -{' '}
                            {bank.accountName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
    </div>
  );
}
