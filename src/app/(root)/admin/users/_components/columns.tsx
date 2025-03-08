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

export const columns: ColumnDef<Partial<GraphQlUser>>[] = [
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
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
