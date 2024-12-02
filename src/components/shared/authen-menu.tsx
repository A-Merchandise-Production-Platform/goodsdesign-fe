'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { UserDropdownMenu } from '@/components/shared/user-dropdown-menu';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthenMenu() {
  const { isAuth, user } = useAuthStore();

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />

      {isAuth && user ? (
        <UserDropdownMenu user={user} />
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
