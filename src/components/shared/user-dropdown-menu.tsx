'use client';

import { LockKeyholeIcon, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/auth.store';
import { AuthUser as UserType } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@/api/auth';
import { toast } from 'sonner';

interface UserDropdownMenuProps {
  user: UserType;
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const { logout, isAuth } = useAuthStore();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      router.push('/');
      toast.success('Logged out successfully');
      logout();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="bg-muted relative h-9 w-9">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.imageUrl || ''} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={'/profile'}>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        {isAuth && user.role.toUpperCase() === 'ADMIN' && (
          <Link href={'/admin'}>
            <DropdownMenuItem>
              <LockKeyholeIcon className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => mutation.mutate()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
