'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useGetAllSystemConfigBanksQuery,
  useUpdateUserBankMutation,
} from '@/graphql/generated/graphql';
import Image from 'next/image';

const formSchema = z.object({
  bankId: z.string().min(1, 'Bank is required'),
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(6, 'Valid account number is required'),
  isDefault: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface EditBankButtonProps {
  bankId: string;
  initialData: {
    bankId: string;
    accountName: string;
    accountNumber: string;
    isDefault: boolean;
  };
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  open?: boolean;
}

export default function EditBankButton({
  bankId,
  initialData,
  onOpenChange,
  open,
}: EditBankButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateBank, { loading: submitting }] = useUpdateUserBankMutation({
    refetchQueries: ['GetMyUserBanks'],
    onCompleted: () => {
      toast.success('Bank account updated successfully');
      setIsOpen(false);
      if (onOpenChange) onOpenChange(false);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { data: banks, loading: loadingBanks } =
    useGetAllSystemConfigBanksQuery();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankId: initialData.bankId,
      accountName: initialData.accountName,
      accountNumber: initialData.accountNumber,
      isDefault: initialData.isDefault,
    },
  });

  // If initialData changes (when editing different banks), update form values
  useEffect(() => {
    form.reset({
      bankId: initialData.bankId,
      accountName: initialData.accountName,
      accountNumber: initialData.accountNumber,
      isDefault: initialData.isDefault,
    });
  }, [form, initialData]);

  // Update dialog open state when open prop changes
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  function onSubmit(values: FormValues) {
    updateBank({
      variables: {
        updateUserBankId: bankId,
        updateUserBankInput: {
          bankId: values.bankId,
          accountName: values.accountName,
          accountNumber: values.accountNumber,
          isDefault: values.isDefault,
        },
      },
    });
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) onOpenChange(open);
  };

  const activeBanks =
    banks?.systemConfigBanks?.filter(bank => bank.isActive) || [];

  return (
    <Dialog
      open={open !== undefined ? open : isOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bank Account</DialogTitle>
          <DialogDescription>
            Update your bank account details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="bankId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={submitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeBanks.map(bank => (
                        <SelectItem key={bank.id} value={bank.id}>
                          <div className="flex items-center gap-2">
                            {bank.logo && (
                              <Image
                                src={bank.logo}
                                alt={bank.name}
                                width={20}
                                height={20}
                                className="rounded-full"
                              />
                            )}
                            {bank.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your bank from the list.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter account name"
                      {...field}
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormDescription>
                    The name associated with your bank account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter account number"
                      {...field}
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormDescription>Your bank account number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={submitting || initialData.isDefault}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Set as default payment method</FormLabel>
                    <FormDescription>
                      {initialData.isDefault
                        ? 'This is already your default bank account.'
                        : 'Use this account as your primary payment method.'}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Bank Account'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
