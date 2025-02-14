import type { ColumnDef } from '@tanstack/react-table';
import cn from 'classnames';
import { format } from 'date-fns';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';

import type { User } from '@/api/types/user';
import { Badge, BadgeVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

const SortableHeader = ({ column, title }: { column: any; title: string }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      type="button"
    >
      {title}
      {column.getIsSorted() === 'asc' ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

export const userColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'userName',
    header: ({ column }) => <SortableHeader column={column} title="Username" />,
    accessorKey: 'userName',
    enableSorting: true,
  },
  {
    id: 'email',
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    accessorKey: 'email',
    enableSorting: true,
    cell: ({ row }) => (
      <div className="text-muted-foreground line-clamp-1 truncate text-sm">
        {row.original.email}
      </div>
    ),
  },
  {
    id: 'dateOfBirth',
    header: ({ column }) => (
      <SortableHeader column={column} title="Date of Birth" />
    ),
    accessorKey: 'dateOfBirth',
    enableSorting: true,
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
        <Badge variant={row.original.role?.name! as BadgeVariant}>
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
    header: ({ column }) => (
      <SortableHeader column={column} title="Created At" />
    ),
    accessorKey: 'createdAt',
    enableSorting: true,
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
    header: ({ column }) => (
      <SortableHeader column={column} title="Updated At" />
    ),
    accessorKey: 'updatedAt',
    enableSorting: true,
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
