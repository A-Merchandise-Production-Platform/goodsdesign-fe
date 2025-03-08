import { useAuthStore } from '@/stores/auth.store';
import { GraphQLClient } from 'graphql-request';

const endpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: () => {
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
    return headers;
  },
});
