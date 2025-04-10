'use client';

import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

import { Sidebar } from '@/components/shared/sidebar';
import { Button } from '@/components/ui/button';
import {
  Roles,
  useProductDesignsByUserQuery,
} from '@/graphql/generated/graphql';

import { DesignCard } from './_components/design-card';
import { useAuthStore } from '@/stores/auth.store';
import ErrorPage from '@/components/shared/error-page';

export default function MyDesignPage() {
  const { data, loading } = useProductDesignsByUserQuery();
  const { user } = useAuthStore();

  if (user?.role !== Roles.Customer) {
    return (
      <ErrorPage message="You not allowed to access this page" code={403} />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4 pb-2 md:grid-cols-[200px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Designs</h1>
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create New Design
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.productDesignsByUser?.length ? (
            data.productDesignsByUser.map(design => {
              // Calculate base price from positions with designs
              const positionPrices =
                design.designPositions?.reduce((total: number, position) => {
                  if (position.designJSON && position.designJSON.length > 0) {
                    return total + (position.positionType?.basePrice ?? 0);
                  }
                  return total;
                }, 0) ?? 0;

              // Use only the position prices since systemConfigVariant doesn't have a price field
              const basePrice = positionPrices;

              return (
                <DesignCard
                  key={design.id}
                  id={design.id}
                  image={design.thumbnailUrl || undefined}
                  name={design.systemConfigVariant?.product.name}
                  price={basePrice}
                  category={design.systemConfigVariant?.product?.category?.name}
                />
              );
            })
          ) : (
            <div className="container mx-auto py-6">
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
                  <Search className="text-muted-foreground h-10 w-10" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">No designs found</h3>
                <p className="text-muted-foreground mt-2 text-sm"></p>

                <Link href="/">
                  <Button className="mt-6">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Design
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
