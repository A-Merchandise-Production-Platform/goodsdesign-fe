import { useFormContext } from 'react-hook-form';

import CategorySelect from '@/app/(auth)/register/factory-owner/_components/category-select';
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
              <FormDescription>This is name or your factory.</FormDescription>
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
                This is address or your factory.
              </FormDescription>
            )}
          </FormItem>
        )}
      />
      <CategorySelect />
    </div>
  );
}
