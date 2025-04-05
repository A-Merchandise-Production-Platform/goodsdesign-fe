'use client';

import ErrorPage from '@/components/shared/error-page';
import { FactoryStatus, Roles } from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

export default function FactoryStatusCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  if (
    user?.role !== Roles.Factoryowner ||
    user?.ownedFactory?.factoryStatus !== FactoryStatus.Approved
  ) {
    return (
      <ErrorPage message="You not allowed to access this page" code={403} />
    );
  }

  return <>{children}</>;
}
