'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import {
  useCreateUserBankMutation,
  useGetAllSystemConfigBanksQuery,
  useGetMyUserBanksQuery,
} from '@/graphql/generated/graphql';
import Image from 'next/image';

const formSchema = z.object({
  bankId: z.string().min(1, 'Bank is required'),
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(6, 'Valid account number is required'),
  isDefault: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddBankButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [createBank, { loading: submitting }] = useCreateUserBankMutation({
    refetchQueries: ['GetMyUserBanks'],
    onCompleted: () => {
      toast.success('Bank account added successfully');
      setIsOpen(false);
      form.reset();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { data: banks, loading: loadingBanks } =
    useGetAllSystemConfigBanksQuery();

  const { data: userBanks } = useGetMyUserBanksQuery();
  const hasExistingBanks =
    userBanks?.userBanks && userBanks.userBanks.length > 0;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankId: '',
      accountName: '',
      accountNumber: '',
      isDefault: !hasExistingBanks, // Default to true if no existing banks
    },
  });

  function onSubmit(values: FormValues) {
    createBank({
      variables: {
        createUserBankInput: {
          bankId: values.bankId,
          accountName: values.accountName,
          accountNumber: values.accountNumber,
          isDefault: values.isDefault,
        },
      },
    });
  }

  const activeBanks =
    banks?.systemConfigBanks?.filter(bank => bank.isActive) || [];

  if (loadingBanks) return <Skeleton className="h-10 w-24" />;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Bank Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Bank Account</DialogTitle>
          <DialogDescription>
            Enter your bank account details to receive payments.
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
                      <SelectTrigger className="w-full truncate">
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeBanks.map(bank => (
                        <SelectItem key={bank.id} value={bank.id}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={bank.logo}
                              alt={bank.name}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            {bank.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.bankId ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      Select your bank from the list.
                    </FormDescription>
                  )}
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

                  {form.formState.errors.accountName ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      The name associated with your bank account.
                    </FormDescription>
                  )}
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
                  {form.formState.errors.accountNumber ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Your bank account number.</FormDescription>
                  )}
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
                      disabled={submitting || !hasExistingBanks}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Set as default payment method</FormLabel>
                    <FormDescription>
                      {!hasExistingBanks
                        ? 'This will be your default bank account.'
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
                onClick={() => setIsOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Bank Account'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
