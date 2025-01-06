/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useUserFilterStore } from '@/app/(root)/admin/users/stores/use-user-filter.store';

export function useUserSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { query, setQuery } = useUserFilterStore();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('Search') || '',
  );

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      newSearchParams.set('Search', debouncedSearchTerm);
      newSearchParams.set('PageNumber', '1');
    } else {
      newSearchParams.delete('Search');
    }
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
    setQuery({
      ...query,
      filter: debouncedSearchTerm
        ? {
            or: [
              { userName: { contains: debouncedSearchTerm } },
              { email: { contains: debouncedSearchTerm } },
            ],
          }
        : undefined,
    });
  }, [debouncedSearchTerm, router, searchParams]);

  const handleSearchChange = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, []);

  return {
    searchTerm,
    handleSearchChange,
  };
}
