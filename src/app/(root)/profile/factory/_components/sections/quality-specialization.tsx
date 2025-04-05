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
import { TagsInput } from '@/components/ui/tag-ipnut';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FactoryFormValues } from '../factory-form-schema';

interface QualitySpecializationProps {
  form: UseFormReturn<FactoryFormValues>;
  disabled?: boolean;
}

export function QualitySpecialization({
  form,
  disabled,
}: QualitySpecializationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality & Specialization</CardTitle>
        <CardDescription>
          Quality certifications and specializations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <FormField
          control={form.control}
          name="qualityCertifications"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Quality Certifications</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      List your factory&apos;s quality certifications. These
                      demonstrate your commitment to quality standards and
                      manufacturing excellence.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Textarea
                  placeholder="List your quality certifications"
                  className="min-h-32"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.qualityCertifications ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  List your factory&apos;s quality certifications
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="printingMethods"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Printing Methods</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      Select the printing methods your factory specializes in.
                      This helps customers understand your technical
                      capabilities.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <TagsInput
                  placeholder="Add printing methods"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.printingMethods ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Select the printing methods your factory specializes in
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specializations"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Specializations</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <p>
                      List your factory&apos;s specializations. These are unique
                      capabilities or areas of expertise that set you apart from
                      competitors.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <TagsInput
                  placeholder="Add specializations"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.specializations ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  List your factory&apos;s specializations
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
