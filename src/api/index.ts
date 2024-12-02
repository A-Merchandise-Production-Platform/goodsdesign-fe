import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/auth.store';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = useAuthStore.getState();
        if (refreshToken) {
          const response = await authApi.refreshToken(refreshToken);

          useAuthStore.setState({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        useAuthStore.setState({
          accessToken: undefined,
          refreshToken: undefined,
          isAuth: false,
          user: undefined,
        });
        throw error;
      }
    }
  },
);
