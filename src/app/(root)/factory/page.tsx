'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFactoryDashboardQuery } from '@/graphql/generated/graphql';
import { formatDate, formatPrice } from '@/lib/utils';
import {
  AlertTriangle,
  Clock,
  DollarSign,
  Hammer,
  Package,
} from 'lucide-react';

export default function FactoryDashboard() {
  const { data, loading } = useFactoryDashboardQuery();
  const dashboard = data?.factoryDashboard;

  return (
    <DashboardShell
      title="Factory Dashboard"
      subtitle="Monitor production and order status"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              {loading ? 'Loading...' : dashboard?.pendingOrders || 0}
            </div>
            <p className="text-muted-foreground text-xs">Awaiting production</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Production</CardTitle>
            <Hammer className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? 'Loading...' : dashboard?.inProductionOrders || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Currently being manufactured
            </p>
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

      <div className="mt-4 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
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
                ) : dashboard?.recentOrders?.length ? (
                  dashboard.recentOrders.map(order => (
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
                  <TableHead>Issue Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : dashboard?.qualityIssues?.length ? (
                  dashboard.qualityIssues.map(issue => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">
                        {issue.id.substring(0, 8)}
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
                    <TableCell colSpan={4} className="text-center">
                      No quality issues reported
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
          <CardHeader>
            <CardTitle>Production Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-4 text-center">Loading...</div>
            ) : dashboard?.productionProgress?.length ? (
              <div className="space-y-8">
                {dashboard.productionProgress.map(order => {
                  const latestReport =
                    order.progressReports?.[order.progressReports.length - 1];
                  const progress = latestReport
                    ? calculateProgress(latestReport)
                    : 0;

                  return (
                    <div key={order.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">
                            Order #{order.id.substring(0, 8)}
                          </h4>
                          <p className="text-muted-foreground text-xs">
                            Customer:{' '}
                            {order.customerOrder?.customer?.name || 'N/A'}
                          </p>
                        </div>
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-muted-foreground flex justify-between text-xs">
                        <span>Progress: {progress}%</span>
                        {latestReport?.estimatedCompletion && (
                          <span>
                            Est. Completion:{' '}
                            {formatDate(latestReport.estimatedCompletion)}
                          </span>
                        )}
                      </div>
                      {latestReport?.notes && (
                        <p className="border-muted mt-1 border-l-2 pl-2 text-xs italic">
                          "{latestReport.notes}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-4 text-center">No production in progress</div>
            )}
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

function calculateProgress(report: any): number {
  // This is a simplified calculation - in a real app, you'd need more context
  // about total quantity expected vs completed
  return Math.min(Math.round(report.completedQty * 10), 100);
}
