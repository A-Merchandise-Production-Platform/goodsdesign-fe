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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FactoryFormValues } from '../factory-form-schema';

interface ContactInformationProps {
  form: UseFormReturn<FactoryFormValues>;
}

export function ContactInformation({ form }: ContactInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Details of the primary contact person</CardDescription>
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
                      Enter the full name of the primary person responsible for
                      handling client inquiries and orders. This should be
                      someone who is authorized to provide information and make
                      decisions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input placeholder="Full name of contact person" {...field} />
              </FormControl>
              {form.formState.errors.contactPersonName ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  The name of the primary contact person for inquiries
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="contactPersonRole"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Role/Position</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Specify the job title or position of the contact person
                        within your organization. This helps clients understand
                        their authority level and responsibilities.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input placeholder="e.g., Production Manager" {...field} />
                </FormControl>
                {form.formState.errors.contactPersonRole ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    The job title or position of the contact person
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
                  <FormLabel>Phone Number</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Provide a direct phone number for business inquiries,
                        including the country code. This should be a number that
                        is regularly monitored during business hours.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                {form.formState.errors.contactPersonPhone ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Direct phone number for business inquiries
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
