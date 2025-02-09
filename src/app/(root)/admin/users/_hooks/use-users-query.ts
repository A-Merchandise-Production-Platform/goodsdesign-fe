import { useQuery } from '@tanstack/react-query';

import { User } from '@/api/types/user';
import { UserApi } from '@/api/user';

export function useUsersQuery(
  page: number,
  pageSize: number,
  searchTerm: string,
  sortField: string | undefined,
  sortOrder: 'asc' | 'desc' | undefined,
) {
  return useQuery({
    queryKey: ['users', page, pageSize, searchTerm, sortField, sortOrder],
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
        filter: searchTerm
          ? `contains(email, '${searchTerm}') or contains(userName, '${searchTerm}')`
          : undefined,
      }),
  });
}
