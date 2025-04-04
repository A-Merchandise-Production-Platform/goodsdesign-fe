'use client';

import { format } from 'date-fns';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Calendar,
  CalendarClock,
  CheckCircle,
  CheckSquare,
  ClipboardList,
  Clock,
  DollarSign,
  Eye,
  ImageIcon,
  Info,
  Loader2,
  Package,
  Plus,
  Send,
  ShieldAlert,
  Trash2,
  Truck,
  Upload,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import type React from 'react';
import { useRef, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
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
  FactoryOrderStatus,
  OrderDetailStatus,
  useCreateFactoryProgressReportMutation,
  useGetFactoryOrderQuery,
  useMarkFactoryOrderAsDelayedMutation,
  useMarkOnDoneProductionMutation,
  useUpdateFactoryOrderDetailStatusMutation,
} from '@/graphql/generated/graphql';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function FactoryOrderDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressDate, setProgressDate] = useState<Date | undefined>(
    new Date(),
  );
  const [progressQty, setProgressQty] = useState('');
  const [progressNotes, setProgressNotes] = useState('');
  const [progressPhotos, setProgressPhotos] = useState<string[]>([]);
  const [delayReason, setDelayReason] = useState('');
  const [estimatedCompletion, setEstimatedCompletion] = useState<
    Date | undefined
  >(new Date());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // First, complete the createFactoryProgressReport mutation
  const [
    createFactoryProgressReport,
    { loading: createFactoryProgressReportLoading },
  ] = useCreateFactoryProgressReportMutation({
    variables: {
      input: {
        completedQty: parseInt(progressQty),
        estimatedCompletion: progressDate?.toISOString(),
        factoryOrderId: id,
        photoUrls: progressPhotos,
        notes: progressNotes,
      },
    },
    refetchQueries: ['GetFactoryOrder'],
    onError: e => {
      toast.error(e.message);
    },
  });

  // Next, complete the markFactoryOrderAsDelayed mutation
  const [
    markFactoryOrderAsDelayed,
    { loading: markFactoryOrderAsDelayedLoading },
  ] = useMarkFactoryOrderAsDelayedMutation({
    variables: {
      input: {
        delayReason: delayReason,
        estimatedCompletionDate: estimatedCompletion?.toISOString(),
      },
      markFactoryOrderAsDelayedId: id,
    },
    refetchQueries: ['GetFactoryOrder'],
    onError: e => {
      toast.error(e.message);
    },
  });

  // Finally, complete the markOnDoneProduction mutation
  const [markOnDoneProduction, { loading: markOnDoneProductionLoading }] =
    useMarkOnDoneProductionMutation({
      variables: {
        markOnDoneProductionId: id,
      },
      refetchQueries: ['GetFactoryOrder'],
      onError: e => {
        toast.error(e.message);
      },
    });

  const { data, loading, error } = useGetFactoryOrderQuery({
    variables: {
      factoryOrderId: id,
    },
  });

  // First, complete the updateFactoryOrderDetailStatus mutation
  const [updateFactoryOrderDetailStatus, { loading: updateStatusLoading }] =
    useUpdateFactoryOrderDetailStatusMutation({
      refetchQueries: ['GetFactoryOrder'],
      onError: e => {
        toast.error(e.message);
      },
      onCompleted: () => {
        toast.success('Order detail status updated successfully');
      },
    });

  // Add this function to handle status updates for a specific order detail
  const handleUpdateDetailStatus = async (detailId: string, note = '') => {
    setIsSubmitting(true);
    try {
      await updateFactoryOrderDetailStatus({
        variables: {
          input: {
            orderDetailId: detailId,
            status: OrderDetailStatus.Completed,
            note: note,
          },
        },
      });
    } catch (error) {
      console.error('Failed to update order detail status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const factoryOrder = data?.factoryOrder;

  // Helper functions
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadge = (status: string | null | undefined) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;

    switch (status) {
      case 'PENDING_ACCEPTANCE':
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-700"
          >
            <Clock className="mr-1 h-3 w-3" /> Pending Acceptance
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
            <Loader2 className="mr-1 h-3 w-3 animate-spin" /> In Production
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            <CheckSquare className="mr-1 h-3 w-3" /> Completed
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700"
          >
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      case 'PARTIAL_APPROVED':
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700"
          >
            <AlertCircle className="mr-1 h-3 w-3" /> Partially Approved
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

  const getQualityStatusBadge = (status: string | null | undefined) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;

    switch (status) {
      case 'PENDING':
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-700"
          >
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'APPROVED':
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700"
          >
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      case 'PARTIAL_APPROVED':
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700"
          >
            <AlertCircle className="mr-1 h-3 w-3" /> Partially Approved
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

  const handleAcceptOrder = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically call a mutation to update the order status
    }, 1000);
  };

  const handleRejectOrder = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically call a mutation to update the order status
    }, 1000);
  };

  const handleStartProduction = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically call a mutation to update the order status
    }, 1000);
  };

  const handleAddProgressReport = async () => {
    if (!progressQty || !progressDate) return;

    setIsSubmitting(true);
    try {
      await createFactoryProgressReport({
        variables: {
          input: {
            completedQty: parseInt(progressQty),
            estimatedCompletion: progressDate.toISOString(),
            factoryOrderId: id,
            photoUrls: progressPhotos,
            notes: progressNotes,
          },
        },
      });

      setProgressQty('');
      setProgressNotes('');
      setProgressPhotos([]);
      setProgressDate(new Date());
    } catch (error: any) {
      console.error('Failed to add progress report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAsDelayed = async () => {
    if (!delayReason || !estimatedCompletion) return;

    setIsSubmitting(true);
    try {
      await markFactoryOrderAsDelayed({
        variables: {
          input: {
            delayReason: delayReason,
            estimatedCompletionDate: estimatedCompletion.toISOString(),
          },
          markFactoryOrderAsDelayedId: id,
        },
      });

      setDelayReason('');
      setEstimatedCompletion(new Date());
    } catch (error: any) {
      console.error('Failed to mark order as delayed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAsCompleted = async () => {
    setIsSubmitting(true);
    try {
      await markOnDoneProduction({
        variables: {
          markOnDoneProductionId: id,
        },
      });
    } catch (error: any) {
      console.error('Failed to mark order as completed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real app, you would upload these files to a server
    // For this example, we'll just simulate adding the file names
    const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
    setProgressPhotos([...progressPhotos, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...progressPhotos];
    newPhotos.splice(index, 1);
    setProgressPhotos(newPhotos);
  };

  // If loading, show skeleton UI
  if (loading) {
    return <FactoryOrderDetailsSkeleton />;
  }

  // If error or no data, show error message
  if (error || !factoryOrder) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error
              ? `Failed to load factory order details: ${error.message}`
              : 'Factory order not found'}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const totalCompletedQty = factoryOrder.orderDetails
    ? factoryOrder.orderDetails.reduce(
        (sum, detail) => sum + (detail.completedQty || 0),
        0,
      )
    : 0;
  const totalQuantity = factoryOrder.orderDetails
    ? factoryOrder.orderDetails.reduce(
        (sum, detail) => sum + (detail.quantity || 0),
        0,
      )
    : 0;
  const progressPercentage =
    totalQuantity > 0
      ? Math.round((totalCompletedQty / totalQuantity) * 100)
      : 0;

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/factory">Factory Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/factory/orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Order {factoryOrder.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Order header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Factory Order: {factoryOrder.id}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-muted-foreground">
              Factory ID: {factoryOrder.factoryId}
            </span>
            {getStatusBadge(factoryOrder.status)}
            {factoryOrder.isDelayed && (
              <Badge variant="destructive">Delayed</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>

          {factoryOrder.status === 'PENDING_ACCEPTANCE' && (
            <>
              <Button onClick={handleAcceptOrder} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept Order
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleRejectOrder}
                disabled={isSubmitting}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Order
              </Button>
            </>
          )}

          {factoryOrder.status === 'ACCEPTED' && (
            <Button onClick={handleStartProduction} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Truck className="mr-2 h-4 w-4" />
                  Start Production
                </>
              )}
            </Button>
          )}

          {factoryOrder.status === 'IN_PRODUCTION' && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Mark as Delayed
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mark Order as Delayed</DialogTitle>
                    <DialogDescription>
                      Please provide a reason for the delay and a new estimated
                      completion date.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="delay-reason">Delay Reason</Label>
                      <Textarea
                        id="delay-reason"
                        placeholder="Enter the reason for the delay..."
                        value={delayReason}
                        onChange={e => setDelayReason(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>New Estimated Completion Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'justify-start text-left font-normal',
                              !estimatedCompletion && 'text-muted-foreground',
                            )}
                          >
                            <CalendarClock className="mr-2 h-4 w-4" />
                            {estimatedCompletion
                              ? format(estimatedCompletion, 'PPP')
                              : 'Select a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={estimatedCompletion}
                            onSelect={setEstimatedCompletion}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDelayReason('');
                        setEstimatedCompletion(new Date());
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleMarkAsDelayed}
                      disabled={
                        isSubmitting || !delayReason || !estimatedCompletion
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Mark as Delayed
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button onClick={handleMarkAsCompleted} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Order progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Production Progress</span>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>Total Items: {totalQuantity}</span>
              <span>Completed: {totalCompletedQty}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order details tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="designs">Designs</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Status
                  </h4>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(factoryOrder.status)}
                  </div>
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Customer Order ID
                  </h4>
                  <p>{factoryOrder.customerOrder?.id || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Total Items
                  </h4>
                  <p>{factoryOrder.totalItems || totalQuantity}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Total Production Cost
                  </h4>
                  <p className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {new Intl.NumberFormat('en-US').format(
                      factoryOrder.totalProductionCost || 0,
                    )}
                  </p>
                </div>
                {factoryOrder.rejectionReason && (
                  <div>
                    <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                      Rejection Reason
                    </h4>
                    <p className="text-red-600">
                      {factoryOrder.rejectionReason}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="bg-muted-foreground/20 my-2 h-full w-px"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Order Created</h4>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(factoryOrder.createdAt)}
                      </p>
                      <p className="mt-1 text-sm">
                        Factory order was created and assigned to factory{' '}
                        {factoryOrder.factoryId}.
                      </p>
                    </div>
                  </div>

                  {factoryOrder.acceptedAt && (
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="bg-muted-foreground/20 my-2 h-full w-px"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Order Accepted</h4>
                        <p className="text-muted-foreground text-sm">
                          {formatDate(factoryOrder.acceptedAt)}
                        </p>
                        <p className="mt-1 text-sm">
                          Factory accepted the order.
                        </p>
                      </div>
                    </div>
                  )}

                  {factoryOrder.isDelayed && (
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="bg-muted-foreground/20 my-2 h-full w-px"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Order Delayed</h4>
                        <p className="text-muted-foreground text-sm">
                          {formatDate(factoryOrder.lastUpdated)}
                        </p>
                        <p className="mt-1 text-sm">
                          Order was marked as delayed. Reason:{' '}
                          {factoryOrder.delayReason || 'No reason provided'}
                        </p>
                      </div>
                    </div>
                  )}

                  {factoryOrder.completedAt && (
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <CheckSquare className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Order Completed</h4>
                        <p className="text-muted-foreground text-sm">
                          {formatDate(factoryOrder.completedAt)}
                        </p>
                        <p className="mt-1 text-sm">
                          Factory completed the order production.
                        </p>
                      </div>
                    </div>
                  )}

                  {!factoryOrder.completedAt && (
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full">
                          <Clock className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          Estimated Completion
                        </h4>
                        <p
                          className={`text-sm ${factoryOrder.isDelayed ? 'font-medium text-red-500' : 'text-muted-foreground'}`}
                        >
                          {formatDate(factoryOrder.estimatedCompletionDate)}
                          {factoryOrder.isDelayed && ' (Delayed)'}
                        </p>
                        <p className="mt-1 text-sm">
                          {factoryOrder.isDelayed
                            ? 'New estimated completion date due to delay.'
                            : 'Expected completion date for this order.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Order Details Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Total Items:
                    </span>
                    <span>{factoryOrder.totalItems || totalQuantity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Completed Items:
                    </span>
                    <span>{totalCompletedQty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Progress:
                    </span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Order Details:
                    </span>
                    <span>{factoryOrder?.orderDetails?.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dates Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarClock className="h-4 w-4" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Created:
                    </span>
                    <span>{formatDate(factoryOrder.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Updated:
                    </span>
                    <span>{formatDate(factoryOrder.updatedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Acceptance Deadline:
                    </span>
                    <span>{formatDate(factoryOrder?.acceptanceDeadline)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Est. Completion:
                    </span>
                    <span
                      className={factoryOrder.isDelayed ? 'text-red-600' : ''}
                    >
                      {formatDate(factoryOrder.estimatedCompletionDate)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Reports Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4" />
                  Progress Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {factoryOrder.progressReports &&
                factoryOrder.progressReports.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Total Reports:
                      </span>
                      <span>{factoryOrder.progressReports.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Latest Report:
                      </span>
                      <span>
                        {formatDate(
                          factoryOrder.progressReports[
                            factoryOrder.progressReports.length - 1
                          ]?.reportDate,
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Latest Completed:
                      </span>
                      <span>
                        {factoryOrder.progressReports[
                          factoryOrder.progressReports.length - 1
                        ]?.completedQty || 0}{' '}
                        items
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground py-2 text-center">
                    No progress reports available
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setActiveTab('progress')}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View All Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          {factoryOrder.status === 'IN_PRODUCTION' && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common actions for this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Progress Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Progress Report</DialogTitle>
                        <DialogDescription>
                          Update the production progress for this order.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="completed-qty">
                            Completed Quantity
                          </Label>
                          <Input
                            id="completed-qty"
                            type="number"
                            placeholder="Enter completed quantity"
                            value={progressQty}
                            onChange={e => setProgressQty(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Estimated Completion</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  'justify-start text-left font-normal',
                                  !progressDate && 'text-muted-foreground',
                                )}
                              >
                                <CalendarClock className="mr-2 h-4 w-4" />
                                {progressDate
                                  ? format(progressDate, 'PPP')
                                  : 'Select a date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={progressDate}
                                onSelect={setProgressDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="progress-notes">Notes</Label>
                          <Textarea
                            id="progress-notes"
                            placeholder="Add any notes about this progress update..."
                            value={progressNotes}
                            onChange={e => setProgressNotes(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Photos</Label>
                          <div className="mb-2 flex flex-wrap gap-2">
                            {progressPhotos.map((photo, index) => (
                              <div
                                key={index}
                                className="relative h-16 w-16 overflow-hidden rounded-md border"
                              >
                                <Image
                                  src={photo || '/placeholder.svg'}
                                  alt={`Progress photo ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-0 right-0 h-5 w-5 rounded-full"
                                  onClick={() => removePhoto(index)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Photos
                            </Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="image/*"
                              multiple
                              onChange={handleFileUpload}
                            />
                            <span className="text-muted-foreground text-xs">
                              Upload photos of the production progress
                            </span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setProgressQty('');
                            setProgressNotes('');
                            setProgressPhotos([]);
                            setProgressDate(new Date());
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddProgressReport}
                          disabled={
                            isSubmitting || !progressQty || !progressDate
                          }
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Submit Report
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab('quality')}
                  >
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    View Quality Checks
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab('designs')}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    View Designs
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Detailed information about all items in this factory order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Detail ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Rejected</TableHead>
                      <TableHead>Quality Status</TableHead>
                      <TableHead>Production Cost</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {factoryOrder?.orderDetails?.map(detail => (
                      <TableRow key={detail.id}>
                        <TableCell className="font-medium">
                          {detail.id}
                        </TableCell>
                        <TableCell>{getStatusBadge(detail.status)}</TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>{detail.completedQty || 0}</TableCell>
                        <TableCell>{detail.rejectedQty || 0}</TableCell>
                        <TableCell>
                          {getQualityStatusBadge(detail.qualityStatus)}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-US').format(
                            detail.productionCost || 0,
                          )}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-US').format(
                            detail.price || 0,
                          )}
                        </TableCell>
                        <TableCell>
                          {detail.status !== OrderDetailStatus.Pending &&
                            factoryOrder.status !== FactoryOrderStatus.Rejected && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <CheckSquare className="mr-2 h-4 w-4" />
                                    Mark Complete
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Update Order Detail Status
                                    </DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to mark this item as
                                      completed?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="status-note">
                                        Note (Optional)
                                      </Label>
                                      <Textarea
                                        id="status-note"
                                        placeholder="Add any notes about this status update..."
                                        value={progressNotes}
                                        onChange={e =>
                                          setProgressNotes(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setProgressNotes('')}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        handleUpdateDetailStatus(
                                          detail.id,
                                          progressNotes,
                                        );
                                        setProgressNotes('');
                                      }}
                                      disabled={isSubmitting}
                                    >
                                      {isSubmitting ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Processing...
                                        </>
                                      ) : (
                                        <>
                                          <CheckSquare className="mr-2 h-4 w-4" />
                                          Confirm
                                        </>
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Rest of the Details Tab content remains the same */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Order Information</CardTitle>
              <CardDescription>
                Details about the customer order associated with this factory
                order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                    Order Information
                  </h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Customer Order ID
                        </TableCell>
                        <TableCell>{factoryOrder.customerOrder?.id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Order Date
                        </TableCell>
                        <TableCell>
                          {formatDate(factoryOrder.customerOrder?.orderDate)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Number of Items
                        </TableCell>
                        <TableCell>
                          {factoryOrder.customerOrder?.orderDetails?.length ||
                            0}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                    Factory Information
                  </h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Factory ID
                        </TableCell>
                        <TableCell>{factoryOrder.factoryId}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Assigned At
                        </TableCell>
                        <TableCell>
                          {formatDate(factoryOrder.assignedAt)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Accepted At
                        </TableCell>
                        <TableCell>
                          {formatDate(factoryOrder.acceptedAt) ||
                            'Not yet accepted'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Completed At
                        </TableCell>
                        <TableCell>
                          {formatDate(factoryOrder.completedAt) ||
                            'Not yet completed'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Designs Tab */}
        <TabsContent value="designs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Design Information</CardTitle>
              <CardDescription>
                View all design details for this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              {factoryOrder.customerOrder?.orderDetails?.map(
                (detail, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="mb-2 flex items-center text-lg font-semibold">
                      <Package className="mr-2 h-5 w-5" /> Design Item{' '}
                      {index + 1}
                    </h3>
                    {detail.design?.designPositions ? (
                      <div className="bg-muted rounded-md p-4">
                        <h4 className="mb-2 font-medium">Design Positions</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          {detail.design.designPositions.map(
                            (position, posIndex) => (
                              <Card key={posIndex}>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">
                                    Position:{' '}
                                    {position.positionType?.positionName ||
                                      position.productPositionTypeId}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-sm">
                                    {position.designJSON && (
                                      <>
                                        <p>
                                          <span className="font-medium">
                                            Type:
                                          </span>{' '}
                                          {position.designJSON.type}
                                        </p>
                                        {position.designJSON.type === 'text' ? (
                                          <>
                                            <p>
                                              <span className="font-medium">
                                                Content:
                                              </span>{' '}
                                              {position.designJSON.content}
                                            </p>
                                            <p>
                                              <span className="font-medium">
                                                Font:
                                              </span>{' '}
                                              {position.designJSON.fontFamily},{' '}
                                              {position.designJSON.fontSize}px
                                            </p>
                                            <p>
                                              <span className="font-medium">
                                                Color:
                                              </span>{' '}
                                              {position.designJSON.color}
                                            </p>
                                          </>
                                        ) : (
                                          <>
                                            <p>
                                              <span className="font-medium">
                                                Image URL:
                                              </span>{' '}
                                              {position.designJSON.url}
                                            </p>
                                            <p>
                                              <span className="font-medium">
                                                Dimensions:
                                              </span>{' '}
                                              {position.designJSON.width}x
                                              {position.designJSON.height}
                                            </p>
                                          </>
                                        )}
                                        {position.designJSON.position && (
                                          <p>
                                            <span className="font-medium">
                                              Position:
                                            </span>{' '}
                                            X: {position.designJSON.position.x},
                                            Y: {position.designJSON.position.y}
                                          </p>
                                        )}
                                        <p>
                                          <span className="font-medium">
                                            Rotation:
                                          </span>{' '}
                                          {position.designJSON.rotation || 0}°
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ),
                          )}
                        </div>
                      </div>
                    ) : (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>No design positions</AlertTitle>
                        <AlertDescription>
                          This design does not have any position information.
                        </AlertDescription>
                      </Alert>
                    )}
                    {index <
                      (factoryOrder.customerOrder?.orderDetails?.length || 0) -
                        1 && <Separator className="my-4" />}
                  </div>
                ),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Progress Reports</CardTitle>
                <CardDescription>
                  Track the production progress of this order
                </CardDescription>
              </div>
              {factoryOrder.status === 'IN_PRODUCTION' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Progress Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Progress Report</DialogTitle>
                      <DialogDescription>
                        Update the production progress for this order.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="completed-qty">
                          Completed Quantity
                        </Label>
                        <Input
                          id="completed-qty"
                          type="number"
                          placeholder="Enter completed quantity"
                          value={progressQty}
                          onChange={e => setProgressQty(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Estimated Completion</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'justify-start text-left font-normal',
                                !progressDate && 'text-muted-foreground',
                              )}
                            >
                              <CalendarClock className="mr-2 h-4 w-4" />
                              {progressDate
                                ? format(progressDate, 'PPP')
                                : 'Select a date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={progressDate}
                              onSelect={setProgressDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="progress-notes">Notes</Label>
                        <Textarea
                          id="progress-notes"
                          placeholder="Add any notes about this progress update..."
                          value={progressNotes}
                          onChange={e => setProgressNotes(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Photos</Label>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {progressPhotos.map((photo, index) => (
                            <div
                              key={index}
                              className="relative h-16 w-16 overflow-hidden rounded-md border"
                            >
                              <Image
                                src={photo || '/placeholder.svg'}
                                alt={`Progress photo ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-0 right-0 h-5 w-5 rounded-full"
                                onClick={() => removePhoto(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photos
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                          />
                          <span className="text-muted-foreground text-xs">
                            Upload photos of the production progress
                          </span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setProgressQty('');
                          setProgressNotes('');
                          setProgressPhotos([]);
                          setProgressDate(new Date());
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddProgressReport}
                        disabled={isSubmitting || !progressQty || !progressDate}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Report
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent>
              {factoryOrder.progressReports &&
              factoryOrder.progressReports.length > 0 ? (
                <div className="space-y-6">
                  {factoryOrder.progressReports.map((report, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            Progress Report {index + 1}
                          </CardTitle>
                          <Badge variant="outline">
                            {formatDate(report.reportDate)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-sm">
                                  Completed Quantity:
                                </span>
                                <span className="font-medium">
                                  {report.completedQty}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-sm">
                                  Estimated Completion:
                                </span>
                                <span>
                                  {formatDate(report.estimatedCompletion)}
                                </span>
                              </div>
                              {report.notes && (
                                <div className="pt-2">
                                  <span className="text-muted-foreground text-sm">
                                    Notes:
                                  </span>
                                  <p className="bg-muted mt-1 rounded-md p-2 text-sm">
                                    {report.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          {report.photoUrls && report.photoUrls.length > 0 && (
                            <div>
                              <span className="text-muted-foreground mb-2 block text-sm">
                                Photos:
                              </span>
                              <div className="grid grid-cols-3 gap-2">
                                {report.photoUrls.map((photo, photoIndex) => (
                                  <div
                                    key={photoIndex}
                                    className="relative aspect-square overflow-hidden rounded-md border"
                                  >
                                    <Image
                                      src={photo || '/placeholder.svg'}
                                      alt={`Progress photo ${photoIndex + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                    <Info className="text-muted-foreground h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">
                    No Progress Reports
                  </h3>
                  <p className="text-muted-foreground mx-auto max-w-md">
                    There are no progress reports for this order yet.
                    {factoryOrder.status === 'IN_PRODUCTION' &&
                      ' Add a progress report to track production.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality Tab */}
        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Checks</CardTitle>
              <CardDescription>
                Quality check information for all items in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {factoryOrder?.orderDetails?.map((detail, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <span>Order Detail: {detail.id}</span>
                        {getQualityStatusBadge(detail.qualityStatus)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {detail.checkQualities &&
                      detail.checkQualities.length > 0 ? (
                        <div className="space-y-4 pt-2">
                          {detail.checkQualities.map((check, checkIndex) => (
                            <Card key={checkIndex}>
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm">
                                    Quality Check {checkIndex + 1}
                                  </CardTitle>
                                  <Badge variant="outline">
                                    {formatDate(check.checkedAt)}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                  <div>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">
                                          Status:
                                        </span>
                                        <span>
                                          {getQualityStatusBadge(check.status)}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">
                                          Checked By:
                                        </span>
                                        <span>{check.checkedBy}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">
                                          Total Checked:
                                        </span>
                                        <span>{check.totalChecked}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">
                                          Passed:
                                        </span>
                                        <span className="text-green-600">
                                          {check.passedQuantity}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">
                                          Failed:
                                        </span>
                                        <span className="text-red-600">
                                          {check.failedQuantity}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">
                                          Rework Required:
                                        </span>
                                        <Badge
                                          variant={
                                            check.reworkRequired
                                              ? 'destructive'
                                              : 'outline'
                                          }
                                          className="font-normal"
                                        >
                                          {check.reworkRequired ? 'Yes' : 'No'}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {check.note && (
                                      <div>
                                        <span className="text-muted-foreground text-sm">
                                          Notes:
                                        </span>
                                        <p className="bg-muted mt-1 rounded-md p-2 text-sm">
                                          {check.note}
                                        </p>
                                      </div>
                                    )}
                                    <div className="mt-4">
                                      <div className="h-8 w-full overflow-hidden rounded-full bg-gray-200">
                                        {check.totalChecked > 0 && (
                                          <>
                                            <div
                                              className="float-left h-full bg-green-500"
                                              style={{
                                                width: `${(check.passedQuantity / check.totalChecked) * 100}%`,
                                              }}
                                            ></div>
                                            <div
                                              className="float-left h-full bg-red-500"
                                              style={{
                                                width: `${(check.failedQuantity / check.totalChecked) * 100}%`,
                                              }}
                                            ></div>
                                          </>
                                        )}
                                      </div>
                                      <div className="mt-2 flex justify-between text-xs">
                                        <div className="flex items-center">
                                          <div className="mr-1 h-3 w-3 rounded-full bg-green-500"></div>
                                          <span>
                                            Passed: {check.passedQuantity}
                                          </span>
                                        </div>
                                        <div className="flex items-center">
                                          <div className="mr-1 h-3 w-3 rounded-full bg-red-500"></div>
                                          <span>
                                            Failed: {check.failedQuantity}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-muted-foreground py-4 text-center">
                          No quality checks have been performed for this item
                          yet.
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FactoryOrderDetailsSkeleton() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full md:col-span-2" />
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
