'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { useCreateCategoryMutation } from '@/graphql/generated/graphql';
import { useState } from 'react';
import { toast } from 'sonner';
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

export default function AddCategoryForm() {
  const [createCategory, { loading }] = useCreateCategoryMutation();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createCategory({
        variables: {
          createCategoryInput: {
            name: values.name,
            description: values.description,
          },
        },
      });

      form.reset();
      toast.success('Category created successfully.');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }

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
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is the name of the category.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Category description"
                      {...field}
                      disabled={loading}
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  {form.formState.errors.description ? (
                    <FormMessage>
                      {form.formState.errors.description.message}
                    </FormMessage>
                  ) : (
                    <FormDescription>
                      This is the description of the category.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
