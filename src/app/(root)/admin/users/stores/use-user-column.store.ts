import { ColumnDef } from '@tanstack/react-table';
import { create } from 'zustand';

import { User } from '@/api/types/user';
import { userColumns } from '@/app/(root)/admin/users/components/columns';

interface ColumnState {
  visibleColumns: ColumnDef<User>[];
  hiddenColumns: ColumnDef<User>[];
  toggleColumn: (column: ColumnDef<User>) => void;
  resetColumns: () => void;
}

export const useColumnStore = create<ColumnState>()(set => ({
  visibleColumns: userColumns,
  hiddenColumns: [],
  toggleColumn: column =>
    set(state => {
      const isVisible = state.visibleColumns.includes(column);
      if (isVisible) {
        return {
          visibleColumns: state.visibleColumns.filter(col => col !== column),
          hiddenColumns: [...state.hiddenColumns, column],
        };
      } else {
        const originalIndex = userColumns.indexOf(column);
        const newVisibleColumns = [...state.visibleColumns];
        newVisibleColumns.splice(originalIndex, 0, column);
        return {
          visibleColumns: newVisibleColumns,
          hiddenColumns: state.hiddenColumns.filter(col => col !== column),
        };
      }
    }),
  resetColumns: () =>
    set({
      visibleColumns: userColumns,
      hiddenColumns: [],
    }),
}));
