import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <section className="fixed bottom-0 left-0 right-0 h-6 w-screen border-t p-1 backdrop-blur-md">
      <footer className="flex h-full w-full items-center justify-center">
        <p className="select-none text-xs text-muted-foreground">
          &copy; 2024{' '}
          <Link href="/" className="underline">
            GoodsDesign
          </Link>
        </p>
      </footer>
    </section>
  );
}
