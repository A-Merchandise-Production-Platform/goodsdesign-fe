/* eslint-disable unicorn/no-nested-ternary */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Check, Edit, MoreHorizontal, Trash2, X } from 'lucide-react';

import { User } from '@/api/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const userColumns: ColumnDef<User>[] = [
  {
    id: 'avatar',
    header: 'Avatar',
    accessorKey: 'imageUrl',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar className="size-">
          <AvatarImage src={user.imageUrl} alt={user.userName} />
          <AvatarFallback>
            {user.userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    id: 'userName',
    header: 'Username',
    accessorKey: 'userName',
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    cell: ({ row }) => (
      <div className="line-clamp-1 truncate text-sm text-muted-foreground">
        {row.original.email}
      </div>
    ),
  },
  {
    id: 'dateOfBirth',
    header: 'Date of Birth',
    accessorKey: 'dateOfBirth',
    cell: ({ row }) => {
      return (
        <p className="line-clamp-1 truncate">
          {row.original?.dateOfBirth
            ? format(new Date(row.original.dateOfBirth), 'dd MMM yyyy')
            : 'N/A'}
        </p>
      );
    },
  },

  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role.name',
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original.role?.name === 'admin'
              ? 'admin'
              : row.original.role?.name === 'manager'
                ? 'manager'
                : row.original.role?.name === 'staff'
                  ? 'staff'
                  : row.original.role?.name === 'factoryOwner'
                    ? 'factoryOwner'
                    : row.original.role?.name === 'customer'
                      ? 'customer'
                      : 'default'
          }
        >
          {row.original.role?.name.toUpperCase() || 'N/A'}
        </Badge>
      );
    },
  },
  {
    id: 'phoneNumber',
    header: 'Phone',
    accessorKey: 'phoneNumber',
    cell: ({ row }) => row.original.phoneNumber || 'N/A',
  },
  {
    id: 'lockout',
    header: 'Lockout',
    accessorKey: 'lockoutEnd',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge
              // variant={row.original.lockoutEnabled ? 'destructive' : 'outline'}
              className={cn(
                row.original.lockoutEnabled
                  ? 'bg-green-200 text-green-800 hover:bg-green-300'
                  : 'bg-red-200 text-red-800 hover:bg-red-300',
              )}
            >
              {row.original.lockoutEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {row.original.lockoutEnd
              ? `Lockout ends: ${format(new Date(row.original.lockoutEnd), 'dd MMM yyyy HH:mm')}`
              : 'No active lockout'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'isActive',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'success' : 'destructive'}>
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    id: 'createdAt',
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      return (
        <p className="line-clamp-1 truncate">
          {format(new Date(row.original.createdAt), 'dd MMM yyyy HH:mm')}
        </p>
      );
    },
  },
  {
    id: 'updatedAt',
    header: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      return (
        <p className="line-clamp-1 truncate">
          {row.original.updatedAt
            ? format(new Date(row.original.updatedAt), 'dd MMM yyyy HH:mm')
            : 'N/A'}
        </p>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-start">
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
