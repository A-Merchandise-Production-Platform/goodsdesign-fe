'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { authApi } from '@/api/auth'
import { useMutation } from '@tanstack/react-query'
import { RegisterResponse } from '@/api/types/auth'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

const formSchema = z
  .object({
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ message: 'Password is required' }).min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z
      .string({ message: 'Confirm password is required' })
      .min(8, { message: 'Confirm password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm passwords do not match',
  })

export default function RegisterForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const mutation = useMutation({
    mutationFn: authApi.register,
    onError: (error: AxiosError<RegisterResponse>) => {
      toast.error(error.response?.data.message)
    },
    onSuccess: () => {
      toast.success('Account created successfully')
      router.push('/login')
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
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

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Form>
  )
}
