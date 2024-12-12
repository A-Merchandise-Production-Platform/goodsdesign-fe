'use client';

import React from 'react';

import { useUserSearch } from '@/app/(root)/admin/users/hooks/use-user-search';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  const { searchTerm, handleSearchChange } = useUserSearch();

  return (
    <Input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={event => handleSearchChange(event.target.value)}
      className="w-64"
    />
  );
}
