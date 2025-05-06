'use client';

import { gql, useMutation } from '@apollo/client';
import { Trash2 } from 'lucide-react';
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRemoveSystemConfigDiscountMutation } from '@/graphql/generated/graphql';

interface DeleteDiscountDialogProps {
  discount: {
    id: string;
    name: string;
  };
}

export function DeleteDiscountDialog({ discount }: DeleteDiscountDialogProps) {
  const [removeDiscount, { loading: removeLoading }] =
    useRemoveSystemConfigDiscountMutation({
      onCompleted: () => {
        toast.success('Discount deleted successfully');
      },
      onError: error => {
        toast.error(error.message);
        console.error(error);
      },
      refetchQueries: ['GetAllDiscountByProductId'],
    });

  const handleDelete = async () => {
    await removeDiscount({
      variables: {
        removeSystemConfigDiscountId: discount.id,
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash2 className="text-destructive h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Discount</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the "{discount.name}" discount? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={removeLoading}
          >
            {removeLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
