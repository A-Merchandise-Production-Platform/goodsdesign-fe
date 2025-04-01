'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/auth.store';
import { useSocketStore } from '@/stores/socket-io-store';

export default function SocketIOClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket, connect } = useSocketStore();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;
    connect(accessToken);
  }, [accessToken, connect]);

  return <>{children}</>;
}
