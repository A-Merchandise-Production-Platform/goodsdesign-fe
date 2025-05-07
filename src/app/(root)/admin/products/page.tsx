'use client';

import { PackageIcon, PackagePlusIcon, TagIcon } from 'lucide-react';

import ProductTable from '@/app/(root)/admin/products/_components/product-table';
import { StatCard } from '@/components/stat-card';
import { useGetAllProductsQuery } from '@/graphql/generated/graphql';
import { DashboardShell } from '@/components/dashboard-shell';

export default function ProductsPage() {
  const { data, loading, refetch } = useGetAllProductsQuery();

  // Calculate fake stats data
  const totalProducts = data?.products.length || 0;
  const newProducts =
    data?.products?.filter(product => {
      const date = new Date(product.createdAt);
      return (
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      );
    }).length || 0;
  const activeProducts =
    data?.products?.filter(product => product.isActive).length || 0;

  // Calculate fake changes (simulating increases/decreases)
  const totalChange = Math.round(Math.random() * 10) + '%';
  const newChange = Math.round(Math.random() * 15) + '%';
  const activeChange = Math.round(Math.random() * 8) + '%';

  return (
    <DashboardShell title="Products" subtitle="Manage your products">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Products"
          value={totalProducts}
          change={Number(totalChange)}
          changeType="positive"
          icon={<PackageIcon className="h-5 w-5" />}
        />
        <StatCard
          title="New Products This Month"
          value={newProducts}
          change={Number(newChange)}
          changeType="positive"
          icon={<PackagePlusIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Active Products"
          value={activeProducts}
          change={Number(activeChange)}
          changeType={
            activeProducts > totalProducts / 2 ? 'positive' : 'negative'
          }
          icon={<TagIcon className="h-5 w-5" />}
        />
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <ProductTable
          refetch={refetch}
          loading={loading}
          data={data?.products}
        />
      </div>
    </DashboardShell>
  );
}
