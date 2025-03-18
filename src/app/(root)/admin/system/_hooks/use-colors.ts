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

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

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
      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'Failed to fetch colors');
      }
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

      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'Failed to create color');
      }

      return data.data.createSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color created successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create color';

      if (errorMessage.includes('already exists')) {
        toast.error('A color with this code already exists');
      } else {
        toast.error(errorMessage);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateColorDto }) => {
      const { data: response } = await axiosInstance.post('/graphql', {
        query: UPDATE_COLOR_MUTATION,
        variables: {
          id,
          updateSystemConfigColorDto: data,
        },
      });

      if (response.errors) {
        throw new Error(
          response.errors[0]?.message || 'Failed to update color',
        );
      }

      return response.data.updateSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color updated successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update color';

      if (errorMessage.includes('already exists')) {
        toast.error('A color with this code already exists');
      } else {
        toast.error(errorMessage);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post('/graphql', {
        query: DELETE_COLOR_MUTATION,
        variables: { id },
      });

      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'Failed to delete color');
      }

      return data.data.removeSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color deleted successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage = error.response?.data?.message || error.message;
      if (
        errorMessage?.includes('in use') ||
        errorMessage?.includes('being used')
      ) {
        toast.error('This color cannot be deleted as it is being used');
      } else {
        toast.error(errorMessage || 'Failed to delete color');
      }
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post('/graphql', {
        query: RESTORE_COLOR_MUTATION,
        variables: { id },
      });

      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'Failed to restore color');
      }

      return data.data.restoreSystemConfigColor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color restored successfully');
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to restore color';
      toast.error(errorMessage);
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
