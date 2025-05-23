import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { Roles, useCreateUserMutation } from '@/graphql/generated/graphql';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  phoneNumber: z.string().min(10),
  role: z.nativeEnum(Roles),
  dateOfBirth: z.date(),
});

const roles = [
  { label: 'Staff', value: 'STAFF' },
  { label: 'Factory Owner', value: 'FACTORYOWNER' },
  { label: 'Customer', value: 'CUSTOMER' },
];

export default function AddUserForm() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phoneNumber: '',
      role: Roles.Customer,
      dateOfBirth: new Date(
        new Date().setFullYear(new Date().getFullYear() - 18),
      ),
    },
  });

  const [createUserMutation, { loading }] = useCreateUserMutation({
    refetchQueries: ['GetUsers'],
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createUserMutation({
      variables: {
        createUserInput: {
          email: values.email,
          name: values.name,
          password: values.password,
          phoneNumber: values.phoneNumber,
          role: values.role,
          dateOfBirth: values.dateOfBirth.toISOString(),
          gender: true,
        },
      },
      onCompleted: () => {
        setIsOpen(false);
        form.reset();
        toast.success('User created successfully');
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new user.
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
                    <Input
                      placeholder="User Email"
                      {...field}
                      disabled={loading}
                    />
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
            <FormField
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
            />
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
                  {form.formState.errors.password ? (
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
              Create User
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
