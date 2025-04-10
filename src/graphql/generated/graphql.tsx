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
  Upload: { input: any; output: any };
};

/** The type of dashboard activity */
export enum ActivityType {
  Factory = 'FACTORY',
  Order = 'ORDER',
  Staff = 'STAFF',
  System = 'SYSTEM',
}

export type AddressEntity = {
  __typename?: 'AddressEntity';
  districtID: Scalars['Float']['output'];
  factory?: Maybe<FactoryEntity>;
  factoryId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  provinceID: Scalars['Float']['output'];
  street: Scalars['String']['output'];
  user?: Maybe<UserEntity>;
  userId: Scalars['String']['output'];
  wardCode: Scalars['String']['output'];
};

export type AdminDashboardResponse = {
  __typename?: 'AdminDashboardResponse';
  activeFactories: Scalars['Int']['output'];
  factoryPerformance: Array<FactoryPerformance>;
  pendingOrders: Scalars['Int']['output'];
  recentOrders: Array<OrderWithFactory>;
  totalCustomers: Scalars['Int']['output'];
  totalFactories: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
};

/** Authentication response */
export type AuthResponseDto = {
  __typename?: 'AuthResponseDto';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserEntity;
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
  design?: Maybe<ProductDesignEntity>;
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

/** The type of change (positive or negative) */
export enum ChangeType {
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE',
}

export type CheckQualityEntity = {
  __typename?: 'CheckQualityEntity';
  checkedAt: Scalars['DateTime']['output'];
  checkedBy?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  failedQuantity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  orderDetail?: Maybe<OrderDetailEntity>;
  orderDetailId: Scalars['String']['output'];
  passedQuantity: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  task?: Maybe<TaskEntity>;
  taskId: Scalars['String']['output'];
  totalChecked: Scalars['Int']['output'];
};

/** Create Address Input */
export type CreateAddressInput = {
  districtID: Scalars['Float']['input'];
  factoryId?: InputMaybe<Scalars['String']['input']>;
  provinceID: Scalars['Float']['input'];
  street: Scalars['String']['input'];
  wardCode: Scalars['String']['input'];
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

export type CreateFactoryProductInput = {
  factoryId: Scalars['String']['input'];
  productionCapacity: Scalars['Int']['input'];
  productionTimeInMinutes: Scalars['Int']['input'];
  systemConfigVariantId: Scalars['String']['input'];
};

export type CreateOrderDetailInput = {
  cartItemId: Scalars['String']['input'];
};

export type CreateOrderInput = {
  orderDetails: Array<CreateOrderDetailInput>;
};

export type CreatePaymentTransactionInput = {
  amount: Scalars['Int']['input'];
  customerId: Scalars['String']['input'];
  paymentGatewayTransactionId: Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  transactionLog: Scalars['String']['input'];
  type: TransactionType;
};

export type CreateProductDesignDto = {
  isFinalized?: Scalars['Boolean']['input'];
  isPublic?: Scalars['Boolean']['input'];
  isTemplate?: Scalars['Boolean']['input'];
  systemConfigVariantId: Scalars['String']['input'];
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Create Product */
export type CreateProductDto = {
  categoryId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  model3DUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
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

export type CreateSystemConfigVariantInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
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

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CustomerOrderInfo = {
  __typename?: 'CustomerOrderInfo';
  customer: CustomerInfo;
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalPrice: Scalars['Int']['output'];
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  factories: EnhancedFactoryStats;
  orders: EnhancedOrderStats;
  revenue: EnhancedRevenueStats;
  staff: EnhancedStaffStats;
};

export type DesignPositionEntity = {
  __typename?: 'DesignPositionEntity';
  design?: Maybe<ProductDesignEntity>;
  designId: Scalars['String']['output'];
  designJSON?: Maybe<Scalars['JSON']['output']>;
  positionType?: Maybe<ProductPositionTypeEntity>;
  productPositionTypeId: Scalars['String']['output'];
};

export type District = {
  __typename?: 'District';
  districtId: Scalars['Int']['output'];
  districtName: Scalars['String']['output'];
  provinceId: Scalars['Int']['output'];
};

export type DoneCheckQualityInput = {
  checkQualityId: Scalars['String']['input'];
  failedQuantity: Scalars['Int']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  note?: InputMaybe<Scalars['String']['input']>;
  passedQuantity: Scalars['Int']['input'];
};

export type EnhancedFactoryPerformance = {
  __typename?: 'EnhancedFactoryPerformance';
  factoryId: Scalars['String']['output'];
  factoryName: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
};

export type EnhancedFactoryStats = {
  __typename?: 'EnhancedFactoryStats';
  change: Scalars['String']['output'];
  changeType: ChangeType;
  total: Scalars['Int']['output'];
};

export type EnhancedManagerDashboardResponse = {
  __typename?: 'EnhancedManagerDashboardResponse';
  factoryPerformance: Array<EnhancedFactoryPerformance>;
  orderStatus: Array<OrderStatusDetail>;
  recentActivities: Array<RecentActivity>;
  stats: DashboardStats;
};

export type EnhancedOrderStats = {
  __typename?: 'EnhancedOrderStats';
  active: Scalars['Int']['output'];
  change: Scalars['String']['output'];
  changeType: ChangeType;
};

export type EnhancedRevenueStats = {
  __typename?: 'EnhancedRevenueStats';
  change: Scalars['String']['output'];
  changeType: ChangeType;
  monthly: Scalars['String']['output'];
};

export type EnhancedStaffStats = {
  __typename?: 'EnhancedStaffStats';
  change: Scalars['String']['output'];
  changeType: ChangeType;
  total: Scalars['Int']['output'];
};

export type FactoryDashboardResponse = {
  __typename?: 'FactoryDashboardResponse';
  inProductionOrders: Scalars['Int']['output'];
  pendingOrders: Scalars['Int']['output'];
  productionProgress: Array<FactoryOrderWithProgress>;
  qualityIssues: Array<QualityIssueWithFactory>;
  recentOrders: Array<FactoryOrderWithCustomer>;
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
};

export type FactoryEntity = {
  __typename?: 'FactoryEntity';
  address?: Maybe<AddressEntity>;
  businessLicenseUrl?: Maybe<Scalars['String']['output']>;
  contactPersonName?: Maybe<Scalars['String']['output']>;
  contactPersonPhone?: Maybe<Scalars['String']['output']>;
  contactPersonRole?: Maybe<Scalars['String']['output']>;
  contractAccepted?: Maybe<Scalars['Boolean']['output']>;
  contractAcceptedAt?: Maybe<Scalars['DateTime']['output']>;
  contractUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  establishedDate?: Maybe<Scalars['DateTime']['output']>;
  factoryOwnerId: Scalars['ID']['output'];
  factoryStatus?: Maybe<FactoryStatus>;
  formattedAddress?: Maybe<Scalars['String']['output']>;
  isSubmitted?: Maybe<Scalars['Boolean']['output']>;
  leadTime?: Maybe<Scalars['Int']['output']>;
  maxPrintingCapacity?: Maybe<Scalars['Int']['output']>;
  minimumOrderQuantity?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  operationalHours?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<UserEntity>;
  printingMethods: Array<Scalars['String']['output']>;
  products?: Maybe<Array<FactoryProductEntity>>;
  qualityCertifications?: Maybe<Scalars['String']['output']>;
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewedBy?: Maybe<Scalars['String']['output']>;
  specializations: Array<Scalars['String']['output']>;
  staff?: Maybe<UserEntity>;
  statusNote?: Maybe<Scalars['String']['output']>;
  taxIdentificationNumber?: Maybe<Scalars['String']['output']>;
  totalEmployees?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type FactoryInfo = {
  __typename?: 'FactoryInfo';
  factoryStatus: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type FactoryOrderInfo = {
  __typename?: 'FactoryOrderInfo';
  factory: FactoryInfo;
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type FactoryOrderWithCustomer = {
  __typename?: 'FactoryOrderWithCustomer';
  createdAt: Scalars['DateTime']['output'];
  customerOrder: CustomerOrderInfo;
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalProductionCost: Scalars['Int']['output'];
};

export type FactoryOrderWithProgress = {
  __typename?: 'FactoryOrderWithProgress';
  createdAt: Scalars['DateTime']['output'];
  customerOrder: CustomerOrderInfo;
  id: Scalars['String']['output'];
  progressReports: Array<FactoryProgressReportType>;
  status: Scalars['String']['output'];
  totalProductionCost: Scalars['Int']['output'];
};

export type FactoryOrdersByStatus = {
  __typename?: 'FactoryOrdersByStatus';
  count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type FactoryPerformance = {
  __typename?: 'FactoryPerformance';
  factoryId: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
};

export type FactoryProductEntity = {
  __typename?: 'FactoryProductEntity';
  factory?: Maybe<FactoryEntity>;
  factoryId: Scalars['String']['output'];
  productionCapacity: Scalars['Int']['output'];
  productionTimeInMinutes: Scalars['Int']['output'];
  systemConfigVariant?: Maybe<SystemConfigVariantEntity>;
  systemConfigVariantId: Scalars['String']['output'];
};

export type FactoryProgressReportType = {
  __typename?: 'FactoryProgressReportType';
  estimatedCompletion: Scalars['DateTime']['output'];
  factoryOrderId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  photoUrls: Array<Scalars['String']['output']>;
  reportDate: Scalars['DateTime']['output'];
};

/** The status of the factory */
export enum FactoryStatus {
  Approved = 'APPROVED',
  PendingApproval = 'PENDING_APPROVAL',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED',
}

export type FeedbackOrderInput = {
  rating: Scalars['Int']['input'];
  ratingComment?: InputMaybe<Scalars['String']['input']>;
};

export type FileUploadResponse = {
  __typename?: 'FileUploadResponse';
  url: Scalars['String']['output'];
};

/** Format Address Input */
export type FormatAddressInput = {
  districtID: Scalars['Float']['input'];
  provinceID: Scalars['Float']['input'];
  street: Scalars['String']['input'];
  wardCode: Scalars['String']['input'];
};

export type FormattedAddressModel = {
  __typename?: 'FormattedAddressModel';
  text: Scalars['String']['output'];
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

export type ManagerDashboardResponse = {
  __typename?: 'ManagerDashboardResponse';
  factoryOrdersByStatus: Array<FactoryOrdersByStatus>;
  pendingFactoryOrders: Scalars['Int']['output'];
  qualityIssues: Array<QualityIssueWithFactory>;
  recentFactoryOrders: Array<FactoryOrderWithCustomer>;
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOrderForFactory: OrderEntity;
  assignStaffToFactory: FactoryEntity;
  calculateShippingFee: ShippingFee;
  changeFactoryStatus: FactoryEntity;
  clearCart: Scalars['Boolean']['output'];
  createAddress: AddressEntity;
  createCartItem: CartItemEntity;
  createCategory: CategoryEntity;
  createFactoryProduct: FactoryProductEntity;
  createNotification: NotificationEntity;
  createNotificationForManyUsers: Array<NotificationEntity>;
  createNotificationForUsersByRoles: Array<NotificationEntity>;
  createOrder: OrderEntity;
  createPayment: Scalars['String']['output'];
  createPaymentTransaction: PaymentTransactionEntity;
  createProduct: ProductEntity;
  createProductDesign: ProductDesignEntity;
  createProductPositionType: ProductPositionTypeEntity;
  createShippingOrder: ShippingOrder;
  createSystemConfigBank: SystemConfigBankEntity;
  createSystemConfigVariant: SystemConfigVariantEntity;
  createUser: UserEntity;
  deleteAddress: AddressEntity;
  deleteCartItem: CartItemEntity;
  deleteCategory: CategoryEntity;
  deleteFactoryProduct: FactoryProductEntity;
  deleteFile: Scalars['Boolean']['output'];
  deleteProduct: ProductEntity;
  deleteUser: UserEntity;
  doneCheckQuality: CheckQualityEntity;
  doneProductionOrderDetails: OrderDetailEntity;
  doneReworkForOrderDetails: OrderDetailEntity;
  duplicateProductDesign: ProductDesignEntity;
  feedbackOrder: OrderEntity;
  login: AuthResponseDto;
  logout: Scalars['String']['output'];
  markNotificationAsRead: NotificationEntity;
  refreshToken: AuthResponseDto;
  register: AuthResponseDto;
  rejectOrder: OrderEntity;
  removePaymentTransaction: PaymentTransactionEntity;
  removeProductDesign: ProductDesignEntity;
  removeProductPositionType: ProductPositionTypeEntity;
  removeSystemConfigBank: SystemConfigBankEntity;
  removeSystemConfigVariant: SystemConfigVariantEntity;
  restoreCategory: CategoryEntity;
  restoreProduct: ProductEntity;
  sendEmail: Scalars['Boolean']['output'];
  shippedOrder: OrderEntity;
  startRework: OrderEntity;
  toggleActiveCategory: CategoryEntity;
  toggleActiveProduct: ProductEntity;
  updateAddress: AddressEntity;
  updateCartItem: CartItemEntity;
  updateCategory: CategoryEntity;
  updateDesignPosition: DesignPositionEntity;
  updateFactoryInfo: FactoryEntity;
  updateFactoryProduct: FactoryProductEntity;
  updatePaymentTransaction: PaymentTransactionEntity;
  updateProduct: ProductEntity;
  updateProductDesign: ProductDesignEntity;
  updateProductPositionType: ProductPositionTypeEntity;
  updateSystemConfigBank: SystemConfigBankEntity;
  updateSystemConfigVariant: SystemConfigVariantEntity;
  updateUser: UserEntity;
  uploadFile: FileUploadResponse;
};

export type MutationAcceptOrderForFactoryArgs = {
  orderId: Scalars['String']['input'];
};

export type MutationAssignStaffToFactoryArgs = {
  factoryId: Scalars['String']['input'];
  staffId: Scalars['String']['input'];
};

export type MutationCalculateShippingFeeArgs = {
  input: CalculateShippingFeeDto;
};

export type MutationChangeFactoryStatusArgs = {
  data: UpdateFactoryStatusDto;
};

export type MutationCreateAddressArgs = {
  createAddressInput: CreateAddressInput;
};

export type MutationCreateCartItemArgs = {
  createCartItemInput: CreateCartItemDto;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryDto;
};

export type MutationCreateFactoryProductArgs = {
  data: CreateFactoryProductInput;
};

export type MutationCreateNotificationArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type MutationCreateNotificationForManyUsersArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  userIds: Array<Scalars['String']['input']>;
};

export type MutationCreateNotificationForUsersByRolesArgs = {
  content: Scalars['String']['input'];
  roles: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};

export type MutationCreatePaymentArgs = {
  gateway: Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
};

export type MutationCreatePaymentTransactionArgs = {
  input: CreatePaymentTransactionInput;
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

export type MutationCreateShippingOrderArgs = {
  orderId: Scalars['String']['input'];
};

export type MutationCreateSystemConfigBankArgs = {
  input: CreateSystemConfigBankDto;
};

export type MutationCreateSystemConfigVariantArgs = {
  createSystemConfigVariantInput: CreateSystemConfigVariantInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};

export type MutationDeleteAddressArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteCartItemArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteFactoryProductArgs = {
  factoryId: Scalars['String']['input'];
  systemConfigVariantId: Scalars['String']['input'];
};

export type MutationDeleteFileArgs = {
  fileUrl: Scalars['String']['input'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};

export type MutationDoneCheckQualityArgs = {
  input: DoneCheckQualityInput;
};

export type MutationDoneProductionOrderDetailsArgs = {
  orderDetailId: Scalars['String']['input'];
};

export type MutationDoneReworkForOrderDetailsArgs = {
  orderDetailId: Scalars['String']['input'];
};

export type MutationDuplicateProductDesignArgs = {
  id: Scalars['ID']['input'];
};

export type MutationFeedbackOrderArgs = {
  input: FeedbackOrderInput;
  orderId: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  loginInput: LoginDto;
};

export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String']['input'];
};

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenDto;
};

export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};

export type MutationRejectOrderArgs = {
  orderId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type MutationRemovePaymentTransactionArgs = {
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

export type MutationRemoveSystemConfigVariantArgs = {
  id: Scalars['String']['input'];
};

export type MutationRestoreCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationRestoreProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationSendEmailArgs = {
  to: Scalars['String']['input'];
};

export type MutationShippedOrderArgs = {
  orderId: Scalars['String']['input'];
};

export type MutationStartReworkArgs = {
  orderId: Scalars['String']['input'];
};

export type MutationToggleActiveCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationToggleActiveProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateAddressArgs = {
  id: Scalars['String']['input'];
  updateAddressInput: UpdateAddressInput;
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

export type MutationUpdateFactoryProductArgs = {
  data: UpdateFactoryProductInput;
  factoryId: Scalars['String']['input'];
  systemConfigVariantId: Scalars['String']['input'];
};

export type MutationUpdatePaymentTransactionArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePaymentTransactionInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  input: UpdateProductDto;
};

export type MutationUpdateProductDesignArgs = {
  id: Scalars['String']['input'];
  input: UpdateProductDesignDto;
};

export type MutationUpdateProductPositionTypeArgs = {
  input: UpdateProductPositionTypeDto;
};

export type MutationUpdateSystemConfigBankArgs = {
  input: UpdateSystemConfigBankDto;
};

export type MutationUpdateSystemConfigVariantArgs = {
  updateSystemConfigVariantInput: UpdateSystemConfigVariantInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserDto;
};

export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
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
};

export type OrderDetailEntity = {
  __typename?: 'OrderDetailEntity';
  checkQualities?: Maybe<Array<CheckQualityEntity>>;
  completedQty: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  design?: Maybe<ProductDesignEntity>;
  designId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isRework: Scalars['Boolean']['output'];
  order?: Maybe<OrderEntity>;
  orderId: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  productionCost?: Maybe<Scalars['Int']['output']>;
  quantity: Scalars['Int']['output'];
  rejectedQty: Scalars['Int']['output'];
  reworkTime: Scalars['Int']['output'];
  status: OrderDetailStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum OrderDetailStatus {
  Completed = 'COMPLETED',
  DoneCheckQuality = 'DONE_CHECK_QUALITY',
  DoneProduction = 'DONE_PRODUCTION',
  InProduction = 'IN_PRODUCTION',
  Pending = 'PENDING',
  ReadyForShipping = 'READY_FOR_SHIPPING',
  ReworkDone = 'REWORK_DONE',
  ReworkInProgress = 'REWORK_IN_PROGRESS',
  ReworkRequired = 'REWORK_REQUIRED',
  Shipped = 'SHIPPED',
  WaitingForCheckingQuality = 'WAITING_FOR_CHECKING_QUALITY',
}

export type OrderEntity = {
  __typename?: 'OrderEntity';
  acceptanceDeadline?: Maybe<Scalars['DateTime']['output']>;
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  address?: Maybe<AddressEntity>;
  addressId?: Maybe<Scalars['String']['output']>;
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  currentProgress?: Maybe<Scalars['Int']['output']>;
  customer?: Maybe<UserEntity>;
  customerId: Scalars['String']['output'];
  delayReason?: Maybe<Scalars['String']['output']>;
  doneCheckQualityAt?: Maybe<Scalars['DateTime']['output']>;
  doneProductionAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedCheckQualityAt: Scalars['DateTime']['output'];
  estimatedCompletionAt: Scalars['DateTime']['output'];
  estimatedDoneProductionAt: Scalars['DateTime']['output'];
  estimatedShippingAt: Scalars['DateTime']['output'];
  factory?: Maybe<FactoryEntity>;
  factoryId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDelayed: Scalars['Boolean']['output'];
  orderDate: Scalars['DateTime']['output'];
  orderDetails?: Maybe<Array<OrderDetailEntity>>;
  orderProgressReports?: Maybe<Array<OrderProgressReportEntity>>;
  payments?: Maybe<Array<PaymentEntity>>;
  ratedAt?: Maybe<Scalars['DateTime']['output']>;
  ratedBy?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  ratingComment?: Maybe<Scalars['String']['output']>;
  rejectedHistory?: Maybe<Array<RejectedOrderEntity>>;
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  shippingPrice: Scalars['Int']['output'];
  status: OrderStatus;
  tasks?: Maybe<Array<TaskEntity>>;
  totalItems: Scalars['Int']['output'];
  totalPrice: Scalars['Int']['output'];
  totalProductionCost?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderProgressReportEntity = {
  __typename?: 'OrderProgressReportEntity';
  id: Scalars['ID']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  order?: Maybe<OrderEntity>;
  orderId: Scalars['String']['output'];
  reportDate: Scalars['DateTime']['output'];
};

export enum OrderStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  InProduction = 'IN_PRODUCTION',
  NeedManagerHandle = 'NEED_MANAGER_HANDLE',
  PaymentReceived = 'PAYMENT_RECEIVED',
  Pending = 'PENDING',
  PendingAcceptance = 'PENDING_ACCEPTANCE',
  ReadyForShipping = 'READY_FOR_SHIPPING',
  Rejected = 'REJECTED',
  ReworkInProgress = 'REWORK_IN_PROGRESS',
  ReworkRequired = 'REWORK_REQUIRED',
  Shipped = 'SHIPPED',
  WaitingFillInformation = 'WAITING_FILL_INFORMATION',
  WaitingForCheckingQuality = 'WAITING_FOR_CHECKING_QUALITY',
  WaitingPayment = 'WAITING_PAYMENT',
}

export type OrderStatusDetail = {
  __typename?: 'OrderStatusDetail';
  count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type OrderWithFactory = {
  __typename?: 'OrderWithFactory';
  factory?: Maybe<FactoryInfo>;
  id: Scalars['String']['output'];
  orderDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  totalPrice: Scalars['Int']['output'];
};

export type PaymentEntity = {
  __typename?: 'PaymentEntity';
  amount: Scalars['Int']['output'];
  customer?: Maybe<UserEntity>;
  customerId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order?: Maybe<OrderEntity>;
  orderId: Scalars['String']['output'];
  paymentLog: Scalars['String']['output'];
  status: Scalars['String']['output'];
  transactions?: Maybe<Array<PaymentTransactionEntity>>;
  type: Scalars['String']['output'];
};

/** Method of payment */
export enum PaymentMethod {
  Payos = 'PAYOS',
  Vnpay = 'VNPAY',
}

export type PaymentTransactionEntity = {
  __typename?: 'PaymentTransactionEntity';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<UserEntity>;
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  paymentGatewayTransactionId: Scalars['String']['output'];
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  transactionLog: Scalars['String']['output'];
  type: TransactionType;
};

export type ProductDesignEntity = {
  __typename?: 'ProductDesignEntity';
  createdAt: Scalars['DateTime']['output'];
  designPositions?: Maybe<Array<DesignPositionEntity>>;
  id: Scalars['ID']['output'];
  isFinalized: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isTemplate: Scalars['Boolean']['output'];
  systemConfigVariant?: Maybe<SystemConfigVariantEntity>;
  systemConfigVariantId: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserEntity>;
  userId: Scalars['String']['output'];
};

/** Product */
export type ProductEntity = {
  __typename?: 'ProductEntity';
  category?: Maybe<CategoryEntity>;
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discounts?: Maybe<Array<SystemConfigDiscountEntity>>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  model3DUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  positionTypes?: Maybe<Array<ProductPositionTypeEntity>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Array<SystemConfigVariantEntity>>;
  weight?: Maybe<Scalars['Float']['output']>;
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

export type QualityIssueWithFactory = {
  __typename?: 'QualityIssueWithFactory';
  description: Scalars['String']['output'];
  factoryOrder: FactoryOrderInfo;
  id: Scalars['String']['output'];
  issueType: Scalars['String']['output'];
  reportedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  address: AddressEntity;
  addresses: Array<AddressEntity>;
  availableServices: Array<ShippingService>;
  availableStaffForFactory: Array<UserEntity>;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  designPosition: DesignPositionEntity;
  distinctVariantAttributes: VariantAttributes;
  district: District;
  districts: Array<District>;
  factoryOrders: Array<OrderEntity>;
  factoryProduct: FactoryProductEntity;
  factoryProducts: Array<FactoryProductEntity>;
  formatAddress: FormattedAddressModel;
  getAdminDashboard: AdminDashboardResponse;
  getAllFactories: Array<FactoryEntity>;
  getCartItem: CartItemEntity;
  getCartItemCount: Scalars['Float']['output'];
  getEnhancedManagerDashboard: EnhancedManagerDashboardResponse;
  getFactoryById: FactoryEntity;
  getFactoryDashboard: FactoryDashboardResponse;
  getManagerDashboard: ManagerDashboardResponse;
  getMe: UserEntity;
  getMyFactory: FactoryEntity;
  myNotifications: Array<NotificationEntity>;
  myOrders: Array<OrderEntity>;
  notification: NotificationEntity;
  notifications: Array<NotificationEntity>;
  notificationsByUserId: Array<NotificationEntity>;
  order: OrderEntity;
  orders: Array<OrderEntity>;
  paymentTransaction?: Maybe<PaymentTransactionEntity>;
  paymentTransactions: Array<PaymentTransactionEntity>;
  paymentTransactionsByCustomer: Array<PaymentTransactionEntity>;
  paymentTransactionsByPayment: Array<PaymentTransactionEntity>;
  product: ProductEntity;
  productDesign: ProductDesignEntity;
  productDesigns: Array<ProductDesignEntity>;
  productDesignsByUser: Array<ProductDesignEntity>;
  productPositionType: ProductPositionTypeEntity;
  productPositionTypes: Array<ProductPositionTypeEntity>;
  products: Array<ProductEntity>;
  province: Province;
  provinces: Array<Province>;
  staffOrders: Array<OrderEntity>;
  staffs: Array<UserEntity>;
  systemConfigBank: SystemConfigBankEntity;
  systemConfigBanks: Array<SystemConfigBankEntity>;
  systemConfigVariant: SystemConfigVariantEntity;
  systemConfigVariants: Array<SystemConfigVariantEntity>;
  systemConfigVariantsByProduct: Array<SystemConfigVariantEntity>;
  user: UserEntity;
  userCartItems: Array<CartItemEntity>;
  users: Array<UserEntity>;
  ward: Ward;
  wards: Array<Ward>;
};

export type QueryAddressArgs = {
  id: Scalars['String']['input'];
};

export type QueryAvailableServicesArgs = {
  servicesInput: GetAvailableServicesDto;
};

export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};

export type QueryDesignPositionArgs = {
  designId: Scalars['ID']['input'];
  productPositionTypeId: Scalars['ID']['input'];
};

export type QueryDistinctVariantAttributesArgs = {
  productId: Scalars['String']['input'];
};

export type QueryDistrictArgs = {
  districtId: Scalars['Int']['input'];
};

export type QueryDistrictsArgs = {
  provinceId: Scalars['Int']['input'];
};

export type QueryFactoryProductArgs = {
  factoryId: Scalars['String']['input'];
  systemConfigVariantId: Scalars['String']['input'];
};

export type QueryFormatAddressArgs = {
  formatAddressInput: FormatAddressInput;
};

export type QueryGetCartItemArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetFactoryByIdArgs = {
  factoryId: Scalars['String']['input'];
};

export type QueryNotificationArgs = {
  id: Scalars['String']['input'];
};

export type QueryNotificationsByUserIdArgs = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};

export type QueryPaymentTransactionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPaymentTransactionsByCustomerArgs = {
  customerId: Scalars['ID']['input'];
};

export type QueryPaymentTransactionsByPaymentArgs = {
  paymentId: Scalars['ID']['input'];
};

export type QueryProductArgs = {
  id: Scalars['String']['input'];
};

export type QueryProductDesignArgs = {
  id: Scalars['ID']['input'];
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

export type QuerySystemConfigVariantArgs = {
  id: Scalars['String']['input'];
};

export type QuerySystemConfigVariantsByProductArgs = {
  productId: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type QueryWardArgs = {
  wardCode: Scalars['String']['input'];
};

export type QueryWardsArgs = {
  districtId: Scalars['Int']['input'];
};

export type RecentActivity = {
  __typename?: 'RecentActivity';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  relatedId?: Maybe<Scalars['String']['output']>;
  time: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: ActivityType;
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

export type RejectedOrderEntity = {
  __typename?: 'RejectedOrderEntity';
  factory?: Maybe<FactoryEntity>;
  factoryId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order?: Maybe<OrderEntity>;
  orderId: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  reassignedAt?: Maybe<Scalars['DateTime']['output']>;
  reassignedTo?: Maybe<Scalars['String']['output']>;
  rejectedAt: Scalars['DateTime']['output'];
};

/** User roles */
export enum Roles {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Factoryowner = 'FACTORYOWNER',
  Manager = 'MANAGER',
  Staff = 'STAFF',
}

export type ShippingFee = {
  __typename?: 'ShippingFee';
  total: Scalars['Int']['output'];
};

export type ShippingOrder = {
  __typename?: 'ShippingOrder';
  code?: Maybe<Scalars['Int']['output']>;
  districtEncode?: Maybe<Scalars['String']['output']>;
  expectedDeliveryTime?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<ShippingOrderFee>;
  message?: Maybe<Scalars['String']['output']>;
  orderCode?: Maybe<Scalars['String']['output']>;
  sortCode?: Maybe<Scalars['String']['output']>;
  totalFee?: Maybe<Scalars['String']['output']>;
  transType?: Maybe<Scalars['String']['output']>;
  wardEncode?: Maybe<Scalars['String']['output']>;
};

export type ShippingOrderFee = {
  __typename?: 'ShippingOrderFee';
  coupon?: Maybe<Scalars['Int']['output']>;
  insurance?: Maybe<Scalars['Int']['output']>;
  main_service?: Maybe<Scalars['Int']['output']>;
  r2s?: Maybe<Scalars['Int']['output']>;
  return?: Maybe<Scalars['Int']['output']>;
  station_do?: Maybe<Scalars['Int']['output']>;
  station_pu?: Maybe<Scalars['Int']['output']>;
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

export type SystemConfigDiscountEntity = {
  __typename?: 'SystemConfigDiscountEntity';
  createdAt: Scalars['DateTime']['output'];
  discountPercent: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  minQuantity: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  product: ProductEntity;
  updatedAt: Scalars['DateTime']['output'];
};

export type SystemConfigVariantEntity = {
  __typename?: 'SystemConfigVariantEntity';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  model?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product: ProductEntity;
  productId: Scalars['String']['output'];
  size?: Maybe<Scalars['String']['output']>;
};

export type TaskEntity = {
  __typename?: 'TaskEntity';
  assignedDate: Scalars['DateTime']['output'];
  assignee?: Maybe<UserEntity>;
  checkQualities?: Maybe<Array<CheckQualityEntity>>;
  completedDate?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  expiredTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  order?: Maybe<OrderEntity>;
  orderId?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  taskType: Scalars['String']['output'];
  taskname: Scalars['String']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

/** Status of transaction */
export enum TransactionStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
}

/** Type of transaction */
export enum TransactionType {
  Payment = 'PAYMENT',
  Refund = 'REFUND',
}

export type UpdateAddressInput = {
  districtID?: InputMaybe<Scalars['Float']['input']>;
  factoryId?: InputMaybe<Scalars['String']['input']>;
  provinceID?: InputMaybe<Scalars['Float']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  wardCode?: InputMaybe<Scalars['String']['input']>;
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
  designId: Scalars['String']['input'];
  designJSON?: InputMaybe<Scalars['JSON']['input']>;
  productPositionTypeId: Scalars['String']['input'];
};

/** Update factory information input */
export type UpdateFactoryInfoDto = {
  addressInput?: InputMaybe<CreateAddressInput>;
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
  systemConfigVariantIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  totalEmployees?: InputMaybe<Scalars['Int']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFactoryProductInput = {
  factoryId?: InputMaybe<Scalars['String']['input']>;
  productionCapacity?: InputMaybe<Scalars['Int']['input']>;
  productionTimeInMinutes?: InputMaybe<Scalars['Int']['input']>;
  systemConfigVariantId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFactoryStatusDto = {
  factoryOwnerId: Scalars['String']['input'];
  staffId: Scalars['String']['input'];
  status: FactoryStatus;
};

export type UpdatePaymentTransactionInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  paymentGatewayTransactionId?: InputMaybe<Scalars['String']['input']>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  status?: InputMaybe<TransactionStatus>;
  transactionLog?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionType>;
};

export type UpdateProductDesignDto = {
  isFinalized?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  systemConfigVariantId?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Update Product */
export type UpdateProductDto = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  model3DUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
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

export type UpdateSystemConfigVariantInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
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
  ownedFactory?: Maybe<FactoryEntity>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role: Roles;
  staffedFactory?: Maybe<FactoryEntity>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type VariantAttributes = {
  __typename?: 'VariantAttributes';
  colors: Array<Scalars['String']['output']>;
  models: Array<Scalars['String']['output']>;
  sizes: Array<Scalars['String']['output']>;
};

export type Ward = {
  __typename?: 'Ward';
  districtId: Scalars['Int']['output'];
  wardCode: Scalars['String']['output'];
  wardName: Scalars['String']['output'];
};

export type AddressesQueryVariables = Exact<{ [key: string]: never }>;

export type AddressesQuery = {
  __typename?: 'Query';
  addresses: Array<{
    __typename?: 'AddressEntity';
    id: string;
    districtID: number;
    provinceID: number;
    street: string;
    wardCode: string;
  }>;
};

export type CreateAddressMutationVariables = Exact<{
  createAddressInput: CreateAddressInput;
}>;

export type CreateAddressMutation = {
  __typename?: 'Mutation';
  createAddress: {
    __typename?: 'AddressEntity';
    districtID: number;
    provinceID: number;
    street: string;
    wardCode: string;
  };
};

export type DeleteAddressMutationVariables = Exact<{
  deleteAddressId: Scalars['String']['input'];
}>;

export type DeleteAddressMutation = {
  __typename?: 'Mutation';
  deleteAddress: { __typename?: 'AddressEntity'; id: string };
};

export type GetAddressDetailsQueryVariables = Exact<{
  provinceId: Scalars['Int']['input'];
  districtId: Scalars['Int']['input'];
  wardCode: Scalars['String']['input'];
}>;

export type GetAddressDetailsQuery = {
  __typename?: 'Query';
  province: {
    __typename?: 'Province';
    provinceId: number;
    provinceName: string;
  };
  district: {
    __typename?: 'District';
    districtId: number;
    districtName: string;
    provinceId: number;
  };
  ward: {
    __typename?: 'Ward';
    districtId: number;
    wardCode: string;
    wardName: string;
  };
};

export type FormatAddressQueryVariables = Exact<{
  formatAddressInput: FormatAddressInput;
}>;

export type FormatAddressQuery = {
  __typename?: 'Query';
  formatAddress: { __typename?: 'FormattedAddressModel'; text: string };
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
      ownedFactory?: {
        __typename?: 'FactoryEntity';
        name: string;
        factoryStatus?: FactoryStatus | null;
      } | null;
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
      ownedFactory?: {
        __typename?: 'FactoryEntity';
        name: string;
        factoryStatus?: FactoryStatus | null;
      } | null;
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
      ownedFactory?: {
        __typename?: 'FactoryEntity';
        name: string;
        factoryStatus?: FactoryStatus | null;
      } | null;
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
    isDeleted: boolean;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    updatedAt?: any | null;
    ownedFactory?: {
      __typename?: 'FactoryEntity';
      name: string;
      factoryStatus?: FactoryStatus | null;
    } | null;
  };
};

export type GetUserCartItemsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserCartItemsQuery = {
  __typename?: 'Query';
  userCartItems: Array<{
    __typename?: 'CartItemEntity';
    id: string;
    quantity: number;
    design?: {
      __typename?: 'ProductDesignEntity';
      thumbnailUrl?: string | null;
      systemConfigVariant?: {
        __typename?: 'SystemConfigVariantEntity';
        id: string;
        price?: number | null;
        color?: string | null;
        size?: string | null;
        model?: string | null;
        isActive: boolean;
        isDeleted: boolean;
        product: {
          __typename?: 'ProductEntity';
          id: string;
          name: string;
          imageUrl?: string | null;
          discounts?: Array<{
            __typename?: 'SystemConfigDiscountEntity';
            minQuantity: number;
            name: string;
            discountPercent: number;
          }> | null;
        };
      } | null;
      designPositions?: Array<{
        __typename?: 'DesignPositionEntity';
        designJSON?: any | null;
        positionType?: {
          __typename?: 'ProductPositionTypeEntity';
          id: string;
          positionName: string;
          basePrice: number;
        } | null;
      }> | null;
    } | null;
  }>;
};

export type GetCartItemCountQueryVariables = Exact<{ [key: string]: never }>;

export type GetCartItemCountQuery = {
  __typename?: 'Query';
  getCartItemCount: number;
};

export type CreateCartItemMutationVariables = Exact<{
  createCartItemInput: CreateCartItemDto;
}>;

export type CreateCartItemMutation = {
  __typename?: 'Mutation';
  createCartItem: {
    __typename?: 'CartItemEntity';
    userId: string;
    id: string;
    quantity: number;
  };
};

export type UpdateCartItemMutationVariables = Exact<{
  updateCartItemId: Scalars['String']['input'];
  updateCartItemInput: UpdateCartItemDto;
}>;

export type UpdateCartItemMutation = {
  __typename?: 'Mutation';
  updateCartItem: {
    __typename?: 'CartItemEntity';
    userId: string;
    id: string;
    quantity: number;
  };
};

export type CalculateShippingFeeMutationVariables = Exact<{
  input: CalculateShippingFeeDto;
}>;

export type CalculateShippingFeeMutation = {
  __typename?: 'Mutation';
  calculateShippingFee: { __typename?: 'ShippingFee'; total: number };
};

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'CategoryEntity';
    createdAt: any;
    description?: string | null;
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name: string;
    totalProducts?: number | null;
    updatedAt?: any | null;
  }>;
};

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryDto;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'CategoryEntity';
    createdAt: any;
    description?: string | null;
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name: string;
    totalProducts?: number | null;
    updatedAt?: any | null;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['String']['input'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  deleteCategory: {
    __typename?: 'CategoryEntity';
    createdAt: any;
    description?: string | null;
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name: string;
    totalProducts?: number | null;
    updatedAt?: any | null;
  };
};

export type GetEnhancedManagerDashboardQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetEnhancedManagerDashboardQuery = {
  __typename?: 'Query';
  getEnhancedManagerDashboard: {
    __typename?: 'EnhancedManagerDashboardResponse';
    stats: {
      __typename?: 'DashboardStats';
      factories: {
        __typename?: 'EnhancedFactoryStats';
        total: number;
        change: string;
        changeType: ChangeType;
      };
      orders: {
        __typename?: 'EnhancedOrderStats';
        active: number;
        change: string;
        changeType: ChangeType;
      };
      staff: {
        __typename?: 'EnhancedStaffStats';
        total: number;
        change: string;
        changeType: ChangeType;
      };
      revenue: {
        __typename?: 'EnhancedRevenueStats';
        monthly: string;
        change: string;
        changeType: ChangeType;
      };
    };
    factoryPerformance: Array<{
      __typename?: 'EnhancedFactoryPerformance';
      factoryId: string;
      factoryName: string;
      orderCount: number;
      totalRevenue: number;
    }>;
    orderStatus: Array<{
      __typename?: 'OrderStatusDetail';
      status: string;
      count: number;
    }>;
    recentActivities: Array<{
      __typename?: 'RecentActivity';
      id: string;
      type: ActivityType;
      title: string;
      description: string;
      time: string;
      relatedId?: string | null;
    }>;
  };
};

export type UpdateDesignPositionMutationVariables = Exact<{
  input: UpdateDesignPositionDto;
}>;

export type UpdateDesignPositionMutation = {
  __typename?: 'Mutation';
  updateDesignPosition: {
    __typename?: 'DesignPositionEntity';
    designJSON?: any | null;
    positionType?: {
      __typename?: 'ProductPositionTypeEntity';
      positionName: string;
      basePrice: number;
    } | null;
  };
};

export type GetMyFactoryQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyFactoryQuery = {
  __typename?: 'Query';
  getMyFactory: {
    __typename?: 'FactoryEntity';
    businessLicenseUrl?: string | null;
    contactPersonName?: string | null;
    contactPersonPhone?: string | null;
    contractUrl?: string | null;
    description?: string | null;
    establishedDate?: any | null;
    factoryStatus?: FactoryStatus | null;
    isSubmitted?: boolean | null;
    leadTime?: number | null;
    maxPrintingCapacity?: number | null;
    minimumOrderQuantity?: number | null;
    name: string;
    operationalHours?: string | null;
    printingMethods: Array<string>;
    qualityCertifications?: string | null;
    specializations: Array<string>;
    taxIdentificationNumber?: string | null;
    totalEmployees?: number | null;
    website?: string | null;
    contactPersonRole?: string | null;
    contractAccepted?: boolean | null;
    reviewedBy?: string | null;
    reviewedAt?: any | null;
    contractAcceptedAt?: any | null;
    factoryOwnerId: string;
    formattedAddress?: string | null;
    address?: {
      __typename?: 'AddressEntity';
      id: string;
      districtID: number;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    owner?: {
      __typename?: 'UserEntity';
      email?: string | null;
      name?: string | null;
      imageUrl?: string | null;
    } | null;
    products?: Array<{
      __typename?: 'FactoryProductEntity';
      productionCapacity: number;
      systemConfigVariantId: string;
      factoryId: string;
      systemConfigVariant?: {
        __typename?: 'SystemConfigVariantEntity';
        color?: string | null;
        id: string;
        isActive: boolean;
        model?: string | null;
        price?: number | null;
        productId: string;
        size?: string | null;
      } | null;
    }> | null;
    staff?: {
      __typename?: 'UserEntity';
      id: string;
      imageUrl?: string | null;
      email?: string | null;
      name?: string | null;
    } | null;
  };
};

export type GetFactoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetFactoriesQuery = {
  __typename?: 'Query';
  getAllFactories: Array<{
    __typename?: 'FactoryEntity';
    businessLicenseUrl?: string | null;
    contactPersonName?: string | null;
    contactPersonPhone?: string | null;
    contractUrl?: string | null;
    description?: string | null;
    establishedDate?: any | null;
    factoryStatus?: FactoryStatus | null;
    isSubmitted?: boolean | null;
    leadTime?: number | null;
    maxPrintingCapacity?: number | null;
    minimumOrderQuantity?: number | null;
    name: string;
    operationalHours?: string | null;
    printingMethods: Array<string>;
    qualityCertifications?: string | null;
    specializations: Array<string>;
    taxIdentificationNumber?: string | null;
    totalEmployees?: number | null;
    website?: string | null;
    contactPersonRole?: string | null;
    contractAccepted?: boolean | null;
    reviewedBy?: string | null;
    reviewedAt?: any | null;
    contractAcceptedAt?: any | null;
    factoryOwnerId: string;
    formattedAddress?: string | null;
    address?: {
      __typename?: 'AddressEntity';
      id: string;
      districtID: number;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    owner?: {
      __typename?: 'UserEntity';
      email?: string | null;
      name?: string | null;
      imageUrl?: string | null;
    } | null;
    products?: Array<{
      __typename?: 'FactoryProductEntity';
      productionCapacity: number;
      systemConfigVariantId: string;
      factoryId: string;
      systemConfigVariant?: {
        __typename?: 'SystemConfigVariantEntity';
        color?: string | null;
        id: string;
        isActive: boolean;
        model?: string | null;
        price?: number | null;
        productId: string;
        size?: string | null;
      } | null;
    }> | null;
    staff?: {
      __typename?: 'UserEntity';
      id: string;
      imageUrl?: string | null;
      email?: string | null;
      name?: string | null;
    } | null;
  }>;
};

export type GetFactoryByIdQueryVariables = Exact<{
  factoryId: Scalars['String']['input'];
}>;

export type GetFactoryByIdQuery = {
  __typename?: 'Query';
  getFactoryById: {
    __typename?: 'FactoryEntity';
    businessLicenseUrl?: string | null;
    contactPersonName?: string | null;
    contactPersonPhone?: string | null;
    contractUrl?: string | null;
    description?: string | null;
    establishedDate?: any | null;
    factoryStatus?: FactoryStatus | null;
    isSubmitted?: boolean | null;
    leadTime?: number | null;
    maxPrintingCapacity?: number | null;
    minimumOrderQuantity?: number | null;
    name: string;
    operationalHours?: string | null;
    printingMethods: Array<string>;
    qualityCertifications?: string | null;
    specializations: Array<string>;
    taxIdentificationNumber?: string | null;
    totalEmployees?: number | null;
    website?: string | null;
    contactPersonRole?: string | null;
    contractAccepted?: boolean | null;
    reviewedBy?: string | null;
    reviewedAt?: any | null;
    contractAcceptedAt?: any | null;
    factoryOwnerId: string;
    formattedAddress?: string | null;
    address?: {
      __typename?: 'AddressEntity';
      id: string;
      districtID: number;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    owner?: {
      __typename?: 'UserEntity';
      id: string;
      email?: string | null;
      name?: string | null;
      imageUrl?: string | null;
    } | null;
    products?: Array<{
      __typename?: 'FactoryProductEntity';
      productionCapacity: number;
      systemConfigVariantId: string;
      factoryId: string;
      productionTimeInMinutes: number;
      systemConfigVariant?: {
        __typename?: 'SystemConfigVariantEntity';
        color?: string | null;
        id: string;
        isActive: boolean;
        model?: string | null;
        price?: number | null;
        productId: string;
        size?: string | null;
      } | null;
    }> | null;
    staff?: {
      __typename?: 'UserEntity';
      id: string;
      imageUrl?: string | null;
      email?: string | null;
      name?: string | null;
    } | null;
  };
};

export type UpdateFactoryInfoMutationVariables = Exact<{
  updateFactoryInfoInput: UpdateFactoryInfoDto;
}>;

export type UpdateFactoryInfoMutation = {
  __typename?: 'Mutation';
  updateFactoryInfo: {
    __typename?: 'FactoryEntity';
    businessLicenseUrl?: string | null;
    contactPersonName?: string | null;
    contactPersonPhone?: string | null;
    contractUrl?: string | null;
    description?: string | null;
    establishedDate?: any | null;
    factoryStatus?: FactoryStatus | null;
    isSubmitted?: boolean | null;
    leadTime?: number | null;
    maxPrintingCapacity?: number | null;
    minimumOrderQuantity?: number | null;
    name: string;
    operationalHours?: string | null;
    printingMethods: Array<string>;
    qualityCertifications?: string | null;
    specializations: Array<string>;
    taxIdentificationNumber?: string | null;
    totalEmployees?: number | null;
    website?: string | null;
    contactPersonRole?: string | null;
    contractAccepted?: boolean | null;
    reviewedBy?: string | null;
    reviewedAt?: any | null;
    contractAcceptedAt?: any | null;
    factoryOwnerId: string;
    formattedAddress?: string | null;
    address?: {
      __typename?: 'AddressEntity';
      id: string;
      districtID: number;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    owner?: {
      __typename?: 'UserEntity';
      email?: string | null;
      name?: string | null;
      imageUrl?: string | null;
    } | null;
    products?: Array<{
      __typename?: 'FactoryProductEntity';
      productionCapacity: number;
      systemConfigVariantId: string;
      factoryId: string;
      systemConfigVariant?: {
        __typename?: 'SystemConfigVariantEntity';
        color?: string | null;
        id: string;
        isActive: boolean;
        model?: string | null;
        price?: number | null;
        productId: string;
        size?: string | null;
      } | null;
    }> | null;
    staff?: {
      __typename?: 'UserEntity';
      id: string;
      imageUrl?: string | null;
      email?: string | null;
      name?: string | null;
    } | null;
  };
};

export type ChangeFactoryStatusMutationVariables = Exact<{
  data: UpdateFactoryStatusDto;
}>;

export type ChangeFactoryStatusMutation = {
  __typename?: 'Mutation';
  changeFactoryStatus: {
    __typename?: 'FactoryEntity';
    factoryStatus?: FactoryStatus | null;
  };
};

export type MyNotificationsQueryVariables = Exact<{ [key: string]: never }>;

export type MyNotificationsQuery = {
  __typename?: 'Query';
  myNotifications: Array<{
    __typename?: 'NotificationEntity';
    content?: string | null;
    createdAt: any;
    id: string;
    isRead: boolean;
    title?: string | null;
    updatedAt?: any | null;
    url?: string | null;
  }>;
};

export type MarkNotificationAsReadMutationVariables = Exact<{
  markNotificationAsReadId: Scalars['String']['input'];
}>;

export type MarkNotificationAsReadMutation = {
  __typename?: 'Mutation';
  markNotificationAsRead: {
    __typename?: 'NotificationEntity';
    content?: string | null;
    createdAt: any;
    id: string;
    isRead: boolean;
    title?: string | null;
    updatedAt?: any | null;
    url?: string | null;
  };
};

export type CreatePaymentGatewayUrlMutationVariables = Exact<{
  gateway: Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
}>;

export type CreatePaymentGatewayUrlMutation = {
  __typename?: 'Mutation';
  createPayment: string;
};

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder: { __typename?: 'OrderEntity'; id: string };
};

export type GetMyOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyOrdersQuery = {
  __typename?: 'Query';
  myOrders: Array<{
    __typename?: 'OrderEntity';
    acceptanceDeadline?: any | null;
    acceptedAt?: any | null;
    addressId?: string | null;
    assignedAt?: any | null;
    completedAt?: any | null;
    currentProgress?: number | null;
    customerId: string;
    delayReason?: string | null;
    doneCheckQualityAt?: any | null;
    doneProductionAt?: any | null;
    estimatedCheckQualityAt: any;
    estimatedCompletionAt: any;
    estimatedDoneProductionAt: any;
    estimatedShippingAt: any;
    id: string;
    isDelayed: boolean;
    orderDate: any;
    ratedAt?: any | null;
    ratedBy?: string | null;
    rating?: number | null;
    ratingComment?: string | null;
    shippedAt?: any | null;
    shippingPrice: number;
    status: OrderStatus;
    totalItems: number;
    totalPrice: number;
    totalProductionCost?: number | null;
    updatedAt?: any | null;
    address?: {
      __typename?: 'AddressEntity';
      districtID: number;
      factoryId: string;
      id: string;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    customer?: {
      __typename?: 'UserEntity';
      imageUrl?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
    factory?: {
      __typename?: 'FactoryEntity';
      name: string;
      owner?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    } | null;
    orderDetails?: Array<{
      __typename?: 'OrderDetailEntity';
      completedQty: number;
      createdAt: any;
      id: string;
      isRework: boolean;
      price: number;
      productionCost?: number | null;
      quantity: number;
      rejectedQty: number;
      reworkTime: number;
      status: OrderDetailStatus;
      updatedAt?: any | null;
      checkQualities?: Array<{
        __typename?: 'CheckQualityEntity';
        totalChecked: number;
        status: string;
        passedQuantity: number;
        orderDetailId: string;
        task?: {
          __typename?: 'TaskEntity';
          taskname: string;
          taskType: string;
          status: string;
          startDate: any;
          note?: string | null;
          id: string;
          expiredTime: any;
          description: string;
          completedDate?: any | null;
          assignedDate: any;
          assignee?: {
            __typename?: 'UserEntity';
            email?: string | null;
            name?: string | null;
            imageUrl?: string | null;
            id: string;
          } | null;
        } | null;
      }> | null;
      design?: {
        __typename?: 'ProductDesignEntity';
        thumbnailUrl?: string | null;
        systemConfigVariantId: string;
        isTemplate: boolean;
        isPublic: boolean;
        isFinalized: boolean;
        id: string;
        systemConfigVariant?: {
          __typename?: 'SystemConfigVariantEntity';
          color?: string | null;
          id: string;
          isActive: boolean;
          isDeleted: boolean;
          model?: string | null;
          price?: number | null;
          productId: string;
          size?: string | null;
          product: {
            __typename?: 'ProductEntity';
            name: string;
            imageUrl?: string | null;
          };
        } | null;
        designPositions?: Array<{
          __typename?: 'DesignPositionEntity';
          designJSON?: any | null;
          positionType?: {
            __typename?: 'ProductPositionTypeEntity';
            positionName: string;
            basePrice: number;
          } | null;
        }> | null;
      } | null;
    }> | null;
    orderProgressReports?: Array<{
      __typename?: 'OrderProgressReportEntity';
      reportDate: any;
      note?: string | null;
      imageUrls: Array<string>;
      id: string;
    }> | null;
    payments?: Array<{
      __typename?: 'PaymentEntity';
      id: string;
      type: string;
      paymentLog: string;
      amount: number;
      status: string;
      transactions?: Array<{
        __typename?: 'PaymentTransactionEntity';
        transactionLog: string;
        status: TransactionStatus;
        paymentMethod: PaymentMethod;
        createdAt: any;
        amount: number;
        id: string;
        type: TransactionType;
      }> | null;
    }> | null;
    rejectedHistory?: Array<{
      __typename?: 'RejectedOrderEntity';
      rejectedAt: any;
      reassignedTo?: string | null;
      reassignedAt?: any | null;
      reason: string;
      id: string;
      factory?: {
        __typename?: 'FactoryEntity';
        name: string;
        contractUrl?: string | null;
        address?: {
          __typename?: 'AddressEntity';
          wardCode: string;
          street: string;
          districtID: number;
          provinceID: number;
        } | null;
        owner?: {
          __typename?: 'UserEntity';
          name?: string | null;
          email?: string | null;
          imageUrl?: string | null;
        } | null;
      } | null;
    }> | null;
    tasks?: Array<{
      __typename?: 'TaskEntity';
      taskname: string;
      taskType: string;
      id: string;
      status: string;
      startDate: any;
      note?: string | null;
      description: string;
      expiredTime: any;
      completedDate?: any | null;
      assignedDate: any;
      assignee?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    }> | null;
  }>;
};

export type GetMyFactoryOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyFactoryOrdersQuery = {
  __typename?: 'Query';
  factoryOrders: Array<{
    __typename?: 'OrderEntity';
    acceptanceDeadline?: any | null;
    acceptedAt?: any | null;
    addressId?: string | null;
    assignedAt?: any | null;
    completedAt?: any | null;
    currentProgress?: number | null;
    customerId: string;
    delayReason?: string | null;
    doneCheckQualityAt?: any | null;
    doneProductionAt?: any | null;
    estimatedCheckQualityAt: any;
    estimatedCompletionAt: any;
    estimatedDoneProductionAt: any;
    estimatedShippingAt: any;
    id: string;
    isDelayed: boolean;
    orderDate: any;
    ratedAt?: any | null;
    ratedBy?: string | null;
    rating?: number | null;
    ratingComment?: string | null;
    shippedAt?: any | null;
    shippingPrice: number;
    status: OrderStatus;
    totalItems: number;
    totalPrice: number;
    totalProductionCost?: number | null;
    updatedAt?: any | null;
    address?: {
      __typename?: 'AddressEntity';
      districtID: number;
      factoryId: string;
      id: string;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    customer?: {
      __typename?: 'UserEntity';
      imageUrl?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
    factory?: {
      __typename?: 'FactoryEntity';
      name: string;
      owner?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    } | null;
    orderDetails?: Array<{
      __typename?: 'OrderDetailEntity';
      completedQty: number;
      createdAt: any;
      id: string;
      isRework: boolean;
      price: number;
      productionCost?: number | null;
      quantity: number;
      rejectedQty: number;
      reworkTime: number;
      status: OrderDetailStatus;
      updatedAt?: any | null;
      checkQualities?: Array<{
        __typename?: 'CheckQualityEntity';
        totalChecked: number;
        status: string;
        passedQuantity: number;
        orderDetailId: string;
        task?: {
          __typename?: 'TaskEntity';
          taskname: string;
          taskType: string;
          status: string;
          startDate: any;
          note?: string | null;
          id: string;
          expiredTime: any;
          description: string;
          completedDate?: any | null;
          assignedDate: any;
          assignee?: {
            __typename?: 'UserEntity';
            email?: string | null;
            name?: string | null;
            imageUrl?: string | null;
            id: string;
          } | null;
        } | null;
      }> | null;
      design?: {
        __typename?: 'ProductDesignEntity';
        thumbnailUrl?: string | null;
        systemConfigVariantId: string;
        isTemplate: boolean;
        isPublic: boolean;
        isFinalized: boolean;
        id: string;
        systemConfigVariant?: {
          __typename?: 'SystemConfigVariantEntity';
          color?: string | null;
          id: string;
          isActive: boolean;
          isDeleted: boolean;
          model?: string | null;
          price?: number | null;
          productId: string;
          size?: string | null;
          product: {
            __typename?: 'ProductEntity';
            name: string;
            imageUrl?: string | null;
          };
        } | null;
        designPositions?: Array<{
          __typename?: 'DesignPositionEntity';
          designJSON?: any | null;
          positionType?: {
            __typename?: 'ProductPositionTypeEntity';
            positionName: string;
            basePrice: number;
          } | null;
        }> | null;
      } | null;
    }> | null;
    orderProgressReports?: Array<{
      __typename?: 'OrderProgressReportEntity';
      reportDate: any;
      note?: string | null;
      imageUrls: Array<string>;
      id: string;
    }> | null;
    payments?: Array<{
      __typename?: 'PaymentEntity';
      id: string;
      type: string;
      paymentLog: string;
      amount: number;
      status: string;
      transactions?: Array<{
        __typename?: 'PaymentTransactionEntity';
        transactionLog: string;
        status: TransactionStatus;
        paymentMethod: PaymentMethod;
        createdAt: any;
        amount: number;
        id: string;
        type: TransactionType;
      }> | null;
    }> | null;
    rejectedHistory?: Array<{
      __typename?: 'RejectedOrderEntity';
      rejectedAt: any;
      reassignedTo?: string | null;
      reassignedAt?: any | null;
      reason: string;
      id: string;
      factory?: {
        __typename?: 'FactoryEntity';
        name: string;
        contractUrl?: string | null;
        address?: {
          __typename?: 'AddressEntity';
          wardCode: string;
          street: string;
          districtID: number;
          provinceID: number;
        } | null;
        owner?: {
          __typename?: 'UserEntity';
          name?: string | null;
          email?: string | null;
          imageUrl?: string | null;
        } | null;
      } | null;
    }> | null;
    tasks?: Array<{
      __typename?: 'TaskEntity';
      taskname: string;
      taskType: string;
      id: string;
      status: string;
      startDate: any;
      note?: string | null;
      description: string;
      expiredTime: any;
      completedDate?: any | null;
      assignedDate: any;
      assignee?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    }> | null;
  }>;
};

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;

export type GetOrderQuery = {
  __typename?: 'Query';
  order: {
    __typename?: 'OrderEntity';
    acceptanceDeadline?: any | null;
    acceptedAt?: any | null;
    addressId?: string | null;
    assignedAt?: any | null;
    completedAt?: any | null;
    currentProgress?: number | null;
    customerId: string;
    delayReason?: string | null;
    doneCheckQualityAt?: any | null;
    doneProductionAt?: any | null;
    estimatedCheckQualityAt: any;
    estimatedCompletionAt: any;
    estimatedDoneProductionAt: any;
    estimatedShippingAt: any;
    id: string;
    isDelayed: boolean;
    orderDate: any;
    ratedAt?: any | null;
    ratedBy?: string | null;
    rating?: number | null;
    ratingComment?: string | null;
    shippedAt?: any | null;
    shippingPrice: number;
    status: OrderStatus;
    totalItems: number;
    totalPrice: number;
    totalProductionCost?: number | null;
    updatedAt?: any | null;
    address?: {
      __typename?: 'AddressEntity';
      districtID: number;
      factoryId: string;
      id: string;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    customer?: {
      __typename?: 'UserEntity';
      imageUrl?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
    factory?: {
      __typename?: 'FactoryEntity';
      name: string;
      owner?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    } | null;
    orderDetails?: Array<{
      __typename?: 'OrderDetailEntity';
      completedQty: number;
      createdAt: any;
      id: string;
      isRework: boolean;
      price: number;
      productionCost?: number | null;
      quantity: number;
      rejectedQty: number;
      reworkTime: number;
      status: OrderDetailStatus;
      updatedAt?: any | null;
      checkQualities?: Array<{
        __typename?: 'CheckQualityEntity';
        id: string;
        totalChecked: number;
        status: string;
        passedQuantity: number;
        orderDetailId: string;
        task?: {
          __typename?: 'TaskEntity';
          taskname: string;
          taskType: string;
          status: string;
          startDate: any;
          note?: string | null;
          id: string;
          expiredTime: any;
          description: string;
          completedDate?: any | null;
          assignedDate: any;
          assignee?: {
            __typename?: 'UserEntity';
            email?: string | null;
            name?: string | null;
            imageUrl?: string | null;
            id: string;
          } | null;
        } | null;
      }> | null;
      design?: {
        __typename?: 'ProductDesignEntity';
        thumbnailUrl?: string | null;
        systemConfigVariantId: string;
        isTemplate: boolean;
        isPublic: boolean;
        isFinalized: boolean;
        id: string;
        systemConfigVariant?: {
          __typename?: 'SystemConfigVariantEntity';
          color?: string | null;
          id: string;
          isActive: boolean;
          isDeleted: boolean;
          model?: string | null;
          price?: number | null;
          productId: string;
          size?: string | null;
          product: {
            __typename?: 'ProductEntity';
            name: string;
            imageUrl?: string | null;
          };
        } | null;
        designPositions?: Array<{
          __typename?: 'DesignPositionEntity';
          designJSON?: any | null;
          positionType?: {
            __typename?: 'ProductPositionTypeEntity';
            positionName: string;
            basePrice: number;
          } | null;
        }> | null;
      } | null;
    }> | null;
    orderProgressReports?: Array<{
      __typename?: 'OrderProgressReportEntity';
      reportDate: any;
      note?: string | null;
      imageUrls: Array<string>;
      id: string;
    }> | null;
    payments?: Array<{
      __typename?: 'PaymentEntity';
      id: string;
      type: string;
      paymentLog: string;
      amount: number;
      status: string;
      transactions?: Array<{
        __typename?: 'PaymentTransactionEntity';
        transactionLog: string;
        status: TransactionStatus;
        paymentMethod: PaymentMethod;
        createdAt: any;
        amount: number;
        id: string;
        type: TransactionType;
      }> | null;
    }> | null;
    rejectedHistory?: Array<{
      __typename?: 'RejectedOrderEntity';
      rejectedAt: any;
      reassignedTo?: string | null;
      reassignedAt?: any | null;
      reason: string;
      id: string;
      factory?: {
        __typename?: 'FactoryEntity';
        name: string;
        contractUrl?: string | null;
        address?: {
          __typename?: 'AddressEntity';
          wardCode: string;
          street: string;
          districtID: number;
          provinceID: number;
        } | null;
        owner?: {
          __typename?: 'UserEntity';
          name?: string | null;
          email?: string | null;
          imageUrl?: string | null;
        } | null;
      } | null;
    }> | null;
    tasks?: Array<{
      __typename?: 'TaskEntity';
      taskname: string;
      taskType: string;
      id: string;
      status: string;
      startDate: any;
      note?: string | null;
      description: string;
      expiredTime: any;
      completedDate?: any | null;
      assignedDate: any;
      assignee?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    }> | null;
  };
};

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllOrdersQuery = {
  __typename?: 'Query';
  orders: Array<{
    __typename?: 'OrderEntity';
    acceptanceDeadline?: any | null;
    acceptedAt?: any | null;
    addressId?: string | null;
    assignedAt?: any | null;
    completedAt?: any | null;
    currentProgress?: number | null;
    customerId: string;
    delayReason?: string | null;
    doneCheckQualityAt?: any | null;
    doneProductionAt?: any | null;
    estimatedCheckQualityAt: any;
    estimatedCompletionAt: any;
    estimatedDoneProductionAt: any;
    estimatedShippingAt: any;
    id: string;
    isDelayed: boolean;
    orderDate: any;
    ratedAt?: any | null;
    ratedBy?: string | null;
    rating?: number | null;
    ratingComment?: string | null;
    shippedAt?: any | null;
    shippingPrice: number;
    status: OrderStatus;
    totalItems: number;
    totalPrice: number;
    totalProductionCost?: number | null;
    updatedAt?: any | null;
    address?: {
      __typename?: 'AddressEntity';
      districtID: number;
      factoryId: string;
      id: string;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    customer?: {
      __typename?: 'UserEntity';
      imageUrl?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
    factory?: {
      __typename?: 'FactoryEntity';
      name: string;
      owner?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    } | null;
    orderDetails?: Array<{
      __typename?: 'OrderDetailEntity';
      completedQty: number;
      createdAt: any;
      id: string;
      isRework: boolean;
      price: number;
      productionCost?: number | null;
      quantity: number;
      rejectedQty: number;
      reworkTime: number;
      status: OrderDetailStatus;
      updatedAt?: any | null;
      checkQualities?: Array<{
        __typename?: 'CheckQualityEntity';
        totalChecked: number;
        status: string;
        passedQuantity: number;
        orderDetailId: string;
        task?: {
          __typename?: 'TaskEntity';
          taskname: string;
          taskType: string;
          status: string;
          startDate: any;
          note?: string | null;
          id: string;
          expiredTime: any;
          description: string;
          completedDate?: any | null;
          assignedDate: any;
          assignee?: {
            __typename?: 'UserEntity';
            email?: string | null;
            name?: string | null;
            imageUrl?: string | null;
            id: string;
          } | null;
        } | null;
      }> | null;
      design?: {
        __typename?: 'ProductDesignEntity';
        thumbnailUrl?: string | null;
        systemConfigVariantId: string;
        isTemplate: boolean;
        isPublic: boolean;
        isFinalized: boolean;
        id: string;
        systemConfigVariant?: {
          __typename?: 'SystemConfigVariantEntity';
          color?: string | null;
          id: string;
          isActive: boolean;
          isDeleted: boolean;
          model?: string | null;
          price?: number | null;
          productId: string;
          size?: string | null;
          product: {
            __typename?: 'ProductEntity';
            name: string;
            imageUrl?: string | null;
          };
        } | null;
        designPositions?: Array<{
          __typename?: 'DesignPositionEntity';
          designJSON?: any | null;
          positionType?: {
            __typename?: 'ProductPositionTypeEntity';
            positionName: string;
            basePrice: number;
          } | null;
        }> | null;
      } | null;
    }> | null;
    orderProgressReports?: Array<{
      __typename?: 'OrderProgressReportEntity';
      reportDate: any;
      note?: string | null;
      imageUrls: Array<string>;
      id: string;
    }> | null;
    payments?: Array<{
      __typename?: 'PaymentEntity';
      id: string;
      type: string;
      paymentLog: string;
      amount: number;
      status: string;
      transactions?: Array<{
        __typename?: 'PaymentTransactionEntity';
        transactionLog: string;
        status: TransactionStatus;
        paymentMethod: PaymentMethod;
        createdAt: any;
        amount: number;
        id: string;
        type: TransactionType;
      }> | null;
    }> | null;
    rejectedHistory?: Array<{
      __typename?: 'RejectedOrderEntity';
      rejectedAt: any;
      reassignedTo?: string | null;
      reassignedAt?: any | null;
      reason: string;
      id: string;
      factory?: {
        __typename?: 'FactoryEntity';
        name: string;
        contractUrl?: string | null;
        address?: {
          __typename?: 'AddressEntity';
          wardCode: string;
          street: string;
          districtID: number;
          provinceID: number;
        } | null;
        owner?: {
          __typename?: 'UserEntity';
          name?: string | null;
          email?: string | null;
          imageUrl?: string | null;
        } | null;
      } | null;
    }> | null;
    tasks?: Array<{
      __typename?: 'TaskEntity';
      taskname: string;
      taskType: string;
      id: string;
      status: string;
      startDate: any;
      note?: string | null;
      description: string;
      expiredTime: any;
      completedDate?: any | null;
      assignedDate: any;
      assignee?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    }> | null;
  }>;
};

export type GetMyStaffOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyStaffOrdersQuery = {
  __typename?: 'Query';
  staffOrders: Array<{
    __typename?: 'OrderEntity';
    acceptanceDeadline?: any | null;
    acceptedAt?: any | null;
    addressId?: string | null;
    assignedAt?: any | null;
    completedAt?: any | null;
    currentProgress?: number | null;
    customerId: string;
    delayReason?: string | null;
    doneCheckQualityAt?: any | null;
    doneProductionAt?: any | null;
    estimatedCheckQualityAt: any;
    estimatedCompletionAt: any;
    estimatedDoneProductionAt: any;
    estimatedShippingAt: any;
    id: string;
    isDelayed: boolean;
    orderDate: any;
    ratedAt?: any | null;
    ratedBy?: string | null;
    rating?: number | null;
    ratingComment?: string | null;
    shippedAt?: any | null;
    shippingPrice: number;
    status: OrderStatus;
    totalItems: number;
    totalPrice: number;
    totalProductionCost?: number | null;
    updatedAt?: any | null;
    address?: {
      __typename?: 'AddressEntity';
      districtID: number;
      factoryId: string;
      id: string;
      provinceID: number;
      street: string;
      wardCode: string;
    } | null;
    customer?: {
      __typename?: 'UserEntity';
      imageUrl?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
    factory?: {
      __typename?: 'FactoryEntity';
      name: string;
      owner?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    } | null;
    orderDetails?: Array<{
      __typename?: 'OrderDetailEntity';
      completedQty: number;
      createdAt: any;
      id: string;
      isRework: boolean;
      price: number;
      productionCost?: number | null;
      quantity: number;
      rejectedQty: number;
      reworkTime: number;
      status: OrderDetailStatus;
      updatedAt?: any | null;
      checkQualities?: Array<{
        __typename?: 'CheckQualityEntity';
        totalChecked: number;
        status: string;
        passedQuantity: number;
        orderDetailId: string;
        task?: {
          __typename?: 'TaskEntity';
          taskname: string;
          taskType: string;
          status: string;
          startDate: any;
          note?: string | null;
          id: string;
          expiredTime: any;
          description: string;
          completedDate?: any | null;
          assignedDate: any;
          assignee?: {
            __typename?: 'UserEntity';
            email?: string | null;
            name?: string | null;
            imageUrl?: string | null;
            id: string;
          } | null;
        } | null;
      }> | null;
      design?: {
        __typename?: 'ProductDesignEntity';
        thumbnailUrl?: string | null;
        systemConfigVariantId: string;
        isTemplate: boolean;
        isPublic: boolean;
        isFinalized: boolean;
        id: string;
        systemConfigVariant?: {
          __typename?: 'SystemConfigVariantEntity';
          color?: string | null;
          id: string;
          isActive: boolean;
          isDeleted: boolean;
          model?: string | null;
          price?: number | null;
          productId: string;
          size?: string | null;
          product: {
            __typename?: 'ProductEntity';
            name: string;
            imageUrl?: string | null;
          };
        } | null;
        designPositions?: Array<{
          __typename?: 'DesignPositionEntity';
          designJSON?: any | null;
          positionType?: {
            __typename?: 'ProductPositionTypeEntity';
            positionName: string;
            basePrice: number;
          } | null;
        }> | null;
      } | null;
    }> | null;
    orderProgressReports?: Array<{
      __typename?: 'OrderProgressReportEntity';
      reportDate: any;
      note?: string | null;
      imageUrls: Array<string>;
      id: string;
    }> | null;
    payments?: Array<{
      __typename?: 'PaymentEntity';
      id: string;
      type: string;
      paymentLog: string;
      amount: number;
      status: string;
      transactions?: Array<{
        __typename?: 'PaymentTransactionEntity';
        transactionLog: string;
        status: TransactionStatus;
        paymentMethod: PaymentMethod;
        createdAt: any;
        amount: number;
        id: string;
        type: TransactionType;
      }> | null;
    }> | null;
    rejectedHistory?: Array<{
      __typename?: 'RejectedOrderEntity';
      rejectedAt: any;
      reassignedTo?: string | null;
      reassignedAt?: any | null;
      reason: string;
      id: string;
      factory?: {
        __typename?: 'FactoryEntity';
        name: string;
        contractUrl?: string | null;
        address?: {
          __typename?: 'AddressEntity';
          wardCode: string;
          street: string;
          districtID: number;
          provinceID: number;
        } | null;
        owner?: {
          __typename?: 'UserEntity';
          name?: string | null;
          email?: string | null;
          imageUrl?: string | null;
        } | null;
      } | null;
    }> | null;
    tasks?: Array<{
      __typename?: 'TaskEntity';
      taskname: string;
      taskType: string;
      id: string;
      status: string;
      startDate: any;
      note?: string | null;
      description: string;
      expiredTime: any;
      completedDate?: any | null;
      assignedDate: any;
      assignee?: {
        __typename?: 'UserEntity';
        name?: string | null;
        imageUrl?: string | null;
        email?: string | null;
      } | null;
    }> | null;
  }>;
};

export type AcceptOrderForFactoryMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;

export type AcceptOrderForFactoryMutation = {
  __typename?: 'Mutation';
  acceptOrderForFactory: { __typename?: 'OrderEntity'; id: string };
};

export type RejectOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;

export type RejectOrderMutation = {
  __typename?: 'Mutation';
  rejectOrder: { __typename?: 'OrderEntity'; id: string };
};

export type DoneProductionOrderDetailsMutationVariables = Exact<{
  orderDetailId: Scalars['String']['input'];
}>;

export type DoneProductionOrderDetailsMutation = {
  __typename?: 'Mutation';
  doneProductionOrderDetails: { __typename?: 'OrderDetailEntity'; id: string };
};

export type StartReworkMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;

export type StartReworkMutation = {
  __typename?: 'Mutation';
  startRework: { __typename?: 'OrderEntity'; id: string };
};

export type DoneReworkForOrderDetailsMutationVariables = Exact<{
  orderDetailId: Scalars['String']['input'];
}>;

export type DoneReworkForOrderDetailsMutation = {
  __typename?: 'Mutation';
  doneReworkForOrderDetails: { __typename?: 'OrderDetailEntity'; id: string };
};

export type DoneCheckQualityMutationVariables = Exact<{
  input: DoneCheckQualityInput;
}>;

export type DoneCheckQualityMutation = {
  __typename?: 'Mutation';
  doneCheckQuality: { __typename?: 'CheckQualityEntity'; id: string };
};

export type ShippedOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;

export type ShippedOrderMutation = {
  __typename?: 'Mutation';
  shippedOrder: { __typename?: 'OrderEntity'; id: string };
};

export type FeedbackOrderMutationVariables = Exact<{
  input: FeedbackOrderInput;
  orderId: Scalars['String']['input'];
}>;

export type FeedbackOrderMutation = {
  __typename?: 'Mutation';
  feedbackOrder: { __typename?: 'OrderEntity'; id: string };
};

export type ProductDesignsQueryVariables = Exact<{ [key: string]: never }>;

export type ProductDesignsQuery = {
  __typename?: 'Query';
  productDesigns: Array<{
    __typename?: 'ProductDesignEntity';
    id: string;
    thumbnailUrl?: string | null;
    systemConfigVariant?: {
      __typename?: 'SystemConfigVariantEntity';
      product: {
        __typename?: 'ProductEntity';
        name: string;
        category?: { __typename?: 'CategoryEntity'; name: string } | null;
      };
    } | null;
    designPositions?: Array<{
      __typename?: 'DesignPositionEntity';
      designJSON?: any | null;
      positionType?: {
        __typename?: 'ProductPositionTypeEntity';
        id: string;
        positionName: string;
        basePrice: number;
      } | null;
    }> | null;
  }>;
};

export type ProductDesignsByUserQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ProductDesignsByUserQuery = {
  __typename?: 'Query';
  productDesignsByUser: Array<{
    __typename?: 'ProductDesignEntity';
    id: string;
    thumbnailUrl?: string | null;
    systemConfigVariant?: {
      __typename?: 'SystemConfigVariantEntity';
      product: {
        __typename?: 'ProductEntity';
        name: string;
        category?: { __typename?: 'CategoryEntity'; name: string } | null;
      };
    } | null;
    designPositions?: Array<{
      __typename?: 'DesignPositionEntity';
      designJSON?: any | null;
      positionType?: {
        __typename?: 'ProductPositionTypeEntity';
        id: string;
        positionName: string;
        basePrice: number;
      } | null;
    }> | null;
  }>;
};

export type ProductDesignByIdQueryVariables = Exact<{
  productDesignId: Scalars['ID']['input'];
}>;

export type ProductDesignByIdQuery = {
  __typename?: 'Query';
  productDesign: {
    __typename?: 'ProductDesignEntity';
    thumbnailUrl?: string | null;
    systemConfigVariant?: {
      __typename?: 'SystemConfigVariantEntity';
      id: string;
      price?: number | null;
      color?: string | null;
      size?: string | null;
      model?: string | null;
    } | null;
    designPositions?: Array<{
      __typename?: 'DesignPositionEntity';
      designJSON?: any | null;
      positionType?: {
        __typename?: 'ProductPositionTypeEntity';
        id: string;
        positionName: string;
        basePrice: number;
      } | null;
    }> | null;
  };
};

export type CreateProductDesignMutationVariables = Exact<{
  input: CreateProductDesignDto;
}>;

export type CreateProductDesignMutation = {
  __typename?: 'Mutation';
  createProductDesign: { __typename?: 'ProductDesignEntity'; id: string };
};

export type UpdateProductDesignMutationVariables = Exact<{
  updateProductDesignId: Scalars['String']['input'];
  input: UpdateProductDesignDto;
}>;

export type UpdateProductDesignMutation = {
  __typename?: 'Mutation';
  updateProductDesign: {
    __typename?: 'ProductDesignEntity';
    thumbnailUrl?: string | null;
    systemConfigVariant?: {
      __typename?: 'SystemConfigVariantEntity';
      id: string;
      price?: number | null;
      color?: string | null;
      size?: string | null;
      model?: string | null;
    } | null;
    designPositions?: Array<{
      __typename?: 'DesignPositionEntity';
      designJSON?: any | null;
      positionType?: {
        __typename?: 'ProductPositionTypeEntity';
        id: string;
        positionName: string;
        basePrice: number;
      } | null;
    }> | null;
  };
};

export type UpdateThumbnailProductDesignMutationVariables = Exact<{
  updateProductDesignId: Scalars['String']['input'];
  input: UpdateProductDesignDto;
  fileUrl: Scalars['String']['input'];
}>;

export type UpdateThumbnailProductDesignMutation = {
  __typename?: 'Mutation';
  deleteFile: boolean;
  updateProductDesign: {
    __typename?: 'ProductDesignEntity';
    thumbnailUrl?: string | null;
  };
};

export type ProductDesignTemplatesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ProductDesignTemplatesQuery = {
  __typename?: 'Query';
  productDesigns: Array<{
    __typename?: 'ProductDesignEntity';
    id: string;
    isPublic: boolean;
    isTemplate: boolean;
    isFinalized: boolean;
    thumbnailUrl?: string | null;
    designPositions?: Array<{
      __typename?: 'DesignPositionEntity';
      designJSON?: any | null;
      positionType?: {
        __typename?: 'ProductPositionTypeEntity';
        id: string;
        positionName: string;
        basePrice: number;
      } | null;
    }> | null;
  }>;
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'ProductEntity';
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name: string;
    updatedAt?: any | null;
    createdAt: any;
    description?: string | null;
    category?: { __typename?: 'CategoryEntity'; name: string } | null;
    variants?: Array<{
      __typename?: 'SystemConfigVariantEntity';
      price?: number | null;
    }> | null;
  }>;
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductDto;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'ProductEntity';
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name: string;
    updatedAt?: any | null;
    createdAt: any;
    description?: string | null;
    category?: { __typename?: 'CategoryEntity'; name: string } | null;
  };
};

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['String']['input'];
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  deleteProduct: {
    __typename?: 'ProductEntity';
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name: string;
    updatedAt?: any | null;
    createdAt: any;
    description?: string | null;
    category?: { __typename?: 'CategoryEntity'; name: string } | null;
  };
};

export type GetProductInformationByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;

export type GetProductInformationByIdQuery = {
  __typename?: 'Query';
  product: {
    __typename?: 'ProductEntity';
    imageUrl?: string | null;
    name: string;
    variants?: Array<{
      __typename?: 'SystemConfigVariantEntity';
      id: string;
      price?: number | null;
      color?: string | null;
      size?: string | null;
      model?: string | null;
    }> | null;
  };
};

export type GetAllProvincesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProvincesQuery = {
  __typename?: 'Query';
  provinces: Array<{
    __typename?: 'Province';
    provinceId: number;
    provinceName: string;
  }>;
};

export type GetProvinceByIdQueryVariables = Exact<{
  provinceId: Scalars['Int']['input'];
}>;

export type GetProvinceByIdQuery = {
  __typename?: 'Query';
  province: {
    __typename?: 'Province';
    provinceId: number;
    provinceName: string;
  };
};

export type GetAllDistrictsByProvinceIdQueryVariables = Exact<{
  provinceId: Scalars['Int']['input'];
}>;

export type GetAllDistrictsByProvinceIdQuery = {
  __typename?: 'Query';
  districts: Array<{
    __typename?: 'District';
    districtId: number;
    districtName: string;
    provinceId: number;
  }>;
};

export type GetDistrictByIdQueryVariables = Exact<{
  districtId: Scalars['Int']['input'];
}>;

export type GetDistrictByIdQuery = {
  __typename?: 'Query';
  district: {
    __typename?: 'District';
    districtId: number;
    districtName: string;
    provinceId: number;
  };
};

export type GetAllWardsByDistrictIdQueryVariables = Exact<{
  districtId: Scalars['Int']['input'];
}>;

export type GetAllWardsByDistrictIdQuery = {
  __typename?: 'Query';
  wards: Array<{
    __typename?: 'Ward';
    wardCode: string;
    wardName: string;
    districtId: number;
  }>;
};

export type GetWardByWardCodeQueryVariables = Exact<{
  wardCode: Scalars['String']['input'];
}>;

export type GetWardByWardCodeQuery = {
  __typename?: 'Query';
  ward: {
    __typename?: 'Ward';
    districtId: number;
    wardCode: string;
    wardName: string;
  };
};

export type GetAvailableServiceQueryVariables = Exact<{
  servicesInput: GetAvailableServicesDto;
}>;

export type GetAvailableServiceQuery = {
  __typename?: 'Query';
  availableServices: Array<{
    __typename?: 'ShippingService';
    shortName: string;
    serviceTypeId: number;
    serviceId: number;
  }>;
};

export type GetAllSystemConfigBanksQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAllSystemConfigBanksQuery = {
  __typename?: 'Query';
  systemConfigBanks: Array<{
    __typename?: 'SystemConfigBankEntity';
    bin: string;
    code: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    logo: string;
    name: string;
    shortName: string;
  }>;
};

export type GetSystemConfigBankByIdQueryVariables = Exact<{
  systemConfigBankId: Scalars['ID']['input'];
}>;

export type GetSystemConfigBankByIdQuery = {
  __typename?: 'Query';
  systemConfigBank: {
    __typename?: 'SystemConfigBankEntity';
    bin: string;
    code: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    logo: string;
    name: string;
    shortName: string;
  };
};

export type CreateSystemConfigBankMutationVariables = Exact<{
  input: CreateSystemConfigBankDto;
}>;

export type CreateSystemConfigBankMutation = {
  __typename?: 'Mutation';
  createSystemConfigBank: {
    __typename?: 'SystemConfigBankEntity';
    bin: string;
    code: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    logo: string;
    name: string;
    shortName: string;
  };
};

export type RemoveSystemConfigBankMutationVariables = Exact<{
  removeSystemConfigBankId: Scalars['ID']['input'];
}>;

export type RemoveSystemConfigBankMutation = {
  __typename?: 'Mutation';
  removeSystemConfigBank: {
    __typename?: 'SystemConfigBankEntity';
    bin: string;
    id: string;
    code: string;
    isActive: boolean;
    isDeleted: boolean;
    logo: string;
    name: string;
    shortName: string;
  };
};

export type GetSystemConfigVariantsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetSystemConfigVariantsQuery = {
  __typename?: 'Query';
  systemConfigVariants: Array<{
    __typename?: 'SystemConfigVariantEntity';
    color?: string | null;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    model?: string | null;
    price?: number | null;
    size?: string | null;
    product: {
      __typename?: 'ProductEntity';
      id: string;
      imageUrl?: string | null;
      name: string;
      description?: string | null;
    };
  }>;
};

export type GetSystemConfigVariantsByProductQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;

export type GetSystemConfigVariantsByProductQuery = {
  __typename?: 'Query';
  systemConfigVariantsByProduct: Array<{
    __typename?: 'SystemConfigVariantEntity';
    color?: string | null;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    model?: string | null;
    price?: number | null;
    size?: string | null;
    product: {
      __typename?: 'ProductEntity';
      id: string;
      imageUrl?: string | null;
      name: string;
      description?: string | null;
    };
  }>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: 'Query';
  users: Array<{
    __typename?: 'UserEntity';
    id: string;
    imageUrl?: string | null;
    gender: boolean;
    email?: string | null;
    dateOfBirth?: any | null;
    createdAt: any;
    isActive: boolean;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    updatedAt?: any | null;
  }>;
};

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserEntity';
    id: string;
    imageUrl?: string | null;
    gender: boolean;
    email?: string | null;
    dateOfBirth?: any | null;
    createdAt: any;
    isActive: boolean;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    updatedAt?: any | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserDto;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'UserEntity';
    id: string;
    imageUrl?: string | null;
    gender: boolean;
    email?: string | null;
    dateOfBirth?: any | null;
    createdAt: any;
    isActive: boolean;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    updatedAt?: any | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserDto;
  updateUserId: Scalars['String']['input'];
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'UserEntity';
    id: string;
    imageUrl?: string | null;
    gender: boolean;
    email?: string | null;
    dateOfBirth?: any | null;
    createdAt: any;
    isActive: boolean;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    updatedAt?: any | null;
  };
};

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String']['input'];
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser: {
    __typename?: 'UserEntity';
    id: string;
    imageUrl?: string | null;
    gender: boolean;
    email?: string | null;
    dateOfBirth?: any | null;
    createdAt: any;
    isActive: boolean;
    name?: string | null;
    phoneNumber?: string | null;
    role: Roles;
    updatedAt?: any | null;
  };
};

export type GetAvailableStaffForFactoryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAvailableStaffForFactoryQuery = {
  __typename?: 'Query';
  availableStaffForFactory: Array<{
    __typename?: 'UserEntity';
    email?: string | null;
    id: string;
    gender: boolean;
    imageUrl?: string | null;
    name?: string | null;
    role: Roles;
  }>;
};

export const AddressesDocument = gql`
  query Addresses {
    addresses {
      id
      districtID
      provinceID
      street
      wardCode
    }
  }
`;

/**
 * __useAddressesQuery__
 *
 * To run a query within a React component, call `useAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddressesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AddressesQuery,
    AddressesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AddressesQuery, AddressesQueryVariables>(
    AddressesDocument,
    options,
  );
}
export function useAddressesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AddressesQuery,
    AddressesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AddressesQuery, AddressesQueryVariables>(
    AddressesDocument,
    options,
  );
}
export function useAddressesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AddressesQuery, AddressesQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AddressesQuery, AddressesQueryVariables>(
    AddressesDocument,
    options,
  );
}
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<
  typeof useAddressesLazyQuery
>;
export type AddressesSuspenseQueryHookResult = ReturnType<
  typeof useAddressesSuspenseQuery
>;
export type AddressesQueryResult = Apollo.QueryResult<
  AddressesQuery,
  AddressesQueryVariables
>;
export const CreateAddressDocument = gql`
  mutation CreateAddress($createAddressInput: CreateAddressInput!) {
    createAddress(createAddressInput: $createAddressInput) {
      districtID
      provinceID
      street
      wardCode
    }
  }
`;
export type CreateAddressMutationFn = Apollo.MutationFunction<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      createAddressInput: // value for 'createAddressInput'
 *   },
 * });
 */
export function useCreateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >(CreateAddressDocument, options);
}
export type CreateAddressMutationHookResult = ReturnType<
  typeof useCreateAddressMutation
>;
export type CreateAddressMutationResult =
  Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;
export const DeleteAddressDocument = gql`
  mutation DeleteAddress($deleteAddressId: String!) {
    deleteAddress(id: $deleteAddressId) {
      id
    }
  }
`;
export type DeleteAddressMutationFn = Apollo.MutationFunction<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      deleteAddressId: // value for 'deleteAddressId'
 *   },
 * });
 */
export function useDeleteAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >(DeleteAddressDocument, options);
}
export type DeleteAddressMutationHookResult = ReturnType<
  typeof useDeleteAddressMutation
>;
export type DeleteAddressMutationResult =
  Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;
export const GetAddressDetailsDocument = gql`
  query GetAddressDetails(
    $provinceId: Int!
    $districtId: Int!
    $wardCode: String!
  ) {
    province(provinceId: $provinceId) {
      provinceId
      provinceName
    }
    district(districtId: $districtId) {
      districtId
      districtName
      provinceId
    }
    ward(wardCode: $wardCode) {
      districtId
      wardCode
      wardName
    }
  }
`;

/**
 * __useGetAddressDetailsQuery__
 *
 * To run a query within a React component, call `useGetAddressDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressDetailsQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *      districtId: // value for 'districtId'
 *      wardCode: // value for 'wardCode'
 *   },
 * });
 */
export function useGetAddressDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAddressDetailsQuery,
    GetAddressDetailsQueryVariables
  > &
    (
      | { variables: GetAddressDetailsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAddressDetailsQuery,
    GetAddressDetailsQueryVariables
  >(GetAddressDetailsDocument, options);
}
export function useGetAddressDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAddressDetailsQuery,
    GetAddressDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAddressDetailsQuery,
    GetAddressDetailsQueryVariables
  >(GetAddressDetailsDocument, options);
}
export function useGetAddressDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAddressDetailsQuery,
        GetAddressDetailsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAddressDetailsQuery,
    GetAddressDetailsQueryVariables
  >(GetAddressDetailsDocument, options);
}
export type GetAddressDetailsQueryHookResult = ReturnType<
  typeof useGetAddressDetailsQuery
>;
export type GetAddressDetailsLazyQueryHookResult = ReturnType<
  typeof useGetAddressDetailsLazyQuery
>;
export type GetAddressDetailsSuspenseQueryHookResult = ReturnType<
  typeof useGetAddressDetailsSuspenseQuery
>;
export type GetAddressDetailsQueryResult = Apollo.QueryResult<
  GetAddressDetailsQuery,
  GetAddressDetailsQueryVariables
>;
export const FormatAddressDocument = gql`
  query FormatAddress($formatAddressInput: FormatAddressInput!) {
    formatAddress(formatAddressInput: $formatAddressInput) {
      text
    }
  }
`;

/**
 * __useFormatAddressQuery__
 *
 * To run a query within a React component, call `useFormatAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormatAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormatAddressQuery({
 *   variables: {
 *      formatAddressInput: // value for 'formatAddressInput'
 *   },
 * });
 */
export function useFormatAddressQuery(
  baseOptions: Apollo.QueryHookOptions<
    FormatAddressQuery,
    FormatAddressQueryVariables
  > &
    (
      | { variables: FormatAddressQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FormatAddressQuery, FormatAddressQueryVariables>(
    FormatAddressDocument,
    options,
  );
}
export function useFormatAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FormatAddressQuery,
    FormatAddressQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FormatAddressQuery, FormatAddressQueryVariables>(
    FormatAddressDocument,
    options,
  );
}
export function useFormatAddressSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FormatAddressQuery,
        FormatAddressQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FormatAddressQuery,
    FormatAddressQueryVariables
  >(FormatAddressDocument, options);
}
export type FormatAddressQueryHookResult = ReturnType<
  typeof useFormatAddressQuery
>;
export type FormatAddressLazyQueryHookResult = ReturnType<
  typeof useFormatAddressLazyQuery
>;
export type FormatAddressSuspenseQueryHookResult = ReturnType<
  typeof useFormatAddressSuspenseQuery
>;
export type FormatAddressQueryResult = Apollo.QueryResult<
  FormatAddressQuery,
  FormatAddressQueryVariables
>;
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
        ownedFactory {
          name
          factoryStatus
        }
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
        ownedFactory {
          name
          factoryStatus
        }
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
        ownedFactory {
          name
          factoryStatus
        }
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
      isDeleted
      name
      phoneNumber
      role
      updatedAt
      ownedFactory {
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
export const GetUserCartItemsDocument = gql`
  query GetUserCartItems {
    userCartItems {
      id
      quantity
      design {
        thumbnailUrl
        systemConfigVariant {
          id
          price
          color
          size
          model
          isActive
          isDeleted
          product {
            id
            name
            imageUrl
            discounts {
              minQuantity
              name
              discountPercent
            }
          }
        }
        designPositions {
          positionType {
            id
            positionName
            basePrice
          }
          designJSON
        }
      }
    }
  }
`;

/**
 * __useGetUserCartItemsQuery__
 *
 * To run a query within a React component, call `useGetUserCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCartItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserCartItemsQuery,
    GetUserCartItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>(
    GetUserCartItemsDocument,
    options,
  );
}
export function useGetUserCartItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserCartItemsQuery,
    GetUserCartItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserCartItemsQuery,
    GetUserCartItemsQueryVariables
  >(GetUserCartItemsDocument, options);
}
export function useGetUserCartItemsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUserCartItemsQuery,
        GetUserCartItemsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUserCartItemsQuery,
    GetUserCartItemsQueryVariables
  >(GetUserCartItemsDocument, options);
}
export type GetUserCartItemsQueryHookResult = ReturnType<
  typeof useGetUserCartItemsQuery
>;
export type GetUserCartItemsLazyQueryHookResult = ReturnType<
  typeof useGetUserCartItemsLazyQuery
>;
export type GetUserCartItemsSuspenseQueryHookResult = ReturnType<
  typeof useGetUserCartItemsSuspenseQuery
>;
export type GetUserCartItemsQueryResult = Apollo.QueryResult<
  GetUserCartItemsQuery,
  GetUserCartItemsQueryVariables
>;
export const GetCartItemCountDocument = gql`
  query GetCartItemCount {
    getCartItemCount
  }
`;

/**
 * __useGetCartItemCountQuery__
 *
 * To run a query within a React component, call `useGetCartItemCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartItemCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartItemCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartItemCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCartItemCountQuery,
    GetCartItemCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCartItemCountQuery, GetCartItemCountQueryVariables>(
    GetCartItemCountDocument,
    options,
  );
}
export function useGetCartItemCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCartItemCountQuery,
    GetCartItemCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCartItemCountQuery,
    GetCartItemCountQueryVariables
  >(GetCartItemCountDocument, options);
}
export function useGetCartItemCountSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCartItemCountQuery,
        GetCartItemCountQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCartItemCountQuery,
    GetCartItemCountQueryVariables
  >(GetCartItemCountDocument, options);
}
export type GetCartItemCountQueryHookResult = ReturnType<
  typeof useGetCartItemCountQuery
>;
export type GetCartItemCountLazyQueryHookResult = ReturnType<
  typeof useGetCartItemCountLazyQuery
>;
export type GetCartItemCountSuspenseQueryHookResult = ReturnType<
  typeof useGetCartItemCountSuspenseQuery
>;
export type GetCartItemCountQueryResult = Apollo.QueryResult<
  GetCartItemCountQuery,
  GetCartItemCountQueryVariables
>;
export const CreateCartItemDocument = gql`
  mutation CreateCartItem($createCartItemInput: CreateCartItemDto!) {
    createCartItem(createCartItemInput: $createCartItemInput) {
      userId
      id
      quantity
    }
  }
`;
export type CreateCartItemMutationFn = Apollo.MutationFunction<
  CreateCartItemMutation,
  CreateCartItemMutationVariables
>;

/**
 * __useCreateCartItemMutation__
 *
 * To run a mutation, you first call `useCreateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCartItemMutation, { data, loading, error }] = useCreateCartItemMutation({
 *   variables: {
 *      createCartItemInput: // value for 'createCartItemInput'
 *   },
 * });
 */
export function useCreateCartItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCartItemMutation,
    CreateCartItemMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCartItemMutation,
    CreateCartItemMutationVariables
  >(CreateCartItemDocument, options);
}
export type CreateCartItemMutationHookResult = ReturnType<
  typeof useCreateCartItemMutation
>;
export type CreateCartItemMutationResult =
  Apollo.MutationResult<CreateCartItemMutation>;
export type CreateCartItemMutationOptions = Apollo.BaseMutationOptions<
  CreateCartItemMutation,
  CreateCartItemMutationVariables
>;
export const UpdateCartItemDocument = gql`
  mutation UpdateCartItem(
    $updateCartItemId: String!
    $updateCartItemInput: UpdateCartItemDto!
  ) {
    updateCartItem(
      id: $updateCartItemId
      updateCartItemInput: $updateCartItemInput
    ) {
      userId
      id
      quantity
    }
  }
`;
export type UpdateCartItemMutationFn = Apollo.MutationFunction<
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables
>;

/**
 * __useUpdateCartItemMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemMutation, { data, loading, error }] = useUpdateCartItemMutation({
 *   variables: {
 *      updateCartItemId: // value for 'updateCartItemId'
 *      updateCartItemInput: // value for 'updateCartItemInput'
 *   },
 * });
 */
export function useUpdateCartItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCartItemMutation,
    UpdateCartItemMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCartItemMutation,
    UpdateCartItemMutationVariables
  >(UpdateCartItemDocument, options);
}
export type UpdateCartItemMutationHookResult = ReturnType<
  typeof useUpdateCartItemMutation
>;
export type UpdateCartItemMutationResult =
  Apollo.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = Apollo.BaseMutationOptions<
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables
>;
export const CalculateShippingFeeDocument = gql`
  mutation CalculateShippingFee($input: CalculateShippingFeeDto!) {
    calculateShippingFee(input: $input) {
      total
    }
  }
`;
export type CalculateShippingFeeMutationFn = Apollo.MutationFunction<
  CalculateShippingFeeMutation,
  CalculateShippingFeeMutationVariables
>;

/**
 * __useCalculateShippingFeeMutation__
 *
 * To run a mutation, you first call `useCalculateShippingFeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCalculateShippingFeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [calculateShippingFeeMutation, { data, loading, error }] = useCalculateShippingFeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCalculateShippingFeeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CalculateShippingFeeMutation,
    CalculateShippingFeeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CalculateShippingFeeMutation,
    CalculateShippingFeeMutationVariables
  >(CalculateShippingFeeDocument, options);
}
export type CalculateShippingFeeMutationHookResult = ReturnType<
  typeof useCalculateShippingFeeMutation
>;
export type CalculateShippingFeeMutationResult =
  Apollo.MutationResult<CalculateShippingFeeMutation>;
export type CalculateShippingFeeMutationOptions = Apollo.BaseMutationOptions<
  CalculateShippingFeeMutation,
  CalculateShippingFeeMutationVariables
>;
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
export function useGetAllCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(
    GetAllCategoriesDocument,
    options,
  );
}
export function useGetAllCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, options);
}
export function useGetAllCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, options);
}
export type GetAllCategoriesQueryHookResult = ReturnType<
  typeof useGetAllCategoriesQuery
>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetAllCategoriesLazyQuery
>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useGetAllCategoriesSuspenseQuery
>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables
>;
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
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

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
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
  Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
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
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;

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
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DeleteCategoryDocument, options);
}
export type DeleteCategoryMutationHookResult = ReturnType<
  typeof useDeleteCategoryMutation
>;
export type DeleteCategoryMutationResult =
  Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;
export const GetEnhancedManagerDashboardDocument = gql`
  query GetEnhancedManagerDashboard {
    getEnhancedManagerDashboard {
      stats {
        factories {
          total
          change
          changeType
        }
        orders {
          active
          change
          changeType
        }
        staff {
          total
          change
          changeType
        }
        revenue {
          monthly
          change
          changeType
        }
      }
      factoryPerformance {
        factoryId
        factoryName
        orderCount
        totalRevenue
      }
      orderStatus {
        status
        count
      }
      recentActivities {
        id
        type
        title
        description
        time
        relatedId
      }
    }
  }
`;

/**
 * __useGetEnhancedManagerDashboardQuery__
 *
 * To run a query within a React component, call `useGetEnhancedManagerDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnhancedManagerDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnhancedManagerDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEnhancedManagerDashboardQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetEnhancedManagerDashboardQuery,
    GetEnhancedManagerDashboardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetEnhancedManagerDashboardQuery,
    GetEnhancedManagerDashboardQueryVariables
  >(GetEnhancedManagerDashboardDocument, options);
}
export function useGetEnhancedManagerDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEnhancedManagerDashboardQuery,
    GetEnhancedManagerDashboardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEnhancedManagerDashboardQuery,
    GetEnhancedManagerDashboardQueryVariables
  >(GetEnhancedManagerDashboardDocument, options);
}
export function useGetEnhancedManagerDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetEnhancedManagerDashboardQuery,
        GetEnhancedManagerDashboardQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetEnhancedManagerDashboardQuery,
    GetEnhancedManagerDashboardQueryVariables
  >(GetEnhancedManagerDashboardDocument, options);
}
export type GetEnhancedManagerDashboardQueryHookResult = ReturnType<
  typeof useGetEnhancedManagerDashboardQuery
>;
export type GetEnhancedManagerDashboardLazyQueryHookResult = ReturnType<
  typeof useGetEnhancedManagerDashboardLazyQuery
>;
export type GetEnhancedManagerDashboardSuspenseQueryHookResult = ReturnType<
  typeof useGetEnhancedManagerDashboardSuspenseQuery
>;
export type GetEnhancedManagerDashboardQueryResult = Apollo.QueryResult<
  GetEnhancedManagerDashboardQuery,
  GetEnhancedManagerDashboardQueryVariables
>;
export const UpdateDesignPositionDocument = gql`
  mutation UpdateDesignPosition($input: UpdateDesignPositionDto!) {
    updateDesignPosition(input: $input) {
      positionType {
        positionName
        basePrice
      }
      designJSON
    }
  }
`;
export type UpdateDesignPositionMutationFn = Apollo.MutationFunction<
  UpdateDesignPositionMutation,
  UpdateDesignPositionMutationVariables
>;

/**
 * __useUpdateDesignPositionMutation__
 *
 * To run a mutation, you first call `useUpdateDesignPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDesignPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDesignPositionMutation, { data, loading, error }] = useUpdateDesignPositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDesignPositionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDesignPositionMutation,
    UpdateDesignPositionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateDesignPositionMutation,
    UpdateDesignPositionMutationVariables
  >(UpdateDesignPositionDocument, options);
}
export type UpdateDesignPositionMutationHookResult = ReturnType<
  typeof useUpdateDesignPositionMutation
>;
export type UpdateDesignPositionMutationResult =
  Apollo.MutationResult<UpdateDesignPositionMutation>;
export type UpdateDesignPositionMutationOptions = Apollo.BaseMutationOptions<
  UpdateDesignPositionMutation,
  UpdateDesignPositionMutationVariables
>;
export const GetMyFactoryDocument = gql`
  query GetMyFactory {
    getMyFactory {
      address {
        id
        districtID
        provinceID
        street
        wardCode
      }
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
        productionCapacity
        systemConfigVariantId
        factoryId
        systemConfigVariant {
          color
          id
          isActive
          model
          price
          productId
          size
        }
      }
      qualityCertifications
      specializations
      taxIdentificationNumber
      totalEmployees
      website
      contactPersonRole
      contractAccepted
      reviewedBy
      reviewedAt
      staff {
        id
        imageUrl
        email
        name
      }
      contractAcceptedAt
      factoryOwnerId
      formattedAddress
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
export function useGetMyFactoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyFactoryQuery,
    GetMyFactoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyFactoryQuery, GetMyFactoryQueryVariables>(
    GetMyFactoryDocument,
    options,
  );
}
export function useGetMyFactoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyFactoryQuery,
    GetMyFactoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyFactoryQuery, GetMyFactoryQueryVariables>(
    GetMyFactoryDocument,
    options,
  );
}
export function useGetMyFactorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyFactoryQuery,
        GetMyFactoryQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMyFactoryQuery, GetMyFactoryQueryVariables>(
    GetMyFactoryDocument,
    options,
  );
}
export type GetMyFactoryQueryHookResult = ReturnType<
  typeof useGetMyFactoryQuery
>;
export type GetMyFactoryLazyQueryHookResult = ReturnType<
  typeof useGetMyFactoryLazyQuery
>;
export type GetMyFactorySuspenseQueryHookResult = ReturnType<
  typeof useGetMyFactorySuspenseQuery
>;
export type GetMyFactoryQueryResult = Apollo.QueryResult<
  GetMyFactoryQuery,
  GetMyFactoryQueryVariables
>;
export const GetFactoriesDocument = gql`
  query GetFactories {
    getAllFactories {
      address {
        id
        districtID
        provinceID
        street
        wardCode
      }
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
        productionCapacity
        systemConfigVariantId
        factoryId
        systemConfigVariant {
          color
          id
          isActive
          model
          price
          productId
          size
        }
      }
      qualityCertifications
      specializations
      taxIdentificationNumber
      totalEmployees
      website
      contactPersonRole
      contractAccepted
      reviewedBy
      reviewedAt
      staff {
        id
        imageUrl
        email
        name
      }
      contractAcceptedAt
      factoryOwnerId
      formattedAddress
    }
  }
`;

/**
 * __useGetFactoriesQuery__
 *
 * To run a query within a React component, call `useGetFactoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFactoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFactoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFactoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFactoriesQuery,
    GetFactoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFactoriesQuery, GetFactoriesQueryVariables>(
    GetFactoriesDocument,
    options,
  );
}
export function useGetFactoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFactoriesQuery,
    GetFactoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFactoriesQuery, GetFactoriesQueryVariables>(
    GetFactoriesDocument,
    options,
  );
}
export function useGetFactoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetFactoriesQuery,
        GetFactoriesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetFactoriesQuery, GetFactoriesQueryVariables>(
    GetFactoriesDocument,
    options,
  );
}
export type GetFactoriesQueryHookResult = ReturnType<
  typeof useGetFactoriesQuery
>;
export type GetFactoriesLazyQueryHookResult = ReturnType<
  typeof useGetFactoriesLazyQuery
>;
export type GetFactoriesSuspenseQueryHookResult = ReturnType<
  typeof useGetFactoriesSuspenseQuery
>;
export type GetFactoriesQueryResult = Apollo.QueryResult<
  GetFactoriesQuery,
  GetFactoriesQueryVariables
>;
export const GetFactoryByIdDocument = gql`
  query GetFactoryById($factoryId: String!) {
    getFactoryById(factoryId: $factoryId) {
      address {
        id
        districtID
        provinceID
        street
        wardCode
      }
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
        id
        email
        name
        imageUrl
      }
      printingMethods
      products {
        productionCapacity
        systemConfigVariantId
        factoryId
        systemConfigVariant {
          color
          id
          isActive
          model
          price
          productId
          size
        }
        productionTimeInMinutes
      }
      qualityCertifications
      specializations
      taxIdentificationNumber
      totalEmployees
      website
      contactPersonRole
      contractAccepted
      reviewedBy
      reviewedAt
      staff {
        id
        imageUrl
        email
        name
      }
      contractAcceptedAt
      factoryOwnerId
      formattedAddress
    }
  }
`;

/**
 * __useGetFactoryByIdQuery__
 *
 * To run a query within a React component, call `useGetFactoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFactoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFactoryByIdQuery({
 *   variables: {
 *      factoryId: // value for 'factoryId'
 *   },
 * });
 */
export function useGetFactoryByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFactoryByIdQuery,
    GetFactoryByIdQueryVariables
  > &
    (
      | { variables: GetFactoryByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>(
    GetFactoryByIdDocument,
    options,
  );
}
export function useGetFactoryByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFactoryByIdQuery,
    GetFactoryByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>(
    GetFactoryByIdDocument,
    options,
  );
}
export function useGetFactoryByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetFactoryByIdQuery,
        GetFactoryByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetFactoryByIdQuery,
    GetFactoryByIdQueryVariables
  >(GetFactoryByIdDocument, options);
}
export type GetFactoryByIdQueryHookResult = ReturnType<
  typeof useGetFactoryByIdQuery
>;
export type GetFactoryByIdLazyQueryHookResult = ReturnType<
  typeof useGetFactoryByIdLazyQuery
>;
export type GetFactoryByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetFactoryByIdSuspenseQuery
>;
export type GetFactoryByIdQueryResult = Apollo.QueryResult<
  GetFactoryByIdQuery,
  GetFactoryByIdQueryVariables
>;
export const UpdateFactoryInfoDocument = gql`
  mutation UpdateFactoryInfo($updateFactoryInfoInput: UpdateFactoryInfoDto!) {
    updateFactoryInfo(updateFactoryInfoInput: $updateFactoryInfoInput) {
      address {
        id
        districtID
        provinceID
        street
        wardCode
      }
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
        productionCapacity
        systemConfigVariantId
        factoryId
        systemConfigVariant {
          color
          id
          isActive
          model
          price
          productId
          size
        }
      }
      qualityCertifications
      specializations
      taxIdentificationNumber
      totalEmployees
      website
      contactPersonRole
      contractAccepted
      reviewedBy
      reviewedAt
      staff {
        id
        imageUrl
        email
        name
      }
      contractAcceptedAt
      factoryOwnerId
      formattedAddress
    }
  }
`;
export type UpdateFactoryInfoMutationFn = Apollo.MutationFunction<
  UpdateFactoryInfoMutation,
  UpdateFactoryInfoMutationVariables
>;

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
export function useUpdateFactoryInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFactoryInfoMutation,
    UpdateFactoryInfoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateFactoryInfoMutation,
    UpdateFactoryInfoMutationVariables
  >(UpdateFactoryInfoDocument, options);
}
export type UpdateFactoryInfoMutationHookResult = ReturnType<
  typeof useUpdateFactoryInfoMutation
>;
export type UpdateFactoryInfoMutationResult =
  Apollo.MutationResult<UpdateFactoryInfoMutation>;
export type UpdateFactoryInfoMutationOptions = Apollo.BaseMutationOptions<
  UpdateFactoryInfoMutation,
  UpdateFactoryInfoMutationVariables
>;
export const ChangeFactoryStatusDocument = gql`
  mutation ChangeFactoryStatus($data: UpdateFactoryStatusDto!) {
    changeFactoryStatus(data: $data) {
      factoryStatus
    }
  }
`;
export type ChangeFactoryStatusMutationFn = Apollo.MutationFunction<
  ChangeFactoryStatusMutation,
  ChangeFactoryStatusMutationVariables
>;

/**
 * __useChangeFactoryStatusMutation__
 *
 * To run a mutation, you first call `useChangeFactoryStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFactoryStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFactoryStatusMutation, { data, loading, error }] = useChangeFactoryStatusMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeFactoryStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeFactoryStatusMutation,
    ChangeFactoryStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeFactoryStatusMutation,
    ChangeFactoryStatusMutationVariables
  >(ChangeFactoryStatusDocument, options);
}
export type ChangeFactoryStatusMutationHookResult = ReturnType<
  typeof useChangeFactoryStatusMutation
>;
export type ChangeFactoryStatusMutationResult =
  Apollo.MutationResult<ChangeFactoryStatusMutation>;
export type ChangeFactoryStatusMutationOptions = Apollo.BaseMutationOptions<
  ChangeFactoryStatusMutation,
  ChangeFactoryStatusMutationVariables
>;
export const MyNotificationsDocument = gql`
  query MyNotifications {
    myNotifications {
      content
      createdAt
      id
      isRead
      title
      updatedAt
      url
    }
  }
`;

/**
 * __useMyNotificationsQuery__
 *
 * To run a query within a React component, call `useMyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNotificationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyNotificationsQuery,
    MyNotificationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(
    MyNotificationsDocument,
    options,
  );
}
export function useMyNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyNotificationsQuery,
    MyNotificationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyNotificationsQuery,
    MyNotificationsQueryVariables
  >(MyNotificationsDocument, options);
}
export function useMyNotificationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MyNotificationsQuery,
        MyNotificationsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MyNotificationsQuery,
    MyNotificationsQueryVariables
  >(MyNotificationsDocument, options);
}
export type MyNotificationsQueryHookResult = ReturnType<
  typeof useMyNotificationsQuery
>;
export type MyNotificationsLazyQueryHookResult = ReturnType<
  typeof useMyNotificationsLazyQuery
>;
export type MyNotificationsSuspenseQueryHookResult = ReturnType<
  typeof useMyNotificationsSuspenseQuery
>;
export type MyNotificationsQueryResult = Apollo.QueryResult<
  MyNotificationsQuery,
  MyNotificationsQueryVariables
>;
export const MarkNotificationAsReadDocument = gql`
  mutation MarkNotificationAsRead($markNotificationAsReadId: String!) {
    markNotificationAsRead(id: $markNotificationAsReadId) {
      content
      createdAt
      id
      isRead
      title
      updatedAt
      url
    }
  }
`;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<
  MarkNotificationAsReadMutation,
  MarkNotificationAsReadMutationVariables
>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      markNotificationAsReadId: // value for 'markNotificationAsReadId'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkNotificationAsReadMutation,
    MarkNotificationAsReadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkNotificationAsReadMutation,
    MarkNotificationAsReadMutationVariables
  >(MarkNotificationAsReadDocument, options);
}
export type MarkNotificationAsReadMutationHookResult = ReturnType<
  typeof useMarkNotificationAsReadMutation
>;
export type MarkNotificationAsReadMutationResult =
  Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<
  MarkNotificationAsReadMutation,
  MarkNotificationAsReadMutationVariables
>;
export const CreatePaymentGatewayUrlDocument = gql`
  mutation CreatePaymentGatewayUrl($gateway: String!, $paymentId: String!) {
    createPayment(gateway: $gateway, paymentId: $paymentId)
  }
`;
export type CreatePaymentGatewayUrlMutationFn = Apollo.MutationFunction<
  CreatePaymentGatewayUrlMutation,
  CreatePaymentGatewayUrlMutationVariables
>;

/**
 * __useCreatePaymentGatewayUrlMutation__
 *
 * To run a mutation, you first call `useCreatePaymentGatewayUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentGatewayUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentGatewayUrlMutation, { data, loading, error }] = useCreatePaymentGatewayUrlMutation({
 *   variables: {
 *      gateway: // value for 'gateway'
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useCreatePaymentGatewayUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePaymentGatewayUrlMutation,
    CreatePaymentGatewayUrlMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePaymentGatewayUrlMutation,
    CreatePaymentGatewayUrlMutationVariables
  >(CreatePaymentGatewayUrlDocument, options);
}
export type CreatePaymentGatewayUrlMutationHookResult = ReturnType<
  typeof useCreatePaymentGatewayUrlMutation
>;
export type CreatePaymentGatewayUrlMutationResult =
  Apollo.MutationResult<CreatePaymentGatewayUrlMutation>;
export type CreatePaymentGatewayUrlMutationOptions = Apollo.BaseMutationOptions<
  CreatePaymentGatewayUrlMutation,
  CreatePaymentGatewayUrlMutationVariables
>;
export const CreateOrderDocument = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
    }
  }
`;
export type CreateOrderMutationFn = Apollo.MutationFunction<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      createOrderInput: // value for 'createOrderInput'
 *   },
 * });
 */
export function useCreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
    CreateOrderDocument,
    options,
  );
}
export type CreateOrderMutationHookResult = ReturnType<
  typeof useCreateOrderMutation
>;
export type CreateOrderMutationResult =
  Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;
export const GetMyOrdersDocument = gql`
  query GetMyOrders {
    myOrders {
      acceptanceDeadline
      acceptedAt
      address {
        districtID
        factoryId
        id
        provinceID
        street
        wardCode
      }
      addressId
      assignedAt
      completedAt
      currentProgress
      customer {
        imageUrl
        name
        email
      }
      customerId
      delayReason
      doneCheckQualityAt
      doneProductionAt
      estimatedCheckQualityAt
      estimatedCompletionAt
      estimatedDoneProductionAt
      estimatedShippingAt
      factory {
        name
        owner {
          name
          imageUrl
          email
        }
      }
      id
      isDelayed
      orderDate
      orderDetails {
        checkQualities {
          totalChecked
          status
          passedQuantity
          orderDetailId
          task {
            taskname
            taskType
            status
            startDate
            note
            id
            expiredTime
            description
            completedDate
            assignee {
              email
              name
              imageUrl
              id
            }
            assignedDate
          }
        }
        completedQty
        createdAt
        design {
          thumbnailUrl
          systemConfigVariantId
          isTemplate
          isPublic
          isFinalized
          id
          systemConfigVariant {
            color
            id
            isActive
            isDeleted
            model
            price
            product {
              name
              imageUrl
            }
            productId
            size
          }
          designPositions {
            positionType {
              positionName
              basePrice
            }
            designJSON
          }
        }
        id
        isRework
        price
        productionCost
        quantity
        rejectedQty
        reworkTime
        status
        updatedAt
      }
      orderProgressReports {
        reportDate
        note
        imageUrls
        id
      }
      payments {
        id
        type
        paymentLog
        amount
        transactions {
          transactionLog
          status
          paymentMethod
          createdAt
          amount
          id
          type
        }
        status
      }
      ratedAt
      ratedBy
      rating
      ratingComment
      rejectedHistory {
        rejectedAt
        reassignedTo
        reassignedAt
        reason
        id
        factory {
          name
          contractUrl
          address {
            wardCode
            street
            districtID
            provinceID
          }
          owner {
            name
            email
            imageUrl
          }
        }
      }
      shippedAt
      shippingPrice
      status
      tasks {
        taskname
        taskType
        id
        status
        startDate
        note
        description
        expiredTime
        completedDate
        assignee {
          name
          imageUrl
          email
        }
        assignedDate
      }
      totalItems
      totalPrice
      totalProductionCost
      updatedAt
    }
  }
`;

/**
 * __useGetMyOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyOrdersQuery,
    GetMyOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(
    GetMyOrdersDocument,
    options,
  );
}
export function useGetMyOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyOrdersQuery,
    GetMyOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(
    GetMyOrdersDocument,
    options,
  );
}
export function useGetMyOrdersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyOrdersQuery,
        GetMyOrdersQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(
    GetMyOrdersDocument,
    options,
  );
}
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>;
export type GetMyOrdersLazyQueryHookResult = ReturnType<
  typeof useGetMyOrdersLazyQuery
>;
export type GetMyOrdersSuspenseQueryHookResult = ReturnType<
  typeof useGetMyOrdersSuspenseQuery
>;
export type GetMyOrdersQueryResult = Apollo.QueryResult<
  GetMyOrdersQuery,
  GetMyOrdersQueryVariables
>;
export const GetMyFactoryOrdersDocument = gql`
  query GetMyFactoryOrders {
    factoryOrders {
      acceptanceDeadline
      acceptedAt
      address {
        districtID
        factoryId
        id
        provinceID
        street
        wardCode
      }
      addressId
      assignedAt
      completedAt
      currentProgress
      customer {
        imageUrl
        name
        email
      }
      customerId
      delayReason
      doneCheckQualityAt
      doneProductionAt
      estimatedCheckQualityAt
      estimatedCompletionAt
      estimatedDoneProductionAt
      estimatedShippingAt
      factory {
        name
        owner {
          name
          imageUrl
          email
        }
      }
      id
      isDelayed
      orderDate
      orderDetails {
        checkQualities {
          totalChecked
          status
          passedQuantity
          orderDetailId
          task {
            taskname
            taskType
            status
            startDate
            note
            id
            expiredTime
            description
            completedDate
            assignee {
              email
              name
              imageUrl
              id
            }
            assignedDate
          }
        }
        completedQty
        createdAt
        design {
          thumbnailUrl
          systemConfigVariantId
          isTemplate
          isPublic
          isFinalized
          id
          systemConfigVariant {
            color
            id
            isActive
            isDeleted
            model
            price
            product {
              name
              imageUrl
            }
            productId
            size
          }
          designPositions {
            positionType {
              positionName
              basePrice
            }
            designJSON
          }
        }
        id
        isRework
        price
        productionCost
        quantity
        rejectedQty
        reworkTime
        status
        updatedAt
      }
      orderProgressReports {
        reportDate
        note
        imageUrls
        id
      }
      payments {
        id
        type
        paymentLog
        amount
        transactions {
          transactionLog
          status
          paymentMethod
          createdAt
          amount
          id
          type
        }
        status
      }
      ratedAt
      ratedBy
      rating
      ratingComment
      rejectedHistory {
        rejectedAt
        reassignedTo
        reassignedAt
        reason
        id
        factory {
          name
          contractUrl
          address {
            wardCode
            street
            districtID
            provinceID
          }
          owner {
            name
            email
            imageUrl
          }
        }
      }
      shippedAt
      shippingPrice
      status
      tasks {
        taskname
        taskType
        id
        status
        startDate
        note
        description
        expiredTime
        completedDate
        assignee {
          name
          imageUrl
          email
        }
        assignedDate
      }
      totalItems
      totalPrice
      totalProductionCost
      updatedAt
    }
  }
`;

/**
 * __useGetMyFactoryOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyFactoryOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFactoryOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFactoryOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyFactoryOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyFactoryOrdersQuery,
    GetMyFactoryOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMyFactoryOrdersQuery,
    GetMyFactoryOrdersQueryVariables
  >(GetMyFactoryOrdersDocument, options);
}
export function useGetMyFactoryOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyFactoryOrdersQuery,
    GetMyFactoryOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyFactoryOrdersQuery,
    GetMyFactoryOrdersQueryVariables
  >(GetMyFactoryOrdersDocument, options);
}
export function useGetMyFactoryOrdersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyFactoryOrdersQuery,
        GetMyFactoryOrdersQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyFactoryOrdersQuery,
    GetMyFactoryOrdersQueryVariables
  >(GetMyFactoryOrdersDocument, options);
}
export type GetMyFactoryOrdersQueryHookResult = ReturnType<
  typeof useGetMyFactoryOrdersQuery
>;
export type GetMyFactoryOrdersLazyQueryHookResult = ReturnType<
  typeof useGetMyFactoryOrdersLazyQuery
>;
export type GetMyFactoryOrdersSuspenseQueryHookResult = ReturnType<
  typeof useGetMyFactoryOrdersSuspenseQuery
>;
export type GetMyFactoryOrdersQueryResult = Apollo.QueryResult<
  GetMyFactoryOrdersQuery,
  GetMyFactoryOrdersQueryVariables
>;
export const GetOrderDocument = gql`
  query GetOrder($orderId: String!) {
    order(id: $orderId) {
      acceptanceDeadline
      acceptedAt
      address {
        districtID
        factoryId
        id
        provinceID
        street
        wardCode
      }
      addressId
      assignedAt
      completedAt
      currentProgress
      customer {
        imageUrl
        name
        email
      }
      customerId
      delayReason
      doneCheckQualityAt
      doneProductionAt
      estimatedCheckQualityAt
      estimatedCompletionAt
      estimatedDoneProductionAt
      estimatedShippingAt
      factory {
        name
        owner {
          name
          imageUrl
          email
        }
      }
      id
      isDelayed
      orderDate
      orderDetails {
        checkQualities {
          id
          totalChecked
          status
          passedQuantity
          orderDetailId
          task {
            taskname
            taskType
            status
            startDate
            note
            id
            expiredTime
            description
            completedDate
            assignee {
              email
              name
              imageUrl
              id
            }
            assignedDate
          }
        }
        completedQty
        createdAt
        design {
          thumbnailUrl
          systemConfigVariantId
          isTemplate
          isPublic
          isFinalized
          id
          systemConfigVariant {
            color
            id
            isActive
            isDeleted
            model
            price
            product {
              name
              imageUrl
            }
            productId
            size
          }
          designPositions {
            positionType {
              positionName
              basePrice
            }
            designJSON
          }
        }
        id
        isRework
        price
        productionCost
        quantity
        rejectedQty
        reworkTime
        status
        updatedAt
      }
      orderProgressReports {
        reportDate
        note
        imageUrls
        id
      }
      payments {
        id
        type
        paymentLog
        amount
        transactions {
          transactionLog
          status
          paymentMethod
          createdAt
          amount
          id
          type
        }
        status
      }
      ratedAt
      ratedBy
      rating
      ratingComment
      rejectedHistory {
        rejectedAt
        reassignedTo
        reassignedAt
        reason
        id
        factory {
          name
          contractUrl
          address {
            wardCode
            street
            districtID
            provinceID
          }
          owner {
            name
            email
            imageUrl
          }
        }
      }
      shippedAt
      shippingPrice
      status
      tasks {
        taskname
        taskType
        id
        status
        startDate
        note
        description
        expiredTime
        completedDate
        assignee {
          name
          imageUrl
          email
        }
        assignedDate
      }
      totalItems
      totalPrice
      totalProductionCost
      updatedAt
    }
  }
`;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderQuery(
  baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables> &
    ({ variables: GetOrderQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(
    GetOrderDocument,
    options,
  );
}
export function useGetOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrderQuery,
    GetOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(
    GetOrderDocument,
    options,
  );
}
export function useGetOrderSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetOrderQuery, GetOrderQueryVariables>(
    GetOrderDocument,
    options,
  );
}
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<
  typeof useGetOrderLazyQuery
>;
export type GetOrderSuspenseQueryHookResult = ReturnType<
  typeof useGetOrderSuspenseQuery
>;
export type GetOrderQueryResult = Apollo.QueryResult<
  GetOrderQuery,
  GetOrderQueryVariables
>;
export const GetAllOrdersDocument = gql`
  query GetAllOrders {
    orders {
      acceptanceDeadline
      acceptedAt
      address {
        districtID
        factoryId
        id
        provinceID
        street
        wardCode
      }
      addressId
      assignedAt
      completedAt
      currentProgress
      customer {
        imageUrl
        name
        email
      }
      customerId
      delayReason
      doneCheckQualityAt
      doneProductionAt
      estimatedCheckQualityAt
      estimatedCompletionAt
      estimatedDoneProductionAt
      estimatedShippingAt
      factory {
        name
        owner {
          name
          imageUrl
          email
        }
      }
      id
      isDelayed
      orderDate
      orderDetails {
        checkQualities {
          totalChecked
          status
          passedQuantity
          orderDetailId
          task {
            taskname
            taskType
            status
            startDate
            note
            id
            expiredTime
            description
            completedDate
            assignee {
              email
              name
              imageUrl
              id
            }
            assignedDate
          }
        }
        completedQty
        createdAt
        design {
          thumbnailUrl
          systemConfigVariantId
          isTemplate
          isPublic
          isFinalized
          id
          systemConfigVariant {
            color
            id
            isActive
            isDeleted
            model
            price
            product {
              name
              imageUrl
            }
            productId
            size
          }
          designPositions {
            positionType {
              positionName
              basePrice
            }
            designJSON
          }
        }
        id
        isRework
        price
        productionCost
        quantity
        rejectedQty
        reworkTime
        status
        updatedAt
      }
      orderProgressReports {
        reportDate
        note
        imageUrls
        id
      }
      payments {
        id
        type
        paymentLog
        amount
        transactions {
          transactionLog
          status
          paymentMethod
          createdAt
          amount
          id
          type
        }
        status
      }
      ratedAt
      ratedBy
      rating
      ratingComment
      rejectedHistory {
        rejectedAt
        reassignedTo
        reassignedAt
        reason
        id
        factory {
          name
          contractUrl
          address {
            wardCode
            street
            districtID
            provinceID
          }
          owner {
            name
            email
            imageUrl
          }
        }
      }
      shippedAt
      shippingPrice
      status
      tasks {
        taskname
        taskType
        id
        status
        startDate
        note
        description
        expiredTime
        completedDate
        assignee {
          name
          imageUrl
          email
        }
        assignedDate
      }
      totalItems
      totalPrice
      totalProductionCost
      updatedAt
    }
  }
`;

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllOrdersQuery,
    GetAllOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(
    GetAllOrdersDocument,
    options,
  );
}
export function useGetAllOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllOrdersQuery,
    GetAllOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(
    GetAllOrdersDocument,
    options,
  );
}
export function useGetAllOrdersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllOrdersQuery,
        GetAllOrdersQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(
    GetAllOrdersDocument,
    options,
  );
}
export type GetAllOrdersQueryHookResult = ReturnType<
  typeof useGetAllOrdersQuery
>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<
  typeof useGetAllOrdersLazyQuery
>;
export type GetAllOrdersSuspenseQueryHookResult = ReturnType<
  typeof useGetAllOrdersSuspenseQuery
>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<
  GetAllOrdersQuery,
  GetAllOrdersQueryVariables
>;
export const GetMyStaffOrdersDocument = gql`
  query GetMyStaffOrders {
    staffOrders {
      acceptanceDeadline
      acceptedAt
      address {
        districtID
        factoryId
        id
        provinceID
        street
        wardCode
      }
      addressId
      assignedAt
      completedAt
      currentProgress
      customer {
        imageUrl
        name
        email
      }
      customerId
      delayReason
      doneCheckQualityAt
      doneProductionAt
      estimatedCheckQualityAt
      estimatedCompletionAt
      estimatedDoneProductionAt
      estimatedShippingAt
      factory {
        name
        owner {
          name
          imageUrl
          email
        }
      }
      id
      isDelayed
      orderDate
      orderDetails {
        checkQualities {
          totalChecked
          status
          passedQuantity
          orderDetailId
          task {
            taskname
            taskType
            status
            startDate
            note
            id
            expiredTime
            description
            completedDate
            assignee {
              email
              name
              imageUrl
              id
            }
            assignedDate
          }
        }
        completedQty
        createdAt
        design {
          thumbnailUrl
          systemConfigVariantId
          isTemplate
          isPublic
          isFinalized
          id
          systemConfigVariant {
            color
            id
            isActive
            isDeleted
            model
            price
            product {
              name
              imageUrl
            }
            productId
            size
          }
          designPositions {
            positionType {
              positionName
              basePrice
            }
            designJSON
          }
        }
        id
        isRework
        price
        productionCost
        quantity
        rejectedQty
        reworkTime
        status
        updatedAt
      }
      orderProgressReports {
        reportDate
        note
        imageUrls
        id
      }
      payments {
        id
        type
        paymentLog
        amount
        transactions {
          transactionLog
          status
          paymentMethod
          createdAt
          amount
          id
          type
        }
        status
      }
      ratedAt
      ratedBy
      rating
      ratingComment
      rejectedHistory {
        rejectedAt
        reassignedTo
        reassignedAt
        reason
        id
        factory {
          name
          contractUrl
          address {
            wardCode
            street
            districtID
            provinceID
          }
          owner {
            name
            email
            imageUrl
          }
        }
      }
      shippedAt
      shippingPrice
      status
      tasks {
        taskname
        taskType
        id
        status
        startDate
        note
        description
        expiredTime
        completedDate
        assignee {
          name
          imageUrl
          email
        }
        assignedDate
      }
      totalItems
      totalPrice
      totalProductionCost
      updatedAt
    }
  }
`;

/**
 * __useGetMyStaffOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyStaffOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyStaffOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyStaffOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyStaffOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyStaffOrdersQuery,
    GetMyStaffOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>(
    GetMyStaffOrdersDocument,
    options,
  );
}
export function useGetMyStaffOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyStaffOrdersQuery,
    GetMyStaffOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyStaffOrdersQuery,
    GetMyStaffOrdersQueryVariables
  >(GetMyStaffOrdersDocument, options);
}
export function useGetMyStaffOrdersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyStaffOrdersQuery,
        GetMyStaffOrdersQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyStaffOrdersQuery,
    GetMyStaffOrdersQueryVariables
  >(GetMyStaffOrdersDocument, options);
}
export type GetMyStaffOrdersQueryHookResult = ReturnType<
  typeof useGetMyStaffOrdersQuery
>;
export type GetMyStaffOrdersLazyQueryHookResult = ReturnType<
  typeof useGetMyStaffOrdersLazyQuery
>;
export type GetMyStaffOrdersSuspenseQueryHookResult = ReturnType<
  typeof useGetMyStaffOrdersSuspenseQuery
>;
export type GetMyStaffOrdersQueryResult = Apollo.QueryResult<
  GetMyStaffOrdersQuery,
  GetMyStaffOrdersQueryVariables
>;
export const AcceptOrderForFactoryDocument = gql`
  mutation AcceptOrderForFactory($orderId: String!) {
    acceptOrderForFactory(orderId: $orderId) {
      id
    }
  }
`;
export type AcceptOrderForFactoryMutationFn = Apollo.MutationFunction<
  AcceptOrderForFactoryMutation,
  AcceptOrderForFactoryMutationVariables
>;

/**
 * __useAcceptOrderForFactoryMutation__
 *
 * To run a mutation, you first call `useAcceptOrderForFactoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptOrderForFactoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptOrderForFactoryMutation, { data, loading, error }] = useAcceptOrderForFactoryMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useAcceptOrderForFactoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptOrderForFactoryMutation,
    AcceptOrderForFactoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AcceptOrderForFactoryMutation,
    AcceptOrderForFactoryMutationVariables
  >(AcceptOrderForFactoryDocument, options);
}
export type AcceptOrderForFactoryMutationHookResult = ReturnType<
  typeof useAcceptOrderForFactoryMutation
>;
export type AcceptOrderForFactoryMutationResult =
  Apollo.MutationResult<AcceptOrderForFactoryMutation>;
export type AcceptOrderForFactoryMutationOptions = Apollo.BaseMutationOptions<
  AcceptOrderForFactoryMutation,
  AcceptOrderForFactoryMutationVariables
>;
export const RejectOrderDocument = gql`
  mutation RejectOrder($orderId: String!, $reason: String!) {
    rejectOrder(orderId: $orderId, reason: $reason) {
      id
    }
  }
`;
export type RejectOrderMutationFn = Apollo.MutationFunction<
  RejectOrderMutation,
  RejectOrderMutationVariables
>;

/**
 * __useRejectOrderMutation__
 *
 * To run a mutation, you first call `useRejectOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectOrderMutation, { data, loading, error }] = useRejectOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectOrderMutation,
    RejectOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RejectOrderMutation, RejectOrderMutationVariables>(
    RejectOrderDocument,
    options,
  );
}
export type RejectOrderMutationHookResult = ReturnType<
  typeof useRejectOrderMutation
>;
export type RejectOrderMutationResult =
  Apollo.MutationResult<RejectOrderMutation>;
export type RejectOrderMutationOptions = Apollo.BaseMutationOptions<
  RejectOrderMutation,
  RejectOrderMutationVariables
>;
export const DoneProductionOrderDetailsDocument = gql`
  mutation DoneProductionOrderDetails($orderDetailId: String!) {
    doneProductionOrderDetails(orderDetailId: $orderDetailId) {
      id
    }
  }
`;
export type DoneProductionOrderDetailsMutationFn = Apollo.MutationFunction<
  DoneProductionOrderDetailsMutation,
  DoneProductionOrderDetailsMutationVariables
>;

/**
 * __useDoneProductionOrderDetailsMutation__
 *
 * To run a mutation, you first call `useDoneProductionOrderDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoneProductionOrderDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doneProductionOrderDetailsMutation, { data, loading, error }] = useDoneProductionOrderDetailsMutation({
 *   variables: {
 *      orderDetailId: // value for 'orderDetailId'
 *   },
 * });
 */
export function useDoneProductionOrderDetailsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DoneProductionOrderDetailsMutation,
    DoneProductionOrderDetailsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DoneProductionOrderDetailsMutation,
    DoneProductionOrderDetailsMutationVariables
  >(DoneProductionOrderDetailsDocument, options);
}
export type DoneProductionOrderDetailsMutationHookResult = ReturnType<
  typeof useDoneProductionOrderDetailsMutation
>;
export type DoneProductionOrderDetailsMutationResult =
  Apollo.MutationResult<DoneProductionOrderDetailsMutation>;
export type DoneProductionOrderDetailsMutationOptions =
  Apollo.BaseMutationOptions<
    DoneProductionOrderDetailsMutation,
    DoneProductionOrderDetailsMutationVariables
  >;
export const StartReworkDocument = gql`
  mutation StartRework($orderId: String!) {
    startRework(orderId: $orderId) {
      id
    }
  }
`;
export type StartReworkMutationFn = Apollo.MutationFunction<
  StartReworkMutation,
  StartReworkMutationVariables
>;

/**
 * __useStartReworkMutation__
 *
 * To run a mutation, you first call `useStartReworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartReworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startReworkMutation, { data, loading, error }] = useStartReworkMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useStartReworkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    StartReworkMutation,
    StartReworkMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<StartReworkMutation, StartReworkMutationVariables>(
    StartReworkDocument,
    options,
  );
}
export type StartReworkMutationHookResult = ReturnType<
  typeof useStartReworkMutation
>;
export type StartReworkMutationResult =
  Apollo.MutationResult<StartReworkMutation>;
export type StartReworkMutationOptions = Apollo.BaseMutationOptions<
  StartReworkMutation,
  StartReworkMutationVariables
>;
export const DoneReworkForOrderDetailsDocument = gql`
  mutation DoneReworkForOrderDetails($orderDetailId: String!) {
    doneReworkForOrderDetails(orderDetailId: $orderDetailId) {
      id
    }
  }
`;
export type DoneReworkForOrderDetailsMutationFn = Apollo.MutationFunction<
  DoneReworkForOrderDetailsMutation,
  DoneReworkForOrderDetailsMutationVariables
>;

/**
 * __useDoneReworkForOrderDetailsMutation__
 *
 * To run a mutation, you first call `useDoneReworkForOrderDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoneReworkForOrderDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doneReworkForOrderDetailsMutation, { data, loading, error }] = useDoneReworkForOrderDetailsMutation({
 *   variables: {
 *      orderDetailId: // value for 'orderDetailId'
 *   },
 * });
 */
export function useDoneReworkForOrderDetailsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DoneReworkForOrderDetailsMutation,
    DoneReworkForOrderDetailsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DoneReworkForOrderDetailsMutation,
    DoneReworkForOrderDetailsMutationVariables
  >(DoneReworkForOrderDetailsDocument, options);
}
export type DoneReworkForOrderDetailsMutationHookResult = ReturnType<
  typeof useDoneReworkForOrderDetailsMutation
>;
export type DoneReworkForOrderDetailsMutationResult =
  Apollo.MutationResult<DoneReworkForOrderDetailsMutation>;
export type DoneReworkForOrderDetailsMutationOptions =
  Apollo.BaseMutationOptions<
    DoneReworkForOrderDetailsMutation,
    DoneReworkForOrderDetailsMutationVariables
  >;
export const DoneCheckQualityDocument = gql`
  mutation DoneCheckQuality($input: DoneCheckQualityInput!) {
    doneCheckQuality(input: $input) {
      id
    }
  }
`;
export type DoneCheckQualityMutationFn = Apollo.MutationFunction<
  DoneCheckQualityMutation,
  DoneCheckQualityMutationVariables
>;

/**
 * __useDoneCheckQualityMutation__
 *
 * To run a mutation, you first call `useDoneCheckQualityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoneCheckQualityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doneCheckQualityMutation, { data, loading, error }] = useDoneCheckQualityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDoneCheckQualityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DoneCheckQualityMutation,
    DoneCheckQualityMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DoneCheckQualityMutation,
    DoneCheckQualityMutationVariables
  >(DoneCheckQualityDocument, options);
}
export type DoneCheckQualityMutationHookResult = ReturnType<
  typeof useDoneCheckQualityMutation
>;
export type DoneCheckQualityMutationResult =
  Apollo.MutationResult<DoneCheckQualityMutation>;
export type DoneCheckQualityMutationOptions = Apollo.BaseMutationOptions<
  DoneCheckQualityMutation,
  DoneCheckQualityMutationVariables
>;
export const ShippedOrderDocument = gql`
  mutation ShippedOrder($orderId: String!) {
    shippedOrder(orderId: $orderId) {
      id
    }
  }
`;
export type ShippedOrderMutationFn = Apollo.MutationFunction<
  ShippedOrderMutation,
  ShippedOrderMutationVariables
>;

/**
 * __useShippedOrderMutation__
 *
 * To run a mutation, you first call `useShippedOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShippedOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shippedOrderMutation, { data, loading, error }] = useShippedOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useShippedOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ShippedOrderMutation,
    ShippedOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ShippedOrderMutation,
    ShippedOrderMutationVariables
  >(ShippedOrderDocument, options);
}
export type ShippedOrderMutationHookResult = ReturnType<
  typeof useShippedOrderMutation
>;
export type ShippedOrderMutationResult =
  Apollo.MutationResult<ShippedOrderMutation>;
export type ShippedOrderMutationOptions = Apollo.BaseMutationOptions<
  ShippedOrderMutation,
  ShippedOrderMutationVariables
>;
export const FeedbackOrderDocument = gql`
  mutation FeedbackOrder($input: FeedbackOrderInput!, $orderId: String!) {
    feedbackOrder(input: $input, orderId: $orderId) {
      id
    }
  }
`;
export type FeedbackOrderMutationFn = Apollo.MutationFunction<
  FeedbackOrderMutation,
  FeedbackOrderMutationVariables
>;

/**
 * __useFeedbackOrderMutation__
 *
 * To run a mutation, you first call `useFeedbackOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeedbackOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feedbackOrderMutation, { data, loading, error }] = useFeedbackOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useFeedbackOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FeedbackOrderMutation,
    FeedbackOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    FeedbackOrderMutation,
    FeedbackOrderMutationVariables
  >(FeedbackOrderDocument, options);
}
export type FeedbackOrderMutationHookResult = ReturnType<
  typeof useFeedbackOrderMutation
>;
export type FeedbackOrderMutationResult =
  Apollo.MutationResult<FeedbackOrderMutation>;
export type FeedbackOrderMutationOptions = Apollo.BaseMutationOptions<
  FeedbackOrderMutation,
  FeedbackOrderMutationVariables
>;
export const ProductDesignsDocument = gql`
  query ProductDesigns {
    productDesigns {
      id
      thumbnailUrl
      systemConfigVariant {
        product {
          name
          category {
            name
          }
        }
      }
      designPositions {
        positionType {
          id
          positionName
          basePrice
        }
        designJSON
      }
    }
  }
`;

/**
 * __useProductDesignsQuery__
 *
 * To run a query within a React component, call `useProductDesignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDesignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDesignsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductDesignsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductDesignsQuery,
    ProductDesignsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductDesignsQuery, ProductDesignsQueryVariables>(
    ProductDesignsDocument,
    options,
  );
}
export function useProductDesignsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductDesignsQuery,
    ProductDesignsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductDesignsQuery, ProductDesignsQueryVariables>(
    ProductDesignsDocument,
    options,
  );
}
export function useProductDesignsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ProductDesignsQuery,
        ProductDesignsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ProductDesignsQuery,
    ProductDesignsQueryVariables
  >(ProductDesignsDocument, options);
}
export type ProductDesignsQueryHookResult = ReturnType<
  typeof useProductDesignsQuery
>;
export type ProductDesignsLazyQueryHookResult = ReturnType<
  typeof useProductDesignsLazyQuery
>;
export type ProductDesignsSuspenseQueryHookResult = ReturnType<
  typeof useProductDesignsSuspenseQuery
>;
export type ProductDesignsQueryResult = Apollo.QueryResult<
  ProductDesignsQuery,
  ProductDesignsQueryVariables
>;
export const ProductDesignsByUserDocument = gql`
  query ProductDesignsByUser {
    productDesignsByUser {
      id
      thumbnailUrl
      systemConfigVariant {
        product {
          name
          category {
            name
          }
        }
      }
      designPositions {
        positionType {
          id
          positionName
          basePrice
        }
        designJSON
      }
    }
  }
`;

/**
 * __useProductDesignsByUserQuery__
 *
 * To run a query within a React component, call `useProductDesignsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDesignsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDesignsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductDesignsByUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductDesignsByUserQuery,
    ProductDesignsByUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ProductDesignsByUserQuery,
    ProductDesignsByUserQueryVariables
  >(ProductDesignsByUserDocument, options);
}
export function useProductDesignsByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductDesignsByUserQuery,
    ProductDesignsByUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ProductDesignsByUserQuery,
    ProductDesignsByUserQueryVariables
  >(ProductDesignsByUserDocument, options);
}
export function useProductDesignsByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ProductDesignsByUserQuery,
        ProductDesignsByUserQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ProductDesignsByUserQuery,
    ProductDesignsByUserQueryVariables
  >(ProductDesignsByUserDocument, options);
}
export type ProductDesignsByUserQueryHookResult = ReturnType<
  typeof useProductDesignsByUserQuery
>;
export type ProductDesignsByUserLazyQueryHookResult = ReturnType<
  typeof useProductDesignsByUserLazyQuery
>;
export type ProductDesignsByUserSuspenseQueryHookResult = ReturnType<
  typeof useProductDesignsByUserSuspenseQuery
>;
export type ProductDesignsByUserQueryResult = Apollo.QueryResult<
  ProductDesignsByUserQuery,
  ProductDesignsByUserQueryVariables
>;
export const ProductDesignByIdDocument = gql`
  query ProductDesignById($productDesignId: ID!) {
    productDesign(id: $productDesignId) {
      thumbnailUrl
      systemConfigVariant {
        id
        price
        color
        size
        model
      }
      designPositions {
        positionType {
          id
          positionName
          basePrice
        }
        designJSON
      }
    }
  }
`;

/**
 * __useProductDesignByIdQuery__
 *
 * To run a query within a React component, call `useProductDesignByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDesignByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDesignByIdQuery({
 *   variables: {
 *      productDesignId: // value for 'productDesignId'
 *   },
 * });
 */
export function useProductDesignByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProductDesignByIdQuery,
    ProductDesignByIdQueryVariables
  > &
    (
      | { variables: ProductDesignByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ProductDesignByIdQuery,
    ProductDesignByIdQueryVariables
  >(ProductDesignByIdDocument, options);
}
export function useProductDesignByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductDesignByIdQuery,
    ProductDesignByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ProductDesignByIdQuery,
    ProductDesignByIdQueryVariables
  >(ProductDesignByIdDocument, options);
}
export function useProductDesignByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ProductDesignByIdQuery,
        ProductDesignByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ProductDesignByIdQuery,
    ProductDesignByIdQueryVariables
  >(ProductDesignByIdDocument, options);
}
export type ProductDesignByIdQueryHookResult = ReturnType<
  typeof useProductDesignByIdQuery
>;
export type ProductDesignByIdLazyQueryHookResult = ReturnType<
  typeof useProductDesignByIdLazyQuery
>;
export type ProductDesignByIdSuspenseQueryHookResult = ReturnType<
  typeof useProductDesignByIdSuspenseQuery
>;
export type ProductDesignByIdQueryResult = Apollo.QueryResult<
  ProductDesignByIdQuery,
  ProductDesignByIdQueryVariables
>;
export const CreateProductDesignDocument = gql`
  mutation CreateProductDesign($input: CreateProductDesignDto!) {
    createProductDesign(input: $input) {
      id
    }
  }
`;
export type CreateProductDesignMutationFn = Apollo.MutationFunction<
  CreateProductDesignMutation,
  CreateProductDesignMutationVariables
>;

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
export function useCreateProductDesignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductDesignMutation,
    CreateProductDesignMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductDesignMutation,
    CreateProductDesignMutationVariables
  >(CreateProductDesignDocument, options);
}
export type CreateProductDesignMutationHookResult = ReturnType<
  typeof useCreateProductDesignMutation
>;
export type CreateProductDesignMutationResult =
  Apollo.MutationResult<CreateProductDesignMutation>;
export type CreateProductDesignMutationOptions = Apollo.BaseMutationOptions<
  CreateProductDesignMutation,
  CreateProductDesignMutationVariables
>;
export const UpdateProductDesignDocument = gql`
  mutation UpdateProductDesign(
    $updateProductDesignId: String!
    $input: UpdateProductDesignDto!
  ) {
    updateProductDesign(id: $updateProductDesignId, input: $input) {
      thumbnailUrl
      systemConfigVariant {
        id
        price
        color
        size
        model
      }
      designPositions {
        positionType {
          id
          positionName
          basePrice
        }
        designJSON
      }
    }
  }
`;
export type UpdateProductDesignMutationFn = Apollo.MutationFunction<
  UpdateProductDesignMutation,
  UpdateProductDesignMutationVariables
>;

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
 *      updateProductDesignId: // value for 'updateProductDesignId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductDesignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductDesignMutation,
    UpdateProductDesignMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProductDesignMutation,
    UpdateProductDesignMutationVariables
  >(UpdateProductDesignDocument, options);
}
export type UpdateProductDesignMutationHookResult = ReturnType<
  typeof useUpdateProductDesignMutation
>;
export type UpdateProductDesignMutationResult =
  Apollo.MutationResult<UpdateProductDesignMutation>;
export type UpdateProductDesignMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductDesignMutation,
  UpdateProductDesignMutationVariables
>;
export const UpdateThumbnailProductDesignDocument = gql`
  mutation UpdateThumbnailProductDesign(
    $updateProductDesignId: String!
    $input: UpdateProductDesignDto!
    $fileUrl: String!
  ) {
    updateProductDesign(id: $updateProductDesignId, input: $input) {
      thumbnailUrl
    }
    deleteFile(fileUrl: $fileUrl)
  }
`;
export type UpdateThumbnailProductDesignMutationFn = Apollo.MutationFunction<
  UpdateThumbnailProductDesignMutation,
  UpdateThumbnailProductDesignMutationVariables
>;

/**
 * __useUpdateThumbnailProductDesignMutation__
 *
 * To run a mutation, you first call `useUpdateThumbnailProductDesignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThumbnailProductDesignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThumbnailProductDesignMutation, { data, loading, error }] = useUpdateThumbnailProductDesignMutation({
 *   variables: {
 *      updateProductDesignId: // value for 'updateProductDesignId'
 *      input: // value for 'input'
 *      fileUrl: // value for 'fileUrl'
 *   },
 * });
 */
export function useUpdateThumbnailProductDesignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateThumbnailProductDesignMutation,
    UpdateThumbnailProductDesignMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateThumbnailProductDesignMutation,
    UpdateThumbnailProductDesignMutationVariables
  >(UpdateThumbnailProductDesignDocument, options);
}
export type UpdateThumbnailProductDesignMutationHookResult = ReturnType<
  typeof useUpdateThumbnailProductDesignMutation
>;
export type UpdateThumbnailProductDesignMutationResult =
  Apollo.MutationResult<UpdateThumbnailProductDesignMutation>;
export type UpdateThumbnailProductDesignMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateThumbnailProductDesignMutation,
    UpdateThumbnailProductDesignMutationVariables
  >;
export const ProductDesignTemplatesDocument = gql`
  query ProductDesignTemplates {
    productDesigns {
      id
      isPublic
      isTemplate
      isFinalized
      thumbnailUrl
      designPositions {
        positionType {
          id
          positionName
          basePrice
        }
        designJSON
      }
    }
  }
`;

/**
 * __useProductDesignTemplatesQuery__
 *
 * To run a query within a React component, call `useProductDesignTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDesignTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDesignTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductDesignTemplatesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductDesignTemplatesQuery,
    ProductDesignTemplatesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ProductDesignTemplatesQuery,
    ProductDesignTemplatesQueryVariables
  >(ProductDesignTemplatesDocument, options);
}
export function useProductDesignTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductDesignTemplatesQuery,
    ProductDesignTemplatesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ProductDesignTemplatesQuery,
    ProductDesignTemplatesQueryVariables
  >(ProductDesignTemplatesDocument, options);
}
export function useProductDesignTemplatesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ProductDesignTemplatesQuery,
        ProductDesignTemplatesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ProductDesignTemplatesQuery,
    ProductDesignTemplatesQueryVariables
  >(ProductDesignTemplatesDocument, options);
}
export type ProductDesignTemplatesQueryHookResult = ReturnType<
  typeof useProductDesignTemplatesQuery
>;
export type ProductDesignTemplatesLazyQueryHookResult = ReturnType<
  typeof useProductDesignTemplatesLazyQuery
>;
export type ProductDesignTemplatesSuspenseQueryHookResult = ReturnType<
  typeof useProductDesignTemplatesSuspenseQuery
>;
export type ProductDesignTemplatesQueryResult = Apollo.QueryResult<
  ProductDesignTemplatesQuery,
  ProductDesignTemplatesQueryVariables
>;
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
      variants {
        price
      }
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
export function useGetAllProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(
    GetAllProductsDocument,
    options,
  );
}
export function useGetAllProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(
    GetAllProductsDocument,
    options,
  );
}
export function useGetAllProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllProductsQuery,
        GetAllProductsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >(GetAllProductsDocument, options);
}
export type GetAllProductsQueryHookResult = ReturnType<
  typeof useGetAllProductsQuery
>;
export type GetAllProductsLazyQueryHookResult = ReturnType<
  typeof useGetAllProductsLazyQuery
>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllProductsSuspenseQuery
>;
export type GetAllProductsQueryResult = Apollo.QueryResult<
  GetAllProductsQuery,
  GetAllProductsQueryVariables
>;
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
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

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
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
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
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

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
export function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
  typeof useDeleteProductMutation
>;
export type DeleteProductMutationResult =
  Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const GetProductInformationByIdDocument = gql`
  query GetProductInformationById($productId: String!) {
    product(id: $productId) {
      imageUrl
      name
      variants {
        id
        price
        color
        size
        model
      }
    }
  }
`;

/**
 * __useGetProductInformationByIdQuery__
 *
 * To run a query within a React component, call `useGetProductInformationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductInformationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductInformationByIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductInformationByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProductInformationByIdQuery,
    GetProductInformationByIdQueryVariables
  > &
    (
      | { variables: GetProductInformationByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetProductInformationByIdQuery,
    GetProductInformationByIdQueryVariables
  >(GetProductInformationByIdDocument, options);
}
export function useGetProductInformationByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProductInformationByIdQuery,
    GetProductInformationByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProductInformationByIdQuery,
    GetProductInformationByIdQueryVariables
  >(GetProductInformationByIdDocument, options);
}
export function useGetProductInformationByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProductInformationByIdQuery,
        GetProductInformationByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProductInformationByIdQuery,
    GetProductInformationByIdQueryVariables
  >(GetProductInformationByIdDocument, options);
}
export type GetProductInformationByIdQueryHookResult = ReturnType<
  typeof useGetProductInformationByIdQuery
>;
export type GetProductInformationByIdLazyQueryHookResult = ReturnType<
  typeof useGetProductInformationByIdLazyQuery
>;
export type GetProductInformationByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetProductInformationByIdSuspenseQuery
>;
export type GetProductInformationByIdQueryResult = Apollo.QueryResult<
  GetProductInformationByIdQuery,
  GetProductInformationByIdQueryVariables
>;
export const GetAllProvincesDocument = gql`
  query GetAllProvinces {
    provinces {
      provinceId
      provinceName
    }
  }
`;

/**
 * __useGetAllProvincesQuery__
 *
 * To run a query within a React component, call `useGetAllProvincesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProvincesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProvincesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProvincesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllProvincesQuery,
    GetAllProvincesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllProvincesQuery, GetAllProvincesQueryVariables>(
    GetAllProvincesDocument,
    options,
  );
}
export function useGetAllProvincesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllProvincesQuery,
    GetAllProvincesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllProvincesQuery,
    GetAllProvincesQueryVariables
  >(GetAllProvincesDocument, options);
}
export function useGetAllProvincesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllProvincesQuery,
        GetAllProvincesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllProvincesQuery,
    GetAllProvincesQueryVariables
  >(GetAllProvincesDocument, options);
}
export type GetAllProvincesQueryHookResult = ReturnType<
  typeof useGetAllProvincesQuery
>;
export type GetAllProvincesLazyQueryHookResult = ReturnType<
  typeof useGetAllProvincesLazyQuery
>;
export type GetAllProvincesSuspenseQueryHookResult = ReturnType<
  typeof useGetAllProvincesSuspenseQuery
>;
export type GetAllProvincesQueryResult = Apollo.QueryResult<
  GetAllProvincesQuery,
  GetAllProvincesQueryVariables
>;
export const GetProvinceByIdDocument = gql`
  query GetProvinceById($provinceId: Int!) {
    province(provinceId: $provinceId) {
      provinceId
      provinceName
    }
  }
`;

/**
 * __useGetProvinceByIdQuery__
 *
 * To run a query within a React component, call `useGetProvinceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProvinceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProvinceByIdQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *   },
 * });
 */
export function useGetProvinceByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProvinceByIdQuery,
    GetProvinceByIdQueryVariables
  > &
    (
      | { variables: GetProvinceByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProvinceByIdQuery, GetProvinceByIdQueryVariables>(
    GetProvinceByIdDocument,
    options,
  );
}
export function useGetProvinceByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProvinceByIdQuery,
    GetProvinceByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProvinceByIdQuery,
    GetProvinceByIdQueryVariables
  >(GetProvinceByIdDocument, options);
}
export function useGetProvinceByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProvinceByIdQuery,
        GetProvinceByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProvinceByIdQuery,
    GetProvinceByIdQueryVariables
  >(GetProvinceByIdDocument, options);
}
export type GetProvinceByIdQueryHookResult = ReturnType<
  typeof useGetProvinceByIdQuery
>;
export type GetProvinceByIdLazyQueryHookResult = ReturnType<
  typeof useGetProvinceByIdLazyQuery
>;
export type GetProvinceByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetProvinceByIdSuspenseQuery
>;
export type GetProvinceByIdQueryResult = Apollo.QueryResult<
  GetProvinceByIdQuery,
  GetProvinceByIdQueryVariables
>;
export const GetAllDistrictsByProvinceIdDocument = gql`
  query GetAllDistrictsByProvinceId($provinceId: Int!) {
    districts(provinceId: $provinceId) {
      districtId
      districtName
      provinceId
    }
  }
`;

/**
 * __useGetAllDistrictsByProvinceIdQuery__
 *
 * To run a query within a React component, call `useGetAllDistrictsByProvinceIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDistrictsByProvinceIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDistrictsByProvinceIdQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *   },
 * });
 */
export function useGetAllDistrictsByProvinceIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllDistrictsByProvinceIdQuery,
    GetAllDistrictsByProvinceIdQueryVariables
  > &
    (
      | { variables: GetAllDistrictsByProvinceIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllDistrictsByProvinceIdQuery,
    GetAllDistrictsByProvinceIdQueryVariables
  >(GetAllDistrictsByProvinceIdDocument, options);
}
export function useGetAllDistrictsByProvinceIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllDistrictsByProvinceIdQuery,
    GetAllDistrictsByProvinceIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllDistrictsByProvinceIdQuery,
    GetAllDistrictsByProvinceIdQueryVariables
  >(GetAllDistrictsByProvinceIdDocument, options);
}
export function useGetAllDistrictsByProvinceIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllDistrictsByProvinceIdQuery,
        GetAllDistrictsByProvinceIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllDistrictsByProvinceIdQuery,
    GetAllDistrictsByProvinceIdQueryVariables
  >(GetAllDistrictsByProvinceIdDocument, options);
}
export type GetAllDistrictsByProvinceIdQueryHookResult = ReturnType<
  typeof useGetAllDistrictsByProvinceIdQuery
>;
export type GetAllDistrictsByProvinceIdLazyQueryHookResult = ReturnType<
  typeof useGetAllDistrictsByProvinceIdLazyQuery
>;
export type GetAllDistrictsByProvinceIdSuspenseQueryHookResult = ReturnType<
  typeof useGetAllDistrictsByProvinceIdSuspenseQuery
>;
export type GetAllDistrictsByProvinceIdQueryResult = Apollo.QueryResult<
  GetAllDistrictsByProvinceIdQuery,
  GetAllDistrictsByProvinceIdQueryVariables
>;
export const GetDistrictByIdDocument = gql`
  query GetDistrictById($districtId: Int!) {
    district(districtId: $districtId) {
      districtId
      districtName
      provinceId
    }
  }
`;

/**
 * __useGetDistrictByIdQuery__
 *
 * To run a query within a React component, call `useGetDistrictByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDistrictByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDistrictByIdQuery({
 *   variables: {
 *      districtId: // value for 'districtId'
 *   },
 * });
 */
export function useGetDistrictByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDistrictByIdQuery,
    GetDistrictByIdQueryVariables
  > &
    (
      | { variables: GetDistrictByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>(
    GetDistrictByIdDocument,
    options,
  );
}
export function useGetDistrictByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDistrictByIdQuery,
    GetDistrictByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDistrictByIdQuery,
    GetDistrictByIdQueryVariables
  >(GetDistrictByIdDocument, options);
}
export function useGetDistrictByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetDistrictByIdQuery,
        GetDistrictByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetDistrictByIdQuery,
    GetDistrictByIdQueryVariables
  >(GetDistrictByIdDocument, options);
}
export type GetDistrictByIdQueryHookResult = ReturnType<
  typeof useGetDistrictByIdQuery
>;
export type GetDistrictByIdLazyQueryHookResult = ReturnType<
  typeof useGetDistrictByIdLazyQuery
>;
export type GetDistrictByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetDistrictByIdSuspenseQuery
>;
export type GetDistrictByIdQueryResult = Apollo.QueryResult<
  GetDistrictByIdQuery,
  GetDistrictByIdQueryVariables
>;
export const GetAllWardsByDistrictIdDocument = gql`
  query GetAllWardsByDistrictId($districtId: Int!) {
    wards(districtId: $districtId) {
      wardCode
      wardName
      districtId
    }
  }
`;

/**
 * __useGetAllWardsByDistrictIdQuery__
 *
 * To run a query within a React component, call `useGetAllWardsByDistrictIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWardsByDistrictIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWardsByDistrictIdQuery({
 *   variables: {
 *      districtId: // value for 'districtId'
 *   },
 * });
 */
export function useGetAllWardsByDistrictIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllWardsByDistrictIdQuery,
    GetAllWardsByDistrictIdQueryVariables
  > &
    (
      | { variables: GetAllWardsByDistrictIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllWardsByDistrictIdQuery,
    GetAllWardsByDistrictIdQueryVariables
  >(GetAllWardsByDistrictIdDocument, options);
}
export function useGetAllWardsByDistrictIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllWardsByDistrictIdQuery,
    GetAllWardsByDistrictIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllWardsByDistrictIdQuery,
    GetAllWardsByDistrictIdQueryVariables
  >(GetAllWardsByDistrictIdDocument, options);
}
export function useGetAllWardsByDistrictIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllWardsByDistrictIdQuery,
        GetAllWardsByDistrictIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllWardsByDistrictIdQuery,
    GetAllWardsByDistrictIdQueryVariables
  >(GetAllWardsByDistrictIdDocument, options);
}
export type GetAllWardsByDistrictIdQueryHookResult = ReturnType<
  typeof useGetAllWardsByDistrictIdQuery
>;
export type GetAllWardsByDistrictIdLazyQueryHookResult = ReturnType<
  typeof useGetAllWardsByDistrictIdLazyQuery
>;
export type GetAllWardsByDistrictIdSuspenseQueryHookResult = ReturnType<
  typeof useGetAllWardsByDistrictIdSuspenseQuery
>;
export type GetAllWardsByDistrictIdQueryResult = Apollo.QueryResult<
  GetAllWardsByDistrictIdQuery,
  GetAllWardsByDistrictIdQueryVariables
>;
export const GetWardByWardCodeDocument = gql`
  query GetWardByWardCode($wardCode: String!) {
    ward(wardCode: $wardCode) {
      districtId
      wardCode
      wardName
    }
  }
`;

/**
 * __useGetWardByWardCodeQuery__
 *
 * To run a query within a React component, call `useGetWardByWardCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWardByWardCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWardByWardCodeQuery({
 *   variables: {
 *      wardCode: // value for 'wardCode'
 *   },
 * });
 */
export function useGetWardByWardCodeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWardByWardCodeQuery,
    GetWardByWardCodeQueryVariables
  > &
    (
      | { variables: GetWardByWardCodeQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetWardByWardCodeQuery,
    GetWardByWardCodeQueryVariables
  >(GetWardByWardCodeDocument, options);
}
export function useGetWardByWardCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWardByWardCodeQuery,
    GetWardByWardCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWardByWardCodeQuery,
    GetWardByWardCodeQueryVariables
  >(GetWardByWardCodeDocument, options);
}
export function useGetWardByWardCodeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetWardByWardCodeQuery,
        GetWardByWardCodeQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetWardByWardCodeQuery,
    GetWardByWardCodeQueryVariables
  >(GetWardByWardCodeDocument, options);
}
export type GetWardByWardCodeQueryHookResult = ReturnType<
  typeof useGetWardByWardCodeQuery
>;
export type GetWardByWardCodeLazyQueryHookResult = ReturnType<
  typeof useGetWardByWardCodeLazyQuery
>;
export type GetWardByWardCodeSuspenseQueryHookResult = ReturnType<
  typeof useGetWardByWardCodeSuspenseQuery
>;
export type GetWardByWardCodeQueryResult = Apollo.QueryResult<
  GetWardByWardCodeQuery,
  GetWardByWardCodeQueryVariables
>;
export const GetAvailableServiceDocument = gql`
  query GetAvailableService($servicesInput: GetAvailableServicesDto!) {
    availableServices(servicesInput: $servicesInput) {
      shortName
      serviceTypeId
      serviceId
    }
  }
`;

/**
 * __useGetAvailableServiceQuery__
 *
 * To run a query within a React component, call `useGetAvailableServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableServiceQuery({
 *   variables: {
 *      servicesInput: // value for 'servicesInput'
 *   },
 * });
 */
export function useGetAvailableServiceQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAvailableServiceQuery,
    GetAvailableServiceQueryVariables
  > &
    (
      | { variables: GetAvailableServiceQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAvailableServiceQuery,
    GetAvailableServiceQueryVariables
  >(GetAvailableServiceDocument, options);
}
export function useGetAvailableServiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAvailableServiceQuery,
    GetAvailableServiceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAvailableServiceQuery,
    GetAvailableServiceQueryVariables
  >(GetAvailableServiceDocument, options);
}
export function useGetAvailableServiceSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAvailableServiceQuery,
        GetAvailableServiceQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAvailableServiceQuery,
    GetAvailableServiceQueryVariables
  >(GetAvailableServiceDocument, options);
}
export type GetAvailableServiceQueryHookResult = ReturnType<
  typeof useGetAvailableServiceQuery
>;
export type GetAvailableServiceLazyQueryHookResult = ReturnType<
  typeof useGetAvailableServiceLazyQuery
>;
export type GetAvailableServiceSuspenseQueryHookResult = ReturnType<
  typeof useGetAvailableServiceSuspenseQuery
>;
export type GetAvailableServiceQueryResult = Apollo.QueryResult<
  GetAvailableServiceQuery,
  GetAvailableServiceQueryVariables
>;
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
export function useGetAllSystemConfigBanksQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllSystemConfigBanksQuery,
    GetAllSystemConfigBanksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllSystemConfigBanksQuery,
    GetAllSystemConfigBanksQueryVariables
  >(GetAllSystemConfigBanksDocument, options);
}
export function useGetAllSystemConfigBanksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllSystemConfigBanksQuery,
    GetAllSystemConfigBanksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllSystemConfigBanksQuery,
    GetAllSystemConfigBanksQueryVariables
  >(GetAllSystemConfigBanksDocument, options);
}
export function useGetAllSystemConfigBanksSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllSystemConfigBanksQuery,
        GetAllSystemConfigBanksQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllSystemConfigBanksQuery,
    GetAllSystemConfigBanksQueryVariables
  >(GetAllSystemConfigBanksDocument, options);
}
export type GetAllSystemConfigBanksQueryHookResult = ReturnType<
  typeof useGetAllSystemConfigBanksQuery
>;
export type GetAllSystemConfigBanksLazyQueryHookResult = ReturnType<
  typeof useGetAllSystemConfigBanksLazyQuery
>;
export type GetAllSystemConfigBanksSuspenseQueryHookResult = ReturnType<
  typeof useGetAllSystemConfigBanksSuspenseQuery
>;
export type GetAllSystemConfigBanksQueryResult = Apollo.QueryResult<
  GetAllSystemConfigBanksQuery,
  GetAllSystemConfigBanksQueryVariables
>;
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
export function useGetSystemConfigBankByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSystemConfigBankByIdQuery,
    GetSystemConfigBankByIdQueryVariables
  > &
    (
      | { variables: GetSystemConfigBankByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSystemConfigBankByIdQuery,
    GetSystemConfigBankByIdQueryVariables
  >(GetSystemConfigBankByIdDocument, options);
}
export function useGetSystemConfigBankByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSystemConfigBankByIdQuery,
    GetSystemConfigBankByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSystemConfigBankByIdQuery,
    GetSystemConfigBankByIdQueryVariables
  >(GetSystemConfigBankByIdDocument, options);
}
export function useGetSystemConfigBankByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSystemConfigBankByIdQuery,
        GetSystemConfigBankByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSystemConfigBankByIdQuery,
    GetSystemConfigBankByIdQueryVariables
  >(GetSystemConfigBankByIdDocument, options);
}
export type GetSystemConfigBankByIdQueryHookResult = ReturnType<
  typeof useGetSystemConfigBankByIdQuery
>;
export type GetSystemConfigBankByIdLazyQueryHookResult = ReturnType<
  typeof useGetSystemConfigBankByIdLazyQuery
>;
export type GetSystemConfigBankByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetSystemConfigBankByIdSuspenseQuery
>;
export type GetSystemConfigBankByIdQueryResult = Apollo.QueryResult<
  GetSystemConfigBankByIdQuery,
  GetSystemConfigBankByIdQueryVariables
>;
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
export type CreateSystemConfigBankMutationFn = Apollo.MutationFunction<
  CreateSystemConfigBankMutation,
  CreateSystemConfigBankMutationVariables
>;

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
export function useCreateSystemConfigBankMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSystemConfigBankMutation,
    CreateSystemConfigBankMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSystemConfigBankMutation,
    CreateSystemConfigBankMutationVariables
  >(CreateSystemConfigBankDocument, options);
}
export type CreateSystemConfigBankMutationHookResult = ReturnType<
  typeof useCreateSystemConfigBankMutation
>;
export type CreateSystemConfigBankMutationResult =
  Apollo.MutationResult<CreateSystemConfigBankMutation>;
export type CreateSystemConfigBankMutationOptions = Apollo.BaseMutationOptions<
  CreateSystemConfigBankMutation,
  CreateSystemConfigBankMutationVariables
>;
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
export type RemoveSystemConfigBankMutationFn = Apollo.MutationFunction<
  RemoveSystemConfigBankMutation,
  RemoveSystemConfigBankMutationVariables
>;

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
export function useRemoveSystemConfigBankMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveSystemConfigBankMutation,
    RemoveSystemConfigBankMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveSystemConfigBankMutation,
    RemoveSystemConfigBankMutationVariables
  >(RemoveSystemConfigBankDocument, options);
}
export type RemoveSystemConfigBankMutationHookResult = ReturnType<
  typeof useRemoveSystemConfigBankMutation
>;
export type RemoveSystemConfigBankMutationResult =
  Apollo.MutationResult<RemoveSystemConfigBankMutation>;
export type RemoveSystemConfigBankMutationOptions = Apollo.BaseMutationOptions<
  RemoveSystemConfigBankMutation,
  RemoveSystemConfigBankMutationVariables
>;
export const GetSystemConfigVariantsDocument = gql`
  query GetSystemConfigVariants {
    systemConfigVariants {
      color
      id
      isActive
      isDeleted
      model
      price
      product {
        id
        imageUrl
        name
        description
      }
      size
    }
  }
`;

/**
 * __useGetSystemConfigVariantsQuery__
 *
 * To run a query within a React component, call `useGetSystemConfigVariantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemConfigVariantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemConfigVariantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSystemConfigVariantsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSystemConfigVariantsQuery,
    GetSystemConfigVariantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSystemConfigVariantsQuery,
    GetSystemConfigVariantsQueryVariables
  >(GetSystemConfigVariantsDocument, options);
}
export function useGetSystemConfigVariantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSystemConfigVariantsQuery,
    GetSystemConfigVariantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSystemConfigVariantsQuery,
    GetSystemConfigVariantsQueryVariables
  >(GetSystemConfigVariantsDocument, options);
}
export function useGetSystemConfigVariantsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSystemConfigVariantsQuery,
        GetSystemConfigVariantsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSystemConfigVariantsQuery,
    GetSystemConfigVariantsQueryVariables
  >(GetSystemConfigVariantsDocument, options);
}
export type GetSystemConfigVariantsQueryHookResult = ReturnType<
  typeof useGetSystemConfigVariantsQuery
>;
export type GetSystemConfigVariantsLazyQueryHookResult = ReturnType<
  typeof useGetSystemConfigVariantsLazyQuery
>;
export type GetSystemConfigVariantsSuspenseQueryHookResult = ReturnType<
  typeof useGetSystemConfigVariantsSuspenseQuery
>;
export type GetSystemConfigVariantsQueryResult = Apollo.QueryResult<
  GetSystemConfigVariantsQuery,
  GetSystemConfigVariantsQueryVariables
>;
export const GetSystemConfigVariantsByProductDocument = gql`
  query GetSystemConfigVariantsByProduct($productId: String!) {
    systemConfigVariantsByProduct(productId: $productId) {
      color
      id
      isActive
      isDeleted
      model
      price
      product {
        id
        imageUrl
        name
        description
      }
      size
    }
  }
`;

/**
 * __useGetSystemConfigVariantsByProductQuery__
 *
 * To run a query within a React component, call `useGetSystemConfigVariantsByProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemConfigVariantsByProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemConfigVariantsByProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetSystemConfigVariantsByProductQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSystemConfigVariantsByProductQuery,
    GetSystemConfigVariantsByProductQueryVariables
  > &
    (
      | {
          variables: GetSystemConfigVariantsByProductQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSystemConfigVariantsByProductQuery,
    GetSystemConfigVariantsByProductQueryVariables
  >(GetSystemConfigVariantsByProductDocument, options);
}
export function useGetSystemConfigVariantsByProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSystemConfigVariantsByProductQuery,
    GetSystemConfigVariantsByProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSystemConfigVariantsByProductQuery,
    GetSystemConfigVariantsByProductQueryVariables
  >(GetSystemConfigVariantsByProductDocument, options);
}
export function useGetSystemConfigVariantsByProductSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSystemConfigVariantsByProductQuery,
        GetSystemConfigVariantsByProductQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSystemConfigVariantsByProductQuery,
    GetSystemConfigVariantsByProductQueryVariables
  >(GetSystemConfigVariantsByProductDocument, options);
}
export type GetSystemConfigVariantsByProductQueryHookResult = ReturnType<
  typeof useGetSystemConfigVariantsByProductQuery
>;
export type GetSystemConfigVariantsByProductLazyQueryHookResult = ReturnType<
  typeof useGetSystemConfigVariantsByProductLazyQuery
>;
export type GetSystemConfigVariantsByProductSuspenseQueryHookResult =
  ReturnType<typeof useGetSystemConfigVariantsByProductSuspenseQuery>;
export type GetSystemConfigVariantsByProductQueryResult = Apollo.QueryResult<
  GetSystemConfigVariantsByProductQuery,
  GetSystemConfigVariantsByProductQueryVariables
>;
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
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersSuspenseQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
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
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> &
    ({ variables: GetUserQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSuspenseQuery
>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
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
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

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
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $updateUserInput: UpdateUserDto!
    $updateUserId: String!
  ) {
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
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

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
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
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
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

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
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options,
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const GetAvailableStaffForFactoryDocument = gql`
  query GetAvailableStaffForFactory {
    availableStaffForFactory {
      email
      id
      gender
      imageUrl
      name
      role
    }
  }
`;

/**
 * __useGetAvailableStaffForFactoryQuery__
 *
 * To run a query within a React component, call `useGetAvailableStaffForFactoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableStaffForFactoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableStaffForFactoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAvailableStaffForFactoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAvailableStaffForFactoryQuery,
    GetAvailableStaffForFactoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAvailableStaffForFactoryQuery,
    GetAvailableStaffForFactoryQueryVariables
  >(GetAvailableStaffForFactoryDocument, options);
}
export function useGetAvailableStaffForFactoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAvailableStaffForFactoryQuery,
    GetAvailableStaffForFactoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAvailableStaffForFactoryQuery,
    GetAvailableStaffForFactoryQueryVariables
  >(GetAvailableStaffForFactoryDocument, options);
}
export function useGetAvailableStaffForFactorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAvailableStaffForFactoryQuery,
        GetAvailableStaffForFactoryQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAvailableStaffForFactoryQuery,
    GetAvailableStaffForFactoryQueryVariables
  >(GetAvailableStaffForFactoryDocument, options);
}
export type GetAvailableStaffForFactoryQueryHookResult = ReturnType<
  typeof useGetAvailableStaffForFactoryQuery
>;
export type GetAvailableStaffForFactoryLazyQueryHookResult = ReturnType<
  typeof useGetAvailableStaffForFactoryLazyQuery
>;
export type GetAvailableStaffForFactorySuspenseQueryHookResult = ReturnType<
  typeof useGetAvailableStaffForFactorySuspenseQuery
>;
export type GetAvailableStaffForFactoryQueryResult = Apollo.QueryResult<
  GetAvailableStaffForFactoryQuery,
  GetAvailableStaffForFactoryQueryVariables
>;
