'use client';
import {
  AlertTriangle,
  BanIcon,
  Calendar,
  CheckCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  History,
  Package,
  CreditCardIcon as PaymentIcon,
  Play,
  ShoppingBag,
  Star,
  StarIcon,
  ThumbsDown,
  ThumbsUp,
  Truck,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { OrderHeader } from '@/app/(root)/_components/order-header';
import {
  getPaymentStatusBadge,
  getStatusBadge,
  orderStatusSteps,
} from '@/app/(root)/_components/order-status';
import { OrderStatusTimeline } from '@/app/(root)/_components/order-status-timeline';
import { DashboardShell } from '@/components/dashboard-shell';
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
  OrderDetailStatus,
  OrderStatus,
  useAcceptOrderForFactoryMutation,
  useAddOrderProgressReportMutation,
  useChangeOrderToShippingMutation,
  useDoneProductionOrderDetailsMutation,
  useDoneReworkForOrderDetailsMutation,
  useGetOrderQuery,
  useRejectOrderMutation,
  useShippedOrderMutation,
  useStartReworkMutation,
} from '@/graphql/generated/graphql';
import { cn, formatDate } from '@/lib/utils';
import { filesToBase64 } from '@/utils/handle-upload';
import { RejectionHistory } from '@/app/(root)/_components/rejection-history';
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

export default function FactoryOrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [expandedPayments, setExpandedPayments] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState('overview');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    description: string;
    action: () => void;
    actionText: string;
  } | null>(null);

  // Image upload states
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [progressNote, setProgressNote] = useState('');
  const [isAddProgressDialogOpen, setIsAddProgressDialogOpen] = useState(false);

  // Add progress report mutation
  const [addProgressReport, { loading: addProgressReportLoading }] =
    useAddOrderProgressReportMutation({
      onCompleted: () => {
        refetch();
        toast.success('Progress report added successfully');
        setIsAddProgressDialogOpen(false);
        setProgressNote('');
        setImages([]);
        setPreviewImages([]);
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to add progress report');
      },
    });

  // Use the query hook
  const { data, loading, error, refetch } = useGetOrderQuery({
    variables: {
      orderId: id,
    },
  });

  // Update order status mutations
  const [acceptOrder, { loading: acceptOrderLoading }] =
    useAcceptOrderForFactoryMutation({
      onCompleted: data => {
        refetch();
        toast.success('Order accepted successfully');
      },
      onError: error => {
        toast.error(error.message || 'Failed to accept order');
      },
    });

  const [rejectOrder, { loading: rejectOrderLoading }] = useRejectOrderMutation(
    {
      onCompleted: data => {
        refetch();
        toast.success('Order rejected successfully');
        router.push(`/factory/orders`);
      },
      onError: error => {
        toast.error(error.message || 'Failed to reject order');
      },
    },
  );

  const [startRework, { loading: startReworkLoading }] = useStartReworkMutation(
    {
      onCompleted: data => {
        refetch();
        toast.success('Rework started successfully');
      },
      onError: error => {
        toast.error(error.message || 'Failed to start rework');
      },
    },
  );

  const [doneProductionOrderDetail, { loading: doneProductionLoading }] =
    useDoneProductionOrderDetailsMutation({
      onCompleted: data => {
        refetch();
        toast.success('Production completed successfully');
      },
      onError: error => {
        toast.error(error.message || 'Failed to complete production');
      },
    });

  const [doneReworkOrderDetail, { loading: doneReworkLoading }] =
    useDoneReworkForOrderDetailsMutation({
      onCompleted: data => {
        refetch();
        toast.success('Rework completed successfully');
      },
      onError: error => {
        toast.error(error.message || 'Failed to complete rework');
      },
    });

  const [startShipping, { loading: startShippingLoading }] =
    useChangeOrderToShippingMutation({
      onCompleted: data => {
        refetch();
        toast.success('Shipping started successfully');
      },
      onError: error => {
        toast.error(error.message || 'Failed to start shipping');
      },
    });

  const [doneShipping, { loading: doneShippingLoading }] =
    useShippedOrderMutation({
      onCompleted: data => {
        refetch();
        toast.success('[MOCK] Shipping completed successfully');
      },
      onError: error => {
        toast.error(error.message || 'Failed to complete shipping');
      },
    });

  const [uploadFile, { loading: uploadFileLoading }] = useUploadFileMutation();

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return null;

    try {
      const result = await uploadFile({
        variables: { file },
      });

      // Check if the upload was successful
      if (result.data?.uploadFile?.url) {
        const fileUrl = result.data.uploadFile.url;
        toast.success('Image uploaded successfully');
        return fileUrl;
      }
      return null;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const order = data?.order;

  // Toggle payment details
  const togglePaymentDetails = (paymentId: string) => {
    setExpandedPayments(prev => ({
      ...prev,
      [paymentId]: !prev[paymentId],
    }));
  };

  // Get current status group
  const getCurrentStatusGroup = (status: string) => {
    const group = orderStatusSteps.find(step => step.statuses.includes(status));
    return group ? group.group : 'initial';
  };

  // Handle accept order
  const handleAcceptOrder = () => {
    acceptOrder({
      variables: {
        orderId: id,
      },
    });
  };

  // Handle reject order
  const handleRejectOrder = () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    rejectOrder({
      variables: {
        orderId: id,
        reason: rejectionReason,
      },
    });
    setIsRejectDialogOpen(false);
  };

  // Handle start rework
  const handleStartRework = () => {
    startRework({
      variables: {
        orderId: id,
      },
    });
  };

  // Handle done production
  const handleDoneProduction = () => {
    if (order?.orderDetails) {
      order.orderDetails.forEach(detail => {
        doneProductionOrderDetail({
          variables: {
            orderDetailId: detail.id,
          },
        });
      });
    }
  };

  // Handle done rework
  const handleDoneRework = () => {
    if (order?.orderDetails) {
      order.orderDetails.forEach(detail => {
        doneReworkOrderDetail({
          variables: {
            orderDetailId: detail.id,
          },
        });
      });
    }
  };

  // Handle start shipping
  const handleStartShipping = () => {
    // TODO: Implement start shipping
    startShipping({
      variables: {
        orderId: id,
      },
    });
  };

  // Handle done shipping
  const handleDoneShipping = () => {
    doneShipping({
      variables: {
        orderId: id,
      },
    });
  };
  // Get loading state for any status update
  const updateStatusLoading =
    acceptOrderLoading ||
    rejectOrderLoading ||
    startReworkLoading ||
    doneProductionLoading ||
    doneReworkLoading ||
    startShippingLoading ||
    doneShippingLoading;

  // Show confirmation dialog
  const showConfirmDialog = (action: string) => {
    let dialogConfig = {
      title: '',
      description: '',
      action: () => {},
      actionText: '',
    };

    switch (action) {
      case 'accept':
        dialogConfig = {
          title: 'Accept Order',
          description:
            'Are you sure you want to accept this order? This will move the order to production.',
          action: handleAcceptOrder,
          actionText: 'Accept Order',
        };
        break;
      case 'startRework':
        dialogConfig = {
          title: 'Start Rework',
          description: 'Are you sure you want to start rework on this order?',
          action: handleStartRework,
          actionText: 'Start Rework',
        };
        break;
      case 'doneProduction':
        dialogConfig = {
          title: 'Complete Production',
          description:
            'Are you sure production is complete? This will move the order to quality check.',
          action: handleDoneProduction,
          actionText: 'Complete Production',
        };
        break;
      case 'doneRework':
        dialogConfig = {
          title: 'Complete Rework',
          description:
            'Are you sure rework is complete? This will move the order to quality check.',
          action: handleDoneRework,
          actionText: 'Complete Rework',
        };
        break;
      case 'startShipping':
        dialogConfig = {
          title: 'Start Shipping',
          description: 'Are you sure you want to start shipping on this order?',
          action: handleStartShipping,
          actionText: 'Start Shipping',
        };
        break;
      case 'doneShipping':
        dialogConfig = {
          title: 'Done Shipping',
          description: 'Are you sure you want to done shipping on this order?',
          action: handleDoneShipping,
          actionText: 'Done Shipping',
        };
        break;
    }

    setConfirmAction(dialogConfig);
    setIsConfirmDialogOpen(true);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Convert FileList to Array
    const newFiles = Array.from(files);

    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));

    // Update state
    setImages(prev => [...prev, ...newFiles]);
    setPreviewImages(prev => [...prev, ...newPreviewUrls]);
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  // Convert images to base64
  const convertImagesToBase64 = async (): Promise<string[]> => {
    if (images.length === 0) return [];

    setImageUploading(true);

    try {
      // Convert images to base64 strings
      const base64Strings = await filesToBase64(images);
      return base64Strings;
    } catch (error) {
      console.error('Error converting images to base64:', error);
      toast.error('Failed to process images');
      return [];
    } finally {
      setImageUploading(false);
    }
  };

  // Handle add progress report
  const handleAddProgressReport = async () => {
    if (!progressNote.trim()) {
      toast.error('Please enter a progress note');
      return;
    }

    try {
      // Upload each image and collect URLs
      const uploadedUrls = await Promise.all(
        images.map(async file => {
          // Create a synthetic event object with proper typing
          const event = {
            target: {
              files: [file],
            },
            currentTarget: null,
            nativeEvent: null,
            bubbles: false,
            cancelable: false,
            defaultPrevented: false,
            eventPhase: 0,
            isTrusted: false,
            preventDefault: () => {},
            stopImmediatePropagation: () => {},
            stopPropagation: () => {},
            timeStamp: 0,
            type: 'change',
          } as unknown as React.ChangeEvent<HTMLInputElement>;

          return handleUploadFile(event);
        }),
      );

      // Filter out any failed uploads (null values)
      const validUrls = uploadedUrls.filter(
        (url): url is string => url !== null,
      );

      // Add progress report with uploaded image URLs
      addProgressReport({
        variables: {
          input: {
            orderId: id,
            note: progressNote,
            imageUrls: validUrls,
          },
        },
      });
    } catch (error) {
      console.error('Error adding progress report:', error);
      toast.error('Failed to add progress report');
    }
  };

  // Open image preview
  const openImagePreview = (index: number) => {
    setSelectedImageIndex(index);
    setIsImagePreviewOpen(true);
  };

  // Error or empty order state
  if (error || !order) {
    return (
      <div>
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
            <Button onClick={() => router.push('/factory/orders')}>
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
      <div>
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
            <Button onClick={() => router.push('/factory/orders')}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStatusGroup = getCurrentStatusGroup(order.status);

  return (
    <DashboardShell
      title="Factory Order Details"
      subtitle="Manage and view all your factory orders"
    >
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

      {/* Factory Action Buttons */}
      {order.status === 'PENDING_ACCEPTANCE' && (
        <Card className="dark:bg-primary/30 dark:border-primary mb-6 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Action Required</AlertTitle>
                <AlertDescription>
                  This order is waiting for your acceptance. Please review the
                  order details and accept or reject it.
                </AlertDescription>
              </Alert>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <Button
                  onClick={() => showConfirmDialog('accept')}
                  className="flex-1"
                  disabled={updateStatusLoading}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Accept Order
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsRejectDialogOpen(true)}
                  className="flex-1"
                  disabled={updateStatusLoading}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Reject Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {order.status === 'REWORK_REQUIRED' && (
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-purple-900 dark:bg-purple-950">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Rework Required</AlertTitle>
                <AlertDescription>
                  This order requires rework. Please review the quality check
                  notes and start the rework process.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => showConfirmDialog('startRework')}
                disabled={updateStatusLoading}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Rework
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {order.status === OrderStatus.ReadyForShipping && (
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-purple-900 dark:bg-purple-950">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Ready for Shipping</AlertTitle>
                <AlertDescription>
                  This order is ready for shipping. Please review the shipping
                  details and send the order to the shipper.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => showConfirmDialog('startShipping')}
                disabled={updateStatusLoading}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Shipping
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {order.status === OrderStatus.Shipping && (
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-purple-900 dark:bg-purple-950">
          <CardContent className="pt-6">
            {/* mock done shipping */}
            <div className="flex flex-col space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Shipping</AlertTitle>
                <AlertDescription>
                  This order is auto update by this system cron job. Please wait
                  for the shipping to be completed. This button is only for
                  testing purpose.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => showConfirmDialog('doneShipping')}
                disabled={updateStatusLoading}
              >
                <Play className="mr-2 h-4 w-4" />
                Done Shipping
              </Button>
            </div>
          </CardContent>
        </Card>
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
        className="mb-6"
      >
        <TabsList className="mb-6 grid grid-cols-6">
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
                          <h4 className="mb-1 text-sm font-medium">Rework:</h4>
                          <div className="grid gap-2 md:grid-cols-2">
                            <p className="text-muted-foreground text-xs">
                              <span className="mr-2 text-green-600">
                                {item.isRework ? 'Yes' : 'No'}
                              </span>
                              {item.reworkTime} times
                            </p>
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

                        {/* Production Actions for each item */}
                        {(order.status === 'IN_PRODUCTION' ||
                          order.status === 'REWORK_IN_PROGRESS') && (
                          <div className="mt-4 flex gap-2">
                            {item.status === OrderDetailStatus.InProduction && (
                              <Button
                                onClick={() => {
                                  setConfirmAction({
                                    title: 'Complete Production',
                                    description:
                                      'Are you sure you want to mark this item as completed?',
                                    action: () => {
                                      doneProductionOrderDetail({
                                        variables: {
                                          orderDetailId: item.id,
                                        },
                                      });
                                    },
                                    actionText: 'Complete Production',
                                  });
                                  setIsConfirmDialogOpen(true);
                                }}
                                disabled={updateStatusLoading}
                                className="flex-1"
                              >
                                <CheckCheck className="mr-2 h-4 w-4" />
                                Complete Production
                              </Button>
                            )}

                            {item.status ===
                              OrderDetailStatus.ReworkInProgress && (
                              <Button
                                onClick={() => {
                                  setConfirmAction({
                                    title: 'Complete Rework',
                                    description:
                                      "Are you sure you want to mark this item's rework as completed?",
                                    action: () => {
                                      doneReworkOrderDetail({
                                        variables: {
                                          orderDetailId: item.id,
                                        },
                                      });
                                    },
                                    actionText: 'Complete Rework',
                                  });
                                  setIsConfirmDialogOpen(true);
                                }}
                                disabled={updateStatusLoading}
                                className="flex-1"
                              >
                                <CheckCheck className="mr-2 h-4 w-4" />
                                Complete Rework
                              </Button>
                            )}
                          </div>
                        )}

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
              <div className="mb-6">
                <Button
                  onClick={() => setIsAddProgressDialogOpen(true)}
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Add Progress Report
                </Button>
              </div>
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

                {/* Add Progress Report Button */}
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

      {/* Reject Order Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Order</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this order. This information
              will be shared with the customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Enter reason for rejection..."
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectOrder}
              disabled={updateStatusLoading || !rejectionReason.trim()}
            >
              Reject Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Action Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmAction?.title}</DialogTitle>
            <DialogDescription>{confirmAction?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (confirmAction?.action) {
                  confirmAction.action();
                  setIsConfirmDialogOpen(false);
                }
              }}
              disabled={updateStatusLoading}
            >
              {confirmAction?.actionText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Progress Report Dialog */}
      <Dialog
        open={isAddProgressDialogOpen}
        onOpenChange={setIsAddProgressDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Progress Report</DialogTitle>
            <DialogDescription>
              Add a new progress report with images to document the order
              status.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="progress-note" className="text-sm font-medium">
                Progress Note
              </label>
              <Textarea
                id="progress-note"
                placeholder="Enter progress details..."
                value={progressNote}
                onChange={e => setProgressNote(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Images</label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById('image-upload')?.click()
                    }
                    disabled={imageUploading || addProgressReportLoading}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Select Images
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <span className="text-muted-foreground text-sm">
                    {images.length} {images.length === 1 ? 'image' : 'images'}{' '}
                    selected
                  </span>
                </div>

                {/* Image Preview */}
                {previewImages.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="font-medium">Image Previews</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {previewImages.map((url, index) => (
                        <div
                          key={index}
                          className="group relative aspect-square overflow-hidden rounded-md border"
                          onClick={() => openImagePreview(index)}
                        >
                          <Image
                            src={url}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 rounded-full"
                            onClick={e => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            disabled={
                              imageUploading || addProgressReportLoading
                            }
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 text-center">
                    <FileText className="text-muted-foreground mb-2 h-10 w-10" />
                    <p className="text-muted-foreground text-sm">
                      No images selected
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Upload images to document the progress
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddProgressDialogOpen(false);
                setProgressNote('');
                // Clean up image previews
                previewImages.forEach(url => URL.revokeObjectURL(url));
                setPreviewImages([]);
                setImages([]);
              }}
              disabled={imageUploading || addProgressReportLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddProgressReport}
              disabled={
                imageUploading ||
                addProgressReportLoading ||
                !progressNote.trim()
              }
            >
              {(imageUploading || addProgressReportLoading) && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              Add Progress Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>
              Image {selectedImageIndex + 1} of {previewImages.length}
            </DialogDescription>
          </DialogHeader>

          <div className="relative aspect-square overflow-hidden rounded-md">
            {previewImages[selectedImageIndex] && (
              <Image
                src={previewImages[selectedImageIndex] || '/placeholder.svg'}
                alt={`Preview ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedImageIndex(prev =>
                  prev > 0 ? prev - 1 : previewImages.length - 1,
                );
              }}
              disabled={previewImages.length <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedImageIndex(prev =>
                  prev < previewImages.length - 1 ? prev + 1 : 0,
                );
              }}
              disabled={previewImages.length <= 1}
            >
              Next
            </Button>
          </div>

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                removeImage(selectedImageIndex);
                if (previewImages.length <= 1) {
                  setIsImagePreviewOpen(false);
                } else if (selectedImageIndex >= previewImages.length - 1) {
                  setSelectedImageIndex(previewImages.length - 2);
                }
              }}
              disabled={imageUploading || addProgressReportLoading}
            >
              Remove Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
