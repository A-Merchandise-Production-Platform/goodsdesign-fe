'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  useAvailableVouchersQuery,
  AvailableVouchersQuery,
  VoucherType,
  AddressEntity,
  useUpdatePhoneNumberMutation,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';
import { VoucherDialog } from './voucher-dialog';
import OrderInformation, {
  OrderInformationRef,
} from '@/app/(root)/cart/_components/order-infomation';
import { useState, useRef } from 'react';

type VoucherEntityType = AvailableVouchersQuery['availableVouchers'][0];

interface OrderSummaryProps {
  selectedItemCount: number;
  cartTotal: number;
  shippingCost: number;
  onCheckout: () => void;
  isProcessing: boolean;
  selectedVoucher: VoucherEntityType | null;
  onSelectVoucher: (voucher: VoucherEntityType | null) => void;
  onSelectAddress: (address: AddressEntity) => void;
  isCalculatingShipping: boolean;
  shippingCostError: string | null;
}

export function OrderSummary({
  selectedItemCount,
  cartTotal,
  shippingCost,
  onCheckout,
  isProcessing,
  selectedVoucher,
  onSelectVoucher,
  onSelectAddress,
  isCalculatingShipping,
  shippingCostError,
}: OrderSummaryProps) {
  const orderInfoRef = useRef<OrderInformationRef>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { data: availableVouchers, loading } = useAvailableVouchersQuery();

  const [updatePhoneNumber, { loading: isUpdatingPhoneNumber }] =
    useUpdatePhoneNumberMutation({
      fetchPolicy: 'network-only',
    });

  // Calculate discount amount based on selected voucher
  const calculateDiscount = () => {
    if (!selectedVoucher) return 0;

    if (selectedVoucher.type === VoucherType.FixedValue) {
      return selectedVoucher.value;
    } else {
      // Calculate percentage discount
      const percentageDiscount = (cartTotal * selectedVoucher.value) / 100;

      // Apply max discount value limit if it exists
      if (
        selectedVoucher.maxDiscountValue &&
        percentageDiscount > selectedVoucher.maxDiscountValue
      ) {
        return selectedVoucher.maxDiscountValue;
      }

      return percentageDiscount;
    }
  };

  const discount = calculateDiscount();
  const finalTotal = cartTotal - discount + shippingCost;

  const handleCheckout = () => {
    if (orderInfoRef.current?.validate()) {
      const formData = orderInfoRef.current.getFormData();
      if (formData.phone) {
        updatePhoneNumber({
          variables: {
            updatePhoneNumberInput: { phoneNumber: formData.phone },
          },
        });
      }
      onCheckout();
    }
  };

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-4 p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Subtotal ({selectedItemCount} items)
            </span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping Cost</span>
            <div className="flex items-center">
              {isCalculatingShipping ? (
                <div className="flex items-center">
                  <div className="border-primary mr-2 h-4 w-4 animate-spin rounded-full border-b-2"></div>
                  <span className="text-muted-foreground text-sm">
                    Calculating...
                  </span>
                </div>
              ) : shippingCostError ? (
                <span className="text-destructive text-sm">
                  {shippingCostError}
                </span>
              ) : (
                <span>{formatPrice(shippingCost)}</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="font-semibold">Voucher</div>
          <VoucherDialog
            vouchers={availableVouchers?.availableVouchers || []}
            selectedVoucher={selectedVoucher}
            onSelectVoucher={onSelectVoucher}
            cartTotal={cartTotal}
          />

          {selectedVoucher && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount:</span>
              <span className="font-medium text-green-600">
                -{formatPrice(discount)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <div className="mb-6 font-semibold">Information</div>
          <OrderInformation
            ref={orderInfoRef}
            onAddressChange={onSelectAddress}
            onValidityChange={setIsFormValid}
          />
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={
            isProcessing ||
            selectedItemCount === 0 ||
            !isFormValid ||
            Boolean(shippingCostError)
          }
        >
          {isProcessing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            'Proceed to Checkout'
          )}
        </Button>
      </Card>
    </div>
  );
}
