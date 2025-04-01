'use client';

import { PackageIcon } from 'lucide-react';

import ProductTable from '@/app/(root)/admin/products/_components/product-table';
import { useGetAllProductsQuery } from '@/graphql/generated/graphql';

export default function ProductsPage() {
  const { data, loading, refetch } = useGetAllProductsQuery();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <PackageIcon className="h-4 w-4" />
            Total Products
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.products.length}
            <span className="text-muted-foreground ml-2 text-base font-medium">
              products
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <PackageIcon className="h-4 w-4" />
            New Products this month
          </div>
          <div className="flex-1 text-5xl font-bold">
            {
              (
                data?.products?.filter(product => {
                  const date = new Date(product.createdAt);
                  return (
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear()
                  );
                }) || []
              ).length
            }
            <span className="text-muted-foreground text-base font-medium">
              / {data?.products.length}
              <span className="text-muted-foreground ml-2 text-base font-medium">
                products
              </span>
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <PackageIcon className="h-4 w-4" />
            Active Products
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.products.filter(product => product.isActive).length}
            <span className="text-muted-foreground ml-2 text-base font-medium">
              / {data?.products.length}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <ProductTable
          refetch={refetch}
          loading={loading}
          data={data?.products}
        />
      </div>
    </div>
  );
}
