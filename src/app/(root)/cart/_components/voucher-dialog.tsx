'use client';

import { useState } from 'react';
import { Check, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  AvailableVouchersQuery,
  VoucherType,
} from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

type VoucherEntityType = AvailableVouchersQuery['availableVouchers'][0];

interface VoucherDialogProps {
  vouchers: VoucherEntityType[];
  selectedVoucher: VoucherEntityType | null;
  onSelectVoucher: (voucher: VoucherEntityType | null) => void;
  cartTotal: number;
}

export function VoucherDialog({
  vouchers,
  selectedVoucher,
  onSelectVoucher,
  cartTotal,
}: VoucherDialogProps) {
  const [open, setOpen] = useState(false);

  // Find the best voucher (greatest discount)
  const findBestVoucher = () => {
    if (!vouchers || vouchers.length === 0) return null;

    return vouchers.reduce(
      (best, current) => {
        // Skip vouchers that don't meet minimum order value
        if (current.minOrderValue && cartTotal < current.minOrderValue) {
          return best;
        }

        let currentDiscount = 0;
        let bestDiscount = 0;

        // Calculate current voucher discount
        if (current.type === VoucherType.FixedValue) {
          currentDiscount = current.value;
        } else if (current.type === VoucherType.Percentage) {
          // Calculate percentage discount with maxDiscountValue limit
          currentDiscount = (cartTotal * current.value) / 100;
          if (
            current.maxDiscountValue &&
            currentDiscount > current.maxDiscountValue
          ) {
            currentDiscount = current.maxDiscountValue;
          }
        }

        // Calculate best voucher discount so far
        if (best) {
          if (best.type === VoucherType.FixedValue) {
            bestDiscount = best.value;
          } else if (best.type === VoucherType.Percentage) {
            // Calculate percentage discount with maxDiscountValue limit
            bestDiscount = (cartTotal * best.value) / 100;
            if (best.maxDiscountValue && bestDiscount > best.maxDiscountValue) {
              bestDiscount = best.maxDiscountValue;
            }
          }
        }

        return currentDiscount > bestDiscount ? current : best;
      },
      null as VoucherEntityType | null,
    );
  };

  const bestVoucher = findBestVoucher();

  const formatVoucherValue = (voucher: VoucherEntityType) => {
    return voucher.type === VoucherType.FixedValue
      ? formatPrice(voucher.value)
      : `${voucher.value}%`;
  };

  const calculateDiscount = (voucher: VoucherEntityType) => {
    if (voucher.type === VoucherType.FixedValue) {
      return voucher.value;
    } else {
      // Calculate percentage discount
      const percentageDiscount = (cartTotal * voucher.value) / 100;

      // Apply max discount value limit if it exists
      if (
        voucher.maxDiscountValue &&
        percentageDiscount > voucher.maxDiscountValue
      ) {
        return voucher.maxDiscountValue;
      }

      return percentageDiscount;
    }
  };

  const handleSelectVoucher = (voucher: VoucherEntityType) => {
    onSelectVoucher(voucher);
    setOpen(false);
  };

  const handleRemoveVoucher = () => {
    onSelectVoucher(null);
    setOpen(false);
  };

  const handleSelectBestVoucher = () => {
    if (bestVoucher) {
      onSelectVoucher(bestVoucher);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedVoucher ? (
            <>
              <span>{selectedVoucher.code}</span>
              <span className="text-primary font-semibold">
                {formatVoucherValue(selectedVoucher)}
              </span>
            </>
          ) : (
            <>
              <span>Select Voucher</span>
              <PlusCircle className="h-4 w-4" />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Voucher</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedVoucher && (
            <>
              <div className="bg-muted/50 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Applied Voucher</h3>
                    <p className="text-muted-foreground text-sm">
                      {selectedVoucher.code}
                    </p>
                    {selectedVoucher.description && (
                      <p className="mt-1 text-sm">
                        {selectedVoucher.description}
                      </p>
                    )}
                    {selectedVoucher.type === VoucherType.Percentage &&
                      selectedVoucher.maxDiscountValue && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          Max Discount:{' '}
                          {formatPrice(selectedVoucher.maxDiscountValue)}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-primary text-lg font-semibold">
                      {formatVoucherValue(selectedVoucher)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Save {formatPrice(calculateDiscount(selectedVoucher))}
                    </span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  className="mt-2 w-full"
                  onClick={handleRemoveVoucher}
                >
                  Remove Voucher
                </Button>
              </div>
              <Separator />
            </>
          )}

          {bestVoucher && bestVoucher.id !== selectedVoucher?.id && (
            <>
              <div className="border-primary bg-primary/5 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Recommended</h3>
                    <p className="text-muted-foreground text-sm">
                      {bestVoucher.code}
                    </p>
                    {bestVoucher.description && (
                      <p className="mt-1 text-sm">{bestVoucher.description}</p>
                    )}
                    {bestVoucher.minOrderValue && (
                      <p className="text-muted-foreground mt-1 text-xs">
                        Min. Order: {formatPrice(bestVoucher.minOrderValue)}
                      </p>
                    )}
                    {bestVoucher.type === VoucherType.Percentage &&
                      bestVoucher.maxDiscountValue && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          Max Discount:{' '}
                          {formatPrice(bestVoucher.maxDiscountValue)}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-primary text-lg font-semibold">
                      {formatVoucherValue(bestVoucher)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Save {formatPrice(calculateDiscount(bestVoucher))}
                    </span>
                  </div>
                </div>
                <Button
                  variant="default"
                  className="mt-2 w-full"
                  onClick={handleSelectBestVoucher}
                >
                  Apply Voucher
                </Button>
              </div>
              <Separator />
            </>
          )}

          <ScrollArea className="h-[300px] pr-4">
            <div className="text-muted-foreground mb-2 text-sm">
              Available Vouchers
            </div>
            <div className="space-y-2">
              {vouchers && vouchers.length > 0 ? (
                vouchers.map(voucher => {
                  // Skip the voucher if it's the selected one or best one (already shown)
                  if (
                    voucher.id === selectedVoucher?.id ||
                    (voucher.id === bestVoucher?.id &&
                      voucher.id !== selectedVoucher?.id)
                  ) {
                    return null;
                  }

                  const isApplicable =
                    !voucher.minOrderValue ||
                    cartTotal >= voucher.minOrderValue;

                  return (
                    <div
                      key={voucher.id}
                      className={`rounded-lg border p-3 ${
                        !isApplicable ? 'opacity-50' : ''
                      } ${selectedVoucher?.id === voucher.id ? 'border-primary' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{voucher.code}</h3>
                          {voucher.description && (
                            <p className="mt-1 text-sm">
                              {voucher.description}
                            </p>
                          )}
                          {voucher.minOrderValue && (
                            <p className="text-muted-foreground mt-1 text-xs">
                              Min. Order: {formatPrice(voucher.minOrderValue)}
                            </p>
                          )}
                          {voucher.type === VoucherType.Percentage &&
                            voucher.maxDiscountValue && (
                              <p className="text-muted-foreground mt-1 text-xs">
                                Max Discount:{' '}
                                {formatPrice(voucher.maxDiscountValue)}
                              </p>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-primary text-lg font-semibold">
                            {formatVoucherValue(voucher)}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            Save {formatPrice(calculateDiscount(voucher))}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={() => handleSelectVoucher(voucher)}
                        disabled={!isApplicable}
                      >
                        {!isApplicable ? 'Not Applicable' : 'Apply Voucher'}
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="py-4 text-center">
                  <p className="text-muted-foreground">No vouchers available</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
