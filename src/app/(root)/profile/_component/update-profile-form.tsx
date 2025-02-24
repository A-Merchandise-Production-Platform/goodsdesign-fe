'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { CalendarIcon, RotateCwIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { ApiResponse, UpdateUserDto } from '@/api/types';
import { UserApi } from '@/api/user';
import ImageInput from '@/components/shared/image/image-input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Label } from '@/components/ui/label';
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
import { usePartialForm } from '@/hooks/use-partial-form';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth.store';

interface UpdateProfileFormProps {}

const formSchema = z.object({
  email: z.string().email().optional(),
  userName: z.string().min(3).max(20).optional(),
  phoneNumber: z.string().min(10).max(14).optional(),
  gender: z.boolean().optional(),
  dateOfBirth: z.date().optional(),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateProfileForm({}: UpdateProfileFormProps) {
  const { user } = useAuthStore();

  const defaultFormValue: FormValues = {
    email: user?.email!,
    userName: user?.userName!,
    phoneNumber: user?.phoneNumber!,
    gender: user?.gender!,
    dateOfBirth: new Date(user?.dateOfBirth!),
    imageUrl: user?.imageUrl!,
  };

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserDto }) =>
      UserApi.updateUser(id, payload),
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data.message);
    },
  });

  const { form, handleSubmit, isFormChanged, setIsFormChanged } =
    usePartialForm(formSchema, defaultFormValue);

  const onSubmit = (payload: Partial<FormValues>) => {
    console.log(payload);
    mutation.mutate({ id: user?.id!, payload });
  };

  if (!user) return;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-20">
          <div className="flex flex-col gap-2">
            <div className="w-72">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <ImageInput
                        onChange={field.onChange}
                        ratio="1:1"
                        showGrid
                        defaultImage={field.value}
                      />
                    </FormControl>
                    {form.formState.errors.email ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        This is your avatar image.
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your email" {...field} disabled />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>This is your email.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="userName"
                      type="text"
                      {...field}
                      //   disabled={mutation.isPending}
                    />
                  </FormControl>
                  {form.formState.errors.userName ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>This is your user name.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    value={field.value ? 'true' : 'false'}
                    onValueChange={value => field.onChange(value === 'true')}
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
                  <FormDescription>Select your gender</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col items-start">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Phone number"
                        {...field}
                        defaultCountry="VN"
                        //   disabled={mutation.isPending}
                      />
                    </FormControl>
                    {form.formState.errors.phoneNumber ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        This is your phone number
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
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
                            //   disabled={mutation.isPending}
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
                      <FormDescription>
                        This is your date of birth
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-start gap-4">
              <Button
                type="button"
                disabled={!isFormChanged}
                variant={'outline'}
                onClick={() => {
                  form.reset(defaultFormValue);
                  setIsFormChanged(false);
                }}
              >
                <RotateCwIcon className="h-4 w-4" />
                Reset
              </Button>
              <Button type="submit" disabled={!isFormChanged}>
                {isFormChanged ? 'Save changes' : 'No changes to save'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
