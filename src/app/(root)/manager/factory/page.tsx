'use client';

import { format } from 'date-fns';
import {
  Building2Icon,
  Calendar,
  CheckCircle2Icon,
  MapPin,
  Users,
  XCircleIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DashboardShell } from '@/components/dashboard-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FactoryStatus,
  useGetFactoriesQuery,
} from '@/graphql/generated/graphql';
import { StatCard } from '@/components/stat-card';
import { calculateChange } from '@/lib/calculate-change';

export default function Page() {
  const { data, loading, error } = useGetFactoriesQuery();

  if (loading) {
    return (
      <DashboardShell
        title="Factory Management"
        subtitle="View and manage all factories"
      >
        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="bg-muted h-4 w-24 rounded"></div>
                    <div className="bg-muted mt-2 h-8 w-16 rounded"></div>
                  </div>
                  <div className="bg-muted h-10 w-10 rounded-full"></div>
                </div>
                <div className="mt-4">
                  <div className="bg-muted h-4 w-20 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-muted h-24"></CardHeader>
              <CardContent className="mt-2 space-y-2">
                <div className="bg-muted h-4 w-3/4 rounded"></div>
                <div className="bg-muted h-4 w-1/2 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell
        title="Factory Management"
        subtitle="View and manage all factories"
      >
        <div className="text-destructive p-4">Error: {error.message}</div>
      </DashboardShell>
    );
  }

  const factories = data?.getAllFactories || [];
  const activeFactories = factories.filter(
    factory => factory.factoryStatus?.toString() === FactoryStatus.Approved,
  );
  const pendingFactories = factories.filter(
    factory =>
      factory.factoryStatus?.toString() === FactoryStatus.PendingApproval &&
      factory.isSubmitted,
  );
  const rejectedFactories = factories.filter(
    factory => factory.factoryStatus?.toString() === FactoryStatus.Rejected,
  );

  // Calculate statistics
  const totalFactories = factories.length;
  const activeCount = activeFactories.length;
  const pendingCount = pendingFactories.length;
  const rejectedCount = rejectedFactories.length;

  // Calculate changes from last month (using sample data for now)
  const lastMonthTotal = Math.floor(totalFactories * 0.9); // 10% decrease
  const lastMonthActive = Math.floor(activeCount * 0.95); // 5% decrease
  const lastMonthPending = Math.floor(pendingCount * 1.2); // 20% increase
  const lastMonthRejected = Math.floor(rejectedCount * 0.8); // 20% decrease

  // Calculate changes
  const totalChange = calculateChange(totalFactories, lastMonthTotal);
  const activeChange = calculateChange(activeCount, lastMonthActive);
  const pendingChange = calculateChange(pendingCount, lastMonthPending);
  const rejectedChange = calculateChange(rejectedCount, lastMonthRejected);

  const renderFactoryGrid = (factoryList: typeof factories) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {factoryList.map((factory, index) => {
        return (
          <Card key={index} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{factory.name}</CardTitle>
                <Badge variant={getStatusVariant(factory.factoryStatus)}>
                  {factory.factoryStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              {factory.description && (
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {factory.description}
                </p>
              )}
              <div className="flex items-center text-sm">
                <MapPin className="text-muted-foreground mr-1 h-4 w-4" />
                <span className="line-clamp-2">{factory.formattedAddress}</span>
              </div>
              {factory.totalEmployees && (
                <div className="flex items-center text-sm">
                  <Users className="text-muted-foreground mr-1 h-4 w-4" />
                  <span>{factory.totalEmployees} employees</span>
                </div>
              )}
              {factory.establishedDate && (
                <div className="flex items-center text-sm">
                  <Calendar className="text-muted-foreground mr-1 h-4 w-4" />
                  <span>
                    Est. {format(new Date(factory.establishedDate), 'MMM yyyy')}
                  </span>
                </div>
              )}
              {factory.specializations &&
                factory.specializations.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {factory.specializations.slice(0, 3).map((spec, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {factory.specializations.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{factory.specializations.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
            </CardContent>
            <CardFooter>
              <Link
                href={`/manager/factory/${factory.factoryOwnerId}`}
                className="w-full"
              >
                <Button variant="secondary" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}

      {factoryList.length === 0 && (
        <div className="col-span-full p-8 text-center">
          <h3 className="mt-2 text-lg font-semibold">No Factories Found</h3>
          <p className="text-muted-foreground">
            There are no factories in this category.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <DashboardShell
      title="Factory Management"
      subtitle="View and manage all factories"
    >
      {/* Stats Overview */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Factories"
          value={totalFactories.toString()}
          change={totalChange.change}
          changeType={totalChange.type}
          icon={<Building2Icon className="h-5 w-5" />}
        />
        <StatCard
          title="Active Factories"
          value={activeCount.toString()}
          change={activeChange.change}
          changeType={activeChange.type}
          icon={<CheckCircle2Icon className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Approval"
          value={pendingCount.toString()}
          change={pendingChange.change}
          changeType={pendingChange.type}
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatCard
          title="Rejected"
          value={rejectedCount.toString()}
          change={rejectedChange.change}
          changeType={rejectedChange.type}
          icon={<XCircleIcon className="h-5 w-5" />}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="">
          <TabsTrigger value="all">Active Factories</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderFactoryGrid(activeFactories)}
        </TabsContent>
        <TabsContent value="pending">
          {renderFactoryGrid(pendingFactories)}
        </TabsContent>
        <TabsContent value="rejected">
          {renderFactoryGrid(rejectedFactories)}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

// Helper function to determine badge variant based on status
function getStatusVariant(
  status: string | null | undefined,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (!status) return 'default';

  const statusMap: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
  > = {
    PENDING: 'default',
    ACTIVE: 'secondary',
    INACTIVE: 'secondary',
    REJECTED: 'destructive',
    UNDER_REVIEW: 'outline',
  };

  return statusMap[status] || 'default';
}
