'use client';

import {
  BadgeCheckIcon,
  BuildingIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ClipboardIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react';
import { useParams } from 'next/navigation';

import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetStaffDashboardQuery } from '@/graphql/generated/graphql';

export default function StaffDetailPage() {
  const params = useParams();
  const staffId = params.id as string;

  const { data, loading } = useGetStaffDashboardQuery({
    variables: {
      userId: staffId,
    },
  });

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <DashboardShell title="Loading..." subtitle="Staff details and tasks">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Skeleton className="h-[300px] w-full" />
          <div className="space-y-6 md:col-span-3">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </DashboardShell>
    );
  }

  const staffMember = data?.user;
  const dashboardData = data?.getStaffDashboard;

  if (!staffMember || !dashboardData) {
    return (
      <DashboardShell title="Error" subtitle="Could not load staff data">
        <Card>
          <CardContent className="pt-6">
            <p>Staff information unavailable. Please try again later.</p>
          </CardContent>
        </Card>
      </DashboardShell>
    );
  }

  // Get staff name or use fallback
  const staffName = staffMember.name || 'Unknown Staff';

  // Create initials for avatar fallback
  const initials = staffName
    .split(' ')
    .map(n => n[0])
    .join('');

  // Format gender for display
  const formatGender = (gender: string | null | undefined) => {
    if (!gender) return 'Not specified';
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  };

  console.log(staffMember.staffedFactory);

  return (
    <DashboardShell
      title={`Staff: ${staffName}`}
      subtitle="Staff details and tasks"
    >
      {/* Staff Overview Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Staff Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={staffMember.imageUrl || ''} alt={staffName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{staffName}</CardTitle>
                <CardDescription>{staffMember.role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant={staffMember.isActive ? 'default' : 'secondary'}>
              {staffMember.isActive ? 'Active' : 'Inactive'}
            </Badge>

            <div className="space-y-2 pt-2">
              {/* Contact info is based on the fields in the actual data */}
              <div className="flex items-center gap-2 text-sm">
                <MailIcon className="text-muted-foreground h-4 w-4" />
                <span>{staffMember.email || 'No email'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PhoneIcon className="text-muted-foreground h-4 w-4" />
                <span>{staffMember.phoneNumber || 'No phone number'}</span>
              </div>
              {staffMember.gender && typeof staffMember.gender === 'string' && (
                <div className="flex items-center gap-2 text-sm">
                  <UserIcon className="text-muted-foreground h-4 w-4" />
                  <span>{formatGender(staffMember.gender)}</span>
                </div>
              )}
              {staffMember.dateOfBirth && (
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDaysIcon className="text-muted-foreground h-4 w-4" />
                  <span>Born: {formatDate(staffMember.dateOfBirth)}</span>
                </div>
              )}
              {staffMember.updatedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="text-muted-foreground h-4 w-4" />
                  <span>Last updated: {formatDate(staffMember.updatedAt)}</span>
                </div>
              )}
              {staffMember.staffedFactory && (
                <>
                  <Separator className="my-2" />
                  <div className="text-muted-foreground text-sm">Factory</div>
                  <div className="flex items-center gap-2 text-sm">
                    <BuildingIcon className="text-muted-foreground h-4 w-4" />
                    <div>
                      <div>{staffMember.staffedFactory.name}</div>
                      {staffMember.staffedFactory.address && (
                        <div className="text-muted-foreground text-xs">
                          {staffMember.staffedFactory.address.street ||
                            'No address'}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats and Tasks */}
        <div className="space-y-6 md:col-span-3">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Completed Tasks"
              value={dashboardData.completedTasks}
              change={dashboardData.lastMonthCompletedTasks}
              changeType={
                dashboardData.lastMonthCompletedTasks >= 0
                  ? 'positive'
                  : 'negative'
              }
              icon={<BadgeCheckIcon className="h-5 w-5" />}
            />
            <StatCard
              title="Active Tasks"
              value={dashboardData.totalActiveTasks}
              change={dashboardData.lastMonthActiveTasks}
              changeType={
                dashboardData.lastMonthActiveTasks >= 0
                  ? 'positive'
                  : 'negative'
              }
              icon={<ClipboardIcon className="h-5 w-5" />}
            />
          </div>

          {/* Tasks and History */}
          <Tabs defaultValue="active-tasks">
            <TabsList>
              <TabsTrigger value="active-tasks">Active Tasks</TabsTrigger>
              <TabsTrigger value="task-history">Task History</TabsTrigger>
            </TabsList>

            <TabsContent value="active-tasks">
              <Card>
                <CardContent>
                  {dashboardData.activeTasks.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Start Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.activeTasks.map(task => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <div className="font-medium">{task.taskname}</div>
                              <div className="text-muted-foreground text-xs">
                                {task.id}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  task.taskType === 'PRODUCTION'
                                    ? 'destructive'
                                    : task.taskType === 'QUALITY_CHECK'
                                      ? 'default'
                                      : 'outline'
                                }
                              >
                                {task.taskType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  task.status === 'IN_PROGRESS'
                                    ? 'default'
                                    : task.status === 'PENDING'
                                      ? 'secondary'
                                      : 'outline'
                                }
                              >
                                {task.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(task.startDate)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-muted-foreground py-4 text-center">
                      No active tasks found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="task-history">
              <Card>
                <CardContent>
                  {dashboardData.taskHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Completed</TableHead>
                          <TableHead>Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.taskHistory.map(task => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <div className="font-medium">{task.taskname}</div>
                              <div className="text-muted-foreground text-xs">
                                {task.id}
                              </div>
                            </TableCell>
                            <TableCell>
                              {task.completedDate
                                ? formatDate(task.completedDate)
                                : 'N/A'}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  task.taskType === 'PRODUCTION'
                                    ? 'default'
                                    : task.taskType === 'QUALITY_CHECK'
                                      ? 'secondary'
                                      : 'outline'
                                }
                              >
                                {task.taskType}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-muted-foreground py-4 text-center">
                      No task history found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  );
}
