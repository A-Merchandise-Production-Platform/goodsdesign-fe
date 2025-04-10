import Image from 'next/image';

export interface ProductImageGalleryProps {
  name: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  printingTechniques: { name: string; description: string; price: number }[];
}

export function ProductImageGallery(props: ProductImageGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={props.image || '/assets/tshirt-thumbnail.png'}
          alt={props.name}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
