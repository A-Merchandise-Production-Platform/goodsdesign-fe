import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateUserForm from '@/app/(root)/admin/users/_components/create-user-form';

interface CreateUserButtonProps {
  onSuccess: () => Promise<any>;
}

export default function CreateUserButton({ onSuccess }: CreateUserButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Create a new user to manage your application.
          </DialogDescription>
        </DialogHeader>
        <CreateUserForm
          onSuccess={() => {
            onSuccess();
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
