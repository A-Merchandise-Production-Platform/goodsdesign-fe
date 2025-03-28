import React from 'react';

import ErrorPage from '@/components/shared/error-page';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

export default function NotFound() {
  return <ErrorPage code={404} message="Page not found" />;
}
