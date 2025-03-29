'use client';

import {
  type GetAllDiscountByProductIdQuery,
  useGetAllDiscountByProductIdLazyQuery,
} from '@/graphql/generated/graphql';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Percent, Package, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import AddProductDiscountCard from '@/app/(root)/admin/products/[id]/_components/add-product-discount-card';

export default function ProductDiscount() {
  const { id } = useParams();

  const [getAllDiscountByProductId, { data, loading }] =
    useGetAllDiscountByProductIdLazyQuery({
      fetchPolicy: 'no-cache',
    });

  useEffect(() => {
    getAllDiscountByProductId({
      variables: {
        productId: id as string,
      },
    });
  }, [getAllDiscountByProductId, id]);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="text-muted-foreground animate-pulse">
          Loading discounts...
        </div>
      </div>
    );
  }

  // if (!data?.getAllDiscountByProductId.length) {
  //   return (
  //     <div className="flex h-40 items-center justify-center">
  //       <div className="text-muted-foreground">
  //         No discounts available for this product
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data?.getAllDiscountByProductId.map(discount => (
          <DiscountCard key={discount.id} discount={discount} />
        ))}
        <AddProductDiscountCard />
      </div>
    </div>
  );
}

function DiscountCard({
  discount,
}: {
  discount: GetAllDiscountByProductIdQuery['getAllDiscountByProductId'][0];
}) {
  // Format the discount percentage for display
  const discountPercentFormatted = `${(discount.discountPercent * 100).toFixed(0)}%`;

  // Format dates to be more readable
  const createdAtFormatted = formatDistanceToNow(new Date(discount.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="flex h-60 flex-col gap-2 overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <CardHeader className="">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{discount.name}</CardTitle>
            <CardDescription>
              {discount.isActive ? (
                <Badge
                  className="bg-primary/10 text-primary border-primary mt-1"
                  variant={'default'}
                >
                  Active
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-muted text-muted-foreground mt-1"
                >
                  <XCircle className="mr-1 h-3 w-3" /> Inactive
                </Badge>
              )}
            </CardDescription>
          </div>
          <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full font-bold">
            {discountPercentFormatted}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid gap-2">
          <div className="flex items-center text-sm">
            <Package className="text-muted-foreground mr-2 h-4 w-4" />
            <span className="font-medium">Minimum Quantity:</span>
            <span className="ml-2">{discount.minQuantity} units</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
            <span className="font-medium">Created:</span>
            <span className="ml-2">
              {format(new Date(discount.createdAt), 'HH:mm dd/MM/yyyy')}
            </span>
            <span className="text-muted-foreground ml-2">
              ({createdAtFormatted})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground w-full text-sm">
          <div className="flex items-center justify-between">
            <span>Discount ID: {discount.id.substring(0, 8)}...</span>
            <Badge
              variant={discount.isActive ? 'default' : 'secondary'}
              className="ml-auto"
            >
              Save {discountPercentFormatted}
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
