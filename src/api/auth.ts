import { axiosInstance } from '@/api';
import {
  GetMeResponse,
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RegisterFOPayload,
  RegisterPayload,
  RegisterResponse,
} from '@/api/types/auth';

export namespace AuthApi {
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
    const response = await axiosInstance.get<GetMeResponse>('/auth/me');

    return response.data;
  }

  export async function refreshToken(
    refreshToken: string,
  ): Promise<LoginResponse> {
    const response = await axiosInstance.post<RefreshTokenResponse>(
      '/auth/refresh',
      {
        refreshToken,
      },
    );

    return response.data;
  }

  export async function logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  }

  export async function registerFactoryOwner(payload: RegisterFOPayload) {
    const response = await axiosInstance.post<RegisterFOPayload>(
      '/auth/register-factory-owner',
      payload,
    );
    return response.data;
  }
}
