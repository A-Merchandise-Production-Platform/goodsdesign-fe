'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterIcon, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Define the status options based on the status map in the orders page
const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'PAID', label: 'Paid' },
  { value: 'UNPAID', label: 'Unpaid' },
  { value: 'PAYMENT_RECEIVED', label: 'Payment Received' },
  { value: 'WAITING_FILL_INFORMATION', label: 'Waiting for Information' },
  { value: 'NEED_MANAGER_HANDLE', label: 'Needs Manager' },
  { value: 'PENDING_ACCEPTANCE', label: 'Pending Acceptance' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'IN_PRODUCTION', label: 'In Production' },
  { value: 'WAITING_FOR_CHECKING_QUALITY', label: 'Quality Check' },
  { value: 'REWORK_REQUIRED', label: 'Rework Required' },
  { value: 'REWORK_IN_PROGRESS', label: 'Rework in Progress' },
  { value: 'WAITING_PAYMENT', label: 'Waiting Payment' },
  { value: 'READY_FOR_SHIPPING', label: 'Ready for Shipping' },
];

interface OrderFilterProps {
  onFilterChange: (selectedStatuses: string[]) => void;
}

export function OrderFilter({ onFilterChange }: OrderFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  // Initialize with all selected
  useEffect(() => {
    if (selectAll) {
      setSelectedStatuses(STATUS_OPTIONS.map(option => option.value));
    }
  }, []);

  // Update parent component when selected statuses change
  useEffect(() => {
    onFilterChange(selectedStatuses);
  }, [selectedStatuses, onFilterChange]);

  const handleStatusChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses(prev => [...prev, value]);
    } else {
      setSelectedStatuses(prev => prev.filter(status => status !== value));
    }

    // Update selectAll state
    if (!checked) {
      setSelectAll(false);
    } else if (selectedStatuses.length + 1 === STATUS_OPTIONS.length) {
      setSelectAll(true);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedStatuses(STATUS_OPTIONS.map(option => option.value));
    } else {
      setSelectedStatuses([]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={checked => handleSelectAll(checked === true)}
            />
            <label
              htmlFor="select-all"
              className="flex-1 cursor-pointer text-sm font-medium"
            >
              Select All Statuses
            </label>
          </div>
        </div>
        <div className="grid max-h-72 grid-cols-1 gap-1 overflow-auto p-2">
          {STATUS_OPTIONS.map(option => (
            <label
              key={option.value}
              className={cn(
                'hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm',
                selectedStatuses.includes(option.value) && 'text-foreground',
                !selectedStatuses.includes(option.value) &&
                  'text-muted-foreground',
              )}
            >
              <Checkbox
                id={`status-${option.value}`}
                checked={selectedStatuses.includes(option.value)}
                onCheckedChange={checked =>
                  handleStatusChange(option.value, checked === true)
                }
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="flex justify-end border-t p-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
