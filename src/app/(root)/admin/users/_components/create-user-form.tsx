'use client';

import { Roles } from '@/graphql/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { PasswordInput } from '@/components/ui/password-input';
import { useMutation } from '@tanstack/react-query';
import { UserApi } from '@/api/user';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/phone-input';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
  phoneNumber: z.string(),
  gender: z.boolean(),
  dateOfBirth: z.date(),
  role: z.nativeEnum(Roles),
});

const availableRoles = [
  Roles.Admin,
  Roles.Manager,
  Roles.Staff,
  Roles.Customer,
];

interface CreateUserFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function CreateUserForm({
  onSuccess,
  onClose,
}: CreateUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phoneNumber: '',
      gender: false,
      dateOfBirth: new Date(),
      role: Roles.Customer,
    },
  });

  const mutation = useMutation({
    mutationFn: UserApi.create,
    onSuccess: () => {
      toast.success('User created successfully');
      onSuccess?.();
      onClose?.();
    },
    onError: () => {
      toast.error('Failed to create user');
    },
  });

  const onSubmit = (payload: z.infer<typeof formSchema>) => {
    mutation.mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              {form.formState.errors.email ? (
                <FormMessage />
              ) : (
                <FormDescription>This is user email.</FormDescription>
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
                <Input
                  placeholder="John Doe"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              {form.formState.errors.name ? (
                <FormMessage />
              ) : (
                <FormDescription>This is user name.</FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
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
                <FormDescription>This is user phone number.</FormDescription>
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
                  placeholder="user password"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              {form.formState.errors.password ? (
                <FormMessage />
              ) : (
                <FormDescription>This is user password.</FormDescription>
              )}
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex-1">
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
                        type="button"
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
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      defaultMonth={field.value || new Date()}
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
                  <FormDescription>This is your date of birth</FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={value => field.onChange(value === 'true')}
                  defaultValue={field.value ? 'true' : 'false'}
                  disabled={mutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Male</SelectItem>
                    <SelectItem value="false">Female</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender ? (
                  <FormMessage />
                ) : (
                  <FormDescription>This is your gender</FormDescription>
                )}
              </FormItem>
            )}
          />
        </div>

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
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0) + role.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.role ? (
                <FormMessage />
              ) : (
                <FormDescription>User role in the system</FormDescription>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
          isLoading={mutation.isPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
