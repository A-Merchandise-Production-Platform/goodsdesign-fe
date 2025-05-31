'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  type EvaluationCriteriaEntity,
  useCreateEvaluationCriteriaMutation,
  useUpdateEvaluationCriteriaMutation,
} from '@/graphql/generated/graphql';

const evaluationCriteriaSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

type EvaluationCriteriaFormData = z.infer<typeof evaluationCriteriaSchema>;

interface EvaluationCriteriaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluationCriteria?: EvaluationCriteriaEntity | null;
  productId: string;
  onSuccess?: () => void;
}

export function EvaluationCriteriaForm({
  open,
  onOpenChange,
  evaluationCriteria,
  productId,
  onSuccess,
}: EvaluationCriteriaFormProps) {
  const isEditing = Boolean(evaluationCriteria);

  const form = useForm<EvaluationCriteriaFormData>({
    resolver: zodResolver(evaluationCriteriaSchema),
    defaultValues: {
      name: evaluationCriteria?.name || '',
      description: evaluationCriteria?.description || '',
      isActive: evaluationCriteria?.isActive ?? true,
    },
  });

  React.useEffect(() => {
    if (evaluationCriteria && open) {
      form.reset({
        name: evaluationCriteria.name,
        description: evaluationCriteria.description || '',
        isActive: evaluationCriteria.isActive,
      });
    } else if (!evaluationCriteria && open) {
      form.reset({
        name: '',
        description: '',
        isActive: true,
      });
    }
  }, [evaluationCriteria, open, form]);

  const [createEvaluationCriteria, { loading: isCreating }] =
    useCreateEvaluationCriteriaMutation({
      onCompleted: () => {
        toast.success('Evaluation criteria created successfully');
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      },
      onError: error => {
        toast.error(error.message || 'Failed to create evaluation criteria');
      },
    });

  const [updateEvaluationCriteria, { loading: isUpdating }] =
    useUpdateEvaluationCriteriaMutation({
      onCompleted: () => {
        toast.success('Evaluation criteria updated successfully');
        onOpenChange(false);
        onSuccess?.();
      },
      onError: error => {
        toast.error(error.message || 'Failed to update evaluation criteria');
      },
    });

  const isLoading = isCreating || isUpdating;

  const onSubmit = async (data: EvaluationCriteriaFormData) => {
    try {
      if (isEditing && evaluationCriteria) {
        await updateEvaluationCriteria({
          variables: {
            updateEvaluationCriteriaInput: {
              id: evaluationCriteria.id,
              name: data.name,
              description: data.description || null,
              isActive: data.isActive,
            },
          },
        });
      } else {
        await createEvaluationCriteria({
          variables: {
            createEvaluationCriteriaInput: {
              name: data.name,
              description: data.description || null,
              isActive: data.isActive,
              productId,
            },
          },
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      onOpenChange(newOpen);
      if (!newOpen) {
        form.reset();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? 'Edit Evaluation Criteria'
              : 'Create Evaluation Criteria'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter criteria name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter criteria description"
                      className="resize-none"
                      rows={3}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <div className="text-muted-foreground text-sm">
                      Enable this evaluation criteria for use in orders
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
