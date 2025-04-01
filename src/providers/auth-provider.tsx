'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { LoadingScreen } from '@/components/ui/loading-screen';
import {
  useGetMeLazyQuery,
  useGetMeQuery,
  UserEntity,
} from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, accessToken, isAuth } = useAuthStore();
  const [getMeQuery] = useGetMeLazyQuery({
    onCompleted: data => {
      setUser(data.getMe as UserEntity);
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
