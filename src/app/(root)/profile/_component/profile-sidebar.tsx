'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/profile', label: 'Profile' },
  { href: '/profile/account', label: 'Account' },
  { href: '/profile/appearance', label: 'Appearance' },
  { href: '/profile/notifications', label: 'Notifications' },
  { href: '/profile/display', label: 'Display' },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map(item => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`block rounded-md px-3 py-2 text-sm ${
              isActive
                ? 'bg-muted font-medium'
                : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
