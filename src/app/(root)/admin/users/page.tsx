'use client';

import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';

import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import { userColumns } from '@/app/(root)/admin/users/_components/columns';
import { UserDataTable } from '@/app/(root)/admin/users/_components/user-data-table';
import { useUsersQuery } from '@/app/(root)/admin/users/_hooks/use-users-query';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading } = useUsersQuery(
    page,
    pageSize,
    searchTerm,
    sorting.length > 0 ? sorting[0].id : undefined,
    sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
  );

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const handleGlobalFilterChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);
    setPage(1);
  };

  return (
    <div className="flex h-screen flex-col">
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Users' },
        ]}
      />
      <ScrollArea className="grow">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">User Management</h1>
          <UserDataTable
            columns={userColumns}
            data={data?.value ?? []}
            pageCount={Math.ceil((data?.['@odata.count'] ?? 0) / pageSize)}
            isLoading={isLoading}
            onPaginationChange={handlePaginationChange}
            onGlobalFilterChange={handleGlobalFilterChange}
            onSortingChange={handleSortingChange}
            totalUsers={data?.['@odata.count'] ?? 0}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
