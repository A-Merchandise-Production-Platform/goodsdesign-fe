'use client';

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
}

export function MySidebar({ navItems, children }: MySidebarProps) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 gap-4 pt-4 pb-2 md:grid-cols-[200px_1fr]">
      <nav className="bg-background space-y-1 rounded-xl p-2">
        {navItems.map(item => {
          const isActive = pathname === item.href;
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
