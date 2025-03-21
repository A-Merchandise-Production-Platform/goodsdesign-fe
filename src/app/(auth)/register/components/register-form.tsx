'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { useAuthStore } from '@/stores/auth.store';
import { useRegisterMutation } from '@/graphql/generated/graphql';
import { toast } from 'sonner';

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
    path: ['confirmPassword'],
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

  const [registerMutation, { loading }] = useRegisterMutation({
    onCompleted: data => {
      console.log(data);
      toast.success('Account created successfully');
      login({
        accessToken: data.register.accessToken,
        refreshToken: data.register.refreshToken,
        user: data.register.user,
      });
      router.push('/');
    },
    onError: error => {
      console.log(error);
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerMutation({
      variables: {
        registerInput: {
          email: values.email,
          name: values.name,
          password: values.password,
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex-1">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@gmail.com"
                  {...field}
                  disabled={loading}
                />
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
                <Input
                  placeholder=" Nguyen Van A"
                  {...field}
                  disabled={loading}
                />
              </FormControl>

              {form.formState.errors.name ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  This will be your user name in the system
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  disabled={loading}
                />
              </FormControl>

              {form.formState.errors.password ? (
                <FormMessage className="line-clamp-1" />
              ) : (
                <FormDescription>
                  Password must be at least 6 characters long.
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {form.formState.errors.confirmPassword ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Confirm your password to make sure it matches
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
}
