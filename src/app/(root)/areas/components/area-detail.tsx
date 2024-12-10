'use client';

import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BlankProductInStock,
  FinalProductInStock,
} from '@/types/product-in-stock';

export default function AreaDetail({ params }: { params: { slug: string } }) {
  const [blankProducts, setBlankProducts] = useState<BlankProductInStock[]>([
    {
      id: '1',
      productVariantId: 'var1',
      areaId: params.slug,
      quantityInStock: 10,
    },
    {
      id: '2',
      productVariantId: 'var2',
      areaId: params.slug,
      quantityInStock: 15,
    },
  ]);

  const [finalProducts, setFinalProducts] = useState<FinalProductInStock[]>([
    {
      id: '1',
      orderId: 'ord1',
      productDesignId: 'des1',
      areaId: params.slug,
      quantityInStock: 5,
    },
    {
      id: '2',
      orderId: 'ord2',
      productDesignId: 'des2',
      areaId: params.slug,
      quantityInStock: 8,
    },
  ]);

  return (
    <div>
      {/* <h1 className="mb-6 text-2xl font-bold">{areaName} - Products</h1> */}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Blank Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Variant</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blankProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.productVariantId}</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Final Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Design ID</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.orderId}</TableCell>
                    <TableCell>{product.productDesignId}</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
