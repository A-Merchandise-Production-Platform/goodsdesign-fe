import React from 'react';

interface LoadingScreenProps {
  message: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-background/90 backdrop-blur-3xl">
      <div className="text-center">
        <div
          className="inline-block size-8 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-4 text-foreground">{message}</p>
      </div>
    </div>
  );
}
