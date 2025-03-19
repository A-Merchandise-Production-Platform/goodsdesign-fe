import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

/** Authentication response */
export type AuthResponseDto = {
  __typename?: 'AuthResponseDto';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserEntity;
};

/** Blank Variances */
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
  products?: Maybe<Array<ProductEntity>>;
  totalProducts?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

/** Create Blank Variance */
export type CreateBlankVarianceDto = {
  blankPrice: Scalars['Int']['input'];
  information: Scalars['JSON']['input'];
  productId: Scalars['String']['input'];
};

/** Create category input */
export type CreateCategoryDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateDesignPositionDto = {
  designId: Scalars['String']['input'];
  designJSON: Scalars['JSON']['input'];
  productPositionTypeId: Scalars['String']['input'];
};

export type CreateNotificationDto = {
  content?: InputMaybe<Scalars['String']['input']>;
  isRead?: Scalars['Boolean']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateProductDesignDto = {
  blankVariantId: Scalars['String']['input'];
  isFinalized?: Scalars['Boolean']['input'];
  isPublic?: Scalars['Boolean']['input'];
  isTemplate?: Scalars['Boolean']['input'];
  saved3DPreviewUrl: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** Create Product */
export type CreateProductDto = {
  categoryId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  model3DUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateProductPositionTypeDto = {
  basePrice: Scalars['Int']['input'];
  positionName: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};

export type CreateSystemConfigBankDto = {
  bin: Scalars['String']['input'];
  code: Scalars['String']['input'];
  isActive?: Scalars['Boolean']['input'];
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
};

export type CreateSystemConfigColorDto = {
  code: Scalars['String']['input'];
  isActive?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateSystemConfigSizeDto = {
  code: Scalars['String']['input'];
  isActive?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

/** Create user input */
export type CreateUserDto = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  gender: Scalars['Boolean']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type DesignPositionEntity = {
  __typename?: 'DesignPositionEntity';
  design?: Maybe<ProductDesignEntity>;
  designId: Scalars['String']['output'];
  designJSON: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  positionType?: Maybe<ProductPositionTypeEntity>;
  productPositionTypeId: Scalars['String']['output'];
};

/** Login input */
export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlankVariance: BlankVariancesEntity;
  createCategory: CategoryEntity;
  createDesignPosition: DesignPositionEntity;
  createNotification: NotificationEntity;
  createProduct: ProductEntity;
  createProductDesign: ProductDesignEntity;
  createProductPositionType: ProductPositionTypeEntity;
  createSystemConfigBank: SystemConfigBankEntity;
  createSystemConfigColor: SystemConfigColorEntity;
  createSystemConfigSize: SystemConfigSizeEntity;
  createUser: UserEntity;
  deleteBlankVariance: BlankVariancesEntity;
  deleteCategory: CategoryEntity;
  deleteProduct: ProductEntity;
  deleteUser: UserEntity;
  login: AuthResponseDto;
  logout: Scalars['String']['output'];
  markAllNotificationsAsRead: Array<NotificationEntity>;
  markNotificationAsRead: NotificationEntity;
  refreshToken: AuthResponseDto;
  register: AuthResponseDto;
  removeDesignPosition: DesignPositionEntity;
  removeNotification: NotificationEntity;
  removeProductDesign: ProductDesignEntity;
  removeProductPositionType: ProductPositionTypeEntity;
  removeSystemConfigBank: SystemConfigBankEntity;
  removeSystemConfigColor: SystemConfigColorEntity;
  removeSystemConfigSize: SystemConfigSizeEntity;
  restoreCategory: CategoryEntity;
  restoreProduct: ProductEntity;
  toggleActiveCategory: CategoryEntity;
  toggleActiveProduct: ProductEntity;
  updateBlankVariance: BlankVariancesEntity;
  updateCategory: CategoryEntity;
  updateDesignPosition: DesignPositionEntity;
  updateNotification: NotificationEntity;
  updateProduct: ProductEntity;
  updateProductDesign: ProductDesignEntity;
  updateProductPositionType: ProductPositionTypeEntity;
  updateSystemConfigBank: SystemConfigBankEntity;
  updateSystemConfigColor: SystemConfigColorEntity;
  updateSystemConfigSize: SystemConfigSizeEntity;
  updateUser: UserEntity;
};

export type MutationCreateBlankVarianceArgs = {
  createBlankVarianceInput: CreateBlankVarianceDto;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryDto;
};

export type MutationCreateDesignPositionArgs = {
  input: CreateDesignPositionDto;
};

export type MutationCreateNotificationArgs = {
  input: CreateNotificationDto;
};

export type MutationCreateProductArgs = {
  input: CreateProductDto;
};

export type MutationCreateProductDesignArgs = {
  input: CreateProductDesignDto;
};

export type MutationCreateProductPositionTypeArgs = {
  input: CreateProductPositionTypeDto;
};

export type MutationCreateSystemConfigBankArgs = {
  input: CreateSystemConfigBankDto;
};

export type MutationCreateSystemConfigColorArgs = {
  input: CreateSystemConfigColorDto;
};

export type MutationCreateSystemConfigSizeArgs = {
  input: CreateSystemConfigSizeDto;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};

export type MutationDeleteBlankVarianceArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  loginInput: LoginDto;
};

export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenDto;
};

export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};

export type MutationRemoveDesignPositionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveNotificationArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveProductDesignArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveProductPositionTypeArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveSystemConfigBankArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveSystemConfigColorArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveSystemConfigSizeArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRestoreCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationRestoreProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationToggleActiveCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationToggleActiveProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateBlankVarianceArgs = {
  id: Scalars['String']['input'];
  updateBlankVarianceInput: UpdateBlankVarianceDto;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  updateCategoryInput: UpdateCategoryDto;
};

export type MutationUpdateDesignPositionArgs = {
  input: UpdateDesignPositionDto;
};

export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationDto;
};

export type MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  input: UpdateProductDto;
};

export type MutationUpdateProductDesignArgs = {
  input: UpdateProductDesignDto;
};

export type MutationUpdateProductPositionTypeArgs = {
  input: UpdateProductPositionTypeDto;
};

export type MutationUpdateSystemConfigBankArgs = {
  input: UpdateSystemConfigBankDto;
};

export type MutationUpdateSystemConfigColorArgs = {
  input: UpdateSystemConfigColorDto;
};

export type MutationUpdateSystemConfigSizeArgs = {
  input: UpdateSystemConfigSizeDto;
};

export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserDto;
};

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserEntity>;
  userId: Scalars['String']['output'];
};

export type ProductDesignEntity = {
  __typename?: 'ProductDesignEntity';
  blankVariant?: Maybe<BlankVariancesEntity>;
  blankVariantId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  designPositions?: Maybe<Array<DesignPositionEntity>>;
  id: Scalars['ID']['output'];
  isFinalized: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isTemplate: Scalars['Boolean']['output'];
  saved3DPreviewUrl: Scalars['String']['output'];
  user?: Maybe<UserEntity>;
  userId: Scalars['String']['output'];
};

/** Product */
export type ProductEntity = {
  __typename?: 'ProductEntity';
  blankVariances?: Maybe<Array<BlankVariancesEntity>>;
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
  positionTypes?: Maybe<Array<ProductPositionTypeEntity>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ProductPositionTypeEntity = {
  __typename?: 'ProductPositionTypeEntity';
  basePrice: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  positionName: Scalars['String']['output'];
  positionTypes?: Maybe<Array<ProductPositionTypeEntity>>;
  product?: Maybe<ProductEntity>;
  productId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  blankVariance?: Maybe<BlankVariancesEntity>;
  blankVariances: Array<BlankVariancesEntity>;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  designPosition: DesignPositionEntity;
  designPositions: Array<DesignPositionEntity>;
  getMe: UserEntity;
  notification: NotificationEntity;
  notifications: Array<NotificationEntity>;
  product: ProductEntity;
  productDesign: ProductDesignEntity;
  productDesigns: Array<ProductDesignEntity>;
  productPositionType: ProductPositionTypeEntity;
  productPositionTypes: Array<ProductPositionTypeEntity>;
  products: Array<ProductEntity>;
  systemConfigBank: SystemConfigBankEntity;
  systemConfigBanks: Array<SystemConfigBankEntity>;
  systemConfigColor: SystemConfigColorEntity;
  systemConfigColors: Array<SystemConfigColorEntity>;
  systemConfigSize: SystemConfigSizeEntity;
  systemConfigSizes: Array<SystemConfigSizeEntity>;
  user: UserEntity;
  users: Array<UserEntity>;
};

export type QueryBlankVarianceArgs = {
  id: Scalars['String']['input'];
};

export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};

export type QueryDesignPositionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryDesignPositionsArgs = {
  designId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProductArgs = {
  id: Scalars['String']['input'];
};

export type QueryProductDesignArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProductDesignsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryProductPositionTypeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProductPositionTypesArgs = {
  productId: Scalars['String']['input'];
};

export type QuerySystemConfigBankArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySystemConfigColorArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySystemConfigSizeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

/** Refresh token input */
export type RefreshTokenDto = {
  refreshToken: Scalars['String']['input'];
};

/** Register input */
export type RegisterDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** User roles */
export enum Roles {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Factoryowner = 'FACTORYOWNER',
  Manager = 'MANAGER',
  Staff = 'STAFF',
}

export type SystemConfigBankEntity = {
  __typename?: 'SystemConfigBankEntity';
  bin: Scalars['String']['output'];
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type SystemConfigColorEntity = {
  __typename?: 'SystemConfigColorEntity';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type SystemConfigSizeEntity = {
  __typename?: 'SystemConfigSizeEntity';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

/** Update Blank Variance */
export type UpdateBlankVarianceDto = {
  blankPrice?: InputMaybe<Scalars['Int']['input']>;
  information?: InputMaybe<Scalars['JSON']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
};

/** Update category input */
export type UpdateCategoryDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDesignPositionDto = {
  designJSON?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateNotificationDto = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductDesignDto = {
  id: Scalars['ID']['input'];
  isFinalized?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  saved3DPreviewUrl?: InputMaybe<Scalars['String']['input']>;
};

/** Update Product */
export type UpdateProductDto = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  model3DUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductPositionTypeDto = {
  basePrice?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  positionName?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSystemConfigBankDto = {
  bin?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSystemConfigColorDto = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSystemConfigSizeDto = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Update user input */
export type UpdateUserDto = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
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

export type LoginMutationVariables = Exact<{
  loginInput: LoginDto;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthResponseDto';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'UserEntity';
      createdAt: any;
      dateOfBirth?: any | null;
      email?: string | null;
      gender: boolean;
      id: string;
      imageUrl?: string | null;
      isActive: boolean;
      name?: string | null;
      phoneNumber?: string | null;
      role: Roles;
      updatedAt?: any | null;
    };
  };
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterDto;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'AuthResponseDto';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'UserEntity';
      createdAt: any;
      dateOfBirth?: any | null;
      email?: string | null;
      gender: boolean;
      id: string;
      imageUrl?: string | null;
      isActive: boolean;
      name?: string | null;
      phoneNumber?: string | null;
      role: Roles;
      updatedAt?: any | null;
    };
  };
};

export type RefreshTokenMutationVariables = Exact<{
  refreshTokenInput: RefreshTokenDto;
}>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken: {
    __typename?: 'AuthResponseDto';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'UserEntity';
      createdAt: any;
      dateOfBirth?: any | null;
      email?: string | null;
      gender: boolean;
      id: string;
      imageUrl?: string | null;
      isActive: boolean;
      name?: string | null;
      phoneNumber?: string | null;
      role: Roles;
      updatedAt?: any | null;
    };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: string };

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: 'Query';
  getMe: {
    __typename?: 'UserEntity';
    createdAt: any;
    dateOfBirth?: any | null;
    email?: string | null;
    gender: boolean;
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    updatedAt?: any | null;
  };
};

export const LoginDocument = gql`
  mutation Login($loginInput: LoginDto!) {
    login(loginInput: $loginInput) {
      accessToken
      refreshToken
      user {
        createdAt
        dateOfBirth
        email
        gender
        id
        imageUrl
        isActive
        name
        phoneNumber
        role
        updatedAt
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($registerInput: RegisterDto!) {
    register(registerInput: $registerInput) {
      accessToken
      refreshToken
      user {
        createdAt
        dateOfBirth
        email
        gender
        id
        imageUrl
        isActive
        name
        phoneNumber
        role
        updatedAt
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken($refreshTokenInput: RefreshTokenDto!) {
    refreshToken(refreshTokenInput: $refreshTokenInput) {
      accessToken
      refreshToken
      user {
        createdAt
        dateOfBirth
        email
        gender
        id
        imageUrl
        isActive
        name
        phoneNumber
        role
        updatedAt
      }
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshTokenInput: // value for 'refreshTokenInput'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const GetMeDocument = gql`
  query GetMe {
    getMe {
      createdAt
      dateOfBirth
      email
      gender
      id
      imageUrl
      isActive
      name
      phoneNumber
      role
      updatedAt
    }
  }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  );
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  );
}
export function useGetMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<
  typeof useGetMeSuspenseQuery
>;
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>;
