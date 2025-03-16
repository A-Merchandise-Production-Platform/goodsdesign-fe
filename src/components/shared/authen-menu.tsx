'use client';

import Link from 'next/link';

import { UserDropdownMenu } from '@/components/shared/user-dropdown-menu';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuthStore } from '@/stores/auth.store';

import NotificationPanel from './notification-panel';

export default function AuthenMenu() {
  const { isAuth, user } = useAuthStore();

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />

      {isAuth && user ? (
        <div className="flex items-center gap-4">
          {/* <NotificationPanel /> */}
          <UserDropdownMenu user={user} />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
