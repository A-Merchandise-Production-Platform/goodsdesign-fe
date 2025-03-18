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
import { Color, useColors } from '../_hooks/use-colors';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
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

const colorFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z
    .string()
    .min(1, 'Color code is required')
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'Must be a valid hex color code (e.g., #FF0000)',
    ),
});

type ColorFormValues = z.infer<typeof colorFormSchema>;

export function ColorsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: {
      name: '',
      code: '',
    },
  });

  const {
    colors,
    isLoading,
    error,
    createColor,
    updateColor,
    deleteColor,
    restoreColor,
    isCreating,
    isUpdating,
    isDeleting,
    isRestoring,
  } = useColors(true); // Include soft-deleted colors

  const filteredColors = colors.filter(
    (color: Color) =>
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSubmit = async (values: ColorFormValues) => {
    try {
      setServerError(null);
      if (editingColor) {
        await updateColor({ id: editingColor, data: values });
      } else {
        await createColor(values);
      }
      setIsAddDialogOpen(false);
      form.reset();
      setEditingColor(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setServerError(errorMessage);

      if (errorMessage.includes('already exists')) {
        form.setError('code', {
          type: 'manual',
          message: 'A color with this code already exists',
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this color?')) {
        await deleteColor(id);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      if (
        errorMessage.includes('in use') ||
        errorMessage.includes('being used')
      ) {
        toast.error('This color cannot be deleted as it is being used');
      } else {
        toast.error(errorMessage || 'Failed to delete color');
      }
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreColor(id);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage || 'Failed to restore color');
    }
  };

  const resetForm = () => {
    form.reset();
    setEditingColor(null);
    setServerError(null);
  };

  if (error) return <div>Error loading colors</div>;

  return (
    <div className="bg-background space-y-4 rounded-md">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Search colors..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Color
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
                {editingColor ? 'Edit Color' : 'Add New Color'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the{' '}
                {editingColor ? 'color update' : 'new color configuration'}.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                {serverError && (
                  <div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">
                    {serverError}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Code</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            {...field}
                            placeholder="#000000"
                            className="flex-1"
                          />
                          <div
                            className="h-10 w-10 rounded border"
                            style={{ backgroundColor: field.value }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
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
                  <Button type="submit" disabled={isCreating || isUpdating}>
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
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deleted</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <LoadingSpinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredColors.length > 0 ? (
              filteredColors.map((color: Color) => (
                <TableRow key={color.id}>
                  <TableCell>{color.name}</TableCell>
                  <TableCell>{color.code}</TableCell>
                  <TableCell>
                    <div
                      className="h-8 w-8 rounded border"
                      style={{ backgroundColor: color.code }}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant={color.isActive ? 'success' : 'destructive'}>
                      {color.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={color.isDeleted ? 'destructive' : 'secondary'}
                    >
                      {color.isDeleted ? 'Deleted' : 'Active'}
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
                        {!color.deletedAt ? (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                const colorToEdit = colors.find(
                                  (c: Color) => c.id === color.id,
                                );
                                if (colorToEdit) {
                                  setEditingColor(color.id);
                                  form.reset(colorToEdit);
                                  setIsAddDialogOpen(true);
                                }
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(color.id)}
                              className="text-destructive"
                            >
                              Delete
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleRestore(color.id)}
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
                <TableCell colSpan={6} className="h-24 text-center">
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
