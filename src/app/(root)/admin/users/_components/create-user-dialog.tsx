'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircleIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateTimePicker } from '@/components/ui/datetime-picker';
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
import { cn } from '@/lib/utils';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  userName: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.date(),
  imageUrl: z.string().url(),
  role: z.string(),
});

export default function CreateUserDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      userName: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
      imageUrl: '',
      role: '',
    },
  });

  const onSubmit = (payload: z.infer<typeof createUserSchema>) => {
    console.log(payload);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircleIcon className="mr-2" />
            Create User
          </Button>
        </DialogTrigger>
        <DialogContent>
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
                      />
                    </FormControl>
                    <FormDescription>This is the user email</FormDescription>
                    <FormMessage />
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
                      <Input placeholder="userName" type="text" {...field} />
                    </FormControl>
                    <FormDescription>This is the user name</FormDescription>
                    <FormMessage />
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
                      />
                    </FormControl>
                    <FormDescription>Enter your phone number.</FormDescription>
                    <FormMessage />
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
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>Enter user password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <DateTimePicker {...field} />
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
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
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role for user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose user role</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
