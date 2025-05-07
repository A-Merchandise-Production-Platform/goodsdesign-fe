'use client';

import { FolderCheckIcon, FolderIcon, FolderPlusIcon } from 'lucide-react';

import CategoryTable from '@/app/(root)/admin/categories/_components/category-table';
import { StatCard } from '@/components/stat-card';
import { useGetAllCategoriesQuery } from '@/graphql/generated/graphql';
import { DashboardShell } from '@/components/dashboard-shell';

export default function CategoriesPage() {
  const { data, loading, refetch } = useGetAllCategoriesQuery();

  // Calculate fake stats data
  const totalCategories = data?.categories.length || 0;
  const newCategories =
    data?.categories?.filter(category => {
      const date = new Date(category.createdAt);
      return (
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      );
    }).length || 0;
  const activeCategories =
    data?.categories?.filter(category => category.isActive).length || 0;

  // Calculate fake changes (simulating increases/decreases)
  const totalChange = Math.round(Math.random() * 8) + '%';
  const newChange = Math.round(Math.random() * 15) + '%';
  const activeChange = Math.round(Math.random() * 5) + '%';

  return (
    <DashboardShell title="Categories" subtitle="Manage your categories">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Categories"
          value={totalCategories}
          change={Number(totalChange)}
          changeType="positive"
          icon={<FolderIcon className="h-5 w-5" />}
        />
        <StatCard
          title="New Categories This Month"
          value={newCategories}
          change={Number(newChange)}
          changeType="positive"
          icon={<FolderPlusIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Active Categories"
          value={activeCategories}
          change={Number(activeChange)}
          changeType="positive"
          icon={<FolderCheckIcon className="h-5 w-5" />}
        />
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <CategoryTable
          refetch={refetch}
          loading={loading}
          data={data?.categories}
        />
      </div>
    </DashboardShell>
  );
}
