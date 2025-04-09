import { HelpCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useContext } from 'react';

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

interface OperationalDetailsProps {
  form: UseFormReturn<FactoryFormValues>;
  disabled?: boolean;
}

export function OperationalDetails({
  form,
  disabled,
}: OperationalDetailsProps) {
  const requiredFields = useContext(RequiredFieldsContext);

  const isRequired = (fieldName: string) => requiredFields.includes(fieldName);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operational Details</CardTitle>
        <CardDescription>
          Production capacity and operational information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="totalEmployees"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>
                    Total Employees
                    {isRequired('totalEmployees') && <RequiredIndicator />}
                  </FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Enter the total number of full-time employees working at
                        your factory. This helps clients understand the size and
                        capacity of your operation.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Number of employees"
                    {...field}
                    disabled={disabled}
                    onChange={e =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                {form.formState.errors.totalEmployees ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    The total number of employees at your factory
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPrintingCapacity"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>
                    Maximum Printing Capacity
                    {isRequired('maxPrintingCapacity') && <RequiredIndicator />}
                  </FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Specify the maximum number of standard units your
                        factory can produce in a single day when operating at
                        full capacity. This helps clients assess if you can
                        handle their order volume.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Units per day"
                    {...field}
                    disabled={disabled}
                    onChange={e =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                {form.formState.errors.maxPrintingCapacity ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Your factory&apos;s maximum production capacity in units per
                    day
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="operationalHours"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>
                  Operational Hours
                  {isRequired('operationalHours') && <RequiredIndicator />}
                </FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Specify the regular hours of operation for your factory
                      for each day of the week. Include information about shifts
                      if applicable and any special hours or closures.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  placeholder="e.g., Mon-Fri: 9AM-5PM, Sat: 9AM-12PM"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.operationalHours ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Specify your regular operational hours for each day of the
                  week
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="leadTime"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>
                    Lead Time (Days)
                    {isRequired('leadTime') && <RequiredIndicator />}
                  </FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Enter the average number of days required from order
                        confirmation to shipment for a standard order. This
                        helps clients plan their production schedules
                        accordingly.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Average production time in days"
                    {...field}
                    disabled={disabled}
                    onChange={e =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                {form.formState.errors.leadTime ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Average time from order confirmation to shipping
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minimumOrderQuantity"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>
                    Minimum Order Quantity
                    {isRequired('minimumOrderQuantity') && (
                      <RequiredIndicator />
                    )}
                  </FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Specify the minimum number of units required for
                        accepting an order. This helps filter out inquiries that
                        don&apos;t meet your production scale requirements.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Minimum units per order"
                    {...field}
                    disabled={disabled}
                    onChange={e =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                {form.formState.errors.minimumOrderQuantity ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    The minimum number of units required per order
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
