'use client';

import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown, Plus, Search } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  type EvaluationCriteriaByProductQuery,
  type EvaluationCriteriaEntity,
  useRemoveEvaluationCriteriaMutation,
} from '@/graphql/generated/graphql';

import { createEvaluationCriteriaColumns } from './evaluation-criteria-columns';
import { EvaluationCriteriaForm } from './evaluation-criteria-form';

type EvaluationCriteriaItem =
  EvaluationCriteriaByProductQuery['evaluationCriteriaByProduct'][0];

interface EvaluationCriteriaTableProps {
  data: EvaluationCriteriaItem[];
  loading: boolean;
  productId: string;
  refetch: () => void;
}

export function EvaluationCriteriaTable({
  data,
  loading,
  productId,
  refetch,
}: EvaluationCriteriaTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  // Form dialog state
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingCriteria, setEditingCriteria] =
    React.useState<EvaluationCriteriaEntity | null>(null);

  const [removeEvaluationCriteria] = useRemoveEvaluationCriteriaMutation({
    onCompleted: () => {
      toast.success('Evaluation criteria deleted successfully');
      refetch();
    },
    onError: error => {
      toast.error(error.message || 'Failed to delete evaluation criteria');
    },
  });

  const handleEdit = (criteria: EvaluationCriteriaItem) => {
    // Convert the query result item to the full entity for editing
    const fullCriteria: EvaluationCriteriaEntity = {
      ...criteria,
      product: {} as any, // We don't need the product for editing
      productId: productId,
    };
    setEditingCriteria(fullCriteria);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this evaluation criteria?',
      )
    ) {
      try {
        await removeEvaluationCriteria({
          variables: { removeEvaluationCriteriaId: id },
        });
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleAdd = () => {
    setEditingCriteria(null);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    refetch();
    setEditingCriteria(null);
  };

  const columns = createEvaluationCriteriaColumns(handleEdit, handleDelete);

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative max-w-sm">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search evaluation criteria..."
              value={globalFilter ?? ''}
              onChange={event => setGlobalFilter(String(event.target.value))}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={handleAdd} className="ml-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Criteria
        </Button>
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No evaluation criteria found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <EvaluationCriteriaForm
        open={formOpen}
        onOpenChange={setFormOpen}
        evaluationCriteria={editingCriteria}
        productId={productId}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
