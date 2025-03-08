import {
  UserAnalyticsQuery,
  UserAnalyticsQueryVariables,
} from '@/graphql/generated';
import { graphqlClient } from '@/lib/graphql-client';
import { useQuery } from '@tanstack/react-query';

const GET_USERS_ANALYTICS_QUERY = `
  query UserAnalytics {
  userAnalytics {
    monthlyGrowth {
      month
      users
    }
    roleDistribution {
      count
      role
    }
    stats {
      activeUsers
      newUsersLast30Days
      totalUsers
    }
  }
}

`;

export function useUsersAnalytics() {
  return useQuery({
    queryKey: ['users_analytics'],
    queryFn: async () => {
      return graphqlClient.request<
        UserAnalyticsQuery,
        UserAnalyticsQueryVariables
      >(GET_USERS_ANALYTICS_QUERY);
    },
  });
}
