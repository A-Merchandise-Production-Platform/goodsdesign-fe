'use client';

import { Home, Paintbrush } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      { href: '/', label: 'Home', icon: <Home size={16} /> },
      {
        href: '/my-design',
        label: 'My Designs',
        icon: <Paintbrush size={16} />,
      },
    ],
    [],
  );

  return (
    <div className="md:fixed md:w-[200px]">
      <nav className="bg-background space-y-1 rounded-xl">
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
    </div>
  );
}
