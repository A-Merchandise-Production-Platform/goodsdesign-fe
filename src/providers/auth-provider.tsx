'use client';

import { useEffect, useState } from 'react';

import { LoadingScreen } from '@/components/ui/loading-screen';
import { useAuthStore } from '@/stores/auth.store';
import { useGetMeLazyQuery, useGetMeQuery } from '@/graphql/generated/graphql';
import { toast } from 'sonner';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, accessToken, isAuth } = useAuthStore();
  const [getMeQuery] = useGetMeLazyQuery({
    onCompleted: data => {
      setUser({ ...data.getMe, isDeleted: false });
    },
    onError: error => {
      console.log(error);
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const rehydrateAuth = async () => {
      await useAuthStore.persist.rehydrate();
      if (isAuth && accessToken) {
        getMeQuery();
      }
      setIsLoading(false);
    };

    rehydrateAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Loading user..." />;
  }

  return <>{children}</>;
}
