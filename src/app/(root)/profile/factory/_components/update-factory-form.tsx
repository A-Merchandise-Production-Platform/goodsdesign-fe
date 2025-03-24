'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BasicInformation,
  LegalInformation,
  QualitySpecialization,
  OperationalDetails,
  ContactInformation,
} from './sections';
import {
  factoryFormSchema,
  defaultValues,
  type FactoryFormValues,
} from './factory-form-schema';
import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useGetMyFactoryQuery } from '@/graphql/generated/graphql';

export default function UpdateFactoryForm() {
  const [activeTab, setActiveTab] = useState('basics');
  const { data, loading } = useGetMyFactoryQuery();

  const form = useForm<FactoryFormValues>({
    resolver: zodResolver(factoryFormSchema),
    defaultValues,
  });

  // Update form values when data is fetched
  useEffect(() => {
    if (data?.getMyFactory) {
      form.reset({
        name: data.getMyFactory.name,
        description: data.getMyFactory.description ?? '',
        website: data.getMyFactory.website ?? '',
        businessLicenseUrl: data.getMyFactory.businessLicenseUrl ?? '',
        taxIdentificationNumber:
          data.getMyFactory.taxIdentificationNumber ?? '',
        addressId: data.getMyFactory.addressId ?? '',
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
        submit: data.getMyFactory.isSubmitted ?? false,
      });
    }
  }, [data, form]);

  function onSubmit(data: FactoryFormValues) {
    console.log('Form submitted with values:', data);
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNextTab = () => {
    if (activeTab === 'basics') setActiveTab('legal');
    else if (activeTab === 'legal') setActiveTab('quality');
    else if (activeTab === 'quality') setActiveTab('operations');
    else if (activeTab === 'operations') setActiveTab('contact');
  };

  const handlePreviousTab = () => {
    if (activeTab === 'contact') setActiveTab('operations');
    else if (activeTab === 'operations') setActiveTab('quality');
    else if (activeTab === 'quality') setActiveTab('legal');
    else if (activeTab === 'legal') setActiveTab('basics');
  };

  return (
    <>
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basics">Basic Information</TabsTrigger>
                <TabsTrigger value="legal">Legal</TabsTrigger>
                <TabsTrigger value="quality">Quality & Expertise</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="basics">
                <BasicInformation form={form} />
                <div className="mt-4 flex justify-end">
                  <Button type="button" onClick={handleNextTab}>
                    Next
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="legal">
                <LegalInformation form={form} />
                <div className="mt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousTab}
                  >
                    <ArrowLeft className="size-4" />
                    Previous
                  </Button>
                  <Button type="button" onClick={handleNextTab}>
                    Next
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="quality">
                <QualitySpecialization form={form} />
                <div className="mt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousTab}
                  >
                    <ArrowLeft className="size-4" />
                    Previous
                  </Button>
                  <Button type="button" onClick={handleNextTab}>
                    Next
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="operations">
                <OperationalDetails form={form} />
                <div className="mt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousTab}
                  >
                    <ArrowLeft className="size-4" />
                    Previous
                  </Button>
                  <Button type="button" onClick={handleNextTab}>
                    Next
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="contact">
                <ContactInformation form={form} />
                <div className="mt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousTab}
                  >
                    <ArrowLeft className="size-4" />
                    Previous
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      )}
    </>
  );
}
