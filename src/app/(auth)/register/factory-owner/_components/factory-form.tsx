import { useFormContext } from 'react-hook-form';

import ProductSelect from '@/app/(auth)/register/factory-owner/_components/product-select';
import { RegisterFOType } from '@/app/(auth)/register/factory-owner/_components/register-factory-owner-schema';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function FactoryForm() {
  const { control, formState } = useFormContext<RegisterFOType>();
  return (
    <div className="space-y-6 rounded-lg border p-4">
      <FormField
        control={control}
        name="factoryName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Factory Name</FormLabel>
            <FormControl>
              <Input placeholder="Example Factory" {...field} />
            </FormControl>

            {formState.errors.factoryName ? (
              <FormMessage />
            ) : (
              <FormDescription>
                This is the name of your factory.
              </FormDescription>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="factoryAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Factory address</FormLabel>
            <FormControl>
              <Input placeholder="Example address" {...field} />
            </FormControl>

            {formState.errors.factoryAddress ? (
              <FormMessage />
            ) : (
              <FormDescription>
                This is the address of your factory.
              </FormDescription>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="selectedProducts"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Products</FormLabel>
            <FormControl>
              <ProductSelect onSelect={field.onChange} value={field.value} />
            </FormControl>

            {formState.errors.selectedProducts ? (
              <FormMessage />
            ) : (
              <FormDescription>
                These are the products that your factory will produce.
              </FormDescription>
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
