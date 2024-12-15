import { Filter } from 'lucide-react';

import { ColumnSelector } from '@/app/(root)/admin/users/components/column-selector';
import { DataTable } from '@/app/(root)/admin/users/components/data-table';
import FilterButton from '@/app/(root)/admin/users/components/filter-button';
import SearchInput from '@/app/(root)/admin/users/components/search-input';
import { TablePagination } from '@/app/(root)/admin/users/components/table-pagination';
import { useUser } from '@/app/(root)/admin/users/hooks/use-user';
import { useUserPaging } from '@/app/(root)/admin/users/hooks/use-user-paging';
import { useColumnStore } from '@/app/(root)/admin/users/stores/use-user-column.store';
import { Button } from '@/components/ui/button';

export default function UserDataTable() {
  const { visibleColumns } = useColumnStore();
  const { data, isLoading, error } = useUser();
  const { currentPage, pageSize, totalPages, goToPage, changePageSize } =
    useUserPaging(data?.['@odata.count'] || 0);
  if (error) return <div>Can not load data</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <SearchInput />
          <FilterButton />
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
        count={data?.['@odata.count'] || 0}
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />
    </div>
  );
}
