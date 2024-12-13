/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { UserApi } from '@/api/user';
import { useFilterStore } from '@/app/(root)/admin/users/stores/use-filter.store';

export function useUser() {
  const { query } = useFilterStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', query],
    queryFn: () => UserApi.getUsers(query),
  });

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  return {
    data,
    isLoading,
    error,
  };
}
