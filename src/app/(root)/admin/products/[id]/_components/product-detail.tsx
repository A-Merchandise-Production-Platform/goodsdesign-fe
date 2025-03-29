'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetProductByIdQuery } from '@/graphql/generated/graphql';
import { Eye, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductOverview from '@/app/(root)/admin/products/[id]/_components/product-overview';
import ProductDiscount from '@/app/(root)/admin/products/[id]/_components/product-discount';

export default function ProductAdminConfig() {
  const { id } = useParams();

  const { data, loading } = useGetProductByIdQuery({
    variables: {
      productId: id as string,
    },
  });

  const product = data?.product;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <div>
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <p className="text-muted-foreground text-sm">
            {product?.description}
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {product && <ProductOverview product={product} />}
        </TabsContent>
        <TabsContent value="discounts">
          <ProductDiscount />
        </TabsContent>
        <TabsContent value="variants">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
