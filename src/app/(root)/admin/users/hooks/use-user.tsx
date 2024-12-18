/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { UserApi } from '@/api/user';
import { useUserFilterStore } from '@/app/(root)/admin/users/stores/use-user-filter.store';

export function useUser() {
  const { query } = useUserFilterStore();

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
    refetch,
  };
}
