import { DataTable } from '@/components/dataTable/DataTable';
import { FC, useState } from 'react';
import { ProductReturnTypes } from '@/lib/hooks/useProduct';
import { DataTableSkeleton } from '@/components/dataTableSkeleton/DataTableSkeleton';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import AddProductForm from '../../forms/products/addProductForm/AddProductForm';

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
import { brandsColumns, brandsSkeletonColumns } from './column';
import { CategoryReturnTypes } from '@/lib/hooks/useCategory';
import { BrandReturnTypes } from '@/lib/hooks/useBrands';

interface Props {
  data?: BrandReturnTypes[];
  isLoading?: boolean;
  isError?: boolean;
}

const BrandsTable: FC<Props> = ({ data = [], isLoading, isError }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: brandsColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex md:flex-row flex-col gap-3 items-center md:justify-between px-4 py-5 sticky top-20 z-10 bg-white">
        <div className="flex items-center md:justify-start justify-stretch md:w-auto w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500" />

            <Input
              className="pl-10"
              placeholder="Search brands"
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
          <Link href="/admin/dashboard/brands/add">
            <Plus />
            <span>Add brand</span>
          </Link>
        </Button>
      </div>

      <div className="container mx-auto py-10">
        {isLoading && (
          <DataTableSkeleton
            columns={brandsSkeletonColumns}
            data={[]}
            // emptyTableMessage="No products to display."
          />
        )}

        {isError && (
          <DataTable
            columns={brandsColumns}
            data={[]}
            emptyTableMessage="An error occured while fetching brands."
          />
        )}

        {!isLoading && !isError && data && (
          <DataTable
            columns={brandsColumns}
            data={data}
            table={table}
            emptyTableMessage="No brands to display."
          />
        )}
      </div>
    </>
  );
};

export default BrandsTable;
