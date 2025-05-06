'use client';

import { formatDate } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, MapPin, User, History } from 'lucide-react';
import Image from 'next/image';
import { RejectedOrderEntity } from '@/graphql/generated/graphql';

interface RejectionHistoryProps {
  rejectedHistory?: Array<{
    __typename?: 'RejectedOrderEntity';
    rejectedAt: any;
    reassignedTo?: string | null;
    reassignedAt?: any;
    reason: string;
    id: string;
    factory?: {
      __typename?: 'FactoryEntity';
      name: string;
      contractUrl?: string | null;
      address?: {
        __typename?: 'AddressEntity';
        wardCode: string;
        street: string;
        districtID: number;
        provinceID: number;
      } | null;
      owner?: {
        __typename?: 'UserEntity';
        name?: string | null;
        email?: string | null;
        imageUrl?: string | null;
      } | null;
    } | null;
  }> | null;
}

export function RejectionHistory({
  rejectedHistory = [],
}: RejectionHistoryProps) {
  if (!rejectedHistory?.length) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rejection History</CardTitle>
          <CardDescription>
            When orders are rejected, they will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <History className="text-muted-foreground/50 mb-4 h-12 w-12" />
            <p className="text-muted-foreground text-lg font-medium">
              No rejection history found
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              When orders are rejected, they will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Rejection History</CardTitle>
        <CardDescription>Rejection history for this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rejectedHistory.map(rejection => (
            <div
              key={rejection.id}
              className="bg-card rounded-lg border p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium">
                    {rejection.factory?.name || 'Unknown Factory'}
                  </span>
                </div>
                <Badge variant="destructive">Rejected</Badge>
              </div>

              <div className="mb-3">
                <p className="text-muted-foreground text-sm">Reason:</p>
                <p className="mt-1">
                  {rejection.reason || 'No reason provided'}
                </p>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Rejected on {formatDate(rejection.rejectedAt)}
                </span>
              </div>

              {rejection.factory?.address?.street && (
                <div className="flex items-center gap-2">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm">
                    {rejection.factory.address.street}
                  </span>
                </div>
              )}

              {rejection.factory?.owner && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border">
                    <Image
                      src={
                        rejection.factory.owner.imageUrl || '/placeholder.svg'
                      }
                      alt={rejection.factory.owner.name || 'Factory Owner'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {rejection.factory.owner.name || 'Unknown Owner'}
                    </p>
                    {rejection.factory.owner.email && (
                      <p className="text-muted-foreground text-xs">
                        {rejection.factory.owner.email}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
