'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGetMyFactoryQuery,
  useUpdateFactoryInfoMutation,
} from '@/graphql/generated/graphql';
import { cn } from '@/lib/utils';

import {
  defaultValues,
  factoryFormSchema,
  type FactoryFormValues,
} from './factory-form-schema';
import {
  BasicInformation,
  ContactInformation,
  FactoryInfoDisplay,
  LegalInformation,
  OperationalDetails,
  ProductSelection,
  QualitySpecialization,
} from './sections';
import { useAuthStore } from '@/stores/auth.store';

// Create a context to share required field info with form components
export const RequiredFieldsContext = createContext<string[]>([]);

// A component to indicate required fields
export const RequiredIndicator = () => (
  <span className="ml-1 text-red-500">*</span>
);

// Add this helper function to count errors in each section
const getErrorsInSection = (
  errors: Record<string, any>,
  sectionFields: string[],
): number => {
  return sectionFields.reduce((count, field) => {
    return count + (errors[field] ? 1 : 0);
  }, 0);
};

export default function UpdateFactoryForm() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('basics');
  const { data, loading, error } = useGetMyFactoryQuery({
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });
  const isSubmitted = data?.getMyFactory?.isSubmitted ?? false;

  // Determine required fields based on schema
  const requiredFields = Object.entries(factoryFormSchema.shape)
    .filter(([_, schema]) => !schema.isOptional?.())
    .map(([fieldName]) => fieldName);

  const form = useForm<FactoryFormValues>({
    resolver: zodResolver(factoryFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data?.getMyFactory) {
      form.reset({
        name: data.getMyFactory.name,
        description: data.getMyFactory.description ?? '',
        website: data.getMyFactory.website ?? '',
        businessLicenseUrl: data.getMyFactory.businessLicenseUrl ?? '',
        taxIdentificationNumber:
          data.getMyFactory.taxIdentificationNumber ?? '',
        addressInput: data.getMyFactory.address
          ? {
              provinceId: data.getMyFactory.address.provinceID ?? 202,
              districtId: data.getMyFactory.address.districtID ?? 1442,
              wardCode: data.getMyFactory.address.wardCode ?? '20102',
              street: data.getMyFactory.address.street ?? '123 Main St',
              formattedAddress:
                data.getMyFactory.address.formattedAddress ??
                '123 Main St, HCM, Vietnam',
            }
          : undefined,
        maxPrintingCapacity: data.getMyFactory.maxPrintingCapacity ?? 0,
        leadTime: data.getMyFactory.leadTime ?? 0,
        qualityCertifications: data.getMyFactory.qualityCertifications ?? '',
        printingMethods: data.getMyFactory.printingMethods ?? [],
        specializations: data.getMyFactory.specializations ?? [],
        contactPersonName: data.getMyFactory.contactPersonName ?? '',
        contactPersonPhone:
          data.getMyFactory.contactPersonPhone ?? user?.phoneNumber ?? '',
        systemConfigVariantIds:
          data.getMyFactory.products?.map(
            product => product.systemConfigVariantId,
          ) ?? [],
        contactPersonRole: data.getMyFactory.contactPersonRole ?? '',
        productionTimeInMinutes: 0,
      });
    }
  }, [data, form]);

  const [updateFactoryInfo, { loading: updateFactoryInfoLoading }] =
    useUpdateFactoryInfoMutation({
      onCompleted: () => {
        toast.success('Factory information updated successfully');
      },
      onError: () => {
        toast.error('Failed to update factory information');
      },
      refetchQueries: ['GetMyFactory'],
    });

  function onSubmit(data: FactoryFormValues) {
    console.log(data);
    updateFactoryInfo({
      variables: {
        updateFactoryInfoInput: {
          ...data,
          addressInput: {
            provinceID: data.addressInput.provinceId,
            districtID: data.addressInput.districtId,
            wardCode: data.addressInput.wardCode,
            street: data.addressInput.street,
          },
          systemConfigVariantIds: data.systemConfigVariantIds,
          productionTimeInMinutes: data.productionTimeInMinutes,
        },
      },
    });
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNextTab = () => {
    if (activeTab === 'basics') setActiveTab('legal');
    else if (activeTab === 'legal') setActiveTab('product');
    else if (activeTab === 'product') setActiveTab('quality');
    else if (activeTab === 'quality') setActiveTab('operations');
    else if (activeTab === 'operations') setActiveTab('contact');
  };

  const handlePreviousTab = () => {
    if (activeTab === 'contact') setActiveTab('operations');
    else if (activeTab === 'operations') setActiveTab('quality');
    else if (activeTab === 'quality') setActiveTab('product');
    else if (activeTab === 'product') setActiveTab('legal');
    else if (activeTab === 'legal') setActiveTab('basics');
  };

  // Define fields for each section
  const sections = {
    basics: ['name', 'description', 'website'],
    legal: ['businessLicenseUrl', 'taxIdentificationNumber', 'addressInput'],
    product: ['systemConfigVariantIds'],
    quality: ['qualityCertifications', 'printingMethods', 'specializations'],
    operations: ['maxPrintingCapacity', 'leadTime'],
    contact: ['contactPersonName', 'contactPersonPhone'],
  };

  // Get error counts for each section
  const getTabErrorCount = (tabName: string) => {
    if (!form.formState.errors) return 0;
    return getErrorsInSection(
      form.formState.errors,
      sections[tabName as keyof typeof sections],
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-red-500">
          Failed to fetch factory information
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="space-y-4">
        <FactoryInfoDisplay factoryData={data?.getMyFactory ?? null} />
        {isNotificationOpen && (
          <div className="flex flex-1 items-center gap-2 rounded-md bg-green-500/20 px-4 py-2 shadow-md">
            <div className="flex-1">
              {isSubmitted ? (
                <span>
                  Your factory has been{' '}
                  <span className="text-green-500">submitted</span> and is{' '}
                  <span className="text-green-500">waiting</span> for approval
                  from our team.
                </span>
              ) : (
                <span>
                  Your factory currently are{' '}
                  <span className="text-red-400">not allowed</span> to work in
                  our system, please fill as much as possible fields to be
                  approved.
                </span>
              )}
            </div>
            <X
              className="size-4 cursor-pointer"
              onClick={() => setIsNotificationOpen(false)}
            />
          </div>
        )}

        <div className="mb-2 flex justify-end">
          <p className="text-muted-foreground text-sm">
            <span className="text-red-500">*</span> Required field
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="border-primary h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        ) : (
          <RequiredFieldsContext.Provider value={requiredFields}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 pb-8"
              >
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-6">
                    {Object.entries({
                      basics: 'Basic Information',
                      legal: 'Legal',
                      product: 'Product',
                      quality: 'Quality & Expertise',
                      operations: 'Operations',
                      contact: 'Contact',
                    }).map(([key, label]) => {
                      const errorCount = getTabErrorCount(key);
                      return (
                        <TabsTrigger
                          key={key}
                          value={key}
                          className={cn(
                            'relative',
                            errorCount > 0 && 'text-destructive',
                          )}
                        >
                          {label}
                          {errorCount > 0 && (
                            <span className="bg-destructive text-destructive-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                              {errorCount}
                            </span>
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  <TabsContent value="basics">
                    <BasicInformation form={form} disabled={isSubmitted} />
                    <div className="mt-4 flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        disabled={isSubmitted}
                      >
                        Next
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="legal">
                    <LegalInformation form={form} disabled={isSubmitted} />
                    <div className="mt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousTab}
                        disabled={isSubmitted}
                      >
                        <ArrowLeft className="size-4" />
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        disabled={isSubmitted}
                      >
                        Next
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="product">
                    <ProductSelection form={form} />
                    <div className="mt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousTab}
                        disabled={isSubmitted}
                      >
                        <ArrowLeft className="size-4" />
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        disabled={isSubmitted}
                      >
                        Next
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="quality">
                    <QualitySpecialization form={form} disabled={isSubmitted} />
                    <div className="mt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousTab}
                        disabled={isSubmitted}
                      >
                        <ArrowLeft className="size-4" />
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        disabled={isSubmitted}
                      >
                        Next
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="operations">
                    <OperationalDetails form={form} disabled={isSubmitted} />
                    <div className="mt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousTab}
                        disabled={isSubmitted}
                      >
                        <ArrowLeft className="size-4" />
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        disabled={isSubmitted}
                      >
                        Next
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="contact">
                    <ContactInformation form={form} disabled={isSubmitted} />
                    <div className="mt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousTab}
                        disabled={isSubmitted}
                      >
                        <ArrowLeft className="size-4" />
                        Previous
                      </Button>
                      <Button type="submit" disabled={isSubmitted}>
                        {updateFactoryInfoLoading
                          ? 'Updating...'
                          : 'Update Factory'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </Form>
          </RequiredFieldsContext.Provider>
        )}
      </div>
    );
  }
}
