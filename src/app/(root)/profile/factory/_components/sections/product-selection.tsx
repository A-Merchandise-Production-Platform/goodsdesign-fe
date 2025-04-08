import { UseFormReturn } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Check, ChevronDown, Lock } from 'lucide-react';

import {
  useGetSystemConfigVariantsQuery,
  useGetMyFactoryQuery,
} from '@/graphql/generated/graphql';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { formatPrice, getContrastColor, cn } from '@/lib/utils';
import { FactoryFormValues } from '../factory-form-schema';

interface ProductSelectionProps {
  form: UseFormReturn<FactoryFormValues>;
}

export function ProductSelection({ form }: ProductSelectionProps) {
  const { data: factoryData } = useGetMyFactoryQuery();
  const { data, loading, error } = useGetSystemConfigVariantsQuery();
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [expandedProducts, setExpandedProducts] = useState<
    Record<string, boolean>
  >({});

  const isSubmitted = factoryData?.getMyFactory?.isSubmitted ?? false;

  // Initialize selected variants from form data
  useEffect(() => {
    const formValues = form.getValues('systemConfigVariantIds');
    if (formValues && formValues.length > 0) {
      setSelectedVariants(formValues);
    }
  }, []);

  // Initialize selected variants from factory data if available
  useEffect(() => {
    if (factoryData?.getMyFactory?.products) {
      const variantIds = factoryData.getMyFactory.products
        .map(product => product.systemConfigVariantId)
        .filter((id): id is string => id !== null);

      if (variantIds.length > 0) {
        setSelectedVariants(variantIds);
        form.setValue('systemConfigVariantIds', variantIds, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [factoryData]);

  // Update form when selected variants change
  useEffect(() => {
    if (selectedVariants.length > 0) {
      form.setValue('systemConfigVariantIds', selectedVariants, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedVariants]);

  // Add a subscription to form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // Only react to changes in systemConfigVariantIds from outside this component
      if (name === 'systemConfigVariantIds') {
        const formVariants = value.systemConfigVariantIds || [];
        if (JSON.stringify(formVariants) !== JSON.stringify(selectedVariants)) {
          setSelectedVariants(formVariants as string[]);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, selectedVariants]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  // Group variants by product and color
  const variantsByProductAndColor = data.systemConfigVariants.reduce(
    (
      acc: Record<
        string,
        {
          product: (typeof data.systemConfigVariants)[0]['product'];
          colors: Record<string, typeof data.systemConfigVariants>;
        }
      >,
      variant,
    ) => {
      const productId = variant.product.id;
      const color = variant.color || 'No Color';

      if (!acc[productId]) {
        acc[productId] = {
          product: variant.product,
          colors: {},
        };
      }

      if (!acc[productId].colors[color]) {
        acc[productId].colors[color] = [];
      }

      acc[productId].colors[color].push(variant);
      return acc;
    },
    {},
  );

  const handleVariantSelect = (variantId: string) => {
    if (isSubmitted) return;
    setSelectedVariants(prev => {
      const newSelected = prev.includes(variantId)
        ? prev.filter(id => id !== variantId)
        : [...prev, variantId];

      console.log('Selected variant IDs:', newSelected);
      return newSelected;
    });
  };

  const handleColorSelectAll = (variants: typeof data.systemConfigVariants) => {
    if (isSubmitted) return;
    const variantIds = variants.map(variant => variant.id);
    setSelectedVariants(prev => {
      // Check if all variants of this color are already selected
      const allSelected = variantIds.every(id => prev.includes(id));

      if (allSelected) {
        // If all are selected, unselect them
        const newSelected = prev.filter(id => !variantIds.includes(id));
        console.log('Selected variant IDs:', newSelected);
        return newSelected;
      } else {
        // If not all are selected, select all missing ones
        const newSelected = [...new Set([...prev, ...variantIds])];
        console.log('Selected variant IDs:', newSelected);
        return newSelected;
      }
    });
  };

  const toggleProduct = (productId: string) => {
    if (isSubmitted) return;
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getProductSelectedCount = (productId: string) => {
    return Object.values(variantsByProductAndColor[productId].colors)
      .flat()
      .filter(variant => selectedVariants.includes(variant.id)).length;
  };

  return (
    <Card className={cn('shadow-md', isSubmitted && 'opacity-75')}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Selection</CardTitle>
            <CardDescription>
              Select the products you want to offer
            </CardDescription>
          </div>
          {isSubmitted && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Submitted
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {variantsByProductAndColor &&
            Object.entries(variantsByProductAndColor).map(
              ([productId, { product, colors }]) => (
                <Collapsible
                  key={productId}
                  open={expandedProducts[productId]}
                  onOpenChange={() => toggleProduct(productId)}
                  className="border-border overflow-hidden rounded-lg border shadow-sm"
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="bg-muted/30 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-semibold">
                            {product.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {getProductSelectedCount(productId)} selected
                          </Badge>
                        </div>
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 transition-transform duration-200',
                            expandedProducts[productId] ? 'rotate-180' : '',
                          )}
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out">
                    <div className="space-y-6 p-6">
                      {Object.entries(colors).map(
                        ([color, variants], colorIndex, colorArray) => (
                          <div key={color}>
                            <div className="mb-4 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className="px-2 py-1 text-xs font-medium"
                                  style={{
                                    backgroundColor: color,
                                    color: getContrastColor(color),
                                  }}
                                >
                                  {color}
                                </Badge>
                                <span className="text-muted-foreground text-sm">
                                  ({variants.length} variants)
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleColorSelectAll(variants)}
                                disabled={isSubmitted}
                              >
                                {variants.every(v =>
                                  selectedVariants.includes(v.id),
                                )
                                  ? 'Unselect All'
                                  : 'Select All'}
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {variants.map(variant => {
                                const isSelected = selectedVariants.includes(
                                  variant.id,
                                );
                                return (
                                  <div
                                    key={variant.id}
                                    className={cn(
                                      'relative cursor-pointer rounded-lg border-2 transition-all duration-200',
                                      isSelected
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border',
                                      isSubmitted &&
                                        'cursor-not-allowed opacity-75',
                                      !isSubmitted && 'hover:border-primary/50',
                                    )}
                                    onClick={() =>
                                      handleVariantSelect(variant.id)
                                    }
                                  >
                                    {isSelected && (
                                      <div className="absolute top-2 right-2">
                                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                                          <Check className="h-3 w-3" />
                                        </div>
                                      </div>
                                    )}
                                    <div className="p-4">
                                      <div className="space-y-2">
                                        {variant.model && (
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                              Model
                                            </span>
                                            <span className="font-medium">
                                              {variant.model}
                                            </span>
                                          </div>
                                        )}
                                        {variant.size && (
                                          <div className="flex gap-4">
                                            <span className="font-medium">
                                              {variant.size}
                                            </span>
                                          </div>
                                        )}
                                        {variant.price && (
                                          <div className="flex justify-between pt-1">
                                            <span className="text-muted-foreground">
                                              Price
                                            </span>
                                            <span className="font-semibold">
                                              {formatPrice(variant.price)}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {colorIndex < colorArray.length - 1 && (
                              <Separator className="my-6" />
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ),
            )}
        </div>
      </CardContent>
    </Card>
  );
}
