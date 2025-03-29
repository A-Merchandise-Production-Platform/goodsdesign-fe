'use client';

import {
  AddressSelector,
  AddressValue,
} from '@/components/shared/address/address-selector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  AddressEntity,
  CartItemEntity,
  DesignPositionEntity,
  useAddressesQuery,
  useCalculateShippingFeeMutation,
  useCreateAddressMutation,
  useGetAddressDetailsQuery,
  useGetAvailableServiceQuery,
  useGetUserCartItemsQuery,
  useUpdateCartItemMutation,
} from '@/graphql/generated/graphql';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import {
  MapPin,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Interface for price calculation return values
interface ItemPriceCalculation {
  unitPrice: number;
  totalPrice: number;
  discountApplied: boolean;
  discountPercent: number;
}

// Interface for shipping information
interface ShippingInfo {
  fee: number;
  service: {
    id: number;
    serviceTypeId: number;
    name: string;
  } | null;
}

interface AvailableService {
  shortName: string;
  serviceTypeId: number;
  serviceId: number;
}

export default function CartPage() {
  const systemDistrict = 1463;
  const systemWard = '21801';

  const {
    data: addressData,
    loading: addressLoading,
    refetch: addressRefetch,
  } = useAddressesQuery();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [shipping, setShipping] = useState<ShippingInfo>({
    fee: 0,
    service: null,
  });
  const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<AddressValue | undefined>(
    undefined,
  );

  const { data, loading, refetch } = useGetUserCartItemsQuery();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  const addresses = addressData?.addresses || [];
  const selectedAddress = addresses.find(
    addr => addr.id === selectedAddressId,
  ) as AddressEntity | undefined;

  // Set the first address as default when addresses load
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
      serviceFetch();
    }
  }, [addresses, selectedAddressId]);

  // Get detailed address information for selected address
  const { data: selectedAddressDetails } = useGetAddressDetailsQuery({
    variables: {
      provinceId: selectedAddress?.provinceID || 0,
      districtId: selectedAddress?.districtID || 0,
      wardCode: selectedAddress?.wardCode || '',
    },
    skip: !selectedAddress,
  });

  // Get available shipping services
  const {
    data: availableService,
    loading: serviceLoading,
    refetch: serviceFetch,
  } = useGetAvailableServiceQuery({
    variables: {
      servicesInput: {
        fromDistrict: systemDistrict,
        toDistrict: selectedAddress?.districtID || 0,
      },
    },
    skip: !selectedAddress,
  });

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

  const [calculateShippingFee, { loading: shippingFeeLoading }] =
    useCalculateShippingFeeMutation({
      onCompleted: data => {
        setShipping({
          ...shipping,
          fee: data.calculateShippingFee.total || 0,
        });
      },
      onError: error => {
        toast({
          title: 'Error calculating shipping',
          description: error.message,
          variant: 'destructive',
        });
      },
    });

  const [createAddress, { loading: createAddressLoading }] =
    useCreateAddressMutation({
      onCompleted: () => {
        toast({
          title: 'Address added',
          description: 'Your new address has been added successfully',
        });
        setIsAddingAddress(false);
        // Refetch addresses after adding a new one
        addressRefetch();
      },
      onError: error => {
        toast({
          title: 'Error adding address',
          description: error.message,
          variant: 'destructive',
        });
      },
      refetchQueries: ['Addresses'],
    });

  const handleAddAddress = (): void => {
    if (!newAddress) return;
    createAddress({
      variables: {
        createAddressInput: {
          provinceID: newAddress.provinceId || 0,
          districtID: newAddress.districtId || 0,
          wardCode: newAddress.wardCode || '',
          street: newAddress.street || '',
        },
      },
    });
  };

  const handleCalculateShippingFee = (): void => {
    if (!selectedAddress || !shipping.service) {
      toast({
        title: 'Missing information',
        description: 'Please select both an address and shipping method',
        variant: 'destructive',
      });
      return;
    }

    calculateShippingFee({
      variables: {
        input: {
          fromDistrictId: systemDistrict, // Default district - update with actual value
          fromWardCode: systemWard, // Default ward - update with actual value
          toDistrictId: selectedAddress.districtID,
          toWardCode: selectedAddress.wardCode,
          serviceId: shipping.service.id,
          serviceTypeId: shipping.service.serviceTypeId,
          height: 50,
          length: 20,
          weight: 1000,
          width: 20,
        },
      },
    });
  };

  const handleServiceChange = (serviceId: string): void => {
    if (!availableService?.availableServices) return;

    const selectedService = availableService.availableServices.find(
      s => s.serviceId === parseInt(serviceId),
    );

    if (selectedService) {
      setShipping({
        ...shipping,
        service: {
          id: selectedService.serviceId,
          serviceTypeId: selectedService.serviceTypeId,
          name: selectedService.shortName,
        },
      });
    }
  };

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
    const positionPrices = item.design.designPositions.reduce(
      (total: number, position: DesignPositionEntity) =>
        total + (position?.positionType?.basePrice || 0),
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

  // Calculate cart totals
  const cartTotal = cartItems.reduce((total: number, item: CartItemEntity) => {
    return total + calculateItemPrice(item).totalPrice;
  }, 0);

  const finalTotal = cartTotal + shipping.fee;

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

  // Handle checkout
  const handleCheckout = (): void => {
    if (!selectedAddress) {
      toast({
        title: 'Address required',
        description: 'Please select a shipping address before checkout',
        variant: 'destructive',
      });
      return;
    }

    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: 'Checkout successful',
        description: 'Your order has been placed successfully!',
      });
      setIsCheckingOut(false);
    }, 2000);
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
      <div className="container mx-auto px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
        <Card className="p-8 text-center">
          <ShoppingCart className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button>Continue Shopping</Button>
        </Card>
      </div>
    );
  }

  // Format address for display
  const formatAddress = (address: AddressEntity | undefined): string => {
    if (!address || !selectedAddressDetails) return 'Select an address';
    return `${address.street}, ${selectedAddressDetails.ward?.wardName}, ${selectedAddressDetails.district?.districtName}, ${selectedAddressDetails.province?.provinceName}`;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cartItems.map(item => {
            const { unitPrice, totalPrice, discountApplied, discountPercent } =
              calculateItemPrice(item);
            const product = item?.design?.systemConfigVariant?.product;
            const variant = item?.design?.systemConfigVariant;

            const positions = item?.design?.designPositions
              ?.map(
                (pos: DesignPositionEntity) => pos.positionType?.positionName,
              )
              .join(', ');

            return (
              <Card key={item.id} className="mb-4 overflow-hidden">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
                  <div className="bg-muted relative mx-auto h-32 w-32 flex-shrink-0 rounded-md sm:mx-0">
                    <Image
                      src={
                        product?.imageUrl ||
                        '/placeholder.svg?height=128&width=128'
                      }
                      alt={product?.name || 'Product image'}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {product?.name}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Size: {variant?.size} • Color:{' '}
                          <span
                            className="inline-block h-3 w-3 rounded-full border"
                            style={{
                              backgroundColor: variant?.color || '#ffffff',
                            }}
                          ></span>
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Positions: {positions}
                        </p>
                        {item.design.isTemplate && (
                          <Badge variant="outline" className="mt-1">
                            Template Design
                          </Badge>
                        )}
                      </div>

                      <div className="mt-2 text-right sm:mt-0">
                        <div className="font-semibold">
                          {formatPrice(totalPrice)}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {formatPrice(unitPrice)} each
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

            {/* Address Selection Section */}
            <div className="mb-6">
              <h3 className="mb-2 font-medium">Shipping Address</h3>
              {addressLoading ? (
                <div className="h-10 animate-pulse rounded bg-gray-200"></div>
              ) : addresses.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedAddressId || ''}
                      onValueChange={setSelectedAddressId}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an address" />
                      </SelectTrigger>
                      <SelectContent>
                        {addresses.map(
                          (address: {
                            id: string;
                            street: string;
                            districtID: number;
                            provinceID: number;
                            wardCode: string;
                          }) => (
                            <SelectItem key={address.id} value={address.id}>
                              {address.street}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>

                    <Dialog
                      open={isAddingAddress}
                      onOpenChange={setIsAddingAddress}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add New Address</DialogTitle>
                          <DialogDescription>
                            Enter your new shipping address details
                          </DialogDescription>
                        </DialogHeader>
                        <AddressSelector
                          value={newAddress}
                          onChange={setNewAddress}
                          disabled={createAddressLoading}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsAddingAddress(false)}
                            disabled={createAddressLoading}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddAddress}
                            disabled={createAddressLoading || !newAddress}
                          >
                            {createAddressLoading ? 'Adding...' : 'Add Address'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {selectedAddress && (
                    <div className="rounded-md border p-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <div>{formatAddress(selectedAddress)}</div>
                      </div>
                    </div>
                  )}

                  {/* Shipping Service Selection */}
                  {selectedAddress && (
                    <div className="mt-4">
                      <h3 className="mb-2 font-medium">Shipping Method</h3>
                      <Select
                        value={shipping.service?.id?.toString() || ''}
                        onValueChange={handleServiceChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select shipping method" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableService?.availableServices.map(service => (
                            <SelectItem
                              key={service.shortName}
                              value={service.serviceId.toString()}
                            >
                              {service.shortName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={handleCalculateShippingFee}
                        className="mt-2 w-full"
                        disabled={!shipping.service || shippingFeeLoading}
                        variant="outline"
                      >
                        {shippingFeeLoading
                          ? 'Calculating...'
                          : 'Calculate Shipping'}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-3 text-center">
                  <p className="text-muted-foreground mb-2">
                    No addresses found
                  </p>
                  <Dialog
                    open={isAddingAddress}
                    onOpenChange={setIsAddingAddress}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>
                          Enter your shipping address details
                        </DialogDescription>
                      </DialogHeader>
                      <AddressSelector
                        value={newAddress}
                        onChange={setNewAddress}
                        disabled={createAddressLoading}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddingAddress(false)}
                          disabled={createAddressLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddAddress}
                          disabled={createAddressLoading || !newAddress}
                        >
                          {createAddressLoading ? 'Adding...' : 'Add Address'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping.fee > 0
                    ? `${formatPrice(shipping.fee)}`
                    : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>
                {formatPrice(shipping.fee > 0 ? finalTotal : cartTotal)}
              </span>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut || !selectedAddress}
            >
              {isCheckingOut ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>

            <p className="text-muted-foreground mt-4 text-center text-xs">
              Shipping, taxes, and discounts calculated at checkout
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
