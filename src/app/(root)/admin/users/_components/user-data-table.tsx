'use client';

import { type ColumnDef, flexRender } from '@tanstack/react-table';
import { Filter, RefreshCcwIcon, RefreshCwIcon } from 'lucide-react';

import { getUserColumns } from '@/app/(root)/admin/users/_components/columns';
import CreateUserDialog from '@/app/(root)/admin/users/_components/create-user-button';
import { TableSkeleton } from '@/app/(root)/admin/users/_components/table-skeleton';
import { useUserTable } from '@/app/(root)/admin/users/_hooks/use-user-table';
import { useUsersQuery } from '@/app/(root)/admin/users/_hooks/use-users-query';
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
import { cn } from '@/lib/utils';

const INITIAL_ROLES = ['admin', 'manager', 'staff', 'factoryOwner', 'customer'];

export function UserDataTable() {
  const {
    data,
    totalUsers,
    isLoading,
    refetch,
    handlePaginationChange,
    handleRoleToggle,
    handleSearchChange,
    searchTerm,
    selectedRoles,
    sorting,
    setSorting,
    page,
    pageSize,
  } = useUsersQuery();

  const columns = getUserColumns({ refetch });

  const table = useUserTable(
    data ?? [],
    Math.ceil(totalUsers / pageSize),
    setSorting,
  );

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex items-center py-4">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={event => handleSearchChange(event.target.value)}
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
                  {INITIAL_ROLES.map(role => (
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
          <Button
            className={cn('flex items-center')}
            onClick={refetch}
            type="button"
            variant={'outline'}
          >
            <RefreshCwIcon
              className={cn(isLoading && 'animate-spin', 'h-4 w-4')}
            />
          </Button>
          <CreateUserDialog refetch={refetch} />
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
                .map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? undefined
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton columns={columns.length} />
            ) : data.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
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

      {/* Pagination */}
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
            value={`${pageSize}`}
            onValueChange={value => {
              handlePaginationChange(page, Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map(size => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePaginationChange(page - 1, pageSize)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePaginationChange(page + 1, pageSize)}
            disabled={page * pageSize >= totalUsers}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
