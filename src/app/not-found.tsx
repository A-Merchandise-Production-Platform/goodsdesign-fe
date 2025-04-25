import React from 'react';

import ErrorPage from '@/components/shared/error-page';

export default function NotFound() {
  return <ErrorPage code={404} message="Page not found" />;
}
