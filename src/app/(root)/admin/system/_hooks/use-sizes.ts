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

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const GET_SIZES_QUERY = `
  query GetSizes($includeDeleted: Boolean) {
    systemConfigSizes(includeDeleted: $includeDeleted) {
      id
      code
      isActive
      isDeleted
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
    }
  }
`;

export function useSizes(includeDeleted: boolean = false) {
  const queryClient = useQueryClient();

  const {
    data: sizes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['sizes', includeDeleted],
    queryFn: async () => {
      const { data } = await axiosInstance.post('/graphql', {
        query: GET_SIZES_QUERY,
        variables: { includeDeleted },
      });
      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'Failed to fetch sizes');
      }
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
      
      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'Failed to create size');
      }
      
      return data.data.createSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size created successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create size';
      
      if (errorMessage.includes('already exists')) {
        toast.error('A size with this code already exists');
      } else {
        toast.error(errorMessage);
      }
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

      if (response.data.errors) {
        throw new Error(response.data.errors[0]?.message || 'Failed to update size');
      }

      return response.data.data.updateSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size updated successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update size';
      
      if (errorMessage.includes('already exists')) {
        toast.error('A size with this code already exists');
      } else {
        toast.error(errorMessage);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: DELETE_SIZE_MUTATION,
        variables: { id },
      });
      
      if (response.data.errors) {
        throw new Error(response.data.errors[0]?.message || 'Failed to delete size');
      }
      
      return response.data.data.removeSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size deleted successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage?.includes('in use') || errorMessage?.includes('being used')) {
        toast.error('This size cannot be deleted as it is being used');
      } else {
        toast.error(errorMessage || 'Failed to delete size');
      }
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: RESTORE_SIZE_MUTATION,
        variables: { id },
      });
      
      if (response.data.errors) {
        throw new Error(response.data.errors[0]?.message || 'Failed to restore size');
      }
      
      return response.data.data.restoreSystemConfigSize;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success('Size restored successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage = error.response?.data?.message || error.message;
      
      if (errorMessage?.includes('already exists')) {
        toast.error('A size with this code already exists');
      } else if (errorMessage?.includes('not found')) {
        toast.error('Size not found');
      } else {
        toast.error(errorMessage || 'Failed to restore size');
      }
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
