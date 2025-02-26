import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AuthApi } from '@/api/auth';
import { AuthUser } from '@/types/user';

interface AuthStoreState {
  isAuth: boolean;
  user: AuthUser | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  setUser: (user: AuthUser) => void;
}

export const defaultState: AuthStoreState = {
  isAuth: false,
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
  setUser: () => {},
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      login: async (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken });
        if (accessToken && refreshToken) {
          AuthApi.getMe().then(response => {
            set({ isAuth: true, user: response.data });
          });
        }
      },
      logout: async () => {
        await AuthApi.logout();
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
              set({ isAuth: true, user: response.data });
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
