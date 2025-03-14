import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useRouter } from 'next/navigation';

import { AuthApi } from '@/api/auth';
import { AuthUser } from '@/types/user';
import { LoginResponse } from '@/api/types';

interface AuthStoreState {
  isAuth: boolean;
  user: AuthUser | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  login: (payload: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: AuthUser) => void;
}

export const defaultState: AuthStoreState = {
  isAuth: false,
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
  setUser: () => {},
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      login: async (payload: LoginResponse) => {
        set({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          user: payload.user,
          isAuth: true,
        });
      },
      logout: async () => {
        set({
          isAuth: false,
          user: undefined,
          accessToken: undefined,
          refreshToken: undefined,
        });
        toast.success('Logged out successfully');
      },
      refreshUser: async () => {
        const state = get();
        if (state.accessToken && state.refreshToken) {
          AuthApi.getMe()
            .then(response => {
              set({ isAuth: true, user: response });
            })
            .catch(() => {
              console.log('Failed to refresh user');
              set({
                isAuth: false,
                user: undefined,
                accessToken: undefined,
                refreshToken: undefined,
              });
            });
        }
      },
      setUser: (user: AuthUser) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuth: !!state.accessToken && !!state.refreshToken,
      }),
    },
  ),
);
