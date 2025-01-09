import { useFormContext } from 'react-hook-form';

import { RegisterFOType } from '@/app/(auth)/register/factory-owner/_components/register-factory-owner-schema';
import {
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

export default function AccountForm() {
  const { control, formState } = useFormContext<RegisterFOType>();
  return (
    <div className="space-y-6 rounded-lg border p-4">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="example@email.com" {...field} />
            </FormControl>

            {formState.errors.email ? (
              <FormMessage />
            ) : (
              <FormDescription>
                This is the email you will use to login.
              </FormDescription>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="userName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Nguyen Van A" {...field} />
            </FormControl>

            {formState.errors.userName ? (
              <FormMessage />
            ) : (
              <FormDescription>This is the name in the system.</FormDescription>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <PhoneInput
                placeholder="123456789"
                {...field}
                defaultCountry="VN"
              />
            </FormControl>

            {formState.errors.phoneNumber ? (
              <FormMessage />
            ) : (
              <FormDescription>This is the name in the system.</FormDescription>
            )}
          </FormItem>
        )}
      />
      <div className="space-y-4">
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Your password" {...field} />
              </FormControl>
              {formState.errors.password ? (
                <FormMessage>{formState.errors.password.message}</FormMessage>
              ) : (
                <FormDescription>
                  Your password must be at least 8 characters long.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your password" {...field} />
              </FormControl>
              {formState.errors.confirmPassword ? (
                <FormMessage>
                  {formState.errors.confirmPassword.message}
                </FormMessage>
              ) : (
                <FormDescription>Confirm your password.</FormDescription>
              )}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
