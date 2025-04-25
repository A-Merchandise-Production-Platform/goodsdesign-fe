'use client';

import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import ErrorPage from '@/components/shared/error-page';
import { Sidebar } from '@/components/shared/sidebar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Roles,
  useProductDesignsByUserQuery,
  useRemoveProductDesignMutation,
  useUpdateProductDesignMutation,
  useDuplicateProductDesignMutation,
} from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from 'sonner';

import { DesignCard } from './_components/design-card';

export default function MyDesignPage() {
  const { user } = useAuthStore();
  const { data, loading, refetch } = useProductDesignsByUserQuery();
  const [updateDesign] = useUpdateProductDesignMutation();
  const [removeProductDesign] = useRemoveProductDesignMutation();
  const [duplicateDesign] = useDuplicateProductDesignMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<string | null>(null);

  if (user?.role !== Roles.Customer) {
    return (
      <ErrorPage message="You not allowed to access this page" code={403} />
    );
  }

  const handleDelete = async (id: string) => {
    setDesignToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!designToDelete) return;

    try {
      await removeProductDesign({
        variables: {
          removeProductDesignId: designToDelete,
        },
      });
      toast.success('Design deleted successfully!');
      await refetch();
    } catch (error) {
      toast.error('Failed to delete design. Please try again.');
    }
    setDeleteDialogOpen(false);
    setDesignToDelete(null);
  };

  const handleTogglePublic = async (
    id: string,
    currentState: boolean,
    isFinalized: boolean,
  ) => {
    try {
      await updateDesign({
        variables: {
          updateProductDesignId: id,
          input: {
            isPublic: !currentState,
            isTemplate: false,
            isFinalized: isFinalized,
          },
        },
      });
      toast.success(`Design is now ${!currentState ? 'public' : 'private'}`);
      // Refresh data after successful update
      await refetch();
    } catch (error) {
      toast.error('Failed to update design. Please try again.');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await duplicateDesign({
        variables: {
          duplicateProductDesignId: id
        }
      });
      toast.success('Design duplicated successfully!');
      await refetch();
    } catch (error) {
      toast.error('Failed to duplicate design. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4 pb-2 md:grid-cols-[200px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Designs</h1>
          <Link href="/product/tshirt">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Create New Design
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.productDesignsByUser?.length ? (
            data.productDesignsByUser.map(design => (
              <DesignCard
                key={design.id}
                design={design}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onTogglePublic={handleTogglePublic}
              />
            ))
          ) : (
            <div className="container mx-auto py-6">
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
                  <Search className="text-muted-foreground h-10 w-10" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">No designs found</h3>
                <p className="text-muted-foreground mt-2 text-sm"></p>

                <Link href="/product/tshirt">
                  <Button className="mt-6">
                    <Plus className="h-4 w-4" />
                    Create New Design
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this design? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
