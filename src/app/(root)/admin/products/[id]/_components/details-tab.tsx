import React from 'react';

import { Separator } from '@/components/ui/separator';
import {
  GetProductByIdQuery,
  GetProductByIdQueryResult,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

export default function DetailsTab({
  product,
}: {
  product: GetProductByIdQuery['product'];
}) {
  return (
    <div>
      <div>
        <h3 className="mb-1 font-medium">Description</h3>
        <p className="text-muted-foreground">
          {product.description || 'No description provided'}
        </p>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-1 font-medium">Category</h3>
          <p className="text-muted-foreground">
            {product.category?.name || 'Uncategorized'}
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-medium">Lowest Price</h3>
          <p className="text-muted-foreground">
            {formatPrice(product?.variants?.reduce((min, variant) => Math.min(min, variant.price || Infinity), Infinity) || 0)}
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-medium">Created</h3>
          <p className="text-muted-foreground">
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-medium">Last Updated</h3>
          <p className="text-muted-foreground">
            {product.updatedAt
              ? new Date(product.updatedAt).toLocaleDateString()
              : 'Never'}
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-medium">Weight</h3>
          <p className="text-muted-foreground">
            {product.weight ? `${product.weight}g` : 'Not specified'}
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-medium">Created By</h3>
          <p className="text-muted-foreground">
            {product.createdBy || 'System'}
          </p>
        </div>
      </div>
    </div>
  );
}
