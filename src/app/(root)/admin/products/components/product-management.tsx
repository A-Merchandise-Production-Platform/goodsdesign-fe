'use client';

import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { CategoryApi } from '@/api/category';
import { ProductApi } from '@/api/product';
import { CreateProductPayload } from '@/api/types/product';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

import ProductManagementSkeleton from './product-management-skeleton';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<CreateProductPayload>({
    name: '',
    description: '',
    categoryId: '',
    imageUrl: '',
    model3DUrl: '',
  });
  const [editingProduct, setEditingProduct] = useState<Product>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [currentModel3DUrl, setCurrentModel3DUrl] = useState<string>();

  const fetchProducts = async () => {
    setLoading(true);
    const options = {
      filter: { isDeleted: false },
      select: [
        'id',
        'name',
        'description',
        'categoryId',
        'imageUrl',
        'model3DUrl',
        'isDeleted',
      ],
      expand: ['category'],
    };
    const response = await ProductApi.getAll(options);
    if (response.isSuccess) {
      setProducts(response.data);
    } else {
      toast.error(response.message || 'Failed to fetch products');
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const options = {
      filter: { isDeleted: false },
      select: ['id', 'name'],
    };
    const response = await CategoryApi.getAll(options);
    if (response.isSuccess) {
      setCategories(response.data);
    } else {
      toast.error(response.message || 'Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const addProduct = async () => {
    if (newProduct.name && newProduct.description && newProduct.categoryId) {
      const response = await ProductApi.create(newProduct);
      if (response.isSuccess && response.data) {
        setProducts([...products, response.data]);
        setNewProduct({
          name: '',
          description: '',
          categoryId: '',
          imageUrl: '',
          model3DUrl: '',
        });
        setIsAddModalOpen(false);
        toast.success('Product added successfully!');
      } else {
        toast.error(response.message || 'Failed to add product');
      }
    } else {
      toast.error(
        'Please fill out all required fields before adding a product.',
      );
    }
  };

  const updateProduct = async () => {
    if (editingProduct) {
      const response = await ProductApi.update(
        editingProduct.id,
        editingProduct,
      );
      if (response.isSuccess && response.data) {
        setProducts(
          products.map(production =>
            production.id === editingProduct.id ? response.data! : production,
          ),
        );
        setEditingProduct(undefined);
        toast.success('Product updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update product');
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const response = await ProductApi.deleteById(id);
    if (response.isSuccess) {
      setProducts(products.filter(production => production.id !== id));
      toast.success('Product deleted successfully!');
    } else {
      toast.error(response.message || 'Failed to delete product');
    }
  };

  const open3DModel = (modelUrl: string | null) => {
    if (modelUrl) {
      setCurrentModel3DUrl(modelUrl);
      setIs3DModalOpen(true);
    } else {
      toast.error('3D Model URL not available.');
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={event =>
                    setNewProduct({ ...newProduct, name: event.target.value })
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
                  value={newProduct.description}
                  onChange={event =>
                    setNewProduct({
                      ...newProduct,
                      description: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newProduct.categoryId}
                  onValueChange={value =>
                    setNewProduct({ ...newProduct, categoryId: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={event =>
                    setNewProduct({
                      ...newProduct,
                      imageUrl: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model3DUrl" className="text-right">
                  3D Model URL
                </Label>
                <Input
                  id="model3DUrl"
                  value={newProduct.model3DUrl}
                  onChange={event =>
                    setNewProduct({
                      ...newProduct,
                      model3DUrl: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addProduct}>Add Product</Button>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <ProductManagementSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => open3DModel(product.model3DUrl)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View 3D
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEditingProduct(product)}
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteProduct(product.id)}
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

      {editingProduct && (
        <Dialog
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(undefined)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={event =>
                    setEditingProduct({
                      ...editingProduct,
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
                  value={editingProduct.description}
                  onChange={event =>
                    setEditingProduct({
                      ...editingProduct,
                      description: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Select
                  value={editingProduct.categoryId}
                  onValueChange={value =>
                    setEditingProduct({ ...editingProduct, categoryId: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={editingProduct.imageUrl}
                  onChange={event =>
                    setEditingProduct({
                      ...editingProduct,
                      imageUrl: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-model3DUrl" className="text-right">
                  3D Model URL
                </Label>
                <Input
                  id="edit-model3DUrl"
                  value={editingProduct.model3DUrl}
                  onChange={event =>
                    setEditingProduct({
                      ...editingProduct,
                      model3DUrl: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={updateProduct}>Update Product</Button>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={is3DModalOpen} onOpenChange={() => setIs3DModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>3D Model Viewer</DialogTitle>
          </DialogHeader>
          {currentModel3DUrl ? (
            <iframe
              src={currentModel3DUrl}
              title="3D Model Viewer"
              width="100%"
              height="500px"
              className="rounded-lg border"
            />
          ) : (
            <p>No 3D model available</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
