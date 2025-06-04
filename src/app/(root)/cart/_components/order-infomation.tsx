'use client';

import { PlusCircleIcon, CalendarIcon } from 'lucide-react';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';

import {
  AddressSelector,
  AddressValue,
} from '@/components/shared/address/address-selector';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
  useSystemConfigOrderQuery,
} from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/lib/utils';

export interface OrderInformationRef {
  validate: () => boolean;
  getFormData: () => {
    address: AddressEntity | null;
    phone: string;
    expectedReceiveAt?: Date | null;
  };
}

interface OrderInformationProps {
  onAddressChange: (address: AddressEntity) => void;
  onValidityChange: (isValid: boolean) => void;
  onExpectedReceiveAtChange?: (date: Date | undefined) => void;
}

const OrderInformation = forwardRef<OrderInformationRef, OrderInformationProps>(
  ({ onAddressChange, onValidityChange, onExpectedReceiveAtChange }, ref) => {
    const { isAuth } = useAuthStore();
    const {
      data: addressesData,
      loading: addressesLoading,
      refetch: refetchAddresses,
    } = useAddressesQuery();
    const { data: userData, loading: userLoading } = useGetMeQuery({
      skip: !isAuth,
    });
    const { data: systemConfigData, loading: systemConfigLoading } =
      useSystemConfigOrderQuery();

    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
      null,
    );
    const [phone, setPhone] = useState('');
    const [expectedReceiveAt, setExpectedReceiveAt] = useState<
      Date | undefined
    >(undefined);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

    // Calculate minimum selectable date
    const getMinimumDate = () => {
      const systemConfig = systemConfigData?.systemConfigOrder as any;
      const minDays = systemConfig?.minExpectedReceiveAt || 1;
      return addDays(new Date(), minDays);
    };

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

    // Check form validity whenever relevant fields change
    useEffect(() => {
      const isValid = Boolean(selectedAddressId && phone);
      onValidityChange(isValid);
    }, [selectedAddressId, phone, onValidityChange]);

    useEffect(() => {
      if (onExpectedReceiveAtChange) {
        onExpectedReceiveAtChange(expectedReceiveAt);
      }
    }, [expectedReceiveAt, onExpectedReceiveAtChange]);

    // Handle adding a new address and automatic selection
    const handleAddressAdded = (id: string) => {
      refetchAddresses().then(result => {
        if (result.data?.addresses && result.data.addresses.length > 0) {
          // Select the newly added address (should be the last one)
          setSelectedAddressId(id);
          setIsAddressFormOpen(false);
          toast.success('Address added and selected');
        }
      });
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        if (!selectedAddressId) {
          toast.error('Please select a shipping address');
          return false;
        }

        if (!phone) {
          toast.error('Please enter a phone number');
          return false;
        }

        return true;
      },
      getFormData: () => {
        const selectedAddress = addressesData?.addresses.find(
          address => address.id === selectedAddressId,
        );
        return {
          address: selectedAddress
            ? {
                ...selectedAddress,
                userId: userData?.getMe?.id || '',
              }
            : null,
          phone,
          expectedReceiveAt: expectedReceiveAt || null,
        };
      },
    }));

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
                <div className="text-muted-foreground flex h-9 w-[calc(100%-2.75rem)] items-center truncate rounded-lg border px-2">
                  No addresses available
                </div>
              )}
            </div>

            <Dialog
              open={isAddressFormOpen}
              onOpenChange={setIsAddressFormOpen}
            >
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
            onChange={e => {
              setPhone(e);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedReceiveAt">
            Expected Delivery Date (Optional)
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !expectedReceiveAt && 'text-muted-foreground',
                )}
                disabled={systemConfigLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {expectedReceiveAt ? (
                  format(expectedReceiveAt, 'PPP')
                ) : (
                  <span>Pick a delivery date (optional)</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={expectedReceiveAt}
                onSelect={setExpectedReceiveAt}
                disabled={date => {
                  const minDate = getMinimumDate();
                  return date < minDate;
                }}
                initialFocus
                fromDate={getMinimumDate()}
              />
              <div className="border-t p-3">
                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => setExpectedReceiveAt(undefined)}
                >
                  Clear selection
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {systemConfigData?.systemConfigOrder &&
            (systemConfigData.systemConfigOrder as any)
              .minExpectedReceiveAt && (
              <p className="text-muted-foreground text-sm">
                You can select a delivery date starting from{' '}
                {format(getMinimumDate(), 'PPP')}
              </p>
            )}
        </div>
      </div>
    );
  },
);

function AddressForm({
  onAddressAdded,
}: {
  onAddressAdded: (id: string) => void;
}) {
  const [address, setAddress] = useState<AddressValue | undefined>(undefined);

  const [createAddress, { loading }] = useCreateAddressMutation({
    onCompleted: data => {
      toast.success('Address created successfully');
      onAddressAdded(data.createAddress.id);
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

  const handleAddressChange = (newAddress: AddressValue) => {
    // If province changed, clear district and ward
    if (newAddress.provinceId !== address?.provinceId) {
      setAddress({
        ...newAddress,
        districtId: null,
        wardCode: null,
      });
      return;
    }

    // If district changed, clear ward
    if (newAddress.districtId !== address?.districtId) {
      setAddress({
        ...newAddress,
        wardCode: null,
      });
      return;
    }

    // No cascading changes needed
    setAddress(newAddress);
  };

  return (
    <div className="space-y-4">
      <AddressSelector
        value={address}
        onChange={handleAddressChange}
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

export default OrderInformation;
