'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useCreateSystemConfigBankMutation } from '@/graphql/generated/graphql';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  code: z.string().min(1, 'Code is required'),
  bin: z.string().min(1, 'BIN is required'),
  isActive: z.boolean().default(true),
  logo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddBankForm() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      shortName: '',
      code: '',
      bin: '',
      isActive: true,
      logo: '',
    },
  });

  const [createBank, { loading }] = useCreateSystemConfigBankMutation({
    refetchQueries: ['GetAllSystemConfigBanks'],
    onCompleted: () => {
      setIsOpen(false);
      form.reset();
      toast.success('Bank added successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to add bank');
    },
  });

  const onSubmit = (data: FormValues) => {
    createBank({
      variables: {
        input: {
          ...data,
          logo: '',
        },
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Bank
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Bank</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new bank to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter bank name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The name of the bank.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter short name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {form.formState.errors.shortName ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      The short name of the bank.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter bank code"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {form.formState.errors.code ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The code of the bank.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BIN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter bank BIN"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {form.formState.errors.bin ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The BIN of the bank.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter bank logo"
                      {...field}
                      type="file"
                      accept="image/*"
                      disabled={loading}
                    />
                  </FormControl>
                  {form.formState.errors.bin ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The logo of the bank.</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="mt-2 flex flex-row items-center rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Saving...' : 'Save Bank'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
