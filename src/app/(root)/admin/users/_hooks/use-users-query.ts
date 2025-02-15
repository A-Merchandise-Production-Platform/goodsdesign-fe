import { useQuery } from '@tanstack/react-query';

import { User } from '@/api/types/user';
import { UserApi } from '@/api/user';
import { useUserStore } from '@/app/(root)/admin/users/_hooks/use-user-store';

export function useUsersQuery() {
  const { page, pageSize, searchTerm, sortField, sortOrder, roles } =
    useUserStore();
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [
      'users',
      page,
      pageSize,
      searchTerm,
      sortField,
      sortOrder,
      roles,
    ],
    queryFn: () =>
      UserApi.getUsers({
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
        orderBy: sortField
          ? [[sortField as keyof User, sortOrder ?? 'asc']]
          : [['createdAt', 'desc']],
        filter: [
          ...(searchTerm
            ? [
                `contains(email, '${searchTerm}') or contains(userName, '${searchTerm}')`,
              ]
            : []),
          ...(roles.length > 0
            ? [`role/name in (${roles.map(role => `'${role}'`).join(',')})`]
            : []),
        ].join(' and '),
      }),
    enabled: !!page && !!pageSize,
    placeholderData: previous => previous,
    staleTime: 300_000, // 5 minutes
  });

  return {
    data,
    pageCount: Math.ceil((data?.['@odata.count'] ?? 0) / pageSize),
    isLoading: isLoading || isFetching,
    isError,
    refetch,
  };
}
