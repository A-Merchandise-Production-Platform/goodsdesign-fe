'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Roles, useUpdateUserMutation } from '@/graphql/generated/graphql';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  // password: z.string().min(6).optional(),
  phoneNumber: z.string().min(10).optional(),
  role: z.nativeEnum(Roles).optional(),
  dateOfBirth: z.date().optional(),
});

const roles = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Manager', value: 'MANAGER' },
  { label: 'Staff', value: 'STAFF' },
  { label: 'Factory Owner', value: 'FACTORYOWNER' },
  { label: 'Customer', value: 'CUSTOMER' },
];

interface EditUserFormProps {
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    dateOfBirth?: Date | null;
  };
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email || '',
      name: user.name || '',
      // password: '',
      phoneNumber: user.phoneNumber || '',
      role: user.role,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    },
  });

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation({
    onCompleted: () => {
      toast.success('User updated successfully');
      setIsOpen(false);
      form.reset();
    },
    onError: error => {
      toast.error(error.message);
    },
    fetchPolicy: 'no-cache',
    refetchQueries: ['GetUsers'],
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create an object to store only changed values
    const changedValues: Partial<z.infer<typeof formSchema>> = {};

    // Compare each field with original values and only include if changed
    if (values.name !== user.name) changedValues.name = values.name;
    if (values.phoneNumber !== user.phoneNumber)
      changedValues.phoneNumber = values.phoneNumber;
    if (values.role !== user.role) changedValues.role = values.role;
    // if (values.password) changedValues.password = values.password;
    if (
      values.dateOfBirth &&
      (!user.dateOfBirth ||
        new Date(values.dateOfBirth).getTime() !==
          new Date(user.dateOfBirth).getTime())
    ) {
      changedValues.dateOfBirth = values.dateOfBirth;
    }

    // Only proceed with update if there are changes
    if (Object.keys(changedValues).length > 0) {
      updateUser({
        variables: {
          updateUserInput: changedValues,
          updateUserId: user.id,
        },
      });
    } else {
      toast.info('No changes detected');
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          Edit User
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the user information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="User Email" {...field} />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is user&apos;s email.
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="User Name" {...field} />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>This is user&apos;s name.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  {form.formState.errors.password ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is user&apos;s password.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="User Phone Number"
                      {...field}
                      type="tel"
                      defaultCountry="VN"
                    />
                  </FormControl>
                  {form.formState.errors.phoneNumber ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is user&apos;s phone number.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors.role ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        This is user&apos;s role.
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
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
                          defaultMonth={field.value}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.dateOfBirth ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        This is user&apos;s date of birth.
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Update User
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
