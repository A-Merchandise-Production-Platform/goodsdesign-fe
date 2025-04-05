import { format } from 'date-fns';
import { CalendarIcon, HelpCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { FactoryFormValues } from '../factory-form-schema';

interface BasicInformationProps {
  form: UseFormReturn<FactoryFormValues>;
  disabled?: boolean;
}

export function BasicInformation({ form, disabled }: BasicInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Factory Information</CardTitle>
        <CardDescription>Basic details about your factory</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Factory Name</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Enter the official registered business name of your
                      factory. This should match what appears on your business
                      registration documents.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter factory name"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.name ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  The official registered name of your factory
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Description</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Provide a detailed description of your factory, including
                      its history, main services, facilities, and any special
                      capabilities that set you apart from competitors.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Describe your factory and its capabilities"
                  className="min-h-32"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.description ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Provide a comprehensive overview of your factory&apos;s
                  capabilities and unique selling points
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Website</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Enter your factory&apos;s official website URL. Make
                        sure to include the full address, including
                        &apos;https://&apos; or &apos;http://&apos;.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    placeholder="https://yourfactory.com"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                {form.formState.errors.website ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Your factory&apos;s official website URL
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishedDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex items-center gap-2">
                  <FormLabel>Established Date</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <p>
                        Select the date when your factory was officially
                        established or incorporated. This should match your
                        business registration documents.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
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
                      disabled={date => date > new Date()}
                      defaultMonth={field.value}
                      showOutsideDays
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.establishedDate ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    The date your factory was officially established
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
