'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

import { UserApi } from '@/api/user';
import UserInfo from '@/app/(root)/admin/users/[id]/_components/user-info';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface UserDetailProps {
  id: string;
}

export default function UserDetail({ id }: UserDetailProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => UserApi.getUserById(id),
  });

  console.log(data);

  if (!data && isError) {
    return <div>Error...</div>;
  }

  if (!data && isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data...</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-start gap-4 rounded-lg border bg-card p-2">
          <Avatar className="size-20 rounded-lg">
            <AvatarImage src={data.imageUrl} alt={data.userName} />
            <AvatarFallback className="rounded-lg">
              {data.userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{data.userName}</h2>
            <p className="text-muted-foreground">{data.email}</p>
            <Badge
              className="text-xs"
              variant={
                data.role?.name as
                  | 'default'
                  | 'secondary'
                  | 'destructive'
                  | 'outline'
                  | 'success'
                  | 'admin'
                  | 'manager'
                  | 'staff'
                  | 'factoryOwner'
                  | 'customer'
                  | null
              }
            >
              {data.role?.name.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="h-full rounded-lg border bg-card"></div>
        <div className="h-full rounded-lg border bg-card"></div>
        <div className="h-full rounded-lg border bg-card"></div>

        <UserInfo user={data} />
        <div className="col-span-2 rounded-lg border bg-card"></div>
      </div>
    </div>
  );
}
