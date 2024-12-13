'use client';

import React from 'react';

import ErrorPage from '@/components/shared/error-page';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return (
      <ErrorPage
        code={401}
        message="You must be authenticated to view this page"
      />
    );
  }

  return children;
}
