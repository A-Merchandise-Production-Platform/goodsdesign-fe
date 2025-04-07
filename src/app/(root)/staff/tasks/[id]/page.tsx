"use client"
import {
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
  AlertTriangle,
} from "lucide-react"
import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useDoneCheckQualityMutation, useGetOrderQuery } from "@/graphql/generated/graphql"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Helper function to format time
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    PENDING: { label: "Pending", variant: "outline" },
    PROCESSING: { label: "Processing", variant: "secondary" },
    COMPLETED: { label: "Completed", variant: "default" },
    CANCELLED: { label: "Cancelled", variant: "destructive" },
    WAITING_FOR_CHECKING_QUALITY: { label: "Quality Check", variant: "outline" },
    REWORK_REQUIRED: { label: "Rework Required", variant: "destructive" },
    REWORK_IN_PROGRESS: { label: "Rework in Progress", variant: "secondary" },
  }

  const config = statusMap[status] || { label: status, variant: "outline" }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default function StaffCheckQualityDetailsPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [selectedOrderDetailIndex, setSelectedOrderDetailIndex] = useState(0)
  const [selectedCheckQualityIndex, setSelectedCheckQualityIndex] = useState(0)
  const [passedQuantity, setPassedQuantity] = useState(0)
  const [failedQuantity, setFailedQuantity] = useState(0)
  const [note, setNote] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [imageUploading, setImageUploading] = useState(false)
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("details")

  // Use the query hook to get order details
  const { data, loading, error, refetch } = useGetOrderQuery({
    variables: {
      orderId: id,
    },
  })

  // Done check quality mutation
  const [doneCheckQuality, { loading: doneCheckQualityLoading }] = useDoneCheckQualityMutation({
    onCompleted: (data) => {
      refetch()
      toast.success("Quality check completed successfully")
      router.push("/staff/tasks")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to complete quality check")
    },
  })

  const order = data?.order
  const orderDetails = order?.orderDetails || []

  // Get the selected order detail and check quality
  const selectedOrderDetail = orderDetails[selectedOrderDetailIndex]
  const checkQualities = selectedOrderDetail?.checkQualities || []
  const selectedCheckQuality = checkQualities[selectedCheckQualityIndex]

  // Update passed and failed quantity when selected order detail changes
  useEffect(() => {
    if (selectedOrderDetail) {
      // Reset quantities
      setPassedQuantity(0)
      setFailedQuantity(0)
      setNote("")

      // Clean up image previews
      previewImages.forEach((url) => URL.revokeObjectURL(url))
      setPreviewImages([])
      setImages([])
    }
  }, [selectedOrderDetailIndex, selectedCheckQualityIndex])

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewImages((prev) => [...prev, ...newPreviewUrls])
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))

    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index])
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Upload images to server (mock implementation)
  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return []

    setImageUploading(true)

    try {
      // This is a mock implementation
      // In a real application, you would upload the images to your server or cloud storage
      // and get back the URLs

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock URLs - in a real app, these would come from your server
      const uploadedUrls = images.map((_, index) => `https://example.com/uploads/image-${Date.now()}-${index}.jpg`)

      return uploadedUrls
    } catch (error) {
      console.error("Error uploading images:", error)
      toast.error("Failed to upload images")
      return []
    } finally {
      setImageUploading(false)
    }
  }

  // Handle quality check submission
  const handleSubmitQualityCheck = async () => {
    if (!selectedCheckQuality) return

    if (passedQuantity + failedQuantity <= 0) {
      toast.error("Total quantity must be greater than 0")
      return
    }

    // Upload images first
    const uploadedImageUrls = await uploadImages()

    // Submit quality check
    doneCheckQuality({
      variables: {
        input: {
          checkQualityId: selectedCheckQuality.id,
          failedQuantity,
          passedQuantity,
          imageUrls: uploadedImageUrls,
          note,
        },
      },
    })
  }

  // Open image preview
  const openImagePreview = (index: number) => {
    setSelectedImageIndex(index)
    setIsImagePreviewOpen(true)
  }

  // Back button
  const BackButton = () => (
    <div className="mb-6">
      <Button variant="outline" onClick={() => router.push("/staff/tasks")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>
    </div>
  )

  // Error or empty state
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-10">
        <BackButton />
        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-16">
            {error ? (
              <>
                <XCircle className="text-destructive mb-4 h-12 w-12" />
                <h2 className="mb-2 text-xl font-semibold">Error Loading Order</h2>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                  There was a problem loading this order. Please try again later.
                </p>
              </>
            ) : (
              <>
                <ShoppingBag className="text-muted-foreground mb-4 h-12 w-12" />
                <h2 className="mb-2 text-xl font-semibold">Order Not Found</h2>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                  The order you're looking for doesn't exist or you don't have permission to view it.
                </p>
              </>
            )}
            <Button onClick={() => router.push("/staff/tasks")}>View All Tasks</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <BackButton />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading order details...</span>
        </div>
      </div>
    )
  }

  // Check if there are any order details with quality checks
  const hasQualityChecks = orderDetails.some((detail) => detail.checkQualities && detail.checkQualities.length > 0)

  if (!hasQualityChecks) {
    return (
      <div className="container mx-auto px-4 py-10">
        <BackButton />
        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertTriangle className="text-amber-500 mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">No Quality Checks Found</h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              This order doesn't have any quality checks assigned yet.
            </p>
            <Button onClick={() => router.push("/staff/tasks")}>View All Tasks</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <BackButton />

      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Order #{order.id.substring(0, 8)}</CardTitle>
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
              <span className="text-sm font-medium text-muted-foreground">Customer</span>
              <div className="flex items-center">
                <div className="relative h-8 w-8 mr-2 overflow-hidden rounded-full">
                  <Image
                    src={order?.customer?.imageUrl || "/placeholder.svg?height=32&width=32"}
                    alt={order?.customer?.name || "Customer"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{order?.customer?.name}</p>
                  <p className="text-sm text-muted-foreground">{order?.customer?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Total Items</span>
              <span className="font-medium">{order.totalItems}</span>
              <span className="text-sm text-muted-foreground">{orderDetails.length} products</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Total Amount</span>
              <span className="font-medium">{formatCurrency(order.totalPrice)}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Factory</span>
              <span className="font-medium">{order.factory?.name}</span>
              <span className="text-sm text-muted-foreground">{order.factory?.owner?.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Product for Quality Check</CardTitle>
          <CardDescription>Choose which product you want to perform a quality check on</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="orderDetail" className="block text-sm font-medium mb-1">
                  Product
                </label>
                <Select
                  value={selectedOrderDetailIndex.toString()}
                  onValueChange={(value) => {
                    setSelectedOrderDetailIndex(Number.parseInt(value))
                    setSelectedCheckQualityIndex(0) // Reset check quality index when product changes
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderDetails.map((detail, index) => (
                      <SelectItem key={detail.id} value={index.toString()}>
                        {detail.design?.systemConfigVariant?.product?.name} - {detail.design?.systemConfigVariant?.size}{" "}
                        ({detail.quantity} items)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedOrderDetail &&
                selectedOrderDetail.checkQualities &&
                selectedOrderDetail.checkQualities.length > 1 && (
                  <div>
                    <label htmlFor="checkQuality" className="block text-sm font-medium mb-1">
                      Quality Check
                    </label>
                    <Select
                      value={selectedCheckQualityIndex.toString()}
                      onValueChange={(value) => setSelectedCheckQualityIndex(Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a quality check" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedOrderDetail.checkQualities.map((check, index) => (
                          <SelectItem key={check.id} value={index.toString()}>
                            Quality Check #{index + 1} - {getStatusBadge(check.status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
            </div>

            {selectedOrderDetail && (
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="grid gap-4 md:grid-cols-[1fr_3fr]">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                    <Image
                      src={selectedOrderDetail.design?.thumbnailUrl || "/placeholder.svg?height=200&width=200"}
                      alt={selectedOrderDetail.design?.systemConfigVariant?.product?.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {selectedOrderDetail.design?.systemConfigVariant?.product?.name}
                    </h3>
                    <div className="grid gap-2 md:grid-cols-3 mb-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium">{selectedOrderDetail.design?.systemConfigVariant?.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-medium flex items-center">
                          <span
                            className="inline-block h-3 w-3 rounded-full mr-1"
                            style={{
                              backgroundColor: selectedOrderDetail.design?.systemConfigVariant?.color || "transparent",
                            }}
                          ></span>
                          {selectedOrderDetail.design?.systemConfigVariant?.color}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{selectedOrderDetail.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">Status:</p>
                      {getStatusBadge(selectedOrderDetail.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Quality Check Status:</p>
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
                <CardDescription>Detailed information about the product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">Product Information</h3>
                      <div className="grid gap-2">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Product Name</span>
                          <span className="font-medium">
                            {selectedOrderDetail.design?.systemConfigVariant?.product?.name}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Size</span>
                          <span className="font-medium">{selectedOrderDetail.design?.systemConfigVariant?.size}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Color</span>
                          <span className="font-medium flex items-center">
                            <span
                              className="inline-block h-3 w-3 rounded-full mr-1"
                              style={{
                                backgroundColor:
                                  selectedOrderDetail.design?.systemConfigVariant?.color || "transparent",
                              }}
                            ></span>
                            {selectedOrderDetail.design?.systemConfigVariant?.color}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Quantity</span>
                          <span className="font-medium">{selectedOrderDetail.quantity}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Price</span>
                          <span className="font-medium">{formatCurrency(selectedOrderDetail.price)}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <span>{getStatusBadge(selectedOrderDetail.status)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Production Information</h3>
                      <div className="grid gap-2">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Completed Quantity</span>
                          <span className="font-medium text-green-600">{selectedOrderDetail.completedQty || 0}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Rejected Quantity</span>
                          <span className="font-medium text-red-600">{selectedOrderDetail.rejectedQty || 0}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Is Rework</span>
                          <span className="font-medium">{selectedOrderDetail.isRework ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Rework Times</span>
                          <span className="font-medium">{selectedOrderDetail.reworkTime || 0}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-sm text-muted-foreground">Production Cost</span>
                          <span className="font-medium">{formatCurrency(selectedOrderDetail?.productionCost || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Design Positions</h3>
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                      {selectedOrderDetail.design?.designPositions?.map((position, idx) => (
                        <div key={idx} className="border rounded-md p-3">
                          <p className="font-medium">{position.positionType?.positionName}</p>
                          <p className="text-xs text-muted-foreground">
                            Base Price: {formatCurrency(position.positionType?.basePrice || 0)}
                          </p>
                          <p className="text-xs text-muted-foreground">{position.designJSON?.length} design elements</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedOrderDetail.checkQualities && selectedOrderDetail.checkQualities.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Quality Check History</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {selectedOrderDetail.checkQualities.map((check, idx) => (
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
                                  <span className="text-sm text-muted-foreground">Total Checked</span>
                                  <span className="font-medium">{check.totalChecked || 0}</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span className="text-sm text-muted-foreground">Passed Quantity</span>
                                  <span className="font-medium text-green-600">{check.passedQuantity || 0}</span>
                                </div>
                                {check.task && (
                                  <>
                                    <div className="flex justify-between border-b pb-1">
                                      <span className="text-sm text-muted-foreground">Task Name</span>
                                      <span className="font-medium">{check.task.taskname}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                      <span className="text-sm text-muted-foreground">Assignee</span>
                                      <span className="font-medium">{check.task.assignee?.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                      <span className="text-sm text-muted-foreground">Task Status</span>
                                      <span>{getStatusBadge(check.task.status)}</span>
                                    </div>
                                    {check.task.note && (
                                      <div className="mt-2">
                                        <span className="text-sm text-muted-foreground">Note:</span>
                                        <p className="text-sm mt-1 p-2 bg-muted rounded-md">{check.task.note}</p>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quality Check Form Tab */}
          <TabsContent value="quality-check">
            <Card>
              <CardHeader>
                <CardTitle>Quality Check Form</CardTitle>
                <CardDescription>Complete the quality check for this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Quality Check Instructions</AlertTitle>
                    <AlertDescription>
                      <p className="mt-2">
                        Please inspect the product carefully and record the number of items that pass and fail quality
                        standards. Take clear photos of any defects found and provide detailed notes about the issues.
                      </p>
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="passedQuantity" className="block text-sm font-medium mb-1">
                        Passed Quantity
                      </label>
                      <Input
                        id="passedQuantity"
                        type="number"
                        min="0"
                        max={selectedOrderDetail.quantity}
                        value={passedQuantity}
                        onChange={(e) => setPassedQuantity(Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label htmlFor="failedQuantity" className="block text-sm font-medium mb-1">
                        Failed Quantity
                      </label>
                      <Input
                        id="failedQuantity"
                        type="number"
                        min="0"
                        max={selectedOrderDetail.quantity}
                        value={failedQuantity}
                        onChange={(e) => setFailedQuantity(Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="note" className="block text-sm font-medium">
                        Quality Check Notes
                      </label>
                      <span className="text-xs text-muted-foreground">{note.length} / 500 characters</span>
                    </div>
                    <Textarea
                      id="note"
                      placeholder="Enter detailed notes about the quality check results, including any defects found..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-[120px]"
                      maxLength={500}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Images</label>

                    <div className="flex items-center gap-2 mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={imageUploading || doneCheckQualityLoading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Select Images
                      </Button>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={imageUploading || doneCheckQualityLoading}
                      />

                      <span className="text-sm text-muted-foreground">
                        {images.length} {images.length === 1 ? "image" : "images"} selected
                      </span>
                    </div>

                    {/* Image Preview */}
                    {previewImages.length > 0 ? (
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Image Previews</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              previewImages.forEach((url) => URL.revokeObjectURL(url))
                              setPreviewImages([])
                              setImages([])
                            }}
                            disabled={imageUploading || doneCheckQualityLoading}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Clear All
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {previewImages.map((url, index) => (
                            <div key={index} className="relative group">
                              <div
                                className="relative aspect-square overflow-hidden rounded-md border bg-muted cursor-pointer"
                                onClick={() => openImagePreview(index)}
                              >
                                <Image
                                  src={url || "/placeholder.svg"}
                                  alt={`Preview ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <ImageIcon className="h-6 w-6 text-white" />
                                </div>
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeImage(index)
                                }}
                                disabled={imageUploading || doneCheckQualityLoading}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-center">
                        <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">No images selected</p>
                        <p className="text-xs text-muted-foreground">
                          Upload images to document the quality check results
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("details")}
                  disabled={imageUploading || doneCheckQualityLoading}
                  className="w-full sm:w-auto"
                >
                  Back to Details
                </Button>
                <Button
                  onClick={handleSubmitQualityCheck}
                  disabled={
                    imageUploading ||
                    doneCheckQualityLoading ||
                    passedQuantity + failedQuantity <= 0 ||
                    passedQuantity + failedQuantity > selectedOrderDetail.quantity
                  }
                  className="w-full sm:w-auto"
                >
                  {(imageUploading || doneCheckQualityLoading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Complete Quality Check
                </Button>
              </CardFooter>
            </Card>
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

          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
            {previewImages[selectedImageIndex] && (
              <Image
                src={previewImages[selectedImageIndex] || "/placeholder.svg"}
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
                onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : previewImages.length - 1))}
                disabled={previewImages.length <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedImageIndex((prev) => (prev < previewImages.length - 1 ? prev + 1 : 0))}
                disabled={previewImages.length <= 1}
              >
                Next
              </Button>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                removeImage(selectedImageIndex)
                if (previewImages.length <= 1) {
                  setIsImagePreviewOpen(false)
                } else if (selectedImageIndex >= previewImages.length - 1) {
                  setSelectedImageIndex(previewImages.length - 2)
                }
              }}
              disabled={imageUploading || doneCheckQualityLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

