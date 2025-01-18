/* eslint-disable unicorn/consistent-function-scoping */
import { format } from 'date-fns';
import {
  Ban,
  CalendarDays,
  CheckCheck,
  Info,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  TrashIcon,
  UserCircle,
  UserCog,
} from 'lucide-react';
import React from 'react';

import { User } from '@/api/types/user';
import EditUserButton from '@/app/(root)/admin/users/[id]/_components/edit-user-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface UserInfoProps {
  user: User;
}

interface Item {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

export default function UserInfo({ user }: UserInfoProps) {
  const [items, setItems] = React.useState<Item[]>([
    {
      icon: <UserCircle size={16} />,
      label: 'Username',
      value: <span className="text-sm">{user.userName}</span>,
    },
    {
      icon: <Mail size={16} />,
      label: 'Email',
      value: <span className="text-sm">{user.email}</span>,
    },
    {
      icon: <Phone size={16} />,
      label: 'Phone',
      value: <span className="text-sm">{user.phoneNumber || 'N/A'}</span>,
    },
    {
      icon: <MapPin size={16} />,
      label: 'Address',
      value: <span className="text-sm">{user.address || 'N/A'}</span>,
    },
    {
      icon: <CalendarDays size={16} />,
      label: 'Created At',
      value: <span className="text-sm">{format(user.createdAt, 'Pp')}</span>,
    },
    {
      icon: <CalendarDays size={16} />,
      label: 'Updated At',
      value: (
        <span className="text-sm">
          {user.updatedAt ? format(user.updatedAt, 'Pp') : 'N/A'}
        </span>
      ),
    },
    {
      icon: <UserCog size={16} />,
      label: 'Role',
      value: (
        <Badge
          className="text-xs"
          variant={
            user.role?.name as
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
          {user.role?.name.toUpperCase()}
        </Badge>
      ),
    },
    {
      icon: <ShieldCheck size={16} />,
      label: 'Status',
      value: (
        <Badge variant={user.isActive ? 'success' : 'destructive'}>
          {user.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Info size={20} />
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Separator />}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                {item.value}
              </div>
            </React.Fragment>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex w-full items-center justify-end">
          <div className="flex items-center gap-4">
            <Button variant={'outline-danger'} className="" onClick={() => {}}>
              <TrashIcon size={16} />
              Delete User
            </Button>
            {user.isActive ? (
              <Button
                variant={'outline-warning'}
                className=""
                onClick={() => {}}
              >
                <Ban size={16} />
                De-active User
              </Button>
            ) : (
              <Button
                variant={'outline-warning'}
                className=""
                onClick={() => {}}
              >
                <CheckCheck size={16} />
                Active User
              </Button>
            )}
            <EditUserButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
