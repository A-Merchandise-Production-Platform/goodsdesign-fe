'use client';

import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { UserApi } from '@/api/user';
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

interface DeleteUserButtonProps {
  id: string;
  userName: string;
}

export default function DeleteUserButton({
  id,
  userName,
}: DeleteUserButtonProps) {
  const [open, setOpen] = React.useState(false);

  const mutation = useMutation({
    mutationFn: UserApi.deleteUser,
    onSuccess: () => {
      toast.success('User deleted successfully');
      setOpen(false);
    },
    onError: error => {
      toast.error('Failed to delete user', {
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline-danger" className="flex items-center gap-2">
          <Trash2 size={16} />
          Delete User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the user account for{' '}
            <span className="font-semibold text-primary">{userName}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
