/* eslint-disable unicorn/no-null */
'use client';

import { useQuery } from '@tanstack/react-query';
import { CirclePlus, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ProductApi } from '@/api/product';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InputWithUnit } from '@/components/ui/input-with-unit';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Product } from '@/types/product';

interface ProductSelectProps {
  onSelect: (selectedProducts: SelectedProduct[]) => void;
  value: SelectedProduct[];
}

interface SelectedProduct {
  productId: string;
  productionCapacity: number;
}

export default function ProductSelect({ onSelect, value }: ProductSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] =
    useState<SelectedProduct[]>(value);
  const [currentSelection, setCurrentSelection] =
    useState<SelectedProduct | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      ProductApi.getAll({
        select: ['id', 'name', 'imageUrl'],
        filter: { isDeleted: false },
      }),
  });

  useEffect(() => {
    if (data) {
      setProducts(data.value);
    }
  }, [data]);

  const handleSubmit = () => {
    if (currentSelection) {
      const updatedSelection = [...selectedProducts, currentSelection];
      setSelectedProducts(updatedSelection);
      onSelect(updatedSelection);
      setCurrentSelection(null);
      setIsOpen(false);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedSelection = selectedProducts.filter(
      item => item.productId !== productId,
    );
    setSelectedProducts(updatedSelection);
    onSelect(updatedSelection);
  };

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
            isLoading={isLoading}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <CirclePlus size={16} />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Product for your factory</DialogTitle>
            <DialogDescription>
              Select the product that you want to produce in your factory.
            </DialogDescription>
          </DialogHeader>
          <div className="gap-4">
            <div className="aspect-square w-full">
              {currentSelection ? (
                <Image
                  src={
                    products.find(p => p.id === currentSelection.productId)
                      ?.imageUrl || ''
                  }
                  alt={
                    products.find(p => p.id === currentSelection.productId)
                      ?.name || ''
                  }
                  width={100}
                  height={100}
                  className="aspect-square w-full rounded object-cover"
                />
              ) : (
                <div className="bg-muted aspect-square w-full rounded"></div>
              )}
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-1/2 space-y-2">
                <Label>Product</Label>
                <Select
                  onValueChange={value => {
                    setCurrentSelection({
                      productId: value,
                      productionCapacity: 1,
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem value={product.id} key={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2 space-y-2">
                <Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Production Capacity</TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This is the maximum number of units of the product
                          that you can produce in a day.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <InputWithUnit
                  type="number"
                  unit="/day"
                  placeholder="1"
                  min={1}
                  defaultValue={1}
                  onChange={value => {
                    if (currentSelection) {
                      setCurrentSelection({
                        ...currentSelection,
                        productionCapacity: Number(value.target.value),
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <Separator className="mt-4" />
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setCurrentSelection(null);
              }}
              className="w-full"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-full">
              Add Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-4 space-y-2">
        {selectedProducts.map(item => (
          <div
            key={item.productId}
            className="bg-background flex items-center justify-between rounded-md border pl-2 text-sm"
          >
            <span>
              {products.find(p => p.id === item.productId)?.name} -{' '}
              {item.productionCapacity}/day
            </span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleRemoveProduct(item.productId)}
            >
              <Trash2Icon size={16} className="text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
