'use client';

import { motion } from 'framer-motion';
import { HomeIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth.store';

export default function AlreadyAuthenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useAuthStore();
  const router = useRouter();

  if (isAuth) {
    return (
      <div className="fixed top-0 right-0 bottom-0 left-0 z-0 flex w-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md overflow-hidden border-none bg-transparent shadow-none">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <h1 className="text-primary/50 text-9xl font-bold select-none">
                  403
                </h1>
                <h1 className="text-primary/50 mt-2 text-center text-lg">
                  You are already Authenticated
                </h1>

                <div className="mt-28 space-x-4">
                  <Button onClick={() => router.push('/')} variant="default">
                    <HomeIcon />
                    Home
                  </Button>
                  <Button
                    onClick={() => router.push('/profile')}
                    variant="outline"
                  >
                    <UserIcon />
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return children;
}
