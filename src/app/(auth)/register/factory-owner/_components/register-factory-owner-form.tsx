'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AuthApi } from '@/api/auth';
import { RegisterFOPayload, RegisterFOResponse } from '@/api/types/auth';
import AccountForm from '@/app/(auth)/register/factory-owner/_components/account-form';
import FactoryForm from '@/app/(auth)/register/factory-owner/_components/factory-form';
import RegisterFOSchema, {
  initialRegisterFOValues,
  RegisterFOType,
} from '@/app/(auth)/register/factory-owner/_components/register-factory-owner-schema';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function RegisterFactoryOwnerForm() {
  const router = useRouter();
  const form = useForm<RegisterFOType>({
    resolver: zodResolver(RegisterFOSchema),
    defaultValues: initialRegisterFOValues,
  });

  const mustation = useMutation({
    mutationFn: AuthApi.registerFactoryOwner,
    onSuccess: () => {
      toast.success('Registration successful, Login to continue');
      router.push('/login');
    },
    onError: (error: AxiosError<RegisterFOResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });

  const onSubmit = (payload: RegisterFOType) => {
    console.log(payload);
    const sendPayload: RegisterFOPayload = {
      ...payload,
      factoryContactPerson: payload.userName,
      factoryContactPhone: payload.phoneNumber,
      contractName: '',
      contractPaperUrl: '',
    };
    mustation.mutate(sendPayload);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <AccountForm />
          <FactoryForm />
          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  {form.formState.errors.agree ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      You agree to our Terms of
                      <Link
                        href={'/terms-and-conditions'}
                        className="ml-1 text-blue-500"
                      >
                        Service and Privacy Policy
                      </Link>
                      .
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="col-span-2"
            isLoading={mustation.isPending}
          >
            Register
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
