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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserApi } from '@/api/user';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/phone-input';
import { GraphQlUser } from '@/graphql/generated';
import { usePartialForm } from '@/hooks/use-partial-form';

const formSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(3).optional(),
  phoneNumber: z.string().optional(),
  gender: z.boolean().optional(),
  dateOfBirth: z.date().optional(),
  role: z.nativeEnum(Roles).optional(),
});

const availableRoles = [
  Roles.Admin,
  Roles.Manager,
  Roles.Staff,
  Roles.Customer,
];

interface UpdateUserFormProps {
  user: GraphQlUser;
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function UpdateUserForm({
  user,
  onSuccess,
  onClose,
}: UpdateUserFormProps) {
  const queryClient = useQueryClient();
  const defaultValues = {
    email: user.email || '',
    name: user.name || '',
    phoneNumber: user.phoneNumber || '',
    gender: user.gender,
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : new Date(),
    role: user.role,
  };

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      UserApi.updateUser(user.id, data),
    onSuccess: () => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users_analytics'] });
      onSuccess?.();
      onClose?.();
      setIsFormChanged(false);
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });

  const { form, handleSubmit, isFormChanged, setIsFormChanged } =
    usePartialForm(formSchema, defaultValues);

  const onSubmit = (payload: Partial<z.infer<typeof formSchema>>) => {
    updateMutation.mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">
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
                  disabled={updateMutation.isPending}
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
                  disabled={updateMutation.isPending}
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
                  disabled={updateMutation.isPending}
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
                        disabled={updateMutation.isPending}
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
                  value={field.value ? 'true' : 'false'}
                  disabled={updateMutation.isPending}
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
                value={field.value}
                disabled={updateMutation.isPending}
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
          disabled={updateMutation.isPending || !isFormChanged}
          isLoading={updateMutation.isPending}
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
