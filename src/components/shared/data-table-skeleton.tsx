import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 5,
}: DataTableSkeletonProps) {
  return (
    <div className="border-border rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            {Array.from({ length: columnCount }).map((_, index) => (
              <TableHead
                key={index}
                className="border-border hover:bg-muted/50 border-r border-b transition-colors last:border-r-0"
              >
                <Skeleton className="h-6 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/50">
              {Array.from({ length: columnCount }).map((_, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="border-border border-r last:border-r-0"
                >
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
