'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  useGetAllDistrictsByProvinceIdLazyQuery,
  useGetAllProvincesQuery,
  useGetAllWardsByDistrictIdLazyQuery,
} from '@/graphql/generated/graphql';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

const normalizeVietnamese = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const filterItems = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  nameKey: keyof T,
) => {
  const sortedItems = [...items].sort((a, b) =>
    String(a[nameKey]).localeCompare(String(b[nameKey]), 'vi'),
  );

  if (!searchTerm) return sortedItems;

  const normalizedSearch = normalizeVietnamese(searchTerm);
  return sortedItems.filter(item =>
    normalizeVietnamese(String(item[nameKey])).includes(normalizedSearch),
  );
};

interface BaseSelectorProps<T extends Record<string, any>> {
  items: T[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  nameKey: keyof T;
  idKey: keyof T;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
}

interface NumberSelectorProps<T extends Record<string, any>>
  extends BaseSelectorProps<T> {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

interface StringSelectorProps<T extends Record<string, any>>
  extends BaseSelectorProps<T> {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function NumberSelector<T extends Record<string, any>>({
  items,
  selectedId,
  onSelect,
  searchTerm,
  onSearchChange,
  nameKey,
  idKey,
  placeholder,
  disabled,
  loading,
}: NumberSelectorProps<T>) {
  const [open, setOpen] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = React.useMemo(() => {
    return filterItems(items, debouncedSearchTerm, nameKey);
  }, [items, debouncedSearchTerm, nameKey]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          disabled={disabled || loading}
        >
          {selectedId
            ? String(
                items.find(item => Number(item[idKey]) === selectedId)?.[
                  nameKey
                ],
              )
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchTerm}
            onValueChange={onSearchChange}
          />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map(item => (
                <CommandItem
                  key={String(item[idKey])}
                  value={String(item[idKey])}
                  onSelect={currentValue => {
                    onSelect(
                      Number(currentValue) === selectedId
                        ? null
                        : Number(currentValue),
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedId === Number(item[idKey])
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {String(item[nameKey])}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function StringSelector<T extends Record<string, any>>({
  items,
  selectedId,
  onSelect,
  searchTerm,
  onSearchChange,
  nameKey,
  idKey,
  placeholder,
  disabled,
  loading,
}: StringSelectorProps<T>) {
  const [open, setOpen] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = React.useMemo(() => {
    return filterItems(items, debouncedSearchTerm, nameKey);
  }, [items, debouncedSearchTerm, nameKey]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          disabled={disabled || loading}
        >
          {selectedId
            ? String(
                items.find(item => String(item[idKey]) === selectedId)?.[
                  nameKey
                ],
              )
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchTerm}
            onValueChange={onSearchChange}
          />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map(item => (
                <CommandItem
                  key={String(item[idKey])}
                  value={String(item[idKey])}
                  onSelect={currentValue => {
                    onSelect(currentValue === selectedId ? null : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedId === String(item[idKey])
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {String(item[nameKey])}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export interface AddressValue {
  provinceId: number | null;
  districtId: number | null;
  wardCode: string | null;
  street: string;
  formattedAddress: string;
}

interface AddressSelectorProps {
  value?: AddressValue;
  defaultValue?: AddressValue;
  onChange?: (value: AddressValue) => void;
  disabled?: boolean;
}

export function AddressSelector({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: AddressSelectorProps) {
  // Fix: Properly check if the component is controlled
  const isControlled = value !== undefined;

  // Initialize state with either controlled value, default value, or empty state
  const [internalValue, setInternalValue] = React.useState<AddressValue>(
    isControlled
      ? value!
      : defaultValue || {
          provinceId: null,
          districtId: null,
          wardCode: null,
          street: '',
          formattedAddress: '',
        },
  );

  // Province
  const [selectedProvinceId, setSelectedProvinceId] = React.useState<
    number | null
  >(isControlled ? value!.provinceId : internalValue.provinceId);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data, loading } = useGetAllProvincesQuery();

  // District
  const [selectedDistrictId, setSelectedDistrictId] = React.useState<
    number | null
  >(isControlled ? value!.districtId : internalValue.districtId);
  const [searchDistrictTerm, setSearchDistrictTerm] = React.useState('');

  const [
    getAllDistrictsByProvinceId,
    { data: districtData, loading: districtLoading },
  ] = useGetAllDistrictsByProvinceIdLazyQuery({
    variables: {
      provinceId: selectedProvinceId ?? 0,
    },
  });

  // Ward
  const [selectedWardCode, setSelectedWardCode] = React.useState<string | null>(
    isControlled ? value!.wardCode : internalValue.wardCode,
  );
  const [searchWardTerm, setSearchWardTerm] = React.useState('');
  const [street, setStreet] = React.useState(
    isControlled ? value!.street : internalValue.street,
  );

  const [getAllWardsByDistrictId, { data: wardData, loading: wardLoading }] =
    useGetAllWardsByDistrictIdLazyQuery({
      variables: {
        districtId: selectedDistrictId ?? 0,
      },
    });

  // Create formatted address
  const getFormattedAddress = React.useCallback(() => {
    const provinceName = selectedProvinceId
      ? data?.provinces.find(p => p.provinceId === selectedProvinceId)
          ?.provinceName || ''
      : '';

    const districtName = selectedDistrictId
      ? districtData?.districts.find(d => d.districtId === selectedDistrictId)
          ?.districtName || ''
      : '';

    const wardName = selectedWardCode
      ? wardData?.wards.find(w => w.wardCode === selectedWardCode)?.wardName ||
        ''
      : '';

    const parts = [street, wardName, districtName, provinceName].filter(
      Boolean,
    );
    return parts.join(', ');
  }, [
    selectedProvinceId,
    selectedDistrictId,
    selectedWardCode,
    street,
    data?.provinces,
    districtData?.districts,
    wardData?.wards,
  ]);

  // Move these declarations up, after all the useState declarations but before the useEffect hooks
  const currentValue = {
    provinceId: selectedProvinceId,
    districtId: selectedDistrictId,
    wardCode: selectedWardCode,
    street,
    formattedAddress: getFormattedAddress(),
  };

  const prevValueRef = React.useRef(currentValue);

  // Reset district and ward when province changes
  React.useEffect(() => {
    if (selectedProvinceId !== prevValueRef.current.provinceId) {
      setSelectedDistrictId(null);
      setSelectedWardCode(null);
      setSearchDistrictTerm('');
      setSearchWardTerm('');
    }
  }, [selectedProvinceId]);

  // Reset ward when district changes
  React.useEffect(() => {
    if (selectedDistrictId !== prevValueRef.current.districtId) {
      setSelectedWardCode(null);
      setSearchWardTerm('');
    }
  }, [selectedDistrictId]);

  React.useEffect(() => {
    if (selectedProvinceId) {
      getAllDistrictsByProvinceId();
    }
  }, [selectedProvinceId, getAllDistrictsByProvinceId]);

  React.useEffect(() => {
    if (selectedDistrictId) {
      getAllWardsByDistrictId();
    }
  }, [selectedDistrictId, getAllWardsByDistrictId]);

  // Handle value changes - only call onChange when values actually change

  // Use a ref to track previous values to avoid unnecessary onChange calls

  React.useEffect(() => {
    // Check if values have actually changed
    const prevValue = prevValueRef.current;
    const hasChanged =
      prevValue.provinceId !== currentValue.provinceId ||
      prevValue.districtId !== currentValue.districtId ||
      prevValue.wardCode !== currentValue.wardCode ||
      prevValue.street !== currentValue.street;

    if (hasChanged) {
      // Update internal state if not controlled
      if (!isControlled) {
        setInternalValue(currentValue);
      }

      // Only call onChange when values actually change
      onChange?.(currentValue);

      // Update the ref
      prevValueRef.current = currentValue;
    }
  }, [
    selectedProvinceId,
    selectedDistrictId,
    selectedWardCode,
    street,
    onChange,
    isControlled,
  ]);

  // Sync with controlled value - only update local state if external value changes
  React.useEffect(() => {
    if (isControlled && value) {
      const hasChanges =
        value.provinceId !== selectedProvinceId ||
        value.districtId !== selectedDistrictId ||
        value.wardCode !== selectedWardCode ||
        value.street !== street;

      if (hasChanges) {
        // Update local state to match controlled value
        setSelectedProvinceId(value.provinceId);
        setSelectedDistrictId(value.districtId);
        setSelectedWardCode(value.wardCode);
        setStreet(value.street);

        // Also update the ref to prevent triggering onChange again
        prevValueRef.current = {
          provinceId: value.provinceId,
          districtId: value.districtId,
          wardCode: value.wardCode,
          street: value.street,
          formattedAddress: value.formattedAddress || getFormattedAddress(),
        };
      }
    }
  }, [
    isControlled,
    value,
    selectedDistrictId,
    selectedProvinceId,
    selectedWardCode,
    street,
    getFormattedAddress,
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <NumberSelector
          items={data?.provinces ?? []}
          selectedId={selectedProvinceId}
          onSelect={setSelectedProvinceId}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          nameKey="provinceName"
          idKey="provinceId"
          placeholder="Select province..."
          disabled={loading || disabled}
        />

        <NumberSelector
          items={districtData?.districts ?? []}
          selectedId={selectedDistrictId}
          onSelect={setSelectedDistrictId}
          searchTerm={searchDistrictTerm}
          onSearchChange={setSearchDistrictTerm}
          nameKey="districtName"
          idKey="districtId"
          placeholder="Select district..."
          disabled={!selectedProvinceId || districtLoading || disabled}
        />

        <StringSelector
          items={wardData?.wards ?? []}
          selectedId={selectedWardCode}
          onSelect={setSelectedWardCode}
          searchTerm={searchWardTerm}
          onSearchChange={setSearchWardTerm}
          nameKey="wardName"
          idKey="wardCode"
          placeholder="Select ward..."
          disabled={!selectedDistrictId || wardLoading || disabled}
        />
      </div>

      <Textarea
        placeholder="Enter street address..."
        value={street}
        onChange={e => setStreet(e.target.value)}
        className="w-full"
        disabled={disabled}
      />
    </div>
  );
}
