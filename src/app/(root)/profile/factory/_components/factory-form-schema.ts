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
  addressId: z.string().optional(),

  // Operational Details
  totalEmployees: z.number().int().positive().optional(),
  maxPrintingCapacity: z.number().int().positive().optional(),
  operationalHours: z.string().optional(),
  leadTime: z.number().int().positive().optional(),
  minimumOrderQuantity: z.number().int().positive().optional(),

  // Quality and Specialization
  qualityCertifications: z.string().optional(),
  printingMethods: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),

  // Contact Information
  contactPersonName: z.string().optional(),
  contactPersonRole: z.string().optional(),
  contactPersonPhone: z.string().optional(),

  // Submission
  submit: z.boolean().optional(),
});

export type FactoryFormValues = z.infer<typeof factoryFormSchema>;

// Default values
export const defaultValues: Partial<FactoryFormValues> = {
  name: '',
  description: '',
  website: '',
  businessLicenseUrl: '',
  taxIdentificationNumber: '',
  addressId: '',
  totalEmployees: undefined,
  maxPrintingCapacity: undefined,
  qualityCertifications: '',
  printingMethods: [],
  specializations: [],
  contactPersonName: '',
  contactPersonRole: '',
  contactPersonPhone: '',
  operationalHours: '',
  leadTime: undefined,
  minimumOrderQuantity: undefined,
  submit: false,
};
