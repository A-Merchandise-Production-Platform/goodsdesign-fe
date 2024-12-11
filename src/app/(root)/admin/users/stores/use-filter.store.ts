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
  },
  setQuery: query => set({ query }),
}));
