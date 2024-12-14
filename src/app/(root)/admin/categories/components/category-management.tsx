'use client';

import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { CategoryApi } from '@/api/category';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Category } from '@/types/category';

import CategoryManagementSkeleton from './category-management-skeleton';

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
    imageUrl: '',
    isDeleted: false,
  });
  const [editingCategory, setEditingCategory] = useState<Category>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch categories with OData options
  const fetchCategories = async () => {
    setLoading(true);
    const options = {
      filter: { isDeleted: false },
      select: ['id', 'name', 'description', 'imageUrl', 'isDeleted'],
    };
    const response = await CategoryApi.getAll(options);
    if (response.isSuccess) {
      setCategories(response.data);
    } else {
      toast.error(response.message || 'Failed to fetch categories');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (newCategory.name && newCategory.description && newCategory.imageUrl) {
      const response = await CategoryApi.create(newCategory);
      if (response.isSuccess && response.data) {
        setCategories([...categories, response.data]);
        setNewCategory({
          name: '',
          description: '',
          imageUrl: '',
          isDeleted: false,
        });
        setIsAddModalOpen(false);
        toast.success('Category added successfully!');
      } else {
        toast.error(response.message || 'Failed to add category');
      }
    } else {
      toast.error('Please fill out all fields before adding a category.');
    }
  };

  const updateCategory = async () => {
    if (editingCategory) {
      const response = await CategoryApi.update(
        editingCategory.id,
        editingCategory,
      );
      if (response.isSuccess && response.data) {
        setCategories(
          categories.map(cat =>
            cat.id === editingCategory.id ? response.data! : cat,
          ),
        );
        setEditingCategory(undefined);
        toast.success('Category updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update category');
      }
    }
  };

  const deleteCategory = async (id: string) => {
    const response = await CategoryApi.deleteById(id);
    if (response.isSuccess) {
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success('Category deleted successfully!');
    } else {
      toast.error(response.message || 'Failed to delete category');
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={event =>
                    setNewCategory({ ...newCategory, name: event.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newCategory.description}
                  onChange={event =>
                    setNewCategory({
                      ...newCategory,
                      description: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={newCategory.imageUrl}
                  onChange={event =>
                    setNewCategory({
                      ...newCategory,
                      imageUrl: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addCategory}>Add Category</Button>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <CategoryManagementSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map(cat => (
              <TableRow key={cat.id}>
                <TableCell>
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingCategory(cat)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 focus:text-red-500"
                        onClick={() => deleteCategory(cat.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {editingCategory && (
        <Dialog
          open={!!editingCategory}
          onOpenChange={() => setEditingCategory(undefined)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={event =>
                    setEditingCategory({
                      ...editingCategory,
                      name: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingCategory.description}
                  onChange={event =>
                    setEditingCategory({
                      ...editingCategory,
                      description: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={editingCategory.imageUrl}
                  onChange={event =>
                    setEditingCategory({
                      ...editingCategory,
                      imageUrl: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={updateCategory}>Update Category</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
