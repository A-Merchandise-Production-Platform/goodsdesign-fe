import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'
import React from 'react'

export default function AuthenMenu() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant={'outline'}>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  )
}
