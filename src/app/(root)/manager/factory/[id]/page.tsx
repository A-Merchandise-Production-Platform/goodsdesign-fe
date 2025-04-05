'use client';

import { format } from 'date-fns';
import {
  ArrowLeft,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { DashboardShell } from '@/components/dashboard-shell';
import MyAvatar from '@/components/shared/my-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetFactoryByIdQuery } from '@/graphql/generated/graphql';

export default function FactoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: factoriesData } = useGetFactoryByIdQuery({
    variables: {
      factoryId: id,
    },
  });

  // Since we're using index for ID in the list page, get the factory by index
  const factory = factoriesData?.getFactoryById;

  if (!factory) {
    return (
      <DashboardShell
        title="Factory Not Found"
        subtitle="The factory you're looking for doesn't exist"
      >
        <Button
          variant="outline"
          className="w-fit"
          onClick={() => router.push('/manager/factory')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Factory List
        </Button>
      </DashboardShell>
    );
  }

  console.log(factory);

  // Format the address for display
  const formattedAddress = factory.address
    ? `${factory.address.street}, ${factory.address.wardCode}`
    : 'No address provided';

  return (
    <DashboardShell title={factory.name} subtitle="Factory Details">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger className="px-4" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="px-4" value="production">
            Production Capacity
          </TabsTrigger>
          <TabsTrigger className="px-4" value="contacts">
            Contacts
          </TabsTrigger>
          <TabsTrigger className="px-4" value="staff">
            Staff
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                    Status
                  </h3>
                  <Badge variant={getStatusVariant(factory.factoryStatus)}>
                    {factory.factoryStatus || 'Unknown'}
                  </Badge>
                </div>

                {factory.description && (
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Description
                    </h3>
                    <p>{factory.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                    Address
                  </h3>
                  <div className="flex items-center">
                    <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                    <span>{formattedAddress}</span>
                  </div>
                </div>

                {factory.establishedDate && (
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Established Date
                    </h3>
                    <div className="flex items-center">
                      <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                      <span>
                        {format(
                          new Date(factory.establishedDate),
                          'MMMM dd, yyyy',
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {factory.website && (
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Website
                    </h3>
                    <div className="flex items-center">
                      <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                      <a
                        href={factory.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {factory.website}
                      </a>
                    </div>
                  </div>
                )}

                {factory.businessLicenseUrl && (
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Business License
                    </h3>
                    <a
                      href={factory.businessLicenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View License
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {factory.totalEmployees && (
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Total Employees
                    </h3>
                    <span>{factory.totalEmployees}</span>
                  </div>
                )}

                {factory.taxIdentificationNumber && (
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Tax ID
                    </h3>
                    <span>{factory.taxIdentificationNumber}</span>
                  </div>
                )}

                {factory.owner && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Owner Information
                    </h3>
                    <div className="flex items-center gap-3">
                      <MyAvatar
                        imageUrl={factory.owner.imageUrl || ''}
                        name={factory.owner.name || ''}
                      />
                      <div>
                        <p className="font-medium">{factory.owner.name}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <span>{factory.owner.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {factory.specializations &&
                    factory.specializations.length > 0 ? (
                      factory.specializations.map((spec, i) => (
                        <Badge key={i} variant="outline">
                          {spec}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No specializations provided
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Printing Methods
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {factory.printingMethods &&
                    factory.printingMethods.length > 0 ? (
                      factory.printingMethods.map((method, i) => (
                        <Badge key={i} variant="outline">
                          {method}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No printing methods provided
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {factory.leadTime !== null &&
                  factory.leadTime !== undefined && (
                    <div>
                      <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                        Lead Time
                      </h3>
                      <span>{factory.leadTime} days</span>
                    </div>
                  )}

                {factory.minimumOrderQuantity !== null &&
                  factory.minimumOrderQuantity !== undefined && (
                    <div>
                      <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                        Minimum Order Quantity
                      </h3>
                      <span>{factory.minimumOrderQuantity} units</span>
                    </div>
                  )}

                {factory.maxPrintingCapacity !== null &&
                  factory.maxPrintingCapacity !== undefined && (
                    <div>
                      <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                        Maximum Printing Capacity
                      </h3>
                      <span>{factory.maxPrintingCapacity} units</span>
                    </div>
                  )}

                {factory.operationalHours && (
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Operational Hours
                    </h3>
                    <span>{factory.operationalHours}</span>
                  </div>
                )}
              </div>

              <Separator />

              {factory.products && factory.products.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium">Product Variants</h3>
                    <Badge variant="outline">
                      {factory.products.length} variants available
                    </Badge>
                  </div>

                  <Card>
                    <CardHeader className="px-4 py-3">
                      <CardTitle className="text-sm">
                        Available Variants by Size & Color
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="p-3 text-left text-sm font-medium">
                                Size
                              </th>
                              <th className="p-3 text-left text-sm font-medium">
                                Color
                              </th>
                              <th className="p-3 text-left text-sm font-medium">
                                Capacity
                              </th>
                              <th className="p-3 text-left text-sm font-medium">
                                Est. Time
                              </th>
                              <th className="p-3 text-left text-sm font-medium">
                                Variant ID
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {factory.products.map((product, index) => (
                              <tr
                                key={product.systemConfigVariantId}
                                className={`border-t ${index % 2 === 0 ? '' : 'bg-muted/30'}`}
                              >
                                <td className="p-3 text-sm">
                                  {product.systemConfigVariant?.size || 'N/A'}
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center">
                                    <div
                                      className="mr-2 size-4 rounded-full border"
                                      style={{
                                        backgroundColor:
                                          product.systemConfigVariant?.color ||
                                          '#ccc',
                                        borderColor:
                                          product.systemConfigVariant?.color ===
                                          '#ffffff'
                                            ? '#ccc'
                                            : product.systemConfigVariant
                                                ?.color || '#ccc',
                                      }}
                                    />
                                    <span className="text-sm">
                                      {product.systemConfigVariant?.color ||
                                        'N/A'}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-3 text-sm">
                                  {product.productionCapacity} units
                                </td>
                                <td className="p-3 text-sm">
                                  {product.estimatedProductionTime} hours
                                </td>
                                <td className="p-3 font-mono text-sm text-xs">
                                  {product.systemConfigVariantId}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium">Total Variants</h4>
                        <p className="mt-1 text-2xl font-bold">
                          {factory.products.length}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium">Unique Colors</h4>
                        <p className="mt-1 text-2xl font-bold">
                          {
                            new Set(
                              factory.products.map(
                                p => p.systemConfigVariant?.color,
                              ),
                            ).size
                          }
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium">Unique Sizes</h4>
                        <p className="mt-1 text-2xl font-bold">
                          {
                            new Set(
                              factory.products.map(
                                p => p.systemConfigVariant?.size,
                              ),
                            ).size
                          }
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium">
                          Avg Production Time
                        </h4>
                        <p className="mt-1 text-2xl font-bold">
                          {(
                            factory.products.reduce(
                              (acc, curr) => acc + curr.estimatedProductionTime,
                              0,
                            ) / factory.products.length
                          ).toFixed(1)}
                          h
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-dashed p-6 text-center">
                  <h3 className="text-lg font-medium">No Product Variants</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    This factory doesn&apos;t have any product variants configured.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Add Product Variants
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {factory.contactPersonName ||
              factory.contactPersonRole ||
              factory.contactPersonPhone ? (
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-md mb-3 font-semibold">
                      Primary Contact
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {factory.contactPersonName && (
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-sm">Name</p>
                          <div className="flex items-center">
                            <User className="text-muted-foreground mr-2 h-4 w-4" />
                            <p className="font-medium">
                              {factory.contactPersonName}
                            </p>
                          </div>
                        </div>
                      )}

                      {factory.contactPersonRole && (
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-sm">
                            Position
                          </p>
                          <p className="font-medium">
                            {factory.contactPersonRole}
                          </p>
                        </div>
                      )}

                      {factory.contactPersonPhone && (
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-sm">Phone</p>
                          <div className="flex items-center">
                            <Phone className="text-muted-foreground mr-2 h-4 w-4" />
                            <p className="font-medium">
                              {factory.contactPersonPhone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {factory.owner && (
                    <div className="rounded-lg border p-4">
                      <h3 className="text-md mb-3 font-semibold">
                        Owner Contact
                      </h3>
                      <div className="mb-4 flex items-center gap-3">
                        <MyAvatar
                          imageUrl={factory.owner.imageUrl || ''}
                          name={factory.owner.name || ''}
                        />
                        <div>
                          <p className="font-medium">{factory.owner.name}</p>
                          <p className="text-muted-foreground text-sm">
                            Factory Owner
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {factory.owner.email && (
                          <div className="space-y-1">
                            <p className="text-muted-foreground text-sm">
                              Email
                            </p>
                            <div className="flex items-center">
                              <Mail className="text-muted-foreground mr-2 h-4 w-4" />
                              <p className="font-medium">
                                {factory.owner.email}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="rounded-lg border p-4">
                    <h3 className="text-md mb-3 font-semibold">
                      Factory Location
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-sm">Address</p>
                        <div className="flex items-center">
                          <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                          <p className="font-medium">{formattedAddress}</p>
                        </div>
                      </div>

                      {factory.website && (
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-sm">
                            Website
                          </p>
                          <div className="flex items-center">
                            <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                            <a
                              href={factory.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {factory.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <h3 className="text-lg font-medium">
                    No Contact Information
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    This factory doesn&apos;t have any contact details available.
                  </p>
                  <Button className="mt-4">
                    <User className="mr-2 h-4 w-4" />
                    Add Contact Information
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Factory Staff</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {factory.staff ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Staff Manager
                    </h3>
                    <div className="flex items-center gap-3">
                      <MyAvatar
                        imageUrl={factory.staff.imageUrl || ''}
                        name={factory.staff.name || ''}
                      />
                      <div>
                        <p className="font-medium">{factory.staff.name}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          <span>{factory.staff.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500">
                        Management Actions
                      </h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Assign New Staff
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Staff
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-md border border-dashed p-6 text-center">
                    <h3 className="text-lg font-medium">No Staff Assigned</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      This factory doesn&apos;t currently have any staff assigned to
                      manage operations.
                    </p>
                    <Button className="mt-4">
                      <User className="mr-2 h-4 w-4" />
                      Assign Staff
                    </Button>
                  </div>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Factory Management Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between rounded-md border p-3">
                          <div className="font-medium">Owner</div>
                          <div>{factory.owner?.name || 'Not specified'}</div>
                        </div>
                        <div className="flex justify-between rounded-md border p-3">
                          <div className="font-medium">Factory Manager</div>
                          <div className="text-muted-foreground">
                            Not assigned
                          </div>
                        </div>
                        <div className="flex justify-between rounded-md border p-3">
                          <div className="font-medium">Contact Person</div>
                          <div>
                            {factory.contactPersonName || 'Not specified'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

// Helper function to determine badge variant based on status
function getStatusVariant(
  status: string | null | undefined,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (!status) return 'default';

  const statusMap: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
  > = {
    PENDING: 'default',
    ACTIVE: 'secondary',
    INACTIVE: 'secondary',
    REJECTED: 'destructive',
    UNDER_REVIEW: 'outline',
  };

  return statusMap[status] || 'default';
}
