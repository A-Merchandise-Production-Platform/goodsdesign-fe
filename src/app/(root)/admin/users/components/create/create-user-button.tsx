import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import CreateUserForm from '@/app/(root)/admin/users/components/create/create-user-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CreateUserButtonProps {
  refresh: () => void;
}

export default function CreateUserButton({ refresh }: CreateUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-dashed"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon size={16} />
            Create User
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl" hideCloseButton>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new user
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm onClose={setIsOpen} refresh={refresh} />
        </DialogContent>
      </Dialog>
    </>
  );
}
