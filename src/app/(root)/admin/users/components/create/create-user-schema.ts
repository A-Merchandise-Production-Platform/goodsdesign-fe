import { z } from 'zod';

export const createuserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  userName: z.string(),
  phoneNumber: z.string().optional(),
  gender: z.boolean().optional(),
  dateOfBirth: z.date().optional(),
  imageUrl: z.string().optional(),
  role: z.string().optional(),
});

export type CreateUserSchema = z.infer<typeof createuserSchema>;

export const createUserInitialValues: CreateUserSchema = {
  email: '',
  password: '',
  userName: '',
  phoneNumber: '',
};
