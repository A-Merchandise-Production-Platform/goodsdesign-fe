import { ApiResponse } from './index';

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

export type RegisterResponse = LoginResponse;

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type RefreshTokenResponse = LoginResponse;

export type GetMeResponse = User;

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
