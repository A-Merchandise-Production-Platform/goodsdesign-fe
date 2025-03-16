'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { axiosInstance } from '@/api';

export interface Bank {
  id: string;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: boolean;
  lookupSupported: boolean;
  support: number;
  isTransfer: boolean;
  swiftCode: string | null;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface CreateBankDto {
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported?: boolean;
  lookupSupported?: boolean;
  support?: number;
  isTransfer?: boolean;
  swiftCode?: string;
}

export interface UpdateBankDto {
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported?: boolean;
  lookupSupported?: boolean;
  support?: number;
  isTransfer?: boolean;
  swiftCode?: string;
  isActive?: boolean;
}

const GET_BANKS_QUERY = `
  query GetBanks($includeDeleted: Boolean) {
    systemConfigBanks(includeDeleted: $includeDeleted) {
      id
      name
      code
      bin
      shortName
      logo
      transferSupported
      lookupSupported
      support
      isTransfer
      swiftCode
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

const CREATE_BANK_MUTATION = `
  mutation CreateBank($createSystemConfigBankDto: CreateSystemConfigBankDto!, $userId: String) {
    createSystemConfigBank(createSystemConfigBankDto: $createSystemConfigBankDto, userId: $userId) {
      id
      name
      code
      bin
      shortName
      logo
      transferSupported
      lookupSupported
      support
      isTransfer
      swiftCode
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

const UPDATE_BANK_MUTATION = `
  mutation UpdateBank($id: String!, $updateSystemConfigBankDto: UpdateSystemConfigBankDto!, $userId: String) {
    updateSystemConfigBank(id: $id, updateSystemConfigBankDto: $updateSystemConfigBankDto, userId: $userId) {
      id
      name
      code
      bin
      shortName
      logo
      transferSupported
      lookupSupported
      support
      isTransfer
      swiftCode
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

const DELETE_BANK_MUTATION = `
  mutation DeleteBank($id: String!, $userId: String) {
    removeSystemConfigBank(id: $id, userId: $userId) {
      id
      name
      code
      bin
      shortName
      logo
      transferSupported
      lookupSupported
      support
      isTransfer
      swiftCode
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

const RESTORE_BANK_MUTATION = `
  mutation RestoreBank($id: String!, $userId: String) {
    restoreSystemConfigBank(id: $id, userId: $userId) {
      id
      name
      code
      bin
      shortName
      logo
      transferSupported
      lookupSupported
      support
      isTransfer
      swiftCode
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

export function useBanks(includeDeleted: boolean = false) {
  const queryClient = useQueryClient();

  const { data: banks = [], isLoading, error } = useQuery({
    queryKey: ['banks', includeDeleted],
    queryFn: async () => {
      const { data } = await axiosInstance.post('/graphql', {
        query: GET_BANKS_QUERY,
        variables: { includeDeleted },
      });
      return data.data.systemConfigBanks;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newBank: CreateBankDto) => {
      const { data } = await axiosInstance.post('/graphql', {
        query: CREATE_BANK_MUTATION,
        variables: {
          createSystemConfigBankDto: newBank,
        },
      });
      return data.data.createSystemConfigBank;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toast.success('Bank created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create bank');
      console.error('Error creating bank:', error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBankDto }) => {
      const response = await axiosInstance.post('/graphql', {
        query: UPDATE_BANK_MUTATION,
        variables: {
          id,
          updateSystemConfigBankDto: data,
        },
      });
      return response.data.data.updateSystemConfigBank;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toast.success('Bank updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update bank');
      console.error('Error updating bank:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: DELETE_BANK_MUTATION,
        variables: { id },
      });
      return response.data.data.removeSystemConfigBank;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toast.success('Bank deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete bank');
      console.error('Error deleting bank:', error);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post('/graphql', {
        query: RESTORE_BANK_MUTATION,
        variables: { id },
      });
      return response.data.data.restoreSystemConfigBank;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toast.success('Bank restored successfully');
    },
    onError: (error) => {
      toast.error('Failed to restore bank');
      console.error('Error restoring bank:', error);
    },
  });

  return {
    banks,
    isLoading,
    error,
    createBank: createMutation.mutate,
    updateBank: updateMutation.mutate,
    deleteBank: deleteMutation.mutate,
    restoreBank: restoreMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isRestoring: restoreMutation.isPending,
  };
} 