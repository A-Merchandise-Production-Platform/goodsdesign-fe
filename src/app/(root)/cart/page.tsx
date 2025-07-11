'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  AddressEntity,
  AvailableVouchersQuery,
  CartItemEntity,
  DesignPositionEntity,
  SystemConfigVariantEntity,
  useCalculateShippingCostAndFactoryForCartMutation,
  useCreateCartItemMutation,
  useCreateOrderMutation,
  useDeleteCartItemMutation,
  useGetProductVariantByIdLazyQuery,
  useGetUserCartItemsQuery,
  useUpdateCartItemMutation,
  useOrderEvaluationCriteriaQuery,
} from '@/graphql/generated/graphql';

import { CartHeader } from './_components/cart-header';
import { CartItem } from './_components/cart-item';
import { EmptyCart } from './_components/empty-cart';
import { LoadingCart } from './_components/loading-cart';
import { OrderSummary } from './_components/order-summary';

// Type for voucher entity from the query
type VoucherEntityType = AvailableVouchersQuery['availableVouchers'][0];

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
  const [isLoadingVariants, setIsLoadingVariants] = useState(false);
  const [selectedVoucher, setSelectedVoucher] =
    useState<VoucherEntityType | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressEntity | null>(
    null,
  );
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [shippingCostError, setShippingCostError] = useState<string | null>(
    null,
  );
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [selectedEvaluationCriteriaIds, setSelectedEvaluationCriteriaIds] =
    useState<string[]>([]);
  const [expectedReceiveAt, setExpectedReceiveAt] = useState<Date | null>(null);

  const [calculateShippingCostAndFactoryForCart] =
    useCalculateShippingCostAndFactoryForCartMutation();

  const [getProductVariants] = useGetProductVariantByIdLazyQuery();

  const [updateCartItem, { loading: updateCartItemLoading }] =
    useUpdateCartItemMutation({
      onCompleted: () => {
        refetch();
      },
      onError: error => {
        toast.error(error.message);
      },
      refetchQueries: ['GetCartItemCount'],
    });

  const [createCartItem] = useCreateCartItemMutation({
    onCompleted: () => {
      refetch();
      toast.success('Size added to cart');
    },
    onError: error => {
      toast.error(error.message);
    },
    refetchQueries: ['GetCartItemCount'],
  });

  const [deleteCartItem] = useDeleteCartItemMutation({
    refetchQueries: ['GetCartItemCount'],
  });

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
    refetchQueries: ['GetCartItemCount'],
  });

  const cartItems = (data?.userCartItems || []) as CartItemEntity[];

  // Get only selected cart items
  const selectedCartItems = useMemo(
    () => cartItems.filter(item => selectedItems[item.id]),
    [cartItems, selectedItems],
  );

  // Get unique product IDs from selected cart items for evaluation criteria
  const selectedProductIds = useMemo(() => {
    const productIds = new Set<string>();
    selectedCartItems.forEach(item => {
      const productId = item.systemConfigVariant?.product?.id;
      if (productId) {
        productIds.add(productId);
      }
    });
    return Array.from(productIds);
  }, [selectedCartItems]);

  // Get the first product ID for evaluation criteria query
  // Note: Currently we only show evaluation criteria for the first product
  // In a multi-product cart, you might want to show criteria common to all products
  // or handle each product separately
  const firstProductId = selectedProductIds[0];

  // Fetch evaluation criteria for the selected products
  const { data: evaluationCriteriaData, loading: evaluationCriteriaLoading } =
    useOrderEvaluationCriteriaQuery({
      variables: {
        productId: firstProductId || '',
      },
      skip: !firstProductId, // Skip query if no product is selected
    });

  // Clear selected evaluation criteria when product changes (since criteria are product-specific)
  useEffect(() => {
    setSelectedEvaluationCriteriaIds([]);
  }, [firstProductId]);

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

  // Calculate price info for a group of items
  const calculateGroupPriceInfo = (items: CartItemEntity[]) => {
    // Get total quantity for the group to determine discount
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    // Get discounts from first item (all items in group share same product)
    const discounts = items[0]?.systemConfigVariant?.product?.discounts || [];
    let discountPercent = 0;

    // Find applicable discount based on total group quantity
    for (const discount of discounts) {
      if (
        totalQuantity >= discount.minQuantity &&
        discount.discountPercent > discountPercent
      ) {
        discountPercent = discount.discountPercent;
      }
    }

    // Calculate prices for each item with the same discount
    const itemPrices: Record<string, ItemPriceCalculation> = {};
    items.forEach(item => {
      if (!item.systemConfigVariant || !item.design) {
        itemPrices[item.id] = {
          originalPrice: 0,
          unitPrice: 0,
          totalPrice: 0,
          discountApplied: false,
          discountPercent: 0,
        };
        return;
      }

      const blankPrice = item.systemConfigVariant.price || 0;
      const positionPrices =
        item.design.designPositions?.reduce(
          (total: number, position: DesignPositionEntity) => {
            if (position.designJSON && position.designJSON.length > 0) {
              return total + (position.positionType?.basePrice || 0);
            }
            return total;
          },
          0,
        ) || 0;

      const originalPrice = blankPrice + positionPrices;
      const unitPrice = originalPrice * (1 - discountPercent);

      itemPrices[item.id] = {
        originalPrice,
        unitPrice,
        totalPrice: unitPrice * item.quantity,
        discountApplied: discountPercent > 0,
        discountPercent: discountPercent * 100,
      };
    });

    return itemPrices;
  };

  // Calculate price info for all groups
  const priceInfos = useMemo(() => {
    const allPrices: Record<string, ItemPriceCalculation> = {};
    Object.values(groupedCartItems).forEach(items => {
      const groupPrices = calculateGroupPriceInfo(items);
      Object.assign(allPrices, groupPrices);
    });
    return allPrices;
  }, [groupedCartItems]);

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
      setSelectedVoucher(null);
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
      setSelectedVoucher(null);
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

      setIsLoadingVariants(true);
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
      } finally {
        setIsLoadingVariants(false);
      }
    };

    fetchVariants();
  }, [cartItems, getProductVariants]);

  // Calculate shipping cost when address or selected items change
  useEffect(() => {
    if (selectedAddress?.id && selectedCartItems.length > 0) {
      setIsCalculatingShipping(true);
      setShippingCostError(null);

      calculateShippingCostAndFactoryForCart({
        variables: {
          input: {
            addressId: selectedAddress.id,
            cartIds: selectedCartItems.map(item => item.id),
          },
        },
      })
        .then(response => {
          const shippingCostResponse =
            response.data?.calculateShippingCostAndFactoryForCart?.shippingFee
              ?.total || 0;
          setShippingCost(shippingCostResponse);
          setIsCalculatingShipping(false);
        })
        .catch(error => {
          setShippingCostError(
            'Failed to calculate shipping cost. Please refresh the page and try again.',
          );
          console.error('Shipping calculation error:', error);
          setIsCalculatingShipping(false);
        });
    } else {
      setShippingCost(0);
      setShippingCostError(null);
      setIsCalculatingShipping(false);
    }
  }, [
    selectedAddress,
    selectedCartItems,
    calculateShippingCostAndFactoryForCart,
  ]);

  // Calculate cart totals for selected items only
  const cartTotal = selectedCartItems.reduce(
    (total: number, item: CartItemEntity) => {
      return total + (priceInfos[item.id]?.totalPrice || 0);
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
    setSelectedVoucher(null);
  };

  // Handle item selection
  const handleItemSelect = (id: string, isChecked: boolean): void => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: isChecked,
    }));
    setSelectedVoucher(null);
  };

  // Toggle all items
  const handleToggleAll = (check: boolean): void => {
    const newSelection: Record<string, boolean> = {};
    cartItems.forEach(item => {
      newSelection[item.id] = check;
    });
    setSelectedItems(newSelection);
    setSelectedVoucher(null);
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
    setSelectedVoucher(null);
  };

  // Handle selecting a voucher
  const handleSelectVoucher = (voucher: VoucherEntityType | null): void => {
    setSelectedVoucher(voucher);
  };

  // Handle selecting evaluation criteria
  const handleSelectEvaluationCriteria = (criteriaIds: string[]): void => {
    setSelectedEvaluationCriteriaIds(criteriaIds);
  };

  // Handle checkout
  const handleCheckout = (): void => {
    if (selectedCartItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }

    if (!selectedAddress) {
      toast.error('Please select an address');
      return;
    }

    if (isCalculatingShipping) {
      toast.error('Please wait while we calculate shipping cost');
      return;
    }

    if (shippingCostError) {
      toast.error(
        'Unable to proceed due to shipping cost calculation error. Please refresh the page and try again.',
      );
      return;
    }

    if (shippingCost <= 0) {
      toast.error(
        'Invalid shipping cost. Please try selecting your address again or refresh the page.',
      );
      return;
    }

    // Log selected evaluation criteria
    console.log(
      'Selected Evaluation Criteria IDs:',
      selectedEvaluationCriteriaIds,
    );
    console.log(
      'Selected Evaluation Criteria Details:',
      evaluationCriteriaData?.evaluationCriteriaByProduct?.filter(criteria =>
        selectedEvaluationCriteriaIds.includes(criteria.id),
      ),
    );

    setIsCheckingOut(true);
    createOrder({
      variables: {
        createOrderInput: {
          orderDetails: selectedCartItems.map(item => ({
            cartItemId: item.id,
          })),
          addressId: selectedAddress.id,
          voucherId: selectedVoucher?.id,
          evaluationCriteriaIds:
            selectedEvaluationCriteriaIds.length > 0
              ? selectedEvaluationCriteriaIds
              : undefined,
          expectedReceiveAt: expectedReceiveAt,
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
    <div className="container mx-auto pt-6">
      <CartHeader
        itemCount={cartItems.length}
        areAllItemsSelected={areAllItemsSelected}
        onToggleAll={handleToggleAll}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
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
          shippingCost={shippingCost}
          onCheckout={handleCheckout}
          isProcessing={isCheckingOut}
          selectedVoucher={selectedVoucher}
          onSelectVoucher={handleSelectVoucher}
          onSelectAddress={setSelectedAddress}
          isCalculatingShipping={isCalculatingShipping}
          shippingCostError={shippingCostError}
          evaluationCriteria={
            evaluationCriteriaData?.evaluationCriteriaByProduct || []
          }
          maxEvaluationCriteria={
            evaluationCriteriaData?.systemConfigOrder?.maxEvaluationCriteria ||
            0
          }
          selectedEvaluationCriteriaIds={selectedEvaluationCriteriaIds}
          onSelectEvaluationCriteria={handleSelectEvaluationCriteria}
          evaluationCriteriaLoading={evaluationCriteriaLoading}
          onExpectedReceiveAtChange={date => setExpectedReceiveAt(date || null)}
        />
      </div>
    </div>
  );
}
