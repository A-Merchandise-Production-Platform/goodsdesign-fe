'use client';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/shared/sidebar';
import {
  useDuplicateProductDesignMutation,
  usePublicProductDesignsQuery,
} from '@/graphql/generated/graphql';
import { Search } from 'lucide-react';
import { DesignCard } from './_components/design-card';
import { toast } from 'sonner';

export default function PublicDesignPage() {
  const router = useRouter();

  const { data, loading } = usePublicProductDesignsQuery();
  const [duplicateProductDesign, { loading: duplicateLoading }] =
    useDuplicateProductDesignMutation({
      onCompleted: data => {
        toast.success('Created product design successfully');
        router.push(`/product/tshirt/${data.duplicateProductDesign.id}`);
      },
      onError: () => {
        toast.error('Failed to create product design');
      },
    });

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4 pb-2 md:grid-cols-[200px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[300px] rounded-lg bg-muted animate-pulse" />
            ))
          ) : data?.publicProductDesigns?.length ? (
            data.publicProductDesigns.map(design => (
              <DesignCard
                key={design.id}
                design={design}
                onDuplicate={(id) => {
                  duplicateProductDesign({
                    variables: {
                      duplicateProductDesignId: id,
                    }
                  });
                }}
                isLoading={duplicateLoading}
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
