"use client"

import { useGetMyStaffTasksQuery } from "@/graphql/generated/graphql"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarClock, Clock, ExternalLink, AlertTriangle, Search, Filter, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MyStaffTasksPage() {
  const { data, loading } = useGetMyStaffTasksQuery()
  const allTasks = data?.myStaffTasks || []

  // Search, filter, and sort state
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [sortBy, setSortBy] = useState("assignedDate")
  const [sortOrder, setSortOrder] = useState("desc")

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...allTasks]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (task) =>
          task.task.taskname.toLowerCase().includes(query) ||
          (task.task.description && task.task.description.toLowerCase().includes(query)),
      )
    }

    // Apply status filter
    if (statusFilter !== "ALL") {
      result = result.filter((task) => task.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB

      switch (sortBy) {
        case "taskname":
          valueA = a.task.taskname.toLowerCase()
          valueB = b.task.taskname.toLowerCase()
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        case "assignedDate":
          valueA = new Date(a.assignedDate).getTime()
          valueB = new Date(b.assignedDate).getTime()
          break
        case "deadline":
          valueA = a.task.expiredTime ? new Date(a.task.expiredTime).getTime() : Number.POSITIVE_INFINITY
          valueB = b.task.expiredTime ? new Date(b.task.expiredTime).getTime() : Number.POSITIVE_INFINITY
          break
        default:
          valueA = a.task.taskname.toLowerCase()
          valueB = b.task.taskname.toLowerCase()
      }

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1
      } else {
        return valueA < valueB ? 1 : -1
      }
    })

    return result
  }, [allTasks, searchQuery, statusFilter, sortBy, sortOrder])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "COMPLETED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "PARTIAL_APPROVED":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Partial Approved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const isExpired = (expiredTime: string) => {
    if (!expiredTime) return false
    return new Date(expiredTime) < new Date()
  }

  // Get unique statuses for filter dropdown
  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(allTasks.map((task) => task.status))
    return Array.from(statuses)
  }, [allTasks])

  const handleSort = (field: string) => {
    if (sortBy === field) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new sort field and default to descending
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Staff Tasks</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter by Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleSort("taskname")}>
                      Task Name {sortBy === "taskname" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("status")}>
                      Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("assignedDate")}>
                      Assigned Date {sortBy === "assignedDate" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("deadline")}>
                      Deadline {sortBy === "deadline" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery || statusFilter !== "ALL"
                ? "No tasks match your search criteria."
                : "No tasks assigned to you at the moment."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("taskname")}>
                      <div className="flex items-center gap-1">
                        Task Name
                        {sortBy === "taskname" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                      <div className="flex items-center gap-1">
                        Status
                        {sortBy === "status" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("assignedDate")}>
                      <div className="flex items-center gap-1">
                        Assigned Date
                        {sortBy === "assignedDate" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("deadline")}>
                      <div className="flex items-center gap-1">
                        Deadline
                        {sortBy === "deadline" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((staffTask) => (
                    <TableRow key={staffTask.id}>
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div>{staffTask.task.taskname}</div>
                          <div className="text-sm text-muted-foreground">{staffTask.task.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(staffTask.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarClock className="h-4 w-4 text-muted-foreground" />
                          {formatDate(staffTask.assignedDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`flex items-center gap-1 text-sm ${isExpired(staffTask.task.expiredTime) ? "text-red-500" : ""}`}
                        >
                          {isExpired(staffTask.task.expiredTime) ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                          {formatDate(staffTask.task.expiredTime)}
                          {isExpired(staffTask.task.expiredTime) && (
                            <span className="text-xs font-medium ml-1">(Expired)</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link
                            href={`/staff/tasks/${staffTask.id}`}
                          >
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {filteredTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredTasks.map((staffTask) => {
                const checkQuality = staffTask.task.checkQualities?.[0]
                const factoryOrderDetail = checkQuality?.factoryOrderDetail

                return (
                  <div key={staffTask.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{staffTask.task.taskname}</h3>
                        <p className="text-muted-foreground">{staffTask.task.description}</p>
                      </div>
                      {getStatusBadge(staffTask.status)}
                    </div>

                    {checkQuality && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
                        <div>
                          <h4 className="font-medium mb-2">Quality Check Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span>{getStatusBadge(checkQuality.status)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Checked By:</span>
                              <span>{checkQuality.checkedBy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Checked At:</span>
                              <span>{formatDate(checkQuality.checkedAt)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Checked:</span>
                              <span>{checkQuality.totalChecked}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Passed:</span>
                              <span className="text-green-600">{checkQuality.passedQuantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Failed:</span>
                              <span className="text-red-600">{checkQuality.failedQuantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rework Required:</span>
                              <span>{checkQuality.reworkRequired ? "Yes" : "No"}</span>
                            </div>
                            {checkQuality.note && (
                              <div className="pt-2">
                                <span className="text-muted-foreground">Note:</span>
                                <p className="mt-1 p-2 bg-muted rounded-md">{checkQuality.note}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {factoryOrderDetail && (
                          <div>
                            <h4 className="font-medium mb-2">Order Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Order Status:</span>
                                <span>{getStatusBadge(factoryOrderDetail.status)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Quantity:</span>
                                <span>{factoryOrderDetail.quantity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Production Cost:</span>
                                <span>{new Intl.NumberFormat("en-US").format(factoryOrderDetail.productionCost)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Price:</span>
                                <span>{new Intl.NumberFormat("en-US").format(factoryOrderDetail.price)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Factory Order:</span>
                                <span>{factoryOrderDetail.factoryOrderId}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Estimated Completion:</span>
                                <span>{formatDate(factoryOrderDetail.factoryOrder.estimatedCompletionDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Delayed:</span>
                                <span>{factoryOrderDetail.factoryOrder.isDelayed ? "Yes" : "No"}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <Link href={`/staff/tasks/${staffTask.id}`}>
                        <Button>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Order Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

