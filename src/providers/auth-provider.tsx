'use client';

import { useEffect, useState } from 'react';

import { LoadingScreen } from '@/components/ui/loading-screen';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { refreshUser } = useAuthStore();

  useEffect(() => {
    const rehydrateAuth = async () => {
      await useAuthStore.persist.rehydrate();
      await refreshUser();
      setIsLoading(false);
    };

    rehydrateAuth();
  }, [refreshUser]);

  if (isLoading) {
    return <LoadingScreen message="Loading user..." />;
  }

  return <>{children}</>;
}
