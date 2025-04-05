'use client';

import { useGetFactoryOrderQuery } from '@/graphql/generated/graphql';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Package,
  Factory,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BarChart3,
  FileText,
  History,
} from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

export default function FactoryOrderDetails() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const { data, loading, error } = useGetFactoryOrderQuery({
    variables: {
      factoryOrderId: orderId,
    },
  });

  //get staffs

  //get factory

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  // Get the current order from the data
  const currentOrder = data?.factoryOrder;

  const handleGoBack = () => {
    router.back();
  };

  const handleAssign = () => {
    if (currentOrder?.status === 'WAITING_FOR_MANAGER_ASSIGN_FACTORY') {
      alert(`Assigning factory ${selectedFactory} to order ${orderId}`);
    } else {
      alert(`Assigning staff ${selectedStaff} to order ${orderId}`);
    }
    setAssignDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: string | null | undefined) => {
    switch (status) {
      case 'WAITING_FOR_MANAGER_ASSIGN_FACTORY':
        return 'default' as const;
      case 'WAITING_FOR_MANAGER_ASSIGN_STAFF':
        return 'secondary' as const;
      case 'COMPLETED':
        return 'default' as const;
      case 'REJECTED':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        Loading order details...
      </div>
    );

  if (error)
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        <AlertCircle className="mr-2" />
        Error loading order details: {error.message}
      </div>
    );

  if (!currentOrder)
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex h-64 flex-col items-center justify-center">
              <AlertCircle className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-semibold">Order Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The factory order you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <Button onClick={handleGoBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="outline" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <CardTitle className="text-2xl">
                  Factory Order: {currentOrder?.id}
                </CardTitle>
                <CardDescription>
                  Customer Order: {currentOrder?.customerOrder?.id || 'N/A'}
                </CardDescription>
              </div>
              <Badge
                className="w-fit"
                variant={getStatusBadgeVariant(currentOrder?.status)}
              >
                {currentOrder?.status.replace(/_/g, ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground flex items-center text-sm font-medium">
                  <Calendar className="mr-2 h-4 w-4" />
                  Created Date
                </span>
                <span className="font-medium">
                  {formatDate(currentOrder?.createdAt)}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground flex items-center text-sm font-medium">
                  <Clock className="mr-2 h-4 w-4" />
                  Acceptance Deadline
                </span>
                <span className="font-medium">
                  {formatDate(currentOrder?.acceptanceDeadline)}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground flex items-center text-sm font-medium">
                  <Package className="mr-2 h-4 w-4" />
                  Total Items
                </span>
                <span className="font-medium">
                  {currentOrder?.totalItems || 0}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground flex items-center text-sm font-medium">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Production Cost
                </span>
                <span className="font-medium">
                  ${currentOrder?.totalProductionCost?.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>

            {currentOrder?.isDelayed && (
              <div className="mt-6 flex items-start rounded-md border border-red-200 bg-red-50 p-4">
                <AlertTriangle className="mt-0.5 mr-3 h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-medium text-red-700">Order Delayed</h4>
                  <p className="text-sm text-red-600">
                    {currentOrder?.delayReason || 'No reason provided'}
                  </p>
                </div>
              </div>
            )}

            {typeof currentOrder?.currentProgress === 'number' &&
              currentOrder.currentProgress > 0 && (
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Production Progress
                    </span>
                    <span className="text-sm font-medium">
                      {currentOrder?.currentProgress}%
                    </span>
                  </div>
                  <Progress
                    value={currentOrder?.currentProgress}
                    className="h-2"
                  />
                </div>
              )}

            <Separator className="my-6" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground text-sm font-medium">
                  Assigned At
                </span>
                <span className="font-medium">
                  {formatDate(currentOrder?.assignedAt)}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground text-sm font-medium">
                  Accepted At
                </span>
                <span className="font-medium">
                  {formatDate(currentOrder?.acceptedAt)}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground text-sm font-medium">
                  Completed At
                </span>
                <span className="font-medium">
                  {formatDate(currentOrder?.completedAt)}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground text-sm font-medium">
                  Estimated Completion
                </span>
                <span className="font-medium">
                  {formatDate(currentOrder?.estimatedCompletionDate)}
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
              <Dialog
                open={assignDialogOpen}
                onOpenChange={setAssignDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    {currentOrder?.status ===
                    'WAITING_FOR_MANAGER_ASSIGN_FACTORY'
                      ? 'Assign to Factory'
                      : 'Assign to Staff'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {currentOrder?.status ===
                      'WAITING_FOR_MANAGER_ASSIGN_FACTORY'
                        ? 'Assign Order to Factory'
                        : 'Assign Order to Staff'}
                    </DialogTitle>
                    <DialogDescription>
                      {currentOrder?.status ===
                      'WAITING_FOR_MANAGER_ASSIGN_FACTORY'
                        ? 'Select a factory to handle this production order.'
                        : 'Select a staff member to oversee this order.'}
                    </DialogDescription>
                  </DialogHeader>

                  {currentOrder?.status ===
                  'WAITING_FOR_MANAGER_ASSIGN_FACTORY' ? (
                    <Select
                      value={selectedFactory}
                      onValueChange={setSelectedFactory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a factory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="factory-1">Factory One</SelectItem>
                        <SelectItem value="factory-2">Factory Two</SelectItem>
                        <SelectItem value="factory-3">Factory Three</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select
                      value={selectedStaff}
                      onValueChange={setSelectedStaff}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="staff-1">John Doe</SelectItem>
                        <SelectItem value="staff-2">Jane Smith</SelectItem>
                        <SelectItem value="staff-3">Alex Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setAssignDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAssign}>Confirm Assignment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="order-details">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="order-details">Order Details</TabsTrigger>
            <TabsTrigger value="design-info">Design Information</TabsTrigger>
            <TabsTrigger value="progress-reports">Progress Reports</TabsTrigger>
            <TabsTrigger value="rejection-history">
              Rejection History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="order-details">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>
                  Details of items included in this factory order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item ID</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Production Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Quality Status</TableHead>
                      <TableHead>Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrder?.orderDetails &&
                    currentOrder.orderDetails.length > 0 ? (
                      currentOrder.orderDetails.map(detail => (
                        <TableRow key={detail?.id}>
                          <TableCell className="font-medium">
                            {detail?.id}
                          </TableCell>
                          <TableCell>{detail?.quantity}</TableCell>
                          <TableCell>
                            ${detail?.productionCost?.toFixed(2) || '0.00'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{detail?.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                (detail?.qualityStatus as string) === 'PASSED'
                                  ? 'default'
                                  : (detail?.qualityStatus as string) ===
                                      'FAILED'
                                    ? 'destructive'
                                    : 'outline'
                              }
                            >
                              {detail?.qualityStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {detail?.completedQty || 0} / {detail?.quantity}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No order details available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {currentOrder?.orderDetails &&
                  currentOrder.orderDetails.some(
                    detail =>
                      detail?.checkQualities &&
                      detail.checkQualities.length > 0,
                  ) && (
                    <div className="mt-8">
                      <h3 className="mb-4 text-lg font-medium">
                        Quality Checks
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {currentOrder.orderDetails.map((detail, index) =>
                          detail?.checkQualities &&
                          detail.checkQualities.length > 0 ? (
                            <AccordionItem
                              key={detail?.id}
                              value={`item-${index}`}
                            >
                              <AccordionTrigger>
                                Item {detail?.id} Quality Checks (
                                {detail.checkQualities.length})
                              </AccordionTrigger>
                              <AccordionContent>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Checked By</TableHead>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Passed</TableHead>
                                      <TableHead>Failed</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Rework Required</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {detail.checkQualities.map(check => (
                                      <TableRow key={check?.id}>
                                        <TableCell>
                                          {check?.checkedBy || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                          {formatDate(check?.checkedAt)}
                                        </TableCell>
                                        <TableCell>
                                          {check?.passedQuantity || 0}
                                        </TableCell>
                                        <TableCell>
                                          {check?.failedQuantity || 0}
                                        </TableCell>
                                        <TableCell>
                                          <Badge
                                            variant={
                                              (check?.status as string) ===
                                              'PASSED'
                                                ? 'default'
                                                : (check?.status as string) ===
                                                    'FAILED'
                                                  ? 'destructive'
                                                  : 'outline'
                                            }
                                          >
                                            {check?.status}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          {check?.reworkRequired ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                          ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </AccordionContent>
                            </AccordionItem>
                          ) : null,
                        )}
                      </Accordion>
                    </div>
                  )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design-info">
            <Card>
              <CardHeader>
                <CardTitle>Design Information</CardTitle>
                <CardDescription>Design details for this order</CardDescription>
              </CardHeader>
              <CardContent>
                {currentOrder?.customerOrder?.orderDetails?.map(
                  (detail, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold">
                        Design #{index + 1}
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {detail.design?.designPositions?.map(
                          (position, posIndex) => (
                            <div
                              key={posIndex}
                              className="rounded-md border p-4"
                            >
                              <h4 className="mb-2 font-medium">
                                Position:{' '}
                                {position.positionType?.positionName ||
                                  'Unknown'}
                              </h4>
                              <p className="text-muted-foreground mb-2 text-sm">
                                Design ID: {position.designId}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Position Type ID:{' '}
                                {position.productPositionTypeId}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  ),
                )}

                {(!currentOrder?.customerOrder?.orderDetails ||
                  currentOrder.customerOrder.orderDetails.length === 0) && (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">
                      No design information available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress-reports">
            <Card>
              <CardHeader>
                <CardTitle>Progress Reports</CardTitle>
                <CardDescription>
                  Production progress updates from the factory
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentOrder?.progressReports &&
                currentOrder.progressReports.length > 0 ? (
                  <div className="space-y-6">
                    {currentOrder.progressReports.map(report => (
                      <div key={report?.id} className="rounded-md border p-4">
                        <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
                          <div className="flex items-center">
                            <BarChart3 className="text-muted-foreground mr-2 h-5 w-5" />
                            <h3 className="font-medium">
                              Report from {formatDate(report?.reportDate)}
                            </h3>
                          </div>
                        </div>

                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-muted-foreground mb-1 text-sm font-medium">
                              Estimated Completion
                            </p>
                            <p>{formatDate(report?.estimatedCompletion)}</p>
                          </div>
                        </div>

                        {report?.notes && (
                          <div className="mt-2">
                            <p className="text-muted-foreground mb-1 text-sm font-medium">
                              Notes
                            </p>
                            <p className="text-sm">{report?.notes}</p>
                          </div>
                        )}

                        {report?.photoUrls && report.photoUrls.length > 0 && (
                          <div className="mt-4">
                            <p className="text-muted-foreground mb-2 text-sm font-medium">
                              Photos
                            </p>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                              {report.photoUrls.map((url, index) => (
                                <div
                                  key={index}
                                  className="overflow-hidden rounded-md border"
                                >
                                  <Image
                                    src={
                                      url ||
                                      '/placeholder.svg?height=100&width=100'
                                    }
                                    alt={`Progress photo ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="h-24 w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <FileText className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <p className="text-muted-foreground">
                      No progress reports available yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejection-history">
            <Card>
              <CardHeader>
                <CardTitle>Rejection History</CardTitle>
                <CardDescription>
                  Factories that have rejected this order
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentOrder?.rejectedHistory &&
                currentOrder.rejectedHistory.length > 0 ? (
                  <div className="space-y-6">
                    {currentOrder.rejectedHistory.map(rejection => (
                      <div
                        key={rejection?.id}
                        className="rounded-md border p-4"
                      >
                        <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
                          <div className="flex items-center">
                            <Factory className="text-muted-foreground mr-2 h-5 w-5" />
                            <h3 className="font-medium">
                              {rejection?.factory?.name}
                            </h3>
                          </div>
                          <Badge variant="outline" className="mt-2 md:mt-0">
                            Rejected on {formatDate(rejection?.rejectedAt)}
                          </Badge>
                        </div>

                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-muted-foreground mb-1 text-sm font-medium">
                              Contact Person
                            </p>
                            <p>
                              {rejection?.factory?.contactPersonName} (
                              {rejection?.factory?.contactPersonRole})
                            </p>
                            <p className="text-sm">
                              {rejection?.factory?.contactPersonPhone}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1 text-sm font-medium">
                              Factory Owner
                            </p>
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage
                                  src={
                                    rejection?.factory?.owner?.imageUrl || ''
                                  }
                                  alt={rejection?.factory?.owner?.name || ''}
                                />
                                <AvatarFallback>
                                  {rejection?.factory?.owner?.name?.charAt(0) ||
                                    '?'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p>{rejection?.factory?.owner?.name}</p>
                                <p className="text-muted-foreground text-sm">
                                  {rejection?.factory?.owner?.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-muted-foreground mb-1 text-sm font-medium">
                            Rejection Reason
                          </p>
                          <p className="text-sm">{rejection?.reason}</p>
                        </div>

                        <div className="mt-4">
                          <p className="text-muted-foreground mb-1 text-sm font-medium">
                            Factory Details
                          </p>
                          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Lead Time
                              </p>
                              <p className="text-sm">
                                {rejection?.factory?.leadTime} days
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Capacity
                              </p>
                              <p className="text-sm">
                                {rejection?.factory?.maxPrintingCapacity} units
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Min. Order
                              </p>
                              <p className="text-sm">
                                {rejection?.factory?.minimumOrderQuantity} units
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <History className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <p className="text-muted-foreground">
                      No rejection history available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
