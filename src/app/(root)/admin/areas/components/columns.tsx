import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Area } from '@/types/area';

export const columns: ColumnDef<Area>[] = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }) => {
      const copyToClipboard = () => {
        navigator.clipboard
          .writeText(row.original.id)
          .then(() => {
            toast.info('ID copied to clipboard');
          })
          .catch(error => {
            console.error('Failed to copy:', error);
            toast.error('Failed to copy ID');
          });
      };

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2 text-left text-muted-foreground transition-colors hover:text-primary">
              <Button
                variant={'ghost'}
                className="p-0"
                onClick={copyToClipboard}
              >
                <CopyIcon className="mr-2 h-4 w-4" />
              </Button>
              <p className="line-clamp-1 min-w-32">{row.original.id}</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.original.id}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Position',
    accessorKey: 'position',
  },
  {
    header: 'Code',
    accessorKey: 'code',
  },
  {
    header: 'Is Deleted',
    accessorKey: 'isDeleted',
    cell: ({ row }) => (
      <Badge variant={row.original.isDeleted ? 'destructive' : 'success'}>
        {row.original.isDeleted ? 'Inactive' : 'Active'}
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
          {row.original.createdAt
            ? format(new Date(row.original.createdAt), 'dd MMM yyyy HH:mm')
            : 'N/A'}
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
];
