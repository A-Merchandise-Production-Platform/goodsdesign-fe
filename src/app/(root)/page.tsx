'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Sidebar } from '@/components/shared/sidebar';
import {
  Roles,
  useDuplicateProductDesignMutation,
  useGetAllProductsQuery,
  useGetTemplateProductDesignsQuery,
} from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

import { DesignSection } from './_components/design-section';
import { ProductSection } from './_components/product-section';
import { PromotionalBanner } from './_components/promotional-banner';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: proData, loading: proLoading } = useGetAllProductsQuery();
  const sortedProducts = proData?.products
    ?.slice()
    .sort((a, b) => (a.id ?? '').localeCompare(b.id ?? ''));
  const { data: proDesData, loading: proDesLoading } =
    useGetTemplateProductDesignsQuery();
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
    <div
      className={
        user?.role === Roles.Customer
          ? 'grid grid-cols-1 gap-4 px-4 pt-4 pb-2 md:grid-cols-[200px_1fr]'
          : 'px-4 pt-4 pb-2'
      }
    >
      {user?.role === Roles.Customer && (
        <div>
          <Sidebar />
        </div>
      )}
      <div className="px-4 py-8">
        <PromotionalBanner />

        <h1 className="mb-2 text-3xl font-bold">Customize Your Product</h1>
        <p className="text-muted-foreground mb-8">
          Select a product to customize with our available designs
        </p>

        <ProductSection products={sortedProducts} />

        <DesignSection
          designs={(proDesData?.getTemplateProductDesigns || []).filter(
            design => design.isPublic === true,
          )}
          onDuplicate={duplicateProductDesign}
          isLoading={duplicateLoading}
        />
      </div>
    </div>
  );
}
