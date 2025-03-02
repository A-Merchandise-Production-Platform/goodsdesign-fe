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
import { cn } from '@/lib/utils';

interface ComboboxProps<T> {
  data: T[];
  value: string | undefined;
  onValueChange: (value: string) => void;
  displayValue: (item: T) => string;
  getValue: (item: T) => string;
  placeholder: string;
  emptyText: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function Combobox<T>({
  data,
  value,
  onValueChange,
  displayValue,
  getValue,
  placeholder,
  emptyText,
  disabled = false,
  isLoading = false,
  className,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const removeDiacritics = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const filteredData = React.useMemo(() => {
    const normalizedQuery = removeDiacritics(searchQuery.toLowerCase());
    return data.filter(item =>
      removeDiacritics(displayValue(item).toLowerCase()).includes(
        normalizedQuery,
      ),
    );
  }, [data, displayValue, searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          type="button"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
          disabled={disabled}
          isLoading={isLoading}
        >
          {value && data.some(item => getValue(item) === value)
            ? displayValue(data.find(item => getValue(item) === value) as T)
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {disabled ? (
              <CommandEmpty>{emptyText}</CommandEmpty>
            ) : (
              <>
                {filteredData.length === 0 && (
                  <CommandEmpty>{emptyText}</CommandEmpty>
                )}
                <CommandGroup>
                  {filteredData.map(item => (
                    <CommandItem
                      key={getValue(item)}
                      value={getValue(item)}
                      onSelect={currentValue => {
                        onValueChange(
                          currentValue === value ? '' : currentValue,
                        );
                        setOpen(false);
                        setSearchQuery('');
                      }}
                      className={cn(
                        value === getValue(item) && 'bg-muted',
                        'hover:!bg-muted/50 cursor-pointer',
                      )}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === getValue(item)
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {displayValue(item)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
