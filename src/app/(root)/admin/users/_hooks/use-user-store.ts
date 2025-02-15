import { User } from '@/api/types/user';
import { SortingState } from '@tanstack/react-table';
import { create } from 'zustand';

const INITIAL_ROLES = ['admin', 'manager', 'staff', 'factoryOwner', 'customer'];

interface UseUserStoreState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortField: string | undefined;
  sortOrder: 'asc' | 'desc' | undefined;
  roles: string[];
  handlePaginationChange: (newPage: number, newPageSize: number) => void;
  handleSearchChange: (searchTerm: string) => void;
  handleSortingChange: (newSorting: SortingState) => void;
  handleRolesChange: (roles: string[]) => void;
}

export const useUserStore = create<UseUserStoreState>(set => ({
  page: 1,
  pageSize: 10,
  searchTerm: '',
  sortField: undefined,
  sortOrder: undefined,
  roles: INITIAL_ROLES,
  setPage: (page: number) => set({ page }),
  setPageSize: (pageSize: number) => set({ pageSize }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setSortField: (sortField: string | undefined) => set({ sortField }),
  setSortOrder: (sortOrder: 'asc' | 'desc' | undefined) => set({ sortOrder }),
  setRoles: (roles: string[]) => set({ roles }),
  handlePaginationChange: (newPage: number, newPageSize: number) => {
    set({ page: newPage, pageSize: newPageSize });
  },
  handleSearchChange: (searchTerm: string) => {
    set({ searchTerm, page: 1 });
  },
  handleSortingChange: (newSorting: SortingState) => {
    const sortField = newSorting[0]?.id;
    const sortOrder = newSorting[0]?.desc ? 'desc' : 'asc';
    set({ sortField, sortOrder, page: 1 });
  },
  handleRolesChange: (roles: string[]) => {
    set({ roles, page: 1 });
  },
}));
