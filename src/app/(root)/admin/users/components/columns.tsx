'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';

import { User } from '@/api/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const userColumns: ColumnDef<User>[] = [
  {
    id: 'avatar',
    header: 'Avatar',
    accessorKey: 'imageUrl',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar>
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
      <div className="text-sm text-muted-foreground">{row.original.email}</div>
    ),
  },
  {
    id: 'gender',
    header: 'Gender',
    accessorKey: 'gender',
    cell: ({ row }) => (
      <Badge variant={row.original.gender ? 'default' : 'secondary'}>
        {row.original.gender ? 'Male' : 'Female'}
      </Badge>
    ),
  },
  {
    id: 'dateOfBirth',
    header: 'Date of Birth',
    accessorKey: 'dateOfBirth',
    cell: ({ row }) =>
      format(new Date(row.original.dateOfBirth), 'dd MMM yyyy'),
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'isActive',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'default' : 'destructive'}>
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role.name',
    cell: ({ row }) => row.original.role?.name || 'N/A',
  },
  {
    id: 'emailConfirmed',
    header: 'Email Confirmed',
    accessorKey: 'emailConfirmed',
    cell: ({ row }) =>
      row.original.emailConfirmed ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      ),
  },
  {
    id: 'phoneNumber',
    header: 'Phone',
    accessorKey: 'phoneNumber',
    cell: ({ row }) => row.original.phoneNumber || 'N/A',
  },
  {
    id: 'twoFactorEnabled',
    header: 'Two Factor',
    accessorKey: 'twoFactorEnabled',
    cell: ({ row }) =>
      row.original.twoFactorEnabled ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      ),
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
              variant={row.original.lockoutEnabled ? 'destructive' : 'outline'}
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
    id: 'createdAt',
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), 'dd MMM yyyy HH:mm'),
  },
  {
    id: 'updatedAt',
    header: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({ row }) =>
      row.original.updatedAt
        ? format(new Date(row.original.updatedAt), 'dd MMM yyyy HH:mm')
        : 'N/A',
  },
];
