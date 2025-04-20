'use client';

import { useParams } from 'next/navigation';
import {
  BriefcaseIcon,
  ClipboardIcon,
  ClockIcon,
  UserIcon,
  BuildingIcon,
  BadgeCheckIcon,
  CalendarIcon,
  PhoneIcon,
  MailIcon,
  ChevronRightIcon,
} from 'lucide-react';

import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Fake staff data
const staffMember = {
  id: '123456',
  name: 'Emma Johnson',
  role: 'Senior Production Specialist',
  email: 'emma.johnson@example.com',
  phone: '+1 (555) 123-4567',
  joinDate: '2021-05-12',
  imageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
  status: 'Active',
  factory: {
    id: 'F1001',
    name: 'Shanghai Plant',
    department: 'Production Line B',
    manager: 'Liu Wei',
  },
  stats: {
    completedTasks: 187,
    activeTasks: 4,
    efficiency: 94,
    attendance: 98,
  },
  performance: {
    lastMonth: 92,
    lastWeek: 96,
    currentWeek: 94,
  },
};

// Fake task data
const activeTasks = [
  {
    id: 'T1001',
    title: 'Quality Inspection - Batch #45892',
    priority: 'High',
    status: 'In Progress',
    deadline: '2023-06-15',
    progress: 75,
  },
  {
    id: 'T1002',
    title: 'Machine Maintenance - Unit #12',
    priority: 'Medium',
    status: 'Pending',
    deadline: '2023-06-18',
    progress: 20,
  },
  {
    id: 'T1003',
    title: 'Material Inventory Check',
    priority: 'Low',
    status: 'In Progress',
    deadline: '2023-06-20',
    progress: 45,
  },
  {
    id: 'T1004',
    title: 'New Staff Training',
    priority: 'Medium',
    status: 'Not Started',
    deadline: '2023-06-22',
    progress: 0,
  },
];

// Fake task history
const taskHistory = [
  {
    id: 'T0987',
    title: 'Product Assembly - Model X35',
    completedDate: '2023-06-05',
    rating: 'Excellent',
    notes: 'Completed ahead of schedule with zero defects',
  },
  {
    id: 'T0986',
    title: 'Equipment Testing - Line 5',
    completedDate: '2023-06-02',
    rating: 'Good',
    notes: 'Minor delays due to equipment calibration issues',
  },
  {
    id: 'T0985',
    title: 'Safety Protocol Audit',
    completedDate: '2023-05-28',
    rating: 'Excellent',
    notes: 'Comprehensive audit with detailed documentation',
  },
  {
    id: 'T0984',
    title: 'Inventory Reconciliation',
    completedDate: '2023-05-25',
    rating: 'Satisfactory',
    notes: 'Some discrepancies found and resolved',
  },
  {
    id: 'T0983',
    title: 'Production Planning Meeting',
    completedDate: '2023-05-20',
    rating: 'Good',
    notes: 'Contributed valuable insights to Q3 planning',
  },
];

export default function StaffDetailPage() {
  const params = useParams();
  const staffId = params.id as string;

  // In a real app, you would fetch the staff data using the ID
  // const { data, loading, error } = useGetStaffByIdQuery({ variables: { id: staffId } });

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <DashboardShell
      title={`Staff Profile: ${staffMember.name}`}
      subtitle="View staff details, tasks, and performance metrics"
    >
      {/* Staff Overview Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Staff Information</CardTitle>
            <CardDescription>Personal and contact details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pb-2 text-center">
            <Avatar className="mb-4 h-24 w-24">
              <AvatarImage src={staffMember.imageUrl} alt={staffMember.name} />
              <AvatarFallback className="text-lg">
                {staffMember.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{staffMember.name}</h3>
            <p className="text-muted-foreground">{staffMember.role}</p>
            <Badge
              className="mt-2"
              variant={
                staffMember.status === 'Active' ? 'default' : 'secondary'
              }
            >
              {staffMember.status}
            </Badge>

            <div className="mt-4 w-full space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MailIcon className="text-muted-foreground h-4 w-4" />
                <span>{staffMember.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PhoneIcon className="text-muted-foreground h-4 w-4" />
                <span>{staffMember.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="text-muted-foreground h-4 w-4" />
                <span>Joined {formatDate(staffMember.joinDate)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Staff performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard
                title="Completed Tasks"
                value={staffMember.stats.completedTasks.toString()}
                change="+12"
                changeType="positive"
                icon={<BadgeCheckIcon className="h-5 w-5" />}
              />
              <StatCard
                title="Active Tasks"
                value={staffMember.stats.activeTasks.toString()}
                change="+1"
                changeType="positive"
                icon={<ClipboardIcon className="h-5 w-5" />}
              />
              <StatCard
                title="Efficiency"
                value={`${staffMember.stats.efficiency}%`}
                change="+2%"
                changeType="positive"
                icon={<ClockIcon className="h-5 w-5" />}
              />
              <StatCard
                title="Attendance"
                value={`${staffMember.stats.attendance}%`}
                change="-1%"
                changeType="negative"
                icon={<UserIcon className="h-5 w-5" />}
              />
            </div>

            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold">Performance Trend</h4>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Current Week</span>
                    <span>{staffMember.performance.currentWeek}%</span>
                  </div>
                  <Progress value={staffMember.performance.currentWeek} />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Last Week</span>
                    <span>{staffMember.performance.lastWeek}%</span>
                  </div>
                  <Progress value={staffMember.performance.lastWeek} />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Last Month</span>
                    <span>{staffMember.performance.lastMonth}%</span>
                  </div>
                  <Progress value={staffMember.performance.lastMonth} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Factory Assignment */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Factory Assignment</CardTitle>
          <CardDescription>Current workplace information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-3">
                <BuildingIcon className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">{staffMember.factory.name}</h3>
                <p className="text-muted-foreground text-sm">
                  Factory ID: {staffMember.factory.id}
                </p>
              </div>
            </div>
            <div className="md:ml-12">
              <p className="text-sm">
                <span className="font-medium">Department:</span>{' '}
                {staffMember.factory.department}
              </p>
              <p className="text-sm">
                <span className="font-medium">Manager:</span>{' '}
                {staffMember.factory.manager}
              </p>
            </div>
            <div className="md:ml-auto">
              <Button variant="outline" size="sm">
                View Factory
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks and History */}
      <Tabs defaultValue="active-tasks" className="mt-6">
        <TabsList>
          <TabsTrigger value="active-tasks">Active Tasks</TabsTrigger>
          <TabsTrigger value="task-history">Task History</TabsTrigger>
        </TabsList>

        <TabsContent value="active-tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
              <CardDescription>
                Currently assigned tasks and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeTasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            task.priority === 'High'
                              ? 'destructive'
                              : task.priority === 'Medium'
                                ? 'default'
                                : 'outline'
                          }
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            task.status === 'In Progress'
                              ? 'default'
                              : task.status === 'Pending'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(task.deadline)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={task.progress}
                            className="h-2 w-24"
                          />
                          <span className="text-xs">{task.progress}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task-history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Task History</CardTitle>
              <CardDescription>
                Previously completed tasks and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Completed Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskHistory.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{formatDate(task.completedDate)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            task.rating === 'Excellent'
                              ? 'default'
                              : task.rating === 'Good'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {task.rating}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="max-w-xs truncate"
                        title={task.notes}
                      >
                        {task.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Full History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
