'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { useLoginMutation } from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const { login } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: data => {
      console.log(data);
      toast.success('Logged in successfully');
      login({
        accessToken: data.login.accessToken,
        refreshToken: data.login.refreshToken,
        user: data.login.user,
      });
      const role = data.login.user.role;
      if (role == 'ADMIN') {
        router.push('/admin');
      } else if (role == 'MANAGER') {
        router.push('/manager');
      } else if (role == 'STAFF') {
        router.push('/staff');
      } else if (role == 'FACTORYOWNER') {
        router.push('/factory');
      } else {
        router.push('/');
      }
    },
    onError: error => {
      console.error(error);
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    loginMutation({
      variables: {
        loginInput: {
          email: values.email,
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your email"
                  type="email"
                  {...field}
                  disabled={loading}
                />
              </FormControl>

              {form.formState.errors.email ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Enter your email address to sign in.
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
                  placeholder="Password"
                  {...field}
                  type="password"
                  disabled={loading}
                />
              </FormControl>
              {form.formState.errors.email ? (
                <FormMessage />
              ) : (
                <FormDescription>Enter your password.</FormDescription>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
}
