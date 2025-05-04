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
import { NumberInput } from '@/components/ui/number-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateVoucherMutation,
  VoucherType,
} from '@/graphql/generated/graphql';
import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Create simplified form schema with validation
const formSchema = z
  .object({
    type: z.enum([VoucherType.FixedValue, VoucherType.Percentage], {
      required_error: 'Please select a voucher type',
    }),
    value: z
      .number({
        required_error: 'Value is required',
        invalid_type_error: 'Value must be a number',
      })
      .refine(val => val !== undefined, { message: 'Value is required' }),
    minOrderValue: z
      .number({
        invalid_type_error: 'Min order value must be a number',
      })
      .refine(val => val === null || val >= 1000, {
        message: 'Min order value must be over 1000',
      }),
    description: z.string().optional(),
    limitedUsage: z
      .number({
        invalid_type_error: 'Limited usage must be a number',
      })
      .nullable()
      .refine(val => val === null || val >= 1, {
        message: 'Limited usage must be at least 1',
      })
      .optional(),
  })
  .refine(
    (data: { type: VoucherType; value: number | null }) => {
      if (data.type === VoucherType.Percentage) {
        return data.value !== null && data.value >= 0 && data.value <= 100;
      }
      return true;
    },
    {
      message: 'Percentage value must be between 0 and 100',
      path: ['value'],
    },
  )
  .refine(
    (data: { type: VoucherType; value: number | null }) => {
      if (data.type === VoucherType.FixedValue) {
        return data.value !== null && data.value >= 1000;
      }
      return true;
    },
    {
      message: 'Fixed value must be at least 1000',
      path: ['value'],
    },
  );

type FormValues = z.infer<typeof formSchema>;

export default function AddVoucherForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [voucherType, setVoucherType] = useState<VoucherType>(
    VoucherType.FixedValue,
  );
  const [createVoucher, { loading }] = useCreateVoucherMutation({
    onCompleted: () => {
      toast.success('Voucher created successfully');
      setIsOpen(false);
      form.reset();
    },
    onError: (error: ApolloError) => {
      toast.error(error.message);
    },
    refetchQueries: ['AllVouchersOfSystem'],
  });

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: VoucherType.FixedValue,
      value: 1000,
      minOrderValue: 1000,
      description: '',
      limitedUsage: 1,
    },
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const completeValues = {
      ...values,
      isPublic: true,
      userId: null,
    };

    console.log('Form submitted:', completeValues);
    createVoucher({ variables: { input: completeValues } });
  };

  console.log(form.watch('value'));

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        form.reset();
        setVoucherType(VoucherType.FixedValue);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Voucher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Voucher</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new public voucher.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pt-4"
          >
            {/* Voucher Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voucher Type</FormLabel>
                  <Select
                    onValueChange={(value: VoucherType) => {
                      setVoucherType(value);
                      form.setValue('type', value);
                      form.setValue(
                        'value',
                        value === VoucherType.Percentage ? 0 : 1000,
                      );
                    }}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select voucher type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={VoucherType.FixedValue}>
                        Fixed Value
                      </SelectItem>
                      <SelectItem value={VoucherType.Percentage}>
                        Percentage
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Value */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={
                        voucherType === VoucherType.Percentage
                          ? '0-100'
                          : 'Min 1000'
                      }
                      {...field}
                      onChange={e => {
                        field.onChange(Number(e.target.value));
                      }}
                      value={field.value == null ? undefined : field.value}
                      min={voucherType === VoucherType.Percentage ? 0 : 1000}
                      max={
                        voucherType === VoucherType.Percentage ? 100 : undefined
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    {voucherType === VoucherType.Percentage
                      ? 'Percentage discount (0-100%)'
                      : 'Fixed amount discount (min 1000)'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Min Order Value */}
            <FormField
              control={form.control}
              name="minOrderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Min 1000"
                      {...field}
                      onChange={e => {
                        field.onChange(Number(e.target.value));
                      }}
                      value={field.value}
                      min={1000}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum order value required to use this voucher (must be
                    over 1000)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Enter voucher description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Limited Usage */}
            <FormField
              control={form.control}
              name="limitedUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Min 1"
                      {...field}
                      onChange={e => {
                        field.onChange(Number(e.target.value));
                      }}
                      value={field.value ?? undefined}
                      min={1}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum number of times this voucher can be used (must be at
                    least 1)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Voucher'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
