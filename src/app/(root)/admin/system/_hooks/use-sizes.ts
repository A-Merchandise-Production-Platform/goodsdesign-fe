'use client';

import { axiosInstance } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Size {
  id: string;
  code: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface CreateSizeDto {
  code: string;
}

export interface UpdateSizeDto {
  code?: string;
  isActive?: boolean;
}

const GET_SIZES_QUERY = `
  query GetSizes($includeDeleted: Boolean) {
    systemConfigSizes(includeDeleted: $includeDeleted) {
      id
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

const CREATE_SIZE_MUTATION = `
  mutation CreateSize($createSystemConfigSizeDto: CreateSystemConfigSizeDto!, $userId: String) {
    createSystemConfigSize(createSystemConfigSizeDto: $createSystemConfigSizeDto, userId: $userId) {
      id
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

const UPDATE_SIZE_MUTATION = `
  mutation UpdateSize($id: String!, $updateSystemConfigSizeDto: UpdateSystemConfigSizeDto!, $userId: String) {
    updateSystemConfigSize(id: $id, updateSystemConfigSizeDto: $updateSystemConfigSizeDto, userId: $userId) {
      id
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

const DELETE_SIZE_MUTATION = `
  mutation DeleteSize($id: String!, $userId: String) {
    removeSystemConfigSize(id: $id, userId: $userId) {
      id
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

const RESTORE_SIZE_MUTATION = `
  mutation RestoreSize($id: String!, $userId: String) {
    restoreSystemConfigSize(id: $id, userId: $userId) {
      id
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

export function useSizes(includeDeleted: boolean = false) {
  const queryClient = useQueryClient();

  const { data: sizes = [], isLoading, error } = useQuery({
    queryKey: ['sizes', includeDeleted],
    queryFn: async () => {
      const { data } = await axiosInstance.post('/graphql', {
        query: GET_SIZES_QUERY,
        variables: { includeDeleted },
      });
      return data.data.systemConfigSizes;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newSize: CreateSizeDto) => {
      const { data } = await axiosInstance.post('/graphql', {
        query: CREATE_SIZE_MUTATION,
        variables: {
          createSystemConfigSizeDto: newSize,
        },
      });
      return data.data.createSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create size');
      console.error('Error creating size:', error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateSizeDto }) => {
      const response = await axiosInstance.post('/graphql', {
        query: UPDATE_SIZE_MUTATION,
        variables: {
          id,
          updateSystemConfigSizeDto: data,
        },
      });
      return response.data.data.updateSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update size');
      console.error('Error updating size:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: DELETE_SIZE_MUTATION,
        variables: { id },
      });
      return response.data.data.removeSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete size');
      console.error('Error deleting size:', error);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: RESTORE_SIZE_MUTATION,
        variables: { id },
      });
      return response.data.data.restoreSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size restored successfully');
    },
    onError: (error) => {
      toast.error('Failed to restore size');
      console.error('Error restoring size:', error);
    },
  });

  return {
    sizes,
    isLoading,
    error,
    createSize: createMutation.mutate,
    updateSize: updateMutation.mutate,
    deleteSize: deleteMutation.mutate,
    restoreSize: restoreMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isRestoring: restoreMutation.isPending,
  };
} 