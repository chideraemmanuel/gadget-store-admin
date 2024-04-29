import { DataTable } from '@/components/dataTable/DataTable';
import { FC, useState } from 'react';
import { ProductsReturnTypes } from '@/lib/hooks/useProduct';
import { productsSkeletonColumns, productsColumns } from './columns';
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

interface Props {
  data?: ProductsReturnTypes[];
  isLoading?: boolean;
  isError?: boolean;
}

const ProductsTable: FC<Props> = ({ data = [], isLoading, isError }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: productsColumns,
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
              placeholder="Search products"
              value={
                (table.getColumn('product_name')?.getFilterValue() as string) ??
                ''
              }
              onChange={(event) =>
                table
                  .getColumn('product_name')
                  ?.setFilterValue(event.target.value)
              }
            />
          </div>

          <Select>
            <SelectTrigger className="flex-1">
              {/* <SelectTrigger className="w-[180px] flex-1"> */}
              <SelectValue placeholder="Filter Products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allProducts">All Products</SelectItem>
              <SelectItem value="featuredProducts">
                Featured Products
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto flex items-center gap-1">
              <Plus />
              <span>Add product</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Fill in product details</DialogTitle>
              {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
            </DialogHeader>

            <div>
              <AddProductForm />
            </div>

            {/* <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="container mx-auto py-10">
        {isLoading && (
          <DataTableSkeleton
            columns={productsSkeletonColumns}
            data={[]}
            // emptyTableMessage="No products to display."
          />
        )}

        {isError && (
          <DataTable
            columns={productsColumns}
            data={[]}
            emptyTableMessage="An error occured while fetching products."
          />
        )}

        {!isLoading && !isError && data && (
          <DataTable
            columns={productsColumns}
            data={data}
            table={table}
            emptyTableMessage="No products to display."
          />
        )}
      </div>
    </>
  );
};

export default ProductsTable;

// TODO: add table skeletons!
