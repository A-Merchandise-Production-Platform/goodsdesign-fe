import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { PlusCircle } from 'lucide-react';
import {
  useCreateSystemConfigVariantMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
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
  productId: z.string().min(1, 'Product ID is required'),
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.number().min(1000, 'Price must be greater than 1000'),
});

type FormValues = z.infer<typeof formSchema>;

export function AddVariantBtn() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const productId = params.id as string;

  const { data: currentProduct, loading: currentProductLoading } =
    useGetProductByIdQuery({
      variables: { productId },
      skip: !productId,
    });

  const { data: products, loading: productsLoading } = useGetAllProductsQuery();

  // Get unique colors from variants
  const uniqueColors = Array.from(
    new Set(
      currentProduct?.product.variants
        ?.filter(variant => variant.color && !variant.isDeleted)
        .map(variant => variant.color) || [],
    ),
  );

  const [
    createSystemConfigVariant,
    { loading: createSystemConfigVariantLoading },
  ] = useCreateSystemConfigVariantMutation({
    onCompleted: () => {
      toast.success('Variant created successfully');
    },
    onError: error => {
      toast.error(error.message);
    },
    refetchQueries: ['GetProductById'],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: productId,
      size: '',
      color: uniqueColors[0] || '',
      price: 1000,
    },
  });

  const onSubmit = (values: FormValues) => {
    createSystemConfigVariant({
      variables: {
        createSystemConfigVariantInput: {
          productId: values.productId,
          size: values.size,
          color: values.color,
          price: values.price,
        },
      },
    });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle className="h-4 w-4" />
          Add Config Variant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add System Config Variant</DialogTitle>
          <DialogDescription>
            Add a new system config variant to the product
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={true}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {products?.products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.productId ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This variant will be added to the current product.
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
                      This is the size of the product you want to add a variant
                      to.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

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
                      This is the price of the product you want to add a variant
                      to.
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
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
