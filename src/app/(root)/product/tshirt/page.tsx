'use client';

import { ArrowLeft, Loader2, Paintbrush } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  useCreateProductDesignMutation,
  useGetAllDiscountByProductIdQuery,
  useGetProductInformationByIdQuery,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

import { ColorSelector } from '../_components/color-selector';
import { ModelSelector } from '../_components/model-selector';
import { PrintingTechniqueSelector } from '../_components/printing-technique-selector';
import { ProductImageGallery } from '../_components/product-image-gallery';
import { VolumeDiscount } from '../_components/volume-discount';

interface TShirtProduct {
  name: string;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
  printingTechniques: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
  }>;
}

export default function TShirtPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<number>(0);

  const [createProductDesign, { data: proData, loading: proLoading }] =
    useCreateProductDesignMutation();
  const { data: infoData, loading: infoLoading } =
    useGetProductInformationByIdQuery({
      variables: {
        productId: 'prod001',
      },
    });

  const { data: discountData, loading: discountLoading } =
    useGetAllDiscountByProductIdQuery({
      variables: {
        productId: 'prod001',
      },
    });

  // Set initial size and color from first variant when data loads
  useEffect(() => {
    if (infoData?.product.variants && infoData.product.variants.length > 0) {
      const firstVariant = infoData.product.variants[0];
      if (firstVariant.size) setSelectedSize(firstVariant.size);
      if (firstVariant.color) setSelectedColor(firstVariant.color);
    }
  }, [infoData]);
  const getVariant = (size: string, color: string) => {
    return infoData?.product.variants?.find(
      v => v.size === size && v.color === color,
    );
  };

  const getSystemConfigVariantId = (size: string, color: string) => {
    return getVariant(size, color)?.id || '';
  };

  // Update price when size or color changes
  useEffect(() => {
    if (selectedSize && selectedColor) {
      const variant = getVariant(selectedSize, selectedColor);
      if (variant?.price) {
        setSelectedVariantPrice(variant?.price);
      }
    }
  }, [selectedSize, selectedColor, infoData]);

  // Handle product design creation result
  useEffect(() => {
    if (!proLoading && proData) {
      if (proData.createProductDesign.id) {
        toast.success('Product design created successfully.');
        router.push(`/product/tshirt/${proData.createProductDesign.id}`);
      } else {
        toast.error('Failed to create product design.');
      }
    }
  }, [proLoading, proData, router]);

  const product: TShirtProduct = {
    name: infoData?.product.name || 'T-Shirt',
    price: selectedVariantPrice,
    image: '/assets/tshirt-thumbnail.png',
    sizes: infoData?.product.variants
      ? Array.from(
          new Set(
            infoData.product.variants
              .map(v => v.size)
              .filter(
                (size): size is string => size !== null && size !== undefined,
              ),
          ),
        )
      : [],
    colors: infoData?.product.variants
      ? Array.from(
          new Set(
            infoData.product.variants
              .map(v => v.color)
              .filter(
                (color): color is string =>
                  color !== null && color !== undefined,
              ),
          ),
        )
      : [],

    printingTechniques: [
      {
        id: 'screen',
        name: 'Screen Printing',
        description: 'Durable and vibrant, best for simple designs',
        price: 5.99,
      },
      {
        id: 'dtg',
        name: 'Direct to Garment',
        description: 'Great for detailed, multi-colored designs',
        price: 8.99,
      },
      {
        id: 'embroidery',
        name: 'Embroidery',
        description: 'Premium raised texture, perfect for logos',
        price: 12.99,
      },
      {
        id: 'vinyl',
        name: 'Vinyl Heat Transfer',
        description: 'Excellent for names, numbers, and simple graphics',
        price: 7.99,
      },
    ],
  };

  async function onSubmit() {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    const systemConfigVariantId = getSystemConfigVariantId(
      selectedSize,
      selectedColor,
    );
    if (!systemConfigVariantId) {
      toast.error('Selected combination is not available');
      return;
    }

    try {
      await createProductDesign({
        variables: {
          input: {
            systemConfigVariantId,
            isFinalized: false,
            isPublic: false,
            isTemplate: false,
          },
        },
      });
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground mb-6 flex items-center transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductImageGallery
          name={product.name}
          price={product.price}
          image={product.image}
          sizes={product.sizes}
          colors={product.colors}
          printingTechniques={product.printingTechniques}
        />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-6">
            <ModelSelector
              sizes={product.sizes}
              defaultValue={selectedSize}
              value={selectedSize}
              onValueChange={setSelectedSize}
            />
            <ColorSelector
              colors={product.colors}
              defaultValue={selectedColor}
              value={selectedColor}
              onValueChange={setSelectedColor}
            />
            <PrintingTechniqueSelector
              techniques={product.printingTechniques}
            />
          </div>

          <VolumeDiscount
            discounts={discountData?.getAllDiscountByProductId || []}
            loading={discountLoading}
          />

          <Button
            onClick={onSubmit}
            size="lg"
            className="w-full"
            disabled={proLoading}
          >
            {proLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Paintbrush className="mr-2 h-5 w-5" />
            )}
            Start Designing
          </Button>
        </div>
      </div>
    </div>
  );
}
