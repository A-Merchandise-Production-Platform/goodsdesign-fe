import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

import { useColumnStore } from '@/app/(root)/admin/users/stores/use-user-column.store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { userColumns } from './columns';

export function ColumnSelector() {
  const { visibleColumns, toggleColumn, resetColumns } = useColumnStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userColumns.map((column, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            className="capitalize"
            checked={visibleColumns.includes(column)}
            onCheckedChange={() => toggleColumn(column)}
          >
            {column.header?.toString()}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem onCheckedChange={resetColumns}>
          Reset columns
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
