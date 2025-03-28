'use client';

import Link from 'next/link';
import { ArrowLeft, Paintbrush } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ProductImageGallery } from '../_components/product-image-gallery';
import { VolumeDiscount } from '../_components/volume-discount';
import { ColorSelector } from '../_components/color-selector';
import { PrintingTechniqueSelector } from '../_components/printing-technique-selector';
import { ModelSelector } from '../_components/model-selector';
import { useCreateProductDesignMutation } from '@/graphql/generated/graphql';
import { toast } from 'sonner';

interface TShirtProduct {
  name: string;
  price: number;
  image: string;
  sizes: string[];
  colors: Array<{
    name: string;
    hex: string;
  }>;
  printingTechniques: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
  }>;
}

export default function TShirtPage() {
  const product: TShirtProduct = {
    name: 'T-Shirt',
    price: 24.99,
    image: '/assets/tshirt-thumbnail.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Blue', hex: '#0066cc' },
      { name: 'Red', hex: '#cc0000' },
    ],
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

  const [createProductDesign, { loading }] = useCreateProductDesignMutation();

  async function onSubmit() {
    try {
      await createProductDesign({
        variables: {
          input: {
            blankVariantId: 'bv001',
            isFinalized: false,
            isPublic: false,
            isTemplate: false,
          },
        },
      });
      toast.success('Product created successfully.');
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
        <ProductImageGallery {...product} />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-6">
            <ModelSelector sizes={product.sizes} />
            <ColorSelector colors={product.colors} />
            <PrintingTechniqueSelector
              techniques={product.printingTechniques}
            />
          </div>

          <VolumeDiscount />

          <Button size="lg" className="w-full">
            <Paintbrush className="mr-2 h-5 w-5" />
            Start Designing
          </Button>
        </div>
      </div>
    </div>
  );
}
