export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phoneNumber: string | null;
  gender: boolean;
  dateOfBirth: Date;
  role: string;
  imageUrl: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
