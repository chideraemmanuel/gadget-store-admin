import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from './ui/skeleton';

interface Props {}

const TableSkeleton: FC<Props> = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="w-full h-5" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-3" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-3" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-3" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
