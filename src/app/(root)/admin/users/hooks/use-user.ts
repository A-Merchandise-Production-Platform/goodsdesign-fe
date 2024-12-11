/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { UserApi } from '@/api/user';
import { useFilterStore } from '@/app/(root)/admin/users/stores/use-filter.store';

// Constants for pagination limits
const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 100;
const MIN_PAGE = 1;

export default function useUser() {
  // State management
  const { query, setQuery } = useFilterStore();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Next.js routing hooks
  const searchParams = useSearchParams();
  const router = useRouter();

  // Data fetching
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', query],
    queryFn: () => UserApi.getUsers(query),
  });

  // Synchronize URL params with state
  useEffect(() => {
    const urlPageSize = Number(searchParams.get('PageSize')) || pageSize;
    const urlPageNumber = Number(searchParams.get('PageNumber')) || currentPage;

    const validatedPageSize = Math.max(
      MIN_PAGE_SIZE,
      Math.min(urlPageSize, MAX_PAGE_SIZE),
    );
    const validatedPageNumber = Math.max(MIN_PAGE, urlPageNumber);

    setPageSize(validatedPageSize);
    setCurrentPage(validatedPageNumber);

    const newSkip = (validatedPageNumber - 1) * validatedPageSize;
    setQuery({ ...query, top: validatedPageSize, skip: newSkip });
  }, [searchParams, setQuery]);

  // Trigger refetch when query changes
  useEffect(() => {
    refetch();
  }, [query, refetch]);

  // Update total count when data changes
  useEffect(() => {
    if (data) {
      setCount(data['@odata.count'] || 0);
    }
  }, [data, setCount]);

  // Update URL when pagination state changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('PageSize', pageSize.toString());
    newSearchParams.set('PageNumber', currentPage.toString());
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  }, [pageSize, currentPage, router, searchParams]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  // Pagination control: Go to specific page
  const goToPage = (page: number) => {
    const validatedPage = Math.max(MIN_PAGE, Math.min(page, totalPages));
    setCurrentPage(validatedPage);
    const newSkip = (validatedPage - 1) * pageSize;
    setQuery({ ...query, skip: newSkip });
  };

  // Pagination control: Change page size
  const changePageSize = (newPageSize: number) => {
    const validatedPageSize = Math.max(
      MIN_PAGE_SIZE,
      Math.min(newPageSize, MAX_PAGE_SIZE),
    );
    setPageSize(validatedPageSize);
    setCurrentPage(1);
    setQuery({ ...query, top: validatedPageSize, skip: 0 });
  };

  // Return values and functions for component use
  return {
    data,
    isLoading,
    error,
    setQuery,
    count,
    currentPage,
    pageSize,
    totalPages,
    goToPage,
    changePageSize,
  };
}
