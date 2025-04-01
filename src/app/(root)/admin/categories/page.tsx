'use client';

import { FolderIcon } from 'lucide-react';

import CategoryTable from '@/app/(root)/admin/categories/_components/category-table';
import { useGetAllCategoriesQuery } from '@/graphql/generated/graphql';

export default function CategoriesPage() {
  const { data, loading, refetch } = useGetAllCategoriesQuery();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <FolderIcon className="h-4 w-4" />
            Total Categories
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.categories.length}
            <span className="text-muted-foreground ml-2 text-base font-medium">
              categories
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <FolderIcon className="h-4 w-4" />
            New Categories this month
          </div>
          <div className="flex-1 text-5xl font-bold">
            {
              (
                data?.categories?.filter(category => {
                  const date = new Date(category.createdAt);
                  return (
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear()
                  );
                }) || []
              ).length
            }
            <span className="text-muted-foreground text-base font-medium">
              / {data?.categories.length}
              <span className="text-muted-foreground ml-2 text-base font-medium">
                categories
              </span>
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm"></div>
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <CategoryTable
          refetch={refetch}
          loading={loading}
          data={data?.categories}
        />
      </div>
    </div>
  );
}
