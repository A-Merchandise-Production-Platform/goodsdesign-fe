import { Info, MinusCircle, Plus, PlusCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CartItemEntity,
  DesignPositionEntity,
  SystemConfigVariantEntity,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

interface PriceInfo {
  originalPrice: number;
  unitPrice: number;
  totalPrice: number;
  discountApplied: boolean;
  discountPercent: number;
}

interface CartItemProps {
  items: CartItemEntity[];
  priceInfos: Record<string, PriceInfo>;
  selectedItems: Record<string, boolean>;
  onSelect: (id: string, checked: boolean) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (items: CartItemEntity[]) => void;
  onRemoveVariant: (itemId: string) => void;
  isUpdating: boolean;
  onAddSize: (designId: string, variantId: string, quantity: number) => void;
  availableVariants: SystemConfigVariantEntity[] | null | undefined;
}

export const CartItem: FC<CartItemProps> = ({
  items,
  priceInfos,
  selectedItems,
  onSelect,
  onQuantityChange,
  onRemove,
  onRemoveVariant,
  isUpdating,
  onAddSize,
  availableVariants,
}) => {
  const [isAddSizeOpen, setIsAddSizeOpen] = useState(false);
  const [newSize, setNewSize] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  // Keep local quantities in sync with items' quantities
  useEffect(() => {
    const newQuantities: Record<string, string> = {};
    items.forEach(item => {
      newQuantities[item.id] = item.quantity.toString();
    });
    setQuantities(newQuantities);
  }, [items]);

  // All items share the same design and product, so we can use the first item
  const firstItem = items[0];
  const design = firstItem.design;
  const product = firstItem.systemConfigVariant?.product;
  const color = firstItem.systemConfigVariant?.color;

  // Get available sizes that are not already in cart
  const existingSizes = new Set(
    items.map(item => item.systemConfigVariant?.size),
  );
  const availableSizes =
    availableVariants
      ?.filter(v => v.color === color && v.size && !existingSizes.has(v.size))
      .map(v => v.size)
      .filter((size): size is string => size !== null && size !== undefined) ||
    [];

  const activePositions = design?.designPositions
    ?.filter(pos => pos.designJSON && pos.designJSON.length > 0)
    ?.map((pos: DesignPositionEntity) => ({
      name: pos.positionType?.positionName || '',
      price: pos.positionType?.basePrice || 0,
    }));

  const handleAddSize = () => {
    if (!design?.id || !newSize) return;

    const variant = availableVariants?.find(
      v => v.size === newSize && v.color === color,
    );

    if (variant?.id) {
      onAddSize(design.id, variant.id, newQuantity);
      setIsAddSizeOpen(false);
      setNewSize('');
      setNewQuantity(1);
    }
  };

  const handleQuantityInput = (id: string, value: string) => {
    // Only update local state while typing
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const handleQuantityBlur = (id: string, currentQuantity: number) => {
    const value = quantities[id];
    const numValue = parseInt(value, 10);

    if (isNaN(numValue) || numValue < 1) {
      // Reset to current quantity if invalid
      setQuantities(prev => ({ ...prev, [id]: currentQuantity.toString() }));
    } else if (numValue !== currentQuantity) {
      // Only update if value has changed
      onQuantityChange(id, numValue);
    }
  };

  const handleQuantityButtonClick = (id: string, newQuantity: number) => {
    // Update both local state and server
    setQuantities(prev => ({ ...prev, [id]: newQuantity.toString() }));
    onQuantityChange(id, newQuantity);
  };

  // Calculate totals for this design
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (priceInfos[item.id]?.totalPrice || 0),
    0,
  );

  // Check if all variants of this design are selected
  const isDesignSelected = items.every(item => selectedItems[item.id]);

  // Handle selection of all variants
  const handleDesignSelect = (checked: boolean) => {
    items.forEach(item => {
      onSelect(item.id, checked);
    });
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
        <div className="flex gap-4">
          <Checkbox
            checked={isDesignSelected}
            onCheckedChange={handleDesignSelect}
            className="mt-2"
          />
          <div className="bg-muted relative mx-auto h-32 w-32 flex-shrink-0 rounded-md sm:mx-0">
            <Image
              src={
                design?.thumbnailUrl || '/placeholder.svg?height=128&width=128'
              }
              alt={product?.name || 'Product image'}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product?.name}</h3>
                <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                  Color:
                  <span
                    className="mt-[2px] inline-block h-4 w-4 rounded-full border"
                    style={{
                      backgroundColor: color || '#ffffff',
                    }}
                  ></span>
                </p>
                {design?.isTemplate && (
                  <Badge variant="outline" className="mt-1">
                    Template Design
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive/90"
                onClick={() => onRemove(items)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {items.map(item => {
              const priceInfo = priceInfos[item.id];
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-t pt-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <p className="w-14 font-medium">
                        Size: {item.systemConfigVariant?.size}
                      </p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[200px] space-y-2"
                          align="start"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Base Price:</span>
                              <span className="text-muted-foreground">
                                {formatPrice(
                                  item.systemConfigVariant?.price || 0,
                                )}
                              </span>
                            </div>
                            {activePositions?.map(pos => (
                              <div
                                key={pos.name}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm capitalize">
                                  {pos.name}:
                                </span>
                                <span className="text-muted-foreground">
                                  +{formatPrice(pos.price)}
                                </span>
                              </div>
                            ))}
                            <div className="border-t pt-2" />

                            {priceInfo.discountApplied && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Discount:</span>
                                <span className="text-green-600">
                                  -
                                  {formatPrice(
                                    priceInfo.originalPrice *
                                      (priceInfo.discountPercent / 100),
                                  )}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center justify-between font-medium">
                              <span className="text-sm">Total:</span>
                              <span>{formatPrice(priceInfo.unitPrice)}</span>
                              </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityButtonClick(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        disabled={item.quantity <= 1 || isUpdating}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Input
                        type="text"
                        value={quantities[item.id] || item.quantity}
                        onChange={e =>
                          handleQuantityInput(item.id, e.target.value)
                        }
                        onBlur={() =>
                          handleQuantityBlur(item.id, item.quantity)
                        }
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          }
                        }}
                        className="h-9 w-14 text-center"
                        disabled={isUpdating}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityButtonClick(item.id, item.quantity + 1)
                        }
                        disabled={isUpdating}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="w-25 font-semibold">
                        {formatPrice(priceInfo.totalPrice)}
                      </p>
                      {priceInfo.discountApplied && (
                        <Badge variant="secondary" className="mt-1">
                          {priceInfo.discountPercent}% off
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive/90"
                      onClick={() => onRemoveVariant(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div>
              {availableSizes.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddSizeOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Size
                </Button>
              )}
            </div>
            <div className="bg-muted flex items-center gap-2 rounded-lg px-4 py-2">
              <div>
                <span className="text-muted-foreground mr-2 text-sm">
                  Quantity:
                </span>
                <span className="text-lg font-medium">{totalQuantity}</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <span className="text-muted-foreground mr-2 text-sm">
                  Subtotal:
                </span>
                <span className="text-lg font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddSizeOpen} onOpenChange={setIsAddSizeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Size</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label htmlFor="size" className="mb-2 block">
                  Size
                </label>
                <Select value={newSize} onValueChange={setNewSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSizes.map(size => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="quantity" className="mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
                    disabled={newQuantity <= 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    type="text"
                    value={newQuantity}
                    onChange={e => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value) && value > 0) {
                        setNewQuantity(value);
                      }
                    }}
                    onBlur={() => {
                      if (newQuantity < 1) {
                        setNewQuantity(1);
                      }
                    }}
                    className="h-9 w-14 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNewQuantity(newQuantity + 1)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddSizeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSize} disabled={!newSize}>
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
