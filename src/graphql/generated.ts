export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type BlankVariancesEntity = {
  __typename?: 'BlankVariancesEntity';
  blankPrice: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  information: Scalars['JSON']['output'];
  product?: Maybe<ProductEntity>;
  productId: Scalars['String']['output'];
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
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
  totalProducts?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type MonthlyGrowth = {
  __typename?: 'MonthlyGrowth';
  month: Scalars['String']['output'];
  users: Scalars['Float']['output'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  items: Array<UserEntity>;
  meta: PaginationMeta;
};

export type PaginationInput = {
  limit?: Scalars['Float']['input'];
  page?: Scalars['Float']['input'];
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type ProductEntity = {
  __typename?: 'ProductEntity';
  category?: Maybe<CategoryEntity>;
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
  blankVariance?: Maybe<BlankVariancesEntity>;
  blankVariances: Array<BlankVariancesEntity>;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  products: Array<ProductEntity>;
  systemConfigBanks: Array<SystemConfigBank>;
  user: UserEntity;
  userAnalytics: UserAnalyticsEntity;
  users: PaginatedUsers;
};


export type QueryBlankVarianceArgs = {
  id: Scalars['String']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
};

export type RoleDistribution = {
  __typename?: 'RoleDistribution';
  count: Scalars['Float']['output'];
  role: Roles;
};

/** User roles */
export enum Roles {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Factoryowner = 'FACTORYOWNER',
  Manager = 'MANAGER',
  Staff = 'STAFF'
}

export type SortInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};

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

export type UserAnalyticsEntity = {
  __typename?: 'UserAnalyticsEntity';
  monthlyGrowth: Array<MonthlyGrowth>;
  roleDistribution: Array<RoleDistribution>;
  stats: UserAnalyticsStats;
};

export type UserAnalyticsStats = {
  __typename?: 'UserAnalyticsStats';
  activeUsers: Scalars['Float']['output'];
  newUsersLast30Days: Scalars['Float']['output'];
  totalUsers: Scalars['Float']['output'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
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

export type UserFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  role?: InputMaybe<Roles>;
  sort?: InputMaybe<SortInput>;
};

export type GetCategoryQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'CategoryEntity', createdAt: any, description?: string | null, id: string, imageUrl?: string | null, isActive: boolean, name: string, totalProducts?: number | null, updatedAt?: any | null } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryEntity', createdAt: any, description?: string | null, id: string, imageUrl?: string | null, isActive: boolean, name: string, totalProducts?: number | null, updatedAt?: any | null }> };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductEntity', id: string, name: string, imageUrl?: string | null, createdAt: any, deletedAt?: any | null, isActive: boolean, updatedAt?: any | null, category?: { __typename?: 'CategoryEntity', id: string, imageUrl?: string | null, isActive: boolean, name: string, description?: string | null, createdAt: any, createdBy?: string | null, totalProducts?: number | null } | null }> };

export type UserAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAnalyticsQuery = { __typename?: 'Query', userAnalytics: { __typename?: 'UserAnalyticsEntity', monthlyGrowth: Array<{ __typename?: 'MonthlyGrowth', month: string, users: number }>, roleDistribution: Array<{ __typename?: 'RoleDistribution', count: number, role: Roles }>, stats: { __typename?: 'UserAnalyticsStats', activeUsers: number, newUsersLast30Days: number, totalUsers: number } } };

export type GetUsersQueryVariables = Exact<{
  filter?: InputMaybe<UserFilter>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', meta: { __typename?: 'PaginationMeta', limit: number, page: number, total: number, totalPages: number }, items: Array<{ __typename?: 'UserEntity', id: string, gender: boolean, email?: string | null, createdAt: any, imageUrl?: string | null, name?: string | null, role: Roles, createdBy?: string | null, dateOfBirth?: any | null, deletedAt?: any | null, deletedBy?: string | null, isActive: boolean, isDeleted: boolean, phoneNumber?: string | null, updatedAt?: any | null, updatedBy?: string | null }> } };
