import { DesignCard } from './design-card';

interface DesignSectionProps {
  designs: Array<{
    __typename?: 'ProductDesignEntity';
    id: string;
    thumbnailUrl?: string | null;
    systemConfigVariant?: {
      __typename?: 'SystemConfigVariantEntity';
      product: {
        __typename?: 'ProductEntity';
        name: string;
        category?: {
          __typename?: 'CategoryEntity';
          name: string;
        } | null;
      };
    } | null;
    designPositions?: Array<{
      __typename?: 'DesignPositionEntity';
      positionType?: {
        __typename?: 'ProductPositionTypeEntity';
        basePrice: number;
      } | null;
    }> | null;
  }>;

  onDuplicate?: (options: {
    variables: {
      duplicateProductDesignId: string;
    };
  }) => void;
  isLoading?: boolean;
}

export function DesignSection({
  designs,
  onDuplicate,
  isLoading,
}: DesignSectionProps) {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Available Designs</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {designs.map((design, index) => {
          const productName =
            design.systemConfigVariant?.product?.name ?? 'Custom Product';
          const categoryName =
            design.systemConfigVariant?.product?.category?.name ?? 'T-Shirt';

          return (
            <DesignCard
              key={design.id}
              id={design.id}
              name={productName}
              image={design.thumbnailUrl ?? '/assets/tshirt-thumbnail.png'}
              description={`Custom ${categoryName} design`}
              category={
                design.systemConfigVariant?.product?.category?.name ?? ''
              }
              onDuplicate={onDuplicate}
              isLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
