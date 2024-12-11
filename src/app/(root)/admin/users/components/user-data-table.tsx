import { QueryKey, useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';
import React from 'react';

import { UserApi } from '@/api/user';
import { ColumnSelector } from '@/app/(root)/admin/users/components/column-selector';
import { userColumns } from '@/app/(root)/admin/users/components/columns';
import { DataTable } from '@/app/(root)/admin/users/components/data-table';
import { useColumnStore } from '@/app/(root)/admin/users/stores/use-user-column.store';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Button } from '@/components/ui/button';

const queryKey = ['users'] as QueryKey;

export default function UserDataTable() {
  const { visibleColumns } = useColumnStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      UserApi.getUsers({
        count: true,
        top: 10,
        skip: 0,
        expand: ['role'],
      }),
  });

  if (isLoading) return <DataTableSkeleton columnCount={userColumns.length} />;
  if (error) return <div>Can not load data</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <ColumnSelector />
      </div>
      <DataTable columns={visibleColumns} data={data?.value || []} />
    </div>
  );
}
