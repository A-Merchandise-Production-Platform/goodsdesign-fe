'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useSocketStore } from '@/stores/socket-io-store';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
