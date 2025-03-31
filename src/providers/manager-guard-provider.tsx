'use client';

import React from 'react';

import ErrorPage from '@/components/shared/error-page';
import { useAuthStore } from '@/stores/auth.store';

export default function ManagerGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, user } = useAuthStore();

  if (!isAuth || user?.role.toUpperCase() !== 'MANAGER') {
    return (
      <ErrorPage
        code={403}
        message="You're not authorized to access this page"
      />
    );
  }

  return children;
}
