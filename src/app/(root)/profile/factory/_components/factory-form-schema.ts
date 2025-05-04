import { z } from 'zod';

export const factoryFormSchema = z.object({
  // Basic Information
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .optional(),
  description: z.string().optional(),
  website: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
  establishedDate: z.date().optional(),

  // Legal Information
  businessLicenseUrl: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
  taxIdentificationNumber: z.string().optional(),
  addressInput: z.object({
    provinceId: z.number().int().positive(),
    districtId: z.number().int().positive(),
    wardCode: z.string().min(1),
    street: z.string().min(1),
    formattedAddress: z.string().optional(),
  }),

  // Operational Details
  maxPrintingCapacity: z.number().int().positive().optional(),
  leadTime: z.number().int().positive().optional(),

  // Quality and Specialization
  qualityCertifications: z.string().optional(),
  printingMethods: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),

  // Contact Information
  contactPersonName: z.string().optional(),
  contactPersonRole: z.string().optional(),
  contactPersonPhone: z.string().optional(),

  // Product Variants
  systemConfigVariantIds: z.array(z.string()).optional(),
});

export type FactoryFormValues = z.infer<typeof factoryFormSchema>;

// Default values
export const defaultValues: Partial<FactoryFormValues> = {
  name: '',
  description: '',
  website: '',
  businessLicenseUrl: '',
  taxIdentificationNumber: '',
  addressInput: {
    provinceId: 202,
    districtId: 1442,
    wardCode: '20102',
    street: '123 Main St',
    formattedAddress: '123 Main St, HCM, Vietnam',
  },
  maxPrintingCapacity: undefined,
  qualityCertifications: '',
  printingMethods: [],
  specializations: [],
  contactPersonName: '',
  contactPersonRole: '',
  contactPersonPhone: '',
  leadTime: undefined,
  systemConfigVariantIds: [],
};
