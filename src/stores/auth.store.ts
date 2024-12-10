import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { authApi } from '@/api/auth';
import { User } from '@/types/user';

interface AuthStoreState {
  isAuth: boolean;
  user: User | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const defaultState: AuthStoreState = {
  isAuth: false,
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      login: async (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken });
        if (accessToken && refreshToken) {
          authApi.getMe().then(response => {
            set({ isAuth: true, user: response.data });
          });
        }
      },
      logout: () => {
        set({
          isAuth: false,
          user: undefined,
          accessToken: undefined,
          refreshToken: undefined,
        });
      },
      refreshUser: async () => {
        const state = get();
        if (state.accessToken && state.refreshToken) {
          authApi
            .getMe()
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
