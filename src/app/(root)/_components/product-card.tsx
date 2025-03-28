import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  route: string;
  name: string;
  price: number;
  image?: string;
  description: string;
}

export function ProductCard({
  route,
  name,
  price,
  image,
  description,
}: ProductCardProps) {
  return (
    <Link
      href={route}
      className="block rounded-xl transition-all hover:shadow-md"
    >
      <Card className="h-full overflow-hidden pt-0 pb-2">
        <CardContent className="flex h-full flex-col p-0">
          <div className="relative h-[300px] w-full">
            <Image
              src={image || '/placeholder.svg'}
              alt={name}
              fill
              className="object-cover dark:hidden"
            />
            <Image
              src={
                'https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/an-ba-to-com-2-1725471597.jpg'
              }
              alt={name}
              fill
              className="hidden object-cover invert dark:block"
            />
          </div>
          <div className="flex flex-grow flex-col p-6">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-muted-foreground mb-2">${price.toFixed(2)}</p>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
