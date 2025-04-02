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

export type CheckQuality = {
  __typename?: 'CheckQuality';
  checkedAt: Scalars['DateTime']['output'];
  checkedBy?: Maybe<Scalars['String']['output']>;
  factoryOrderDetail?: Maybe<FactoryOrderDetailEntity>;
  factoryOrderDetailId?: Maybe<Scalars['ID']['output']>;
  failedQuantity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  orderDetail?: Maybe<CustomerOrderDetailEntity>;
  orderDetailId: Scalars['ID']['output'];
  passedQuantity: Scalars['Int']['output'];
  reworkRequired: Scalars['Boolean']['output'];
  status: QualityCheckStatus;
  taskId: Scalars['ID']['output'];
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

export type CreateNotificationDto = {
  content?: InputMaybe<Scalars['String']['input']>;
  isRead?: Scalars['Boolean']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateOrderDetailDto = {
  cartItemId: Scalars['String']['input'];
};

export type CreateOrderDto = {
  orderDetails: Array<CreateOrderDetailDto>;
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

export type CustomerOrderDetailEntity = {
  __typename?: 'CustomerOrderDetailEntity';
  design?: Maybe<ProductDesignEntity>;
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
  customer?: Maybe<UserEntity>;
  customerId: Scalars['String']['output'];
  depositPaid: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderDate: Scalars['DateTime']['output'];
  orderDetails?: Maybe<Array<CustomerOrderDetailEntity>>;
  payments?: Maybe<Array<PaymentEntity>>;
  shippingPrice: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  totalPrice: Scalars['Int']['output'];
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
  products: Array<FactoryProductEntity>;
  qualityCertifications?: Maybe<Scalars['String']['output']>;
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewedBy?: Maybe<Scalars['String']['output']>;
  specializations: Array<Scalars['String']['output']>;
  statusNote?: Maybe<Scalars['String']['output']>;
  taxIdentificationNumber?: Maybe<Scalars['String']['output']>;
  totalEmployees?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type FactoryOrder = {
  __typename?: 'FactoryOrder';
  acceptanceDeadline: Scalars['DateTime']['output'];
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  assignedAt: Scalars['DateTime']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentProgress?: Maybe<Scalars['Int']['output']>;
  customerOrder?: Maybe<CustomerOrderEntity>;
  customerOrderId: Scalars['String']['output'];
  delayReason?: Maybe<Scalars['String']['output']>;
  estimatedCompletionDate?: Maybe<Scalars['DateTime']['output']>;
  factoryId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDelayed: Scalars['Boolean']['output'];
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  orderDetails?: Maybe<Array<FactoryOrderDetailEntity>>;
  progressReports?: Maybe<Array<FactoryProgressReport>>;
  qualityIssues?: Maybe<Array<QualityIssue>>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  status: FactoryOrderStatus;
  tasks?: Maybe<Array<TaskEntity>>;
  totalItems: Scalars['Int']['output'];
  totalProductionCost: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FactoryOrderDetailEntity = {
  __typename?: 'FactoryOrderDetailEntity';
  checkQualities?: Maybe<Array<CheckQuality>>;
  completedQty: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  design: ProductDesign;
  designId: Scalars['ID']['output'];
  factoryOrder?: Maybe<FactoryOrder>;
  factoryOrderId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  orderDetail: CustomerOrderDetailEntity;
  orderDetailId: Scalars['ID']['output'];
  price: Scalars['Int']['output'];
  productionCost: Scalars['Int']['output'];
  qualityCheckedAt?: Maybe<Scalars['DateTime']['output']>;
  qualityCheckedBy?: Maybe<Scalars['String']['output']>;
  qualityStatus?: Maybe<QualityCheckStatus>;
  quantity: Scalars['Int']['output'];
  rejectedQty: Scalars['Int']['output'];
  status: OrderStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum FactoryOrderStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  InProduction = 'IN_PRODUCTION',
  PendingAcceptance = 'PENDING_ACCEPTANCE',
  Rejected = 'REJECTED',
  Shipped = 'SHIPPED',
}

export type FactoryProductEntity = {
  __typename?: 'FactoryProductEntity';
  estimatedProductionTime: Scalars['Int']['output'];
  factoryId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  productionCapacity: Scalars['Int']['output'];
  systemConfigVariantId: Scalars['String']['output'];
};

export type FactoryProgressReport = {
  __typename?: 'FactoryProgressReport';
  completedQty: Scalars['Int']['output'];
  estimatedCompletion: Scalars['DateTime']['output'];
  factoryOrder?: Maybe<FactoryOrder>;
  factoryOrderId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
  photoUrls: Array<Scalars['String']['output']>;
  reportDate: Scalars['DateTime']['output'];
};

export enum FactoryStatus {
  Approved = 'APPROVED',
  PendingApproval = 'PENDING_APPROVAL',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED',
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
  completeStaffTask: StaffTask;
  createAddress: AddressEntity;
  createCartItem: CartItemEntity;
  createCategory: CategoryEntity;
  createCheckQuality: CheckQuality;
  createNotification: NotificationEntity;
  createOrder: CustomerOrderEntity;
  createPayment: Scalars['String']['output'];
  createPaymentTransaction: PaymentTransaction;
  createProduct: ProductEntity;
  createProductDesign: ProductDesignEntity;
  createProductPositionType: ProductPositionTypeEntity;
  createSystemConfigBank: SystemConfigBankEntity;
  createSystemConfigDiscount: SystemConfigDiscountEntity;
  createSystemConfigVariant: SystemConfigVariantEntity;
  createUser: UserEntity;
  deleteAddress: AddressEntity;
  deleteCartItem: CartItemEntity;
  deleteCategory: CategoryEntity;
  deleteProduct: ProductEntity;
  deleteUser: UserEntity;
  login: AuthResponseDto;
  logout: Scalars['String']['output'];
  markAllNotificationsAsRead: Array<NotificationEntity>;
  markFactoryOrderAsDelayed: FactoryOrder;
  markNotificationAsRead: NotificationEntity;
  refreshToken: AuthResponseDto;
  register: AuthResponseDto;
  removeNotification: NotificationEntity;
  removePaymentTransaction: PaymentTransaction;
  removeProductDesign: ProductDesignEntity;
  removeProductPositionType: ProductPositionTypeEntity;
  removeSystemConfigBank: SystemConfigBankEntity;
  removeSystemConfigDiscount: SystemConfigDiscountEntity;
  removeSystemConfigVariant: SystemConfigVariantEntity;
  restoreCategory: CategoryEntity;
  restoreProduct: ProductEntity;
  sendEmail: Scalars['Boolean']['output'];
  toggleActiveCategory: CategoryEntity;
  toggleActiveProduct: ProductEntity;
  updateAddress: AddressEntity;
  updateCartItem: CartItemEntity;
  updateCategory: CategoryEntity;
  updateCheckQualityStatus: CheckQuality;
  updateDesignPosition: DesignPositionEntity;
  updateFactoryInfo: FactoryEntity;
  updateFactoryOrderStatus: FactoryOrder;
  updateNotification: NotificationEntity;
  updatePaymentTransaction: PaymentTransaction;
  updateProduct: ProductEntity;
  updateProductDesign: ProductDesignEntity;
  updateProductPositionType: ProductPositionTypeEntity;
  updateStaffTaskStatus: StaffTask;
  updateSystemConfigBank: SystemConfigBankEntity;
  updateSystemConfigDiscount: SystemConfigDiscountEntity;
  updateSystemConfigVariant: SystemConfigVariantEntity;
  updateUser: UserEntity;
  uploadFile: FileUploadResponse;
};

export type MutationCalculateShippingFeeArgs = {
  input: CalculateShippingFeeDto;
};

export type MutationCompleteStaffTaskArgs = {
  id: Scalars['ID']['input'];
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

export type MutationCreateCheckQualityArgs = {
  factoryOrderDetailId?: InputMaybe<Scalars['ID']['input']>;
  failedQuantity: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  orderDetailId: Scalars['ID']['input'];
  passedQuantity: Scalars['Float']['input'];
  reworkRequired: Scalars['Boolean']['input'];
  status: QualityCheckStatus;
  taskId: Scalars['ID']['input'];
  totalChecked: Scalars['Float']['input'];
};

export type MutationCreateNotificationArgs = {
  input: CreateNotificationDto;
};

export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderDto;
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

export type MutationDeleteAddressArgs = {
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

export type MutationMarkFactoryOrderAsDelayedArgs = {
  id: Scalars['ID']['input'];
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

export type MutationRemoveNotificationArgs = {
  id: Scalars['ID']['input'];
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

export type MutationRestoreCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationRestoreProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationSendEmailArgs = {
  to: Scalars['String']['input'];
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

export type MutationUpdateCheckQualityStatusArgs = {
  id: Scalars['ID']['input'];
  status: QualityCheckStatus;
};

export type MutationUpdateDesignPositionArgs = {
  input: UpdateDesignPositionDto;
};

export type MutationUpdateFactoryInfoArgs = {
  updateFactoryInfoInput: UpdateFactoryInfoDto;
};

export type MutationUpdateFactoryOrderStatusArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationDto;
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

export type MutationUpdateStaffTaskStatusArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type MutationUpdateSystemConfigBankArgs = {
  input: UpdateSystemConfigBankDto;
};

export type MutationUpdateSystemConfigDiscountArgs = {
  id: Scalars['String']['input'];
  updateDiscountInput: UpdateSystemConfigDiscountDto;
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
  userId: Scalars['String']['output'];
};

export enum OrderStatus {
  Accepted = 'ACCEPTED',
  AssignedToFactory = 'ASSIGNED_TO_FACTORY',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Delivered = 'DELIVERED',
  InProduction = 'IN_PRODUCTION',
  PaymentReceived = 'PAYMENT_RECEIVED',
  Pending = 'PENDING',
}

export type PaymentEntity = {
  __typename?: 'PaymentEntity';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order?: Maybe<CustomerOrderEntity>;
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

export type PaymentTransaction = {
  __typename?: 'PaymentTransaction';
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

export type PaymentTransactionEntity = {
  __typename?: 'PaymentTransactionEntity';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  paymentGatewayTransactionId: Scalars['String']['output'];
  paymentId: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  status: Scalars['String']['output'];
  transactionLog: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ProductDesign = {
  __typename?: 'ProductDesign';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isFinalized: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isTemplate: Scalars['Boolean']['output'];
  systemConfigVariant: SystemConfigVariantEntity;
  systemConfigVariantId: Scalars['ID']['output'];
  user: UserEntity;
  userId: Scalars['ID']['output'];
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

export enum QualityCheckStatus {
  Approved = 'APPROVED',
  PartialApproved = 'PARTIAL_APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type QualityIssue = {
  __typename?: 'QualityIssue';
  assignedTo?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  factoryOrder?: Maybe<FactoryOrder>;
  factoryOrderId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  issueType: Scalars['String']['output'];
  photoUrls: Array<Scalars['String']['output']>;
  reportedAt: Scalars['DateTime']['output'];
  reportedBy?: Maybe<Scalars['String']['output']>;
  resolution?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  resolvedBy?: Maybe<Scalars['String']['output']>;
  status: QualityIssueStatus;
};

export enum QualityIssueStatus {
  Investigating = 'INVESTIGATING',
  Rejected = 'REJECTED',
  Reported = 'REPORTED',
  Resolved = 'RESOLVED',
}

export type Query = {
  __typename?: 'Query';
  address: AddressEntity;
  addresses: Array<AddressEntity>;
  availableServices: Array<ShippingService>;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  checkQualities: Array<CheckQuality>;
  checkQualitiesByTask: Array<CheckQuality>;
  checkQuality: CheckQuality;
  designPosition: DesignPositionEntity;
  distinctVariantAttributes: VariantAttributes;
  district: District;
  districts: Array<District>;
  factoryOrder: FactoryOrder;
  factoryOrders: Array<FactoryOrder>;
  factoryOrdersByCustomerOrder: Array<FactoryOrder>;
  factoryOrdersByFactory: Array<FactoryOrder>;
  getAllDiscountByProductId: Array<SystemConfigDiscountEntity>;
  getApplicableDiscount: Scalars['Float']['output'];
  getCartItem: CartItemEntity;
  getCartItemCount: Scalars['Float']['output'];
  getMe: UserEntity;
  getMyFactory: FactoryEntity;
  myStaffTasks: Array<StaffTask>;
  notification: NotificationEntity;
  notifications: Array<NotificationEntity>;
  paymentTransaction?: Maybe<PaymentTransaction>;
  paymentTransactions: Array<PaymentTransaction>;
  paymentTransactionsByCustomer: Array<PaymentTransaction>;
  paymentTransactionsByPayment: Array<PaymentTransaction>;
  product: ProductEntity;
  productDesign: ProductDesignEntity;
  productDesigns: Array<ProductDesignEntity>;
  productPositionType: ProductPositionTypeEntity;
  productPositionTypes: Array<ProductPositionTypeEntity>;
  products: Array<ProductEntity>;
  province: Province;
  provinces: Array<Province>;
  staffTask: StaffTask;
  staffTasks: Array<StaffTask>;
  staffTasksByTask: Array<StaffTask>;
  systemConfigBank: SystemConfigBankEntity;
  systemConfigBanks: Array<SystemConfigBankEntity>;
  systemConfigDiscount: SystemConfigDiscountEntity;
  systemConfigDiscounts: Array<SystemConfigDiscountEntity>;
  systemConfigVariant: SystemConfigVariantEntity;
  systemConfigVariants: Array<SystemConfigVariantEntity>;
  systemConfigVariantsByProduct: Array<SystemConfigVariantEntity>;
  user: UserEntity;
  userCartItems: Array<CartItemEntity>;
  userOrder: CustomerOrderEntity;
  userOrders: Array<CustomerOrderEntity>;
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

export type QueryCheckQualitiesByTaskArgs = {
  taskId: Scalars['ID']['input'];
};

export type QueryCheckQualityArgs = {
  id: Scalars['ID']['input'];
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

export type QueryFactoryOrderArgs = {
  id: Scalars['ID']['input'];
};

export type QueryFactoryOrdersByCustomerOrderArgs = {
  customerOrderId: Scalars['ID']['input'];
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

export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
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

export type QueryStaffTaskArgs = {
  id: Scalars['ID']['input'];
};

export type QueryStaffTasksByTaskArgs = {
  taskId: Scalars['ID']['input'];
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

export type QueryUserOrderArgs = {
  userOrderId: Scalars['String']['input'];
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
  Staff = 'STAFF',
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

export type StaffTask = {
  __typename?: 'StaffTask';
  assignedDate: Scalars['DateTime']['output'];
  completedDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  task: TaskEntity;
  taskId: Scalars['ID']['output'];
  user: UserEntity;
  userId: Scalars['ID']['output'];
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
  assignedBy?: Maybe<Scalars['String']['output']>;
  checkQualities: Array<CheckQuality>;
  description: Scalars['String']['output'];
  expiredTime: Scalars['DateTime']['output'];
  factoryOrderId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  qualityCheckStatus: QualityCheckStatus;
  staffTasks?: Maybe<Array<StaffTask>>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  taskType?: Maybe<Scalars['String']['output']>;
  taskname: Scalars['String']['output'];
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

export type UpdateSystemConfigDiscountDto = {
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
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
      factory?: {
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
      factory?: {
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
      factory?: {
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
    factory?: {
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
    userId: string;
    quantity: number;
    id: string;
    design?: {
      __typename?: 'ProductDesignEntity';
      isTemplate: boolean;
      isPublic: boolean;
      isFinalized: boolean;
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
          id: string;
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
        positionType?: {
          __typename?: 'ProductPositionTypeEntity';
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
    addressId?: string | null;
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
    owner: {
      __typename?: 'UserEntity';
      email?: string | null;
      name?: string | null;
      imageUrl?: string | null;
    };
    products: Array<{ __typename?: 'FactoryProductEntity'; id: string }>;
  };
};

export type UpdateFactoryInfoMutationVariables = Exact<{
  updateFactoryInfoInput: UpdateFactoryInfoDto;
}>;

export type UpdateFactoryInfoMutation = {
  __typename?: 'Mutation';
  updateFactoryInfo: {
    __typename?: 'FactoryEntity';
    addressId?: string | null;
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
    owner: {
      __typename?: 'UserEntity';
      email?: string | null;
      name?: string | null;
      imageUrl?: string | null;
    };
    products: Array<{ __typename?: 'FactoryProductEntity'; id: string }>;
  };
};

export type UpdateFactoryOrderStatusMutationVariables = Exact<{
  updateFactoryOrderStatusId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;

export type UpdateFactoryOrderStatusMutation = {
  __typename?: 'Mutation';
  updateFactoryOrderStatus: { __typename?: 'FactoryOrder'; id: string };
};

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderDto;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder: { __typename?: 'CustomerOrderEntity'; id: string };
};

export type GetMyOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyOrdersQuery = {
  __typename?: 'Query';
  userOrders: Array<{
    __typename?: 'CustomerOrderEntity';
    customerId: string;
    depositPaid: number;
    id: string;
    orderDate: any;
    shippingPrice: number;
    status: string;
    totalPrice: number;
    orderDetails?: Array<{
      __typename?: 'CustomerOrderDetailEntity';
      designId: string;
      id: string;
      orderId: string;
      price: number;
      qualityCheckStatus: string;
      quantity: number;
      reworkStatus: string;
      status: string;
    }> | null;
  }>;
};

export type GetUserOrderQueryVariables = Exact<{
  userOrderId: Scalars['String']['input'];
}>;

export type GetUserOrderQuery = {
  __typename?: 'Query';
  userOrder: {
    __typename?: 'CustomerOrderEntity';
    customerId: string;
    depositPaid: number;
    id: string;
    orderDate: any;
    shippingPrice: number;
    status: string;
    totalPrice: number;
    orderDetails?: Array<{
      __typename?: 'CustomerOrderDetailEntity';
      designId: string;
      id: string;
      orderId: string;
      price: number;
      qualityCheckStatus: string;
      quantity: number;
      reworkStatus: string;
      status: string;
    }> | null;
    customer?: {
      __typename?: 'UserEntity';
      createdAt: any;
      createdBy?: string | null;
      dateOfBirth?: any | null;
      deletedAt?: any | null;
      deletedBy?: string | null;
      email?: string | null;
      gender: boolean;
      id: string;
      imageUrl?: string | null;
      name?: string | null;
      phoneNumber?: string | null;
      role: Roles;
    } | null;
    payments?: Array<{
      __typename?: 'PaymentEntity';
      amount: number;
      createdAt: any;
      customerId: string;
      id: string;
      orderId: string;
      paymentLog: string;
      status: string;
      type: string;
      transactions?: Array<{
        __typename?: 'PaymentTransactionEntity';
        amount: number;
        createdAt: any;
        customerId: string;
        id: string;
        paymentGatewayTransactionId: string;
        paymentId: string;
        paymentMethod: string;
        status: string;
        transactionLog: string;
        type: string;
      }> | null;
    }> | null;
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

export type GetCurrentFactoryOrdersQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetCurrentFactoryOrdersQuery = {
  __typename?: 'Query';
  factoryOrdersByFactory: Array<{
    __typename?: 'FactoryOrder';
    acceptanceDeadline: any;
    factoryId: string;
    id: string;
    status: FactoryOrderStatus;
    createdAt: any;
    updatedAt?: any | null;
    customerOrder?: {
      __typename?: 'CustomerOrderEntity';
      id: string;
      orderDate: any;
      orderDetails?: Array<{
        __typename?: 'CustomerOrderDetailEntity';
        design?: {
          __typename?: 'ProductDesignEntity';
          designPositions?: Array<{
            __typename?: 'DesignPositionEntity';
            designId: string;
            designJSON?: any | null;
            productPositionTypeId: string;
            positionType?: {
              __typename?: 'ProductPositionTypeEntity';
              positionName: string;
            } | null;
          }> | null;
        } | null;
      }> | null;
    } | null;
  }>;
};

export type GetFactoryOrderQueryVariables = Exact<{
  factoryOrderId: Scalars['ID']['input'];
}>;

export type GetFactoryOrderQuery = {
  __typename?: 'Query';
  factoryOrder: {
    __typename?: 'FactoryOrder';
    acceptanceDeadline: any;
    factoryId: string;
    id: string;
    status: FactoryOrderStatus;
    createdAt: any;
    updatedAt?: any | null;
    totalProductionCost: number;
    totalItems: number;
    rejectionReason?: string | null;
    assignedAt: any;
    completedAt?: any | null;
    acceptedAt?: any | null;
    currentProgress?: number | null;
    delayReason?: string | null;
    estimatedCompletionDate?: any | null;
    isDelayed: boolean;
    lastUpdated?: any | null;
    customerOrder?: {
      __typename?: 'CustomerOrderEntity';
      id: string;
      orderDate: any;
      orderDetails?: Array<{
        __typename?: 'CustomerOrderDetailEntity';
        design?: {
          __typename?: 'ProductDesignEntity';
          designPositions?: Array<{
            __typename?: 'DesignPositionEntity';
            designId: string;
            designJSON?: any | null;
            productPositionTypeId: string;
            positionType?: {
              __typename?: 'ProductPositionTypeEntity';
              positionName: string;
            } | null;
          }> | null;
        } | null;
      }> | null;
    } | null;
    progressReports?: Array<{
      __typename?: 'FactoryProgressReport';
      completedQty: number;
      estimatedCompletion: any;
      factoryOrderId: string;
      id: string;
      notes: string;
      photoUrls: Array<string>;
      reportDate: any;
    }> | null;
    orderDetails?: Array<{
      __typename?: 'FactoryOrderDetailEntity';
      completedQty: number;
      createdAt: any;
      factoryOrderId: string;
      id: string;
      orderDetailId: string;
      price: number;
      productionCost: number;
      qualityCheckedAt?: any | null;
      qualityCheckedBy?: string | null;
      qualityStatus?: QualityCheckStatus | null;
      quantity: number;
      rejectedQty: number;
      status: OrderStatus;
      updatedAt?: any | null;
      checkQualities?: Array<{
        __typename?: 'CheckQuality';
        checkedAt: any;
        checkedBy?: string | null;
        factoryOrderDetailId?: string | null;
        failedQuantity: number;
        id: string;
        note?: string | null;
        orderDetailId: string;
        passedQuantity: number;
        reworkRequired: boolean;
        status: QualityCheckStatus;
        taskId: string;
        totalChecked: number;
      }> | null;
    }> | null;
  };
};

export type ProductDesignByIdQueryVariables = Exact<{
  productDesignId: Scalars['ID']['input'];
}>;

export type ProductDesignByIdQuery = {
  __typename?: 'Query';
  productDesign: {
    __typename?: 'ProductDesignEntity';
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

export type GetAllDiscountByProductIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;

export type GetAllDiscountByProductIdQuery = {
  __typename?: 'Query';
  getAllDiscountByProductId: Array<{
    __typename?: 'SystemConfigDiscountEntity';
    id: string;
    discountPercent: number;
    minQuantity: number;
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

export type GetMyStaffTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyStaffTasksQuery = {
  __typename?: 'Query';
  myStaffTasks: Array<{
    __typename?: 'StaffTask';
    status: string;
    note?: string | null;
    completedDate?: any | null;
    assignedDate: any;
    id: string;
    task: {
      __typename?: 'TaskEntity';
      assignedBy?: string | null;
      description: string;
      expiredTime: any;
      id: string;
      qualityCheckStatus: QualityCheckStatus;
      startDate: any;
      status: string;
      taskType?: string | null;
      taskname: string;
      checkQualities: Array<{
        __typename?: 'CheckQuality';
        checkedAt: any;
        checkedBy?: string | null;
        failedQuantity: number;
        id: string;
        note?: string | null;
        passedQuantity: number;
        reworkRequired: boolean;
        status: QualityCheckStatus;
        taskId: string;
        totalChecked: number;
        factoryOrderDetail?: {
          __typename?: 'FactoryOrderDetailEntity';
          completedQty: number;
          createdAt: any;
          designId: string;
          factoryOrderId: string;
          id: string;
          orderDetailId: string;
          price: number;
          productionCost: number;
          qualityCheckedAt?: any | null;
          qualityCheckedBy?: string | null;
          qualityStatus?: QualityCheckStatus | null;
          quantity: number;
          rejectedQty: number;
          status: OrderStatus;
          updatedAt?: any | null;
          factoryOrder?: {
            __typename?: 'FactoryOrder';
            status: FactoryOrderStatus;
            isDelayed: boolean;
            estimatedCompletionDate?: any | null;
            completedAt?: any | null;
            acceptanceDeadline: any;
            factoryId: string;
            createdAt: any;
            updatedAt?: any | null;
          } | null;
        } | null;
        orderDetail?: {
          __typename?: 'CustomerOrderDetailEntity';
          id: string;
          orderId: string;
          price: number;
          qualityCheckStatus: string;
          quantity: number;
          reworkStatus: string;
          status: string;
          design?: {
            __typename?: 'ProductDesignEntity';
            isTemplate: boolean;
            isPublic: boolean;
            isFinalized: boolean;
            designPositions?: Array<{
              __typename?: 'DesignPositionEntity';
              designId: string;
              designJSON?: any | null;
              positionType?: {
                __typename?: 'ProductPositionTypeEntity';
                positionName: string;
                basePrice: number;
              } | null;
            }> | null;
            systemConfigVariant?: {
              __typename?: 'SystemConfigVariantEntity';
              model?: string | null;
              size?: string | null;
              price?: number | null;
              product: {
                __typename?: 'ProductEntity';
                name: string;
                weight?: number | null;
                imageUrl?: string | null;
              };
            } | null;
          } | null;
        } | null;
      }>;
    };
  }>;
};

export type GetStaffTaskDetailQueryVariables = Exact<{
  staffTaskId: Scalars['ID']['input'];
}>;

export type GetStaffTaskDetailQuery = {
  __typename?: 'Query';
  staffTask: {
    __typename?: 'StaffTask';
    status: string;
    note?: string | null;
    completedDate?: any | null;
    assignedDate: any;
    id: string;
    task: {
      __typename?: 'TaskEntity';
      assignedBy?: string | null;
      description: string;
      expiredTime: any;
      id: string;
      qualityCheckStatus: QualityCheckStatus;
      startDate: any;
      status: string;
      taskType?: string | null;
      taskname: string;
      checkQualities: Array<{
        __typename?: 'CheckQuality';
        checkedAt: any;
        checkedBy?: string | null;
        failedQuantity: number;
        id: string;
        note?: string | null;
        passedQuantity: number;
        reworkRequired: boolean;
        status: QualityCheckStatus;
        taskId: string;
        totalChecked: number;
        factoryOrderDetail?: {
          __typename?: 'FactoryOrderDetailEntity';
          completedQty: number;
          createdAt: any;
          designId: string;
          factoryOrderId: string;
          id: string;
          orderDetailId: string;
          price: number;
          productionCost: number;
          qualityCheckedAt?: any | null;
          qualityCheckedBy?: string | null;
          qualityStatus?: QualityCheckStatus | null;
          quantity: number;
          rejectedQty: number;
          status: OrderStatus;
          updatedAt?: any | null;
          factoryOrder?: {
            __typename?: 'FactoryOrder';
            status: FactoryOrderStatus;
            isDelayed: boolean;
            estimatedCompletionDate?: any | null;
            completedAt?: any | null;
            acceptanceDeadline: any;
            factoryId: string;
            createdAt: any;
            updatedAt?: any | null;
          } | null;
        } | null;
        orderDetail?: {
          __typename?: 'CustomerOrderDetailEntity';
          id: string;
          orderId: string;
          price: number;
          qualityCheckStatus: string;
          quantity: number;
          reworkStatus: string;
          status: string;
          design?: {
            __typename?: 'ProductDesignEntity';
            isTemplate: boolean;
            isPublic: boolean;
            isFinalized: boolean;
            designPositions?: Array<{
              __typename?: 'DesignPositionEntity';
              designId: string;
              designJSON?: any | null;
              positionType?: {
                __typename?: 'ProductPositionTypeEntity';
                positionName: string;
                basePrice: number;
              } | null;
            }> | null;
            systemConfigVariant?: {
              __typename?: 'SystemConfigVariantEntity';
              model?: string | null;
              size?: string | null;
              price?: number | null;
              product: {
                __typename?: 'ProductEntity';
                name: string;
                weight?: number | null;
                imageUrl?: string | null;
              };
            } | null;
          } | null;
        } | null;
      }>;
    };
  };
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
        factory {
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
        factory {
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
      userId
      quantity
      id
      design {
        isTemplate
        isPublic
        isFinalized
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
            discounts {
              minQuantity
              name
              discountPercent
            }
            id
          }
          productId
          size
        }
        designPositions {
          positionType {
            positionName
            basePrice
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
      }
      qualityCertifications
      specializations
      taxIdentificationNumber
      totalEmployees
      website
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
export const UpdateFactoryOrderStatusDocument = gql`
  mutation UpdateFactoryOrderStatus(
    $updateFactoryOrderStatusId: ID!
    $status: String!
  ) {
    updateFactoryOrderStatus(id: $updateFactoryOrderStatusId, status: $status) {
      id
    }
  }
`;
export type UpdateFactoryOrderStatusMutationFn = Apollo.MutationFunction<
  UpdateFactoryOrderStatusMutation,
  UpdateFactoryOrderStatusMutationVariables
>;

/**
 * __useUpdateFactoryOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateFactoryOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFactoryOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFactoryOrderStatusMutation, { data, loading, error }] = useUpdateFactoryOrderStatusMutation({
 *   variables: {
 *      updateFactoryOrderStatusId: // value for 'updateFactoryOrderStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateFactoryOrderStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFactoryOrderStatusMutation,
    UpdateFactoryOrderStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateFactoryOrderStatusMutation,
    UpdateFactoryOrderStatusMutationVariables
  >(UpdateFactoryOrderStatusDocument, options);
}
export type UpdateFactoryOrderStatusMutationHookResult = ReturnType<
  typeof useUpdateFactoryOrderStatusMutation
>;
export type UpdateFactoryOrderStatusMutationResult =
  Apollo.MutationResult<UpdateFactoryOrderStatusMutation>;
export type UpdateFactoryOrderStatusMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateFactoryOrderStatusMutation,
    UpdateFactoryOrderStatusMutationVariables
  >;
export const CreateOrderDocument = gql`
  mutation CreateOrder($createOrderInput: CreateOrderDto!) {
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
    userOrders {
      customerId
      depositPaid
      id
      orderDate
      orderDetails {
        designId
        id
        orderId
        price
        qualityCheckStatus
        quantity
        reworkStatus
        status
      }
      shippingPrice
      status
      totalPrice
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
export const GetUserOrderDocument = gql`
  query GetUserOrder($userOrderId: String!) {
    userOrder(userOrderId: $userOrderId) {
      customerId
      depositPaid
      id
      orderDate
      orderDetails {
        designId
        id
        orderId
        price
        qualityCheckStatus
        quantity
        reworkStatus
        status
      }
      shippingPrice
      status
      totalPrice
      customer {
        createdAt
        createdBy
        dateOfBirth
        deletedAt
        deletedBy
        email
        gender
        id
        imageUrl
        name
        phoneNumber
        role
      }
      payments {
        amount
        createdAt
        customerId
        id
        orderId
        paymentLog
        status
        transactions {
          amount
          createdAt
          customerId
          id
          paymentGatewayTransactionId
          paymentId
          paymentMethod
          status
          transactionLog
          type
        }
        type
      }
    }
  }
`;

/**
 * __useGetUserOrderQuery__
 *
 * To run a query within a React component, call `useGetUserOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserOrderQuery({
 *   variables: {
 *      userOrderId: // value for 'userOrderId'
 *   },
 * });
 */
export function useGetUserOrderQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserOrderQuery,
    GetUserOrderQueryVariables
  > &
    (
      | { variables: GetUserOrderQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserOrderQuery, GetUserOrderQueryVariables>(
    GetUserOrderDocument,
    options,
  );
}
export function useGetUserOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserOrderQuery,
    GetUserOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserOrderQuery, GetUserOrderQueryVariables>(
    GetUserOrderDocument,
    options,
  );
}
export function useGetUserOrderSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUserOrderQuery,
        GetUserOrderQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserOrderQuery, GetUserOrderQueryVariables>(
    GetUserOrderDocument,
    options,
  );
}
export type GetUserOrderQueryHookResult = ReturnType<
  typeof useGetUserOrderQuery
>;
export type GetUserOrderLazyQueryHookResult = ReturnType<
  typeof useGetUserOrderLazyQuery
>;
export type GetUserOrderSuspenseQueryHookResult = ReturnType<
  typeof useGetUserOrderSuspenseQuery
>;
export type GetUserOrderQueryResult = Apollo.QueryResult<
  GetUserOrderQuery,
  GetUserOrderQueryVariables
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
export const GetCurrentFactoryOrdersDocument = gql`
  query GetCurrentFactoryOrders {
    factoryOrdersByFactory {
      acceptanceDeadline
      factoryId
      id
      status
      createdAt
      updatedAt
      customerOrder {
        id
        orderDate
        orderDetails {
          design {
            designPositions {
              designId
              designJSON
              positionType {
                positionName
              }
              productPositionTypeId
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetCurrentFactoryOrdersQuery__
 *
 * To run a query within a React component, call `useGetCurrentFactoryOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentFactoryOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentFactoryOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentFactoryOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentFactoryOrdersQuery,
    GetCurrentFactoryOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCurrentFactoryOrdersQuery,
    GetCurrentFactoryOrdersQueryVariables
  >(GetCurrentFactoryOrdersDocument, options);
}
export function useGetCurrentFactoryOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentFactoryOrdersQuery,
    GetCurrentFactoryOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCurrentFactoryOrdersQuery,
    GetCurrentFactoryOrdersQueryVariables
  >(GetCurrentFactoryOrdersDocument, options);
}
export function useGetCurrentFactoryOrdersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCurrentFactoryOrdersQuery,
        GetCurrentFactoryOrdersQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCurrentFactoryOrdersQuery,
    GetCurrentFactoryOrdersQueryVariables
  >(GetCurrentFactoryOrdersDocument, options);
}
export type GetCurrentFactoryOrdersQueryHookResult = ReturnType<
  typeof useGetCurrentFactoryOrdersQuery
>;
export type GetCurrentFactoryOrdersLazyQueryHookResult = ReturnType<
  typeof useGetCurrentFactoryOrdersLazyQuery
>;
export type GetCurrentFactoryOrdersSuspenseQueryHookResult = ReturnType<
  typeof useGetCurrentFactoryOrdersSuspenseQuery
>;
export type GetCurrentFactoryOrdersQueryResult = Apollo.QueryResult<
  GetCurrentFactoryOrdersQuery,
  GetCurrentFactoryOrdersQueryVariables
>;
export const GetFactoryOrderDocument = gql`
  query GetFactoryOrder($factoryOrderId: ID!) {
    factoryOrder(id: $factoryOrderId) {
      acceptanceDeadline
      factoryId
      id
      status
      createdAt
      updatedAt
      customerOrder {
        id
        orderDate
        orderDetails {
          design {
            designPositions {
              designId
              designJSON
              positionType {
                positionName
              }
              productPositionTypeId
            }
          }
        }
      }
      totalProductionCost
      totalItems
      rejectionReason
      progressReports {
        completedQty
        estimatedCompletion
        factoryOrderId
        id
        notes
        photoUrls
        reportDate
      }
      assignedAt
      completedAt
      acceptedAt
      currentProgress
      delayReason
      estimatedCompletionDate
      isDelayed
      lastUpdated
      orderDetails {
        checkQualities {
          checkedAt
          checkedBy
          factoryOrderDetailId
          failedQuantity
          id
          note
          orderDetailId
          passedQuantity
          reworkRequired
          status
          taskId
          totalChecked
        }
        completedQty
        createdAt
        factoryOrderId
        id
        orderDetailId
        price
        productionCost
        qualityCheckedAt
        qualityCheckedBy
        qualityStatus
        quantity
        rejectedQty
        status
        updatedAt
      }
    }
  }
`;

/**
 * __useGetFactoryOrderQuery__
 *
 * To run a query within a React component, call `useGetFactoryOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFactoryOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFactoryOrderQuery({
 *   variables: {
 *      factoryOrderId: // value for 'factoryOrderId'
 *   },
 * });
 */
export function useGetFactoryOrderQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFactoryOrderQuery,
    GetFactoryOrderQueryVariables
  > &
    (
      | { variables: GetFactoryOrderQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFactoryOrderQuery, GetFactoryOrderQueryVariables>(
    GetFactoryOrderDocument,
    options,
  );
}
export function useGetFactoryOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFactoryOrderQuery,
    GetFactoryOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFactoryOrderQuery,
    GetFactoryOrderQueryVariables
  >(GetFactoryOrderDocument, options);
}
export function useGetFactoryOrderSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetFactoryOrderQuery,
        GetFactoryOrderQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetFactoryOrderQuery,
    GetFactoryOrderQueryVariables
  >(GetFactoryOrderDocument, options);
}
export type GetFactoryOrderQueryHookResult = ReturnType<
  typeof useGetFactoryOrderQuery
>;
export type GetFactoryOrderLazyQueryHookResult = ReturnType<
  typeof useGetFactoryOrderLazyQuery
>;
export type GetFactoryOrderSuspenseQueryHookResult = ReturnType<
  typeof useGetFactoryOrderSuspenseQuery
>;
export type GetFactoryOrderQueryResult = Apollo.QueryResult<
  GetFactoryOrderQuery,
  GetFactoryOrderQueryVariables
>;
export const ProductDesignByIdDocument = gql`
  query ProductDesignById($productDesignId: ID!) {
    productDesign(id: $productDesignId) {
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
export const GetAllDiscountByProductIdDocument = gql`
  query GetAllDiscountByProductId($productId: String!) {
    getAllDiscountByProductId(productId: $productId) {
      id
      discountPercent
      minQuantity
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
export function useGetAllDiscountByProductIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllDiscountByProductIdQuery,
    GetAllDiscountByProductIdQueryVariables
  > &
    (
      | { variables: GetAllDiscountByProductIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllDiscountByProductIdQuery,
    GetAllDiscountByProductIdQueryVariables
  >(GetAllDiscountByProductIdDocument, options);
}
export function useGetAllDiscountByProductIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllDiscountByProductIdQuery,
    GetAllDiscountByProductIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllDiscountByProductIdQuery,
    GetAllDiscountByProductIdQueryVariables
  >(GetAllDiscountByProductIdDocument, options);
}
export function useGetAllDiscountByProductIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllDiscountByProductIdQuery,
        GetAllDiscountByProductIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllDiscountByProductIdQuery,
    GetAllDiscountByProductIdQueryVariables
  >(GetAllDiscountByProductIdDocument, options);
}
export type GetAllDiscountByProductIdQueryHookResult = ReturnType<
  typeof useGetAllDiscountByProductIdQuery
>;
export type GetAllDiscountByProductIdLazyQueryHookResult = ReturnType<
  typeof useGetAllDiscountByProductIdLazyQuery
>;
export type GetAllDiscountByProductIdSuspenseQueryHookResult = ReturnType<
  typeof useGetAllDiscountByProductIdSuspenseQuery
>;
export type GetAllDiscountByProductIdQueryResult = Apollo.QueryResult<
  GetAllDiscountByProductIdQuery,
  GetAllDiscountByProductIdQueryVariables
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
export const GetMyStaffTasksDocument = gql`
  query GetMyStaffTasks {
    myStaffTasks {
      status
      note
      task {
        assignedBy
        checkQualities {
          checkedAt
          checkedBy
          failedQuantity
          id
          note
          passedQuantity
          reworkRequired
          status
          taskId
          totalChecked
          factoryOrderDetail {
            completedQty
            createdAt
            designId
            factoryOrder {
              status
              isDelayed
              estimatedCompletionDate
              completedAt
              acceptanceDeadline
              factoryId
              createdAt
              updatedAt
            }
            factoryOrderId
            id
            orderDetailId
            price
            productionCost
            qualityCheckedAt
            qualityCheckedBy
            qualityStatus
            quantity
            rejectedQty
            status
            updatedAt
          }
          orderDetail {
            design {
              isTemplate
              isPublic
              isFinalized
              designPositions {
                designId
                designJSON
                positionType {
                  positionName
                  basePrice
                }
              }
              systemConfigVariant {
                model
                size
                price
                product {
                  name
                  weight
                  imageUrl
                }
              }
            }
            id
            orderId
            price
            qualityCheckStatus
            quantity
            reworkStatus
            status
          }
        }
        description
        expiredTime
        id
        qualityCheckStatus
        startDate
        status
        taskType
        taskname
      }
      completedDate
      assignedDate
      id
    }
  }
`;

/**
 * __useGetMyStaffTasksQuery__
 *
 * To run a query within a React component, call `useGetMyStaffTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyStaffTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyStaffTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyStaffTasksQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyStaffTasksQuery,
    GetMyStaffTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyStaffTasksQuery, GetMyStaffTasksQueryVariables>(
    GetMyStaffTasksDocument,
    options,
  );
}
export function useGetMyStaffTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyStaffTasksQuery,
    GetMyStaffTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyStaffTasksQuery,
    GetMyStaffTasksQueryVariables
  >(GetMyStaffTasksDocument, options);
}
export function useGetMyStaffTasksSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyStaffTasksQuery,
        GetMyStaffTasksQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyStaffTasksQuery,
    GetMyStaffTasksQueryVariables
  >(GetMyStaffTasksDocument, options);
}
export type GetMyStaffTasksQueryHookResult = ReturnType<
  typeof useGetMyStaffTasksQuery
>;
export type GetMyStaffTasksLazyQueryHookResult = ReturnType<
  typeof useGetMyStaffTasksLazyQuery
>;
export type GetMyStaffTasksSuspenseQueryHookResult = ReturnType<
  typeof useGetMyStaffTasksSuspenseQuery
>;
export type GetMyStaffTasksQueryResult = Apollo.QueryResult<
  GetMyStaffTasksQuery,
  GetMyStaffTasksQueryVariables
>;
export const GetStaffTaskDetailDocument = gql`
  query GetStaffTaskDetail($staffTaskId: ID!) {
    staffTask(id: $staffTaskId) {
      status
      note
      task {
        assignedBy
        checkQualities {
          checkedAt
          checkedBy
          failedQuantity
          id
          note
          passedQuantity
          reworkRequired
          status
          taskId
          totalChecked
          factoryOrderDetail {
            completedQty
            createdAt
            designId
            factoryOrder {
              status
              isDelayed
              estimatedCompletionDate
              completedAt
              acceptanceDeadline
              factoryId
              createdAt
              updatedAt
            }
            factoryOrderId
            id
            orderDetailId
            price
            productionCost
            qualityCheckedAt
            qualityCheckedBy
            qualityStatus
            quantity
            rejectedQty
            status
            updatedAt
          }
          orderDetail {
            design {
              isTemplate
              isPublic
              isFinalized
              designPositions {
                designId
                designJSON
                positionType {
                  positionName
                  basePrice
                }
              }
              systemConfigVariant {
                model
                size
                price
                product {
                  name
                  weight
                  imageUrl
                }
              }
            }
            id
            orderId
            price
            qualityCheckStatus
            quantity
            reworkStatus
            status
          }
        }
        description
        expiredTime
        id
        qualityCheckStatus
        startDate
        status
        taskType
        taskname
      }
      completedDate
      assignedDate
      id
    }
  }
`;

/**
 * __useGetStaffTaskDetailQuery__
 *
 * To run a query within a React component, call `useGetStaffTaskDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffTaskDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffTaskDetailQuery({
 *   variables: {
 *      staffTaskId: // value for 'staffTaskId'
 *   },
 * });
 */
export function useGetStaffTaskDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetStaffTaskDetailQuery,
    GetStaffTaskDetailQueryVariables
  > &
    (
      | { variables: GetStaffTaskDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetStaffTaskDetailQuery,
    GetStaffTaskDetailQueryVariables
  >(GetStaffTaskDetailDocument, options);
}
export function useGetStaffTaskDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStaffTaskDetailQuery,
    GetStaffTaskDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetStaffTaskDetailQuery,
    GetStaffTaskDetailQueryVariables
  >(GetStaffTaskDetailDocument, options);
}
export function useGetStaffTaskDetailSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetStaffTaskDetailQuery,
        GetStaffTaskDetailQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetStaffTaskDetailQuery,
    GetStaffTaskDetailQueryVariables
  >(GetStaffTaskDetailDocument, options);
}
export type GetStaffTaskDetailQueryHookResult = ReturnType<
  typeof useGetStaffTaskDetailQuery
>;
export type GetStaffTaskDetailLazyQueryHookResult = ReturnType<
  typeof useGetStaffTaskDetailLazyQuery
>;
export type GetStaffTaskDetailSuspenseQueryHookResult = ReturnType<
  typeof useGetStaffTaskDetailSuspenseQuery
>;
export type GetStaffTaskDetailQueryResult = Apollo.QueryResult<
  GetStaffTaskDetailQuery,
  GetStaffTaskDetailQueryVariables
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
