'use client';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileImage,
  ImageIcon,
  Loader2,
  ShoppingBag,
  Trash2,
  Upload,
  X,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { getStatusBadge } from '@/app/(root)/_components/order-status';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  OrderDetailStatus,
  OrderStatus,
  useDoneCheckQualityMutation,
  useGetOrderQuery,
} from '@/graphql/generated/graphql';
import { formatDate } from '@/lib/utils';
import { useUploadFileMutation } from '@/graphql/upload-client/upload-file-hook';
import { OrderHeader } from '@/app/(root)/_components/order-header';
import { OrderEvaluationCriteria } from '@/components/shared/order/order-evaluation-criteria';
import { FailedEvaluationCriteriaDialog } from '@/components/shared/order/failed-evaluation-criteria-dialog';

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

export default function StaffCheckQualityDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [selectedOrderDetailIndex, setSelectedOrderDetailIndex] = useState(0);
  const [selectedCheckQualityIndex, setSelectedCheckQualityIndex] = useState(0);
  const [passedQuantity, setPassedQuantity] = useState(0);
  const [failedQuantity, setFailedQuantity] = useState(0);
  const [note, setNote] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [
    selectedFailedEvaluationCriteriaIds,
    setSelectedFailedEvaluationCriteriaIds,
  ] = useState<string[]>([]);

  // Use the query hook to get order details
  const { data, loading, error, refetch } = useGetOrderQuery({
    variables: {
      orderId: id,
    },
  });
  const [uploadFile, { loading: uploadFileloading }] = useUploadFileMutation();

  // Done check quality mutation
  const [doneCheckQuality, { loading: doneCheckQualityLoading }] =
    useDoneCheckQualityMutation();

  const order = data?.order;
  const orderDetails = order?.orderDetails || [];

  // Get the selected order detail and check quality
  const selectedOrderDetail = orderDetails[selectedOrderDetailIndex];
  const checkQualities = selectedOrderDetail?.checkQualities || [];
  const selectedCheckQuality = checkQualities[selectedCheckQualityIndex];

  // Update passed and failed quantity when selected order detail changes
  useEffect(() => {
    if (selectedOrderDetail) {
      // Reset quantities
      setPassedQuantity(0);
      setFailedQuantity(0);
      setNote('');
      setSelectedFailedEvaluationCriteriaIds([]);

      // Clean up image previews
      previewImages.forEach(url => URL.revokeObjectURL(url));
      setPreviewImages([]);
      setImages([]);
    }
  }, [selectedOrderDetailIndex, selectedCheckQualityIndex]);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);

    // Upload each file one by one
    for (const file of newFiles) {
      const mockEvent = {
        target: {
          files: [file] as unknown as FileList,
        },
        preventDefault: () => {},
        currentTarget: {} as HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>;

      const fileUrl = await handleUploadFile(mockEvent);

      if (fileUrl) {
        // Store the actual uploaded URL instead of creating a blob URL
        setImages(prev => [...prev, file]);
        setPreviewImages(prev => [...prev, fileUrl]);
      }
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));

    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

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
      toast.error('Failed to get upload URL');
      return null;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  // Handle quality check submission
  const handleSubmitQualityCheck = async () => {
    if (!selectedCheckQuality) return;

    if (passedQuantity + failedQuantity <= 0) {
      toast.error('Total quantity must be greater than 0');
      return;
    }

    // Submit quality check with the actual uploaded URLs
    doneCheckQuality({
      variables: {
        input: {
          checkQualityId: selectedCheckQuality.id,
          failedQuantity,
          passedQuantity,
          imageUrls: previewImages,
          note,
          failedEvaluationCriteriaIds: selectedFailedEvaluationCriteriaIds,
        },
      },
      onCompleted: data => {
        refetch();
        toast.success('Quality check completed successfully');
        // Reset all form states
        setPassedQuantity(0);
        setFailedQuantity(0);
        setNote('');
        setSelectedFailedEvaluationCriteriaIds([]);
        setImages([]);
        setPreviewImages([]);
        setActiveTab('details');
      },
      onError: error => {
        toast.error(error.message || 'Failed to complete quality check');
      },
    });
  };

  // Open image preview
  const openImagePreview = (index: number) => {
    setSelectedImageIndex(index);
    setIsImagePreviewOpen(true);
  };

  // Error or empty state
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
            <Button onClick={() => router.push('/staff/tasks')}>
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <span className="ml-2">Loading order details...</span>
        </div>
      </div>
    );
  }

  // Check if there are any order details with quality checks
  const hasQualityChecks = orderDetails.some(
    detail => detail.checkQualities && detail.checkQualities.length > 0,
  );

  if (!hasQualityChecks) {
    return (
      <div>
        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertTriangle className="mb-4 h-12 w-12 text-amber-500" />
            <h2 className="mb-2 text-xl font-semibold">
              No Quality Checks Found
            </h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              This order doesn&apos;t have any quality checks assigned yet.
            </p>
            <Button onClick={() => router.push('/staff/tasks')}>
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
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

      {/* Order Details Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Product for Quality Check</CardTitle>
          <CardDescription>
            Choose which product you want to perform a quality check on
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="orderDetail"
                  className="mb-1 block text-sm font-medium"
                >
                  Product
                </label>
                <Select
                  value={selectedOrderDetailIndex.toString()}
                  onValueChange={value => {
                    setSelectedOrderDetailIndex(Number.parseInt(value));
                    setSelectedCheckQualityIndex(0); // Reset check quality index when product changes
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderDetails.map((detail, index) => (
                      <SelectItem key={detail.id} value={index.toString()}>
                        {detail.systemConfigVariant?.product?.name} -{' '}
                        {detail.systemConfigVariant?.size} ({detail.quantity}{' '}
                        items)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedOrderDetail &&
                selectedOrderDetail.checkQualities &&
                selectedOrderDetail.checkQualities.length > 1 && (
                  <div>
                    <label
                      htmlFor="checkQuality"
                      className="mb-1 block text-sm font-medium"
                    >
                      Quality Check
                    </label>
                    <Select
                      value={selectedCheckQualityIndex.toString()}
                      onValueChange={value =>
                        setSelectedCheckQualityIndex(Number.parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a quality check" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedOrderDetail.checkQualities.map(
                          (check, index) => (
                            <SelectItem key={check.id} value={index.toString()}>
                              Quality Check #{index + 1} -{' '}
                              {getStatusBadge(check.status)}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
            </div>

            {selectedOrderDetail && (
              <div className="bg-muted/30 rounded-lg border p-4">
                <div className="grid gap-4 md:grid-cols-[1fr_3fr]">
                  <Link href={`/view/tshirt/${selectedOrderDetail.design?.id}`}>
                    <div className="bg-muted group relative aspect-square overflow-hidden rounded-md transition-all hover:opacity-90">
                      <Image
                        src={
                          selectedOrderDetail.design?.thumbnailUrl ||
                          '/placeholder.svg?height=200&width=200'
                        }
                        alt={
                          selectedOrderDetail.systemConfigVariant?.product
                            ?.name || 'Product'
                        }
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">
                      {selectedOrderDetail.systemConfigVariant?.product?.name}
                    </h3>
                    <div className="mb-2 grid gap-2 md:grid-cols-3">
                      <div>
                        <p className="text-muted-foreground text-sm">Size</p>
                        <p className="font-medium">
                          {selectedOrderDetail.systemConfigVariant?.size}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Color</p>
                        <p className="flex items-center font-medium">
                          <span
                            className="mr-1 inline-block h-3 w-3 rounded-full"
                            style={{
                              backgroundColor:
                                selectedOrderDetail.systemConfigVariant
                                  ?.color || 'transparent',
                            }}
                          ></span>
                          {selectedOrderDetail.systemConfigVariant?.color}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Quantity
                        </p>
                        <p className="font-medium">
                          {selectedOrderDetail.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">Status:</p>
                      {getStatusBadge(selectedOrderDetail.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">
                        Quality Check Status:
                      </p>
                      {selectedCheckQuality ? (
                        getStatusBadge(selectedCheckQuality.status)
                      ) : (
                        <Badge variant="outline">No Quality Check</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Details and Quality Check Form */}
      {selectedOrderDetail && selectedCheckQuality && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="quality-check">Quality Check Form</TabsTrigger>
          </TabsList>

          {/* Product Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Detailed information about the product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-medium">Product Information</h3>
                      <div className="grid gap-2">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Product Name
                          </span>
                          <span className="font-medium">
                            {
                              selectedOrderDetail.systemConfigVariant?.product
                                ?.name
                            }
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Size
                          </span>
                          <span className="font-medium">
                            {selectedOrderDetail.systemConfigVariant?.size}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Color
                          </span>
                          <span className="flex items-center font-medium">
                            <span
                              className="mr-1 inline-block h-3 w-3 rounded-full"
                              style={{
                                backgroundColor:
                                  selectedOrderDetail.design
                                    ?.systemConfigVariant?.color ||
                                  'transparent',
                              }}
                            ></span>
                            {selectedOrderDetail.systemConfigVariant?.color}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Quantity
                          </span>
                          <span className="font-medium">
                            {selectedOrderDetail.quantity}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Price
                          </span>
                          <span className="font-medium">
                            {formatCurrency(selectedOrderDetail.price)}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Status
                          </span>
                          <span>
                            {getStatusBadge(selectedOrderDetail.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">
                        Production Information
                      </h3>
                      <div className="grid gap-2">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Completed Quantity
                          </span>
                          <span className="font-medium text-green-600">
                            {selectedOrderDetail.completedQty || 0}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Rejected Quantity
                          </span>
                          <span className="font-medium text-red-600">
                            {selectedOrderDetail.rejectedQty || 0}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Is Rework
                          </span>
                          <span className="font-medium">
                            {selectedOrderDetail.isRework ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Rework Times
                          </span>
                          <span className="font-medium">
                            {selectedOrderDetail.reworkTime || 0}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground text-sm">
                            Production Cost
                          </span>
                          <span className="font-medium">
                            {formatCurrency(
                              selectedOrderDetail?.productionCost || 0,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Design Positions</h3>
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                      {selectedOrderDetail.design?.designPositions?.map(
                        (position, idx) => (
                          <div key={idx} className="rounded-md border p-3">
                            <p className="font-medium">
                              {position.positionType?.positionName}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Base Price:{' '}
                              {formatCurrency(
                                position.positionType?.basePrice || 0,
                              )}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {position.designJSON?.length} design elements
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {selectedOrderDetail.checkQualities &&
                    selectedOrderDetail.checkQualities.length > 0 && (
                      <div>
                        <h3 className="mb-2 font-medium">
                          Quality Check History
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {selectedOrderDetail.checkQualities.map(
                            (check, idx) => (
                              <AccordionItem key={idx} value={`check-${idx}`}>
                                <AccordionTrigger className="hover:no-underline">
                                  <div className="flex items-center gap-2">
                                    <span>Quality Check #{idx + 1}</span>
                                    {getStatusBadge(check.status)}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid gap-2 pl-2">
                                    <div className="flex justify-between border-b pb-1">
                                      <span className="text-muted-foreground text-sm">
                                        Total Checked
                                      </span>
                                      <span className="font-medium">
                                        {check.totalChecked || 0}
                                      </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                      <span className="text-muted-foreground text-sm">
                                        Passed Quantity
                                      </span>
                                      <span className="font-medium text-green-600">
                                        {check.passedQuantity || 0}
                                      </span>
                                    </div>
                                    {check.task && (
                                      <>
                                        <div className="flex justify-between border-b pb-1">
                                          <span className="text-muted-foreground text-sm">
                                            Task Name
                                          </span>
                                          <span className="font-medium">
                                            {check.task.taskname}
                                          </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-1">
                                          <span className="text-muted-foreground text-sm">
                                            Assignee
                                          </span>
                                          <span className="font-medium">
                                            {check.task.assignee?.name}
                                          </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-1">
                                          <span className="text-muted-foreground text-sm">
                                            Task Status
                                          </span>
                                          <span>
                                            {getStatusBadge(check.task.status)}
                                          </span>
                                        </div>
                                        {check.task.note && (
                                          <div className="mt-2">
                                            <span className="text-muted-foreground text-sm">
                                              Note:
                                            </span>
                                            <p className="bg-muted mt-1 rounded-md p-2 text-sm">
                                              {check.task.note}
                                            </p>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ),
                          )}
                        </Accordion>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quality Check Form Tab */}
          <TabsContent value="quality-check">
            {(order.status === OrderStatus.WaitingForCheckingQuality ||
              order.status === OrderStatus.ReworkRequired) &&
            selectedCheckQuality.status === OrderDetailStatus.Pending ? (
              <Card>
                <CardHeader>
                  <CardTitle>Quality Check Form</CardTitle>
                  <CardDescription>
                    Complete the quality check for this product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Evaluation Criteria Section */}
                  <OrderEvaluationCriteria
                    criteria={order.orderEvaluationCriteria || []}
                    className="mb-6"
                  />
                  <div className="grid gap-6">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Quality Check Instructions</AlertTitle>
                      <AlertDescription>
                        <p className="mt-2">
                          Please inspect the product carefully and record the
                          number of items that pass and fail quality standards.
                          Take clear photos of any defects found and provide
                          detailed notes about the issues.
                        </p>
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="passedQuantity"
                          className="mb-1 block text-sm font-medium"
                        >
                          Passed Quantity
                        </label>
                        <Input
                          id="passedQuantity"
                          type="number"
                          min="0"
                          max={selectedOrderDetail.quantity}
                          value={passedQuantity}
                          onChange={e => {
                            const value = Number.parseInt(e.target.value) || 0;
                            setPassedQuantity(value);
                            setFailedQuantity(
                              selectedOrderDetail.quantity - value,
                            );
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="failedQuantity"
                          className="mb-1 block text-sm font-medium"
                        >
                          Failed Quantity
                        </label>
                        <Input
                          id="failedQuantity"
                          type="number"
                          min="0"
                          max={selectedOrderDetail.quantity}
                          value={failedQuantity}
                          onChange={e => {
                            const value = Number.parseInt(e.target.value) || 0;
                            setFailedQuantity(value);
                            setPassedQuantity(
                              selectedOrderDetail.quantity - value,
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label
                          htmlFor="note"
                          className="block text-sm font-medium"
                        >
                          Quality Check Notes
                        </label>
                        <span className="text-muted-foreground text-xs">
                          {note.length} / 500 characters
                        </span>
                      </div>
                      <Textarea
                        id="note"
                        placeholder="Enter detailed notes about the quality check results, including any defects found..."
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className="min-h-[120px]"
                        maxLength={500}
                      />
                    </div>

                    {/* Failed Evaluation Criteria Selection */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Failed Evaluation Criteria
                      </label>
                      <p className="text-muted-foreground mb-3 text-sm">
                        Select which evaluation criteria failed during the
                        quality check
                      </p>
                      <FailedEvaluationCriteriaDialog
                        criteria={order.orderEvaluationCriteria || []}
                        selectedFailedIds={selectedFailedEvaluationCriteriaIds}
                        onSelectFailedCriteria={
                          setSelectedFailedEvaluationCriteriaIds
                        }
                        loading={loading}
                        disabled={
                          uploadFileloading ||
                          doneCheckQualityLoading ||
                          failedQuantity === 0
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Upload Images
                      </label>

                      <div className="mb-4 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={
                            uploadFileloading || doneCheckQualityLoading
                          }
                        >
                          {uploadFileloading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="mr-2 h-4 w-4" />
                          )}
                          {uploadFileloading ? 'Uploading...' : 'Select Images'}
                        </Button>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleFileChange}
                          disabled={
                            uploadFileloading || doneCheckQualityLoading
                          }
                        />

                        <span className="text-muted-foreground text-sm">
                          {images.length}{' '}
                          {images.length === 1 ? 'image' : 'images'} selected
                        </span>
                      </div>

                      {/* Image Preview */}
                      {previewImages.length > 0 ? (
                        <div className="rounded-md border p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-medium">Image Previews</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                previewImages.forEach(url =>
                                  URL.revokeObjectURL(url),
                                );
                                setPreviewImages([]);
                                setImages([]);
                              }}
                              disabled={
                                uploadFileloading || doneCheckQualityLoading
                              }
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Clear All
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {previewImages.map((url, index) => (
                              <div key={index} className="group relative">
                                <div
                                  className="bg-muted relative aspect-square cursor-pointer overflow-hidden rounded-md border"
                                  onClick={() => openImagePreview(index)}
                                >
                                  <Image
                                    src={url || '/placeholder.svg'}
                                    alt={`Preview ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/10 group-hover:opacity-100">
                                    <ImageIcon className="h-6 w-6 text-white" />
                                  </div>
                                </div>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                  onClick={e => {
                                    e.stopPropagation();
                                    removeImage(index);
                                  }}
                                  disabled={
                                    uploadFileloading || doneCheckQualityLoading
                                  }
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                          <FileImage className="text-muted-foreground mb-2 h-10 w-10" />
                          <p className="text-muted-foreground mb-1 text-sm">
                            No images selected
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Upload images to document the quality check results
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('details')}
                    disabled={uploadFileloading || doneCheckQualityLoading}
                    className="w-full sm:w-auto"
                  >
                    Back to Details
                  </Button>
                  <Button
                    onClick={handleSubmitQualityCheck}
                    disabled={
                      uploadFileloading ||
                      doneCheckQualityLoading ||
                      passedQuantity + failedQuantity <= 0 ||
                      passedQuantity + failedQuantity >
                        selectedOrderDetail.quantity
                    }
                    className="w-full sm:w-auto"
                  >
                    {(uploadFileloading || doneCheckQualityLoading) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Complete Quality Check
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              // you cannot check quality if order status is not waiting for checking quality
              <Card className="text-center">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />
                  <h2 className="mb-2 text-xl font-semibold">
                    Quality Check Not Allowed
                  </h2>
                  <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                    You cannot perform a quality check on this order because its
                    status is not valid for quality checking.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>
              Image {selectedImageIndex + 1} of {previewImages.length}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-md">
            {previewImages[selectedImageIndex] && (
              <Image
                src={previewImages[selectedImageIndex] || '/placeholder.svg'}
                alt={`Preview ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedImageIndex(prev =>
                    prev > 0 ? prev - 1 : previewImages.length - 1,
                  )
                }
                disabled={previewImages.length <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedImageIndex(prev =>
                    prev < previewImages.length - 1 ? prev + 1 : 0,
                  )
                }
                disabled={previewImages.length <= 1}
              >
                Next
              </Button>
            </div>
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
              disabled={uploadFileloading || doneCheckQualityLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
