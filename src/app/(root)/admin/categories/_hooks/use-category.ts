import { GetAllCategoryQuery } from '@/graphql/generated';
import { graphqlClient } from '@/lib/graphql-client';
import { useQuery } from '@tanstack/react-query';

const GET_CATEGORIES_QUERY = `
  query Categories {
  categories {
    createdAt
    description
    id
    imageUrl
    isActive
    name
    totalProducts
    updatedAt
  }
}
`;

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      graphqlClient.request<GetAllCategoryQuery>(GET_CATEGORIES_QUERY),
  });
}
