'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useProducts } from '@/app/(root)/admin/products/_hooks/use-products';

// Define types based on the provided data structure
interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  totalProducts: number | null;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category?: Category | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  isActive: boolean;
}

interface ProductsResponse {
  products: Product[];
}

export default function ProductList() {
  const { data, isLoading } = useProducts();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data?.products) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        No products found
      </div>
    );
  }

  // Get unique categories for filter dropdown
  const categories = [
    ...new Set(
      data.products
        .filter(product => product.category)
        .map(product => product.category!.name),
    ),
  ];

  // Filter products based on search term and filters
  const filteredProducts = data.products.filter(product => {
    if (!product.category) return false;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category.name === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && product.isActive) ||
      (statusFilter === 'inactive' && !product.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="bg-card rounded-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline">+ Add New Product</Button>
      </div>

      {/* Search and filters */}

      {/* Results count */}
      <div className="text-muted-foreground mb-4 flex items-center text-sm">
        <Filter className="mr-2 h-4 w-4" />
        <span>
          Showing {filteredProducts.length} of {data.products.length} products
        </span>
      </div>

      {/* Product grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              className="gap-2 overflow-hidden p-0 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="p-0">
                <div className="relative h-64 w-full">
                  <Image
                    src={`https://kzmq43w62mvulurot5d0.lite.vusercontent.net/placeholder.svg?height=400&width=600`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <h2 className="line-clamp-1 text-xl font-semibold">
                    {product.name}
                  </h2>
                  <Badge variant="outline" className="ml-2">
                    {product.category!.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {product.category!.description}
                </p>
                <div className="text-muted-foreground text-sm">
                  Added: {formatDate(product.createdAt)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg py-12 text-center">
          <h3 className="mb-2 text-xl font-medium">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
