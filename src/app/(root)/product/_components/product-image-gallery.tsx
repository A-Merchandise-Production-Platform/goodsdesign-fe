import Image from 'next/image';

export interface ProductImageGalleryProps {
  name: string;
  price: number;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  printingTechniques: { name: string; description: string; price: number }[];
}

export function ProductImageGallery(props: ProductImageGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={props.image || '/placeholder.svg'}
          alt={props.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="hover:border-primary relative aspect-square cursor-pointer overflow-hidden rounded-md border"
          >
            <Image
              src={props.image || '/placeholder.svg'}
              alt={`${props.name} view ${i}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
