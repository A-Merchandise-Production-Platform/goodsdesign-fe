import React from 'react';

import ErrorPage from '@/components/shared/error-page';
import Header from '@/components/shared/header';

export default function NotFound() {
  return (
    <main>
      <Header />
      <ErrorPage code={404} message="Page not found" />
    </main>
  );
}
