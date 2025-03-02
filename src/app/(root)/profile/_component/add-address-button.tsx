'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleCheck, CircleCheckIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AddressSelector,
  AddressValue,
} from '@/components/shared/address/address-selector';
import { useMutation } from '@tanstack/react-query';
import { UserApi } from '@/api/user';
import { toast } from 'sonner';

export default function AddressUpdate() {
  const [address, setAddress] = useState<AddressValue | undefined>(undefined);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: UserApi.updateProfile,
    onSuccess: () => {
      setIsDialogOpen(false);
      toast.success('Address updated successfully');
    },
    onError: () => {
      toast.error('Failed to update address');
    },
  });

  useEffect(() => {
    if (
      address?.provinceId === 0 ||
      address?.districtId === 0 ||
      address?.wardId === 0 ||
      !address?.street
    ) {
      setIsButtonActive(false);
    } else {
      setIsButtonActive(true);
    }
  }, [address]);

  const handleSaveAddress = () => {
    if (isButtonActive) {
      mutation.mutate({
        addresses: [
          {
            provinceID: address?.provinceId!,
            districtID: address?.districtId!,
            wardCode: address?.wardId.toString()!,
            street: address?.street!,
          },
        ],
      });
    }
  };

  return (
    <Dialog
      onClose={() => {
        if (!mutation.isPending) {
          setIsDialogOpen(false);
        }
      }}
      open={isDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center border-dashed"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusIcon />
          Add Address
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Address Details</DialogTitle>
          <DialogDescription>
            Add your address details to receive the products at your doorstep.
          </DialogDescription>
        </DialogHeader>
        <div className="my-8">
          <AddressSelector value={address} onChange={setAddress} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="default"
            className="w-full"
            disabled={!isButtonActive}
            isLoading={mutation.isPending}
            onClick={handleSaveAddress}
          >
            <CircleCheckIcon />
            Save Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
