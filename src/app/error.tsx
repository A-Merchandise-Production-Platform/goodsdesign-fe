'use client';

import React from 'react';

import ErrorPage from '@/components/shared/error-page';

export default function Error() {
  return <ErrorPage code={500} message="Internal server error" />;
}
