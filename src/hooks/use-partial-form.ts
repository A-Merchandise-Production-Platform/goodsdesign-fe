'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  type DefaultValues,
  type FieldValues,
  useForm,
  type UseFormProps,
} from 'react-hook-form';
import type { ZodType } from 'zod';

export function usePartialForm<TFieldValues extends FieldValues>(
  schema: ZodType<TFieldValues>,
  defaultValues: DefaultValues<TFieldValues>,
  options?: Omit<UseFormProps<TFieldValues>, 'resolver' | 'defaultValues'>,
) {
  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
    ...options,
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change') {
        const isChanged = Object.keys(value).some(
          key =>
            value[key] !==
            (defaultValues as TFieldValues)[key as keyof TFieldValues],
        );
        setIsFormChanged(isChanged);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, defaultValues]);

  const handleSubmit = (onSubmit: (data: Partial<TFieldValues>) => void) => {
    return form.handleSubmit(values => {
      const changedFields = Object.entries(values).reduce(
        (accumulator, [key, value]) => {
          if (
            value !== (defaultValues as TFieldValues)[key as keyof TFieldValues]
          ) {
            accumulator[key as keyof TFieldValues] = value;
          }
          return accumulator;
        },
        {} as Partial<TFieldValues>,
      );

      onSubmit(changedFields);
    });
  };

  return {
    form,
    handleSubmit,
    isFormChanged,
    setIsFormChanged,
  };
}
