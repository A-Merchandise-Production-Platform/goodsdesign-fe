'use client';

import Link from 'next/link';

import { UserDropdownMenu } from '@/components/shared/user-dropdown-menu';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuthStore } from '@/stores/auth.store';
import { Badge } from '@/components/ui/badge';

import { ShoppingCartIcon } from 'lucide-react';
import { useGetCartItemCountQuery } from '@/graphql/generated/graphql';
import NotificationButton from '@/components/shared/notification-button';

export default function AuthenMenu() {
  const { isAuth, user } = useAuthStore();

  const { data: cartItemCount } = useGetCartItemCountQuery();

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />

      {isAuth && user ? (
        <>
          <Link href="/cart">
            <Button variant="outline" className="relative" size="icon">
              <ShoppingCartIcon />
              {cartItemCount?.getCartItemCount &&
                cartItemCount.getCartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1.5 text-xs"
                  >
                    {cartItemCount.getCartItemCount > 99
                      ? '99+'
                      : cartItemCount.getCartItemCount}
                  </Badge>
                )}
            </Button>
          </Link>
          <NotificationButton />
          <div className="flex items-center gap-4">
            {/* <NotificationPanel /> */}
            <UserDropdownMenu user={user} />
          </div>
        </>
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
