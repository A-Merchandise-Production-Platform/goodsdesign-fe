'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { OrderStatusChart } from '@/components/order-status-chart';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useManagerDashboardQuery } from '@/graphql/generated/graphql';
import { formatPrice, formatDate } from '@/lib/utils';
import { AlertTriangle, Clock, DollarSign, Package } from 'lucide-react';

export default function ManagerDashboard() {
  const { data, loading } = useManagerDashboardQuery();
  const dashboard = data?.managerDashboard;

  return (
    <DashboardShell
      title="Manager Dashboard"
      subtitle="Monitor factory operations and quality control"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading
                ? 'Loading...'
                : formatPrice(dashboard?.totalRevenue || 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              From {dashboard?.totalOrders || 0} orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? 'Loading...' : dashboard?.pendingFactoryOrders || 0}
            </div>
            <p className="text-muted-foreground text-xs">Awaiting assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? 'Loading...' : dashboard?.totalOrders || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard?.factoryOrdersByStatus && (
              <OrderStatusChart data={dashboard.factoryOrdersByStatus} />
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Factory Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : dashboard?.recentFactoryOrders?.length ? (
                  dashboard.recentFactoryOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id.substring(0, 8)}
                      </TableCell>
                      <TableCell>
                        {order.customerOrder?.customer?.name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(order.totalProductionCost)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No recent orders
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Quality Issues</CardTitle>
            <AlertTriangle className="text-destructive ml-2 h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Factory</TableHead>
                  <TableHead>Issue Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : dashboard?.qualityIssues?.length ? (
                  dashboard.qualityIssues.map(issue => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">
                        {issue.id.substring(0, 8)}
                      </TableCell>
                      <TableCell>
                        {issue.factoryOrder?.factory?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{issue.issueType}</TableCell>
                      <TableCell>
                        <Badge variant={getIssueStatusVariant(issue.status)}>
                          {issue.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(issue.reportedAt)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No quality issues reported
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

function getStatusVariant(status: string) {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'default';
    case 'in_production':
      return 'secondary';
    case 'pending':
      return 'outline';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
}

function getIssueStatusVariant(status: string) {
  switch (status?.toLowerCase()) {
    case 'resolved':
      return 'default';
    case 'in_progress':
      return 'secondary';
    case 'open':
      return 'outline';
    case 'critical':
      return 'destructive';
    default:
      return 'outline';
  }
}
