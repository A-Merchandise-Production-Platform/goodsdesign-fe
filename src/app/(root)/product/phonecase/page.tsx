import Link from 'next/link';
import { ArrowLeft, Paintbrush } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  ProductImageGallery,
} from '../_components/product-image-gallery';
import { VolumeDiscount } from '../_components/volume-discount';
import { ColorSelector } from '../_components/color-selector';
import { PrintingTechniqueSelector } from '../_components/printing-technique-selector';
import { ModelSelector } from '../_components/model-selector';

export default function PhoneCasePage() {
  const product = {
    name: 'Phone Case',
    price: 19.99,
    image: '/assets/phonecase-thumbnail.png',
    sizes: [
      'iPhone 13',
      'iPhone 14',
      'iPhone 15',
      'Samsung S22',
      'Samsung S23',
    ],
    colors: [
      { name: 'Clear', hex: '#f8f9fa' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Blue', hex: '#0066cc' },
    ],
    printingTechniques: [
      {
        id: 'uv-printing',
        name: 'UV Printing',
        description: 'Vibrant colors with excellent durability',
        price: 6.99,
      },
      {
        id: 'sublimation',
        name: 'Sublimation',
        description: 'Full coverage with rich colors',
        price: 8.99,
      },
      {
        id: 'laser-engraving',
        name: 'Laser Engraving',
        description: 'Elegant etched look for a premium feel',
        price: 10.99,
      },
    ],
  };

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
            <ModelSelector sizes={product.sizes} title="Phone Model" />
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
