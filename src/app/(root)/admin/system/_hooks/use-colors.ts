'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { axiosInstance } from '@/api';

export interface Color {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface CreateColorDto {
  name: string;
  code: string;
}

export interface UpdateColorDto {
  name?: string;
  code?: string;
  isActive?: boolean;
}

const GET_COLORS_QUERY = `
  query GetColors($includeDeleted: Boolean) {
    systemConfigColors(includeDeleted: $includeDeleted) {
      id
      name
      code
      isActive
      isDeleted
      createdAt
      createdBy
      updatedAt
      updatedBy
      deletedAt
      deletedBy
    }
  }
`;

const CREATE_COLOR_MUTATION = `
  mutation CreateColor($createSystemConfigColorDto: CreateSystemConfigColorDto!, $userId: String) {
    createSystemConfigColor(createSystemConfigColorDto: $createSystemConfigColorDto, userId: $userId) {
      id
      name
      code
      isActive
      isDeleted
      createdAt
      createdBy
      updatedAt
      updatedBy
      deletedAt
      deletedBy
    }
  }
`;

const UPDATE_COLOR_MUTATION = `
  mutation UpdateColor($id: String!, $updateSystemConfigColorDto: UpdateSystemConfigColorDto!, $userId: String) {
    updateSystemConfigColor(id: $id, updateSystemConfigColorDto: $updateSystemConfigColorDto, userId: $userId) {
      id
      name
      code
      isActive
      isDeleted
      createdAt
      createdBy
      updatedAt
      updatedBy
      deletedAt
      deletedBy
    }
  }
`;

const DELETE_COLOR_MUTATION = `
  mutation DeleteColor($id: String!, $userId: String) {
    removeSystemConfigColor(id: $id, userId: $userId) {
      id
      name
      code
      isActive
      isDeleted
      createdAt
      createdBy
      updatedAt
      updatedBy
      deletedAt
      deletedBy
    }
  }
`;

const RESTORE_COLOR_MUTATION = `
  mutation RestoreColor($id: String!, $userId: String) {
    restoreSystemConfigColor(id: $id, userId: $userId) {
      id
      name
      code
      isActive
      isDeleted
      createdAt
      createdBy
      updatedAt
      updatedBy
      deletedAt
      deletedBy
    }
  }
`;

export function useColors(includeDeleted: boolean = false) {
  const queryClient = useQueryClient();

  const {
    data: colors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['colors', includeDeleted],
    queryFn: async () => {
      const { data } = await axiosInstance.post('/graphql', {
        query: GET_COLORS_QUERY,
        variables: { includeDeleted },
      });
      return data.data.systemConfigColors;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newColor: CreateColorDto) => {
      const { data } = await axiosInstance.post('/graphql', {
        query: CREATE_COLOR_MUTATION,
        variables: {
          createSystemConfigColorDto: newColor,
        },
      });
      return data.data.createSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color created successfully');
    },
    onError: error => {
      toast.error('Failed to create color');
      console.error('Error creating color:', error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateColorDto }) => {
      const response = await axiosInstance.post('/graphql', {
        query: UPDATE_COLOR_MUTATION,
        variables: {
          id,
          updateSystemConfigColorDto: data,
        },
      });
      return response.data.data.updateSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color updated successfully');
    },
    onError: error => {
      toast.error('Failed to update color');
      console.error('Error updating color:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: DELETE_COLOR_MUTATION,
        variables: { id },
      });
      return response.data.data.removeSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color deleted successfully');
    },
    onError: error => {
      toast.error('Failed to delete color');
      console.error('Error deleting color:', error);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: RESTORE_COLOR_MUTATION,
        variables: { id },
      });
      return response.data.data.restoreSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color restored successfully');
    },
    onError: error => {
      toast.error('Failed to restore color');
      console.error('Error restoring color:', error);
    },
  });

  return {
    colors,
    isLoading,
    error,
    createColor: createMutation.mutate,
    updateColor: updateMutation.mutate,
    deleteColor: deleteMutation.mutate,
    restoreColor: restoreMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isRestoring: restoreMutation.isPending,
  };
}
