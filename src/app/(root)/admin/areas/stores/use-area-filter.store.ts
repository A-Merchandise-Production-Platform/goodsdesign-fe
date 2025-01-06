import { QueryOptions } from 'odata-query';
import { create } from 'zustand';

import { Area } from '@/types/area';

interface AreaFilterState {
  query: Partial<QueryOptions<Area>>;
  setQuery: (query: Partial<QueryOptions<Area>>) => void;
}

export const useAreaFilterStore = create<AreaFilterState>(set => ({
  query: {
    count: true,
    top: 10,
    skip: 0,
    select: [
      'id',
      'name',
      'position',
      'code',
      'isDeleted',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    orderBy: [['createdAt', 'desc']],
  },
  setQuery: query => set(state => ({ query: { ...state.query, ...query } })),
}));
