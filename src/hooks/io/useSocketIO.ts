import { useEffect, useRef, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';

import { envConfig } from '@/constant';
import { useAuthStore } from '@/stores/auth.store';

import { UseIo } from './types';

export const useSocketIo = (): UseIo => {
  const socket = useRef<Socket | null>(null);
  const [, setSetup] = useState(false);
  const { accessToken, isAuth } = useAuthStore.getState();

  const connect = () => {
    socket.current?.connect();
  };

  useEffect(() => {
    // do nothing if not authenticated
    if (!isAuth) return;

    const handleEffect = async () => {
      // create a new socket manager
      const manager = new Manager(envConfig().ioUrl, {
        autoConnect: false,
      });
      if (!accessToken) {
        throw new Error('No access token found');
      }

      socket.current = manager.socket('/gameplay', {
        auth: {
          token: accessToken,
        },
      });
      setSetup(true);
    };
    handleEffect();

    //clean function to disconnect the socket
    return () => {
      if (socket.current) {
        socket.current.removeAllListeners();
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [isAuth, accessToken]);

  return {
    socket: socket.current,
    connect,
  };
};
