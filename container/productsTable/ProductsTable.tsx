import { DataTable } from '@/components/dataTable/DataTable';
import { FC } from 'react';
import { ProductsReturnTypes } from '@/lib/hooks/useProduct';
import { productsSkeletonColumns, columns } from './columns';
import { DataTableSkeleton } from '@/components/dataTableSkeleton/DataTableSkeleton';

interface Props {
  data?: ProductsReturnTypes[];
  isLoading?: boolean;
  isError?: boolean;
}

const ProductsTable: FC<Props> = ({ data, isLoading, isError }) => {
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
            columns={columns}
            data={[]}
            emptyTableMessage="An error occured while fetching products."
          />
        )}

        {data && (
          <DataTable
            columns={columns}
            data={data}
            emptyTableMessage="No products to display."
          />
        )}
      </div>
    </>
  );
};

export default ProductsTable;

// TODO: add table skeletons!
