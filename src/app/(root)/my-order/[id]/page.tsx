"use client"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
  FileText,
  ClipboardList,
  History,
  CreditCardIcon as PaymentIcon,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useCreatePaymentGatewayUrlMutation, useGetOrderQuery } from "@/graphql/generated/graphql"
import { useToast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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
    SHIPPED: { label: "Shipped", variant: "default" },
    PAID: { label: "Paid", variant: "default" },
    UNPAID: { label: "Unpaid", variant: "outline" },
    PAYMENT_RECEIVED: { label: "Payment Received", variant: "default" },
    WAITING_FILL_INFORMATION: { label: "Waiting for Information", variant: "outline" },
    NEED_MANAGER_HANDLE: { label: "Needs Manager", variant: "outline" },
    PENDING_ACCEPTANCE: { label: "Pending Acceptance", variant: "outline" },
    REJECTED: { label: "Rejected", variant: "destructive" },
    IN_PRODUCTION: { label: "In Production", variant: "secondary" },
    WAITING_FOR_CHECKING_QUALITY: { label: "Quality Check", variant: "outline" },
    REWORK_REQUIRED: { label: "Rework Required", variant: "destructive" },
    REWORK_IN_PROGRESS: { label: "Rework in Progress", variant: "secondary" },
    WAITING_PAYMENT: { label: "Waiting Payment", variant: "outline" },
    READY_FOR_SHIPPING: { label: "Ready for Shipping", variant: "secondary" },
  }

  const config = statusMap[status] || { label: status, variant: "outline" }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

// Helper function to get payment status badge
const getPaymentStatusBadge = (status: string) => {
  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    PENDING: { label: "Pending", variant: "outline" },
    COMPLETED: { label: "Completed", variant: "default" },
    FAILED: { label: "Failed", variant: "destructive" },
  }

  const config = statusMap[status] || { label: status, variant: "outline" }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

// Order status timeline steps
const orderStatusSteps = [
  {
    group: "initial",
    statuses: ["PENDING", "PAYMENT_RECEIVED", "WAITING_FILL_INFORMATION"],
    label: "Initial Processing",
    icon: FileText,
  },
  {
    group: "assignment",
    statuses: ["NEED_MANAGER_HANDLE", "PENDING_ACCEPTANCE", "REJECTED"],
    label: "Assignment",
    icon: ClipboardList,
  },
  {
    group: "production",
    statuses: ["IN_PRODUCTION"],
    label: "Production",
    icon: Package,
  },
  {
    group: "quality",
    statuses: ["WAITING_FOR_CHECKING_QUALITY", "REWORK_REQUIRED", "REWORK_IN_PROGRESS"],
    label: "Quality Check",
    icon: CheckCircle2,
  },
  {
    group: "delivery",
    statuses: ["WAITING_PAYMENT", "READY_FOR_SHIPPING", "SHIPPED"],
    label: "Payment & Shipping",
    icon: Truck,
  },
  {
    group: "completion",
    statuses: ["COMPLETED", "CANCELED"],
    label: "Completion",
    icon: CheckCircle2,
  },
]

export default function OrderDetailsPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { toast } = useToast()
  const [expandedPayments, setExpandedPayments] = useState<Record<string, boolean>>({})
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<string>("VNPAY")
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [createPaymentGatewayUrl, { loading: createPaymentGatewayUrlLoading }] = useCreatePaymentGatewayUrlMutation({
    onCompleted: (data) => {
      if (data?.createPayment) {
        // Redirect to payment gateway URL
        window.location.href = data.createPayment
      } else {
        toast({
          title: "Payment Error",
          description: "Failed to create payment link. Please try again.",
          variant: "destructive",
        })
      }
    },
    onError: (error) => {
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Use the query hook
  const { data, loading, error, refetch } = useGetOrderQuery({
    variables: {
      orderId: id,
    },
  })

  const order = data?.order

  // Handle payment balance
  const handlePayBalance = (paymentId: string, gateway: string) => {
    if (!order) return

    setSelectedPaymentGateway(gateway)

    createPaymentGatewayUrl({
      variables: {
        gateway: gateway,
        paymentId: paymentId,
      },
    })
  }

  // Toggle payment details
  const togglePaymentDetails = (paymentId: string) => {
    setExpandedPayments((prev) => ({
      ...prev,
      [paymentId]: !prev[paymentId],
    }))
  }

  // Back to orders button
  const BackButton = () => (
    <div className="mb-6">
      <Button variant="outline" onClick={() => router.push("/my-order")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>
    </div>
  )

  // Get current status group
  const getCurrentStatusGroup = (status: string) => {
    const group = orderStatusSteps.find((step) => step.statuses.includes(status))
    return group ? group.group : "initial"
  }

  // Error or empty order state
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
                  The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
                </p>
              </>
            )}
            <Button onClick={() => router.push("/my-order")}>View All Orders</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Empty order details
  if (order.orderDetails && order.orderDetails.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <BackButton />

        {/* Order Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Order #{order.id}</CardTitle>
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
          <CardContent></CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="text-muted-foreground mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">No Items in This Order</h2>
            <p className="text-muted-foreground mb-6">
              This order doesn&apos;t contain any items. This might be due to a system error.
            </p>
            <Button onClick={() => router.push("/my-order")}>View All Orders</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentStatusGroup = getCurrentStatusGroup(order.status)

  return (
    <div className="container mx-auto px-4 py-10">
      <BackButton />

      {/* Order Header */}
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
              <span className="text-sm font-medium text-muted-foreground">Total Amount</span>
              <span className="font-medium">{formatCurrency(order.totalPrice)}</span>
              <span className="text-sm text-muted-foreground">{order.totalItems} items</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Estimated Completion</span>
              <span className="font-medium">{formatDate(order.estimatedCompletionAt)}</span>
              <span className="text-sm text-muted-foreground">
                {order.isDelayed ? (
                  <span className="text-destructive flex items-center">
                    <Clock className="mr-1 h-3 w-3" /> Delayed
                  </span>
                ) : (
                  "On schedule"
                )}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Progress</span>
              <Progress value={order.currentProgress} className="h-2 w-full" />
              <span className="text-sm text-muted-foreground">{order.currentProgress}% complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Timeline */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription>Current status and progress of your order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-muted">
              <div
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
                style={{
                  width: `${
                    ((orderStatusSteps.findIndex((step) => step.group === currentStatusGroup) + 1) /
                      orderStatusSteps.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-6">
              {orderStatusSteps.map((step, index) => {
                const isActive = step.group === currentStatusGroup
                const isPast = orderStatusSteps.findIndex((s) => s.group === currentStatusGroup) > index
                const Icon = step.icon

                return (
                  <div key={step.group} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isPast
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-xs text-center ${isActive ? "font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">
            <FileText className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="items">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Items
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <History className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="payment">
            <PaymentIcon className="h-4 w-4 mr-2" />
            Payment
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-4 bg-primary/10 p-2 rounded-full">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Production</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated completion: {formatDate(order.estimatedDoneProductionAt)}
                        </p>
                        <p className="text-sm mt-2">
                          {order.doneProductionAt ? (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on {formatDate(order.doneProductionAt)}
                            </span>
                          ) : (
                            <span className="text-amber-600 flex items-center">
                              <Clock className="mr-1 h-3 w-3" /> In progress
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-4 bg-primary/10 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Quality Check</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated completion: {formatDate(order.estimatedCheckQualityAt)}
                        </p>
                        <p className="text-sm mt-2">
                          {order.doneCheckQualityAt ? (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on {formatDate(order.doneCheckQualityAt)}
                            </span>
                          ) : (
                            <span className="text-amber-600 flex items-center">
                              <Clock className="mr-1 h-3 w-3" /> Pending
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-4 bg-primary/10 p-2 rounded-full">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Shipping</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated date: {formatDate(order.estimatedShippingAt)}
                        </p>
                        <p className="text-sm mt-2">
                          {order.shippedAt ? (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Shipped on {formatDate(order.shippedAt)}
                            </span>
                          ) : (
                            <span className="text-amber-600 flex items-center">
                              <Clock className="mr-1 h-3 w-3" /> Pending
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-4 bg-primary/10 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Completion</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated date: {formatDate(order.estimatedCompletionAt)}
                        </p>
                        <p className="text-sm mt-2">
                          {order.completedAt ? (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed on {formatDate(order.completedAt)}
                            </span>
                          ) : (
                            <span className="text-amber-600 flex items-center">
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
              <div className="w-full flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(order.totalPrice - order.shippingPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(order.shippingPrice)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
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
              <CardDescription>Items in this order and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {order.orderDetails?.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                      <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.design?.thumbnailUrl || "/placeholder.svg?height=200&width=200"}
                          alt={item.design?.systemConfigVariant?.product?.name || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.design?.systemConfigVariant?.product?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.design?.systemConfigVariant?.size} • Color:{" "}
                              <span className="inline-flex items-center">
                                <span
                                  className="inline-block h-3 w-3 rounded-full mr-1"
                                  style={{ backgroundColor: item.design?.systemConfigVariant?.color || "transparent" }}
                                ></span>
                                {item.design?.systemConfigVariant?.color}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(item.price)}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <h4 className="text-sm font-medium mb-1">Design Positions:</h4>
                          <div className="grid gap-2 md:grid-cols-2">
                            {item.design?.designPositions?.map((position, idx) => (
                              <div key={idx} className="text-sm border rounded p-2">
                                <p className="font-medium">{position.positionType?.positionName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {position.designJSON?.length} design elements
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-2">
                          <h4 className="text-sm font-medium mb-1">Production Status:</h4>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                            <span className="text-sm">
                              {item.completedQty > 0 && (
                                <span className="text-green-600 mr-2">{item.completedQty} completed</span>
                              )}
                              {item.rejectedQty > 0 && (
                                <span className="text-red-600">{item.rejectedQty} rejected</span>
                              )}
                            </span>
                          </div>
                        </div>

                        {item.checkQualities && item.checkQualities.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">Quality Check:</h4>
                            {item.checkQualities.map((check, idx) => (
                              <div key={idx} className="text-sm flex items-center gap-2">
                                {getStatusBadge(check.status)}
                                <span>
                                  {check.passedQuantity} passed / {check.totalChecked} checked
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
              <CardDescription>Progress and updates for your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order?.orderProgressReports?.map((report, index) => (
                  <div key={report.id} className="relative pl-6 pb-6">
                    {index !== (order?.orderProgressReports?.length || 0) - 1 && (
                      <div className="absolute top-0 left-2 h-full w-px bg-border"></div>
                    )}
                    <div className="absolute top-0 left-0 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                    <div className="mb-1 text-sm font-medium">
                      {formatDate(report.reportDate)} at {formatTime(report.reportDate)}
                    </div>
                    <div className="text-sm">{report.note}</div>
                    {report.imageUrls && report.imageUrls.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {report.imageUrls.map((url, idx) => (
                          <div key={idx} className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={url || "/placeholder.svg"}
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
                  <div className="text-center py-6 text-muted-foreground">No progress updates available yet.</div>
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
              <CardDescription>Payment status and transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              {order.payments && order.payments.length > 0 ? (
                <div className="space-y-4">
                  {order.payments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-medium flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            {payment.type} Payment
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{payment.paymentLog}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                          <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          <div className="mt-1">{getPaymentStatusBadge(payment.status)}</div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePaymentDetails(payment.id)}
                        className="w-full"
                      >
                        {expandedPayments[payment.id] ? "Hide" : "Show"} Transaction Details
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
                              {payment.transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                  <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                                  <TableCell>{transaction.paymentMethod}</TableCell>
                                  <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                                  <TableCell>{getPaymentStatusBadge(transaction.status)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {payment.status === "PENDING" && (
                        <div className="mt-4">
                          <Button
                            onClick={() => handlePayBalance(payment.id, "VNPAY")}
                            disabled={createPaymentGatewayUrlLoading}
                            className="w-full"
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
                <div className="text-center py-6 text-muted-foreground">No payment information available.</div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="w-full flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(order.totalPrice - order.shippingPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(order.shippingPrice)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
            <DialogDescription>Choose your preferred payment method to complete the transaction.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select value={selectedPaymentGateway} onValueChange={setSelectedPaymentGateway}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VNPAY">VNPAY</SelectItem>
                <SelectItem value="MOMO">MoMo</SelectItem>
                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Find the pending payment
                const pendingPayment = order?.payments?.find((p) => p.status === "PENDING")
                if (pendingPayment) {
                  handlePayBalance(pendingPayment.id, selectedPaymentGateway)
                  setIsWithdrawDialogOpen(false)
                }
              }}
              disabled={createPaymentGatewayUrlLoading}
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

