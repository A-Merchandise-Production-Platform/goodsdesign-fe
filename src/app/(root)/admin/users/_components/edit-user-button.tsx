'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { format } from 'date-fns';
import { CalendarIcon, Edit2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import type { ApiResponse } from '@/api/types';
import type { UpdateUserDto, User } from '@/api/types/user';
import { UserApi } from '@/api/user';
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

const editUserSchema = z.object({
  email: z.string().email(),
  userName: z.string().min(3).optional(),
  phoneNumber: z.string().min(10).optional(),
  dateOfBirth: z.date().optional(),
  role: z.string().min(3, 'Please select a role').optional(),
});

interface EditUserButtonProps {
  user: User;
  refetch: () => void;
}

export function EditUserButton({ user, refetch }: EditUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber!,
      dateOfBirth: new Date(user.dateOfBirth!),
      role: user.role?.name.toUpperCase()!,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change') {
        const changedFields = Object.keys(value).filter(
          key =>
            value[key as keyof typeof value] !==
            form.formState.defaultValues![key as keyof typeof value],
        );
        setIsDirty(changedFields.length > 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (formData: z.infer<typeof editUserSchema>) => {
    const changedFields = Object.keys(formData).reduce(
      (accumulator, key) => {
        if (
          formData[key as keyof typeof formData] !==
          form.formState.defaultValues![key as keyof typeof formData]
        ) {
          accumulator[key as keyof typeof formData] = formData[
            key as keyof typeof formData
          ] as any;
        }
        return accumulator;
      },
      {} as Partial<z.infer<typeof editUserSchema>>,
    );

    if (Object.keys(changedFields).length > 0) {
      console.log(changedFields);
      mutation.mutate({ id: user.id, payload: changedFields as UpdateUserDto });
    } else {
      console.log('No changes detected');
    }
  };

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserDto }) =>
      UserApi.updateUser(id, payload),
    onSuccess: () => {
      toast.success('User updated successfully');
      setIsOpen(false);
      refetch();
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data.message || 'Failed to update user');
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200"
        >
          <Edit2Icon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information by modifying the form below.
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
                      disabled
                    />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>User email address</FormDescription>
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
                    <FormDescription>User username</FormDescription>
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
                      placeholder="Phone number"
                      {...field}
                      defaultCountry="VN"
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  {form.formState.errors.phoneNumber ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>User phone number</FormDescription>
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
                    <FormDescription>User date of birth</FormDescription>
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
                            className={cn(
                              'cursor-pointer',
                              field.value === role.value.toUpperCase() &&
                                'bg-muted',
                            )}
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
                    <FormDescription>User role</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                className="w-1/2"
                onClick={() => setIsOpen(false)}
                variant={'secondary'}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-1/2"
                disabled={!isDirty || mutation.isPending}
                isLoading={mutation.isPending}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
