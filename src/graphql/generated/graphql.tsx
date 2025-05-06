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

export type AddOrderProgressReportInput = {
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  note: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
};

export type AddressEntity = {
  __typename?: 'AddressEntity';
  districtID: Scalars['Float']['output'];
  factory?: Maybe<FactoryEntity>;
  factoryId?: Maybe<Scalars['String']['output']>;
  formattedAddress?: Maybe<Scalars['String']['output']>;
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
  activeUsers: Scalars['Int']['output'];
  activeUsersChange: Scalars['Int']['output'];
  activeUsersChangeType: ChangeType;
  factoryPerformance: Array<FactoryPerformance>;
  pendingOrders: Scalars['Int']['output'];
  pendingOrdersChange: Scalars['Int']['output'];
  pendingOrdersChangeType: ChangeType;
  recentOrders: Array<OrderWithFactory>;
  totalCustomers: Scalars['Int']['output'];
  totalFactories: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalProducts: Scalars['Int']['output'];
  totalProductsChange: Scalars['Int']['output'];
  totalProductsChangeType: ChangeType;
  totalRevenue: Scalars['Int']['output'];
  totalSales: Scalars['Int']['output'];
  totalSalesChange: Scalars['Int']['output'];
  totalSalesChangeType: ChangeType;
};

/** Authentication response */
export type AuthResponseDto = {
  __typename?: 'AuthResponseDto';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserEntity;
};

export type CalculateShippingCostAndFactoryDto = {
  addressId: Scalars['String']['input'];
  cartIds: Array<Scalars['String']['input']>;
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
  systemConfigVariant?: Maybe<SystemConfigVariantEntity>;
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
  Positive = 'POSITIVE'
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
  formattedAddress?: InputMaybe<Scalars['String']['input']>;
  provinceID: Scalars['Float']['input'];
  street: Scalars['String']['input'];
  wardCode: Scalars['String']['input'];
};

export type CreateCartItemDto = {
  designId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  systemConfigVariantId?: InputMaybe<Scalars['String']['input']>;
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
  addressId: Scalars['String']['input'];
  orderDetails: Array<CreateOrderDetailInput>;
  voucherId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOtpInput = {
  email: Scalars['String']['input'];
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

export type CreateSystemConfigDiscountDto = {
  discountPercent: Scalars['Float']['input'];
  minQuantity: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};

export type CreateSystemConfigVariantInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  productId: Scalars['String']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
};

/** Create User Bank Input */
export type CreateUserBankInput = {
  accountName: Scalars['String']['input'];
  accountNumber: Scalars['String']['input'];
  bankId: Scalars['String']['input'];
  isDefault?: Scalars['Boolean']['input'];
};

/** Create user input */
export type CreateUserDto = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVoucherInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: Scalars['Boolean']['input'];
  limitedUsage?: InputMaybe<Scalars['Int']['input']>;
  maxDiscountValue?: InputMaybe<Scalars['Int']['input']>;
  minOrderValue?: InputMaybe<Scalars['Int']['input']>;
  type: VoucherType;
  userId?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['Int']['input'];
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
  change: Scalars['Int']['output'];
  changeType: ChangeType;
  total: Scalars['Int']['output'];
};

export type EnhancedManagerDashboardResponse = {
  __typename?: 'EnhancedManagerDashboardResponse';
  factoryPerformance: Array<EnhancedFactoryPerformance>;
  orderStatus: Array<OrderStatusDetail>;
  stats: DashboardStats;
};

export type EnhancedOrderStats = {
  __typename?: 'EnhancedOrderStats';
  active: Scalars['Int']['output'];
  change: Scalars['Int']['output'];
  changeType: ChangeType;
};

export type EnhancedRevenueStats = {
  __typename?: 'EnhancedRevenueStats';
  change: Scalars['Int']['output'];
  changeType: ChangeType;
  monthly: Scalars['Int']['output'];
};

export type EnhancedStaffStats = {
  __typename?: 'EnhancedStaffStats';
  change: Scalars['Int']['output'];
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
  revenueData: Array<MonthlyRevenue>;
  stats: FactoryStats;
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
};

export type FactoryDetailDashboardResponse = {
  __typename?: 'FactoryDetailDashboardResponse';
  inProductionOrders: Scalars['Int']['output'];
  lastMonthInProductionOrders: Scalars['Int']['output'];
  lastMonthPendingOrders: Scalars['Int']['output'];
  lastMonthTotalOrders: Scalars['Int']['output'];
  lastMonthTotalRevenue: Scalars['Int']['output'];
  pendingOrders: Scalars['Int']['output'];
  productionProgress: Array<FactoryOrderWithProgress>;
  qualityIssues: Array<QualityIssueWithFactory>;
  recentOrders: Array<FactoryOrderWithCustomer>;
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
};

export type FactoryDetails = {
  __typename?: 'FactoryDetails';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  leadTime: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productionCapacity: Scalars['Int']['output'];
  status: Scalars['String']['output'];
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
  legitPoint?: Maybe<Scalars['Int']['output']>;
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

export type FactoryScoreResponse = {
  __typename?: 'FactoryScoreResponse';
  factoryId: Scalars['String']['output'];
  factoryName: Scalars['String']['output'];
  scores: FactoryScores;
  totalScore: Scalars['Float']['output'];
  weights: FactoryScoreWeights;
};

export type FactoryScoreWeights = {
  __typename?: 'FactoryScoreWeights';
  capacity: Scalars['Float']['output'];
  leadTime: Scalars['Float']['output'];
  legitPoint: Scalars['Float']['output'];
  productionCapacity: Scalars['Float']['output'];
  specialization: Scalars['Float']['output'];
};

export type FactoryScores = {
  __typename?: 'FactoryScores';
  capacityScore: Scalars['Float']['output'];
  leadTimeScore: Scalars['Float']['output'];
  legitPointScore: Scalars['Float']['output'];
  productionCapacityScore: Scalars['Float']['output'];
  specializationScore: Scalars['Float']['output'];
};

export type FactoryStats = {
  __typename?: 'FactoryStats';
  legitPoints: StatValue;
  monthlyRevenue: StatValue;
  qualityScore: StatValue;
  totalOrders: StatValue;
};

/** The status of the factory */
export enum FactoryStatus {
  Approved = 'APPROVED',
  PendingApproval = 'PENDING_APPROVAL',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED'
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

export type ManagerOrderDashboardEntity = {
  __typename?: 'ManagerOrderDashboardEntity';
  completedOrders: Scalars['Int']['output'];
  inProductionOrders: Scalars['Int']['output'];
  lastMonthCompletedOrders: Scalars['Int']['output'];
  lastMonthInProductionOrders: Scalars['Int']['output'];
  lastMonthOrders: Scalars['Int']['output'];
  lastMonthPendingOrders: Scalars['Int']['output'];
  pendingOrders: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
};

export type MonthlyRevenue = {
  __typename?: 'MonthlyRevenue';
  month: Scalars['String']['output'];
  revenue: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOrderForFactory: OrderEntity;
  addOrderProgressReport: OrderProgressReportEntity;
  assignFactoryToOrder: OrderEntity;
  assignStaffToFactory: FactoryEntity;
  calculateShippingCostAndFactoryForCart: ShippingCostAndFactoryResponse;
  calculateShippingFee: ShippingFee;
  changeFactoryStaff: FactoryEntity;
  changeFactoryStatus: FactoryEntity;
  changeOrderToShipping: OrderEntity;
  clearCart: Scalars['Boolean']['output'];
  createAddress: AddressEntity;
  createCartItem: CartItemEntity;
  createCategory: CategoryEntity;
  createFactoryProduct: FactoryProductEntity;
  createNotification: NotificationEntity;
  createNotificationForManyUsers: Array<NotificationEntity>;
  createNotificationForUsersByRoles: Array<NotificationEntity>;
  createOTP: Otp;
  createOrder: OrderEntity;
  createPayment: Scalars['String']['output'];
  createPaymentTransaction: PaymentTransactionEntity;
  createProduct: ProductEntity;
  createProductDesign: ProductDesignEntity;
  createProductPositionType: ProductPositionTypeEntity;
  createRefundForOrder: OrderEntity;
  createShippingOrder: ShippingOrder;
  createSystemConfigBank: SystemConfigBankEntity;
  createSystemConfigDiscount: SystemConfigDiscountEntity;
  createSystemConfigVariant: SystemConfigVariantEntity;
  createUser: UserEntity;
  createUserBank: UserBankEntity;
  createVoucher: VoucherEntity;
  deleteAddress: AddressEntity;
  deleteCartItem: CartItemEntity;
  deleteCategory: CategoryEntity;
  deleteFactoryProduct: FactoryProductEntity;
  deleteFile: Scalars['Boolean']['output'];
  deleteProduct: ProductEntity;
  deleteUser: UserEntity;
  deleteUserBank: UserBankEntity;
  doneCheckQuality: CheckQualityEntity;
  doneProductionOrderDetails: OrderDetailEntity;
  doneReworkForOrderDetails: OrderDetailEntity;
  duplicateProductDesign: ProductDesignEntity;
  feedbackOrder: OrderEntity;
  generateAndUploadImage: FileUploadResponse;
  login: AuthResponseDto;
  logout: Scalars['String']['output'];
  markNotificationAsRead: NotificationEntity;
  processWithdrawal: Scalars['String']['output'];
  reassignNewStaffForOrder: OrderEntity;
  refreshToken: AuthResponseDto;
  register: AuthResponseDto;
  rejectOrder: OrderEntity;
  removePaymentTransaction: PaymentTransactionEntity;
  removeProductDesign: ProductDesignEntity;
  removeProductPositionType: ProductPositionTypeEntity;
  removeSystemConfigBank: SystemConfigBankEntity;
  removeSystemConfigDiscount: SystemConfigDiscountEntity;
  removeSystemConfigVariant: SystemConfigVariantEntity;
  resendOTP: Scalars['Boolean']['output'];
  restoreCategory: CategoryEntity;
  restoreProduct: ProductEntity;
  sendEmail: Scalars['Boolean']['output'];
  shippedOrder: OrderEntity;
  speedUpOrder: OrderEntity;
  startRework: OrderEntity;
  startReworkByManager: OrderEntity;
  toggleActiveCategory: CategoryEntity;
  toggleActiveProduct: ProductEntity;
  updateAddress: AddressEntity;
  updateCartItem: CartItemEntity;
  updateCategory: CategoryEntity;
  updateDesignPosition: DesignPositionEntity;
  updateFactoryInfo: FactoryEntity;
  updateFactoryProduct: FactoryProductEntity;
  updatePaymentTransaction: PaymentTransactionEntity;
  updatePhoneNumber: UserEntity;
  updateProduct: ProductEntity;
  updateProductDesign: ProductDesignEntity;
  updateProductPositionType: ProductPositionTypeEntity;
  updateProfile: UserEntity;
  updateSystemConfigBank: SystemConfigBankEntity;
  updateSystemConfigDiscount: SystemConfigDiscountEntity;
  updateSystemConfigOrder: SystemConfigOrderEntity;
  updateSystemConfigVariant: SystemConfigVariantEntity;
  updateUser: UserEntity;
  updateUserBank: UserBankEntity;
  uploadFile: FileUploadResponse;
  verifyOTP: Scalars['Boolean']['output'];
};


export type MutationAcceptOrderForFactoryArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationAddOrderProgressReportArgs = {
  input: AddOrderProgressReportInput;
};


export type MutationAssignFactoryToOrderArgs = {
  factoryId: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
};


export type MutationAssignStaffToFactoryArgs = {
  factoryId: Scalars['String']['input'];
  staffId: Scalars['String']['input'];
};


export type MutationCalculateShippingCostAndFactoryForCartArgs = {
  input: CalculateShippingCostAndFactoryDto;
};


export type MutationCalculateShippingFeeArgs = {
  input: CalculateShippingFeeDto;
};


export type MutationChangeFactoryStaffArgs = {
  factoryId: Scalars['String']['input'];
  newStaffId: Scalars['String']['input'];
};


export type MutationChangeFactoryStatusArgs = {
  data: UpdateFactoryStatusDto;
};


export type MutationChangeOrderToShippingArgs = {
  orderId: Scalars['String']['input'];
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


export type MutationCreateOtpArgs = {
  createOtpInput: CreateOtpInput;
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


export type MutationCreateRefundForOrderArgs = {
  orderId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationCreateShippingOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationCreateSystemConfigBankArgs = {
  input: CreateSystemConfigBankDto;
};


export type MutationCreateSystemConfigDiscountArgs = {
  createDiscountInput: CreateSystemConfigDiscountDto;
};


export type MutationCreateSystemConfigVariantArgs = {
  createSystemConfigVariantInput: CreateSystemConfigVariantInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};


export type MutationCreateUserBankArgs = {
  createUserBankInput: CreateUserBankInput;
};


export type MutationCreateVoucherArgs = {
  input: CreateVoucherInput;
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


export type MutationDeleteUserBankArgs = {
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


export type MutationGenerateAndUploadImageArgs = {
  prompt: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationProcessWithdrawalArgs = {
  imageUrls: Array<Scalars['String']['input']>;
  paymentId: Scalars['String']['input'];
  userBankId: Scalars['String']['input'];
};


export type MutationReassignNewStaffForOrderArgs = {
  newStaffId: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
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


export type MutationRemoveSystemConfigDiscountArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSystemConfigVariantArgs = {
  id: Scalars['String']['input'];
};


export type MutationResendOtpArgs = {
  email: Scalars['String']['input'];
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


export type MutationSpeedUpOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationStartReworkArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationStartReworkByManagerArgs = {
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


export type MutationUpdatePhoneNumberArgs = {
  updatePhoneNumberInput: UpdatePhoneNumberDto;
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


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileDto;
};


export type MutationUpdateSystemConfigBankArgs = {
  input: UpdateSystemConfigBankDto;
};


export type MutationUpdateSystemConfigDiscountArgs = {
  id: Scalars['String']['input'];
  updateDiscountInput: UpdateSystemConfigDiscountDto;
};


export type MutationUpdateSystemConfigOrderArgs = {
  updateConfigInput: UpdateSystemConfigOrderDto;
};


export type MutationUpdateSystemConfigVariantArgs = {
  updateSystemConfigVariantInput: UpdateSystemConfigVariantInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserDto;
};


export type MutationUpdateUserBankArgs = {
  id: Scalars['String']['input'];
  updateUserBankInput: UpdateUserBankInput;
};


export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationVerifyOtpArgs = {
  verifyOtpInput: VerifyOtpInput;
};

export type MyStaffDashboardResponse = {
  __typename?: 'MyStaffDashboardResponse';
  currentFactory: FactoryDetails;
  recentOrders: Array<RecentOrderInfo>;
  stats: MyStaffStats;
};

export type MyStaffStatValue = {
  __typename?: 'MyStaffStatValue';
  isPositive: Scalars['Boolean']['output'];
  percentChange: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

export type MyStaffStats = {
  __typename?: 'MyStaffStats';
  activeTasks: MyStaffStatValue;
  completedTasks: MyStaffStatValue;
  deliveredOrders: MyStaffStatValue;
  pendingOrders: MyStaffStatValue;
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
  systemConfigVariant?: Maybe<SystemConfigVariantEntity>;
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
  Shipping = 'SHIPPING',
  WaitingForCheckingQuality = 'WAITING_FOR_CHECKING_QUALITY'
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
  orderCode?: Maybe<Scalars['String']['output']>;
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

export type OrderInfoDto = {
  __typename?: 'OrderInfoDto';
  client_id: Scalars['Float']['output'];
  client_order_code?: Maybe<Scalars['String']['output']>;
  cod_amount: Scalars['Float']['output'];
  cod_collect_date?: Maybe<Scalars['String']['output']>;
  cod_failed_amount: Scalars['Float']['output'];
  cod_failed_collect_date?: Maybe<Scalars['String']['output']>;
  cod_transfer_date?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  converted_weight: Scalars['Float']['output'];
  coupon?: Maybe<Scalars['String']['output']>;
  created_client: Scalars['Float']['output'];
  created_date: Scalars['String']['output'];
  created_employee: Scalars['Float']['output'];
  created_ip: Scalars['String']['output'];
  created_source: Scalars['String']['output'];
  current_warehouse_id: Scalars['Float']['output'];
  custom_service_fee: Scalars['Float']['output'];
  deliver_station_id?: Maybe<Scalars['Float']['output']>;
  deliver_warehouse_id: Scalars['Float']['output'];
  employee_note?: Maybe<Scalars['String']['output']>;
  finish_date?: Maybe<Scalars['String']['output']>;
  from_address: Scalars['String']['output'];
  from_district_id: Scalars['Float']['output'];
  from_name: Scalars['String']['output'];
  from_phone: Scalars['String']['output'];
  from_ward_code: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  insurance_value: Scalars['Float']['output'];
  is_cod_collected: Scalars['Boolean']['output'];
  is_cod_transferred: Scalars['Boolean']['output'];
  leadtime?: Maybe<Scalars['String']['output']>;
  length: Scalars['Float']['output'];
  log?: Maybe<Array<OrderLogDto>>;
  next_warehouse_id: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  order_code: Scalars['String']['output'];
  order_date: Scalars['String']['output'];
  order_value: Scalars['Float']['output'];
  payment_type_id: Scalars['Float']['output'];
  pick_station_id?: Maybe<Scalars['Float']['output']>;
  pick_warehouse_id: Scalars['Float']['output'];
  required_note: Scalars['String']['output'];
  return_address?: Maybe<Scalars['String']['output']>;
  return_district_id?: Maybe<Scalars['Float']['output']>;
  return_name?: Maybe<Scalars['String']['output']>;
  return_phone?: Maybe<Scalars['String']['output']>;
  return_ward_code?: Maybe<Scalars['String']['output']>;
  return_warehouse_id: Scalars['Float']['output'];
  service_id: Scalars['Float']['output'];
  service_type_id: Scalars['Float']['output'];
  shop_id: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  tag?: Maybe<Array<Scalars['String']['output']>>;
  to_address: Scalars['String']['output'];
  to_district_id: Scalars['Float']['output'];
  to_name: Scalars['String']['output'];
  to_phone: Scalars['String']['output'];
  to_ward_code: Scalars['String']['output'];
  updated_client: Scalars['Float']['output'];
  updated_date: Scalars['String']['output'];
  updated_employee: Scalars['Float']['output'];
  updated_ip: Scalars['String']['output'];
  updated_source: Scalars['String']['output'];
  updated_warehouse: Scalars['Float']['output'];
  weight: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type OrderLogDto = {
  __typename?: 'OrderLogDto';
  status: Scalars['String']['output'];
  updated_date: Scalars['String']['output'];
};

export type OrderPriceDetailsResponse = {
  __typename?: 'OrderPriceDetailsResponse';
  basePrice: Scalars['Int']['output'];
  discountPercentage: Scalars['Float']['output'];
  finalPrice: Scalars['Int']['output'];
  priceAfterDiscount: Scalars['Int']['output'];
  priceAfterVoucher: Scalars['Int']['output'];
  shippingPrice: Scalars['Int']['output'];
  voucher?: Maybe<VoucherEntity>;
};

export type OrderProgressReportEntity = {
  __typename?: 'OrderProgressReportEntity';
  id: Scalars['ID']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
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
  NeedManagerHandleRework = 'NEED_MANAGER_HANDLE_REWORK',
  PaymentReceived = 'PAYMENT_RECEIVED',
  Pending = 'PENDING',
  PendingAcceptance = 'PENDING_ACCEPTANCE',
  ReadyForShipping = 'READY_FOR_SHIPPING',
  Refunded = 'REFUNDED',
  Rejected = 'REJECTED',
  ReworkInProgress = 'REWORK_IN_PROGRESS',
  ReworkRequired = 'REWORK_REQUIRED',
  Shipped = 'SHIPPED',
  Shipping = 'SHIPPING',
  WaitingFillInformation = 'WAITING_FILL_INFORMATION',
  WaitingForCheckingQuality = 'WAITING_FOR_CHECKING_QUALITY',
  WaitingForRefund = 'WAITING_FOR_REFUND',
  WaitingPayment = 'WAITING_PAYMENT'
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

export type Otp = {
  __typename?: 'Otp';
  code: Scalars['String']['output'];
  email: Scalars['String']['output'];
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
  Bank = 'BANK',
  Payos = 'PAYOS',
  Vnpay = 'VNPAY'
}

export type PaymentTransactionEntity = {
  __typename?: 'PaymentTransactionEntity';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<UserEntity>;
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  paymentGatewayTransactionId: Scalars['String']['output'];
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  transactionLog: Scalars['String']['output'];
  type: TransactionType;
  userBank?: Maybe<UserBankEntity>;
};

export type ProductDesignEntity = {
  __typename?: 'ProductDesignEntity';
  createdAt: Scalars['DateTime']['output'];
  designPositions?: Maybe<Array<DesignPositionEntity>>;
  id: Scalars['ID']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
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
  allPublicVouchers: Array<VoucherEntity>;
  allSystemVouchers: Array<VoucherEntity>;
  allVouchersOfUser: Array<VoucherEntity>;
  availableServices: Array<ShippingService>;
  availableStaffForFactory: Array<UserEntity>;
  availableVouchers: Array<VoucherEntity>;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  designPosition: DesignPositionEntity;
  distinctVariantAttributes: VariantAttributes;
  district: District;
  districts: Array<District>;
  factoryOrders: Array<OrderEntity>;
  factoryProduct: FactoryProductEntity;
  factoryProducts: Array<FactoryProductEntity>;
  factoryScoresForOrder: Array<FactoryScoreResponse>;
  findActiveTasksByStaffId: Array<TaskEntity>;
  findTasksByStaffId: Array<TaskEntity>;
  findTasksHistoryByStaffId: Array<TaskEntity>;
  formatAddress: FormattedAddressModel;
  getAdminDashboard: AdminDashboardResponse;
  getAllDiscountByProductId: Array<SystemConfigDiscountEntity>;
  getAllFactories: Array<FactoryEntity>;
  getApplicableDiscount: Scalars['Float']['output'];
  getCartItem: CartItemEntity;
  getCartItemCount: Scalars['Float']['output'];
  getEnhancedManagerDashboard: EnhancedManagerDashboardResponse;
  getExpiredTime: Scalars['DateTime']['output'];
  getFactoryById: FactoryEntity;
  getFactoryDetailDashboard: FactoryDetailDashboardResponse;
  getGiaoHangNhanhOrderInfo: OrderInfoDto;
  getManagerDashboard: ManagerDashboardResponse;
  getManagerOrderDashboard: ManagerOrderDashboardEntity;
  getMe: UserEntity;
  getMyFactory: FactoryEntity;
  getMyFactoryDashboard: FactoryDashboardResponse;
  getMyStaffDashboard: MyStaffDashboardResponse;
  getStaffDashboard: StaffDashboardResponse;
  getTemplateProductDesigns: Array<ProductDesignEntity>;
  myNotifications: Array<NotificationEntity>;
  myOrders: Array<OrderEntity>;
  notification: NotificationEntity;
  notifications: Array<NotificationEntity>;
  notificationsByUserId: Array<NotificationEntity>;
  order: OrderEntity;
  orderPriceDetails: OrderPriceDetailsResponse;
  orders: Array<OrderEntity>;
  ordersByFactoryId: Array<OrderEntity>;
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
  publicProductDesigns: Array<ProductDesignEntity>;
  staffOrders: Array<OrderEntity>;
  staffs: Array<UserEntity>;
  systemConfigBank: SystemConfigBankEntity;
  systemConfigBanks: Array<SystemConfigBankEntity>;
  systemConfigDiscount: SystemConfigDiscountEntity;
  systemConfigDiscounts: Array<SystemConfigDiscountEntity>;
  systemConfigOrder: SystemConfigOrderEntity;
  systemConfigVariant: SystemConfigVariantEntity;
  systemConfigVariants: Array<SystemConfigVariantEntity>;
  systemConfigVariantsByProduct: Array<SystemConfigVariantEntity>;
  user: UserEntity;
  userBank: UserBankEntity;
  userBanks: Array<UserBankEntity>;
  userBanksByUserId: Array<UserBankEntity>;
  userCartItems: Array<CartItemEntity>;
  users: Array<UserEntity>;
  voucherById: VoucherEntity;
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


export type QueryFactoryScoresForOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryFindActiveTasksByStaffIdArgs = {
  staffId: Scalars['String']['input'];
};


export type QueryFindTasksByStaffIdArgs = {
  staffId: Scalars['String']['input'];
};


export type QueryFindTasksHistoryByStaffIdArgs = {
  staffId: Scalars['String']['input'];
};


export type QueryFormatAddressArgs = {
  formatAddressInput: FormatAddressInput;
};


export type QueryGetAllDiscountByProductIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetApplicableDiscountArgs = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};


export type QueryGetCartItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetExpiredTimeArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetFactoryByIdArgs = {
  factoryId: Scalars['String']['input'];
};


export type QueryGetFactoryDetailDashboardArgs = {
  factoryId: Scalars['String']['input'];
};


export type QueryGetGiaoHangNhanhOrderInfoArgs = {
  orderCode: Scalars['String']['input'];
};


export type QueryGetStaffDashboardArgs = {
  userId: Scalars['String']['input'];
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


export type QueryOrderPriceDetailsArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryOrdersByFactoryIdArgs = {
  factoryId: Scalars['String']['input'];
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


export type QuerySystemConfigDiscountArgs = {
  id: Scalars['String']['input'];
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


export type QueryUserBankArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserBanksByUserIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryVoucherByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryWardArgs = {
  wardCode: Scalars['String']['input'];
};


export type QueryWardsArgs = {
  districtId: Scalars['Int']['input'];
};

export type RecentOrderInfo = {
  __typename?: 'RecentOrderInfo';
  customer: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  status: Scalars['String']['output'];
  total: Scalars['Int']['output'];
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
  Staff = 'STAFF'
}

export type ShippingCostAndFactoryResponse = {
  __typename?: 'ShippingCostAndFactoryResponse';
  selectedFactory?: Maybe<FactoryEntity>;
  shippingFee: ShippingFee;
};

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

export type StaffDashboardResponse = {
  __typename?: 'StaffDashboardResponse';
  activeTasks: Array<TaskEntity>;
  completedTasks: Scalars['Int']['output'];
  lastMonthActiveTasks: Scalars['Int']['output'];
  lastMonthCompletedTasks: Scalars['Int']['output'];
  taskHistory: Array<TaskEntity>;
  totalActiveTasks: Scalars['Int']['output'];
  totalTaskHistory: Scalars['Int']['output'];
};

export type StatValue = {
  __typename?: 'StatValue';
  isPositive?: Maybe<Scalars['Boolean']['output']>;
  percentChange?: Maybe<Scalars['Int']['output']>;
  value: Scalars['Int']['output'];
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
  productId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SystemConfigOrderEntity = {
  __typename?: 'SystemConfigOrderEntity';
  acceptHoursForFactory: Scalars['Int']['output'];
  capacityScoreWeight: Scalars['Float']['output'];
  checkQualityTimesDays: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  leadTimeScoreWeight: Scalars['Float']['output'];
  legitPointScoreWeight: Scalars['Float']['output'];
  legitPointToSuspend: Scalars['Int']['output'];
  limitFactoryRejectOrders: Scalars['Int']['output'];
  limitReworkTimes: Scalars['Int']['output'];
  maxLegitPoint: Scalars['Int']['output'];
  maxProductionCapacity: Scalars['Int']['output'];
  maxProductionTimeInMinutes: Scalars['Int']['output'];
  productionCapacityScoreWeight: Scalars['Float']['output'];
  reduceLegitPointIfReject: Scalars['Int']['output'];
  shippingDays: Scalars['Int']['output'];
  specializationScoreWeight: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  voucherBaseLimitedUsage: Scalars['Int']['output'];
  voucherBaseMaxDiscountValue: Scalars['Int']['output'];
  voucherBaseTypeForRefund: VoucherType;
  voucherBaseValueForRefund: Scalars['Int']['output'];
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
  Pending = 'PENDING'
}

/** Type of transaction */
export enum TransactionType {
  Payment = 'PAYMENT',
  Refund = 'REFUND'
}

export type UpdateAddressInput = {
  districtID?: InputMaybe<Scalars['Float']['input']>;
  factoryId?: InputMaybe<Scalars['String']['input']>;
  formattedAddress?: InputMaybe<Scalars['String']['input']>;
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
  name?: InputMaybe<Scalars['String']['input']>;
  printingMethods?: InputMaybe<Array<Scalars['String']['input']>>;
  qualityCertifications?: InputMaybe<Scalars['String']['input']>;
  specializations?: InputMaybe<Array<Scalars['String']['input']>>;
  systemConfigVariantIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
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

export type UpdatePhoneNumberDto = {
  phoneNumber: Scalars['String']['input'];
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

export type UpdateProfileDto = {
  dateOfBirth: Scalars['DateTime']['input'];
  gender: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
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

export type UpdateSystemConfigDiscountDto = {
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSystemConfigOrderDto = {
  acceptHoursForFactory?: InputMaybe<Scalars['Int']['input']>;
  capacityScoreWeight?: InputMaybe<Scalars['Float']['input']>;
  checkQualityTimesDays?: InputMaybe<Scalars['Int']['input']>;
  leadTimeScoreWeight?: InputMaybe<Scalars['Float']['input']>;
  legitPointScoreWeight?: InputMaybe<Scalars['Float']['input']>;
  legitPointToSuspend?: InputMaybe<Scalars['Int']['input']>;
  limitFactoryRejectOrders?: InputMaybe<Scalars['Int']['input']>;
  limitReworkTimes?: InputMaybe<Scalars['Int']['input']>;
  maxLegitPoint?: InputMaybe<Scalars['Int']['input']>;
  maxProductionCapacity?: InputMaybe<Scalars['Int']['input']>;
  maxProductionTimeInMinutes?: InputMaybe<Scalars['Int']['input']>;
  productionCapacityScoreWeight?: InputMaybe<Scalars['Float']['input']>;
  reduceLegitPointIfReject?: InputMaybe<Scalars['Int']['input']>;
  shippingDays?: InputMaybe<Scalars['Int']['input']>;
  specializationScoreWeight?: InputMaybe<Scalars['Float']['input']>;
  voucherBaseLimitedUsage?: InputMaybe<Scalars['Int']['input']>;
  voucherBaseMaxDiscountValue?: InputMaybe<Scalars['Int']['input']>;
  voucherBaseTypeForRefund?: InputMaybe<VoucherType>;
  voucherBaseValueForRefund?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateSystemConfigVariantInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserBankInput = {
  accountName?: InputMaybe<Scalars['String']['input']>;
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  bankId?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Update user input */
export type UpdateUserDto = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
};

export type UserBankEntity = {
  __typename?: 'UserBankEntity';
  accountName: Scalars['String']['output'];
  accountNumber: Scalars['String']['output'];
  bank?: Maybe<SystemConfigBankEntity>;
  bankId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<UserEntity>;
  userId: Scalars['String']['output'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  bankAccounts?: Maybe<Array<UserBankEntity>>;
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
  isVerified: Scalars['Boolean']['output'];
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

export type VerifyOtpInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type VoucherEntity = {
  __typename?: 'VoucherEntity';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  limitedUsage?: Maybe<Scalars['Int']['output']>;
  maxDiscountValue?: Maybe<Scalars['Int']['output']>;
  minOrderValue?: Maybe<Scalars['Int']['output']>;
  type: VoucherType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  usages?: Maybe<Array<VoucherUsageEntity>>;
  user?: Maybe<UserEntity>;
  userId?: Maybe<Scalars['String']['output']>;
  value: Scalars['Int']['output'];
};

export enum VoucherType {
  FixedValue = 'FIXED_VALUE',
  Percentage = 'PERCENTAGE'
}

export type VoucherUsageEntity = {
  __typename?: 'VoucherUsageEntity';
  id: Scalars['ID']['output'];
  orderId: Scalars['String']['output'];
  usedAt: Scalars['DateTime']['output'];
  user: UserEntity;
  userId: Scalars['String']['output'];
  voucher: VoucherEntity;
  voucherId: Scalars['String']['output'];
};

export type Ward = {
  __typename?: 'Ward';
  districtId: Scalars['Int']['output'];
  wardCode: Scalars['String']['output'];
  wardName: Scalars['String']['output'];
};

export type AddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressesQuery = { __typename?: 'Query', addresses: Array<{ __typename?: 'AddressEntity', id: string, districtID: number, provinceID: number, street: string, wardCode: string, formattedAddress?: string | null }> };

export type CreateAddressMutationVariables = Exact<{
  createAddressInput: CreateAddressInput;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'AddressEntity', id: string, districtID: number, provinceID: number, street: string, wardCode: string, formattedAddress?: string | null } };

export type DeleteAddressMutationVariables = Exact<{
  deleteAddressId: Scalars['String']['input'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', deleteAddress: { __typename?: 'AddressEntity', id: string } };

export type GetAddressDetailsQueryVariables = Exact<{
  provinceId: Scalars['Int']['input'];
  districtId: Scalars['Int']['input'];
  wardCode: Scalars['String']['input'];
}>;


export type GetAddressDetailsQuery = { __typename?: 'Query', province: { __typename?: 'Province', provinceId: number, provinceName: string }, district: { __typename?: 'District', districtId: number, districtName: string, provinceId: number }, ward: { __typename?: 'Ward', districtId: number, wardCode: string, wardName: string } };

export type FormatAddressQueryVariables = Exact<{
  formatAddressInput: FormatAddressInput;
}>;


export type FormatAddressQuery = { __typename?: 'Query', formatAddress: { __typename?: 'FormattedAddressModel', text: string } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponseDto', accessToken: string, refreshToken: string, user: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean, ownedFactory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponseDto', accessToken: string, refreshToken: string, user: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean, ownedFactory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshTokenInput: RefreshTokenDto;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponseDto', accessToken: string, refreshToken: string, user: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean, ownedFactory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'UserEntity', createdAt: any, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, isDeleted: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean, ownedFactory?: { __typename?: 'FactoryEntity', name: string, factoryStatus?: FactoryStatus | null } | null } };

export type GetUserCartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCartItemsQuery = { __typename?: 'Query', userCartItems: Array<{ __typename?: 'CartItemEntity', id: string, quantity: number, design?: { __typename?: 'ProductDesignEntity', id: string, thumbnailUrl?: string | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null } | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null, isActive: boolean, isDeleted: boolean, product: { __typename?: 'ProductEntity', id: string, name: string, imageUrl?: string | null, discounts?: Array<{ __typename?: 'SystemConfigDiscountEntity', minQuantity: number, name: string, discountPercent: number }> | null } } | null }> };

export type GetCartItemCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartItemCountQuery = { __typename?: 'Query', getCartItemCount: number };

export type CreateCartItemMutationVariables = Exact<{
  createCartItemInput: CreateCartItemDto;
}>;


export type CreateCartItemMutation = { __typename?: 'Mutation', createCartItem: { __typename?: 'CartItemEntity', userId: string, id: string, quantity: number } };

export type UpdateCartItemMutationVariables = Exact<{
  updateCartItemId: Scalars['String']['input'];
  updateCartItemInput: UpdateCartItemDto;
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem: { __typename?: 'CartItemEntity', userId: string, id: string, quantity: number } };

export type DeleteCartItemMutationVariables = Exact<{
  deleteCartItemId: Scalars['String']['input'];
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem: { __typename?: 'CartItemEntity', id: string } };

export type CalculateShippingFeeMutationVariables = Exact<{
  input: CalculateShippingFeeDto;
}>;


export type CalculateShippingFeeMutation = { __typename?: 'Mutation', calculateShippingFee: { __typename?: 'ShippingFee', total: number } };

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

export type GetEnhancedManagerDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnhancedManagerDashboardQuery = { __typename?: 'Query', getEnhancedManagerDashboard: { __typename?: 'EnhancedManagerDashboardResponse', stats: { __typename?: 'DashboardStats', factories: { __typename?: 'EnhancedFactoryStats', total: number, change: number, changeType: ChangeType }, orders: { __typename?: 'EnhancedOrderStats', active: number, change: number, changeType: ChangeType }, staff: { __typename?: 'EnhancedStaffStats', total: number, change: number, changeType: ChangeType }, revenue: { __typename?: 'EnhancedRevenueStats', monthly: number, change: number, changeType: ChangeType } }, factoryPerformance: Array<{ __typename?: 'EnhancedFactoryPerformance', factoryId: string, factoryName: string, orderCount: number, totalRevenue: number }>, orderStatus: Array<{ __typename?: 'OrderStatusDetail', status: string, count: number }> } };

export type GetManagerOrderDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetManagerOrderDashboardQuery = { __typename?: 'Query', getManagerOrderDashboard: { __typename?: 'ManagerOrderDashboardEntity', completedOrders: number, inProductionOrders: number, lastMonthCompletedOrders: number, lastMonthInProductionOrders: number, lastMonthOrders: number, lastMonthPendingOrders: number, pendingOrders: number, totalOrders: number } };

export type GetFactoryDetailDashboardQueryVariables = Exact<{
  factoryId: Scalars['String']['input'];
}>;


export type GetFactoryDetailDashboardQuery = { __typename?: 'Query', getFactoryDetailDashboard: { __typename?: 'FactoryDetailDashboardResponse', inProductionOrders: number, lastMonthInProductionOrders: number, lastMonthPendingOrders: number, lastMonthTotalOrders: number, lastMonthTotalRevenue: number, pendingOrders: number, totalOrders: number, totalRevenue: number, productionProgress: Array<{ __typename?: 'FactoryOrderWithProgress', id: string, status: string, createdAt: any, totalProductionCost: number }>, qualityIssues: Array<{ __typename?: 'QualityIssueWithFactory', id: string, reportedAt: any, issueType: string, status: string, description: string, factoryOrder: { __typename?: 'FactoryOrderInfo', id: string, status: string } }>, recentOrders: Array<{ __typename?: 'FactoryOrderWithCustomer', id: string, status: string, totalProductionCost: number, createdAt: any, customerOrder: { __typename?: 'CustomerOrderInfo', id: string, status: string, totalPrice: number } }> } };

export type GetStaffDashboardQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetStaffDashboardQuery = { __typename?: 'Query', getStaffDashboard: { __typename?: 'StaffDashboardResponse', completedTasks: number, lastMonthActiveTasks: number, lastMonthCompletedTasks: number, totalActiveTasks: number, totalTaskHistory: number, activeTasks: Array<{ __typename?: 'TaskEntity', id: string, note?: string | null, startDate: any, orderId?: string | null, status: string, taskType: string, taskname: string, userId?: string | null, completedDate?: any | null, description: string, assignedDate: any }>, taskHistory: Array<{ __typename?: 'TaskEntity', id: string, note?: string | null, startDate: any, orderId?: string | null, status: string, taskType: string, taskname: string, userId?: string | null, completedDate?: any | null, description: string, assignedDate: any }> }, user: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, email?: string | null, deletedAt?: any | null, createdAt: any, updatedAt?: any | null, gender: boolean, dateOfBirth?: any | null, staffedFactory?: { __typename?: 'FactoryEntity', name: string, factoryOwnerId: string, address?: { __typename?: 'AddressEntity', districtID: number, factoryId?: string | null, provinceID: number, street: string, wardCode: string } | null } | null } };

export type GetAdminDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminDashboardQuery = { __typename?: 'Query', getAdminDashboard: { __typename?: 'AdminDashboardResponse', activeFactories: number, activeUsers: number, activeUsersChange: number, activeUsersChangeType: ChangeType, pendingOrders: number, pendingOrdersChange: number, pendingOrdersChangeType: ChangeType, totalCustomers: number, totalFactories: number, totalOrders: number, totalProducts: number, totalProductsChange: number, totalProductsChangeType: ChangeType, totalRevenue: number, totalSales: number, totalSalesChange: number, totalSalesChangeType: ChangeType, factoryPerformance: Array<{ __typename?: 'FactoryPerformance', factoryId: string, orderCount: number, totalRevenue: number }>, recentOrders: Array<{ __typename?: 'OrderWithFactory', id: string, orderDate: any, status: string, totalPrice: number, factory?: { __typename?: 'FactoryInfo', id: string, name: string, factoryStatus: string } | null }> } };

export type GetMyFactoryDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFactoryDashboardQuery = { __typename?: 'Query', getMyFactoryDashboard: { __typename?: 'FactoryDashboardResponse', inProductionOrders: number, pendingOrders: number, totalOrders: number, totalRevenue: number, productionProgress: Array<{ __typename?: 'FactoryOrderWithProgress', id: string, status: string, createdAt: any, totalProductionCost: number }>, qualityIssues: Array<{ __typename?: 'QualityIssueWithFactory', id: string, reportedAt: any, status: string, description: string }>, recentOrders: Array<{ __typename?: 'FactoryOrderWithCustomer', id: string, status: string, totalProductionCost: number, createdAt: any }>, revenueData: Array<{ __typename?: 'MonthlyRevenue', month: string, revenue: number }>, stats: { __typename?: 'FactoryStats', legitPoints: { __typename?: 'StatValue', percentChange?: number | null, isPositive?: boolean | null, value: number }, monthlyRevenue: { __typename?: 'StatValue', isPositive?: boolean | null, percentChange?: number | null, value: number }, qualityScore: { __typename?: 'StatValue', isPositive?: boolean | null, percentChange?: number | null, value: number }, totalOrders: { __typename?: 'StatValue', isPositive?: boolean | null, percentChange?: number | null, value: number } } } };

export type GetMyStaffDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyStaffDashboardQuery = { __typename?: 'Query', getMyStaffDashboard: { __typename?: 'MyStaffDashboardResponse', currentFactory: { __typename?: 'FactoryDetails', address: string, id: string, leadTime: number, name: string, productionCapacity: number, status: string }, recentOrders: Array<{ __typename?: 'RecentOrderInfo', customer: string, date: string, id: string, priority: string, status: string, total: number }>, stats: { __typename?: 'MyStaffStats', activeTasks: { __typename?: 'MyStaffStatValue', percentChange: number, isPositive: boolean, value: number }, completedTasks: { __typename?: 'MyStaffStatValue', isPositive: boolean, percentChange: number, value: number }, deliveredOrders: { __typename?: 'MyStaffStatValue', isPositive: boolean, percentChange: number, value: number }, pendingOrders: { __typename?: 'MyStaffStatValue', isPositive: boolean, percentChange: number, value: number } } } };

export type UpdateDesignPositionMutationVariables = Exact<{
  input: UpdateDesignPositionDto;
}>;


export type UpdateDesignPositionMutation = { __typename?: 'Mutation', updateDesignPosition: { __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', positionName: string, basePrice: number } | null } };

export type GetMyFactoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFactoryQuery = { __typename?: 'Query', getMyFactory: { __typename?: 'FactoryEntity', businessLicenseUrl?: string | null, contactPersonName?: string | null, contactPersonPhone?: string | null, contractUrl?: string | null, description?: string | null, establishedDate?: any | null, factoryStatus?: FactoryStatus | null, isSubmitted?: boolean | null, leadTime?: number | null, maxPrintingCapacity?: number | null, minimumOrderQuantity?: number | null, name: string, operationalHours?: string | null, printingMethods: Array<string>, qualityCertifications?: string | null, specializations: Array<string>, taxIdentificationNumber?: string | null, totalEmployees?: number | null, website?: string | null, contactPersonRole?: string | null, contractAccepted?: boolean | null, reviewedBy?: string | null, reviewedAt?: any | null, contractAcceptedAt?: any | null, factoryOwnerId: string, formattedAddress?: string | null, address?: { __typename?: 'AddressEntity', id: string, districtID: number, provinceID: number, street: string, wardCode: string, formattedAddress?: string | null } | null, owner?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null } | null, products?: Array<{ __typename?: 'FactoryProductEntity', productionCapacity: number, systemConfigVariantId: string, factoryId: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null } | null }> | null, staff?: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, email?: string | null, name?: string | null } | null } };

export type GetFactoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFactoriesQuery = { __typename?: 'Query', getAllFactories: Array<{ __typename?: 'FactoryEntity', businessLicenseUrl?: string | null, contactPersonName?: string | null, contactPersonPhone?: string | null, contractUrl?: string | null, description?: string | null, establishedDate?: any | null, factoryStatus?: FactoryStatus | null, isSubmitted?: boolean | null, leadTime?: number | null, maxPrintingCapacity?: number | null, minimumOrderQuantity?: number | null, name: string, operationalHours?: string | null, printingMethods: Array<string>, qualityCertifications?: string | null, specializations: Array<string>, taxIdentificationNumber?: string | null, totalEmployees?: number | null, website?: string | null, contactPersonRole?: string | null, contractAccepted?: boolean | null, reviewedBy?: string | null, reviewedAt?: any | null, contractAcceptedAt?: any | null, factoryOwnerId: string, formattedAddress?: string | null, address?: { __typename?: 'AddressEntity', id: string, districtID: number, provinceID: number, street: string, wardCode: string } | null, owner?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null } | null, products?: Array<{ __typename?: 'FactoryProductEntity', productionCapacity: number, systemConfigVariantId: string, factoryId: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null } | null }> | null, staff?: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, email?: string | null, name?: string | null } | null }> };

export type GetFactoryByIdQueryVariables = Exact<{
  factoryId: Scalars['String']['input'];
}>;


export type GetFactoryByIdQuery = { __typename?: 'Query', getFactoryById: { __typename?: 'FactoryEntity', businessLicenseUrl?: string | null, contactPersonName?: string | null, contactPersonPhone?: string | null, contractUrl?: string | null, description?: string | null, establishedDate?: any | null, factoryStatus?: FactoryStatus | null, isSubmitted?: boolean | null, leadTime?: number | null, maxPrintingCapacity?: number | null, minimumOrderQuantity?: number | null, name: string, operationalHours?: string | null, printingMethods: Array<string>, qualityCertifications?: string | null, specializations: Array<string>, taxIdentificationNumber?: string | null, totalEmployees?: number | null, website?: string | null, contactPersonRole?: string | null, contractAccepted?: boolean | null, reviewedBy?: string | null, reviewedAt?: any | null, contractAcceptedAt?: any | null, factoryOwnerId: string, formattedAddress?: string | null, address?: { __typename?: 'AddressEntity', id: string, districtID: number, provinceID: number, street: string, wardCode: string } | null, owner?: { __typename?: 'UserEntity', id: string, email?: string | null, name?: string | null, imageUrl?: string | null } | null, products?: Array<{ __typename?: 'FactoryProductEntity', productionCapacity: number, systemConfigVariantId: string, factoryId: string, productionTimeInMinutes: number, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null } | null }> | null, staff?: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, email?: string | null, name?: string | null } | null } };

export type UpdateFactoryInfoMutationVariables = Exact<{
  updateFactoryInfoInput: UpdateFactoryInfoDto;
}>;


export type UpdateFactoryInfoMutation = { __typename?: 'Mutation', updateFactoryInfo: { __typename?: 'FactoryEntity', businessLicenseUrl?: string | null, contactPersonName?: string | null, contactPersonPhone?: string | null, contractUrl?: string | null, description?: string | null, establishedDate?: any | null, factoryStatus?: FactoryStatus | null, isSubmitted?: boolean | null, leadTime?: number | null, maxPrintingCapacity?: number | null, minimumOrderQuantity?: number | null, name: string, operationalHours?: string | null, printingMethods: Array<string>, qualityCertifications?: string | null, specializations: Array<string>, taxIdentificationNumber?: string | null, totalEmployees?: number | null, website?: string | null, contactPersonRole?: string | null, contractAccepted?: boolean | null, reviewedBy?: string | null, reviewedAt?: any | null, contractAcceptedAt?: any | null, factoryOwnerId: string, formattedAddress?: string | null, address?: { __typename?: 'AddressEntity', id: string, districtID: number, provinceID: number, street: string, wardCode: string } | null, owner?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null } | null, products?: Array<{ __typename?: 'FactoryProductEntity', productionCapacity: number, systemConfigVariantId: string, factoryId: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null } | null }> | null, staff?: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, email?: string | null, name?: string | null } | null } };

export type ChangeFactoryStatusMutationVariables = Exact<{
  data: UpdateFactoryStatusDto;
}>;


export type ChangeFactoryStatusMutation = { __typename?: 'Mutation', changeFactoryStatus: { __typename?: 'FactoryEntity', factoryStatus?: FactoryStatus | null } };

export type ChangeFactoryStaffMutationVariables = Exact<{
  factoryId: Scalars['String']['input'];
  newStaffId: Scalars['String']['input'];
}>;


export type ChangeFactoryStaffMutation = { __typename?: 'Mutation', changeFactoryStaff: { __typename?: 'FactoryEntity', staff?: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, name?: string | null, role: Roles, email?: string | null } | null } };

export type MyNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNotificationsQuery = { __typename?: 'Query', myNotifications: Array<{ __typename?: 'NotificationEntity', content?: string | null, createdAt: any, id: string, isRead: boolean, title?: string | null, updatedAt?: any | null, url?: string | null }> };

export type MarkNotificationAsReadMutationVariables = Exact<{
  markNotificationAsReadId: Scalars['String']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'NotificationEntity', content?: string | null, createdAt: any, id: string, isRead: boolean, title?: string | null, updatedAt?: any | null, url?: string | null } };

export type CreatePaymentGatewayUrlMutationVariables = Exact<{
  gateway: Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
}>;


export type CreatePaymentGatewayUrlMutation = { __typename?: 'Mutation', createPayment: string };

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderEntity', id: string } };

export type GetMyOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrdersQuery = { __typename?: 'Query', myOrders: Array<{ __typename?: 'OrderEntity', acceptanceDeadline?: any | null, acceptedAt?: any | null, addressId?: string | null, assignedAt?: any | null, completedAt?: any | null, currentProgress?: number | null, customerId: string, delayReason?: string | null, doneCheckQualityAt?: any | null, doneProductionAt?: any | null, estimatedCheckQualityAt: any, estimatedCompletionAt: any, estimatedDoneProductionAt: any, estimatedShippingAt: any, id: string, isDelayed: boolean, orderDate: any, ratedAt?: any | null, ratedBy?: string | null, rating?: number | null, ratingComment?: string | null, shippedAt?: any | null, shippingPrice: number, status: OrderStatus, totalItems: number, totalPrice: number, totalProductionCost?: number | null, updatedAt?: any | null, address?: { __typename?: 'AddressEntity', districtID: number, factoryId?: string | null, id: string, provinceID: number, street: string, wardCode: string } | null, customer?: { __typename?: 'UserEntity', imageUrl?: string | null, name?: string | null, email?: string | null } | null, factory?: { __typename?: 'FactoryEntity', name: string, owner?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null } | null, orderDetails?: Array<{ __typename?: 'OrderDetailEntity', completedQty: number, createdAt: any, id: string, isRework: boolean, price: number, productionCost?: number | null, quantity: number, rejectedQty: number, reworkTime: number, status: OrderDetailStatus, updatedAt?: any | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, isActive: boolean, isDeleted: boolean, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, checkQualities?: Array<{ __typename?: 'CheckQualityEntity', totalChecked: number, status: string, passedQuantity: number, orderDetailId: string, task?: { __typename?: 'TaskEntity', taskname: string, taskType: string, status: string, startDate: any, note?: string | null, id: string, expiredTime: any, description: string, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null, id: string } | null } | null }> | null, design?: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, systemConfigVariantId: string, isTemplate: boolean, isPublic: boolean, isFinalized: boolean, id: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', positionName: string, basePrice: number } | null }> | null } | null }> | null, orderProgressReports?: Array<{ __typename?: 'OrderProgressReportEntity', reportDate: any, note?: string | null, imageUrls?: Array<string> | null, id: string }> | null, payments?: Array<{ __typename?: 'PaymentEntity', id: string, type: string, paymentLog: string, amount: number, status: string, transactions?: Array<{ __typename?: 'PaymentTransactionEntity', imageUrls?: Array<string> | null, transactionLog: string, status: TransactionStatus, paymentMethod: PaymentMethod, createdAt: any, amount: number, id: string, type: TransactionType }> | null }> | null, rejectedHistory?: Array<{ __typename?: 'RejectedOrderEntity', rejectedAt: any, reassignedTo?: string | null, reassignedAt?: any | null, reason: string, id: string, factory?: { __typename?: 'FactoryEntity', name: string, contractUrl?: string | null, address?: { __typename?: 'AddressEntity', wardCode: string, street: string, districtID: number, provinceID: number } | null, owner?: { __typename?: 'UserEntity', name?: string | null, email?: string | null, imageUrl?: string | null } | null } | null }> | null, tasks?: Array<{ __typename?: 'TaskEntity', taskname: string, taskType: string, id: string, status: string, startDate: any, note?: string | null, description: string, expiredTime: any, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null }> };

export type GetMyFactoryOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFactoryOrdersQuery = { __typename?: 'Query', factoryOrders: Array<{ __typename?: 'OrderEntity', acceptanceDeadline?: any | null, acceptedAt?: any | null, addressId?: string | null, assignedAt?: any | null, completedAt?: any | null, currentProgress?: number | null, customerId: string, delayReason?: string | null, doneCheckQualityAt?: any | null, doneProductionAt?: any | null, estimatedCheckQualityAt: any, estimatedCompletionAt: any, estimatedDoneProductionAt: any, estimatedShippingAt: any, id: string, isDelayed: boolean, orderDate: any, ratedAt?: any | null, ratedBy?: string | null, rating?: number | null, ratingComment?: string | null, shippedAt?: any | null, shippingPrice: number, status: OrderStatus, totalItems: number, totalPrice: number, totalProductionCost?: number | null, updatedAt?: any | null, address?: { __typename?: 'AddressEntity', districtID: number, factoryId?: string | null, id: string, provinceID: number, street: string, wardCode: string } | null, customer?: { __typename?: 'UserEntity', imageUrl?: string | null, name?: string | null, email?: string | null } | null, factory?: { __typename?: 'FactoryEntity', name: string, owner?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null } | null, orderDetails?: Array<{ __typename?: 'OrderDetailEntity', completedQty: number, createdAt: any, id: string, isRework: boolean, price: number, productionCost?: number | null, quantity: number, rejectedQty: number, reworkTime: number, status: OrderDetailStatus, updatedAt?: any | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, isActive: boolean, isDeleted: boolean, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, checkQualities?: Array<{ __typename?: 'CheckQualityEntity', totalChecked: number, status: string, passedQuantity: number, orderDetailId: string, task?: { __typename?: 'TaskEntity', taskname: string, taskType: string, status: string, startDate: any, note?: string | null, id: string, expiredTime: any, description: string, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null, id: string } | null } | null }> | null, design?: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, systemConfigVariantId: string, isTemplate: boolean, isPublic: boolean, isFinalized: boolean, id: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', positionName: string, basePrice: number } | null }> | null } | null }> | null, orderProgressReports?: Array<{ __typename?: 'OrderProgressReportEntity', reportDate: any, note?: string | null, imageUrls?: Array<string> | null, id: string }> | null, payments?: Array<{ __typename?: 'PaymentEntity', id: string, type: string, paymentLog: string, amount: number, status: string, transactions?: Array<{ __typename?: 'PaymentTransactionEntity', imageUrls?: Array<string> | null, transactionLog: string, status: TransactionStatus, paymentMethod: PaymentMethod, createdAt: any, amount: number, id: string, type: TransactionType }> | null }> | null, rejectedHistory?: Array<{ __typename?: 'RejectedOrderEntity', rejectedAt: any, reassignedTo?: string | null, reassignedAt?: any | null, reason: string, id: string, factory?: { __typename?: 'FactoryEntity', name: string, contractUrl?: string | null, address?: { __typename?: 'AddressEntity', wardCode: string, street: string, districtID: number, provinceID: number } | null, owner?: { __typename?: 'UserEntity', name?: string | null, email?: string | null, imageUrl?: string | null } | null } | null }> | null, tasks?: Array<{ __typename?: 'TaskEntity', taskname: string, taskType: string, id: string, status: string, startDate: any, note?: string | null, description: string, expiredTime: any, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null }> };

export type GetOrdersByFactoryIdQueryVariables = Exact<{
  factoryId: Scalars['String']['input'];
}>;


export type GetOrdersByFactoryIdQuery = { __typename?: 'Query', ordersByFactoryId: Array<{ __typename?: 'OrderEntity', acceptanceDeadline?: any | null, acceptedAt?: any | null, addressId?: string | null, assignedAt?: any | null, completedAt?: any | null, currentProgress?: number | null, customerId: string, delayReason?: string | null, doneCheckQualityAt?: any | null, doneProductionAt?: any | null, estimatedCheckQualityAt: any, estimatedCompletionAt: any, estimatedDoneProductionAt: any, estimatedShippingAt: any, id: string, isDelayed: boolean, orderDate: any, ratedAt?: any | null, ratedBy?: string | null, rating?: number | null, ratingComment?: string | null, shippedAt?: any | null, shippingPrice: number, status: OrderStatus, totalItems: number, totalPrice: number, totalProductionCost?: number | null, updatedAt?: any | null, address?: { __typename?: 'AddressEntity', districtID: number, factoryId?: string | null, id: string, provinceID: number, street: string, wardCode: string } | null, customer?: { __typename?: 'UserEntity', imageUrl?: string | null, name?: string | null, email?: string | null } | null, factory?: { __typename?: 'FactoryEntity', name: string, owner?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null } | null, orderDetails?: Array<{ __typename?: 'OrderDetailEntity', completedQty: number, createdAt: any, id: string, isRework: boolean, price: number, productionCost?: number | null, quantity: number, rejectedQty: number, reworkTime: number, status: OrderDetailStatus, updatedAt?: any | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, isActive: boolean, isDeleted: boolean, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, checkQualities?: Array<{ __typename?: 'CheckQualityEntity', totalChecked: number, status: string, passedQuantity: number, orderDetailId: string, task?: { __typename?: 'TaskEntity', taskname: string, taskType: string, status: string, startDate: any, note?: string | null, id: string, expiredTime: any, description: string, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null, id: string } | null } | null }> | null, design?: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, systemConfigVariantId: string, isTemplate: boolean, isPublic: boolean, isFinalized: boolean, id: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', positionName: string, basePrice: number } | null }> | null } | null }> | null, orderProgressReports?: Array<{ __typename?: 'OrderProgressReportEntity', reportDate: any, note?: string | null, imageUrls?: Array<string> | null, id: string }> | null, payments?: Array<{ __typename?: 'PaymentEntity', id: string, type: string, paymentLog: string, amount: number, status: string, transactions?: Array<{ __typename?: 'PaymentTransactionEntity', imageUrls?: Array<string> | null, transactionLog: string, status: TransactionStatus, paymentMethod: PaymentMethod, createdAt: any, amount: number, id: string, type: TransactionType }> | null }> | null, rejectedHistory?: Array<{ __typename?: 'RejectedOrderEntity', rejectedAt: any, reassignedTo?: string | null, reassignedAt?: any | null, reason: string, id: string, factory?: { __typename?: 'FactoryEntity', name: string, contractUrl?: string | null, address?: { __typename?: 'AddressEntity', wardCode: string, street: string, districtID: number, provinceID: number } | null, owner?: { __typename?: 'UserEntity', name?: string | null, email?: string | null, imageUrl?: string | null } | null } | null }> | null, tasks?: Array<{ __typename?: 'TaskEntity', taskname: string, taskType: string, id: string, status: string, startDate: any, note?: string | null, description: string, expiredTime: any, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null }> };

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type GetOrderQuery = { __typename?: 'Query', order: { __typename?: 'OrderEntity', acceptanceDeadline?: any | null, acceptedAt?: any | null, orderCode?: string | null, addressId?: string | null, assignedAt?: any | null, completedAt?: any | null, currentProgress?: number | null, customerId: string, delayReason?: string | null, doneCheckQualityAt?: any | null, doneProductionAt?: any | null, estimatedCheckQualityAt: any, estimatedCompletionAt: any, estimatedDoneProductionAt: any, estimatedShippingAt: any, id: string, isDelayed: boolean, orderDate: any, ratedAt?: any | null, ratedBy?: string | null, rating?: number | null, ratingComment?: string | null, shippedAt?: any | null, shippingPrice: number, status: OrderStatus, totalItems: number, totalPrice: number, totalProductionCost?: number | null, updatedAt?: any | null, address?: { __typename?: 'AddressEntity', districtID: number, factoryId?: string | null, id: string, provinceID: number, street: string, wardCode: string, formattedAddress?: string | null } | null, customer?: { __typename?: 'UserEntity', imageUrl?: string | null, name?: string | null, email?: string | null } | null, factory?: { __typename?: 'FactoryEntity', name: string, owner?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null, address?: { __typename?: 'AddressEntity', districtID: number, street: string, id: string, provinceID: number, wardCode: string, formattedAddress?: string | null } | null } | null, orderDetails?: Array<{ __typename?: 'OrderDetailEntity', completedQty: number, createdAt: any, id: string, isRework: boolean, price: number, productionCost?: number | null, quantity: number, rejectedQty: number, reworkTime: number, status: OrderDetailStatus, updatedAt?: any | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, isActive: boolean, isDeleted: boolean, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, checkQualities?: Array<{ __typename?: 'CheckQualityEntity', id: string, totalChecked: number, status: string, passedQuantity: number, orderDetailId: string, task?: { __typename?: 'TaskEntity', taskname: string, taskType: string, status: string, startDate: any, note?: string | null, id: string, expiredTime: any, description: string, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null, id: string } | null } | null }> | null, design?: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, systemConfigVariantId: string, isTemplate: boolean, isPublic: boolean, isFinalized: boolean, id: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', positionName: string, basePrice: number } | null }> | null } | null }> | null, orderProgressReports?: Array<{ __typename?: 'OrderProgressReportEntity', reportDate: any, note?: string | null, imageUrls?: Array<string> | null, id: string }> | null, payments?: Array<{ __typename?: 'PaymentEntity', id: string, type: string, paymentLog: string, amount: number, status: string, transactions?: Array<{ __typename?: 'PaymentTransactionEntity', imageUrls?: Array<string> | null, transactionLog: string, status: TransactionStatus, paymentMethod: PaymentMethod, createdAt: any, amount: number, id: string, type: TransactionType }> | null }> | null, rejectedHistory?: Array<{ __typename?: 'RejectedOrderEntity', rejectedAt: any, reassignedTo?: string | null, reassignedAt?: any | null, reason: string, id: string, factory?: { __typename?: 'FactoryEntity', name: string, contractUrl?: string | null, address?: { __typename?: 'AddressEntity', wardCode: string, street: string, districtID: number, provinceID: number } | null, owner?: { __typename?: 'UserEntity', name?: string | null, email?: string | null, imageUrl?: string | null } | null } | null }> | null, tasks?: Array<{ __typename?: 'TaskEntity', taskname: string, taskType: string, id: string, status: string, startDate: any, note?: string | null, description: string, expiredTime: any, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null } };

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'OrderEntity', acceptanceDeadline?: any | null, acceptedAt?: any | null, addressId?: string | null, assignedAt?: any | null, completedAt?: any | null, currentProgress?: number | null, customerId: string, delayReason?: string | null, doneCheckQualityAt?: any | null, doneProductionAt?: any | null, estimatedCheckQualityAt: any, estimatedCompletionAt: any, estimatedDoneProductionAt: any, estimatedShippingAt: any, id: string, isDelayed: boolean, orderDate: any, ratedAt?: any | null, ratedBy?: string | null, rating?: number | null, ratingComment?: string | null, shippedAt?: any | null, shippingPrice: number, status: OrderStatus, totalItems: number, totalPrice: number, totalProductionCost?: number | null, updatedAt?: any | null, address?: { __typename?: 'AddressEntity', districtID: number, factoryId?: string | null, id: string, provinceID: number, street: string, wardCode: string } | null, customer?: { __typename?: 'UserEntity', imageUrl?: string | null, name?: string | null, email?: string | null } | null, factory?: { __typename?: 'FactoryEntity', name: string, owner?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null } | null, orderDetails?: Array<{ __typename?: 'OrderDetailEntity', completedQty: number, createdAt: any, id: string, isRework: boolean, price: number, productionCost?: number | null, quantity: number, rejectedQty: number, reworkTime: number, status: OrderDetailStatus, updatedAt?: any | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, isActive: boolean, isDeleted: boolean, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, checkQualities?: Array<{ __typename?: 'CheckQualityEntity', totalChecked: number, status: string, passedQuantity: number, orderDetailId: string, task?: { __typename?: 'TaskEntity', taskname: string, taskType: string, status: string, startDate: any, note?: string | null, id: string, expiredTime: any, description: string, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null, id: string } | null } | null }> | null, design?: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, systemConfigVariantId: string, isTemplate: boolean, isPublic: boolean, isFinalized: boolean, id: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', positionName: string, basePrice: number } | null }> | null } | null }> | null, orderProgressReports?: Array<{ __typename?: 'OrderProgressReportEntity', reportDate: any, note?: string | null, imageUrls?: Array<string> | null, id: string }> | null, payments?: Array<{ __typename?: 'PaymentEntity', id: string, type: string, paymentLog: string, amount: number, status: string, transactions?: Array<{ __typename?: 'PaymentTransactionEntity', imageUrls?: Array<string> | null, transactionLog: string, status: TransactionStatus, paymentMethod: PaymentMethod, createdAt: any, amount: number, id: string, type: TransactionType }> | null }> | null, rejectedHistory?: Array<{ __typename?: 'RejectedOrderEntity', rejectedAt: any, reassignedTo?: string | null, reassignedAt?: any | null, reason: string, id: string, factory?: { __typename?: 'FactoryEntity', name: string, contractUrl?: string | null, address?: { __typename?: 'AddressEntity', wardCode: string, street: string, districtID: number, provinceID: number } | null, owner?: { __typename?: 'UserEntity', name?: string | null, email?: string | null, imageUrl?: string | null } | null } | null }> | null, tasks?: Array<{ __typename?: 'TaskEntity', taskname: string, taskType: string, id: string, status: string, startDate: any, note?: string | null, description: string, expiredTime: any, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null }> };

export type GetMyStaffOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyStaffOrdersQuery = { __typename?: 'Query', staffOrders: Array<{ __typename?: 'OrderEntity', acceptanceDeadline?: any | null, acceptedAt?: any | null, addressId?: string | null, assignedAt?: any | null, completedAt?: any | null, currentProgress?: number | null, customerId: string, delayReason?: string | null, doneCheckQualityAt?: any | null, doneProductionAt?: any | null, estimatedCheckQualityAt: any, estimatedCompletionAt: any, estimatedDoneProductionAt: any, estimatedShippingAt: any, id: string, isDelayed: boolean, orderDate: any, ratedAt?: any | null, ratedBy?: string | null, rating?: number | null, ratingComment?: string | null, shippedAt?: any | null, shippingPrice: number, status: OrderStatus, totalItems: number, totalPrice: number, totalProductionCost?: number | null, updatedAt?: any | null, address?: { __typename?: 'AddressEntity', districtID: number, factoryId?: string | null, id: string, provinceID: number, street: string, wardCode: string } | null, customer?: { __typename?: 'UserEntity', imageUrl?: string | null, name?: string | null, email?: string | null } | null, factory?: { __typename?: 'FactoryEntity', name: string, owner?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null } | null, orderDetails?: Array<{ __typename?: 'OrderDetailEntity', completedQty: number, createdAt: any, id: string, isRework: boolean, price: number, productionCost?: number | null, quantity: number, rejectedQty: number, reworkTime: number, status: OrderDetailStatus, updatedAt?: any | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, isActive: boolean, isDeleted: boolean, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, checkQualities?: Array<{ __typename?: 'CheckQualityEntity', totalChecked: number, status: string, passedQuantity: number, orderDetailId: string, task?: { __typename?: 'TaskEntity', taskname: string, taskType: string, status: string, startDate: any, note?: string | null, id: string, expiredTime: any, description: string, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', email?: string | null, name?: string | null, imageUrl?: string | null, id: string } | null } | null }> | null, design?: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, systemConfigVariantId: string, isTemplate: boolean, isPublic: boolean, isFinalized: boolean, id: string, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null, product: { __typename?: 'ProductEntity', name: string, imageUrl?: string | null } } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', positionName: string, basePrice: number } | null }> | null } | null }> | null, orderProgressReports?: Array<{ __typename?: 'OrderProgressReportEntity', reportDate: any, note?: string | null, imageUrls?: Array<string> | null, id: string }> | null, payments?: Array<{ __typename?: 'PaymentEntity', id: string, type: string, paymentLog: string, amount: number, status: string, transactions?: Array<{ __typename?: 'PaymentTransactionEntity', imageUrls?: Array<string> | null, transactionLog: string, status: TransactionStatus, paymentMethod: PaymentMethod, createdAt: any, amount: number, id: string, type: TransactionType }> | null }> | null, rejectedHistory?: Array<{ __typename?: 'RejectedOrderEntity', rejectedAt: any, reassignedTo?: string | null, reassignedAt?: any | null, reason: string, id: string, factory?: { __typename?: 'FactoryEntity', name: string, contractUrl?: string | null, address?: { __typename?: 'AddressEntity', wardCode: string, street: string, districtID: number, provinceID: number } | null, owner?: { __typename?: 'UserEntity', name?: string | null, email?: string | null, imageUrl?: string | null } | null } | null }> | null, tasks?: Array<{ __typename?: 'TaskEntity', taskname: string, taskType: string, id: string, status: string, startDate: any, note?: string | null, description: string, expiredTime: any, completedDate?: any | null, assignedDate: any, assignee?: { __typename?: 'UserEntity', name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null }> };

export type AcceptOrderForFactoryMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type AcceptOrderForFactoryMutation = { __typename?: 'Mutation', acceptOrderForFactory: { __typename?: 'OrderEntity', id: string } };

export type RejectOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;


export type RejectOrderMutation = { __typename?: 'Mutation', rejectOrder: { __typename?: 'OrderEntity', id: string } };

export type DoneProductionOrderDetailsMutationVariables = Exact<{
  orderDetailId: Scalars['String']['input'];
}>;


export type DoneProductionOrderDetailsMutation = { __typename?: 'Mutation', doneProductionOrderDetails: { __typename?: 'OrderDetailEntity', id: string } };

export type StartReworkMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type StartReworkMutation = { __typename?: 'Mutation', startRework: { __typename?: 'OrderEntity', id: string } };

export type DoneReworkForOrderDetailsMutationVariables = Exact<{
  orderDetailId: Scalars['String']['input'];
}>;


export type DoneReworkForOrderDetailsMutation = { __typename?: 'Mutation', doneReworkForOrderDetails: { __typename?: 'OrderDetailEntity', id: string } };

export type DoneCheckQualityMutationVariables = Exact<{
  input: DoneCheckQualityInput;
}>;


export type DoneCheckQualityMutation = { __typename?: 'Mutation', doneCheckQuality: { __typename?: 'CheckQualityEntity', id: string } };

export type ShippedOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type ShippedOrderMutation = { __typename?: 'Mutation', shippedOrder: { __typename?: 'OrderEntity', id: string } };

export type ChangeOrderToShippingMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type ChangeOrderToShippingMutation = { __typename?: 'Mutation', changeOrderToShipping: { __typename?: 'OrderEntity', id: string } };

export type FeedbackOrderMutationVariables = Exact<{
  input: FeedbackOrderInput;
  orderId: Scalars['String']['input'];
}>;


export type FeedbackOrderMutation = { __typename?: 'Mutation', feedbackOrder: { __typename?: 'OrderEntity', id: string } };

export type AddOrderProgressReportMutationVariables = Exact<{
  input: AddOrderProgressReportInput;
}>;


export type AddOrderProgressReportMutation = { __typename?: 'Mutation', addOrderProgressReport: { __typename?: 'OrderProgressReportEntity', id: string } };

export type CreateRefundForOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;


export type CreateRefundForOrderMutation = { __typename?: 'Mutation', createRefundForOrder: { __typename?: 'OrderEntity', id: string } };

export type ProcessWithdrawalMutationVariables = Exact<{
  imageUrls: Array<Scalars['String']['input']> | Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
  userBankId: Scalars['String']['input'];
}>;


export type ProcessWithdrawalMutation = { __typename?: 'Mutation', processWithdrawal: string };

export type StartReworkByManagerMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type StartReworkByManagerMutation = { __typename?: 'Mutation', startReworkByManager: { __typename?: 'OrderEntity', id: string } };

export type AssignFactoryToOrderMutationVariables = Exact<{
  factoryId: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
}>;


export type AssignFactoryToOrderMutation = { __typename?: 'Mutation', assignFactoryToOrder: { __typename?: 'OrderEntity', id: string } };

export type CalculateShippingCostAndFactoryForCartMutationVariables = Exact<{
  input: CalculateShippingCostAndFactoryDto;
}>;


export type CalculateShippingCostAndFactoryForCartMutation = { __typename?: 'Mutation', calculateShippingCostAndFactoryForCart: { __typename?: 'ShippingCostAndFactoryResponse', shippingFee: { __typename?: 'ShippingFee', total: number }, selectedFactory?: { __typename?: 'FactoryEntity', name: string, address?: { __typename?: 'AddressEntity', formattedAddress?: string | null } | null } | null } };

export type FactoryScoresForOrderQueryVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type FactoryScoresForOrderQuery = { __typename?: 'Query', factoryScoresForOrder: Array<{ __typename?: 'FactoryScoreResponse', factoryId: string, factoryName: string, totalScore: number, scores: { __typename?: 'FactoryScores', capacityScore: number, leadTimeScore: number, legitPointScore: number, productionCapacityScore: number, specializationScore: number }, weights: { __typename?: 'FactoryScoreWeights', capacity: number, leadTime: number, legitPoint: number, productionCapacity: number, specialization: number } }> };

export type SpeedUpOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type SpeedUpOrderMutation = { __typename?: 'Mutation', speedUpOrder: { __typename?: 'OrderEntity', id: string } };

export type OrderPriceDetailsQueryVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type OrderPriceDetailsQuery = { __typename?: 'Query', orderPriceDetails: { __typename?: 'OrderPriceDetailsResponse', basePrice: number, discountPercentage: number, finalPrice: number, priceAfterDiscount: number, priceAfterVoucher: number, shippingPrice: number, voucher?: { __typename?: 'VoucherEntity', code: string, createdAt: any, description?: string | null, id: string, isPublic: boolean, limitedUsage?: number | null, maxDiscountValue?: number | null, minOrderValue?: number | null, type: VoucherType, updatedAt?: any | null, userId?: string | null, value: number } | null } };

export type GetGiaoHangNhanhOrderInfoQueryVariables = Exact<{
  orderCode: Scalars['String']['input'];
}>;


export type GetGiaoHangNhanhOrderInfoQuery = { __typename?: 'Query', getGiaoHangNhanhOrderInfo: { __typename?: 'OrderInfoDto', client_id: number, client_order_code?: string | null, cod_amount: number, cod_collect_date?: string | null, cod_failed_amount: number, cod_failed_collect_date?: string | null, cod_transfer_date?: string | null, content: string, converted_weight: number, coupon?: string | null, created_client: number, created_date: string, created_employee: number, created_ip: string, created_source: string, current_warehouse_id: number, custom_service_fee: number, deliver_station_id?: number | null, deliver_warehouse_id: number, employee_note?: string | null, finish_date?: string | null, from_address: string, from_district_id: number, from_name: string, from_phone: string, from_ward_code: string, height: number, insurance_value: number, is_cod_collected: boolean, is_cod_transferred: boolean, leadtime?: string | null, length: number, next_warehouse_id: number, note?: string | null, order_code: string, order_date: string, order_value: number, payment_type_id: number, pick_station_id?: number | null, pick_warehouse_id: number, required_note: string, return_address?: string | null, return_district_id?: number | null, return_name?: string | null, return_phone?: string | null, return_ward_code?: string | null, return_warehouse_id: number, service_id: number, service_type_id: number, shop_id: number, status: string, tag?: Array<string> | null, to_address: string, to_district_id: number, to_name: string, to_phone: string, to_ward_code: string, updated_client: number, updated_date: string, updated_employee: number, updated_ip: string, updated_source: string, updated_warehouse: number, weight: number, width: number, log?: Array<{ __typename?: 'OrderLogDto', status: string, updated_date: string }> | null } };

export type GenerateAndUploadImageMutationVariables = Exact<{
  prompt: Scalars['String']['input'];
}>;


export type GenerateAndUploadImageMutation = { __typename?: 'Mutation', generateAndUploadImage: { __typename?: 'FileUploadResponse', url: string } };

export type GetExpiredTimeQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetExpiredTimeQuery = { __typename?: 'Query', getExpiredTime: any };

export type ResendOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendOtpMutation = { __typename?: 'Mutation', resendOTP: boolean };

export type VerifyOtpMutationVariables = Exact<{
  verifyOtpInput: VerifyOtpInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOTP: boolean };

export type ProductDesignsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductDesignsQuery = { __typename?: 'Query', productDesigns: Array<{ __typename?: 'ProductDesignEntity', id: string, isPublic: boolean, isTemplate: boolean, isFinalized: boolean, thumbnailUrl?: string | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, category?: { __typename?: 'CategoryEntity', name: string } | null } } | null }> };

export type ProductDesignsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductDesignsByUserQuery = { __typename?: 'Query', productDesignsByUser: Array<{ __typename?: 'ProductDesignEntity', id: string, isPublic: boolean, isTemplate: boolean, isFinalized: boolean, thumbnailUrl?: string | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, category?: { __typename?: 'CategoryEntity', name: string } | null } } | null }> };

export type ProductDesignByIdQueryVariables = Exact<{
  productDesignId: Scalars['ID']['input'];
}>;


export type ProductDesignByIdQuery = { __typename?: 'Query', productDesign: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, isFinalized: boolean, isPublic: boolean, isTemplate: boolean, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null, user?: { __typename?: 'UserEntity', id: string, name?: string | null, role: Roles } | null } };

export type CreateProductDesignMutationVariables = Exact<{
  input: CreateProductDesignDto;
}>;


export type CreateProductDesignMutation = { __typename?: 'Mutation', createProductDesign: { __typename?: 'ProductDesignEntity', id: string } };

export type UpdateProductDesignMutationVariables = Exact<{
  updateProductDesignId: Scalars['String']['input'];
  input: UpdateProductDesignDto;
}>;


export type UpdateProductDesignMutation = { __typename?: 'Mutation', updateProductDesign: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null } | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null } };

export type RemoveProductDesignMutationVariables = Exact<{
  removeProductDesignId: Scalars['ID']['input'];
}>;


export type RemoveProductDesignMutation = { __typename?: 'Mutation', removeProductDesign: { __typename?: 'ProductDesignEntity', id: string, isDeleted?: boolean | null, isFinalized: boolean, isPublic: boolean, isTemplate: boolean } };

export type UpdateThumbnailProductDesignMutationVariables = Exact<{
  updateProductDesignId: Scalars['String']['input'];
  input: UpdateProductDesignDto;
  fileUrl: Scalars['String']['input'];
}>;


export type UpdateThumbnailProductDesignMutation = { __typename?: 'Mutation', deleteFile: boolean, updateProductDesign: { __typename?: 'ProductDesignEntity', thumbnailUrl?: string | null } };

export type GetTemplateProductDesignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTemplateProductDesignsQuery = { __typename?: 'Query', getTemplateProductDesigns: Array<{ __typename?: 'ProductDesignEntity', id: string, isPublic: boolean, isTemplate: boolean, isFinalized: boolean, thumbnailUrl?: string | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, category?: { __typename?: 'CategoryEntity', name: string } | null } } | null }> };

export type PublicProductDesignsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicProductDesignsQuery = { __typename?: 'Query', publicProductDesigns: Array<{ __typename?: 'ProductDesignEntity', id: string, isPublic: boolean, isTemplate: boolean, isFinalized: boolean, thumbnailUrl?: string | null, designPositions?: Array<{ __typename?: 'DesignPositionEntity', designJSON?: any | null, positionType?: { __typename?: 'ProductPositionTypeEntity', id: string, positionName: string, basePrice: number } | null }> | null, systemConfigVariant?: { __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null, product: { __typename?: 'ProductEntity', name: string, category?: { __typename?: 'CategoryEntity', name: string } | null } } | null }> };

export type DuplicateProductDesignMutationVariables = Exact<{
  duplicateProductDesignId: Scalars['ID']['input'];
}>;


export type DuplicateProductDesignMutation = { __typename?: 'Mutation', duplicateProductDesign: { __typename?: 'ProductDesignEntity', id: string, isFinalized: boolean, isPublic: boolean, isTemplate: boolean } };

export type GetAllDiscountByProductIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetAllDiscountByProductIdQuery = { __typename?: 'Query', getAllDiscountByProductId: Array<{ __typename?: 'SystemConfigDiscountEntity', createdAt: any, discountPercent: number, id: string, isActive: boolean, isDeleted: boolean, minQuantity: number, name: string, updatedAt: any, productId: string }> };

export type CreateSystemConfigDiscountMutationVariables = Exact<{
  createDiscountInput: CreateSystemConfigDiscountDto;
}>;


export type CreateSystemConfigDiscountMutation = { __typename?: 'Mutation', createSystemConfigDiscount: { __typename?: 'SystemConfigDiscountEntity', createdAt: any, discountPercent: number, id: string, isActive: boolean, isDeleted: boolean, minQuantity: number, name: string, updatedAt: any, productId: string } };

export type UpdateSystemConfigDiscountMutationVariables = Exact<{
  updateSystemConfigDiscountId: Scalars['String']['input'];
  updateDiscountInput: UpdateSystemConfigDiscountDto;
}>;


export type UpdateSystemConfigDiscountMutation = { __typename?: 'Mutation', updateSystemConfigDiscount: { __typename?: 'SystemConfigDiscountEntity', createdAt: any, discountPercent: number, id: string, isActive: boolean, isDeleted: boolean, minQuantity: number, name: string, updatedAt: any, productId: string } };

export type RemoveSystemConfigDiscountMutationVariables = Exact<{
  removeSystemConfigDiscountId: Scalars['String']['input'];
}>;


export type RemoveSystemConfigDiscountMutation = { __typename?: 'Mutation', removeSystemConfigDiscount: { __typename?: 'SystemConfigDiscountEntity', createdAt: any, discountPercent: number, id: string, isActive: boolean, isDeleted: boolean, minQuantity: number, name: string, updatedAt: any, productId: string } };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductEntity', categoryId: string, id: string, imageUrl?: string | null, isActive: boolean, name: string, updatedAt?: any | null, createdAt: any, description?: string | null, category?: { __typename?: 'CategoryEntity', name: string } | null, variants?: Array<{ __typename?: 'SystemConfigVariantEntity', price?: number | null }> | null }> };

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', product: { __typename?: 'ProductEntity', id: string, imageUrl?: string | null, isActive: boolean, name: string, updatedAt?: any | null, createdAt: any, description?: string | null, weight?: number | null, createdBy?: string | null, category?: { __typename?: 'CategoryEntity', name: string } | null, variants?: Array<{ __typename?: 'SystemConfigVariantEntity', price?: number | null, model?: string | null, isDeleted: boolean, isActive: boolean, id: string, color?: string | null, productId: string, size?: string | null }> | null } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductEntity', id: string, imageUrl?: string | null, isActive: boolean, name: string, updatedAt?: any | null, createdAt: any, description?: string | null, category?: { __typename?: 'CategoryEntity', name: string } | null } };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'ProductEntity', id: string, imageUrl?: string | null, isActive: boolean, name: string, updatedAt?: any | null, createdAt: any, description?: string | null, category?: { __typename?: 'CategoryEntity', name: string } | null } };

export type GetProductVariantByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetProductVariantByIdQuery = { __typename?: 'Query', product: { __typename?: 'ProductEntity', imageUrl?: string | null, name: string, variants?: Array<{ __typename?: 'SystemConfigVariantEntity', id: string, price?: number | null, color?: string | null, size?: string | null, model?: string | null }> | null } };

export type GetAllProvincesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProvincesQuery = { __typename?: 'Query', provinces: Array<{ __typename?: 'Province', provinceId: number, provinceName: string }> };

export type GetProvinceByIdQueryVariables = Exact<{
  provinceId: Scalars['Int']['input'];
}>;


export type GetProvinceByIdQuery = { __typename?: 'Query', province: { __typename?: 'Province', provinceId: number, provinceName: string } };

export type GetAllDistrictsByProvinceIdQueryVariables = Exact<{
  provinceId: Scalars['Int']['input'];
}>;


export type GetAllDistrictsByProvinceIdQuery = { __typename?: 'Query', districts: Array<{ __typename?: 'District', districtId: number, districtName: string, provinceId: number }> };

export type GetDistrictByIdQueryVariables = Exact<{
  districtId: Scalars['Int']['input'];
}>;


export type GetDistrictByIdQuery = { __typename?: 'Query', district: { __typename?: 'District', districtId: number, districtName: string, provinceId: number } };

export type GetAllWardsByDistrictIdQueryVariables = Exact<{
  districtId: Scalars['Int']['input'];
}>;


export type GetAllWardsByDistrictIdQuery = { __typename?: 'Query', wards: Array<{ __typename?: 'Ward', wardCode: string, wardName: string, districtId: number }> };

export type GetWardByWardCodeQueryVariables = Exact<{
  wardCode: Scalars['String']['input'];
}>;


export type GetWardByWardCodeQuery = { __typename?: 'Query', ward: { __typename?: 'Ward', districtId: number, wardCode: string, wardName: string } };

export type GetAvailableServiceQueryVariables = Exact<{
  servicesInput: GetAvailableServicesDto;
}>;


export type GetAvailableServiceQuery = { __typename?: 'Query', availableServices: Array<{ __typename?: 'ShippingService', shortName: string, serviceTypeId: number, serviceId: number }> };

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

export type SystemConfigOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemConfigOrderQuery = { __typename?: 'Query', systemConfigOrder: { __typename?: 'SystemConfigOrderEntity', acceptHoursForFactory: number, capacityScoreWeight: number, checkQualityTimesDays: number, leadTimeScoreWeight: number, legitPointScoreWeight: number, legitPointToSuspend: number, limitFactoryRejectOrders: number, limitReworkTimes: number, maxLegitPoint: number, maxProductionCapacity: number, maxProductionTimeInMinutes: number, productionCapacityScoreWeight: number, reduceLegitPointIfReject: number, shippingDays: number, specializationScoreWeight: number, voucherBaseTypeForRefund: VoucherType, voucherBaseValueForRefund: number, voucherBaseLimitedUsage: number, voucherBaseMaxDiscountValue: number } };

export type UpdateSystemConfigOrderMutationVariables = Exact<{
  updateConfigInput: UpdateSystemConfigOrderDto;
}>;


export type UpdateSystemConfigOrderMutation = { __typename?: 'Mutation', updateSystemConfigOrder: { __typename?: 'SystemConfigOrderEntity', id: string } };

export type ReassignNewStaffForOrderMutationVariables = Exact<{
  newStaffId: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
}>;


export type ReassignNewStaffForOrderMutation = { __typename?: 'Mutation', reassignNewStaffForOrder: { __typename?: 'OrderEntity', id: string } };

export type GetSystemConfigVariantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSystemConfigVariantsQuery = { __typename?: 'Query', systemConfigVariants: Array<{ __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, size?: string | null, product: { __typename?: 'ProductEntity', id: string, imageUrl?: string | null, name: string, description?: string | null } }> };

export type GetSystemConfigVariantsByProductQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetSystemConfigVariantsByProductQuery = { __typename?: 'Query', systemConfigVariantsByProduct: Array<{ __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, size?: string | null, product: { __typename?: 'ProductEntity', id: string, imageUrl?: string | null, name: string, description?: string | null } }> };

export type CreateSystemConfigVariantMutationVariables = Exact<{
  createSystemConfigVariantInput: CreateSystemConfigVariantInput;
}>;


export type CreateSystemConfigVariantMutation = { __typename?: 'Mutation', createSystemConfigVariant: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null } };

export type UpdateSystemConfigVariantMutationVariables = Exact<{
  updateSystemConfigVariantInput: UpdateSystemConfigVariantInput;
}>;


export type UpdateSystemConfigVariantMutation = { __typename?: 'Mutation', updateSystemConfigVariant: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null } };

export type RemoveSystemConfigVariantMutationVariables = Exact<{
  removeSystemConfigVariantId: Scalars['String']['input'];
}>;


export type RemoveSystemConfigVariantMutation = { __typename?: 'Mutation', removeSystemConfigVariant: { __typename?: 'SystemConfigVariantEntity', color?: string | null, id: string, isActive: boolean, isDeleted: boolean, model?: string | null, price?: number | null, productId: string, size?: string | null } };

export type FindTasksByStaffIdQueryVariables = Exact<{
  staffId: Scalars['String']['input'];
}>;


export type FindTasksByStaffIdQuery = { __typename?: 'Query', findTasksByStaffId: Array<{ __typename?: 'TaskEntity', assignedDate: any, completedDate?: any | null, description: string, expiredTime: any, id: string, note?: string | null, startDate: any, status: string, taskType: string, taskname: string, assignee?: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, email?: string | null, name?: string | null } | null }>, user: { __typename?: 'UserEntity', createdAt: any, createdBy?: string | null, dateOfBirth?: any | null, email?: string | null, gender: boolean, id: string, imageUrl?: string | null, isActive: boolean, isDeleted: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, staffedFactory?: { __typename?: 'FactoryEntity', name: string } | null } };

export type GetMyUserBanksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserBanksQuery = { __typename?: 'Query', userBanks: Array<{ __typename?: 'UserBankEntity', accountName: string, accountNumber: string, bankId: string, createdAt: any, id: string, isDefault: boolean, updatedAt: any, bank?: { __typename?: 'SystemConfigBankEntity', bin: string, code: string, id: string, isActive: boolean, isDeleted: boolean, logo: string, name: string, shortName: string } | null }> };

export type GetUserBanksByUserIdQueryVariables = Exact<{
  userBanksByUserIdId: Scalars['String']['input'];
}>;


export type GetUserBanksByUserIdQuery = { __typename?: 'Query', userBanksByUserId: Array<{ __typename?: 'UserBankEntity', accountName: string, accountNumber: string, bankId: string, createdAt: any, id: string, isDefault: boolean, updatedAt: any, bank?: { __typename?: 'SystemConfigBankEntity', bin: string, code: string, id: string, isActive: boolean, isDeleted: boolean, logo: string, name: string, shortName: string } | null }> };

export type CreateUserBankMutationVariables = Exact<{
  createUserBankInput: CreateUserBankInput;
}>;


export type CreateUserBankMutation = { __typename?: 'Mutation', createUserBank: { __typename?: 'UserBankEntity', id: string } };

export type UpdateUserBankMutationVariables = Exact<{
  updateUserBankId: Scalars['String']['input'];
  updateUserBankInput: UpdateUserBankInput;
}>;


export type UpdateUserBankMutation = { __typename?: 'Mutation', updateUserBank: { __typename?: 'UserBankEntity', id: string } };

export type DeleteUserBankMutationVariables = Exact<{
  deleteUserBankId: Scalars['String']['input'];
}>;


export type DeleteUserBankMutation = { __typename?: 'Mutation', deleteUserBank: { __typename?: 'UserBankEntity', id: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserDto;
  updateUserId: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean } };

export type GetAvailableStaffForFactoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvailableStaffForFactoryQuery = { __typename?: 'Query', availableStaffForFactory: Array<{ __typename?: 'UserEntity', email?: string | null, id: string, gender: boolean, imageUrl?: string | null, name?: string | null, role: Roles }> };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileDto;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, gender: boolean, email?: string | null, dateOfBirth?: any | null, createdAt: any, isActive: boolean, name?: string | null, phoneNumber?: string | null, role: Roles, updatedAt?: any | null, isVerified: boolean } };

export type UpdatePhoneNumberMutationVariables = Exact<{
  updatePhoneNumberInput: UpdatePhoneNumberDto;
}>;


export type UpdatePhoneNumberMutation = { __typename?: 'Mutation', updatePhoneNumber: { __typename?: 'UserEntity', id: string, phoneNumber?: string | null } };

export type AvailableVouchersQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableVouchersQuery = { __typename?: 'Query', availableVouchers: Array<{ __typename?: 'VoucherEntity', code: string, createdAt: any, description?: string | null, id: string, isActive: boolean, isPublic: boolean, limitedUsage?: number | null, minOrderValue?: number | null, type: VoucherType, value: number, userId?: string | null, updatedAt?: any | null, maxDiscountValue?: number | null, usages?: Array<{ __typename?: 'VoucherUsageEntity', voucherId: string, usedAt: any, orderId: string, id: string, user: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, name?: string | null, email?: string | null } }> | null }> };

export type AllVouchersOfUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AllVouchersOfUserQuery = { __typename?: 'Query', allVouchersOfUser: Array<{ __typename?: 'VoucherEntity', code: string, createdAt: any, description?: string | null, id: string, isActive: boolean, isPublic: boolean, limitedUsage?: number | null, minOrderValue?: number | null, type: VoucherType, value: number, userId?: string | null, updatedAt?: any | null, maxDiscountValue?: number | null, usages?: Array<{ __typename?: 'VoucherUsageEntity', voucherId: string, usedAt: any, orderId: string, id: string, user: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, name?: string | null, email?: string | null } }> | null }> };

export type AllVouchersOfSystemQueryVariables = Exact<{ [key: string]: never; }>;


export type AllVouchersOfSystemQuery = { __typename?: 'Query', allSystemVouchers: Array<{ __typename?: 'VoucherEntity', code: string, createdAt: any, description?: string | null, id: string, isActive: boolean, isPublic: boolean, limitedUsage?: number | null, minOrderValue?: number | null, type: VoucherType, value: number, userId?: string | null, updatedAt?: any | null, maxDiscountValue?: number | null, usages?: Array<{ __typename?: 'VoucherUsageEntity', voucherId: string, usedAt: any, orderId: string, id: string, user: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, name?: string | null, email?: string | null } }> | null }> };

export type CreateVoucherMutationVariables = Exact<{
  input: CreateVoucherInput;
}>;


export type CreateVoucherMutation = { __typename?: 'Mutation', createVoucher: { __typename?: 'VoucherEntity', code: string, createdAt: any, description?: string | null, id: string, isActive: boolean, isPublic: boolean, limitedUsage?: number | null, minOrderValue?: number | null, type: VoucherType, value: number, userId?: string | null, updatedAt?: any | null, maxDiscountValue?: number | null, usages?: Array<{ __typename?: 'VoucherUsageEntity', voucherId: string, usedAt: any, orderId: string, id: string, user: { __typename?: 'UserEntity', id: string, imageUrl?: string | null, name?: string | null, email?: string | null } }> | null } };


export const AddressesDocument = gql`
    query Addresses {
  addresses {
    id
    districtID
    provinceID
    street
    wardCode
    formattedAddress
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
export function useAddressesQuery(baseOptions?: Apollo.QueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
      }
export function useAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
        }
export function useAddressesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
        }
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<typeof useAddressesLazyQuery>;
export type AddressesSuspenseQueryHookResult = ReturnType<typeof useAddressesSuspenseQuery>;
export type AddressesQueryResult = Apollo.QueryResult<AddressesQuery, AddressesQueryVariables>;
export const CreateAddressDocument = gql`
    mutation CreateAddress($createAddressInput: CreateAddressInput!) {
  createAddress(createAddressInput: $createAddressInput) {
    id
    districtID
    provinceID
    street
    wardCode
    formattedAddress
  }
}
    `;
export type CreateAddressMutationFn = Apollo.MutationFunction<CreateAddressMutation, CreateAddressMutationVariables>;

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
export function useCreateAddressMutation(baseOptions?: Apollo.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
      }
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export type CreateAddressMutationResult = Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<CreateAddressMutation, CreateAddressMutationVariables>;
export const DeleteAddressDocument = gql`
    mutation DeleteAddress($deleteAddressId: String!) {
  deleteAddress(id: $deleteAddressId) {
    id
  }
}
    `;
export type DeleteAddressMutationFn = Apollo.MutationFunction<DeleteAddressMutation, DeleteAddressMutationVariables>;

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
export function useDeleteAddressMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAddressMutation, DeleteAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument, options);
      }
export type DeleteAddressMutationHookResult = ReturnType<typeof useDeleteAddressMutation>;
export type DeleteAddressMutationResult = Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<DeleteAddressMutation, DeleteAddressMutationVariables>;
export const GetAddressDetailsDocument = gql`
    query GetAddressDetails($provinceId: Int!, $districtId: Int!, $wardCode: String!) {
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
export function useGetAddressDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetAddressDetailsQuery, GetAddressDetailsQueryVariables> & ({ variables: GetAddressDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>(GetAddressDetailsDocument, options);
      }
export function useGetAddressDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>(GetAddressDetailsDocument, options);
        }
export function useGetAddressDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>(GetAddressDetailsDocument, options);
        }
export type GetAddressDetailsQueryHookResult = ReturnType<typeof useGetAddressDetailsQuery>;
export type GetAddressDetailsLazyQueryHookResult = ReturnType<typeof useGetAddressDetailsLazyQuery>;
export type GetAddressDetailsSuspenseQueryHookResult = ReturnType<typeof useGetAddressDetailsSuspenseQuery>;
export type GetAddressDetailsQueryResult = Apollo.QueryResult<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>;
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
export function useFormatAddressQuery(baseOptions: Apollo.QueryHookOptions<FormatAddressQuery, FormatAddressQueryVariables> & ({ variables: FormatAddressQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormatAddressQuery, FormatAddressQueryVariables>(FormatAddressDocument, options);
      }
export function useFormatAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormatAddressQuery, FormatAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormatAddressQuery, FormatAddressQueryVariables>(FormatAddressDocument, options);
        }
export function useFormatAddressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FormatAddressQuery, FormatAddressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FormatAddressQuery, FormatAddressQueryVariables>(FormatAddressDocument, options);
        }
export type FormatAddressQueryHookResult = ReturnType<typeof useFormatAddressQuery>;
export type FormatAddressLazyQueryHookResult = ReturnType<typeof useFormatAddressLazyQuery>;
export type FormatAddressSuspenseQueryHookResult = ReturnType<typeof useFormatAddressSuspenseQuery>;
export type FormatAddressQueryResult = Apollo.QueryResult<FormatAddressQuery, FormatAddressQueryVariables>;
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
      isVerified
      ownedFactory {
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
      isVerified
      ownedFactory {
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
      isVerified
      ownedFactory {
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
    isDeleted
    name
    phoneNumber
    role
    updatedAt
    isVerified
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
export const GetUserCartItemsDocument = gql`
    query GetUserCartItems {
  userCartItems {
    id
    quantity
    design {
      id
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
export function useGetUserCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>(GetUserCartItemsDocument, options);
      }
export function useGetUserCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>(GetUserCartItemsDocument, options);
        }
export function useGetUserCartItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>(GetUserCartItemsDocument, options);
        }
export type GetUserCartItemsQueryHookResult = ReturnType<typeof useGetUserCartItemsQuery>;
export type GetUserCartItemsLazyQueryHookResult = ReturnType<typeof useGetUserCartItemsLazyQuery>;
export type GetUserCartItemsSuspenseQueryHookResult = ReturnType<typeof useGetUserCartItemsSuspenseQuery>;
export type GetUserCartItemsQueryResult = Apollo.QueryResult<GetUserCartItemsQuery, GetUserCartItemsQueryVariables>;
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
export function useGetCartItemCountQuery(baseOptions?: Apollo.QueryHookOptions<GetCartItemCountQuery, GetCartItemCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartItemCountQuery, GetCartItemCountQueryVariables>(GetCartItemCountDocument, options);
      }
export function useGetCartItemCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartItemCountQuery, GetCartItemCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartItemCountQuery, GetCartItemCountQueryVariables>(GetCartItemCountDocument, options);
        }
export function useGetCartItemCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCartItemCountQuery, GetCartItemCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCartItemCountQuery, GetCartItemCountQueryVariables>(GetCartItemCountDocument, options);
        }
export type GetCartItemCountQueryHookResult = ReturnType<typeof useGetCartItemCountQuery>;
export type GetCartItemCountLazyQueryHookResult = ReturnType<typeof useGetCartItemCountLazyQuery>;
export type GetCartItemCountSuspenseQueryHookResult = ReturnType<typeof useGetCartItemCountSuspenseQuery>;
export type GetCartItemCountQueryResult = Apollo.QueryResult<GetCartItemCountQuery, GetCartItemCountQueryVariables>;
export const CreateCartItemDocument = gql`
    mutation CreateCartItem($createCartItemInput: CreateCartItemDto!) {
  createCartItem(createCartItemInput: $createCartItemInput) {
    userId
    id
    quantity
  }
}
    `;
export type CreateCartItemMutationFn = Apollo.MutationFunction<CreateCartItemMutation, CreateCartItemMutationVariables>;

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
export function useCreateCartItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateCartItemMutation, CreateCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCartItemMutation, CreateCartItemMutationVariables>(CreateCartItemDocument, options);
      }
export type CreateCartItemMutationHookResult = ReturnType<typeof useCreateCartItemMutation>;
export type CreateCartItemMutationResult = Apollo.MutationResult<CreateCartItemMutation>;
export type CreateCartItemMutationOptions = Apollo.BaseMutationOptions<CreateCartItemMutation, CreateCartItemMutationVariables>;
export const UpdateCartItemDocument = gql`
    mutation UpdateCartItem($updateCartItemId: String!, $updateCartItemInput: UpdateCartItemDto!) {
  updateCartItem(id: $updateCartItemId, updateCartItemInput: $updateCartItemInput) {
    userId
    id
    quantity
  }
}
    `;
export type UpdateCartItemMutationFn = Apollo.MutationFunction<UpdateCartItemMutation, UpdateCartItemMutationVariables>;

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
export function useUpdateCartItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartItemMutation, UpdateCartItemMutationVariables>(UpdateCartItemDocument, options);
      }
export type UpdateCartItemMutationHookResult = ReturnType<typeof useUpdateCartItemMutation>;
export type UpdateCartItemMutationResult = Apollo.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = Apollo.BaseMutationOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const DeleteCartItemDocument = gql`
    mutation DeleteCartItem($deleteCartItemId: String!) {
  deleteCartItem(id: $deleteCartItemId) {
    id
  }
}
    `;
export type DeleteCartItemMutationFn = Apollo.MutationFunction<DeleteCartItemMutation, DeleteCartItemMutationVariables>;

/**
 * __useDeleteCartItemMutation__
 *
 * To run a mutation, you first call `useDeleteCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCartItemMutation, { data, loading, error }] = useDeleteCartItemMutation({
 *   variables: {
 *      deleteCartItemId: // value for 'deleteCartItemId'
 *   },
 * });
 */
export function useDeleteCartItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument, options);
      }
export type DeleteCartItemMutationHookResult = ReturnType<typeof useDeleteCartItemMutation>;
export type DeleteCartItemMutationResult = Apollo.MutationResult<DeleteCartItemMutation>;
export type DeleteCartItemMutationOptions = Apollo.BaseMutationOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>;
export const CalculateShippingFeeDocument = gql`
    mutation CalculateShippingFee($input: CalculateShippingFeeDto!) {
  calculateShippingFee(input: $input) {
    total
  }
}
    `;
export type CalculateShippingFeeMutationFn = Apollo.MutationFunction<CalculateShippingFeeMutation, CalculateShippingFeeMutationVariables>;

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
export function useCalculateShippingFeeMutation(baseOptions?: Apollo.MutationHookOptions<CalculateShippingFeeMutation, CalculateShippingFeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CalculateShippingFeeMutation, CalculateShippingFeeMutationVariables>(CalculateShippingFeeDocument, options);
      }
export type CalculateShippingFeeMutationHookResult = ReturnType<typeof useCalculateShippingFeeMutation>;
export type CalculateShippingFeeMutationResult = Apollo.MutationResult<CalculateShippingFeeMutation>;
export type CalculateShippingFeeMutationOptions = Apollo.BaseMutationOptions<CalculateShippingFeeMutation, CalculateShippingFeeMutationVariables>;
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
export function useGetEnhancedManagerDashboardQuery(baseOptions?: Apollo.QueryHookOptions<GetEnhancedManagerDashboardQuery, GetEnhancedManagerDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEnhancedManagerDashboardQuery, GetEnhancedManagerDashboardQueryVariables>(GetEnhancedManagerDashboardDocument, options);
      }
export function useGetEnhancedManagerDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEnhancedManagerDashboardQuery, GetEnhancedManagerDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEnhancedManagerDashboardQuery, GetEnhancedManagerDashboardQueryVariables>(GetEnhancedManagerDashboardDocument, options);
        }
export function useGetEnhancedManagerDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEnhancedManagerDashboardQuery, GetEnhancedManagerDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEnhancedManagerDashboardQuery, GetEnhancedManagerDashboardQueryVariables>(GetEnhancedManagerDashboardDocument, options);
        }
export type GetEnhancedManagerDashboardQueryHookResult = ReturnType<typeof useGetEnhancedManagerDashboardQuery>;
export type GetEnhancedManagerDashboardLazyQueryHookResult = ReturnType<typeof useGetEnhancedManagerDashboardLazyQuery>;
export type GetEnhancedManagerDashboardSuspenseQueryHookResult = ReturnType<typeof useGetEnhancedManagerDashboardSuspenseQuery>;
export type GetEnhancedManagerDashboardQueryResult = Apollo.QueryResult<GetEnhancedManagerDashboardQuery, GetEnhancedManagerDashboardQueryVariables>;
export const GetManagerOrderDashboardDocument = gql`
    query GetManagerOrderDashboard {
  getManagerOrderDashboard {
    completedOrders
    inProductionOrders
    lastMonthCompletedOrders
    lastMonthInProductionOrders
    lastMonthOrders
    lastMonthPendingOrders
    pendingOrders
    totalOrders
  }
}
    `;

/**
 * __useGetManagerOrderDashboardQuery__
 *
 * To run a query within a React component, call `useGetManagerOrderDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManagerOrderDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManagerOrderDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetManagerOrderDashboardQuery(baseOptions?: Apollo.QueryHookOptions<GetManagerOrderDashboardQuery, GetManagerOrderDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManagerOrderDashboardQuery, GetManagerOrderDashboardQueryVariables>(GetManagerOrderDashboardDocument, options);
      }
export function useGetManagerOrderDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManagerOrderDashboardQuery, GetManagerOrderDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManagerOrderDashboardQuery, GetManagerOrderDashboardQueryVariables>(GetManagerOrderDashboardDocument, options);
        }
export function useGetManagerOrderDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManagerOrderDashboardQuery, GetManagerOrderDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManagerOrderDashboardQuery, GetManagerOrderDashboardQueryVariables>(GetManagerOrderDashboardDocument, options);
        }
export type GetManagerOrderDashboardQueryHookResult = ReturnType<typeof useGetManagerOrderDashboardQuery>;
export type GetManagerOrderDashboardLazyQueryHookResult = ReturnType<typeof useGetManagerOrderDashboardLazyQuery>;
export type GetManagerOrderDashboardSuspenseQueryHookResult = ReturnType<typeof useGetManagerOrderDashboardSuspenseQuery>;
export type GetManagerOrderDashboardQueryResult = Apollo.QueryResult<GetManagerOrderDashboardQuery, GetManagerOrderDashboardQueryVariables>;
export const GetFactoryDetailDashboardDocument = gql`
    query GetFactoryDetailDashboard($factoryId: String!) {
  getFactoryDetailDashboard(factoryId: $factoryId) {
    inProductionOrders
    lastMonthInProductionOrders
    lastMonthPendingOrders
    lastMonthTotalOrders
    lastMonthTotalRevenue
    pendingOrders
    productionProgress {
      id
      status
      createdAt
      totalProductionCost
    }
    qualityIssues {
      id
      reportedAt
      issueType
      status
      description
      factoryOrder {
        id
        status
      }
    }
    recentOrders {
      id
      status
      totalProductionCost
      createdAt
      customerOrder {
        id
        status
        totalPrice
      }
    }
    totalOrders
    totalRevenue
  }
}
    `;

/**
 * __useGetFactoryDetailDashboardQuery__
 *
 * To run a query within a React component, call `useGetFactoryDetailDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFactoryDetailDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFactoryDetailDashboardQuery({
 *   variables: {
 *      factoryId: // value for 'factoryId'
 *   },
 * });
 */
export function useGetFactoryDetailDashboardQuery(baseOptions: Apollo.QueryHookOptions<GetFactoryDetailDashboardQuery, GetFactoryDetailDashboardQueryVariables> & ({ variables: GetFactoryDetailDashboardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFactoryDetailDashboardQuery, GetFactoryDetailDashboardQueryVariables>(GetFactoryDetailDashboardDocument, options);
      }
export function useGetFactoryDetailDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFactoryDetailDashboardQuery, GetFactoryDetailDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFactoryDetailDashboardQuery, GetFactoryDetailDashboardQueryVariables>(GetFactoryDetailDashboardDocument, options);
        }
export function useGetFactoryDetailDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFactoryDetailDashboardQuery, GetFactoryDetailDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFactoryDetailDashboardQuery, GetFactoryDetailDashboardQueryVariables>(GetFactoryDetailDashboardDocument, options);
        }
export type GetFactoryDetailDashboardQueryHookResult = ReturnType<typeof useGetFactoryDetailDashboardQuery>;
export type GetFactoryDetailDashboardLazyQueryHookResult = ReturnType<typeof useGetFactoryDetailDashboardLazyQuery>;
export type GetFactoryDetailDashboardSuspenseQueryHookResult = ReturnType<typeof useGetFactoryDetailDashboardSuspenseQuery>;
export type GetFactoryDetailDashboardQueryResult = Apollo.QueryResult<GetFactoryDetailDashboardQuery, GetFactoryDetailDashboardQueryVariables>;
export const GetStaffDashboardDocument = gql`
    query GetStaffDashboard($userId: String!) {
  getStaffDashboard(userId: $userId) {
    activeTasks {
      id
      note
      startDate
      orderId
      status
      taskType
      taskname
      userId
      completedDate
      description
      assignedDate
    }
    completedTasks
    lastMonthActiveTasks
    lastMonthCompletedTasks
    taskHistory {
      id
      note
      startDate
      orderId
      status
      taskType
      taskname
      userId
      completedDate
      description
      assignedDate
    }
    totalActiveTasks
    totalTaskHistory
  }
  user(id: $userId) {
    id
    imageUrl
    isActive
    name
    phoneNumber
    role
    staffedFactory {
      name
      factoryOwnerId
      address {
        districtID
        factoryId
        provinceID
        street
        wardCode
      }
    }
    email
    deletedAt
    createdAt
    updatedAt
    gender
    dateOfBirth
  }
}
    `;

/**
 * __useGetStaffDashboardQuery__
 *
 * To run a query within a React component, call `useGetStaffDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffDashboardQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetStaffDashboardQuery(baseOptions: Apollo.QueryHookOptions<GetStaffDashboardQuery, GetStaffDashboardQueryVariables> & ({ variables: GetStaffDashboardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStaffDashboardQuery, GetStaffDashboardQueryVariables>(GetStaffDashboardDocument, options);
      }
export function useGetStaffDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStaffDashboardQuery, GetStaffDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStaffDashboardQuery, GetStaffDashboardQueryVariables>(GetStaffDashboardDocument, options);
        }
export function useGetStaffDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStaffDashboardQuery, GetStaffDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStaffDashboardQuery, GetStaffDashboardQueryVariables>(GetStaffDashboardDocument, options);
        }
export type GetStaffDashboardQueryHookResult = ReturnType<typeof useGetStaffDashboardQuery>;
export type GetStaffDashboardLazyQueryHookResult = ReturnType<typeof useGetStaffDashboardLazyQuery>;
export type GetStaffDashboardSuspenseQueryHookResult = ReturnType<typeof useGetStaffDashboardSuspenseQuery>;
export type GetStaffDashboardQueryResult = Apollo.QueryResult<GetStaffDashboardQuery, GetStaffDashboardQueryVariables>;
export const GetAdminDashboardDocument = gql`
    query GetAdminDashboard {
  getAdminDashboard {
    activeFactories
    activeUsers
    activeUsersChange
    activeUsersChangeType
    factoryPerformance {
      factoryId
      orderCount
      totalRevenue
    }
    pendingOrders
    pendingOrdersChange
    pendingOrdersChangeType
    recentOrders {
      id
      orderDate
      status
      totalPrice
      factory {
        id
        name
        factoryStatus
      }
    }
    totalCustomers
    totalFactories
    totalOrders
    totalProducts
    totalProductsChange
    totalProductsChangeType
    totalRevenue
    totalSales
    totalSalesChange
    totalSalesChangeType
  }
}
    `;

/**
 * __useGetAdminDashboardQuery__
 *
 * To run a query within a React component, call `useGetAdminDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminDashboardQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>(GetAdminDashboardDocument, options);
      }
export function useGetAdminDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>(GetAdminDashboardDocument, options);
        }
export function useGetAdminDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>(GetAdminDashboardDocument, options);
        }
export type GetAdminDashboardQueryHookResult = ReturnType<typeof useGetAdminDashboardQuery>;
export type GetAdminDashboardLazyQueryHookResult = ReturnType<typeof useGetAdminDashboardLazyQuery>;
export type GetAdminDashboardSuspenseQueryHookResult = ReturnType<typeof useGetAdminDashboardSuspenseQuery>;
export type GetAdminDashboardQueryResult = Apollo.QueryResult<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>;
export const GetMyFactoryDashboardDocument = gql`
    query GetMyFactoryDashboard {
  getMyFactoryDashboard {
    inProductionOrders
    pendingOrders
    productionProgress {
      id
      status
      createdAt
      totalProductionCost
    }
    qualityIssues {
      id
      reportedAt
      status
      description
    }
    recentOrders {
      id
      status
      totalProductionCost
      createdAt
    }
    revenueData {
      month
      revenue
    }
    stats {
      legitPoints {
        percentChange
        isPositive
        value
      }
      monthlyRevenue {
        isPositive
        percentChange
        value
      }
      qualityScore {
        isPositive
        percentChange
        value
      }
      totalOrders {
        isPositive
        percentChange
        value
      }
    }
    totalOrders
    totalRevenue
  }
}
    `;

/**
 * __useGetMyFactoryDashboardQuery__
 *
 * To run a query within a React component, call `useGetMyFactoryDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFactoryDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFactoryDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyFactoryDashboardQuery(baseOptions?: Apollo.QueryHookOptions<GetMyFactoryDashboardQuery, GetMyFactoryDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyFactoryDashboardQuery, GetMyFactoryDashboardQueryVariables>(GetMyFactoryDashboardDocument, options);
      }
export function useGetMyFactoryDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFactoryDashboardQuery, GetMyFactoryDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyFactoryDashboardQuery, GetMyFactoryDashboardQueryVariables>(GetMyFactoryDashboardDocument, options);
        }
export function useGetMyFactoryDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyFactoryDashboardQuery, GetMyFactoryDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyFactoryDashboardQuery, GetMyFactoryDashboardQueryVariables>(GetMyFactoryDashboardDocument, options);
        }
export type GetMyFactoryDashboardQueryHookResult = ReturnType<typeof useGetMyFactoryDashboardQuery>;
export type GetMyFactoryDashboardLazyQueryHookResult = ReturnType<typeof useGetMyFactoryDashboardLazyQuery>;
export type GetMyFactoryDashboardSuspenseQueryHookResult = ReturnType<typeof useGetMyFactoryDashboardSuspenseQuery>;
export type GetMyFactoryDashboardQueryResult = Apollo.QueryResult<GetMyFactoryDashboardQuery, GetMyFactoryDashboardQueryVariables>;
export const GetMyStaffDashboardDocument = gql`
    query GetMyStaffDashboard {
  getMyStaffDashboard {
    currentFactory {
      address
      id
      leadTime
      name
      productionCapacity
      status
    }
    recentOrders {
      customer
      date
      id
      priority
      status
      total
    }
    stats {
      activeTasks {
        percentChange
        isPositive
        value
      }
      completedTasks {
        isPositive
        percentChange
        value
      }
      deliveredOrders {
        isPositive
        percentChange
        value
      }
      pendingOrders {
        isPositive
        percentChange
        value
      }
    }
  }
}
    `;

/**
 * __useGetMyStaffDashboardQuery__
 *
 * To run a query within a React component, call `useGetMyStaffDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyStaffDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyStaffDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyStaffDashboardQuery(baseOptions?: Apollo.QueryHookOptions<GetMyStaffDashboardQuery, GetMyStaffDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyStaffDashboardQuery, GetMyStaffDashboardQueryVariables>(GetMyStaffDashboardDocument, options);
      }
export function useGetMyStaffDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyStaffDashboardQuery, GetMyStaffDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyStaffDashboardQuery, GetMyStaffDashboardQueryVariables>(GetMyStaffDashboardDocument, options);
        }
export function useGetMyStaffDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyStaffDashboardQuery, GetMyStaffDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyStaffDashboardQuery, GetMyStaffDashboardQueryVariables>(GetMyStaffDashboardDocument, options);
        }
export type GetMyStaffDashboardQueryHookResult = ReturnType<typeof useGetMyStaffDashboardQuery>;
export type GetMyStaffDashboardLazyQueryHookResult = ReturnType<typeof useGetMyStaffDashboardLazyQuery>;
export type GetMyStaffDashboardSuspenseQueryHookResult = ReturnType<typeof useGetMyStaffDashboardSuspenseQuery>;
export type GetMyStaffDashboardQueryResult = Apollo.QueryResult<GetMyStaffDashboardQuery, GetMyStaffDashboardQueryVariables>;
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
export type UpdateDesignPositionMutationFn = Apollo.MutationFunction<UpdateDesignPositionMutation, UpdateDesignPositionMutationVariables>;

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
export function useUpdateDesignPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDesignPositionMutation, UpdateDesignPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDesignPositionMutation, UpdateDesignPositionMutationVariables>(UpdateDesignPositionDocument, options);
      }
export type UpdateDesignPositionMutationHookResult = ReturnType<typeof useUpdateDesignPositionMutation>;
export type UpdateDesignPositionMutationResult = Apollo.MutationResult<UpdateDesignPositionMutation>;
export type UpdateDesignPositionMutationOptions = Apollo.BaseMutationOptions<UpdateDesignPositionMutation, UpdateDesignPositionMutationVariables>;
export const GetMyFactoryDocument = gql`
    query GetMyFactory {
  getMyFactory {
    address {
      id
      districtID
      provinceID
      street
      wardCode
      formattedAddress
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
export function useGetFactoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetFactoriesQuery, GetFactoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFactoriesQuery, GetFactoriesQueryVariables>(GetFactoriesDocument, options);
      }
export function useGetFactoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFactoriesQuery, GetFactoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFactoriesQuery, GetFactoriesQueryVariables>(GetFactoriesDocument, options);
        }
export function useGetFactoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFactoriesQuery, GetFactoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFactoriesQuery, GetFactoriesQueryVariables>(GetFactoriesDocument, options);
        }
export type GetFactoriesQueryHookResult = ReturnType<typeof useGetFactoriesQuery>;
export type GetFactoriesLazyQueryHookResult = ReturnType<typeof useGetFactoriesLazyQuery>;
export type GetFactoriesSuspenseQueryHookResult = ReturnType<typeof useGetFactoriesSuspenseQuery>;
export type GetFactoriesQueryResult = Apollo.QueryResult<GetFactoriesQuery, GetFactoriesQueryVariables>;
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
export function useGetFactoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFactoryByIdQuery, GetFactoryByIdQueryVariables> & ({ variables: GetFactoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>(GetFactoryByIdDocument, options);
      }
export function useGetFactoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>(GetFactoryByIdDocument, options);
        }
export function useGetFactoryByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>(GetFactoryByIdDocument, options);
        }
export type GetFactoryByIdQueryHookResult = ReturnType<typeof useGetFactoryByIdQuery>;
export type GetFactoryByIdLazyQueryHookResult = ReturnType<typeof useGetFactoryByIdLazyQuery>;
export type GetFactoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetFactoryByIdSuspenseQuery>;
export type GetFactoryByIdQueryResult = Apollo.QueryResult<GetFactoryByIdQuery, GetFactoryByIdQueryVariables>;
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
export const ChangeFactoryStatusDocument = gql`
    mutation ChangeFactoryStatus($data: UpdateFactoryStatusDto!) {
  changeFactoryStatus(data: $data) {
    factoryStatus
  }
}
    `;
export type ChangeFactoryStatusMutationFn = Apollo.MutationFunction<ChangeFactoryStatusMutation, ChangeFactoryStatusMutationVariables>;

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
export function useChangeFactoryStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeFactoryStatusMutation, ChangeFactoryStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeFactoryStatusMutation, ChangeFactoryStatusMutationVariables>(ChangeFactoryStatusDocument, options);
      }
export type ChangeFactoryStatusMutationHookResult = ReturnType<typeof useChangeFactoryStatusMutation>;
export type ChangeFactoryStatusMutationResult = Apollo.MutationResult<ChangeFactoryStatusMutation>;
export type ChangeFactoryStatusMutationOptions = Apollo.BaseMutationOptions<ChangeFactoryStatusMutation, ChangeFactoryStatusMutationVariables>;
export const ChangeFactoryStaffDocument = gql`
    mutation ChangeFactoryStaff($factoryId: String!, $newStaffId: String!) {
  changeFactoryStaff(factoryId: $factoryId, newStaffId: $newStaffId) {
    staff {
      id
      imageUrl
      name
      role
      email
    }
  }
}
    `;
export type ChangeFactoryStaffMutationFn = Apollo.MutationFunction<ChangeFactoryStaffMutation, ChangeFactoryStaffMutationVariables>;

/**
 * __useChangeFactoryStaffMutation__
 *
 * To run a mutation, you first call `useChangeFactoryStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFactoryStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFactoryStaffMutation, { data, loading, error }] = useChangeFactoryStaffMutation({
 *   variables: {
 *      factoryId: // value for 'factoryId'
 *      newStaffId: // value for 'newStaffId'
 *   },
 * });
 */
export function useChangeFactoryStaffMutation(baseOptions?: Apollo.MutationHookOptions<ChangeFactoryStaffMutation, ChangeFactoryStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeFactoryStaffMutation, ChangeFactoryStaffMutationVariables>(ChangeFactoryStaffDocument, options);
      }
export type ChangeFactoryStaffMutationHookResult = ReturnType<typeof useChangeFactoryStaffMutation>;
export type ChangeFactoryStaffMutationResult = Apollo.MutationResult<ChangeFactoryStaffMutation>;
export type ChangeFactoryStaffMutationOptions = Apollo.BaseMutationOptions<ChangeFactoryStaffMutation, ChangeFactoryStaffMutationVariables>;
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
export function useMyNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, options);
      }
export function useMyNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, options);
        }
export function useMyNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, options);
        }
export type MyNotificationsQueryHookResult = ReturnType<typeof useMyNotificationsQuery>;
export type MyNotificationsLazyQueryHookResult = ReturnType<typeof useMyNotificationsLazyQuery>;
export type MyNotificationsSuspenseQueryHookResult = ReturnType<typeof useMyNotificationsSuspenseQuery>;
export type MyNotificationsQueryResult = Apollo.QueryResult<MyNotificationsQuery, MyNotificationsQueryVariables>;
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
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

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
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const CreatePaymentGatewayUrlDocument = gql`
    mutation CreatePaymentGatewayUrl($gateway: String!, $paymentId: String!) {
  createPayment(gateway: $gateway, paymentId: $paymentId)
}
    `;
export type CreatePaymentGatewayUrlMutationFn = Apollo.MutationFunction<CreatePaymentGatewayUrlMutation, CreatePaymentGatewayUrlMutationVariables>;

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
export function useCreatePaymentGatewayUrlMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentGatewayUrlMutation, CreatePaymentGatewayUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentGatewayUrlMutation, CreatePaymentGatewayUrlMutationVariables>(CreatePaymentGatewayUrlDocument, options);
      }
export type CreatePaymentGatewayUrlMutationHookResult = ReturnType<typeof useCreatePaymentGatewayUrlMutation>;
export type CreatePaymentGatewayUrlMutationResult = Apollo.MutationResult<CreatePaymentGatewayUrlMutation>;
export type CreatePaymentGatewayUrlMutationOptions = Apollo.BaseMutationOptions<CreatePaymentGatewayUrlMutation, CreatePaymentGatewayUrlMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($createOrderInput: CreateOrderInput!) {
  createOrder(createOrderInput: $createOrderInput) {
    id
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

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
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
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
      systemConfigVariant {
        id
        isActive
        isDeleted
        price
        color
        size
        model
        product {
          name
          imageUrl
        }
      }
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
        imageUrls
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
export function useGetMyOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
      }
export function useGetMyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export function useGetMyOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>;
export type GetMyOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOrdersLazyQuery>;
export type GetMyOrdersSuspenseQueryHookResult = ReturnType<typeof useGetMyOrdersSuspenseQuery>;
export type GetMyOrdersQueryResult = Apollo.QueryResult<GetMyOrdersQuery, GetMyOrdersQueryVariables>;
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
      systemConfigVariant {
        id
        isActive
        isDeleted
        price
        color
        size
        model
        product {
          name
          imageUrl
        }
      }
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
        imageUrls
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
export function useGetMyFactoryOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyFactoryOrdersQuery, GetMyFactoryOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyFactoryOrdersQuery, GetMyFactoryOrdersQueryVariables>(GetMyFactoryOrdersDocument, options);
      }
export function useGetMyFactoryOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFactoryOrdersQuery, GetMyFactoryOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyFactoryOrdersQuery, GetMyFactoryOrdersQueryVariables>(GetMyFactoryOrdersDocument, options);
        }
export function useGetMyFactoryOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyFactoryOrdersQuery, GetMyFactoryOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyFactoryOrdersQuery, GetMyFactoryOrdersQueryVariables>(GetMyFactoryOrdersDocument, options);
        }
export type GetMyFactoryOrdersQueryHookResult = ReturnType<typeof useGetMyFactoryOrdersQuery>;
export type GetMyFactoryOrdersLazyQueryHookResult = ReturnType<typeof useGetMyFactoryOrdersLazyQuery>;
export type GetMyFactoryOrdersSuspenseQueryHookResult = ReturnType<typeof useGetMyFactoryOrdersSuspenseQuery>;
export type GetMyFactoryOrdersQueryResult = Apollo.QueryResult<GetMyFactoryOrdersQuery, GetMyFactoryOrdersQueryVariables>;
export const GetOrdersByFactoryIdDocument = gql`
    query GetOrdersByFactoryId($factoryId: String!) {
  ordersByFactoryId(factoryId: $factoryId) {
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
      systemConfigVariant {
        id
        isActive
        isDeleted
        price
        color
        size
        model
        product {
          name
          imageUrl
        }
      }
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
        imageUrls
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
 * __useGetOrdersByFactoryIdQuery__
 *
 * To run a query within a React component, call `useGetOrdersByFactoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersByFactoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersByFactoryIdQuery({
 *   variables: {
 *      factoryId: // value for 'factoryId'
 *   },
 * });
 */
export function useGetOrdersByFactoryIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersByFactoryIdQuery, GetOrdersByFactoryIdQueryVariables> & ({ variables: GetOrdersByFactoryIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersByFactoryIdQuery, GetOrdersByFactoryIdQueryVariables>(GetOrdersByFactoryIdDocument, options);
      }
export function useGetOrdersByFactoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersByFactoryIdQuery, GetOrdersByFactoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersByFactoryIdQuery, GetOrdersByFactoryIdQueryVariables>(GetOrdersByFactoryIdDocument, options);
        }
export function useGetOrdersByFactoryIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrdersByFactoryIdQuery, GetOrdersByFactoryIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersByFactoryIdQuery, GetOrdersByFactoryIdQueryVariables>(GetOrdersByFactoryIdDocument, options);
        }
export type GetOrdersByFactoryIdQueryHookResult = ReturnType<typeof useGetOrdersByFactoryIdQuery>;
export type GetOrdersByFactoryIdLazyQueryHookResult = ReturnType<typeof useGetOrdersByFactoryIdLazyQuery>;
export type GetOrdersByFactoryIdSuspenseQueryHookResult = ReturnType<typeof useGetOrdersByFactoryIdSuspenseQuery>;
export type GetOrdersByFactoryIdQueryResult = Apollo.QueryResult<GetOrdersByFactoryIdQuery, GetOrdersByFactoryIdQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($orderId: String!) {
  order(id: $orderId) {
    acceptanceDeadline
    acceptedAt
    orderCode
    address {
      districtID
      factoryId
      id
      provinceID
      street
      wardCode
      formattedAddress
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
      address {
        districtID
        street
        id
        provinceID
        wardCode
        formattedAddress
      }
    }
    id
    isDelayed
    orderDate
    orderDetails {
      systemConfigVariant {
        id
        isActive
        isDeleted
        price
        color
        size
        model
        product {
          name
          imageUrl
        }
      }
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
        imageUrls
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
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables> & ({ variables: GetOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export function useGetOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderSuspenseQueryHookResult = ReturnType<typeof useGetOrderSuspenseQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
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
      systemConfigVariant {
        id
        isActive
        isDeleted
        price
        color
        size
        model
        product {
          name
          imageUrl
        }
      }
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
        imageUrls
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
export function useGetAllOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export function useGetAllOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersSuspenseQueryHookResult = ReturnType<typeof useGetAllOrdersSuspenseQuery>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
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
      systemConfigVariant {
        id
        isActive
        isDeleted
        price
        color
        size
        model
        product {
          name
          imageUrl
        }
      }
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
        imageUrls
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
export function useGetMyStaffOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>(GetMyStaffOrdersDocument, options);
      }
export function useGetMyStaffOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>(GetMyStaffOrdersDocument, options);
        }
export function useGetMyStaffOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>(GetMyStaffOrdersDocument, options);
        }
export type GetMyStaffOrdersQueryHookResult = ReturnType<typeof useGetMyStaffOrdersQuery>;
export type GetMyStaffOrdersLazyQueryHookResult = ReturnType<typeof useGetMyStaffOrdersLazyQuery>;
export type GetMyStaffOrdersSuspenseQueryHookResult = ReturnType<typeof useGetMyStaffOrdersSuspenseQuery>;
export type GetMyStaffOrdersQueryResult = Apollo.QueryResult<GetMyStaffOrdersQuery, GetMyStaffOrdersQueryVariables>;
export const AcceptOrderForFactoryDocument = gql`
    mutation AcceptOrderForFactory($orderId: String!) {
  acceptOrderForFactory(orderId: $orderId) {
    id
  }
}
    `;
export type AcceptOrderForFactoryMutationFn = Apollo.MutationFunction<AcceptOrderForFactoryMutation, AcceptOrderForFactoryMutationVariables>;

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
export function useAcceptOrderForFactoryMutation(baseOptions?: Apollo.MutationHookOptions<AcceptOrderForFactoryMutation, AcceptOrderForFactoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptOrderForFactoryMutation, AcceptOrderForFactoryMutationVariables>(AcceptOrderForFactoryDocument, options);
      }
export type AcceptOrderForFactoryMutationHookResult = ReturnType<typeof useAcceptOrderForFactoryMutation>;
export type AcceptOrderForFactoryMutationResult = Apollo.MutationResult<AcceptOrderForFactoryMutation>;
export type AcceptOrderForFactoryMutationOptions = Apollo.BaseMutationOptions<AcceptOrderForFactoryMutation, AcceptOrderForFactoryMutationVariables>;
export const RejectOrderDocument = gql`
    mutation RejectOrder($orderId: String!, $reason: String!) {
  rejectOrder(orderId: $orderId, reason: $reason) {
    id
  }
}
    `;
export type RejectOrderMutationFn = Apollo.MutationFunction<RejectOrderMutation, RejectOrderMutationVariables>;

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
export function useRejectOrderMutation(baseOptions?: Apollo.MutationHookOptions<RejectOrderMutation, RejectOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectOrderMutation, RejectOrderMutationVariables>(RejectOrderDocument, options);
      }
export type RejectOrderMutationHookResult = ReturnType<typeof useRejectOrderMutation>;
export type RejectOrderMutationResult = Apollo.MutationResult<RejectOrderMutation>;
export type RejectOrderMutationOptions = Apollo.BaseMutationOptions<RejectOrderMutation, RejectOrderMutationVariables>;
export const DoneProductionOrderDetailsDocument = gql`
    mutation DoneProductionOrderDetails($orderDetailId: String!) {
  doneProductionOrderDetails(orderDetailId: $orderDetailId) {
    id
  }
}
    `;
export type DoneProductionOrderDetailsMutationFn = Apollo.MutationFunction<DoneProductionOrderDetailsMutation, DoneProductionOrderDetailsMutationVariables>;

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
export function useDoneProductionOrderDetailsMutation(baseOptions?: Apollo.MutationHookOptions<DoneProductionOrderDetailsMutation, DoneProductionOrderDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoneProductionOrderDetailsMutation, DoneProductionOrderDetailsMutationVariables>(DoneProductionOrderDetailsDocument, options);
      }
export type DoneProductionOrderDetailsMutationHookResult = ReturnType<typeof useDoneProductionOrderDetailsMutation>;
export type DoneProductionOrderDetailsMutationResult = Apollo.MutationResult<DoneProductionOrderDetailsMutation>;
export type DoneProductionOrderDetailsMutationOptions = Apollo.BaseMutationOptions<DoneProductionOrderDetailsMutation, DoneProductionOrderDetailsMutationVariables>;
export const StartReworkDocument = gql`
    mutation StartRework($orderId: String!) {
  startRework(orderId: $orderId) {
    id
  }
}
    `;
export type StartReworkMutationFn = Apollo.MutationFunction<StartReworkMutation, StartReworkMutationVariables>;

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
export function useStartReworkMutation(baseOptions?: Apollo.MutationHookOptions<StartReworkMutation, StartReworkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartReworkMutation, StartReworkMutationVariables>(StartReworkDocument, options);
      }
export type StartReworkMutationHookResult = ReturnType<typeof useStartReworkMutation>;
export type StartReworkMutationResult = Apollo.MutationResult<StartReworkMutation>;
export type StartReworkMutationOptions = Apollo.BaseMutationOptions<StartReworkMutation, StartReworkMutationVariables>;
export const DoneReworkForOrderDetailsDocument = gql`
    mutation DoneReworkForOrderDetails($orderDetailId: String!) {
  doneReworkForOrderDetails(orderDetailId: $orderDetailId) {
    id
  }
}
    `;
export type DoneReworkForOrderDetailsMutationFn = Apollo.MutationFunction<DoneReworkForOrderDetailsMutation, DoneReworkForOrderDetailsMutationVariables>;

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
export function useDoneReworkForOrderDetailsMutation(baseOptions?: Apollo.MutationHookOptions<DoneReworkForOrderDetailsMutation, DoneReworkForOrderDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoneReworkForOrderDetailsMutation, DoneReworkForOrderDetailsMutationVariables>(DoneReworkForOrderDetailsDocument, options);
      }
export type DoneReworkForOrderDetailsMutationHookResult = ReturnType<typeof useDoneReworkForOrderDetailsMutation>;
export type DoneReworkForOrderDetailsMutationResult = Apollo.MutationResult<DoneReworkForOrderDetailsMutation>;
export type DoneReworkForOrderDetailsMutationOptions = Apollo.BaseMutationOptions<DoneReworkForOrderDetailsMutation, DoneReworkForOrderDetailsMutationVariables>;
export const DoneCheckQualityDocument = gql`
    mutation DoneCheckQuality($input: DoneCheckQualityInput!) {
  doneCheckQuality(input: $input) {
    id
  }
}
    `;
export type DoneCheckQualityMutationFn = Apollo.MutationFunction<DoneCheckQualityMutation, DoneCheckQualityMutationVariables>;

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
export function useDoneCheckQualityMutation(baseOptions?: Apollo.MutationHookOptions<DoneCheckQualityMutation, DoneCheckQualityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoneCheckQualityMutation, DoneCheckQualityMutationVariables>(DoneCheckQualityDocument, options);
      }
export type DoneCheckQualityMutationHookResult = ReturnType<typeof useDoneCheckQualityMutation>;
export type DoneCheckQualityMutationResult = Apollo.MutationResult<DoneCheckQualityMutation>;
export type DoneCheckQualityMutationOptions = Apollo.BaseMutationOptions<DoneCheckQualityMutation, DoneCheckQualityMutationVariables>;
export const ShippedOrderDocument = gql`
    mutation ShippedOrder($orderId: String!) {
  shippedOrder(orderId: $orderId) {
    id
  }
}
    `;
export type ShippedOrderMutationFn = Apollo.MutationFunction<ShippedOrderMutation, ShippedOrderMutationVariables>;

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
export function useShippedOrderMutation(baseOptions?: Apollo.MutationHookOptions<ShippedOrderMutation, ShippedOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShippedOrderMutation, ShippedOrderMutationVariables>(ShippedOrderDocument, options);
      }
export type ShippedOrderMutationHookResult = ReturnType<typeof useShippedOrderMutation>;
export type ShippedOrderMutationResult = Apollo.MutationResult<ShippedOrderMutation>;
export type ShippedOrderMutationOptions = Apollo.BaseMutationOptions<ShippedOrderMutation, ShippedOrderMutationVariables>;
export const ChangeOrderToShippingDocument = gql`
    mutation ChangeOrderToShipping($orderId: String!) {
  changeOrderToShipping(orderId: $orderId) {
    id
  }
}
    `;
export type ChangeOrderToShippingMutationFn = Apollo.MutationFunction<ChangeOrderToShippingMutation, ChangeOrderToShippingMutationVariables>;

/**
 * __useChangeOrderToShippingMutation__
 *
 * To run a mutation, you first call `useChangeOrderToShippingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrderToShippingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrderToShippingMutation, { data, loading, error }] = useChangeOrderToShippingMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useChangeOrderToShippingMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrderToShippingMutation, ChangeOrderToShippingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrderToShippingMutation, ChangeOrderToShippingMutationVariables>(ChangeOrderToShippingDocument, options);
      }
export type ChangeOrderToShippingMutationHookResult = ReturnType<typeof useChangeOrderToShippingMutation>;
export type ChangeOrderToShippingMutationResult = Apollo.MutationResult<ChangeOrderToShippingMutation>;
export type ChangeOrderToShippingMutationOptions = Apollo.BaseMutationOptions<ChangeOrderToShippingMutation, ChangeOrderToShippingMutationVariables>;
export const FeedbackOrderDocument = gql`
    mutation FeedbackOrder($input: FeedbackOrderInput!, $orderId: String!) {
  feedbackOrder(input: $input, orderId: $orderId) {
    id
  }
}
    `;
export type FeedbackOrderMutationFn = Apollo.MutationFunction<FeedbackOrderMutation, FeedbackOrderMutationVariables>;

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
export function useFeedbackOrderMutation(baseOptions?: Apollo.MutationHookOptions<FeedbackOrderMutation, FeedbackOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FeedbackOrderMutation, FeedbackOrderMutationVariables>(FeedbackOrderDocument, options);
      }
export type FeedbackOrderMutationHookResult = ReturnType<typeof useFeedbackOrderMutation>;
export type FeedbackOrderMutationResult = Apollo.MutationResult<FeedbackOrderMutation>;
export type FeedbackOrderMutationOptions = Apollo.BaseMutationOptions<FeedbackOrderMutation, FeedbackOrderMutationVariables>;
export const AddOrderProgressReportDocument = gql`
    mutation AddOrderProgressReport($input: AddOrderProgressReportInput!) {
  addOrderProgressReport(input: $input) {
    id
  }
}
    `;
export type AddOrderProgressReportMutationFn = Apollo.MutationFunction<AddOrderProgressReportMutation, AddOrderProgressReportMutationVariables>;

/**
 * __useAddOrderProgressReportMutation__
 *
 * To run a mutation, you first call `useAddOrderProgressReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrderProgressReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrderProgressReportMutation, { data, loading, error }] = useAddOrderProgressReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOrderProgressReportMutation(baseOptions?: Apollo.MutationHookOptions<AddOrderProgressReportMutation, AddOrderProgressReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrderProgressReportMutation, AddOrderProgressReportMutationVariables>(AddOrderProgressReportDocument, options);
      }
export type AddOrderProgressReportMutationHookResult = ReturnType<typeof useAddOrderProgressReportMutation>;
export type AddOrderProgressReportMutationResult = Apollo.MutationResult<AddOrderProgressReportMutation>;
export type AddOrderProgressReportMutationOptions = Apollo.BaseMutationOptions<AddOrderProgressReportMutation, AddOrderProgressReportMutationVariables>;
export const CreateRefundForOrderDocument = gql`
    mutation CreateRefundForOrder($orderId: String!, $reason: String!) {
  createRefundForOrder(orderId: $orderId, reason: $reason) {
    id
  }
}
    `;
export type CreateRefundForOrderMutationFn = Apollo.MutationFunction<CreateRefundForOrderMutation, CreateRefundForOrderMutationVariables>;

/**
 * __useCreateRefundForOrderMutation__
 *
 * To run a mutation, you first call `useCreateRefundForOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRefundForOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRefundForOrderMutation, { data, loading, error }] = useCreateRefundForOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCreateRefundForOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateRefundForOrderMutation, CreateRefundForOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRefundForOrderMutation, CreateRefundForOrderMutationVariables>(CreateRefundForOrderDocument, options);
      }
export type CreateRefundForOrderMutationHookResult = ReturnType<typeof useCreateRefundForOrderMutation>;
export type CreateRefundForOrderMutationResult = Apollo.MutationResult<CreateRefundForOrderMutation>;
export type CreateRefundForOrderMutationOptions = Apollo.BaseMutationOptions<CreateRefundForOrderMutation, CreateRefundForOrderMutationVariables>;
export const ProcessWithdrawalDocument = gql`
    mutation ProcessWithdrawal($imageUrls: [String!]!, $paymentId: String!, $userBankId: String!) {
  processWithdrawal(
    imageUrls: $imageUrls
    paymentId: $paymentId
    userBankId: $userBankId
  )
}
    `;
export type ProcessWithdrawalMutationFn = Apollo.MutationFunction<ProcessWithdrawalMutation, ProcessWithdrawalMutationVariables>;

/**
 * __useProcessWithdrawalMutation__
 *
 * To run a mutation, you first call `useProcessWithdrawalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProcessWithdrawalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [processWithdrawalMutation, { data, loading, error }] = useProcessWithdrawalMutation({
 *   variables: {
 *      imageUrls: // value for 'imageUrls'
 *      paymentId: // value for 'paymentId'
 *      userBankId: // value for 'userBankId'
 *   },
 * });
 */
export function useProcessWithdrawalMutation(baseOptions?: Apollo.MutationHookOptions<ProcessWithdrawalMutation, ProcessWithdrawalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProcessWithdrawalMutation, ProcessWithdrawalMutationVariables>(ProcessWithdrawalDocument, options);
      }
export type ProcessWithdrawalMutationHookResult = ReturnType<typeof useProcessWithdrawalMutation>;
export type ProcessWithdrawalMutationResult = Apollo.MutationResult<ProcessWithdrawalMutation>;
export type ProcessWithdrawalMutationOptions = Apollo.BaseMutationOptions<ProcessWithdrawalMutation, ProcessWithdrawalMutationVariables>;
export const StartReworkByManagerDocument = gql`
    mutation StartReworkByManager($orderId: String!) {
  startReworkByManager(orderId: $orderId) {
    id
  }
}
    `;
export type StartReworkByManagerMutationFn = Apollo.MutationFunction<StartReworkByManagerMutation, StartReworkByManagerMutationVariables>;

/**
 * __useStartReworkByManagerMutation__
 *
 * To run a mutation, you first call `useStartReworkByManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartReworkByManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startReworkByManagerMutation, { data, loading, error }] = useStartReworkByManagerMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useStartReworkByManagerMutation(baseOptions?: Apollo.MutationHookOptions<StartReworkByManagerMutation, StartReworkByManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartReworkByManagerMutation, StartReworkByManagerMutationVariables>(StartReworkByManagerDocument, options);
      }
export type StartReworkByManagerMutationHookResult = ReturnType<typeof useStartReworkByManagerMutation>;
export type StartReworkByManagerMutationResult = Apollo.MutationResult<StartReworkByManagerMutation>;
export type StartReworkByManagerMutationOptions = Apollo.BaseMutationOptions<StartReworkByManagerMutation, StartReworkByManagerMutationVariables>;
export const AssignFactoryToOrderDocument = gql`
    mutation AssignFactoryToOrder($factoryId: String!, $orderId: String!) {
  assignFactoryToOrder(factoryId: $factoryId, orderId: $orderId) {
    id
  }
}
    `;
export type AssignFactoryToOrderMutationFn = Apollo.MutationFunction<AssignFactoryToOrderMutation, AssignFactoryToOrderMutationVariables>;

/**
 * __useAssignFactoryToOrderMutation__
 *
 * To run a mutation, you first call `useAssignFactoryToOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignFactoryToOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignFactoryToOrderMutation, { data, loading, error }] = useAssignFactoryToOrderMutation({
 *   variables: {
 *      factoryId: // value for 'factoryId'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useAssignFactoryToOrderMutation(baseOptions?: Apollo.MutationHookOptions<AssignFactoryToOrderMutation, AssignFactoryToOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignFactoryToOrderMutation, AssignFactoryToOrderMutationVariables>(AssignFactoryToOrderDocument, options);
      }
export type AssignFactoryToOrderMutationHookResult = ReturnType<typeof useAssignFactoryToOrderMutation>;
export type AssignFactoryToOrderMutationResult = Apollo.MutationResult<AssignFactoryToOrderMutation>;
export type AssignFactoryToOrderMutationOptions = Apollo.BaseMutationOptions<AssignFactoryToOrderMutation, AssignFactoryToOrderMutationVariables>;
export const CalculateShippingCostAndFactoryForCartDocument = gql`
    mutation CalculateShippingCostAndFactoryForCart($input: CalculateShippingCostAndFactoryDto!) {
  calculateShippingCostAndFactoryForCart(input: $input) {
    shippingFee {
      total
    }
    selectedFactory {
      name
      address {
        formattedAddress
      }
    }
  }
}
    `;
export type CalculateShippingCostAndFactoryForCartMutationFn = Apollo.MutationFunction<CalculateShippingCostAndFactoryForCartMutation, CalculateShippingCostAndFactoryForCartMutationVariables>;

/**
 * __useCalculateShippingCostAndFactoryForCartMutation__
 *
 * To run a mutation, you first call `useCalculateShippingCostAndFactoryForCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCalculateShippingCostAndFactoryForCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [calculateShippingCostAndFactoryForCartMutation, { data, loading, error }] = useCalculateShippingCostAndFactoryForCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCalculateShippingCostAndFactoryForCartMutation(baseOptions?: Apollo.MutationHookOptions<CalculateShippingCostAndFactoryForCartMutation, CalculateShippingCostAndFactoryForCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CalculateShippingCostAndFactoryForCartMutation, CalculateShippingCostAndFactoryForCartMutationVariables>(CalculateShippingCostAndFactoryForCartDocument, options);
      }
export type CalculateShippingCostAndFactoryForCartMutationHookResult = ReturnType<typeof useCalculateShippingCostAndFactoryForCartMutation>;
export type CalculateShippingCostAndFactoryForCartMutationResult = Apollo.MutationResult<CalculateShippingCostAndFactoryForCartMutation>;
export type CalculateShippingCostAndFactoryForCartMutationOptions = Apollo.BaseMutationOptions<CalculateShippingCostAndFactoryForCartMutation, CalculateShippingCostAndFactoryForCartMutationVariables>;
export const FactoryScoresForOrderDocument = gql`
    query FactoryScoresForOrder($orderId: String!) {
  factoryScoresForOrder(orderId: $orderId) {
    factoryId
    factoryName
    scores {
      capacityScore
      leadTimeScore
      legitPointScore
      productionCapacityScore
      specializationScore
    }
    totalScore
    weights {
      capacity
      leadTime
      legitPoint
      productionCapacity
      specialization
    }
  }
}
    `;

/**
 * __useFactoryScoresForOrderQuery__
 *
 * To run a query within a React component, call `useFactoryScoresForOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useFactoryScoresForOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFactoryScoresForOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useFactoryScoresForOrderQuery(baseOptions: Apollo.QueryHookOptions<FactoryScoresForOrderQuery, FactoryScoresForOrderQueryVariables> & ({ variables: FactoryScoresForOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FactoryScoresForOrderQuery, FactoryScoresForOrderQueryVariables>(FactoryScoresForOrderDocument, options);
      }
export function useFactoryScoresForOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FactoryScoresForOrderQuery, FactoryScoresForOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FactoryScoresForOrderQuery, FactoryScoresForOrderQueryVariables>(FactoryScoresForOrderDocument, options);
        }
export function useFactoryScoresForOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FactoryScoresForOrderQuery, FactoryScoresForOrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FactoryScoresForOrderQuery, FactoryScoresForOrderQueryVariables>(FactoryScoresForOrderDocument, options);
        }
export type FactoryScoresForOrderQueryHookResult = ReturnType<typeof useFactoryScoresForOrderQuery>;
export type FactoryScoresForOrderLazyQueryHookResult = ReturnType<typeof useFactoryScoresForOrderLazyQuery>;
export type FactoryScoresForOrderSuspenseQueryHookResult = ReturnType<typeof useFactoryScoresForOrderSuspenseQuery>;
export type FactoryScoresForOrderQueryResult = Apollo.QueryResult<FactoryScoresForOrderQuery, FactoryScoresForOrderQueryVariables>;
export const SpeedUpOrderDocument = gql`
    mutation SpeedUpOrder($orderId: String!) {
  speedUpOrder(orderId: $orderId) {
    id
  }
}
    `;
export type SpeedUpOrderMutationFn = Apollo.MutationFunction<SpeedUpOrderMutation, SpeedUpOrderMutationVariables>;

/**
 * __useSpeedUpOrderMutation__
 *
 * To run a mutation, you first call `useSpeedUpOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpeedUpOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [speedUpOrderMutation, { data, loading, error }] = useSpeedUpOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useSpeedUpOrderMutation(baseOptions?: Apollo.MutationHookOptions<SpeedUpOrderMutation, SpeedUpOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpeedUpOrderMutation, SpeedUpOrderMutationVariables>(SpeedUpOrderDocument, options);
      }
export type SpeedUpOrderMutationHookResult = ReturnType<typeof useSpeedUpOrderMutation>;
export type SpeedUpOrderMutationResult = Apollo.MutationResult<SpeedUpOrderMutation>;
export type SpeedUpOrderMutationOptions = Apollo.BaseMutationOptions<SpeedUpOrderMutation, SpeedUpOrderMutationVariables>;
export const OrderPriceDetailsDocument = gql`
    query OrderPriceDetails($orderId: String!) {
  orderPriceDetails(orderId: $orderId) {
    basePrice
    discountPercentage
    finalPrice
    priceAfterDiscount
    priceAfterVoucher
    shippingPrice
    voucher {
      code
      createdAt
      description
      id
      isPublic
      limitedUsage
      maxDiscountValue
      minOrderValue
      type
      updatedAt
      userId
      value
    }
  }
}
    `;

/**
 * __useOrderPriceDetailsQuery__
 *
 * To run a query within a React component, call `useOrderPriceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderPriceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderPriceDetailsQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useOrderPriceDetailsQuery(baseOptions: Apollo.QueryHookOptions<OrderPriceDetailsQuery, OrderPriceDetailsQueryVariables> & ({ variables: OrderPriceDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderPriceDetailsQuery, OrderPriceDetailsQueryVariables>(OrderPriceDetailsDocument, options);
      }
export function useOrderPriceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderPriceDetailsQuery, OrderPriceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderPriceDetailsQuery, OrderPriceDetailsQueryVariables>(OrderPriceDetailsDocument, options);
        }
export function useOrderPriceDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderPriceDetailsQuery, OrderPriceDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderPriceDetailsQuery, OrderPriceDetailsQueryVariables>(OrderPriceDetailsDocument, options);
        }
export type OrderPriceDetailsQueryHookResult = ReturnType<typeof useOrderPriceDetailsQuery>;
export type OrderPriceDetailsLazyQueryHookResult = ReturnType<typeof useOrderPriceDetailsLazyQuery>;
export type OrderPriceDetailsSuspenseQueryHookResult = ReturnType<typeof useOrderPriceDetailsSuspenseQuery>;
export type OrderPriceDetailsQueryResult = Apollo.QueryResult<OrderPriceDetailsQuery, OrderPriceDetailsQueryVariables>;
export const GetGiaoHangNhanhOrderInfoDocument = gql`
    query GetGiaoHangNhanhOrderInfo($orderCode: String!) {
  getGiaoHangNhanhOrderInfo(orderCode: $orderCode) {
    client_id
    client_order_code
    cod_amount
    cod_collect_date
    cod_failed_amount
    cod_failed_collect_date
    cod_transfer_date
    content
    converted_weight
    coupon
    created_client
    created_date
    created_employee
    created_ip
    created_source
    current_warehouse_id
    custom_service_fee
    deliver_station_id
    deliver_warehouse_id
    employee_note
    finish_date
    from_address
    from_district_id
    from_name
    from_phone
    from_ward_code
    height
    insurance_value
    is_cod_collected
    is_cod_transferred
    leadtime
    length
    log {
      status
      updated_date
    }
    next_warehouse_id
    note
    order_code
    order_date
    order_value
    payment_type_id
    pick_station_id
    pick_warehouse_id
    required_note
    return_address
    return_district_id
    return_name
    return_phone
    return_ward_code
    return_warehouse_id
    service_id
    service_type_id
    shop_id
    status
    tag
    to_address
    to_district_id
    to_name
    to_phone
    to_ward_code
    updated_client
    updated_date
    updated_employee
    updated_ip
    updated_source
    updated_warehouse
    weight
    width
  }
}
    `;

/**
 * __useGetGiaoHangNhanhOrderInfoQuery__
 *
 * To run a query within a React component, call `useGetGiaoHangNhanhOrderInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGiaoHangNhanhOrderInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGiaoHangNhanhOrderInfoQuery({
 *   variables: {
 *      orderCode: // value for 'orderCode'
 *   },
 * });
 */
export function useGetGiaoHangNhanhOrderInfoQuery(baseOptions: Apollo.QueryHookOptions<GetGiaoHangNhanhOrderInfoQuery, GetGiaoHangNhanhOrderInfoQueryVariables> & ({ variables: GetGiaoHangNhanhOrderInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGiaoHangNhanhOrderInfoQuery, GetGiaoHangNhanhOrderInfoQueryVariables>(GetGiaoHangNhanhOrderInfoDocument, options);
      }
export function useGetGiaoHangNhanhOrderInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGiaoHangNhanhOrderInfoQuery, GetGiaoHangNhanhOrderInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGiaoHangNhanhOrderInfoQuery, GetGiaoHangNhanhOrderInfoQueryVariables>(GetGiaoHangNhanhOrderInfoDocument, options);
        }
export function useGetGiaoHangNhanhOrderInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGiaoHangNhanhOrderInfoQuery, GetGiaoHangNhanhOrderInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGiaoHangNhanhOrderInfoQuery, GetGiaoHangNhanhOrderInfoQueryVariables>(GetGiaoHangNhanhOrderInfoDocument, options);
        }
export type GetGiaoHangNhanhOrderInfoQueryHookResult = ReturnType<typeof useGetGiaoHangNhanhOrderInfoQuery>;
export type GetGiaoHangNhanhOrderInfoLazyQueryHookResult = ReturnType<typeof useGetGiaoHangNhanhOrderInfoLazyQuery>;
export type GetGiaoHangNhanhOrderInfoSuspenseQueryHookResult = ReturnType<typeof useGetGiaoHangNhanhOrderInfoSuspenseQuery>;
export type GetGiaoHangNhanhOrderInfoQueryResult = Apollo.QueryResult<GetGiaoHangNhanhOrderInfoQuery, GetGiaoHangNhanhOrderInfoQueryVariables>;
export const GenerateAndUploadImageDocument = gql`
    mutation GenerateAndUploadImage($prompt: String!) {
  generateAndUploadImage(prompt: $prompt) {
    url
  }
}
    `;
export type GenerateAndUploadImageMutationFn = Apollo.MutationFunction<GenerateAndUploadImageMutation, GenerateAndUploadImageMutationVariables>;

/**
 * __useGenerateAndUploadImageMutation__
 *
 * To run a mutation, you first call `useGenerateAndUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAndUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAndUploadImageMutation, { data, loading, error }] = useGenerateAndUploadImageMutation({
 *   variables: {
 *      prompt: // value for 'prompt'
 *   },
 * });
 */
export function useGenerateAndUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAndUploadImageMutation, GenerateAndUploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateAndUploadImageMutation, GenerateAndUploadImageMutationVariables>(GenerateAndUploadImageDocument, options);
      }
export type GenerateAndUploadImageMutationHookResult = ReturnType<typeof useGenerateAndUploadImageMutation>;
export type GenerateAndUploadImageMutationResult = Apollo.MutationResult<GenerateAndUploadImageMutation>;
export type GenerateAndUploadImageMutationOptions = Apollo.BaseMutationOptions<GenerateAndUploadImageMutation, GenerateAndUploadImageMutationVariables>;
export const GetExpiredTimeDocument = gql`
    query GetExpiredTime($email: String!) {
  getExpiredTime(email: $email)
}
    `;

/**
 * __useGetExpiredTimeQuery__
 *
 * To run a query within a React component, call `useGetExpiredTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpiredTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpiredTimeQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetExpiredTimeQuery(baseOptions: Apollo.QueryHookOptions<GetExpiredTimeQuery, GetExpiredTimeQueryVariables> & ({ variables: GetExpiredTimeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpiredTimeQuery, GetExpiredTimeQueryVariables>(GetExpiredTimeDocument, options);
      }
export function useGetExpiredTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpiredTimeQuery, GetExpiredTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpiredTimeQuery, GetExpiredTimeQueryVariables>(GetExpiredTimeDocument, options);
        }
export function useGetExpiredTimeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExpiredTimeQuery, GetExpiredTimeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpiredTimeQuery, GetExpiredTimeQueryVariables>(GetExpiredTimeDocument, options);
        }
export type GetExpiredTimeQueryHookResult = ReturnType<typeof useGetExpiredTimeQuery>;
export type GetExpiredTimeLazyQueryHookResult = ReturnType<typeof useGetExpiredTimeLazyQuery>;
export type GetExpiredTimeSuspenseQueryHookResult = ReturnType<typeof useGetExpiredTimeSuspenseQuery>;
export type GetExpiredTimeQueryResult = Apollo.QueryResult<GetExpiredTimeQuery, GetExpiredTimeQueryVariables>;
export const ResendOtpDocument = gql`
    mutation ResendOTP($email: String!) {
  resendOTP(email: $email)
}
    `;
export type ResendOtpMutationFn = Apollo.MutationFunction<ResendOtpMutation, ResendOtpMutationVariables>;

/**
 * __useResendOtpMutation__
 *
 * To run a mutation, you first call `useResendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendOtpMutation, { data, loading, error }] = useResendOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendOtpMutation(baseOptions?: Apollo.MutationHookOptions<ResendOtpMutation, ResendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendOtpMutation, ResendOtpMutationVariables>(ResendOtpDocument, options);
      }
export type ResendOtpMutationHookResult = ReturnType<typeof useResendOtpMutation>;
export type ResendOtpMutationResult = Apollo.MutationResult<ResendOtpMutation>;
export type ResendOtpMutationOptions = Apollo.BaseMutationOptions<ResendOtpMutation, ResendOtpMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOTP($verifyOtpInput: VerifyOtpInput!) {
  verifyOTP(verifyOtpInput: $verifyOtpInput)
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      verifyOtpInput: // value for 'verifyOtpInput'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ProductDesignsDocument = gql`
    query ProductDesigns {
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
    systemConfigVariant {
      id
      price
      color
      size
      model
      product {
        name
        category {
          name
        }
      }
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
export function useProductDesignsQuery(baseOptions?: Apollo.QueryHookOptions<ProductDesignsQuery, ProductDesignsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDesignsQuery, ProductDesignsQueryVariables>(ProductDesignsDocument, options);
      }
export function useProductDesignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDesignsQuery, ProductDesignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDesignsQuery, ProductDesignsQueryVariables>(ProductDesignsDocument, options);
        }
export function useProductDesignsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductDesignsQuery, ProductDesignsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductDesignsQuery, ProductDesignsQueryVariables>(ProductDesignsDocument, options);
        }
export type ProductDesignsQueryHookResult = ReturnType<typeof useProductDesignsQuery>;
export type ProductDesignsLazyQueryHookResult = ReturnType<typeof useProductDesignsLazyQuery>;
export type ProductDesignsSuspenseQueryHookResult = ReturnType<typeof useProductDesignsSuspenseQuery>;
export type ProductDesignsQueryResult = Apollo.QueryResult<ProductDesignsQuery, ProductDesignsQueryVariables>;
export const ProductDesignsByUserDocument = gql`
    query ProductDesignsByUser {
  productDesignsByUser {
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
    systemConfigVariant {
      id
      price
      color
      size
      model
      product {
        name
        category {
          name
        }
      }
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
export function useProductDesignsByUserQuery(baseOptions?: Apollo.QueryHookOptions<ProductDesignsByUserQuery, ProductDesignsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDesignsByUserQuery, ProductDesignsByUserQueryVariables>(ProductDesignsByUserDocument, options);
      }
export function useProductDesignsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDesignsByUserQuery, ProductDesignsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDesignsByUserQuery, ProductDesignsByUserQueryVariables>(ProductDesignsByUserDocument, options);
        }
export function useProductDesignsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductDesignsByUserQuery, ProductDesignsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductDesignsByUserQuery, ProductDesignsByUserQueryVariables>(ProductDesignsByUserDocument, options);
        }
export type ProductDesignsByUserQueryHookResult = ReturnType<typeof useProductDesignsByUserQuery>;
export type ProductDesignsByUserLazyQueryHookResult = ReturnType<typeof useProductDesignsByUserLazyQuery>;
export type ProductDesignsByUserSuspenseQueryHookResult = ReturnType<typeof useProductDesignsByUserSuspenseQuery>;
export type ProductDesignsByUserQueryResult = Apollo.QueryResult<ProductDesignsByUserQuery, ProductDesignsByUserQueryVariables>;
export const ProductDesignByIdDocument = gql`
    query ProductDesignById($productDesignId: ID!) {
  productDesign(id: $productDesignId) {
    thumbnailUrl
    isFinalized
    isPublic
    isTemplate
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
    user {
      id
      name
      role
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
export function useProductDesignByIdQuery(baseOptions: Apollo.QueryHookOptions<ProductDesignByIdQuery, ProductDesignByIdQueryVariables> & ({ variables: ProductDesignByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDesignByIdQuery, ProductDesignByIdQueryVariables>(ProductDesignByIdDocument, options);
      }
export function useProductDesignByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDesignByIdQuery, ProductDesignByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDesignByIdQuery, ProductDesignByIdQueryVariables>(ProductDesignByIdDocument, options);
        }
export function useProductDesignByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductDesignByIdQuery, ProductDesignByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductDesignByIdQuery, ProductDesignByIdQueryVariables>(ProductDesignByIdDocument, options);
        }
export type ProductDesignByIdQueryHookResult = ReturnType<typeof useProductDesignByIdQuery>;
export type ProductDesignByIdLazyQueryHookResult = ReturnType<typeof useProductDesignByIdLazyQuery>;
export type ProductDesignByIdSuspenseQueryHookResult = ReturnType<typeof useProductDesignByIdSuspenseQuery>;
export type ProductDesignByIdQueryResult = Apollo.QueryResult<ProductDesignByIdQuery, ProductDesignByIdQueryVariables>;
export const CreateProductDesignDocument = gql`
    mutation CreateProductDesign($input: CreateProductDesignDto!) {
  createProductDesign(input: $input) {
    id
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
    mutation UpdateProductDesign($updateProductDesignId: String!, $input: UpdateProductDesignDto!) {
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
 *      updateProductDesignId: // value for 'updateProductDesignId'
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
export const RemoveProductDesignDocument = gql`
    mutation RemoveProductDesign($removeProductDesignId: ID!) {
  removeProductDesign(id: $removeProductDesignId) {
    id
    isDeleted
    isFinalized
    isPublic
    isTemplate
  }
}
    `;
export type RemoveProductDesignMutationFn = Apollo.MutationFunction<RemoveProductDesignMutation, RemoveProductDesignMutationVariables>;

/**
 * __useRemoveProductDesignMutation__
 *
 * To run a mutation, you first call `useRemoveProductDesignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductDesignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductDesignMutation, { data, loading, error }] = useRemoveProductDesignMutation({
 *   variables: {
 *      removeProductDesignId: // value for 'removeProductDesignId'
 *   },
 * });
 */
export function useRemoveProductDesignMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductDesignMutation, RemoveProductDesignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductDesignMutation, RemoveProductDesignMutationVariables>(RemoveProductDesignDocument, options);
      }
export type RemoveProductDesignMutationHookResult = ReturnType<typeof useRemoveProductDesignMutation>;
export type RemoveProductDesignMutationResult = Apollo.MutationResult<RemoveProductDesignMutation>;
export type RemoveProductDesignMutationOptions = Apollo.BaseMutationOptions<RemoveProductDesignMutation, RemoveProductDesignMutationVariables>;
export const UpdateThumbnailProductDesignDocument = gql`
    mutation UpdateThumbnailProductDesign($updateProductDesignId: String!, $input: UpdateProductDesignDto!, $fileUrl: String!) {
  updateProductDesign(id: $updateProductDesignId, input: $input) {
    thumbnailUrl
  }
  deleteFile(fileUrl: $fileUrl)
}
    `;
export type UpdateThumbnailProductDesignMutationFn = Apollo.MutationFunction<UpdateThumbnailProductDesignMutation, UpdateThumbnailProductDesignMutationVariables>;

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
export function useUpdateThumbnailProductDesignMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThumbnailProductDesignMutation, UpdateThumbnailProductDesignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThumbnailProductDesignMutation, UpdateThumbnailProductDesignMutationVariables>(UpdateThumbnailProductDesignDocument, options);
      }
export type UpdateThumbnailProductDesignMutationHookResult = ReturnType<typeof useUpdateThumbnailProductDesignMutation>;
export type UpdateThumbnailProductDesignMutationResult = Apollo.MutationResult<UpdateThumbnailProductDesignMutation>;
export type UpdateThumbnailProductDesignMutationOptions = Apollo.BaseMutationOptions<UpdateThumbnailProductDesignMutation, UpdateThumbnailProductDesignMutationVariables>;
export const GetTemplateProductDesignsDocument = gql`
    query GetTemplateProductDesigns {
  getTemplateProductDesigns {
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
    systemConfigVariant {
      id
      price
      color
      size
      model
      product {
        name
        category {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetTemplateProductDesignsQuery__
 *
 * To run a query within a React component, call `useGetTemplateProductDesignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTemplateProductDesignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTemplateProductDesignsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTemplateProductDesignsQuery(baseOptions?: Apollo.QueryHookOptions<GetTemplateProductDesignsQuery, GetTemplateProductDesignsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTemplateProductDesignsQuery, GetTemplateProductDesignsQueryVariables>(GetTemplateProductDesignsDocument, options);
      }
export function useGetTemplateProductDesignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTemplateProductDesignsQuery, GetTemplateProductDesignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTemplateProductDesignsQuery, GetTemplateProductDesignsQueryVariables>(GetTemplateProductDesignsDocument, options);
        }
export function useGetTemplateProductDesignsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTemplateProductDesignsQuery, GetTemplateProductDesignsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTemplateProductDesignsQuery, GetTemplateProductDesignsQueryVariables>(GetTemplateProductDesignsDocument, options);
        }
export type GetTemplateProductDesignsQueryHookResult = ReturnType<typeof useGetTemplateProductDesignsQuery>;
export type GetTemplateProductDesignsLazyQueryHookResult = ReturnType<typeof useGetTemplateProductDesignsLazyQuery>;
export type GetTemplateProductDesignsSuspenseQueryHookResult = ReturnType<typeof useGetTemplateProductDesignsSuspenseQuery>;
export type GetTemplateProductDesignsQueryResult = Apollo.QueryResult<GetTemplateProductDesignsQuery, GetTemplateProductDesignsQueryVariables>;
export const PublicProductDesignsDocument = gql`
    query PublicProductDesigns {
  publicProductDesigns {
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
    systemConfigVariant {
      id
      price
      color
      size
      model
      product {
        name
        category {
          name
        }
      }
    }
  }
}
    `;

/**
 * __usePublicProductDesignsQuery__
 *
 * To run a query within a React component, call `usePublicProductDesignsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicProductDesignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicProductDesignsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicProductDesignsQuery(baseOptions?: Apollo.QueryHookOptions<PublicProductDesignsQuery, PublicProductDesignsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicProductDesignsQuery, PublicProductDesignsQueryVariables>(PublicProductDesignsDocument, options);
      }
export function usePublicProductDesignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicProductDesignsQuery, PublicProductDesignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicProductDesignsQuery, PublicProductDesignsQueryVariables>(PublicProductDesignsDocument, options);
        }
export function usePublicProductDesignsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PublicProductDesignsQuery, PublicProductDesignsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PublicProductDesignsQuery, PublicProductDesignsQueryVariables>(PublicProductDesignsDocument, options);
        }
export type PublicProductDesignsQueryHookResult = ReturnType<typeof usePublicProductDesignsQuery>;
export type PublicProductDesignsLazyQueryHookResult = ReturnType<typeof usePublicProductDesignsLazyQuery>;
export type PublicProductDesignsSuspenseQueryHookResult = ReturnType<typeof usePublicProductDesignsSuspenseQuery>;
export type PublicProductDesignsQueryResult = Apollo.QueryResult<PublicProductDesignsQuery, PublicProductDesignsQueryVariables>;
export const DuplicateProductDesignDocument = gql`
    mutation DuplicateProductDesign($duplicateProductDesignId: ID!) {
  duplicateProductDesign(id: $duplicateProductDesignId) {
    id
    isFinalized
    isPublic
    isTemplate
  }
}
    `;
export type DuplicateProductDesignMutationFn = Apollo.MutationFunction<DuplicateProductDesignMutation, DuplicateProductDesignMutationVariables>;

/**
 * __useDuplicateProductDesignMutation__
 *
 * To run a mutation, you first call `useDuplicateProductDesignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateProductDesignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateProductDesignMutation, { data, loading, error }] = useDuplicateProductDesignMutation({
 *   variables: {
 *      duplicateProductDesignId: // value for 'duplicateProductDesignId'
 *   },
 * });
 */
export function useDuplicateProductDesignMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateProductDesignMutation, DuplicateProductDesignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateProductDesignMutation, DuplicateProductDesignMutationVariables>(DuplicateProductDesignDocument, options);
      }
export type DuplicateProductDesignMutationHookResult = ReturnType<typeof useDuplicateProductDesignMutation>;
export type DuplicateProductDesignMutationResult = Apollo.MutationResult<DuplicateProductDesignMutation>;
export type DuplicateProductDesignMutationOptions = Apollo.BaseMutationOptions<DuplicateProductDesignMutation, DuplicateProductDesignMutationVariables>;
export const GetAllDiscountByProductIdDocument = gql`
    query GetAllDiscountByProductId($productId: String!) {
  getAllDiscountByProductId(productId: $productId) {
    createdAt
    discountPercent
    id
    isActive
    isDeleted
    minQuantity
    name
    updatedAt
    productId
  }
}
    `;

/**
 * __useGetAllDiscountByProductIdQuery__
 *
 * To run a query within a React component, call `useGetAllDiscountByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDiscountByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDiscountByProductIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetAllDiscountByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetAllDiscountByProductIdQuery, GetAllDiscountByProductIdQueryVariables> & ({ variables: GetAllDiscountByProductIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDiscountByProductIdQuery, GetAllDiscountByProductIdQueryVariables>(GetAllDiscountByProductIdDocument, options);
      }
export function useGetAllDiscountByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDiscountByProductIdQuery, GetAllDiscountByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDiscountByProductIdQuery, GetAllDiscountByProductIdQueryVariables>(GetAllDiscountByProductIdDocument, options);
        }
export function useGetAllDiscountByProductIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDiscountByProductIdQuery, GetAllDiscountByProductIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDiscountByProductIdQuery, GetAllDiscountByProductIdQueryVariables>(GetAllDiscountByProductIdDocument, options);
        }
export type GetAllDiscountByProductIdQueryHookResult = ReturnType<typeof useGetAllDiscountByProductIdQuery>;
export type GetAllDiscountByProductIdLazyQueryHookResult = ReturnType<typeof useGetAllDiscountByProductIdLazyQuery>;
export type GetAllDiscountByProductIdSuspenseQueryHookResult = ReturnType<typeof useGetAllDiscountByProductIdSuspenseQuery>;
export type GetAllDiscountByProductIdQueryResult = Apollo.QueryResult<GetAllDiscountByProductIdQuery, GetAllDiscountByProductIdQueryVariables>;
export const CreateSystemConfigDiscountDocument = gql`
    mutation CreateSystemConfigDiscount($createDiscountInput: CreateSystemConfigDiscountDto!) {
  createSystemConfigDiscount(createDiscountInput: $createDiscountInput) {
    createdAt
    discountPercent
    id
    isActive
    isDeleted
    minQuantity
    name
    updatedAt
    productId
  }
}
    `;
export type CreateSystemConfigDiscountMutationFn = Apollo.MutationFunction<CreateSystemConfigDiscountMutation, CreateSystemConfigDiscountMutationVariables>;

/**
 * __useCreateSystemConfigDiscountMutation__
 *
 * To run a mutation, you first call `useCreateSystemConfigDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSystemConfigDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSystemConfigDiscountMutation, { data, loading, error }] = useCreateSystemConfigDiscountMutation({
 *   variables: {
 *      createDiscountInput: // value for 'createDiscountInput'
 *   },
 * });
 */
export function useCreateSystemConfigDiscountMutation(baseOptions?: Apollo.MutationHookOptions<CreateSystemConfigDiscountMutation, CreateSystemConfigDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSystemConfigDiscountMutation, CreateSystemConfigDiscountMutationVariables>(CreateSystemConfigDiscountDocument, options);
      }
export type CreateSystemConfigDiscountMutationHookResult = ReturnType<typeof useCreateSystemConfigDiscountMutation>;
export type CreateSystemConfigDiscountMutationResult = Apollo.MutationResult<CreateSystemConfigDiscountMutation>;
export type CreateSystemConfigDiscountMutationOptions = Apollo.BaseMutationOptions<CreateSystemConfigDiscountMutation, CreateSystemConfigDiscountMutationVariables>;
export const UpdateSystemConfigDiscountDocument = gql`
    mutation UpdateSystemConfigDiscount($updateSystemConfigDiscountId: String!, $updateDiscountInput: UpdateSystemConfigDiscountDto!) {
  updateSystemConfigDiscount(
    id: $updateSystemConfigDiscountId
    updateDiscountInput: $updateDiscountInput
  ) {
    createdAt
    discountPercent
    id
    isActive
    isDeleted
    minQuantity
    name
    updatedAt
    productId
  }
}
    `;
export type UpdateSystemConfigDiscountMutationFn = Apollo.MutationFunction<UpdateSystemConfigDiscountMutation, UpdateSystemConfigDiscountMutationVariables>;

/**
 * __useUpdateSystemConfigDiscountMutation__
 *
 * To run a mutation, you first call `useUpdateSystemConfigDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSystemConfigDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSystemConfigDiscountMutation, { data, loading, error }] = useUpdateSystemConfigDiscountMutation({
 *   variables: {
 *      updateSystemConfigDiscountId: // value for 'updateSystemConfigDiscountId'
 *      updateDiscountInput: // value for 'updateDiscountInput'
 *   },
 * });
 */
export function useUpdateSystemConfigDiscountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSystemConfigDiscountMutation, UpdateSystemConfigDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSystemConfigDiscountMutation, UpdateSystemConfigDiscountMutationVariables>(UpdateSystemConfigDiscountDocument, options);
      }
export type UpdateSystemConfigDiscountMutationHookResult = ReturnType<typeof useUpdateSystemConfigDiscountMutation>;
export type UpdateSystemConfigDiscountMutationResult = Apollo.MutationResult<UpdateSystemConfigDiscountMutation>;
export type UpdateSystemConfigDiscountMutationOptions = Apollo.BaseMutationOptions<UpdateSystemConfigDiscountMutation, UpdateSystemConfigDiscountMutationVariables>;
export const RemoveSystemConfigDiscountDocument = gql`
    mutation RemoveSystemConfigDiscount($removeSystemConfigDiscountId: String!) {
  removeSystemConfigDiscount(id: $removeSystemConfigDiscountId) {
    createdAt
    discountPercent
    id
    isActive
    isDeleted
    minQuantity
    name
    updatedAt
    productId
  }
}
    `;
export type RemoveSystemConfigDiscountMutationFn = Apollo.MutationFunction<RemoveSystemConfigDiscountMutation, RemoveSystemConfigDiscountMutationVariables>;

/**
 * __useRemoveSystemConfigDiscountMutation__
 *
 * To run a mutation, you first call `useRemoveSystemConfigDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSystemConfigDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSystemConfigDiscountMutation, { data, loading, error }] = useRemoveSystemConfigDiscountMutation({
 *   variables: {
 *      removeSystemConfigDiscountId: // value for 'removeSystemConfigDiscountId'
 *   },
 * });
 */
export function useRemoveSystemConfigDiscountMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSystemConfigDiscountMutation, RemoveSystemConfigDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSystemConfigDiscountMutation, RemoveSystemConfigDiscountMutationVariables>(RemoveSystemConfigDiscountDocument, options);
      }
export type RemoveSystemConfigDiscountMutationHookResult = ReturnType<typeof useRemoveSystemConfigDiscountMutation>;
export type RemoveSystemConfigDiscountMutationResult = Apollo.MutationResult<RemoveSystemConfigDiscountMutation>;
export type RemoveSystemConfigDiscountMutationOptions = Apollo.BaseMutationOptions<RemoveSystemConfigDiscountMutation, RemoveSystemConfigDiscountMutationVariables>;
export const GetAllProductsDocument = gql`
    query GetAllProducts {
  products {
    category {
      name
    }
    categoryId
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
export const GetProductByIdDocument = gql`
    query GetProductById($productId: String!) {
  product(id: $productId) {
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
      model
      isDeleted
      isActive
      id
      color
      productId
      size
    }
    weight
    createdBy
  }
}
    `;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables> & ({ variables: GetProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export function useGetProductByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductByIdSuspenseQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
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
export const GetProductVariantByIdDocument = gql`
    query GetProductVariantById($productId: String!) {
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
 * __useGetProductVariantByIdQuery__
 *
 * To run a query within a React component, call `useGetProductVariantByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductVariantByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductVariantByIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductVariantByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductVariantByIdQuery, GetProductVariantByIdQueryVariables> & ({ variables: GetProductVariantByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductVariantByIdQuery, GetProductVariantByIdQueryVariables>(GetProductVariantByIdDocument, options);
      }
export function useGetProductVariantByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductVariantByIdQuery, GetProductVariantByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductVariantByIdQuery, GetProductVariantByIdQueryVariables>(GetProductVariantByIdDocument, options);
        }
export function useGetProductVariantByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductVariantByIdQuery, GetProductVariantByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductVariantByIdQuery, GetProductVariantByIdQueryVariables>(GetProductVariantByIdDocument, options);
        }
export type GetProductVariantByIdQueryHookResult = ReturnType<typeof useGetProductVariantByIdQuery>;
export type GetProductVariantByIdLazyQueryHookResult = ReturnType<typeof useGetProductVariantByIdLazyQuery>;
export type GetProductVariantByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductVariantByIdSuspenseQuery>;
export type GetProductVariantByIdQueryResult = Apollo.QueryResult<GetProductVariantByIdQuery, GetProductVariantByIdQueryVariables>;
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
export function useGetAllProvincesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProvincesQuery, GetAllProvincesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProvincesQuery, GetAllProvincesQueryVariables>(GetAllProvincesDocument, options);
      }
export function useGetAllProvincesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProvincesQuery, GetAllProvincesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProvincesQuery, GetAllProvincesQueryVariables>(GetAllProvincesDocument, options);
        }
export function useGetAllProvincesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProvincesQuery, GetAllProvincesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProvincesQuery, GetAllProvincesQueryVariables>(GetAllProvincesDocument, options);
        }
export type GetAllProvincesQueryHookResult = ReturnType<typeof useGetAllProvincesQuery>;
export type GetAllProvincesLazyQueryHookResult = ReturnType<typeof useGetAllProvincesLazyQuery>;
export type GetAllProvincesSuspenseQueryHookResult = ReturnType<typeof useGetAllProvincesSuspenseQuery>;
export type GetAllProvincesQueryResult = Apollo.QueryResult<GetAllProvincesQuery, GetAllProvincesQueryVariables>;
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
export function useGetProvinceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProvinceByIdQuery, GetProvinceByIdQueryVariables> & ({ variables: GetProvinceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProvinceByIdQuery, GetProvinceByIdQueryVariables>(GetProvinceByIdDocument, options);
      }
export function useGetProvinceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProvinceByIdQuery, GetProvinceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProvinceByIdQuery, GetProvinceByIdQueryVariables>(GetProvinceByIdDocument, options);
        }
export function useGetProvinceByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProvinceByIdQuery, GetProvinceByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProvinceByIdQuery, GetProvinceByIdQueryVariables>(GetProvinceByIdDocument, options);
        }
export type GetProvinceByIdQueryHookResult = ReturnType<typeof useGetProvinceByIdQuery>;
export type GetProvinceByIdLazyQueryHookResult = ReturnType<typeof useGetProvinceByIdLazyQuery>;
export type GetProvinceByIdSuspenseQueryHookResult = ReturnType<typeof useGetProvinceByIdSuspenseQuery>;
export type GetProvinceByIdQueryResult = Apollo.QueryResult<GetProvinceByIdQuery, GetProvinceByIdQueryVariables>;
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
export function useGetAllDistrictsByProvinceIdQuery(baseOptions: Apollo.QueryHookOptions<GetAllDistrictsByProvinceIdQuery, GetAllDistrictsByProvinceIdQueryVariables> & ({ variables: GetAllDistrictsByProvinceIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDistrictsByProvinceIdQuery, GetAllDistrictsByProvinceIdQueryVariables>(GetAllDistrictsByProvinceIdDocument, options);
      }
export function useGetAllDistrictsByProvinceIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDistrictsByProvinceIdQuery, GetAllDistrictsByProvinceIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDistrictsByProvinceIdQuery, GetAllDistrictsByProvinceIdQueryVariables>(GetAllDistrictsByProvinceIdDocument, options);
        }
export function useGetAllDistrictsByProvinceIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDistrictsByProvinceIdQuery, GetAllDistrictsByProvinceIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDistrictsByProvinceIdQuery, GetAllDistrictsByProvinceIdQueryVariables>(GetAllDistrictsByProvinceIdDocument, options);
        }
export type GetAllDistrictsByProvinceIdQueryHookResult = ReturnType<typeof useGetAllDistrictsByProvinceIdQuery>;
export type GetAllDistrictsByProvinceIdLazyQueryHookResult = ReturnType<typeof useGetAllDistrictsByProvinceIdLazyQuery>;
export type GetAllDistrictsByProvinceIdSuspenseQueryHookResult = ReturnType<typeof useGetAllDistrictsByProvinceIdSuspenseQuery>;
export type GetAllDistrictsByProvinceIdQueryResult = Apollo.QueryResult<GetAllDistrictsByProvinceIdQuery, GetAllDistrictsByProvinceIdQueryVariables>;
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
export function useGetDistrictByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDistrictByIdQuery, GetDistrictByIdQueryVariables> & ({ variables: GetDistrictByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>(GetDistrictByIdDocument, options);
      }
export function useGetDistrictByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>(GetDistrictByIdDocument, options);
        }
export function useGetDistrictByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>(GetDistrictByIdDocument, options);
        }
export type GetDistrictByIdQueryHookResult = ReturnType<typeof useGetDistrictByIdQuery>;
export type GetDistrictByIdLazyQueryHookResult = ReturnType<typeof useGetDistrictByIdLazyQuery>;
export type GetDistrictByIdSuspenseQueryHookResult = ReturnType<typeof useGetDistrictByIdSuspenseQuery>;
export type GetDistrictByIdQueryResult = Apollo.QueryResult<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>;
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
export function useGetAllWardsByDistrictIdQuery(baseOptions: Apollo.QueryHookOptions<GetAllWardsByDistrictIdQuery, GetAllWardsByDistrictIdQueryVariables> & ({ variables: GetAllWardsByDistrictIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWardsByDistrictIdQuery, GetAllWardsByDistrictIdQueryVariables>(GetAllWardsByDistrictIdDocument, options);
      }
export function useGetAllWardsByDistrictIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWardsByDistrictIdQuery, GetAllWardsByDistrictIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWardsByDistrictIdQuery, GetAllWardsByDistrictIdQueryVariables>(GetAllWardsByDistrictIdDocument, options);
        }
export function useGetAllWardsByDistrictIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllWardsByDistrictIdQuery, GetAllWardsByDistrictIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWardsByDistrictIdQuery, GetAllWardsByDistrictIdQueryVariables>(GetAllWardsByDistrictIdDocument, options);
        }
export type GetAllWardsByDistrictIdQueryHookResult = ReturnType<typeof useGetAllWardsByDistrictIdQuery>;
export type GetAllWardsByDistrictIdLazyQueryHookResult = ReturnType<typeof useGetAllWardsByDistrictIdLazyQuery>;
export type GetAllWardsByDistrictIdSuspenseQueryHookResult = ReturnType<typeof useGetAllWardsByDistrictIdSuspenseQuery>;
export type GetAllWardsByDistrictIdQueryResult = Apollo.QueryResult<GetAllWardsByDistrictIdQuery, GetAllWardsByDistrictIdQueryVariables>;
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
export function useGetWardByWardCodeQuery(baseOptions: Apollo.QueryHookOptions<GetWardByWardCodeQuery, GetWardByWardCodeQueryVariables> & ({ variables: GetWardByWardCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWardByWardCodeQuery, GetWardByWardCodeQueryVariables>(GetWardByWardCodeDocument, options);
      }
export function useGetWardByWardCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWardByWardCodeQuery, GetWardByWardCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWardByWardCodeQuery, GetWardByWardCodeQueryVariables>(GetWardByWardCodeDocument, options);
        }
export function useGetWardByWardCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWardByWardCodeQuery, GetWardByWardCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWardByWardCodeQuery, GetWardByWardCodeQueryVariables>(GetWardByWardCodeDocument, options);
        }
export type GetWardByWardCodeQueryHookResult = ReturnType<typeof useGetWardByWardCodeQuery>;
export type GetWardByWardCodeLazyQueryHookResult = ReturnType<typeof useGetWardByWardCodeLazyQuery>;
export type GetWardByWardCodeSuspenseQueryHookResult = ReturnType<typeof useGetWardByWardCodeSuspenseQuery>;
export type GetWardByWardCodeQueryResult = Apollo.QueryResult<GetWardByWardCodeQuery, GetWardByWardCodeQueryVariables>;
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
export function useGetAvailableServiceQuery(baseOptions: Apollo.QueryHookOptions<GetAvailableServiceQuery, GetAvailableServiceQueryVariables> & ({ variables: GetAvailableServiceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableServiceQuery, GetAvailableServiceQueryVariables>(GetAvailableServiceDocument, options);
      }
export function useGetAvailableServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableServiceQuery, GetAvailableServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableServiceQuery, GetAvailableServiceQueryVariables>(GetAvailableServiceDocument, options);
        }
export function useGetAvailableServiceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAvailableServiceQuery, GetAvailableServiceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAvailableServiceQuery, GetAvailableServiceQueryVariables>(GetAvailableServiceDocument, options);
        }
export type GetAvailableServiceQueryHookResult = ReturnType<typeof useGetAvailableServiceQuery>;
export type GetAvailableServiceLazyQueryHookResult = ReturnType<typeof useGetAvailableServiceLazyQuery>;
export type GetAvailableServiceSuspenseQueryHookResult = ReturnType<typeof useGetAvailableServiceSuspenseQuery>;
export type GetAvailableServiceQueryResult = Apollo.QueryResult<GetAvailableServiceQuery, GetAvailableServiceQueryVariables>;
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
export const SystemConfigOrderDocument = gql`
    query SystemConfigOrder {
  systemConfigOrder {
    acceptHoursForFactory
    capacityScoreWeight
    checkQualityTimesDays
    leadTimeScoreWeight
    legitPointScoreWeight
    legitPointToSuspend
    limitFactoryRejectOrders
    limitReworkTimes
    maxLegitPoint
    maxProductionCapacity
    maxProductionTimeInMinutes
    productionCapacityScoreWeight
    reduceLegitPointIfReject
    shippingDays
    specializationScoreWeight
    voucherBaseTypeForRefund
    voucherBaseValueForRefund
    voucherBaseLimitedUsage
    voucherBaseMaxDiscountValue
  }
}
    `;

/**
 * __useSystemConfigOrderQuery__
 *
 * To run a query within a React component, call `useSystemConfigOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemConfigOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemConfigOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemConfigOrderQuery(baseOptions?: Apollo.QueryHookOptions<SystemConfigOrderQuery, SystemConfigOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SystemConfigOrderQuery, SystemConfigOrderQueryVariables>(SystemConfigOrderDocument, options);
      }
export function useSystemConfigOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SystemConfigOrderQuery, SystemConfigOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SystemConfigOrderQuery, SystemConfigOrderQueryVariables>(SystemConfigOrderDocument, options);
        }
export function useSystemConfigOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SystemConfigOrderQuery, SystemConfigOrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SystemConfigOrderQuery, SystemConfigOrderQueryVariables>(SystemConfigOrderDocument, options);
        }
export type SystemConfigOrderQueryHookResult = ReturnType<typeof useSystemConfigOrderQuery>;
export type SystemConfigOrderLazyQueryHookResult = ReturnType<typeof useSystemConfigOrderLazyQuery>;
export type SystemConfigOrderSuspenseQueryHookResult = ReturnType<typeof useSystemConfigOrderSuspenseQuery>;
export type SystemConfigOrderQueryResult = Apollo.QueryResult<SystemConfigOrderQuery, SystemConfigOrderQueryVariables>;
export const UpdateSystemConfigOrderDocument = gql`
    mutation UpdateSystemConfigOrder($updateConfigInput: UpdateSystemConfigOrderDto!) {
  updateSystemConfigOrder(updateConfigInput: $updateConfigInput) {
    id
  }
}
    `;
export type UpdateSystemConfigOrderMutationFn = Apollo.MutationFunction<UpdateSystemConfigOrderMutation, UpdateSystemConfigOrderMutationVariables>;

/**
 * __useUpdateSystemConfigOrderMutation__
 *
 * To run a mutation, you first call `useUpdateSystemConfigOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSystemConfigOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSystemConfigOrderMutation, { data, loading, error }] = useUpdateSystemConfigOrderMutation({
 *   variables: {
 *      updateConfigInput: // value for 'updateConfigInput'
 *   },
 * });
 */
export function useUpdateSystemConfigOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSystemConfigOrderMutation, UpdateSystemConfigOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSystemConfigOrderMutation, UpdateSystemConfigOrderMutationVariables>(UpdateSystemConfigOrderDocument, options);
      }
export type UpdateSystemConfigOrderMutationHookResult = ReturnType<typeof useUpdateSystemConfigOrderMutation>;
export type UpdateSystemConfigOrderMutationResult = Apollo.MutationResult<UpdateSystemConfigOrderMutation>;
export type UpdateSystemConfigOrderMutationOptions = Apollo.BaseMutationOptions<UpdateSystemConfigOrderMutation, UpdateSystemConfigOrderMutationVariables>;
export const ReassignNewStaffForOrderDocument = gql`
    mutation ReassignNewStaffForOrder($newStaffId: String!, $orderId: String!) {
  reassignNewStaffForOrder(newStaffId: $newStaffId, orderId: $orderId) {
    id
  }
}
    `;
export type ReassignNewStaffForOrderMutationFn = Apollo.MutationFunction<ReassignNewStaffForOrderMutation, ReassignNewStaffForOrderMutationVariables>;

/**
 * __useReassignNewStaffForOrderMutation__
 *
 * To run a mutation, you first call `useReassignNewStaffForOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReassignNewStaffForOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reassignNewStaffForOrderMutation, { data, loading, error }] = useReassignNewStaffForOrderMutation({
 *   variables: {
 *      newStaffId: // value for 'newStaffId'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useReassignNewStaffForOrderMutation(baseOptions?: Apollo.MutationHookOptions<ReassignNewStaffForOrderMutation, ReassignNewStaffForOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReassignNewStaffForOrderMutation, ReassignNewStaffForOrderMutationVariables>(ReassignNewStaffForOrderDocument, options);
      }
export type ReassignNewStaffForOrderMutationHookResult = ReturnType<typeof useReassignNewStaffForOrderMutation>;
export type ReassignNewStaffForOrderMutationResult = Apollo.MutationResult<ReassignNewStaffForOrderMutation>;
export type ReassignNewStaffForOrderMutationOptions = Apollo.BaseMutationOptions<ReassignNewStaffForOrderMutation, ReassignNewStaffForOrderMutationVariables>;
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
export function useGetSystemConfigVariantsQuery(baseOptions?: Apollo.QueryHookOptions<GetSystemConfigVariantsQuery, GetSystemConfigVariantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSystemConfigVariantsQuery, GetSystemConfigVariantsQueryVariables>(GetSystemConfigVariantsDocument, options);
      }
export function useGetSystemConfigVariantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSystemConfigVariantsQuery, GetSystemConfigVariantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSystemConfigVariantsQuery, GetSystemConfigVariantsQueryVariables>(GetSystemConfigVariantsDocument, options);
        }
export function useGetSystemConfigVariantsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSystemConfigVariantsQuery, GetSystemConfigVariantsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSystemConfigVariantsQuery, GetSystemConfigVariantsQueryVariables>(GetSystemConfigVariantsDocument, options);
        }
export type GetSystemConfigVariantsQueryHookResult = ReturnType<typeof useGetSystemConfigVariantsQuery>;
export type GetSystemConfigVariantsLazyQueryHookResult = ReturnType<typeof useGetSystemConfigVariantsLazyQuery>;
export type GetSystemConfigVariantsSuspenseQueryHookResult = ReturnType<typeof useGetSystemConfigVariantsSuspenseQuery>;
export type GetSystemConfigVariantsQueryResult = Apollo.QueryResult<GetSystemConfigVariantsQuery, GetSystemConfigVariantsQueryVariables>;
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
export function useGetSystemConfigVariantsByProductQuery(baseOptions: Apollo.QueryHookOptions<GetSystemConfigVariantsByProductQuery, GetSystemConfigVariantsByProductQueryVariables> & ({ variables: GetSystemConfigVariantsByProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSystemConfigVariantsByProductQuery, GetSystemConfigVariantsByProductQueryVariables>(GetSystemConfigVariantsByProductDocument, options);
      }
export function useGetSystemConfigVariantsByProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSystemConfigVariantsByProductQuery, GetSystemConfigVariantsByProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSystemConfigVariantsByProductQuery, GetSystemConfigVariantsByProductQueryVariables>(GetSystemConfigVariantsByProductDocument, options);
        }
export function useGetSystemConfigVariantsByProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSystemConfigVariantsByProductQuery, GetSystemConfigVariantsByProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSystemConfigVariantsByProductQuery, GetSystemConfigVariantsByProductQueryVariables>(GetSystemConfigVariantsByProductDocument, options);
        }
export type GetSystemConfigVariantsByProductQueryHookResult = ReturnType<typeof useGetSystemConfigVariantsByProductQuery>;
export type GetSystemConfigVariantsByProductLazyQueryHookResult = ReturnType<typeof useGetSystemConfigVariantsByProductLazyQuery>;
export type GetSystemConfigVariantsByProductSuspenseQueryHookResult = ReturnType<typeof useGetSystemConfigVariantsByProductSuspenseQuery>;
export type GetSystemConfigVariantsByProductQueryResult = Apollo.QueryResult<GetSystemConfigVariantsByProductQuery, GetSystemConfigVariantsByProductQueryVariables>;
export const CreateSystemConfigVariantDocument = gql`
    mutation CreateSystemConfigVariant($createSystemConfigVariantInput: CreateSystemConfigVariantInput!) {
  createSystemConfigVariant(
    createSystemConfigVariantInput: $createSystemConfigVariantInput
  ) {
    color
    id
    isActive
    isDeleted
    model
    price
    productId
    size
  }
}
    `;
export type CreateSystemConfigVariantMutationFn = Apollo.MutationFunction<CreateSystemConfigVariantMutation, CreateSystemConfigVariantMutationVariables>;

/**
 * __useCreateSystemConfigVariantMutation__
 *
 * To run a mutation, you first call `useCreateSystemConfigVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSystemConfigVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSystemConfigVariantMutation, { data, loading, error }] = useCreateSystemConfigVariantMutation({
 *   variables: {
 *      createSystemConfigVariantInput: // value for 'createSystemConfigVariantInput'
 *   },
 * });
 */
export function useCreateSystemConfigVariantMutation(baseOptions?: Apollo.MutationHookOptions<CreateSystemConfigVariantMutation, CreateSystemConfigVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSystemConfigVariantMutation, CreateSystemConfigVariantMutationVariables>(CreateSystemConfigVariantDocument, options);
      }
export type CreateSystemConfigVariantMutationHookResult = ReturnType<typeof useCreateSystemConfigVariantMutation>;
export type CreateSystemConfigVariantMutationResult = Apollo.MutationResult<CreateSystemConfigVariantMutation>;
export type CreateSystemConfigVariantMutationOptions = Apollo.BaseMutationOptions<CreateSystemConfigVariantMutation, CreateSystemConfigVariantMutationVariables>;
export const UpdateSystemConfigVariantDocument = gql`
    mutation UpdateSystemConfigVariant($updateSystemConfigVariantInput: UpdateSystemConfigVariantInput!) {
  updateSystemConfigVariant(
    updateSystemConfigVariantInput: $updateSystemConfigVariantInput
  ) {
    color
    id
    isActive
    isDeleted
    model
    price
    productId
    size
  }
}
    `;
export type UpdateSystemConfigVariantMutationFn = Apollo.MutationFunction<UpdateSystemConfigVariantMutation, UpdateSystemConfigVariantMutationVariables>;

/**
 * __useUpdateSystemConfigVariantMutation__
 *
 * To run a mutation, you first call `useUpdateSystemConfigVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSystemConfigVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSystemConfigVariantMutation, { data, loading, error }] = useUpdateSystemConfigVariantMutation({
 *   variables: {
 *      updateSystemConfigVariantInput: // value for 'updateSystemConfigVariantInput'
 *   },
 * });
 */
export function useUpdateSystemConfigVariantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSystemConfigVariantMutation, UpdateSystemConfigVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSystemConfigVariantMutation, UpdateSystemConfigVariantMutationVariables>(UpdateSystemConfigVariantDocument, options);
      }
export type UpdateSystemConfigVariantMutationHookResult = ReturnType<typeof useUpdateSystemConfigVariantMutation>;
export type UpdateSystemConfigVariantMutationResult = Apollo.MutationResult<UpdateSystemConfigVariantMutation>;
export type UpdateSystemConfigVariantMutationOptions = Apollo.BaseMutationOptions<UpdateSystemConfigVariantMutation, UpdateSystemConfigVariantMutationVariables>;
export const RemoveSystemConfigVariantDocument = gql`
    mutation RemoveSystemConfigVariant($removeSystemConfigVariantId: String!) {
  removeSystemConfigVariant(id: $removeSystemConfigVariantId) {
    color
    id
    isActive
    isDeleted
    model
    price
    productId
    size
  }
}
    `;
export type RemoveSystemConfigVariantMutationFn = Apollo.MutationFunction<RemoveSystemConfigVariantMutation, RemoveSystemConfigVariantMutationVariables>;

/**
 * __useRemoveSystemConfigVariantMutation__
 *
 * To run a mutation, you first call `useRemoveSystemConfigVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSystemConfigVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSystemConfigVariantMutation, { data, loading, error }] = useRemoveSystemConfigVariantMutation({
 *   variables: {
 *      removeSystemConfigVariantId: // value for 'removeSystemConfigVariantId'
 *   },
 * });
 */
export function useRemoveSystemConfigVariantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSystemConfigVariantMutation, RemoveSystemConfigVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSystemConfigVariantMutation, RemoveSystemConfigVariantMutationVariables>(RemoveSystemConfigVariantDocument, options);
      }
export type RemoveSystemConfigVariantMutationHookResult = ReturnType<typeof useRemoveSystemConfigVariantMutation>;
export type RemoveSystemConfigVariantMutationResult = Apollo.MutationResult<RemoveSystemConfigVariantMutation>;
export type RemoveSystemConfigVariantMutationOptions = Apollo.BaseMutationOptions<RemoveSystemConfigVariantMutation, RemoveSystemConfigVariantMutationVariables>;
export const FindTasksByStaffIdDocument = gql`
    query FindTasksByStaffId($staffId: String!) {
  findTasksByStaffId(staffId: $staffId) {
    assignedDate
    assignee {
      id
      imageUrl
      email
      name
    }
    completedDate
    description
    expiredTime
    id
    note
    startDate
    status
    taskType
    taskname
  }
  user(id: $staffId) {
    createdAt
    createdBy
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
    staffedFactory {
      name
    }
    updatedAt
  }
}
    `;

/**
 * __useFindTasksByStaffIdQuery__
 *
 * To run a query within a React component, call `useFindTasksByStaffIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTasksByStaffIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTasksByStaffIdQuery({
 *   variables: {
 *      staffId: // value for 'staffId'
 *   },
 * });
 */
export function useFindTasksByStaffIdQuery(baseOptions: Apollo.QueryHookOptions<FindTasksByStaffIdQuery, FindTasksByStaffIdQueryVariables> & ({ variables: FindTasksByStaffIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTasksByStaffIdQuery, FindTasksByStaffIdQueryVariables>(FindTasksByStaffIdDocument, options);
      }
export function useFindTasksByStaffIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTasksByStaffIdQuery, FindTasksByStaffIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTasksByStaffIdQuery, FindTasksByStaffIdQueryVariables>(FindTasksByStaffIdDocument, options);
        }
export function useFindTasksByStaffIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTasksByStaffIdQuery, FindTasksByStaffIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTasksByStaffIdQuery, FindTasksByStaffIdQueryVariables>(FindTasksByStaffIdDocument, options);
        }
export type FindTasksByStaffIdQueryHookResult = ReturnType<typeof useFindTasksByStaffIdQuery>;
export type FindTasksByStaffIdLazyQueryHookResult = ReturnType<typeof useFindTasksByStaffIdLazyQuery>;
export type FindTasksByStaffIdSuspenseQueryHookResult = ReturnType<typeof useFindTasksByStaffIdSuspenseQuery>;
export type FindTasksByStaffIdQueryResult = Apollo.QueryResult<FindTasksByStaffIdQuery, FindTasksByStaffIdQueryVariables>;
export const GetMyUserBanksDocument = gql`
    query GetMyUserBanks {
  userBanks {
    accountName
    accountNumber
    bank {
      bin
      code
      id
      isActive
      isDeleted
      logo
      name
      shortName
    }
    bankId
    createdAt
    id
    isDefault
    updatedAt
  }
}
    `;

/**
 * __useGetMyUserBanksQuery__
 *
 * To run a query within a React component, call `useGetMyUserBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyUserBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyUserBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyUserBanksQuery(baseOptions?: Apollo.QueryHookOptions<GetMyUserBanksQuery, GetMyUserBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyUserBanksQuery, GetMyUserBanksQueryVariables>(GetMyUserBanksDocument, options);
      }
export function useGetMyUserBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyUserBanksQuery, GetMyUserBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyUserBanksQuery, GetMyUserBanksQueryVariables>(GetMyUserBanksDocument, options);
        }
export function useGetMyUserBanksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyUserBanksQuery, GetMyUserBanksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyUserBanksQuery, GetMyUserBanksQueryVariables>(GetMyUserBanksDocument, options);
        }
export type GetMyUserBanksQueryHookResult = ReturnType<typeof useGetMyUserBanksQuery>;
export type GetMyUserBanksLazyQueryHookResult = ReturnType<typeof useGetMyUserBanksLazyQuery>;
export type GetMyUserBanksSuspenseQueryHookResult = ReturnType<typeof useGetMyUserBanksSuspenseQuery>;
export type GetMyUserBanksQueryResult = Apollo.QueryResult<GetMyUserBanksQuery, GetMyUserBanksQueryVariables>;
export const GetUserBanksByUserIdDocument = gql`
    query GetUserBanksByUserId($userBanksByUserIdId: String!) {
  userBanksByUserId(id: $userBanksByUserIdId) {
    accountName
    accountNumber
    bank {
      bin
      code
      id
      isActive
      isDeleted
      logo
      name
      shortName
    }
    bankId
    createdAt
    id
    isDefault
    updatedAt
  }
}
    `;

/**
 * __useGetUserBanksByUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserBanksByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBanksByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBanksByUserIdQuery({
 *   variables: {
 *      userBanksByUserIdId: // value for 'userBanksByUserIdId'
 *   },
 * });
 */
export function useGetUserBanksByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserBanksByUserIdQuery, GetUserBanksByUserIdQueryVariables> & ({ variables: GetUserBanksByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserBanksByUserIdQuery, GetUserBanksByUserIdQueryVariables>(GetUserBanksByUserIdDocument, options);
      }
export function useGetUserBanksByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserBanksByUserIdQuery, GetUserBanksByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserBanksByUserIdQuery, GetUserBanksByUserIdQueryVariables>(GetUserBanksByUserIdDocument, options);
        }
export function useGetUserBanksByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserBanksByUserIdQuery, GetUserBanksByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserBanksByUserIdQuery, GetUserBanksByUserIdQueryVariables>(GetUserBanksByUserIdDocument, options);
        }
export type GetUserBanksByUserIdQueryHookResult = ReturnType<typeof useGetUserBanksByUserIdQuery>;
export type GetUserBanksByUserIdLazyQueryHookResult = ReturnType<typeof useGetUserBanksByUserIdLazyQuery>;
export type GetUserBanksByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetUserBanksByUserIdSuspenseQuery>;
export type GetUserBanksByUserIdQueryResult = Apollo.QueryResult<GetUserBanksByUserIdQuery, GetUserBanksByUserIdQueryVariables>;
export const CreateUserBankDocument = gql`
    mutation CreateUserBank($createUserBankInput: CreateUserBankInput!) {
  createUserBank(createUserBankInput: $createUserBankInput) {
    id
  }
}
    `;
export type CreateUserBankMutationFn = Apollo.MutationFunction<CreateUserBankMutation, CreateUserBankMutationVariables>;

/**
 * __useCreateUserBankMutation__
 *
 * To run a mutation, you first call `useCreateUserBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserBankMutation, { data, loading, error }] = useCreateUserBankMutation({
 *   variables: {
 *      createUserBankInput: // value for 'createUserBankInput'
 *   },
 * });
 */
export function useCreateUserBankMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserBankMutation, CreateUserBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserBankMutation, CreateUserBankMutationVariables>(CreateUserBankDocument, options);
      }
export type CreateUserBankMutationHookResult = ReturnType<typeof useCreateUserBankMutation>;
export type CreateUserBankMutationResult = Apollo.MutationResult<CreateUserBankMutation>;
export type CreateUserBankMutationOptions = Apollo.BaseMutationOptions<CreateUserBankMutation, CreateUserBankMutationVariables>;
export const UpdateUserBankDocument = gql`
    mutation UpdateUserBank($updateUserBankId: String!, $updateUserBankInput: UpdateUserBankInput!) {
  updateUserBank(id: $updateUserBankId, updateUserBankInput: $updateUserBankInput) {
    id
  }
}
    `;
export type UpdateUserBankMutationFn = Apollo.MutationFunction<UpdateUserBankMutation, UpdateUserBankMutationVariables>;

/**
 * __useUpdateUserBankMutation__
 *
 * To run a mutation, you first call `useUpdateUserBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserBankMutation, { data, loading, error }] = useUpdateUserBankMutation({
 *   variables: {
 *      updateUserBankId: // value for 'updateUserBankId'
 *      updateUserBankInput: // value for 'updateUserBankInput'
 *   },
 * });
 */
export function useUpdateUserBankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserBankMutation, UpdateUserBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserBankMutation, UpdateUserBankMutationVariables>(UpdateUserBankDocument, options);
      }
export type UpdateUserBankMutationHookResult = ReturnType<typeof useUpdateUserBankMutation>;
export type UpdateUserBankMutationResult = Apollo.MutationResult<UpdateUserBankMutation>;
export type UpdateUserBankMutationOptions = Apollo.BaseMutationOptions<UpdateUserBankMutation, UpdateUserBankMutationVariables>;
export const DeleteUserBankDocument = gql`
    mutation DeleteUserBank($deleteUserBankId: String!) {
  deleteUserBank(id: $deleteUserBankId) {
    id
  }
}
    `;
export type DeleteUserBankMutationFn = Apollo.MutationFunction<DeleteUserBankMutation, DeleteUserBankMutationVariables>;

/**
 * __useDeleteUserBankMutation__
 *
 * To run a mutation, you first call `useDeleteUserBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserBankMutation, { data, loading, error }] = useDeleteUserBankMutation({
 *   variables: {
 *      deleteUserBankId: // value for 'deleteUserBankId'
 *   },
 * });
 */
export function useDeleteUserBankMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserBankMutation, DeleteUserBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserBankMutation, DeleteUserBankMutationVariables>(DeleteUserBankDocument, options);
      }
export type DeleteUserBankMutationHookResult = ReturnType<typeof useDeleteUserBankMutation>;
export type DeleteUserBankMutationResult = Apollo.MutationResult<DeleteUserBankMutation>;
export type DeleteUserBankMutationOptions = Apollo.BaseMutationOptions<DeleteUserBankMutation, DeleteUserBankMutationVariables>;
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
    isVerified
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
    isVerified
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
    isVerified
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
    isVerified
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
    isVerified
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
export function useGetAvailableStaffForFactoryQuery(baseOptions?: Apollo.QueryHookOptions<GetAvailableStaffForFactoryQuery, GetAvailableStaffForFactoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableStaffForFactoryQuery, GetAvailableStaffForFactoryQueryVariables>(GetAvailableStaffForFactoryDocument, options);
      }
export function useGetAvailableStaffForFactoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableStaffForFactoryQuery, GetAvailableStaffForFactoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableStaffForFactoryQuery, GetAvailableStaffForFactoryQueryVariables>(GetAvailableStaffForFactoryDocument, options);
        }
export function useGetAvailableStaffForFactorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAvailableStaffForFactoryQuery, GetAvailableStaffForFactoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAvailableStaffForFactoryQuery, GetAvailableStaffForFactoryQueryVariables>(GetAvailableStaffForFactoryDocument, options);
        }
export type GetAvailableStaffForFactoryQueryHookResult = ReturnType<typeof useGetAvailableStaffForFactoryQuery>;
export type GetAvailableStaffForFactoryLazyQueryHookResult = ReturnType<typeof useGetAvailableStaffForFactoryLazyQuery>;
export type GetAvailableStaffForFactorySuspenseQueryHookResult = ReturnType<typeof useGetAvailableStaffForFactorySuspenseQuery>;
export type GetAvailableStaffForFactoryQueryResult = Apollo.QueryResult<GetAvailableStaffForFactoryQuery, GetAvailableStaffForFactoryQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileDto!) {
  updateProfile(updateProfileInput: $updateProfileInput) {
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
    isVerified
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      updateProfileInput: // value for 'updateProfileInput'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdatePhoneNumberDocument = gql`
    mutation UpdatePhoneNumber($updatePhoneNumberInput: UpdatePhoneNumberDto!) {
  updatePhoneNumber(updatePhoneNumberInput: $updatePhoneNumberInput) {
    id
    phoneNumber
  }
}
    `;
export type UpdatePhoneNumberMutationFn = Apollo.MutationFunction<UpdatePhoneNumberMutation, UpdatePhoneNumberMutationVariables>;

/**
 * __useUpdatePhoneNumberMutation__
 *
 * To run a mutation, you first call `useUpdatePhoneNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePhoneNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePhoneNumberMutation, { data, loading, error }] = useUpdatePhoneNumberMutation({
 *   variables: {
 *      updatePhoneNumberInput: // value for 'updatePhoneNumberInput'
 *   },
 * });
 */
export function useUpdatePhoneNumberMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePhoneNumberMutation, UpdatePhoneNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePhoneNumberMutation, UpdatePhoneNumberMutationVariables>(UpdatePhoneNumberDocument, options);
      }
export type UpdatePhoneNumberMutationHookResult = ReturnType<typeof useUpdatePhoneNumberMutation>;
export type UpdatePhoneNumberMutationResult = Apollo.MutationResult<UpdatePhoneNumberMutation>;
export type UpdatePhoneNumberMutationOptions = Apollo.BaseMutationOptions<UpdatePhoneNumberMutation, UpdatePhoneNumberMutationVariables>;
export const AvailableVouchersDocument = gql`
    query AvailableVouchers {
  availableVouchers {
    code
    createdAt
    description
    id
    isActive
    isPublic
    limitedUsage
    minOrderValue
    type
    value
    userId
    updatedAt
    maxDiscountValue
    usages {
      voucherId
      usedAt
      orderId
      id
      user {
        id
        imageUrl
        name
        email
      }
    }
  }
}
    `;

/**
 * __useAvailableVouchersQuery__
 *
 * To run a query within a React component, call `useAvailableVouchersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableVouchersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableVouchersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableVouchersQuery(baseOptions?: Apollo.QueryHookOptions<AvailableVouchersQuery, AvailableVouchersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailableVouchersQuery, AvailableVouchersQueryVariables>(AvailableVouchersDocument, options);
      }
export function useAvailableVouchersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailableVouchersQuery, AvailableVouchersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailableVouchersQuery, AvailableVouchersQueryVariables>(AvailableVouchersDocument, options);
        }
export function useAvailableVouchersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AvailableVouchersQuery, AvailableVouchersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AvailableVouchersQuery, AvailableVouchersQueryVariables>(AvailableVouchersDocument, options);
        }
export type AvailableVouchersQueryHookResult = ReturnType<typeof useAvailableVouchersQuery>;
export type AvailableVouchersLazyQueryHookResult = ReturnType<typeof useAvailableVouchersLazyQuery>;
export type AvailableVouchersSuspenseQueryHookResult = ReturnType<typeof useAvailableVouchersSuspenseQuery>;
export type AvailableVouchersQueryResult = Apollo.QueryResult<AvailableVouchersQuery, AvailableVouchersQueryVariables>;
export const AllVouchersOfUserDocument = gql`
    query AllVouchersOfUser {
  allVouchersOfUser {
    code
    createdAt
    description
    id
    isActive
    isPublic
    limitedUsage
    minOrderValue
    type
    value
    userId
    updatedAt
    maxDiscountValue
    usages {
      voucherId
      usedAt
      orderId
      id
      user {
        id
        imageUrl
        name
        email
      }
    }
  }
}
    `;

/**
 * __useAllVouchersOfUserQuery__
 *
 * To run a query within a React component, call `useAllVouchersOfUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllVouchersOfUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllVouchersOfUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllVouchersOfUserQuery(baseOptions?: Apollo.QueryHookOptions<AllVouchersOfUserQuery, AllVouchersOfUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllVouchersOfUserQuery, AllVouchersOfUserQueryVariables>(AllVouchersOfUserDocument, options);
      }
export function useAllVouchersOfUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllVouchersOfUserQuery, AllVouchersOfUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllVouchersOfUserQuery, AllVouchersOfUserQueryVariables>(AllVouchersOfUserDocument, options);
        }
export function useAllVouchersOfUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllVouchersOfUserQuery, AllVouchersOfUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllVouchersOfUserQuery, AllVouchersOfUserQueryVariables>(AllVouchersOfUserDocument, options);
        }
export type AllVouchersOfUserQueryHookResult = ReturnType<typeof useAllVouchersOfUserQuery>;
export type AllVouchersOfUserLazyQueryHookResult = ReturnType<typeof useAllVouchersOfUserLazyQuery>;
export type AllVouchersOfUserSuspenseQueryHookResult = ReturnType<typeof useAllVouchersOfUserSuspenseQuery>;
export type AllVouchersOfUserQueryResult = Apollo.QueryResult<AllVouchersOfUserQuery, AllVouchersOfUserQueryVariables>;
export const AllVouchersOfSystemDocument = gql`
    query AllVouchersOfSystem {
  allSystemVouchers {
    code
    createdAt
    description
    id
    isActive
    isPublic
    limitedUsage
    minOrderValue
    type
    value
    userId
    updatedAt
    maxDiscountValue
    usages {
      voucherId
      usedAt
      orderId
      id
      user {
        id
        imageUrl
        name
        email
      }
    }
  }
}
    `;

/**
 * __useAllVouchersOfSystemQuery__
 *
 * To run a query within a React component, call `useAllVouchersOfSystemQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllVouchersOfSystemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllVouchersOfSystemQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllVouchersOfSystemQuery(baseOptions?: Apollo.QueryHookOptions<AllVouchersOfSystemQuery, AllVouchersOfSystemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllVouchersOfSystemQuery, AllVouchersOfSystemQueryVariables>(AllVouchersOfSystemDocument, options);
      }
export function useAllVouchersOfSystemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllVouchersOfSystemQuery, AllVouchersOfSystemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllVouchersOfSystemQuery, AllVouchersOfSystemQueryVariables>(AllVouchersOfSystemDocument, options);
        }
export function useAllVouchersOfSystemSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllVouchersOfSystemQuery, AllVouchersOfSystemQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllVouchersOfSystemQuery, AllVouchersOfSystemQueryVariables>(AllVouchersOfSystemDocument, options);
        }
export type AllVouchersOfSystemQueryHookResult = ReturnType<typeof useAllVouchersOfSystemQuery>;
export type AllVouchersOfSystemLazyQueryHookResult = ReturnType<typeof useAllVouchersOfSystemLazyQuery>;
export type AllVouchersOfSystemSuspenseQueryHookResult = ReturnType<typeof useAllVouchersOfSystemSuspenseQuery>;
export type AllVouchersOfSystemQueryResult = Apollo.QueryResult<AllVouchersOfSystemQuery, AllVouchersOfSystemQueryVariables>;
export const CreateVoucherDocument = gql`
    mutation CreateVoucher($input: CreateVoucherInput!) {
  createVoucher(input: $input) {
    code
    createdAt
    description
    id
    isActive
    isPublic
    limitedUsage
    minOrderValue
    type
    value
    userId
    updatedAt
    maxDiscountValue
    usages {
      voucherId
      usedAt
      orderId
      id
      user {
        id
        imageUrl
        name
        email
      }
    }
  }
}
    `;
export type CreateVoucherMutationFn = Apollo.MutationFunction<CreateVoucherMutation, CreateVoucherMutationVariables>;

/**
 * __useCreateVoucherMutation__
 *
 * To run a mutation, you first call `useCreateVoucherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoucherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoucherMutation, { data, loading, error }] = useCreateVoucherMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVoucherMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoucherMutation, CreateVoucherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVoucherMutation, CreateVoucherMutationVariables>(CreateVoucherDocument, options);
      }
export type CreateVoucherMutationHookResult = ReturnType<typeof useCreateVoucherMutation>;
export type CreateVoucherMutationResult = Apollo.MutationResult<CreateVoucherMutation>;
export type CreateVoucherMutationOptions = Apollo.BaseMutationOptions<CreateVoucherMutation, CreateVoucherMutationVariables>;