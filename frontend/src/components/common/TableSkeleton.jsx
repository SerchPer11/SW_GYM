import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TableSkeleton({length = 5, columns = 5}) {
  return Array.from({ length: length }).map((_, index) => (
    <TableRow
      key={index}
      className="hover:bg-transparent border-b border-slate-200"
    >
      {Array.from({ length: columns }).map((_, colIndex) => (
        <TableCell key={colIndex} className="text-center justify-center">
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
