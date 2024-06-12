import { FC, Suspense } from 'react';
// import ProductsTable from '@/container/tables/productsTable/ProductsTable';
import ProductsTable from '@/container/products-table/ProductsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import useGetProductsOnClient from '@/lib/hooks/products/useGetProductsOnClient';
import { SearchParams } from '@/types';

interface Props {
  searchParams: SearchParams;
}

const ProductsPage: FC<Props> = ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />
      {/* <Suspense fallback={<div>Loading products...</div>}> */}
      <ProductsTable searchParams={searchParams} />
      {/* </Suspense> */}
    </div>
  );
};

export default ProductsPage;
