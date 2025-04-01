import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

import { useAuthStore } from '@/stores/auth.store';
import { envConfig } from '@/constant';

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
  uri: envConfig().apiUrl,
});

const uploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
});

export default uploadClient;
