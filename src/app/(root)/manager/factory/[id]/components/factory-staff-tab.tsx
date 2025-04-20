'use client';

import { useState, useEffect } from 'react';
import { Mail, User } from 'lucide-react';

import MyAvatar from '@/components/shared/my-avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface FactoryStaffTabProps {
  factory: any; // Type should be more specific based on your GraphQL schema
  staffs: any; // Type should be more specific based on your GraphQL schema
  selectedStaffId: string;
  setSelectedStaffId: (id: string) => void;
}

export function FactoryStaffTab({
  factory,
  staffs,
  selectedStaffId,
  setSelectedStaffId,
}: FactoryStaffTabProps) {
  const [isStaffSelected, setIsStaffSelected] = useState(false);

  useEffect(() => {
    if (selectedStaffId) {
      setIsStaffSelected(true);
    } else {
      setIsStaffSelected(false);
    }
  }, [selectedStaffId]);

  return (
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
                    <span>{factory.staff.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedStaffId && (
              <div className="space-y-4">
                <Separator />
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">
                    Assign New Staff
                  </h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="grid gap-4">
                    {staffs?.availableStaffForFactory?.map(
                      (staff: {
                        id: string;
                        name?: string;
                        imageUrl?: string;
                        email?: string;
                      }) => (
                        <div
                          key={staff.id}
                          className={`hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${selectedStaffId === staff.id ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => {
                            setSelectedStaffId(staff.id);
                            console.log(`Selected staff ID: ${staff.id}`);
                          }}
                        >
                          <MyAvatar
                            imageUrl={staff.imageUrl || ''}
                            name={staff.name || ''}
                          />
                          <div className="flex-1">
                            <p className="font-medium">
                              {staff.name || 'Unnamed Staff'}
                            </p>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3" />
                              <span>{staff.email || 'No email'}</span>
                            </div>
                          </div>
                          {selectedStaffId === staff.id && (
                            <Badge className="ml-auto" variant="secondary">
                              Selected
                            </Badge>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-md border border-dashed p-6 text-center">
              <h3 className="text-lg font-medium">No Staff Assigned</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                This factory doesn&apos;t currently have any staff assigned to
                manage operations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Available Staff
                </h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {staffs?.availableStaffForFactory &&
                staffs.availableStaffForFactory.length > 0 ? (
                  <div className="grid gap-4">
                    {staffs.availableStaffForFactory.map(
                      (staff: {
                        id: string;
                        name?: string;
                        imageUrl?: string;
                        email?: string;
                      }) => (
                        <div
                          key={staff.id}
                          className={`hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${selectedStaffId === staff.id ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => {
                            if (selectedStaffId === staff.id) {
                              setSelectedStaffId('');
                            } else {
                              setSelectedStaffId(staff.id);
                            }
                            console.log(`Selected staff ID: ${staff.id}`);
                          }}
                        >
                          <MyAvatar
                            imageUrl={staff.imageUrl || ''}
                            name={staff.name || ''}
                          />
                          <div className="flex-1">
                            <p className="font-medium">
                              {staff.name || 'Unnamed Staff'}
                            </p>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <span>{staff.email || 'No email'}</span>
                            </div>
                          </div>
                          {selectedStaffId === staff.id && (
                            <Badge className="ml-auto" variant="secondary">
                              Selected
                            </Badge>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                    <p className="text-lg font-medium">No Staff Available</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      There are currently no staff members available to assign.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
