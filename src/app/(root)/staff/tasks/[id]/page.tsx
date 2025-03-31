'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useGetStaffTaskDetailQuery } from '@/graphql/generated/graphql';
import {
  AlertCircle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  ExternalLink,
  FileText,
  Home,
  Info,
  Loader2,
  Package,
  RefreshCw,
  Send,
  ShieldAlert,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

export default function MyStaffTaskDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [updateNote, setUpdateNote] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { data, loading, error } = useGetStaffTaskDetailQuery({
    variables: {
      staffTaskId: id,
    },
  });

  const staffTask = data?.staffTask;

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
      case 'PENDING':
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-700"
          >
            Pending
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            Completed
          </Badge>
        );
      case 'PARTIAL_APPROVED':
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700"
          >
            Partial Approved
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700"
          >
            In Progress
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700"
          >
            Rejected
          </Badge>
        );
      case 'IN_PRODUCTION':
        return (
          <Badge
            variant="outline"
            className="border-purple-200 bg-purple-50 text-purple-700"
          >
            In Production
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isExpired = (expiredTime: string | null | undefined) => {
    if (!expiredTime) return false;
    return new Date(expiredTime) < new Date();
  };

  const getProgressPercentage = (task: any) => {
    if (!task) return 0;

    const checkQuality = task.task?.checkQualities?.[0];
    if (!checkQuality) return 0;

    if (task.status === 'COMPLETED') return 100;
    if (task.status === 'REJECTED') return 0;

    if (checkQuality.totalChecked && checkQuality.totalChecked > 0) {
      const factoryOrderDetail = checkQuality.factoryOrderDetail;
      if (factoryOrderDetail && factoryOrderDetail.quantity) {
        return Math.round(
          (checkQuality.totalChecked / factoryOrderDetail.quantity) * 100,
        );
      }
    }

    // Default progress based on status
    switch (task.status) {
      case 'PENDING':
        return 0;
      case 'IN_PROGRESS':
        return 50;
      case 'PARTIAL_APPROVED':
        return 75;
      default:
        return 25;
    }
  };

  const handleSubmitUpdate = () => {
    if (!updateNote.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setUpdateNote('');
      // Here you would typically call a mutation to update the task
      alert('Update submitted successfully!');
    }, 1000);
  };

  // If loading, show skeleton UI
  if (loading) {
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
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  // If error or no data, show error message
  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error
              ? `Failed to load task details: ${error.message}`
              : 'Task not found'}
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

  // Extract data for easier access
  const task = data?.staffTask?.task;
  const checkQuality = task?.checkQualities?.[0];
  const factoryOrderDetail = checkQuality?.factoryOrderDetail;
  const orderDetail = checkQuality?.orderDetail;
  const factoryOrder = factoryOrderDetail?.factoryOrder;
  const design = orderDetail?.design;

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/staff">Staff Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/staff/tasks">My Tasks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{task?.taskname || 'Task Details'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Task header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{task?.taskname}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-muted-foreground">Task ID: {id}</span>
            {getStatusBadge(staffTask?.status)}
            {isExpired(task?.expiredTime) && (
              <Badge variant="destructive">Expired</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Update Status
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Task Status</DialogTitle>
                <DialogDescription>
                  Provide any additional notes or comments about this task
                  update.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Textarea
                  placeholder="Add your notes here..."
                  value={updateNote}
                  onChange={e => setUpdateNote(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUpdateNote('')}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitUpdate} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Update
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Task progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Task Progress</span>
              <span className="text-sm font-medium">
                {getProgressPercentage(staffTask)}%
              </span>
            </div>
            <Progress
              value={getProgressPercentage(staffTask)}
              className="h-2"
            />
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>Assigned: {formatDate(staffTask?.assignedDate)}</span>
              <span
                className={
                  isExpired(task?.expiredTime) ? 'font-medium text-red-500' : ''
                }
              >
                Deadline: {formatDate(task?.expiredTime)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task details tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quality">Quality Check</TabsTrigger>
          <TabsTrigger value="order">Order Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Task Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Task Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Description
                  </h4>
                  <p>{task?.description || 'No description provided'}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Status
                  </h4>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(staffTask?.status)}
                  </div>
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Task Type
                  </h4>
                  <p>{task?.taskType || 'Standard Task'}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Note
                  </h4>
                  <p>{staffTask?.note || 'No notes available'}</p>
                </div>
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
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="bg-muted-foreground/20 my-2 h-full w-px"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Task Assigned</h4>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(staffTask?.assignedDate)}
                      </p>
                      <p className="mt-1 text-sm">
                        Task was assigned to you
                        {task?.assignedBy ? ` by ${task.assignedBy}` : ''}.
                      </p>
                    </div>
                  </div>

                  {checkQuality?.checkedAt && (
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <ShieldAlert className="h-4 w-4" />
                        </div>
                        <div className="bg-muted-foreground/20 my-2 h-full w-px"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          Quality Check Performed
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {formatDate(checkQuality.checkedAt)}
                        </p>
                        <p className="mt-1 text-sm">
                          Quality check performed by {checkQuality.checkedBy}.
                          {checkQuality.passedQuantity} items passed,{' '}
                          {checkQuality.failedQuantity} items failed.
                        </p>
                      </div>
                    </div>
                  )}

                  {staffTask?.completedDate && (
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Task Completed</h4>
                        <p className="text-muted-foreground text-sm">
                          {formatDate(staffTask?.completedDate)}
                        </p>
                        <p className="mt-1 text-sm">
                          Task was marked as completed.
                        </p>
                      </div>
                    </div>
                  )}

                  {!staffTask?.completedDate && (
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full">
                          <Clock className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Deadline</h4>
                        <p
                          className={`text-sm ${isExpired(task?.expiredTime) ? 'font-medium text-red-500' : 'text-muted-foreground'}`}
                        >
                          {formatDate(task?.expiredTime)}
                          {isExpired(task?.expiredTime) && ' (Expired)'}
                        </p>
                        <p className="mt-1 text-sm">
                          {isExpired(task?.expiredTime)
                            ? 'This task has passed its deadline.'
                            : 'Time remaining to complete this task.'}
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
            {/* Quality Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldAlert className="h-4 w-4" />
                  Quality Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {checkQuality ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Status:
                      </span>
                      <span>{getStatusBadge(checkQuality.status)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Total Checked:
                      </span>
                      <span>{checkQuality.totalChecked || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Passed:
                      </span>
                      <span className="text-green-600">
                        {checkQuality.passedQuantity || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Failed:
                      </span>
                      <span className="text-red-600">
                        {checkQuality.failedQuantity || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Rework Required:
                      </span>
                      <span>{checkQuality.reworkRequired ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground py-2 text-center">
                    No quality check data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orderDetail ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Order ID:
                      </span>
                      <span>{orderDetail.orderId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Status:
                      </span>
                      <span>{getStatusBadge(orderDetail.status)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Quantity:
                      </span>
                      <span>{orderDetail.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Price:
                      </span>
                      <span>
                        {new Intl.NumberFormat('en-US').format(
                          orderDetail.price || 0,
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Quality Status:
                      </span>
                      <span>
                        {getStatusBadge(orderDetail.qualityCheckStatus)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground py-2 text-center">
                    No order data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Factory Order Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Truck className="h-4 w-4" />
                  Factory Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                {factoryOrder ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Factory:
                      </span>
                      <span>{factoryOrder.factoryId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Status:
                      </span>
                      <span>{getStatusBadge(factoryOrder.status)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Delayed:
                      </span>
                      <span>{factoryOrder.isDelayed ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Est. Completion:
                      </span>
                      <span>
                        {formatDate(factoryOrder.estimatedCompletionDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Acceptance Deadline:
                      </span>
                      <span>{formatDate(factoryOrder.acceptanceDeadline)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground py-2 text-center">
                    No factory order data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Quality Check Tab */}
        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Check Details</CardTitle>
              <CardDescription>
                Detailed information about the quality check performed for this
                task.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {checkQuality ? (
                <div className="space-y-6">
                  {/* Quality Check Summary */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Check Information
                      </h3>
                      <div className="bg-muted rounded-md p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span>Check ID:</span>
                          <span className="font-medium">{checkQuality.id}</span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span>Status:</span>
                          <span>{getStatusBadge(checkQuality.status)}</span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span>Checked By:</span>
                          <span className="font-medium">
                            {checkQuality.checkedBy}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Checked At:</span>
                          <span>{formatDate(checkQuality.checkedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Quality Metrics
                      </h3>
                      <div className="bg-muted rounded-md p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span>Total Checked:</span>
                          <span className="font-medium">
                            {checkQuality.totalChecked || 0}
                          </span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span>Passed:</span>
                          <span className="font-medium text-green-600">
                            {checkQuality.passedQuantity || 0}
                          </span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span>Failed:</span>
                          <span className="font-medium text-red-600">
                            {checkQuality.failedQuantity || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Pass Rate:</span>
                          <span className="font-medium">
                            {checkQuality.totalChecked
                              ? `${Math.round((checkQuality.passedQuantity / checkQuality.totalChecked) * 100)}%`
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Rework Information
                      </h3>
                      <div className="bg-muted rounded-md p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span>Rework Required:</span>
                          <Badge
                            variant={
                              checkQuality.reworkRequired
                                ? 'destructive'
                                : 'outline'
                            }
                            className="font-normal"
                          >
                            {checkQuality.reworkRequired ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span>Order Rework Status:</span>
                          <span>{orderDetail?.reworkStatus || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quality Check Notes */}
                  {checkQuality.note && (
                    <div>
                      <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                        Quality Check Notes
                      </h3>
                      <div className="bg-muted rounded-md p-4">
                        <p>{checkQuality.note}</p>
                      </div>
                    </div>
                  )}

                  {/* Quality Check Visualization */}
                  <div>
                    <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                      Quality Check Results
                    </h3>
                    <div className="bg-muted rounded-md p-4">
                      <div className="h-8 w-full overflow-hidden rounded-full bg-gray-200">
                        {checkQuality.totalChecked > 0 && (
                          <>
                            <div
                              className="float-left h-full bg-green-500"
                              style={{
                                width: `${(checkQuality.passedQuantity / checkQuality.totalChecked) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="float-left h-full bg-red-500"
                              style={{
                                width: `${(checkQuality.failedQuantity / checkQuality.totalChecked) * 100}%`,
                              }}
                            ></div>
                          </>
                        )}
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <div className="flex items-center">
                          <div className="mr-1 h-3 w-3 rounded-full bg-green-500"></div>
                          <span>
                            Passed: {checkQuality.passedQuantity || 0}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-1 h-3 w-3 rounded-full bg-red-500"></div>
                          <span>
                            Failed: {checkQuality.failedQuantity || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Request Re-check
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                    <Info className="text-muted-foreground h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">
                    No Quality Check Data
                  </h3>
                  <p className="text-muted-foreground mx-auto max-w-md">
                    There is no quality check information available for this
                    task yet. Quality checks may be pending or not required.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Details Tab */}
        <TabsContent value="order" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Comprehensive information about the order associated with this
                task.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orderDetail ? (
                <div className="space-y-6">
                  {/* Order Information */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        Order Information
                      </h3>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Order ID
                            </TableCell>
                            <TableCell>{orderDetail.orderId}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Detail ID
                            </TableCell>
                            <TableCell>{orderDetail.id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Status
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(orderDetail.status)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Quantity
                            </TableCell>
                            <TableCell>{orderDetail.quantity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Price</TableCell>
                            <TableCell>
                              {new Intl.NumberFormat('en-US').format(
                                orderDetail.price || 0,
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Quality Check Status
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(orderDetail.qualityCheckStatus)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Rework Status
                            </TableCell>
                            <TableCell>{orderDetail.reworkStatus}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {factoryOrderDetail && (
                      <div>
                        <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                          Factory Order Details
                        </h3>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">
                                Factory Order ID
                              </TableCell>
                              <TableCell>
                                {factoryOrderDetail.factoryOrderId}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Status
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(factoryOrderDetail.status)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Quantity
                              </TableCell>
                              <TableCell>
                                {factoryOrderDetail.quantity}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Production Cost
                              </TableCell>
                              <TableCell>
                                {new Intl.NumberFormat('en-US').format(
                                  factoryOrderDetail.productionCost || 0,
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Price
                              </TableCell>
                              <TableCell>
                                {new Intl.NumberFormat('en-US').format(
                                  factoryOrderDetail.price || 0,
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Completed Quantity
                              </TableCell>
                              <TableCell>
                                {factoryOrderDetail.completedQty}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Rejected Quantity
                              </TableCell>
                              <TableCell>
                                {factoryOrderDetail.rejectedQty}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>

                  {/* Design Information */}
                  {design && (
                    <div>
                      <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        Design Information
                      </h3>
                      <div className="bg-muted rounded-md p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Design ID:
                              </span>
                              <span>{factoryOrderDetail?.designId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Is Template:
                              </span>
                              <span>{design.isTemplate ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Is Public:
                              </span>
                              <span>{design.isPublic ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Is Finalized:
                              </span>
                              <span>{design.isFinalized ? 'Yes' : 'No'}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center md:col-span-2">
                            <div className="flex h-40 w-full items-center justify-center rounded-md bg-white p-4 shadow-sm">
                              <div className="text-muted-foreground text-center">
                                <Package className="mx-auto mb-2 h-10 w-10" />
                                <p>Design Preview Not Available</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Factory Information */}
                  {factoryOrder && (
                    <div>
                      <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        Factory Information
                      </h3>
                      <div className="bg-muted rounded-md p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-muted-foreground">
                                Factory ID:
                              </span>
                              <span>{factoryOrder.factoryId}</span>
                            </div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-muted-foreground">
                                Status:
                              </span>
                              <span>{getStatusBadge(factoryOrder.status)}</span>
                            </div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-muted-foreground">
                                Is Delayed:
                              </span>
                              <Badge
                                variant={
                                  factoryOrder.isDelayed
                                    ? 'destructive'
                                    : 'outline'
                                }
                                className="font-normal"
                              >
                                {factoryOrder.isDelayed ? 'Yes' : 'No'}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-muted-foreground">
                                Created At:
                              </span>
                              <span>{formatDate(factoryOrder.createdAt)}</span>
                            </div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-muted-foreground">
                                Est. Completion:
                              </span>
                              <span>
                                {formatDate(
                                  factoryOrder.estimatedCompletionDate,
                                )}
                              </span>
                            </div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-muted-foreground">
                                Acceptance Deadline:
                              </span>
                              <span>
                                {formatDate(factoryOrder.acceptanceDeadline)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <Link href={`/staff/orders/${orderDetail.id}`}>
                      <Button>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Full Order
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                    <Info className="text-muted-foreground h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">No Order Data</h3>
                  <p className="text-muted-foreground mx-auto max-w-md">
                    There is no order information associated with this task.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task History</CardTitle>
              <CardDescription>
                Complete history of actions and updates for this task.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Sample history entries - in a real app, these would come from the API */}
                <div className="flex gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="/placeholder.svg?height=36&width=36"
                      alt="Avatar"
                    />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">System</span>
                      <span className="text-muted-foreground text-xs">
                        {formatDate(staffTask?.assignedDate)}
                      </span>
                    </div>
                    <p className="text-sm">
                      Task was assigned to staff member.
                    </p>
                  </div>
                </div>

                {checkQuality?.checkedAt && (
                  <div className="flex gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="/placeholder.svg?height=36&width=36"
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        {checkQuality.checkedBy
                          ?.substring(0, 2)
                          .toUpperCase() || 'QC'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {checkQuality.checkedBy}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(checkQuality.checkedAt)}
                        </span>
                      </div>
                      <p className="text-sm">
                        Performed quality check. {checkQuality.passedQuantity}{' '}
                        items passed, {checkQuality.failedQuantity} items
                        failed.
                      </p>
                      {checkQuality.note && (
                        <div className="bg-muted mt-2 rounded-md p-2 text-sm">
                          <p>{checkQuality.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {staffTask?.completedDate && (
                  <div className="flex gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="/placeholder.svg?height=36&width=36"
                        alt="Avatar"
                      />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Staff</span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(staffTask?.completedDate)}
                        </span>
                      </div>
                      <p className="text-sm">Task was marked as completed.</p>
                    </div>
                  </div>
                )}

                {/* Add comment form */}
                <div className="border-t pt-4">
                  <h3 className="mb-2 text-sm font-medium">Add Comment</h3>
                  <div className="flex gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="/placeholder.svg?height=36&width=36"
                        alt="Avatar"
                      />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add a comment or note about this task..."
                        className="min-h-[80px]"
                      />
                      <div className="flex justify-end">
                        <Button>
                          <Send className="mr-2 h-4 w-4" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
