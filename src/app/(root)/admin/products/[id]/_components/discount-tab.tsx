'use client';

import { gql, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Edit,
  Package,
  PackageOpen,
  PercentIcon,
  PlusCircle,
  ShoppingCart,
  TicketIcon,
  Trash2,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllDiscountByProductIdQuery } from '@/graphql/generated/graphql';
import { formatPrice } from '@/lib/utils';

// GraphQL mutations
const CREATE_DISCOUNT = gql`
  mutation CreateSystemConfigDiscount(
    $createDiscountInput: CreateSystemConfigDiscountDto!
  ) {
    createSystemConfigDiscount(createDiscountInput: $createDiscountInput) {
      id
      name
      discountPercent
      minQuantity
      isActive
    }
  }
`;

const UPDATE_DISCOUNT = gql`
  mutation UpdateSystemConfigDiscount(
    $id: String!
    $updateDiscountInput: UpdateSystemConfigDiscountDto!
  ) {
    updateSystemConfigDiscount(
      id: $id
      updateDiscountInput: $updateDiscountInput
    ) {
      id
      name
      discountPercent
      minQuantity
      isActive
    }
  }
`;

const REMOVE_DISCOUNT = gql`
  mutation RemoveSystemConfigDiscount($id: String!) {
    removeSystemConfigDiscount(id: $id)
  }
`;

// Form schema for creating/editing discounts
const discountFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  discountPercent: z.coerce
    .number()
    .min(1, {
      message: 'Discount percentage must be at least 1%',
    })
    .max(100, {
      message: 'Discount percentage cannot exceed 100%',
    }),
  minQuantity: z.coerce.number().min(1, {
    message: 'Minimum quantity must be at least 1',
  }),
});

type DiscountFormValues = z.infer<typeof discountFormSchema>;

export default function DiscountTab() {
  const { id: productId } = useParams<{ id: string }>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<any>(null);

  // GraphQL queries and mutations
  const { data, loading, refetch } = useGetAllDiscountByProductIdQuery({
    variables: {
      productId: productId,
    },
  });

  const [createDiscount, { loading: createLoading }] =
    useMutation(CREATE_DISCOUNT);
  const [updateDiscount, { loading: updateLoading }] =
    useMutation(UPDATE_DISCOUNT);
  const [removeDiscount, { loading: removeLoading }] =
    useMutation(REMOVE_DISCOUNT);

  // Form for adding new discounts
  const addForm = useForm<DiscountFormValues>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      name: '',
      discountPercent: 5,
      minQuantity: 1,
    },
  });

  // Form for editing existing discounts
  const editForm = useForm<DiscountFormValues>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      name: '',
      discountPercent: 5,
      minQuantity: 1,
    },
  });

  // Handle creating a new discount
  const onAddSubmit = async (values: DiscountFormValues) => {
    try {
      await createDiscount({
        variables: {
          createDiscountInput: {
            name: values.name,
            discountPercent: values.discountPercent,
            minQuantity: values.minQuantity,
            productId: productId,
          },
        },
      });
      toast.success('Discount added successfully');
      setIsAddDialogOpen(false);
      refetch();
      addForm.reset();
    } catch (error) {
      toast.error('Failed to add discount');
      console.error(error);
    }
  };

  // Handle updating an existing discount
  const onEditSubmit = async (values: DiscountFormValues) => {
    if (!currentDiscount) return;

    try {
      await updateDiscount({
        variables: {
          id: currentDiscount.id,
          updateDiscountInput: {
            name: values.name,
            discountPercent: values.discountPercent,
            minQuantity: values.minQuantity,
          },
        },
      });
      toast.success('Discount updated successfully');
      setIsEditDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error('Failed to update discount');
      console.error(error);
    }
  };

  // Handle deleting a discount
  const handleDelete = async (id: string) => {
    try {
      await removeDiscount({
        variables: {
          id,
        },
      });
      toast.success('Discount deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete discount');
      console.error(error);
    }
  };

  // Open edit dialog and populate form with discount data
  const handleEditClick = (discount: any) => {
    setCurrentDiscount(discount);
    editForm.reset({
      name: discount.name,
      discountPercent: discount.discountPercent,
      minQuantity: discount.minQuantity,
    });
    setIsEditDialogOpen(true);
  };

  // Determine if there are any discounts
  const hasDiscounts =
    data?.getAllDiscountByProductId &&
    data.getAllDiscountByProductId.length > 0;

  // Sort discounts by minimum quantity
  const sortedDiscounts = hasDiscounts
    ? [...data.getAllDiscountByProductId].sort(
        (a, b) => a.minQuantity - b.minQuantity,
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quantity-Based Discounts</h2>
          <p className="text-muted-foreground">
            Define discounts based on purchase quantity
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Discount</DialogTitle>
              <DialogDescription>
                Create a quantity-based discount for this product
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(onAddSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Bulk Discount" {...field} />
                      </FormControl>
                      <FormDescription>
                        A name to identify this discount
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="discountPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Percentage</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="5"
                              {...field}
                              min={1}
                              max={100}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <span className="text-muted-foreground">%</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Percentage off regular price
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="minQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            min={1}
                          />
                        </FormControl>
                        <FormDescription>
                          Applies when quantity ≥ this value
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createLoading}
                    className="w-full"
                  >
                    {createLoading ? 'Creating...' : 'Create Discount'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Discount Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Discount</DialogTitle>
              <DialogDescription>Modify the discount details</DialogDescription>
            </DialogHeader>
            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit(onEditSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Bulk Discount" {...field} />
                      </FormControl>
                      <FormDescription>
                        A name to identify this discount
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="discountPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Percentage</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="5"
                              {...field}
                              min={1}
                              max={100}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <span className="text-muted-foreground">%</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Percentage off regular price
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="minQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            min={1}
                          />
                        </FormControl>
                        <FormDescription>
                          Applies when quantity ≥ this value
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={updateLoading}
                    className="w-full"
                  >
                    {updateLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Discount List */}
      <div className="rounded-md border">
        <div className="relative">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="text-primary h-8 w-8 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-muted-foreground text-sm">
                  Loading discounts...
                </span>
              </div>
            </div>
          ) : hasDiscounts ? (
            <ScrollArea className="max-h-[300px]">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-muted sticky top-0 border-b">
                  <tr className="border-b transition-colors">
                    <th className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                      Name
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                      Discount
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                      Min. Quantity
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                      Status
                    </th>
                    <th className="h-10 px-4 text-right align-middle font-medium whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {sortedDiscounts.map(discount => (
                    <tr
                      key={discount.id}
                      className="hover:bg-muted/50 border-b transition-colors"
                    >
                      <td className="p-4 align-middle font-medium whitespace-nowrap">
                        {discount.name}
                      </td>
                      <td className="p-4 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1 font-medium"
                          >
                            {discount.discountPercent * 100}%
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4 align-middle whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 font-medium"
                        >
                          <PackageOpen className="h-3 w-3" />
                          {discount.minQuantity}+
                        </Badge>
                      </td>
                      <td className="p-4 align-middle whitespace-nowrap">
                        {discount.isActive ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 hover:bg-green-100"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="p-4 text-right align-middle whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(discount)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="text-destructive h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Discount
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the "
                                  {discount.name}" discount? This action cannot
                                  be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(discount.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center border-b py-12">
              <div className="flex max-w-sm flex-col items-center gap-2 text-center">
                <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
                  <TicketIcon className="text-muted-foreground h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">No Discounts</h3>
                <p className="text-muted-foreground text-sm">
                  You haven't added any quantity-based discounts for this
                  product yet. Create your first discount to encourage bulk
                  purchases.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
