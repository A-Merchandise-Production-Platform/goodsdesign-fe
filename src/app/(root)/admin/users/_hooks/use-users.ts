import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import {
  GetUsersQuery,
  GetUsersQueryVariables,
} from '@/graphql/generated/graphql';

const GET_USERS_QUERY = `
  query GetUsers($filter: UserFilter) {
    users(filter: $filter) {
    meta {
      limit
      page
      total
      totalPages
    }
    items {
      createdAt
      imageUrl
      name
      role
      updatedAt
      id
      phoneNumber
      email
      isActive
    }
  }
  }
`;

export function useUsers(filter?: GetUsersQueryVariables['filter']) {
  return useQuery({
    queryKey: ['users', filter],
    queryFn: async () => {
      return graphqlClient.request<GetUsersQuery, GetUsersQueryVariables>(
        GET_USERS_QUERY,
        { filter: filter || {} },
      );
    },
  });
}
