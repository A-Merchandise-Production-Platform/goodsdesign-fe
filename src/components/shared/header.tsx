'use client';

import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AuthenMenu from '@/components/shared/authen-menu';
import { cn } from '@/lib/utils';

type MenuItem = {
  title: string;
  href: Route;
};

const menuItems: MenuItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Login', href: '/login' },
  { title: 'Register', href: '/register' },
  { title: 'System design', href: '/system-design' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <section className="bg-background fixed top-0 right-0 left-0 z-50 flex h-16 w-full items-center justify-center border-b py-2 backdrop-blur-md">
      <header className="container flex h-full items-center gap-6">
        <div className="flex flex-1 items-center gap-10">
          <h1 className="font-jetbrains-mono text-2xl font-semibold select-none">
            GoodsDesign
          </h1>
          <nav>
            <ul className="flex items-center gap-4">
              {menuItems.map(item => (
                <li
                  key={item.title}
                  className={cn(
                    'text-muted-foreground hover:text-primary',
                    pathname === item.href && 'text-primary',
                  )}
                >
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <AuthenMenu />
      </header>
    </section>
  );
}
