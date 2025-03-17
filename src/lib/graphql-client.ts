import { useAuthStore } from '@/stores/auth.store';
import { GraphQLClient } from 'graphql-request';
import { AuthApi } from '@/api/auth';

const endpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  requestMiddleware: async request => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token =
      typeof window !== 'undefined'
        ? useAuthStore.getState().accessToken
        : null;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    request.headers = headers;
    return request;
  },
});

// Function to handle unauthorized errors
export const handleUnauthorizedError = async (error: any) => {
  if (error?.response?.status === 401) {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) {
      useAuthStore.setState({
        accessToken: undefined,
        refreshToken: undefined,
        isAuth: false,
        user: undefined,
      });
      throw error;
    }

    try {
      const refreshResponse = await AuthApi.refreshToken(refreshToken);
      useAuthStore.setState({
        accessToken: refreshResponse.accessToken,
        refreshToken: refreshResponse.refreshToken,
      });

      // The calling code will need to retry its original request
      return true;
    } catch (refreshError) {
      useAuthStore.setState({
        accessToken: undefined,
        refreshToken: undefined,
        isAuth: false,
        user: undefined,
      });
      throw error;
    }
  }
  throw error;
};
