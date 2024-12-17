import { ODataQuery } from 'odata-query';

export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  gender: boolean;
  dateOfBirth: Date | null;
  imageUrl: string;
  isActive: boolean;
  isDeleted: boolean;
  address: string;
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date | null;
  updatedBy: string | null;
  roleId: string;
  role?: Role;
}

export interface Role {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string;
  users?: string[];
}

export interface CreateUserDto {
  email: string;
  password: string;
  userName: string;
  phoneNumber?: string;
  gender?: boolean;
  dateOfBirth?: Date;
  imageUrl?: string;
  role?: string;
}
