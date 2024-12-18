/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useUserFilterStore } from '@/app/(root)/admin/users/stores/use-user-filter.store';

const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 100;
const MIN_PAGE = 1;

export function useUserPaging(totalItems: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { query, setQuery } = useUserFilterStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  //Get the page size and page number from the URL
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
  }, [searchParams]);

  //Update the URL when the page size or page number changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('PageSize', pageSize.toString());
    newSearchParams.set('PageNumber', currentPage.toString());
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  }, [pageSize, currentPage, router, searchParams]);

  //Calculate the total number of pages
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  //Go to a specific page
  const goToPage = (page: number) => {
    const validatedPage = Math.max(MIN_PAGE, Math.min(page, totalPages));
    setCurrentPage(validatedPage);
  };

  //Change the page size
  const changePageSize = (newPageSize: number) => {
    const validatedPageSize = Math.max(
      MIN_PAGE_SIZE,
      Math.min(newPageSize, MAX_PAGE_SIZE),
    );
    setPageSize(validatedPageSize);
    setCurrentPage(1);
  };

  //Update the query when the page size or page number changes
  useEffect(() => {
    const newSkip = (currentPage - 1) * pageSize;
    setQuery({ ...query, top: pageSize, skip: newSkip });
  }, [currentPage, pageSize, setQuery]);

  return {
    currentPage,
    pageSize,
    totalPages,
    goToPage,
    changePageSize,
  };
}
