'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth.store';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import AddressesUpdateForm from '@/app/(root)/profile/_component/addresses-update-form';

// Define the form schema with validation
const profileFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' })
    .or(z.literal('')),
  dateOfBirth: z.date(),
  gender: z.boolean(),
  isActive: z.boolean(),
  role: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [originalValues, setOriginalValues] =
    useState<ProfileFormValues | null>(null);

  // Initialize form with empty values that will be updated after user data is loaded
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      id: '',
      name: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
      gender: true,
      isActive: true,
      role: '',
    },
  });

  // Update form values when user data is available
  useEffect(() => {
    if (user) {
      const defaultValues = {
        id: user.id,
        name: user.name || '',
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : new Date(),
        gender: user.gender,
        isActive: user.isActive,
        role: user.role,
      };

      form.reset(defaultValues);
      setOriginalValues(defaultValues);
    }
  }, [user, form]);

  // Detect changed fields by comparing current values with original values
  const changedFields = useMemo(() => {
    if (!originalValues) return {};

    const currentValues = form.getValues();
    const dirtyFields = form.formState.dirtyFields;
    const fields: Record<string, any> = {};

    // Only process fields that are marked as dirty by React Hook Form
    Object.keys(dirtyFields).forEach(key => {
      const fieldKey = key as keyof ProfileFormValues;

      // Special case for date field
      if (fieldKey === 'dateOfBirth') {
        const currentDate = currentValues.dateOfBirth.getTime();
        const originalDate = originalValues.dateOfBirth.getTime();

        if (currentDate !== originalDate) {
          fields[fieldKey] = currentValues[fieldKey];
        }
      }
      // For all other fields, include them if they're dirty
      else {
        fields[fieldKey] = currentValues[fieldKey];
      }
    });

    return fields;
  }, [
    form,
    originalValues,
    form.formState.dirtyFields,
    form.formState.isDirty,
  ]);

  // Check if any fields have been changed
  const hasChanges = form.formState.isDirty;

  async function onSubmit(data: ProfileFormValues) {
    if (!hasChanges) return;

    const updateInput: Partial<ProfileFormValues> = {};

    if ('name' in changedFields) updateInput.name = data.name;
    if ('phoneNumber' in changedFields)
      updateInput.phoneNumber = data.phoneNumber;
    if ('dateOfBirth' in changedFields)
      updateInput.dateOfBirth = data.dateOfBirth;
    if ('gender' in changedFields) updateInput.gender = data.gender;

    console.log(updateInput);
  }

  form.watch();

  return (
    <div className="space-y-4">
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col">
          <CardContent>
            <Avatar className="size-40 rounded-xl">
              <AvatarImage
                src={user?.imageUrl || ''}
                alt={user?.name || 'User'}
              />
              <AvatarFallback className="rounded-xl text-2xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>

        <Card className="flex flex-1 flex-col">
          <CardHeader>
            <CardTitle>Update Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>

          <Separator />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-col"
            >
              <CardContent className="flex-1 space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      {form.formState.errors.name ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>
                          This is your name that will be displayed on the
                          website.
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={user?.email || ''} disabled />
                  <p className="text-muted-foreground text-sm">
                    This is your email that will be used to login to the website
                    <span className="text-destructive ml-1 font-bold">
                      (cannot be changed)
                    </span>
                    .
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            {...field}
                            defaultCountry="VN"
                            placeholder="Enter your phone number"
                          />
                        </FormControl>
                        {form.formState.errors.phoneNumber ? (
                          <FormMessage />
                        ) : (
                          <FormDescription>
                            This is your phone number that will be used to
                            contact you.
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Date of Birth</FormLabel>
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
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              defaultMonth={field.value}
                              initialFocus
                              captionLayout="dropdown-buttons"
                              fromYear={1900}
                              toYear={new Date().getFullYear()}
                              showOutsideDays
                            />
                          </PopoverContent>
                        </Popover>
                        {form.formState.errors.dateOfBirth ? (
                          <FormMessage />
                        ) : (
                          <FormDescription>
                            This is your date of birth that will be used to
                            calculate your age.
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={value =>
                            field.onChange(value === 'true')
                          }
                          defaultValue={field.value ? 'true' : 'false'}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-y-0 space-x-2">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-y-0 space-x-2">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
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
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormDescription>
                        Your role cannot be changed from this interface.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isLoading || !hasChanges}
                  className="ml-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>

      <AddressesUpdateForm />

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Additional information about your account.
          </CardDescription>
        </CardHeader>

        <Separator />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                Account ID
              </p>
              <p>{user?.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                Last Updated
              </p>
              <p>
                {user?.updatedAt
                  ? format(new Date(user.updatedAt), 'dd/MM/yyyy HH:mm')
                  : 'Never updated'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                Created At
              </p>
              <p>
                {user?.createdAt
                  ? format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm')
                  : 'Unknown'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
