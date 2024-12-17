/* eslint-disable unicorn/no-null */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CheckIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ApiResponse } from '@/api/types';
import { UploadApi } from '@/api/upload';
import { UserApi } from '@/api/user';
import {
  createUserInitialValues,
  CreateUserSchema,
  createuserSchema,
} from '@/app/(root)/admin/users/components/create/create-user-schema';
import ImageInput from '@/components/shared/image/image-input';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RoleSelectProps {
  label: string;
  value: string;
}

const roles: RoleSelectProps[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Staff', value: 'staff' },
  { label: 'Customer', value: 'customer' },
  { label: 'Factory Owner', value: 'factoryOwner' },
];

interface CreateUserFormProps {
  onClose: (isOpen: boolean) => void;
}
export default function CreateUserForm({ onClose }: CreateUserFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createuserSchema),
    defaultValues: createUserInitialValues,
  });

  const mutation = useMutation({
    mutationFn: async (payload: CreateUserSchema) => {
      let imageUrl = payload.imageUrl;
      if (image) {
        const uploadResult = await UploadApi.uploadImage(image);
        imageUrl = uploadResult.fileUrl;
      }
      return UserApi.create({ ...payload, imageUrl });
    },
    onSuccess: () => {
      console.log('User created successfully');
      toast.success('User created successfully');
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(`Failed to create user: ${error.response?.data.message}`);
    },
  });

  async function onSubmit(values: CreateUserSchema) {
    mutation.mutate(values);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <div className="flex w-full items-start">
            <div className="w-full">
              <ImageInput onChange={file => setImage(file)} />
            </div>
          </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the email address of the user.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the username of the user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a role for the user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example password"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the password of the user, must be at least 6
                    characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="123456789"
                      {...field}
                      defaultCountry="VN"
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>Enter user phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={value => field.onChange(value === 'true')}
                      defaultValue={field.value?.toString()}
                      disabled={mutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">Female</SelectItem>
                        <SelectItem value="true">Male</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This is the user gender</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="datetime">Date time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        granularity="day"
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      This is the date of birth of the user.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="col-span-2 flex w-full gap-6">
            <Button
              type="button"
              variant="outline"
              disabled={mutation.isPending}
              className="w-full"
              onClick={() => {
                setConfirmOpen(true);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? 'Creating...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={confirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to close this form?</DialogTitle>
            <DialogDescription>
              Your changes will not be saved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                form.reset();
                onClose(false);
                setConfirmOpen(false);
              }}
            >
              <CheckIcon size={16} />
              Yes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setConfirmOpen(false);
              }}
            >
              <XCircleIcon size={16} />
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
