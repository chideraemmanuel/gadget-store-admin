import { DataTable } from '@/components/dataTable/DataTable';
import { FC, useState } from 'react';
import { DataTableSkeleton } from '@/components/dataTableSkeleton/DataTableSkeleton';

import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  ColumnDef,
  ColumnFiltersState,
  Table as TanstackTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { billboardsColumns, billboardsSkeletonColumns } from './column';
import { BillboardReturnTypes } from '@/lib/hooks/useBillboard';

interface Props {
  data?: BillboardReturnTypes[];
  isLoading?: boolean;
  isError?: boolean;
}

const BillboardsTable: FC<Props> = ({ data = [], isLoading, isError }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: billboardsColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex md:flex-row flex-col gap-3 items-center md:justify-between  py-5 sticky top-[90px] z-10 bg-white">
        <div className="flex items-center md:justify-start justify-stretch md:w-auto w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500" />

            <Input
              className="pl-10"
              placeholder="Search billboards"
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
            />
          </div>
        </div>

        <Button asChild className="w-full md:w-auto flex items-center gap-1">
          <Link href="/dashboard/billboards/add">
            <Plus />
            <span>Add billboard</span>
          </Link>
        </Button>
      </div>

      <div className="py-7">
        {isLoading && (
          <DataTableSkeleton
            columns={billboardsSkeletonColumns}
            data={[]}
            // emptyTableMessage="No products to display."
          />
        )}

        {isError && (
          <DataTable
            columns={billboardsColumns}
            data={[]}
            emptyTableMessage="An error occured while fetching billboards."
          />
        )}

        {!isLoading && !isError && data && (
          <DataTable
            columns={billboardsColumns}
            data={data}
            table={table}
            emptyTableMessage="No billboards to display."
          />
        )}
      </div>
    </>
  );
};

export default BillboardsTable;
