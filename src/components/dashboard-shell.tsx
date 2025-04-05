'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

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
    <div className="flex flex-col">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
      <main className="flex-1 py-6">{children}</main>
    </div>
  );
}
