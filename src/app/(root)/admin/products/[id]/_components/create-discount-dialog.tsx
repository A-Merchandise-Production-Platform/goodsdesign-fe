'use client';

import { gql, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

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
import { useCreateSystemConfigDiscountMutation } from '@/graphql/generated/graphql';
import { useState } from 'react';

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

interface CreateDiscountDialogProps {
  productId: string;
}

export function CreateDiscountDialog({ productId }: CreateDiscountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [createDiscount, { loading: createLoading }] =
    useCreateSystemConfigDiscountMutation({
      onCompleted: () => {
        toast.success('Discount added successfully');
        form.reset();
        setIsOpen(false);
      },
      onError: error => {
        toast.error(error.message || 'Failed to add discount');
      },
      refetchQueries: ['GetAllDiscountByProductId'],
    });

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      name: '',
      discountPercent: 5,
      minQuantity: 1,
    },
  });

  const onSubmit = async (values: DiscountFormValues) => {
    await createDiscount({
      variables: {
        createDiscountInput: {
          name: values.name,
          discountPercent: values.discountPercent / 100,
          minQuantity: values.minQuantity,
          productId: productId,
        },
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
                control={form.control}
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
                control={form.control}
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
              <Button type="submit" disabled={createLoading} className="w-full">
                {createLoading ? 'Creating...' : 'Create Discount'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
