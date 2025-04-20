'use client';

import { useGetProductByIdQuery } from '@/graphql/generated/graphql';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Package, Tag, Trash } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DashboardShell } from '@/components/dashboard-shell';
import DetailsTab from '@/app/(root)/admin/products/[id]/_components/details-tab';
import VarriantsTab from '@/app/(root)/admin/products/[id]/_components/varriants-tab';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data, loading, error } = useGetProductByIdQuery({
    variables: {
      productId: id as string,
    },
  });

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="text-muted-foreground">
          {error?.message || 'Unable to load product details'}
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const product = data.product;
  const lowestPrice =
    product.variants && product.variants.length > 0
      ? Math.min(...product.variants.map(variant => variant?.price || 0))
      : 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.isActive ? (
            <Badge className="ml-2">Active</Badge>
          ) : (
            <Badge variant="outline" className="ml-2">
              Inactive
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Product Image */}
        <Card className="h-fit md:col-span-1">
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-md border">
              <Image
                src={product.imageUrl || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              View and manage product information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <DetailsTab product={product} />
              </TabsContent>

              <TabsContent value="variants">
                <VarriantsTab product={product} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
