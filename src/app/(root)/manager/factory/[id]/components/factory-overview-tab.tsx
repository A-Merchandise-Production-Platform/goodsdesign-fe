'use client';

import { format } from 'date-fns';
import { Calendar, Globe, MapPin } from 'lucide-react';

import MyAvatar from '@/components/shared/my-avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FactoryStatus } from '@/graphql/generated/graphql';

interface FactoryOverviewTabProps {
  factory: any; // Type should be more specific based on your GraphQL schema
}

export function FactoryOverviewTab({ factory }: FactoryOverviewTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
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
              <span className="line-clamp-2">{factory.formattedAddress}</span>
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
                  {format(new Date(factory.establishedDate), 'MMMM dd, yyyy')}
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
              {factory.specializations && factory.specializations.length > 0 ? (
                factory.specializations.map((spec: string, i: number) => (
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
              {factory.printingMethods && factory.printingMethods.length > 0 ? (
                factory.printingMethods.map((method: string, i: number) => (
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
