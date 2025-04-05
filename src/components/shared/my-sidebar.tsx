'use client';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MySidebarProps {
  navItems: NavItem[];
  children: React.ReactNode;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export function MySidebar({ navItems, children }: MySidebarProps) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-[200px_1fr]">
      <nav className="border-border space-y-1">
        {navItems.map(item => {
          const isActive = item.isActive
            ? item.isActive
            : pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${
                isActive
                  ? 'bg-primary text-primary-foreground dark:text-primary-foreground font-medium'
                  : 'text-muted-foreground dark:hover:bg-muted hover:bg-primary/5'
              }`}
            >
              <div className="flex w-full items-center gap-2">
                {item.icon}
                <div>{item.label}</div>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="h-full rounded-xl">{children}</div>
    </div>
  );
}
