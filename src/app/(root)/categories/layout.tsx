import React, { Suspense } from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="container mx-auto mt-14 p-4">{children}</div>
    </Suspense>
  );
}
