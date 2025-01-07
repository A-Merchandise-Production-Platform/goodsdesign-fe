'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import AccountForm from '@/app/(auth)/register/factory-owner/_components/account-form';
import FactoryForm from '@/app/(auth)/register/factory-owner/_components/factory-form';
import RegisterFOSchema, {
  initialRegisterFOValues,
  RegisterFOType,
} from '@/app/(auth)/register/factory-owner/_components/register-factory-owner-schema';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export default function RegisterFactoryOwnerForm() {
  const form = useForm<RegisterFOType>({
    resolver: zodResolver(RegisterFOSchema),
    defaultValues: initialRegisterFOValues,
  });
  const onSubmit = (payload: RegisterFOType) => {
    console.log(payload);
  };
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <AccountForm />
          <FactoryForm />
          <Button type="submit" className="col-span-2">
            Register
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
