import { FC, Suspense } from 'react';
// import ProductsTable from '@/containers/tables/productsTable/ProductsTable';
import ProductsTable from '@/containers/products-table/ProductsTable';
import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import useGetProducts from '@/lib/hooks/products/useGetProducts ';
import { SearchParams } from '@/types';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TableSkeleton from '@/components/TableSkeleton';

interface Props {
  searchParams: SearchParams;
}

const ProductsPage: FC<Props> = ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />

      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ResourceSearch placeholder="Search products" />

          <Button asChild>
            <Link href={'/dashboard/products/add'}>Add product</Link>
          </Button>
        </div>

        {/* <Suspense fallback={<TableSkeleton />}> */}
        <ProductsTable searchParams={searchParams} />
        {/* </Suspense> */}
      </section>
    </div>
  );
};

export default ProductsPage;
