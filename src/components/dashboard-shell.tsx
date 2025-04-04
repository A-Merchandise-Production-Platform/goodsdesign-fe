'use client';

import { ReactNode } from 'react';
import { Building2, Factory, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardShell({
  children,
  title,
  subtitle,
}: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-10 flex h-16 items-center border-b px-6">
        <div className="mr-6 flex items-center">
          <Factory className="mr-2 h-6 w-6" />
          <span className="font-semibold">Dashboard</span>
        </div>
        <div className="ml-auto">
          <h1 className="text-lg font-semibold">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
