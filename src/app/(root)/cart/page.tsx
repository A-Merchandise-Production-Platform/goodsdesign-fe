'use client';

import {
  Info,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CartItemEntity,
  DesignPositionEntity,
  useCreateOrderMutation,
  useGetUserCartItemsQuery,
  useUpdateCartItemMutation,
} from '@/graphql/generated/graphql';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';

// Interface for price calculation return values
interface ItemPriceCalculation {
  unitPrice: number;
  totalPrice: number;
  discountApplied: boolean;
  discountPercent: number;
}

export default function CartPage() {
  const { data, loading, refetch } = useGetUserCartItemsQuery();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {},
  );

  const [updateCartItem, { loading: updateCartItemLoading }] =
    useUpdateCartItemMutation({
      onCompleted: data => {
        console.log(data);
        refetch();
      },
      onError: error => {
        toast({
          title: 'Update failed',
          description: error.message,
          variant: 'destructive',
        });
      },
    });

  const [createOrder, { loading: createOrderLoading }] = useCreateOrderMutation(
    {
      onCompleted: data => {
        toast({
          title: 'Order created',
          description: 'Your order has been placed successfully!',
        });
        setIsCheckingOut(false);
        refetch();
      },
      onError: error => {
        toast({
          title: 'Checkout failed',
          description: error.message,
          variant: 'destructive',
        });
        setIsCheckingOut(false);
      },
    },
  );

  const cartItems = (data?.userCartItems || []) as CartItemEntity[];

  // Function to calculate price for a single cart item
  const calculateItemPrice = (item: CartItemEntity): ItemPriceCalculation => {
    if (!item.design?.systemConfigVariant || !item.design.designPositions) {
      return {
        unitPrice: 0,
        totalPrice: 0,
        discountApplied: false,
        discountPercent: 0,
      };
    }
    const blankPrice = item.design.systemConfigVariant.price || 0;
    // Calculate total for positions that have designs
    const positionPrices = item.design.designPositions.reduce(
      (total: number, position: DesignPositionEntity) => {
        // Only add price if position has designJSON (has design)
        if (position.designJSON && position.designJSON.length > 0) {
          return total + (position.positionType?.basePrice || 0);
        }
        return total;
      },
      0,
    );

    // Calculate base price without discounts
    const basePrice = blankPrice + positionPrices;

    // Check for applicable discounts
    const discounts = item.design.systemConfigVariant.product.discounts || [];
    let discountPercent = 0;

    for (const discount of discounts) {
      if (
        item.quantity >= discount.minQuantity &&
        discount.discountPercent > discountPercent
      ) {
        discountPercent = discount.discountPercent;
      }
    }

    // Apply discount if applicable
    const discountedPrice = basePrice * (1 - discountPercent);

    return {
      unitPrice: discountedPrice,
      totalPrice: discountedPrice * item.quantity,
      discountApplied: discountPercent > 0,
      discountPercent: discountPercent * 100,
    };
  };

  // Get only selected cart items
  const selectedCartItems = cartItems.filter(item => selectedItems[item.id]);

  // Calculate cart totals for selected items only
  const cartTotal = selectedCartItems.reduce(
    (total: number, item: CartItemEntity) => {
      return total + calculateItemPrice(item).totalPrice;
    },
    0,
  );

  // Handle quantity changes
  const handleQuantityChange = (id: string, newQuantity: number): void => {
    updateCartItem({
      variables: {
        updateCartItemId: id,
        updateCartItemInput: {
          quantity: newQuantity,
        },
      },
    });
  };

  // Handle item removal
  const handleRemoveItem = (id: string): void => {
    // In a real app, this would call a mutation to remove the item
    console.log(`Removing item ${id} from cart`);
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart',
      variant: 'destructive',
    });
    // Refetch cart data after removal
    // refetch();
  };

  // Handle item selection
  const handleItemSelect = (id: string, isChecked: boolean): void => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: isChecked,
    }));
  };

  // Toggle all items
  const handleToggleAll = (check: boolean): void => {
    const newSelection: Record<string, boolean> = {};
    cartItems.forEach(item => {
      newSelection[item.id] = check;
    });
    setSelectedItems(newSelection);
  };

  // Check if all items are selected
  const areAllItemsSelected =
    cartItems.length > 0 && cartItems.every(item => selectedItems[item.id]);

  // Handle checkout
  const handleCheckout = (): void => {
    if (selectedCartItems.length === 0) {
      toast({
        title: 'No items selected',
        description: 'Please select items to checkout',
        variant: 'destructive',
      });
      return;
    }

    setIsCheckingOut(true);

    createOrder({
      variables: {
        createOrderInput: {
          orderDetails: selectedCartItems.map(item => {
            return {
              cartItemId: item.id,
            };
          }),
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
        <Card className="p-8 text-center">
          <ShoppingCart className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button>Continue Shopping</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center">
            <Checkbox
              id="select-all"
              checked={areAllItemsSelected}
              onCheckedChange={handleToggleAll}
            />
            <label htmlFor="select-all" className="ml-2 cursor-pointer">
              Select All Items
            </label>
          </div>

          {cartItems.map(item => {
            const { unitPrice, totalPrice, discountApplied, discountPercent } =
              calculateItemPrice(item);
            const product = item?.design?.systemConfigVariant?.product;
            const variant = item?.design?.systemConfigVariant;

            // Filter positions that have designs and get their names and prices
            const activePositions = item?.design?.designPositions
              ?.filter(pos => pos.designJSON && pos.designJSON.length > 0)
              ?.map((pos: DesignPositionEntity) => ({
                name: pos.positionType?.positionName || '',
                price: pos.positionType?.basePrice || 0,
              }));

            const positionNames = activePositions?.map(p => p.name).join(', ');

            return (
              <Card key={item.id} className="mb-4 overflow-hidden">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
                  <div className="flex items-center">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={selectedItems[item.id] || false}
                      onCheckedChange={checked =>
                        handleItemSelect(item.id, !!checked)
                      }
                    />
                  </div>

                  <div className="bg-muted relative mx-auto h-32 w-32 flex-shrink-0 rounded-md sm:mx-0">
                    <Image
                      src={
                        item.design?.thumbnailUrl ||
                        '/placeholder.svg?height=128&width=128'
                      }
                      alt={product?.name || 'Product image'}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {product?.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <p className="text-muted-foreground text-sm">Size:</p>
                          <p>{variant?.size}</p>
                        </div>
                        <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                          Color:
                          <span
                            className="mt-[2px] inline-block h-4 w-4 rounded-full border"
                            style={{
                              backgroundColor: variant?.color || '#ffffff',
                            }}
                          ></span>
                        </p>
                        {item?.design?.isTemplate && (
                          <Badge variant="outline" className="mt-1">
                            Template Design
                          </Badge>
                        )}
                      </div>

                      <div className="mt-2 text-right sm:mt-0">
                        <div className="flex items-center justify-end gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="hover:text-primary">
                                <Info className="h-4 w-4" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-[200px] space-y-2"
                              align="end"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Base Price:</span>
                                  <span className="text-muted-foreground">
                                    {formatPrice(variant?.price || 0)}
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
                                <div className="border-t pt-2">
                                  <div className="flex items-center justify-between font-medium">
                                    <span className="text-sm">Per Item:</span>
                                    <span>{formatPrice(unitPrice)}</span>
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <span className="font-semibold">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                        {discountApplied && (
                          <Badge variant="secondary" className="mt-1">
                            {discountPercent}% discount applied
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          disabled={item.quantity <= 1 || updateCartItemLoading}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={updateCartItemLoading}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4 p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <Separator className="my-4" />

            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({selectedCartItems.length} items)
                </span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Cost</span>
                <span>Calculated when finished production</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={createOrderLoading || selectedCartItems.length === 0}
            >
              {createOrderLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>

            <p className="text-muted-foreground mt-4 text-center text-xs">
              Taxes and discounts calculated at checkout
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
