'use client';

import { Globe, Mail, MapPin, Phone, User } from 'lucide-react';

import MyAvatar from '@/components/shared/my-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FactoryContactsTabProps {
  factory: any; // Type should be more specific based on your GraphQL schema
}

export function FactoryContactsTab({ factory }: FactoryContactsTabProps) {
  return (
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
              <h3 className="text-md mb-3 font-semibold">Primary Contact</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {factory.contactPersonName && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Name</p>
                    <div className="flex items-center">
                      <User className="text-muted-foreground mr-2 h-4 w-4" />
                      <p className="font-medium">{factory.contactPersonName}</p>
                    </div>
                  </div>
                )}

                {factory.contactPersonRole && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Position</p>
                    <p className="font-medium">{factory.contactPersonRole}</p>
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
                <h3 className="text-md mb-3 font-semibold">Owner Contact</h3>
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
                      <p className="text-muted-foreground text-sm">Email</p>
                      <div className="flex items-center">
                        <Mail className="text-muted-foreground mr-2 h-4 w-4" />
                        <p className="font-medium">{factory.owner.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-lg border p-4">
              <h3 className="text-md mb-3 font-semibold">Factory Location</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Address</p>
                  <div className="flex items-center">
                    <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                    <p className="font-medium">{factory.formattedAddress}</p>
                  </div>
                </div>

                {factory.website && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Website</p>
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
            <h3 className="text-lg font-medium">No Contact Information</h3>
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
  );
}
