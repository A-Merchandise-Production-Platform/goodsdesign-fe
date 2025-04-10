'use client';

import { useFindTasksByStaffIdQuery } from '@/graphql/generated/graphql';
import { useParams } from 'next/navigation';
import React from 'react';

export default function page() {
  const { id } = useParams();
  const { data, loading } = useFindTasksByStaffIdQuery({
    variables: {
      staffId: id as string,
    },
  });
  console.log(data);
  return <div>page</div>;
}
