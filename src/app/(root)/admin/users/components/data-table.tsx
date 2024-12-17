'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  rowCount?: number;
  error?: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  error,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded border bg-muted/10">
      <Table>
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      index === 0 && 'rounded-l',
                      index === headerGroup.headers.length - 1 && 'rounded-r',
                    )}
                  >
                    {header.isPlaceholder
                      ? undefined
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
        {isLoading ? (
          <TableBody>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  className={cn(
                    index === 0 && 'rounded-l',
                    index === columns.length - 1 && 'rounded-r',
                  )}
                >
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        index === 0 && 'rounded-l',
                        index === row.getVisibleCells().length - 1 &&
                          'rounded-r',
                      )}
                    >
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}

        {error && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} className="text-red-500">
                Could not load data.
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}
