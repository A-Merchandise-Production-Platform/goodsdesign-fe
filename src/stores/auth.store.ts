import { User } from '@/types/user'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthStoreState {
  isAuth: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
}

export const defaultState: AuthStoreState = {
  isAuth: false,
  user: null,
  accessToken: null,
  refreshToken: null,
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      ...defaultState,
      login: (user: User, accessToken: string, refreshToken: string) => {
        set({ isAuth: true, user, accessToken, refreshToken })
      },
      logout: () => {
        set(defaultState)
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
