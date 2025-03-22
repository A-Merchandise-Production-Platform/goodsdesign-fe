'use client';

import { useAuthStore } from '@/stores/auth.store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export default function FactoryPage() {
  const { user } = useAuthStore();
  const factory = user?.factory;

  if (!factory) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Factory Information</CardTitle>
          <CardDescription>
            You don't have any factory associated with your account.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{factory.name}</CardTitle>
            <CardDescription>Factory ID: {factory.description}</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Factory
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Status</h3>
              <p className="text-sm">
                {factory.factoryStatus || 'Not specified'}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Established Date</h3>
              <p className="text-sm">
                {factory.establishedDate
                  ? format(new Date(factory.establishedDate), 'PPP')
                  : 'Not specified'}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Operational Hours</h3>
              <p className="text-sm">
                {factory.operationalHours || 'Not specified'}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Description</h3>
              <p className="line-clamp-3 text-sm">
                {factory.description || 'No description provided'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Production Capacity</CardTitle>
          <CardDescription>
            Information about your factory's production capacity
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Minimum Order Quantity</h3>
              <p className="text-sm">
                {factory.minimumOrderQuantity !== null &&
                factory.minimumOrderQuantity !== undefined
                  ? factory.minimumOrderQuantity
                  : 'Not specified'}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Max Printing Capacity</h3>
              <p className="text-sm">
                {factory.maxPrintingCapacity !== null &&
                factory.maxPrintingCapacity !== undefined
                  ? factory.maxPrintingCapacity
                  : 'Not specified'}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Lead Time</h3>
              <p className="text-sm">
                {factory.leadTime !== null && factory.leadTime !== undefined
                  ? `${factory.leadTime} days`
                  : 'Not specified'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Factory contact person details</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Contact Person</h3>
              <p className="text-sm">
                {factory.contactPersonName || 'Not specified'}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Role</h3>
              <p className="text-sm">
                {factory.contactPersonRole || 'Not specified'}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Phone</h3>
              <p className="text-sm">
                {factory.contactPersonPhone || 'Not specified'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
