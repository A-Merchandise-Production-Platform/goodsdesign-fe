import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { Roles } from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

interface DesignCardProps {
  id: string;
  name: string;
  price?: number;
  image?: string;
  description?: string;
  category: string;
  isLoading?: boolean;
  onDuplicate?: (options: {
    variables: {
      duplicateProductDesignId: string;
    };
  }) => void;
}

export function DesignCard({
  id,
  name,
  price,
  image,
  description,
  category,
  isLoading,
  onDuplicate,
}: DesignCardProps) {
  const categoryStyles: any = {
    'T-Shirt': 'bg-blue-100 text-blue-800',
    'Phone Case': 'bg-purple-100 text-purple-800',
  };

  const { user } = useAuthStore();

  return (
    <Card className="h-full overflow-hidden pt-0 transition-all hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <div className="group relative h-[320px] w-full">
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover"
          />
          <div className="bg-muted/60 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            {user?.role === Roles.Customer ? (
              <Button
                onClick={() =>
                  onDuplicate?.({ variables: { duplicateProductDesignId: id } })
                }
                variant="default"
                size="sm"
                className="font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Use Design'}
              </Button>
            ) : user ? (
              <Button
                variant="default"
                size="sm"
                className="font-medium"
                disabled
              >
                Only for customers
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="font-medium"
                asChild
              >
                <Link href="/login">Login to start</Link>
              </Button>
            )}
          </div>
          <div className="absolute top-2 right-2">
            <span
              className={`rounded-full px-2 py-1 text-xs ${categoryStyles[category]}`}
            >
              {category}
            </span>
          </div>
        </div>
        <Link href={`/view/tshirt/${id}`}>
          <div className="flex flex-grow flex-col p-4">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-semibold">{name}</h3>
              {price && (
                <p className="text-primary font-medium">{formatPrice(price)}</p>
              )}
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
