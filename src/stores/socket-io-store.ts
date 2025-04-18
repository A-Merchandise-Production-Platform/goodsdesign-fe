import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

import { envConfig } from '@/constant';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>(set => ({
  socket: null,
  isConnected: false,
  connect: (token: string) => {
    const socket = io(envConfig().ioUrl || 'http://localhost:5000', {
      path: '/socket.io',
      auth: { token },
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected');
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      set({ isConnected: false });
    });

    socket.on('connect_error', error => {
      console.error('Socket connection error:', error);
      set({ isConnected: false });
    });

    set({ socket });
  },
  disconnect: () => {
    set(state => {
      state.socket?.disconnect();
      return { socket: null, isConnected: false };
    });
  },
}));
