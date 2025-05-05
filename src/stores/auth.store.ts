import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { GetMeQuery, LoginMutation } from '@/graphql/generated/graphql';

interface AuthStoreState {
  isAuth: boolean;
  user: GetMeQuery['getMe'] | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  login: (payload: {
    accessToken: string;
    refreshToken: string;
    user: LoginMutation['login']['user'];
  }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: GetMeQuery['getMe']) => void;
}

export const defaultState: AuthStoreState = {
  isAuth: false,
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  login: async () => {},
  logout: async () => {},
  setUser: () => {},
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      login: async (payload: any) => {
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
      setUser: (user: GetMeQuery['getMe']) => {
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
