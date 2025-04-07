'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGetMyFactoryQuery,
  useUpdateFactoryInfoMutation,
} from '@/graphql/generated/graphql';

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

export default function UpdateFactoryForm() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('basics');
  const { data, loading, error } = useGetMyFactoryQuery();
  const isSubmitted = data?.getMyFactory?.isSubmitted ?? false;

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
            }
          : undefined,
        totalEmployees: data.getMyFactory.totalEmployees ?? 0,
        maxPrintingCapacity: data.getMyFactory.maxPrintingCapacity ?? 0,
        operationalHours: data.getMyFactory.operationalHours ?? '',
        leadTime: data.getMyFactory.leadTime ?? 0,
        minimumOrderQuantity: data.getMyFactory.minimumOrderQuantity ?? 0,
        qualityCertifications: data.getMyFactory.qualityCertifications ?? '',
        printingMethods: data.getMyFactory.printingMethods ?? [],
        specializations: data.getMyFactory.specializations ?? [],
        contactPersonName: data.getMyFactory.contactPersonName ?? '',
        contactPersonPhone: data.getMyFactory.contactPersonPhone ?? '',
        systemConfigVariantIds:
          data.getMyFactory.products?.map(
            product => product.systemConfigVariantId,
          ) ?? [],
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
        },
      },
    });
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNextTab = () => {
    if (activeTab === 'basics') setActiveTab('legal');
    else if (activeTab === 'legal') setActiveTab('quality');
    else if (activeTab === 'quality') setActiveTab('operations');
    else if (activeTab === 'operations') setActiveTab('contact');
    else if (activeTab === 'contact') setActiveTab('product');
  };

  const handlePreviousTab = () => {
    if (activeTab === 'product') setActiveTab('contact');
    else if (activeTab === 'contact') setActiveTab('operations');
    else if (activeTab === 'operations') setActiveTab('quality');
    else if (activeTab === 'quality') setActiveTab('legal');
    else if (activeTab === 'legal') setActiveTab('basics');
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
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="border-primary h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="basics">Basic Information</TabsTrigger>
                  <TabsTrigger value="legal">Legal</TabsTrigger>
                  <TabsTrigger value="product">Product</TabsTrigger>
                  <TabsTrigger value="quality">Quality & Expertise</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
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
                    <Button type="submit">
                      {updateFactoryInfoLoading
                        ? 'Updating...'
                        : 'Update Factory'}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        )}
      </div>
    );
  }
}
