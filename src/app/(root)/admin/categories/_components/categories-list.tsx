'use client';

import CategoryCard from '@/app/(root)/admin/categories/_components/category-card';
import { useCategories } from '@/app/(root)/admin/categories/_hooks/use-category';
import React from 'react';

export default function CategoriesList() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return <CategoryCard categories={data?.categories || []} />;
}
