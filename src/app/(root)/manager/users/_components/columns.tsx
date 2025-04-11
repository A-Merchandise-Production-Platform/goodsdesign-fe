import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowRightIcon,
  ArrowUpDown,
  EyeIcon,
  MoreHorizontal,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  GetUsersQuery,
  Roles,
  useDeleteUserMutation,
} from '@/graphql/generated/graphql';
import Link from 'next/link';

export type User = GetUsersQuery['users'][number];

function UserActions({ user }: { user: User }) {
  const [deleteUser] = useDeleteUserMutation({
    variables: {
      deleteUserId: user.id,
    },
    refetchQueries: ['GetUsers'],
    onCompleted: () => {
      toast.success('User deleted successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to delete user');
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(user.id)}
        >
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit user</DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-destructive"
              onSelect={e => e.preventDefault()}
            >
              Delete user
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete{' '}
                {user.name || 'this user'} and remove their data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => deleteUser()}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<User>[] = [
  //   {
  //     id: 'select',
  //     header: ({ table }) => (
  //       <div className="flex items-center space-x-2">
  //         <input
  //           type="checkbox"
  //           className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
  //           checked={
  //             table.getIsAllPageRowsSelected() ||
  //             (table.getIsSomePageRowsSelected() && 'indeterminate')
  //           }
  //           onChange={e => table.toggleAllPageRowsSelected(!!e.target.checked)}
  //           aria-label="Select all"
  //         />
  //       </div>
  //     ),
  //     cell: ({ row }) => (
  //       <div className="flex items-center space-x-2">
  //         <input
  //           type="checkbox"
  //           className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
  //           checked={row.getIsSelected()}
  //           onChange={e => row.toggleSelected(!!e.target.checked)}
  //           aria-label="Select row"
  //         />
  //       </div>
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original;
      const getInitials = () => {
        if (!user.name) return 'U';
        const nameParts = user.name.split(' ');
        if (nameParts.length > 1) {
          return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
        }
        return user.name.charAt(0).toUpperCase();
      };

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.imageUrl ?? undefined}
              alt={user.name || 'User'}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name || 'Unnamed User'}</span>
            <span className="text-muted-foreground text-xs">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge
          variant={role === 'ADMIN' ? 'default' : 'outline'}
          className="text-xs"
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <Badge variant={isActive ? 'default' : 'secondary'} className="text-xs">
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => {
      const phoneNumber = row.getValue('phoneNumber') as string | null;
      return <span>{phoneNumber || '—'}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string | null;
      const formatted = createdAt
        ? new Date(createdAt).toLocaleDateString()
        : '—';
      return <span>{formatted}</span>;
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     return <UserActions user={row.original} />;
  //   },
  // },
  {
    id: 'view-details',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link
          href={getUserLinkHrefByRole(user.role, user.id)}
          className="text-blue-500 hover:underline"
        >
          View details
        </Link>
      );
    },
  },
];

const getUserLinkHrefByRole = (role: Roles, id: string) => {
  switch (role) {
    case Roles.Factoryowner:
      return `/manager/factory/${id}`;
    case Roles.Staff:
      return `/manager/users/staff/${id}`;
    case Roles.Customer:
      return `/manager/users/customer/${id}`;
    default:
      return '';
  }
};
