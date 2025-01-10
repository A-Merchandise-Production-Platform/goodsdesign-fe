import { z } from 'zod';

const RegisterFOSchema = z
  .object({
    email: z.string().email('Invalid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long.'),
    userName: z.string().min(1, 'Username is required.'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits.'),
    factoryName: z.string().min(1, 'Factory name is required.'),
    factoryAddress: z.string().min(1, 'Factory address is required.'),
    selectedProducts: z
      .array(
        z.object({
          productId: z.string().uuid('Invalid product ID format.'),
          productionCapacity: z
            .number()
            .min(0, 'Production capacity must be non-negative.'),
          estimatedProductionTimwe: z
            .number()
            .min(0, 'Estimated production time must be non-negative.'),
        }),
      )
      .min(1, 'At least one product must be selected.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
  });

export default RegisterFOSchema;

export type RegisterFOType = z.infer<typeof RegisterFOSchema>;

export const initialRegisterFOValues: RegisterFOType = {
  email: '',
  password: '',
  confirmPassword: '',
  userName: '',
  phoneNumber: '',
  factoryName: '',
  factoryAddress: '',
  selectedProducts: [],
};
