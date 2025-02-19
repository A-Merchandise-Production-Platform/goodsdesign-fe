'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { UserApi } from '@/api/user';

interface DeleteButtonProps {
  id: string;
  refetch: () => void;
}

export function DeleteButton({ id, refetch }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: UserApi.deleteUser,
    onSuccess: () => {
      refetch();
      setIsOpen(false);
      toast.success('User deleted successfully.');
    },
    onError: () => {
      toast.error('An error occurred while deleting the user.');
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start text-red-500 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
