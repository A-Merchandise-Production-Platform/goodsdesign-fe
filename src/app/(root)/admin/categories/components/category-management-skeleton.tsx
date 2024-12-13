'use client';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CategoryManagementSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            {/* Image Skeleton */}
            <TableCell>
              <Skeleton className="h-12 w-12 rounded-full" />
            </TableCell>
            {/* Name Skeleton */}
            <TableCell>
              <Skeleton className="h-5 w-2/3" />
            </TableCell>
            {/* Description Skeleton */}
            <TableCell>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="mt-1 h-5 w-1/2" />
            </TableCell>
            {/* Actions Skeleton */}
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Skeleton className="h-4 w-16" />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Skeleton className="h-4 w-16" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
