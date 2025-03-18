import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { AuthApi } from '@/api/auth';
import { useAuthStore } from '@/stores/auth.store';

const baseUrl = process.env.API_URL;

const resetAuthState = () => {
  useAuthStore.setState({
    accessToken: undefined,
    refreshToken: undefined,
    isAuth: false,
    user: undefined,
  });
};

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
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      resetAuthState();
      return Promise.reject(error);
    }

    try {
      const response = await AuthApi.refreshToken(refreshToken)
        .then(res => {
          useAuthStore.setState({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          return axiosInstance(originalRequest);
        })
        .catch(() => {
          resetAuthState();
          return Promise.reject(error);
        })
        .finally(() => {
          originalRequest._retry = false;
        });
      return response;
    } catch (refreshError) {
      resetAuthState();
      return Promise.reject(error);
    } finally {
      originalRequest._retry = false;
    }
  },
);
