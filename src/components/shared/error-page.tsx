import { HomeIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
interface ErrorPageProps {
  code: number;
  message?: string;
}

export default function ErrorPage({ code, message }: ErrorPageProps) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-0 flex w-full items-center justify-center">
      <Card className="w-full max-w-md overflow-hidden border-none bg-transparent shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <h1 className="text-primary/50 text-9xl font-bold select-none">
              {code}
            </h1>
            <h1 className="text-primary/50 mt-2 text-center text-lg">
              {message}
            </h1>

            <div className="mt-28 space-x-4">
              <Link href={'/'}>
                <Button variant="default">
                  <HomeIcon />
                  Home
                </Button>
              </Link>
              <Link href={'/profile'}>
                <Button variant="outline">
                  <UserIcon />
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
