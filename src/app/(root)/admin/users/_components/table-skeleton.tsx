import { TableCell, TableRow } from '@/components/ui/table';

export function TableSkeleton({ columns }: { columns: number }) {
  return (
    <>
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <div className="bg-muted h-6 w-full animate-pulse rounded"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
