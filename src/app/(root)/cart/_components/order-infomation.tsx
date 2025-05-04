'use client';

import { PlusCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AddressSelector,
  AddressValue,
} from '@/components/shared/address/address-selector';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AddressEntity,
  useAddressesQuery,
  useCreateAddressMutation,
  useGetMeQuery,
  useUpdatePhoneNumberMutation,
} from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

interface OrderInformationProps {
  onAddressChange: (address: AddressEntity) => void;
}

export default function OrderInformation({
  onAddressChange,
}: OrderInformationProps) {
  const { isAuth } = useAuthStore();
  const {
    data: addressesData,
    loading: addressesLoading,
    refetch: refetchAddresses,
  } = useAddressesQuery();
  const { data: userData, loading: userLoading } = useGetMeQuery({
    skip: !isAuth,
  });

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [phone, setPhone] = useState('');
  const [debouncedPhone, setDebouncedPhone] = useState('');
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

  const [updatePhoneNumber, { loading: isUpdatingPhoneNumber }] =
    useUpdatePhoneNumberMutation({
      onCompleted: () => {
        toast.success('Phone number updated successfully');
      },
      onError: () => {
        toast.error('Failed to update phone number');
      },
      fetchPolicy: 'network-only',
    });

  // Debounce phone updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPhone(phone);
    }, 500);

    return () => clearTimeout(timer);
  }, [phone]);

  // Update phone number when debounced value changes
  useEffect(() => {
    if (debouncedPhone && debouncedPhone !== userData?.getMe?.phoneNumber) {
      updatePhoneNumber({
        variables: {
          updatePhoneNumberInput: { phoneNumber: debouncedPhone },
        },
      });
    }
  }, [debouncedPhone, updatePhoneNumber, userData?.getMe?.phoneNumber]);

  // Set initial values
  useEffect(() => {
    if (
      addressesData?.addresses &&
      addressesData.addresses.length > 0 &&
      !selectedAddressId
    ) {
      setSelectedAddressId(addressesData.addresses[0].id);
    }

    if (userData?.getMe?.phoneNumber) {
      setPhone(userData.getMe.phoneNumber);
      setDebouncedPhone(userData.getMe.phoneNumber);
    }
  }, [addressesData, userData, selectedAddressId]);

  useEffect(() => {
    if (selectedAddressId) {
      const selectedAddress = addressesData?.addresses.find(
        address => address.id === selectedAddressId,
      );
      if (selectedAddress) {
        onAddressChange({
          ...selectedAddress,
          userId: userData?.getMe?.id || '',
        });
      }
    }
  }, [selectedAddressId, addressesData, onAddressChange]);

  // Handle adding a new address and automatic selection
  const handleAddressAdded = () => {
    refetchAddresses().then(result => {
      if (result.data?.addresses && result.data.addresses.length > 0) {
        // Select the newly added address (should be the last one)
        setSelectedAddressId(result.data.addresses[0].id);
        setIsAddressFormOpen(false);
        toast.success('Address added and selected');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Shipping Address</Label>
        <div className="flex w-full gap-2">
          <div className="w-[calc(100%-2.75rem)]">
            {addressesLoading ? (
              <div>Loading...</div>
            ) : addressesData?.addresses &&
              addressesData.addresses.length > 0 ? (
              <Select
                value={selectedAddressId || undefined}
                onValueChange={value => setSelectedAddressId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Select an address"
                    className="w-[calc(100%-2.75rem)] truncate"
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {addressesData.addresses.map(address => (
                    <SelectItem
                      key={address.id}
                      value={address.id}
                      className="w-full"
                    >
                      <span className="block w-full truncate">
                        {address.formattedAddress}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <SelectTrigger className="w-full" disabled>
                <SelectValue placeholder="No addresses available" />
              </SelectTrigger>
            )}
          </div>

          <Dialog open={isAddressFormOpen} onOpenChange={setIsAddressFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <PlusCircleIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Add a new shipping address to your account
                </DialogDescription>
              </DialogHeader>
              <AddressForm onAddressAdded={handleAddressAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <PhoneInput
          defaultCountry="VN"
          placeholder="Enter your phone number"
          value={phone}
          onChange={e => setPhone(e)}
        />
      </div>
    </div>
  );
}

function AddressForm({ onAddressAdded }: { onAddressAdded: () => void }) {
  const [address, setAddress] = useState<AddressValue | undefined>(undefined);

  const [createAddress, { loading }] = useCreateAddressMutation({
    onCompleted: () => {
      toast.success('Address created successfully');
      onAddressAdded();
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
          formattedAddress: address.formattedAddress,
        },
      },
    });
  };

  return (
    <div className="space-y-4">
      <AddressSelector
        value={address}
        onChange={setAddress}
        disabled={loading}
      />
      <Button
        onClick={handleCreateAddress}
        disabled={loading}
        className="w-full"
      >
        Add Address
      </Button>
    </div>
  );
}
