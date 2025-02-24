import React from 'react';

interface LoadingScreenProps {
  message: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="bg-background/90 fixed inset-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-3xl">
      <div className="text-center">
        <div
          className="border-primary inline-block size-8 animate-spin rounded-full border-2 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-foreground mt-4">{message}</p>
      </div>
    </div>
  );
}
