'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

interface OrderSearchProps {
  onSearch: (value: string) => void;
}

export function OrderSearch({ onSearch }: OrderSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
      <Input
        type="search"
        placeholder="Search order by ID..."
        className="pl-8"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
