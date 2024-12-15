import { MoreHorizontal, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ProductManagementSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-12 w-12 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full max-w-[200px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full max-w-[300px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full max-w-[100px]" />
            </TableCell>
            <TableCell>
              <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
