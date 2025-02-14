'use client';

import {
  type ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { Filter } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import type { User } from '@/api/types/user';
import CreateUserDialog from '@/app/(root)/admin/users/_components/create-user-dialog';
import { useUserTable } from '@/app/(root)/admin/users/_hooks/use-user-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  isLoading: boolean;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
  onGlobalFilterChange: (value: string) => void;
  totalUsers: number;
  onSortingChange: (sorting: SortingState) => void;
  onRolesChange: (roles: string[]) => void;
}

const ROLES = ['admin', 'manager', 'staff', 'factoryOwner', 'customer'];

export function UserDataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  isLoading,
  onPaginationChange,
  onGlobalFilterChange,
  totalUsers,
  onSortingChange,
  onRolesChange,
}: DataTableProps<TData, TValue>) {
  const table = useUserTable(data as User[], pageCount, onSortingChange);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(ROLES);

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    onGlobalFilterChange(debouncedSearchValue);
  }, [debouncedSearchValue, onGlobalFilterChange]);

  useEffect(() => {
    onRolesChange(selectedRoles);
  }, [selectedRoles, onRolesChange]);

  const handleRoleToggle = useCallback((role: string) => {
    setSelectedRoles(previous =>
      previous.includes(role)
        ? previous.filter(r => r !== role)
        : [...previous, role],
    );
  }, []);

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            className="max-w-sm"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align={'start'}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Roles</h4>
                  <p className="text-muted-foreground text-sm">
                    Select the roles you want to filter by.
                  </p>
                </div>
                <div className="grid gap-2">
                  {ROLES.map(role => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={role}
                        checked={selectedRoles.includes(role)}
                        onCheckedChange={() => handleRoleToggle(role)}
                      />
                      <Label htmlFor={role}>{role}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <CreateUserDialog />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
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
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {isLoading ? (
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <p className="text-muted-foreground ml-4 flex-1 text-sm">
          {totalUsers} user(s) found.
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => {
              table.setPageSize(Number(value));
              onPaginationChange(
                table.getState().pagination.pageIndex + 1,
                Number(value),
              );
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              onPaginationChange(
                table.getState().pagination.pageIndex,
                table.getState().pagination.pageSize,
              );
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              onPaginationChange(
                table.getState().pagination.pageIndex + 2,
                table.getState().pagination.pageSize,
              );
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
