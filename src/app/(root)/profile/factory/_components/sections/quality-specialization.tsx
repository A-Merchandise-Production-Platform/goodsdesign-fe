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
import { Textarea } from '@/components/ui/textarea';
import { TagsInput } from '@/components/ui/tag-ipnut';
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

interface QualitySpecializationProps {
  form: UseFormReturn<FactoryFormValues>;
}

export function QualitySpecialization({ form }: QualitySpecializationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality and Specialization</CardTitle>
        <CardDescription>
          Your factory's expertise and quality standards
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
                      List all quality certifications your factory has obtained
                      such as ISO 9001, FSC, GMP, HACCP, or industry-specific
                      certifications. Include the certification name, issue
                      date, and validitity period where applicable.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Textarea
                  placeholder="List your quality certifications (e.g., ISO 9001, FSC, etc.)"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.qualityCertifications ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  List all quality certifications your factory has obtained
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
                      Select all printing methods your factory is capable of
                      providing. This helps potential customers understand your
                      technical capabilities and match their project
                      requirements to your services.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <TagsInput
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Add printing methods"
                />
              </FormControl>
              {form.formState.errors.printingMethods ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Common methods: Digital, Offset, Screen, Flexography, Gravure,
                  Letterpress, 3D
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
                      Indicate the types of products your factory specializes in
                      producing. Your specializations help customers find
                      factories that are experienced in manufacturing their
                      specific product types.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <TagsInput
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Add specializations"
                />
              </FormControl>
              {form.formState.errors.specializations ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Examples: Packaging, Books, Magazines, Brochures, Labels,
                  Large Format
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
