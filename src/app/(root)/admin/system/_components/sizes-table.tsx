'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { Size, useSizes } from '../_hooks/use-sizes';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const sizeFormSchema = z.object({
  code: z.string()
    .min(1, 'Size code is required')
    .regex(/^[A-Z0-9]+$/, 'Code must contain only uppercase letters and numbers'),
  isActive: z.boolean().default(true),
});

type SizeFormValues = z.infer<typeof sizeFormSchema>;

export function SizesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSize, setEditingSize] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: {
      code: '',
      isActive: true,
    },
  });

  const {
    sizes,
    isLoading,
    error,
    createSize,
    updateSize,
    deleteSize,
    restoreSize,
    isCreating,
    isUpdating,
    isDeleting,
    isRestoring,
  } = useSizes(true); // Include soft-deleted sizes

  const filteredSizes = sizes.filter((size:Size ) =>
    size.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSubmit = async (values: SizeFormValues) => {
    try {
      setServerError(null);
      if (editingSize) {
        await updateSize({ id: editingSize, data: values });
      } else {
        await createSize(values);
      }
      setIsAddDialogOpen(false);
      form.reset();
      setEditingSize(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setServerError(errorMessage);
      
      if (errorMessage.includes('already exists')) {
        form.setError('code', { 
          type: 'manual',
          message: 'A size with this code already exists'
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this size?')) {
        await deleteSize(id);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes('in use') || errorMessage.includes('being used')) {
        toast.error('This size cannot be deleted as it is being used');
      } else {
        toast.error(errorMessage || 'Failed to delete size');
      }
    }
  };

  const handleRestore = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to restore this size?')) {
        await restoreSize(id);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage?.includes('already exists')) {
        toast.error('A size with this code already exists');
      } else if (errorMessage?.includes('not found')) {
        toast.error('Size not found');
      } else {
        toast.error(errorMessage || 'Failed to restore size');
      }
    }
  };

  const resetForm = () => {
    form.reset();
    setEditingSize(null);
    setServerError(null);
  };

  if (error) return <div>Error loading sizes</div>;

  return (
    <div className="bg-background space-y-4 rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Search sizes..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Size
        </Button>

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={open => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSize ? 'Edit Size' : 'Add New Size'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the{' '}
                {editingSize ? 'size update' : 'new size configuration'}.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {serverError && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {serverError}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="XL" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Is Active</FormLabel>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating || isUpdating}
                  >
                    {isCreating || isUpdating ? (
                      <LoadingSpinner className="mr-2" />
                    ) : null}
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deleted</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <LoadingSpinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredSizes.length > 0 ? (
              filteredSizes.map((size:Size ) => (
                <TableRow key={size.id}>
                  <TableCell>{size.code}</TableCell>
                  <TableCell>
                    <Badge variant={size.isActive ? 'success' : 'destructive'}>
                      {size.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={size.isDeleted ? 'destructive' : 'secondary'}>
                      {size.isDeleted ? 'Deleted' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {!size.isDeleted ? (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                const sizeToEdit = sizes.find(
                                  (s:Size ) => s.id === size.id,
                                );
                                if (sizeToEdit) {
                                  setEditingSize(size.id);
                                  form.reset(sizeToEdit);
                                  setIsAddDialogOpen(true);
                                }
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(size.id)}
                              className="text-destructive"
                            >
                              Delete
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleRestore(size.id)}
                          >
                            Restore
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
