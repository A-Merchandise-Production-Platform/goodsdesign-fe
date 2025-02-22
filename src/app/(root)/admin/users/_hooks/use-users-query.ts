'use client';

import type { SortingState } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';

import { ODataResponse } from '@/api/types';
import type { User } from '@/api/types/user';
import { UserApi } from '@/api/user';
import { useDebounce } from '@/hooks/use-debounce';

const INITIAL_ROLES = ['admin', 'manager', 'staff', 'factoryOwner', 'customer'];

export function useUsersQuery() {
  // State Management
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(INITIAL_ROLES);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [data, setData] = useState<ODataResponse<User> | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (sorting.length > 0) {
      const newSortField = sorting[0].id;
      const newSortOrder = sorting[0].desc ? 'desc' : 'asc';
      if (newSortField !== sortField || newSortOrder !== sortOrder) {
        setSortField(newSortField);
        setSortOrder(newSortOrder);
        setPage(1);
      }
    }
  }, [sorting, sortField, sortOrder]);

  const fetchUsers = useCallback(async () => {
    let isMounted = true;
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await UserApi.getUsers({
        count: true,
        top: pageSize,
        skip: (page - 1) * pageSize,
        expand: ['role'],
        select: [
          'id',
          'imageUrl',
          'userName',
          'email',
          'gender',
          'dateOfBirth',
          'isActive',
          'role',
          'emailConfirmed',
          'phoneNumber',
          'twoFactorEnabled',
          'lockoutEnabled',
          'createdAt',
          'updatedAt',
        ],
        orderBy: [[sortField as keyof User, sortOrder]],
        filter: [
          'isActive eq true',
          ...(debouncedSearchTerm
            ? [
                `contains(email, '${debouncedSearchTerm}') or contains(userName, '${debouncedSearchTerm}')`,
              ]
            : []),
          ...(selectedRoles.length > 0
            ? [
                `role/name in (${selectedRoles.map(role => `'${role}'`).join(',')})`,
              ]
            : []),
        ].join(' and '),
      });

      if (isMounted) {
        setData(result);
      }
    } catch (error_) {
      if (isMounted) {
        setError(
          error_ instanceof Error
            ? error_
            : new Error('An error occurred while fetching users'),
        );
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [
    page,
    pageSize,
    debouncedSearchTerm,
    sortField,
    sortOrder,
    selectedRoles,
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePaginationChange = useCallback(
    (newPage: number, newPageSize: number) => {
      setPage(newPage);
      setPageSize(newPageSize);
    },
    [],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  const handleRoleToggle = useCallback((role: string) => {
    setSelectedRoles(previousRoles =>
      previousRoles.includes(role)
        ? previousRoles.filter(r => r !== role)
        : [...previousRoles, role],
    );
    setPage(1);
  }, []);

  return {
    data: data?.value ?? [],
    totalUsers: data?.['@odata.count'] ?? 0,
    isLoading,
    error,
    refetch: fetchUsers,
    handlePaginationChange,
    handleSearchChange,
    handleRoleToggle,
    selectedRoles,
    searchTerm,
    sorting,
    setSorting,
    pageSize,
    page,
  };
}
