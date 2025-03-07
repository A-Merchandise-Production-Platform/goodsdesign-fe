'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { AuthApi } from '@/api/auth';
import { RegisterResponse } from '@/api/types/auth';
import { Button } from '@/components/ui/button';
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
import { PasswordInput } from '@/components/ui/password-input';
import { useAuthStore } from '@/stores/auth.store';

const formSchema = z
  .object({
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ message: 'Password is required' }).min(6, {
      message: 'Password must be at least 6 characters',
    }),
    name: z.string({ message: 'name is required' }).min(3, {
      message: 'name must be at least 3 characters',
    }),
    confirmPassword: z
      .string({ message: 'Confirm password is required' })
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Confirm passwords do not match',
  });

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: AuthApi.register,
    onError: (error: AxiosError<null>) => {
      if (error.status === 400) {
        toast.error('Invalid input data');
      } else if (error.status === 409) {
        toast.error('Email already exists');
      } else {
        toast.error('Something went wrong');
      }
    },
    onSuccess: data => {
      toast.success('Account created successfully');
      login(data);
      router.push('/');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 pt-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex-1">Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>

              {form.formState.errors.email ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  This will be your email to access the system
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex-1">Name</FormLabel>
              <FormControl>
                <Input placeholder=" Nguyen Van A" {...field} />
              </FormControl>

              {form.formState.errors.email ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  This will be your user name in the system
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>

                {form.formState.errors.email ? (
                  <FormMessage className="line-clamp-1" />
                ) : (
                  <FormDescription>
                    Password must be at least 8 characters long.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput placeholder="Confirm Password" {...field} />
                </FormControl>
                {form.formState.errors.email ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Confirm your password to make sure it matches
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={mutation.isPending}>
          Register
        </Button>
      </form>
    </Form>
  );
}
