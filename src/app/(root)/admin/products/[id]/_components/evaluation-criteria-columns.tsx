'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

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
import { type EvaluationCriteriaByProductQuery } from '@/graphql/generated/graphql';

type EvaluationCriteriaItem =
  EvaluationCriteriaByProductQuery['evaluationCriteriaByProduct'][0];

interface EvaluationCriteriaActionsProps {
  evaluationCriteria: EvaluationCriteriaItem;
  onEdit: (evaluationCriteria: EvaluationCriteriaItem) => void;
  onDelete: (id: string) => void;
}

function EvaluationCriteriaActions({
  evaluationCriteria,
  onEdit,
  onDelete,
}: EvaluationCriteriaActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(evaluationCriteria)}
        className="h-8 w-8 p-0"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(evaluationCriteria.id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEdit(evaluationCriteria)}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(evaluationCriteria.id)}
            className="text-destructive cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const createEvaluationCriteriaColumns = (
  onEdit: (evaluationCriteria: EvaluationCriteriaItem) => void,
  onDelete: (id: string) => void,
): ColumnDef<EvaluationCriteriaItem>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return <div className="max-w-[300px] truncate">{description || '-'}</div>;
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const date = row.getValue('updatedAt') as string;
      if (!date) return <div>-</div>;
      return <div>{new Date(date).toLocaleDateString()}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const evaluationCriteria = row.original;
      return (
        <EvaluationCriteriaActions
          evaluationCriteria={evaluationCriteria}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    },
  },
];
