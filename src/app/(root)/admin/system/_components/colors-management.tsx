'use client';

import { useGetAllSystemConfigColorsQuery } from '@/graphql/generated/graphql';
import { ColorTable } from './color-table';
import { PaletteIcon } from 'lucide-react';

export default function ColorsManagement() {
  const { data, loading, refetch } = useGetAllSystemConfigColorsQuery();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <PaletteIcon className="h-4 w-4" />
            Total Colors
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.systemConfigColors?.length || 0}
            <span className="text-muted-foreground ml-2 text-base font-medium">
              colors
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <PaletteIcon className="h-4 w-4" />
            Active Colors
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.systemConfigColors?.filter(color => color.isActive).length ||
              0}
            <span className="text-muted-foreground text-base font-medium">
              / {data?.systemConfigColors?.length || 0}
              <span className="text-muted-foreground ml-2 text-base font-medium">
                colors
              </span>
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm"></div>
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <ColorTable
          refetch={refetch}
          loading={loading}
          data={data?.systemConfigColors}
        />
      </div>
    </div>
  );
}
