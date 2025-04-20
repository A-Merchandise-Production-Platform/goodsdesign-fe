'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface FactoryProductionTabProps {
  factory: any; // Type should be more specific based on your GraphQL schema
}

export function FactoryProductionTab({ factory }: FactoryProductionTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Capabilities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {factory.leadTime !== null && factory.leadTime !== undefined && (
            <div>
              <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                Lead Time
              </h3>
              <span>{factory.leadTime} days</span>
            </div>
          )}

          {factory.minimumOrderQuantity !== null &&
            factory.minimumOrderQuantity !== undefined && (
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Minimum Order Quantity
                </h3>
                <span>{factory.minimumOrderQuantity} units</span>
              </div>
            )}

          {factory.maxPrintingCapacity !== null &&
            factory.maxPrintingCapacity !== undefined && (
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Maximum Printing Capacity
                </h3>
                <span>{factory.maxPrintingCapacity} units</span>
              </div>
            )}

          {factory.operationalHours && (
            <div>
              <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                Operational Hours
              </h3>
              <span>{factory.operationalHours}</span>
            </div>
          )}
        </div>

        <Separator />

        {factory.products && factory.products.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Product Variants</h3>
              <Badge variant="outline">
                {factory.products.length} variants available
              </Badge>
            </div>

            <Card>
              <CardHeader className="px-4 py-3">
                <CardTitle className="text-sm">
                  Available Variants by Size & Color
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-3 text-left text-sm font-medium">
                          Size
                        </th>
                        <th className="p-3 text-left text-sm font-medium">
                          Color
                        </th>
                        <th className="p-3 text-left text-sm font-medium">
                          Capacity
                        </th>
                        <th className="p-3 text-left text-sm font-medium">
                          Est. Time
                        </th>
                        <th className="p-3 text-left text-sm font-medium">
                          Variant ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {factory.products.map(
                        (
                          product: {
                            systemConfigVariantId: string;
                            systemConfigVariant?: {
                              size?: string;
                              color?: string;
                            };
                            productionCapacity: number;
                            productionTimeInMinutes: number;
                          },
                          index: number,
                        ) => (
                          <tr
                            key={product.systemConfigVariantId}
                            className={`border-t ${index % 2 === 0 ? '' : 'bg-muted/30'}`}
                          >
                            <td className="p-3 text-sm">
                              {product.systemConfigVariant?.size || 'N/A'}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center">
                                <div
                                  className="mr-2 size-4 rounded-full border"
                                  style={{
                                    backgroundColor:
                                      product.systemConfigVariant?.color ||
                                      '#ccc',
                                    borderColor:
                                      product.systemConfigVariant?.color ===
                                      '#ffffff'
                                        ? '#ccc'
                                        : product.systemConfigVariant?.color ||
                                          '#ccc',
                                  }}
                                />
                                <span className="text-sm">
                                  {product.systemConfigVariant?.color || 'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              {product.productionCapacity} units
                            </td>
                            <td className="p-3 text-sm">
                              {product.productionTimeInMinutes} minutes
                            </td>
                            <td className="p-3 font-mono text-sm text-xs">
                              {product.systemConfigVariantId}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium">Total Variants</h4>
                  <p className="mt-1 text-2xl font-bold">
                    {factory.products.length}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium">Unique Colors</h4>
                  <p className="mt-1 text-2xl font-bold">
                    {
                      new Set(
                        factory.products.map(
                          (p: { systemConfigVariant?: { color?: string } }) =>
                            p.systemConfigVariant?.color,
                        ),
                      ).size
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium">Unique Sizes</h4>
                  <p className="mt-1 text-2xl font-bold">
                    {
                      new Set(
                        factory.products.map(
                          (p: { systemConfigVariant?: { size?: string } }) =>
                            p.systemConfigVariant?.size,
                        ),
                      ).size
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium">Avg Production Time</h4>
                  <p className="mt-1 text-2xl font-bold">
                    {/* Average calculation will go here */}h
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-dashed p-6 text-center">
            <h3 className="text-lg font-medium">No Product Variants</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              This factory doesn&apos;t have any product variants configured.
            </p>
            <Button className="mt-4" variant="outline">
              Add Product Variants
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
