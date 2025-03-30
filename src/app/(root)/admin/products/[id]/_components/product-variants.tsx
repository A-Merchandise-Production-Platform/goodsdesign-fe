'use client';

import { useSystemConfigVariantsByProductQuery } from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';
import { useParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProductVariants() {
  const { id } = useParams();
  const { data, loading } = useSystemConfigVariantsByProductQuery({
    variables: {
      productId: id as string,
    },
  });

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  const variants = data?.systemConfigVariantsByProduct || [];

  if (variants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">
          No variants found for this product
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-end">
        <AddVariantDialog />
      </div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map(variant => (
            <TableRow key={variant.id}>
              <TableCell>{variant.model || '-'}</TableCell>
              <TableCell>{variant.color || '-'}</TableCell>
              <TableCell>{variant.size || '-'}</TableCell>
              <TableCell>
                {variant.price ? formatPrice(variant.price) : '-'}
              </TableCell>
              <TableCell>
                <Badge variant={variant.isActive ? 'default' : 'destructive'}>
                  {variant.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AddVariantDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Variant</DialogTitle>
          <DialogDescription>
            Add a new variant to this product
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
