'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1),
  discountPercent: z
    .number()
    .min(1, { message: 'Discount percent must be greater than 0' })
    .max(100, { message: 'Discount percent must be less than 100' }),
  minQuantity: z
    .number()
    .min(1, { message: 'Minimum quantity must be greater than 0' }),
});

const formatFromPercentToDecimal = (value: number) => {
  return value / 100;
};

export default function AddProductDiscountCard() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      discountPercent: 0,
      minQuantity: 0,
    },
  });

  const [createSystemConfigDiscount, { loading }] =
    useCreateSystemConfigDiscountMutation({
      onCompleted: () => {
        setIsOpen(false);
        form.reset();
        toast.success('Discount created successfully');
      },
      onError: error => {
        toast.error(error.message);
      },
      refetchQueries: ['GetAllDiscountByProductId'],
    });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    createSystemConfigDiscount({
      variables: {
        createDiscountInput: {
          ...data,
          productId: id as string,
          discountPercent: formatFromPercentToDecimal(data.discountPercent),
        },
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground h-60 w-full rounded-xl shadow-md"
        >
          <PlusIcon /> Add Discount
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Discount</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a discount to the product
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pt-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Discount Name" {...field} />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The name of the discount</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percent</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Discount Percent"
                      type="number"
                      min={0}
                      max={100}
                      onChange={e => {
                        const value =
                          e.target.value === ''
                            ? ''
                            : Number.parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                      value={field.value === 0 ? '' : field.value}
                    />
                  </FormControl>
                  {form.formState.errors.discountPercent ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The discount percent</FormDescription>
                  )}
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
                      placeholder="Minimum Quantity"
                      type="number"
                      min={0}
                      onChange={e => {
                        const value =
                          e.target.value === ''
                            ? ''
                            : Number.parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                      value={field.value === 0 ? '' : field.value}
                    />
                  </FormControl>
                  {form.formState.errors.minQuantity ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The minimum quantity</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Discount
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
