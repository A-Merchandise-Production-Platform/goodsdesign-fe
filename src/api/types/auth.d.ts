import { ApiResponse } from './index'

export interface RegisterPayload {
  email: string
  password: string
  confirmPassword: string
}

export interface RegisterResponse extends ApiResponse<User> {}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse extends ApiResponse<Tokens> {}
