'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { AreaApi } from '@/api/area';
import { useAreaFilterStore } from '@/app/(root)/admin/areas/stores/use-area-filter.store';

export default function useArea() {
  const { query } = useAreaFilterStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['areas', query],
    queryFn: () => AreaApi.getAll(query),
  });

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
