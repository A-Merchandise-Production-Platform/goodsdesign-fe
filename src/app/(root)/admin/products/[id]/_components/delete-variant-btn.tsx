import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import {
  GetProductByIdQuery,
  useRemoveSystemConfigVariantMutation,
} from '@/graphql/generated/graphql';
import { toast } from 'sonner';
import { ApolloError } from '@apollo/client';

interface DeleteVariantBtnProps {
  variant: NonNullable<GetProductByIdQuery['product']['variants']>[0];
}

export function DeleteVariantBtn({ variant }: DeleteVariantBtnProps) {
  const [open, setOpen] = useState(false);

  const [
    deleteSystemConfigVariant,
    { loading: deleteSystemConfigVariantLoading },
  ] = useRemoveSystemConfigVariantMutation({
    onCompleted: () => {
      toast.success('Variant deleted successfully');
      setOpen(false);
    },
    onError: (error: ApolloError) => {
      toast.error(error.message);
    },
    refetchQueries: ['GetProductById'],
  });

  const handleDelete = () => {
    deleteSystemConfigVariant({
      variables: {
        removeSystemConfigVariantId: variant.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive opacity-0 transition-opacity group-hover:opacity-100"
        onClick={e => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Variant</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this variant? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteSystemConfigVariantLoading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
