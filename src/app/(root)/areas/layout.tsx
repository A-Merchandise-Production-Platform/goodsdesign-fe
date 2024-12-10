import React, { Suspense } from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto p-4">{children}</div>
    </Suspense>
  );
}
