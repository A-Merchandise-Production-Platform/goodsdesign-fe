import { Filter, Search } from 'lucide-react';

import { ColumnSelector } from '@/app/(root)/admin/users/components/column-selector';
import { userColumns } from '@/app/(root)/admin/users/components/columns';
import { DataTable } from '@/app/(root)/admin/users/components/data-table';
import { TablePagination } from '@/app/(root)/admin/users/components/table-pagination';
import useUser from '@/app/(root)/admin/users/hooks/use-user';
import { useColumnStore } from '@/app/(root)/admin/users/stores/use-user-column.store';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Button } from '@/components/ui/button';

export default function UserDataTable() {
  const { visibleColumns } = useColumnStore();
  const {
    data,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalPages,
    goToPage,
    changePageSize,
  } = useUser();

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
      <DataTable
        columns={visibleColumns}
        data={data?.value || []}
        isLoading={isLoading}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />
    </div>
  );
}
