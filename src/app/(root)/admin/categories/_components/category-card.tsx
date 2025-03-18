import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, PackageSearch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

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
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="bg-card rounded-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button variant="outline">+ Add New Categories</Button>
      </div>
      {filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed py-12">
          <PackageSearch className="text-muted-foreground h-12 w-12" />
          <div className="text-xl font-medium">No categories found</div>
          <div className="text-muted-foreground text-sm">
            {searchTerm
              ? `No results for "${searchTerm}"`
              : 'No categories available'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map(category => (
            <Card
              className="h-full overflow-hidden pt-0 transition-all duration-200 hover:shadow-lg"
              key={category.id}
            >
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
          ))}
        </div>
      )}
    </div>
  );
}
