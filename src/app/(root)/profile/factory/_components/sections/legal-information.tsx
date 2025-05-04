import { HelpCircle } from 'lucide-react';
import { useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AddressSelector } from '@/components/shared/address/address-selector';
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
import {
  RequiredFieldsContext,
  RequiredIndicator,
} from '../update-factory-form';

interface LegalInformationProps {
  form: UseFormReturn<FactoryFormValues>;
  disabled?: boolean;
}

export function LegalInformation({ form, disabled }: LegalInformationProps) {
  const requiredFields = useContext(RequiredFieldsContext);

  const isRequired = (fieldName: string) => requiredFields.includes(fieldName);

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
                  <FormLabel>
                    Business License URL
                    {isRequired('businessLicenseUrl') && <RequiredIndicator />}
                  </FormLabel>
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
                    disabled={disabled}
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
                  <FormLabel>
                    Tax Identification Number
                    {isRequired('taxIdentificationNumber') && (
                      <RequiredIndicator />
                    )}
                  </FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Enter your company&apos;s tax identification number or
                        business registration number. This is used for tax and
                        legal purposes and should match official government
                        records.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter TIN"
                    {...field}
                    disabled={disabled}
                  />
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
          name="addressInput"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>
                  Address
                  {isRequired('addressInput') && <RequiredIndicator />}
                </FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Enter your factory&apos;s address details including
                      province, district, ward, and street.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <AddressSelector
                  value={{
                    ...field.value,
                    formattedAddress: field.value.formattedAddress ?? '',
                  }}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.addressInput ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Your factory&apos;s complete address details
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
