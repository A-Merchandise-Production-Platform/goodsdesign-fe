'use client';

import { useGetAllSystemConfigSizesQuery } from '@/graphql/generated/graphql';
import { SizeTable } from './size-table';
import { RulerIcon } from 'lucide-react';

export default function SizesManagement() {
  const { data, loading, refetch } = useGetAllSystemConfigSizesQuery();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <RulerIcon className="h-4 w-4" />
            Total Sizes
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.systemConfigSizes?.length || 0}
            <span className="text-muted-foreground ml-2 text-base font-medium">
              sizes
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <RulerIcon className="h-4 w-4" />
            Active Sizes
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.systemConfigSizes?.filter(size => size.isActive).length || 0}
            <span className="text-muted-foreground text-base font-medium">
              / {data?.systemConfigSizes?.length || 0}
              <span className="text-muted-foreground ml-2 text-base font-medium">
                sizes
              </span>
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm"></div>
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <SizeTable
          refetch={refetch}
          loading={loading}
          data={data?.systemConfigSizes}
        />
      </div>
    </div>
  );
}
