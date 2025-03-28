import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
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

export type CalculateShippingFeeDto = {
  fromDistrictId: Scalars['Int']['input'];
  fromWardCode: Scalars['String']['input'];
  height?: InputMaybe<Scalars['Int']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  serviceTypeId?: InputMaybe<Scalars['Int']['input']>;
  toDistrictId: Scalars['Int']['input'];
  toWardCode: Scalars['String']['input'];
  weight?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type CartItemEntity = {
  __typename?: 'CartItemEntity';
  createdAt: Scalars['DateTime']['output'];
  designId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
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

export type CreateCartItemDto = {
  designId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
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

export type CreateOrderDetailDto = {
  designId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateOrderDto = {
  orderDetails: Array<CreateOrderDetailDto>;
  shippingPrice: Scalars['Int']['input'];
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
  gender?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerOrderDetailEntity = {
  __typename?: 'CustomerOrderDetailEntity';
  designId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  orderId: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  qualityCheckStatus: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  reworkStatus: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type CustomerOrderEntity = {
  __typename?: 'CustomerOrderEntity';
  customerId: Scalars['String']['output'];
  depositPaid: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderDate: Scalars['DateTime']['output'];
  orderDetails?: Maybe<Array<CustomerOrderDetailEntity>>;
  shippingPrice: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  totalPrice: Scalars['Int']['output'];
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

export type District = {
  __typename?: 'District';
  districtId: Scalars['Int']['output'];
  districtName: Scalars['String']['output'];
  provinceId: Scalars['Int']['output'];
};

export type FactoryEntity = {
  __typename?: 'FactoryEntity';
  addressId?: Maybe<Scalars['String']['output']>;
  businessLicenseUrl?: Maybe<Scalars['String']['output']>;
  contactPersonName?: Maybe<Scalars['String']['output']>;
  contactPersonPhone?: Maybe<Scalars['String']['output']>;
  contactPersonRole?: Maybe<Scalars['String']['output']>;
  contractAccepted?: Maybe<Scalars['Boolean']['output']>;
  contractAcceptedAt?: Maybe<Scalars['DateTime']['output']>;
  contractUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  establishedDate?: Maybe<Scalars['DateTime']['output']>;
  factoryStatus?: Maybe<FactoryStatus>;
  isSubmitted?: Maybe<Scalars['Boolean']['output']>;
  leadTime?: Maybe<Scalars['Int']['output']>;
  maxPrintingCapacity?: Maybe<Scalars['Int']['output']>;
  minimumOrderQuantity?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  operationalHours?: Maybe<Scalars['String']['output']>;
  owner: UserEntity;
  printingMethods: Array<Scalars['String']['output']>;
  products: Array<ProductEntity>;
  qualityCertifications?: Maybe<Scalars['String']['output']>;
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewedBy?: Maybe<Scalars['String']['output']>;
  specializations: Array<Scalars['String']['output']>;
  statusNote?: Maybe<Scalars['String']['output']>;
  taxIdentificationNumber?: Maybe<Scalars['String']['output']>;
  totalEmployees?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export enum FactoryStatus {
  Approved = 'APPROVED',
  PendingApproval = 'PENDING_APPROVAL',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED'
}

export type FileUploadResponse = {
  __typename?: 'FileUploadResponse';
  url: Scalars['String']['output'];
};

export type GetAvailableServicesDto = {
  fromDistrict: Scalars['Int']['input'];
  toDistrict: Scalars['Int']['input'];
};

/** Login input */
export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  calculateShippingFee: ShippingFee;
  clearCart: Scalars['Boolean']['output'];
  createBlankVariance: BlankVariancesEntity;
  createCartItem: CartItemEntity;
  createCategory: CategoryEntity;
  createDesignPosition: DesignPositionEntity;
  createNotification: NotificationEntity;
  createOrder: CustomerOrderEntity;
  createProduct: ProductEntity;
  createProductDesign: ProductDesignEntity;
  createProductPositionType: ProductPositionTypeEntity;
  createSystemConfigBank: SystemConfigBankEntity;
  createSystemConfigColor: SystemConfigColorEntity;
  createSystemConfigSize: SystemConfigSizeEntity;
  createUser: UserEntity;
  deleteBlankVariance: BlankVariancesEntity;
  deleteCartItem: CartItemEntity;
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
  updateCartItem: CartItemEntity;
  updateCategory: CategoryEntity;
  updateDesignPosition: DesignPositionEntity;
  updateFactoryInfo: FactoryEntity;
  updateNotification: NotificationEntity;
  updateProduct: ProductEntity;
  updateProductDesign: ProductDesignEntity;
  updateProductPositionType: ProductPositionTypeEntity;
  updateSystemConfigBank: SystemConfigBankEntity;
  updateSystemConfigColor: SystemConfigColorEntity;
  updateSystemConfigSize: SystemConfigSizeEntity;
  updateUser: UserEntity;
  uploadFile: FileUploadResponse;
};


export type MutationCalculateShippingFeeArgs = {
  input: CalculateShippingFeeDto;
};


export type MutationCreateBlankVarianceArgs = {
  createBlankVarianceInput: CreateBlankVarianceDto;
};


export type MutationCreateCartItemArgs = {
  createCartItemInput: CreateCartItemDto;
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


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderDto;
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


export type MutationDeleteCartItemArgs = {
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


export type MutationUpdateCartItemArgs = {
  id: Scalars['String']['input'];
  updateCartItemInput: UpdateCartItemDto;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  updateCategoryInput: UpdateCategoryDto;
};


export type MutationUpdateDesignPositionArgs = {
  input: UpdateDesignPositionDto;
};


export type MutationUpdateFactoryInfoArgs = {
  updateFactoryInfoInput: UpdateFactoryInfoDto;
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


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
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

export type Province = {
  __typename?: 'Province';
  provinceId: Scalars['Int']['output'];
  provinceName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allCartItems: Array<CartItemEntity>;
  availableServices: Array<ShippingService>;
  blankVariance?: Maybe<BlankVariancesEntity>;
  blankVariances: Array<BlankVariancesEntity>;
  cartItem: CartItemEntity;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  designPosition: DesignPositionEntity;
  designPositions: Array<DesignPositionEntity>;
  district: District;
  districts: Array<District>;
  getMe: UserEntity;
  getMyFactory: FactoryEntity;
  notification: NotificationEntity;
  notifications: Array<NotificationEntity>;
  product: ProductEntity;
  productDesign: ProductDesignEntity;
  productDesigns: Array<ProductDesignEntity>;
  productPositionType: ProductPositionTypeEntity;
  productPositionTypes: Array<ProductPositionTypeEntity>;
  products: Array<ProductEntity>;
  province: Province;
  provinces: Array<Province>;
  systemConfigBank: SystemConfigBankEntity;
  systemConfigBanks: Array<SystemConfigBankEntity>;
  systemConfigColor: SystemConfigColorEntity;
  systemConfigColors: Array<SystemConfigColorEntity>;
  systemConfigSize: SystemConfigSizeEntity;
  systemConfigSizes: Array<SystemConfigSizeEntity>;
  user: UserEntity;
  userCartItems: Array<CartItemEntity>;
  userOrder: CustomerOrderEntity;
  userOrders: Array<CustomerOrderEntity>;
  users: Array<UserEntity>;
  ward: Ward;
  wards: Array<Ward>;
};


export type QueryAvailableServicesArgs = {
  servicesInput: GetAvailableServicesDto;
};


export type QueryBlankVarianceArgs = {
  id: Scalars['String']['input'];
};


export type QueryCartItemArgs = {
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


export type QueryDistrictArgs = {
  districtId: Scalars['Int']['input'];
};


export type QueryDistrictsArgs = {
  provinceId: Scalars['Int']['input'];
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


export type QueryProvinceArgs = {
  provinceId: Scalars['Int']['input'];
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


export type QueryUserOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryWardArgs = {
  wardCode: Scalars['String']['input'];
};


export type QueryWardsArgs = {
  districtId: Scalars['Int']['input'];
};

/** Refresh token input */
export type RefreshTokenDto = {
  refreshToken: Scalars['String']['input'];
};

/** Register input */
export type RegisterDto = {
  email: Scalars['String']['input'];
  /** True if registering as factory owner, false for customer */
  isFactoryOwner?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** User roles */
export enum Roles {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Factoryowner = 'FACTORYOWNER',
  Manager = 'MANAGER',
  Staff = 'STAFF'
}

export type ShippingFee = {
  __typename?: 'ShippingFee';
  total: Scalars['Int']['output'];
};

export type ShippingService = {
  __typename?: 'ShippingService';
  serviceId: Scalars['Int']['output'];
  serviceTypeId: Scalars['Int']['output'];
  shortName: Scalars['String']['output'];
};

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

export type UpdateCartItemDto = {
  quantity: Scalars['Int']['input'];
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

/** Update factory information input */
export type UpdateFactoryInfoDto = {
  addressId?: InputMaybe<Scalars['String']['input']>;
  businessLicenseUrl?: InputMaybe<Scalars['String']['input']>;
  contactPersonName?: InputMaybe<Scalars['String']['input']>;
  contactPersonPhone?: InputMaybe<Scalars['String']['input']>;
  contactPersonRole?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  establishedDate?: InputMaybe<Scalars['DateTime']['input']>;
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  maxPrintingCapacity?: InputMaybe<Scalars['Int']['input']>;
  minimumOrderQuantity?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  operationalHours?: InputMaybe<Scalars['String']['input']>;
  printingMethods?: InputMaybe<Array<Scalars['String']['input']>>;
  qualityCertifications?: InputMaybe<Scalars['String']['input']>;
  specializations?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Set to true to submit factory information for approval */
  submit?: InputMaybe<Scalars['Boolean']['input']>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  totalEmployees?: InputMaybe<Scalars['Int']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
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
  factory?: Maybe<FactoryEntity>;
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

export type Ward = {
  __typename?: 'Ward';
  districtId: Scalars['Int']['output'];
  wardCode: Scalars['String']['output'];
  wardName: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponseDto', accessToken: string, refreshToken: string, user: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, factory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponseDto', accessToken: string, refreshToken: string, user: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, factory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshTokenInput: RefreshTokenDto;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponseDto', accessToken: string, refreshToken: string, user: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, factory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, factory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryEntity', createdAt: any, description?: string | null, id: string, imageUrl?: string | null, isActive: boolean, name: string, totalProducts?: number | null, updatedAt?: any | null }> };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryDto;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryEntity', createdAt: any, description?: string | null, id: string, imageUrl?: string | null, isActive: boolean, name: string, totalProducts?: number | null, updatedAt?: any | null } };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'CategoryEntity', createdAt: any, description?: string | null, id: string, imageUrl?: string | null, isActive: boolean, name: string, totalProducts?: number | null, updatedAt?: any | null } };

export type GetMyFactoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFactoryQuery = { __typename?: 'Query', getMyFactory: { __typename?: 'FactoryEntity', addressId?: string | null, businessLicenseUrl?: string | null, contactPersonName?: string | null, contactPersonPhone?: string | null, contractUrl?: string | null, description?: string | null, establishedDate?: any | null, factoryStatus?: FactoryStatus | null, isSubmitted?: boolean | null, leadTime?: number | null, maxPrintingCapacity?: number | null, minimumOrderQuantity?: number | null, name: string, operationalHours?: string | null, printingMethods: Array<string>, qualityCertifications?: string | null, specializations: Array<string>, taxIdentificationNumber?: string | null, totalEmployees?: number | null, website?: string | null, owner: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null }, products: Array<{ __typename?: 'ProductEntity', id: string, imageUrl?: string | null, name: string }> } };

export type UpdateFactoryInfoMutationVariables = Exact<{
  updateFactoryInfoInput: UpdateFactoryInfoDto;
}>;


export type UpdateFactoryInfoMutation = { __typename?: 'Mutation', updateFactoryInfo: { __typename?: 'FactoryEntity', addressId?: string | null, businessLicenseUrl?: string | null, contactPersonName?: string | null, contactPersonPhone?: string | null, contractUrl?: string | null, description?: string | null, establishedDate?: any | null, factoryStatus?: FactoryStatus | null, isSubmitted?: boolean | null, leadTime?: number | null, maxPrintingCapacity?: number | null, minimumOrderQuantity?: number | null, name: string, operationalHours?: string | null, printingMethods: Array<string>, qualityCertifications?: string | null, specializations: Array<string>, taxIdentificationNumber?: string | null, totalEmployees?: number | null, website?: string | null, owner: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null }, products: Array<{ __typename?: 'ProductEntity', id: string, imageUrl?: string | null, name: string }> } };

export type CreateProductDesignMutationVariables = Exact<{
  input: CreateProductDesignDto;
}>;


export type CreateProductDesignMutation = { __typename?: 'Mutation', createProductDesign: { __typename?: 'ProductDesignEntity', id: string, blankVariant?: { __typename?: 'BlankVariancesEntity', blankPrice: number, information: any } | null } };

export type UpdateProductDesignMutationVariables = Exact<{
  input: UpdateProductDesignDto;
}>;


export type UpdateProductDesignMutation = { __typename?: 'Mutation', updateProductDesign: { __typename?: 'ProductDesignEntity', blankVariant?: { __typename?: 'BlankVariancesEntity', blankPrice: number, information: any } | null } };

export type ProductDesignQueryVariables = Exact<{
  productDesignId: Scalars['ID']['input'];
}>;


export type ProductDesignQuery = { __typename?: 'Query', productDesign: { __typename?: 'ProductDesignEntity', blankVariant?: { __typename?: 'BlankVariancesEntity', blankPrice: number, information: any } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', id: string, designJSON: any, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null } };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductEntity', id: string, imageUrl?: string | null, isActive: boolean, name: string, updatedAt?: any | null, createdAt: any, description?: string | null, category?: { __typename?: 'CategoryEntity', name: string } | null }> };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductEntity', id: string, imageUrl?: string | null, isActive: boolean, name: string, updatedAt?: any | null, createdAt: any, description?: string | null, category?: { __typename?: 'CategoryEntity', name: string } | null } };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'ProductEntity', id: string, imageUrl?: string | null, isActive: boolean, name: string, updatedAt?: any | null, createdAt: any, description?: string | null, category?: { __typename?: 'CategoryEntity', name: string } | null } };

export type GetAllSystemConfigBanksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSystemConfigBanksQuery = { __typename?: 'Query', systemConfigBanks: Array<{ __typename?: 'SystemConfigBankEntity', bin: string, code: string, id: string, isActive: boolean, isDeleted: boolean, logo: string, name: string, shortName: string }> };

export type GetSystemConfigBankByIdQueryVariables = Exact<{
  systemConfigBankId: Scalars['ID']['input'];
}>;


export type GetSystemConfigBankByIdQuery = { __typename?: 'Query', systemConfigBank: { __typename?: 'SystemConfigBankEntity', bin: string, code: string, id: string, isActive: boolean, isDeleted: boolean, logo: string, name: string, shortName: string } };

export type CreateSystemConfigBankMutationVariables = Exact<{
  input: CreateSystemConfigBankDto;
}>;


export type CreateSystemConfigBankMutation = { __typename?: 'Mutation', createSystemConfigBank: { __typename?: 'SystemConfigBankEntity', bin: string, code: string, id: string, isActive: boolean, isDeleted: boolean, logo: string, name: string, shortName: string } };

export type RemoveSystemConfigBankMutationVariables = Exact<{
  removeSystemConfigBankId: Scalars['ID']['input'];
}>;


export type RemoveSystemConfigBankMutation = { __typename?: 'Mutation', removeSystemConfigBank: { __typename?: 'SystemConfigBankEntity', bin: string, id: string, code: string, isActive: boolean, isDeleted: boolean, logo: string, name: string, shortName: string } };

export type GetAllSystemConfigColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSystemConfigColorsQuery = { __typename?: 'Query', systemConfigColors: Array<{ __typename?: 'SystemConfigColorEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string }> };

export type GetSystemConfigColorByIdQueryVariables = Exact<{
  systemConfigColorId: Scalars['ID']['input'];
}>;


export type GetSystemConfigColorByIdQuery = { __typename?: 'Query', systemConfigColor: { __typename?: 'SystemConfigColorEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string } };

export type CreateSystemConfigColorMutationVariables = Exact<{
  input: CreateSystemConfigColorDto;
}>;


export type CreateSystemConfigColorMutation = { __typename?: 'Mutation', createSystemConfigColor: { __typename?: 'SystemConfigColorEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string } };

export type RemoveSystemConfigColorMutationVariables = Exact<{
  removeSystemConfigColorId: Scalars['ID']['input'];
}>;


export type RemoveSystemConfigColorMutation = { __typename?: 'Mutation', removeSystemConfigColor: { __typename?: 'SystemConfigColorEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string } };

export type GetAllSystemConfigSizesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSystemConfigSizesQuery = { __typename?: 'Query', systemConfigSizes: Array<{ __typename?: 'SystemConfigSizeEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string }> };

export type GetSystemConfigSizeByIdQueryVariables = Exact<{
  systemConfigSizeId: Scalars['ID']['input'];
}>;


export type GetSystemConfigSizeByIdQuery = { __typename?: 'Query', systemConfigSize: { __typename?: 'SystemConfigSizeEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string } };

export type CreateSystemConfigSizeMutationVariables = Exact<{
  input: CreateSystemConfigSizeDto;
}>;


export type CreateSystemConfigSizeMutation = { __typename?: 'Mutation', createSystemConfigSize: { __typename?: 'SystemConfigSizeEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string } };

export type RemoveSystemConfigSizeMutationVariables = Exact<{
  removeSystemConfigSizeId: Scalars['ID']['input'];
}>;


export type RemoveSystemConfigSizeMutation = { __typename?: 'Mutation', removeSystemConfigSize: { __typename?: 'SystemConfigSizeEntity', code: string, id: string, isActive: boolean, isDeleted: boolean, name: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserDto;
  updateUserId: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null } };


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
      factory {
        name
        factoryStatus
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
      factory {
        name
        factoryStatus
      }
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
      factory {
        name
        factoryStatus
      }
    }
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

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
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
    factory {
      name
      factoryStatus
    }
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
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
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

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryDto!) {
  createCategory(createCategoryInput: $createCategoryInput) {
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
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId) {
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
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      deleteCategoryId: // value for 'deleteCategoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetMyFactoryDocument = gql`
    query GetMyFactory {
  getMyFactory {
    addressId
    businessLicenseUrl
    contactPersonName
    contactPersonPhone
    contractUrl
    description
    establishedDate
    factoryStatus
    isSubmitted
    leadTime
    maxPrintingCapacity
    minimumOrderQuantity
    name
    operationalHours
    owner {
      email
      name
      imageUrl
    }
    printingMethods
    products {
      id
      imageUrl
      name
    }
    qualityCertifications
    specializations
    taxIdentificationNumber
    totalEmployees
    website
  }
}
    `;

/**
 * __useGetMyFactoryQuery__
 *
 * To run a query within a React component, call `useGetMyFactoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFactoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFactoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyFactoryQuery(baseOptions?: Apollo.QueryHookOptions<GetMyFactoryQuery, GetMyFactoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyFactoryQuery, GetMyFactoryQueryVariables>(GetMyFactoryDocument, options);
      }
export function useGetMyFactoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFactoryQuery, GetMyFactoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyFactoryQuery, GetMyFactoryQueryVariables>(GetMyFactoryDocument, options);
        }
export function useGetMyFactorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyFactoryQuery, GetMyFactoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyFactoryQuery, GetMyFactoryQueryVariables>(GetMyFactoryDocument, options);
        }
export type GetMyFactoryQueryHookResult = ReturnType<typeof useGetMyFactoryQuery>;
export type GetMyFactoryLazyQueryHookResult = ReturnType<typeof useGetMyFactoryLazyQuery>;
export type GetMyFactorySuspenseQueryHookResult = ReturnType<typeof useGetMyFactorySuspenseQuery>;
export type GetMyFactoryQueryResult = Apollo.QueryResult<GetMyFactoryQuery, GetMyFactoryQueryVariables>;
export const UpdateFactoryInfoDocument = gql`
    mutation UpdateFactoryInfo($updateFactoryInfoInput: UpdateFactoryInfoDto!) {
  updateFactoryInfo(updateFactoryInfoInput: $updateFactoryInfoInput) {
    addressId
    businessLicenseUrl
    contactPersonName
    contactPersonPhone
    contractUrl
    description
    establishedDate
    factoryStatus
    isSubmitted
    leadTime
    maxPrintingCapacity
    minimumOrderQuantity
    name
    operationalHours
    owner {
      email
      name
      imageUrl
    }
    printingMethods
    products {
      id
      imageUrl
      name
    }
    qualityCertifications
    specializations
    taxIdentificationNumber
    totalEmployees
    website
  }
}
    `;
export type UpdateFactoryInfoMutationFn = Apollo.MutationFunction<UpdateFactoryInfoMutation, UpdateFactoryInfoMutationVariables>;

/**
 * __useUpdateFactoryInfoMutation__
 *
 * To run a mutation, you first call `useUpdateFactoryInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFactoryInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFactoryInfoMutation, { data, loading, error }] = useUpdateFactoryInfoMutation({
 *   variables: {
 *      updateFactoryInfoInput: // value for 'updateFactoryInfoInput'
 *   },
 * });
 */
export function useUpdateFactoryInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFactoryInfoMutation, UpdateFactoryInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFactoryInfoMutation, UpdateFactoryInfoMutationVariables>(UpdateFactoryInfoDocument, options);
      }
export type UpdateFactoryInfoMutationHookResult = ReturnType<typeof useUpdateFactoryInfoMutation>;
export type UpdateFactoryInfoMutationResult = Apollo.MutationResult<UpdateFactoryInfoMutation>;
export type UpdateFactoryInfoMutationOptions = Apollo.BaseMutationOptions<UpdateFactoryInfoMutation, UpdateFactoryInfoMutationVariables>;
export const CreateProductDesignDocument = gql`
    mutation CreateProductDesign($input: CreateProductDesignDto!) {
  createProductDesign(input: $input) {
    id
    blankVariant {
      blankPrice
      information
    }
  }
}
    `;
export type CreateProductDesignMutationFn = Apollo.MutationFunction<CreateProductDesignMutation, CreateProductDesignMutationVariables>;

/**
 * __useCreateProductDesignMutation__
 *
 * To run a mutation, you first call `useCreateProductDesignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductDesignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductDesignMutation, { data, loading, error }] = useCreateProductDesignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductDesignMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductDesignMutation, CreateProductDesignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductDesignMutation, CreateProductDesignMutationVariables>(CreateProductDesignDocument, options);
      }
export type CreateProductDesignMutationHookResult = ReturnType<typeof useCreateProductDesignMutation>;
export type CreateProductDesignMutationResult = Apollo.MutationResult<CreateProductDesignMutation>;
export type CreateProductDesignMutationOptions = Apollo.BaseMutationOptions<CreateProductDesignMutation, CreateProductDesignMutationVariables>;
export const UpdateProductDesignDocument = gql`
    mutation UpdateProductDesign($input: UpdateProductDesignDto!) {
  updateProductDesign(input: $input) {
    blankVariant {
      blankPrice
      information
    }
  }
}
    `;
export type UpdateProductDesignMutationFn = Apollo.MutationFunction<UpdateProductDesignMutation, UpdateProductDesignMutationVariables>;

/**
 * __useUpdateProductDesignMutation__
 *
 * To run a mutation, you first call `useUpdateProductDesignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductDesignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductDesignMutation, { data, loading, error }] = useUpdateProductDesignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductDesignMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductDesignMutation, UpdateProductDesignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductDesignMutation, UpdateProductDesignMutationVariables>(UpdateProductDesignDocument, options);
      }
export type UpdateProductDesignMutationHookResult = ReturnType<typeof useUpdateProductDesignMutation>;
export type UpdateProductDesignMutationResult = Apollo.MutationResult<UpdateProductDesignMutation>;
export type UpdateProductDesignMutationOptions = Apollo.BaseMutationOptions<UpdateProductDesignMutation, UpdateProductDesignMutationVariables>;
export const ProductDesignDocument = gql`
    query ProductDesign($productDesignId: ID!) {
  productDesign(id: $productDesignId) {
    blankVariant {
      blankPrice
      information
    }
    designPositions {
      id
      designJSON
      positionType {
        id
        positionName
        basePrice
      }
    }
  }
}
    `;

/**
 * __useProductDesignQuery__
 *
 * To run a query within a React component, call `useProductDesignQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDesignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDesignQuery({
 *   variables: {
 *      productDesignId: // value for 'productDesignId'
 *   },
 * });
 */
export function useProductDesignQuery(baseOptions: Apollo.QueryHookOptions<ProductDesignQuery, ProductDesignQueryVariables> & ({ variables: ProductDesignQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDesignQuery, ProductDesignQueryVariables>(ProductDesignDocument, options);
      }
export function useProductDesignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDesignQuery, ProductDesignQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDesignQuery, ProductDesignQueryVariables>(ProductDesignDocument, options);
        }
export function useProductDesignSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductDesignQuery, ProductDesignQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductDesignQuery, ProductDesignQueryVariables>(ProductDesignDocument, options);
        }
export type ProductDesignQueryHookResult = ReturnType<typeof useProductDesignQuery>;
export type ProductDesignLazyQueryHookResult = ReturnType<typeof useProductDesignLazyQuery>;
export type ProductDesignSuspenseQueryHookResult = ReturnType<typeof useProductDesignSuspenseQuery>;
export type ProductDesignQueryResult = Apollo.QueryResult<ProductDesignQuery, ProductDesignQueryVariables>;
export const GetAllProductsDocument = gql`
    query GetAllProducts {
  products {
    category {
      name
    }
    id
    imageUrl
    isActive
    name
    updatedAt
    createdAt
    description
  }
}
    `;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsSuspenseQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductDto!) {
  createProduct(input: $input) {
    category {
      name
    }
    id
    imageUrl
    isActive
    name
    updatedAt
    createdAt
    description
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId) {
    category {
      name
    }
    id
    imageUrl
    isActive
    name
    updatedAt
    createdAt
    description
  }
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      deleteProductId: // value for 'deleteProductId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const GetAllSystemConfigBanksDocument = gql`
    query GetAllSystemConfigBanks {
  systemConfigBanks {
    bin
    code
    id
    isActive
    isDeleted
    logo
    name
    shortName
  }
}
    `;

/**
 * __useGetAllSystemConfigBanksQuery__
 *
 * To run a query within a React component, call `useGetAllSystemConfigBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSystemConfigBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSystemConfigBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSystemConfigBanksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSystemConfigBanksQuery, GetAllSystemConfigBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSystemConfigBanksQuery, GetAllSystemConfigBanksQueryVariables>(GetAllSystemConfigBanksDocument, options);
      }
export function useGetAllSystemConfigBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSystemConfigBanksQuery, GetAllSystemConfigBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSystemConfigBanksQuery, GetAllSystemConfigBanksQueryVariables>(GetAllSystemConfigBanksDocument, options);
        }
export function useGetAllSystemConfigBanksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSystemConfigBanksQuery, GetAllSystemConfigBanksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSystemConfigBanksQuery, GetAllSystemConfigBanksQueryVariables>(GetAllSystemConfigBanksDocument, options);
        }
export type GetAllSystemConfigBanksQueryHookResult = ReturnType<typeof useGetAllSystemConfigBanksQuery>;
export type GetAllSystemConfigBanksLazyQueryHookResult = ReturnType<typeof useGetAllSystemConfigBanksLazyQuery>;
export type GetAllSystemConfigBanksSuspenseQueryHookResult = ReturnType<typeof useGetAllSystemConfigBanksSuspenseQuery>;
export type GetAllSystemConfigBanksQueryResult = Apollo.QueryResult<GetAllSystemConfigBanksQuery, GetAllSystemConfigBanksQueryVariables>;
export const GetSystemConfigBankByIdDocument = gql`
    query GetSystemConfigBankById($systemConfigBankId: ID!) {
  systemConfigBank(id: $systemConfigBankId) {
    bin
    code
    id
    isActive
    isDeleted
    logo
    name
    shortName
  }
}
    `;

/**
 * __useGetSystemConfigBankByIdQuery__
 *
 * To run a query within a React component, call `useGetSystemConfigBankByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemConfigBankByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemConfigBankByIdQuery({
 *   variables: {
 *      systemConfigBankId: // value for 'systemConfigBankId'
 *   },
 * });
 */
export function useGetSystemConfigBankByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSystemConfigBankByIdQuery, GetSystemConfigBankByIdQueryVariables> & ({ variables: GetSystemConfigBankByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSystemConfigBankByIdQuery, GetSystemConfigBankByIdQueryVariables>(GetSystemConfigBankByIdDocument, options);
      }
export function useGetSystemConfigBankByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSystemConfigBankByIdQuery, GetSystemConfigBankByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSystemConfigBankByIdQuery, GetSystemConfigBankByIdQueryVariables>(GetSystemConfigBankByIdDocument, options);
        }
export function useGetSystemConfigBankByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSystemConfigBankByIdQuery, GetSystemConfigBankByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSystemConfigBankByIdQuery, GetSystemConfigBankByIdQueryVariables>(GetSystemConfigBankByIdDocument, options);
        }
export type GetSystemConfigBankByIdQueryHookResult = ReturnType<typeof useGetSystemConfigBankByIdQuery>;
export type GetSystemConfigBankByIdLazyQueryHookResult = ReturnType<typeof useGetSystemConfigBankByIdLazyQuery>;
export type GetSystemConfigBankByIdSuspenseQueryHookResult = ReturnType<typeof useGetSystemConfigBankByIdSuspenseQuery>;
export type GetSystemConfigBankByIdQueryResult = Apollo.QueryResult<GetSystemConfigBankByIdQuery, GetSystemConfigBankByIdQueryVariables>;
export const CreateSystemConfigBankDocument = gql`
    mutation CreateSystemConfigBank($input: CreateSystemConfigBankDto!) {
  createSystemConfigBank(input: $input) {
    bin
    code
    id
    isActive
    isDeleted
    logo
    name
    shortName
  }
}
    `;
export type CreateSystemConfigBankMutationFn = Apollo.MutationFunction<CreateSystemConfigBankMutation, CreateSystemConfigBankMutationVariables>;

/**
 * __useCreateSystemConfigBankMutation__
 *
 * To run a mutation, you first call `useCreateSystemConfigBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSystemConfigBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSystemConfigBankMutation, { data, loading, error }] = useCreateSystemConfigBankMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSystemConfigBankMutation(baseOptions?: Apollo.MutationHookOptions<CreateSystemConfigBankMutation, CreateSystemConfigBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSystemConfigBankMutation, CreateSystemConfigBankMutationVariables>(CreateSystemConfigBankDocument, options);
      }
export type CreateSystemConfigBankMutationHookResult = ReturnType<typeof useCreateSystemConfigBankMutation>;
export type CreateSystemConfigBankMutationResult = Apollo.MutationResult<CreateSystemConfigBankMutation>;
export type CreateSystemConfigBankMutationOptions = Apollo.BaseMutationOptions<CreateSystemConfigBankMutation, CreateSystemConfigBankMutationVariables>;
export const RemoveSystemConfigBankDocument = gql`
    mutation RemoveSystemConfigBank($removeSystemConfigBankId: ID!) {
  removeSystemConfigBank(id: $removeSystemConfigBankId) {
    bin
    id
    code
    isActive
    isDeleted
    logo
    name
    shortName
  }
}
    `;
export type RemoveSystemConfigBankMutationFn = Apollo.MutationFunction<RemoveSystemConfigBankMutation, RemoveSystemConfigBankMutationVariables>;

/**
 * __useRemoveSystemConfigBankMutation__
 *
 * To run a mutation, you first call `useRemoveSystemConfigBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSystemConfigBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSystemConfigBankMutation, { data, loading, error }] = useRemoveSystemConfigBankMutation({
 *   variables: {
 *      removeSystemConfigBankId: // value for 'removeSystemConfigBankId'
 *   },
 * });
 */
export function useRemoveSystemConfigBankMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSystemConfigBankMutation, RemoveSystemConfigBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSystemConfigBankMutation, RemoveSystemConfigBankMutationVariables>(RemoveSystemConfigBankDocument, options);
      }
export type RemoveSystemConfigBankMutationHookResult = ReturnType<typeof useRemoveSystemConfigBankMutation>;
export type RemoveSystemConfigBankMutationResult = Apollo.MutationResult<RemoveSystemConfigBankMutation>;
export type RemoveSystemConfigBankMutationOptions = Apollo.BaseMutationOptions<RemoveSystemConfigBankMutation, RemoveSystemConfigBankMutationVariables>;
export const GetAllSystemConfigColorsDocument = gql`
    query GetAllSystemConfigColors {
  systemConfigColors {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;

/**
 * __useGetAllSystemConfigColorsQuery__
 *
 * To run a query within a React component, call `useGetAllSystemConfigColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSystemConfigColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSystemConfigColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSystemConfigColorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSystemConfigColorsQuery, GetAllSystemConfigColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSystemConfigColorsQuery, GetAllSystemConfigColorsQueryVariables>(GetAllSystemConfigColorsDocument, options);
      }
export function useGetAllSystemConfigColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSystemConfigColorsQuery, GetAllSystemConfigColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSystemConfigColorsQuery, GetAllSystemConfigColorsQueryVariables>(GetAllSystemConfigColorsDocument, options);
        }
export function useGetAllSystemConfigColorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSystemConfigColorsQuery, GetAllSystemConfigColorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSystemConfigColorsQuery, GetAllSystemConfigColorsQueryVariables>(GetAllSystemConfigColorsDocument, options);
        }
export type GetAllSystemConfigColorsQueryHookResult = ReturnType<typeof useGetAllSystemConfigColorsQuery>;
export type GetAllSystemConfigColorsLazyQueryHookResult = ReturnType<typeof useGetAllSystemConfigColorsLazyQuery>;
export type GetAllSystemConfigColorsSuspenseQueryHookResult = ReturnType<typeof useGetAllSystemConfigColorsSuspenseQuery>;
export type GetAllSystemConfigColorsQueryResult = Apollo.QueryResult<GetAllSystemConfigColorsQuery, GetAllSystemConfigColorsQueryVariables>;
export const GetSystemConfigColorByIdDocument = gql`
    query GetSystemConfigColorById($systemConfigColorId: ID!) {
  systemConfigColor(id: $systemConfigColorId) {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;

/**
 * __useGetSystemConfigColorByIdQuery__
 *
 * To run a query within a React component, call `useGetSystemConfigColorByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemConfigColorByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemConfigColorByIdQuery({
 *   variables: {
 *      systemConfigColorId: // value for 'systemConfigColorId'
 *   },
 * });
 */
export function useGetSystemConfigColorByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSystemConfigColorByIdQuery, GetSystemConfigColorByIdQueryVariables> & ({ variables: GetSystemConfigColorByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSystemConfigColorByIdQuery, GetSystemConfigColorByIdQueryVariables>(GetSystemConfigColorByIdDocument, options);
      }
export function useGetSystemConfigColorByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSystemConfigColorByIdQuery, GetSystemConfigColorByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSystemConfigColorByIdQuery, GetSystemConfigColorByIdQueryVariables>(GetSystemConfigColorByIdDocument, options);
        }
export function useGetSystemConfigColorByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSystemConfigColorByIdQuery, GetSystemConfigColorByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSystemConfigColorByIdQuery, GetSystemConfigColorByIdQueryVariables>(GetSystemConfigColorByIdDocument, options);
        }
export type GetSystemConfigColorByIdQueryHookResult = ReturnType<typeof useGetSystemConfigColorByIdQuery>;
export type GetSystemConfigColorByIdLazyQueryHookResult = ReturnType<typeof useGetSystemConfigColorByIdLazyQuery>;
export type GetSystemConfigColorByIdSuspenseQueryHookResult = ReturnType<typeof useGetSystemConfigColorByIdSuspenseQuery>;
export type GetSystemConfigColorByIdQueryResult = Apollo.QueryResult<GetSystemConfigColorByIdQuery, GetSystemConfigColorByIdQueryVariables>;
export const CreateSystemConfigColorDocument = gql`
    mutation CreateSystemConfigColor($input: CreateSystemConfigColorDto!) {
  createSystemConfigColor(input: $input) {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;
export type CreateSystemConfigColorMutationFn = Apollo.MutationFunction<CreateSystemConfigColorMutation, CreateSystemConfigColorMutationVariables>;

/**
 * __useCreateSystemConfigColorMutation__
 *
 * To run a mutation, you first call `useCreateSystemConfigColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSystemConfigColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSystemConfigColorMutation, { data, loading, error }] = useCreateSystemConfigColorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSystemConfigColorMutation(baseOptions?: Apollo.MutationHookOptions<CreateSystemConfigColorMutation, CreateSystemConfigColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSystemConfigColorMutation, CreateSystemConfigColorMutationVariables>(CreateSystemConfigColorDocument, options);
      }
export type CreateSystemConfigColorMutationHookResult = ReturnType<typeof useCreateSystemConfigColorMutation>;
export type CreateSystemConfigColorMutationResult = Apollo.MutationResult<CreateSystemConfigColorMutation>;
export type CreateSystemConfigColorMutationOptions = Apollo.BaseMutationOptions<CreateSystemConfigColorMutation, CreateSystemConfigColorMutationVariables>;
export const RemoveSystemConfigColorDocument = gql`
    mutation RemoveSystemConfigColor($removeSystemConfigColorId: ID!) {
  removeSystemConfigColor(id: $removeSystemConfigColorId) {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;
export type RemoveSystemConfigColorMutationFn = Apollo.MutationFunction<RemoveSystemConfigColorMutation, RemoveSystemConfigColorMutationVariables>;

/**
 * __useRemoveSystemConfigColorMutation__
 *
 * To run a mutation, you first call `useRemoveSystemConfigColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSystemConfigColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSystemConfigColorMutation, { data, loading, error }] = useRemoveSystemConfigColorMutation({
 *   variables: {
 *      removeSystemConfigColorId: // value for 'removeSystemConfigColorId'
 *   },
 * });
 */
export function useRemoveSystemConfigColorMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSystemConfigColorMutation, RemoveSystemConfigColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSystemConfigColorMutation, RemoveSystemConfigColorMutationVariables>(RemoveSystemConfigColorDocument, options);
      }
export type RemoveSystemConfigColorMutationHookResult = ReturnType<typeof useRemoveSystemConfigColorMutation>;
export type RemoveSystemConfigColorMutationResult = Apollo.MutationResult<RemoveSystemConfigColorMutation>;
export type RemoveSystemConfigColorMutationOptions = Apollo.BaseMutationOptions<RemoveSystemConfigColorMutation, RemoveSystemConfigColorMutationVariables>;
export const GetAllSystemConfigSizesDocument = gql`
    query GetAllSystemConfigSizes {
  systemConfigSizes {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;

/**
 * __useGetAllSystemConfigSizesQuery__
 *
 * To run a query within a React component, call `useGetAllSystemConfigSizesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSystemConfigSizesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSystemConfigSizesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSystemConfigSizesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSystemConfigSizesQuery, GetAllSystemConfigSizesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSystemConfigSizesQuery, GetAllSystemConfigSizesQueryVariables>(GetAllSystemConfigSizesDocument, options);
      }
export function useGetAllSystemConfigSizesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSystemConfigSizesQuery, GetAllSystemConfigSizesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSystemConfigSizesQuery, GetAllSystemConfigSizesQueryVariables>(GetAllSystemConfigSizesDocument, options);
        }
export function useGetAllSystemConfigSizesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSystemConfigSizesQuery, GetAllSystemConfigSizesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSystemConfigSizesQuery, GetAllSystemConfigSizesQueryVariables>(GetAllSystemConfigSizesDocument, options);
        }
export type GetAllSystemConfigSizesQueryHookResult = ReturnType<typeof useGetAllSystemConfigSizesQuery>;
export type GetAllSystemConfigSizesLazyQueryHookResult = ReturnType<typeof useGetAllSystemConfigSizesLazyQuery>;
export type GetAllSystemConfigSizesSuspenseQueryHookResult = ReturnType<typeof useGetAllSystemConfigSizesSuspenseQuery>;
export type GetAllSystemConfigSizesQueryResult = Apollo.QueryResult<GetAllSystemConfigSizesQuery, GetAllSystemConfigSizesQueryVariables>;
export const GetSystemConfigSizeByIdDocument = gql`
    query GetSystemConfigSizeById($systemConfigSizeId: ID!) {
  systemConfigSize(id: $systemConfigSizeId) {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;

/**
 * __useGetSystemConfigSizeByIdQuery__
 *
 * To run a query within a React component, call `useGetSystemConfigSizeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemConfigSizeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemConfigSizeByIdQuery({
 *   variables: {
 *      systemConfigSizeId: // value for 'systemConfigSizeId'
 *   },
 * });
 */
export function useGetSystemConfigSizeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSystemConfigSizeByIdQuery, GetSystemConfigSizeByIdQueryVariables> & ({ variables: GetSystemConfigSizeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSystemConfigSizeByIdQuery, GetSystemConfigSizeByIdQueryVariables>(GetSystemConfigSizeByIdDocument, options);
      }
export function useGetSystemConfigSizeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSystemConfigSizeByIdQuery, GetSystemConfigSizeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSystemConfigSizeByIdQuery, GetSystemConfigSizeByIdQueryVariables>(GetSystemConfigSizeByIdDocument, options);
        }
export function useGetSystemConfigSizeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSystemConfigSizeByIdQuery, GetSystemConfigSizeByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSystemConfigSizeByIdQuery, GetSystemConfigSizeByIdQueryVariables>(GetSystemConfigSizeByIdDocument, options);
        }
export type GetSystemConfigSizeByIdQueryHookResult = ReturnType<typeof useGetSystemConfigSizeByIdQuery>;
export type GetSystemConfigSizeByIdLazyQueryHookResult = ReturnType<typeof useGetSystemConfigSizeByIdLazyQuery>;
export type GetSystemConfigSizeByIdSuspenseQueryHookResult = ReturnType<typeof useGetSystemConfigSizeByIdSuspenseQuery>;
export type GetSystemConfigSizeByIdQueryResult = Apollo.QueryResult<GetSystemConfigSizeByIdQuery, GetSystemConfigSizeByIdQueryVariables>;
export const CreateSystemConfigSizeDocument = gql`
    mutation CreateSystemConfigSize($input: CreateSystemConfigSizeDto!) {
  createSystemConfigSize(input: $input) {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;
export type CreateSystemConfigSizeMutationFn = Apollo.MutationFunction<CreateSystemConfigSizeMutation, CreateSystemConfigSizeMutationVariables>;

/**
 * __useCreateSystemConfigSizeMutation__
 *
 * To run a mutation, you first call `useCreateSystemConfigSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSystemConfigSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSystemConfigSizeMutation, { data, loading, error }] = useCreateSystemConfigSizeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSystemConfigSizeMutation(baseOptions?: Apollo.MutationHookOptions<CreateSystemConfigSizeMutation, CreateSystemConfigSizeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSystemConfigSizeMutation, CreateSystemConfigSizeMutationVariables>(CreateSystemConfigSizeDocument, options);
      }
export type CreateSystemConfigSizeMutationHookResult = ReturnType<typeof useCreateSystemConfigSizeMutation>;
export type CreateSystemConfigSizeMutationResult = Apollo.MutationResult<CreateSystemConfigSizeMutation>;
export type CreateSystemConfigSizeMutationOptions = Apollo.BaseMutationOptions<CreateSystemConfigSizeMutation, CreateSystemConfigSizeMutationVariables>;
export const RemoveSystemConfigSizeDocument = gql`
    mutation RemoveSystemConfigSize($removeSystemConfigSizeId: ID!) {
  removeSystemConfigSize(id: $removeSystemConfigSizeId) {
    code
    id
    isActive
    isDeleted
    name
  }
}
    `;
export type RemoveSystemConfigSizeMutationFn = Apollo.MutationFunction<RemoveSystemConfigSizeMutation, RemoveSystemConfigSizeMutationVariables>;

/**
 * __useRemoveSystemConfigSizeMutation__
 *
 * To run a mutation, you first call `useRemoveSystemConfigSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSystemConfigSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSystemConfigSizeMutation, { data, loading, error }] = useRemoveSystemConfigSizeMutation({
 *   variables: {
 *      removeSystemConfigSizeId: // value for 'removeSystemConfigSizeId'
 *   },
 * });
 */
export function useRemoveSystemConfigSizeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSystemConfigSizeMutation, RemoveSystemConfigSizeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSystemConfigSizeMutation, RemoveSystemConfigSizeMutationVariables>(RemoveSystemConfigSizeDocument, options);
      }
export type RemoveSystemConfigSizeMutationHookResult = ReturnType<typeof useRemoveSystemConfigSizeMutation>;
export type RemoveSystemConfigSizeMutationResult = Apollo.MutationResult<RemoveSystemConfigSizeMutation>;
export type RemoveSystemConfigSizeMutationOptions = Apollo.BaseMutationOptions<RemoveSystemConfigSizeMutation, RemoveSystemConfigSizeMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    imageUrl
    gender
    email
    dateOfBirth
    createdAt
    isActive
    name
    phoneNumber
    role
    updatedAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  user(id: $userId) {
    id
    imageUrl
    gender
    email
    dateOfBirth
    createdAt
    isActive
    name
    phoneNumber
    role
    updatedAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserDto!) {
  createUser(createUserInput: $createUserInput) {
    id
    imageUrl
    gender
    email
    dateOfBirth
    createdAt
    isActive
    name
    phoneNumber
    role
    updatedAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserDto!, $updateUserId: String!) {
  updateUser(updateUserInput: $updateUserInput, id: $updateUserId) {
    id
    imageUrl
    gender
    email
    dateOfBirth
    createdAt
    isActive
    name
    phoneNumber
    role
    updatedAt
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *      updateUserId: // value for 'updateUserId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId) {
    id
    imageUrl
    gender
    email
    dateOfBirth
    createdAt
    isActive
    name
    phoneNumber
    role
    updatedAt
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;