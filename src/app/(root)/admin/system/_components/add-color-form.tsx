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
import { useCreateSystemConfigColorMutation } from '@/graphql/generated/graphql';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z
    .string()
    .min(1, 'Color code is required')
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'Invalid color format. Use hex format (#RRGGBB)',
    ),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddColorForm() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '#',
      isActive: true,
    },
  });

  const [createColor, { loading }] = useCreateSystemConfigColorMutation({
    refetchQueries: ['GetAllSystemConfigColors'],
    onCompleted: () => {
      setIsOpen(false);
      form.reset();
      toast.success('Color added successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to add color');
    },
  });

  const onSubmit = (data: FormValues) => {
    createColor({
      variables: {
        input: data,
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
          Add Color
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Color</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new color to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter color name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>The name of the color.</FormDescription>
                  )}
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
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="#RRGGBB"
                        {...field}
                        disabled={loading}
                      />
                      {field.value &&
                        field.value.match(
                          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                        ) && (
                          <div
                            className="h-8 w-8 rounded-full border"
                            style={{ backgroundColor: field.value }}
                          />
                        )}
                    </div>
                  </FormControl>
                  {form.formState.errors.code ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      The hex color code (e.g. #FF0000 for red).
                    </FormDescription>
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
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="ml-2">Active</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Saving...' : 'Save Color'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
