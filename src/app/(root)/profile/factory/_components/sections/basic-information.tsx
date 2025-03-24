import { format } from 'date-fns';
import { CalendarIcon, HelpCircle } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface BasicInformationProps {
  form: UseFormReturn<FactoryFormValues>;
}

export function BasicInformation({ form }: BasicInformationProps) {
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
                <Input placeholder="Enter factory name" {...field} />
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
                />
              </FormControl>
              {form.formState.errors.description ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Provide a comprehensive overview of your factory's
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
                        Enter your factory's official website URL. Make sure to
                        include the full address, including 'https://' or
                        'http://'.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input placeholder="https://yourfactory.com" {...field} />
                </FormControl>
                {form.formState.errors.website ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Your factory's official website URL
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
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
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
