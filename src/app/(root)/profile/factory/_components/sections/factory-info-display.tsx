'use client';

import { format } from 'date-fns';
import { CalendarIcon, Factory, Mail, Phone, User } from 'lucide-react';

import MyAvatar from '@/components/shared/my-avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GetMyFactoryQuery } from '@/graphql/generated/graphql';

interface FactoryInfoDisplayProps {
  factoryData: GetMyFactoryQuery['getMyFactory'];
}

export function FactoryInfoDisplay({ factoryData }: FactoryInfoDisplayProps) {
  const formattedDate = factoryData.establishedDate
    ? format(new Date(factoryData.establishedDate), 'PPP')
    : 'Not specified';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING_APPROVAL':
        return (
          <Badge
            variant="outline"
            className="border-yellow-300 bg-yellow-100 text-yellow-800"
          >
            PENDING APPROVAL
          </Badge>
        );
      case 'APPROVED':
        return (
          <Badge
            variant="outline"
            className="border-green-300 bg-green-100 text-green-800"
          >
            APPROVED
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge
            variant="outline"
            className="border-red-300 bg-red-100 text-red-800"
          >
            REJECTED
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{factoryData.name}</span>
          </div>
          {getStatusBadge(factoryData.factoryStatus ?? '')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              Factory Details
            </h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Established:</span>{' '}
                {formattedDate}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Employees:</span>{' '}
                {factoryData.totalEmployees}
              </div>
              <div className="flex items-center gap-2 text-sm">
                {factoryData.isSubmitted ? (
                  <Badge
                    variant="outline"
                    className="border-green-300 bg-green-100 text-green-800"
                  >
                    Submitted
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-gray-300 bg-gray-100 text-gray-800"
                  >
                    Not Submitted
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              Contact Information
            </h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Contact Person:</span>{' '}
                {factoryData.contactPersonName}
              </div>
              {factoryData.contactPersonPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Phone:</span>{' '}
                  {factoryData.contactPersonPhone}
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">
            Owner Information
          </h3>
          <div className="flex items-center gap-3">
            <MyAvatar
              imageUrl={factoryData?.owner?.imageUrl || ''}
              name={factoryData?.owner?.name || ''}
            />
            <div>
              <p className="font-medium">{factoryData?.owner?.name}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>{factoryData?.owner?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
