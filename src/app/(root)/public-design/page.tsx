'use client';
import { Sidebar } from '@/components/shared/sidebar';
import { useProductDesignsQuery } from '@/graphql/generated/graphql';
import { Search } from 'lucide-react';
import { DesignCard } from './_components/design-card';

export default function PublicDesignPage() {
  const { data, loading } = useProductDesignsQuery();
  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4 pb-2 md:grid-cols-[200px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data?.productDesigns?.length ? (
            data.productDesigns.map(design => (
              <DesignCard
                key={design.id}
                design={design}
              />
            ))
          ) : (
            <div className="container mx-auto py-6">
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
                  <Search className="text-muted-foreground h-10 w-10" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">No designs found</h3>
                <p className="text-muted-foreground mt-2 text-sm"></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
