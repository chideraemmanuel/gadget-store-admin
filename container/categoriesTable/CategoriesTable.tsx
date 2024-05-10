import { DataTable } from '@/components/dataTable/DataTable';
import { FC, useState } from 'react';
import { ProductsReturnTypes } from '@/lib/hooks/useProduct';
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
import AddProductForm from '../addProductForm/AddProductForm';

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
import { categoriesColumns, categoriesSkeletonColumns } from './column';
import { CategoryReturnTypes } from '@/lib/hooks/useCategory';

interface Props {
  data?: CategoryReturnTypes[];
  isLoading?: boolean;
  isError?: boolean;
}

const CategoriesTable: FC<Props> = ({ data = [], isLoading, isError }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: categoriesColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      {/* <span>Products Table!</span> */}
      {/* {isLoading && (
        <div className="w-full h-[75vh] flex items-center justify-center">
          Loading...
        </div>
      )}

      {isError && (
        <div className="w-full h-[75vh] flex items-center justify-center">
          An error occured while fetching products
        </div>
      )} */}

      {/* {data?.length === 0 && (
        <div className="w-full h-[75vh] flex items-center justify-center">
          No products to display.
        </div>
      )} */}

      <div className="flex md:flex-row flex-col gap-3 items-center md:justify-between px-4 py-5 sticky top-20 z-10 bg-white">
        <div className="flex items-center md:justify-start justify-stretch md:w-auto w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500" />

            <Input
              className="pl-10"
              placeholder="Search categories"
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
            />
          </div>

          {/* <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter Products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allProducts">All Products</SelectItem>
              <SelectItem value="featuredProducts">
                Featured Products
              </SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        <Button asChild className="w-full md:w-auto flex items-center gap-1">
          <Link href="/admin/dashboard/categories/add">
            <Plus />
            <span>Add category</span>
          </Link>
        </Button>
      </div>

      <div className="container mx-auto py-10">
        {isLoading && (
          <DataTableSkeleton
            columns={categoriesSkeletonColumns}
            data={[]}
            // emptyTableMessage="No products to display."
          />
        )}

        {isError && (
          <DataTable
            columns={categoriesColumns}
            data={[]}
            emptyTableMessage="An error occured while fetching categories."
          />
        )}

        {!isLoading && !isError && data && (
          <DataTable
            columns={categoriesColumns}
            data={data}
            table={table}
            emptyTableMessage="No categories to display."
          />
        )}
      </div>
    </>
  );
};

export default CategoriesTable;

// TODO: close dialog after adding product!
// TODO: add pagination to data table / product table!
