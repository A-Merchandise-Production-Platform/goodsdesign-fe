'use client';

import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import { ShippingApi } from '@/api/shipping';
import type { District, Province, Ward } from '@/api/types/shipping';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

import { Combobox } from './combobox';
import { Textarea } from '@/components/ui/textarea';

export type AddressValue = {
  provinceId: number;
  districtId: number;
  wardId: number;
  street: string;
};

interface AddressSelectorProps {
  value?: AddressValue;
  onChange: (value: AddressValue) => void;
  disabled?: boolean;
}

export function AddressSelector({
  value,
  onChange,
  disabled = false,
}: AddressSelectorProps) {
  const [selectedProvince, setSelectedProvince] = React.useState<
    string | undefined
  >(value?.provinceId ? value.provinceId.toString() : undefined);
  const [selectedDistrict, setSelectedDistrict] = React.useState<
    string | undefined
  >(value?.districtId ? value.districtId.toString() : undefined);
  const [selectedWard, setSelectedWard] = React.useState<string | undefined>(
    value?.wardId ? value.wardId.toString() : undefined,
  );
  const [street, setStreet] = React.useState<string | undefined>(
    value?.street || undefined,
  );

  const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
    queryKey: ['getAllProvinces'],
    queryFn: ShippingApi.getAllProvinces,
  });

  const { data: districts, isLoading: isLoadingDistricts } = useQuery({
    queryKey: ['getAllDistricts', selectedProvince],
    queryFn: () => ShippingApi.getAllDistricts(Number(selectedProvince)),
    enabled: !!selectedProvince,
  });

  const { data: wards, isLoading: isLoadingWards } = useQuery({
    queryKey: ['getAllWards', selectedDistrict],
    queryFn: () => ShippingApi.getAllWards(Number(selectedDistrict)),
    enabled: !!selectedDistrict,
  });

  const debouncedStreet = useDebounce(street, 500);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value || undefined);
    setSelectedDistrict(undefined);
    setSelectedWard(undefined);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value || undefined);
    setSelectedWard(undefined);
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value || undefined);
  };

  const handleStreetChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setStreet(event.target.value);
  };

  React.useEffect(() => {
    onChange({
      provinceId: selectedProvince ? Number.parseInt(selectedProvince) : 0,
      districtId: selectedDistrict ? Number.parseInt(selectedDistrict) : 0,
      wardId: selectedWard ? Number.parseInt(selectedWard) : 0,
      street: debouncedStreet || '',
    });
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    debouncedStreet,
    onChange,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <Combobox<Province>
          data={provinces || []}
          value={selectedProvince}
          onValueChange={handleProvinceChange}
          displayValue={province => province.provinceName}
          getValue={province => province.provinceID.toString()}
          placeholder="Select province..."
          emptyText="No province found."
          isLoading={isLoadingProvinces}
          disabled={
            disabled ||
            isLoadingProvinces ||
            !provinces ||
            provinces.length === 0
          }
        />

        <Combobox<District>
          data={districts || []}
          value={selectedDistrict}
          onValueChange={handleDistrictChange}
          displayValue={district => district.districtName}
          getValue={district => district.districtID.toString()}
          placeholder="Select district..."
          emptyText="No district found."
          disabled={
            !selectedProvince ||
            !provinces ||
            provinces.length === 0 ||
            isLoadingProvinces ||
            !districts ||
            districts.length === 0 ||
            isLoadingDistricts ||
            disabled
          }
          isLoading={isLoadingDistricts}
        />

        <Combobox<Ward>
          data={wards || []}
          value={selectedWard}
          onValueChange={handleWardChange}
          displayValue={ward => ward.wardName}
          getValue={ward => ward.wardCode.toString()}
          placeholder="Select ward..."
          emptyText="No ward found."
          disabled={
            !selectedDistrict ||
            !districts ||
            districts.length === 0 ||
            isLoadingDistricts ||
            !wards ||
            wards.length === 0 ||
            isLoadingWards ||
            disabled
          }
          isLoading={isLoadingWards}
        />
      </div>
      <Textarea
        placeholder="Enter address number & street..."
        id="address"
        value={street}
        onChange={handleStreetChange}
        disabled={disabled}
        className="resize-none"
      />
    </div>
  );
}
