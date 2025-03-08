'use client';

import { columns } from '@/app/(root)/admin/users/_components/columns';
import { DataTable } from '@/app/(root)/admin/users/_components/data-table';
import { useUsers } from '@/app/(root)/admin/users/_hooks/use-users';
import { SortOrder } from '@/graphql/generated';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function UserDataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useUsers({
    pagination: { page, limit: pageSize },
    sort: { createdAt: SortOrder.Desc },
  });

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      ) : (
        <DataTable
          data={data?.users.items ?? []}
          columns={columns}
          pageCount={data?.users.meta.totalPages ?? 1}
          currentPage={page}
          pageSize={pageSize}
          totalItems={data?.users.meta.total ?? 0}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
