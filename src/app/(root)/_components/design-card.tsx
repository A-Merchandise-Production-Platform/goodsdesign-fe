import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

type DesignCategory = 'T-shirt' | 'Phone Case';

interface DesignCardProps {
  name: string;
  price: number;
  image?: string;
  description: string;
  category: DesignCategory;
}

export function DesignCard({
  name,
  price,
  image,
  description,
  category,
}: DesignCardProps) {
  const categoryStyles: Record<DesignCategory, string> = {
    'T-shirt': 'bg-blue-100 text-blue-800',
    'Phone Case': 'bg-purple-100 text-purple-800',
  };

  return (
    <Card className="h-full overflow-hidden pt-0 transition-all hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <div className="group relative h-[180px] w-full">
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover dark:invert"
          />
          <div className="bg-muted/60 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="default" size="sm" className="font-medium">
              Preview Design
            </Button>
          </div>
          <div className="absolute top-2 right-2">
            <span
              className={`rounded-full px-2 py-1 text-xs ${categoryStyles[category]}`}
            >
              {category}
            </span>
          </div>
        </div>
        <div className="flex flex-grow flex-col p-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-primary font-medium">{formatPrice(price)}</p>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
