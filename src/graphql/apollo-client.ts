import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';

import { envConfig } from '@/constant';
import { RefreshTokenDocument } from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';

const authLink = setContext((_, { headers }) => {
  const { accessToken } = useAuthStore.getState();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (
          err.extensions?.code === 'UNAUTHENTICATED' ||
          err.extensions?.code === '401'
        ) {
          // Get the refresh token from the store
          const { refreshToken } = useAuthStore.getState();

          // Create a new client for the refresh token mutation
          const client = new ApolloClient({
            link: new HttpLink({
              uri: envConfig().apiUrl + '/graphql',
            }),
            cache: new InMemoryCache(),
            defaultOptions,
          });

          // Execute the refresh token mutation
          return new Observable(observer => {
            client
              .mutate({
                mutation: RefreshTokenDocument,
                variables: {
                  refreshTokenInput: {
                    refreshToken,
                  },
                },
              })
              .then(({ data }) => {
                // Update the auth store with the new tokens
                useAuthStore.getState().login({
                  accessToken: data.refreshToken.accessToken,
                  refreshToken: data.refreshToken.refreshToken,
                  user: data.refreshToken.user,
                });

                // Retry the failed operation with the new token
                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch(() => {
                // If refresh token fails, clear the auth store and redirect to login
                useAuthStore.getState().logout();
                window.location.href = '/login';
                observer.error(new Error('Token refresh failed'));
              });
          });
        }
      }
    }

    if (networkError) {
      if ('statusCode' in networkError && networkError.statusCode === 401) {
        // Handle network 401 error similarly to graphQL errors
        const { refreshToken } = useAuthStore.getState();

        const client = new ApolloClient({
          link: new HttpLink({
            uri: envConfig().apiUrl + '/graphql',
          }),
          cache: new InMemoryCache(),
          defaultOptions,
        });

        return new Observable(observer => {
          client
            .mutate({
              mutation: RefreshTokenDocument,
              variables: {
                refreshTokenInput: {
                  refreshToken,
                },
              },
            })
            .then(({ data }) => {
              useAuthStore.getState().login({
                accessToken: data.refreshToken.accessToken,
                refreshToken: data.refreshToken.refreshToken,
                user: data.refreshToken.user,
              });
              forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch(() => {
              useAuthStore.getState().logout();
              window.location.href = '/login';
              observer.error(new Error('Token refresh failed'));
            });
        });
      }
    }
  },
);

const httpLink = new HttpLink({
  uri: envConfig().apiUrl + '/graphql',
});

export const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions,
});

export default client;
