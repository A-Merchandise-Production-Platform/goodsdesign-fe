'use client';

import UpdateFactoryForm from '@/app/(root)/profile/factory/_components/update-factory-form';
import ErrorPage from '@/components/shared/error-page';
import { Roles } from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

export default function FactoryPage() {
  const { user } = useAuthStore();

  if (user?.role !== Roles.Factoryowner) {
    return (
      <ErrorPage code={403} message="You not authorized to access this page" />
    );
  }

  return (
    <div>
      <UpdateFactoryForm />
    </div>
  );
}
