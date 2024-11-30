import { axiosInstance } from '@/api'
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/api/types/auth'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export namespace authApi {
  export async function register(
    payload: RegisterPayload
  ): Promise<RegisterResponse | null> {
    const response = (
      await axiosInstance.post<RegisterResponse>('/auth/register', payload)
    ).data
    return response
  }

  export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = (
      await axiosInstance.post<LoginResponse>('/auth/login', payload)
    ).data
    return response
  }
}
