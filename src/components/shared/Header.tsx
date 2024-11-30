'use client'

import AuthenMenu from '@/components/shared/AuthenMenu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MenuItem = {
  title: string
  href: string
}

const menuItems: MenuItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'Login', href: '/login' },
  { title: 'Register', href: '/register' },
]

export default function Header() {
  const pathname = usePathname()
  return (
    <section className="fixed left-0 right-0 top-0 flex h-14 w-full items-center justify-center border-b py-2 backdrop-blur-md">
      <header className="container flex h-full items-center gap-6">
        <div className="flex flex-1 items-center gap-10">
          <h1 className="select-none text-2xl font-semibold">DevTalk</h1>
          <nav>
            <ul className="flex items-center gap-4">
              {menuItems.map((item) => (
                <li
                  key={item.title}
                  className={cn(
                    'text-muted-foreground hover:text-primary',
                    pathname === item.href && 'text-primary'
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
  )
}
