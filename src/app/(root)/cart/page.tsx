'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  CartItemEntity,
  DesignPositionEntity,
  SystemConfigVariantEntity,
  useCreateCartItemMutation,
  useCreateOrderMutation,
  useDeleteCartItemMutation,
  useGetProductVariantByIdLazyQuery,
  useGetUserCartItemsQuery,
  useUpdateCartItemMutation,
} from '@/graphql/generated/graphql';

import { CartHeader } from './_components/cart-header';
import { CartItem } from './_components/cart-item';
import { EmptyCart } from './_components/empty-cart';
import { LoadingCart } from './_components/loading-cart';
import { OrderSummary } from './_components/order-summary';

// Interface for price calculation return values
interface ItemPriceCalculation {
  originalPrice: number;
  unitPrice: number;
  totalPrice: number;
  discountApplied: boolean;
  discountPercent: number;
}

export default function CartPage() {
  const router = useRouter();
  const { data, loading, refetch } = useGetUserCartItemsQuery();
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {},
  );
  const [productVariants, setProductVariants] = useState<
    Record<string, SystemConfigVariantEntity[]>
  >({});

  const [getProductVariants] = useGetProductVariantByIdLazyQuery();

  const [updateCartItem, { loading: updateCartItemLoading }] =
    useUpdateCartItemMutation({
      onCompleted: () => {
        refetch();
      },
      onError: error => {
        toast.error(error.message);
      },
    });

  const [createCartItem] = useCreateCartItemMutation({
    onCompleted: () => {
      refetch();
      toast.success('Size added to cart');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const [deleteCartItem] = useDeleteCartItemMutation();

  const [createOrder] = useCreateOrderMutation({
    onCompleted: data => {
      const orderId = data.createOrder.id;
      toast.success('Your order has been placed successfully!');
      setIsCheckingOut(false);
      refetch();
      router.push(`/my-order/${orderId}`);
    },
    onError: error => {
      toast.error(error.message);
      setIsCheckingOut(false);
    },
  });

  const cartItems = (data?.userCartItems || []) as CartItemEntity[];

  // Group cart items by design ID
  const groupedCartItems = useMemo(() => {
    const groups: Record<string, CartItemEntity[]> = {};
    cartItems.forEach(item => {
      if (item.design?.id) {
        if (!groups[item.design.id]) {
          groups[item.design.id] = [];
        }
        groups[item.design.id].push(item);
      }
    });
    return groups;
  }, [cartItems]);

  // Handle removing a design (all its variants)
  const handleRemoveDesign = async (items: CartItemEntity[]) => {
    try {
      const deletePromises = items.map(item =>
        deleteCartItem({
          variables: {
            deleteCartItemId: item.id,
          },
        }).then(result => {
          if (result.errors) {
            throw result.errors[0];
          }
          return result.data;
        }),
      );

      await Promise.all(deletePromises);
      toast.success('Items removed from cart');
      refetch();
    } catch (error) {
      toast.error('Failed to remove some items');
    }
  };

  // Handle removing a single variant
  const handleRemoveVariant = async (itemId: string) => {
    try {
      await deleteCartItem({
        variables: {
          deleteCartItemId: itemId,
        },
      });
      toast.success('Item removed from cart');
      refetch();
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  // Get unique product IDs and fetch their variants
  useEffect(() => {
    const fetchVariants = async () => {
      const uniqueProductIds = new Set<string>();
      cartItems.forEach(item => {
        const productId = item.systemConfigVariant?.product?.id;
        if (productId) {
          uniqueProductIds.add(productId);
        }
      });

      if (uniqueProductIds.size === 0) return;

      try {
        const variants: Record<string, SystemConfigVariantEntity[]> = {};
        await Promise.all(
          Array.from(uniqueProductIds).map(async productId => {
            const result = await getProductVariants({
              variables: { productId },
            });
            if (result.data?.product?.variants) {
              variants[productId] = result.data.product
                .variants as SystemConfigVariantEntity[];
            }
          }),
        );
        setProductVariants(variants);
      } catch (error) {
        console.error('Error fetching variants:', error);
      }
    };

    fetchVariants();
  }, [cartItems, getProductVariants]);

  // Function to calculate price for a single cart item
  const calculateItemPrice = (item: CartItemEntity): ItemPriceCalculation => {
    if (
      !item.design ||
      !item.systemConfigVariant ||
      !item.design.designPositions
    ) {
      return {
        originalPrice: 0,
        unitPrice: 0,
        totalPrice: 0,
        discountApplied: false,
        discountPercent: 0,
      };
    }
    const blankPrice = item.systemConfigVariant.price || 0;
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
    const discounts = item.systemConfigVariant.product.discounts || [];
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
      originalPrice: basePrice,
      unitPrice: discountedPrice,
      totalPrice: discountedPrice * item.quantity,
      discountApplied: discountPercent > 0,
      discountPercent: discountPercent * 100,
    };
  };

  // Calculate price info for all items
  const priceInfos = useMemo(() => {
    const infos: Record<string, ItemPriceCalculation> = {};
    cartItems.forEach(item => {
      infos[item.id] = calculateItemPrice(item);
    });
    return infos;
  }, [cartItems]);

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

  // Handle adding new size
  const handleAddSize = (
    designId: string,
    variantId: string,
    quantity: number,
  ): void => {
    createCartItem({
      variables: {
        createCartItemInput: {
          designId,
          quantity,
          systemConfigVariantId: variantId,
        },
      },
    });
  };

  // Handle checkout
  const handleCheckout = (): void => {
    if (selectedCartItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }

    setIsCheckingOut(true);
    createOrder({
      variables: {
        createOrderInput: {
          orderDetails: selectedCartItems.map(item => ({
            cartItemId: item.id,
          })),
        },
      },
    });
  };

  if (loading) {
    return <LoadingCart />;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <CartHeader
        itemCount={cartItems.length}
        areAllItemsSelected={areAllItemsSelected}
        onToggleAll={handleToggleAll}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {Object.entries(groupedCartItems).map(([designId, items]) => {
            const productId = items[0].systemConfigVariant?.product?.id;
            return (
              <CartItem
                key={designId}
                items={items}
                priceInfos={priceInfos}
                selectedItems={selectedItems}
                onSelect={handleItemSelect}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveDesign}
                onRemoveVariant={handleRemoveVariant}
                isUpdating={updateCartItemLoading}
                onAddSize={handleAddSize}
                availableVariants={
                  productId ? productVariants[productId] : undefined
                }
              />
            );
          })}
        </div>

        <OrderSummary
          selectedItemCount={selectedCartItems.length}
          cartTotal={cartTotal}
          onCheckout={handleCheckout}
          isProcessing={isCheckingOut}
        />
      </div>
    </div>
  );
}
