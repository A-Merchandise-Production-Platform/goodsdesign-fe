'use client';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoleBadge } from '@/components/ui/role-badge';
import { GraphQlUser } from '@/graphql/generated';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import UpdateUserForm from './update-user-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { UserApi } from '@/api/user';
import { toast } from 'sonner';

interface ColumnsProps {
  refetch: () => Promise<any>;
}

export const columns = ({
  refetch,
}: ColumnsProps): ColumnDef<Partial<GraphQlUser>>[] => [
  {
    id: 'no',
    header: 'No',
    cell: ({ row, table }) => {
      const pageIndex = table.options.state?.pagination?.pageIndex ?? 0;
      const pageSize = table.options.state?.pagination?.pageSize ?? 10;
      return (
        <p className="text-muted-foreground text-sm">
          {pageIndex * pageSize + row.index + 1}
        </p>
      );
    },
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <Image
          src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${row.original.name}`}
          alt={row.original.name ?? ''}
          width={40}
          height={40}
          className="rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => {
      return <p>{row.original.phoneNumber ?? 'N/A'}</p>;
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return <RoleBadge role={row.original.role!} outline />;
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original.isActive ? 'outline-success' : 'outline-warning'
          }
        >
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return <p>{format(row.original.createdAt, 'dd/MM/yyyy HH:mm')}</p>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      return <p>{format(row.original.updatedAt, 'dd/MM/yyyy HH:mm')}</p>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const [editOpen, setEditOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const queryClient = useQueryClient();

      const deleteMutation = useMutation({
        mutationFn: () => UserApi.deleteUser(user.id!),
        onSuccess: () => {
          toast.success('User deleted successfully');
          refetch();
          setDeleteOpen(false);
        },
        onError: () => {
          toast.error('Failed to delete user');
        },
      });

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border">
              <DropdownMenuLabel className="text-muted-foreground text-sm">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                Edit user
              </DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setDeleteOpen(true)}
                className="text-destructive"
              >
                Delete user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent hideCloseButton>
              <DialogHeader>
                <DialogTitle>Update User</DialogTitle>
                <DialogDescription>
                  Update user information in your application.
                </DialogDescription>
              </DialogHeader>
              <UpdateUserForm
                user={user as GraphQlUser}
                onSuccess={() => {
                  refetch();
                  setEditOpen(false);
                }}
                onClose={() => setEditOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                  isLoading={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
