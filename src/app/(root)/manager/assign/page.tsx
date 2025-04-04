"use client"

import { useGetAllFactoryOrdersQuery } from "@/graphql/generated/graphql"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Calendar, AlertCircle } from "lucide-react"
import { format } from "date-fns"

// Define the status types we're filtering for
type OrderStatus = "WAITING_FOR_MANAGER_ASSIGN_FACTORY" | "WAITING_FOR_MANAGER_ASSIGN_STAFF"

export default function NeedAssignPage() {
  const { data, loading, error } = useGetAllFactoryOrdersQuery()
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter orders based on status and search term
  const filteredOrders = data?.factoryOrders.filter((order) => {
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerOrder?.id.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const handleViewDetails = (orderId: string) => {
    router.push(`/manager/assign/${orderId}`)
  }

  const handleAssign = (orderId: string) => {
    alert(`Assign clicked for order: ${orderId}`)
  }

  if (loading) return <div className="flex justify-center items-center h-64">Loading orders...</div>

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <AlertCircle className="mr-2" />
        Error loading orders: {error.message}
      </div>
    )

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Factory Orders Needing Assignment</CardTitle>
          <CardDescription>Manage and assign factory orders to staff and factories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "ALL")}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Pending Orders</SelectItem>
                <SelectItem value="WAITING_FOR_MANAGER_ASSIGN_FACTORY">Waiting for Factory Assignment</SelectItem>
                <SelectItem value="WAITING_FOR_MANAGER_ASSIGN_STAFF">Waiting for Staff Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Total Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders && filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerOrder?.id || "N/A"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={order.status === "WAITING_FOR_MANAGER_ASSIGN_FACTORY" ? "default" : "secondary"}
                        >
                          {order.status === "WAITING_FOR_MANAGER_ASSIGN_FACTORY" ? "Needs Factory" : "Needs Staff"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy") : "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>{order.totalItems || 0}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(order.id)}>
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No orders found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

