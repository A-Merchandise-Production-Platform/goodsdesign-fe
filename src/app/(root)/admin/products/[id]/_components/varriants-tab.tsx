'use client';

import { Package } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { GetProductByIdQuery } from '@/graphql/generated/graphql';
import { cn, formatPrice } from '@/lib/utils';
import { AddVariantBtn } from '@/app/(root)/admin/products/[id]/_components/add-variant-btn';
import { EditVariantBtn } from './edit-variant-btn';
import { DeleteVariantBtn } from './delete-variant-btn';

export default function VariantsTab({
  product,
}: {
  product: GetProductByIdQuery['product'];
}) {
  const hasVariants = product.variants && product.variants.length > 0;

  // Group variants by color
  const variantsByColor = hasVariants
    ? product?.variants?.reduce(
        (groups, variant) => {
          const color = 'color' in variant ? String(variant.color) : 'No Color';
          if (!groups[color]) {
            groups[color] = [];
          }
          groups[color].push(variant);
          return groups;
        },
        {} as Record<string, typeof product.variants>,
      )
    : {};

  // Get unique colors for the edit form
  const uniqueColors = hasVariants
    ? Array.from(
        new Set(
          product.variants
            ?.filter(variant => variant.color && !variant.isDeleted)
            .map(variant => variant.color)
            .filter(
              (color): color is string => color !== null && color !== undefined,
            ) || [],
        ),
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Variants</h2>
          <p className="text-muted-foreground">Manage your product variants</p>
        </div>
        <AddVariantBtn />
      </div>

      {hasVariants ? (
        <ScrollArea className="h-[450px] pr-4">
          <div className="space-y-6">
            {Object.entries(variantsByColor || {}).map(([color, variants]) => (
              <div key={color} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-5 w-5 rounded-full border shadow-sm',
                      color.toLowerCase() === 'white' && 'border-gray-300',
                    )}
                    style={{
                      backgroundColor: color !== 'No Color' ? color : '#e5e7eb',
                    }}
                  />
                  <h3 className="text-lg font-medium">{color}</h3>
                </div>
                <Separator />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {variants?.map((variant, index) => {
                    const size =
                      'size' in variant ? String(variant.size) : null;

                    return (
                      <Card
                        key={index}
                        className="group overflow-hidden border p-0"
                      >
                        <CardContent className="p-0">
                          <div className="bg-muted/30 flex items-center justify-between px-4 py-2">
                            {size && (
                              <span className="flex h-9 w-20 items-center text-base font-normal">
                                {size.toUpperCase()}
                              </span>
                            )}
                            <div className="flex-1 font-medium">
                              {formatPrice(variant?.price || 0)}
                            </div>
                            <EditVariantBtn
                              variant={variant}
                              uniqueColors={uniqueColors}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="bg-muted/10 flex h-40 items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center px-4 py-6 text-center">
            <div className="bg-background mb-3 rounded-full p-3">
              <Package className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No variants available</h3>
            <p className="text-muted-foreground max-w-[250px] text-sm">
              This product doesn't have any variants yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
