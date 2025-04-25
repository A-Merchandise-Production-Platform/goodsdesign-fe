import { HelpCircle } from 'lucide-react';
import { useContext } from 'react';
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
                    min={0}
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
        </div>
      </CardContent>
    </Card>
  );
}
