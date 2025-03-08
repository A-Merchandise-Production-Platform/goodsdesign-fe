export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type GraphQlUser = {
  __typename?: 'GraphQLUser';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gender: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role: Roles;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type MonthlyUserGrowth = {
  __typename?: 'MonthlyUserGrowth';
  month: Scalars['String']['output'];
  users: Scalars['Int']['output'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  items: Array<GraphQlUser>;
  meta: PaginationMeta;
};

export type PaginationInput = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  model3DUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  products: Array<Product>;
  systemConfigBanks: Array<SystemConfigBank>;
  user: GraphQlUser;
  userAnalytics: UserAnalytics;
  users: PaginatedUsers;
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
};

export type RoleDistribution = {
  __typename?: 'RoleDistribution';
  count: Scalars['Int']['output'];
  role: Scalars['String']['output'];
};

/** User roles */
export enum Roles {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Factoryowner = 'FACTORYOWNER',
  Manager = 'MANAGER',
  Staff = 'STAFF',
}

/** Sort order */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SystemConfigBank = {
  __typename?: 'SystemConfigBank';
  bin: Scalars['String']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isTransfer: Scalars['Boolean']['output'];
  logo: Scalars['String']['output'];
  lookupSupported: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  support: Scalars['Int']['output'];
  swiftCode?: Maybe<Scalars['String']['output']>;
  transferSupported: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type UserAnalytics = {
  __typename?: 'UserAnalytics';
  monthlyGrowth: Array<MonthlyUserGrowth>;
  roleDistribution: Array<RoleDistribution>;
  stats: UserStats;
};

export type UserFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  role?: InputMaybe<Roles>;
  sort?: InputMaybe<UserSort>;
};

export type UserSort = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserStats = {
  __typename?: 'UserStats';
  activeUsers: Scalars['Int']['output'];
  newUsersLast30Days: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type UserAnalyticsQueryVariables = Exact<{ [key: string]: never }>;

export type UserAnalyticsQuery = {
  __typename?: 'Query';
  userAnalytics: {
    __typename?: 'UserAnalytics';
    monthlyGrowth: Array<{
      __typename?: 'MonthlyUserGrowth';
      month: string;
      users: number;
    }>;
    roleDistribution: Array<{
      __typename?: 'RoleDistribution';
      count: number;
      role: string;
    }>;
    stats: {
      __typename?: 'UserStats';
      activeUsers: number;
      newUsersLast30Days: number;
      totalUsers: number;
    };
  };
};

export type GetUsersQueryVariables = Exact<{
  filter?: InputMaybe<UserFilter>;
}>;

export type GetUsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'PaginatedUsers';
    meta: {
      __typename?: 'PaginationMeta';
      limit: number;
      page: number;
      total: number;
      totalPages: number;
    };
    items: Array<{
      __typename?: 'GraphQLUser';
      id: string;
      gender: boolean;
      email?: string | null;
      createdAt: any;
      imageUrl?: string | null;
      name?: string | null;
      role: Roles;
      createdBy?: string | null;
      dateOfBirth?: any | null;
      deletedAt?: any | null;
      deletedBy?: string | null;
      isActive: boolean;
      isDeleted: boolean;
      phoneNumber?: string | null;
      updatedAt?: any | null;
      updatedBy?: string | null;
    }>;
  };
};
