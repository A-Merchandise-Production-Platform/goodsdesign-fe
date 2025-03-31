"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetFactoryOrderQuery, useUpdateFactoryOrderStatusMutation } from "@/graphql/generated/graphql"
import { formatDate } from "@/lib/utils"
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Loader2, Package } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function OrderDetailsPage() {
  const { id } = useParams<{
    id: string
  }>()
  const { data, loading } = useGetFactoryOrderQuery({
    variables: {
        factoryOrderId: id
    }
  })
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)

  const [updateOrderStatus, { loading: updateLoading }] = useUpdateFactoryOrderStatusMutation({
    onCompleted: (data) => {
      router.push("/factory/orders/" + data.updateFactoryOrderStatus.id)
    },
    refetchQueries: ["GetCurrentFactoryOrders"]
  })

  useEffect(() => {
    if (data?.factoryOrder) {
      if (data?.factoryOrder) {
        setOrder(data?.factoryOrder)
      } else {
        // Order not found, redirect back to list
        router.push("/factory/pending-orders")
      }
    }
  }, [data, id, router])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING_ACCEPTANCE":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Pending Acceptance
          </Badge>
        )
      case "ACCEPTED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Accepted
          </Badge>
        )
      case "IN_PRODUCTION":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Loader2 className="w-3 h-3 mr-1" /> In Production
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="w-3 h-3 mr-1" /> {status}
          </Badge>
        )
    }
  }

  if (loading || !order) {
    return <OrderDetailsSkeleton />
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/factory/pending-orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Factory Order: {order.id}</CardTitle>
                <CardDescription className="mt-2">Customer Order ID: {order.customerOrder.id}</CardDescription>
              </div>
              <div>{getStatusBadge(order.status)}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="mr-1 h-4 w-4" /> Created
                </span>
                <span className="font-medium">{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="mr-1 h-4 w-4" /> Updated
                </span>
                <span className="font-medium">{formatDate(order.updatedAt)}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-4 w-4" /> Acceptance Deadline
                </span>
                <span className="font-medium">{formatDate(order.acceptanceDeadline)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="designs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="designs">Designs</TabsTrigger>
            <TabsTrigger value="order-details">Order Details</TabsTrigger>
          </TabsList>
          <TabsContent value="designs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Design Information</CardTitle>
                <CardDescription>View all design details for this order</CardDescription>
              </CardHeader>
              <CardContent>
                {order.customerOrder.orderDetails.map((detail: any, index: number) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Package className="mr-2 h-5 w-5" /> Design Item {index + 1}
                    </h3>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Design Positions</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        {detail.design.designPositions.map((position: any, posIndex: number) => (
                          <Card key={posIndex}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Position: {position.productPositionTypeId}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm">
                                <p>
                                  <span className="font-medium">Type:</span> {position.designJSON.type}
                                </p>
                                {position.designJSON.type === "text" ? (
                                  <>
                                    <p>
                                      <span className="font-medium">Content:</span> {position.designJSON.content}
                                    </p>
                                    <p>
                                      <span className="font-medium">Font:</span> {position.designJSON.fontFamily},{" "}
                                      {position.designJSON.fontSize}px
                                    </p>
                                    <p>
                                      <span className="font-medium">Color:</span> {position.designJSON.color}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p>
                                      <span className="font-medium">Image URL:</span> {position.designJSON.url}
                                    </p>
                                    <p>
                                      <span className="font-medium">Dimensions:</span> {position.designJSON.width}x
                                      {position.designJSON.height}
                                    </p>
                                  </>
                                )}
                                <p>
                                  <span className="font-medium">Position:</span> X: {position.designJSON.position.x}, Y:{" "}
                                  {position.designJSON.position.y}
                                </p>
                                <p>
                                  <span className="font-medium">Rotation:</span> {position.designJSON.rotation}°
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    {index < order.customerOrder.orderDetails.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="order-details" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Order Details</CardTitle>
                <CardDescription>Additional information about the customer order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Order ID</h3>
                    <p>{order.customerOrder.id}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Order Date</h3>
                    <p>{formatDate(order.customerOrder.orderDate)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Number of Design Items</h3>
                    <p>{order.customerOrder.orderDetails.length}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                {order.status === "PENDING_ACCEPTANCE" && (
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      onClick={() =>
                        updateOrderStatus({
                          variables: {
                            updateFactoryOrderStatusId: order.id,
                            status: "IN_PRODUCTION",
                          },
                        })
                      }
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>Accept Order</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateOrderStatus({
                          variables: {
                            updateFactoryOrderStatusId: order.id,
                            status: "REJECTED",
                          },
                        })
                      }
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>Reject Order</>
                      )}
                    </Button>
                  </div>
                )}
                {order.status === "ACCEPTED" && (
                  <Button
                    variant="default"
                    onClick={() =>
                      updateOrderStatus({
                        variables: {
                          updateFactoryOrderStatusId: order.id,
                          status: "IN_PRODUCTION",
                        },
                      })
                    }
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>Start Production</>
                    )}
                  </Button>
                )}
                {order.status === "IN_PRODUCTION" && (
                  <Button
                    variant="default"
                    onClick={() =>
                      updateOrderStatus({
                        variables: {
                          updateFactoryOrderStatusId: order.id,
                          status: "COMPLETED",
                        },
                      })
                    }
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>Mark as Completed</>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OrderDetailsSkeleton() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>
        <Skeleton className="h-12 w-full" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

