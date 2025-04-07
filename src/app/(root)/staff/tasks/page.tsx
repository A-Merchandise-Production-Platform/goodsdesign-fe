"use client"

import type React from "react"

import { useState } from "react"
import { useDoneCheckQualityMutation, useGetMyStaffOrdersQuery } from "@/graphql/generated/graphql"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, FileImage, Loader2, Package, Search, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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

export default function MyStaffTasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isQualityCheckDialogOpen, setIsQualityCheckDialogOpen] = useState(false)
  const [selectedCheckQuality, setSelectedCheckQuality] = useState<any>(null)
  const [passedQuantity, setPassedQuantity] = useState(0)
  const [failedQuantity, setFailedQuantity] = useState(0)
  const [note, setNote] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imageUploading, setImageUploading] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const { data, loading, refetch } = useGetMyStaffOrdersQuery()

  // Update order status mutations
  const [doneCheckQuality, { loading: doneCheckQualityLoading }] = useDoneCheckQualityMutation({
    onCompleted: (data) => {
      refetch()
      toast.success("Quality check completed successfully")
      setIsQualityCheckDialogOpen(false)
      resetForm()
    },
    onError: (error) => {
      toast.error(error.message || "Failed to complete quality check")
    },
  })

  const orders = data?.staffOrders || []

  // Filter orders based on search term and active tab
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "quality-check") return matchesSearch && order.status === "WAITING_FOR_CHECKING_QUALITY"
    return matchesSearch
  })

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

      setImageUrls(uploadedUrls)
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

  // Reset form
  const resetForm = () => {
    setSelectedCheckQuality(null)
    setPassedQuantity(0)
    setFailedQuantity(0)
    setNote("")
    setImages([])
    setImageUrls([])

    // Clean up preview URLs
    previewImages.forEach((url) => URL.revokeObjectURL(url))
    setPreviewImages([])
  }

  // Open quality check dialog
  const openQualityCheckDialog = (checkQuality: any) => {
    setSelectedCheckQuality(checkQuality)
    setIsQualityCheckDialogOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <p className="text-muted-foreground">Manage your assigned orders and quality checks</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="quality-check">Quality Checks</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredOrders.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>All Assigned Orders</CardTitle>
                  <CardDescription>View and manage all orders assigned to you</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                <Image
                                  src={order.customer?.imageUrl || "/placeholder.svg?height=32&width=32"}
                                  alt={order.customer?.name || "Customer"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>{order.customer?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{formatDate(order.orderDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => (window.location.href = `/staff/tasks/${order.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
                  <p className="text-muted-foreground text-center max-w-md">
                    {searchTerm
                      ? "No orders match your search criteria. Try a different search term."
                      : "You don't have any assigned orders at the moment."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quality-check" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredOrders.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Quality Checks</CardTitle>
                  <CardDescription>Orders waiting for quality inspection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {filteredOrders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                Order #{order.id.substring(0, 8)}
                                {getStatusBadge(order.status)}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {formatDate(order.orderDate)} • {order.customer?.name}
                              </CardDescription>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => (window.location.href = `/staff/tasks/${order.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {order.orderDetails?.map((item) => (
                              <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                                  <Image
                                    src={item.design?.thumbnailUrl || "/placeholder.svg?height=64&width=64"}
                                    alt={item.design?.systemConfigVariant?.product?.name || "Product"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium">{item.design?.systemConfigVariant?.product?.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity} • Size: {item.design?.systemConfigVariant?.size}
                                  </p>
                                  <div className="mt-1 flex items-center gap-1">
                                    <span
                                      className="inline-block h-3 w-3 rounded-full"
                                      style={{
                                        backgroundColor: item.design?.systemConfigVariant?.color || "transparent",
                                      }}
                                    ></span>
                                    <span className="text-xs">{item.design?.systemConfigVariant?.color}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No Quality Checks Pending</h2>
                  <p className="text-muted-foreground text-center max-w-md">
                    There are no orders waiting for quality inspection at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Quality Check Dialog */}
      <Dialog
        open={isQualityCheckDialogOpen}
        onOpenChange={(open) => {
          if (!open) resetForm()
          setIsQualityCheckDialogOpen(open)
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Complete Quality Check</DialogTitle>
            <DialogDescription>
              Enter the quality check results for order #{selectedCheckQuality?.order?.id?.substring(0, 8)}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {selectedCheckQuality && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Quality Check Information</AlertTitle>
                <AlertDescription className="mt-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Product:</span>{" "}
                      {selectedCheckQuality.orderDetail?.design?.systemConfigVariant?.product?.name}
                    </div>
                    <div>
                      <span className="font-medium">Total Quantity:</span> {selectedCheckQuality.orderDetail?.quantity}
                    </div>
                    <div>
                      <span className="font-medium">Size:</span>{" "}
                      {selectedCheckQuality.orderDetail?.design?.systemConfigVariant?.size}
                    </div>
                    <div>
                      <span className="font-medium">Color:</span>{" "}
                      <span className="inline-flex items-center">
                        <span
                          className="inline-block h-3 w-3 rounded-full mr-1"
                          style={{
                            backgroundColor:
                              selectedCheckQuality.orderDetail?.design?.systemConfigVariant?.color || "transparent",
                          }}
                        ></span>
                        {selectedCheckQuality.orderDetail?.design?.systemConfigVariant?.color}
                      </span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="passedQuantity" className="block text-sm font-medium mb-1">
                  Passed Quantity
                </label>
                <Input
                  id="passedQuantity"
                  type="number"
                  min="0"
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
                  value={failedQuantity}
                  onChange={(e) => setFailedQuantity(Number.parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium mb-1">
                Quality Check Notes
              </label>
              <Textarea
                id="note"
                placeholder="Enter detailed notes about the quality check..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload Images</label>

              <div className="flex items-center gap-2 mb-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={imageUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Images
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={imageUploading}
                />

                <span className="text-sm text-muted-foreground">
                  {images.length} {images.length === 1 ? "image" : "images"} selected
                </span>
              </div>

              {/* Image Preview */}
              {previewImages.length > 0 && (
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
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {previewImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                          <Image
                            src={url || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewImages.length === 0 && (
                <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-center">
                  <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">No images selected</p>
                  <p className="text-xs text-muted-foreground">Upload images to document the quality check results</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQualityCheckDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitQualityCheck} disabled={doneCheckQualityLoading || imageUploading}>
              {(doneCheckQualityLoading || imageUploading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Complete Quality Check
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

