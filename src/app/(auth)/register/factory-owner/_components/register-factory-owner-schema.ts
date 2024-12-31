import { z } from 'zod';

const RegisterFOSchema = z.object({
  // Step 1: Account Setup
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),

  // Step 2: User and Factory Details
  userName: z.string().min(1, 'Username is required.'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits.'),
  gender: z.boolean(),
  dateOfBirth: z.date(),
  imageUrl: z.string().url('Invalid URL for image.'),
  factoryName: z.string().min(1, 'Factory name is required.'),
  factoryContactPerson: z
    .string()
    .min(1, 'Factory contact person is required.'),
  factoryContactPhone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits.'),
  factoryAddress: z.string().min(1, 'Factory address is required.'),

  // Step 3: Contract and Product Details
  contractName: z.string().min(1, 'Contract name is required.'),
  contractPaperUrl: z.string().url('Invalid URL for contract paper.'),
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
});

export default RegisterFOSchema;

export type RegisterFOType = z.infer<typeof RegisterFOSchema>;

export const initialRegisterFOValues: RegisterFOType = {
  email: '',
  password: '',
  userName: '',
  phoneNumber: '',
  gender: true,
  dateOfBirth: new Date(),
  imageUrl: '',
  factoryName: '',
  factoryContactPerson: '',
  factoryContactPhone: '',
  factoryAddress: '',
  contractName: '',
  contractPaperUrl: '',
  selectedProducts: [],
};
