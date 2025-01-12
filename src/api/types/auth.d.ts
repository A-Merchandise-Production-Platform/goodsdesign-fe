import { ApiResponse } from './index';

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse extends ApiResponse<null> {}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse<Tokens> {}

export interface GetMeResponse extends ApiResponse<User> {}

export interface RegisterFOPayload {
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
  factoryName: string;
  factoryContactPerson: string;
  factoryContactPhone: string;
  factoryAddress: string;
  contractName: string;
  contractPaperUrl: string;
  selectedProducts: SelectedProduct[];
}

interface SelectedProduct {
  productId: string;
  productionCapacity: number;
}

export interface RegisterFOResponse extends ApiResponse<null> {}
