'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AlreadyAuthen({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuth } = useAuthStore();

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  if (isAuth) {
    return null;
  }

  return <>{children}</>;
}
