import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  totalProducts?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

interface CategoryCardProps {
  categories: Category[];
}

export default function CategoryCard({ categories }: CategoryCardProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="bg-card rounded-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
          </div>
        </div>
        <Button variant="outline">+ Add New Categories</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => (
          <Link
            href={`/categories/${category.id}`}
            key={category.id}
            className="group block"
          >
            <Card className="h-full overflow-hidden pt-0 transition-all duration-200 hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image
                  src={`https://kzmq43w62mvulurot5d0.lite.vusercontent.net/placeholder.svg?height=400&width=600`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/placeholder.svg?height=200&width=400`;
                  }}
                />
                {!category.isActive && (
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant="outline"
                      className="bg-background/80 backdrop-blur-sm"
                    >
                      Inactive
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <Badge variant="secondary">
                    {category.totalProducts}{' '}
                    {category.totalProducts === 1 ? 'product' : 'products'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter className="text-muted-foreground text-sm">
                Added on {new Date(category.createdAt).toLocaleDateString()}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
