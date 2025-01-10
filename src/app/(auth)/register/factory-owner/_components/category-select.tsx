'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { CategoryApi } from '@/api/category';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CategorySelectProps {}
interface Categories {
  id: string;
  name: string;
  imageUrl: string;
}
interface SelectedCategories {
  productId: string;
}

export default function CategorySelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      CategoryApi.getAll({
        select: ['id', 'name', 'imageUrl'],
        filter: { isDeleted: false },
      }),
  });

  useEffect(() => {
    if (data) {
      setCategories(data.value);
    }
  }, [data]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{isLoading ? 'Loading...' : 'Select Category'}</Button>
      </DialogTrigger>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Select Category for your factory</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
