'use client';
import { RefreshCwIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

import { ColumnSelector } from '@/app/(root)/admin/users/components/column-selector';
import { DataTable } from '@/app/(root)/admin/users/components/data-table';
import FilterButton from '@/app/(root)/admin/users/components/filter-button';
import SearchInput from '@/app/(root)/admin/users/components/search-input';
import { TablePagination } from '@/app/(root)/admin/users/components/table-pagination';
import { useUser } from '@/app/(root)/admin/users/hooks/use-user';
import { useUserPaging } from '@/app/(root)/admin/users/hooks/use-user-paging';
import { useColumnStore } from '@/app/(root)/admin/users/stores/use-user-column.store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CreateUserButton = dynamic(
  () => import('@/app/(root)/admin/users/components/create/create-user-button'),
);

export default function UserDataTable() {
  const { visibleColumns } = useColumnStore();
  const { data, isLoading, error, refetch } = useUser();
  const { currentPage, pageSize, totalPages, goToPage, changePageSize } =
    useUserPaging(data?.['@odata.count'] || 0);

  return (
    <div className="flex space-x-4">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <SearchInput />
            {/* <FilterButton /> */}
          </div>

          <div className="flex gap-2">
            <Button
              variant={'outline'}
              onClick={() => refetch()}
              className="border-dashed"
            >
              <RefreshCwIcon
                className={cn('h-5 w-5', isLoading && 'animate-spin')}
              />
            </Button>
            <CreateUserButton refresh={refetch} />
            <ColumnSelector />
          </div>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={visibleColumns}
            data={data?.value || []}
            isLoading={isLoading}
            error={error}
          />

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            count={data?.['@odata.count'] || 0}
            onPageChange={goToPage}
            onPageSizeChange={changePageSize}
          />
        </div>
      </div>
    </div>
  );
}
