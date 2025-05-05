'use client';

import {
  ClipboardList,
  Factory,
  LockKeyholeIcon,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import MyAvatar from '@/components/shared/my-avatar';
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
import {
  FactoryStatus,
  GetMeQuery,
  Roles,
  useLogoutMutation,
  UserEntity,
} from '@/graphql/generated/graphql';
import { useAuthStore } from '@/stores/auth.store';
import { useSocketStore } from '@/stores/socket-io-store';

interface UserDropdownMenuProps {
  user: GetMeQuery['getMe'];
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const router = useRouter();
  const { isAuth, logout } = useAuthStore();
  const { disconnect } = useSocketStore();
  const [logoutMutation, { loading }] = useLogoutMutation({
    onCompleted: () => {
      router.push('/login');
      logout();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="bg-muted relative h-9 w-9 rounded-full"
        >
          <MyAvatar imageUrl={user.imageUrl || ''} name={user.name || ''} />
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
        {isAuth &&
        user.role.toUpperCase() === Roles.Factoryowner &&
        user.ownedFactory?.factoryStatus === FactoryStatus.Approved ? (
          <Link href={'/factory'}>
            <DropdownMenuItem>
              <LockKeyholeIcon className="mr-2 h-4 w-4" />
              <span>Factory Dashboard</span>
            </DropdownMenuItem>
          </Link>
        ) : null}
        {isAuth && user.role.toUpperCase() === Roles.Staff && (
          <Link href={'/staff'}>
            <DropdownMenuItem>
              <LockKeyholeIcon className="mr-2 h-4 w-4" />
              <span>Staff Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        {isAuth && user.role.toUpperCase() === Roles.Manager && (
          <Link href={'/manager'}>
            <DropdownMenuItem>
              <LockKeyholeIcon className="mr-2 h-4 w-4" />
              <span>Manager Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        {isAuth && user.role.toUpperCase() === Roles.Customer && (
          <Link href={'/my-order'}>
            <DropdownMenuItem>
              <ClipboardList className="mr-2 h-4 w-4" />
              <span>My Order</span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            disconnect();
            logoutMutation();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
