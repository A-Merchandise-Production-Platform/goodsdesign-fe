'use client';

import { ArrowLeft, Factory, Loader2, Truck, Users } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  FactoryStatus,
  useChangeFactoryStatusMutation,
  useGetAvailableStaffForFactoryQuery,
  useGetFactoryByIdQuery,
  useGetFactoryDetailDashboardQuery,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

import {
  FactoryContactsTab,
  FactoryOrdersTab,
  FactoryOverviewTab,
  FactoryProductionTab,
  FactorySettingsTab,
  FactoryStaffTab,
} from './components';

// Factory detail page skeleton component
function FactoryDetailSkeleton() {
  return (
    <DashboardShell
      title="Factory Details"
      subtitle="Loading factory details..."
    >
      {/* Stats cards skeleton */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="mt-4">
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Tabs skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i}>
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i}>
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function FactoryDetailPage() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const { data: factoriesData, loading: factoryLoading } =
    useGetFactoryByIdQuery({
      variables: {
        factoryId: id,
      },
    });

  const { data: staffs } = useGetAvailableStaffForFactoryQuery();
  const [changeFactoryStatus, { loading }] = useChangeFactoryStatusMutation({
    onCompleted: () => {
      toast.success('Factory status updated successfully');
      router.push('/manager/factory');
    },
    onError: () => {
      toast.error('Failed to update factory status');
    },
    refetchQueries: ['GetFactories'],
  });
  const { data: dashboardData, loading: dashboardLoading } =
    useGetFactoryDetailDashboardQuery({
      variables: {
        factoryId: id,
      },
    });

  const factory = factoriesData?.getFactoryById;

  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [isStaffSelected, setIsStaffSelected] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    'approve' | 'reject' | null
  >(null);

  useEffect(() => {
    if (selectedStaffId) {
      setIsStaffSelected(true);
    } else {
      setIsStaffSelected(false);
    }
  }, [selectedStaffId]);

  const handleApproveFactory = () => {
    setPendingAction('approve');
    setIsDialogOpen(true);
  };

  const handleRejectFactory = () => {
    setPendingAction('reject');
    setIsDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (!pendingAction) return;

    changeFactoryStatus({
      variables: {
        data: {
          status:
            pendingAction === 'approve'
              ? FactoryStatus.Approved
              : FactoryStatus.Rejected,
          factoryOwnerId: factory?.owner?.id || '',
          staffId: pendingAction === 'approve' ? selectedStaffId : '',
          statusNote: statusNote,
        },
      },
    });
    setIsDialogOpen(false);
    setStatusNote('');
    setPendingAction(null);
  };

  // Show skeleton loading state when factory data is loading
  if (factoryLoading) {
    return <FactoryDetailSkeleton />;
  }

  if (!factory) {
    return (
      <DashboardShell
        title="Factory Not Found"
        subtitle="The factory you're looking for doesn't exist"
      >
        <Button
          variant="outline"
          className="w-fit"
          onClick={() => router.push('/manager/factory')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Factory List
        </Button>
      </DashboardShell>
    );
  }
  return (
    <DashboardShell title={factory.name} subtitle="Factory Details">
      {dashboardLoading ? (
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed p-8">
          <Loader2 className="text-muted-foreground mr-2 h-5 w-5 animate-spin" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Orders"
              value={dashboardData?.getFactoryDetailDashboard.totalOrders || 0}
              change={Math.round(
                (((dashboardData?.getFactoryDetailDashboard.totalOrders || 0) -
                  (dashboardData?.getFactoryDetailDashboard
                    .lastMonthTotalOrders || 0)) /
                  Math.max(
                    dashboardData?.getFactoryDetailDashboard
                      .lastMonthTotalOrders || 1,
                    1,
                  )) *
                  100,
              )}
              changeType={
                (dashboardData?.getFactoryDetailDashboard.totalOrders || 0) >=
                (dashboardData?.getFactoryDetailDashboard
                  .lastMonthTotalOrders || 0)
                  ? 'positive'
                  : 'negative'
              }
              icon={<Factory className="h-4 w-4" />}
            />
            <StatCard
              title="Pending Orders"
              value={
                dashboardData?.getFactoryDetailDashboard.pendingOrders || 0
              }
              change={Math.round(
                (((dashboardData?.getFactoryDetailDashboard.pendingOrders ||
                  0) -
                  (dashboardData?.getFactoryDetailDashboard
                    .lastMonthPendingOrders || 0)) /
                  Math.max(
                    dashboardData?.getFactoryDetailDashboard
                      .lastMonthPendingOrders || 1,
                    1,
                  )) *
                  100,
              )}
              changeType={
                (dashboardData?.getFactoryDetailDashboard.pendingOrders || 0) <
                (dashboardData?.getFactoryDetailDashboard
                  .lastMonthPendingOrders || 0)
                  ? 'positive'
                  : 'negative'
              }
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard
              title="Total Revenue"
              value={dashboardData?.getFactoryDetailDashboard.totalRevenue || 0}
              change={Math.round(
                (((dashboardData?.getFactoryDetailDashboard.totalRevenue || 0) -
                  (dashboardData?.getFactoryDetailDashboard
                    .lastMonthTotalRevenue || 0)) /
                  Math.max(
                    dashboardData?.getFactoryDetailDashboard
                      .lastMonthTotalRevenue || 1,
                    1,
                  )) *
                  100,
              )}
              changeType={
                (dashboardData?.getFactoryDetailDashboard.totalRevenue || 0) >=
                (dashboardData?.getFactoryDetailDashboard
                  .lastMonthTotalRevenue || 0)
                  ? 'positive'
                  : 'negative'
              }
              icon={<Truck className="h-4 w-4" />}
            />
            <StatCard
              title="In Production"
              value={
                dashboardData?.getFactoryDetailDashboard.inProductionOrders || 0
              }
              change={Math.round(
                (((dashboardData?.getFactoryDetailDashboard
                  .inProductionOrders || 0) -
                  (dashboardData?.getFactoryDetailDashboard
                    .lastMonthInProductionOrders || 0)) /
                  Math.max(
                    dashboardData?.getFactoryDetailDashboard
                      .lastMonthInProductionOrders || 1,
                    1,
                  )) *
                  100,
              )}
              changeType={
                (dashboardData?.getFactoryDetailDashboard.inProductionOrders ||
                  0) >=
                (dashboardData?.getFactoryDetailDashboard
                  .lastMonthInProductionOrders || 0)
                  ? 'positive'
                  : 'negative'
              }
              icon={<Factory className="h-4 w-4" />}
            />
          </div>
        </>
      )}

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger className="px-4" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="px-4" value="production">
            Production Capacity
          </TabsTrigger>
          <TabsTrigger className="px-4" value="contacts">
            Contacts
          </TabsTrigger>
          <TabsTrigger className="px-4" value="orders">
            Orders
          </TabsTrigger>
          <TabsTrigger className="px-4" value="staff">
            Staff
          </TabsTrigger>
          {factory.factoryStatus !== FactoryStatus.PendingApproval ? (
            <TabsTrigger className="px-4" value="setting">
              Setting
            </TabsTrigger>
          ) : null}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <FactoryOverviewTab factory={factory} />
        </TabsContent>

        <TabsContent value="production" className="space-y-6">
          <FactoryProductionTab factory={factory} />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <FactoryContactsTab factory={factory} />
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <FactoryOrdersTab factoryId={id} />
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <FactoryStaffTab
            factory={factory}
            staffs={staffs}
            selectedStaffId={selectedStaffId}
            setSelectedStaffId={setSelectedStaffId}
          />
        </TabsContent>

        <TabsContent value="setting" className="space-y-6">
          <FactorySettingsTab factory={factory} />
        </TabsContent>
      </Tabs>
      {factory.factoryStatus === FactoryStatus.PendingApproval ? (
        <>
          <div className="text-muted-foreground mt-4 text-sm">
            Assign Staff for this factory before approving.
          </div>
          <div className="mt-4 flex w-full items-center gap-4">
            <Button
              variant="destructive"
              className="flex-1"
              disabled={loading}
              onClick={handleRejectFactory}
            >
              Reject Factory
            </Button>
            <Button
              className="flex-1"
              disabled={!isStaffSelected || loading}
              onClick={handleApproveFactory}
            >
              Approve Factory
            </Button>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {pendingAction === 'approve'
                    ? 'Approve Factory'
                    : 'Reject Factory'}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Textarea
                  placeholder="Enter status note..."
                  value={statusNote}
                  onChange={e => setStatusNote(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setStatusNote('');
                    setPendingAction(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={
                    pendingAction === 'approve' ? 'default' : 'destructive'
                  }
                  onClick={handleConfirmAction}
                  disabled={loading}
                >
                  {pendingAction === 'approve' ? 'Approve' : 'Reject'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </DashboardShell>
  );
}
