'use client';

import React from 'react';

import ErrorPage from '@/components/shared/error-page';
import { useAuthStore } from '@/stores/auth.store';

export default function StaffGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, user } = useAuthStore();

  if (!isAuth || user?.role.toUpperCase() !== 'STAFF') {
    return (
      <ErrorPage
        code={403}
        message="You're not authorized to access this page"
      />
    );
  }

  return children;
}
