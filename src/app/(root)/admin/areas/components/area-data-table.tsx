'use client';

import { Filter, PlusCircleIcon } from 'lucide-react';
import React from 'react';

import { columns } from '@/app/(root)/admin/areas/components/columns';
import { DataTable } from '@/app/(root)/admin/areas/components/data-table';
import useArea from '@/app/(root)/admin/areas/hooks/use-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AreaDataTable() {
  const { data, error, isLoading, refetch } = useArea();
  return (
    <div className="flex space-x-4">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Input placeholder="Search areas" />
            <Button variant={'outline'}>
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant={'outline'} className="border-dashed">
              <PlusCircleIcon className="h-4 w-4" />
              Add Area
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <DataTable
            data={data?.value || []}
            columns={columns}
            isLoading={isLoading}
            error={error}
          />

          {/* <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              count={data?.['@odata.count'] || 0}
              onPageChange={goToPage}
              onPageSizeChange={changePageSize}
            /> */}
        </div>
      </div>
    </div>
  );
}
