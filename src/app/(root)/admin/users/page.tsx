'use client';

import { SortingState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';

import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';
import { userColumns } from '@/app/(root)/admin/users/_components/columns';
import { UserDataTable } from '@/app/(root)/admin/users/_components/user-data-table';
import { useUsersQuery } from '@/app/(root)/admin/users/_hooks/use-users-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUserStore } from '@/app/(root)/admin/users/_hooks/use-user-store';

const INITIAL_ROLES = ['admin', 'manager', 'staff', 'factoryOwner', 'customer'];

export default function Page() {
  const { data, isLoading } = useUsersQuery();
  const {
    pageSize,
    handlePaginationChange,
    handleSearchChange,
    handleSortingChange,
    handleRolesChange,
  } = useUserStore();

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
            onSearchChange={handleSearchChange}
            onSortingChange={handleSortingChange}
            onRolesChange={handleRolesChange}
            totalUsers={data?.['@odata.count'] ?? 0}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
