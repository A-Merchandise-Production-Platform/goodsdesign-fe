import { QueryOptions } from 'odata-query';
import { create } from 'zustand';

import { User } from '@/api/types/user';

interface UseFilterState {
  query: Partial<QueryOptions<User>>;
  setQuery: (query: Partial<QueryOptions<User>>) => void;
}

export const useFilterStore = create<UseFilterState>(set => ({
  query: {
    count: true,
    top: 10,
    skip: 0,
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
  },
  setQuery: query => set(state => ({ query: { ...state.query, ...query } })),
}));
