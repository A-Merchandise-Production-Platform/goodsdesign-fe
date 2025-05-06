'use client';

import { gql, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
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
import { useUpdateSystemConfigDiscountMutation } from '@/graphql/generated/graphql';
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

interface UpdateDiscountDialogProps {
  discount: {
    id: string;
    name: string;
    discountPercent: number;
    minQuantity: number;
  };
}

export function UpdateDiscountDialog({ discount }: UpdateDiscountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateDiscount, { loading: updateLoading }] =
    useUpdateSystemConfigDiscountMutation({
      onCompleted: () => {
        setIsOpen(false);
        toast.success('Discount updated successfully');
      },
      onError: error => {
        toast.error(error.message);
        console.error(error);
      },
      refetchQueries: ['GetAllDiscountByProductId'],
    });

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      name: discount.name,
      discountPercent: discount.discountPercent * 100,
      minQuantity: discount.minQuantity,
    },
  });

  const onSubmit = async (values: DiscountFormValues) => {
    await updateDiscount({
      variables: {
        updateSystemConfigDiscountId: discount.id,
        updateDiscountInput: {
          name: values.name,
          discountPercent: values.discountPercent / 100,
          minQuantity: values.minQuantity,
        },
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Discount</DialogTitle>
          <DialogDescription>Modify the discount details</DialogDescription>
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
              <Button type="submit" disabled={updateLoading} className="w-full">
                {updateLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
