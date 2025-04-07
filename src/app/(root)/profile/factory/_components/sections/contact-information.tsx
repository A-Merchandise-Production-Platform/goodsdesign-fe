import { HelpCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FactoryFormValues } from '../factory-form-schema';

interface ContactInformationProps {
  form: UseFormReturn<FactoryFormValues>;
  disabled?: boolean;
}

export function ContactInformation({
  form,
  disabled,
}: ContactInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Factory contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <FormField
          control={form.control}
          name="contactPersonName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Contact Person Name</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Enter the name of the primary contact person at your
                      factory. This person will be responsible for communication
                      with customers.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter contact person name"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.contactPersonName ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Name of the primary contact person
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPersonRole"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Contact Person Role</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Enter the role or position of the contact person at your
                      factory. This helps customers understand who they are
                      communicating with.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter contact person role"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.contactPersonRole ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Role or position of the contact person
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPersonPhone"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Contact Person Phone</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Enter the phone number of the contact person. This should
                      be a number where they can be reached during business
                      hours.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <PhoneInput
                  placeholder="Enter contact person phone"
                  {...field}
                  disabled={disabled}
                  defaultCountry="VN"
                />
              </FormControl>
              {form.formState.errors.contactPersonPhone ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Phone number of the contact person
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
