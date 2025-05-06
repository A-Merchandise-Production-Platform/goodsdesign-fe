import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import {
  useUpdateSystemConfigVariantMutation,
  GetProductByIdQuery,
} from '@/graphql/generated/graphql';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.number().min(1000, 'Price must be greater than 1000'),
});

type FormValues = z.infer<typeof formSchema>;

interface EditVariantBtnProps {
  variant: NonNullable<GetProductByIdQuery['product']['variants']>[0];
  uniqueColors: string[];
}

export function EditVariantBtn({ variant, uniqueColors }: EditVariantBtnProps) {
  const [open, setOpen] = useState(false);

  const [
    updateSystemConfigVariant,
    { loading: updateSystemConfigVariantLoading },
  ] = useUpdateSystemConfigVariantMutation({
    onCompleted: () => {
      toast.success('Variant updated successfully');
      setOpen(false);
    },
    onError: error => {
      toast.error(error.message);
    },
    refetchQueries: ['GetProductById'],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: variant.size || '',
      color: variant.color || '',
      price: variant.price || 1000,
    },
  });

  const onSubmit = (values: FormValues) => {
    updateSystemConfigVariant({
      variables: {
        updateSystemConfigVariantInput: {
          id: variant.id,
          size: values.size,
          color: values.color,
          price: values.price,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        onClick={e => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="hover:text-primary text-muted-foreground"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit System Config Variant</DialogTitle>
          <DialogDescription>Update the variant information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueColors.map(color => (
                          <SelectItem key={color} value={color || ''}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.color ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      Select a color from existing variants
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter size" />
                  </FormControl>
                  {form.formState.errors.size ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is the size of the product variant.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter price"
                      type="number"
                      min={1000}
                      onChange={e => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  {form.formState.errors.price ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is the price of the product variant.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateSystemConfigVariantLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
