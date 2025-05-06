"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetGiaoHangNhanhOrderInfoQuery } from '@/graphql/generated/graphql'
import { AlertCircle, ArrowLeft, Building, Clock, DollarSign, FileText, Info, MapPin, Package, Phone, Printer, Ruler, Tag, User, Weight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function ShippingInfoPage() {
  const { id } = useParams()
  const router = useRouter()

  const { data: shippingInfo, loading, error } = useGetGiaoHangNhanhOrderInfoQuery({
    variables: {
      orderCode: id as string
    }
  })

  const orderData = shippingInfo?.getGiaoHangNhanhOrderInfo

  // Format date function
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Format currency function
  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return 'N/A'
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  // Get status color based on status
  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'bg-gray-500'
    
    const statusMap: Record<string, string> = {
      'ready_to_pick': 'bg-blue-500',
      'picking': 'bg-yellow-500',
      'picked': 'bg-indigo-500',
      'delivering': 'bg-purple-500',
      'delivered': 'bg-green-500',
      'delivery_failed': 'bg-red-500',
      'waiting_to_return': 'bg-orange-500',
      'return': 'bg-pink-500',
      'returned': 'bg-rose-500',
      'cancel': 'bg-red-500',
      'exception': 'bg-red-500'
    }
    
    return statusMap[status.toLowerCase()] || 'bg-gray-500'
  }

  // Get status text
  const getStatusText = (status: string | null | undefined) => {
    if (!status) return 'Unknown'
    
    const statusMap: Record<string, string> = {
      'ready_to_pick': 'Ready to Pick',
      'picking': 'Picking',
      'picked': 'Picked',
      'delivering': 'Delivering',
      'delivered': 'Delivered',
      'delivery_failed': 'Delivery Failed',
      'waiting_to_return': 'Waiting to Return',
      'return': 'Returning',
      'returned': 'Returned',
      'cancel': 'Cancelled',
      'exception': 'Exception'
    }
    
    return statusMap[status.toLowerCase()] || status
  }

  // Handle print function
  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error || !orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Shipping Information</h1>
        <p className="text-gray-600 mb-6">{error?.message || "Could not find shipping information for this order"}</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl print:py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 print:hidden">
        <div>
          <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold">Shipping Information</h1>
          <p className="text-gray-500">Order Code: {orderData.order_code}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      {/* Order Status Card */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Order Status</CardTitle>
            <Badge className={`${getStatusColor(orderData.status)} text-white`}>
              {getStatusText(orderData.status)}
            </Badge>
          </div>
          <CardDescription>
            Created on {formatDate(orderData.created_date)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline */}
            <ol className="relative border-l border-gray-200 ml-3 space-y-6 py-2">
              {orderData.log && orderData.log.map((logItem, index) => (
                <li className="ml-6" key={index}>
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3">
                    <Clock className="w-3 h-3 text-white" />
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold">
                    {getStatusText(logItem.status)}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                    {formatDate(logItem.updated_date)}
                  </time>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 print:hidden">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="package">Package Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        {/* Order Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Code</p>
                  <p className="text-lg font-semibold">{orderData.order_code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Client Order Code</p>
                  <p className="text-lg">{orderData.client_order_code || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Client ID</p>
                  <p className="text-lg">{orderData.client_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Shop ID</p>
                  <p className="text-lg">{orderData.shop_id || 'N/A'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Date</p>
                  <p className="text-lg">{formatDate(orderData.order_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created Date</p>
                  <p className="text-lg">{formatDate(orderData.created_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Expected Delivery</p>
                  <p className="text-lg">{orderData.leadtime ? formatDate(orderData.leadtime) : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Finish Date</p>
                  <p className="text-lg">{formatDate(orderData.finish_date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" /> Service Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Service ID</p>
                  <p className="text-lg">{orderData.service_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Service Type ID</p>
                  <p className="text-lg">{orderData.service_type_id || 'N/A'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Required Note</p>
                  <p className="text-lg">{orderData.required_note || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Content</p>
                  <p className="text-lg">{orderData.content || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" /> Warehouse Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Warehouse</p>
                  <p className="text-lg">{orderData.current_warehouse_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pick Warehouse</p>
                  <p className="text-lg">{orderData.pick_warehouse_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pick Station</p>
                  <p className="text-lg">{orderData.pick_station_id || 'N/A'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Deliver Warehouse</p>
                  <p className="text-lg">{orderData.deliver_warehouse_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Deliver Station</p>
                  <p className="text-lg">{orderData.deliver_station_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Return Warehouse</p>
                  <p className="text-lg">{orderData.return_warehouse_id || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Package Info Tab */}
        <TabsContent value="package" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" /> Package Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                  <Weight className="h-10 w-10 text-primary mb-2" />
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <p className="text-2xl font-bold">{orderData.weight || 0} g</p>
                  <p className="text-sm text-gray-500">Converted: {orderData.converted_weight || 0} g</p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                  <Ruler className="h-10 w-10 text-primary mb-2" />
                  <p className="text-sm font-medium text-gray-500">Dimensions</p>
                  <p className="text-2xl font-bold">{orderData.length || 0} × {orderData.width || 0} × {orderData.height || 0}</p>
                  <p className="text-sm text-gray-500">Length × Width × Height (cm)</p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                  <Tag className="h-10 w-10 text-primary mb-2" />
                  <p className="text-sm font-medium text-gray-500">Tags</p>
                  <p className="text-xl font-bold">{orderData.tag || 'No Tags'}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Insurance Value</p>
                    <p className="text-lg">{formatCurrency(orderData.insurance_value)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Coupon</p>
                    <p className="text-lg">{orderData.coupon || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Custom Service Fee</p>
                    <p className="text-lg">{formatCurrency(orderData.custom_service_fee)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Note</p>
                    <p className="text-lg">{orderData.note || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" /> Sender Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg font-medium">{orderData.from_name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-lg">{orderData.from_phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-lg">{orderData.from_address || 'N/A'}</p>
                    <p className="text-sm text-gray-500">
                      Ward: {orderData.from_ward_code || 'N/A'}, 
                      District: {orderData.from_district_id || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Receiver Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" /> Receiver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg font-medium">{orderData.to_name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-lg">{orderData.to_phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-lg">{orderData.to_address || 'N/A'}</p>
                    <p className="text-sm text-gray-500">
                      Ward: {orderData.to_ward_code || 'N/A'}, 
                      District: {orderData.to_district_id || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Return Address */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" /> Return Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <User className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-lg font-medium">{orderData.return_name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-lg">{orderData.return_phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-lg">{orderData.return_address || 'N/A'}</p>
                  <p className="text-sm text-gray-500">
                    Ward: {orderData.return_ward_code || 'N/A'}, 
                    District: {orderData.return_district_id || 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" /> Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Type</p>
                    <p className="text-lg">{orderData.payment_type_id || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(orderData.order_value)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">COD Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(orderData.cod_amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">COD Collected</p>
                    <Badge variant={orderData.is_cod_collected ? "default" : "secondary"}>
                      {orderData.is_cod_collected ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">COD Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">COD Collection Date</p>
                    <p className="text-lg">{formatDate(orderData.cod_collect_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">COD Transfer Date</p>
                    <p className="text-lg">{formatDate(orderData.cod_transfer_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">COD Transferred</p>
                    <Badge variant={orderData.is_cod_transferred ? "default" : "secondary"}>
                      {orderData.is_cod_transferred ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>

              {orderData.cod_failed_amount && (
                <>
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Failed COD Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Failed COD Amount</p>
                        <p className="text-lg text-red-500 font-semibold">{formatCurrency(orderData.cod_failed_amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Failed COD Collection Date</p>
                        <p className="text-lg">{formatDate(orderData.cod_failed_collect_date)}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Print View - Only visible when printing */}
      <div className="hidden print:block space-y-6 mt-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Shipping Information</h1>
          <p>Order Code: {orderData.order_code}</p>
          <div className="mt-2">
            <Badge className={`${getStatusColor(orderData.status)} text-white`}>
              {getStatusText(orderData.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Sender Information</h2>
            <p><strong>Name:</strong> {orderData.from_name || 'N/A'}</p>
            <p><strong>Phone:</strong> {orderData.from_phone || 'N/A'}</p>
            <p><strong>Address:</strong> {orderData.from_address || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Receiver Information</h2>
            <p><strong>Name:</strong> {orderData.to_name || 'N/A'}</p>
            <p><strong>Phone:</strong> {orderData.to_phone || 'N/A'}</p>
            <p><strong>Address:</strong> {orderData.to_address || 'N/A'}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Package Details</h2>
          <p><strong>Weight:</strong> {orderData.weight || 0}g (Converted: {orderData.converted_weight || 0}g)</p>
          <p><strong>Dimensions:</strong> {orderData.length || 0} × {orderData.width || 0} × {orderData.height || 0} cm</p>
          <p><strong>Content:</strong> {orderData.content || 'N/A'}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Payment Information</h2>
          <p><strong>Order Value:</strong> {formatCurrency(orderData.order_value)}</p>
          <p><strong>COD Amount:</strong> {formatCurrency(orderData.cod_amount)}</p>
          <p><strong>COD Collected:</strong> {orderData.is_cod_collected ? 'Yes' : 'No'}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Timeline</h2>
          {orderData.log && orderData.log.map((logItem, index) => (
            <div key={index} className="mb-2">
              <p><strong>{getStatusText(logItem.status)}:</strong> {formatDate(logItem.updated_date)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <Skeleton className="h-64 w-full mb-6" />

      <div className="grid grid-cols-4 gap-2 mb-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}
