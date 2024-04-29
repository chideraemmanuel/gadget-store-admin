'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '../ui/skeleton';
// import { Skeleton } from '@/components/ui/skeleton';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableSkeleton<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="min-w-[130px]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getHeaderGroups().map((headerGroup) => (
            <>
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} className="min-w-[130px]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            //   header.column.columnDef.header,
                            <Skeleton className="w-[100px] h-[20px]" />,
                            header.getContext()
                          )}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} className="min-w-[130px]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            //   header.column.columnDef.header,
                            <Skeleton className="w-[100px] h-[20px]" />,
                            header.getContext()
                          )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
