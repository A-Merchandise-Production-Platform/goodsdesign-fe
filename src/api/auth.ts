import { axiosInstance } from '@/api';
import {
  GetMeResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/api/types/auth';

export namespace authApi {
  export async function register(
    payload: RegisterPayload,
  ): Promise<RegisterResponse> {
    const response = await axiosInstance.post<RegisterResponse>(
      '/auth/register',
      payload,
    );

    return response.data;
  }

  export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      '/auth/login',
      payload,
    );

    return response.data;
  }

  export async function getMe(): Promise<GetMeResponse> {
    const response = await axiosInstance.get<GetMeResponse>('/auth/get-me');

    return response.data;
  }

  export async function refreshToken(
    refreshToken: string,
  ): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      '/auth/refresh-tokens',
      {
        refreshToken,
      },
    );

    return response.data;
  }
}
