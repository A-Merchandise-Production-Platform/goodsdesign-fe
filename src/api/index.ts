import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { AuthApi } from '@/api/auth';
import { useAuthStore } from '@/stores/auth.store';

const baseUrl = process.env.API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosFormDataInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
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
      _isRetry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest._isRetry) {
        useAuthStore.setState({
          accessToken: undefined,
          refreshToken: undefined,
          isAuth: false,
          user: undefined,
        });
        throw error;
      } else {
        try {
          const { refreshToken } = useAuthStore.getState();
          if (refreshToken) {
            originalRequest._isRetry = true;
            AuthApi.refreshToken(refreshToken)
              .then(response => {
                useAuthStore.setState({
                  accessToken: response.data.accessToken,
                  refreshToken: response.data.refreshToken,
                });
                return axiosInstance(originalRequest);
              })
              .catch(() => {
                useAuthStore.setState({
                  accessToken: undefined,
                  refreshToken: undefined,
                  isAuth: false,
                  user: undefined,
                });
                throw error;
              })
              .finally(() => {
                originalRequest._isRetry = false;
              });

            return axiosInstance(originalRequest);
          } else {
            throw error;
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
    } else {
      throw error;
    }
  },
);
