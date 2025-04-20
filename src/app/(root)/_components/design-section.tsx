import { DesignCard } from './design-card';

interface DesignSectionProps {
  designs:
    | {
        __typename?: 'ProductDesignEntity';
        id: string;
        isPublic: boolean;
        isTemplate: boolean;
        isFinalized: boolean;
        thumbnailUrl?: string | null;
        designPositions?: Array<{
          __typename?: 'DesignPositionEntity';
          designJSON?: any | null;
          positionType?: {
            __typename?: 'ProductPositionTypeEntity';
            id: string;
            positionName: string;
            basePrice: number;
          } | null;
        }> | null;
        systemConfigVariant?: {
          __typename?: 'SystemConfigVariantEntity';
          id: string;
          price?: number | null;
          color?: string | null;
          size?: string | null;
          model?: string | null;
          product: {
            __typename?: 'ProductEntity';
            name: string;
            category?: {
              __typename?: 'CategoryEntity';
              name: string;
            } | null;
          };
        } | null;
      }[]
    | undefined;

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
        {designs?.map((design) => {
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
