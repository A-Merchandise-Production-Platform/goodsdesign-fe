'use client';

import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteUserBankMutation } from '@/graphql/generated/graphql';

interface DeleteBankDialogProps {
  bankId: string;
  bankName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteBankDialog({
  bankId,
  bankName,
  isOpen,
  onOpenChange,
}: DeleteBankDialogProps) {
  const [deleteBank, { loading }] = useDeleteUserBankMutation({
    refetchQueries: ['GetMyUserBanks'],
    onCompleted: () => {
      toast.success('Bank account deleted successfully');
      onOpenChange(false);
    },
    onError: error => {
      toast.error(error.message || 'Failed to delete bank account');
    },
  });

  const handleDelete = () => {
    deleteBank({
      variables: {
        deleteUserBankId: bankId,
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Delete Bank Account</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Are you sure you want to delete this bank account{' '}
            {bankName ? `(${bankName})` : ''}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
