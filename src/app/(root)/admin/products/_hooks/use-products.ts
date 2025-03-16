import { GetAllProductsQuery } from '@/graphql/generated';
import { graphqlClient } from '@/lib/graphql-client';
import { useQuery } from '@tanstack/react-query';

const GET_PRODUCTS_QUERY = `
  query Products {
  products {
    category {
      id
      name
      imageUrl
      description
    }
    id
    imageUrl
    name
    updatedAt
    createdAt
    description
  }
}
`;

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () =>
      graphqlClient.request<GetAllProductsQuery>(GET_PRODUCTS_QUERY),
  });
}
