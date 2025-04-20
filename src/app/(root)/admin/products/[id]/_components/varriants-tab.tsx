import { Package } from 'lucide-react';
import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { GetProductByIdQuery } from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

export default function VarriantsTab({
  product,
}: {
  product: GetProductByIdQuery['product'];
}) {
  return (
    <div>
      {product.variants && product.variants.length > 0 ? (
        <div className="space-y-4">
          <div className="">
            <div className="relative h-[300px]">
              <ScrollArea className="h-full">
                <table className="w-full caption-bottom text-sm">
                  <thead className="bg-muted sticky top-0 border-b">
                    <tr className="border-b transition-colors">
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                        Price
                      </th>
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                        Color
                      </th>
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                        Size
                      </th>
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                        Model
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {product.variants.map((variant, index) => {
                      // TypeScript safety - check if properties exist
                      const color =
                        'color' in variant ? String(variant.color) : null;
                      const size =
                        'size' in variant ? String(variant.size) : null;
                      const model =
                        'model' in variant ? String(variant.model) : null;

                      return (
                        <tr
                          key={index}
                          className="hover:bg-muted/50 border-b transition-colors"
                        >
                          <td className="p-2 align-middle whitespace-nowrap">
                            {formatPrice(variant?.price || 0)}
                          </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            {color ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-4 w-4 rounded-full border"
                                  style={{
                                    backgroundColor: color,
                                  }}
                                />
                                {color}
                              </div>
                            ) : (
                              'N/A'
                            )}
                          </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            {size || 'N/A'}
                          </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            {model || 'N/A'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ScrollArea>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center text-center">
            <Package className="text-muted-foreground mb-2 h-10 w-10" />
            <h3 className="font-medium">No variants available</h3>
            <p className="text-muted-foreground text-sm">
              This product doesn't have any variants yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
