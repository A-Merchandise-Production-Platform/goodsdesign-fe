export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  gender: boolean;
  dateOfBirth: Date;
  role: string;
  imageUrl: string;
}
