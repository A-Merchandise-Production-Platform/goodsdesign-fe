import { HelpCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FactoryFormValues } from '../factory-form-schema';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LegalInformationProps {
  form: UseFormReturn<FactoryFormValues>;
}

export function LegalInformation({ form }: LegalInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Information</CardTitle>
        <CardDescription>
          Business registration and address details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="businessLicenseUrl"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Business License URL</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Provide a URL to your business license document. This
                        should be hosted on a secure document service that
                        allows public viewing. The license should be current and
                        valid.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    placeholder="Link to your business license document"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.businessLicenseUrl ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    A publicly accessible link to view your business license
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxIdentificationNumber"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Tax Identification Number</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Enter your company's tax identification number or
                        business registration number. This is used for tax and
                        legal purposes and should match official government
                        records.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input placeholder="Enter TIN" {...field} />
                </FormControl>
                {form.formState.errors.taxIdentificationNumber ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Your official tax ID or business registration number
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="addressId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Address ID</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Enter the unique identifier for your factory's address in
                      our system. If you've previously registered an address,
                      use that ID. If not, you'll need to create a new address
                      record first.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input placeholder="Enter address identifier" {...field} />
              </FormControl>
              {form.formState.errors.addressId ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  The unique ID of your registered address in our system
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
