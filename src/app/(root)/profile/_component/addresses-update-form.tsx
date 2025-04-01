'use client';

import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AddressSelector,
  AddressValue,
} from '@/components/shared/address/address-selector';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  AddressEntity,
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useGetAddressDetailsQuery,
} from '@/graphql/generated/graphql';

export default function AddressesUpdateForm() {
  const { data, loading } = useAddressesQuery();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Address</CardTitle>
          <CardDescription>Update your address</CardDescription>
        </div>
        <AddressForm />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data?.addresses.map(address => (
            <AddressCard key={address.id} address={address} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function AddressCard({ address }: { address: Partial<AddressEntity> }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: locationData } = useGetAddressDetailsQuery({
    variables: {
      provinceId: address.provinceID!,
      districtId: address.districtID!,
      wardCode: address.wardCode!,
    },
    skip: !address.provinceID || !address.districtID || !address.wardCode,
  });

  const [deleteAddress, { loading: deleteAddressLoading }] =
    useDeleteAddressMutation({
      refetchQueries: ['Addresses'],
    });

  const handleDeleteAddress = () => {
    deleteAddress({
      variables: {
        deleteAddressId: address.id!,
      },
      onCompleted: () => {
        toast.success('Address deleted successfully');
        setIsDeleteDialogOpen(false);
      },
      onError: () => {
        toast.error('Failed to delete address');
      },
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4 shadow-none">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="text-sm">{address.street},</div>
          <div className="text-sm">{locationData?.ward?.wardName},</div>
          <div className="text-sm">{locationData?.district?.districtName},</div>
          <div className="text-sm">{locationData?.province?.provinceName}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-200 hover:text-red-500"
            >
              <Trash2Icon className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you absolutely sure to delete this address?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                address and remove it from your account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={deleteAddressLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAddress}
                disabled={deleteAddressLoading}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function AddressForm() {
  const [address, setAddress] = useState<AddressValue | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const [createAddress, { loading }] = useCreateAddressMutation({
    onCompleted: () => {
      toast.success('Address created successfully');
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Failed to create address');
    },
    refetchQueries: ['Addresses'],
  });

  const handleCreateAddress = () => {
    if (!address) return;
    createAddress({
      variables: {
        createAddressInput: {
          provinceID: address.provinceId ?? 0,
          districtID: address.districtId ?? 0,
          wardCode: address.wardCode ?? '',
          street: address.street ?? '',
        },
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon className="size-4" />
          Add Address
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>
            Add a new address to your account
          </DialogDescription>
        </DialogHeader>
        <AddressSelector
          value={address}
          onChange={setAddress}
          disabled={loading}
        />
        <Button onClick={handleCreateAddress} disabled={loading}>
          Create Address
        </Button>
      </DialogContent>
    </Dialog>
  );
}
