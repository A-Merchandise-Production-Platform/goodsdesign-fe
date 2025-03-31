'use client';

import { useProductDesignByIdQuery } from '@/graphql/generated/graphql';
import ProductDesigner from './_components/product-design';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const { data: prodesData } = useProductDesignByIdQuery({
    variables: {
      productDesignId: id,
    },
  });

  return (
    <div>
      <ProductDesigner initialDesigns={prodesData?.productDesign?.designPositions} />
    </div>
  );
}
