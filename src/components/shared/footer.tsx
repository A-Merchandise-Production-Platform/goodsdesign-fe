import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <section className="fixed right-0 bottom-0 left-0 z-50 h-6 w-screen border-t p-1 backdrop-blur-md">
      <footer className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground text-xs select-none">
          &copy; {new Date().getFullYear()}{' '}
          <Link href="/" className="underline">
            GoodsDesign
          </Link>
        </p>
      </footer>
    </section>
  );
}
