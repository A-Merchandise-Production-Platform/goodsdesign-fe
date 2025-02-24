'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircleIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ApiResponse } from '@/api/types';
import { User } from '@/api/types/user';
import { UserApi } from '@/api/user';
import { useUsersQuery } from '@/app/(root)/admin/users/_hooks/use-users-query';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROLES } from '@/constant/role';
import { cn } from '@/lib/utils';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  userName: z.string().min(3),
  phoneNumber: z.string().min(10),
  dateOfBirth: z.date(),
  role: z.string().min(3, 'Please select a role'),
});

interface CreateUserDialogProps {
  refetch: () => void;
}

export default function CreateUserDialog({ refetch }: CreateUserDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      userName: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
      role: '',
    },
  });

  const onSubmit = (payload: z.infer<typeof createUserSchema>) => {
    mutation.mutateAsync(payload);
  };

  const mutation = useMutation({
    mutationFn: UserApi.create,
    onSuccess: () => {
      toast.success('User created successfully');
      setIsDialogOpen(false);
      refetch();
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data.message || 'Failed to create user');
    },
  });

  const [date, setDate] = React.useState<Date>();

  return (
    <div>
      <Dialog open={isDialogOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant={'outline'}
            className="border-dashed"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusCircleIcon className="mr-2" />
            Create User
          </Button>
        </DialogTrigger>
        <DialogContent hideCloseButton>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Create a new user by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="youremail@example.com"
                        type="email"
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    {form.formState.errors.email ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>This is the user email</FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="userName"
                        type="text"
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    {form.formState.errors.userName ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>This is the user name</FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Placeholder"
                        {...field}
                        defaultCountry="VN"
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    {form.formState.errors.phoneNumber ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Enter your phone number.
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
                      <PasswordInput
                        placeholder="Password"
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    {form.formState.errors.password ? (
                      <FormMessage />
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                            disabled={mutation.isPending}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                          fromYear={1960}
                          toYear={2030}
                          captionLayout="dropdown-buttons"
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.dateOfBirth ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Enter user date of birth.
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={mutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role for user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLES.filter(role => role.value !== 'admin').map(
                          role => (
                            <SelectItem
                              key={role.value}
                              value={role.value.toUpperCase()}
                            >
                              {role.label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.role ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Select a role for the user.
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  className="w-1/2"
                  onClick={() => {
                    setIsDialogOpen(false);
                    form.reset();
                  }}
                  variant={'secondary'}
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-1/2"
                  disabled={mutation.isPending}
                  isLoading={mutation.isPending}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
