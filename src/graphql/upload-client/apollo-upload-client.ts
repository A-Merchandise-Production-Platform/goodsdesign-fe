import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

import { envConfig } from '@/constant';
import { useAuthStore } from '@/stores/auth.store';
import { defaultOptions } from '../apollo-client';

const authLink = setContext((_, { headers }) => {
  const { accessToken } = useAuthStore.getState();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const uploadLink = createUploadLink({
  uri: envConfig().apiUrl + '/graphql',
});

const uploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
  defaultOptions: defaultOptions
});

export default uploadClient;
